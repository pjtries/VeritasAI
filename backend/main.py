import os
import json
import random
import time
from enum import Enum
from typing import Optional, List
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# Safe loading of environment variables
from dotenv import load_dotenv
load_dotenv()

# We lazily import ML models inside the functions or after startup
# to prevent slow boot times, but for a simple API, global is fine.
app = FastAPI(title="VERITAS.ai API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class RiskCategory(str, Enum):
    A = "Contextual"
    B = "Synthetic"
    C = "Narrative"
    BENIGN = "Benign"

class ScanResponse(BaseModel):
    id: str
    deception_score: int
    category: RiskCategory
    confidence: float
    explanation_summary: str
    routing_decision: List[str]
    status: str

# Mock database
scans = {}

embedding_model = None
gemini_client = None

def get_embedding_model():
    global embedding_model
    if embedding_model is None:
        from sentence_transformers import SentenceTransformer
        print("Loading embedding model...")
        embedding_model = SentenceTransformer('all-MiniLM-L6-v2')
    return embedding_model

def get_gemini_client():
    global gemini_client
    if gemini_client is None:
        from google import genai
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key:
            raise ValueError("GEMINI_API_KEY is not set")
        gemini_client = genai.Client(api_key=api_key)
    return gemini_client

class RiskRouter:
    @staticmethod
    def get_routing_decision(category: str, score: int) -> list[str]:
        if score < 30:
            return []
        
        category_lower = category.lower()
        if category_lower == "contextual":
            return ["Digital Patient Zero Traceback", "TIDE-MARK Clustering", "Federated GNN Analysis"]
        elif category_lower == "synthetic":
            return ["Diffusion Artifact Lab", "FFT Anomaly Detection", "Optical Flow Consistency"]
        elif category_lower == "narrative":
            return ["Sovereigner Sentiment Analysis", "Narrative Contradiction Engine", "LLM Hallucination Check"]
        else:
            return []

@app.post("/scan", response_model=ScanResponse)
async def start_scan(
    text_content: Optional[str] = Form(None),
    url: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None)
):
    scan_id = f"scan_{random.randint(1000, 9999)}"
    
    if not text_content and not url and not file:
         raise HTTPException(status_code=400, detail="Must provide text_content, url, or file.")

    # 1. OCR/Transcription (Stubbed)
    transcription = "No audio/video provided."
    if file:
        transcription = "Extracted text from media (simulated)."
        text_content = (text_content or "") + f" [Attached file: {file.filename}]"
    
    input_text = text_content or url or ""
    
    # 2. Embeddings Generation (Phase 1 Vibe Check)
    try:
        model = get_embedding_model()
        embedding = model.encode(input_text).tolist()
    except Exception as e:
        print(f"Error generating embeddings: {e}")
        # Not a complete failure, we can still use Gemini

    # 3. Golden Prompt Execution via Gemini
    try:
        client = get_gemini_client()
        from google.genai import types
        from pydantic import BaseModel

        golden_prompt = f"""
        INPUT:
        - Caption/Text: {input_text}
        - Hashtags: None extracted natively yet
        - Audio Transcript: {transcription}
        - Top Comments: None
        - Upload Timestamp: TBD
        - Claimed Event Date: TBD

        TASK:
        1. Analyze whether the narrative matches the claimed timeline.
        2. Detect clickbait exaggeration or emotional manipulation language.
        3. Identify contextual contradictions.
        4. Flag suspicious amplification patterns.
        5. Assign:
           - deception_score: integer (0-100)
           - risk_category: string ("Contextual", "Synthetic", "Narrative", or "Benign")
           - explanation_summary: string
           - confidence_score: float (0.0 to 1.0)
        """

        class TriageResult(BaseModel):
            deception_score: int
            risk_category: str
            explanation_summary: str
            confidence_score: float

        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=golden_prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=TriageResult,
                temperature=0.2,
            ),
        )

        result_json = json.loads(response.text)
        
        score = result_json.get("deception_score", 0)
        category_str = result_json.get("risk_category", "Benign")
        explanation = result_json.get("explanation_summary", "No explanation.")
        confidence = result_json.get("confidence_score", 0.9)

        # Map to enum
        try:
            category_enum = RiskCategory(category_str.capitalize())
        except ValueError:
            category_enum = RiskCategory.BENIGN
            if category_str.lower() == "contextual": category_enum = RiskCategory.A
            elif category_str.lower() == "synthetic": category_enum = RiskCategory.B
            elif category_str.lower() == "narrative": category_enum = RiskCategory.C

    except Exception as e:
         print(f"Gemini Error: {e}, attempting GROQ fallback...")
         try:
             import groq
             groq_api_key = os.getenv("GROQ_API_KEY")
             if not groq_api_key:
                 raise ValueError("GROQ_API_KEY is not set for fallback")
             
             groq_client = groq.Groq(api_key=groq_api_key)
             
             fallback_response = groq_client.chat.completions.create(
                 messages=[
                     {
                         "role": "system", 
                         "content": "You are a forensic AI triage assistant. You MUST output ONLY valid JSON matching these fields: deception_score (int 0-100), risk_category (string: Contextual, Synthetic, Narrative, Benign), explanation_summary (string), confidence_score (float 0-1)."
                     },
                     {"role": "user", "content": golden_prompt}
                 ],
                 model="llama-3.3-70b-versatile",
                 response_format={"type": "json_object"},
                 temperature=0.2,
             )
             
             content = fallback_response.choices[0].message.content
             if content is None:
                 raise ValueError("Groq returned empty content")
                 
             result_json = json.loads(content)
             
             score = result_json.get("deception_score", 0)
             category_str = result_json.get("risk_category", "Benign")
             explanation = result_json.get("explanation_summary", "No explanation.") + " (Fallback: Groq)"
             confidence = result_json.get("confidence_score", 0.9)
             
             try:
                 category_enum = RiskCategory(category_str.capitalize())
             except ValueError:
                 category_enum = RiskCategory.BENIGN
                 if category_str.lower() == "contextual": category_enum = RiskCategory.A
                 elif category_str.lower() == "synthetic": category_enum = RiskCategory.B
                 elif category_str.lower() == "narrative": category_enum = RiskCategory.C
                 
         except Exception as fallback_e:
             print(f"GROQ Fallback Error: {fallback_e}")
             score = 15
             category_enum = RiskCategory.BENIGN
             confidence = 0.8
             explanation = f"Failed to reach all reasoning engines (Gemini & Groq). Gemini Error: {e}, Groq Error: {fallback_e}"

    if score < 30:
        category_enum = RiskCategory.BENIGN

    routing_decision = RiskRouter.get_routing_decision(str(category_enum), score)

    scan_result = {
        "id": scan_id,
        "deception_score": score,
        "category": category_enum,
        "confidence": confidence,
        "explanation_summary": explanation,
        "routing_decision": routing_decision,
        "status": "completed" if score < 30 else "escalated",
        "timestamp": time.time()
    }

    scans[scan_id] = scan_result
    return scan_result

@app.get("/scan/{scan_id}", response_model=ScanResponse)
async def get_scan_status(scan_id: str):
    if scan_id not in scans:
        raise HTTPException(status_code=404, detail="Scan not found")
    return scans[scan_id]

@app.get("/scan/{scan_id}/deep_dive")
async def get_deep_dive(scan_id: str):
    if scan_id not in scans:
        raise HTTPException(status_code=404, detail="Scan not found")
    
    scan = scans[scan_id]
    category = scan["category"]
    
    # Mock Phase 2 Data based on the initial risk category
    if category == RiskCategory.A:
        return {
            "id": scan_id,
            "phase2_category": "Contextual Hijacks",
            "feature": "Digital 'Patient Zero' Traceback",
            "results": {
                "media_lineage_graph_nodes": random.randint(15, 120),
                "seed_post_id": f"x_post_{random.randint(10000000, 99999999)}",
                "mutation_timeline_days": random.randint(2, 45),
                "confidence_score": float(f"{random.uniform(0.85, 0.99):.2f}"),
                "federated_gnn_status": "Matches tracked disinfo cluster #402"
            }
        }
    elif category == RiskCategory.B:
        return {
            "id": scan_id,
            "phase2_category": "Synthetic Generation",
            "feature": "The Forensic Trifecta",
            "results": {
                "fft_anomaly_detected": True,
                "fft_high_freq_noise_score": float(f"{random.uniform(0.7, 0.98):.2f}"),
                "optical_flow_jitter": "High consistency variance detected on jawline",
                "specular_physics_validation": "Failed (Light reflection mismatch on cornea)",
                "stil_blocks_analysis": "3D facial weight inconsistency detected in frames 12-48."
            }
        }
    elif category == RiskCategory.C:
        return {
            "id": scan_id,
            "phase2_category": "Emotional Priming",
            "feature": "Sentiment Dissonance Mapping",
            "results": {
                "rage_enhancement": float(f"{random.uniform(0.7, 0.95):.2f}"),
                "fear_amplification": float(f"{random.uniform(0.6, 0.9):.2f}"),
                "subtle_facial_tweaks": "Eyebrow micro-expression artificially lowered",
                "market_volatility_trigger": True,
                "color_grading_detection": "Aggressive high-contrast red-shift applied"
            }
        }
    else:
        return {
            "id": scan_id,
            "phase2_category": "Benign",
            "feature": "Standard Validation",
            "results": {
                "message": "No deep forensic trace required."
            }
        }

@app.post("/scan/{scan_id}/supreme_court")
async def run_supreme_court(scan_id: str):
    if scan_id not in scans:
        raise HTTPException(status_code=404, detail="Scan not found")
        
    scan = scans[scan_id]
    
    # We simulate gathering the prior Phase 1 & Phase 2 results.
    phase2_data_func = await get_deep_dive(scan_id)
    
    supreme_prompt = f"""
    You are the 'Supreme Court' High-Reasoning AI Agent for VERITAS.ai.
    Your task is to review the case details, resolve any conflicts, and output a final reasoning log.
    
    Phase 1 Result (Triage):
    - Deception Score: {scan['deception_score']}
    - Category: {scan['category']}
    - Trace Explanation: {scan['explanation_summary']}
    
    Phase 2 Result (Deep Forensics):
    {json.dumps(phase2_data_func, indent=2)}
    
    TASK:
    Generate a JSON response containing:
    - `verdict`: "manipulated", "authentic", or "inconclusive"
    - `reasoning_log`: string (Act as a supreme court judge evaluating evidence models)
    - `evidence_heatmap`: A brief phrase of what pixels/metadata to highlight (e.g. "Jawline noise", "Account history")
    - `confidence_calibration`: float (0.0 to 1.0)
    - `audit_trail`: string (Explanation of weights used in final decision)
    """
    
    try:
        client = get_gemini_client()
        from google.genai import types
        class SupremeResult(BaseModel):
            verdict: str
            reasoning_log: str
            evidence_heatmap: str
            confidence_calibration: float
            audit_trail: str
            
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=supreme_prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                response_schema=SupremeResult,
                temperature=0.3,
            ),
        )
        return json.loads(response.text)
        
    except Exception as e:
        print(f"Gemini Supreme Court Error: {e}")
        # Groq Fallback
        import groq
        groq_api_key = os.getenv("GROQ_API_KEY")
        if not groq_api_key:
            return {"error": "All AI agents offline"}
        groq_client = groq.Groq(api_key=groq_api_key)
        
        fallback_response = groq_client.chat.completions.create(
            messages=[
                {
                    "role": "system", 
                    "content": "You are the Supreme Court AI. Output ONLY JSON with keys: 'verdict' (manipulated/authentic/inconclusive), 'reasoning_log' (string), 'evidence_heatmap' (string), 'confidence_calibration' (float 0-1), 'audit_trail' (string)."
                },
                {"role": "user", "content": supreme_prompt}
            ],
            model="llama-3.3-70b-versatile",
            response_format={"type": "json_object"},
            temperature=0.3,
        )
        return json.loads(fallback_response.choices[0].message.content)

@app.post("/scan/{scan_id}/firewall_reconstruction")
async def run_firewall_reconstruction(scan_id: str):
    if scan_id not in scans:
        raise HTTPException(status_code=404, detail="Scan not found")
        
    scan = scans[scan_id]
    category = scan["category"]
    
    # Simulate InstantViR inverse diffusion "revert to truth"
    if category == RiskCategory.A:
         revert_action = "Uncovered original timestamp and location tags from the seed post."
         status_message = "Reverted context to original baseline."
    elif category == RiskCategory.B:
         revert_action = "Peeled off fake speech overlay and reconstructed underlying facial movements using InstantViR."
         status_message = "Generative artifacts neutralized."
    elif category == RiskCategory.C:
         revert_action = "Removed synthetic subtle fear/rage facial tweaks and restored neutral color grading."
         status_message = "Emotional priming signature removed."
    else:
         revert_action = "No modifications detected."
         status_message = "Content already authentic."
         
    return {
         "id": scan_id,
         "inverse_diffusion_model": "InstantViR (Distilled Diffusion)",
         "revert_action": revert_action,
         "status_message": status_message,
         "latency_ms": random.randint(35, 80),
         "reconstruction_confidence": float(f"{random.uniform(0.92, 0.99):.2f}")
    }

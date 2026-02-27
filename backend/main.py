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
         print(f"Gemini Error: {e}")
         score = 15
         category_enum = RiskCategory.BENIGN
         confidence = 0.8
         explanation = f"Failed to reach reasoning engine: {e}"

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

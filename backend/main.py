from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import random
import time
from enum import Enum

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

class ScanRequest(BaseModel):
    url: str | None = None
    media_id: str | None = None

class ScanResult(BaseModel):
    id: str
    score: int
    category: RiskCategory
    confidence: float
    routing_decision: list[str]
    status: str

# Mock database to store scans
scans = {}

@app.get("/")
def read_root():
    return {"status": "online", "engine": "VERITAS Reasoning Engine v1.0"}

class RiskRouter:
    @staticmethod
    def get_routing_decision(category: RiskCategory, score: int) -> list[str]:
        if score < 30:
            return []
        
        match category:
            case RiskCategory.A:
                return ["Digital Patient Zero Traceback", "TIDE-MARK Clustering", "Federated GNN Analysis"]
            case RiskCategory.B:
                return ["Diffusion Artifact Lab", "FFT Anomaly Detection", "Optical Flow Consistency"]
            case RiskCategory.C:
                return ["Sovereigner Sentiment Analysis", "Narrative Contradiction Engine", "LLM Hallucination Check"]
            case _:
                return []

@app.post("/scan")
async def start_scan(request: ScanRequest):
    scan_id = f"scan_{random.randint(1000, 9999)}"
    
    # Simulate Phase 1: Multimodal Semantic Triage
    score = random.randint(0, 100)
    confidence = round(random.uniform(0.7, 0.99), 2)
    
    if score < 30:
        category = RiskCategory.BENIGN
    else:
        category = random.choice([RiskCategory.A, RiskCategory.B, RiskCategory.C])
    
    routing_decision = RiskRouter.get_routing_decision(category, score)

    scans[scan_id] = {
        "id": scan_id,
        "score": score,
        "category": category,
        "confidence": confidence,
        "routing_decision": routing_decision,
        "status": "completed" if score < 30 else "escalated",
        "timestamp": time.time()
    }

    return scans[scan_id]

@app.get("/scan/{scan_id}")
async def get_scan_status(scan_id: str):
    if scan_id not in scans:
        raise HTTPException(status_code=404, detail="Scan not found")
    return scans[scan_id]

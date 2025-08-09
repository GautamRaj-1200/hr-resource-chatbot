from typing import List
import faiss
from fastapi import APIRouter, HTTPException

from app.core import state
from app.schemas.models import EmployeeSearchResponse, SearchResult
from app.services.embeddings import model

router = APIRouter(prefix="/employees", tags=["employees"])

@router.get("/search", response_model=EmployeeSearchResponse)
async def employees_search(query: str, k: int = 3):
    if not query or not query.strip():
        raise HTTPException(status_code=400, detail="Query parameter cannot be empty")
    if k < 1 or k > 20:
        raise HTTPException(status_code=400, detail="k must be between 1 and 20")

    query_embedding = model.encode([query])
    faiss.normalize_L2(query_embedding)
    D, I = state.faiss_index.search(query_embedding, k=k)

    results: List[SearchResult] = []
    for idx, score in zip(I[0], D[0]):
        emp_id, sentence = state.employee_sentences[idx]
        results.append(SearchResult(employee_id=emp_id, sentence=sentence, score=float(score)))

    return EmployeeSearchResponse(query=query, results=results) 
from typing import List
import faiss
from fastapi import APIRouter

from app.core import state
from app.schemas.models import ChatRequest, ChatResponse, SearchResult
from app.services.embeddings import model
from app.services.llm_generation import generate_response

router = APIRouter(prefix="/chat", tags=["chat"])

@router.post("", response_model=ChatResponse)
async def chat(req: ChatRequest):
    query = req.query.strip()
    k = req.k

    query_embedding = model.encode([query])
    faiss.normalize_L2(query_embedding)
    D, I = state.faiss_index.search(query_embedding, k=k)

    results: List[SearchResult] = []
    full_employee_results = []
    for idx, score in zip(I[0], D[0]):
        emp_id, sentence = state.employee_sentences[idx]
        results.append(SearchResult(employee_id=emp_id, sentence=sentence, score=float(score)))
        emp_full = state.employee_dict_by_id.get(emp_id)
        if emp_full:
            full_employee_results.append(emp_full)

    answer = generate_response(query, full_employee_results)

    return ChatResponse(query=query, results=results, recommendations=answer) 
from fastapi import FastAPI
from app.services.data_processing import load_and_prepare_sentences
from app.services.embeddings import embed_sentences
from app.services.vector_store import create_faiss_index
import faiss

app = FastAPI()

DATA_FILE = "app/data/employees.json"

# Prepare data
employee_sentences = load_and_prepare_sentences(DATA_FILE)
employee_sentence_embeddings = embed_sentences(employee_sentences)

# Create FAISS index
faiss_index = create_faiss_index(employee_sentence_embeddings)

@app.get("/")
def read_root():
    return {
        "message": "HR Chatbot API",
        "sample_sentence": employee_sentences[0],
        "embedding": employee_sentence_embeddings[0].tolist()
    }

@app.get("/search")
def search_employees(query: str):
    # Encode query into embedding
    from app.services.embeddings import model
    query_embedding = model.encode([query])
    faiss.normalize_L2(query_embedding)

    # Search FAISS index
    D, I = faiss_index.search(query_embedding, k=3)  # top 3 results

    results = []
    for idx, score in zip(I[0], D[0]):
        emp_id, sentence = employee_sentences[idx]
        results.append({
            "employee_id": emp_id,
            "sentence": sentence,
            "score": float(score)
        })

    return {"query": query, "results": results}

from pathlib import Path
import faiss

from app.services.data_processing import (
    load_and_prepare_sentences,
    load_employee_data,
)
from app.services.embeddings import embed_sentences, model
from app.services.vector_store import create_faiss_index

PROJECT_ROOT = Path(__file__).resolve().parents[2]
DATA_FILE = PROJECT_ROOT / "app" / "data" / "employees.json"

employees = load_employee_data(str(DATA_FILE))

employee_sentences = load_and_prepare_sentences(str(DATA_FILE))
employee_sentence_embeddings = embed_sentences(employee_sentences)

faiss_index = create_faiss_index(employee_sentence_embeddings)

employee_dict_by_id = {emp["id"]: emp for emp in employees} 
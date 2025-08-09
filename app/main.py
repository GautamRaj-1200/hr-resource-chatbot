from fastapi import FastAPI
from app.services.data_processing import load_and_prepare_sentences
from app.services.embeddings import embed_sentences

app = FastAPI()

DATA_FILE = "app/data/employees.json"
employee_sentences = load_and_prepare_sentences(DATA_FILE)
employee_sentence_embeddings = embed_sentences(employee_sentences)

@app.get("/")
def read_root():
    return {
        "message": "HR Chatbot API",
        "sample_sentence": employee_sentences[0],
        "embedding": employee_sentence_embeddings[0].tolist()  # make it JSON serializable
    }
# app/main.py
from fastapi import FastAPI
from app.services.data_processing import load_and_prepare_sentences

app = FastAPI()

DATA_FILE = "app/data/employees.json"
employee_sentences = load_and_prepare_sentences(DATA_FILE)

@app.get("/")
def read_root():
    return {
        "message": "HR Chatbot API",
        "sample_sentence": employee_sentences[0]  # Just to verify
    }

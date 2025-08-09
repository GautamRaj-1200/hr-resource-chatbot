from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.employees import router as employees_router
from app.api.routes.chat import router as chat_router

app = FastAPI(title="HR Resource Chatbot API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def read_root():
    return {"message": "HR Chatbot API"}

app.include_router(employees_router)
app.include_router(chat_router)

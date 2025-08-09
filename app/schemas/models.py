from pydantic import BaseModel, Field
from typing import List, Optional

class Employee(BaseModel):
    id: int
    name: str
    skills: List[str]
    experience_years: int
    projects: List[str] = Field(default_factory=list)
    availability: str

class SearchResult(BaseModel):
    employee_id: int
    sentence: str
    score: float

class EmployeeSearchResponse(BaseModel):
    query: str
    results: List[SearchResult]

class ChatRequest(BaseModel):
    query: str = Field(min_length=1)
    k: Optional[int] = Field(default=3, ge=1, le=20)

class ChatResponse(BaseModel):
    query: str
    results: List[SearchResult]
    recommendations: str 
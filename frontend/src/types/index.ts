export interface Employee {
  id: number;
  name: string;
  skills: string[];
  experience_years: number;
  projects: string[];
  availability: string;
}

export interface SearchResult {
  employee_id: number;
  sentence: string;
  score: number;
}

export interface ChatRequest {
  query: string;
  k?: number;
}

export interface ChatResponse {
  query: string;
  results: SearchResult[];
  recommendations: string;
}

export interface EmployeeSearchResponse {
  query: string;
  results: SearchResult[];
}

export interface ChatMessage {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  results?: SearchResult[];
  recommendations?: string;
}

export interface ApiError {
  detail: string;
  status: number;
}

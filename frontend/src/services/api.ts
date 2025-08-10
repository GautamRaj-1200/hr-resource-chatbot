import axios from "axios";
import type {
  ChatRequest,
  ChatResponse,
  EmployeeSearchResponse,
  ApiError,
} from "../types";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const apiError: ApiError = {
      detail: error.response?.data?.detail || "An unexpected error occurred",
      status: error.response?.status || 500,
    };
    return Promise.reject(apiError);
  }
);

export const chatService = {
  async sendMessage(request: ChatRequest): Promise<ChatResponse> {
    const response = await api.post<ChatResponse>("/chat", request);
    return response.data;
  },

  async searchEmployees(
    query: string,
    k: number = 3
  ): Promise<EmployeeSearchResponse> {
    const response = await api.get<EmployeeSearchResponse>(
      "/employees/search",
      {
        params: { query, k },
      }
    );
    return response.data;
  },

  async healthCheck(): Promise<{ message: string }> {
    const response = await api.get<{ message: string }>("/");
    return response.data;
  },
};

export default api;

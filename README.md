# HR Resource Chatbot (Backend)

FastAPI backend exposing employee retrieval and chat recommendation endpoints using embeddings (SentenceTransformers) and FAISS. Optionally uses Gemini to generate natural language recommendations; falls back to a deterministic template if the API key or SDK is not available.

## Setup

1. Python

- Requires Python 3.11+

2. Install dependencies (uv / pip)

- Using uv (recommended):
  ```bash
  uv sync
  ```
- Or using pip:
  ```bash
  pip install -e .
  ```

3. Environment (optional for LLM)

- Create a `.env` file in project root and add:
  ```env
  GEMINI_API_KEY=your_api_key_here
  ```
  If omitted, the backend will still run and respond with a template-based fallback.

## Run

```bash
uv run fastapi dev app/main.py
# or
uv run fastapi run app/main.py --port 8000
```

Open API docs at `http://localhost:8000/docs`.

## Endpoints

- GET `/` → Health/info

- GET `/employees/search` → Semantic retrieval of employees

  - Query params:
    - `query` (str, required)
    - `k` (int, optional, default 3, 1-20)
  - Response:
    ```json
    {
      "query": "Find Python developers",
      "results": [
        { "employee_id": 1, "sentence": "Alice has ...", "score": 0.88 }
      ]
    }
    ```

- POST `/chat` → Retrieves top-k employees and returns natural-language recommendations
  - Body:
    ```json
    { "query": "Need ML in healthcare", "k": 3 }
    ```
  - Response:
    ```json
    {
      "query": "Need ML in healthcare",
      "results": [{ "employee_id": 4, "sentence": "...", "score": 0.91 }],
      "recommendations": "Here are recommended candidates ..."
    }
    ```

## Notes

- Data file is at `app/data/employees.json` and is loaded at startup.
- Embeddings are computed at startup and indexed with FAISS for fast search.
- CORS is enabled for all origins by default for ease of frontend integration.

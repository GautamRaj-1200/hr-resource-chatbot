- [HR Resource Query Chatbot](#hr-resource-query-chatbot)
  - [Overview](#overview)
  - [Features](#features)
    - [Core Functionality](#core-functionality)
    - [Technical Features](#technical-features)
  - [Architecture](#architecture)
    - [Backend (FastAPI)](#backend-fastapi)
    - [Frontend (React + TypeScript)](#frontend-react--typescript)
  - [Quick Start](#quick-start)
    - [Prerequisites](#prerequisites)
    - [Backend Setup](#backend-setup)
    - [Frontend Setup](#frontend-setup)
  - [📖 API Documentation](#-api-documentation)
    - [Endpoints](#endpoints)
      - [Health Check](#health-check)
      - [Employee Search](#employee-search)
      - [Chat Interface](#chat-interface)
    - [Interactive API Docs](#interactive-api-docs)
  - [User Interface](#user-interface)
    - [Chat Interface (`/`)](#chat-interface-)
    - [Search Interface (`/search`)](#search-interface-search)
    - [About Page (`/about`)](#about-page-about)
  - [AI Development Process](#ai-development-process)
    - [AI Tools Used](#ai-tools-used)
    - [AI-Assisted Development](#ai-assisted-development)
    - [Manual Implementation](#manual-implementation)
    - [AI-Generated Solutions](#ai-generated-solutions)
  - [🔧 Technical Decisions](#-technical-decisions)
    - [Technology Choices](#technology-choices)
      - [Backend](#backend)
      - [Frontend](#frontend)
    - [Trade-offs Considered](#trade-offs-considered)
      - [LLM vs Template Responses](#llm-vs-template-responses)
      - [Local vs Cloud LLM](#local-vs-cloud-llm)
      - [Vector Database vs In-Memory](#vector-database-vs-in-memory)
  - [Sample Data](#sample-data)
  - [Example Interactions](#example-interactions)
    - [Query: "Find Python developers with 3+ years experience"](#query-find-python-developers-with-3-years-experience)
  - [Future Improvements](#future-improvements)
    - [Short-term Enhancements](#short-term-enhancements)
    - [Long-term Features](#long-term-features)

<!-- TOC end -->

<!-- TOC --><a name="hr-resource-query-chatbot"></a>

# HR Resource Query Chatbot

An intelligent HR assistant chatbot that helps teams find employees by answering natural language queries using AI-powered retrieval and generation techniques.

<!-- TOC --><a name="overview"></a>

## Overview

This system combines modern AI technologies to create a conversational HR assistant that can:

- Understand natural language queries about employee requirements
- Perform semantic search across employee profiles
- Generate intelligent recommendations with detailed explanations
- Provide both chat and direct search interfaces

<!-- TOC --><a name="features"></a>

## Features

<!-- TOC --><a name="core-functionality"></a>

### Core Functionality

- **Natural Language Processing**: Ask questions in plain English
- **Semantic Search**: AI-powered employee matching using embeddings
- **RAG System**: Retrieval-Augmented Generation for intelligent responses
- **Real-time Chat**: Interactive conversation interface
- **Employee Search**: Direct search with filtering options
- **Responsive Design**: Works on desktop and mobile devices

<!-- TOC --><a name="technical-features"></a>

### Technical Features

- **Vector Similarity Search**: FAISS-based high-performance search
- **LLM Integration**: Google Gemini for natural language generation
- **Fallback System**: Template-based responses when LLM unavailable
- **Type Safety**: Full TypeScript frontend with type checking
- **Modern UI**: Tailwind CSS with responsive design
- **API Documentation**: Auto-generated FastAPI docs

<!-- TOC --><a name="architecture"></a>

## Architecture

<!-- TOC --><a name="backend-fastapi"></a>

### Backend (FastAPI)

```
app/
├── api/routes/          # REST API endpoints
│   ├── chat.py         # Chat interface endpoint
│   └── employees.py    # Employee search endpoint
├── core/               # Application state
│   └── state.py        # Global state management
├── data/               # Employee dataset
│   └── employees.json  # 20 realistic employee profiles
├── schemas/            # Pydantic models
│   └── models.py       # Request/response schemas
├── services/           # Business logic
│   ├── data_processing.py  # Data loading and processing
│   ├── embeddings.py       # Sentence transformers
│   ├── llm_generation.py   # LLM integration
│   └── vector_store.py     # FAISS vector search
└── main.py             # FastAPI application
```

<!-- TOC --><a name="frontend-react-typescript"></a>

### Frontend (React + TypeScript)

```
frontend/src/
├── components/         # React components
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── EmployeeSearch.tsx   # Search page
│   ├── EmployeeResults.tsx  # Results display
│   ├── MessageBubble.tsx    # Message component
│   ├── LoadingSpinner.tsx   # Loading indicator
│   ├── Navigation.tsx       # App navigation
│   └── About.tsx            # About page
├── services/           # API integration
│   └── api.ts             # HTTP client
├── types/              # TypeScript definitions
│   └── index.ts            # Shared types
└── App.tsx             # Main application
```

<!-- TOC --><a name="quick-start"></a>

## Quick Start

<!-- TOC --><a name="prerequisites"></a>

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn

<!-- TOC --><a name="backend-setup"></a>

### Backend Setup

1. **Install Python dependencies**:

   ```bash
   # Using uv (recommended)
   uv sync

   # Or using pip
   pip install -e .
   ```

2. **Environment Configuration** (optional):
   Create a `.env` file in the project root:

   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

   _Note: The system works without this key using fallback responses_

3. **Start the backend server**:
   ```bash
   uv run fastapi dev app/main.py
   ```
   The API will be available at `http://localhost:8000`

<!-- TOC --><a name="frontend-setup"></a>

### Frontend Setup

1. **Install dependencies**:

   ```bash
   cd frontend
   npm install
   ```

2. **Start the development server**:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:5173`

<!-- TOC --><a name="-api-documentation"></a>

## 📖 API Documentation

<!-- TOC --><a name="endpoints"></a>

### Endpoints

<!-- TOC --><a name="health-check"></a>

#### Health Check

```http
GET /
```

Returns API status information.

<!-- TOC --><a name="employee-search"></a>

#### Employee Search

```http
GET /employees/search?query={search_term}&k={results_count}
```

- `query` (required): Search term
- `k` (optional): Number of results (1-20, default: 3)

**Example**:

```bash
curl "http://localhost:8000/employees/search?query=Python%20developers&k=3"
```

<!-- TOC --><a name="chat-interface"></a>

#### Chat Interface

```http
POST /chat
Content-Type: application/json

{
  "query": "Find Python developers with 3+ years experience",
  "k": 5
}
```

**Example**:

```bash
curl -X POST "http://localhost:8000/chat" \
  -H "Content-Type: application/json" \
  -d '{"query": "Find Python developers with 3+ years experience", "k": 5}'
```

<!-- TOC --><a name="interactive-api-docs"></a>

### Interactive API Docs

Visit `http://localhost:8000/docs` for interactive API documentation.

<!-- TOC --><a name="-user-interface"></a>

## User Interface

<!-- TOC --><a name="chat-interface-"></a>

### Chat Interface (`/`)

- Natural language conversations
- Real-time message history
- Employee result cards with detailed profiles
- Loading states and error handling

<!-- TOC --><a name="search-interface-search"></a>

### Search Interface (`/search`)

- Direct employee search
- Example queries and suggestions
- Detailed result filtering
- Match score indicators

<!-- TOC --><a name="about-page-about"></a>

### About Page (`/about`)

- System overview and features
- Technology stack information
- Example queries and use cases

<!-- TOC --><a name="ai-development-process"></a>

## AI Development Process

<!-- TOC --><a name="ai-tools-used"></a>

### AI Tools Used

- **Cursor AI**: Primary coding assistant for React/TypeScript development
- **ChatGPT**: Architecture planning and problem-solving

<!-- TOC --><a name="ai-assisted-development"></a>

### AI-Assisted Development

- **Frontend Development**: ~40% AI-assisted

  - Component styling with Tailwind CSS
  - TypeScript type definitions

- **Backend Integration**: ~30% AI-assisted

  - As I was more experienced with Node.js, I primarily used AI assistance to understand best practices for structuring a FastAPI project and implementing its error-handling and response mechanisms.
  - Type definitions matching backend schemas
  - Error handling and response processing

- **Architecture Decisions**: AI-assisted planning
  - AI assisted me in outlining a clear roadmap for implementing RAG using sentence transformers and FAISS, helping me navigate the initial learning curve and understand the key steps involved.

<!-- TOC --><a name="manual-implementation"></a>

### Manual Implementation

- Complex business logic for employee data parsing
- Custom styling adjustments for better UX
- Performance optimizations and error edge cases

<!-- TOC --><a name="ai-generated-solutions"></a>

### AI-Generated Solutions

- **Smart Employee Parsing**: AI helped create regex patterns to extract employee information from sentence format
- **Type Safety**: AI generated comprehensive TypeScript interfaces

<!-- TOC --><a name="-technical-decisions"></a>

## 🔧 Technical Decisions

<!-- TOC --><a name="technology-choices"></a>

### Technology Choices

<!-- TOC --><a name="backend"></a>

#### Backend

- **FastAPI**: Chosen for automatic API documentation, async support, and type safety
- **SentenceTransformers**: Selected for high-quality embeddings with reasonable performance
- **FAISS**: Chosen for fast vector similarity search in production environments
- **Google Gemini**: Selected for natural language generation with good fallback options

<!-- TOC --><a name="frontend"></a>

#### Frontend

- **React 19**: Latest version for modern features and performance
- **TypeScript**: Type safety and better developer experience
- **Tailwind CSS**: Utility-first approach for rapid UI development
- **React Router**: Client-side routing for SPA experience
- **Axios**: Reliable HTTP client with good error handling

<!-- TOC --><a name="trade-offs-considered"></a>

### Trade-offs Considered

<!-- TOC --><a name="llm-vs-template-responses"></a>

#### LLM vs Template Responses

- **Chosen**: Hybrid approach with LLM + fallback templates
- **Reason**: Ensures system works even without API keys, provides consistent quality

<!-- TOC --><a name="local-vs-cloud-llm"></a>

#### Local vs Cloud LLM

- **Chosen**: Cloud-based Gemini API
- **Reason**: Better performance, easier setup, cost-effective for this scale. I also have Google Cloud credits, which makes it even more economical.

<!-- TOC --><a name="vector-database-vs-in-memory"></a>

#### Vector Database vs In-Memory

- **Chosen**: FAISS in-memory for simplicity
- **Reason**: Small dataset size, fast startup, no external dependencies

<!-- TOC --><a name="sample-data"></a>

## Sample Data

The system includes 20 realistic employee profiles with:

- Diverse skill sets (Python, React, Java, ML, DevOps, etc.)
- Varied experience levels (2-7 years)
- Different project backgrounds (healthcare, e-commerce, banking, etc.)
- Availability status tracking

**Example Employee**:

```json
{
  "id": 1,
  "name": "Aarav Sharma",
  "skills": ["Python", "Django", "PostgreSQL", "AWS"],
  "experience_years": 5,
  "projects": ["E-commerce Platform", "Healthcare Analytics"],
  "availability": "available"
}
```

<!-- TOC --><a name="example-interactions"></a>

## Example Interactions

<!-- TOC --><a name="query-find-python-developers-with-3-years-experience"></a>

### Query: "Find Python developers with 3+ years experience"

**RAG Process**:

1. **Retrieval**: Semantic search finds employees with Python skills and 3+ years
2. **Augmentation**: Combines employee profiles with query context
3. **Generation**: Creates natural language recommendation

**Response**:

```
Based on your requirements for Python developers with 3+ years experience,
I found 2 excellent candidates:

Aarav Sharma would be perfect for this role. He has 5 years of experience
with Python, Django, PostgreSQL, and AWS, having successfully worked on
projects like E-commerce Platforms and Healthcare Analytics. He is currently
available and has strong backend development expertise.

Nisha Choudhary is another strong candidate with 5 years of experience.
She specializes in Data Science with Python, R, and Power BI, having worked
on Customer Segmentation and Sales Forecasting projects. She's currently
available and brings analytical expertise to the team.
```

<!-- TOC --><a name="-future-improvements"></a>

## Future Improvements

<!-- TOC --><a name="short-term-enhancements"></a>

### Short-term Enhancements

- [ ] Add employee filtering by availability status
- [ ] Implement search result sorting options
- [ ] Create saved search functionality

<!-- TOC --><a name="long-term-features"></a>

### Long-term Features

- [ ] Implement user authentication and role-based access
- [ ] Add employee profile editing capabilities
- [ ] Add team formation suggestions

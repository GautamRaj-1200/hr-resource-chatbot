# HR Resource Chatbot - Frontend

A modern React frontend for the HR Resource Chatbot, built with TypeScript, Tailwind CSS, and React Router.

## Features

- **Chat Interface**: Natural language conversations with the HR assistant
- **Employee Search**: Direct search functionality with detailed results
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time API Integration**: Connects to the FastAPI backend
- **Type Safety**: Full TypeScript implementation

## Tech Stack

- **React 19** - Modern UI framework
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client for API communication
- **Vite** - Fast build tool and dev server

## Setup

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Configure API URL** (optional):
   Create a `.env` file in the frontend directory:

   ```env
   VITE_API_URL=http://localhost:8000
   ```

   Default is `http://localhost:8000`

3. **Start development server**:

   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── components/          # React components
│   ├── ChatInterface.tsx    # Main chat interface
│   ├── EmployeeSearch.tsx   # Employee search page
│   ├── EmployeeResults.tsx  # Employee results display
│   ├── MessageBubble.tsx    # Individual message component
│   ├── LoadingSpinner.tsx   # Loading indicator
│   ├── Navigation.tsx       # App navigation
│   └── About.tsx            # About page
├── services/           # API services
│   └── api.ts             # API client and endpoints
├── types/              # TypeScript type definitions
│   └── index.ts            # Shared types
├── App.tsx             # Main app component
└── main.tsx            # App entry point
```

## API Integration

The frontend communicates with the FastAPI backend through:

- **Chat Endpoint**: `POST /chat` - Send natural language queries
- **Search Endpoint**: `GET /employees/search` - Direct employee search
- **Health Check**: `GET /` - API status

## Pages

1. **Chat** (`/`) - Main chat interface for natural language queries
2. **Search** (`/search`) - Direct employee search with filters
3. **About** (`/about`) - Information about the system and features

## Development

- **Hot Reload**: Changes are reflected immediately during development
- **Type Checking**: TypeScript provides compile-time error checking
- **Linting**: ESLint configuration for code quality
- **Formatting**: Prettier integration for consistent code style

## Deployment

The app can be deployed to any static hosting service:

1. Build the project: `npm run build`
2. Deploy the `dist/` folder to your hosting service
3. Ensure the backend API is accessible from the frontend domain

import React from "react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            About HR Resource Chatbot
          </h1>
          <p className="text-gray-600">
            Intelligent employee search powered by AI
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="prose max-w-none">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-gray-700 mb-6">
              Our HR Resource Chatbot uses advanced AI technology to help you
              find the perfect employees for your projects. It combines natural
              language processing with semantic search to understand your
              requirements and match them with our employee database.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Natural Language Queries
                </h3>
                <p className="text-sm text-gray-600">
                  Ask questions in plain English like "Find Python developers
                  with 3+ years experience"
                </p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">2</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Semantic Search
                </h3>
                <p className="text-sm text-gray-600">
                  AI-powered search that understands context and meaning, not
                  just keywords
                </p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">3</div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  Smart Recommendations
                </h3>
                <p className="text-sm text-gray-600">
                  Get detailed employee profiles with skills, experience, and
                  project history
                </p>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Technology Stack
            </h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Backend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• FastAPI - Modern Python web framework</li>
                  <li>
                    • SentenceTransformers - AI embeddings for semantic search
                  </li>
                  <li>• FAISS - High-performance vector similarity search</li>
                  <li>• Google Gemini - LLM for natural language generation</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Frontend</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• React 19 - Modern UI framework</li>
                  <li>• TypeScript - Type-safe development</li>
                  <li>• Tailwind CSS - Utility-first styling</li>
                  <li>• Axios - HTTP client for API communication</li>
                </ul>
              </div>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Features
            </h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ Natural language employee search</li>
                <li>✅ Semantic matching based on skills and experience</li>
                <li>✅ Project-based employee discovery</li>
                <li>✅ Availability status tracking</li>
                <li>✅ Detailed employee profiles</li>
              </ul>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>✅ Real-time chat interface</li>
                <li>✅ Advanced filtering options</li>
                <li>✅ Match score indicators</li>
                <li>✅ Responsive design</li>
                <li>✅ RESTful API integration</li>
              </ul>
            </div>

            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Example Queries
            </h2>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• "Find Python developers with 3+ years experience"</li>
                <li>• "Who has worked on healthcare projects?"</li>
                <li>• "Suggest people for a React Native project"</li>
                <li>• "Find developers who know both AWS and Docker"</li>
                <li>• "Need someone with machine learning experience"</li>
                <li>• "Who is available for a new project?"</li>
              </ul>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">
                Ready to Get Started?
              </h3>
              <p className="text-sm text-blue-800">
                Try our chat interface for natural conversations or use the
                search page for direct queries. The system will help you find
                the perfect match for your project requirements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

import React, { useState } from "react";
import { chatService } from "../services/api";
import type { SearchResult } from "../types";
import EmployeeResults from "./EmployeeResults";
import LoadingSpinner from "./LoadingSpinner";

const EmployeeSearch: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const response = await chatService.searchEmployees(query.trim(), 5);
      setResults(response.results);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Employee Search
          </h1>
          <p className="text-gray-600">
            Search for employees by skills, experience, or projects
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <form onSubmit={handleSearch} className="flex space-x-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Python developers, React experience, healthcare projects..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Search
            </button>
          </form>
        </div>

        {/* Results */}
        {isLoading && (
          <div className="flex justify-center py-8">
            <LoadingSpinner />
          </div>
        )}

        {hasSearched && !isLoading && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {results.length > 0 ? (
              <EmployeeResults results={results} />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No employees found matching your search criteria.
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  Try different keywords or be more specific.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Example Queries */}
        {!hasSearched && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Example Queries
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">By Skills</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Python developers</li>
                  <li>• React experience</li>
                  <li>• AWS and Docker</li>
                  <li>• Machine learning</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium text-gray-700">By Experience</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 5+ years experience</li>
                  <li>• Senior developers</li>
                  <li>• Healthcare projects</li>
                  <li>• E-commerce experience</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeeSearch;

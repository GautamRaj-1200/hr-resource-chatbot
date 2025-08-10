import React from "react";

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 text-gray-600">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      <span className="text-sm">Finding employees...</span>
    </div>
  );
};

export default LoadingSpinner;

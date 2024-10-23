import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col p-4 border rounded-lg shadow-lg max-w-sm mx-auto animate-pulse">
      <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-2/4 mb-4"></div>
      <div className="h-10 bg-gray-300 rounded w-1/2"></div>
    </div>
  );
};

export default Loader;

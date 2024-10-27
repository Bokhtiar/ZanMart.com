import React from 'react';

const SingleCartSkeleton = () => {
  return (
    <div className="w-full h-fit rounded-[15px] shadow-lg animate-pulse">
      <div className="overflow-hidden w-full bg-gray-300 rounded-t-[15px] h-40"></div>
      <div className="p-2">
        <div className="bg-gray-300 h-4 w-3/4 rounded mb-2"></div>
        <div className="bg-gray-300 h-3 w-1/2 rounded mb-1"></div>
        <div className="flex items-center justify-between">
          <div className="bg-gray-300 h-6 w-1/4 rounded"></div>
          <div className="bg-gray-300 h-4 w-1/6 rounded line-through"></div>
          <div className="bg-gray-300 h-6 w-6 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SingleCartSkeleton;

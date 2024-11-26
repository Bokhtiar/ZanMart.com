import React from 'react';

const ProductSkeleton = () => {
  return (
    <div className="mt-36 animate-pulse">
      {/* Product Banner Skeleton */}
      <div className="text-center py-10">
        <div className="bg-gray-300 h-10 w-48 mx-auto mb-4 rounded"></div>
        <div className="bg-gray-200 h-6 w-64 mx-auto rounded"></div>
        <div className="flex justify-center gap-2 py-10">
          {Array(3).fill(0).map((_, index) => (
            <div key={index} className="bg-gray-300 h-10 w-24 rounded"></div>
          ))}
        </div>
      </div>

      <div className="flex container mx-auto items-start gap-10 w-full">
        {/* Sidebar Skeleton */}
        <div className="w-1/4 hidden lg:flex md:flex flex-col mt-24">
          {/* Price Range Skeleton */}
          <div className="mb-6">
            <div className="bg-gray-300 h-6 w-32 mb-4 rounded"></div>
            <div className="flex items-center gap-5 mb-4">
              <div className="bg-gray-200 h-8 w-16 rounded"></div>
              <hr className="w-5 border-gray-300" />
              <div className="bg-gray-200 h-8 w-16 rounded"></div>
            </div>
            <div className="relative w-48 h-2 bg-gray-300 rounded mb-4"></div>
            <div className="bg-gray-300 h-10 w-24 rounded"></div>
          </div>

          {/* Attributes and Colors Skeleton */}
          <div className="space-y-6">
            {Array(2).fill(0).map((_, i) => (
              <div key={i}>
                <div className="bg-gray-300 h-6 w-32 mb-4 rounded"></div>
                {Array(3).fill(0).map((_, j) => (
                  <div key={j} className="flex items-center gap-2 py-1">
                    <div className="bg-gray-300 h-4 w-4 rounded-full"></div>
                    <div className="bg-gray-200 h-4 w-24 rounded"></div>
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-10 bg-gray-300 h-64 w-full rounded"></div>
        </div>

        {/* Product Grid Skeleton */}
        <div className="w-full">
          {/* Mobile Filter Button Skeleton */}
          <div className="flex lg:hidden md:hidden shadow-custom rounded-lg justify-between p-2 mb-2">
            <div className="bg-gray-300 h-10 w-10 rounded"></div>
          </div>

          {/* Product Cards Skeleton */}
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:gap-8">
            {Array(8).fill(0).map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg p-4">
                <div className="bg-gray-300 h-48 w-full rounded mb-4"></div>
                <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
                <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

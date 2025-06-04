import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="container-custom px-2 pt-5 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Left: Image Skeleton */}
        <div className="flex flex-col gap-5 w-full lg:w-1/2">
          <div className="w-full h-[400px] bg-gray-300 rounded-lg" />
          <div className="flex gap-3 overflow-x-auto">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="h-20 w-20 bg-gray-300 rounded" />
            ))}
          </div>
        </div>

        {/* Right: Info Skeleton */}
        <div className="flex flex-col space-y-4 w-full lg:w-1/2">
          <div className="h-6 bg-gray-300 w-2/3 rounded" />
          <div className="h-20 bg-gray-200 rounded" />
          
          {/* Size Skeleton */}
          <div className="flex items-center gap-3">
            <span className="h-4 w-12 bg-gray-300 rounded" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-6 w-10 bg-gray-300 rounded" />
            ))}
          </div>

          {/* Color Skeleton */}
          <div className="flex items-center gap-3">
            <span className="h-4 w-12 bg-gray-300 rounded" />
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="h-6 w-6 bg-gray-300 rounded-full"
              />
            ))}
          </div>

          {/* Stock and Delivery */}
          <div className="flex justify-between">
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
            <div className="h-4 w-1/3 bg-gray-300 rounded" />
          </div>

          {/* Price Skeleton */}
          <div className="flex gap-4">
            <div className="h-6 w-24 bg-gray-300 rounded" />
            <div className="h-6 w-20 bg-gray-200 rounded" />
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-6">
            <div className="h-8 w-32 bg-gray-300 rounded" />
            <div className="h-5 w-24 bg-gray-200 rounded" />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <div className="h-10 w-full bg-gray-300 rounded-lg" />
            <div className="h-10 w-full bg-gray-300 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="bg-gray-100 mt-4 px-2 py-2 rounded space-y-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 w-full bg-gray-300 rounded" />
        ))}
      </div>

      {/* Related Product Header */}
      <div className="flex items-center justify-between bg-gray-50 px-2 my-2 py-2 rounded">
        <div className="h-6 w-1/3 bg-gray-300 rounded" />
        <div className="flex gap-2">
          <div className="h-6 w-6 bg-gray-300 rounded" />
          <div className="h-6 w-6 bg-gray-300 rounded" />
          <div className="h-6 w-6 bg-gray-300 rounded" />
        </div>
      </div>

      {/* Related Product Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-40 bg-gray-200 rounded" />
        ))}
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;

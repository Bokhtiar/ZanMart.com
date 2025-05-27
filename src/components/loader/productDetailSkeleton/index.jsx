import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="container-custom px-2 mt-36 pt-5 animate-pulse">
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left side: Image skeleton */}
        <div className="flex flex-col gap-4">
          <div className="bg-gray-300 rounded-md w-[400px] h-[400px] lg:w-[540px] lg:h-[540px]" />

          <div className="flex gap-4">
            {Array(4)
              .fill("")
              .map((_, index) => (
                <div
                  key={index}
                  className="bg-gray-300 rounded-md w-20 h-20"
                />
              ))}
          </div>
        </div>

        {/* Right side: Text skeleton */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
          {/* Title Skeleton */}
          <div className="bg-gray-300 h-10 w-3/4 rounded-md" />

          {/* Category Skeleton */}
          <div className="bg-gray-300 h-6 w-1/3 rounded-md mt-4" />

          {/* Size and Color Selectors Skeleton */}
          <div className="flex flex-col gap-3">
            <div className="bg-gray-300 h-6 w-1/4 rounded-md" />
            <div className="flex gap-2">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 h-8 w-16 rounded-md"
                  />
                ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="bg-gray-300 h-6 w-1/4 rounded-md" />
            <div className="flex gap-2">
              {Array(3)
                .fill("")
                .map((_, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 h-8 w-16 rounded-md"
                  />
                ))}
            </div>
          </div>

          {/* Stock and Delivery Info */}
          <div className="flex gap-3">
            <div className="bg-gray-300 h-8 w-24 rounded-md" />
            <div className="bg-gray-300 h-8 w-48 rounded-md" />
          </div>

          {/* Price Skeleton */}
          <div className="flex items-center gap-3">
            <div className="bg-gray-300 h-12 w-28 rounded-md" />
            <div className="bg-gray-300 h-6 w-20 rounded-md" />
          </div>

          {/* Quantity and Add to Cart Skeleton */}
          <div className="flex gap-4 mt-4 items-center">
            <div className="bg-gray-300 h-12 w-1/3 rounded-md" />
            <div className="bg-gray-300 h-12 w-1/4 rounded-md" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;

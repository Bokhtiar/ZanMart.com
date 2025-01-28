import React from 'react';
import Image from "next/image";
const ProductSkeleton = ({count}) => {
  console.log("count", count);
  return (
    <div className={`grid grid-cols-2 md:grid-cols-${count} lg:grid-cols-${count} gap-4 md:gap-4 lg:gap-4`}>
      {[...Array(count)].map((_, index) => (
        <div key={index} className="bg-gray-50 rounded-md p-4 animate-pulse">
          {/* Image Skeleton */}
          <div className="w-full h-42 bg-gray-100 rounded-md mb-4">
            <Image
              height={100}
              width={100}
              className="w-full"
              src="/logo1.png"
              alt="Logo"
            />
          </div>
          {/* Title Skeleton */}
          <div className="h-3 bg-gray-200 rounded-md w-3/4 mb-2"></div>
          {/* Price Skeleton */}
          <div className="h-2 bg-gray-200 rounded-md w-1/2"></div>
        </div>
      ))}
    </div>
  );
};

export default ProductSkeleton;

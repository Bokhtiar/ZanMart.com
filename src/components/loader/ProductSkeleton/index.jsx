import React from 'react';
import Image from "next/image";
const ProductSkeleton = ({count}) => {
  // console.log("count", count);
  return (
    <div className={`grid grid-cols-5 md:grid-cols-${count} lg:grid-cols-${count} gap-4 md:gap-4 lg:gap-4`}>
      {[...Array(count)].map((_, index) => (
          <div className="w-[120px] h-[150px] rounded-lg shadow-lg animate-pulse bg-gray-200 p-2" key={index}>
          {/* Image Skeleton */}
          <div className="w-full h-[80px] bg-gray-300 rounded mb-2"></div>
    
          {/* Title Skeleton */}
          <div className="h-3 bg-gray-300 rounded w-3/4 mb-1"></div>
    
          {/* Category & Rating Skeleton */}
          <div className="h-2 bg-gray-300 rounded w-1/2 mb-1"></div>
          <div className="flex gap-1 mb-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-gray-300 rounded"></div>
            ))}
          </div>
    
          {/* Price & Discount Skeleton */}
          <div className="flex justify-between items-center">
            <div className="h-3 bg-gray-300 rounded w-1/4"></div>
            <div className="h-2 bg-gray-300 rounded w-1/6"></div>
          </div>
        </div>
  
      ))}
    </div>
  );
};

export default ProductSkeleton;

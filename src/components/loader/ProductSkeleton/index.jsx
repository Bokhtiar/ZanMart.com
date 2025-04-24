import React from "react";

const ProductSkeleton = () => {
  const gridCount = 4;
  return (
    <div className=" container-custom animate-pulse w-full">
    <div className="w-full ">
        <div  >
        <div className="flex items-center justify-between bg-gray-50 px-2 my-2 rounded animate-pulse">
          <div className="flex gap-2"> <div  className="h-8 w-8 bg-gray-300 rounded-md"></div>
          <div className="h-8 w-32 bg-gray-300 rounded-md"></div></div>
       
          <div className="flex items-center gap-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-8 w-8 bg-gray-300 rounded-md"></div>
            ))}
          </div>
        </div>
      </div>
          <div
            className={`w-full grid grid-cols-2 gap-1 md:grid-cols-${gridCount} lg:grid-cols-${gridCount} lg:gap-3 md:gap-4 justify-between`}
          ></div>
          {/* Mobile Filter Button Skeleton */}
          <div className="flex lg:hidden md:hidden shadow-custom rounded-lg justify-between p-2 mb-2">
            <div className="bg-gray-300 h-10 w-10 rounded"></div>
          </div>

          {/* Product Cards Skeleton */}
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:gap-8">
            {Array(12)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg p-4">
                  <div className="bg-gray-300 h-48 w-full rounded mb-4"></div>
                  <div className="bg-gray-300 h-6 w-3/4 rounded mb-2"></div>
                  <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
                </div>
              ))}
          </div>
        </div>
    </div>
  );
};

export default ProductSkeleton;

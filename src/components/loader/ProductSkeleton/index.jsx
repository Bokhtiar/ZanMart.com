import React from "react";

const ProductSkeleton = () => {
  const gridCount = 3;
  return (
    <div className=" ">
      <div className=" ">
        <div>
          <div className="flex items-center justify-between bg-gray-50 px-2 my-2 rounded animate-pulse">
            <div className="flex gap-2">
              {" "}
              <div className="h-8 w-8 bg-gray-300 rounded-md"></div>
              <div className="h-8 w-32 bg-gray-300 rounded-md"></div>
            </div>

            {/* <div className="flex items-center gap-2">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="h-8 w-8 bg-gray-300 rounded-md"></div>
            ))}
          </div> */}
          </div>
        </div>
        <div
          className={`grid grid-cols-2 gap-1 md:grid-cols-${gridCount} lg:grid-cols-${gridCount} lg:gap-3 md:gap-4 justify-between`}
        ></div>
        {/* Mobile Filter Button Skeleton */}
        <div className="flex lg:hidden md:hidden shadow-custom rounded-lg justify-between p-2 mb-2">
          <div className="bg-gray-300 h-10 w-10 rounded"></div>
        </div>

        {/* Product Cards Skeleton */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6 md:gap-4">
          {Array(12)
            .fill(0)
            .map((_, index) => (
              <div key={index} className="w-full h-fit rounded-lg shadow-lg animate-pulse bg-white">
                {/* Image Skeleton */}
                <div className="overflow-hidden w-full p-2">
                  <div className="w-full h-40 bg-gray-200 rounded"></div>
                </div>

                {/* Text Content */}
                <div className="p-2 space-y-2">
                  {/* Title */}
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>

                  {/* Category + Rating */}
                  <div className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-gray-200 rounded"></div>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                      <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
                    </div>
                  </div>

                  {/* Price + Discount */}
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-20 bg-gray-200 rounded"></div>
                    <div className="h-3 w-12 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;

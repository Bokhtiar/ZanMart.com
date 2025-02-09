const CartSkeleton = () => {
    return (
      <div>
        {/* Header Skeleton */}
        <div className="flex items-center justify-between bg-gray-100 px-2 mb-3 rounded-md animate-pulse">
          <div className="h-6 w-32 bg-gray-300 rounded"></div>
        </div>
  
        {/* Cart Items Skeleton */}
        <div className="flex flex-col lg:flex-row gap-4 bg-gray-100 p-3">
          <div className="w-full">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col sm:flex-row items-center bg-white shadow-custom2 p-3 rounded-lg gap-3 animate-pulse"
                >
                  <div className="h-24 w-24 bg-gray-300 rounded-lg"></div>
                  <div className="flex-grow">
                    <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
                    <div className="h-3 w-48 bg-gray-300 rounded"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-3 w-12 bg-gray-300 rounded mb-1"></div>
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </div>
                  <div className="text-center">
                    <div className="h-3 w-12 bg-gray-300 rounded mb-1"></div>
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <div className="h-3 w-16 bg-gray-300 rounded mb-1"></div>
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 bg-gray-300 rounded"></div>
                      <div className="h-6 w-6 bg-gray-300 rounded"></div>
                      <div className="h-6 w-6 bg-gray-300 rounded"></div>
                    </div>
                    <div className="h-4 w-16 bg-gray-300 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
  
          {/* Total Summary Skeleton */}
          <div className="w-full lg:w-1/3 p-5 bg-white shadow-custom2 rounded-lg animate-pulse">
            <div className="h-4 w-32 bg-gray-300 rounded mb-4"></div>
            <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded mb-2"></div>
            <hr />
            <div className="h-3 w-full bg-gray-300 rounded mb-2"></div>
            <div className="h-3 w-1/2 bg-gray-300 rounded mb-2"></div>
            <hr />
            <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
            <div className="h-10 w-full bg-gray-300 rounded mt-4"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default CartSkeleton;
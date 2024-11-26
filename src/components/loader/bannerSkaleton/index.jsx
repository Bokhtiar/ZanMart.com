// BannerSkeleton.js
const BannerSkeleton = () => {
    return (
      <div className="relative h-80 bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center h-full space-y-2">
            <div className="w-2/3 h-6 bg-gray-300 rounded-md mx-auto"></div> {/* Title skeleton */}
            <div className="w-1/2 h-4 bg-gray-300 rounded-md mx-auto"></div> {/* Subtext skeleton */}
            <div className="w-24 h-8 bg-gray-300 rounded-full mx-auto"></div> {/* Button skeleton */}
          </div>
        </div>
        <div className="w-full h-full bg-gray-300"></div> {/* Image skeleton */}
      </div>
    );
  };
  
  export default BannerSkeleton;
  
// BannerSkeleton.js
const BannerSkeleton = () => {
    return (
      <div className="flex items-center h-96 bg-gray-100 animate-pulse px-5">
        {/* Left Side Skeletons */}
        <div className="flex-1 space-y-4 px-6">
          {/* Title Skeleton */}
          <div className="w-3/4 h-8 bg-gray-200 rounded-md"></div>
          {/* Subtitle Skeleton */}
          <div className="w-2/3 h-6 bg-gray-200 rounded-md"></div>
          {/* Button Skeleton */}
          <div className="w-32 h-10 bg-gray-200 rounded-full"></div>
        </div>

        {/* Right Side Image Skeleton */}
        <div className="flex-1 h-72 bg-gray-200 rounded-md "></div>
      </div>
    );
  };
  
  export default BannerSkeleton;
  
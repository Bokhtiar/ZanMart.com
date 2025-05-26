// BannerSkeleton.js
const BannerSkeleton = () => {
    return (
      <div className="flex items-center h-96 bg-gray-100 animate-pulse px-5">
        {/* Left Side Skeletons */} 
        {/* Right Side Image Skeleton */}
        <div className="flex-1 h-72 bg-gray-200 rounded-md "></div>
      </div>
    );
  };
  
  export default BannerSkeleton;
  
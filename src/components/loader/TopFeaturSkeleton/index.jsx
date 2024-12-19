// ProductCardSkeleton.js
const TopFeatureSkeleton = () => {
    return (
      <div className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-200 animate-pulse">
        <div className="w-full h-32 bg-gray-300 rounded-md mb-4"></div> {/* Image skeleton */}
        <div className="w-3/4 h-4 bg-gray-300 rounded mb-2"></div> {/* Title skeleton */}
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div> {/* Price skeleton */}
      </div>
    );
  };
  
  export default TopFeatureSkeleton;
  
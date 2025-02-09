const PaginationSkeleton = () => {
    return (
      <div className="flex justify-end">
        <div className="flex gap-2">
          {/* Previous Button Skeleton */}
          <div className="w-10 h-8 bg-gray-300 rounded animate-pulse"></div>
  
          {/* Page Number Skeletons */}
          {[...Array(5)].map((_, index) => (
            <div key={index} className="w-10 h-8 bg-gray-300 rounded animate-pulse"></div>
          ))}
  
          {/* Next Button Skeleton */}
          <div className="w-10 h-8 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>
    );
  };
  
  export default PaginationSkeleton;
  
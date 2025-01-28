import Image from "next/image";
const HomePageCategorySkeletonLoader = () => {
  return (
    <div className="container-custom pb-5 mx-auto bg-gray-50 p-2 mt-10">
      {/* Title Skeleton */}
      <div className="font-bold my-3 md:text-[25px] lg:text-[25px] flex items-center justify-between text-primary">
        <div className="h-8 bg-gray-100 rounded-md w-1/3"></div>{" "}
        {/* Title Skeleton */}
        <div className="h-8 bg-gray-100 rounded-md w-24"></div>{" "}
        {/* Button Skeleton */}
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-4">
        {[...Array(5)].map((_, index) => (
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
    </div>
  );
};

export default HomePageCategorySkeletonLoader;



// BannerSkeleton.js
import Image from "next/image";
const BannerSkeleton = () => {
    return (
      <div className="flex items-center h-96 bg-gray-100 animate-pulse px-5">
        {/* Left Side Skeletons */} 
        {/* Right Side Image Skeleton */}
        <div className="flex-1">
          <Image
            height={400}
            width={400}
            className="h-72 "
            src="/Logo1.png"
            alt="Logo"
          />
        </div>
      </div>
    ); 
  };
  
  export default BannerSkeleton;
  
const ProfileSkeleton = () => {
    return (
      <div className="animate-pulse">
        <div className="flex items-center justify-between bg-gray-100 px-2 mb-3 ">
          <div className="h-8 w-48 bg-gray-300 rounded"></div>
          <div className="h-8 w-24 bg-gray-300 rounded"></div>
        </div>
        <div className="flex flex-col md:flex-row-reverse items-center justify-between bg-gray-100 p-4 rounded-md">
          <div className="flex flex-col justify-center me-20 items-center">
            <div className="h-32 w-32 bg-gray-300 rounded-full"></div>
            <div className="h-6 w-24 bg-gray-300 rounded mt-2"></div>
          </div>
          <div className="w-96 space-y-3">
            <div className="h-6 w-full bg-gray-300 rounded"></div>
            <div className="h-6 w-full bg-gray-300 rounded"></div>
            <div className="h-6 w-full bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default ProfileSkeleton;
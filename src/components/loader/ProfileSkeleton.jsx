import { AiFillEdit } from "react-icons/ai";

const ProfileSkeleton = () => {
    return (
      <div className="space-y-4  animate-pulse">
         <section className="border rounded-lg p-4 flex justify-between">
    <div className="flex gap-2 items-center">
      <div className="h-[70px] w-[70px] bg-gray-300 rounded-full"></div>
      <div>
        <div className="h-4 w-32 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 w-48 bg-gray-300 rounded"></div>
      </div>
    </div>
    <div>
      <button className="text-sm bg-gray-200 px-3 py-1 flex items-center text-gray-500 rounded-lg border">
        <AiFillEdit className="cursor-pointer" /> Edit
      </button>
    </div>
  </section>

  {/* personal info details section */}
  <section className="border rounded-lg p-4 space-y-1.5">
    <h1 className="text-xl text-gray-700 font-medium pb-2.5">Personal Information</h1>
    {[...Array(3)].map((_, index) => (
      <div key={index} className="flex flex-col md:flex-row">
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
        <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
      </div>
    ))}
  </section>

  {/* address list skeleton */}
  <section className="border rounded-lg px-2 pb-4 space-y-2">
    <h1 className="text-xl text-gray-700 font-medium py-3 px-2">Address List</h1>
    {[...Array(2)].map((_, index) => (
      <div key={index} className="space-y-1.5 bg-gray-50 px-2 py-4 rounded-lg text-sm">
        {[...Array(8)].map((_, idx) => (
          <div key={idx} className="flex flex-col md:flex-row">
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    ))}
  </section>
  </div>
  )
  };
  
  export default ProfileSkeleton;
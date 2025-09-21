// BannerSkeleton.js
import Image from "next/image";
const BannerSkeleton = () => {
  return (
    <div className="container-custom shadow-sm ">
      <div className="flex flex-col md:flex-row gap-2">
        {/* Main Swiper Placeholder */}
        <div className="w-full md:w-4/5 bg-[#F5F5F5] rounded-lg overflow-hidden">
          <div className="flex justify-center items-center h-[100px] md:h-[150px] bg-white rounded-lg animate-pulse">
            <Image
              height={400}
              width={400}
              className="h-24 w-24 opacity-30"
              src="/Logo1.png"
              alt="Logo Placeholder"
            />
          </div>
        </div>

        {/* Side Campaign Placeholders */}
        <div className="w-full md:w-2/5 flex flex-row md:flex-col gap-1">
          {[1, 2].map((_, idx) => (
            <div
              key={idx}
              className="bg-[#F5F5F5] rounded-lg overflow-hidden w-1/2 md:w-full"
            >
              <div className="flex justify-center items-center h-[50px] md:h-[75px] bg-white animate-pulse">
                <Image
                  height={400}
                  width={400}
                  className="h-16 w-16 opacity-30"
                  src="/Logo1.png"
                  alt="Logo Placeholder"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSkeleton;
//  <div className="flex items-center h-96 bg-gray-100 animate-pulse px-5">

//       <div className="flex-1">
//         <Image
//           height={400}
//           width={400}
//           className="h-72 "
//           src="/Logo1.png"
//           alt="Logo"
//         />
//       </div>
//     </div>

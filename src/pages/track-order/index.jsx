// import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
// import Link from "next/link";
// import React from "react";
// import { FaShippingFast } from "react-icons/fa";
// import Image from "next/image";

// const TrackOrder = () => {
//   return (
//     <div>
//       <div className="   w-full  mt-40 container-custom  ">
//         <div className="bg-white p-8 rounded-lg shadow-lg text-center  w-full">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-6">
//             <Image
//               height={1000}
//               width={1000}
//               priority
//               className="w-full h-full object-cover"
//               src="/tracking.png"
//               alt=""
//             />

//             <div>
//               <h1 className="text-2xl font-semibold text-gray-800 pb-5">
//                 Track Your Order
//               </h1>
//               <p className="text-sm text-gray-500 mb-6">
//                 Enter your order number below to track your order status.
//               </p>

//               <div className="flex flex-col items-center space-y-4">
//                 <input
//                   className="p-3 rounded-lg border border-gray-300 shadow-sm outline-none md:w-96 w-full focus:ring-2 focus:ring-primary transition duration-200"
//                   type="text"
//                   placeholder="Input Order Number"
//                 />

//                 <div className="mt-5 w-full flex justify-center">
//                   <Link
//                     href="track-order-information"
//                     className="text-white bg-primary py-3 px-12 rounded-lg shadow-md hover:bg-primary-dark focus:ring-4 focus:ring-primary-dark active:bg-primary-dark transition duration-200 flex items-center justify-center gap-3"
//                   >
//                     <FaShippingFast className="text-white text-xl" />
//                     Track
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// // TrackOrder.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
// export default TrackOrder;

import Link from "next/link";
import Image from "next/image";
import { FaShippingFast } from "react-icons/fa";
import React from "react";

const TrackOrder = () => {
  return (
    <div className="min-h-screen md:mt-0   bg-gradient-to-br from-primary via-white to-white flex items-center justify-center py-20 px-4">
      <div className="w-full max-w-6xl rounded-3xl bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden transition-all duration-300 group">
        {/* Floating Icon */}
        <div className="absolute -top-6 -left-6 bg-white rounded-full p-4 shadow-xl z-10">
          <FaShippingFast className="text-primary text-3xl animate-bounce" />
        </div>

        {/* Left Illustration */}
        <div className="w-full md:w-1/2">
          <Image
            src="/tracking.png"
            width={600}
            height={600}
            alt="Track Illustration"
            className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left z-10">
          <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
            Track Your Order
          </h2>
          <p className="text-lg text-gray-600">
            Enter your order number to get the latest status and delivery
            estimate.
          </p>

          <input
            type="text"
            placeholder="e.g. #12345678"
            className="w-full p-4 text-base rounded-xl border-2 border-white bg-white/40 backdrop-blur-md focus:ring-4 focus:ring-primary focus:outline-none shadow-md transition-all duration-300"
          />

          <div className="pt-4">
            <Link
              href="/track-order-information"
              className="inline-flex items-center gap-3 px-8 py-3 rounded-xl text-white bg-gradient-to-r from-primary via-secondary to-secondary shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <FaShippingFast className="text-xl" />
              <span className="text-base font-semibold">Track Now</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;

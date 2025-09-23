import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
import Link from "next/link";
import React from "react";
import { FaShippingFast } from "react-icons/fa";

const TrackOrder = () => {
  return (
    <div>
      <div className=" w-full container-custom ">
        <div className="bg-white rounded-lg shadow-lg text-center  w-full">
          <h1 className="text-2xl font-semibold text-gray-800 pb-5">
            Track Your Order
          </h1>
          <p className="text-sm text-gray-500 mb-6">
            Enter your order number below to track your order status.
          </p>

          <div className="flex flex-col items-center space-y-4">
            <input
              className="p-3 rounded-lg border border-gray-300 shadow-sm outline-none w-64 focus:ring-2 focus:ring-primary transition duration-200"
              type="text"
              placeholder="Input Order Number"
            />

            <div className="mt-5 w-full flex justify-center">
              <Link
                href="track-order-information"
                className="text-white bg-primary py-3 px-12 rounded-lg shadow-md hover:bg-primary-dark focus:ring-4 focus:ring-primary-dark active:bg-primary-dark transition duration-200 flex items-center justify-center gap-3"
              >
                <FaShippingFast className="text-white text-xl" />
                Track
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// TrackOrder.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default TrackOrder;

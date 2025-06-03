import Link from "next/link";
import Image from "next/image";
import { FaShippingFast } from "react-icons/fa";
import React, { useState } from "react";

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("");

  return (
    <div className="flex items-center justify-center py-5">
      <div className="w-full bg-gradient-to-br from-primary via-white to-white max-w-6xl rounded-3xl bg-white/20 backdrop-blur-md shadow-2xl border border-white/30 p-10 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden transition-all duration-300 group">
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
            Enter your order number to get the latest status and delivery estimate.
          </p>

          <input
            type="text"
            placeholder="e.g. #12345678"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="w-full p-4 text-base rounded-xl border-2 border-white bg-white/40 backdrop-blur-md focus:ring-4 focus:ring-primary focus:outline-none shadow-md transition-all duration-300"
          />

          <div className="pt-4">
            <Link
              href={`/track-order-information?orderid=${encodeURIComponent(orderId)}`}
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

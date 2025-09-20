import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { FaCheckCircle, FaGift, FaStar } from "react-icons/fa";

const CongratsPage = () => {
  const router = useRouter();
  const { product } = router.query;

  const productData = product ? JSON.parse(product) : null;
  console.log("productData",productData)

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br  p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 text-center max-w-md w-full relative overflow-hidden">
        {/* Decorative floating icons */}
        <div className="absolute top-4 left-4 text-yellow-400 text-2xl animate-bounce">
          <FaStar />
        </div>
        <div className="absolute top-8 right-6 text-pink-400 text-2xl animate-bounce delay-100">
          <FaGift />
        </div>
        <div className="absolute bottom-4 right-8 text-blue-400 text-2xl animate-bounce delay-200">
          <FaStar />
        </div>

        {/* Main success icon */}
        <FaCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4 animate-pulse" />

        <h1 className="text-4xl font-bold text-gray-800 mb-2">Congratulations!</h1>
        <p className="text-gray-600 mb-6">Your order has been successfully placed.</p>

        {/* Product info card */}
        {productData && (
          <div className="bg-green-50 border  border-green-200 rounded-xl p-2 mb-6 flex flex-col items-center gap-3 shadow-inner">
            {productData.thumbnail_image && (
              <div className="w-32 h-32 relative">
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${productData.thumbnail_image}`}
                  alt={productData.title}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            )}
            <p className="font-semibold text-lg text-gray-700">{productData.title}</p>
            {productData.flat_discount && (
              <p className="text-xl font-bold text-green-600">
                Discounted Price: ৳ {productData.flat_discount}
              </p>
            )}
          </div>
        )}

        {/* Continue Shopping Button */}
        <Link href="/products">
          <button className="bg-green-600 text-white px-8 py-3 rounded-xl hover:bg-green-700 transition text-lg font-medium flex items-center justify-center gap-2 mx-auto">
            Continue Shopping <FaGift />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CongratsPage;

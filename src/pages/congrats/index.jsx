import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { AiFillCheckCircle } from "react-icons/ai";
import Link from "next/link";
import RefundModal from "@/components/termAndConiton/Refund";

const CongratsPage = () => {
  const [showRefund, setShowRefund] = useState(false);
  const router = useRouter();
  const { productTitle, productImage, quantity, total } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 -mt-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full text-center">
        {/* Success Icon */}
        <AiFillCheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
          Your order has been received. Thank you for staying with us.
        </h2>

        {/* Product Info */}
        {productImage && (
          <div className="flex justify-center mb-4">
            <Image
              src={productImage}
              alt={productTitle}
              width={120}
              height={120}
              className="rounded"
            />
          </div>
        )}
        {productTitle && (
          <p className="font-semibold text-lg mb-1">
            {productTitle} x {quantity}
          </p>
        )}
        {total && (
          <p className="text-gray-700 font-bold mb-4">Total: ৳ {total}</p>
        )}

        {/* Policy text */}
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          For defective products, we provide a return facility. Please report
          the issue within 7 days to get a replacement or refund. To learn more,
          visit our{" "}
          <p onClick={() => setShowRefund(true)} className="text-blue-600 underline">
            Return Policy
          </p>
          .
        </p>

        <RefundModal showRefund={showRefund} setShowRefund={setShowRefund} />

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          <Link
            href="/"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-semibold transition"
          >
            Go back home
          </Link>
          <Link
            href="/order-details"
            className="border bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md font-semibold text-white transition"
          >
            Check order details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CongratsPage;

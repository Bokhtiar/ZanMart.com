import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";

const CongratsPage = () => {
  const router = useRouter();
  const { productTitle, productImage, quantity, total } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-xl shadow-lg p-8 text-center max-w-md w-full">
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Congratulations!</h1>
        <p className="text-gray-600 mb-6">
          Your order has been successfully placed.
        </p>

        {/* Product Info */}
        {productTitle && (
          <div className="flex flex-col items-center gap-3 mb-6">
            {productImage && (
              <div className="w-32 h-32 relative">
                <Image
                  src={productImage}
                  alt={productTitle}
                  fill
                  className="object-contain rounded"
                />
              </div>
            )}
            <p className="font-semibold text-lg">{productTitle}</p>
            <p>Quantity: {quantity}</p>
            <p className="font-bold text-primary">Total: ৳ {total}</p>
          </div>
        )}

        <Link href="/products">
          <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CongratsPage;

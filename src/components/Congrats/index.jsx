import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";

const CongratsPage = () => {
  const router = useRouter();
  const { productTitle, productImage, quantity, total } = router.query;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl w-full text-center">
        {/* Title */}
        <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
          আপনার অর্ডারটি গ্রহণ করা হয়েছে। আমাদের সাথে থাকার জন্য ধন্যবাদ।
        </h2>

        {/* Sub text */}
        <p className="text-gray-600 mb-2">
          To Track Your Order, Please{" "}
          <Link href="/track-order" className="text-blue-600 underline">
            Click Here
          </Link>
        </p>

        {/* Policy text */}
        <p className="text-gray-500 text-sm mb-6 leading-relaxed">
          কষ্টিপুর্ণ প্রোডাক্টের ক্ষেত্রে রিটার্ন সুবিধা দিচ্ছি আমরা। রিটার্ন
          সুবিধা ৭ দিনের মধ্যে প্রোডাক্টে সমস্যা জানিয়ে বুঝে নিন। ফ্রেশ
          প্রোডাক্ট অথবা রিফান্ড বাইন্ডিং থেকে বিস্তারিত জানতে ভিজিট করুন আমাদের{" "}
          <Link href="/return-policy" className="text-blue-600 underline">
            রিটার্ন নীতিমালা
          </Link>
          ।
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
          >
            Go back home
          </Link>
          <Link
            href="/order-details"
            className="border border-red-600 text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-red-600 hover:text-white transition"
          >
            Check order details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CongratsPage;

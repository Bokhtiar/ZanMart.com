"use client";

import { privateRequest } from "@/config/axios.config";
import { networkErrorHandeller } from "@/utils/helpers";
import Image from "next/image";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { Toastify } from "../toastify";

const ratingLabels = {
  1: "Very Poor",
  2: "Poor",
  3: "Neutral",
  4: "Satisfactory",
  5: "Delightful",
};

const ReviewModal = ({ isOpen, onClose,product }) => {
  const [rating, setRating] = useState(5); // default to 5 stars
  const [comment, setComment] = useState("");
console.log("from modal",product)
  if (!isOpen) return null;

  const handleStarClick = (value) => {
    setRating(value);
  };

  const handleSubmit =async () => {
const payload = {
    product_id: product?.product?.product_id,
    rating,
    comment,
  };
   try {
    const response = await privateRequest.post("user/review", payload);
    if (response.status === 200) {
      Toastify?.Success(response?.data?.message);
        setRating(5); // Reset rating to default
        setComment(""); // Reset comment field
      onClose();
    }   
    } catch (error) {
      networkErrorHandeller(error);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex  items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full max-w-2xl mx-4 p-6 rounded-lg relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-xl"
        >
          &times;
        </button>

        <p className="text-sm text-gray-500 mb-1">Delivered on 17 Nov 2023</p>
        <h2 className="text-lg font-medium mb-4">
          Rate and review purchased product:
        </h2>

        <div className="flex items-center gap-4 mb-3">
          <Image
            height={60}
            width={60}
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${product?.product?.thumbnail_image}`}
            alt="Product"
            className="w-14 h-14 rounded object-cover"
          />
          <div>
            <p className="font-semibold text-gray-800">
           {product?.product?.title}
            </p>
            <p className="text-sm text-gray-600">
               {
                product?.attribute &&  <span className="bg-gray-200 px-1 rounded">{product?.attribute?.name} 
                    </span>
               } { product?.color && <span className="bg-gray-200 px-1 rounded">{product?.color?.name}</span> }
               </p>
          </div>
        </div>

        <div className="flex items-center mb-4">
          {[...Array(5)].map((_, index) => {
            const starValue = index + 1;
            return (
              <button
                key={index}
                type="button"
                onClick={() => handleStarClick(starValue)}
                className={`text-4xl focus:outline-none ${
                  starValue <= rating ? "text-yellow-400" : "text-gray-300"
                }`}
              >
                <FaStar />
              </button>
            );
          })}
          {rating > 0 && (
            <span className="ml-2 text-sm text-gray-600">
              {ratingLabels[rating]}
            </span>
          )}
        </div>

        <textarea
          placeholder="What do you think of this product?"
          className="w-full border  border-gray-300 rounded p-2 mb-4 text-sm resize-none"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <div className="flex items-center my-2 justify-center">
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white rounded-lg px-5 py-2 hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;

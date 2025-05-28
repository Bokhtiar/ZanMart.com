import Modal from "@/components/modal";
import React, { useState } from "react";
import ReviewModal from "./ReviewModal";

const ProductReview = ({ product }) => {
   
  return (
    <div className="  bg-gray-100  px-2 my-2 rounded-md py-2">
      <ReviewModal product={product}></ReviewModal>
    </div>
  );
};

export default ProductReview;

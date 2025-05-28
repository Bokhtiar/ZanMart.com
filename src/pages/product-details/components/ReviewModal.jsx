import React from "react";

const ReviewModal = ({
    children
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full"></div>
    </div>
  );
};

export default ReviewModal;

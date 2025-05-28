import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdClose } from "react-icons/md";

import {
  FaCheckCircle,
  FaFilter,
  FaSortAmountDown,
  FaStar,
} from "react-icons/fa";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";

const RatingBar = ({ count, total, stars }) => {
  const percentage = (count / total) * 100;
  return (
    <div className="flex items-center space-x-2 text-sm">
      <div className="flex text-yellow-500 min-w-[50px]">
        {Array.from({ length: 5 }, (_, i) =>
          i < stars ? (
            <FaStar key={i} className="w-4 h-4" />
          ) : (
            <FaStar key={i} className="w-4 h-4 text-gray-200" />
          )
        )}
      </div>
      <div className="flex-1 h-2 bg-gray-200 rounded">
        <div
          className="h-full bg-yellow-500 rounded"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-gray-600 w-10 text-right">{count}</div>
    </div>
  );
};

const ReviewModal = ({ product = {} }) => {
  const [filterRating, setFilterRating] = useState("all");
  const [count, setCount] = useState({ count: 1, open: false });
  const [singleValue,setSingleValue] = useState(0);
  const [open,setOpen] = useState(false);
  const filterFunction = (num) =>
    product?.review?.filter((item) => item?.rating === num).length;
  const ratings = [
    { stars: 5, count: filterFunction(5) },
    { stars: 4, count: filterFunction(4) },
    { stars: 3, count: filterFunction(3) },
    { stars: 2, count: filterFunction(2) },
    { stars: 1, count: filterFunction(1) },
  ];
  const totalRatings = product?.review?.length;
  const filteredReviews =
    filterRating === "all"
      ? product?.review
      : product?.review?.filter(
          (review) => review?.rating === Number(filterRating)
        );
  if (!product?.review) return;
  return (
    <div className="max-w-6xl mx-auto p-4  bg-gray-50">
      {/* Ratings Section */}
      <div className="bg-white rounded shadow">
        <h1 className="text-lg sm:text-xl font-semibold text-gray-800 text-start bg-gray-100 p-2">
          Ratings & Reviews of {product?.title}
        </h1>
        <div className="flex flex-wrap p-4 justify-between mt-4">
          <div className="flex flex-col items-center w-full sm:w-1/3 mb-4">
            <p className="text-4xl font-bold text-yellow-500">
              {Number(product?.rating).toFixed(1)}{" "}
              <span className="text-gray-300">/5</span>
            </p>
            <div className="flex text-yellow-500 mt-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-xl" />
              ))}
            </div>
            <span className="text-sm text-gray-600 mt-1">
              {totalRatings} Ratings
            </span>
          </div>
          <div className="flex-1 md:w-1/2 space-y-2">
            {ratings.map(({ stars, count }) => (
              <RatingBar
                key={stars}
                count={count}
                total={totalRatings}
                stars={stars}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Filter and Sort */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-y border-gray-300 px-4 py-4 bg-white">
        {/* Title */}
        <h2 className="font-semibold text-gray-800 text-lg">Product Reviews</h2>

        {/* Sort & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600 w-full sm:w-auto">
          {/* Filter */}
          <div className="flex items-center space-x-2 w-full sm:w-auto">
            <label
              htmlFor="starFilter"
              className="text-gray-700 font-medium flex items-center gap-1"
            >
              <FaFilter className="text-gray-600 w-4 h-4" />
              Filter:
            </label>
            <select
              id="starFilter"
              className="border border-gray-300 rounded px-3 py-1.5 text-sm text-gray-800 bg-white hover:border-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full sm:w-auto"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 stars</option>
              <option value="4">4 stars</option>
              <option value="3">3 stars</option>
              <option value="2">2 stars</option>
              <option value="1">1 star</option>
            </select>
          </div>
        </div>
      </div> 
      {/* Filtered Reviews */}
      <ReviewData count={1} filteredReviews={filteredReviews} />
      <ReviewNewModal isOpen={open}  onClose={() => setOpen(false)}>  <ReviewData count={product?.review?.length} filteredReviews={filteredReviews} /></ReviewNewModal>
      <div className="flex justify-center items-center mt-4">
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-full hover:bg-blue-100 transition duration-300"
          title="See more reviews"
        >
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <MdKeyboardDoubleArrowDown className="w-6 h-6 text-blue-600" />
          </motion.div>
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;

const ReviewData = ({ filteredReviews, count }) => {
  return (
    <div>
      {filteredReviews.length > 0 ? (
        filteredReviews.slice(0,count).map((review) => (
          <div
            key={review.id}
            className="bg-white p-4 rounded shadow-sm  border-b my-1"
          >
            <div className="text-sm text-gray-700 space-y-3">
              <div className="flex items-center justify-between  pb-2">
                <span className="font-semibold flex items-center gap-1">
                  {review?.user?.name}
                  <span className="text-green-600 ml-1 inline-flex items-center">
                    <FaCheckCircle className="w-4 h-4 mr-1" />
                    Verified Purchase
                  </span>
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(review?.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex text-yellow-500">
                {Array.from({ length: 5 }, (_, i) => (
                  <FaStar
                    key={i}
                    className={`text-base ${
                      i < review.rating ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <div className="text-justify leading-relaxed">
                {review.comment}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-sm bg-white p-4 rounded">
          No reviews for this rating.
        </p>
      )}
    </div>
  );
};

const ReviewNewModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="relative bg-white w-full max-w-2xl h-2/3 rounded-xl shadow-lg overflow-hidden"
      >
        {/* Close Icon */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition"
        >
          <MdClose className="w-6 h-6" />
        </button>

        {/* Scrollable Content */}
        <div className="h-full overflow-y-auto p-6">{children}</div>
      </motion.div>
    </div>
  );
};

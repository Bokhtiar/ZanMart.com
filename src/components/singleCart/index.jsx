import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

const SingleCart = ({ item, page }) => {
  // Rating calculation
  const renderRating = (rating) => {
    if (!rating) return null;

    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    return (
      <div className="flex items-center gap-1">
        {Array(fullStars)
          .fill(null)
          .map((_, index) => (
            <FaStar key={index} className="text-yellow-500 text-xs" />
          ))}
        {hasHalfStar && <FaStarHalfAlt className="text-yellow-500 text-xs" />}
      </div>
    );
  };

  // Links
  const detailsLink = `/single-product-details/${item?.slug}?id=${item?.product_id}`;
  const orderLink = `/product-details/${item?.slug}${
    page ? `?latest_page=${page}&id=${item?.product_id}` : `?id=${item?.product_id}`
  }`;

  return (
    <div className="w-full rounded-lg shadow-md hover:shadow-lg transition overflow-hidden">
      {/* Card clickable part */}
      <Link href={detailsLink} className="block group">
        {/* Image */}
        <div className="overflow-hidden">
          <Image
            height={400}
            width={400}
            className="w-full object-cover aspect-square transition-transform duration-500 group-hover:scale-110"
            src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.thumbnail_image}`}
            alt={item?.title || "Product Image"}
          />
        </div>

        {/* Content (excluding button) */}
        <div className="p-3 space-y-2">
          {/* Title */}
          <p
            title={item?.title}
            className="text-sm font-medium truncate text-gray-800"
          >
            {item?.title}
          </p>

          {/* Category & Rating */}
          <div className="flex justify-between items-center text-xs text-gray-500">
            <span>{item?.category?.category_name}</span>
            {renderRating(item?.rating)}
          </div>

          {/* Price Section */}
          <div className="flex items-center justify-between">
            {item?.variants?.length ? (
              <span className="text-primary flex items-center text-lg font-semibold">
                <TbCurrencyTaka className="text-gray-600" />
                {Math.ceil(item?.variants[0]?.price || item?.sell_price)}

                {(item?.variants[0]?.discount_price || item?.price) && (
                  <span className="text-gray-400 ms-2 line-through text-sm font-medium flex items-center">
                    <TbCurrencyTaka />
                    {Math.ceil(
                      item?.variants[0]?.discount_price || item?.price
                    )}
                  </span>
                )}
              </span>
            ) : (
              <span className="text-primary flex items-center text-lg font-semibold">
                <TbCurrencyTaka className="text-gray-600" />
                {Math.ceil(item?.sell_price)}

                {parseInt(item?.flat_discount) ? (
                  <span className="text-gray-400 ms-2 line-through text-sm font-medium flex items-center">
                    <TbCurrencyTaka />
                    {Math.ceil(item?.flat_discount)}
                  </span>
                ) : null}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Order Button (separate link) */}
      <div className="px-3 pb-3">
        <Link href={orderLink}>
          <button className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 rounded-md font-medium transition">
            Order Now
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SingleCart;

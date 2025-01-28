import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const SingleCart = ({ item }) => {
  console.log(item);
  return (
    <Link
      href={`/product-details/${item?.product_id}`}
      className="w-full h-fit rounded-lg  shadow-lg "
    >
      <div className="overflow-hidden w-full   p-2 ">
        <Image
          height={400}
          width={300}
          className="w-full object-cover h-40 transition-transform duration-500 hover:scale-125 rounded"
          src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.thumbnail_image}`}
          alt=""
        />
      </div>
      <div className="p-2">
        <p title={item?.title} className="text-xs truncate">
          {item?.title}{" "}
        </p>
        <p className="text-xs font-bold text-secondary flex  justify-between items-center">
          {item?.category?.category_name}
          {item?.rating && (
            <span className="flex justify-start ">
              {item?.rating &&
                Array(Math.floor(item?.rating) - 1)
                  .fill(null)
                  .map((_, index) => (
                    <FaStar key={index} className="text-secondary" />
                  ))}
              {item?.rating % 2 !== 0 ? (
                <FaStar className="text-secondary" />
              ) : (
                <FaStarHalfAlt className="text-secondary" />
              )}
            </span>
          )}
        </p>
        <p className="flex items-center  justify-between ">
          {
            item?.variants? <span className="text-primary flex  items-center text-sm lg:text-xl md:base  font-bold">
            {item?.variants[0]?.price}
            <span className="text-xs font-normal text-gray-500 mt-[5px]">
              Tk
            </span>
          </span>:<span className="text-primary flex  items-center text-sm lg:text-xl md:base  font-bold">
            {item?.sell_price}
            <span className="text-xs font-normal text-gray-500 mt-[5px]">
              Tk
            </span>
          </span>
          }
          {item?.variants? <span className="flex text-secondary text-xs line-through items-center  ">
              {item?.variants[0]?.flat_discount}{" "}
              <span className="text-xs font-normal text-gray-500 mt-[0px]">
                Tk
              </span>
            </span>:<span className="flex text-secondary text-xs line-through items-center  ">
              {item?.flat_discount}{" "}
              <span className="text-xs font-normal text-gray-500 mt-[0px]">
                Tk
              </span>
            </span>}
        </p>
      </div>
    </Link>
  );
};

export default SingleCart;

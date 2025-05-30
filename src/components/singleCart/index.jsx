import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

const SingleCart = ({ item }) => {
  return (
    <Link
      href={`/product-details/${item?.slug}?id=${item?.product_id}`}
      className="w-full h-fit rounded-lg  shadow-lg "
    >
      <div className="overflow-hidden w-full   p-2 aspect-square">
        <Image
          height={400}
          width={4000}
          className="w-full object-cover h-40 transition-transform duration-500 hover:scale-125 rounded"
          src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.thumbnail_image}`}
          alt=""
        />
      </div>
      <div className="p-2">
        <p title={item?.title} className="text-xs truncate ">
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
          {item?.variants?.length ? (
            <span className="text-primary flex  items-center text-sm lg:text-xl md:base  font-bold">
              {Math.ceil(item?.variants[0]?.price || item?.sell_price)}
              <span className="text-xs font-normal text-gray-500 mt-[5px]">
                <TbCurrencyTaka />
              </span>
               <sub className=" text-secondary ms-2 flex  items-center line-through text-sm  md:base  font-bold">
              {Math.ceil(item?.variants[0]?.discount_price || item?.price)}
              <span className="text-xs font-normal  text-gray-500 mt-[5px]">
                <TbCurrencyTaka />
              </span>
            </sub>
            </span>

          ) : (
           <span className="text-primary flex  items-center text-sm lg:text-xl md:base  font-bold">
              {Math.ceil(item?.sell_price)}
              <span className="text-xs font-normal text-gray-500 mt-[5px]">
                <TbCurrencyTaka />
              </span>
               <sub className=" text-secondary ms-2 flex  items-center line-through text-sm  md:base  font-bold">
              {Math.ceil(item?.flat_discount)}
              <span className="text-xs font-normal  text-gray-500 mt-[5px]">
                <TbCurrencyTaka />
              </span>
            </sub>
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default SingleCart;

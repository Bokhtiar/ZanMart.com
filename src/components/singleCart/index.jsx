import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";

const SingleCart = ({ item, page }) => {
  return (
    <Link
      href={`/product-details/${item?.slug}${
        page
          ? `?latest_page=${page}&id=${item?.product_id}`
          : `?id=${item?.product_id}`
      }`}
      className="w-full h-fit rounded-lg  shadow-lg "
    >
      <div className="overflow-hidden w-full   p-2 ">
        <Image
          height={400}
          width={4000}
          className="w-full object-cover aspect-square  transition-transform duration-500 hover:scale-125 rounded"
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
            <span className="text-primary flex  items-center text-lg lg:text-xl   font-semibold">
              <span className="  text-gray-500 ">
                <TbCurrencyTaka />
              </span>
              {Math.ceil(item?.variants[0]?.price || item?.sell_price)}
             
              {(item?.variants[0]?.discount_price || item?.price) && (
                <span className=" text-secondary font-medium ms-2 flex  items-center line-through text-sm lg:text-lg md:base  ">
                
                 <span className="  text-gray-500 ">
                    <TbCurrencyTaka />
                  </span>  {Math.ceil(item?.variants[0]?.discount_price || item?.price)}
                 
                </span>
              )}
            </span>
          ) : (
            <span className="text-primary flex  items-center text-lg lg:text-xl   font-semibold">
               <span className="  text-gray-500 ">
                <TbCurrencyTaka />
              </span>
               {Math.ceil(item?.sell_price)}
            
              {parseInt(item?.flat_discount) ? (
                <span className=" text-secondary ms-2 flex  items-center line-through text-sm  lg:text-xl md:base  font-medium">
                   <span className="  text-gray-500 ">
                    <TbCurrencyTaka />
                  </span> {Math.ceil(item?.flat_discount)}
                
                </span>
              ) : (
                ""
              )}
            </span>
          )}
        </p>
      </div>
    </Link>
  );
};

export default SingleCart;

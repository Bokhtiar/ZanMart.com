import Image from "next/image";
import Link from "next/link";
import React from "react";

const SingleCart = ({ item }) => {
  const { category, sell_price, thumbnail_image, title } = item;

  return (
    <Link
      href={`/product-details/${item.product_id}`}
      className="w-full h-fit rounded-[15px]  shadow-lg "
    >
      <div className="overflow-hidden w-full  rounded-t-[15px] ">
        <Image
          height={400}
          width={300}
          className="w-full object-cover h-40 transition-transform duration-500 hover:scale-125"
          src={`${process.env.NEXT_PUBLIC_API_SERVER}${thumbnail_image}`}
          alt=""
        />
      </div>
      <div className="p-2">
        <p className="text-xs truncate">{title} </p>
        <p className="text-xs font-bold text-secondary py-1">
          {category?.category_name}
        </p>
        <p className="flex items-center  justify-between ">
          <span className="text-primary flex  items-center text-sm lg:text-2xl md:xl  font-bold">
            {sell_price}{" "}
            <span className="text-xs font-normal text-black">tk</span>
          </span>{" "}
          <span className="flex text-secondary text-xs line-through  ">
            {" "}
            100 tk
          </span>{" "}
          {/* <Image
            className=""
            height={24}
            width={24}
            src="/images/shop.svg"
            alt="cart"
          />{" "} */}
        </p>
      </div>
    </Link>
  );
};

export default SingleCart;

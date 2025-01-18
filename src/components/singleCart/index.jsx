import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const SingleCart = ({ item }) => {
  const { category, flat_discount,sell_price, thumbnail_image, title,rating } = item;
  const productVariants = item.product_variants;
  const [variant, setVariant] = useState({
    variantPrice: null,
    variantDiscount: null,
  });
  
  useEffect(() => {
    if (productVariants?.length > 0) {
      setVariant({
        ...variant,
         variantPrice: productVariants[0]?.price,
        variantDiscount: productVariants[0]?.discount_price,
      });
    } else {
      setVariant({
        ...variant,
        variantPrice: sell_price,
        variantDiscount: flat_discount,
      });
    }
  }, [productVariants, sell_price, flat_discount]); // Dependencies to avoid unnecessary re-renders
  console.log(rating)

  return (
    <Link
      href={`/product-details/${item.product_id}`}
      className="w-full h-fit rounded-lg  shadow-lg "
    >
      <div className="overflow-hidden w-full  rounded-lg ">
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
        <p className="text-xs font-bold text-secondary py-1 flex  justify-between items-center">
          {category?.category_name}
       {
        rating &&      <span className="flex justify-start py-2">
        {rating &&
          Array(Math.floor(rating)-1)
            .fill(null)
            .map((_, index) => (
              <FaStar key={index} className="text-secondary" />
            ))}
        {rating % 2 !== 0 ? (
          
          <FaStar className="text-secondary" />
        ) : (
          <FaStarHalfAlt className="text-secondary" />
        )}
      </span>
       }
        </p>
        <p className="flex items-center  justify-between ">
          <span className="text-primary flex  items-center text-sm lg:text-xl md:base  font-bold">
            {variant?.variantPrice}{" "}
            <span className="text-xs font-normal text-black">tk</span>
          </span>{" "}
          {
            flat_discount && <span className="flex text-secondary text-xs line-through  ">
            {" "}
            {flat_discount}
          </span>
          }
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

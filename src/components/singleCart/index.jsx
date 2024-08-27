import Link from 'next/link';
import React from 'react';

const SingleCart = ({ item }) => {
  const { name, category, price, discount_price, image } = item
  return (
    <Link href={`/product-details/${item.id}`} className='w-full  rounded-[15px]  shadow-lg '>
      <div className='overflow-hidden w-full  rounded-t-[15px] '>
        <img
          class="w-full object-cover h-40 transition-transform duration-500 hover:scale-125"
          src={image}
          alt=""
        />
      </div>
      <div className='p-2'>
        <p className='text-xs'>pace International Full Sleeve Striped Men Sweatshirt  </p>
        <p className='text-xs font-bold text-secondary py-1'>{category}</p>
        <p className='flex items-center  justify-between '><span className='text-primary text-2xl  font-bold'>{discount_price} <span className='text-xs font-normal text-black'>tk</span></span> <span className='text-secondary text-xs line-through  '> {price} tk</span> <img src="images/shop.svg" alt="" /> </p>
      </div>
    </Link>

  );
};

export default SingleCart;
import React from 'react';

const ProductsBanner = ({category,subCategory}) => {
    
  return (
    <div className='text-center py-10'>
    <h1 className='font-extrabold text-primary text-4xl py-2'>{category}</h1>
    <p className='font-normal text-xl leading-7'>Choose form the best collections</p>
    <p className='py-10 gap-10 flex justify-center'>
    {
      subCategory.map(sub=> <button className='shadow-lg font-normal rounded-sm py-2  text-xs px-10 '>{sub}</button>)
    }
    </p>
  </div>
  );
};

export default ProductsBanner;
import React from 'react';

const Banner = () => {
    return (
        <div className='relative bg-[#F5F5F5] '>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 '>
                <h1 className='text-primary text-[35px] font-extrabold'>Flat Discount</h1>
                <p className='text-md mb-2'>On the selected items</p>
                <button className='rounded-full btn text-sm bg-primary text-white px-5  py-2'>Shop Now</button>
            </div>
            <img className='w-full bg-cover' src="banner.png" alt="" />
        </div>
    );
};

export default Banner;
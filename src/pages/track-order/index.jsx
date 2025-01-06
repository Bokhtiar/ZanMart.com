import Link from 'next/link';
import React from 'react';

const Trackorder = () => {
  return (
    <div className='mt-36 '>
      <div className='p-5'>
      <h1 className='text-sm font-semibold pb-5'>Order Number</h1>
       <input className='p-2 rounded-lg border outline-none w-64' type="text" placeholder='Input Order Number'/> <br />
      <div className='mt-5'>
      <Link href='track-order-information' className=' text-white bg-primary py-2 px-10 rounded-lg'>Track</Link>
      </div>
      </div>
    </div>
  );
};

export default Trackorder;
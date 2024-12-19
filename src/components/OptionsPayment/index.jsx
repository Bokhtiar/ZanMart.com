import Image from 'next/image';
import React from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';

const OptionsPayment = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold my-10 '>Manage  Your Payment Geteway</h1>
      <hr className='border-2' />
      <div>

  <div className='flex w-full py-4'>

    <p className='w-1/3 text-sm font-bold'>Payment Gateway</p>

    <div className='flex w-full justify-between'>
      <div className='w-1/2 ps-4 text-center'>
        <p className='text-sm font-bold'>Number</p>
      </div>
      <div className='w-1/2 text-center pe-20'>
        <p className='text-sm font-bold'>Expiry Date</p>
      </div>
    </div>
  </div>

  {/* Data Rows */}
  <div className='flex items-center w-full py-2 gap-2'>
    <div className='flex rounded-md justify-between shadow-custom2 items-center w-full p-2 gap-5'>
      {/* Payment Gateway Data */}
      <div className='flex w-1/3 gap-5 items-center'>
        <Image height={200} width={200} className='h-[40px] w-[40px] rounded-lg' src='/images/sneker.svg' alt='Payment Icon' />
        <p className='text-xs font-medium'>Bkash Personal</p>
      </div>

      {/* Number Data */}
      <div className='w-1/3 text-center'>
        <p className='text-xs font-medium'>012454546446</p>
      </div>

      {/* Expiry Date Data */}
      <div className='w-1/3 text-center'>
        <p className='text-xs font-bold'>12 / 02 / 2025</p>
      </div>

      {/* Delete Button */}
      <div className='flex justify-center'>
        <button className='flex font-semibold items-center text-xs gap-2 text-red-700'>
          <RiDeleteBin6Line className='text-lg' /> Delete
        </button>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default OptionsPayment;
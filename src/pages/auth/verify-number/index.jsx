import Link from 'next/link';
import React from 'react';
import { RxAvatar } from 'react-icons/rx';

const VerifyNumber = () => {
  return (
    <div className='container mt-20 sm:mt-36 mx-auto py-6 sm:py-10 flex justify-center'>
      <div className='flex flex-col items-center w-full px-4 sm:px-0'>
        <h1 className='font-semibold text-lg sm:text-2xl text-center pb-4 sm:pb-10'>
          Verify your phone number
        </h1>
        <div className='bg-primary w-full sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center'>
          <h1 className='font-medium text-sm sm:text-base text-white text-center py-6 sm:py-10'>
            We have sent an OTP to your phone number <br />
            <strong>+8801811017801</strong>
          </h1>
          <p className='font-semibold text-sm sm:text-base text-white pb-4 text-center'>
            Enter OTP number*
          </p>
          <div className='flex gap-2 sm:gap-4 justify-center'>
            <input
              className='w-16 sm:w-24 h-16 sm:h-24 text-primary text-center font-bold text-2xl sm:text-3xl rounded-lg'
              type='text'
              size='1'
              placeholder='X'
            />
            <input
              className='w-16 sm:w-24 h-16 sm:h-24 text-primary text-center font-bold text-2xl sm:text-3xl rounded-lg'
              type='text'
              size='1'
              placeholder='X'
            />
            <input
              className='w-16 sm:w-24 h-16 sm:h-24 text-primary text-center font-bold text-2xl sm:text-3xl rounded-lg'
              type='text'
              size='1'
              placeholder='X'
            />
            <input
              className='w-16 sm:w-24 h-16 sm:h-24 text-primary text-center font-bold text-2xl sm:text-3xl rounded-lg'
              type='text'
              size='1'
              placeholder='X'
            />
          </div>

          <div className='flex justify-center'>
            <button className='mt-6 sm:mt-10 text-primary bg-white rounded-lg text-xs sm:text-sm font-bold py-3 sm:py-5 px-12 sm:px-20'>
              Verify
            </button>
          </div>

          <div className='mt-5 text-center'>
            <p className='text-white font-semibold text-xs sm:text-sm'>
            Didn’t get the OTP?
            </p>
            <p className='text-white font-light text-xs sm:text-sm'>
              <button>
                <strong className='font-semibold'> Resend Now</strong>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyNumber;

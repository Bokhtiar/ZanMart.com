import Link from 'next/link';
import React from 'react';

const Register = () => {
  return (
    <div className='container mx-auto py-10 justify-center flex'>
      <div className='items-center flex flex-col'>
        <h1 className='font-semibold text-2xl text-center pb-10 leading-4'>
          Create your Zanmart Account
        </h1>
        <div className='bg-primary w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 lg:p-10 rounded-xl flex flex-col items-center justify-center'>
          <form action='' className='w-full flex flex-col justify-center'>
            <div className='mt-5'>
              <label
                htmlFor='fullName'
                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
              >
                Full Name*
              </label>
              <input
                className='px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg'
                type='text'
                id='fullName'
                placeholder='Enter your full name'
              />
            </div>
            <div className='mt-5'>
              <label
                htmlFor='phoneNumber'
                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
              >
                Phone Number*
              </label>
              <input
                className='px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg'
                type='text'
                id='phoneNumber'
                placeholder='Enter your phone number'
              />
            </div>
            <div className='mt-5'>
              <label
                htmlFor='password'
                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
              >
                Password
              </label>
              <input
                className='px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg'
                type='password'
                id='password'
                placeholder='Enter your password'
              />
            </div>
            <div className='mt-5'>
              <label
                htmlFor='retypePassword'
                className='text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold'
              >
                Re-Type Password
              </label>
              <input
                className='px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg'
                type='password'
                id='retypePassword'
                placeholder='Re-enter your password'
              />
            </div>
            <div className='mt-5'>
              <label
                htmlFor='birthDate'
                className='text-sm px-2 md:px-4 flex pb-3 items-center text-white gap-4 font-semibold'
              >
                Birth Date
              </label>
              <div className='flex gap-2 md:gap-4 lg:gap-5'>
                <input
                  className='px-4 md:px-6 lg:px-10 text-center w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg'
                  type='text'
                  id='birthDay'
                  placeholder='Day'
                />
                <input
                  className='px-4 md:px-6 lg:px-10 text-center w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg'
                  type='text'
                  id='birthMonth'
                  placeholder='Month'
                />
                <input
                  className='px-4 md:px-6 lg:px-10 text-center w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg'
                  type='text'
                  id='birthYear'
                  placeholder='Year'
                />
              </div>
            </div>
            <p className='mt-10 text-white text-md font-normal text-start'>
              By clicking "SIGN UP" I agree to the{' '}
              <strong>Terms of Use</strong> and <strong>Privacy Policy</strong>
            </p>
            <div className='flex justify-center'>
              <button className='mt-10 text-center text-primary bg-white rounded-lg text-xs md:text-sm font-bold py-4 px-16 lg:px-20'>
                SIGN UP
              </button>
            </div>
            <div className='mt-5'>
              <p className='text-white font-semibold text-sm p-4 leading-6 text-center'>
                Forgot password?
              </p>
              <p className='text-white font-light text-sm leading-6 text-center'>
                Already have an account?{' '}
                <Link href='/auth/signin'>
                  <p className='text-sm font-semibold'>Sign In Now</p>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

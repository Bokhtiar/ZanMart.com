import Link from 'next/link';
import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';
import { useForm } from 'react-hook-form';
import {  publicRequest } from '@/config/axios.config';

const ForgotPass = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit =async (data) => {
    console.log(data.contact);
   try {
const response= await publicRequest.post('forgot/password/mail-send',{email:data.contact})
console.log(response)
console.log(data.contact)
   }
   catch(error){

   }
  };

  return (
    <div className='container mt-36 mx-auto py-10 flex justify-center'>
      <div className='flex flex-col items-center'>
        <h1 className='font-semibold text-xl sm:text-2xl text-center pb-6 sm:pb-10 leading-4'>
          Forgot your password?
        </h1>
        <div className='bg-primary w-full sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center justify-center'>
          <div className='w-[80px] h-[80px] sm:w-[110px] sm:h-[110px]'>
            <RxAvatar className='text-white h-full w-full bg-primary' />
          </div>
          <form className='w-full flex flex-col justify-center' onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-5'>
              <label
                htmlFor='contact'
                className='text-sm px-5 flex pb-3 items-center text-white gap-4 font-semibold'
              >
                <FiPhone className='h-5 w-5' />
                Phone Number or E-mail
              </label>
              <input
                className={`px-5 sm:px-14 w-full py-3 sm:py-5 text-sm font-light rounded-lg ${errors.contact ? 'border-red-500' : ''}`}
                type='text'
                placeholder='Enter your phone or Email'
                {...register('contact', { 
                  required: 'Phone number or email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^[0-9]{11}$/,
                    message: 'Please enter a valid email or phone number'
                  }
                })}
              />
              {errors.contact && (
                <p className='text-red-500 text-sm mt-1'>{errors.contact.message}</p>
              )}
            </div>
           
            <div className='flex justify-center'>
              <button type='submit' className='mt-8 sm:mt-10 text-primary bg-white rounded-lg text-xs font-bold py-4 sm:py-5 px-16 sm:px-20'>
                Send OTP
              </button>
            </div>
            <div className='mt-5 text-center'>
              <p className='text-white font-light text-sm leading-6'>
                Don’t have an account?{' '}
                <Link href='/auth/register'>
                  <strong className='text-sm font-semibold'>Sign Up Now</strong>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;

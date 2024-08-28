import React from 'react';
import { MdOutlineLock } from 'react-icons/md';
import { FiPhone } from 'react-icons/fi';
import { RxAvatar } from 'react-icons/rx';
import Link from 'next/link';

const Login = () => {
  return (
    <div className='container mx-auto py-10 justify-center flex  '>
      <div className='   items-center flex flex-col'>
        <h1 className='font-semibold text-2xl text-center pb-10  leading-4 '>Welcome to Zanmart.com Login</h1>
        <div className='bg-primary w-[550px] p-10 rounded-xl flex flex-col items-center justify-center'>
          <div className='w-[110px]  h-[110px]'><RxAvatar className=' text-white h-full w-full bg-primary' /></div>
          <form action="" className='w-full flex flex-col justify-center'>
            <div className='mt-5'>
              <label htmlFor="" className='text-sm  px-5 text-whote flex pb-3 items-center text-white gap-4 font-semibold'> <FiPhone className=' h-5 w-5' ></FiPhone> Phone Number or E-mail </label>
              <input className='px-14 w-full py-5 text-sm font-light rounded-lg' type="text" name="" id="" placeholder='Enter your phone or Email' />

            </div>
            <div className='mt-5'>
              <label htmlFor="" className='text-sm  px-5 text-whote flex pb-3 items-center text-white gap-4 font-semibold'> <MdOutlineLock className=' h-5 w-5' ></MdOutlineLock > Password </label>
              <input className='px-14 w-full py-5 text-sm font-light rounded-lg' type="text" name="" id="" placeholder='Enter your Password' />
            </div>
            <div className='flex justify-center'>
              <button className='mt-10 text-center text-primary bg-white rounded-lg text-xs font-bold py-5 px-20 '>login</button>
            </div>
            <div className='mt-5'>
            <p className=' text-white font-semibold text-sm p-4 leading-6 text-center'>Forgot pasword?</p>
            <p className=' text-white font-light text-sm leading-6 text-center'>Don’t have an account ? <Link href={'/auth/register'} ><strong className='cla
            text-sm font-semibold '>SignUp Now</strong></Link> </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
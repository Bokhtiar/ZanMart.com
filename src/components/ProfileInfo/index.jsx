import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { RiUpload2Fill } from 'react-icons/ri';

const ProfileInfo = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold my-10 '>Manage Your Account</h1>
      <hr className='border-2' />
      <div>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-xl font-semibold py-5'> Personal Profile </h3>
            <p className='flex pb-2 font-medium text-lg '>Name:<span className='flex font-light ps-2 gap-5 items-center'>MD Hasan Miah <AiFillEdit className='text-[#AAAAAA;]' /> </span> </p>
            <p className='flex pb-2 font-medium text-lg '>Phone:<span className='flex font-light ps-2 gap-5 items-center'>+88015683451 <AiFillEdit className='text-[#AAAAAA;]' /> </span> </p>
            <p className='flex pb-2 font-medium text-lg '>Emaol:<span className='flex font-light ps-2 gap-5 items-center'>kalorbap@gmail.com <AiFillEdit className='text-[#AAAAAA;]' /> </span> </p>
            <p className='flex pb-2 font-medium text-lg '>Address:<span className='flex font-light ps-2 gap-5 items-center'>312/GrapTown, Dattapara
              Ashulia, Savar, Dhaka <AiFillEdit className='text-[#AAAAAA;]' /> </span> </p>
          </div>
          <div className=''><div className='flex justify-center  flex-col gap-2'>
            <div className='flex justify-center '>
              <img className='rounded-full  hover:border-2 border-primary  h-24 w-24 ' src='/images/tshirt2.png'></img>
            </div>
            <button className='flex items-center justify-center text-primary gap-2 text-lg leading-4 font-medium'> <RiUpload2Fill /> Upload Photo</button>
          </div></div>
        </div>
        <div className='py-10 flex  gap-10 justify-between'>
          
          <div className='flex flex-row'>
            <p className=' pb-2 font-light items-start flex text-lg'>
              <span className='flex me-2 items-center font-medium whitespace-nowrap'>
                <FaCheckCircle className='text-primary me-5' />
                Promotional Email:
              </span>
            <span>  Get personalized offers on your own email address.</span>
            </p>
          </div>
          <div className='flex flex-row '>
            <p className=' pb-2 font-light items-start flex text-lg'>
              <span className='flex me-2 items-center font-medium whitespace-nowrap'>
                <FaCheckCircle className='text-primary me-5' />
                Promotional SMS: 
              </span>
            <span>  Get personalized offers on your own phone number.</span>
            </p>
          </div>


        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
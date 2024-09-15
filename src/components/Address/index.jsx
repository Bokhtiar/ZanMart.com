import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaCheckCircle, FaPlusCircle } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Address = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold my-10 '>Manage  your address</h1>
      <hr className='border-2' />


      <div>
        <h3 className='text-xl font-semibold py-5'> Delivery Addressd </h3>
        <div className='grid grid-cols-3 justify-between items-center gap-10'>
          <div className=' w-full gap-2 flex'>
            <p className=' pb-2  font-light space-y-2 text-start text-lg  leading-6'>
              <strong className='font-medium  whitespace-nowrap'> Address 1:</strong>
              312/GrapTown, Dattapara, Ashulia, Savar, Dhaka
            </p>
            <AiFillEdit className='text-[#AAAAAA] h-4 w-5' />
          </div>
          <div className='flex w-full justify-center items-end gap-2'>
            <div>
              <p className='flex gap-5 items-center'>
                <FaCheckCircle className='text-primary me-2' /> Default Delivery Address
              </p>
            </div>
          </div>
          <div className='flex justify-center'>
            <div>
              <button className='flex font-semibold items-center text-lg gap-5 text-red-700'>
                <RiDeleteBin6Line className='font-semibold' /> Delete
              </button>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-3 justify-between items-center gap-10'>
          <div className=' w-full gap-2 flex'>
            <p className=' pb-2  font-light space-y-2 text-start text-lg  leading-6'>
              <strong className='font-medium  whitespace-nowrap'> Address 2:</strong>
              312/GrapTown, Dattapara, Ashulia, Savar, Dhaka
            </p>
            <AiFillEdit className='text-[#AAAAAA] h-4 w-5' />
          </div>
          <div className='flex w-full justify-center items-end gap-2'>
            <div>
              <p className='flex gap-5 text-[#AAAAAA] items-center'>
                <FaCheckCircle className='  text-[#AAAAAA] me-2' />Set as Default Delivery Address
              </p>
            </div>
          </div>
          <div className='flex justify-center'>
            <div>
              <button className='flex font-semibold items-center text-lg gap-5 text-red-700'>
                <RiDeleteBin6Line className='font-semibold' /> Delete
              </button>
            </div>
          </div>
        </div>

      </div>
      <button className='flex my-10 items-center gap-2 border-primary border-2 rounded-lg px-5 text-xs py-2 text-primary'><FaPlusCircle />Add New </button>
    </div>
  );
};

export default Address;
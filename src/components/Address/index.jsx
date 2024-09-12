import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { FaCheckCircle } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Address = () => {
  return (
    <div>
      <h1 className='text-2xl font-bold my-10 '>Manage Your Delivery Address</h1>
      <hr className='border-2' />
      <div>
        <div className='flex items-center justify-between'>
          <div>
            <h3 className='text-xl font-semibold py-5'> Delivery Addressd </h3>
            <div className='grid grid-cols-3 justify-between items-center gap-10'>
              <div className=' w-full'>
              <p className='flex pb-2 font-medium text-lg'>
                Address 1:
                <span className='flex font-light ps-2 gap-5 items-center'>
                  312/GrapTown, Dattapara, Ashulia, Savar, Dhaka
                  <AiFillEdit className='text-[#AAAAAA]' />
                </span>
              </p>
              </div>
              <div className='flex w-full  items-end gap-2'>
                <p className='flex items-center'>
                  <FaCheckCircle className='text-primary me-2' /> Default Delivery Address
                </p>
               
              </div>
              <div className=''>
              <button className='flex items-center gap-2 text-red-600'>
                  <RiDeleteBin6Line /> Delete
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Address;
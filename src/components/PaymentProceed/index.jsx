import Link from 'next/link';
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';

const PaymetnProceed = () => {
  return (
    <div>
    <h1 className="text-2xl font-bold my-10">Please Recheck Your Orders </h1>
    <hr className="border-2" />
    <div className="flex gap-2">
      <div className="w-2/3 p-10">
       
      <div className=' w-full gap-2 flex'>
            <p className=' pb-2  font-light space-y-2 text-start text-lg  leading-6'>
              <strong className='font-medium  whitespace-nowrap'> Address 1:</strong>
              312/GrapTown, Dattapara, Ashulia, Savar, Dhaka
            </p>
            <AiFillEdit className='text-[#AAAAAA] h-4 w-5' />
          </div>
      </div>

      {/* Total Summary Section */}
      <div className="w-1/3 py-10">
        <div className="mt-12 shadow-custom2 p-5">
          <p className="text-[8px] text-[#AAAAAA] flex gap-2">
            <IoLocationOutline /> Delivery Location: 312/GrapTown, Dattapara Ashulia, Savar, Dhaka
          </p>
          <p className="text-sm font-bold leading-4 py-5">Total Summary</p>
        {/*   <p className="text-xs font-medium flex justify-between pb-5">
            Subtotal ({Object.keys(selectedItems).filter((key) => selectedItems[key]).length} Items)
            <span>{calculateSubtotal().toFixed(2)} Tk</span>
          </p> */}
          <p className="text-xs font-medium flex justify-between pb-5">
            Delivery Charge <span>150 Tk</span>
          </p>
          <hr className="border" />
          <div className="text-sm font-bold leading-4 py-5 flex justify-between">
            <p>Total</p>
            {/* <p>
              <span className="text-2xl text-primary">{(calculateSubtotal() + 150).toFixed(2)}</span> Tk
            </p> */}
          </div>
          <Link href={'/profile?section=confirm-order'} className="text-sm text-white bg-primary rounded w-full py-2 px-5">
            Proceed To Payment
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PaymetnProceed;
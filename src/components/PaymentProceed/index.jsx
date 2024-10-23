import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';

const PaymetnProceed = () => {
  const [selectedCartItems, setSelectedCartItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('selectedCartItems')) || [];
    setSelectedCartItems(items);
  }, []);

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
          <p>Package Items:</p>
          {selectedCartItems.map((item) => (
            <div key={item?.product_id} className="flex items-center w-full py-2 gap-2">
              <div className="flex rounded-md justify-between items-center w-full p-2 gap-5">
                <div className="flex w-1/3 items-center">
                  <Image height={500} width={500}
                    className="h-[73px] w-[73px] rounded-lg"
                    src={item?.image}
                    alt={item.title}
                  />
                  <div className="pl-3">
                    <p className="text-xs font-medium">{item.title}</p>
                    <p className="font-bold text-[8px] text-[#AAAAAA] flex gap-2">
                      <span className="text-[#FFAA00]">{item.category}</span> color: Black Size: XL
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <p className="py-3 text-center">
                    <span className="text-primary text-2xl font-bold">
                      {(item.sell_price * item.qty).toFixed(2)}
                    </span>
                    tk
                  </p>
                  <p className="text-[#AAAAAA] text-xs line-through">
                    {item.price} tk
                  </p>
                </div>
                <div className='flex flex-col justify-start items-center gap-2'>
                  <p className='text-[8px] text-center font-bold leading-3'>Quantity</p>
                  <p className='text-[8px] items-center justify-center gap-3 font-bold leading-3 flex whitespace-nowrap'>
                    {item.qty}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Summary Section */}
        <div className="w-1/3 py-10">
          <div className="mt-12 shadow-custom2 p-5">
            <p className="text-[8px] text-[#AAAAAA] flex gap-2">
              <IoLocationOutline /> Delivery Location: 312/GrapTown, Dattapara Ashulia, Savar, Dhaka
            </p>
            <p className="text-sm font-bold leading-4 py-5">Total Summary</p>
            <p className="text-xs font-medium flex justify-between pb-5">
              Delivery Charge <span>150 Tk</span>
            </p>
            <hr className="border" />
            <div className="text-sm font-bold leading-4 py-5 flex justify-between">
              <p>Total</p>
              <p>{selectedCartItems.reduce((acc, item) => acc + item.sell_price * item.qty, 0) + 150} Tk</p>
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

import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';

const Orders = () => {
  const initialData = [
    {
      id: 10,
      name: "Bluetooth Speaker",
      category: "Electronics",
      price: 99.99,
      discount_price: 79.99,
      image: "/images/tshirt2.png",
      colors: ["black", "blue", "red"],
      stock: 60,
      selected: false,
      quantity: 1,
      status: "delivered",
    },
    {
      id: 11,
      name: "Bluetooth Speaker fgfgfgd  fhgsg",
      category: "Electronics",
      price: 99.99,
      discount_price: 79.99,
      image: "/images/tshirt2.png",
      colors: ["black", "blue", "red"],
      stock: 60,
      selected: false,
      quantity: 1,
      status: "shipped",
    },
    {
      id: 12,
      name: "Laptop",
      category: "Electronics",
      price: 599.99,
      discount_price: 549.99,
      image: "/images/sneker.svg",
      colors: ["black", "silver"],
      stock: 20,
      selected: false,
      quantity: 1,
      status: "toReceive",
    },
  ];

  const [data, setData] = useState(initialData);
const [selectedStatus,setSelectedStatus]=useState('')
  const handleStatus = (status) => {
    setSelectedStatus(status)
    if (status === '') {
      setData(initialData); 
    } else {
      const filteredData = initialData.filter((item) => item.status === status);
      setData(filteredData);
    }
  };

  return (
    <div>
      <h1 className='text-2xl font-bold my-10'>Manage your Orders</h1>
      <hr className='border-2' />
      <div className='flex gap-2'>
        <div className='w-full p-10'>
          <div className='flex gap-12'>
            <button onClick={() => handleStatus('')} className={`${selectedStatus===''? 'text-primary':''} text-sm leading-4 font-semibold`}>
              All Orders
            </button>
            <button onClick={() => handleStatus('toReceive')} className={`${selectedStatus==='toReceive'? 'text-primary':''} text-sm leading-4 font-semibold`}>
              To Receive
            </button>
            <button onClick={() => handleStatus('shipped')} className={`${selectedStatus==='shipped'? 'text-primary':''} text-sm leading-4 font-semibold`}>
              Shipped
            </button>
            <button onClick={() => handleStatus('delivered')} className={`${selectedStatus==='delivered'? 'text-primary':''} text-sm leading-4 font-semibold`}>
              Delivered
            </button>
          </div>
          <div className='py-5'>
            <div className='flex flex-col items-center'>
              {data.map((item) => (
                <div key={item.id} className='flex items-center w-full py-2 gap-2'>
                  <div className='flex rounded-md justify-between shadow-custom2 items-center w-full p-2 gap-5'>
                    <div className='flex w-1/3 items-center'>
                      <img className='h-[73px] w-[73px] rounded-lg' src={item.image} alt={item.name} />
                      <div className='pl-3'>
                        <p className='text-xs font-medium'>{item.name}</p>
                        <p className='font-bold text-[8px] text-[#AAAAAA] flex gap-2'>
                          <span className='text-[#FFAA00]'>{item.category}</span> color: Black Size: XL
                        </p>
                        <button
                          disabled
                          className='text-[6px] px-2 py-1 font-bold border text-primary rounded-md flex items-center gap-1'
                        >
                          <IoMdCheckmarkCircleOutline className='h-[7px] w-[7px]' /> Cash on Delivery Available
                        </button>
                      </div>
                    </div>
                    <div className='flex flex-col justify-start items-center'>
                      <p className='py-3 text-[8px] text-center'>Price</p>
                      <p className='text-xs font-semibold'>
                        {(item.discount_price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className='flex flex-col justify-start items-center gap-2'>
                      <p className='text-[8px] text-center font-bold leading-3'>Quantity</p>
                      <p className='text-[8px] items-center justify-center gap-3 font-bold leading-3 flex whitespace-nowrap'>
                        {item.quantity}
                      </p>
                    </div>
                    <div>
                      <p className={`${item.status === 'delivered' ? 'bg-green-500' : 'bg-primary'} w-36 text-center rounded-md py-2 px-5 text-white`}>
                        {item.status === 'toReceive' ? 'To Receive' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;

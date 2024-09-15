import React, { useState } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';

const MyCart = () => {
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
      quantity: 1, // Added quantity state for each item
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
    },
    // Add other items similarly
  ];

  const [data, setData] = useState(initialData);
  const [selectAll, setSelectAll] = useState(false); // State for "Select All"

  // Handle "Select All" functionality
  const handleSelectAll = () => {
    const updatedData = data.map((item) => ({ ...item, selected: !selectAll }));
    setData(updatedData);
    setSelectAll(!selectAll);
  };

  // Handle individual item selection
  const handleItemSelect = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    setData(updatedData);

    // If all items are selected, set "Select All" to true
    const allSelected = updatedData.every((item) => item.selected);
    setSelectAll(allSelected);
  };

  // Handle quantity increment
  const handleIncrease = (id) => {
    const updatedData = data.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setData(updatedData);
  };

  // Handle quantity decrement
  const handleDecrease = (id) => {
    const updatedData = data.map((item) =>
      item.id === id && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
    );
    setData(updatedData);
  };

  // Calculate the total summary
  const calculateSubtotal = () => {
    return data.reduce((acc, item) => acc + item.discount_price * item.quantity, 0);
  };

  return (
    <div>
      <h1 className='text-2xl font-bold my-10'>Manage your Cart</h1>
      <hr className='border-2' />
      <div className='flex gap-2'>
        <div className='w-2/3 p-10'>
          <div className='flex justify-between'>
            <p className='flex font-semibold items-center gap-5 text-sm'>
              <input
                type="checkbox"
                checked={selectAll}
                onChange={handleSelectAll}
              />
              Select All
            </p>
            <button className='flex font-semibold items-center text-sm gap-5 text-red-700'>
              <RiDeleteBin6Line className='font-semibold' /> Delete
            </button>
          </div>
          <div className='py-5'>
            <div className='flex flex-col items-center'>
              {data.map((item) => (
                <div key={item.id} className='flex items-center w-full py-2 gap-2'>
                  <div>
                    <input
                      type="checkbox"
                      checked={item.selected}
                      onChange={() => handleItemSelect(item.id)}
                    />
                  </div>
                  <div className='flex rounded-md justify-between shadow-custom2 items-center w-full p-2 gap-5'>
                    <div className='flex justify-start'>
                      <img className='h-[73px] w-[73px] rounded-lg' src={item.image} alt={item.name} />
                    </div>
                    <div className='w-fit'>
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
                    <div className='flex flex-col items-center'>
                      <p className='py-3 text-center'>
                        <span className='text-primary text-2xl font-bold'>
                          {(item.discount_price * item.quantity).toFixed(2)}
                        </span>
                        tk
                      </p>
                      <p className='text-[#AAAAAA] text-xs line-through'>
                        {(item.price * item.quantity).toFixed(2)} tk
                      </p>
                    </div>
                    <div className='flex flex-col items-center gap-2'>
                      <p className='text-[8px] text-center font-bold leading-3'>Quantity</p>
                      <p className='text-[8px] items-center justify-center gap-3 font-bold leading-3 flex whitespace-nowrap'>
                        <button onClick={() => handleDecrease(item.id)} className='p-2'>-</button>
                        {item.quantity}
                        <button onClick={() => handleIncrease(item.id)} className='p-2'>+</button>
                      </p>
                      <button className='flex items-center text-[8px] gap-5 text-red-700'>
                        <RiDeleteBin6Line className='font-semibold' /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Summary Section */}
        <div className='w-1/3 py-10'>
          <div className='mt-12 shadow-custom2 p-5'>
            <p className='text-[8px] text-[#AAAAAA] flex gap-2'>
              <IoLocationOutline /> Delivery Location: 312/GrapTown, Dattapara Ashulia, Savar, Dhaka
            </p>
            <p className='text-sm font-bold leading-4 py-5'>Total Summary</p>
            <p className='text-xs font-medium flex justify-between pb-5'>
              Subtotal ({data.length} Items) <span>{calculateSubtotal().toFixed(2)} Tk</span>
            </p>
            <p className='text-xs font-medium flex justify-between pb-5'>
              Delivery Charge <span>150 Tk</span>
            </p>
            <hr className='border' />
            <div className='text-sm font-bold leading-4 py-5 flex justify-between'>
              <p>Total</p>
              <p>
                <span className='text-2xl text-primary'>{(calculateSubtotal() + 150).toFixed(2)}</span> Tk
              </p>
            </div>
            <button className='text-sm text-white bg-primary rounded w-full py-2 px-5'>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;

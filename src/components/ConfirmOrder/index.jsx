import Image from 'next/image';
import React from 'react';
import { AiFillEdit } from 'react-icons/ai';
import { IoLocationOutline } from 'react-icons/io5';

const ConfirmOrder = () => {
    const data=[
        {name:"visa",img:'/images/visa.svg'},
        {name:"Bkash",img:'/images/bkash.svg'},
        {name:"nagad",img:'/images/nagad.svg'},
        {name:"Rocket",img:'/images/rocket.svg'},
        {name:"Cash on delivery",img:'/images/COD.svg'},
    ]
    return (
        <div>
            <h1 className="text-2xl font-bold my-10">Please Recheck Your Orders </h1>
            <hr className="border-2" />
            <p className='py-10 font-semibold text-sm'>Payment Method</p>
            <div className="flex gap-2">
                <div className="w-2/3 p-10">

                  <div className='flex justify-between'>
                    {
                        data?.map(data=> <button key={data?.name} className='shadow-custom2 p-2 flex flex-col items-center justify-center'>
< Image height={200} width={200} src={data?.img} alt={data.name}/>
<span className='text-[8px] leading-4 '>{data?.name}</span>
                        </button>)
                    }
                  </div>
                  <button className=' px-4 text-white rounded  my-10 bg-primary py-1 '>Pay Now </button>
                 <div>
                 <button className=' px-4 text-[#D9D9D9] rounded  my-10 border  py-1 '>Cencel Order </button>
                 </div>
                </div>

                {/* Total Summary Section */}
                <div className="w-1/3">
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

                    </div>
                </div>
            </div>
          <div className='flex justify-center'>
          <button className=' px-4 text-white rounded  my-10 bg-primary py-1 '>Confim Order </button>
          </div>
        </div>
    );
};

export default ConfirmOrder;
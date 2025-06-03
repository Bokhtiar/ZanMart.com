import { privateRequest } from "@/config/axios.config";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";

const AddressModal = ({setAddressModal}) => {
  const [address, setAddress] = useState([]);
  const userAddresses = async () => {
    try {
      const res = await privateRequest.get("user/address");
      setAddress(res.data?.data);
    } catch (error) { 
    }
  }; 
  const [cart, setCart] = useState({
    cart_items: [],
    shipping_address_id: 1,
    billing_address_id: 1,
  });
  const handelDefaultAdress = (id) => {
    const updatedCart = {
      ...cart,
      shipping_address_id: id,
      billing_address_id: id,
    };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setAddressModal(false)
  };
  const handleCloseModal=()=>{
setAddressModal(false)
  }
  useEffect(() => {
    userAddresses();
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);
  console?.log(address)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
       <div className="flex justify-end">
       <button onClick={()=>handleCloseModal()} className="text-red-700">X</button>
       </div>
       {
        address.length>0 ? <> <h3 className="text-xl text-primary font-semibold py-5">Please select your delivery Address </h3>
        {address?.map((item, index) => (
          <div
            key={item?.address_id}
            className="flex justify-between items-center gap-10"
          >
            <div className="w-full gap-2 flex">
              <p className="pb-2 font-light space-y-2 text-start text-lg leading-6">
                <strong className="font-medium whitespace-nowrap">
                  Address {index + 1}:
                </strong>

                {item?.address_line1} {item.address_line2} {item.union?.name}{" "}
                {item?.upazila?.name}, {item.district?.name},{" "}
                {item?.division?.name}
              </p>
             
            </div>
            <div className="flex w-full justify-center items-end gap-2">
              <button
                onClick={() => handelDefaultAdress(item?.address_id)}
                className={`flex gap-5 items-center ${
                  cart?.shipping_address_id !== item?.address_id
                    ? "text-[#666666]"
                    : "font-bold text-primary"
                }`}
              >
                <FaCheckCircle className="me-2" />{" "}
                {cart?.shipping_address_id !== item?.address_id
                  ? "Set as Default Delivery Address"
                  : "Default Delivery Address"}
              </button>
            </div>
          </div>
        ))}</>: <div>
        <h1 className="text-xl text-primary font-semibold py-5">Please Add Your Delivery Address</h1>
       <div className="flex ">
       <Link href={'/profile?section=Address Book'}
               
               className="flex my-10 items-center gap-2 border-primary border-2 rounded-lg px-5 text-xs py-2 text-primary"
             >
               <FaPlusCircle/> Add New
             </Link>
       </div>
        </div>
       }
      </div>
    </div>
  );
};

export default AddressModal;

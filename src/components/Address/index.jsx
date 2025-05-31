import { privateRequest } from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { FaCheckCircle, FaPlusCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Toastify } from "../toastify";
import { FaAddressBook } from "react-icons/fa";
import AddressSkeleton from "../loader/AddressSkeleton";
import { networkErrorHandeller } from "@/utils/helpers";
import { MdLocationOff } from "react-icons/md";
import Link from "next/link";
import Spinner from "../spinner";


const Address = () => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState([]);
  
  // Get all addresses
  const userAddresses = async () => {
    try {
      setLoading(true);
      const res = await privateRequest.get("user/address");
      setAddress(res.data?.data);
      setLoading(false);
    } catch (error) {
      networkErrorHandeller(error);
      setLoading(false);
    }
  };
 
  // Delete an address
  const handleDelete = async (id) => {
    
    try {
      setLoading(true)
      const res = await privateRequest.delete(`user/address/${id}`);
      if (res.status === 200) {
        setAddress((prevAddresses) =>
          prevAddresses.filter((item) => item.address_id !== id)
        
        );
        Toastify.Success(res.data.message);
        setLoading(false);
      }
    } catch (error) {
      Toastify.Error(error.message || "Failed to delete address.");
    }
  };

  useEffect(() => {
    // handleDivision();
    userAddresses();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 px-2 mb-3 ">
        <h1 className="text-xl md:text-2xl font-bold  py-1 rounded-md flex items-center gap-2 text-gray-700">
          <FaAddressBook /> Address List
        </h1>
        <Link href={'/profile/addressForm'}
         
          className="flex  items-center gap-2 md:text-xl bg-primary px-2 md:px-9 py-1 text-white rounded-3xl"
        >
          <FaPlusCircle /> Add New
        </Link>
      </div>

      {/* Existing Addresses */}
      <div>
        {loading &&
          Array.from({ length: 20 }).map((_, i) => <AddressSkeleton key={i} />)}
        {address.length > 0 ? (
          <>
            {address?.map((item, index) => (
              <div
                key={item?.address_id}
                className="bg-gray-100 p-3  flex flex-col md:grid md:grid-cols-3 justify-between items-start md:items-center gap-6 md:gap-10 mb-3"
              >
                <div className="flex  w-full gap-2">
                  <p className="font-light space-y-2 text-start  md:text-sm leading-4 md:leading-4">
                    <strong className="font-medium whitespace-nowrap">
                      Address {index + 1}:
                    </strong>
                    {item?.postal_code },
                    {item?.address_line1}
                    {/* {item?.union?.name} {item?.upazila?.name},{" "}
                    {item?.district?.name}, {item?.division?.name} */}
                  </p>
                </div>
                <div className="flex w-full justify-start md:justify-center items-center gap-2"></div>
                <div className="flex justify-start md:justify-center gap-2">
                  <Link href={`/profile/addressForm?id=${item?.address_id}`}
                   
                    className="self-start mt-2 md:mt-0 bg-primary text-white px-2 rounded-md py-1 "
                  >
                    <AiFillEdit className=" h-5 w-5" />
                  </Link>

                  <button
                    onClick={() => handleDelete(item.address_id)}
                    className="flex font-semibold items-center text-base md:text-lg gap-3 md:gap-5 bg-red-500 px-2 rounded-md py-1  text-white"
                  >
                     {
                      loading ?<Spinner/>:<RiDeleteBin6Line className="font-semibold" />
                    }
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
              <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                <MdLocationOff className="text-red-500 text-6xl mx-auto mb-4" />
                <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                  Address Not Found
                </h1>
                <p className="text-gray-600">
                  No address is currently saved. Please add an address to
                  continue.
                </p>
              </div>
            </div>
          </>
        )}
      </div>


    
    </div>
  );
};

export default Address;

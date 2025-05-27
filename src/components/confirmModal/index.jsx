import { privateRequest } from "@/config/axios.config";
import { useCallback, useEffect, useState } from "react";
import Spinner from "../spinner";

const { default: AddressForm } = require("@/pages/profile/addressForm");
const { default: Link } = require("next/link");
const { FaCheckCircle, FaPlusCircle } = require("react-icons/fa");

const  ConfirmModal = ({
  loading,
    isOpen,
    onClose,
    onConfirm,
    message,
    title,
    setAddressData,
  }) => {
    const [address, setAddress] = useState([]);
    const fetchAddress = useCallback(async () => {
      try {
        const res = await privateRequest.get("user/address");
        setAddress(res.data?.data);
      } catch (error) {}
    }, []);
  
    useEffect(() => {
      fetchAddress();
    }, [fetchAddress]);
  
    const [selected, setSelected] = useState(null);
    const handleChange = (id, addressItem) => {
      setAddressData(addressItem);
      setSelected(id);
    };
  
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg md:w-2/4 lg:w-3/4 w-full">
          <div className="flex justify-between items-center bg-gray-100 rounded-md y-2 mb-4">
            <span className="block text-xs p-2">Please select address</span>
            <Link
              href={`/profile/addressForm?modal=${true}`}
              className="flex items-center gap-1 bg-primary rounded-md px-2 py-1"
            >
              <FaPlusCircle/> Add New
            </Link>
          </div>
          {address.length > 0 &&
            address.map((item, index) => (
              <div
                key={item.address_id}
                className={` ${
                  selected === item.address_id ? "bg-blue-100" : "bg-gray-100"
                } mb-4 gap-2 p-3 flex rounded-md cursor-pointer items-center`}
                onClick={() => handleChange(item.address_id, item)}
              >
                <FaCheckCircle
                  className={`${
                    selected === item.address_id ? "text-blue-500" : "text-gray-400"
                  } w-8 h-8`}
                />
                <div>
                  {item?.address_line1} {item?.address_line2} {item?.union?.name}{" "}
                  {item?.upazila?.name}, {item?.district?.name},{" "}
                  {item?.division?.name}
                </div>
              </div>
            ))}
          <h2 className="text-lg font-semibold mb-4">{title}</h2>
          <p className="text-sm mb-4">{message}</p>
          <div className="flex justify-end space-x-4">
            <button className="bg-gray-300 px-4 py-2 rounded" onClick={onClose}>
              Cancel
            </button>
            <button
              disabled={!selected}
              className={`px-4 rounded text-xs font-bold hover:bg-blue-400 ${
                !selected
                  ? "opacity-50 cursor-not-allowed bg-gray-200 py-2"
                  : "bg-primary text-white"
              }`}
              onClick={onConfirm}
            >
              {loading? <Spinner color='secondary'/>:'Confirm'}
             
            </button>
          </div>
        </div>
        
      </div>
    );
  };
  export default ConfirmModal;
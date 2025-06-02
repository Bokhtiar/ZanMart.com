import { privateRequest } from "@/config/axios.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Toastify } from "../toastify";
import isAuth from "@/middleware/auth.middleware";
import { networkErrorHandeller } from "@/utils/helpers";
import Spinner from "../spinner";
import { TbCurrencyTaka } from "react-icons/tb";
import ConfirmOrderSkeleton from "../loader/ConfirmOrderSkeleton";
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

// Skeleton Loader Component
const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-8 bg-gray-300 rounded w-1/3"></div>
    <div className="h-6 bg-gray-300 rounded w-1/2"></div>
    <div className="h-4 bg-gray-300 rounded w-full"></div>
    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
    <div className="h-10 bg-gray-300 rounded w-full mt-5"></div>
  </div>
);

const ConfirmOrder = () => {
  const router = useRouter();
  const id = router.query?.slug;
  const [payment, setPayment] = useState("");
  const [orders, setOrders] = useState([]);
  const { "order Details": orderDetails } = orders || {};
  const [loading, setLoading] = useState(true);

  const data = [
    // {
    //   name: "Pay Online",
    //   img: "/images/payment1.png",
    //   payment_method: "ssl_commerz",
    // },
    {
      name: "Cash on delivery",
      img: "/images/COD.svg",
      payment_method: "cod",
    },
  ];

  const fetchOrder = useCallback(async () => {
    if (!id) return;
    try {
      setLoading(true);
      const res = await privateRequest.get(`user/order/${id}`);
      if (res.status == 200) {
        setOrders(res?.data?.data);
        setLoading(false);
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const handleConfirmOrder = async (modalAction) => {
    if (modalAction === "cancel") {
      try {
        const res = await privateRequest.get(`user/order/cancel/${id}`);
        if (res.status == 200) {
          Toastify.Success(res?.data?.message);
          router.replace("/profile/orders");
        }
      } catch (error) {
        networkErrorHandeller(error);
      }
    } else if (modalAction === "confirm") {
      try {
        setLoading(true);
        const res = await privateRequest.post(`user/payments/${id}`, {
          payment_method: payment,
        });

        if (res.status === 200) {
          const gatewayUrl = res?.data?.data?.gateway_url;
          if (gatewayUrl) {
            window.location.href = gatewayUrl;
          } else {
            Toastify.Success("Order Placed Successfully");
            router.replace("/profile/orders");
          }
        }
      } catch (error) {
        networkErrorHandeller(error);
      } finally {
        setLoading(false);
      }
    }
  };
  console.log(orders);
  // inside dhaka outside dhaka amount update 
  const deliveryAmount = () =>
    orderDetails?.shipping_address?.district?.name?.toLowerCase() === "dhaka"
      ? 70
      : 120;

  if (false) return <ConfirmOrderSkeleton />;

  return (
    <NewDesign/>
    // <div className="container-custom space-y-5">
    //   <h1 className="text-2xl font-bold mb-1">Payment Method</h1>
    //   <hr className="border-1" />
    //   <div className="flex flex-col justify-center  md:flex-row gap-2 items-center  ">
    //     <div className="p-4  w-full   h">
    //       <div className="flex justify-center gap-2">
    //         {data?.map((data) => (
    //           <button
    //             onClick={() => setPayment(data?.payment_method)}
    //             key={data?.name}
    //             className={`shadow-custom2 p-2 flex flex-col items-center justify-center ${
    //               payment === data?.payment_method
    //                 ? "border-4 border-primary"
    //                 : ""
    //             }`}
    //           >
    //             <Image
    //               height={100}
    //               width={100}
    //               src={data?.img}
    //               alt={data.name}
                  
    //             />
    //             <span className="text-sm leading-4" title={data?.name}>{data?.name}</span>
    //           </button>
    //         ))}
    //       </div>
    //       <div className=" hidden gap-4 mt-2 justify-center md:flex">
    //         <button
    //           onClick={() => handleConfirmOrder("cancel")}
    //           className="px-4 text-[#D9D9D9] rounded text-nowrap my-10 border-2 py-1 hover:text-gray-600  "
    //         >
    //           Cancel Order
    //         </button>
    //         {payment === "ssl_commerz" ? (
    //           <button
    //             onClick={() => handleConfirmOrder("confirm")}
    //             className="px-4 text-white rounded text-nowrap my-10 hover:bg-secondary bg-primary py-1"
    //           >
    //             Pay Now
    //           </button>
    //         ) : (
    //           <button
    //             onClick={() => handleConfirmOrder("confirm")}
    //             // disabled={payment !== "cod"}
    //             className="px-4 text-white rounded hover:bg-blue-700 disabled:opacity-50 my-10 bg-primary py-1 text-nowrap"
    //           >
    //             Confirm Order
    //           </button>
    //         )}
    //       </div>
    //     </div> 
    //     {/* Summary Section */}
    //     <div className="shadow-custom2 px-5  w-full  ">
    //       <>
    //         <div className="text-sm text-[#AAAAAA] flex gap-2   items-center">
    //           <IoLocationOutline className="text-lg" />
    //           <span>
    //             Delivery Location: {orderDetails?.shipping_address?.postal_code}
    //             , {orderDetails?.shipping_address?.address_line1}
    //           </span>
    //         </div>
    //         <p className="text-sm font-bold leading-4 py-5">Order Summary</p>
    //         <p className="text-xs font-medium flex justify-between pb-5">
    //           Sub Total <span>{Math.ceil(orderDetails?.total_amount)}</span>
    //         </p>
    //         <p className="text-xs font-medium flex justify-between pb-5">
    //           Delivery Charge <span>{deliveryAmount()}</span>
    //         </p>
    //         <hr className="border" />
    //         <div className="text-sm font-bold leading-4 py-5 flex justify-between">
    //           <p>Total</p>
    //           <p className="flex items-center text-2xl text-primary">
    //             <TbCurrencyTaka />
    //             {Math.ceil(orderDetails?.total_amount) + deliveryAmount()}
    //           </p>
    //         </div>
    //       </>
    //     </div>
    //   </div>
    // </div>
  );
};

export default isAuth(ConfirmOrder);

const NewDesign = () =>{
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
  <div className="grid md:grid-cols-3 gap-6">
    {/* Left Content */}
    <div className="md:col-span-2 space-y-6">
      {/* Shipping Information */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
        <div className="border p-4 rounded text-sm space-y-1">
          <p><span className="font-semibold">Jubaer Shakib</span></p>
          <p>01952209125</p>
          <p>13B/3B B Block</p>
          <p>Mohammadpur, Dhaka</p>
        </div> 
      </div>

      {/* Delivery Options */}
      <div className="bg-white p-5 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Delivery Options</h2>
        <div className="flex items-center justify-between border p-4 rounded">
          <div>
            <input type="radio" checked readOnly className="accent-blue-600 mr-2" />
            <span className="font-medium">Regular Delivery</span>
            <p className="text-sm text-gray-500 ml-6">Delivery in 3–5 working days</p>
          </div>
          <div className="text-blue-600 font-semibold">৳ 1300</div>
        </div>
      </div>

      {/* Place Order */}
      <div className="bg-white p-5 rounded shadow text-center">
        <button className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800">
          Place Order
        </button>
        <p className="text-xs text-gray-500 mt-2">
          By clicking/tapping place order, I agree to Pickaboo’s Terms of Services.
        </p>
      </div>
    </div>

    {/* Order Summary */}
    <div className="bg-white p-5 rounded shadow space-y-4">
      <h2 className="text-lg font-semibold">Order Summary</h2> 
      <div className="text-sm text-blue-600 cursor-pointer">   {CartAccordion()}</div>

      <div className="border-t pt-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span>Subtotal (3 items)</span>
          <span>৳ 197,970</span>
        </div>
        <div className="flex justify-between">
          <span>Discount (Visa Mastercard Offer)</span>
          <span>-৳ 1,000</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping (Regular Delivery)</span>
          <span>৳ 0</span>
        </div>
      </div>

      <div className="border-t pt-4 text-base font-semibold flex justify-between">
        <span>Total</span>
        <span className="text-blue-600">৳ 196,970</span>
      </div>

      <p className="text-xs text-gray-500">
        You will save ৳ 1,000 on this order, may vary based on payment method.
      </p>
      <p className="text-xs text-gray-500">
        Place order now and earn 3544 Points for this order.
        Applies only to registered customers, may vary when logged in.
      </p>
    </div>
  </div>
</div>

  )
}

 
  function CartAccordion() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-white p-4 rounded shadow w-full max-w-md transition-all duration-300">
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-md font-semibold">Cart Items (1)</h3>
        {isOpen ? (
          <FaChevronUp className="text-gray-600" />
        ) : (
          <FaChevronDown className="text-gray-600" />
        )}
      </div>

      {/* Accordion Content */}
      {isOpen && (
        <div   className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100 translate-y-0' : 'max-h-0 opacity-0 -translate-y-1'
        } overflow-hidden`}>
          <img
            src="/ac.jpg"
            alt="Product"
            className="w-20 h-20 object-contain rounded border"
          />
          <div>
            <p className="text-sm font-medium">
              Walton 1.5 Ton Intelligent Inverter Air Conditioner <br />
              [WSI-DIAMOND-18M (FROST CLEAN)]
            </p>
            <div className="mt-2 inline-block border rounded px-3 py-1 text-sm">
              Qty: 1
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

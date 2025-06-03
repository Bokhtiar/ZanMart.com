
import { privateRequest, publicRequest } from "@/config/axios.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";

const TrackOrderInformation = () => {
 
  const router = useRouter();
  const { orderid } = router.query;
const [order,setOrder]=useState([])
const [loading,setLoading]=useState(false)
console.log(order)
const fetchOrderInformation = useCallback(async () => {
    if (!orderid) return;

    setLoading(true);
    // setError(null);

    try {
      const res = await privateRequest.get(`user/order/${orderid}`);
      setOrder(res.data?.data);
    } catch (err) {
      // setError("Order not found or an error occurred.");
    } finally {
      setLoading(false);
    }
  }, [orderid]);

  useEffect(() => {
    fetchOrderInformation();
  }, [fetchOrderInformation]);

  const statusList = ["Processing", "Shipped", "Delivered"];

  return (
    <div className="  px-4 py-10">
       <div className="max-w-5xl mx-auto rounded-3xl bg-white/70 backdrop-blur-lg shadow-xl p-10">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Tracking Order #{orderid}
          </h2>
          <p className="text-gray-500 text-sm">Placed on:
             {order?.["order Details"]?.shipping_address?.address_line1},
             {order?.["order Details"]?.shipping_address?.address_line2},
             {order?.["order Details"]?.shipping_address?.upazila?.name},
             {order?.["order Details"]?.shipping_address?.district?.name},
             {order?.["order Details"]?.shipping_address?.division?.name},
              </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-10">
        <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
  {statusList.map((s, i) => (
    <span
      key={i}
      className={`${
        s.toLowerCase() === order?.["order Details"]?.order_status?.toLowerCase()
          ? "text-indigo-600 font-semibold"
          : ""
      }`}
    >
      {s}
    </span>
  ))}
</div>
<div className="w-full h-2 bg-gray-200 rounded-full relative">
  <div
    className={`h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500`}
    style={{
      width: `${
        ((statusList.findIndex(s => s.toLowerCase() === order?.["order Details"]?.order_status?.toLowerCase()) + 1) /
          statusList.length) *
        100
      }%`,
    }}
  ></div>
</div>

        </div>

        {/* Order Details */}
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          <div>
            <p className="text-gray-700">
              <span className="font-semibold">Payment Method:</span>{" "}
              {order.paymentMethod}
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Delivery Address:</span>{" "}
                           {order?.["order Details"]?.shipping_address?.address_line1},
             {order?.["order Details"]?.shipping_address?.address_line2},
             {order?.["order Details"]?.shipping_address?.upazila?.name},
             {order?.["order Details"]?.shipping_address?.district?.name},
             {order?.["order Details"]?.shipping_address?.division?.name},
            </p>
            <p className="text-gray-700 mt-2">
              <span className="font-semibold">Delivered On:</span>{" "}
              {order.deliveredDate || "Pending"}
            </p>
          </div>
          <div className="text-right">
            <span className="inline-block px-4 py-1 text-sm font-semibold rounded-full text-white bg-indigo-500 shadow-md">
              Status: {order?.["order Details"]?.order_status}
            </span>
          </div>
        </div>

        {/* Items */}
        <h3 className="text-xl font-semibold mb-6 text-indigo-700">
          Order Items
        </h3>
        <div className="space-y-6">
          {order?.["order item"]?.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-center bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition"
            >
              <Image
               src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.product?.thumbnail_image}`}
                height={50}
                width={50}
                alt={item.name}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="sm:ml-6 flex-1 text-center sm:text-left mt-4 sm:mt-0">
                <h4 className="font-semibold text-gray-800 text-md">
                  {item?.product?.title}
                </h4>
                <p className="text-sm text-gray-500">{item.category?.category_name}</p>
                <p className="text-sm text-gray-600 mt-1">
                  Color: {item.color?.name} | Size: {item.attribute?.name}
                </p>
              </div>
              <div className="text-right mt-4 sm:mt-0">
                <p className="font-bold text-gray-800">{item?.attribute_price} Tk</p>
                <p className="text-sm text-gray-500">Qty: {item?.qty}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-10 bg-white border border-gray-200 rounded-xl p-6 shadow-inner">
          <h4 className="text-lg font-semibold mb-4 text-indigo-700">
            Billing Summary
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              {/* <span>Subtotal ({order.items.length} items)</span> */}
              {/* <span>{order.subtotal} Tk</span> */}
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              {/* <span>{order.deliveryCharge} Tk</span> */}
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-lg font-bold text-gray-800">
              <span>Total</span>
              <span className="text-indigo-600">{order?.["order Details"]?.total_amount} Tk</span>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
};

export default TrackOrderInformation;

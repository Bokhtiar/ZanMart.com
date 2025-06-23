import { privateRequest } from "@/config/axios.config";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import isAuth from "@/middleware/auth.middleware";
import { Toastify } from "../toastify";
import ConfirmOrderSkeleton from "../loader/ConfirmOrderSkeleton";
import Image from "next/image";
import Spinner from "../spinner";
import { useCart } from "@/contex/CartContext";
const ConfirmOrder = () => {
  const router = useRouter();
  const {clear:clearCart} = useCart();
  const [loading, setLoading] = useState(true);
  const [orderItem, setOrderItem] = useState([]);
  const [address, setAddress] = useState({});
  const [btnLoading,setBtnLoading] = useState();
  // address find for this page
  useEffect(() => {
    const fetchAddress = async (item) => {
      try {
        const response = await privateRequest.get("user/address/default");
        setLoading(false);
        setAddress(response?.data?.data);
      } catch (error) {
        Toastify.Error("Address Get Failed");
      }
    };
    fetchAddress();
  }, []);
  // order summary for find order item from localStorage
  useEffect(() => {
    setOrderItem(JSON?.parse(localStorage?.getItem("orderItems")));
  }, []);

  // inside dhaka outside dhaka amount update
  const deliveryAmount = () =>
    address?.district?.name?.toLowerCase() === "dhaka" ? 70 : 120;
  const shippingAddressSet = (item) => {
    return address?.[item];
  };
  // total ammount count
  const subtotalAmount = orderItem.reduce((acc, cur) => {
    return acc + (cur?.sell_price || 0) * (cur?.qty || 0);
  }, 0);
  // order place api call
  const handleOrderPlace = async () => {
    setBtnLoading(true)
    const newMyOrder = {
      cart_items: orderItem,
      billing_address_id: address?.address_id,
      shipping_address_id: address?.address_id,
      delivery_charge: deliveryAmount(),
    };
    try {
      const res = await privateRequest.post("user/orders", newMyOrder);
      if (res?.status === 200 || res?.status === 201) {
        clearCart()
        Toastify.Success(res?.data?.message); 
        router.push(`/payment-options/${res?.data?.order_id?.order_id}`);
        localStorage.setItem("orderItems", JSON.stringify([]));
         setBtnLoading(false)
      }
    } catch (error) {
      Toastify.Error("Order Place Failed");
      setBtnLoading(false)
    }
  };
  if (loading) return <ConfirmOrderSkeleton />;
  return (
    <div className="container-custom mx-auto  ">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            <div className="border p-4 rounded text-sm space-y-1">
              <p>
                <span className="font-semibold">
                  {shippingAddressSet("name")}
                </span>
              </p>
              <p>{shippingAddressSet("phone")}</p>
              <p> {shippingAddressSet("address_line1")}</p>
              <p>
                {shippingAddressSet("upazila")?.name},{" "}
                {shippingAddressSet("district")?.name},{" "}
                {shippingAddressSet("division")?.name}{" "}
              </p>
            </div>
          </div>
          {/* here show product details  */}
          <div>
            <h1 className="text-black border-b-2 shadow-sm font-semibold px-4 pb-2 text-lg">
              Order Summary - {orderItem?.length} items
            </h1>
            <div className="flex-1 space-y-4 mt-2">
              {/* Headers - hidden on mobile */}
              <div className="grid grid-cols-12 overflow-x-auto gap-2 bg-gray-200 px-2 py-2 rounded-lg">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">QTY</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              {/* product show  */}
              {orderItem.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 overflow-x-auto gap-2"
                >
                  <div className=" col-span-6 flex items-start gap-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.image}`}
                      alt={item?.product?.title}
                      className="w-16 h-16 object-cover rounded"
                      width={100}
                      height={100}
                    />
                    <div>
                      {" "}
                      <p className="font-medium line-clamp-3">{item?.title}</p>
                    </div>
                  </div>

                  <div className=" col-span-2 text-center ">
                    <p className="text-gray-800 font-semibold text-nowrap">
                      ৳ {Math.ceil(item?.sell_price)}{" "}
                    </p>
                  </div>
                  <p className="text-nowrap  col-span-2 text-center">
                    {item?.qty}
                  </p>
                  <div className=" col-span-2 text-right font-medium text-nowrap">
                    ৳ {Math.ceil(item?.sell_price) * item?.qty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Order Summary */}
        <div className="bg-white p-5 rounded   space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({orderItem?.length} items)</span>
              <span className="text-nowrap">৳ {Math.ceil(subtotalAmount)}</span>
            </div>
            <div className="flex justify-between ">
              <span>Shipping </span>
              <span className="text-nowrap">৳ {deliveryAmount()}</span>
            </div>
          </div>
          <div className="border-t pt-4 text-base font-semibold flex justify-between">
            <span>Total</span>
            <span className="text-blue-600 text-nowrap">
              ৳ {Math.ceil(subtotalAmount) + deliveryAmount()}
            </span>
          </div>
          <button
            className="fixed bottom-0 left-0 md:static w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold h-9 rounded hover:opacity-90 transition cursor-pointer "
            onClick={handleOrderPlace}
            disabled={btnLoading}
          >
            {btnLoading?<Spinner/>:"Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default isAuth(ConfirmOrder);

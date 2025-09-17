import React, { useEffect, useState } from "react";
import { privateRequest } from "@/config/axios.config";
import { useRouter } from "next/router";
import { Toastify } from "../toastify";
import Spinner from "../spinner";
import ConfirmOrderSkeleton from "../loader/ConfirmOrderSkeleton";
import Image from "next/image";
import { useCart } from "@/contex/CartContext";

const ConfirmOrder = () => {
  const router = useRouter();
  const { clear: clearCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [orderItem, setOrderItem] = useState([]);
  const [btnLoading, setBtnLoading] = useState(false);

  // 🔹 Address Form State
  const [address, setAddress] = useState({
    name: "",
    phone: "",
    address_line1: "",
    upazila: "",
    district: "",
    division: "",
  });

  // Order items localStorage থেকে আনা
  useEffect(() => {
    setOrderItem(JSON?.parse(localStorage?.getItem("orderItems")) || []);
  }, []);

  // Inside Dhaka / Outside Dhaka delivery charge
  const deliveryAmount = () =>
    address?.district?.toLowerCase() === "dhaka" ? 70 : 120;

  // মোট দাম
  const subtotalAmount = orderItem.reduce((acc, cur) => {
    return acc + (cur?.sell_price || 0) * (cur?.qty || 0);
  }, 0);

  // অর্ডার Place করা
  const handleOrderPlace = async () => {
    if (
      !address.name ||
      !address.phone ||
      !address.address_line1 ||
      !address.district
    ) {
      return Toastify.Error("Please fill all address fields");
    }

    setBtnLoading(true);
    const newMyOrder = {
      cart_items: orderItem,
      shipping_address: address,
      delivery_charge: deliveryAmount(),
    };

    try {
      const res = await privateRequest.post("user/orders", newMyOrder);
      if (res?.status === 200 || res?.status === 201) {
        clearCart();
        Toastify.Success(res?.data?.message);
        router.push(`/payment-options/${res?.data?.order_id?.order_id}`);
        localStorage.setItem("orderItems", JSON.stringify([]));
      }
    } catch (error) {
      Toastify.Error("Order Place Failed");
    } finally {
      setBtnLoading(false);
    }
  };

  if (loading) return <ConfirmOrderSkeleton />;

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-500 py-10 text-center text-white shadow-md">
        <h1 className="text-3xl md:text-4xl font-bold">Confirm Your Order</h1>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Please provide your shipping details & review your order before placing
        </p>
      </div>

      {/* Main Content */}
      <div className="container-custom mx-auto py-10">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Shipping Form */}
          <div className="md:col-span-2 bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">
              Shipping Information
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={address.name}
                onChange={(e) => setAddress({ ...address, name: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={address.phone}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Address Line"
                value={address.address_line1}
                onChange={(e) =>
                  setAddress({ ...address, address_line1: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Upazila"
                value={address.upazila}
                onChange={(e) =>
                  setAddress({ ...address, upazila: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="District"
                value={address.district}
                onChange={(e) =>
                  setAddress({ ...address, district: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              />
              <input
                type="text"
                placeholder="Division"
                value={address.division}
                onChange={(e) =>
                  setAddress({ ...address, division: e.target.value })
                }
                className="w-full border rounded px-3 py-2 focus:ring focus:ring-blue-300"
              />
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-800">
              Order Summary
            </h2>
            <div className="border-t mt-4 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal ({orderItem?.length} items)</span>
                <span>৳ {Math.ceil(subtotalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>৳ {deliveryAmount()}</span>
              </div>
            </div>
            <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-base">
              <span>Total</span>
              <span className="text-blue-600">
                ৳ {Math.ceil(subtotalAmount) + deliveryAmount()}
              </span>
            </div>
            <button
              className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold h-10 rounded hover:opacity-90 transition cursor-pointer"
              onClick={handleOrderPlace}
              disabled={btnLoading}
            >
              {btnLoading ? <Spinner /> : "Place Order"}
            </button>
          </div>
        </div>

        {/* Product Showcase */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-gray-800 border-b-2 pb-3 mb-8">
            Products in Your Order
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {orderItem.map((item, idx) => (
              <div
                key={idx}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-xl transition"
              >
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.image}`}
                  alt={item?.title}
                  width={400}
                  height={300}
                  className="w-full h-52 object-cover"
                />
                <div className="p-5 space-y-2">
                  <h3 className="font-semibold text-lg text-gray-800 line-clamp-2">
                    {item?.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Category: {item?.category?.name || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item?.description || "No description available"}
                  </p>
                  <div className="flex justify-between items-center pt-3">
                    <p className="text-blue-600 font-bold text-lg">
                      ৳ {Math.ceil(item?.sell_price)}
                    </p>
                    <span className="text-gray-600">Qty: {item?.qty}</span>
                  </div>
                  <p className="text-right font-semibold text-gray-800 mt-2">
                    Total: ৳ {Math.ceil(item?.sell_price) * item?.qty}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;

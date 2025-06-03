import { privateRequest } from "@/config/axios.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { Toastify } from "../toastify";
import isAuth from "@/middleware/auth.middleware";
import { networkErrorHandeller } from "@/utils/helpers";
import ConfirmOrderSkeleton from "../loader/ConfirmOrderSkeleton";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import Spinner from "../spinner";
const ConfirmOrder = () => {
  const router = useRouter();
  const id = router.query?.slug;
  const [payment, setPayment] = useState("cod");
  const [orders, setOrders] = useState([]);
  const { "order Details": orderDetails } = orders || {};
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState(true);
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
        setCancelLoading(false);
        const res = await privateRequest.get(`user/order/cancel/${id}`);
        if (res.status == 200) {
          Toastify.Success(res?.data?.message);
          router.replace("/profile/orders");
          setButtonLoading(true);
          setCancelLoading(true);
        }
      } catch (error) {
        networkErrorHandeller(error);
        setButtonLoading(true);
      }
    } else if (modalAction === "confirm") {
      setButtonLoading(false);
      try {
        const res = await privateRequest.post(`user/payments/${id}`, {
          payment_method: payment,
        });

        if (res.status === 200) {
          const gatewayUrl = res?.data?.data?.gateway_url;
          if (gatewayUrl) {
            window.location.href = gatewayUrl;
          } else {
            setButtonLoading(true);
            Toastify.Success("Order Placed Successfully");
            router.replace("/profile/orders");
          }
        }
      } catch (error) {
        setButtonLoading(true);
        networkErrorHandeller(error);
      } finally {
        setButtonLoading(true);
        setLoading(true);
      }
    }
  }; 
  // inside dhaka outside dhaka amount update
  const deliveryAmount = () =>
    orderDetails?.shipping_address?.district?.name?.toLowerCase() === "dhaka"
      ? 70
      : 120;
  const shippingAddressSet = (item) => {
    return orderDetails?.shipping_address?.[item];
  };
  if (loading) return <ConfirmOrderSkeleton />;

  return (
    <div className="container-custom mx-auto bg-gray-50 ">
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
                {" "}
                {shippingAddressSet("upazila")?.name},{" "}
                {shippingAddressSet("district")?.name},{" "}
                {shippingAddressSet("division")?.name}{" "}
              </p>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-white p-5 rounded shadow space-y-4">
            <h2 className="text-lg font-semibold ">Delivery Options</h2>
            {data.map((option, index) => (
              <label
                key={index}
                className="flex items-center justify-between border p-4 rounded cursor-pointer"
              >
                <div className="flex items-baseline gap-1">
                  <input
                    type="radio"
                    name="payment_method"
                    value={option.payment_method}
                    checked={payment === option?.payment_method}
                    onChange={() => setPayment(option?.payment_method)}
                    className="accent-blue-600 mt-1"
                  />
                  <div>
                    <span className="font-medium">{option?.name}</span>
                    <p className="text-sm text-gray-500  ">
                      Delivery in 2–5 working days
                    </p>
                  </div>
                </div>
                <div className="text-blue-600 font-semibold">
                  ৳ {deliveryAmount()}
                </div>
              </label>
            ))}
            {/* Place Order */}
            <div className="flex  shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:shadow-none justify-end fixed  md:sticky bottom-0  items-center z-10    gap-4 right-4 bg-white">
              <p className="py-2 block md:hidden font-bold text-xl">
                {" "}
                ৳ {Math.ceil(orderDetails?.total_amount) + deliveryAmount()}
              </p>
              <button
                disabled={!buttonLoading}
                onClick={() => handleConfirmOrder("cancel")}
                className="px-4 w-32 text-[#D9D9D9] rounded text-nowrap  border-2 py-2 hover:text-gray-600  bg-red-500 hover:bg-red-300 "
              >
                {!cancelLoading ? <Spinner /> : " Cancel Order"}
              </button>
              {payment === "ssl_commerz" ? (
                <button
                  disabled={!buttonLoading}
                  onClick={() => handleConfirmOrder("confirm")}
                  className="px-4 w-32 text-white rounded text-nowrap  hover:bg-secondary bg-primary py-2"
                >
                  {!buttonLoading ? <Spinner /> : "Pay Now"}
                </button>
              ) : (
                <button
                  disabled={!buttonLoading}
                  onClick={() => handleConfirmOrder("confirm")}
                  // disabled={payment !== "cod"}
                  className="px-4 w-32 text-white rounded hover:bg-blue-500   bg-primary py-2 text-nowrap"
                >
                  {!buttonLoading ? <Spinner /> : "Confirm Order"}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-5 rounded   space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="text-sm text-blue-600 cursor-pointer">
            {" "}
            {<CartAccordion order={orders?.["order item"]} />}
          </div>

          <div className="border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({orders?.["order item"]?.length} items)</span>
              <span>৳ {Math.ceil(orderDetails?.total_amount)}</span>
            </div>
            {/* <div className="flex justify-between">
          <span>Discount (Visa Mastercard Offer)</span>
          <span>-৳ 1,000</span>
        </div> */}
            <div className="flex justify-between">
              <span>Shipping </span>
              <span>৳ {deliveryAmount()}</span>
            </div>
          </div>

          <div className="border-t pt-4 text-base font-semibold flex justify-between">
            <span>Total</span>
            <span className="text-blue-600">
              ৳ {Math.ceil(orderDetails?.total_amount) + deliveryAmount()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default isAuth(ConfirmOrder);

const CartAccordion = ({ order = [] }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-white  rounded ${
        isOpen ? "shadow-md" : ""
      }  w-full transition-all duration-300`}
    >
      {/* Accordion Header */}
      <div
        className="flex justify-between items-center cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-md font-semibold">Cart Items ({order?.length})</h3>
        {isOpen ? (
          <FaChevronUp className="text-gray-600" />
        ) : (
          <FaChevronDown className="text-gray-600" />
        )}
      </div>

      {/* Accordion Content */}

      <div
        className={`flex flex-wrap transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-96 opacity-100 translate-y-0 mt-2"
            : "max-h-0 opacity-0 -translate-y-1"
        } overflow-hidden`}
      >
        {order.map((item, idx) => (
          <div key={idx} className="flex gap-1 pb-2">
            <Image
              width={100}
              height={100}
              src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.product?.thumbnail_image}`}
              alt="Product"
              className="w-20 h-20 object-contain rounded border"
            />
            <div>
              <p className="text-sm font-medium">{item?.product?.title}</p>
              <div className="mt-2 inline-block border rounded px-3 py-1 text-sm">
                Qty: {item?.qty}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

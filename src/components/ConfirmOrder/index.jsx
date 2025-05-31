import { privateRequest } from "@/config/axios.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Toastify } from "../toastify";
import Modal from "../modal";
import isAuth from "@/middleware/auth.middleware";
import { networkErrorHandeller } from "@/utils/helpers";
import Spinner from "../spinner";
import { TbCurrencyTaka } from "react-icons/tb";

const ConfirmOrder = () => {
  const router = useRouter();
  const id = router.query?.slug;
  const [payment, setPayment] = useState("");
  const [orders, setOrders] = useState([]);
  const { "order Details": orderDetails } = orders;
  const [loading, setLoading] = useState(false);
  const data = [
    {
      name: "Pay Online",
      img: "/images/payment1.png",
      payment_method: "ssl_commerz",
    },
    {
      name: "Cash on delivery",
      img: "/images/COD.svg",
      payment_method: "cod",
    },
  ];

  const fetchOrder = useCallback(async () => {
    try {
      const res = await privateRequest.get(`user/order/${id}`);
      if (res.status == 200) {
        setOrders(res?.data?.data);
      }
    } catch (error) {}
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);
  // Modal state
  const handleConfirmOrder = async (modalAction) => {
    if (modalAction === "cancel") {
      try {
        const res = await privateRequest.get(`user/order/cancel/${id}`);
        if (res.status == 200) {
          Toastify.Success(res?.data?.message);
          router.replace("/profile/orders");
        }
      } catch (error) {}
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
            setLoading(false);
          } else {
          }
        }

        if (res.data.success) {
          Toastify.Success("Order Placed Successfully");
          router.replace("/profile/orders");
          setLoading(false);
        }
      } catch (error) {
        networkErrorHandeller(error);
        setLoading(false);
      }
    }
    // Close modal after confirmation
  };
  if (loading) {
    return <Spinner />;
  }
  return (
    <div className=" container-custom  ">
      <h1 className="text-2xl font-bold my-10">Payment Method </h1>
      <hr className="border-2" />
      <div className="flex justify-center flex-col md:flex-row gap-2">
        <div className="p-10 md:w-1/2">
          <div className="flex justify-center gap-2">
            {data?.map((data) => (
              <button
                onClick={() => setPayment(data?.payment_method)}
                key={data?.name}
                className={`shadow-custom2 p-2 flex flex-col items-center justify-center ${
                  payment == data?.payment_method
                    ? "border-4 border-primary"
                    : ""
                }`}
              >
                <Image
                  height={100}
                  width={100}
                  src={data?.img}
                  alt={data.name}
                />
                <span className="text-sm leading-4 ">{data?.name}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-4 mt-10 justify-center">
            <button
              onClick={() => handleConfirmOrder("cancel")}
              className=" px-4 text-[#D9D9D9] rounded text-nowrap my-10 border-2  py-1 hover:text-gray-600"
            >
              Cancel Order{" "}
            </button>
            {payment == "ssl_commerz" ? (
              <button
                onClick={() => handleConfirmOrder("confirm")}
                className=" px-4 text-white rounded  text-nowrap disabled:opacity-50  my-10 hover:bg-secondary bg-primary py-1 "
              >
                Pay Now{" "}
              </button>
            ) : (
              <button
                onClick={() => handleConfirmOrder("confirm")}
                disabled={payment !== "cod"}
                className=" px-4 text-nowrap text-white rounded hover:bg-secondary disabled:opacity-50 my-10 bg-primary py-1 "
              >
                Confirm Order{" "}
              </button>
            )}
          </div>
        </div>

        {/* Total Summary Section */}
        <div className="">
          <div className="mt-12 shadow-custom2 p-5">
            <div className="text-sm text-[#AAAAAA] flex gap-2 flex-wrap ">
              <IoLocationOutline />
              <span className="">
                Delivery Location:{" "}
                {orderDetails?.shipping_address?.postal_code},{" "}
                {orderDetails?.shipping_address?.address_line1},{" "}
            
              </span>
            </div>
            <p className="text-sm font-bold leading-4 py-5">Total Summary</p>
            <p className="text-xs font-medium flex justify-between pb-5">
              Sub Total <span>{Math.ceil(orderDetails?.total_amount)}</span>
            </p>
            <p className="text-xs font-medium flex justify-between pb-5">
              Delivery Charge <span>0</span>
            </p>
            <hr className="border" />
            <div className="text-sm font-bold leading-4 py-5 flex justify-between">
              <p>Total</p>
              <p className="flex">
                <span className="text-2xl text-primary flex   items-center">
                   <TbCurrencyTaka />{Math.ceil(orderDetails?.total_amount)} 
                </span>{" "} 
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default isAuth(ConfirmOrder);

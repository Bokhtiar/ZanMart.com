import { privateRequest } from "@/config/axios.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Toastify } from "../toastify";

const ConfirmOrder = () => {
  const router = useRouter();
  const id = router.query?.id;
  const [payment, setPayment] = useState("");
  const [orders, setOrders] = useState([]);
  const { "order Details": orderDetails } = orders;

  console.log(orderDetails);
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
  }, []);
  useEffect(() => {
    fetchOrder();
  }, []);
  const hendleorderCancel = async () => {
    try {
      const res = await privateRequest.get(`user/order/cancel/${id}`);
      console.log(res.data.message);
      if (res.status == 200) {
        Toastify.Success(res?.data?.message);
        router.push("/");
      }
    } catch (error) {}
  };
  
  const handlepay = async () => {
    try {
      const res = await privateRequest.post(`user/payments/${id}`, {
        payment_method: payment,
      });
  
      console.log(res.status);
  
      if (res.status === 200) {
        const gatewayUrl = res?.data?.data?.gateway_url;
        console.log(gatewayUrl);
  
        if (gatewayUrl) {
          // Redirect to the payment gateway
          window.location.href = gatewayUrl;
        } else {
          console.error("Gateway URL not found in response.");
        }
      } else {
        console.error("Failed to initialize payment, status:", res.status);
      }
    } catch (error) {
      Toastify.Error(error);
    }
  };
  
  return (
    <div>
      <h1 className="text-2xl font-bold my-10">Please Recheck Your Orders </h1>
      <hr className="border-2" />
      <p className="py-10 font-semibold text-sm">Payment Method</p>
      <div className="flex gap-2">
        <div className="w-2/3 p-10">
          <div className="flex justify-center gap-2">
            {data?.map((data) => (
              <button
                onClick={() => setPayment(data?.payment_method)}
                key={data?.name}
                className={`shadow-custom2 p-2 flex flex-col items-center justify-center ${
                  payment == data?.payment_method ? "border border-primary" : ""
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
          <button
            onClick={handlepay}
            className=" px-4 text-white rounded  my-10 bg-primary py-1 "
          >
            Pay Now{" "}
          </button>
          <div>
            <button
              onClick={hendleorderCancel}
              className=" px-4 text-[#D9D9D9] rounded  my-10 border  py-1 "
            >
              Cencel Order{" "}
            </button>
          </div>
        </div>

        {/* Total Summary Section */}
        <div className="w-1/3">
          <div className="mt-12 shadow-custom2 p-5">
            <p className="text-[8px] text-[#AAAAAA] flex gap-2">
              <IoLocationOutline /> Delivery Location: {orderDetails?.shipping_address?.address_line1}, {orderDetails?.shipping_address?.address_line2},{orderDetails?.shipping_address?.union?.name},
              {orderDetails?.shipping_address?.upazila?.name},
              {orderDetails?.shipping_address?.district?.name},
              {orderDetails?.shipping_address?.divison?.name}
              Ashulia, Savar, Dhaka
            </p>
            <p className="text-sm font-bold leading-4 py-5">Total Summary</p>
            {/*   <p className="text-xs font-medium flex justify-between pb-5">
            Subtotal ({Object.keys(selectedItems).filter((key) => selectedItems[key]).length} Items)
            <span>{calculateSubtotal().toFixed(2)} Tk</span>
          </p> */}
            <p className="text-xs font-medium flex justify-between pb-5">
              Sub Total <span>{orderDetails?.total_amount}</span>
            </p>
            <p className="text-xs font-medium flex justify-between pb-5">
              Delivery Charge <span>0</span>
            </p>
            <hr className="border" />
            <div className="text-sm font-bold leading-4 py-5 flex justify-between">
              <p>Total</p>
              <p>
                <span className="text-2xl text-primary">
                  {orderDetails?.total_amount}
                </span>{" "}
                Tk
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <button className=" px-4 text-white rounded  my-10 bg-primary py-1 ">
          Confim Order{" "}
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;

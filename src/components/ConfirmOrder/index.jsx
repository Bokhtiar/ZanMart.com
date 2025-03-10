import { privateRequest } from "@/config/axios.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { IoLocationOutline } from "react-icons/io5";
import { Toastify } from "../toastify";
import Modal from "../modal";
import isAuth from "@/middleware/auth.middleware";


const ConfirmOrder = () => {
  const router = useRouter();
  const id = router.query?.slug;
  const [payment, setPayment] = useState("");
  const [orders, setOrders] = useState([]);
  const { "order Details": orderDetails } = orders; 
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null); // track the action (confirm/cancel)

  const handleOrderCancel = async () => {
    setIsModalOpen(true);
    setModalAction("cancel");
  };

  const handleConfirmOrder = async () => {
    setIsModalOpen(true);
    setModalAction("confirm");
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const handleModalConfirm = async () => {
    if (modalAction === "cancel") {
      try {
        const res = await privateRequest.get(`user/order/cancel/${id}`); 
        if (res.status == 200) {
          Toastify.Success(res?.data?.message);
          router.push("/products");
        }
      } catch (error) {}
    } else if (modalAction === "confirm") {
      try {
        const res = await privateRequest.post(`user/payments/${id}`, {
          payment_method: payment,
        });

        if (res.status === 200) {
          const gatewayUrl = res?.data?.data?.gateway_url;
          if (gatewayUrl) {
            window.location.href = gatewayUrl;
          } else { 
          }
        }

        if (res.data.success) {
          Toastify.Success("Order Placed Successfully");
          router.push("profile?section=Orders");
        }
      } catch (error) {
        Toastify.Error(error);
      }
    }
    setIsModalOpen(false); // Close modal after confirmation
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
                className={`shadow-custom2 p-2 flex flex-col items-center justify-center ${payment == data?.payment_method ? "border border-primary" : ""}`}
              >
                <Image height={100} width={100} src={data?.img} alt={data.name} />
                <span className="text-sm leading-4 ">{data?.name}</span>
              </button>
            ))}
          </div>
          <div className="flex gap-10 mt-10 justify-center">
            <button onClick={handleOrderCancel} className=" px-4 text-[#D9D9D9] rounded  my-10 border  py-1 ">
              Cancel Order{" "}
            </button>
            {payment == "ssl_commerz" ? (
              <button onClick={handleConfirmOrder} className=" px-4 text-white rounded  disabled:opacity-50  my-10 bg-primary py-1 ">
                Pay Now{" "}
              </button>
            ) : (
              <button onClick={handleConfirmOrder} disabled={payment !== "cod"} className=" px-4 text-white rounded  disabled:opacity-50 my-10 bg-primary py-1 ">
                Confirm Order{" "}
              </button>
            )}
          </div>
        </div>

        {/* Total Summary Section */}
        <div className="w-1/3">
          <div className="mt-12 shadow-custom2 p-5">
            <p className="text-[8px] text-[#AAAAAA] flex gap-2">
              <IoLocationOutline /> Delivery Location:{" "}
              {orderDetails?.shipping_address?.address_line1},{" "}
              {orderDetails?.shipping_address?.address_line2},
              {orderDetails?.shipping_address?.union?.name},
              {orderDetails?.shipping_address?.upazila?.name},
              {orderDetails?.shipping_address?.district?.name},
              {orderDetails?.shipping_address?.divison?.name}
              Ashulia, Savar, Dhaka
            </p>
            <p className="text-sm font-bold leading-4 py-5">Total Summary</p>
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

      {/* Modal for confirmation */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleModalConfirm}
        message={
          modalAction === "cancel"
            ? "Are you sure you want to cancel the order?"
            : "Are you sure you want to confirm the order?"
        }
        title={modalAction === "cancel" ? "Cancel Order" : "Confirm Order"}
      />
    </div>
  );
};

export default isAuth(ConfirmOrder);

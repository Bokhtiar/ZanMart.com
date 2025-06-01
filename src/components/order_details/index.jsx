import { privateRequest } from "@/config/axios.config";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
import OrderDetailsSkeleton from "../loader/OrderDetailsSkeleton";
import ReviewModal from "../reviewModal";
import { Toastify } from "../toastify";
import Spinner from "../spinner";
const OrderDetails = () => {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const id = router?.query?.slug;
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderitems] = useState([]);
  const [reviewProduct, setReviewProduct] = useState({});
  console.log(orderDetails);
  const fetchOrderDetails = useCallback(async () => {
    setLoading(true);
    try {
      if (!id) return;
      const res = await privateRequest.get(`user/order/${id}`);
      if (res.status == 200) {
        setOrderDetails(res?.data?.data["order Details"]);
        setOrderitems(res?.data?.data["order item"]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [id]);
  const handleReviewModal = (product) => {
    setIsOpen(!isOpen);
    setReviewProduct(product);
  };
  useEffect(() => {
    if (id) {
      fetchOrderDetails();
    }
  }, [id]);
  const [btnLoading, setBtnLoadin] = useState(false);
  // cancel order
  const handleCancelProduct = async (id) => {
    setBtnLoadin(true);
    try {
      const res = await privateRequest.get(`user/order/cancel/${id}`);
      if (res.status == 200) {
        Toastify.Success(res?.data?.message);
        setLoading(false);
        router.replace("/profile/orders");
      }
    } catch (error) {
      setLoading(false);
      console.log(error.message);
    }
    setLoading(false);
  };
  return (
    <>
      {loading ? (
        <OrderDetailsSkeleton />
      ) : (
        <div>
          <div className="flex items-center justify-between bg-gray-100 px-2 mb-3 mt-2 rounded-md shadow-md">
            <h1 className="text-2xl font-bold  py-1 rounded-md flex items-center gap-2 text-gray-700">
              Order Show
            </h1>
          </div>

          <div className="w-full flex justify-between items-center bg-gray-100 p-2   rounded-md gap-4 shadow-md">
            <h2 className="text-xl font-bold">
              Order #{orderDetails?.order_id}
            </h2>
            <span
              className={`${
                orderDetails?.order_status == "cancelled"
                  ? "bg-red-200"
                  : "bg-green-200"
              }  text-green-700 px-2 py-1  rounded-sm text-sm`}
            >
              {orderDetails?.order_status}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 ">
            <p>
              <strong>Paid on:</strong>{" "}
              {orderDetails?.created_at &&
                format(new Date(orderDetails?.created_at), "d MMM yyyy")}
            </p>
            <p>
              <strong>Placed on:</strong>{" "}
              {orderDetails?.updated_at &&
                format(new Date(orderDetails?.updated_at), "d MMM yyyy")}
            </p>
            <p>
              <strong>Updated:</strong>{" "}
              {orderDetails?.updated_at &&
                format(new Date(orderDetails?.updated_at), "d MMM yyyy")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-bold mb-2">Customer & Order</h3>
              <p>Name : {orderDetails.shipping_address?.name}</p>
              <p>Email : {orderDetails.shipping_address?.email}</p>
              <p>Phone : {orderDetails.shipping_address?.phone}</p>
              <p>PO : {orderDetails.shipping_address?.postal_code}</p>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-bold mb-2">Shipping Address</h3>
              <p>
                {orderDetails.shipping_address?.address_line1},{" "}
                {orderDetails.shipping_address?.address_line2},{" "}
                {orderDetails.shipping_address?.union?.name},{" "}
                {orderDetails.shipping_address?.upazila?.name}, <br />
                {orderDetails.shipping_address?.district?.name},{" "}
                {orderDetails.shipping_address?.division?.name},{" "}
                {orderDetails.shipping_address?.country}
              </p>
            </div>

            <div className="bg-white shadow p-4 rounded">
              <h3 className="font-bold mb-2">Billing Address</h3>
              <p>
                {orderDetails.shipping_address?.address_line1},{" "}
                {orderDetails.shipping_address?.address_line2},{" "}
                {orderDetails.shipping_address?.union?.name},{" "}
                {orderDetails.shipping_address?.upazila?.name}, <br />
                {orderDetails.shipping_address?.district?.name},{" "}
                {orderDetails.shipping_address?.division?.name},{" "}
                {orderDetails.shipping_address?.country}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white shadow p-4 rounded">
            <h3 className="font-bold mb-4">Items Ordered</h3>
            <div className="mt-4 space-y-4">
              {orderItems.map((product) => (
                <div
                  key={product?.order_item_id}
                  className="border-b p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2"
                >
                  <Image
                    height={60}
                    width={60}
                    src={`${process.env.NEXT_PUBLIC_API_SERVER}${product?.product?.thumbnail_image}`}
                    alt=""
                  />
                  <div className="flex-1">
                    <p className="font-medium">{product?.product?.title}</p>
                    <div className="flex flex-wrap gap-2 text-sm text-gray-500">
                      {product?.color?.name && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {product?.color?.name}
                        </span>
                      )}
                      {product?.attribute?.name && (
                        <span className="bg-gray-100 px-2 py-1 rounded">
                          {product?.attribute?.name}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-sm flex  items-center md:gap-10 gap-4 items-start sm:items-end">
                    <p>
                      Price:{" "}
                      {product?.sell_price || product?.product?.sell_price}
                    </p>
                    <p className=" text-start">Quantity: {product?.qty}</p>
                    {orderDetails?.order_status === "delivered" && (
                      <button
                        onClick={() => handleReviewModal(product)}
                        className="text-yellow-500 text-nowrape"
                      >
                        Write Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <p>
                <strong>Subtotal:</strong> {orderDetails?.total_amount}
              </p>
            </div>
          </div>

          <div className="mt-6 bg-white shadow p-4 rounded">
            <h3 className="font-bold mb-4">Invoices</h3>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between flex-wrap">
              <div className="flex items-center">
                <span className="font-semibold mr-2">No:</span>
                <span>{orderDetails?.tran_id}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Amount:</span>
                <span>{orderDetails?.total_amount} tk</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Customer:</span>
                <span>{orderDetails?.shipping_address?.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Status:</span>
                <span>{orderDetails?.payment_status}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold mr-2">Date:</span>
                <span>
                  {orderDetails?.created_at &&
                    format(new Date(orderDetails?.created_at), "d MMM yyyy")}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-end gap-4">
            <button
              disabled={orderDetails?.order_status !== "processing"}
              className="relative overflow-hidden border border-gray-300 h-10 w-32 rounded bg-red-300 hover:bg-red-500 flex items-center justify-center font-medium text-sm text-gray-800 transition-all duration-300 hover:text-white group
before:bg-red-500 before:absolute before:inset-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-300 group-hover:before:scale-x-100 before:z-0 z-10 "
              onClick={() => handleCancelProduct(id)}
            >
              {btnLoading ? <Spinner className="h-5 w-5" /> : "Cancel Order"}
            </button>
          </div>
        </div>
      )}
      {isOpen && (
        <ReviewModal
          isOpen={isOpen}
          onClose={handleReviewModal}
          product={reviewProduct}
        />
      )}
    </>
  );
};

export default OrderDetails;

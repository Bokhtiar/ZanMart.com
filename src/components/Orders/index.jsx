import { privateRequest } from "@/config/axios.config";
import isAuth from "@/middleware/auth.middleware";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiEyeLine } from "react-icons/ri";

const Orders = () => {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({}); // Track expanded orders

  const fetchOrders = async (status = "") => {
    try {
      setLoading(true);
      const res = await privateRequest.get(
        `user/orders?order_status=${status}`
      );
      setData(res?.data?.data || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatus = (status) => {
    setSelectedStatus(status);
    fetchOrders(status);
  };

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const renderStatus = (status) => {
    switch (status) {
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "cenceled":
        return "Canceled";
      default:
        return "All Orders";
    }
  };

  return (
    <div className="container mx-auto my-10 p-4 sm:p-5">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">
        Your Orders
      </h1>
      <hr className="border" />
      <div className="flex flex-wrap justify-start gap-2 sm:gap-4 mt-2 pb-4">
        {["", "processing", "shipped", "delivered", "canceled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => handleStatus(status)}
              className={`py-2 px-3 sm:px-4 text-sm font-semibold rounded ${
                selectedStatus === status
                  ? "text-primary border-b-2 border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {renderStatus(status)}
            </button>
          )
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="space-y-4">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item?.id}
                className="flex flex-col bg-white shadow rounded-md p-4 sm:p-5 space-y-4"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Order ID:</span>{" "}
                      <span className="text-primary font-bold">
                        {item["order Details"]?.order_id}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Customer:</span>{" "}
                      {item["order Details"]?.shipping_address?.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Phone:</span>{" "}
                      {item["order Details"]?.shipping_address?.phone}
                    </p>
                  </div>

                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex  items-center md:blok">
                      <span className="text-sm text-gray-600 font-medium">
                        Price:
                      </span>
                      <span className="text-lg text-primary font-bold">
                        {item["order Details"]?.total_amount} Tk
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="flex  justify-start items-center">
                      <p className="text-sm text-gray-600 font-medium">
                        Product Quantity:
                      </p>
                      <p className="text-lg text-primary font-bold">
                        {item["order item"].length}
                      </p>
                    </div>
                  </div>
                  <div className="flex md:flex-col flex-row md:items-center justify-between gap-2">
                    <p
                      className={`px-4 py-2 rounded-full text-sm font-medium ${
                        item["order Details"]?.order_status === "delivered"
                          ? "bg-green-100 text-green-600"
                          : "bg-primary text-white"
                      }`}
                    >
                      {renderStatus(item["order Details"]?.order_status)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() =>
                          toggleOrderDetails(item["order Details"]?.order_id)
                        }
                        className="flex items-center gap-2 px-4 lg:py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-md"
                      >
                        <RiEyeLine />
                        {expandedOrders[item["order Details"]?.order_id]
                          ? "Hide Details"
                          : "View More"}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-end justify-end">
                    <Link
                      href={`/profile?section=order-details&id=${item["order Details"]?.order_id}`}
                      className="flex  gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-sm rounded-md"
                    >
                      Details
                    </Link>
                  </div>
                </div>

                {/* Order Items Section */}
                {expandedOrders[item["order Details"]?.order_id] && (
                  <div className="mt-4 space-y-2">
                    {item["order item"]?.map((product) => (
                      <div
                        key={product?.order_item_id}
                        className="border-b py-2 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
                      >
                        <Image
                          height={60}
                          width={60}
                          src={`${process.env.NEXT_PUBLIC_API_SERVER}${product?.product?.thumbnail_image}`}
                          alt=""
                          className="h-12 w-12"
                        />
                        <p className="flex-1 text-sm font-medium text-gray-700">
                          <span className="block text-base">
                            {product?.product?.title}
                          </span>
                          <span className="text-sm text-gray-500">
                            {product?.color?.name && (
                              <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded">
                                {product?.color?.name}
                              </span>
                            )}
                            {product?.attribute?.name && (
                              <span className="inline-block bg-gray-100 text-gray-600 px-2 py-1 rounded ml-2">
                                {product?.attribute?.name}
                              </span>
                            )}
                          </span>
                        </p>
                        <p className="text-sm">
                          Price:{" "}
                          {product?.sell_price || product?.product?.sell_price}{" "}
                          Tk
                        </p>
                        <p className="text-sm">Quantity: {product?.qty}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No orders found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default isAuth(Orders);

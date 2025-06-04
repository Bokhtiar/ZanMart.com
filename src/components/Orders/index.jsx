import { privateRequest } from "@/config/axios.config";
import isAuth from "@/middleware/auth.middleware";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiEyeLine } from "react-icons/ri";
import { FaRegListAlt } from "react-icons/fa";
import { CiCircleChevDown } from "react-icons/ci";
import OrderSkeleton from "../loader/OrderSkeleton";
import { useRouter } from "next/router";
import { TbCurrencyTaka } from "react-icons/tb";

const Orders = () => {
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [expandedOrders, setExpandedOrders] = useState({}); // Track expanded orders
  const router = useRouter();
  const fetchOrders = async (status = "") => {
    try {
      setLoading(true);
      const res = await privateRequest.get(
        `user/orders?order_status=${status}`
      );
      setData(res?.data?.data || []);
    } catch (error) {
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
    if (!router.isReady) return;

    const statusFromQuery = router.query.order_status || "";
    setSelectedStatus(statusFromQuery);
    fetchOrders();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-600";
      case "shipped":
        return "bg-yellow-100 text-yellow-600";
      case "delivered":
        return "bg-green-100 text-green-600";
      case "cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const renderStatus = (status) => {
    switch (status) {
      case " ":
        return "All Orders";
      case "processing":
        return "Processing";
      case "shipped":
        return "Shipped";
      case "delivered":
        return "Delivered";
      case "Cancelled":
        return "Cancelled";
      default:
        return status;
    }
  };
  useEffect(() => {
    if (!router.isReady) return;

    router.replace(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          order_status: selectedStatus,
        },
      },
      undefined,
      { shallow: true }
    );
  }, [selectedStatus]);

  return (
    <div className="space-y-3 mt-2">
      <div className="flex items-center justify-between bg-gray-100 shadow-md ">
        <h1 className="text-xl md:text-2xl font-bold  px-2 py-1 rounded-md flex items-center gap-2 text-gray-700">
          <FaRegListAlt /> Order
        </h1>
      </div> 
      {/* button area  */}
      <div className="w-full flex overflow-x-auto justify-between gap-2 rounded-md  bg-gray-100 shadow-md py-2 px-2">
        {[" ", "processing", "shipped", "delivered", "Cancelled"].map(
          (status) => (
            <button
              key={status}
              onClick={() => handleStatus(status)}
              className={`w   text-sm font-semibold text-nowrap  ${
                selectedStatus === status
                  ? "text-primary border-b  border-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {renderStatus(status)}
            </button>
          )
        )}
      </div> 
      {/* button releted data fetch area show  */}
      {loading ? (
        <>
          {Array.from({ length: 10 }).map((_, index) => (
            <>
              <OrderSkeleton key={index} />
              <br />
            </>
          ))}
        </>
      ) : (
        <div className="space-y-3">
          {data.length > 0 ? (
            data.map((item) => (
              <div
                key={item?.id}
                className="bg-white shadow-md rounded-xl p-2 sm:p-3 border space-y-4"
              >
                {/* Order Top Row */}
                <div className="flex flex-wrap md:flex-nowrap justify-between items-start md:items-center gap-4">
                  {/* Order Info */}
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Order ID:</span>{" "}
                      <span className="text-blue-600 font-bold">
                        #{item["order Details"]?.order_id}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Name:</span>{" "}
                      {item["order Details"]?.shipping_address?.name}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Price</p>
                    <p className="text-lg font-bold text-primary flex items-center">
                      {Math.ceil(item["order Details"]?.total_amount)}{" "}
                      <TbCurrencyTaka />
                    </p>
                  </div>

                  {/* Quantity */}
                  <div className="text-center">
                    <p className="text-sm text-gray-500">Qty</p>
                    <p className="text-lg font-bold text-primary">
                      {item["order item"]?.length}
                    </p>
                  </div>

                  {/* Status */}
                  <div className="text-center">
                    <p
                      className={`inline-block px-4 py-1 rounded-full text-sm font-medium ${getStatusClass(
                        item["order Details"]?.order_status
                      )}`}
                    >
                      {renderStatus(item["order Details"]?.order_status)}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        toggleOrderDetails(item["order Details"]?.order_id)
                      }
                      className="p-2 bg-primary text-white hover:bg-gray-100 hover:text-primary rounded-md transition"
                      title="Toggle Items"
                    >
                      <CiCircleChevDown className="text-xl" />
                    </button>
                    <Link
                      href={`/profile/order-details/${item["order Details"]?.order_id}?order_status=${selectedStatus}`}
                      className="p-2 bg-blue-500 text-white hover:bg-gray-100 hover:text-blue-600 rounded-md transition"
                      title="View Details"
                    >
                      <RiEyeLine className="text-xl" />
                    </Link>
                  </div>
                </div>

                {/* Order Items Section */}
                {expandedOrders[item["order Details"]?.order_id] && (
                  <div className="pt-4 border-t space-y-3">
                    {item["order item"]?.map((product) => (
                      <div
                        key={product?.order_item_id}
                        className="flex flex-wrap sm:flex-nowrap gap-4 items-center border-b pb-3"
                      >
                        <Image
                          height={60}
                          width={60}
                          src={`${process.env.NEXT_PUBLIC_API_SERVER}${product?.product?.thumbnail_image}`}
                          alt={product?.product?.title}
                          className="rounded-md object-cover h-16 w-16"
                        />
                        <div className="flex-1">
                          <p className="font-semibold">
                            {product?.product?.title}
                          </p>
                          <div className="text-sm text-gray-500 space-x-2 mt-1">
                            {product?.color?.name && (
                              <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {product?.color?.name}
                              </span>
                            )}
                            {product?.attribute?.name && (
                              <span className="bg-gray-100 px-2 py-1 rounded text-gray-600">
                                {product?.attribute?.name}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <p className="text-sm text-gray-700">
                            Price:{" "}
                            <span className="font-semibold">
                              {product?.sell_price ||
                                product?.product?.sell_price}{" "}
                              Tk
                            </span>
                          </p>
                          <p className="text-sm text-gray-700">
                            Quantity:{" "}
                            <span className="font-semibold">
                              {product?.qty}
                            </span>
                          </p>
                        </div>
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

export default Orders;

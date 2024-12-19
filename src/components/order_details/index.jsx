import { privateRequest } from "@/config/axios.config";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import Image from "next/image";
const OrderDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [orderDetails, setOrderDetails] = useState([]);
  const [orderItems, setOrderitems] = useState([]);
  const fetchOrderDetails = useCallback(async () => {
    try {
      const res = await privateRequest.get(`user/order/${id}`);
      if (res.status == 200) {
        setOrderDetails(res?.data?.data["order Details"]);
        setOrderitems(res?.data?.data["order item"]);
      }
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchOrderDetails();
  }, []);
  return (
    <div className="container mx-auto my-10 p-5">
      <h1 className="text-2xl font-bold mb-6"> Your Orders</h1>
      <hr className="border-2" />

      <div className="flex justify-between items-center bg-white p-4 shadow rounded">
        <div>
          <h2 className="text-xl font-bold">Order {orderDetails?.order_id}</h2>
          <span className="bg-green-200 text-green-700 px-2 py-1 rounded text-sm">
            {orderDetails?.order_status}
          </span>
        </div>
        <div className="flex gap-2">
          <button className="border border-gray-300 px-4 py-2 rounded">
            Export
          </button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">
            Create shipping label
          </button>
        </div>
      </div>

      {/* Dates */}
      <div className="mt-4 grid grid-cols-3 gap-4">
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
          <strong>Updated: </strong>
          {orderDetails?.updated_at &&
            format(new Date(orderDetails?.updated_at), "d MMM yyyy")}
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {/* Customer & Order Card */}
        <div className="bg-white shadow p-4 rounded">
          <h3 className="font-bold mb-2">Customer & Order</h3>
          <p>Name: {orderDetails.shipping_address?.name}</p>
          <p>Email: {orderDetails.shipping_address?.email}</p>
          <p>Phone: {orderDetails.shipping_address?.phone}</p>
          <p>PO: {orderDetails.shipping_address?.postal_code}</p>
          {/* <p>Payment terms: {orderDetails.customer.paymentTerms}</p>
          <p>Delivery method: {orderDetails.customer.deliveryMethod}</p> */}
        </div>

        {/* Shipping Address Card */}
        <div className="bg-white shadow p-4 rounded">
          <h3 className="font-bold mb-2">Shipping Address</h3>
          <p className="text-start ">
          {orderDetails.shipping_address?.address_line1},{' '}
    {orderDetails.shipping_address?.address_line2},{' '}
    {orderDetails.shipping_address?.union?.name}{' '}
    {orderDetails.shipping_address?.upazila?.name},{' '} <br />
    {orderDetails.shipping_address?.district?.name},{' '}
    {orderDetails.shipping_address?.division?.name},{' '}
    {orderDetails.shipping_address?.country},{' '}
          </p>
        </div>

        {/* Billing Address Card */}
        <div className="bg-white shadow p-4 rounded">
  <h3 className="font-bold mb-2">Billing Address</h3>
  <p className="text-start whitespace-nowrap">
    {orderDetails.shipping_address?.address_line1},{' '}
    {orderDetails.shipping_address?.address_line2},{' '}
    {orderDetails.shipping_address?.union?.name}{' '}
    {orderDetails.shipping_address?.upazila?.name},{' '} <br />
    {orderDetails.shipping_address?.district?.name},{' '}
    {orderDetails.shipping_address?.division?.name},{' '}
    {orderDetails.shipping_address?.country},{' '}
   
    

 
  </p>
</div>

      </div>

      {/* Items Ordered */}
      <div className="mt-6 bg-white shadow p-4 rounded">
        <h3 className="font-bold mb-4">Items Ordered</h3>
        <div className="mt-4">
                    {orderItems.map((product) => (
                      <div
                        key={product?.order_item_id}
                        className="border-b mt-2 p-2 flex justify-between items-center"
                      >
                        <Image
                          height={60}
                          width={60}
                          src={`${process.env.NEXT_PUBLIC_API_SERVER}${product?.product?.thumbnail_image}`}
                          alt=""
                          className=""
                        />
                        <p className="text-sm flex flex-col font-medium text-gray-700">
                          <span className="text-base  ">
                            {product?.product?.title}
                          </span>
                          <span className="text-sm text-gray-500 ml-2">
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

                        <p>
                          Price:{" "}
                          {product?.sell_price || product?.product?.sell_price}
                        </p>
                        <p>Quantity: {product?.qty}</p>
                      </div>
                    ))}
                  </div>
        <div className="mt-4">
          <p>
            <strong>Subtotal:</strong> {orderDetails?.total_amount}
          </p>
          
          <p className="font-bold">
            {/* <strong>Total:</strong> ${orderDetails.total.toFixed(2)} */}
          </p>
        </div>
      </div>

      {/* Invoices */}
      <div className="mt-6 bg-white shadow p-4 rounded">
        <h3 className="font-bold mb-4">Invoices</h3>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="border-b pb-2">No</th>
              <th className="border-b pb-2">Amount</th>
              <th className="border-b pb-2">Customer</th>
              <th className="border-b pb-2">Status</th>
              <th className="border-b pb-2">Date</th>
            </tr>
          </thead>
          <tbody>
           
              <tr >
                <td>{orderDetails?.tran_id}</td>
                <td>{orderDetails?.total_amount}tk</td>
                <td>{orderDetails?.shipping_address?.name}</td>
                <td>{orderDetails?.payment_status}</td>
                <td>{orderDetails?.created_at &&
            format(new Date(orderDetails?.created_at), "d MMM yyyy")}</td>
              </tr>
           
          </tbody>
        </table>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 flex justify-end gap-4">
        <button className="border border-gray-300 px-4 py-2 rounded">
          Cancel
        </button>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Ship Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetails;

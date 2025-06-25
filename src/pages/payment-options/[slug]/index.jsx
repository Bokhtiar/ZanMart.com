import PaymentSkeleton from "@/components/loader/PaymentSkeleton";
import Spinner from "@/components/spinner";
import { Toastify } from "@/components/toastify";
import { privateRequest } from "@/config/axios.config";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const PaymentOption = () => {
  const router = useRouter();
  const { slug } = router?.query;
  const [orderItem, setOrderItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  // user order fetch
  useEffect(() => {
    const fetchOrder = async (slug) => {
      try {
        const result = await privateRequest.get(`user/order/${slug}`);
        setOrderItem(result?.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    if (slug) {
      fetchOrder(slug);
    }
  }, [slug]);
  // confirm order
  const handlePaymentConfirm = async () => {
    setBtnLoading(true);
    try {
      const payload = {
        payment_method: "cod",
        delivery_charge:
          orderItem?.[
            "order Details"
          ]?.shipping_address?.district?.name?.toLowerCase() === "dhaka"
            ? 70
            : 120,
      };
      const res = await privateRequest.post(`user/payments/${slug}`, {
        payload,
      });
      Toastify.Success("Order Recieved "); 
       router?.push("/profile/orders");
       setBtnLoading(false);
    } catch (error) {
      Toastify.Error("Order Recieved failed");
      setBtnLoading(false);
    }
  };
  if (loading) return <PaymentSkeleton />;
  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-semibold mb-2">Recommended Method</h2>
            <div className="bg-white rounded-lg p-4 flex justify-between items-center shadow-sm   transition cursor-text">
              <p className="font-bold text-xl ">
                {" "}
                <input type="checkbox" checked={true} readOnly /> Cash On
                Delivery
              </p>
              <span className="text-xl text-gray-400">&gt;</span>
            </div>
          </div>
          {/* <div>
            <h2 className="text-lg font-semibold mb-2">Other Methods</h2> 
            <div className="bg-white rounded-lg p-4 text-gray-500 shadow-sm text-xl">
              Coming soon...
            </div>
            <div className="flex items-center gap-3 mt-2">
              <Image
                src="/images/bkash.svg"
                alt="wallet"
                className="h-6 w-6 text-pink-500"
                width={100}
                height={100}
              />
              <Image
                src="/images/nagad.svg"
                alt="MasterCard"
                className="h-5 w-5"
                width={100}
                height={100}
              />
              <Image
                src="/images/visa.svg"
                alt="Visa"
                className="h-5 w-5"
                width={100}
                height={100}
              />
            </div>
          </div> */}
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow p-6 h-fit">
          <h3 className="text-lg font-semibold mb-4">Order Summary</h3>

          <div className="flex justify-between text-sm mb-2 gap-2 flex-shrink-0">
            <span className="flex">
              Subtotal{" "}
              <span className="  text-nowrap">
                ( {orderItem?.["order item"]?.length} Items)
              </span>
            </span>
            <span className="font-medium text-nowrap">
              ৳ {Math.ceil(orderItem?.["order Details"]?.total_amount)}
            </span>
          </div>

          <hr className="my-3" />

          <div className="flex justify-between text-base font-semibold mb-4">
            <span>Total</span>
            <span className="text-nowrap">
              ৳ {Math.ceil(orderItem?.["order Details"]?.total_amount)}
            </span>
          </div>

          <button
            onClick={handlePaymentConfirm}
            disabled={btnLoading}
            className="fixed bottom-0 left-0 md:static w-full bg-gradient-to-r from-blue-500 to-blue-300 text-white font-semibold h-12 rounded-full hover:opacity-90 transition"
          >
            {btnLoading ? <Spinner /> : " Proceed to Pay"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentOption;

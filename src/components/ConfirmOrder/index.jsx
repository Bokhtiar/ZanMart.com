import React, { useEffect, useState } from "react";
import { IoArrowBack, IoClose, FaHome, CiEdit, MdLocationOff } from "@/icons";
import { privateRequest } from "@/config/axios.config";
import { useRouter } from "next/router";
import isAuth from "@/middleware/auth.middleware";
import { Toastify } from "../toastify";
import Spinner from "../spinner";
import ConfirmOrderSkeleton from "../loader/ConfirmOrderSkeleton";
import Image from "next/image";
import { useCart } from "@/contex/CartContext";
import Drawer from "react-modern-drawer";
import useLocationFetch from "@/hooks/api/useLocationApiFetch";
import CreateAddress from "../Address/CreateAddress";
import EditAddress from "../Address/EditAddress";
const ConfirmOrder = () => {
  const router = useRouter();
  const { clear: clearCart } = useCart();
  const { data: addressData, refetch } = useLocationFetch("user/address");
  const [loading, setLoading] = useState(true);
  const [orderItem, setOrderItem] = useState([]);
  const [address, setAddress] = useState({});
  const [btnLoading, setBtnLoading] = useState();
  // address default find for this page
  const fetchAddress = async (item) => {
    try {
      const response = await privateRequest.get("user/address/default");
      setLoading(false);
      setAddress(response?.data?.data);
    } catch (error) {
      setLoading(false);
      // Toastify.Error("Address Get Failed");
    }
  };
  useEffect(() => {
    fetchAddress();
  }, []);
  // order summary for find order item from localStorage
  useEffect(() => {
    setOrderItem(JSON?.parse(localStorage?.getItem("orderItems")));
  }, []);

  // inside dhaka outside dhaka amount update
  const deliveryAmount = () =>
    address?.district?.name?.toLowerCase() === "dhaka" ? 70 : 120;
  const shippingAddressSet = (item) => {
    return address?.[item];
  };
  // total ammount count
  const subtotalAmount = orderItem.reduce((acc, cur) => {
    return acc + (cur?.sell_price || 0) * (cur?.qty || 0);
  }, 0);
  // order place api call
  const handleOrderPlace = async () => {
    if (!address?.address_id)
      return Toastify.Error("Please Create Address for order Product");
    setBtnLoading(true);
    const newMyOrder = {
      cart_items: orderItem,
      billing_address_id: address?.address_id,
      shipping_address_id: address?.address_id,
      delivery_charge: deliveryAmount(),
    };
    try {
      const res = await privateRequest.post("user/orders", newMyOrder);
      if (res?.status === 200 || res?.status === 201) {
        router?.query?.bestApplied && clearCart();
        Toastify.Success(res?.data?.message);
        router.push(`/payment-options/${res?.data?.order_id?.order_id}`);
        localStorage.setItem("orderItems", JSON.stringify([]));
        setBtnLoading(false);
      }
    } catch (error) {
      Toastify.Error("Order Place Failed");
      setBtnLoading(false);
    }
  };
  //  now working on setup in address default address edit address add address
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openType, setOpenType] = useState("");
  const handleOpenDrawer = () => {
    setOpenType("default");
    setOpenDrawer(!openDrawer);
  };
  if (loading) return <ConfirmOrderSkeleton />;
  return (
    <div className="container-custom mx-auto  ">
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left Content */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Information */}
          <div className="bg-white p-5 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>
            {/* drawer design  */}
            <Drawer
              open={openDrawer}
              onClose={handleOpenDrawer}
              direction="right"
              style={{
                width: "100%", // default for mobile
                maxWidth: "450px", // limit width on larger screens
              }}
              className="w-full sm:w-[450px]"
            >
              <div className="max-w-2xl mx-auto p-4 bg-white rounded shadow-sm h-full max-h-screen overflow-y-auto ">
                <div className="flex items-center gap-2 pb-2  ">
                  <button
                    onClick={() => setOpenDrawer(false)}
                    className="flex items-center text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    <IoArrowBack className="text-xl mr-1" />
                    <span>Back to Checkout</span>
                  </button>
                </div>
                {openType === "create" && (
                  <CreateAddress
                    refetch={fetchAddress}
                    setOpenDrawer={setOpenDrawer}
                  />
                )}
                {openType === "edit" && (
                  <EditAddress
                    refetch={fetchAddress}
                    setOpenDrawer={setOpenDrawer}
                  />
                )}
                {/* default address fetch  */}
                {openType === "default" && (
                  <AddressDefault
                    fetchAddress={fetchAddress}
                    setOpenDrawer={setOpenDrawer}
                    setOpenType={setOpenType}
                    addressData={addressData}
                    refetch={refetch}
                  />
                )}
              </div>
            </Drawer>
            {/* shipping information show  */}
            {shippingAddressSet("address_line1") ? (
              <div className="border p-4 rounded text-sm space-y-1 ">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-semibold">
                      {shippingAddressSet("name")}
                    </span>
                    <span className="bg-blue-200/50 rounded-md ml-1 px-1">
                      Default address
                    </span>
                  </div>
                  <button
                    className="border rounded-md px-1 py-0.5 font-normal cursor-pointer  bg-blue-200/50 text-nowrap flex gap-1 flex-nowrap items-center justify-center"
                    onClick={handleOpenDrawer}
                  >
                    <FaHome className="text-blue-600" /> address
                  </button>
                </div>
                <div>
                  <p>{shippingAddressSet("phone")}</p>
                  <p> {shippingAddressSet("address_line1")}</p>
                  <p>
                    {shippingAddressSet("upazila")?.name},{" "}
                    {shippingAddressSet("district")?.name},{" "}
                    {shippingAddressSet("division")?.name}{" "}
                  </p>
                </div>

                <button
                  className="border rounded-md px-1 py-0.5 font-normal cursor-pointer bg-gray-100 text-nowrap flex gap-1 flex-nowrap item-center justify-center"
                  onClick={() => {
                    router.push({
                      pathname: router.pathname,
                      query: {
                        ...router.query,
                        id: address?.address_id,
                      },
                    });
                    setOpenType("edit");
                    setOpenDrawer(true);
                  }}
                >
                  <CiEdit /> edit address
                </button>
              </div>
            ) : (
              <div className="flex items-center justify-center   px-4  w-full">
                <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
                  <MdLocationOff className="text-red-500 text-6xl mx-auto mb-4" />
                  <h1 className="text-2xl font-semibold text-gray-800 mb-2">
                    Address Not Found
                  </h1>
                  <p className="text-gray-600">
                    No address is currently saved. Please add an address to
                    continue.
                  </p>
                  <button
                    onClick={() => {
                      setOpenType("create");
                      setOpenDrawer(true);
                    }}
                    className="text-white hover:underline text-sm bg-blue-500/80 px-3 py-2 rounded-md mt-1 hover:bg-blue-500/50 "
                  >
                    Add new address
                  </button>
                </div>
              </div>
            )}
          </div>
          {/* here show product details  */}
          <div>
            <h1 className="text-black border-b-2 shadow-sm font-semibold px-4 pb-2 text-lg">
              Order Summary - {orderItem?.length} items
            </h1>
            <div className="flex-1 space-y-4 mt-2">
              {/* Headers - hidden on mobile */}
              <div className="grid grid-cols-12 overflow-x-auto gap-2 bg-gray-200 px-2 py-2 rounded-lg">
                <div className="col-span-6">Product Details</div>
                <div className="col-span-2 text-center">Price</div>
                <div className="col-span-2 text-center">QTY</div>
                <div className="col-span-2 text-right">Total</div>
              </div>
              {/* product show  */}
              {orderItem.map((item, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-12 overflow-x-auto gap-2"
                >
                  <div className=" col-span-6 flex items-start gap-4">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.image}`}
                      alt={item?.product?.title}
                      className="w-16 h-16 object-cover rounded"
                      width={100}
                      height={100}
                    />
                    <div>
                      {" "}
                      <p className="font-medium line-clamp-3">{item?.title}</p>
                    </div>
                  </div>

                  <div className=" col-span-2 text-center ">
                    <p className="text-gray-800 font-semibold text-nowrap">
                      ৳ {Math.ceil(item?.sell_price)}{" "}
                    </p>
                  </div>
                  <p className="text-nowrap  col-span-2 text-center">
                    {item?.qty}
                  </p>
                  <div className=" col-span-2 text-right font-medium text-nowrap">
                    ৳ {Math.ceil(item?.sell_price) * item?.qty}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Order Summary */}
        <div className="bg-white p-5 rounded   space-y-4">
          <h2 className="text-lg font-semibold">Order Summary</h2>
          <div className="border-t pt-4 text-sm space-y-2">
            <div className="flex justify-between">
              <span>Subtotal ({orderItem?.length} items)</span>
              <span className="text-nowrap">৳ {Math.ceil(subtotalAmount)}</span>
            </div>
            <div className="flex justify-between ">
              <span>Shipping </span>
              <span className="text-nowrap">৳ {deliveryAmount()}</span>
            </div>
          </div>
          <div className="border-t pt-4 text-base font-semibold flex justify-between">
            <span>Total</span>
            <span className="text-blue-600 text-nowrap">
              ৳ {Math.ceil(subtotalAmount) + deliveryAmount()}
            </span>
          </div>
          <button
            className="fixed bottom-0 left-0 md:static w-full bg-gradient-to-r from-blue-600 to-blue-400 text-white font-semibold h-9 rounded hover:opacity-90 transition cursor-pointer "
            onClick={handleOrderPlace}
            disabled={btnLoading}
          >
            {btnLoading ? <Spinner /> : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default isAuth(ConfirmOrder);
const AddressDefault = ({
  fetchAddress,
  setOpenDrawer,
  setOpenType,
  addressData,
  refetch,
}) => {
  const [address, setAddress] = useState({});
  const [selectedAddressId, setSelectedAddressId] = useState(
    addressData.find((a) => a.default_address === 1)?.address_id
  );
  const handleDefaultAddressChange = async () => {
    if (!selectedAddressId) return Toastify.Error("Please Select address");
    try {
      const response = await privateRequest.post(
        "user/address/default/change",
        { addressId: address?.address_id }
      );
      if (response?.status) {
        Toastify.Success("Successfully Update Default address");
        refetch();
        fetchAddress();
        setOpenDrawer(false);
      }
    } catch (error) {
      Toastify.Error(error?.message);
    }
  };
  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">
          Shipping Address
        </h2>
        <button
          onClick={() => {
            setOpenType("create");
            setOpenDrawer(true);
          }}
          className="text-blue-600 hover:underline text-sm"
        >
          Add new address
        </button>
        {/* create modal  */}
      </div>

      {/* Address List */}
      {addressData.map((address, index) => (
        <div
          key={index}
          className={`border rounded-lg p-5 mb-4 cursor-pointer ${
            selectedAddressId === address?.address_id ||
            (!selectedAddressId && address?.default_address)
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300"
          }`}
          onClick={() => {
            setAddress(address);
            setSelectedAddressId(address?.address_id);
          }}
        >
          <div className="flex items-start gap-4">
            <input
              type="radio"
              name="address"
              className="mt-1 accent-blue-500 cursor-pointer"
              checked={
                selectedAddressId === address?.address_id ||
                (!selectedAddressId && address?.default_address)
              }
              onChange={() => {
                setAddress(address);
                setSelectedAddressId(address?.address_id);
              }}
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <div className="text-base font-medium text-gray-800">
                  {address?.name}
                  <span className="text-gray-500 text-sm">
                    {address?.phone}
                  </span>
                </div>
                <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded">
                  {address?.type}
                </span>
              </div>
              {!address?.default_address && (
                <p className="text-sm text-gray-600 mt-1 bg-blue-100 px-1 py-0.5 rounded-md">
                  Use as default shipping address
                </p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Region: {address?.address_line1},{address?.upazila?.name},
                {address?.district?.name},{address?.division?.name}
              </p>
              {address?.default_address === 1 && (
                <div className="mt-3 flex gap-2">
                  <button className="text-xs px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50">
                    Default Shipping Address
                  </button>
                  <button className="text-xs px-3 py-1 border border-blue-500 text-blue-600 rounded hover:bg-blue-50">
                    Default Billing Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* Buttons */}
      <div className="flex justify-end gap-4 mt-6   bg-white">
        {/* <button
          onClick={() => setOpenDrawer(false)}
          className="px-6 py-2 border rounded text-gray-600 border-gray-300 hover:bg-gray-100"
        >
          CANCEL
        </button> */}
        <button
          onClick={handleDefaultAddressChange}
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          SAVE
        </button>
      </div>
    </>
  );
};

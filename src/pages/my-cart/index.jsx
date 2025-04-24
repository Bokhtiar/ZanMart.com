import { privateRequest } from "@/config/axios.config";
import Image from "next/image";
import React, { useState, useEffect, useCallback } from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";
import { BsCartXFill } from "react-icons/bs";
import { useRouter } from "next/router";
import { FaCheckCircle, FaPlusCircle, FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import CartSkeleton from "@/components/loader/CartSkeleton";
import AddressModal from "@/components/AddressModal";
import { Toastify } from "@/components/toastify";
import AddressForm from "@/pages/profile/addressForm";
import { networkErrorHandeller } from "@/utils/helpers";
import ConfirmModal from "@/components/confirmModal";

const MyCart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [cart, setCart] = useState({ cart_items: [] });
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [modalLoading,setModalLoading]=useState(false)
  const router = useRouter();
  const { modal } = router.query;
  useEffect(() => {
    if (modal) {
      setIsModalOpen(true);
    }
  }, [modal]);
  
  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const parsedCart = JSON.parse(cartData);
        const updatedCartItems = [...parsedCart.cart_items];
        await Promise.all(
          updatedCartItems.map(async (item, index) => {
            try {
              const response = await privateRequest.get(
                `/current/product/price?product_id=${item.product_id}&product_variant_id=${item.product_variant_id}`
              );
              if (response.data?.data.price) {
                updatedCartItems[index].sell_price = response.data?.data.price;
              }
            } catch (error) {}
          })
        );
        const updatedCart = { ...parsedCart, cart_items: updatedCartItems };
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      setLoading(false);
    };
    fetchCartData();
  }, []);

  const data = cart?.cart_items;

  const handleIncrease = (product_id) => {
    const currentQuantity = quantities[product_id] || 1;
    const updatedQuantities = {
      ...quantities,
      [product_id]: currentQuantity + 1,
    };
    setQuantities(updatedQuantities);
    updateCartInLocalStorage(product_id, updatedQuantities[product_id]);
  };

  const handleDecrease = (product_id) => {
    const updatedQuantities = {
      ...quantities,
      [product_id]: Math.max((quantities[product_id] || 1) - 1, 1),
    };
    setQuantities(updatedQuantities);
    updateCartInLocalStorage(product_id, updatedQuantities[product_id]);
  };

  const updateCartInLocalStorage = (product_id, newQuantity) => {
    const updatedCart = { ...cart };
    const cartItemIndex = updatedCart.cart_items.findIndex(
      (item) => item.product_id === product_id
    );
    if (cartItemIndex !== -1) {
      updatedCart.cart_items[cartItemIndex].qty = newQuantity;
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  const calculateSubtotal = () => {
    return data.reduce(
      (acc, item) =>
        acc + item.sell_price * (quantities[item.product_id] || item.qty),
      0
    );
  };

  const handleDelete = (id) => {
    const updatedCartItems = data.filter(
      (item) => item.product_variant_id !== id
    );
    const updatedCart = { ...cart, cart_items: updatedCartItems };
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const hasPrePaymentOnly = data.some((item) => item.payment !== "cash");

  const cartForOrder = {
    cart_items: cart.cart_items.map(
      ({ image, payment, title, color, attribute, ...rest }) => rest
    ),
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const [addressData, setAddressData] = useState({});

  const handleCheckout = () => {
    setIsModalOpen(true);
    setModalAction("confirm");
  };

  const handleConfirm = async () => {
    const newMyOrder = {
      ...cartForOrder,
      billing_address_id: addressData?.address_id,
      shipping_address_id: addressData?.address_id,
    };
    try {
      if (newMyOrder?.shipping_address_id && newMyOrder?.billing_address_id) {
        setModalLoading(false)
        const res = await privateRequest.post("user/orders", newMyOrder);
        if (res?.status === 200 || res?.status === 201) {
          Toastify.Success(res.data?.message);
          const emptyCart = { ...cart, cart_items: [] };
          setCart(emptyCart);
          localStorage.setItem("cart", JSON.stringify(emptyCart));
          window.dispatchEvent(new Event("cartUpdated"));
          router.push(
            `/profile/confirm-order/${res?.data?.order_id?.order_id}`
          );
          setModalLoading(false)
        } 
      } else {
        Toastify.Error("Please select an address");
      }
    } catch (error) {
      Toastify.Error(error.response.data.message)
      setModalLoading(false)
    }
  };

  return (
    <div className="container-custom">
      <div className="flex items-center mt-40 justify-between bg-gray-100 px-2 mb-3 rounded-md">
        <h1 className="text-2xl font-bold py-1 rounded-md flex items-center gap-2 text-gray-700">
          <FaShoppingCart /> Your Cart
        </h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 bg-gray-100 p-3">
        <div className="w-full">
          {loading ? (
            <CartSkeleton />
          ) : data?.length > 0 ? (
            <div className="flex flex-col gap-4">
              {data.map((item) => (
                <div
                  key={item?.product_id}
                  className="flex flex-col sm:flex-row items-center bg-white shadow-custom2 p-3 rounded-lg gap-3"
                >
                  <Image
                    height={500}
                    width={500}
                    className="h-24 w-24 object-cover rounded-lg"
                    src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.image}`}
                    alt={item.title}
                  />
                  <div className="flex-grow">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      <span className="text-[#FFAA00]">{item?.category}</span> |
                      Color: {item?.color} | Size: {item?.attribute}
                    </p>
                  </div>
                  <div className="flex flex-row  gap-4 ">
                    <div className="text-center">
                      <p className="text-xs font-bold">Price</p>
                      <p className="text-sm font-bold text-primary">
                        {item?.sell_price} Tk
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold">Subtotal</p>
                      <p className="text-sm font-bold text-primary">
                        {(
                          item?.sell_price *
                          (quantities[item.product_id] || item.qty)
                        ).toFixed(2)}{" "}
                        Tk
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <p className="text-xs font-bold">Quantity</p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDecrease(item.product_id)}
                        className="p-1 border rounded"
                      >
                        -
                      </button>
                      <span>{quantities[item.product_id] || item.qty}</span>
                      <button
                        onClick={() => handleIncrease(item.product_id)}
                        className="p-1 border rounded"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleDelete(item.product_variant_id)}
                      className="text-xs text-red-500 flex items-center gap-1"
                    >
                      <RiDeleteBin6Line /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center">
              {/* <div className="w-64 h-64">
                <BsCartXFill className="w-64 h-64 text-primary" />
              </div>
              <h2 className="text-2xl font-bold text-orange-500 mt-5">
                Your cart is empty
              </h2>
              <p className="text-gray-600 mt-2">
                Looks like you haven’t added anything to your cart yet
              </p> */}
              <Image
                height={400}
                width={400}
                className="mx-auto "
                src="/empty_cart.png"
                alt="Logo"
              />
              <button
                className="mt-5 px-6 py-2 bg-primary text-white rounded-lg"
                onClick={() => (window.location.href = "/products")}
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {cart?.cart_items?.length > 0 && !loading && (
          <div className="w-full lg:w-1/3 p-5 bg-white shadow-custom2 rounded-lg">
            <p className="text-sm font-bold mb-4">Total Summary</p>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs">Subtotal ({data.length} Items)</p>
              <p className="text-xs font-bold">
                {calculateSubtotal().toFixed(2)} Tk
              </p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs">Shipping Fee</p>
              <p className="text-xs font-bold">Based on E-corier</p>
            </div>
            <hr />
            <div className="flex justify-between items-center mb-2">
              <p className="text-xs">Total</p>
              <p className="text-xs font-bold">
                {calculateSubtotal().toFixed(2)} Tk
              </p>
            </div>
            <hr />
            {hasPrePaymentOnly && (
              <p className="text-xs flex items-center gap-1 text-[#FFA000]">
                <TiWarning /> This order is pre-payment only
              </p>
            )}
            <button
              onClick={handleCheckout}
              className="w-full py-3 mt-4 bg-primary text-white text-sm font-bold rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        loading={modalLoading}
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        message="Are you sure you want to confirm the order?"
        title="Confirm Order"
        setAddressData={setAddressData}
      />
    </div>
  );
};

export default MyCart;


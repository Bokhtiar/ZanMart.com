import { privateRequest } from "@/config/axios.config";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";
import { Toastify } from "../toastify";
import { useRouter } from "next/router";

const MyCart = () => {
  const [cart, setCart] = useState({
    cart_items: [],
  });
  const router = useRouter();
  const [quantities, setQuantities] = useState({}); // State for quantities

  useEffect(() => {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const data = cart.cart_items; // List of cart items

  // Handle quantity increment
  const handleIncrease = (product_id) => {
    const updatedQuantities = {
      ...quantities,
      [product_id]: (quantities[product_id] || 1) + 1,
    };
    setQuantities(updatedQuantities);
    updateCartInLocalStorage(product_id, updatedQuantities[product_id]);
  };

  // Handle quantity decrement
  const handleDecrease = (product_id) => {
    const updatedQuantities = {
      ...quantities,
      [product_id]: Math.max((quantities[product_id] || 1) - 1, 1),
    };
    setQuantities(updatedQuantities);
    updateCartInLocalStorage(product_id, updatedQuantities[product_id]);
  };

  // Update the cart in localStorage with new quantities
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

  // Calculate the subtotal for all items in the cart
  const calculateSubtotal = () => {
    return data.reduce(
      (acc, item) =>
        acc + item.sell_price * (quantities[item.product_id] || item.qty),
      0
    );
  };

  const handleDelete = (id) => {
    const updatedCartItems = data.filter((item) => item.product_id !== id);
    setCart((prevCart) => ({
      ...prevCart,
      cart_items: updatedCartItems,
    }));
    const updatedCart = {
      ...cart,
      cart_items: updatedCartItems,
    };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
    
  };

  const hasPrePaymentOnly = data.some((item) => item.payment !== "cash");

  const cartForOrder = {
    billing_address_id: cart?.billing_address_id,
    shipping_address_id: cart?.shipping_address_id,
    cart_items: cart.cart_items.map(
      ({ image, payment, title, ...rest }) => rest
    ),
  };

  const handleCheckout = async () => {
    try {
      if (
        cartForOrder?.shipping_address_id &&
        cartForOrder?.billing_address_id
      ) {
        const res = await privateRequest.post("user/orders", cartForOrder);
        console.log(res?.data);
        if (res?.status == 200 || res?.status == 201) {
          Toastify.Success(res.data?.message);
          setCart((prevCart) => ({
            ...prevCart,
            cart_items: [],
          }));
          const newcart = { ...cart, cart_items: [] };
          localStorage.setItem("cart", JSON.stringify(newcart));
          window.dispatchEvent(new Event("cartUpdated"));
          router.push({
            pathname: '/profile',
            query: { section: 'confirm-order', id: res?.data?.order_id?.order_id },
          });
        } else {
          Toastify.Error(res.error);
        }
      } else {
        Toastify.Warning("please select Your Address");
      }
    } catch (error) {}
  };
  return (
    <div>
      <h1 className="text-2xl font-bold my-10">Manage your Cart</h1>
      <hr className="border-2" />
      <div className="flex gap-2">
        <div className="w-2/3 p-10">
          {data?.length > 0 ? (
            <div className="py-5">
              <div className="flex flex-col items-center">
                {data?.map((item) => (
                  <div
                    key={item?.product_id}
                    className="flex items-center w-full py-2 gap-2"
                  >
                    <div className="flex rounded-md justify-between shadow-custom2 items-center w-full p-2 gap-5">
                      <div className="flex gap-10">
                        <div className="flex justify-start">
                          <Image
                            height={500}
                            width={500}
                            className="h-[73px] w-[73px] rounded-lg"
                            src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.image}`}
                            alt={item.title}
                          />
                        </div>
                        <div className="w-fit">
                          <p className="text-xs font-medium">{item.title}</p>
                          <p className="font-bold text-[8px] text-[#AAAAAA] flex gap-2">
                            <span className="text-[#FFAA00]">
                              {item.category}
                            </span>{" "}
                            color: Black Size: XL
                          </p>
                          {item.payment === "cash" ? (
                            <button
                              disabled
                              className="text-[10px] px-2 py-1 font-bold border text-primary rounded-md flex items-center gap-1"
                            >
                              <IoMdCheckmarkCircleOutline className="h-[10px] w-[10px]" />{" "}
                              Cash on Delivery Available
                            </button>
                          ) : (
                            <button
                              disabled
                              className="text-[10px] px-2 py-1 font-bold border text-white bg-red-500 rounded-md flex items-center gap-1"
                            >
                              Pre Payment Only
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <p className="py-3 text-center">
                          <span className="text-primary text-2xl font-bold">
                            {item?.sell_price}
                          </span>
                          tk
                        </p>
                      </div>

                      <div className="">
                        <p className="text-[8px] text-center font-bold leading-3">
                          Subtotal
                        </p>
                        <p className="py-3 text-center">
                          <span className="text-primary text-2xl font-bold">
                            {(
                              item?.sell_price *
                              (quantities[item.product_id] || item.qty)
                            ).toFixed(2)}
                          </span>
                          tk
                        </p>
                      </div>
                      <div className="flex flex-col items-center gap-2">
                        <p className="text-[8px] text-center font-bold leading-3">
                          Quantity
                        </p>
                        <p className="text-[8px] items-center justify-center gap-3 font-bold leading-3 flex whitespace-nowrap">
                          <button
                            onClick={() => handleDecrease(item.product_id)}
                            className="p-2"
                          >
                            -
                          </button>
                          {quantities[item.product_id] || item.qty}
                          <button
                            onClick={() => handleIncrease(item?.product_id)}
                            className="p-2"
                          >
                            +
                          </button>
                        </p>
                        <button
                          onClick={() => handleDelete(item.product_id)}
                          className="flex items-center text-[8px] gap-5 text-red-700"
                        >
                          <RiDeleteBin6Line className="font-semibold" /> Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p>Cart is Empty</p>
          )}
        </div>

        {/* Total Summary Section */}
        {cart?.cart_items?.length > 0 && (
          <div className="w-1/3 py-5">
            <div className="mt-12 shadow-custom2 bg-white p-5">
              <p className="text-sm font-bold leading-4 py-5">Total Summary</p>
              <div className="flex justify-between items-center py-2">
                <p className="text-xs">Subtotal ({data.length} Items)</p>
                <p className="text-xs">
                  <span className="font-bold">
                    {calculateSubtotal().toFixed(2)}
                  </span>{" "}
                  Tk
                </p>
              </div>
              <div className="flex justify-between items-center py-2">
                <p className="text-xs">Shipping Fee</p>
                <p className="text-xs">
                  <span className="font-bold">0</span> Tk
                </p>
              </div>
              <hr />
              <div className="flex justify-between items-center py-2">
                <p className="text-xs">Total</p>
                <p className="text-xs">
                  <span className="font-bold">
                    {calculateSubtotal().toFixed(2)}
                  </span>{" "}
                  Tk
                </p>
              </div>
              <hr />
              {hasPrePaymentOnly && (
                <p className="text-xs flex items-center gap-2 text-[#FFA000]">
                  <TiWarning /> This order is pre-payment only
                </p>
              )}
              <div className="text-center">
                <button
                  onClick={handleCheckout}
                  className="py-3 px-5 text-sm w-full mt-5 bg-primary text-white font-bold"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCart;

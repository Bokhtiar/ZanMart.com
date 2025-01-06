import { privateRequest } from "@/config/axios.config";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiWarning } from "react-icons/ti";
import { Toastify } from "../toastify";
import { useRouter } from "next/router";
import Modal from "../modal";
import AddressModal from "../AddressModal";

const MyCart = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [cart, setCart] = useState({ cart_items: [] });
  const [quantities, setQuantities] = useState({});
  const router = useRouter();
  const [addressModal, setAddressModal] = useState(false);
  useEffect(() => {
    const fetchCartData = async () => {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        const parsedCart = JSON.parse(cartData);

        // Clone cart items to update their prices
        const updatedCartItems = [...parsedCart.cart_items];

        // Fetch prices for each product
        await Promise.all(
          updatedCartItems.map(async (item, index) => {
            try {
              const response = await privateRequest.get(
                `/current/product/price?product_id=${item.product_id}&product_variant_id=${item.product_variant_id}`
              );
              console.log(response.data?.data.price);

              if (response.data?.data.price) {
                updatedCartItems[index].sell_price = response.data?.data.price;
              }
            } catch (error) {
              console.error(
                `Error fetching price for product ID ${item.product_id} and variant ID ${item.product_variant_id}:`,
                error
              );
            }
          })
        );

        // Update the cart state and local storage
        const updatedCart = { ...parsedCart, cart_items: updatedCartItems };
        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
    };

    fetchCartData();
  }, []);

  const data = cart?.cart_items;

  const handleIncrease = (product_id) => {
    const currentQuantity = quantities[product_id] || 1; // Default to 1 if undefined
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
    setCart((prevCart) => ({ ...prevCart, cart_items: updatedCartItems }));
    const updatedCart = { ...cart, cart_items: updatedCartItems };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const hasPrePaymentOnly = data.some((item) => item.payment !== "cash");

  const cartForOrder = {
    billing_address_id: cart?.billing_address_id,
    shipping_address_id: cart?.shipping_address_id,
    cart_items: cart.cart_items.map(
      ({ image, payment, title, color, attribute, ...rest }) => rest
    ),
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalAction(null);
  };

  const address = localStorage.getItem("cart");
  const shipping_address = JSON.parse(address);
  console.log(shipping_address?.shipping_address_id);
  const handleCheckout = async () => {
    if (shipping_address?.shipping_address_id) {
      setIsModalOpen(true);
      setModalAction("confirm");
    } else{
     setAddressModal(true)
    };
  };

  const handleConfirm = async () => {
    try {
      if (
        cartForOrder?.shipping_address_id &&
        cartForOrder?.billing_address_id
      ) {
        const res = await privateRequest.post("user/orders", cartForOrder);
        if (res?.status === 200 || res?.status === 201) {
          Toastify.Success(res.data?.message);
          setCart({ ...cart, cart_items: [] });
          localStorage.setItem(
            "cart",
            JSON.stringify({ ...cart, cart_items: [] })
          );
          window.dispatchEvent(new Event("cartUpdated"));
          router.push({
            pathname: "/profile",
            query: {
              section: "confirm-order",
              id: res?.data?.order_id?.order_id,
            },
          });
        } else {
          Toastify.Error(res.error);
        }
      } else {
        Toastify.Warning("Please select your address.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
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
                              {item?.category}
                            </span>{" "}
                            color: {item?.color} Size: {item?.attribute}
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
                          onClick={() => handleDelete(item.product_variant_id)}
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
                  <span className="font-bold">Based on E-corier</span>
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
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onConfirm={handleConfirm}
        message="Are you sure you want to confirm the order?"
        title={"Confirm Order"}
      />
      {
        addressModal && <AddressModal setAddressModal={setAddressModal} />
      }
    </div>
  );
};

export default MyCart;

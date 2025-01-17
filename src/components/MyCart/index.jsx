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
    <div >
      <h1 className="text-2xl font-bold my-10">Manage your Cart</h1>
      <hr className="border-2" />
      <div className="flex flex-col lg:flex-row gap-4 mt-5 lg:gap-6">
  <div className="w-full lg:w-2/3 p-5  lg:p-10">
    {data?.length > 0 ? (
      <div className="py-5">
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
                  <span className="text-[#FFAA00]">{item?.category}</span> | Color: {item?.color} | Size: {item?.attribute}
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm font-bold text-primary">{item?.sell_price} Tk</p>
              </div>
              <div className="text-center">
                <p className="text-xs font-bold">Subtotal</p>
                <p className="text-sm font-bold text-primary">
                  {(item?.sell_price * (quantities[item.product_id] || item.qty)).toFixed(2)} Tk
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <p className="text-xs font-bold">Quantity</p>
                <div className="flex items-center gap-2">
                  <button onClick={() => handleDecrease(item.product_id)} className="p-1 border rounded">-</button>
                  <span>{quantities[item.product_id] || item.qty}</span>
                  <button onClick={() => handleIncrease(item.product_id)} className="p-1 border rounded">+</button>
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
      </div>
    ) : (
      <p>Cart is Empty</p>
    )}
  </div>

  {/* Total Summary Section */}
  {cart?.cart_items?.length > 0 && (
    <div className="w-full lg:w-1/3 p-5 bg-white shadow-custom2 rounded-lg">
      <p className="text-sm font-bold mb-4">Total Summary</p>
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs">Subtotal ({data.length} Items)</p>
        <p className="text-xs font-bold">{calculateSubtotal().toFixed(2)} Tk</p>
      </div>
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs">Shipping Fee</p>
        <p className="text-xs font-bold">Based on E-corier</p>
      </div>
      <hr />
      <div className="flex justify-between items-center mb-2">
        <p className="text-xs">Total</p>
        <p className="text-xs font-bold">{calculateSubtotal().toFixed(2)} Tk</p>
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

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoLocationOutline } from 'react-icons/io5';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { TiWarning } from 'react-icons/ti';

const MyCart = () => {
  // Retrieve cart from localStorage, handle case if cart doesn't exist
  const [cart, setCart] = useState({
    cart_items: [],
    shipping_address_id: 1,
    billing_address_id: 1,
  });

  useEffect(() => {
    const cartData = localStorage.getItem('cart');
    if (cartData) {
      setCart(JSON.parse(cartData));
    }
  }, []);

  const data = cart.cart_items; // List of cart items
  const [selectAll, setSelectAll] = useState(false); // State for "Select All"
  const [selectedItems, setSelectedItems] = useState({}); // State for selected items
  const [quantities, setQuantities] = useState({}); // State for quantities

  // Handle "Select All" functionality
  const handleSelectAll = () => {
    const newSelectedItems = {};
    data.forEach((item) => {
      newSelectedItems[item.product_id] = !selectAll;
    });
    setSelectedItems(newSelectedItems);
    setSelectAll(!selectAll);
  };

  // Handle individual item selection
  const handleItemSelect = (product_id) => {
    setSelectedItems((prevSelectedItems) => ({
      ...prevSelectedItems,
      [product_id]: !prevSelectedItems[product_id],
    }));

    // Check if all items are selected, then toggle "Select All"
    const allSelected = data.every((item) => selectedItems[item.product_id]);
    setSelectAll(allSelected);
  };

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
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    }
  };

  // Calculate the subtotal based on selected items and their quantities
  const calculateSubtotal = () => {
    return data
      .filter((item) => selectedItems[item.product_id])
      .reduce(
        (acc, item) =>
          acc + item.sell_price * (quantities[item.product_id] || item.qty),
        0
      );
  };

  const handleDelete = (id) => {
    const updatedCartItems = data.filter((data) => data.product_id !== id);
    setCart((prevCart) => ({
      ...prevCart,
      cart_items: updatedCartItems,
    }));
    const updatedCart = {
      ...cart,
      cart_items: updatedCartItems,
    };
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const handleAllDelete = () => {
    const newCart = {
      ...cart,
      cart_items: [],
    };
    setCart((prevCart) => ({
      ...prevCart,
      cart_items: [],
    }));
    localStorage.setItem('cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const hasPrePaymentOnly = data.some(
    (item) => selectedItems[item.product_id] && item.payment !== 'cash'
  );

  return (
    <div>
      <h1 className="text-2xl font-bold my-10">Manage your Cart</h1>
      <hr className="border-2" />
      <div className="flex gap-2">
        <div className="w-2/3 p-10">
          {data.length > 0 ? (
            <div className="flex justify-between">
              <p className="flex font-semibold items-center gap-5 text-sm">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                Select All
              </p>
              <button
                onClick={handleAllDelete}
                className="flex font-semibold items-center text-sm gap-5 text-red-700"
              >
                <RiDeleteBin6Line className="font-semibold" /> Delete
              </button>
            </div>
          ) : (
            <p> Cart is Empty</p>
          )}
          <div className="py-5">
            <div className="flex flex-col items-center">
              {data.map((item) => (
                <div key={item.product_id} className="flex items-center w-full py-2 gap-2">
                  <div>
                    <input
                      type="checkbox"
                      checked={selectedItems[item.product_id] || false}
                      onChange={() => handleItemSelect(item.product_id)}
                    />
                  </div>
                  <div className="flex rounded-md justify-between shadow-custom2 items-center w-full p-2 gap-5">
                    <div className="flex gap-10">
                      <div className="flex justify-start">
                        <img
                          className="h-[73px] w-[73px] rounded-lg"
                          src={`${process.env.NEXT_PUBLIC_API_SERVER}${item?.image}`}
                          alt={item.title}
                        />
                      </div>
                      <div className="w-fit">
                        <p className="text-xs font-medium">{item.title}</p>
                        <p className="font-bold text-[8px] text-[#AAAAAA] flex gap-2">
                          <span className="text-[#FFAA00]">{item.category}</span> color: Black
                          Size: XL
                        </p>
                        {item.payment === 'cash' ? (
                          <button
                            disabled
                            className="text-[6px] px-2 py-1 font-bold border text-primary rounded-md flex items-center gap-1"
                          >
                            <IoMdCheckmarkCircleOutline className="h-[7px] w-[7px]" /> Cash on
                            Delivery Available
                          </button>
                        ) : (
                          <button
                            disabled
                            className="text-[6px] px-2 py-1 font-bold border text-white bg-red-500 rounded-md flex items-center gap-1"
                          >
                            Pre Payment Only
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <p className="py-3 text-center">
                        <span className="text-primary text-2xl font-bold">
                          {(item.sell_price * (quantities[item.product_id] || item.qty)).toFixed(2)}
                        </span>
                        tk
                      </p>
                      <p className="text-[#AAAAAA] text-xs line-through">
                        {(item.price * (quantities[item.product_id] || item.qty)).toFixed(2)} tk
                      </p>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-[8px] text-center font-bold leading-3">Quantity</p>
                      <p className="text-[8px] items-center justify-center gap-3 font-bold leading-3 flex whitespace-nowrap">
                        <button onClick={() => handleDecrease(item.product_id)} className="p-2">
                          -
                        </button>
                        {quantities[item.product_id] || item.qty}
                        <button onClick={() => handleIncrease(item.product_id)} className="p-2">
                          +
                        </button>
                      </p>
                      <button onClick={() => handleDelete(item.product_id)} className="flex items-center text-[8px] gap-5 text-red-700">
                        <RiDeleteBin6Line className="font-semibold" /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Total Summary Section */}
        <div className="w-1/3 py-10">
          <div className="mt-12 shadow-custom2 bg-white p-5">
            <p className="text-[8px] text-[#AAAAAA] flex gap-2">
              <IoLocationOutline /> Delivery Location: 312/GrapTown, Dattapara Ashulia, Savar, Dhaka
            </p>
            <p className="text-sm font-bold leading-4 py-5">Total Summary</p>
            <div className="flex justify-between items-center py-2">
              <p className="text-xs">Subtotal ({Object.keys(selectedItems).length} Items)</p>
              <p className="text-xs">
                <span className="font-bold">{calculateSubtotal().toFixed(2)}</span> Tk
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
                <span className="font-bold">{calculateSubtotal().toFixed(2)}</span> Tk
              </p>
            </div>
            <hr />
            {hasPrePaymentOnly && (
              <p className="text-xs flex items-center py-2 text-[#FA7F5D] gap-2">
                <TiWarning /> Pre Payment Required
              </p>
            )}
            <div className="pt-5">
              <Link href={`/profile?section=Payment Proceed`}>
                <button className="w-full text-white bg-primary py-3 px-3 rounded-md text-xs">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;

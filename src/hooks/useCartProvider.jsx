// src/hooks/useCartProvider.js
import { useEffect, useReducer } from "react";
import {
  addToCart,
  clearCart,
  fetchCart,
  removeFromCart,
  updateToCart,
} from "./api/cart";
import { Toastify } from "@/components/toastify";
import { getToken } from "@/utils/helpers";

const initialState = {
  items: [],
  loading: true,
  productLoading: true,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload.loading ?? state.loading,
        productLoading: action.payload.productLoading ?? state.productLoading,
      };
    case "LOAD_CART":
      return {
        ...state,
        items: action.payload,
        loading: false,
        productLoading: false,
      };
    case "ADD_ITEM":
      return { ...state, items: [...state?.items, action.payload] };
    // case "UPDATE_ITEM":
    //   return { ...state, items: [...state?.items, action.payload] };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.cart_id !== action.payload.cart_id
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
};

export default function useCartProvider() {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const token = getToken();
  useEffect(() => {
    if (token) {
      loadCart();
    }
  }, [token]);
  //   cart data loaded
  const loadCart = async () => {
    try {
      dispatch({
        type: "SET_LOADING",
        payload: { loading: true, productLoading: true },
      });
      const res = await fetchCart();
      dispatch({ type: "LOAD_CART", payload: res.data?.data });
    } catch (err) {}
  };
  //  added cart item
  const addItem = async (data) => {
    try {
      const res = await addToCart(data);
      dispatch({ type: "ADD_ITEM", payload: res.data.cart });
      Toastify.Success("Successfully Added Cart");
    } catch (err) {
      Toastify.Error(err?.response?.data?.message);
    }
  };
  //  update cart item
  const updateItem = async (data) => {
    try {
      const formData = new FormData();
      formData.append("qty", data?.qty);
      formData.append("_method", "PUT");
      const res = await updateToCart(data?.id, formData);
      loadCart();
      dispatch({ type: "UPDATE_ITEM", payload: res.data.cart });
    } catch (err) {
      Toastify.Error(err?.response?.data?.message);
    }
  };
  // remove cart item
  const removeItem = async (cart_id) => {
    try {
      await removeFromCart(cart_id);
      dispatch({
        type: "REMOVE_ITEM",
        payload: { cart_id },
      });
    } catch (err) {
      Toastify.Error("Delete not successfully");
    }
  };

  const clear = async () => {
    try {
      await clearCart();
      dispatch({ type: "CLEAR_CART" });
    } catch (err) {
      Toastify.Error("clear successfully");
    }
  };

  return {
    ...state,
    addItem,
    removeItem,
    updateItem,
    clear,
  };
}

// context/MyContext.js

import Loader from "@/components/loader";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
import { privateRequest, publicRequest } from "@/config/axios.config";
import { getToken } from "@/utils/helpers";
import React, { createContext, useCallback, useEffect, useState } from "react";

// Create the context
const MyContext = createContext(null);

// Create the provider component
const MyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [forgotCode, setForgotCode] = useState();
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // New state for original products

  const [token, setToken] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(getToken() ? true : false);
    }
  }, []);
  const fetchProductss = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("products");
      const fetchedProducts = res?.data?.data?.data || [];
      // console.log(fetchedProducts,"-------------------");
      setProducts(fetchedProducts);
      setOriginalProducts(fetchedProducts);
      setLoading(false); // Store the original products
    } catch (error) {}
  };

  useEffect(() => {
    fetchProductss();
  }, []);
  // second area
  const [newProduct, setNewProduct] = useState({});
  const fetchProducts = useCallback(async (filters) => {
    try {
      setLoading(true);
      const isEmpty = Object.keys(filters).length === 0;
      // if (isEmpty) {
      //   return;
      // }
      console.log("---------------------", filters);
      setLoading(true);
      const queryParams = new URLSearchParams();
      if (filters.max_price && filters.min_price) {
        queryParams.append("min_price", filters.min_price);
        queryParams.append("max_price", filters.max_price);
      }
      if (filters.page) queryParams.append("page", filters.page);
      // if (filters.title) queryParams.append("title", filters.title);

      let res;
      if (filters?.title) {
        res = await publicRequest.get(`products?title=${filters?.title}`);
      } else {
        res = await publicRequest.get(
          `products${
            queryParams.toString() ? `?${queryParams.toString()}` : ""
          }`
        );
      }
      const fetchedProducts = res?.data?.data || {};
      // console.log(fetchedProducts,"-------------------");
      setNewProduct(fetchedProducts);
      // setOriginalProducts(fetchedProducts);
      setLoading(false); // Store the original products
    } catch (error) {}
  }, []);

  useEffect(() => {
    fetchProducts({});
  }, []);
  // Fetch user profile
  const fetchUserProfile = useCallback(async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const res = await privateRequest.get("user/profile");
      if (res?.status === 200) {
        setUser(res?.data?.data);
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch user profile when token updates
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <MyContext.Provider
      value={{
        products,
        setLoading,
        loading,
        setProducts,
        originalProducts,
        user,
        setUser,
        forgotCode,
        setForgotCode,
        token,
        setToken,
        newProduct,
        fetchProducts,
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Export context and provider
export { MyContext, MyProvider };

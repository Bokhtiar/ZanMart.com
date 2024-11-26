// context/MyContext.js

import Loader from "@/components/loader";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
import { publicRequest } from "@/config/axios.config";
import React, { createContext, useEffect, useState } from "react";

// Create the context
const MyContext = createContext();

// Create the provider component
const MyProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [forgotCode, setForgotCode] = useState();
  const [products, setProducts] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]); // New state for original products

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await publicRequest.get("products");
      const fetchedProducts = res?.data?.data?.data || [];
      setProducts(fetchedProducts);
      setOriginalProducts(fetchedProducts);
      setLoading(false); // Store the original products
    } catch (error) {}
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  
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
      }}
    >
      {children}
    </MyContext.Provider>
  );
};

// Export context and provider
export { MyContext, MyProvider };

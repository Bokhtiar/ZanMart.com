// src/contexts/CartContext.js
import useCartProvider from '@/hooks/useCartProvider';
import React, { createContext, useContext } from 'react'; 

const CartContext = createContext();

export const CartProvider = ({ children  }) => {
  const cart = useCartProvider();

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);

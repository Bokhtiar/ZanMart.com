// context/MyContext.js

import { publicRequest } from '@/config/axios.config';
import React, { createContext, useEffect, useState } from 'react';

// Create the context
const MyContext = createContext();

// Create the provider component
const MyProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [originalProducts, setOriginalProducts] = useState([]); // New state for original products

    const fetchProducts = async () => {
        const res = await publicRequest.get('products');
        const fetchedProducts = res?.data?.data?.data || [];
        setProducts(fetchedProducts);
        setOriginalProducts(fetchedProducts); // Store the original products
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <MyContext.Provider value={{ products, setProducts, originalProducts }}>
            {children}
        </MyContext.Provider>
    );
};

// Export context and provider
export { MyContext, MyProvider };

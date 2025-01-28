import SingleCart from "@/components/singleCart";
import Image from "next/image";
import React, { useState } from "react";
import { FiFilter } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
import PriceFilter from "@/components/priceFilter";
import Paginations from "@/components/pagination";
const Products = () => {
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  // console.log("all product show ------------------------------------->",products);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  if (loading) {
    return <ProductSkeleton />;
  } 
  const maxPrice = products.reduce(
    (max, product) => Math.max(max, product.sell_price),
    0
  ); 
  return (
    <div className="mt-36">
      {/* product banner--------------------------- */}
      <div className="text-center py-10">
        <h1 className="font-extrabold text-primary text-4xl py-2">
          All Products
        </h1>
        <p className="font-normal text-xl leading-7">
          Choose form the best collections
        </p>
      </div>

      <div className="flex container mx-auto items-start gap-10 w-full">
        {/* Filter options */}
        <div className="w-1/4 hidden lg:flex md:flex flex-col mt-24">
          <PriceFilter api="products" setProducts={setProducts} />

          <Image
            height={1000}
            width={300}
            className="mt-10 w-full"
            src="/images/filterbanner.svg"
            alt=""
          />
        </div>

        <div className="w-full">
          <div className="flex lg:hidden md:hidden shadow-custom rounded-lg justify-between p-2 mb-2">
            <button onClick={toggleDrawer} className="text-xl">
              <FiFilter />
            </button>
          </div>
          {/* All product show */}
          <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:gap-8 justify-between">
            {products && Array.isArray(products) ? (
              products.map((product) => (
                <SingleCart key={product?.product_id} item={product} />
              ))
            ) : (
              <p>No products available</p>
            )}
          </div>
          <Paginations api="products" data={setProducts} />
        </div>
      </div>

      {/* Drawer for mobile filters */}
      <div
        className={`fixed top-36 right-0 h-[calc(100vh-144px)] z-20 bg-white transition-transform transform ${
          isDrawerOpen ? "-translate-x-0" : "translate-x-full"
        } w-2/3`}
      >
        <div className="p-4 h-full flex flex-col">
          <button onClick={toggleDrawer} className="text-xl">
            <MdClose />
          </button>

          <div className="flex-grow mt-4 overflow-y-auto">
            {" "}
            {/* Ensures the content area has scrollable overflow */}
            <PriceFilter api="products" setProducts={setProducts}  maxPrice={maxPrice}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;

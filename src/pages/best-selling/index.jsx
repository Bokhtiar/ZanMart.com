"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FiFilter } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import {
  PiDotsNineBold,
  PiDotsSixVerticalBold,
  PiDotsThreeVertical,
} from "react-icons/pi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { RiFilterOffLine } from "react-icons/ri";

import SingleCart from "@/components/singleCart";
import ProductSkeleton from "@/components/loader/ProductSkeleton";
import PriceFilter from "@/components/priceFilter";
import Paginations from "@/components/pagination";
import { publicRequest } from "@/config/axios.config";

import style from "./style.module.css";

const BesSelling = () => {
  const [loading, setLoading] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [gridCount, setGridCount] = useState(4);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrices, setMaxPrice] = useState(10000);
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await publicRequest.get(
          `best-selling-product?page=${page}&min_price=${minPrice}&max_price=${maxPrices}`
        );
        setProducts(res.data?.data?.data);
        setLastPage(res.data?.data?.last_page);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, minPrice, maxPrices]);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // if (loading) return <ProductSkeleton />;

  return (
    <div className="mt-40">
      <div className="flex container-custom mx-auto items-start gap-4 w-full">
        {/* Filter Sidebar (Desktop) */}
        <div className="w-1/4 hidden lg:flex md:flex flex-col">
          <h1 className="font-extrabold text-primary text-xl py-2 bg-gray-50 my-2 px-2 rounded flex items-center gap-1">
            <RiFilterOffLine /> Filter
          </h1>
          <PriceFilter
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            maxPrice={maxPrices}
            minPrice={minPrice}
          />
          <Image
            height={1000}
            width={300}
            className="mt-4 w-full rounded"
            src="/images/filterbanner.svg"
            alt="Filter Banner"
          />
        </div>

        {/* Main Content */}
        <div className="w-full">
          {/* Mobile Filter Button */}
          <div className="flex lg:hidden md:hidden shadow-custom rounded-lg justify-between p-2 mb-2">
            <button onClick={toggleDrawer} className="text-xl">
              <FiFilter />
            </button>
          </div>

          {/* Header & Grid View Controls */}
          <div className="flex items-center justify-between bg-gray-50 px-2 my-2 rounded">
            <h1 className="font-extrabold text-primary text-xl py-2 flex items-center gap-1">
              <HiClipboardDocumentList /> Best Selling Products
            </h1>
            <div className="flex items-center gap-2">
              <PiDotsNineBold
                onClick={() => setGridCount(4)}
                className={`border border-primary text-2xl rounded-md cursor-pointer ${
                  gridCount === 4 ? "bg-primary text-white" : ""
                }`}
              />
              <PiDotsSixVerticalBold
                onClick={() => setGridCount(3)}
                className={`border border-primary text-2xl rounded-md cursor-pointer ${
                  gridCount === 3 ? "bg-primary text-white" : ""
                }`}
              />
              <PiDotsThreeVertical
                onClick={() => setGridCount(2)}
                className={`border border-primary text-2xl rounded-md cursor-pointer ${
                  gridCount === 2 ? "bg-primary text-white" : ""
                }`}
              />
            </div>
          </div>

          {/* Product Grid */}
          {/* {loading ? (
            <ProductSkeleton />
          ) : (
            <div
              className={`w-full grid gap-2 md:gap-4 lg:gap-4 grid-cols-2 md:grid-cols-${gridCount} lg:grid-cols-${gridCount}`}
            >
              {products?.map((product) => (
                <SingleCart key={product?.product_id} item={product} />
              ))}
            </div>
          )} */}

          {loading ? (
            <ProductSkeleton count={4} />
          ) : products.length > 0 ? (
            <div
              className={`w-full grid grid-cols-2 gap-2 md:grid-cols-${gridCount} lg:grid-cols-${gridCount} lg:gap-4 md:gap-4 justify-between`}
            >
              {products?.map((product) => (
                <SingleCart key={product?.product_id} item={product} />
              ))}
            </div>
          ) : (
            <Image
              height={400}
              width={600}
              className="mx-auto "
              src="/empty_product.png"
              alt="Logo"
            />
          )}

          {/* Pagination */}
          <Paginations page={page} setPage={setPage} totalPage={lastPage} />
        </div>
      </div>

      {/* Drawer (Mobile Filter) */}
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
            <PriceFilter
              setMinPrice={setMinPrice}
              setMaxPrice={setMaxPrice}
              maxPrice={maxPrices}
              minPrice={minPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BesSelling;

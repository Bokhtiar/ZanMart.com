import SingleCart from '@/components/singleCart';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import style from "./style.module.css";
import { publicRequest } from '@/config/axios.config';
import ProductSkeleton from '@/components/loader/ProductSkeleton';
import PriceFilter from '@/components/priceFilter';
import Paginations from '@/components/pagination';
import { PiDotsNineBold } from "react-icons/pi";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { PiDotsThreeVertical } from "react-icons/pi";
import { HiClipboardDocumentList } from "react-icons/hi2";
import { RiFilterOffLine } from "react-icons/ri";




const BesSelling = () => {

  const [loading,setLoading]=useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 const [products,setProducts]=useState([])
  const [gridCount, setGridCount] = useState(4);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  if (loading) {
    return <ProductSkeleton/>
    }
  return (
    <div className="mt-36 ">
      {/*   
    <div className="text-center py-10">
      <h1 className="font-extrabold text-primary text-4xl py-2">
        Best Selling Products
      </h1>
      <p className="font-normal text-xl leading-7">
        Choose form the best collections
      </p>
      
    </div> */}

      <div className="flex container-custom mx-auto items-start gap-4 w-full">
        {/* Filter options */}
        <div className="w-1/4 hidden lg:flex md:flex flex-col">
          <h1 className="font-extrabold text-primary text-xl py-2 bg-gray-50 my-2 px-2 rounded flex items-center gap-1">
            <RiFilterOffLine /> Filter
          </h1>

          <PriceFilter api="best-selling-product" setProducts={setProducts} />
          <Image
            height={1000}
            width={300}
            className="mt-4 w-full rounded"
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
          <section>
            <div className="flex items-center justify-between bg-gray-50 px-2 my-2 rounded">
              <h1 className="font-extrabold text-primary text-xl py-2 flex items-center gap-1">
                <HiClipboardDocumentList /> Best Selling Products
              </h1>

              <p className="flex items-center gap-2">
                <PiDotsNineBold
                  onClick={() => setGridCount(4)}
                  className={`border border-primary text-2xl rounded-md ${
                    gridCount === 4 ? "bg-primary text-white" : ""
                  } cursor-pointer`}
                />
                <PiDotsSixVerticalBold
                  onClick={() => setGridCount(3)}
                  className={`border border-primary text-2xl ${
                    gridCount === 3 ? "bg-primary text-white" : ""
                  } rounded-md cursor-pointer`}
                />
                <PiDotsThreeVertical
                  onClick={() => setGridCount(2)}
                  className={`border border-primary text-2xl  ${
                    gridCount === 2 ? "bg-primary text-white" : ""
                  } rounded-md cursor-pointer`}
                />
              </p>
            </div>
            <div
              className={`w-full grid grid-cols-2 gap-2 md:grid-cols-${gridCount} lg:grid-cols-${gridCount} lg:gap-4 md:gap-4 justify-between`}
            >
              {products?.map((product) => (
                <SingleCart key={product?.product_id} item={product} />
              ))}
            </div>
          </section>

          <Paginations api="best-selling-product" data={setProducts} />
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
            <div className="flex-col">
              <PriceFilter
                api="best-selling-product"
                setProducts={setProducts}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BesSelling;
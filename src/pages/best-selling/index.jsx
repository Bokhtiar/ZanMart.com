import SingleCart from '@/components/singleCart';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { FiFilter } from 'react-icons/fi';
import { MdClose } from 'react-icons/md';
import style from "./style.module.css";
import { publicRequest } from '@/config/axios.config';
import ProductSkeleton from '@/components/loader/ProductSkeleton';
const BesSelling = () => {
  const [minValue, setMinValue] = useState(20);
  const [maxValue, setMaxValue] = useState(200);
  const [loading,setLoading]=useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
 const [products,setProducts]=useState([])
 const fethBestSellingProducts=useCallback(async()=>{
  try {
    const res=await publicRequest.get('best-selling-product')
  if(res.status==200){
    setProducts(res?.data?.data?.data)
  }
  } catch (error) {
    
  }
 },[])
  const PriceFilter = async () => {
   console.log(maxValue,minValue)
    try {
      setLoading(true);
      const response = await publicRequest.post("product/price/filter", {
        min_price: minValue,
        max_price: maxValue,
      });
      console.log(response)
      setProducts(response?.data?.data || []);
      
      setLoading(false);
    } catch (error) {
      console.error("Error fetching colors:", error);
    }
  };
  const minGap = 0;
  const sliderminValue = 0; // set this to your desired minimum value
  const sliderMaxValue = 5000;
  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    if (value <= maxValue - minGap) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= minValue + minGap) {
      setMaxValue(value);
    }
  };
  const setArea = () => {
    const rangeStyle = {
      left: `${
        ((minValue - sliderminValue) / (sliderMaxValue - sliderminValue)) * 100
      }%`,
      right: `${
        100 -
        ((maxValue - sliderminValue) / (sliderMaxValue - sliderminValue)) * 100
      }%`,
    };
    const minTooltipStyle = {
      left: `${(minValue / sliderMaxValue) * 100}%`,
    };
    const maxTooltipStyle = {
      right: `${100 - (minValue / sliderMaxValue) * 100}%`,
    };

    return { rangeStyle, minTooltipStyle, maxTooltipStyle };
  };
  const { rangeStyle } = setArea();
  useEffect(() => {
    setArea();
    fethBestSellingProducts();
  }, [minValue, maxValue]);
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };
  if (loading) {
    return <ProductSkeleton/>
    }
  return (
    <div className="mt-36">
    {/* product banner--------------------------- */}
    <div className="text-center py-10">
      <h1 className="font-extrabold text-primary text-4xl py-2">
        Best Selling Products
      </h1>
      <p className="font-normal text-xl leading-7">
        Choose form the best collections
      </p>
      
    </div>

    <div className="flex container mx-auto items-start gap-10 w-full">
      {/* Filter options */}
      <div className="w-1/4 hidden lg:flex md:flex flex-col mt-24">
        <div>
          <p className="text-base font-semibold leading-6">Price Range</p>
          <div className="flex items-center gap-5">
            <input
              className="border text-xs font-normal w-16 text-center"
              type="text"
              name="min"
              value={minValue}
              onChange={handleMinChange}
              placeholder="Min"
            />
            <hr className="w-5 border" />
            <input
              className="border text-xs font-normal w-16 text-center"
              type="text"
              name="max"
              value={maxValue}
              onChange={handleMaxChange}
              placeholder="Max"
            />
          </div>
          <div>
            <div
              className={`relative w-48 h-2 bg-primary ${style.range_slider} `}
            >
              <input
                type="range"
                className={style.minvalue}
                min={sliderminValue}
                max={sliderMaxValue}
                value={minValue}
                onChange={handleMinChange}
              />
              <input
                type="range"
                className={style.maxValue}
                min={sliderminValue}
                max={sliderMaxValue}
                value={maxValue}
                onChange={handleMaxChange}
              />
            </div>
            <div className="slider-track" style={rangeStyle}></div>
          </div>

          <button
            onClick={PriceFilter}
            className="mt-4  border rounded-md px-4 text-white  bg-primary text-sm "
          >
            Filter
          </button>
        </div>

    

       
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
            <FiFilter/>
          </button>
        </div>
     {/* All product show */}
        <div className="w-full grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-12 md:gap-8 justify-between">
          {products?.map((product) => (
            <SingleCart key={product?.product_id} item={product} />
          ))}
        </div>
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
            <div>
              <p className="text-base font-semibold leading-6">Price Range</p>
              <div className="flex items-center pb-2 gap-5">
                <input
                  className="border text-xs font-normal w-16 text-center"
                  type="text"
                  name="min"
                  value={minValue}
                  onChange={handleMinChange}
                  placeholder="Min"
                />
                <hr className="w-5 border" />
                <input
                  className="border text-xs font-normal w-16 text-center"
                  type="text"
                  name="max"
                  value={maxValue}
                  onChange={handleMaxChange}
                  placeholder="Max"
                />
              </div>
              <div>
                <div
                  className={`relative w-48 h-2 bg-primary ${style.range_slider}`}
                >
                  <input
                    type="range"
                    className={style.minvalue}
                    min={sliderminValue}
                    max={sliderMaxValue}
                    value={minValue}
                    onChange={handleMinChange}
                  />
                  <input
                    type="range"
                    className={style.maxValue}
                    min={sliderminValue}
                    max={sliderMaxValue}
                    value={maxValue}
                    onChange={handleMaxChange}
                  />
                </div>
                <div className="slider-track" style={rangeStyle}></div>
              </div>

              <button
                onClick={PriceFilter}
                className="mt-4 border rounded-md px-4 text-white bg-primary text-sm"
              >
                Filter
              </button>
            </div>

           
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default BesSelling;
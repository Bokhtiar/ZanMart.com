import React, { useEffect, useState } from 'react';
import style from "./style.module.css";
import { publicRequest } from '@/config/axios.config';
const PriceFilter = ({api,setProducts}) => {
    const [minValue, setMinValue] = useState(20);
    const [maxValue, setMaxValue] = useState(200);
   
    const PriceFilter = async () => {
        console.log(maxValue, minValue,api);
        try {
         
          const response = await publicRequest.get(
            `${api}?max_price=${maxValue}&min_price=${minValue}`
          );
          console.log(response);
          setProducts(response?.data?.data?.data || []);
    
         
        } catch (error) {
          console.error("Error fetching price data:", error);
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
      useEffect(()=>{
        setArea()
      },[maxValue,minValue])
  return (
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
  );
};

export default PriceFilter;
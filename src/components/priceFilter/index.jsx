import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { publicRequest } from "@/config/axios.config";
import { Toastify } from "../toastify";
import { FaArrowsAltH } from "react-icons/fa";

const PriceFilter = ({  setMinPrice, setMaxPrice }) => {
  const [minValue, setMinValue] = useState(10);
  const [maxValue, setMaxValue] = useState(1000);
  const minGap = 1000;
  const sliderminValue = 10; // set this to your desired minimum value
  const sliderMaxValue = 5000;
  const handleMinChange = (e) => {
    const value = parseInt(e.target.value);
    // console.log(value);
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
  }, [maxValue, minValue]);
  
  // onmouse up to change price filter product
  const handleMouseUp = () => { 
    setMinPrice(minValue);
    setMaxPrice(maxValue);
  };

  // enter buttonn click for change price filter product 
  const handleKeyDown = (event) => {
    if (event.key === "Enter") { 
      setMinPrice(minValue);
     setMaxPrice(maxValue);
    }
  };
  return (
    <div className=" py-4 shadow-md rounded-lg space-y-6">
      <p className="text-base font-semibold leading-6 border-b px-4 pb-4 flex items-center gap-1 text-primary">
        <FaArrowsAltH/> Price Range
      </p>
      {/* price range slider  */}
      <div className="flex justify-center ">
        <div className={`relative w-48 h-2 bg-primary ${style.range_slider} `}>
          <input
            type="range"
            className={style.minvalue}
            min={sliderminValue}
            max={sliderMaxValue}
            value={minValue-1}
            onChange={handleMinChange}
            onMouseUp={handleMouseUp}
          />
          <input
            type="range"
            className={style.maxValue}
            min={sliderminValue}
            max={sliderMaxValue}
            value={maxValue}
            onChange={handleMaxChange}
            onMouseUp={handleMouseUp}
          />
        </div>
        <div className="slider-track" style={rangeStyle}></div>
      </div>
      {/* price input field
       */}
      <div className="flex items-center justify-center   px-4 gap-5">
        <input
          className="border text-xs font-normal w-16 text-center py-2 outline-none "
          type="text"
          name="min"
          value={minValue}
          onChange={handleMinChange}
        />
        <hr className="w-5 border" />
        <input
          className="border text-xs font-normal w-16 text-center py-2 outline-none"
          type="text"
          name="max"
          value={maxValue}
          onChange={handleMaxChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </div>
  );
};

export default PriceFilter;

import React, { useEffect, useState } from "react";
import style from "./style.module.css";
import { FaArrowsAltH } from "react-icons/fa";

const PriceFilter = ({ setMinPrice, setMaxPrice, maxPrice,minPrice }) => {
  const minGap = 1000;
  const sliderminValue = 10; // Minimum slider value
  const sliderMaxValue = 10000; // Maximum slider value

  // Initialize min and max value state
  const [minValue, setMinValue] = useState(minPrice||sliderminValue);
  const [maxValue, setMaxValue] = useState(maxPrice || sliderMaxValue-3000);

  // Sync maxPrice from props when it changes
  useEffect(() => {
    if (maxPrice) {
      setMaxValue(maxPrice);
    }
    if(minPrice){
      setMinValue(minPrice);
    }
  }, [maxPrice,minPrice]);

  const handleMinChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value <= maxValue - minGap) {
      setMinValue(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= minValue + minGap) {
      setMaxValue(value);
    }
  };

  const handleMouseUp = () => {
    setMinPrice(minValue);
    setMaxPrice(maxValue);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setMinPrice(minValue);
      setMaxPrice(maxValue);
    }
  };

  return (
    <div className="py-4 shadow-md rounded-lg space-y-6">
      <p className="text-base font-semibold leading-6 border-b px-4 pb-4 flex items-center gap-1 text-primary">
        <FaArrowsAltH /> Price Range
      </p>

      {/* Price range slider */}
      <div className="flex justify-center">
        <div className={`relative w-48 h-2 bg-primary ${style.range_slider}`}>
          <input
            type="range"
            className={style.minvalue}
            min={sliderminValue}
            max={sliderMaxValue}
            value={minValue}
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
      </div>

      {/* Price input fields */}
      <div className="flex items-center justify-center px-4 gap-5">
        <input
          className="border text-xs font-normal w-16 text-center py-2 outline-none"
          type="number"
          name="min"
          value={minValue}
          onChange={handleMinChange}
          onBlur={handleMouseUp}
        />
        <hr className="w-5 border" />
        <input
          className="border text-xs font-normal w-16 text-center py-2 outline-none"
          type="number"
          name="max"
          value={maxValue}
          onChange={handleMaxChange}
          onKeyDown={handleKeyDown}
          onBlur={handleMouseUp}
        />
      </div>
    </div>
  );
};

export default PriceFilter;

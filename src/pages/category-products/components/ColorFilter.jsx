import React, { useState } from "react";
import { 
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";

const ColorFilter = ({ colors, selectedColors, handleColorChange }) => {
  const [open, setOpen] = useState(true);

  return (
    <div>
      <div className="mt-10  pt-4 shadow-md rounded-lg ">
        <button
          className="px-4 pb-4 text-base font-semibold leading-6 border-b w-full flex justify-between items-center "
          onClick={() => {
            setOpen(!open);
          }}
        >
          Filter by color
          <span
            className={`inline-block transform transition-transform duration-300 ${
              open ? "rotate-0" : "rotate-180"
            }`}
          >
            {open ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowUp />}
          </span>
        </button>
        <div
          className={`px-4   transition-max-height duration-500 ease-in-out overflow-hidden ${
            open ? "max-h-screen " : "max-h-0  "
          }`}
        >
         <div className="py-4">
         {colors.map((color) => (
            <button
              key={color?.color_id}
              className="flex py-1 text-xs font-normal leading-4 items-center gap-2"
            //   style={{ 
            //     backgroundColor: color?.name, 
            //    }}
            >
              <input
                type="checkbox"
                checked={selectedColors.includes(color?.color_id)} // Check if the color is selected
                onChange={() => handleColorChange(color?.color_id)}
                style={{ 
                    backgroundColor: color?.name,
                 }}
                  className="appearance-none w-5 h-5 bg-blue-500 checked:bg-green-500 border border-gray-300 rounded-md"
              />
              {color?.name}
            </button>
          ))}
         </div>
        </div>
      </div>
    </div>
  );
};

export default ColorFilter;

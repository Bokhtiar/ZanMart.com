import React, { useState } from "react";
import { MdOutlineKeyboardArrowUp } from "react-icons/md";

const UnitFilter = ({ unit, handleAttributeChange, selectedAttributes }) => {
  const [open, setOpen] = useState(true);

  return (
    <div key={unit?.unit_id} className="mt-10  pt-4 shadow-md rounded-lg ">
      <button
        className="px-4 pb-4 text-base font-semibold leading-6 border-b w-full flex justify-between items-center "
        onClick={() => {
          setOpen(!open);
        }}
      >
        Filter by {unit?.unit_name}
        <span
          className={`inline-block transform transition-transform duration-300 ${
            open ? "rotate-0" : "rotate-180"
          }`}
        >
          {open ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowUp />}
        </span>
      </button>
      <div
        className={`px-4 transition-max-height duration-500 ease-in-out overflow-hidden ${
          open ? "max-h-screen " : "max-h-0 "
        }`}
      >
        <div className="py-4">
          {unit?.attributes?.map((attribute) => (
            <p
              key={attribute?.attribute_id}
              className="flex py-1 text-xs font-normal leading-4 items-center gap-2"
            >
              <input
                className="border-[#AAAAAA]"
                type="checkbox"
                onChange={() =>
                  handleAttributeChange(unit?.unit_id, attribute?.attribute_id)
                }
                checked={selectedAttributes[unit?.unit_id]?.includes(
                  attribute?.attribute_id
                )}
              />{" "}
              {attribute?.attribute_name}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UnitFilter;

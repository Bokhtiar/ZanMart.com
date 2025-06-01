import React from 'react';

const Spinner = ({ color = "primary", className = "" }) => {
  return (
    <div className={`flex justify-center items-center w-full h-full`}>
      <div
        className={` border-4 border-dashed rounded-full animate-spin border-${color} ${className?className:"h-5 w-5"}`}
      ></div>
    </div>
  );
};

export default Spinner;

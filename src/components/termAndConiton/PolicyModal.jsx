import React from 'react';

const PolicyModal = ({children,setOpen}) => {
    return (
        <div className="fixed py-10 inset-0 flex max-h-screen items-center justify-center bg-black bg-opacity-50 z-50">
        <div className=" bg-white p-6 rounded-lg shadow-lg  w-10/12 sm:w-3/4  md:w-10/12 overflow-y-auto max-h-full z-50 ">
        
          {children} 
        </div>
        <div
          className="absolute bg-black opacity-5 w-full top-0 left-0 h-full z-5"
          onClick={() => setOpen(false)}
        ></div>
      </div>
    );
};

export default PolicyModal;
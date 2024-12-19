import React from 'react';

const NavSkleton = () => {
  return (
  <>
   
   <div className="fixed w-full z-10 bg-gray-100 animate-pulse">

<nav className="py-3 flex container mx-auto justify-between items-center">
 
  <div className="flex items-center gap-2">
    <div className="h-8 w-8 bg-gray-300 rounded-lg lg:hidden md:hidden"></div>
    <div className="h-14 w-14 bg-gray-300 rounded-full"></div>
  </div>
  
  <div className="hidden md:flex gap-10">
    <div className="w-16 h-6 bg-gray-300 rounded"></div>
    <div className="w-16 h-6 bg-gray-300 rounded"></div>
    <div className="w-16 h-6 bg-gray-300 rounded"></div>
  </div>
  
 
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
    <div className="flex flex-col gap-1">
      <div className="w-24 h-4 bg-gray-300 rounded"></div>
      <div className="w-32 h-4 bg-gray-300 rounded"></div>
    </div>
  </div>
</nav>

<div className="bg-primary py-2">
  <div className="flex justify-between items-center container mx-auto">
    <div className="relative lg:flex md:flex hidden">
      <div className="w-28 h-6 bg-gray-300 rounded"></div>
    </div>


    <div className="flex items-center w-80 md:w-[658px] relative">
      <div className="w-full h-12 bg-gray-300 rounded-full"></div>
      <div className="absolute right-0 w-20 h-12 bg-gray-400 rounded-full"></div>
    </div>


    <div className="flex gap-4">
      <div className="relative">
        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-gray-400 rounded-full"></div>
      </div>
      <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
    </div>
  </div>
</div>
</div>


<div
className="fixed top-0 left-0 h-full z-20 bg-gray-100 animate-pulse w-64"
>
<div className="p-4">
  <div className="w-8 h-8 bg-gray-300 rounded-lg mb-4"></div>
  <ul className="bg-white">
    <div className="w-full h-6 bg-gray-300 mb-3 rounded"></div>
    <div className="w-full h-6 bg-gray-300 mb-3 rounded"></div>
    <div className="w-full h-6 bg-gray-300 mb-3 rounded"></div>
  </ul>
</div>
</div>


<div className="fixed inset-0 z-10 bg-black opacity-50"></div></>
  );
};

export default NavSkleton;
import React from 'react';

const ServiceQualitySkeleton = () => {
  const items = [1, 2, 3, 4];

  return (
    <div className='container-custom mx-auto gap-4 hidden md:gap-3 lg:gap-5 mt-10 grid-cols-1 md:grid lg:grid-cols-4 md:grid-cols-2'>
      {items.map((_, idx) => (
        <div
          key={idx}
          className='flex gap-4 items-center rounded-xl justify-center py-5 shadow-custom animate-pulse'
        >
          <div className='bg-gray-300 rounded-full h-10 w-10' />
          <div className='space-y-2'>
            <div className='bg-gray-300 h-4 w-32 rounded' />
            <div className='bg-gray-200 h-3 w-24 rounded' />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceQualitySkeleton;

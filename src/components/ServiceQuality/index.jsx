import React from 'react';

const ServiceQuality = () => {
    const data=[
        {logo:'Authentic.svg', title:"100% Authentic",comment:"Brand and products"},
        {logo:'map.svg', title:"All Bangladesh",comment:"Delivery to your door"},
        {logo:'money-back.svg', title:"45 Day Return",comment:"Easy Return policy"},
        {logo:'Returns.svg', title:"Cash Back policy",comment:"Guaranteed Cover Up"},
    ]
  return (
    <div className='container mx-auto md:gap-12 lg:gap-12 mt-10 sm:grid-cols-1  grid md:grid-cols-4'>
      {
        data.map(item=><div className='flex gap-4 items-center rounded-xl justify-center py-5 shadow-custom'>
            <img src={item.logo} alt="authentic" />
            <div>
                <p className='text-base font-semibold'>{item.title}</p>
                <p className='text-xs'>{item.comment}</p>
            </div>
          </div>)
      }
    </div>
  );
};

export default ServiceQuality;
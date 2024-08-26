import React, { useEffect, useState } from 'react';
import { AllViewButton } from '../button';
import SingleCart from '../singleCart';

const TopFeature = ({title,dataUrl,itemLimit}) => {
const [data,setData]=useState([])

useEffect(() => {
    fetch(dataUrl) 
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching the data:', error));
  }, []);
  console.log(data)
  return (
    <div className='container mx-auto'>
      <h1 className='font-bold  my-10 text-[25px] flex justify-between text-primary'>{title} <span> <AllViewButton></AllViewButton> </span> </h1>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 sm:gap-4 md:gap-8 lg:gap-12'>
        {
          data.slice(0,itemLimit).map(item=><SingleCart item={item} key={item.index}></SingleCart>)
        }
      </div>
    </div>
  );
};

export default TopFeature;
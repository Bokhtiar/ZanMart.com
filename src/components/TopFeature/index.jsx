import React, { useEffect, useState } from 'react';
import { AllViewButton } from '../button';
import SingleCart from '../singleCart';
import { publicRequest } from '@/config/axios.config';

const TopFeature = ({ title, dataUrl, itemLimit }) => {
  const [data, setData] = useState([])
  console.log(title)
  useEffect(() => {
    const fetchdata = async () => {
      try{
        const res = await publicRequest.get(dataUrl)
      const result = res?.data?.data
      // const categoryProduct=data.filter(item=>item?.category_name?.toLowerCase().includes('sattionary'))
      const categoryProduct = result.find(category => category?.category_name === title);
      console.log(categoryProduct)
      setData(categoryProduct?.products)
      console.log(categoryProduct?.products)
      }
      catch(error){
        
      }
    }
    fetchdata()
  }, [title,dataUrl]);

  return (
    <div className='container pb-5 mx-auto'>
      <h1 className='font-bold  my-10 md:text-[25px]  lg:text-[25px]  flex items-center justify-between text-primary'>{title} <span> <AllViewButton></AllViewButton> </span> </h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-12'>
        {
          data?.slice(0, itemLimit).map(item => <SingleCart item={item} key={item.index}></SingleCart>)
        }
      </div>
    </div>
  );
};

export default TopFeature;
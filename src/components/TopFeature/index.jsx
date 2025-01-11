import React, { useEffect, useState } from 'react';
import { AllViewButton } from '../button';
import SingleCart from '../singleCart';
import { publicRequest } from '@/config/axios.config';
import Link from 'next/link';
import { useProduct } from '@/hooks/useProducts';
import { Router, useRouter } from 'next/router';
import { PiDivide } from 'react-icons/pi';

const TopFeature = ({ title, dataUrl, itemLimit, categoryid }) => {
  const [data, setData] = useState([])
  const router = useRouter()
  const { setProducts } = useProduct()
  // console.log(title)
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const res = await publicRequest.get(dataUrl)
        const result = res?.data?.data
        // const categoryProduct=data.filter(item=>item?.category_name?.toLowerCase().includes('sattionary'))
        const categoryProduct = result.find(category => category?.category_name === title);
        console.log(categoryProduct)
        setData(categoryProduct?.products)
        console.log(categoryProduct?.products)
      }
      catch (error) {

      }
    }
    fetchdata()
  }, [title, dataUrl]);
  const viewAll = async (id) => {
    console.log(id)
    try {
      const categoryFilterd = await publicRequest.get(`category/product/${id}`);
            setProducts(categoryFilterd?.data?.data?.data);
    } catch (error) {

    }
  }

  return (
    <div className='container-custom pb-5 mx-auto'>
      <h1 className='font-bold  my-10 md:text-[25px]  lg:text-[25px]  flex items-center justify-between text-primary'>{title} <Link href={`/category-products/?category_id=${categoryid}&category_name=${title}`}   > <AllViewButton />  </Link> </h1>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-8 lg:gap-12'>
        {
          data?.slice(0, itemLimit).map(item => <SingleCart item={item} key={item?.product_id}></SingleCart>)
        }
      </div>
    </div>
  );
};

export default TopFeature;
import React, { useEffect, useState } from "react";
import { AllViewButton } from "../button";
import SingleCart from "../singleCart";
import { publicRequest } from "@/config/axios.config";
import Link from "next/link";
import { useProduct } from "@/hooks/useProducts";
import { Router, useRouter } from "next/router";
import { PiDivide } from "react-icons/pi";

const TopFeature = ({ title, dataUrl, itemLimit, categoryid }) => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { setProducts } = useProduct(); 
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const res = await publicRequest.get(dataUrl);
        const result = res?.data?.data || [];   
        const categoryProduct = result.find(
          (category) => category?.category_id === Number(categoryid)
        );
        if (categoryProduct) {
          setData(categoryProduct.products || []);
        } else {
          setData([]); // Clear data if no matching category is found
        }
      } catch (error) {
        // Handle and log the error
      }
    };

    fetchData();
  }, [dataUrl, categoryid]);

  const viewAll = async (id) => { 
    try {
      const categoryFilterd = await publicRequest.get(`category/product/${id}`);
      setProducts(categoryFilterd?.data?.data?.data);
    } catch (error) {}
  };

  return (
    <div className="container-custom pb-5 mx-auto mt-6 bg-gray-50 py-2 rounded">
      <h1 className="font-bold  my-1 md:text-[25px]  lg:text-[25px]  flex items-center justify-between text-primary capitalize">
        {title}
        <Link
          href={`/category-products/?category_id=${categoryid}&category_name=${title}`}
          onClick={() => viewAll(categoryid)}
        >
          <AllViewButton />
        </Link>
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-4 lg:gap-4">
        {data?.slice(0, itemLimit)?.map((item) => (
          <SingleCart item={item} key={item?.product_id}></SingleCart>
        ))}
      </div>
    </div>
  );
};

export default TopFeature;

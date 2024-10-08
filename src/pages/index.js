import Image from "next/image";
import { Inter, Poppins } from "next/font/google";
import Searchbar from "@/components/searchabr";
import Banner from "@/components/Banner";
import ServiceQuality from "@/components/ServiceQuality";
import TopFeature from "@/components/TopFeature";
import OfferBanner from "@/components/offerBanner";
import SpecialDiscount from "@/components/specialDiscount";
import PaymentOptions from "@/components/PaymentOptions";
import CookieConsent from "@/components/termAndConiton";
import { useEffect, useState } from "react";
import { publicRequest } from "@/config/axios.config";

const poppins = Poppins({ weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900",], subsets: ["latin"] });

export default function Home() {
  const [categories, setCategories] = useState([]);
  const categoryFetch = async () => {
   try{
    const response = await publicRequest.get('home-page-category');
    setCategories(response?.data?.data);
    console.log(response?.data?.data)
   }
   catch(error){
    
   }
  };
  useEffect(()=>{
    categoryFetch()
  },[])
  const dataLimit=(item)=>{
    switch (item?.category_name) {
      case 'stationary':
        return 5;
        
        break;
    
      default:
        return 10;
    }

  }
  return (
    <section className={`${poppins.className} px-2 pt-36 `}>
      <Banner></Banner>
      <ServiceQuality></ServiceQuality>
      {
        categories.map(category=>  <TopFeature title={category?.category_name} dataUrl={'home-page-category'} itemLimit={dataLimit(category)} ></TopFeature>)
      }
      {/* <TopFeature title="FLASH SALE" dataUrl={'home-page-category'} itemLimit={5}></TopFeature>
      <TopFeature title="MAN'S CLOTHING" dataUrl={'home-page-category'} itemLimit={10} ></TopFeature>
      <OfferBanner></OfferBanner>
      <TopFeature title="WOMEN'S  CLOTHING" dataUrl={'/data.json'} itemLimit={10} ></TopFeature>
      <SpecialDiscount></SpecialDiscount>
      <TopFeature title="MEDICAL EQUIPMENT" dataUrl={'/data.json'} itemLimit={5} ></TopFeature>
      <TopFeature title="STATIONARY" dataUrl={'/data.json'} itemLimit={5} ></TopFeature>
      <TopFeature title="OTHERS PRODUCTS" dataUrl={'/data.json'} itemLimit={5} ></TopFeature> */}
      <PaymentOptions></PaymentOptions>

      <CookieConsent />
    </section>
  );
}

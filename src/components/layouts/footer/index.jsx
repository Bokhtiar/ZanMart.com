import { publicRequest } from "@/config/axios.config";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {  // Initialize as an empty object
  const [footerData, setFooterData] = useState({
    webSetting: {},
    category: [],
  });

  const fetchWebSetting = async (apiUrl, val) => {
    try {
      const response = await publicRequest.get(apiUrl);
      const fetchedData = response?.data?.data || {};

      setFooterData((prevState) => ({
        ...prevState,
        [val]: fetchedData,
      })); 
    } catch (error) { 
    }
  };

  useEffect(() => {
    const apiConfigs = [
      { url: "web-setting", key: "webSetting" },
      { url: "categories", key: "category" },
    ];

    apiConfigs.forEach(({ url, key }) => {
      fetchWebSetting(url, key);
    });
  }, []);
  const accounts = [
    {
      path:"/profile",
      name:"My Account"
    },
    {
      path:"/profile/track-order",
      name:"Track Order"
    },
    {
      path:"/my-cart",
      name:"Shopping Cart"
    },
    {
      path:"/profile/orders",
      name:"Orders"
    }
  ]
  return (
    <footer className="bg-[#F5F5F5] pt-10 mt-5  ">
    
     <div className="container-custom grid  lg:grid-cols-2 gap-4  ">
     <div className="grid gap-4 grid-cols-2  md:grid-cols-2 px-5  lg:grid-cols-2  pb-5">
        <div className="flex lg:justify-center  justify-start  ">
          <div className="text-start">
            <div className="flex justify-start">
              {footerData?.webSetting?.logo && (
                <Image
                  height={400}
                  width={400}
                  className="md:h-32 md:w-32 w-16 h-16"
                  src={`${process.env.NEXT_PUBLIC_API_SERVER}${footerData?.webSetting?.logo}`}
                  alt="Logo"
                />
              )}{" "}
              {/* Ensure logo exists */}
            </div>
            <p className="font-medium text-xs leading-[14px] text-[#AAAAAA]">
              Your Trusted Online Shop. Shop with Comfort
            </p>
            <p className="text-sm font-bold py-2 leading-[14px] text-black">
              Contact Us
            </p>
            <p className="font-medium text-xs pb-1 leading-[14px] text-[#AAAAAA]">
              {footerData?.webSetting?.email}
            </p>
            <p className="font-medium text-xs pb-1 leading-[14px] text-[#AAAAAA]">
              {footerData?.webSetting?.phone}
            </p>
            <p className="font-medium text-xs pb-1 leading-[14px] text-[#AAAAAA]">
              {footerData?.webSetting?.location}
            </p>
          </div>
        </div>
        <div className="flex justify-end lg:justify-center sm:justify-start  ">
          <div className="flex justify-start">
            <div className="text-start">
              <h1 className="text-xs leading-[14px] pb-8 font-bold text-black">
                Categories
              </h1>
               
              {
                footerData?.category?.map((item) => (
                  <Link
                    href={`/category-products/?category_id=${item?.category_id}&category_name=${item?.category_name}`}
                    className="font-medium text-xs leading-8 text-[#AAAAAA] block hover:underline"
                    key={item?.category_id}
                  >
                    {item?.category_name}
                  </Link>
                ))
              }
            </div>
          </div>
        </div>
        
      </div>
      <div className="grid grid-cols-2 px-5 gap-4">
      <div className="flex lg:justify-center  justify-start">
          <div className="text-start">
            <h1 className="text-xs leading-[14px] pb-8 font-bold text-black">
              Information
            </h1>
            <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
              Terms & Conditon
            </p>
            <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
              Privecy Policy
            </p>
            <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
              Customer Service
            </p>
            <p className="font-medium text-xs leading-8 text-[#AAAAAA]">FAQs</p>
            <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
              Others
            </p>
          </div>
        </div>
        <div className="flex justify-center lg:justify-center sm:justify-start">
          <div className="text-start">
            <h1 className="text-xs leading-[14px] pb-8 font-bold text-black">
              Account
            </h1> 
            {
              accounts?.map((item,index)=> <Link href={item?.path} className="font-medium text-xs leading-8 text-[#AAAAAA] block hover:underline" key={item.path}>
               {item?.name}
            </Link>)
            } 
          </div>
        </div>
      </div>
     </div>
      {/* social link connected area footer  */}
      <div className="px-5 md:px-20 bg-white ">
        <div className="container-custom px-40  flex  items-center justify-between">
          <p className="text-xs text-[#AAAAAA] py-4">
            &copy; {new Date().getFullYear()} zanmart - All rights Reserved.
          </p>
          <p className="flex text-xs gap-2 text-[#AAAAAA]">
            {footerData?.webSetting?.facebook && (
              <Link href={footerData?.webSetting?.facebook}>
                <FaFacebookF />
              </Link>
            )}
            {footerData?.webSetting?.linkedin && (
              <Link href={footerData?.webSetting?.linkedin}>
                <FaLinkedinIn />
              </Link>
            )}
            {footerData?.webSetting?.instagram && (
              <Link href={footerData?.webSetting?.instagram}>
                <FaInstagram />
              </Link>
            )}
            {footerData?.webSetting?.twitter && (
              <Link href={footerData?.webSetting?.twitter}>
                <FaTwitter />
              </Link>
            )}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

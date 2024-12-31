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

const Footer = () => {
  const [data, setData] = useState({}); // Initialize as an empty object

  const fetchWebSetting = async () => {
    try {
      const response = await publicRequest.get("web-setting");
      const fetchedData = response?.data?.data || {};
      // console.log("Fetched Data:", fetchedData);
      if (typeof window !== "undefined") {
        localStorage.setItem("webSetting", JSON.stringify(fetchedData)); // Store in localStorage
      }
      setData(fetchedData); // Update state with fetched data
      //console.log("Fetched web setting and saved to localStorage:", fetchedData);
    } catch (error) {
      console.error("Error fetching web setting:", error);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("webSetting");
      if (savedData) {
        setData(JSON.parse(savedData)); // Retrieve from localStorage if available
      }
    }
    fetchWebSetting(); // Fetch web settings
  }, []);

  return (
    <footer className="bg-[#F5F5F5] pt-10">
      <div className="grid justify-center grid-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto">
        <div className="text-center">
          <div className="flex justify-center">
            {data.logo && (
              <Image
                height={400}
                width={400}
                className="h-32 w-32"
                src={`${process.env.NEXT_PUBLIC_API_SERVER}${data.logo}`}
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
            {data.email}
          </p>
          <p className="font-medium text-xs pb-1 leading-[14px] text-[#AAAAAA]">
            {data.phone}
          </p>
          <p className="font-medium text-xs pb-1 leading-[14px] text-[#AAAAAA]">
            {data.location}
          </p>
        </div>
        <div className="text-center">
          <h1 className="text-xs leading-[14px] pb-8 font-bold text-black">
            Categories
          </h1>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Clothing
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Stationary
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Medical Equipment
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Handcraft
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">Others</p>
        </div>
        <div className="text-center">
          <h1 className="text-xs leading-[14px] pb-8 font-bold text-black">
            Categories
          </h1>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Clothing
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Stationary
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Medical Equipment
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Handcraft
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">Others</p>
        </div>
        <div className="text-center">
          <h1 className="text-xs leading-[14px] pb-8 font-bold text-black">
            Categories
          </h1>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Clothing
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Stationary
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Medical Equipment
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">
            Handcraft
          </p>
          <p className="font-medium text-xs leading-8 text-[#AAAAAA]">Others</p>
        </div>
      </div>
      <div className="bg-white">
        <div className="container flex mx-auto items-center justify-between">
          <p className="text-xs text-[#AAAAAA] py-4">
            &copy; {new Date().getFullYear()} zanmart - All rights Reserved.
          </p>
          <p className="flex text-xs gap-2 text-[#AAAAAA]">
            {data.facebook && (
              <Link href={data.facebook}>
                <FaFacebookF />
              </Link>
            )}
            {data.linkedin && (
              <Link href={data.linkedin}>
                <FaLinkedinIn />
              </Link>
            )}
            {data.instagram && (
              <Link href={data.instagram}>
                <FaInstagram />
              </Link>
            )}
            {data.twitter && (
              <Link href={data.twitter}>
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

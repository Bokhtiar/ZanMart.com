import { FaFacebookF } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
export const Footer = () => {
    return <>
     <footer className="bg-[#F5F5F5] pt-10 ">
      <div className="grid justify-center gird-cols-1 md:grid-cols-2 lg:grid-cols-4 container mx-auto ">
        <div className="text-center">
         <div className="flex justify-center">
         <img src="images/footerLogo.svg" alt="" />
         </div>
          <p className="font-medium text-xs leading-[14px]  text-[#AAAAAA]">Your Trusted Online Shop. Shop with Comfort</p>
        <p className="text-sm font-bold py-2 leading-[14px] text-black">Contact Us</p>
        <p className="font-medium text-xs pb-1 leading-[14px] text-[#AAAAAA]">H24, Block C/11 - Mirpur 1, Dhaka</p>
        <p className="font-medium text-xs pb-1 leading-[14px] text-[#AAAAAA]">+880969654311, +880969654312</p>
        <p className="font-medium text-xs pb-1 leading-[14px] text-[#AAAAAA]">H24, Block C/11 - Mirpur 1, Dhaka</p>
       
        </div>
        <div className="text-center">
          <h1 className="text-xs  leading-[14px] pb-8 font-bold text-black">Categories</h1>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">Clothing</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">stationary</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">medical Equipment</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">Handcraft</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">others</p>
        </div>
        <div className="text-center">
          <h1 className="text-xs  leading-[14px] pb-8 font-bold text-black">Categories</h1>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">Clothing</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">stationary</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">medical Equipment</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">Handcraft</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">others</p>
        </div>
        <div className="text-center">
          <h1 className="text-xs  leading-[14px] pb-8 font-bold text-black">Categories</h1>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">Clothing</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">stationary</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">medical Equipment</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">Handcraft</p>
          <p className=" font-medium text-xs leading-8  text-[#AAAAAA]">others</p>
        </div>
      </div>
     <div className="bg-white">
     <div className=" container flex mx-auto items-center justify-between ">
     <p className=" text-xs text-[#AAAAAA] py-4 ">&copy; {new Date().getFullYear()} zanmart - All rights Reserved.</p>
     <p className="flex text-xs gap-2 text-[#AAAAAA]">
      <FaFacebookF  />
      <FaLinkedinIn  />
      <FaInstagram   />
      <FaTwitter     /></p>
     </div>
     </div>
    </footer>
    </>
}
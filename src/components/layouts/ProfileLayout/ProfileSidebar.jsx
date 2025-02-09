import { Toastify } from "@/components/toastify";
import { useProduct } from "@/hooks/useProducts";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { IoLocationOutline, IoLogOut } from "react-icons/io5";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { TbCircleKey, TbShoppingBag } from "react-icons/tb";
import { TiDocumentText } from "react-icons/ti";

const ProfileSidebar = ({profile}) => {
    const {user,setToken} = useProduct(); 
  const sections = [
    { logo: <CgProfile />, name: "Profile",path: "/profile"},
    { logo: <IoLocationOutline />, name: "Address Book" , path:"/profile/address" },
    { logo: <TbShoppingBag />,name:"Cart", path: "/profile/cart" },
    { logo: <TiDocumentText />, name: "Orders",path:"/profile/orders" },
    { logo: <TbCircleKey />, name: "Change Password", path:"/profile/change-password" },
  ];
   const router  = useRouter();
  const handleLogOut = () => {
    localStorage.removeItem("token");
    Toastify.Success("Logout Succesfully");
    router.push("/");
    setToken()
  };
  return (
   <div className="">
     <div className="p-4  ">
        <div className="   ">
          <div className="flex justify-center md:pb-4">
            <Image
              height={400}
              width={400}
              className="rounded-full  h-16 w-16 "
              src={`${process.env.NEXT_PUBLIC_API_SERVER}${user?.profile_pic}`}
              al="true"
              alt="Profile Image"
            ></Image>
          </div>
          <p className="text-base py-2 text-center">
            {" "}
            <span className="font-light border-b border-dashed ">
              Hello, <br />
            </span>{" "}
            {user?.name}
          </p>
          <div className="flex justify-center">
            <p className="bg-[#00E381] flex items-center px-3 py-1 rounded-full  text-center text-white text-xs font-semibold ">
              <MdOutlineVerifiedUser /> Verified Account
            </p>
          </div>
        </div>
        <div className="py-8">
          <ul className=" ">
            {sections?.map((data) => (
              <li key={data?.name} className="bg-red-0 py-1 ">
                <Link href={`${data?.path}`} className="bg-red-900 ">
                  <p
                    className={`flex gap-2 py-2 items-center px-2 rounded-lg text-primary hover:text-white text-base ${data?.path==router?.pathname?'bg-primary text-white hover:bg-blue-300':"hover:bg-primary "} `}
                  >
                    {" "}
                    {data.logo} {data.name}
                  </p>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={handleLogOut}
                className="flex gap-2 hover:bg-red-300 py-2 items-center px-2 rounded-lg text-red-500 hover:text-white text-base w-full"
              >
                {" "}
                <IoLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
   </div>
  );
};

export default ProfileSidebar;

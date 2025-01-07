import Address from "@/components/Address";
import MyCart from "@/components/MyCart";
import Orders from "@/components/Orders";
import ProfileInfo from "@/components/ProfileInfo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import OptionsPayment from "@/components/OptionsPayment";
import Image from "next/image";
import { MdOutlineVerifiedUser } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { IoLocationOutline, IoLogOut } from "react-icons/io5";
import { TbShoppingBag } from "react-icons/tb";
import { TiDocumentText } from "react-icons/ti";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbCircleKey } from "react-icons/tb";
import ChangePass from "@/components/changePass";
import PaymetnProceed from "@/components/PaymentProceed";
import ConfirmOrder from "@/components/ConfirmOrder";
import { Toastify } from "@/components/toastify";
import { privateRequest } from "@/config/axios.config";
import OrderDetails from "@/components/order_details";
import isAuth from "@/middleware/auth.middleware";
const Profile = () => {
  const router = useRouter();
  const { section } = router.query;
  const [profile, setprofile] = useState({});
  const sections = [
    { logo: <CgProfile />, name: "Profile" },
    { logo: <IoLocationOutline />, name: "Address Book" },
    { logo: <TbShoppingBag />, name: "My Cart" },
    { logo: <TiDocumentText />, name: "Orders" },
    { logo: <TbCircleKey />, name: "Change Password" },
  ];
  const renderContent = () => {
    switch (section) {
      case "Profile":
        return <ProfileInfo profile={profile} />;
      case "Address Book":
        return <Address />;
      case "My Cart":
        return <MyCart />;
      case "Orders":
        return <Orders />;
      case "order-details":
        return <OrderDetails/>;
      case "Orders/{id}":
        return <Orders />;
      case "Change Password":
        return <ChangePass />;
      case "Payment Proceed":
        return <PaymetnProceed />;
      case "confirm-order":
        return <ConfirmOrder />;
      default:
        return <ProfileInfo />;
    }
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    Toastify.Success("Logout Succesfully");
    router.push("/");
  };
  const fetchProfile = useCallback(async () => {
    try {
      const res = await privateRequest.get("user/profile");
      if (res?.status == 200) {
        setprofile(res?.data?.data);
        console.log(res?.data?.data);
      }
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div className="container-custom  mx-auto flex flex-col lg:flex-row  mt-36">
      <div className="lg:w-1/4 p-4 flex gap-2 lg:block ">
        <div className="flex left-0  flex-col pb-10 justify-center ">
          <div className="flex justify-center md:pb-4">
            <Image
              height={400}
              width={400}
              className="rounded-full  h-16 w-16 "
              src={`${process.env.NEXT_PUBLIC_API_SERVER}${profile?.profile_pic}`}
              al="true"
              alt="Profile Image"
            ></Image>
          </div>
          <p className="text-base py-2 text-center">
            {" "}
            <span className="font-light border-b border-dashed ">
              Hello, <br />
            </span>{" "}
            {profile?.name}
          </p>
          <div className="flex justify-center">
            <p className="bg-[#00E381] flex items-center px-3 py-1 rounded-full  text-center text-white text-xs font-semibold ">
              <MdOutlineVerifiedUser /> Verified Account
            </p>
          </div>
        </div>
        <div className="flex  justify-center">
          <ul className="lg:space-y-4   flex flex-wrap md:gap-4 justify-between lg:items-start lg:justify-between lg:flex-col">
            {sections?.map((data) => (
              <li key={data?.name} className="">
                <Link href={`/profile?section=${data?.name}`}>
                  <p
                    className={`flex lg:px-10 px-2 lg:py-1 rounded-xl text-xs lg:text-base leading-7 font-medium items-center gap-1  ${
                      section === data?.name
                        ? "bg-primary text-white  "
                        : "text-primary"
                    }`}
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
                className="flex  px-10 py-1 teext-xs leading-7 items-center gap-1 text-red-500"
              >
                {" "}
                <IoLogOut /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Content Section */}
      <div className="lg:w-3/4 p-8">
        {renderContent()} 
      </div>
    </div>
  );
};

export default isAuth(Profile);

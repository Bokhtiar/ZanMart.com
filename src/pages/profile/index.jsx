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
import { useProduct } from "@/hooks/useProducts";
import ProfileLayout from "@/components/layouts/ProfileLayout/ProfileLayout";
const Profile = () => {
  const userInfo = useProduct();
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
      
      case "order-details":
        return <OrderDetails />;
      case "Orders/{id}":
        return <Orders />;
     
      case "Payment Proceed":
        return <PaymetnProceed />;
      case "confirm-order":
        return <ConfirmOrder />;
      default:
        return <ProfileInfo />;
    }
  };

  const fetchProfile = useCallback(async () => {
    try {
      const res = await privateRequest.get("user/profile");
      if (res?.status == 200) {
        setprofile(res?.data?.data);
        // console.log(res?.data?.data);
      }
    } catch (error) {}
  }, []);
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
      <ProfileInfo   />
    </div>
  );
};
Profile.getLayout = (page) => <ProfileLayout>{page}</ProfileLayout>;
export default Profile;

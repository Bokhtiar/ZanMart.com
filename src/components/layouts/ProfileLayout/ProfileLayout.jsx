import React from "react";
import { Navbar } from "../navbar";
import Footer from "../footer";
import ProfileSidebar from "./ProfileSidebar";
import isAuth from "@/middleware/auth.middleware";

const ProfileLayout = ({ children }) => {
  return (
    <div className="flex flex-col overflow-hidden container-custom">
      {/* <Navbar /> */}
      <main className=" md:flex    gap-20">
        <div className="">
          <ProfileSidebar />
        </div>
        <div className="  md:w-3/4 ">{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default isAuth(ProfileLayout);

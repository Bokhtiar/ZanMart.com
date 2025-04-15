import React from "react";
import { Navbar } from "../navbar";
import Footer from "../footer";
import ProfileSidebar from "./ProfileSidebar";
import isAuth from "@/middleware/auth.middleware";

const ProfileLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      {/* <Navbar /> */}
      <main className=" md:flex  mt-40 container-custom gap-20">
        <div>
          <ProfileSidebar />
        </div>
        <div className="md:w-3/4 w-full">{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default isAuth(ProfileLayout);

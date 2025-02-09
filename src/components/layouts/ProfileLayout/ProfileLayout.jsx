import React from "react";
import { Navbar } from "../navbar";
import Footer from "../footer";
import ProfileSidebar from "./ProfileSidebar";
import isAuth from "@/middleware/auth.middleware";

const ProfileLayout = ({ children }) => {
  return (
    <div className="flex flex-col">
      {/* <Navbar /> */}

      <main className=" flex mt-40 container-custom gap-20">
        <div>
          <ProfileSidebar />
        </div>
        <div className="  w-3/4">{children}</div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default isAuth(ProfileLayout);

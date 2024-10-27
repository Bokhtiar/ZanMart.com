import { privateRequest } from "@/config/axios.config";
import React, { useState } from "react";
import { Toastify } from "../toastify";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/helpers";

const ChangePass = () => {
  // State to store password inputs
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();
  // Handle input changes for all fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, confirmPassword } = formData;

    // Check if new password and confirm password match
    if (newPassword === confirmPassword) {
      const response = await privateRequest.post("password/reset", {
        password : formData.currentPassword,
        new_password : formData.newPassword,
        confirm_password  : formData.confirmPassword
    });
      if (response.status == 200) {
        removeToken()
        Toastify.Success(response.data?.message);
        router.push("/auth/log-in");
      }
    } else {
      alert("New password and confirm password do not match!");
      return;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold my-10">Manage Your Password</h1>
      <hr className="border-2" />
      <form
        onSubmit={handleSubmit}
        className="w-1/2 flex flex-col justify-center"
      >
        <h1 className="text-center text-white text-sm font-semibold ">
          Hello, Muhtasim Shakil <br />{" "}
          <span className="font-thin text-black">
            Please set a new password for your account
          </span>
        </h1>

        <div className="mt-5">
          <label
            htmlFor="currentPassword"
            className="text-base px-2 md:px-4 lg:px-10 flex pb-3 items-center gap-4 font-semibold"
          >
            Your Current Password*
          </label>
          <input
            className="px-4 md:px-6 lg:px-10 w-full py-3 border-2 md:py-4 lg:py-5 text-sm font-light rounded-xl"
            type="password"
            id="currentPassword"
            name="currentPassword" // Added name attribute for input
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="newPassword"
            className="text-base px-2 md:px-4 lg:px-10 flex pb-3 items-center gap-4 font-semibold"
          >
            New Password*
          </label>
          <input
            className="px-4 md:px-6 border-2 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-xl"
            type="password"
            id="newPassword"
            name="newPassword" // Added name attribute for input
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChange={handleChange}
          />
        </div>
        <div className="mt-5">
          <label
            htmlFor="confirmPassword"
            className="text-base px-2 md:px-4 lg:px-10 flex pb-3 items-center gap-4 font-semibold"
          >
            Re-Type Password*
          </label>
          <input
            className="px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 border-2 lg:py-5 text-sm font-light rounded-xl"
            type="password"
            id="confirmPassword"
            name="confirmPassword" // Added name attribute for input
            placeholder="Re-enter your new password"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-start">
          <button className="mt-10 text-center bg-primary text-white rounded-lg text-xs md:text-sm font-bold py-4 px-8 lg:px-12">
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePass;

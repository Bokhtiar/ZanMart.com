import { privateRequest } from "@/config/axios.config";
import React, { useState } from "react";
import { Toastify } from "../toastify";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/helpers";
import { MdOutlinePassword } from "react-icons/md";


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
  
    // Ensure all fields are filled
    if (!currentPassword || !newPassword || !confirmPassword) {
      Toastify.Error("All fields are required!");
      return;
    }
  
    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      Toastify.Error("New password and confirm password do not match!");
      return;
    }
  
    try {
      const response = await privateRequest.post("password/reset", {
        password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
  
      if (response.status === 200) {
        Toastify.Success(response.data?.message);
        removeToken(); // Ensure token removal on successful password reset
        router.push("/auth/log-in");
      } else {
        Toastify.Error(response?.data?.message);
        console.log(response?.data?.message);
      }
    } catch (error) {
      console.error("Error resetting password:", error?.response?.data?.errors[0]);
      Toastify.Error(error?.response?.data?.errors[0]);
    }
  };
  

  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 px-2 mb-3 ">
        <h1 className="text-2xl font-bold  py-1 rounded-md flex items-center gap-2 text-gray-700">
          <MdOutlinePassword /> Manage Your Account
        </h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-2/3 flex flex-col justify-center"
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

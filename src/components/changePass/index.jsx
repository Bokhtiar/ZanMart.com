import { privateRequest } from "@/config/axios.config";
import React, { useEffect, useState } from "react";
import { Toastify } from "../toastify";
import { useRouter } from "next/navigation";
import { removeToken } from "@/utils/helpers";
import { MdOutlineLock, MdOutlinePassword } from "react-icons/md";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../input";

const ChangePass = () => {
  // State to store password inputs
  const router = useRouter();
  const {
    formState: { errors ,isValid},
    handleSubmit,
    trigger,
    control,
    watch
  } = useForm( );
  // Handle form submission
  const onSubmit = async (e) => {
    // Check if new password and confirm password match
    if (e?.newPassword !== e?.confirmPassword) {
      Toastify.Error("New password and confirm password do not match!");
      return;
    }
    try {
      const response = await privateRequest.post("password/reset", {
        password: e?.currentPassword,
        new_password: e?.newPassword,
        confirm_password:e?.confirmPassword,
      });

      if (response.status === 200) {
        Toastify.Success(response.data?.message);
        removeToken(); // Ensure token removal on successful password reset
        router.push("/auth/log-in");
      } else {
        Toastify.Error(response?.data?.message); 
      }
    } catch (error) { 
      Toastify.Error(error?.response?.data?.errors[0]);
    }
  };
  const password = watch("newPassword");
  return (
    <div>
      <div className="flex items-center justify-between bg-gray-100 px-2 mb-3 ">
        <h1 className="text-2xl font-bold  py-1 rounded-md flex items-center gap-2 text-gray-700">
          <MdOutlinePassword /> Manage Your Account
        </h1>
      </div>

      <form
      onSubmit={handleSubmit(onSubmit)}
        className="w-2/3 flex flex-col justify-center"
      >
        <h1 className="text-center text-white text-sm font-semibold ">
          Hello, Muhtasim Shakil <br />{" "}
          <span className="font-thin text-black">
            Please set a new password for your account
          </span>
        </h1>

        <div className="mt-5">
          <PasswordInput
            name="currentPassword"
            placeholder="Enter your Current Password"
            control={control}
            rules={{
              required: "Current Password is required",
              minLength: {
                value: 6,
                message: "Current Password must be at least 6 characters",
              },
            }}
            label={
              <div className="flex gap-2 pb-2 pl-3.5 text-gray-500">
                <MdOutlineLock className="h-5 w-5" />
                Current Password
              </div>
            }
            error={errors?.currentPassword?.message}
            trigger={trigger}
          />
        </div>
        <div className="mt-5">
          <PasswordInput
            name="newPassword"
            placeholder="Enter your New Password"
            control={control}
            rules={{
              required: "New Password is required",
              minLength: {
                value: 6,
                message: "New Password must be at least 6 characters",
              },
            }}
            label={
              <div className="flex gap-2 pb-2 pl-3.5 text-gray-500">
                <MdOutlineLock className="h-5 w-5" />
                New Password
              </div>
            }
            error={errors?.newPassword?.message}
            trigger={trigger}
          />
        </div>
        <div className="mt-5">
          <PasswordInput
            name="confirmPassword"
            placeholder="Enter your Confirm Password"
            control={control}
            rules={{
              required: "Confirm Password is required",
              minLength: {
                value: 6,
                message: "Confirm Password must be at least 6 characters",
              },
              validate:(value)=> value===password || "Please enter a match password"
            }}
            label={
              <div className="flex gap-2 pb-2 pl-3.5 text-gray-500">
                <MdOutlineLock className="h-5 w-5" />
                Confirm Password
              </div>
            }
            error={errors?.confirmPassword?.message}
            trigger={trigger}
          />
        </div>
        <div className="flex justify-start">
        <button
                type="submit"
                disabled={!isValid}
                className={`mt-8 sm:mt-10 text-white bg-primary rounded-lg text-xs font-bold sm:py-3.5 px-16 sm:px-20 hover:bg-blue-400 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
               Reset Password
              </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePass;

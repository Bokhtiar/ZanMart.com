import React, { useEffect, useState } from "react";
import { MdOutlineLock } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { RxAvatar } from "react-icons/rx";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { publicRequest } from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { Toastify } from "@/components/toastify";
import { getToken, networkErrorHandeller, setToken } from "@/utils/helpers";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const onSubmit = async (data) => {
    const newData = {
      email: data.contactInfo,
      password: data.password,
    };
    console.log("Login data:", newData);

    try {
      const response = await publicRequest.post("login", newData);
      console.log("-----------", response);
      if (response.data.data.token) {
        setToken(response.data.data.token);
        Toastify.Success("Successfully Login");
        router.push("/");
      }
    } catch (error) {
      networkErrorHandeller(error);
    }
  };
  useEffect(() => {
    if (getToken()) router.push("/");
  }, []);
  const [showPass, setShowPass] = useState(false);
  return (
    <div className="container mt-36 mx-auto py-10 flex justify-center">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-xl sm:text-2xl text-center pb-6 sm:pb-10 leading-4">
          Welcome to Zanmart.com Login
        </h1>
        <div className="bg-primary w-full sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center justify-center">
          <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px]">
            <RxAvatar className="text-white h-full w-full bg-primary" />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="mt-5">
              <label
                htmlFor="contactInfo"
                className="text-sm px-5 flex pb-3 items-center text-white gap-4 font-semibold"
              >
                <FiPhone className="h-5 w-5" />
                Phone Number or E-mail
              </label>
              <input
                className={`outline-none px-5 sm:px-14 w-full py-3 sm:py-5 text-sm font-light rounded-lg ${
                  errors.contactInfo ? "border-red-500" : ""
                }`}
                type="text"
                id="contactInfo"
                placeholder="Enter your phone or email"
                {...register("contactInfo", {
                  required: "Phone number or email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{10}$/,
                    message: "Invalid phone number or email",
                  },
                })}
              />
              {errors.contactInfo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.contactInfo.message}
                </p>
              )}
            </div>
            <div className="relative mt-5  ">
              <label
                htmlFor="password"
                className="text-sm px-5 flex pb-3 items-center text-white gap-4 font-semibold"
              >
                <MdOutlineLock className="h-5 w-5" />
                Password
              </label>
              <div className="relative">
                <input
                  className={`outline-none px-5 sm:px-14 w-full py-3 sm:py-5 text-sm font-light rounded-lg pr-10 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  type={showPass ? "text" : "password"}
                  id="password"
                  placeholder="Enter your Password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <span
                  className="absolute inset-y-0 right-3 flex items-center cursor-pointer  "
                  onClick={() => setShowPass(!showPass)}
                > 
                  {!showPass ? (
                    <FaEyeSlash className="h-5 w-5" />
                  ) : (
                    <FaEye className="h-5 w-5" />
                  )}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-8 sm:mt-10 text-primary bg-white rounded-lg text-xs font-bold py-4 sm:py-5 px-16 sm:px-20"
              >
                Login
              </button>
            </div>
            <div className="mt-5 text-center">
              <Link href={"/auth/forget-pass"} className=" text-white font-semibold text-sm sm:p-4 leading-6">
                Forgot password?
              </Link>
              <p className="text-white font-light text-sm leading-6 pt-2">
                Don&lsquo;t have an account?{" "}
                <Link href="/auth/register">
                  <strong className="text-sm font-semibold">Sign Up Now</strong>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

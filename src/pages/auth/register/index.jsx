import TermsAndConditions from "@/components/termAndConiton";
import PrivacyPolicy from "@/components/termAndConiton/PrivacyPolicy";
import { Toastify } from "@/components/toastify";
import { publicRequest } from "@/config/axios.config";
import { networkErrorHandeller } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const onSubmit = async (data) => {
    const newData = {
      name: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      role: "user", // Can be dynamic based on your form
      password: data.password,
    };
    setLoading(true);
    try {
      const response = await publicRequest.post("register", newData); // Use the endpoint 'register' (modify if necessary)
      console.log("succesas---", response.status);
      if (response?.status == 201) {
        router.push("/log-in");
        Toastify.Success("Registered successfully");
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setLoading(false); // Set loading back to false after API call
    }
  };
  const [showTerms, setShowTerms] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showPass2, setShowPass2] = useState(false);
  return (
    <div className="container mt-36  mx-auto py-10 justify-center flex">
      <div className="items-center flex flex-col">
        <h1 className="font-semibold text-2xl text-center pb-10 leading-4">
          Create your Zanmart Account
        </h1>
        <div className="bg-primary w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 lg:p-10 rounded-xl flex flex-col items-center justify-center">
         <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full">
                   <Image src={'/logo.png'} height={200} width={2000} alt="" className="bg-white  p-5"/>
                   </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            {/* Full Name Input */}
            <div className="mt-5">
              <label
                htmlFor="fullName"
                className="text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold"
              >
                Full Name*
              </label>
              <input
                className={`outline-none px-2 md:px-4  w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${
                  errors.fullName ? "border-red-500" : ""
                }`}
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                {...register("fullName", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            {/* Email Input */}
            <div className="mt-5">
              <label
                htmlFor="email"
                className=" text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold"
              >
                Email*
              </label>
              <input
                className={` outline-none px-2 md:px-4  w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${
                  errors.email ? "border-red-500" : ""
                }`}
                type="email"
                id="email"
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Phone Number Input */}

            <div className="mt-5">
              <label
                htmlFor="phoneNumber"
                className="text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold"
              >
                Phone Number*
              </label>
              <input
                className={` outline-none px-2 md:px-4 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${
                  errors.phoneNumber ? "border-red-500" : ""
                }`}
                type="text"
                id="phoneNumber"
                placeholder="Enter your phone number"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^[0-9]{11}$/,
                    message: "Invalid phone number",
                  },
                })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="mt-5 relative">
              <label
                htmlFor="password"
                className=" text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold"
              >
                Password
              </label>
            <div className="relative">
            <input
                className={`outline-none px-4 md:px-4  w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${
                  errors.password ? "border-red-500" : ""
                }`}
                type={showPass2 ? "text" : "password"}
                id="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
              />
              {/* Password show/hide icon */}
              <span
                className="absolute  right-3 transform -translate-y-1/2 flex items-center cursor-pointer bottom-2 "
                onClick={() => setShowPass2(!showPass2)}
              >
                {!showPass2 ? (
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

            {/* Re-Type Password Input */}
            <div className="mt-5 relative">
              <label
                htmlFor="retypePassword"
                className=" outline-none text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold"
              >
                Re-Type Password
              </label>
            <div className="relative">
            <input
                className={`outline-none px-4 md:px-4  w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg ${
                  errors.retypePassword ? "border-red-500" : ""
                }`}
                type={showPass ? "text" : "password"}
                id="retypePassword"
                placeholder="Re-enter your password"
                {...register("retypePassword", {
                  required: "Please re-enter your password",
                  validate: (value, { password }) =>
                    value === password || "Passwords do not match",
                })}
              />
              <span
                className="absolute  right-3 transform -translate-y-1/2 flex items-center cursor-pointer bottom-2 "
                onClick={() => setShowPass(!showPass)}
              >
                {!showPass ? (
                  <FaEyeSlash className="h-5 w-5" />
                ) : (
                  <FaEye className="h-5 w-5" />
                )}
              </span>
            </div>
              {errors.retypePassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.retypePassword.message}
                </p>
              )}
            </div>

            <TermsAndConditions
              setShowTerms={setShowTerms}
              showTerms={showTerms}
            />
            <PrivacyPolicy
              setShowTerms={setShowPolicy}
              showTerms={showPolicy}
            />
            <p className="mt-10 text-white text-md font-normal text-start">
              By clicking &quot;SIGN UP&quot; I agree to the{" "}
              <span
                className="hover:underline cursor-pointer"
                onClick={(e) => {
                  setShowTerms(true);
                }}
              >
                {" "}
                <strong>Terms of Use</strong>
              </span>{" "}
              and{" "}
              <span
                className="hover:underline cursor-pointer"
                onClick={(e) => {
                  setShowPolicy(true);
                }}
              >
                {" "}
                <strong>Privacy Policy</strong>
              </span>
            </p>
            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-10 text-center text-primary bg-white rounded-lg text-xs md:text-sm font-bold py-4 px-16 lg:px-20"
              >
                SIGN UP
              </button>
            </div>
            <div className="mt-5">
              <p className="text-white font-light text-sm leading-6 text-center">
                Already have an account?{" "}
                <Link href="/auth/log-in" className="text-sm font-semibold">
                  Sign In Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

import { PasswordInput, TextInput } from "@/components/input";
import Spinner from "@/components/spinner";
import TermsAndConditions from "@/components/termAndConiton";
import PrivacyPolicy from "@/components/termAndConiton/PrivacyPolicy";
import { Toastify } from "@/components/toastify";
import { publicRequest } from "@/config/axios.config";
import { networkErrorHandeller } from "@/utils/helpers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash, FaRegUserCircle } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";

const Register = () => {
  // const [loading,setLoading]=useState(true)
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
    trigger,
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query;
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

      if (response?.status == 201) {
        router.push(
          redirect ? `/auth/log-in?redirect=${redirect}` : "/auth/log-in"
        );
        // router.replace(redirect ? String(redirect) : "/");
        Toastify.Success("Registered successfully");
      }
    } catch (error) {
      networkErrorHandeller(error);
      setLoading(false);
    } finally {
      setLoading(false); // Set loading back to false after API call
    }
  };
  const [showTerms, setShowTerms] = useState(false);
  const [showPolicy, setShowPolicy] = useState(false);
  return (
    <div className="container   mx-auto  justify-center flex">
      <div className="items-center flex flex-col">
        <div className="bg-primary w-full max-w-md md:max-w-lg lg:max-w-xl p-2  sm:p-5  rounded-xl flex flex-col items-center justify-center">
          <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full bg-white">
            <Image
              src={"/logo.png"}
              height={200}
              width={2000}
              alt=""
              className="  p-5"
            />
          </div>
          <div className="text-center font-medium text-lg py-2">
            Sign up with email or phone
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center space-y-4"
          >
            {/* Full Name Input */}
            <div className=" ">
              <TextInput
                name="fullName"
                type="text"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <FaRegUserCircle className="h-5 w-5" />
                    Full Name
                  </div>
                }
                rules={{
                  required: "Full name  is required",
                  minLength: {
                    value: 3,
                    message: "Full name must be at least 3 characters",
                  },
                }}
                error={errors?.fullName?.message}
                placeholder="Enter your  full name"
                trigger={trigger}
              />
            </div>
            {/* Email Input */}
            <div className=" ">
              <TextInput
                name="email"
                type="email"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <MdOutlineMailOutline className="h-5 w-5" />
                    E-mail
                  </div>
                }  
                placeholder="Enter your  email"
                trigger={trigger}
              />
            </div>

            {/* Phone Number Input */}

            <div className=" ">
              <TextInput
                name="phoneNumber"
                type="text"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <FiPhone className="h-5 w-5" />
                    Phone Number
                  </div>
                }
                rules={{
                  required: "Phone Number  is required",
                  pattern: {
                    value: /^(?:\+880|880|0)1[3-9]\d{8}$/,
                    message: "Invalid  Phone Number",
                  },
                }}
                error={errors?.phoneNumber?.message}
                placeholder="Enter your  Phone Number"
                trigger={trigger}
              />
            </div>

            {/* Password Input */}
            <div className="  relative">
              <PasswordInput
                name="password"
                placeholder="Enter your Password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <MdOutlineLock className="h-5 w-5" />
                    Password
                  </div>
                }
                error={errors?.password?.message}
                trigger={trigger}
              />
            </div>
            {/* Re-Type Password Input */}
            <div className=" relative">
              <PasswordInput
                name="retypePassword"
                placeholder="Enter your ReType Password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                }}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <MdOutlineLock className="h-5 w-5" />
                    ReType Password
                  </div>
                }
                error={errors?.retypePassword?.message}
                trigger={trigger}
              />
            </div>

            <TermsAndConditions
              setShowTerms={setShowTerms}
              showTerms={showTerms}
            />
            <PrivacyPolicy
              setShowTerms={setShowPolicy}
              showTerms={showPolicy}
            />
            <p className="  text-white text-md font-normal text-start">
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
                disabled={!isValid || loading}
                className={`    gap-2 w-full text-primary flex justify-center items-center bg-white rounded-lg text-xs font-bold  py-3.5 px-16 sm:px-20 hover:bg-gray-100 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? <Spinner className="h-4 w-4" /> : "Sign Up"}
              </button>
            </div>
            <div className=" ">
              <p className="text-white font-light text-sm leading-6 text-center">
                Already have an account?{" "}
                <Link
                  href="/auth/log-in"
                  className="text-sm font-semibold hover:underline"
                >
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

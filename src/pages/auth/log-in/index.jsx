import React, { useEffect } from "react";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { publicRequest } from "@/config/axios.config";
import { useRouter } from "next/router";
import { Toastify } from "@/components/toastify";
import { getToken, networkErrorHandeller, setToken } from "@/utils/helpers";
import Image from "next/image";
import { PasswordInput, TextInput } from "@/components/input";
import { UserContext } from "@/contex/UserContex";
import { useProduct } from "@/hooks/useProducts";

const Login = () => {
  const userInfo = useProduct()
  // console.log(userInfo);
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    trigger,
  } = useForm();
  const router = useRouter();
  const { redirect } = router.query; 
  // console.log(router.query);
  const onSubmit = async (data) => {
    const newData = {
      email: data.contactInfo,
      password: data.password,
    };
    try {
      const response = await publicRequest.post("login", newData);
      if (response.data.data.token) {
        userInfo.setToken(response.data.data.token)
        setToken(response.data.data.token);
        Toastify.Success("Successfully Login");
        // router.push("/");
        router.replace(redirect ? String(redirect) : "/");
      }
    } catch (error) {
      // console.log(error);
      networkErrorHandeller(error);
    }
  };
  useEffect(() => {
    if (getToken()) router.push("/");
  }, []);
  return (
    <div className="container mt-36 mx-auto py-10 flex justify-center">
      <div className="flex flex-col items-center text-gray-700">
        <span className="font-semibold text-xl sm:text-2xl text-center  leading-4">
          Welcome to Zanmart
        </span>
        <span className="font-semibold text-xl sm:text-2xl text-center pb-6 sm:pb-10 leading-4">
          Sign into your account
        </span>
        <div className="bg-primary w-full sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center justify-center">
          <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full bg-white">
            <Image
              src={"/logo.png"}
              height={200}
              width={2000}
              alt=""
              className="bg-   p-5  "
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="mt-5">
              {/* email field  */}
              <TextInput
                name="contactInfo"
                type="email"
                control={control}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                 <MdOutlineMailOutline className="h-5 w-5" />
                   E-mail
                  </div>
                }
                rules={{
                  required: "Email required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$|^\d{10}$/,
                    message: "Invalid phone number or email",
                  },
                }}
                error={errors?.contactInfo?.message}
                placeholder="Enter your email"
                trigger={trigger}
              />
            </div>
            <div className="relative mt-5  ">
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

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isValid}
                className={`mt-8 sm:mt-10 text-primary bg-white rounded-lg text-xs font-bold sm:py-3.5 px-16 sm:px-20 hover:bg-gray-100 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Login
              </button>
            </div>
            <div className="mt-5 text-center">
              <Link
                href={"/auth/forget-pass"}
                className=" text-white font-semibold text-sm sm:p-4 leading-6 hover:underline"
              >
                Forgot password?
              </Link>
              <p className="text-white font-light text-sm leading-6 pt-2">
                Don&lsquo;t have an account?{" "}
                <Link href="/auth/register" className="hover:underline">
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

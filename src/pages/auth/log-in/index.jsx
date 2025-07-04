import React, { useEffect, useState } from "react";
import { MdOutlineLock, MdOutlineMailOutline } from "react-icons/md";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { publicRequest } from "@/config/axios.config";
import { useRouter } from "next/router";
import { Toastify } from "@/components/toastify";
import { getToken, networkErrorHandeller, setToken } from "@/utils/helpers";
import Image from "next/image";
import { PasswordInput, TextInput } from "@/components/input";
import { useProduct } from "@/hooks/useProducts";
import Spinner from "@/components/spinner";
import useStickyFetch from "@/hooks/sticky";
const Login = () => {
  const userInfo = useProduct();
  const { isSticky } = useStickyFetch();
  const [loading, setLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    trigger,
  } = useForm();
  const router = useRouter();
  const value = router?.query;
  let str = "";
  for (let vl in value) {
    if (vl !== "redirect") {
      str += "&" + vl + "=" + value[vl];
    }
  }

  const { redirect } = router.query;
  const onSubmit = async (data) => {
    const newData = {
      email: data.contactInfo,
      password: data.password,
    };
    try {
      setLoading(true);
      const response = await publicRequest.post("login", newData);
      console.log(response);
      if (response.data.data.token) {
        userInfo.setToken(response.data.data.token);
        setToken(response.data.data.token);
        Toastify.Success("Successfully Login");
        router.replace(redirect ? String(redirect) + str : "/");
        setLoading(false);
      }
    } catch (error) {
      networkErrorHandeller(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (getToken()) router.push("/");
  }, []);
  return (
    <div
      className={`container  mx-auto ${isSticky && " "}    flex justify-center`}
    >
      {/* <button onClick={()=>{
        Toastify.Success("welcome to home")
      }}>hit the button</button> */}
      <div className="flex flex-col items-center text-gray-700">
        <div className="bg-primary w-full sm:w-[550px] p-2  sm:p-5 rounded-xl flex flex-col items-center justify-center">
          <div className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] rounded-full bg-white">
            <Image
              src={"/logo.png"}
              height={200}
              width={2000}
              alt=""
              className="p-5"
            />
          </div>
          <div className="text-center font-medium text-lg py-2">
            Sign in with email or phone
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="mt-5">
              {/* email field  */}
              <TextInput
                name="contactInfo"
                type="text"
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
                    message: "Invalid phone number or email",
                  },
                }}
                error={errors?.contactInfo?.message}
                placeholder="Enter your email or phone"
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
            <div className="flex justify-center mt-4">
              <button
                type="submit"
                disabled={!isValid}
                className={`mt-2 sm:mt-4 gap-2 w-full text-primary flex justify-center items-center bg-white rounded-lg text-xs font-bold  py-3.5 px-16 sm:px-20 hover:bg-gray-100 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? <Spinner className="h-4 w-4" /> : "Login"}
              </button>
            </div>
          </form>
          <div className="flex mt-4 items-center gap-4 w-full ">
            <hr className="block w-full" />
            <span className="text-white">or</span>
            <hr className="w-full block" />
          </div>

          <div class="flex items-center justify-center mt-4 w-full bg-white text-gray-700 font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-200 ">
            <button
              onClick={() => {
                window.location.href = `${
                  process.env.NEXT_PUBLIC_API_SERVER
                }api/auth/google?route=${redirect ? String(redirect) : "/"}`;
              }}
              class="w-full   flex items-center justify-center gap-3 "
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                class="w-7 h-7"
                alt="Google logo"
              />
              <span>Continue with Google</span>
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
              <Link
                href={
                  redirect
                    ? `/auth/register?redirect=${redirect + str}`
                    : "/auth/register"
                }
                className="hover:underline"
              >
                <strong className="text-sm font-semibold">Sign Up Now</strong>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

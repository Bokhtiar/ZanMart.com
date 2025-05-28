"use client";

import Link from "next/link";
import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { useForm } from "react-hook-form";
import { publicRequest } from "@/config/axios.config";
import { useRouter } from "next/navigation";
import { Toastify } from "@/components/toastify";
import { useProduct } from "@/hooks/useProducts";
import Image from "next/image";
import { TextInput } from "@/components/input";
import Spinner from "@/components/spinner";

const ForgotPass = () => {
  const [loading, setLoading] = useState(false);
  const { setUser } = useProduct();
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await publicRequest.post("forgot/password/mail-send", {
        email: data?.contact,
      });

      if (response.status === 200) {
        Toastify.Success(response?.data?.message);
        setUser(response.data?.data?.email);
        router.push(`/auth/verify-number?email=${data?.contact}`);
      }
    } catch (error) {
      Toastify.Error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container   mx-auto py-10 flex justify-center">
      <div className="flex flex-col items-center">
        <h1 className="font-semibold text-xl sm:text-2xl text-center pb-6 sm:pb-10 leading-4">
          Forgot your password?
        </h1>
        <div className="bg-primary w-full sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center justify-center">
          <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] ">
            <Image
              src={"/logo.png"}
              height={200}
              width={2000}
              alt="Logo"
              className="bg-white rounded-full p-2"
            />
          </div>

          <form
            className="w-full flex flex-col justify-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="mt-5">
              <TextInput
                name="contact"
                type="email"
                control={control}
                label={
                  <span className="flex gap-2 pb-2 pl-3.5 text-white items-center">
                    <MdOutlineMailOutline className="h-5 w-5" />
                    E-mail
                  </span>
                }
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email format",
                  },
                }}
                error={errors?.contact?.message}
                placeholder="Enter your email"
                trigger={trigger}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isValid}
                className={`mt-8 sm:mt-10 text-primary bg-white rounded-lg flex gap-2 justify-center items-center text-xs font-bold sm:py-3.5 px-16 sm:px-20 hover:bg-gray-100 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ?  <Spinner/>: "Send OTP"}
              </button>
            </div>

            <div className="mt-5 text-center">
              <p className="text-white font-light text-sm leading-6">
                Don’t have an account?{" "}
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

export default ForgotPass;

import React, { useState } from "react";
import { MdOutlineLock } from "react-icons/md";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Toastify } from "@/components/toastify";
import { publicRequest } from "@/config/axios.config";
import { networkErrorHandeller } from "@/utils/helpers";
import Image from "next/image";
import Spinner from "@/components/spinner";
import { PasswordInput } from "@/components/input";

const NewPass = () => {
  const router = useRouter();
  const { code, email } = router.query;

  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    formState: { errors, isValid },
    control,
    trigger,
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await publicRequest.post("forgot-password-update", {
        email,
        forgot_code: code,
        password: data.password,
        confirm_password: data.confirm_password,
      });
      if (response.status === 200) {
        Toastify.Success(response?.data?.message);
        router.push("/auth/log-in");
      }
    } catch (error) {
      networkErrorHandeller(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-36 mx-auto py-10 flex justify-center">
      <div className="flex flex-col items-center text-gray-700">
        <span className="font-semibold text-xl sm:text-2xl text-center pb-6 sm:pb-10 leading-4">
          Set your new password
        </span>
        <div className="bg-primary w-full sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center justify-center">
          <div className="w-[80px] h-[80px] sm:w-[110px] sm:h-[110px] rounded-full bg-white">
            <Image
              src="/logo.png"
              width={200}
              height={200}
              alt="Logo"
              className="p-5"
            />
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col justify-center"
          >
            <div className="mt-5">
              <PasswordInput
                name="password"
                placeholder="Enter your password"
                control={control}
                rules={{
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
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

            <div className="mt-5">
              <PasswordInput
                name="confirm_password"
                placeholder="Re-enter your password"
                control={control}
                rules={{
                  required: "Confirm password is required",
                  validate: (value) =>
                    value === control._formValues.password ||
                    "Passwords do not match",
                }}
                label={
                  <div className="flex gap-2 pb-2 pl-3.5 text-white">
                    <MdOutlineLock className="h-5 w-5" />
                    Confirm Password
                  </div>
                }
                error={errors?.confirm_password?.message}
                trigger={trigger}
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!isValid}
                className={`mt-8 sm:mt-10 gap-2 text-primary flex justify-center items-center bg-white rounded-lg text-xs font-bold sm:py-3.5 px-16 sm:px-20 hover:bg-gray-100 ${
                  !isValid ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {loading ? <Spinner /> : "Reset Password"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPass;

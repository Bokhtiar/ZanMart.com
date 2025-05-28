import Spinner from "@/components/spinner";
import { Toastify } from "@/components/toastify";
import { publicRequest } from "@/config/axios.config";
import { useProduct } from "@/hooks/useProducts";
import { networkErrorHandeller } from "@/utils/helpers";
import { useRouter } from "next/router";
// import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import { RxAvatar } from "react-icons/rx";

const VerifyNumber = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const { user, setForgotCode } = useProduct();
  const { email } = router.query;
  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Move focus to the next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpValue = otp.join("");
    setForgotCode(otpValue);
    try {
      setLoading(true);
      const res = await publicRequest.post("forgot-code-check", {
        email: email,
        forgot_code: otpValue,
      });
      if (res.status === 200) {
        Toastify.Success(res.data?.message);
        router.push(`/auth/set-pass?email=${email}&code=${otpValue}`);

        setLoading(false);
      }
    } catch (error) {
      networkErrorHandeller(error);
      setLoading(false);
    }
  };

  const Resend = async () => {
    try {
      setResendLoading(true);
      const response = await publicRequest.post("forgot/password/mail-send", {
        email: email,
      });
      if (response.status == 200 || response.status == 201) {
        // router.push(`/auth/verify-number?email=${data?.contact}`);
        Toastify.Success(response?.data?.message);
        setResendLoading(false);
        // console.log(resendLoading)
      } else {
        setResendLoading(false);
      }
    } catch (error) {
      networkErrorHandeller(error);
      setResendLoading(false);
    }
  };

  return (
    <div className="container   mx-auto py-6 sm:py-10 flex justify-center">
      <div className="flex flex-col items-center w-full px-4 sm:px-0">
        <h1 className="font-semibold text-lg sm:text-2xl text-center pb-4 sm:pb-10">
          Verify your Email
        </h1>
        <div className="bg-primary w-full sm:w-[550px] p-6 sm:p-10 rounded-xl flex flex-col items-center">
          <h1 className="font-medium text-sm sm:text-base text-white text-center py-6 sm:py-10">
            We have sent an OTP to your Email <br />
          </h1>
          <p className="font-semibold text-sm sm:text-base text-white pb-4 text-center">
            Enter OTP number*
          </p>
          <div className="flex gap-2 sm:gap-4 justify-center">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                className="outline-none w-8 h-8 md:h-12 md:w-12 text-primary text-center font-bold text-xl sm:text-2xl rounded-lg"
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>

          <div className="flex justify-center">
            <button
              onClick={handleSubmit}
              className="mt-6 sm:mt-10 text-primary bg-white rounded-lg text-xs sm:text-sm font-bold py-3 sm:py-5 px-12 sm:px-20"
            >
              {loading ? <Spinner /> : "Verify"}
            </button>
          </div>

          <div className="mt-5 text-center">
            <p className="text-white font-semibold text-xs sm:text-sm">
              Didn’t get the OTP?
            </p>
            <p className="text-white font-light text-xs sm:text-sm">
              <button
                onClick={Resend}
                disabled={resendLoading}
                className={`${
                  resendLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <strong className="font-semibold">
                  {resendLoading ? "Sending..." : "Resend"}
                </strong>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyNumber;

import { Toastify } from "@/components/toastify";
import { publicRequest } from "@/config/axios.config";
import { useProduct } from "@/hooks/useProducts";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  // State to store password and confirm password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // To toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For confirming password visibility
  const router = useRouter();
  // You mentioned you are using useProduct
  const { user, forgotCode } = useProduct();

  // Handle input change for both password fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      setPassword(value);
    } else if (name === "confirm_password") {
      setConfirmPassword(value);
    }
  };

  // Handle form submission (e.g., resetting password)
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Check if passwords match
      if (password === confirmPassword) {
        const response = await publicRequest.post("forgot-password-update", {
          email: user,
          forgot_code: forgotCode,
          password: password,
          confirm_password: confirmPassword,
        });
        if (response.status === 200) {
          Toastify.Success(response.data?.message);
          router.push("/auth/log-in");
        }
      } else {
        Toastify.Warning("Passwords do not match!");
        return;
      }
    } catch (error) {}
  };

  return (
    <div className="container mt-36 mx-auto px-2 py-10 justify-center flex">
      <div className="items-center flex flex-col">
        <h1 className="font-semibold text-2xl text-center pb-10 leading-4">
          Set your new Password
        </h1>
        <div className="bg-primary w-full max-w-md md:max-w-lg lg:max-w-xl p-6 md:p-8 lg:p-10 rounded-xl flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col justify-center"
          >
            <h1 className="text-center text-white text-sm font-semibold ">
              Hello, Muhtasim Shakil <br />{" "}
              <span className="font-thin">
                Please set a new password for your account
              </span>
            </h1>

            <div className="mt-5 relative">
              <label
                htmlFor="password"
                className="text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold"
              >
                Password
              </label>
              <input
                className="px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg"
                type={showPassword ? "text" : "password"} // Toggle between text and password
                id="password"
                placeholder="Enter your password"
                name="password"
                value={password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-4 top-12 text-white"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}{" "}
                {/* You can replace these emojis with an icon */}
              </button>
            </div>

            <div className="mt-5 relative">
              <label
                htmlFor="retypePassword"
                className="text-sm px-2 md:px-4 text-white flex pb-3 items-center gap-4 font-semibold"
              >
                Re-Type Password
              </label>
              <input
                className="px-4 md:px-6 lg:px-10 w-full py-3 md:py-4 lg:py-5 text-sm font-light rounded-lg"
                type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
                id="retypePassword"
                placeholder="Re-enter your password"
                name="confirm_password"
                value={confirmPassword}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute right-4 top-12 text-white"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "👁️" : "👁️‍🗨️"}{" "}
                {/* You can replace these emojis with an icon */}
              </button>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-10 text-center text-primary bg-white rounded-lg text-xs md:text-sm font-bold py-4 px-8 lg:px-12"
              >
                Reset Password
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

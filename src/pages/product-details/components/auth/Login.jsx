import React, { useEffect, useState } from "react";
import { publicRequest } from "@/config/axios.config";
import { setToken } from "@/utils/helpers";
import { Toastify } from "@/components/toastify";
import { useProduct } from "@/hooks/useProducts";
import Link from "next/link";
import Signup from "./Signup";

const Login = ({ showModal, setShowModal ,onSuccess=()=>{}}) => {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
   const [showSignup, setShowSignup] = useState(false);
  const userInfo = useProduct();
  useEffect(() => {
    if (showModal) {
      // Trigger animation after mounting
      setTimeout(() => setAnimate(true), 10);
    } else {
      setAnimate(false);
    }
  }, [showModal]);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setShowModal(false), 200); // wait for animation to finish
  };

  const handleLogin = async () => {
    setError("");

    const newData = {
      email: emailOrPhone,
      password,
    };

    try {
      const response = await publicRequest.post("login", newData);
      console.log("Login success:", response.data);
     
      if (response.data.data.token) {
         onSuccess && onSuccess();
        userInfo.setToken(response.data.data.token);
        setToken(response.data.data.token);
        Toastify.Success("Successfully Login");
         handleClose();
      }
    } catch (err) {
    
      Toastify.Error("Invalid email/phone or password");
    }
  };

  return (
    <>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal box */}
          <div
            className={`relative bg-white w-full max-w-md rounded-lg p-6 shadow-lg transform transition-all duration-300 ${
              animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              aria-label="Close modal"
              className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl font-bold focus:outline-none"
            >
              &times;
            </button>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-center mb-4">Login</h2>

            {/* Form Fields */}
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Email or Phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              {error && <p className="text-red-500 text-sm">{error}</p>}

              <button
                onClick={handleLogin}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
              >
                Login
              </button>

              <div className="text-center text-sm text-gray-500">or</div>

              <div class="flex items-center justify-center mt-4 w-full bg-white text-gray-700 font-medium py-2 px-4 rounded-lg shadow-md hover:bg-gray-100 transition duration-200 ">
                <button
                  onClick={() => {
                    window.location.href = `${
                      process.env.NEXT_PUBLIC_API_SERVER
                    }api/auth/google?route=${"/products"}`;
                  }}
                  class="w-full flex items-center justify-center gap-3 "
                >
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    class="w-7 h-7"
                    alt="Google logo"
                  />
                  <span>Continue with Google</span>
                </button>
              </div>

              <p className="text-sm text-center">
                Don’t have an account?{" "}
                <button
                    className="text-blue-600 hover:underline"
                     onClick={() => {
                    setShowModal(false);
                    setShowSignup(true);
                  }}
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      )}
       {showSignup && (
        <Signup setShowSignup={setShowSignup} setShowLogin={setShowModal} />
      )}
    </>
  );
};

export default Login;

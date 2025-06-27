import React, { useEffect, useState } from "react";
import { publicRequest } from "@/config/axios.config";
import { setToken } from "@/utils/helpers";
import { Toastify } from "@/components/toastify";
import { useProduct } from "@/hooks/useProducts";

const Signup = ({ setShowSignup, setShowLogin }) => {
  const [name, setName] = useState("");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [animate, setAnimate] = useState(false);
  const userInfo = useProduct();

  useEffect(() => {
    setTimeout(() => setAnimate(true), 10);
  }, []);

  const handleClose = () => {
    setAnimate(false);
    setTimeout(() => setShowSignup(false), 200);
  };

  const handleSignup = async () => {
    setError("");
    try {
      const response = await publicRequest.post("register", {
        name,
        phone: emailOrPhone,
        password,
          role: "user",
      });
      if (response.data ) {
        // userInfo.setToken(response.data.data.token);
        // setToken(response.data.data.token);
        Toastify.Success("Successfully Registered");
        setShowSignup(false);
                setShowLogin(true);
        // handleClose();
      }
    } catch (err) {
      setError("Registration failed. Try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`relative bg-white w-full max-w-md rounded-lg p-6 shadow-lg transform transition-all duration-300 ${
          animate ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-center mb-4">Signup</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="text"
            placeholder="Email or Phone"
            value={emailOrPhone}
            onChange={(e) => setEmailOrPhone(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-4 py-2"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            onClick={handleSignup}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Signup
          </button>

          <p className="text-sm text-center">
            Already have an account?{" "}
            <button
              onClick={() => {
                setShowSignup(false);
                setShowLogin(true);
              }}
              className="text-blue-600 hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

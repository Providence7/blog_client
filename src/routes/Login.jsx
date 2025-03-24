import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Image from "../components/Image";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth/profile", {
          withCredentials: true,
        });
        if (res.data) {
          navigate("/"); // Redirect if already logged in
        }
      } catch (err) {
        console.log("Not authenticated");
      }
    };
    checkAuth();
  }, [navigate]);

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/auth/google"; // Redirect to backend
  };

  return (
    <div className="flex items-center mt-24 justify-center">
      <div className="bg-white p-14 shadow-lg rounded-lg max-w-sm text-center">
      <div>
          <span className="italic text-[#c4458f] font-thin text-xl">
            <span className="font-bold text-3xl"> F</span>ashion
          </span>
          <span className="text-[#46249c] font-bold text-2xl ">
            <span className="font-bold text-3xl">E</span>ra
          </span>
        </div>
        <p className="text-gray-500 mb-6">Sign in with Google</p>

        <button
          onClick={handleGoogleLogin}
          className="w-full py-2 px-4 bg-[#5e37c2] text-white rounded-lg
           flex items-center justify-center hover:bg-[#c4458f]"
        >
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default Login;

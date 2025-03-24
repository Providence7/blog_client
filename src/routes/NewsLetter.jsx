import { useState } from "react";
import axios from "axios";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.includes("@") || !email.includes(".")) {
      setMessage("❌ Please enter a valid email.");
      return;
    }

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/newsletter/subscribe`, { email });
      setMessage("✅ " + res.data.message);
      setEmail("");
    } catch (error) {
      setMessage("❌ " + (error.response?.data.message || "Something went wrong!"));
    }
  };

  return (
    <div className="max-w-md my-7 mx-auto p-6 bg-inherit rounded-xl shadow-sm text-center">
      <h2 className="text-xl font-bold text-gray-800">Join Our Newsletter 📰 </h2>
      <p className="text-gray-600 mt-2">Stay updated with the latest fashion trends!</p>
      <form onSubmit={handleSubscribe} className="mt-4">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full p-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="w-1/2 mt-3 bg-[#c4458f] text-white py-2 rounded-lg hover:bg-blue-700 transition">
          Subscribe
        </button>
      </form>
      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
};

export default Newsletter;

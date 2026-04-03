// src/pages/AdminRegister.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Lock, ArrowRight } from "lucide-react";

const AdminRegister = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(admin),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Registration failed");

      setSuccess("Account created successfully! Welcome to the team.");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAF9F6] px-4 py-12">
      <div className="bg-white border border-[#B76E79]/10 p-8 md:p-10 shadow-2xl rounded-[2.5rem] w-full max-w-md relative overflow-hidden">
        
        {/* Branding Accent */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#581845] via-[#D6AE7B] to-[#581845]" />

        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-[#1B1B1F] mb-2">Join the Atelier</h2>
          <p className="text-sm text-[#B76E79] font-medium uppercase tracking-widest">Admin Registration</p>
        </div>

        {/* Status Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-sm rounded-r-xl animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-sm rounded-r-xl animate-in fade-in slide-in-from-top-2">
            {success}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-5">
          {/* Name Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#B76E79] group-focus-within:text-[#581845] transition-colors">
              <User size={18} />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={admin.name}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-4 bg-[#FAF9F6] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#D6AE7B] focus:ring-4 focus:ring-[#D6AE7B]/10 transition-all text-[#1B1B1F]"
              required
            />
          </div>

          {/* Email Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#B76E79] group-focus-within:text-[#581845] transition-colors">
              <Mail size={18} />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={admin.email}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-4 bg-[#FAF9F6] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#D6AE7B] focus:ring-4 focus:ring-[#D6AE7B]/10 transition-all text-[#1B1B1F]"
              required
            />
          </div>

          {/* Password Field */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#B76E79] group-focus-within:text-[#581845] transition-colors">
              <Lock size={18} />
            </div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={admin.password}
              onChange={handleChange}
              className="w-full pl-11 pr-4 py-4 bg-[#FAF9F6] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#D6AE7B] focus:ring-4 focus:ring-[#D6AE7B]/10 transition-all text-[#1B1B1F]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#581845] hover:bg-[#1B1B1F] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#581845]/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
          >
            Create Admin Account
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm text-[#B76E79]">
            Already part of the team?{" "}
            <Link to="/admin/login" className="text-[#581845] font-bold hover:underline underline-offset-4">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminRegister;
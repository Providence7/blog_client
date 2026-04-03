// src/pages/AdminLogin.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { Lock, Mail, ChevronRight, ShieldCheck } from "lucide-react";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Invalid credentials");

      login(); 
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#FAF9F6] px-4">
      <div className="bg-white border border-[#B76E79]/10 p-8 md:p-12 shadow-2xl rounded-[2.5rem] w-full max-w-md relative overflow-hidden">
        
        {/* Top Decorative Bar */}
        <div className="absolute top-0 left-0 w-full h-1.5 bg-[#581845]" />

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#FAF9F6] text-[#581845] rounded-2xl mb-4 shadow-inner">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-bold text-[#1B1B1F]">Welcome Back</h2>
          <p className="text-[#B76E79] text-xs uppercase tracking-[0.2em] font-bold mt-2">Secure Admin Portal</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-[#B76E79]/10 border-l-4 border-[#B76E79] text-[#581845] text-sm rounded-r-xl animate-in fade-in slide-in-from-top-2">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            {/* Email Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#B76E79] group-focus-within:text-[#581845] transition-colors">
                <Mail size={18} />
              </div>
              <input
                type="email"
                placeholder="Admin Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#FAF9F6] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#D6AE7B] focus:ring-4 focus:ring-[#D6AE7B]/10 transition-all text-[#1B1B1F]"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-[#B76E79] group-focus-within:text-[#581845] transition-colors">
                <Lock size={18} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-[#FAF9F6] border border-transparent rounded-2xl outline-none focus:bg-white focus:border-[#D6AE7B] focus:ring-4 focus:ring-[#D6AE7B]/10 transition-all text-[#1B1B1F]"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#581845] hover:bg-[#1B1B1F] text-white py-4 rounded-2xl font-bold shadow-lg shadow-[#581845]/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98] disabled:opacity-70"
          >
            {loading ? "Verifying..." : "Authorize Login"}
            {!loading && <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <div className="mt-10 text-center border-t border-gray-50 pt-6">
          <p className="text-sm text-[#B76E79]">
            Need to register a new admin?{" "}
            <Link to="/admin/register" className="text-[#581845] font-bold hover:underline underline-offset-4">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
// src/components/Newsletter.jsx
import { useState } from "react";
import axios from "axios";
import { Mail, Sparkles, CheckCircle2, AlertCircle } from "lucide-react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });
    
    if (!email.includes("@") || !email.includes(".")) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/newsletter/subscribe`, { email });
      setStatus({ type: "success", message: res.data.message || "Welcome to the inner circle!" });
      setEmail("");
    } catch (error) {
      setStatus({ 
        type: "error", 
        message: error.response?.data.message || "Our tailors are busy. Please try again later!" 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-10 sm:my-12 px-5 sm:px-6 py-8 sm:py-10 bg-white border border-[#B76E79]/10 rounded-[1.75rem] sm:rounded-[2.5rem] shadow-xl relative overflow-hidden">
      {/* Decorative Gold Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#D6AE7B]/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 text-center">
        <div className="inline-flex items-center justify-center p-2.5 sm:p-3 bg-[#FAF9F6] rounded-xl sm:rounded-2xl mb-3 sm:mb-4 text-[#581845]">
          <Sparkles size={20} className="sm:hidden" />
          <Sparkles size={24} className="hidden sm:block" />
        </div>
        
        <h2 className="text-lg max-[374px]:text-base sm:text-2xl md:text-3xl font-bold text-[#1B1B1F] tracking-tight">
          The Syber <span className="text-[#581845]">Inner Circle</span>
        </h2>
        <p className="text-[#B76E79] mt-2.5 sm:mt-3 text-xs sm:text-sm md:text-base font-medium max-w-sm mx-auto leading-relaxed">
          Get exclusive access to seasonal collections, tailoring tips, and fashion insights.
        </p>

        <form onSubmit={handleSubscribe} className="mt-6 sm:mt-8 flex flex-col md:flex-row gap-2.5 sm:gap-3">
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-[#B76E79]">
              <Mail size={16} className="sm:hidden" />
              <Mail size={18} className="hidden sm:block" />
            </div>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full pl-10 sm:pl-11 pr-4 py-3.5 sm:py-4 bg-[#FAF9F6] border border-transparent rounded-xl sm:rounded-2xl outline-none focus:bg-white focus:border-[#D6AE7B] focus:ring-4 focus:ring-[#D6AE7B]/5 transition-all text-[#1B1B1F] text-xs sm:text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 sm:px-8 py-3.5 sm:py-4 bg-[#581845] hover:bg-[#1B1B1F] text-white font-bold text-xs sm:text-sm rounded-xl sm:rounded-2xl shadow-lg shadow-[#581845]/20 transition-all active:scale-95 disabled:opacity-50 whitespace-nowrap"
          >
            {loading ? "Joining..." : "Join Now"}
          </button>
        </form>

        {/* Status Messages */}
        {status.message && (
          <div className={`mt-5 sm:mt-6 flex items-center justify-center gap-2 text-xs sm:text-sm font-medium animate-in fade-in slide-in-from-top-2 ${
            status.type === "success" ? "text-green-600" : "text-[#B76E79]"
          }`}>
            {status.type === "success" ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
            {status.message}
          </div>
        )}
        
        <p className="mt-5 sm:mt-6 text-[9px] sm:text-[10px] text-[#B76E79]/60 uppercase tracking-widest font-bold">
          No spam. Just pure elegance.
        </p>
      </div>
    </div>
  );
};

export default Newsletter;
// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, User } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Syber-Forum", path: "/forum" },
    { name: "Most Popular", path: "/posts?sort=popular" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="px-6 h-16 md:h-24 flex items-center justify-between fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-[#B76E79]/10">
        {/* LOGO */}
        <Link to="/" className="group transition-transform active:scale-95">
          <div className="flex flex-col leading-tight">
            <span className="text-[#581845] font-black text-2xl tracking-tighter">
              SYBER<span className="text-[#D6AE7B]">.</span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.4em] text-[#B76E79] uppercase">
              Fashion Studio
            </span>
          </div>
        </Link>

        {/* MOBILE TOGGLE */}
        <div className="md:hidden">
          <button
            className="p-2 text-[#581845] hover:bg-[#FAF9F6] rounded-xl transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* MOBILE OVERLAY */}
          <div 
            className={`fixed inset-0 bg-[#1B1B1F]/90 backdrop-blur-2xl flex flex-col items-center justify-center space-y-8 z-[101] transition-all duration-500 ${
              open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
            }`}
          >
            <button
              className="absolute top-8 right-8 text-[#D6AE7B]"
              onClick={() => setOpen(false)}
            >
              <X size={36} />
            </button>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-2xl font-bold text-white hover:text-[#D6AE7B] transition-colors uppercase tracking-widest"
                onClick={() => setOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-10 border-t border-white/10 w-20 flex justify-center text-[#D6AE7B]">
              <Globe size={24} />
            </div>
          </div>
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative text-xs font-bold uppercase tracking-[0.2em] transition-colors py-2 ${
                  isActive(link.path) ? "text-[#581845]" : "text-[#1B1B1F]/60 hover:text-[#581845]"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D6AE7B] rounded-full animate-in fade-in slide-in-from-left-2" />
                )}
              </Link>
            ))}
          </div>

          <div className="h-6 w-[1px] bg-[#B76E79]/20" />

          {/* QUICK ACTIONS */}
          <Link 
            to="/login" 
            className="flex items-center gap-2 bg-[#581845] text-white px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#B76E79] transition-all shadow-lg shadow-[#581845]/20 active:scale-95"
          >
            <User size={14} />
            Studio Access
          </Link>
        </div>
      </nav>

      {/* Spacing for Fixed Nav */}
      <div className="h-16 md:h-24" />
    </>
  );
};

export default Navbar;
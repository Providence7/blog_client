// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Most Popular", path: "/posts?sort=popular" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <nav className="px-3 sm:px-4 md:px-6 h-14 sm:h-16 md:h-24 flex items-center justify-between gap-2 fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-[#B76E79]/10">
        {/* LOGO */}
        <Link to="/" className="group transition-transform active:scale-95 min-w-0 shrink">
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-xl max-[374px]:text-lg sm:text-2xl md:text-3xl font-black tracking-tighter text-[#581845] whitespace-nowrap">
              ATTIRE<span className="text-[#D6AE7B]">.</span>
            </span>
            <span className="block text-[8px] sm:text-[10px] md:text-xs font-medium italic text-[#B76E79] truncate">
              Global Fashion Journal
            </span>
          </div>
        </Link>

        {/* MOBILE: AVATAR/LOGOUT + MENU TOGGLE */}
        <div className="md:hidden flex items-center gap-1.5 xs:gap-2 shrink-0">
          {currentUser && (
            <div className="flex items-center gap-1 xs:gap-1.5 shrink-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.username || "You"}
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover border border-[#D6AE7B]/30 shrink-0"
              />
              <button
                onClick={logout}
                className="p-1 sm:p-1.5 text-[#B76E79] hover:text-red-500 transition-colors shrink-0"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={16} className="sm:hidden" />
                <LogOut size={18} className="hidden sm:block" />
              </button>
            </div>
          )}

          <button
            className="p-1.5 sm:p-2 text-[#581845] hover:bg-[#FAF9F6] rounded-xl transition-colors shrink-0"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={24} className="sm:hidden" /> : <Menu size={24} className="sm:hidden" />}
            {open ? <X size={28} className="hidden sm:block" /> : <Menu size={28} className="hidden sm:block" />}
          </button>
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

          {currentUser && (
            <div className="flex items-center gap-3">
              <img
                src={currentUser.avatar}
                alt={currentUser.username || "You"}
                className="w-8 h-8 rounded-full object-cover border border-[#D6AE7B]/30"
              />
              <span className="text-xs font-bold text-[#1B1B1F]/70 max-w-[100px] truncate">
                {currentUser.username}
              </span>
              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-[#B76E79] hover:text-red-500 text-xs font-bold uppercase tracking-widest transition-colors"
                title="Logout"
              >
                <LogOut size={15} />
              </button>
            </div>
          )}
        </div>
      </nav>

      <div
        className={`md:hidden fixed top-14 sm:top-16 left-0 right-0 z-[99] bg-white border-b border-[#B76E79]/10 overflow-hidden transition-all duration-300 ${
          open ? "max-h-[calc(100vh-3.5rem)] sm:max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col divide-y divide-[#B76E79]/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-4 sm:px-6 py-3.5 sm:py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive(link.path) ? "text-[#581845] bg-[#FAF9F6]" : "text-[#1B1B1F]/70 hover:bg-[#FAF9F6] hover:text-[#581845]"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="px-4 sm:px-6 py-3.5 sm:py-4 flex items-center gap-2 text-[#B76E79]">
            <Globe size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">English</span>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="md:hidden fixed inset-0 top-14 sm:top-16 z-[98] bg-[#1B1B1F]/20"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="h-14 sm:h-16 md:h-24" />
    </>
  );
};

export default Navbar;
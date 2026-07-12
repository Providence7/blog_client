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

  // Lock body scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close the menu on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <nav className="px-6 h-16 md:h-24 flex items-center justify-between fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-[#B76E79]/10">
        {/* LOGO */}
      <Link to="/" className="group transition-transform active:scale-95">
  <div className="flex flex-col leading-tight">
    <span className="text-[#581845] font-black text-xl md:text-2xl tracking-tighter">
      ATTIRE<span className="text-[#D6AE7B]">.</span>
    </span>
    <span className="flex items-center gap-1.5 text-[6px] md:text-[10px] font-medium italic text-[#B76E79]">
      <span className="" />Global Fashion Journal ...
    </span>
  </div>
</Link>

        {/* MOBILE: AVATAR/LOGOUT + MENU TOGGLE */}
        <div className="md:hidden flex items-center gap-3">
          {currentUser && (
            <div className="flex items-center gap-2">
              <img
                src={currentUser.avatar}
                alt={currentUser.username || "You"}
                className="w-8 h-8 rounded-full object-cover border border-[#D6AE7B]/30"
              />
              <button
                onClick={logout}
                className="p-1.5 text-[#B76E79] hover:text-red-500 transition-colors"
                aria-label="Logout"
                title="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}

          <button
            className="p-2 text-[#581845] hover:bg-[#FAF9F6] rounded-xl transition-colors"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
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

          {/* QUICK ACTIONS */}
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

      {/* MOBILE DROPDOWN PANEL - sits in the document flow right under the navbar, no full-screen overlay */}
      <div
        className={`md:hidden fixed top-16 left-0 right-0 z-[99] bg-white border-b border-[#B76E79]/10 overflow-hidden transition-all duration-300 ${
          open ? "max-h-[calc(100vh-4rem)] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col divide-y divide-[#B76E79]/10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                isActive(link.path) ? "text-[#581845] bg-[#FAF9F6]" : "text-[#1B1B1F]/70 hover:bg-[#FAF9F6] hover:text-[#581845]"
              }`}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          <div className="px-6 py-4 flex items-center gap-2 text-[#B76E79]">
            <Globe size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">English</span>
          </div>
        </div>
      </div>

      {/* Backdrop to close menu when tapping outside it - light, not a dark takeover */}
      {open && (
        <div
          className="md:hidden fixed inset-0 top-16 z-[98] bg-[#1B1B1F]/20"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Spacing for Fixed Nav */}
      <div className="h-16 md:h-24" />
    </>
  );
};

export default Navbar;
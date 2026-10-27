// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, LogOut, Home, Flame, Info } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { currentUser, logout } = useAuth();

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "Popular", label: "Most Popular", path: "/posts?sort=popular", icon: Flame },
    { name: "About", path: "/about", icon: Info },
  ];

  const isActive = (path) => {
    const [pathname, search] = path.split("?");
    if (search) return location.pathname === pathname && location.search === `?${search}`;
    return location.pathname === pathname && !location.search.includes("sort=popular");
  };

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  return (
    <>
      <nav className="px-3 sm:px-4 md:px-6 h-14 sm:h-16 md:h-24 flex items-center justify-between gap-2 fixed top-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-md border-b border-[#B76E79]/10">
        {/* LOGO */}
        <Link to="/" className="group transition-transform active:scale-95 min-w-0 shrink">
          <div className="flex flex-col leading-tight min-w-0">
            <span className="text-2xl max-[374px]:text-xl sm:text-3xl md:text-5xl font-black tracking-tighter text-[#581845] whitespace-nowrap">
              ATTIRE<span className="text-[#D6AE7B]">.</span>
            </span>
            <span className="block text-[10px] sm:text-xs md:text-sm font-medium italic text-[#B76E79] truncate">
              Global Fashion Journal
            </span>
          </div>
        </Link>

        {/* MOBILE: AVATAR + MENU TOGGLE */}
        <div className="md:hidden flex items-center gap-2 shrink-0">
          {currentUser && (
            <img
              src={currentUser.avatar}
              alt={currentUser.username || "You"}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover border border-[#D6AE7B]/40 shrink-0"
            />
          )}

          <button
            className="p-2 text-[#581845] bg-[#FAF9F6] active:bg-[#D6AE7B]/20 rounded-xl transition-colors shrink-0"
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
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
                {link.label || link.name}
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

      {/* MOBILE PANEL (attached to navbar, compact) */}
      <div
        id="mobile-nav"
        aria-hidden={!open}
        className={`md:hidden fixed top-14 sm:top-16 left-0 right-0 z-[99] grid transition-[grid-template-rows] duration-300 ease-out ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-white rounded-b-3xl border-b border-[#B76E79]/10 shadow-xl shadow-[#581845]/10 p-3 space-y-3">
            {/* Link tiles */}
            <div className="grid grid-cols-3 gap-2">
              {navLinks.map(({ name, path, icon: Icon }) => {
                const active = isActive(path);
                return (
                  <Link
                    key={name}
                    to={path}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all active:scale-95 ${
                      active
                        ? "bg-[#581845] text-white shadow-md shadow-[#581845]/20"
                        : "bg-[#FAF9F6] text-[#581845]/80 active:bg-[#D6AE7B]/20"
                    }`}
                  >
                    <Icon size={18} className={active ? "text-[#D6AE7B]" : "text-[#B76E79]"} />
                    {name}
                  </Link>
                );
              })}
            </div>

            {/* Footer row */}
            <div className="flex items-center justify-between gap-2 px-1 pt-0.5">
              <div className="flex items-center gap-1.5 text-[#B76E79]">
                <Globe size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">English</span>
              </div>

              {currentUser && (
                <button
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                  tabIndex={open ? 0 : -1}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF9F6] text-[#B76E79] active:text-red-500 text-[10px] font-bold uppercase tracking-widest transition-colors"
                >
                  <LogOut size={13} />
                  Logout
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tap-outside to close */}
      {open && (
        <div
          className="md:hidden fixed inset-0 top-14 sm:top-16 z-[98] bg-[#1B1B1F]/20 backdrop-blur-[2px]"
          onClick={() => setOpen(false)}
        />
      )}

      <div className="h-14 sm:h-16 md:h-24" />
    </>
  );
};

export default Navbar;
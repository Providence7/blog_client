import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";
import Image from "../components/Image";
// import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="w-full h-14 md:h-20 flex mt-3 items-center justify-between shadow-sm">
      {/* LOGO */}
      <Link to={"/"}>
        <div>
          <span className="italic text-[#c4458f] font-bold text-xl">
            <span className="font-bold text-3xl"> S</span>yber
          </span>
          <span className="text-[#46249c] font-bold text-2xl ">
            <span className="font-bold text-3xl">T</span>ailor
          </span>
        </div>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden">
        <button className="md:hidden text-[#0d1321]" onClick={() => setOpen(!open)}>
          {open ? <X size={32} /> : <Menu size={32} />}
        </button>

        {open && (
          <div className="fixed inset-0 bg-[#cac7c7] flex flex-col items-center justify-center space-y-6 text-lg font-medium md:hidden z-50">
            <button className="absolute top-6 right-6 text-[#0d1321]" onClick={() => setOpen(false)}>
              <X size={32} />
            </button>
            <Link to="/" onClick={() => setOpen(false)}>Home</Link>
            <Link to="/posts?sort=trending" onClick={() => setOpen(false)}>Trending</Link>
            <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>Most Popular</Link>
            <Link to="/about" onClick={() => setOpen(false)}>About</Link>
           
          </div>
        )}
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/posts?sort=popular">Most Popular</Link>
        <Link to="/about">About</Link>

       
      </div>
    </div>
  );
};

export default Navbar;

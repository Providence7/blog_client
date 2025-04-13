import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Fixed Navbar */}
      <div className="px-6 h-14 md:h-20 flex items-center justify-between shadow-lg fixed top-0 left-0 right-0 z-50 bg-white">
        {/* LOGO */}
        <Link to={"/"}>
          <div>
            <span className="italic text-[#c4458f] font-bold text-xl">
              <span className="font-bold text-3xl"> S</span>yber
            </span>
            <span className="text-[#46249c] font-bold text-2xl ">
              <span className="font-bold text-3xl">F</span>ashion
            </span>
          </div>
        </Link>

        {/* MOBILE MENU */}
        <div className="md:hidden">
          <button
            className="text-[#0d1321]"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={32} /> : <Menu size={32} />}
          </button>

          {open && (
            <div className="fixed inset-0 bg-[#cac7c7] flex flex-col items-center justify-center space-y-6 text-lg font-medium z-50">
              <button
                className="absolute top-6 right-6 text-[#0d1321]"
                onClick={() => setOpen(false)}
              >
                <X size={32} />
              </button>
              <Link to="/" onClick={() => setOpen(false)}>Home</Link>
              <Link to="/forum" onClick={() => setOpen(false)}>Syber-Forum</Link>
              <Link to="/posts?sort=popular" onClick={() => setOpen(false)}>Most Popular</Link>
              <Link to="/about" onClick={() => setOpen(false)}>About</Link>
            </div>
          )}
        </div>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
          <Link to="/">Home</Link>
          <Link to="/forum">Syber-Forum</Link>
          <Link to="/posts?sort=popular">Most Popular</Link>
          <Link to="/about">About</Link>
        </div>
      </div>

      {/* Spacing for Content Below Navbar */}
      <div className="pt-20">
        {/* Your content goes here */}
      </div>
    </>
  );
};

export default Navbar;

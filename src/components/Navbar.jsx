import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import axios from "axios";
import Image from "../components/Image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`, {
        withCredentials: true, // ✅ Sends cookies
      });
  
      console.log("User profile:", res.data);
    } catch (error) {
      if (error.response?.status === 403) {
        console.log("User is not logged in. Skipping profile fetch.");
        return;
      }
      console.error("Error fetching user:", error);
    }
  };
  
  useEffect(() => {
    fetchProfile();
  }, []);
  

  const handleLogout = async () => {
    await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      withCredentials: true,
    });
    setUser(null);
    setDropdownOpen(false);
  };

  return (
    <div className="w-full h-14 md:h-20 flex mt-3 items-center justify-between shadow-sm">
      {/* LOGO */}
      <Link to={"/"}>
        <div>
          <span className="italic text-[#c4458f] font-bold text-xl">
            <span className="font-bold text-3xl"> F</span>ashion
          </span>
          <span className="text-[#46249c] font-bold text-2xl ">
            <span className="font-bold text-3xl">E</span>ra
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

            {user ? (
              <button onClick={handleLogout} className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                Logout
              </button>
            ) : (
              <Link to="/login" onClick={() => setOpen(false)}>
                <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
                  Login 👋
                </button>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/posts?sort=trending">Trending</Link>
        <Link to="/posts?sort=popular">Most Popular</Link>
        <Link to="/about">About</Link>

        {/* Profile Section */}
        {user ? (
          <div className="flex items-center gap-4 relative">
            {/* Profile Image */}
            <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer">
              <Image src={user.profilePic || "blog4.jfif"} className="w-12 h-12 rounded-full object-cover" />
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <span className="block py-2 px-4 text-gray-700">{user.username}</span>
                <button onClick={handleLogout} className="block py-2 px-4 text-gray-700 hover:bg-gray-100">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;

import React, { useState } from 'react'
import { IKImage } from 'imagekitio-react';
import { Link } from 'react-router-dom';
import { Menu, X } from "lucide-react";
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
const Navbar = () => {
    const [open , setOpen] = useState(false)
  return (

    <div className='w-full h-14 md:h-20 flex items-center justify-between'>
        {/*LOGO*/}
        <Link to={"/"} >
        <div className=''>
          <span
            className='italic text-[#c4458f] font-bold  text-xl'
          >
            <span className='font-bold text-3xl'> F</span>ashion
          </span>
          <span className='text-[#0d1321] font-bold text-2xl '>
            <span className='font-bold text-3xl' >E</span>ra
          </span>
          </div>
        </Link>
            {/* MOBILE MENU */}
            <div className="md:hidden">
        {/* MOBILE BUTTON */}
       
        {/* MOBILE LINK LIST */}
        <button className="md:hidden text-[#0d1321]" onClick={() => setOpen(!open)}>
        {open ? <X size={32} /> : <Menu size={32} />}
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="fixed inset-0 bg-[#cac7c7] flex flex-col items-center justify-center space-y-6 text-lg font-medium md:hidden z-50">
          <button className="absolute top-6 right-6 text-[#0d1321]" onClick={() => setOpen(false)}>
            <X size={32} />
          </button>
          <Link to="/" onClick={()=>setOpen(false)}>Home</Link>
          <Link to="/posts?sort=trending" onClick={()=>setOpen(false)}>Trending</Link>
          <Link to="/posts?sort=popular" onClick={()=>setOpen(false)}>Most Popular</Link>
          <Link to="/" onClick={()=>setOpen(false)}>About</Link>
          {/* <Link to="/login" onClick={()=>setOpen(false)}>
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link> */}
        </div>
      )}
      </div>
      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/">Home</Link>
        <Link to="/posts?sort=trending">Trending</Link>
        <Link to="/posts?sort=popular">Most Popular</Link>
        <Link to="/">About</Link>
        {/* <SignedOut>
          <Link to="/login">
            <button className="py-2 px-4 rounded-3xl bg-blue-800 text-white">
              Login 👋
            </button>
          </Link>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn> */}
      </div>

    </div>
  )
}

export default Navbar
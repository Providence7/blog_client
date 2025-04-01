import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter} from 'lucide-react'; // Import social media icons from Lucide

const Footer = () => {
  return (
    <footer className=" text-black border-black border-y-2 py-8 px-4 mt-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Company Info */}
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h2 className="text-2xl font-semibold mb-4">
            <span className="font-bold text-3xl text-[#c4458f]">S</span>yber
            <span className="text-[#c4458f] font-bold text-2xl">Fashion</span>
          </h2>
          <p className="text-lg">SyberFashion | Empowering Fashion</p>
          <p className="mt-2">Email: sybertailor@gmil.com.com</p>
          <p>Contact Address: 127.0.0.1</p>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center gap-6 mt-6 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <Facebook size={24} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <Instagram size={24} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <Twitter size={24} />
          </a>
        
        </div>

        {/* Links to policies and important info */}
        <div className="flex flex-col md:flex-row gap-6 mt-8 md:mt-0 text-sm">
          <Link to="/privacy-policy" className="hover:text-[#c4458f]">Privacy Policy</Link>
          <Link to="/terms-of-service" className="hover:text-[#c4458f]">Terms of Service</Link>
          <Link to="/contact-us" className="hover:text-[#c4458f]">Contact Us</Link>
        </div>
      </div>

      {/* Copyright and Legal Notice */}
      <div className="mt-8 text-center text-sm">
        <p>&copy; {new Date().getFullYear()} SyberFashion | All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B1B1F] text-white pt-20 pb-10 px-6 mt-20 rounded-t-[3rem] md:rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        
        {/* BRAND IDENTITY */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <Link to="/" className="group">
            <div className="flex flex-col leading-tight">
              <span className="text-white font-black text-3xl tracking-tighter group-hover:text-[#D6AE7B] transition-colors">
                SYBER<span className="text-[#B76E79]">.</span>
              </span>
              <span className="text-[10px] font-bold tracking-[0.4em] text-[#B76E79] uppercase">
                Fashion Studio
              </span>
            </div>
          </Link>
          <p className="text-sm text-white/50 italic max-w-[280px] text-center md:text-left leading-relaxed">
            "Empowering the intersection of digital innovation and high-fashion tailoring."
          </p>
          <div className="flex gap-5">
            {[
              { Icon: Facebook, url: "https://facebook.com" },
              { Icon: Instagram, url: "https://instagram.com" },
              { Icon: Twitter, url: "https://twitter.com" }
            ].map(({ Icon, url }, idx) => (
              <a 
                key={idx}
                href={url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-2xl text-[#D6AE7B] hover:bg-[#D6AE7B] hover:text-[#1B1B1F] transition-all duration-300"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT & ATELIER INFO */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B76E79]">Studio Details</h3>
          <div className="space-y-4 text-sm font-medium">
            <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-default">
              <Mail size={16} className="text-[#D6AE7B]" />
              <span>sybertailor@gmail.com</span>
            </div>
            <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-default">
              <MapPin size={16} className="text-[#D6AE7B]" />
              <span>Digital Archive 127.0.0.1</span>
            </div>
            <div className="flex items-center gap-3 text-white/70 hover:text-white transition-colors cursor-default">
              <Globe size={16} className="text-[#D6AE7B]" />
              <span>Global Presence</span>
            </div>
          </div>
        </div>

        {/* QUICK NAVIGATION */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B76E79]">Legal & Access</h3>
          <nav className="flex flex-col items-center md:items-start gap-3">
            <Link to="/privacy-policy" className="text-sm font-bold text-white/40 hover:text-[#D6AE7B] transition-colors uppercase tracking-widest">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-sm font-bold text-white/40 hover:text-[#D6AE7B] transition-colors uppercase tracking-widest">Terms of Service</Link>
            <Link to="/contact-us" className="text-sm font-bold text-white/40 hover:text-[#D6AE7B] transition-colors uppercase tracking-widest">Contact Us</Link>
          </nav>
        </div>
      </div>

      {/* COPYRIGHT SECTION */}
      <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/20">
        <p>&copy; {currentYear} SyberFashion Studio</p>
        <p className="flex items-center gap-2">
          Made for <span className="text-[#B76E79]">High-Resolution</span> Lifestyles
        </p>
      </div>
    </footer>
  );
};

export default Footer;
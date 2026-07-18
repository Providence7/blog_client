// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, MapPin, Globe } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1B1B1F] text-white pt-14 sm:pt-20 pb-8 sm:pb-10 px-5 sm:px-6 mt-14 sm:mt-20 rounded-t-[2rem] sm:rounded-t-[3rem] md:rounded-t-[5rem]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 md:gap-8">
        
        {/* BRAND IDENTITY */}
        <div className="flex flex-col items-center md:items-start space-y-4 sm:space-y-6">
          <Link to="/" className="group">
            <div className="flex flex-col leading-tight">
              <span className="text-white font-black text-xl sm:text-2xl md:text-3xl tracking-tighter group-hover:text-[#D6AE7B] transition-colors">
                ATTIRE<span className="text-[#B76E79]">.</span>
              </span>
              <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.3em] sm:tracking-[0.4em] text-[#B76E79] uppercase">
                Fashion Studio
              </span>
            </div>
          </Link>
          <p className="text-xs sm:text-sm text-white/50 italic max-w-[280px] text-center md:text-left leading-relaxed">
            "Empowering the intersection of digital innovation and high-fashion tailoring."
          </p>
          <div className="flex gap-3.5 sm:gap-5">
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
                className="p-2.5 sm:p-3 bg-white/5 rounded-xl sm:rounded-2xl text-[#D6AE7B] hover:bg-[#D6AE7B] hover:text-[#1B1B1F] transition-all duration-300"
              >
                <Icon size={17} className="sm:hidden" />
                <Icon size={20} className="hidden sm:block" />
              </a>
            ))}
          </div>
        </div>

        {/* CONTACT & ATELIER INFO */}
        <div className="flex flex-col items-center md:items-start space-y-4 sm:space-y-6">
          <h3 className="text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.25em] sm:tracking-[0.3em] text-[#B76E79]">Studio Details</h3>
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm font-medium">
            <div className="flex items-center gap-2.5 sm:gap-3 text-white/70 hover:text-white transition-colors cursor-default">
              <Mail size={15} className="text-[#D6AE7B] sm:hidden" />
              <Mail size={16} className="text-[#D6AE7B] hidden sm:block" />
              <span>sybertailor@gmail.com</span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3 text-white/70 hover:text-white transition-colors cursor-default">
              <MapPin size={15} className="text-[#D6AE7B] sm:hidden" />
              <MapPin size={16} className="text-[#D6AE7B] hidden sm:block" />
              <span>Digital Archive </span>
            </div>
            <div className="flex items-center gap-2.5 sm:gap-3 text-white/70 hover:text-white transition-colors cursor-default">
              <Globe size={15} className="text-[#D6AE7B] sm:hidden" />
              <Globe size={16} className="text-[#D6AE7B] hidden sm:block" />
              <span>Global Presence</span>
            </div>
          </div>
        </div>

      </div>

      {/* COPYRIGHT SECTION */}
      <div className="mt-14 sm:mt-20 pt-6 sm:pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-[9px] sm:text-[10px] font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/20 text-center">
        <p>&copy; {currentYear} Attirebyte Studio</p>
        <p className="flex items-center gap-2">
          Made for <span className="text-[#B76E79]">High-Resolution</span> Lifestyles
        </p>
      </div>
    </footer>
  );
};

export default Footer;
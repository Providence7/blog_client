// src/components/PostListItem.jsx
import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import { ArrowRight, Calendar, Tag } from "lucide-react";

const PostListItem = ({ post }) => {
  return (
    <div className="group flex flex-col xl:flex-row gap-10 p-4 md:p-6 rounded-[2.5rem] bg-white hover:bg-[#FAF9F6] border border-[#B76E79]/5 hover:border-[#D6AE7B]/20 transition-all duration-500 shadow-xl shadow-[#581845]/5">
      
      {/* Visual Asset Container */}
      {post.img && (
        <div className="xl:w-2/5 overflow-hidden rounded-[2rem] relative aspect-[4/3] md:aspect-video xl:aspect-square">
          <Image 
            src={post.img} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            h="600" 
            w="800" 
          />
          {/* Subtle Overlay on Hover */}
          <div className="absolute inset-0 bg-[#581845]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </div>
      )}

      {/* Content Details */}
      <div className="flex flex-col justify-center gap-5 xl:w-3/5 py-2">
        
        {/* Category & Time Attribution */}
        <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em]">
          <span className="bg-[#581845] text-white px-3 py-1 rounded-full flex items-center gap-1">
            <Tag size={10} /> {post.category || "General"}
          </span>
          <span className="text-[#B76E79]/40">•</span>
          <span className="text-[#B76E79] flex items-center gap-1">
            <Calendar size={12} /> {format(post.createdAt)}
          </span>
        </div>

        {/* Headline */}
        <Link 
          to={`/${post.slug}`} 
          className="text-2xl md:text-4xl font-bold text-[#1B1B1F] leading-tight hover:text-[#581845] transition-colors line-clamp-2"
        >
          {post.title}
        </Link>

        {/* Abstract */}
        <p className="text-[#581845]/70 text-sm md:text-base leading-relaxed line-clamp-3 italic">
          {post.desc}
        </p>

        {/* Footer Attribution & Action */}
        <div className="flex items-center justify-between mt-2 pt-5 border-t border-[#B76E79]/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#D6AE7B] flex items-center justify-center text-white text-[10px] font-bold">
              ST
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-[#B76E79] uppercase tracking-widest font-bold">Curated By</span>
              <span className="text-xs font-bold text-[#1B1B1F]">SyberTailor</span>
            </div>
          </div>

          <Link 
            to={`/${post.slug}`} 
            className="flex items-center gap-2 text-[#581845] font-black text-xs uppercase tracking-widest group/link"
          >
            Explore 
            <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
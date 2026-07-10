// src/components/PostListItem.jsx
import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import { ArrowRight, Calendar, Tag } from "lucide-react";

const PostListItem = ({ post }) => {
  return (
    <div className="group flex flex-row gap-4 sm:gap-6 md:gap-10 p-3 sm:p-4 md:p-6 rounded-2xl md:rounded-[2.5rem] bg-white hover:bg-[#FAF9F6] border border-[#B76E79]/5 hover:border-[#D6AE7B]/20 transition-all duration-500 shadow-xl shadow-[#581845]/5">

      {/* Visual Asset Container */}
      {post.img && (
        <Link
          to={`/${post.slug}`}
          className="w-28 sm:w-40 md:w-1/3 xl:w-2/5 shrink-0 overflow-hidden rounded-xl md:rounded-[2rem] relative aspect-square md:aspect-[4/3] xl:aspect-square"
        >
          <Image
            src={post.img}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            h="600"
            w="800"
          />
          <div className="absolute inset-0 bg-[#581845]/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        </Link>
      )}

      {/* Content Details */}
      <div className="flex flex-col justify-center gap-2 sm:gap-3 md:gap-5 flex-1 min-w-0 py-1 md:py-2">

        {/* Category & Time Attribution */}
        <div className="flex flex-wrap items-center gap-2 md:gap-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.15em] md:tracking-[0.2em]">
          <span className="bg-[#581845] text-white px-2 md:px-3 py-0.5 md:py-1 rounded-full flex items-center gap-1">
            <Tag size={10} /> {post.category || "General"}
          </span>
          <span className="hidden sm:inline text-[#B76E79]/40">•</span>
          <span className="hidden sm:flex text-[#B76E79] items-center gap-1">
            <Calendar size={12} /> {format(post.createdAt)}
          </span>
        </div>

        {/* Headline */}
        <Link
          to={`/${post.slug}`}
          className="text-base sm:text-xl md:text-3xl xl:text-4xl font-bold text-[#1B1B1F] leading-tight hover:text-[#581845] transition-colors line-clamp-2"
        >
          {post.title}
        </Link>

        {/* Abstract - hidden on the smallest screens to keep the row compact */}
        <p className="hidden sm:block text-[#581845]/70 text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 italic">
          {post.desc}
        </p>

        {/* Footer Attribution & Action */}
        <div className="flex items-center justify-between mt-1 md:mt-2 pt-3 md:pt-5 border-t border-[#B76E79]/10">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#D6AE7B] flex items-center justify-center text-white text-[9px] md:text-[10px] font-bold shrink-0">
              ST
            </div>
            <div className="hidden sm:flex flex-col">
              <span className="text-[10px] text-[#B76E79] uppercase tracking-widest font-bold">Curated By</span>
              <span className="text-xs font-bold text-[#1B1B1F]">SyberTailor</span>
            </div>
          </div>

          <Link
            to={`/${post.slug}`}
            className="flex items-center gap-1 md:gap-2 text-[#581845] font-black text-[10px] md:text-xs uppercase tracking-widest group/link shrink-0"
          >
            <span className="hidden sm:inline">Explore</span>
            <ArrowRight size={16} className="transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostListItem;
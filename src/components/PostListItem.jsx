// src/components/PostListItem.jsx
import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";
import { Calendar, Tag } from "lucide-react";

const PostListItem = ({ post }) => {
  return (
    <div className="group flex flex-row gap-3 sm:gap-5 md:gap-6 py-3 sm:py-4 md:py-5 border-b border-[#B76E79]/10 last:border-b-0">

      {/* Thumbnail */}
      {post.img && (
        <Link
          to={`/${post.slug}`}
          className="w-20 sm:w-32 md:w-48 shrink-0 overflow-hidden rounded-md relative aspect-square md:aspect-[4/3]"
        >
          <Image
            src={post.img}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            h="600"
            w="800"
          />
        </Link>
      )}

      {/* Content */}
      <div className="flex flex-col justify-center gap-1 sm:gap-2 flex-1 min-w-0">

        {/* Category & date */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-[0.12em]">
          <span className="flex items-center gap-1 text-[#581845]">
            <Tag size={10} /> {post.category || "General"}
          </span>
          <span className="text-[#B76E79]/40">·</span>
          <span className="flex items-center gap-1 text-[#B76E79]">
            <Calendar size={10} /> {format(post.createdAt)}
          </span>
        </div>

        {/* Headline */}
        <Link
          to={`/${post.slug}`}
          className="text-base sm:text-xs md:text-sm text-[#1B1B1F] leading-snug hover:text-[#581845] transition-colors line-clamp-2"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {post.title}
        </Link>

        {/* Abstract — hidden on the smallest screens to stay minimal */}
        <p className="hidden sm:block text-[#581845]/70 text-xs md:text-sm leading-relaxed line-clamp-2">
          {post.desc}
        </p>
      </div>
    </div>
  );
};

export default PostListItem;
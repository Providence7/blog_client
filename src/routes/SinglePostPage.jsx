// src/pages/SinglePostPage.jsx
import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import Search from "../components/Search";
import Comments from "../components/CommentSection";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Twitter, Facebook, Instagram, Calendar, User } from "lucide-react";

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return (
    <div className="flex justify-center items-center h-screen text-[#581845] font-bold">
      Loading Story...
    </div>
  );
  
  if (error) return <div className="p-10 text-red-500">Error: {error.message}</div>;
  if (!data) return <div className="p-10 text-center">Post not found!</div>;

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* 1. HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 pt-10 md:pt-16 flex flex-col lg:flex-row gap-10">
        <div className="lg:w-3/5 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-[#D6AE7B]/20 text-[#581845] text-[10px] uppercase tracking-[0.2em] font-bold px-3 py-1 rounded-full">
              {data.category || "Editorial"}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#1B1B1F] leading-tight mb-6">
            {data.title}
          </h1>
          <div className="flex items-center gap-6 text-[#B76E79] text-sm">
            <div className="flex items-center gap-2">
              <User size={16} />
              <span className="font-semibold">CyberTailor</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              <span>{format(data.createdAt)}</span>
            </div>
          </div>
        </div>

        {data.img && (
          <div className="lg:w-2/5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <Image src={data.img} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        )}
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
        
        {/* Article Body */}
        <div className="lg:w-2/3">
          <div 
            className="prose prose-lg max-w-none text-[#1B1B1F] 
              prose-headings:text-[#581845] prose-headings:font-bold
              prose-a:text-[#D6AE7B] prose-strong:text-[#581845]
              prose-img:rounded-3xl prose-img:shadow-lg
              leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
          
          <div className="mt-16 border-t border-[#B76E79]/20 pt-10">
            <Comments slug={data.slug} />
          </div>
        </div>

        {/* Sidebar / Author Box */}
        <div className="lg:w-1/3">
          <div className="sticky top-24 space-y-8">
            
            {/* Author Profile Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#FAF9F6] relative overflow-hidden">
               <div className="absolute top-0 left-0 w-2 h-full bg-[#581845]" />
               <h3 className="text-[#581845] text-xs font-bold uppercase tracking-widest mb-6">About the Author</h3>
               <div className="flex items-center gap-4 mb-4">
                  <Image
                    src="blog4.jfif"
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D6AE7B]/20"
                  />
                  <div>
                    <h4 className="font-bold text-[#1B1B1F]">Ease</h4>
                    <p className="text-[10px] text-[#B76E79] font-medium uppercase">Master Tailor & Tech Lead</p>
                  </div>
               </div>
               <p className="text-sm text-[#1B1B1F]/70 leading-relaxed mb-6">
                Fashion enthusiast, writer, and web developer. Melding the world of bespoke tailoring with modern digital innovation.
               </p>
               
               {/* Social Icons */}
               <div className="flex gap-3 pt-4 border-t border-gray-50">
                  <a href="#" className="p-2 rounded-xl bg-[#FAF9F6] text-[#581845] hover:bg-[#581845] hover:text-white transition-all">
                    <Twitter size={18} />
                  </a>
                  <a href="#" className="p-2 rounded-xl bg-[#FAF9F6] text-[#581845] hover:bg-[#581845] hover:text-white transition-all">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="p-2 rounded-xl bg-[#FAF9F6] text-[#581845] hover:bg-[#581845] hover:text-white transition-all">
                    <Instagram size={18} />
                  </a>
               </div>
            </div>

            {/* Sidebar Search Section */}
            <div className="bg-[#581845] p-8 rounded-3xl shadow-xl text-white">
               <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#D6AE7B]">Discovery</h3>
               <p className="text-sm opacity-70 mb-6 font-light">Looking for something specific in the world of fashion?</p>
               <Search />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePostPage;
// src/pages/SinglePostPage.jsx
import { Link, useNavigate, useParams } from "react-router-dom";
import Image from "../components/Image";
import Search from "../components/Search";
import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Twitter, Facebook, Instagram, Calendar, Clock, ChevronLeft } from "lucide-react";

const AUTHOR = {
  name: "Ease",
  role: "Master Tailor & Tech Lead",
  avatar: "blog4.jfif",
  bio: "Fashion enthusiast, writer, and web developer. Melding the world of bespoke tailoring with modern digital innovation.",
};

const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  const readingTime = useMemo(() => {
    if (!data?.content) return null;
    const plainText = data.content.replace(/<[^>]+>/g, " ").trim();
    const words = plainText ? plainText.split(/\s+/).length : 0;
    return Math.max(1, Math.ceil(words / 200));
  }, [data?.content]);

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-screen bg-[#FAF9F6]">
        <div className="w-8 h-8 border-2 border-[#581845] border-t-transparent rounded-full animate-spin" />
        <span className="text-[#581845] font-bold text-sm tracking-wide">Loading story...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-screen bg-[#FAF9F6] px-4 text-center">
        <p className="text-red-500 font-semibold">Something went wrong loading this story.</p>
        <p className="text-[#1B1B1F]/50 text-sm">{error.message}</p>
        <Link to="/" className="mt-2 text-[#581845] text-sm font-bold underline underline-offset-4">
          Back to stories
        </Link>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 h-screen bg-[#FAF9F6] px-4 text-center">
        <p className="text-[#1B1B1F] font-semibold">This story doesn't exist, or has been moved.</p>
        <Link to="/" className="mt-2 text-[#581845] text-sm font-bold underline underline-offset-4">
          Back to stories
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* BACK NAV */}
      <div className="max-w-3xl mx-auto px-4 md:px-6 pt-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1.5 text-[#B76E79] hover:text-[#581845] text-xs font-bold uppercase tracking-widest transition-colors"
        >
          <ChevronLeft size={16} />
          Back to Stories
        </button>
      </div>

      {/* ARTICLE HEADER */}
      <header className="max-w-3xl mx-auto px-4 md:px-6 pt-8 pb-10 text-center">
        <span className="inline-block bg-[#D6AE7B]/15 text-[#581845] text-[10px] uppercase tracking-[0.2em] font-bold px-4 py-1.5 rounded-full mb-6">
          {data.category || "Editorial"}
        </span>

        <h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1B1B1F] leading-[1.15] mb-6"
          style={{ fontFamily: "Georgia, serif" }}
        >
          {data.title}
        </h1>

        {data.desc && (
          <p className="text-base md:text-lg text-[#1B1B1F]/60 leading-relaxed max-w-xl mx-auto mb-8 italic">
            {data.desc}
          </p>
        )}

        <div className="flex items-center justify-center gap-5 text-[#B76E79] text-sm">
          <div className="flex items-center gap-2">
            <Image src={AUTHOR.avatar} className="w-7 h-7 rounded-full object-cover" />
            <span className="font-semibold text-[#1B1B1F]">{AUTHOR.name}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-[#B76E79]/40" />
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <time title={new Date(data.createdAt).toLocaleDateString()}>{format(data.createdAt)}</time>
          </div>
          {readingTime && (
            <>
              <span className="w-1 h-1 rounded-full bg-[#B76E79]/40 hidden sm:block" />
              <div className="hidden sm:flex items-center gap-1.5">
                <Clock size={14} />
                <span>{readingTime} min read</span>
              </div>
            </>
          )}
        </div>
      </header>

      {/* COVER IMAGE */}
      {data.img && (
        <div className="max-w-5xl mx-auto px-4 md:px-6 mb-16">
          <div className="rounded-[2rem] overflow-hidden shadow-xl border-4 border-white">
            <Image
              src={data.img}
              className="w-full max-h-[520px] object-cover"
            />
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pb-24 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-16">
        {/* Article Body */}
        <article className="min-w-0">
          <div
            className="article-body prose prose-lg max-w-none text-[#1B1B1F]
              prose-headings:text-[#581845] prose-headings:font-bold
              prose-a:text-[#581845] prose-a:underline prose-a:underline-offset-4 hover:prose-a:text-[#B76E79]
              prose-strong:text-[#581845]
              prose-blockquote:border-l-[#D6AE7B] prose-blockquote:text-[#1B1B1F]/70 prose-blockquote:not-italic
              prose-img:rounded-3xl prose-img:shadow-lg
              leading-[1.9]"
            style={{ fontFamily: "Georgia, serif" }}
            dangerouslySetInnerHTML={{ __html: data.content }}
          />

          {/* Tags / Share footer */}
          <div className="mt-16 pt-8 border-t border-[#B76E79]/15 flex flex-wrap items-center justify-between gap-6">
            <span className="bg-white border border-[#B76E79]/15 text-[#581845] text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              {data.category || "Editorial"}
            </span>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest mr-1">Share</span>
              <a href="#" className="p-2.5 rounded-full bg-white border border-[#B76E79]/15 text-[#581845] hover:bg-[#581845] hover:text-white hover:border-[#581845] transition-all">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white border border-[#B76E79]/15 text-[#581845] hover:bg-[#581845] hover:text-white hover:border-[#581845] transition-all">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2.5 rounded-full bg-white border border-[#B76E79]/15 text-[#581845] hover:bg-[#581845] hover:text-white hover:border-[#581845] transition-all">
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Closing CTA — an ending, not a dead end */}
          <div className="mt-12 bg-white rounded-3xl border border-[#B76E79]/10 p-8 text-center">
            <p className="text-[#1B1B1F]/70 text-sm mb-4">Enjoyed this story?</p>
            <Link
              to="/"
              className="inline-block bg-[#581845] text-white text-sm font-bold px-6 py-3 rounded-full hover:bg-[#1B1B1F] transition-all"
            >
              Explore More Stories
            </Link>
          </div>
        </article>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start space-y-8">
          {/* Author Profile Card */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-[#B76E79]/10 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#581845]" />
            <h3 className="text-[#581845] text-xs font-bold uppercase tracking-widest mb-6">About the Author</h3>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src={AUTHOR.avatar}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D6AE7B]/20"
              />
              <div>
                <h4 className="font-bold text-[#1B1B1F]">{AUTHOR.name}</h4>
                <p className="text-[10px] text-[#B76E79] font-medium uppercase tracking-wide">{AUTHOR.role}</p>
              </div>
            </div>
            <p className="text-sm text-[#1B1B1F]/70 leading-relaxed">{AUTHOR.bio}</p>
          </div>

          {/* Sidebar Search Section */}
          <div className="bg-[#581845] p-8 rounded-3xl shadow-xl text-white">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-[#D6AE7B]">Discovery</h3>
            <p className="text-sm opacity-70 mb-6 font-light leading-relaxed">
              Looking for something specific in the world of fashion?
            </p>
            <Search />
          </div>
        </aside>
      </div>

      {/* Editorial polish: a drop cap on the opening paragraph, comfortable reading rhythm */}
      <style>{`
        .article-body {
          text-align: left;
        }
        .article-body > p:first-of-type::first-letter {
          float: left;
          font-family: Georgia, serif;
          font-weight: 700;
          font-size: 4.2em;
          line-height: 0.82;
          padding-right: 0.09em;
          padding-top: 0.04em;
          color: #581845;
        }
        .article-body p {
          margin-bottom: 1.6em;
        }
        @media (max-width: 640px) {
          .article-body > p:first-of-type::first-letter {
            font-size: 3.2em;
          }
        }
      `}</style>
    </div>
  );
};

export default SinglePostPage;
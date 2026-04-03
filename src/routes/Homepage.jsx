// src/pages/Homepage.jsx
import { Link } from "react-router-dom";
import MainCategories from "../components/MainCatergories";
import PostList from "../components/PostList";
import Search from "../components/Search";
import { LayoutGrid, Flame, Clock } from "lucide-react";

const Homepage = () => {
  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      {/* 1. TOP NAVIGATION / BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <nav className="flex items-center gap-3 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-8">
          <Link to="/" className="text-[#1B1B1F] hover:text-[#581845] transition-colors">
            Home
          </Link>
          <span className="text-[#D6AE7B]">•</span>
          <Link to="/forum" className="text-[#581845] border-b-2 border-[#581845]">
            Syber Forum
          </Link>
          <span className="hidden md:inline text-[#D6AE7B]">•</span>
          <span className="hidden md:inline text-[#B76E79] opacity-60">Latest Discussions</span>
        </nav>

        {/* 2. FUNCTIONAL SECTION (Categories & Search) */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#B76E79]/10 pb-8">
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-2 mb-4 text-[#581845]">
                <LayoutGrid size={16} />
                <span className="text-xs font-bold uppercase tracking-tighter">Explore Topics</span>
              </div>
              <MainCategories />
            </div>
            
            <div className="w-full lg:w-80">
              <div className="bg-white rounded-2xl shadow-sm p-1 border border-[#B76E79]/5">
                <Search />
              </div>
            </div>
          </div>

          {/* 3. FEED HEADER */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#581845] rounded-xl flex items-center justify-center text-white shadow-lg shadow-[#581845]/20">
                <Flame size={20} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1B1B1F]">The Syber Feed</h1>
                <p className="text-xs text-[#B76E79] font-medium uppercase tracking-wide">Updated just now</p>
              </div>
            </div>

            {/* Quick Filter Tags (Desktop Only) */}
            <div className="hidden md:flex items-center gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full text-xs font-bold text-[#581845] border border-[#581845]/10 shadow-sm transition-all hover:bg-[#581845] hover:text-white">
                <Clock size={14} /> Newest
              </button>
              <Link to="/write" className="px-6 py-2 bg-[#D6AE7B] text-[#1B1B1F] rounded-full text-xs font-bold shadow-md hover:bg-[#1B1B1F] hover:text-white transition-all">
                Create Post
              </Link>
            </div>
          </div>

          {/* 4. THE POST LIST */}
          <div className="mt-6 md:mt-10">
            {/* Boxed on Mobile, Clean on Desktop */}
            <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-[2rem] md:rounded-none shadow-sm md:shadow-none border border-[#B76E79]/5 md:border-none">
               <PostList />
            </div>
          </div>

          {/* 5. MOBILE BOTTOM NAV (Floating 'Write' Button) */}
          <div className="md:hidden fixed bottom-6 right-6 z-50">
            <Link 
              to="/write" 
              className="w-14 h-14 bg-[#581845] text-white flex items-center justify-center rounded-2xl shadow-2xl active:scale-90 transition-transform"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
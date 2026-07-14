// src/pages/PostListPage.jsx
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import PostList from "../components/PostList";
import SideMenu from "../components/SideMenu";
import { Filter, X, Search as SearchIcon } from "lucide-react";

const PostListPage = () => {
  const [open, setOpen] = useState(false);
  const [searchParams] = useSearchParams();

  const category = searchParams.get("cat");
  const search = searchParams.get("search");

  const heading = search
    ? `Results for "${search}"`
    : category
    ? `${category.charAt(0).toUpperCase()}${category.slice(1)} Stories`
    : "Latest Stories";

  return (
    <div className="bg-[#FAF9F6] min-h-screen px-3 py-4 md:px-4 md:py-12">
      <div className="max-w-7xl mx-auto">
        {/* Mobile Header & Toggle */}
        <div className="flex items-center justify-between gap-4 mb-4 md:mb-8 md:hidden">
          <h1 className="text-xl font-bold text-[#1B1B1F] truncate" style={{ fontFamily: "Georgia, serif" }}>
            {heading}
          </h1>
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="shrink-0 flex items-center gap-2 bg-[#581845] text-white px-4 py-2 rounded-full text-sm font-bold active:scale-95 transition-all"
          >
            {open ? (
              <>
                <X size={16} /> Close
              </>
            ) : (
              <>
                <Filter size={16} /> Filters
              </>
            )}
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:block mb-12">
          {search && (
            <div className="flex items-center gap-2 text-[#B76E79] text-xs font-bold uppercase tracking-widest mb-2">
              <SearchIcon size={13} /> Search
            </div>
          )}
          <h1 className="text-4xl font-bold text-[#1B1B1F]" style={{ fontFamily: "Georgia, serif" }}>
            {heading}
          </h1>
          <div className="w-20 h-1 bg-[#D6AE7B] rounded-full mt-3" />
        </div>

        <div className="flex flex-col md:flex-row gap-4 md:gap-12 lg:gap-16">
          {/* Main Post Feed */}
          <div className="flex-1 min-w-0">
            <div className="bg-white/40 rounded-2xl md:rounded-[2.5rem] p-0 md:p-0">
              <PostList />
            </div>
          </div>

          {/* Sidebar / Refinement Menu */}
          <div
            className={`
              ${open ? "block animate-in fade-in slide-in-from-top-4" : "hidden"}
              md:block md:w-80 lg:w-96 shrink-0
            `}
          >
            <div className="md:sticky md:top-24">
              <h3 className="hidden md:block text-[#B76E79] text-xs font-bold uppercase tracking-[0.2em] mb-6">
                Refine Search
              </h3>

              <div className="bg-white border border-[#B76E79]/10 p-4 md:p-8 rounded-xl md:rounded-[2rem]">
                <SideMenu />
              </div>

              {/* Branding Prompt */}
              <div className="mt-8 p-6 bg-[#581845] rounded-[2rem] text-white hidden lg:block">
                <p className="text-xs font-bold text-[#D6AE7B] uppercase mb-2">Pro Tip</p>
                <p className="text-sm font-light leading-relaxed opacity-80">
                  Use the category filters to find bespoke tailoring tips or the latest in fashion tech.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostListPage;
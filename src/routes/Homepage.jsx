// src/pages/Homepage.jsx
import { Link, useSearchParams } from "react-router-dom";
import MainCategories from "../components/MainCatergories";
import PostList from "../components/PostList";
import Search from "../components/Search";
import { LayoutGrid, Flame, Clock, TrendingUp, PenLine } from "lucide-react";

const SORTS = [
  { key: "newest", label: "Newest", icon: Clock },
  { key: "popular", label: "Popular", icon: Flame },
  { key: "trending", label: "Trending", icon: TrendingUp },
];

const Homepage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeSort = searchParams.get("sort") || "newest";

  const handleSort = (key) => {
    const params = new URLSearchParams(searchParams);
    if (key === "newest") {
      params.delete("sort");
    } else {
      params.set("sort", key);
    }
    setSearchParams(params);
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* MASTHEAD */}
        

        {/* CATEGORIES & SEARCH */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-y border-[#B76E79]/10 py-8">
          <div className="flex-1 overflow-hidden">
            <div className="flex items-center gap-2 mb-4 text-[#581845]">
              <LayoutGrid size={16} />
              <span className="text-xs font-bold uppercase tracking-widest">Explore Topics</span>
            </div>
            <MainCategories />
          </div>

        </div>

        {/* FEED HEADER + SORT + WRITE */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-10">
          <div>
            <h2 className="text-2xl font-bold text-[#1B1B1F]" style={{ fontFamily: "Georgia, serif" }}>
              Latest Stories
            </h2>
            <div className="w-14 h-0.5 bg-[#D6AE7B] rounded-full mt-2" />
          </div>

          <div className="flex items-center justify-between md:justify-end gap-2">
            <div className="flex items-center gap-2 overflow-x-auto">
              {SORTS.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => handleSort(key)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    activeSort === key
                      ? "bg-[#581845] text-white border-[#581845]"
                      : "bg-white text-[#1B1B1F]/60 border-[#B76E79]/15 hover:border-[#581845]/40 hover:text-[#581845]"
                  }`}
                >
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>

          
          </div>
        </div>

        {/* POST LIST */}
        <div className="mt-8">
          <div className="bg-white md:bg-transparent p-4 md:p-0 rounded-[2rem] md:rounded-none border border-[#B76E79]/10 md:border-none">
            <PostList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
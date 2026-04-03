// src/components/SideMenu.jsx
import { useSearchParams } from "react-router-dom";
import Search from "./Search";
import { Filter, Hash, SortAsc } from "lucide-react";

const SideMenu = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleFilterChange = (e) => {
    const newParams = Object.fromEntries(searchParams.entries());
    newParams.sort = e.target.value;
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category) => {
    const newParams = Object.fromEntries(searchParams.entries());
    if (category === "general") {
      delete newParams.cat;
    } else {
      newParams.cat = category;
    }
    setSearchParams(newParams);
  };

  const currentSort = searchParams.get("sort") || "newest";
  const currentCat = searchParams.get("cat") || "general";

  const categories = [
    { name: "All Insights", slug: "general" },
    { name: "Technology", slug: "technology" },
    { name: "Spotlight", slug: "spot" },
    { name: "Tailoring", slug: "tailor" },
    { name: "Trends", slug: "trend" },
    { name: "Stories", slug: "story" },
  ];

  return (
    <div className="px-6 py-8 h-max sticky top-24 bg-white rounded-[2.5rem] border border-[#B76E79]/10 shadow-xl shadow-[#581845]/5">
      
      {/* SEARCH SECTION */}
      <div className="mb-10">
        <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#581845] mb-4">
          <Hash size={14} className="text-[#D6AE7B]" /> Search Archives
        </h3>
        <Search />
      </div>

      {/* FILTER SECTION */}
      <div className="mb-10">
        <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#581845] mb-5">
          <SortAsc size={14} className="text-[#D6AE7B]" /> Sort By
        </h3>
        <div className="flex flex-col gap-4">
          {["newest", "popular", "trending", "oldest"].map((option) => (
            <label key={option} className="flex items-center gap-3 cursor-pointer group text-xs font-bold text-[#1B1B1F]/60 hover:text-[#581845] transition-all">
              <div className="relative flex items-center justify-center">
                <input
                  type="radio"
                  name="sort"
                  value={option}
                  checked={currentSort === option}
                  onChange={handleFilterChange}
                  className="appearance-none w-5 h-5 border-2 border-[#B76E79]/20 rounded-full checked:border-[#581845] transition-all cursor-pointer"
                />
                {currentSort === option && (
                  <div className="absolute w-2.5 h-2.5 bg-[#D6AE7B] rounded-full animate-in zoom-in-50" />
                )}
              </div>
              <span className="capitalize tracking-wider">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      <div>
        <h3 className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-[#581845] mb-5">
          <Filter size={14} className="text-[#D6AE7B]" /> Categories
        </h3>
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`text-left text-xs font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:translate-x-1 ${
                currentCat === cat.slug
                  ? "bg-[#FAF9F6] text-[#D6AE7B] border-l-4 border-[#D6AE7B]"
                  : "text-[#1B1B1F]/40 hover:text-[#581845]"
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* DECORATIVE FOOTER */}
      <div className="mt-10 pt-6 border-t border-[#B76E79]/10 text-center">
        <p className="text-[9px] font-bold text-[#B76E79]/30 uppercase tracking-[0.4em]">Syber Studio Curations</p>
      </div>
    </div>
  );
};

export default SideMenu;
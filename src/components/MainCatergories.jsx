// src/components/MainCategories.jsx
import { Link, useLocation } from "react-router-dom";
import Search from "./Search";

const MainCategories = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const currentCat = query.get("cat");

  const categories = [
    { name: "Technology", slug: "technology" },
    { name: "Spotlights", slug: "spot" },
    { name: "Tailoring", slug: "tailor" },
    { name: "Trends", slug: "trend" },
    { name: "Stories", slug: "story" },
  ];

  return (
    <div className="md:flex bg-white rounded-[2rem] xl:rounded-full p-2 pl-4 shadow-xl shadow-[#581845]/5 items-center justify-between gap-6 border border-[#B76E79]/10">
      
      {/* Navigation Links */}
      <div className="flex-1 flex items-center justify-start flex-wrap gap-1 md:gap-2">
        <Link
          to="/posts"
          className={`text-[11px] md:text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
            !currentCat 
              ? "bg-[#581845] text-white shadow-lg shadow-[#581845]/20" 
              : "text-[#1B1B1F] hover:bg-[#FAF9F6]"
          }`}
        >
          All Insights
        </Link>

        {categories.map((cat) => (
          <Link
            key={cat.slug}
            to={`/posts?cat=${cat.slug}`}
            className={`text-[11px] md:text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 ${
              currentCat === cat.slug
                ? "bg-[#D6AE7B] text-[#1B1B1F] shadow-lg shadow-[#D6AE7B]/20"
                : "text-[#B76E79] hover:bg-[#FAF9F6] hover:text-[#581845]"
            }`}
          >
            {cat.name}
          </Link>
        ))}
      </div>

      {/* Desktop Divider & Search */}
      <div className="hidden md:flex items-center gap-6 pr-2">
        <div className="w-[1px] h-6 bg-[#B76E79]/20" />
        <div className="min-w-[240px]">
          <Search />
        </div>
      </div>
    </div>
  );
};

export default MainCategories;
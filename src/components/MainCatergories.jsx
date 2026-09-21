// src/components/MainCategories.jsx
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown, LayoutGrid } from "lucide-react";
import Search from "./Search";

const categories = [
  { name: "Technology", slug: "technology" },
  { name: "Spotlights", slug: "spot" },
  { name: "Tailoring", slug: "tailor" },
  { name: "Trends", slug: "trend" },
  { name: "Stories", slug: "story" },
];

const MainCategories = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const currentCat = query.get("cat");
  const [open, setOpen] = useState(false);

  // Collapse after navigating
  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.search]);

  const activeLabel =
    categories.find((c) => c.slug === currentCat)?.name || "All Insights";

  const mobileItemClass = (active) =>
    `text-[11px] font-bold uppercase tracking-widest px-4 py-3 rounded-xl text-center transition-all duration-300 ${
      active
        ? "bg-[#581845] text-white shadow-lg shadow-[#581845]/20"
        : "bg-[#FAF9F6] text-[#B76E79] active:bg-[#D6AE7B]/20"
    }`;

  return (
    <div className="bg-white rounded-2xl md:rounded-[2rem] xl:rounded-full shadow-xl shadow-[#581845]/5 border border-[#B76E79]/10">
      {/* MOBILE: menu button + inline expandable list */}
      <div className="md:hidden p-2">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-categories"
          className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl bg-[#FAF9F6] text-[#581845]"
        >
          <span className="flex items-center gap-2 min-w-0">
            <LayoutGrid size={14} className="shrink-0" />
            <span className="text-[11px] font-bold uppercase tracking-widest truncate">
              {activeLabel}
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`shrink-0 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          id="mobile-categories"
          aria-hidden={!open}
          className={`grid transition-[grid-template-rows] duration-300 ease-out ${
            open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden">
            <div className="grid grid-cols-2 gap-2 pt-2">
              <Link
                to="/posts"
                tabIndex={open ? 0 : -1}
                className={`col-span-2 ${mobileItemClass(!currentCat)}`}
              >
                All Insights
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`/posts?cat=${cat.slug}`}
                  tabIndex={open ? 0 : -1}
                  className={mobileItemClass(currentCat === cat.slug)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* DESKTOP: original pill row + search */}
      <div className="hidden md:flex items-center justify-between gap-6 p-2 pl-4">
        <div className="flex-1 flex items-center justify-start flex-wrap gap-2">
          <Link
            to="/posts"
            className={`text-xs font-bold uppercase tracking-widest px-6 py-2.5 rounded-full transition-all duration-300 ${
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
              className={`text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full transition-all duration-300 ${
                currentCat === cat.slug
                  ? "bg-[#D6AE7B] text-[#1B1B1F] shadow-lg shadow-[#D6AE7B]/20"
                  : "text-[#B76E79] hover:bg-[#FAF9F6] hover:text-[#581845]"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-6 pr-2">
          <div className="w-[1px] h-6 bg-[#B76E79]/20" />
          <div className="min-w-[240px]">
            <Search />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainCategories;
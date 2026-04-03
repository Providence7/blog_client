// src/components/Search.jsx
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { Search as SearchIcon, X } from "lucide-react";

const Search = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentQuery = searchParams.get("search") || "";

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      
      // If the user is already on the posts page, we update the URL params
      if (location.pathname === "/posts") {
        const newParams = Object.fromEntries(searchParams);
        if (query) {
          newParams.search = query;
        } else {
          delete newParams.search;
        }
        setSearchParams(newParams);
      } else {
        // If not on posts page, navigate there with the search query
        navigate(`/posts?search=${query}`);
      }
    }
  };

  const clearSearch = () => {
    const newParams = Object.fromEntries(searchParams);
    delete newParams.search;
    setSearchParams(newParams);
  };

  return (
    <div className="group relative flex items-center w-full max-w-sm">
      <div className="absolute left-4 text-[#B76E79] group-focus-within:text-[#D6AE7B] transition-colors">
        <SearchIcon size={16} strokeWidth={2.5} />
      </div>
      
      <input
        type="text"
        placeholder="SEARCH THE ARCHIVES..."
        defaultValue={currentQuery}
        onKeyDown={handleKeyPress}
        className="w-full bg-[#FAF9F6] border border-[#B76E79]/10 text-[#1B1B1F] text-[10px] font-bold tracking-widest uppercase py-3 pl-12 pr-10 rounded-full outline-none focus:border-[#D6AE7B] focus:ring-4 focus:ring-[#D6AE7B]/5 transition-all placeholder:text-[#B76E79]/40"
      />

      {currentQuery && (
        <button 
          onClick={clearSearch}
          className="absolute right-4 text-[#B76E79] hover:text-[#581845] transition-colors"
        >
          <X size={14} strokeWidth={3} />
        </button>
      )}
    </div>
  );
};

export default Search;
import { Link } from "react-router-dom";
import Search from "./Search";

const MainCategories = () => {
  return (
    <div className="md:flex bg-white rounded-3xl xl:rounded-full p-4 shadow-lg items-center justify-center gap-8">
      {/* links */}
      <div className="flex-1 flex items-center justify-between flex-wrap">
        <Link
          to="/posts"
          className="bg-blue-800 text-white rounded-full px-4 py-2"
        >
          All Posts
        </Link>
        <Link
          to="/posts?cat=technology"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Technology
        </Link>
        <Link
          to="/posts?cat=spot"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          spotlights
        </Link>
        <Link
          to="/posts?cat=tailor"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
        Tailoring
        </Link>
        <Link
          to="/posts?cat=trend"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Trends
        </Link>
        <Link
          to="/posts?cat=story"
          className="hover:bg-blue-50 rounded-full px-4 py-2"
        >
          Stories
        </Link>
      </div>
      <span className="text-xl font-medium md:flex hidden">|</span>
      {/* search */}
      <div className="md:flex hidden">
      <Search/>
      </div>
    </div>
  );
};

export default MainCategories;
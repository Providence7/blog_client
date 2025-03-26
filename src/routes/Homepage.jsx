import { Link } from "react-router-dom";
import MainCategories from "../components/MainCatergories";
import PostList from "../components/PostList";
import Search from "../components/Search";

const Homepage = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      {/* BREADCRUMB */}
      <div className="flex gap-4">
        <Link to="/">Home</Link>
        <span>•</span>
        <span className="text-[#c4458f]">Blogs and Articles</span>
      </div>
      {/* INTRODUCTION */}
      <div className="flex items-center justify-between">
        {/* titles */}
      
        {/* animated button */}
  
      </div>
      {/* CATEGORIES */}
      <MainCategories />
     <div className="md:hidden">
     <Search />
     </div>
      {/* FEATURED POSTS */}
  
      {/* POST LIST */}
      <div className="">
        <h1 className="my-4 text-2xl text-gray-500">Recent Posts</h1>
        <PostList/>
      </div>
    </div>
  );
};

export default Homepage;

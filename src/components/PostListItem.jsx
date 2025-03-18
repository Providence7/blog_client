import { Link } from "react-router-dom";
import Image from "./Image";
import { format } from "timeago.js";

const PostListItem = ({ post }) => {

  return (
    <div className=" border border-gray-400 rounded-3xl p-3 flex flex-col xl:flex-row gap-8 mb-12">
      {/* image */}
      {post.img && (
        <div className="md:hidden xl:block xl:w-1/3">
          <Image src={post.img} className="rounded-2xl object-cover" w="735" />
        </div>
      )}
      {/* details */}
      <div className="flex flex-col gap-4 xl:w-2/3">
        <Link to={`/${post.slug}`} className="text-2xl md:text-4xl font-bold">
          {post.title}
        </Link>
        <div className="flex items-center gap-2 text-gray-400 text-sm">
          <span>Written by</span>
          <Link className="text-blue-800">CyberTailor</Link>
          <span className="hidden md:flex">on</span>
          <Link className="text-blue-800 hidden md:flex ">{post.category}</Link>
          <span className="font-thin text-xs">{format(post.createdAt)}</span>
        </div>
        <p className="text-[#d12f90]">{post.desc}</p>
        <Link to={`/${post.slug}`} className="underline text-blue-800 font-bold text-sm">
          Read More
        </Link>
      </div>
    </div>
  );
};

export default PostListItem;
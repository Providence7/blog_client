import { Link, useParams } from "react-router-dom";
import Image from "../components/Image";
import Search from "../components/Search";
import Comments from "../components/CommentSection";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Twitter, Facebook, Instagram } from "lucide-react";

// Fetch post data
const fetchPost = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
  return res.data;
};

const SinglePostPage = () => {
  const { slug } = useParams();
  const { isPending, error, data } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost(slug),
  });

  if (isPending) return "Loading...";
  if (error) return "Something went wrong! " + error.message;
  if (!data) return "Post not found!";

  return (
    <div className="flex flex-col gap-8">
      {/* Post Details */}
      <div className="flex gap-8">
        <div className="lg:w-3/5 flex flex-col gap-8">
          <h1 className="text-xl md:text-3xl xl:text-4xl 2xl:text-5xl font-semibold">
            {data.title}
          </h1>

          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span>by</span>
            <Link className="text-blue-900">CyberTailor</Link>
            <span className="text-sm font-bold">{format(data.createdAt)}</span>
          </div>

          <p className="text-gray-500 font-medium">{data.desc}</p>
        </div>

        {/* Post Image */}
        {data.img && (
          <div className="hidden md:flex lg:block w-2/5">
            <Image src={data.img} w="600" className="rounded-2xl" />
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="flex flex-col md:flex-row gap-12 justify-between">
        {/* Text */}
        <div
          className="lg:text-lg flex flex-col gap-6 text-justify"
          dangerouslySetInnerHTML={{ __html: data.content }}
        />
        
        {/* Author & Social Links */}
        <div className="px-4 h-max sticky top-8">
          <h1 className="mb-4 text-sm font-medium">Author</h1>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-8">
              <Image
                src="blog4.jfif"
                className="w-12 h-12 rounded-full object-cover"
                w="48"
                h="48"
              />
              <Link className="text-blue-800">CyberTailor</Link>
            </div>

            <p className="text-sm text-gray-500">
              Lorem ipsum dolor sit amet consectetur.
            </p>

            {/* Social Media Links */}
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6 text-blue-500 hover:text-blue-700" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 text-blue-700 hover:text-blue-900" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 text-pink-500 hover:text-pink-700" />
              </a>
            </div>

            {/* Search Component */}
            <Search />
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <Comments slug={data.slug} />
    </div>
  );
};

export default SinglePostPage;

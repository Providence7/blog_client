// src/components/PostList.jsx
import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";
import { Loader2, Sparkles } from "lucide-react";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 10, ...searchParamsObj },
  });
  return res.data;
};

const PostList = () => {
  const [searchParams] = useSearchParams();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam, searchParams),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  // LOADING STATE
  if (status === "pending") return (
    <div className="space-y-12 mt-10">
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex flex-col md:flex-row gap-8 animate-pulse">
          <div className="w-full md:w-1/3 aspect-video bg-gray-200 rounded-[2rem]" />
          <div className="flex-1 space-y-4 py-2">
            <div className="h-4 bg-gray-200 rounded-full w-1/4" />
            <div className="h-8 bg-gray-200 rounded-full w-3/4" />
            <div className="h-4 bg-gray-200 rounded-full w-full" />
          </div>
        </div>
      ))}
    </div>
  );

  // ERROR STATE
  if (status === "error") return (
    <div className="py-20 text-center bg-[#FAF9F6] rounded-[3rem] border border-red-100">
      <p className="text-[#581845] font-bold uppercase tracking-widest text-xs">Archive Access Denied</p>
      <p className="text-[#B76E79] mt-2 italic">{error.message}</p>
    </div>
  );

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <div className="relative">
      {allPosts.length === 0 ? (
        <div className="py-32 text-center">
          <Sparkles className="mx-auto text-[#D6AE7B] mb-4 opacity-20" size={48} />
          <p className="text-[#581845] font-bold uppercase tracking-[0.3em] text-[10px]">No matches found in the atelier</p>
        </div>
      ) : (
        <InfiniteScroll
          dataLength={allPosts.length}
          next={fetchNextPage}
          hasMore={!!hasNextPage}
          loader={
            <div className="flex justify-center py-12">
              <Loader2 className="animate-spin text-[#B76E79]" size={24} />
            </div>
          }
          className="flex flex-col gap-16 md:gap-24 mt-12 pb-20"
        >
          {allPosts.map((post) => (
            <div 
              key={post._id} 
              className="transition-all duration-500 hover:translate-x-2"
            >
              <PostListItem post={post} />
            </div>
          ))}
        </InfiniteScroll>
      )}

      {/* SYBER DECORATIVE LINE */}
      {!hasNextPage && allPosts.length > 0 && (
        <div className="flex flex-col items-center gap-4 py-20">
          <div className="w-px h-20 bg-gradient-to-b from-[#B76E79]/20 to-transparent" />
          <p className="text-[10px] font-bold text-[#B76E79] uppercase tracking-[0.5em]">End of Collection</p>
        </div>
      )}
    </div>
  );
};

export default PostList;
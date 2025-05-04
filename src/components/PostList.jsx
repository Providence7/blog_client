import PostListItem from "./PostListItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSearchParams } from "react-router-dom";

const fetchPosts = async (pageParam, searchParams) => {
  const searchParamsObj = Object.fromEntries([...searchParams]);

  console.log("Search Params:", searchParamsObj);
  console.log("Fetching page:", pageParam); // 🔍 Debugging

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
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", searchParams.toString()],
    queryFn: async ({ pageParam = 1 }) => await fetchPosts(pageParam, searchParams), // ✅ Await the function
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });
  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Something went wrong!</p>;

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h4>Loading more posts...</h4>}
      // endMessage={<p><b>All posts loaded!</b></p>}
      className="mt-20"
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;

import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ManagePosts = () => {
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: async () => {
          const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts?limit=100`);
          return res.data.posts || []; // ✅ Ensure we return the "posts" array
        },
      });
      
      // Delete post mutation
      const deleteMutation = useMutation({
        mutationFn: async (id) => {
          return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
        },
        onSuccess: () => {
          toast.success("Post deleted!");
          refetch(); // Refresh posts after deletion
        },
      });
      
      // Handle loading and error states
      if (isLoading) return <p>Loading...</p>;
      if (isError) return <p>Error: {error.message}</p>;
      if (!Array.isArray(data) || data.length === 0) return <p>No posts available.</p>; // ✅ Fix: Ensure data is an array
      
      

  return (
    <div className="container mx-auto p-4">
    <h1 className="text-2xl font-bold">Manage Posts</h1>
    <table className="w-full mt-4 border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2 text-left">Title</th>
          <th className="border p-2 text-left">Category</th>
          <th className="border p-2 text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {!Array.isArray(data) || data.length === 0 ? (
          <tr>
            <td colSpan="3" className="text-center p-4">
              No posts found.
            </td>
          </tr>
        ) : (
          data.map((post) => (
            <tr key={post._id} className="border-b">
              <td className="border p-2">{post.title}</td>
              <td className="border p-2">{post.category || "Uncategorized"}</td>
              <td className="border p-2 flex gap-2 justify-center">
                <Link to={`/admin/edit/${post._id}`} className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => deleteMutation.mutate(post._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
  
  );
};

export default ManagePosts;

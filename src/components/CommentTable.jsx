import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const CommentManagement = () => {
  const [comments, setComments] = useState([]); // Ensures it's an array by default
  const [loading, setLoading] = useState(false);

  // Fetch comments from the backend
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments`);
      ;
      setComments(response.data); // Assuming response contains the array of comments
    } catch (error) {
      toast.error("Error fetching comments");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []); // Fetch comments on mount

  const deleteComment = async (slug, email) => {
    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${slug}/${email}`);
      if (response.status === 200) {
        toast.success("Comment deleted successfully!");
        fetchComments(); // Refresh the comment list after deletion
      }
    } catch (error) {
      toast.error("Error deleting comment. Please try again.");
      console.error(error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Manage Comments</h2>
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white table-auto shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">User Email</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Comment</th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(comments) && comments.length > 0 ? (
                comments.map((comment) => (
                  <tr key={comment._id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 text-sm text-gray-700">{comment.email}</td>
                    <td className="px-4 py-2 text-sm text-gray-700">{comment.comment}</td>
                    <td className="px-4 py-2 text-sm">
                      <button
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                        onClick={() => deleteComment(comment.postId, comment.email)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="text-center text-gray-500">
                    No comments available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default CommentManagement;

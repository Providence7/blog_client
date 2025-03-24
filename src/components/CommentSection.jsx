import React, { useState, useEffect } from "react";

const CommentSection = ({ postId, user }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch comments for this post
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/comments/${postId}`);
        if (!res.ok) throw new Error("Failed to fetch comments");
        const data = await res.json();
        setComments(data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };
    fetchComments();
    console.log("CommentSection mounted, postId:", postId);
    if (!postId) {
      console.error("postId is undefined, cannot fetch comments.");
      return;
    }
    fetchComments();
  }, [postId]);

  // Handle new comment submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/comments/${postId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text: newComment, userId: user?._id }),
      });
      if (!res.ok) throw new Error("Failed to post comment");
      const data = await res.json();
      setComments([data, ...comments]);
      setNewComment("");
      console.log("User prop:", user);

    } catch (err) {
      console.error("Error posting comment:", err);
    }
    setLoading(false);
  };

  // Handle comment deletion
  const handleDelete = async (commentId) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/comments/${commentId}`, {
        method: "DELETE",
        credentials: "include",
      });
      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
    }
  };

  return (
    <div className="w-full p-4 border rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-3">Comments</h3>
      {/* Comment Input (Accessible to everyone but requires login to submit) */}
      {user !== null && (
  <form onSubmit={handleSubmit} className="mb-4">
    <textarea
      className="w-full p-2 border rounded-md"
      placeholder="Write a comment..."
      value={newComment}
      onChange={(e) => setNewComment(e.target.value)}
      disabled={!user}
    />
    <button
      type="submit"
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
      disabled={!user || loading}
    >
      {loading ? "Posting..." : "Post Comment"}
    </button>
  </form>
)}



      {/* Display Comments */}
      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500">No comments yet.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment._id} className="p-3 border rounded-md flex justify-between">
              <div>
                <p className="font-semibold">{comment?.user?.username || "Anonymous"}</p>
                <p>{comment.text}</p>
              </div>
              {user && user._id === comment.user._id && (
                <button
                  onClick={() => handleDelete(comment._id)}
                  className="text-red-500 text-sm"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CommentSection;

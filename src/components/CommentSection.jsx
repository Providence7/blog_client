import { useState, useEffect } from "react";
import { auth } from "../layout/console.js";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import axios from "axios";
const CommentSection = ({ slug }) => {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Google login method
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
  
      const userData = {
        googleId: user.uid,
        email: user.email,
        username: user.displayName,
      };
  
      setUser(userData);
      toast.success(`Welcome ${user.displayName}`);
  
      // ✅ Send to backend
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user`, userData);
  
      window.location.reload();
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to log in with Google");
    }
  };
  

  // Handle Logout
 const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to log out");
    }
  };
  // Fetch Comments for the Post (by Slug)
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments/${slug}`);
        const data = await res.json();
        setComments(data);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchComments();
  }, [slug]);

  // Submit Comment
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!comment.trim()) return; // Prevent empty comments

    const commentData = {
      postId: slug,
      googleId: user.uid,
      name: user.displayName,
      email: user.email,
      comment: comment,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(commentData),
      });

      if (!res.ok) {
        throw new Error("Error submitting comment");
      }

      const newComment = await res.json();

      // ✅ Fetch updated comments without reloading the page
      setComments((prev) => [newComment.newComment, ...prev]);

      setComment(""); // Clear input field
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      {user ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-semibold text-[#46249c]">
              Welcome, {user.displayName}!
            </p>
            <button
              onClick={handleLogout}
              className="bg-[#c4458f] text-white px-4 py-2 rounded-md hover:bg-[#a43272] transition"
            >
              Logout
            </button>
          </div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your comment..."
            className="w-full border border-gray-300 rounded-lg p-3 mb-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#46249c]"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-[#46249c] text-white py-2 rounded-lg hover:bg-[#351a76] transition"
          >
            Submit Comment
          </button>
        </>
      ) : (
        <button
          onClick={handleGoogleLogin}
          className="w-full bg-[#c4458f] text-white py-2 rounded-lg hover:bg-[#a43272] transition"
        >
          Login with Google to comment
        </button>
      )}

      <div className="mt-6 w-fit space-y-6">
        {comments.length > 0 ? (
          comments.map((c, index) => (
            <div
              key={c._id || `${c.googleId}-${c.postId}`}
              className={`rounded-lg shadow-md ${
                index % 2 === 0 ? "bg-gray-100" : "bg-gray-50"
              }`}
            >
          
            <p className="font-bold italic text-[#c4458f]">{(c.username || c.name)?.toUpperCase()}
            </p>
        
             <p className="text-[#46249c]">
  {c.comment.charAt(0).toUpperCase() + c.comment.slice(1)}
</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-4">No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;

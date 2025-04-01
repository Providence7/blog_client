import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../layout/console.js";

const Forum = () => {
  const [user, setUser] = useState(null); // Manage logged-in user state
  const [newComment, setNewComment] = useState(""); // New comment state
  const [topics, setTopics] = useState([]); // State for forum topics from the backend
  const [searchKeyword, setSearchKeyword] = useState(""); // State for search input
  const navigate = useNavigate(); // For redirecting to login if needed

  // Fetch topics from the backend
  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/forum`);
        const data = await res.json();
        
        // Ensure data is an array before setting state
        if (Array.isArray(data)) {
          setTopics(data);
        } else {
          console.error("Expected an array but got:", data);
          setTopics([]); // Set to empty array to prevent errors
        }
      } catch (error) {
        console.error("Error fetching topics:", error);
        setTopics([]); // Handle errors by setting an empty array
      }
    };
  
    fetchTopics();
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

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await res.json();
      setUser(data.user); // Set the user after successful login
      toast.success(`Welcome ${data.user.username}`);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to log in with Google");
    }
  };

  // Handle comment submission
  const handleAddComment = async (topicId) => {
    if (!user) {
      toast.error("You must be logged in to comment!");
      return;
    }

    const newCommentData = {
      user: user.username,
      text: newComment,
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/forum/${topicId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCommentData),
      });

      if (!res.ok) throw new Error("Failed to add comment");

      const updatedTopic = await res.json();

      // Update topics state with the new comment
      setTopics((prevTopics) =>
        prevTopics.map((topic) => (topic._id === topicId ? updatedTopic : topic))
      );

      setNewComment(""); // Clear the comment input
      toast.success("Comment added successfully!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  // Search functionality
  const handleSearch = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/forum/search?keyword=${searchKeyword}`);
      const data = await res.json();
      setTopics(data);
    } catch (error) {
      console.error("Error searching topics:", error);
    }
  };

  return (
    <div className="container mx-0 mt-9">
      <div className="text-center mb-12">
        <h1 className="font-bold text-4xl">SyberFashion Forum</h1>
        <p className="italic text-xs text-blue-950 font-bold">
          "Be respectful, helpful, considerate, relevant, and collaborative in discussions."
        </p>
      </div>

      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for topics..."
          className="p-2 border border-gray-700 text-sm w-full md:w-1/2"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
        <button onClick={handleSearch} className="ml-2 p-2 bg-blue-500 text-white text-sm rounded">
          Search
        </button>
      </div>

      {/* Display forum topics */}
      {topics.map((topic) => (
        <div key={topic._id} className="mb-4 border-b">
          <h2 className="text-xl font-semibold text-center text-[#c4458f]">{topic.title}</h2>
          <p className="italic text-xs text-center text-blue-950 mt-2 font-bold">{topic.description}</p>

          {/* Comments section */}
          <div className="my-5">
            <h3 className="text-lg font-medium text-center mb-6 underline italic text-gray-950">
              Comments
            </h3>
            {topic.comments.map((comment, index) => (
              <div key={index} className="p-1 border-t text-center py-3 text-sm text-gray-700">
                <p>
                  <strong className="text-[#46249c]">{comment.user}:</strong> {comment.text}
                </p>
              </div>
            ))}
          </div>

          {/* Login prompt */}
          {!user && (
            <div className="flex justify-center items-center my-6">
              <button
                onClick={handleGoogleLogin}
                className="text-[#c4458f] flex justify-center items-center px-2 py-2 rounded shadow-lg"
              >
                Login to comment or create a topic
              </button>
            </div>
          )}

          {/* Comment input (only for logged-in users) */}
          {user && (
            <div className="mt-2">
              <input
                type="text"
                placeholder="Add a comment"
                className="p-2 border border-gray-300 text-sm w-full"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={() => handleAddComment(topic._id)}
                className="mt-2 p-2 bg-blue-500 text-white rounded text-sm"
              >
                Add Comment
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Forum;

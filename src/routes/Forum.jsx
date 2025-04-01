import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../layout/console.js";

// ✅ Dummy data for forum topics and comments
const initialTopics = [
  {
    id: 1,
    title: "How to Choose the Right Fabric for Tailoring?",
    description:
      "Fabric selection is crucial for high-quality tailoring. What do you consider when picking fabric for your designs?",
    comments: [
      { id: 1, user: "Jane Doe", text: "Fabric durability is key. I always test how it reacts to washing and stretching before using it for any major project." },
      { id: 2, user: "John Smith", text: "Weight is important! Some fabrics look amazing but are too stiff or too light, making them difficult to work with." },
    ],
  },
  {
    id: 2,
    title: "Best Sewing Machines for Beginners",
    description: "Looking for a sewing machine recommendation? What’s the best model for beginners?",
    comments: [
      { id: 1, user: "Anna White", text: "The Brother CS6000i is my go-to. It’s beginner-friendly but has enough features to grow with you!" },
      { id: 2, user: "Michael Brown", text: "Singer machines are classics! I started with the Singer Heavy Duty 4423, and it handled thick fabrics like denim effortlessly." },
    ],
  },
];

const Forum = () => {
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [topics, setTopics] = useState(initialTopics);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [expandedTopics, setExpandedTopics] = useState({}); // Track expanded comments

  const navigate = useNavigate();

  // 🟢 Persist authentication state on page refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          googleId: user.uid,
          email: user.email,
          username: user.displayName,
        });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup function to avoid memory leaks
  }, []);

  // Google login method
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      setUser({
        googleId: user.uid,
        email: user.email,
        username: user.displayName,
      });

      toast.success(`Welcome ${user.displayName}`);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Failed to log in with Google");
    }
  };

  // 🛑 Logout function
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

  // Handle comment submission
  const handleAddComment = (topicId) => {
    if (!user) {
      toast.error("You must be logged in to comment!");
      return;
    }

    const newCommentData = {
      id: Date.now(),
      user: user.username,
      text: newComment,
    };

    const updatedTopics = topics.map((topic) =>
      topic.id === topicId
        ? { ...topic, comments: [...topic.comments, newCommentData] }
        : topic
    );

    setTopics(updatedTopics);
    setNewComment("");
  };

  // Toggle comments visibility
  const toggleComments = (topicId) => {
    setExpandedTopics((prev) => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  // Filter topics based on search
  const filteredTopics = topics.filter((topic) =>
    topic.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="container mx-0 mt-9">
      <div className="text-center mb-12">
        <h1 className="font-bold text-4xl">SyberFashion Forum</h1>
        <p className="italic text-xs text-blue-950 font-bold">
          "Be respectful, helpful, considerate, relevant, and collaborative in discussions."
        </p>
      </div>

      {/* 🟢 Show login button if user is not signed in */}
      {!user ? (
        <div className="text-center mb-6">
          <button
            onClick={handleGoogleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium"
          >
            Log in with Google
          </button>
        </div>
      ) : (
        <div className="text-center mb-6">
          <p className="text-sm">Welcome, <strong>{user.username}</strong></p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-medium mt-2"
          >
            Logout
          </button>
        </div>
      )}

      {/* Search Bar */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for topics..."
          className="p-2 border border-gray-700 text-sm w-full md:w-1/2"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
        />
      </div>

      {/* Forum Topics */}
      {filteredTopics.map((topic) => {
        const isExpanded = expandedTopics[topic.id];
        const visibleComments = isExpanded ? topic.comments : topic.comments.slice(0, 2);

        return (
          <div key={topic.id} className="mb-4 border-b pb-4">
            <h2 className="text-xl font-semibold text-center text-[#c4458f]">{topic.title}</h2>
            <p className="italic text-xs text-center text-blue-950 mt-2 font-bold">{topic.description}</p>

            <div className="my-5">
              <h3 className="text-lg font-medium text-center mb-6 underline italic text-gray-950">
                Comments
              </h3>

              {visibleComments.map((comment) => (
                <div key={comment.id} className="p-1 border-t text-center py-3 text-sm text-gray-700">
                  <p><strong className="text-[#46249c]">{comment.user}:</strong> {comment.text}</p>
                </div>
              ))}

              {topic.comments.length > 2 && (
                <div className="text-center mt-4">
                  <button
                    className="text-blue-600 underline text-sm"
                    onClick={() => toggleComments(topic.id)}
                  >
                    {isExpanded ? "Hide Comments" : "Read More Comments"}
                  </button>
                </div>
              )}
            </div>

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
                  onClick={() => handleAddComment(topic.id)}
                  className="mt-2 p-2 bg-blue-500 text-white rounded text-sm"
                >
                  Add Comment
                </button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Forum;

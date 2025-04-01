import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../layout/console.js";

// ✅ Dummy data for forum topics
const initialTopics = [
  {
    id: 1,
    title: "How to Choose the Right Fabric for Tailoring?",
    description:
      "Fabric selection is crucial for high-quality tailoring. What do you consider when picking fabric for your designs?",
    comments: [],
  },
  {
    id: 2,
    title: "Best Sewing Machines for Beginners",
    description: "Looking for a sewing machine recommendation? What’s the best model for beginners?",
    comments: [],
  },
];

const Forum = () => {
  const [user, setUser] = useState(null);
  const [topics, setTopics] = useState(initialTopics);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [expandedTopics, setExpandedTopics] = useState({});

  // 🆕 State for creating new topics
  const [newTopicTitle, setNewTopicTitle] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");

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

    return () => unsubscribe(); // Cleanup function
  }, []);

  // 🟢 Google login
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
      toast.error("Failed to log out");
    }
  };

  // 🆕 Handle topic submission
  const handleCreateTopic = () => {
    if (!user) {
      toast.error("You must be logged in to create a topic!");
      return;
    }
    if (!newTopicTitle || !newTopicDescription) {
      toast.error("Please enter both title and description!");
      return;
    }

    const newTopic = {
      id: Date.now(),
      title: newTopicTitle,
      description: newTopicDescription,
      comments: [],
    };

    setTopics([newTopic, ...topics]); // Add new topic at the top
    setNewTopicTitle("");
    setNewTopicDescription("");
    toast.success("Topic created successfully!");
  };

  // Filter topics based on search
  const filteredTopics = topics.filter(
    (topic) =>
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
            Log in to create topics and comment
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

      {/* 🆕 Create New Topic Section */}
      {user && (
        <div className="border p-4 mb-6 rounded-lg shadow-lg bg-gray-100">
          <h2 className="text-lg font-bold text-gray-800">Create a New Topic</h2>
          <input
            type="text"
            placeholder="Topic Title"
            className="p-2 border border-gray-400 text-sm w-full mt-2"
            value={newTopicTitle}
            onChange={(e) => setNewTopicTitle(e.target.value)}
          />
          <textarea
            placeholder="Topic Description"
            className="p-2 border border-gray-400 text-sm w-full mt-2 h-24"
            value={newTopicDescription}
            onChange={(e) => setNewTopicDescription(e.target.value)}
          />
          <button
            onClick={handleCreateTopic}
            className="mt-2 p-2 bg-blue-500 text-white rounded text-sm"
          >
            Create Topic
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
      {filteredTopics.map((topic) => (
        <div key={topic.id} className="mb-4 border-b pb-4">
          <h2 className="text-xl font-semibold text-center text-[#c4458f]">{topic.title}</h2>
          <p className="italic text-xs text-center text-blue-950 mt-2 font-bold">{topic.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Forum;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { auth } from "../layout/console.js";

const Forum = () => {
  const [user, setUser] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [topics, setTopics] = useState([]);
  const [newTopic, setNewTopic] = useState({ title: "", description: "" });
  const [searchKeyword, setSearchKeyword] = useState("");
  const [expandedTopics, setExpandedTopics] = useState({});
  const [showCreateTopicModal, setShowCreateTopicModal] = useState(false);

  const navigate = useNavigate();

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

    const fetchTopics = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/topics`);
        if (response.data.length === 0) {
          console.log('No topics found');
        } else {
          setTopics(response.data);
        }
      } catch (error) {
        console.error('Error fetching topics:', error);
        toast.error('Failed to fetch topics.');
      }
    };    fetchTopics();
    return () => unsubscribe();
  }, []);

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

  const handleAddComment = async (topicId) => {
    if (!user) {
      toast.error("You must be logged in to comment!");
      return;
    }
  
    const commentData = {
      userId: user.googleId,
      username: user.username,
      text: newComment,
    };
  
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/topics/${topicId}/comments`,
        { comment: commentData }  // Important: wrapped in "comment" key
      );
  
      // Replace the updated topic in the topics list
      setTopics(prevTopics =>
        prevTopics.map(topic =>
          topic._id === topicId ? response.data : topic
        )
      );
  
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };
  

  const handleCreateTopic = async () => {
    if (!user) {
      toast.error("You must be logged in to create a topic!");
      return;
    }

    if (!newTopic.title || !newTopic.description) {
      toast.error("Please fill in both the title and description!");
      return;
    }

    const topicData = {
      title: newTopic.title,
      description: newTopic.description,
      userId: user.googleId,
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/topics`, topicData);

      if (response.status === 201) {
        setTopics((prevTopics) => [...prevTopics, response.data]);
        setShowCreateTopicModal(false);
        setNewTopic({ title: "", description: "" });
        toast.success("Topic created successfully");
      } else {
        toast.error("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to create topic. Please try again.");
    }
  };

  const filteredTopics = Array.isArray(topics)
    ? topics.filter((topic) =>
        topic.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        topic.description.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    : [];

  const toggleComments = (topicId) => {
    setExpandedTopics(prevState => ({
      ...prevState,
      [topicId]: !prevState[topicId],
    }));
  };

  return (
    <div className="container mx-0 mt-9">
      <div className="text-center mb-12">
        <h1 className="font-bold text-4xl">SyberFashion Forum</h1>
        <p className="italic text-xs text-blue-950 font-bold">
          "Be respectful, helpful, considerate, relevant, and collaborative in discussions."
        </p>
      </div>

      {/* Show login button if user is not signed in */}
    {/* Search Bar */}
<div className="flex justify-center mb-6">
  <input
    type="text"
    placeholder="Search topics..."
    className="p-3 border border-gray-400 rounded-md text-sm w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
    value={searchKeyword}
    onChange={(e) => setSearchKeyword(e.target.value)}
  />
</div>

{/* Login Section */}
{!user ? (
  <div className="text-center mb-6">
    <button
      onClick={handleGoogleLogin}
      className="bg-blue-500 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition"
    >
      Log in with Google
    </button>
  </div>
) : (
  <div className="text-center mb-6">
    <p className="text-sm">Welcome, <strong>{user.username}</strong></p>
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-6 py-2 rounded-md text-sm font-medium mt-2 hover:bg-red-600 transition"
    >
      Log out
    </button>
  </div>
)}

      {/* Create New Topic Button */}
      <div className="fixed bottom-40 right-4">
        <button
          onClick={() => setShowCreateTopicModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Create Topic
        </button>
      </div>

      {/* Modal for creating a new topic */}
      {showCreateTopicModal && (
  <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg w-96 shadow-lg">
      <h2 className="text-2xl font-semibold text-purple-700 mb-4">Create a New Topic</h2>
      <input
        type="text"
        className="w-full p-3 mb-4 border border-gray-300 rounded-md text-sm"
        placeholder="Enter topic title"
        value={newTopic.title}
        onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
      />
      <textarea
        className="w-full p-3 mb-6 border border-gray-300 rounded-md text-sm"
        placeholder="Enter topic description"
        value={newTopic.description}
        onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
      />
      <div className="flex justify-between">
        <button
          onClick={handleCreateTopic}
          className="bg-purple-600 text-white px-6 py-2 rounded-md text-sm hover:bg-purple-700 transition"
        >
          Create Topic
        </button>
        <button
          onClick={() => setShowCreateTopicModal(false)}
          className="bg-gray-300 text-black px-6 py-2 rounded-md text-sm hover:bg-gray-400 transition"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}


      {/* Forum Topics */}
      {filteredTopics.map((topic) => {
  const topicId = topic._id;
  const isExpanded = expandedTopics[topicId];
  const visibleComments = isExpanded ? topic.comments : topic.comments.slice(0, 2);

  return (
    <div key={topicId} className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
      {/* Topic Header */}
      <div className="mb-4 bg-[#f0ecec]">
        <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">{topic.title}</h2>
        <p className="text-gray-700 text-center italic">{topic.description}</p>
      </div>
      

      {/* Comments List */}
      <div className="pl-4 border-l-4 border-purple-300 mb-4">
        <h4 className="text-lg font-bold text-center text-gray-600 mb-2">Comments</h4>
        {visibleComments.length === 0 ? (
          <p className="text-gray-400 italic text-sm">No comments yet. Be the first!</p>
        ) : (
          visibleComments.map((comment, idx) => (
            <div key={comment._id || idx} className="mb-3 p-3 bg-gray-50 rounded shadow-sm">
              <p className="font-semibold italic text-gray-800 text-sm mb-1">
                🗣 {comment.username}
              </p>
              <p className="text-gray-700 text-sm">{comment.text}</p>
            </div>
          ))
        )}
        {topic.comments.length > 2 && !isExpanded && (
          <button
            onClick={() => toggleComments(topicId)}
            className="text-blue-500 text-xs mt-1"
          >
            Show more comments...
          </button>
        )}
      </div>

      {/* Comment Form */}
      {user && (
        <div className="mt-2 border-t pt-4">
          <h4 className="text-sm font-semibold text-gray-600 mb-2">Add a comment</h4>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md text-sm mb-2"
            placeholder="Your comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={() => handleAddComment(topicId)}
            className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition"
          >
            Submit Comment
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

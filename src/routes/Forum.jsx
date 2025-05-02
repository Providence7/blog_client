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
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isCreatingTopic, setIsCreatingTopic] = useState(false); // Track topic creation state
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
    };

    fetchTopics();
    return () => unsubscribe();
  }, []);

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

      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user`, userData);

      window.location.reload();
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
        { comment: commentData }
      );

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

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);
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

    setIsCreatingTopic(true); // Disable the "Create Topic" button

    let imageUrl = '';

    if (imageFile) {
      const reader = new FileReader();

      reader.onloadend = async () => {
        const base64 = reader.result;

        try {
          const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/topics/upload-image`, {
            file: base64
          });
          imageUrl = uploadRes.data.imageUrl;
          await createTopic(imageUrl);
        } catch (err) {
          toast.error("Image upload failed.");
          console.error(err);
          setIsCreatingTopic(false); // Re-enable the "Create Topic" button
        }
      };

      reader.readAsDataURL(imageFile);
    } else {
      await createTopic();
    }
  };

  const createTopic = async (imageUrl = '') => {
    const topicData = {
      title: newTopic.title,
      description: newTopic.description,
      userId: user.googleId,
      imageUrl
    };

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/topics`, topicData);

      if (response.status === 201) {
        setTopics((prevTopics) => [...prevTopics, response.data]);
        setShowCreateTopicModal(false);
        setNewTopic({ title: "", description: "" });
        setImageFile(null);
        setImagePreview(null);
        toast.success("Topic created successfully");
      } else {
        toast.error("Unexpected response from server. Please try again.");
      }
    } catch (error) {
      toast.error("Failed to create topic. Please try again.");
    } finally {
      setIsCreatingTopic(false); // Re-enable the "Create Topic" button
    }
  };

  const toggleComments = (topicId) => {
    setExpandedTopics(prev => ({
      ...prev,
      [topicId]: !prev[topicId],
    }));
  };

  const filteredTopics = topics.filter(topic =>
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

      {/* Create Topic Button */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-center">
        <button
          onClick={() => setShowCreateTopicModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
          disabled={isCreatingTopic} // Disable while creating topic
        >
          {isCreatingTopic ? "Creating..." : "Create Topic"}
        </button>
      </div>

      {/* Modal */}
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
              className="w-full p-3 mb-4 border border-gray-300 rounded-md text-sm"
              placeholder="Enter topic description"
              value={newTopic.description}
              onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
            />
            <div className="mb-4">
              <input
                type="file"
                accept="image/*"
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                onChange={handleImageUpload}
              />
            </div>
            <div className="flex justify-between">
              <button
                onClick={handleCreateTopic}
                className="bg-purple-600 text-white px-6 py-2 rounded-md text-sm hover:bg-purple-700 transition"
                disabled={isCreatingTopic} // Disable button while creating topic
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
            <div className="mb-4 bg-[#f0ecec]">
              <h2 className="text-2xl font-bold text-center text-purple-700 mb-2">{topic.title}</h2>
              <p className="text-gray-700 text-center italic">{topic.description}</p>
              {/* Show image only after topic creation */}
              {topic.imageUrl && <img src={topic.imageUrl} alt="Topic" className="w-full h-auto rounded-md mt-4" />}
            </div>

            <div className="pl-4 border-l-4 border-purple-300 mb-4">
              <h4 className="text-lg font-bold text-center text-gray-600 mb-2">Comments</h4>
              {visibleComments.length === 0 ? (
                <p className="text-gray-400 italic text-sm">No comments yet. Be the first!</p>
              ) : (
                visibleComments.map((comment, idx) => (
                  <div key={idx} className="text-sm text-gray-600 mb-2">
                    <p><strong>{comment.username}:</strong> {comment.text}</p>
                  </div>
                ))
              )}

              {/* Toggle Comments */}
              {topic.comments.length > 2 && (
                <button
                  onClick={() => toggleComments(topicId)}
                  className="text-purple-600 text-xs mt-2 hover:text-purple-700 transition"
                >
                  {isExpanded ? "Show Less" : `Show ${topic.comments.length - 2} More`}
                </button>
              )}
            </div>

            {/* Add New Comment */}
            <div className="mt-4">
              <textarea
                className="w-full p-3 border border-gray-300 rounded-md text-sm"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={() => handleAddComment(topicId)}
                className="bg-purple-600 text-white px-6 py-2 rounded-md text-sm mt-2 hover:bg-purple-700 transition"
              >
                Post Comment
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Forum;

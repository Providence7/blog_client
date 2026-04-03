// src/pages/Forum.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import axios from "axios";
import { auth } from "../layout/console.js";
import { MessageSquare, Search, Plus, LogOut, Image as ImageIcon, Send, X } from "lucide-react";

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
  const [isCreatingTopic, setIsCreatingTopic] = useState(false);
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
        setTopics(response.data);
      } catch (error) {
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
      const userData = {
        googleId: result.user.uid,
        email: result.user.email,
        username: result.user.displayName,
      };
      setUser(userData);
      toast.success(`Welcome ${result.user.displayName}`);
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user`, userData);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to log in with Google");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  const handleAddComment = async (topicId) => {
    if (!user) {
      toast.error("You must be logged in to comment!");
      return;
    }
    const commentData = { userId: user.googleId, username: user.username, text: newComment };
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/topics/${topicId}/comments`, { comment: commentData });
      setTopics(prev => prev.map(t => t._id === topicId ? response.data : t));
      setNewComment("");
      toast.success("Comment added!");
    } catch (error) {
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
    if (!user) return toast.error("You must be logged in!");
    if (!newTopic.title || !newTopic.description) return toast.error("Please fill in all fields!");
    setIsCreatingTopic(true);

    if (imageFile) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const uploadRes = await axios.post(`${import.meta.env.VITE_API_URL}/api/topics/upload-image`, { file: reader.result });
          await createTopic(uploadRes.data.imageUrl);
        } catch (err) {
          toast.error("Image upload failed.");
          setIsCreatingTopic(false);
        }
      };
      reader.readAsDataURL(imageFile);
    } else {
      await createTopic();
    }
  };

  const createTopic = async (imageUrl = '') => {
    try {
      const topicData = { ...newTopic, userId: user.googleId, imageUrl };
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/topics`, topicData);
      setTopics(prev => [...prev, response.data]);
      setShowCreateTopicModal(false);
      setNewTopic({ title: "", description: "" });
      setImageFile(null);
      setImagePreview(null);
      toast.success("Topic created!");
    } catch (error) {
      toast.error("Failed to create topic.");
    } finally {
      setIsCreatingTopic(false);
    }
  };

  const filteredTopics = topics.filter(topic =>
    topic.title.toLowerCase().includes(searchKeyword.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchKeyword.toLowerCase())
  );

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-24">
      {/* HEADER SECTION */}
      <div className="max-w-4xl mx-auto px-4 pt-12 pb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[#1B1B1F] mb-4">
          Syber <span className="text-[#581845]">Forum</span>
        </h1>
        <p className="text-[#B76E79] text-xs md:text-sm font-bold uppercase tracking-[0.2em] italic">
          "Bespoke conversations for the modern digital tailor."
        </p>
      </div>

      {/* TOOLBAR: SEARCH & AUTH */}
      <div className="max-w-4xl mx-auto px-4 mb-12 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B76E79]" size={18} />
          <input
            type="text"
            placeholder="Search discussions..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-[#B76E79]/10 rounded-2xl outline-none focus:border-[#D6AE7B] focus:ring-4 focus:ring-[#D6AE7B]/5 shadow-sm transition-all"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        
        {!user ? (
          <button onClick={handleGoogleLogin} className="w-full md:w-auto whitespace-nowrap bg-[#1B1B1F] text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-[#581845] transition-all active:scale-95 shadow-lg">
            Login with Google
          </button>
        ) : (
          <div className="flex items-center gap-4 bg-white p-2 pr-6 rounded-2xl border border-[#B76E79]/10 shadow-sm w-full md:w-auto">
            <div className="w-10 h-10 bg-[#D6AE7B] rounded-xl flex items-center justify-center text-[#1B1B1F] font-bold">
              {user.username.charAt(0)}
            </div>
            <button onClick={handleLogout} className="text-[#B76E79] hover:text-red-500 transition-colors">
              <LogOut size={20} />
            </button>
          </div>
        )}
      </div>

      {/* TOPICS FEED */}
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopics[topic._id];
          const visibleComments = isExpanded ? topic.comments : topic.comments.slice(0, 2);

          return (
            <div key={topic._id} className="bg-white rounded-[2.5rem] shadow-xl border border-[#B76E79]/5 overflow-hidden">
              <div className="p-8 pb-4">
                <h2 className="text-2xl font-bold text-[#581845] mb-3">{topic.title}</h2>
                <p className="text-[#1B1B1F]/70 leading-relaxed italic">{topic.description}</p>
                {topic.imageUrl && (
                  <div className="mt-6 rounded-3xl overflow-hidden border-4 border-[#FAF9F6]">
                    <img src={topic.imageUrl} alt="Topic" className="w-full object-cover max-h-96" />
                  </div>
                )}
              </div>

              {/* COMMENTS SECTION */}
              <div className="bg-[#FAF9F6] p-8 mt-4 border-t border-[#B76E79]/10">
                <div className="flex items-center gap-2 mb-6 text-[#581845]">
                  <MessageSquare size={18} />
                  <span className="text-xs font-bold uppercase tracking-widest">Community Insights</span>
                </div>

                <div className="space-y-4">
                  {visibleComments.length === 0 ? (
                    <p className="text-[#B76E79] italic text-sm py-4">No insights yet. Be the first to tailor a response.</p>
                  ) : (
                    visibleComments.map((comment, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-[#B76E79]/5">
                        <p className="text-sm text-[#1B1B1F]">
                          <span className="font-bold text-[#581845] mr-2">{comment.username}:</span> 
                          {comment.text}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {topic.comments.length > 2 && (
                  <button
                    onClick={() => setExpandedTopics(prev => ({ ...prev, [topic._id]: !prev[topic._id] }))}
                    className="text-[#D6AE7B] text-xs font-bold mt-4 hover:text-[#581845] transition-colors"
                  >
                    {isExpanded ? "View Less" : `View ${topic.comments.length - 2} more replies`}
                  </button>
                )}

                {/* ADD COMMENT INPUT */}
                <div className="mt-8 flex flex-col md:flex-row gap-3">
                  <textarea
                    className="flex-1 p-4 bg-white border border-[#B76E79]/10 rounded-2xl text-sm outline-none focus:border-[#581845] transition-all resize-none"
                    placeholder="Add to the discussion..."
                    rows="1"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    onClick={() => handleAddComment(topic._id)}
                    className="bg-[#581845] text-white p-4 rounded-2xl hover:bg-[#1B1B1F] transition-all active:scale-95 flex items-center justify-center"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* FLOATING ACTION BUTTON */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={() => setShowCreateTopicModal(true)}
          disabled={isCreatingTopic}
          className="w-16 h-16 bg-[#581845] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-90 transition-all border-4 border-white group"
        >
          {isCreatingTopic ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : <Plus size={28} className="group-hover:rotate-90 transition-transform" />}
        </button>
      </div>

      {/* CREATE TOPIC MODAL */}
      {showCreateTopicModal && (
        <div className="fixed inset-0 z-[60] flex justify-center items-center p-4">
          <div className="absolute inset-0 bg-[#1B1B1F]/60 backdrop-blur-sm" onClick={() => setShowCreateTopicModal(false)} />
          <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-md relative shadow-2xl animate-in zoom-in-95">
            <button onClick={() => setShowCreateTopicModal(false)} className="absolute top-6 right-6 text-[#B76E79] hover:text-[#1B1B1F]">
              <X size={24} />
            </button>
            
            <h2 className="text-2xl font-bold text-[#581845] mb-6">New Discussion</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Topic Title"
                className="w-full p-4 bg-[#FAF9F6] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#D6AE7B] outline-none"
                value={newTopic.title}
                onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
              />
              <textarea
                placeholder="What's on your mind?"
                className="w-full p-4 bg-[#FAF9F6] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#D6AE7B] outline-none min-h-[120px]"
                value={newTopic.description}
                onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
              />
              
              <div className="relative group">
                <input type="file" accept="image/*" id="file-upload" className="hidden" onChange={handleImageUpload} />
                <label htmlFor="file-upload" className="flex items-center gap-3 p-4 bg-[#FAF9F6] text-[#B76E79] rounded-2xl cursor-pointer hover:bg-[#D6AE7B]/10 transition-all">
                  <ImageIcon size={20} />
                  <span className="text-sm font-medium">{imageFile ? imageFile.name : "Add an image"}</span>
                </label>
              </div>

              <button
                onClick={handleCreateTopic}
                className="w-full bg-[#581845] text-white py-4 rounded-2xl font-bold mt-4 hover:bg-[#1B1B1F] transition-all shadow-lg shadow-[#581845]/20"
                disabled={isCreatingTopic}
              >
                {isCreatingTopic ? "Stitching Topic..." : "Publish Discussion"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Forum;
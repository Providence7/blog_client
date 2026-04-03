// src/pages/Admin/TopicManagement.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Trash2, MessageSquare, Layers, RefreshCcw, User, Quote } from 'lucide-react';

const TopicManagement = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTopics = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/topics`);
      setTopics(response.data);
    } catch (error) {
      toast.error('Error synchronizing topics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const deleteTopic = async (id) => {
    if (!window.confirm("This will permanently remove the entire topic and all associated discussions. Proceed?")) return;
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/topics/${id}`);
      toast.success('Topic removed from archives');
      fetchTopics();
    } catch (error) {
      toast.error('Failed to purge topic');
    }
  };

  const deleteComment = async (topicId, userId, commentText) => {
    if (!window.confirm("Remove this specific insight from the community?")) return;
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/topics/${topicId}/comments/${encodeURIComponent(userId)}/${encodeURIComponent(commentText)}`
      );
      if (response.status === 200) {
        toast.success('Comment redacted');
        fetchTopics();
      }
    } catch (error) {
      toast.error('Failed to delete comment');
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-6">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-10 bg-[#1B1B1F] p-8 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#D6AE7B] rounded-2xl text-[#1B1B1F]">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Discussion <span className="text-[#B76E79]">Archive</span></h2>
            <p className="text-[10px] text-[#D6AE7B] uppercase tracking-[0.3em] font-bold">Curate Community Insights</p>
          </div>
        </div>
        <button 
          onClick={fetchTopics}
          className="p-3 bg-white/5 text-white hover:bg-white/10 rounded-xl transition-all active:scale-95"
        >
          <RefreshCcw size={20} className={loading ? "animate-spin" : ""} />
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-4">
          <div className="w-10 h-10 border-2 border-[#581845]/20 border-t-[#581845] rounded-full animate-spin" />
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B76E79]">Accessing Database</span>
        </div>
      ) : (
        <div className="grid gap-6">
          {topics.length > 0 ? (
            topics.map((topic) => (
              <div key={topic._id} className="bg-white rounded-[2rem] border border-[#B76E79]/10 overflow-hidden shadow-xl shadow-[#581845]/5 hover:border-[#D6AE7B]/30 transition-all">
                {/* Topic Header Row */}
                <div className="bg-[#FAF9F6] px-8 py-6 flex items-center justify-between border-b border-[#B76E79]/5">
                  <div className="flex items-center gap-4">
                    <div className="w-2 h-8 bg-[#581845] rounded-full" />
                    <h3 className="text-lg font-bold text-[#1B1B1F]">{topic.title}</h3>
                    <span className="bg-[#B76E79]/10 text-[#B76E79] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-tighter">
                      {topic.comments.length} Comments
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTopic(topic._id)}
                    className="flex items-center gap-2 text-[#B76E79] hover:text-red-600 font-bold text-[10px] uppercase tracking-widest transition-colors"
                  >
                    <Trash2 size={14} /> Purge Topic
                  </button>
                </div>

                {/* Comments List */}
                <div className="p-8 space-y-4">
                  {topic.comments.length > 0 ? (
                    topic.comments.map((comment, index) => (
                      <div key={index} className="group flex items-start justify-between bg-[#FAF9F6]/50 p-5 rounded-2xl border border-transparent hover:border-[#D6AE7B]/20 transition-all">
                        <div className="flex gap-4">
                          <div className="mt-1 text-[#D6AE7B]">
                            <Quote size={16} />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[10px] font-bold text-[#581845] uppercase tracking-wider">{comment.username}</span>
                              <span className="text-[10px] text-[#B76E79]/40">ID: {comment.userId?.slice(-4)}</span>
                            </div>
                            <p className="text-sm text-[#1B1B1F]/70 leading-relaxed italic">"{comment.text}"</p>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteComment(topic._id, comment.userId, comment.text)}
                          className="opacity-0 group-hover:opacity-100 p-2 bg-white text-red-400 hover:text-red-600 rounded-lg shadow-sm transition-all"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 border-2 border-dashed border-[#B76E79]/10 rounded-2xl">
                      <p className="text-xs font-bold text-[#B76E79]/40 uppercase tracking-[0.2em]">No community insights found</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-[#B76E79]/10">
              <MessageSquare className="mx-auto text-[#B76E79]/20 mb-4" size={48} />
              <p className="text-sm font-bold text-[#B76E79] uppercase tracking-widest">Archive is empty</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TopicManagement;
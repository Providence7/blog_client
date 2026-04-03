// src/pages/Admin/CommentManagement.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Trash2, MessageSquare, Mail, ShieldAlert, RefreshCw } from "lucide-react";

const CommentManagement = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/comments`);
      setComments(response.data);
    } catch (error) {
      toast.error("Error fetching comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const deleteComment = async (slug, email) => {
    if (!window.confirm("Are you sure you want to remove this insight?")) return;

    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/api/comments/${slug}/${email}`);
      if (response.status === 200) {
        toast.success("Comment removed from feed.");
        fetchComments();
      }
    } catch (error) {
      toast.error("Deletion failed. Please try again.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 pb-20">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 bg-[#1B1B1F] p-8 rounded-[2rem] shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-[#D6AE7B] mb-2">
            <ShieldAlert size={18} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Admin Portal</span>
          </div>
          <h2 className="text-3xl font-bold text-white">Comment <span className="text-[#B76E79]">Moderation</span></h2>
        </div>
        <button 
          onClick={fetchComments}
          className="flex items-center gap-2 bg-[#581845] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#B76E79] transition-all active:scale-95"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh Feed
        </button>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#581845]/20 border-t-[#581845] rounded-full animate-spin mb-4" />
          <p className="text-[#B76E79] font-medium animate-pulse">Syncing Discussions...</p>
        </div>
      ) : (
        <div className="bg-white rounded-[2.5rem] shadow-2xl border border-[#B76E79]/10 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAF9F6] border-b border-[#B76E79]/10">
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#581845]">User Identity</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#581845]">Commentary</th>
                  <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#581845] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#FAF9F6]">
                {Array.isArray(comments) && comments.length > 0 ? (
                  comments.map((comment) => (
                    <tr key={comment._id} className="hover:bg-[#FAF9F6]/50 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-[#FAF9F6] rounded-lg text-[#B76E79]">
                            <Mail size={16} />
                          </div>
                          <span className="text-sm font-semibold text-[#1B1B1F]">{comment.email}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-start gap-3 max-w-md">
                          <div className="mt-1 text-[#D6AE7B]">
                            <MessageSquare size={14} />
                          </div>
                          <p className="text-sm text-[#1B1B1F]/70 leading-relaxed italic">
                            "{comment.comment}"
                          </p>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button
                          className="p-3 bg-[#FAF9F6] text-[#B76E79] rounded-xl hover:bg-red-50 hover:text-red-600 transition-all active:scale-90"
                          onClick={() => deleteComment(comment.postId, comment.email)}
                          title="Delete Comment"
                        >
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center opacity-30">
                        <MessageSquare size={48} className="mb-4" />
                        <p className="text-lg font-bold uppercase tracking-widest">No comments to moderate</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      {/* BOTTOM FOOTER INFO */}
      <div className="mt-6 flex items-center justify-between px-8 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B76E79]">
        <span>Syber Intelligence Systems</span>
        <span>{comments.length} Total Discussions</span>
      </div>
    </div>
  );
};

export default CommentManagement;
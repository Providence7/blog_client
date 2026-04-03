// src/components/CommentSection.jsx
import { useState, useEffect } from "react";
import { auth } from "../layout/console.js";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { toast } from "react-toastify";
import { Send, LogOut, MessageCircle, Sparkles } from "lucide-react";
import axios from "axios";

const CommentSection = ({ slug }) => {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
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
      await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/user`, userData);
      toast.success(`Welcome to the circle, ${user.displayName}`);
    } catch (error) {
      toast.error("Authentication failed");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Signed out");
    } catch (error) {
      toast.error("Logout error");
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
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

      if (!res.ok) throw new Error("Submission failed");

      const data = await res.json();
      setComments((prev) => [data.newComment, ...prev]);
      setComment("");
      toast.success("Insight shared");
    } catch (error) {
      toast.error("Could not post comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-2 bg-[#581845] text-white rounded-xl shadow-lg shadow-[#581845]/20">
          <MessageCircle size={20} />
        </div>
        <h3 className="text-2xl font-bold text-[#1B1B1F]">Conversations</h3>
        <div className="flex-1 h-[1px] bg-[#B76E79]/20" />
      </div>

      <div className="bg-white border border-[#B76E79]/10 rounded-[2.5rem] p-6 md:p-8 shadow-xl shadow-[#581845]/5">
        {user ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-[#FAF9F6] p-4 rounded-2xl border border-[#B76E79]/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#D6AE7B] rounded-xl flex items-center justify-center font-bold text-[#1B1B1F]">
                  {user.displayName?.charAt(0)}
                </div>
                <p className="text-sm font-bold text-[#1B1B1F]">
                  {user.displayName}
                </p>
              </div>
              <button onClick={handleLogout} className="text-[#B76E79] hover:text-red-500 transition-colors">
                <LogOut size={18} />
              </button>
            </div>

            <div className="relative">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add to the discussion..."
                className="w-full min-h-[120px] bg-[#FAF9F6] border-none rounded-2xl p-5 text-sm outline-none focus:ring-2 focus:ring-[#D6AE7B] transition-all resize-none text-[#1B1B1F]"
              />
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !comment.trim()}
                className="absolute bottom-4 right-4 bg-[#581845] text-white p-3 rounded-xl hover:bg-[#1B1B1F] transition-all disabled:opacity-50 active:scale-95 shadow-lg shadow-[#581845]/20"
              >
                {isSubmitting ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-8">
            <Sparkles className="mx-auto text-[#D6AE7B] mb-4" size={32} />
            <p className="text-[#B76E79] font-medium mb-6">Join the inner circle to share your insights.</p>
            <button
              onClick={handleGoogleLogin}
              className="bg-[#581845] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#1B1B1F] transition-all shadow-lg active:scale-95"
            >
              Authenticate with Google
            </button>
          </div>
        )}

        {/* COMMENTS FEED */}
        <div className="mt-12 space-y-8">
          {comments.length > 0 ? (
            comments.map((c, index) => (
              <div key={c._id || index} className="group relative pl-6">
                {/* Visual Connector Line */}
                <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D6AE7B] to-transparent rounded-full" />
                
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#581845]">
                      {c.username || c.name}
                    </span>
                    <span className="text-[10px] text-[#B76E79]/60">• JUST NOW</span>
                  </div>
                  <p className="text-[#1B1B1F] leading-relaxed text-sm md:text-base">
                    {c.comment.charAt(0).toUpperCase() + c.comment.slice(1)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-10 opacity-40">
              <p className="text-sm font-medium uppercase tracking-widest">No conversations yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentSection;
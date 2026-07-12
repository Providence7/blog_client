import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Send } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import GoogleLoginButton from "./GoogleLoginButton";

const fetchComments = async (slug) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/comments/post/${slug}`);
  return res.data;
};

const CommentSection = ({ slug }) => {
  const { currentUser } = useAuth();
  const [text, setText] = useState("");
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["comments", slug],
    queryFn: () => fetchComments(slug),
  });

  const mutation = useMutation({
    mutationFn: (desc) =>
      axios.post(`${import.meta.env.VITE_API_URL}/comments/post/${slug}`, { desc }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", slug] });
      setText("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    mutation.mutate(text);
  };

  return (
    <div className="mt-16 pt-10 border-t border-[#B76E79]/15">
      <h3
        className="text-xl font-bold text-[#581845] mb-6"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Comments {data?.length ? `(${data.length})` : ""}
      </h3>

      {currentUser ? (
        <form onSubmit={handleSubmit} className="mb-10 flex gap-3 items-start">
          <img
            src={currentUser.avatar}
            alt={currentUser.username || "You"}
            className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          />
          <div className="flex-1">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts..."
              rows={3}
              maxLength={1000}
              className="w-full rounded-2xl border border-[#B76E79]/20 p-4 text-sm focus:outline-none focus:border-[#581845] resize-none"
            />
            <div className="flex justify-end mt-2">
              <button
                type="submit"
                disabled={mutation.isPending || !text.trim()}
                className="flex items-center gap-2 bg-[#581845] text-white text-xs font-bold px-5 py-2.5 rounded-full hover:bg-[#1B1B1F] transition-all disabled:opacity-50"
              >
                <Send size={14} />
                {mutation.isPending ? "Posting..." : "Post Comment"}
              </button>
            </div>
            {mutation.isError && (
              <p className="text-red-500 text-xs mt-1">
                {mutation.error?.response?.data?.error || "Couldn't post your comment."}
              </p>
            )}
          </div>
        </form>
      ) : (
        <div className="mb-10 bg-white border border-[#B76E79]/10 rounded-2xl p-6 text-center">
          <p className="text-sm text-[#1B1B1F]/60 mb-4">Sign in with Google to join the conversation.</p>
          <div className="flex justify-center">
            <GoogleLoginButton />
          </div>
        </div>
      )}

      {isPending && <p className="text-sm text-[#1B1B1F]/50">Loading comments...</p>}
      {error && <p className="text-sm text-red-500">Couldn't load comments.</p>}

      <div className="space-y-6">
        {data?.map((comment) => (
          <div key={comment._id} className="flex gap-3">
            <img
              src={comment.user?.avatar}
              alt={comment.user?.username || "Deleted user"}
              className="w-9 h-9 rounded-full object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-[#1B1B1F]">
                  {comment.user?.username || "Deleted user"}
                </span>
                <span className="text-[10px] text-[#B76E79]">{format(comment.createdAt)}</span>
              </div>
              <p className="text-sm text-[#1B1B1F]/80 mt-1 leading-relaxed">{comment.desc}</p>
            </div>
          </div>
        ))}
        {data?.length === 0 && (
          <p className="text-sm text-[#1B1B1F]/40 italic">
            No comments yet. Be the first to share your thoughts.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommentSection;
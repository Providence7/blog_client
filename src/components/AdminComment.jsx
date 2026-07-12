import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Trash2 } from "lucide-react";

// This page assumes it's already rendered inside your existing admin-protected
// layout/route — it does not check for admin access itself. Make sure your
// backend /admin/* routes are behind your own admin auth middleware too
// (see backend/routes/admin.route.js).

const API = import.meta.env.VITE_API_URL;

const fetchAllComments = async (page) => {
  const res = await axios.get(`${API}/api/admin/comments?page=${page}&limit=20`);
  return res.data;
};

const AdminComments = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["admin-comments", page],
    queryFn: () => fetchAllComments(page),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API}/api/admin/comments/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-comments"] }),
  });

  if (isPending) return <p className="p-8">Loading comments...</p>;
  if (error) return <p className="p-8 text-red-500">Failed to load comments.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-[#581845] mb-6">Manage Comments</h1>
      <div className="space-y-4">
        {data.comments.map((c) => (
          <div
            key={c._id}
            className="bg-white border border-[#B76E79]/10 rounded-xl p-4 flex justify-between items-start gap-4"
          >
            <div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-bold">{c.user?.username || "Deleted user"}</span>
                <span className="text-[#B76E79] text-xs">{c.user?.email}</span>
                <span className="text-[10px] text-[#1B1B1F]/40">{format(c.createdAt)}</span>
              </div>
              <p className="text-sm mt-1 text-[#1B1B1F]/80">{c.desc}</p>
              <p className="text-[10px] text-[#1B1B1F]/40 mt-1">On post: {c.postSlug}</p>
            </div>
            <button
              onClick={() => deleteMutation.mutate(c._id)}
              className="text-[#B76E79] hover:text-red-500"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-3 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 text-sm rounded-full border disabled:opacity-40"
        >
          Previous
        </button>
        <button
          disabled={!data.hasMore}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 text-sm rounded-full border disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default AdminComments;
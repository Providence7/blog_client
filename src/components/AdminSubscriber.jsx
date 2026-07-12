import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "timeago.js";
import { Trash2 } from "lucide-react";

const API = import.meta.env.VITE_API_URL;

const fetchSubscribers = async (page) => {
  const res = await axios.get(`${API}/api/admin/subscribers?page=${page}&limit=20`);
  return res.data;
};

const AdminSubscribers = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["admin-subscribers", page],
    queryFn: () => fetchSubscribers(page),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API}/api/admin/subscribers/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-subscribers"] }),
  });

  if (isPending) return <p className="p-8">Loading subscribers...</p>;
  if (error) return <p className="p-8 text-red-500">Failed to load subscribers.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#581845] mb-6">Newsletter Subscribers</h1>
      <div className="space-y-3">
        {data.subscribers.map((s) => (
          <div
            key={s._id}
            className="bg-white border border-[#B76E79]/10 rounded-xl p-4 flex justify-between items-center gap-4"
          >
            <div>
              <p className="font-bold text-sm text-[#1B1B1F]">{s.email}</p>
              <p className="text-[10px] text-[#1B1B1F]/40 mt-0.5">
                Subscribed {format(s.createdAt)}
              </p>
            </div>
            <button
              onClick={() => {
                if (confirm(`Remove ${s.email} from the newsletter list?`)) {
                  deleteMutation.mutate(s._id);
                }
              }}
              className="text-[#B76E79] hover:text-red-500"
              title="Remove subscriber"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
        {data.subscribers.length === 0 && (
          <p className="text-sm text-[#1B1B1F]/40 italic">No subscribers yet.</p>
        )}
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

export default AdminSubscribers;
import { useState } from "react";
import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Ban, Trash2 } from "lucide-react";

// This page assumes it's already rendered inside your existing admin-protected
// layout/route. Admin accounts are managed by your separate admin login system —
// this only moderates the Google-authenticated commenters (ban / delete).

const API = import.meta.env.VITE_API_URL;

const fetchAllUsers = async (page) => {
  const res = await axios.get(`${API}/api/admin/commenters?page=${page}&limit=20`);
  return res.data;
};

const AdminUsers = () => {
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { isPending, error, data } = useQuery({
    queryKey: ["admin-users", page],
    queryFn: () => fetchAllUsers(page),
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["admin-users"] });

  const banMutation = useMutation({
    mutationFn: (id) => axios.patch(`${API}/api/admin/commenters/${id}/ban`, {}),
    onSuccess: invalidate,
  });
  const deleteMutation = useMutation({
    mutationFn: (id) => axios.delete(`${API}/api/admin/commenters/${id}`),
    onSuccess: invalidate,
  });

  if (isPending) return <p className="p-8">Loading users...</p>;
  if (error) return <p className="p-8 text-red-500">Failed to load users.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-[#581845] mb-6">Manage Commenters</h1>
      <div className="space-y-3">
        {data.users.map((u) => (
          <div
            key={u._id}
            className="bg-white border border-[#B76E79]/10 rounded-xl p-4 flex justify-between items-center gap-4"
          >
            <div className="flex items-center gap-3">
              <img src={u.avatar} className="w-10 h-10 rounded-full object-cover" />
              <div>
                <p className="font-bold text-sm flex items-center gap-1">
                  {u.username}
                  {u.isBanned && <span className="text-[10px] text-red-500 font-bold ml-1">BANNED</span>}
                </p>
                <p className="text-xs text-[#1B1B1F]/50">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => banMutation.mutate(u._id)}
                title={u.isBanned ? "Unban user" : "Ban user"}
                className="p-2 rounded-full border text-[#B76E79] hover:bg-[#B76E79] hover:text-white transition-all"
              >
                <Ban size={14} />
              </button>
              <button
                onClick={() => {
                  if (confirm(`Delete ${u.username} and all their comments?`)) {
                    deleteMutation.mutate(u._id);
                  }
                }}
                title="Delete user"
                className="p-2 rounded-full border text-red-500 hover:bg-red-500 hover:text-white transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
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

export default AdminUsers;
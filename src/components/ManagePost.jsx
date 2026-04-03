// src/pages/Admin/ManagePosts.jsx
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Edit3, Trash2, Loader2, FileText, Plus, ExternalLink } from "lucide-react";

const ManagePosts = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts?limit=100`);
      return res.data.posts || [];
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      return axios.delete(`${import.meta.env.VITE_API_URL}/posts/${id}`);
    },
    onSuccess: () => {
      toast.success("Manuscript removed from archives.");
      refetch();
    },
  });

  if (isLoading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      <Loader2 className="animate-spin text-[#581845] mb-4" size={32} />
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B76E79]">Syncing Archives...</p>
    </div>
  );

  if (isError) return (
    <div className="p-8 text-center bg-red-50 rounded-[2rem] border border-red-100">
      <p className="text-red-600 font-bold">Error: {error.message}</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 bg-[#1B1B1F] p-8 rounded-[2.5rem] shadow-2xl">
        <div>
          <div className="flex items-center gap-2 text-[#D6AE7B] mb-2">
            <FileText size={18} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Content Inventory</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Manage <span className="text-[#B76E79]">Posts</span></h1>
        </div>
        <Link 
          to="/write" 
          className="flex items-center gap-2 bg-[#581845] hover:bg-[#B76E79] text-white px-6 py-3 rounded-xl font-bold text-sm transition-all active:scale-95 shadow-lg shadow-[#581845]/20"
        >
          <Plus size={18} /> New Publication
        </Link>
      </div>

      {/* TABLE CONTAINER */}
      <div className="bg-white rounded-[2.5rem] shadow-xl border border-[#B76E79]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-[#B76E79]/10">
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#581845]">Title & Identity</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#581845]">Classification</th>
                <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-widest text-[#581845] text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF9F6]">
              {data.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center opacity-40">
                    <p className="text-sm font-bold uppercase tracking-widest">No manuscripts found.</p>
                  </td>
                </tr>
              ) : (
                data.map((post) => (
                  <tr key={post._id} className="group hover:bg-[#FAF9F6]/50 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#1B1B1F] group-hover:text-[#581845] transition-colors line-clamp-1">
                          {post.title}
                        </span>
                        <span className="text-[10px] text-[#B76E79] mt-1 font-medium italic">
                          Slug: {post.slug}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <span className="bg-[#FAF9F6] text-[#B76E79] text-[10px] font-bold px-3 py-1.5 rounded-lg border border-[#B76E79]/10 uppercase tracking-tighter">
                        {post.category || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          to={`/posts/${post.slug}`} 
                          target="_blank"
                          className="p-2.5 text-[#B76E79] hover:bg-white rounded-xl hover:shadow-sm transition-all"
                        >
                          <ExternalLink size={16} />
                        </Link>
                        <Link 
                          to={`/admin/edit/${post.slug}`} 
                          className="p-2.5 bg-white border border-[#B76E79]/20 text-[#581845] rounded-xl hover:bg-[#581845] hover:text-white transition-all shadow-sm"
                        >
                          <Edit3 size={16} />
                        </Link>
                        <button
                          disabled={deleteMutation.isLoading}
                          className="p-2.5 bg-white border border-red-100 text-red-400 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm disabled:opacity-30"
                          onClick={() => {
                            if(window.confirm("Remove this publication permanently?")) {
                                deleteMutation.mutate(post._id);
                            }
                          }}
                        >
                          {deleteMutation.isLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                          ) : (
                            <Trash2 size={16} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="mt-6 flex justify-between px-8 text-[10px] font-bold uppercase tracking-widest text-[#B76E79]">
        <span>Syber Content Management</span>
        <span>Total Articles: {data.length}</span>
      </div>
    </div>
  );
};

export default ManagePosts;
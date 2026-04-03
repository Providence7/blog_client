// src/pages/Admin/UsersList.jsx
import React, { useEffect, useState } from "react";
import { Users, Mail, ShieldCheck, Loader2 } from "lucide-react";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/users`);
        const data = await response.json();
        if (data.success) {
          setUsers(data.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[300px] space-y-4">
      <Loader2 className="animate-spin text-[#581845]" size={32} />
      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#B76E79]">Syncing Member Directory</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      {/* HEADER SECTION */}
      <div className="flex items-center gap-4 mb-8 bg-[#1B1B1F] p-6 rounded-[2rem] shadow-xl">
        <div className="p-3 bg-[#D6AE7B] rounded-xl text-[#1B1B1F]">
          <Users size={20} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white tracking-tight">Studio <span className="text-[#B76E79]">Members</span></h2>
          <p className="text-[10px] text-[#D6AE7B] uppercase tracking-[0.3em] font-bold">Manage Community Access</p>
        </div>
      </div>

      {/* DIRECTORY TABLE */}
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-[#581845]/5 border border-[#B76E79]/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#FAF9F6] border-b border-[#B76E79]/10">
                <th className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-[#581845]">Identity</th>
                <th className="px-8 py-5 text-left text-[10px] font-bold uppercase tracking-widest text-[#581845]">Contact Detail</th>
                <th className="px-8 py-5 text-right text-[10px] font-bold uppercase tracking-widest text-[#581845]">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#FAF9F6]">
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id} className="group hover:bg-[#FAF9F6]/50 transition-colors">
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#581845] flex items-center justify-center text-[#D6AE7B] font-bold text-xs shadow-inner">
                          {user.username?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-bold text-[#1B1B1F] group-hover:text-[#581845] transition-colors">
                          {user.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2 text-sm text-[#B76E79]">
                        <Mail size={14} className="opacity-60" />
                        <span className="font-medium italic">{user.email}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-green-600 text-[10px] font-bold uppercase tracking-tighter">
                        <ShieldCheck size={12} /> Active
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-8 py-20 text-center">
                    <p className="text-xs font-bold text-[#B76E79]/40 uppercase tracking-[0.3em]">No studio members found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* FOOTER STATS */}
      <div className="mt-6 flex justify-between px-8 text-[9px] font-bold uppercase tracking-[0.4em] text-[#B76E79]/50">
        <span>Syber Access Control</span>
        <span>Total Registered: {users.length}</span>
      </div>
    </div>
  );
};

export default UsersList;
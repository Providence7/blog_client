// src/pages/Admin/Dashboard.jsx
import { useEffect, useState } from "react";
import { FileText, Users, MessageSquare, LayoutDashboard, Calendar, ArrowUpRight } from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dashboard-stats`);
        const data = await response.json();
        
        if (data.success) {
          setStats(data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-12 h-12 border-4 border-[#581845]/10 border-t-[#581845] rounded-full animate-spin mb-4" />
        <p className="text-[#B76E79] font-bold uppercase tracking-widest text-xs">Assembling Intelligence...</p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="p-8 text-center text-[#581845] bg-[#B76E79]/10 rounded-3xl">
        <p className="font-bold">System Offline: Failed to synchronize dashboard statistics.</p>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8 bg-[#FAF9F6] min-h-screen">
      {/* HEADER AREA */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#581845] mb-1">
            <LayoutDashboard size={18} />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Command Center</span>
          </div>
          <h1 className="text-3xl font-bold text-[#1B1B1F]">Network <span className="text-[#D6AE7B]">Overview</span></h1>
        </div>
        
        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-2xl shadow-sm border border-[#B76E79]/10">
          <Calendar size={16} className="text-[#B76E79]" />
          <span className="text-sm font-bold text-[#1B1B1F]">
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </span>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Publications" 
          count={stats.totalPosts} 
          icon={<FileText size={24} />} 
          color="bg-[#581845]" 
          accent="text-[#581845]"
        />
        <StatCard 
          title="Active Members" 
          count={stats.totalUsers} 
          icon={<Users size={24} />} 
          color="bg-[#D6AE7B]" 
          accent="text-[#D6AE7B]"
        />
        <StatCard 
          title="Community Insights" 
          count={stats.totalComments} 
          icon={<MessageSquare size={24} />} 
          color="bg-[#B76E79]" 
          accent="text-[#B76E79]"
        />
      </div>

      {/* RECENT ACTIVITY PLACEHOLDER (Optional visual flair) */}
      <div className="bg-white p-8 rounded-[2.5rem] border border-[#B76E79]/5 shadow-xl shadow-[#581845]/5">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-[#1B1B1F] text-lg">System Health</h3>
          <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest bg-green-50 px-3 py-1 rounded-full">Operational</span>
        </div>
        <div className="h-2 w-full bg-[#FAF9F6] rounded-full overflow-hidden">
          <div className="h-full bg-[#581845] w-[85%] rounded-full" />
        </div>
        <p className="mt-4 text-xs text-[#B76E79] font-medium italic">
          Database synchronization is currently at 85% capacity. All systems functional.
        </p>
      </div>
    </div>
  );
};

const StatCard = ({ title, count, icon, color, accent }) => {
  return (
    <div className="group bg-white p-8 rounded-[2.5rem] shadow-xl shadow-[#581845]/5 border border-[#B76E79]/10 transition-all duration-300 hover:-translate-y-2 hover:border-[#D6AE7B]/40 relative overflow-hidden">
      {/* Decorative Background Icon */}
      <div className={`absolute -right-4 -bottom-4 opacity-[0.03] ${accent} transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12`}>
        {icon}
      </div>

      <div className="flex items-start justify-between relative z-10">
        <div className={`p-4 ${color} text-white rounded-2xl shadow-lg`}>
          {icon}
        </div>
        <ArrowUpRight className="text-[#B76E79] opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
      </div>

      <div className="mt-8 relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B76E79] mb-1">{title}</p>
        <h3 className="text-4xl font-bold text-[#1B1B1F] tracking-tighter">
          {count.toLocaleString()}
        </h3>
      </div>
    </div>
  );
};

export default Dashboard;
import { useEffect, useState } from "react";
import axios from "axios";
import { FiFileText, FiUser, FiMessageSquare, FiEye } from "react-icons/fi";

const Dashboard = () => {
    const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/admin/dashboard-stats`);
          const text = await response.text();  // Get raw response
      
          console.log("Raw API Response:", text);
      
          // Attempt to parse JSON
          const data = JSON.parse(text);
          
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
    return <p>Loading stats...</p>;
  }

  if (!stats) {
    return <p>Failed to load stats.</p>;
  }


  return (
    <div className="p-6 bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Posts" count={stats.totalPosts} icon={<FiFileText />} />
      <StatCard title="Total Users" count={stats.totalUsers} icon={<FiUser />} />
      <StatCard title="Total Comments" count={stats.totalComments} icon={<FiMessageSquare />} />
    </div>
  );
};

const StatCard = ({ title, count, icon }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg flex items-center gap-4 shadow">
      <div className="text-2xl text-gray-700">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-xl font-bold">{count}</p>
      </div>
    </div>
  );
};

export default Dashboard;

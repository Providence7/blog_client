import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FiMenu, FiX, FiHome, FiUser, FiFileText, FiLogOut, FiFilePlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from '../context/AuthContext'; // Adjust the path to AuthContext if necessary

const AdminLayout = () => {
            const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const navigate = useNavigate();
  const { logout } = useAuth(); // Make sure this is inside the functional component

  const handleLogout = async () => {
    try {
      // Call the backend to clear the session
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/logout`, {}, { withCredentials: true });

      // Call the logout function from the context
      logout();

      // Show a success message
      toast.success("Logged out successfully");

      // Redirect to login page
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside
        className={`bg-gray-800 text-white w-64 flex flex-col p-5 space-y-4 fixed h-full transition-all ${
          sidebarOpen ? "translate-x-0" : "-translate-x-80"
        } md:translate-x-0 md:w-64`}
      >
        <button className="text-white text-xl md:hidden" onClick={() => setSidebarOpen(false)}>
          <FiX />
        </button>
        <h2 className="text-xl font-bold">Admin Dashboard</h2>
        <nav className="flex flex-col space-y-4">
          <Link to="/admin/dashboard" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
            <FiHome /> Dashboard
          </Link>
          <Link to="/admin/write" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
            <FiFilePlus /> Create post
          </Link>
          <Link to="/admin/manage" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
            <FiFileText /> Manage Posts
          </Link>
           <Link to="/admin/users" className="flex items-center gap-2 p-2 hover:bg-gray-700 rounded">
            <FiUser /> Users
          </Link>
          <button onClick={handleLogout}  className="flex items-center gap-2 p-2 hover:bg-red-600 rounded mt-auto">
            <FiLogOut /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-64">
        <header className="bg-white shadow-md p-4 flex items-center justify-between">
          <button className="md:hidden text-2xl" onClick={() => setSidebarOpen(true)}>
            <FiMenu />
          </button>
          <h2 className="text-lg font-semibold">Admin Panel</h2>
        </header>

        {/* Outlet for Nested Routes */}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;

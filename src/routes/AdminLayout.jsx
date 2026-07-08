import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FiMenu, FiX, FiFileText, FiLogOut, FiFilePlus } from "react-icons/fi";
import { LayoutDashboard, Palette, Layers } from "lucide-react";
import { useAuth } from "../context/AuthContext"; // Adjust the path to AuthContext if necessary

const NAV_ITEMS = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/write", label: "Create Post", icon: FiFilePlus },
  { to: "/admin/manage", label: "Manage Posts", icon: FiFileText },
 
];

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/admin/logout`, {}, { withCredentials: true });
      logout();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex bg-[#FAF9F6] min-h-screen">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-[#1B1B1F]/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`bg-[#1B1B1F] text-white w-72 flex flex-col p-6 fixed h-full z-40 transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="flex items-center justify-between mb-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D6AE7B] mb-1">Attirebyte</p>
            <h2 className="text-xl font-bold" style={{ fontFamily: "Georgia, serif" }}>Admin Panel</h2>
          </div>
          <button
            className="text-white/60 hover:text-white text-xl md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <FiX />
          </button>
        </div>

        <nav className="flex flex-col gap-1 flex-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[#581845] text-white font-bold"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-white/60 hover:bg-red-500/10 hover:text-red-400 transition-colors mt-2"
        >
          <FiLogOut size={18} /> Logout
        </button>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col md:ml-72 min-w-0">
        <header className="bg-white border-b border-[#B76E79]/10 p-4 flex items-center gap-4 sticky top-0 z-20">
          <button
            className="md:hidden text-2xl text-[#1B1B1F]"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <FiMenu />
          </button>
          <h2 className="text-sm font-bold uppercase tracking-widest text-[#581845]">Admin Panel</h2>
        </header>

        {/* Outlet for Nested Routes */}
        <main className="flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
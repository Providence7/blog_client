import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./layout/AuthContext.jsx"; // Import AuthProvider

// Import Routes & Layouts
import PostListPage from "./routes/PostListPage.jsx";
import SinglePost from "./routes/SinglePostPage.jsx";
import About from "./routes/About.jsx";
import Write from "./routes/Write.jsx";
import Homepage from "./routes/Homepage.jsx";
import Mainlayout from "./layout/Mainlayout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import UsersList from "./components/Users.jsx";
import AdminLogin from "./routes/Login.jsx";
import AdminRegister from "./routes/Register.jsx";
import AdminLayout from "./routes/AdminLayout.jsx";
import Habi from "./routes/Habi.jsx";

import ManagePosts from "./components/ManagePost.jsx";
import Edit from "./components/Edit.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    element: <Mainlayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/about", element: <About /> },
      { path: "/posts", element: <PostListPage /> },
      { path: "/login", element: <AdminLogin /> },
      { path: "/register", element: <AdminRegister /> },
      { path: "/:slug", element: <SinglePost /> },
      { path: "/write", element: <Write /> },
      
      // ✅ Protect Admin Routes
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "/admin/dashboard", element: <Dashboard /> }, // Default admin page
      { path: "/admin/write", element: <Write /> },

          { path: "/admin/manage", element: <ManagePosts /> },
         {path : "/admin/edit/:slug", element : <Edit />} ,
          { path: "/admin/users", element: <UsersList /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* ✅ Wrap everything inside AuthProvider */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>
);

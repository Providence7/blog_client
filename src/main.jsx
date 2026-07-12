import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { AuthProvider } from "./context/AuthContext.jsx"; // Google auth (commenters)
import { AdminAuthProvider } from "./context/AdminAuthContext.jsx"; // Admin auth (separate)
import ProtectedRoute from "./components/ProtectedRoute"; // adjust path if needed

// Import Routes & Layouts
import PostListPage from "./routes/PostListPage.jsx";
import SinglePost from "./routes/SinglePostPage.jsx";
import About from "./routes/About.jsx";
import Write from "./routes/Write.jsx";
import Homepage from "./routes/Homepage.jsx";
import Mainlayout from "./layout/Mainlayout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import AdminLogin from "./routes/Login.jsx";
import AdminRegister from "./routes/Register.jsx";
import AdminLayout from "./routes/AdminLayout.jsx";
import ManagePosts from "./components/ManagePost.jsx";
import Edit from "./components/Edit.jsx";
import AdminComments from "./components/AdminComment.jsx";
import AdminUsers from "./components/AdminUser.jsx";
import AdminSubscribers from "./components/AdminSubscriber.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  // Public routes using Mainlayout
  {
    element: <Mainlayout />,
    children: [
      { path: "/", element: <Homepage /> },
      { path: "/about", element: <About /> },
      { path: "/posts", element: <PostListPage /> },
      { path: "/login", element: <AdminLogin /> },
      { path: "/register", element: <AdminRegister /> },
      { path: "/:slug", element: <SinglePost /> },
    ],
  },

  // Protected admin routes, not using Mainlayout
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { index: true, element: <Dashboard /> },
          { path: "dashboard", element: <Dashboard /> },
          { path: "write", element: <Write /> },
          { path: "manage", element: <ManagePosts /> },
          { path: "edit/:slug", element: <Edit /> },
          { path: "comments", element: <AdminComments /> },
          { path: "users", element: <AdminUsers /> },
          { path: "subscribers", element: <AdminSubscribers /> },
        ],
      },
    ],
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <AdminAuthProvider>
        <AuthProvider> {/* 👈 This must wrap everything */}
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ToastContainer position="bottom-right" />
          </QueryClientProvider>
        </AuthProvider>
      </AdminAuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);

// Service Worker Registration
if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("/service-worker.js")
    .then((registration) => {
      console.log("Service Worker Registered ✅", registration);
    })
    .catch((error) => {
      console.error("Service Worker Registration Failed ❌", error);
    });
}

// Install Prompt Logic
// Main.jsx

let deferredPrompt;
const installButton = document.getElementById('install-button');

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser prompt
  event.preventDefault();
  deferredPrompt = event;

  // Show custom install button
  installButton.style.display = 'block';

  installButton.addEventListener('click', () => {
    // Trigger the installation prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }
      // Reset the deferred prompt
      deferredPrompt = null;
      installButton.style.display = 'none'; // Optionally hide the button after prompt is shown
    });
  });
});

// Check if the app is installed
if (window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone) {
  installButton.style.display = 'none';  // Hide the install button if app is already installed
}
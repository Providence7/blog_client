import { StrictMode, useEffect } from "react";
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
import ManagePosts from "./components/ManagePost.jsx";
import Edit from "./components/Edit.jsx";
import Forum from "./routes/Forum.jsx";

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
      { path: "forum", element: <Forum /> },

      // ✅ Protect Admin Routes
      {
        path: "/admin",
        element: <AdminLayout />,
        children: [
          { path: "/admin/dashboard", element: <Dashboard /> }, // Default admin page
          { path: "/admin/write", element: <Write /> },
          { path: "/admin/manage", element: <ManagePosts /> },
          { path: "/admin/edit/:slug", element: <Edit /> },
          { path: "/admin/users", element: <UsersList /> },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    </AuthProvider>
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

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//import App from './App.jsx'
import {createBrowserRouter,RouterProvider } from "react-router-dom"
import PostListPage from "../src/routes/PostListPage.jsx"
import SinglePost from "../src/routes/SinglePostPage.jsx"
import About from "../src/routes/About.jsx"
import Write from "../src/routes/Write.jsx"
// import Login from "../src/routes/Login.jsx"
// import Register from "../src/routes/Register.jsx"
import Homepage from "../src/routes/Homepage.jsx"
import Mainlayout from './layout/Mainlayout.jsx'
// import  {ClerkProvider}  from "@clerk/clerk-react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Habi from './routes/Habi.jsx'
const queryClient = new QueryClient();
// Import your Publishable Key

// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
//   throw new Error("Missing Publishable Key")
// }



const router = createBrowserRouter([
 {
  element : <Mainlayout />,
  children : [
    {
      path :"/",
      element : <Homepage />
    },
    {
      path : "/about",
      element: <About />
    }
    // ,
    // {
    //   path : "/login",
    //   element: <Login />
    // }
    // ,
    // {
    //   path : "/register",
    //   element: <Register />
    // }
    ,
    {
      path : "/posts",
      element: <PostListPage />
    }
    ,
    {
      path : "/:slug",
      element: <SinglePost />
     }
    ,
    {
      path : "/habi",
      element: <Habi />
    }
    // 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
    ,
    {
      path : "/write",
      element: <Write />
    }
  ]
 }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
 {/* <ClerkProvider publishableKey={PUBLISHABLE_KEY}> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer position="bottom-right" />
      </QueryClientProvider>
    {/* </ClerkProvider> */}
</StrictMode>
 
)

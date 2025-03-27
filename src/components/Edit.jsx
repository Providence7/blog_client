import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Upload from "../components/Upload"; 

const Edit = () => {
  const { slug } = useParams(); // Get post slug from URL
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [desc, setDesc] = useState("");
  const [content, setContent] = useState("");
  const [cover, setCover] = useState(""); 
  const [progress, setProgress] = useState(0);

  // ✅ Corrected: Fetch post using slug
  const { data: post, isLoading } = useQuery({
    
    queryKey: ["post", slug],
    queryFn: async () => {
      const res =await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
      return res.data;
    },
    
    onSuccess: (data) => {
      setTitle(data.title);
      setCategory(data.category);
      setDesc(data.desc);
      setContent(data.content);
      setCover(data.img);
    },
  });

  // ✅ Corrected: Use slug for updating post
  const mutation = useMutation({
    mutationFn: async (updatedPost) => {
        return axios.put(`${import.meta.env.VITE_API_URL}/posts/${post?.slug}`, updatedPost, {
            headers: { "Content-Type": "application/json" },
          });
    },
    onSuccess: () => {
      toast.success("Post updated successfully");
      navigate("/admin"); // Redirect back to dashboard
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedPost = {
      title,
      category,
      desc,
      content,
      img: cover?.filePath || post?.img || "",
    };

    if (!title || !category || !desc || !content) {
      toast.error("All fields are required!");
      return;
    }

    mutation.mutate(updatedPost);
  };

  if (isLoading) return <p>Loading post...</p>;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col gap-6">
      <h1 className="text-xl font-light">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Cover Image Upload */}
        <Upload type="image" setProgress={setProgress} setData={setCover}>
          <button className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Change Cover Image
          </button>
        </Upload>

        <input
          className="text-2xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <div className="flex items-center gap-4">
          <label className="text-sm">Category:</label>
          <select
            className="p-2 rounded-xl bg-white shadow-md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="spot">Spotlight</option>
            <option value="tailor">Tailoring</option>
            <option value="tread">Treads</option>
            <option value="story">Stories</option>
          </select>
        </div>

        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          placeholder="Short Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />

        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          className="rounded-xl bg-white shadow-md"
        />

        <button
          disabled={mutation.isPending || (0 < progress && progress < 100)}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default Edit;

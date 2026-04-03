// src/pages/Write.jsx
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IoImageOutline, IoVideocamOutline, IoAddCircleOutline } from "react-icons/io5";
import Upload from "../components/Upload";

const Write = () => {
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const quillRef = useRef();
  const navigate = useNavigate();

  // Optimized Image Insertion
  useEffect(() => {
    if (img?.url) {
      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection(true);
      quill.insertEmbed(range.index, "image", img.url);
      quill.setSelection(range.index + 1);
    }
  }, [img]);

  // Optimized Video Insertion
  useEffect(() => {
    if (video?.url) {
      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection(true);
      quill.insertEmbed(range.index, "video", video.url);
      quill.setSelection(range.index + 1);
    }
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost);
    },
    onSuccess: (res) => {
      toast.success("Post published successfully!");
      navigate(`/${res.data.slug}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading) return toast.warning("Upload in progress...");

    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title"),
      category: formData.get("category"),
      desc: formData.get("desc"),
      content: value,
      img: cover?.filePath || "",
    };

    if (!data.title || !data.content) return toast.error("Title and Content are required!");
    mutation.mutate(data);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mb-24 transition-all duration-300">
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Cover Image Section */}
        <div className="group relative w-full h-48 md:h-64 bg-gray-50 border-2 border-dashed border-gray-200 rounded-3xl overflow-hidden flex items-center justify-center">
          {cover?.url ? (
            <img src={cover.url} className="w-full h-full object-cover" alt="Cover" />
          ) : (
            <Upload type="image" setProgress={setProgress} setData={setCover} setIsUploading={setIsUploading}>
              <div className="flex flex-col items-center cursor-pointer text-gray-400 group-hover:text-[#581845]">
                <IoImageOutline size={40} />
                <span className="text-sm font-medium mt-2">Add Cover Photo</span>
              </div>
            </Upload>
          )}
        </div>

        {/* Title Input */}
        <input
          name="title"
          type="text"
          placeholder="Enter Title..."
          className="text-3xl md:text-5xl font-bold bg-transparent outline-none placeholder:text-gray-200 text-gray-800"
        />

        {/* Category & Meta Section */}
        <div className="flex flex-wrap items-center gap-4 py-4 border-y border-gray-100">
          <select name="category" className="bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold outline-none focus:ring-2 focus:ring-[#581845]/20">
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="tailor">Tailoring</option>
            <option value="story">Stories</option>
          </select>
          <input 
            name="desc"
            placeholder="Short excerpt..."
            className="flex-1 bg-transparent text-sm text-gray-500 outline-none"
          />
        </div>

        {/* Editor Area */}
        <div className="relative min-h-[400px]">
          {/* Floating Media Bar */}
          <div className="absolute -left-2 md:-left-12 top-0 flex flex-col gap-2 z-10">
            <Upload type="image" setProgress={setProgress} setData={setImg} setIsUploading={setIsUploading}>
              <button type="button" title="Insert Image" className="p-2 bg-white shadow-md rounded-full text-gray-500 hover:text-[#581845] transition-colors">
                <IoImageOutline size={20} />
              </button>
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo} setIsUploading={setIsUploading}>
              <button type="button" title="Insert Video" className="p-2 bg-white shadow-md rounded-full text-gray-500 hover:text-[#581845] transition-colors">
                <IoVideocamOutline size={20} />
              </button>
            </Upload>
          </div>

          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Tell your story..."
            className="write-quill text-lg h-auto"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike", "blockquote"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["link", "clean"],
              ],
            }}
          />
        </div>

        {/* Footer Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md border-t border-gray-100 p-4 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-[#581845] transition-all" style={{ width: `${progress}%` }} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                {progress > 0 && progress < 100 ? `Uploading ${progress}%` : "Ready"}
              </span>
            </div>
            
            <button
              disabled={mutation.isPending || isUploading}
              className="bg-[#581845] text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-[#581845]/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
            >
              {mutation.isPending ? "Publishing..." : "Publish Post"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Write;
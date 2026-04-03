// src/pages/EditPost.jsx
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Upload from "../components/Upload";
import { Save, Image as ImageIcon, ChevronLeft, Type, Layout } from "lucide-react";

const EditPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [value, setValue] = useState("");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/posts/${slug}`);
        setPost(data);
        setValue(data.content);
        setCover({ filePath: data.img });
      } catch (error) {
        toast.error("Error fetching post data");
      }
    };
    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      title: formData.get("title") || "",
      category: formData.get("category") || "",
      desc: formData.get("desc") || "",
      content: value || "",
      img: cover?.filePath || "",
    };

    if (!data.title || !data.category || !data.desc || !data.content) {
      toast.error("Every detail matters. Please fill all fields.");
      return;
    }

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/posts/${slug}`, data);
      toast.success("Manuscript updated successfully");
      navigate(`/posts`);
    } catch (error) {
      toast.error("Error saving changes");
    }
  };

  if (!post) return (
    <div className="flex items-center justify-center h-screen bg-[#FAF9F6]">
      <div className="animate-pulse text-[#581845] font-bold tracking-widest uppercase text-xs">Opening Atelier...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF9F6] pb-12">
      {/* TOP NAV BAR */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-[#B76E79]/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-[#B76E79] hover:text-[#581845] transition-colors text-sm font-bold">
            <ChevronLeft size={18} /> BACK
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B76E79]">Editorial Mode</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* LEFT COLUMN: PRIMARY CONTENT */}
        <div className="lg:col-span-2 space-y-8">
          <input
            className="w-full text-5xl font-bold bg-transparent outline-none text-[#1B1B1F] placeholder:opacity-20"
            type="text"
            placeholder="Article Title"
            name="title"
            defaultValue={post.title}
          />

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#B76E79]">
              <Type size={14} /> Abstract
            </label>
            <textarea
              className="w-full p-6 rounded-[2rem] bg-white border border-[#B76E79]/10 shadow-xl shadow-[#581845]/5 outline-none focus:border-[#D6AE7B] transition-all italic text-[#1B1B1F]/70"
              name="desc"
              placeholder="A short summary for the readers..."
              defaultValue={post.desc}
              rows="3"
            />
          </div>

          <div className="space-y-4">
             <label className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#B76E79]">
              Creative Body
            </label>
            <ReactQuill
              theme="snow"
              className="bg-white rounded-[2rem] shadow-xl border-none overflow-hidden custom-quill-editor"
              value={value}
              onChange={setValue}
              readOnly={progress > 0 && progress < 100}
            />
          </div>
        </div>

        {/* RIGHT COLUMN: SETTINGS & ASSETS */}
        <div className="space-y-8">
          {/* COVER IMAGE CARD */}
          <div className="bg-white p-6 rounded-[2.5rem] shadow-xl border border-[#B76E79]/5">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#581845] mb-4 flex items-center gap-2">
              <ImageIcon size={16} /> Cover Asset
            </h3>
            <div className="relative group rounded-3xl overflow-hidden bg-[#FAF9F6] border-2 border-dashed border-[#B76E79]/20 aspect-video flex items-center justify-center">
              {cover.filePath ? (
                <img src={cover.filePath} alt="Cover" className="w-full h-full object-cover" />
              ) : (
                <div className="text-[#B76E79] opacity-40 italic text-xs">No image selected</div>
              )}
              <div className="absolute inset-0 bg-[#581845]/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Upload type="image" setProgress={setProgress} setData={setCover}>
                  <span className="text-white font-bold text-xs cursor-pointer px-4 py-2 border border-white rounded-full">CHANGE IMAGE</span>
                </Upload>
              </div>
            </div>
            {progress > 0 && progress < 100 && (
              <div className="mt-4 h-1 w-full bg-[#FAF9F6] rounded-full overflow-hidden">
                <div className="h-full bg-[#D6AE7B] transition-all" style={{ width: `${progress}%` }} />
              </div>
            )}
          </div>

          {/* CLASSIFICATION CARD */}
          <div className="bg-[#1B1B1F] p-8 rounded-[2.5rem] text-white shadow-2xl shadow-[#581845]/20">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#D6AE7B] mb-6 flex items-center gap-2">
              <Layout size={16} /> Classification
            </h3>
            <select
              name="category"
              className="w-full bg-[#2A2A2E] text-white p-4 rounded-2xl outline-none focus:ring-2 focus:ring-[#D6AE7B] border-none text-sm appearance-none"
              defaultValue={post.category}
            >
              <option value="general">General</option>
              <option value="technology">Technology</option>
              <option value="spotlight">Spotlight</option>
              <option value="tailor">Tailoring</option>
              <option value="tread">Trends</option>
              <option value="story">Stories</option>
            </select>

            <button
              disabled={progress > 0 && progress < 100}
              className="w-full flex items-center justify-center gap-2 bg-[#581845] hover:bg-[#B76E79] text-white font-bold rounded-2xl p-4 mt-8 transition-all active:scale-95 disabled:bg-[#2A2A2E] disabled:text-white/20"
            >
              <Save size={18} />
              {progress > 0 && progress < 100 ? "UPLOADING..." : "SAVE CHANGES"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
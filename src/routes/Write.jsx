// src/pages/Write.jsx
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useMemo, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IoImageOutline,
  IoVideocamOutline,
  IoCloseCircle,
  IoCheckmarkCircle,
  IoTimeOutline,
  IoChevronBack,
} from "react-icons/io5";
import Upload from "../components/Upload";

const CATEGORIES = [
  { value: "general", label: "General" },
  { value: "technology", label: "Technology" },
  { value: "tailor", label: "Tailoring" },
  { value: "story", label: "Stories" },
];

const QUILL_MODULES = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["link", "clean"],
  ],
};

const Write = () => {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("general");
  const [cover, setCover] = useState("");
  const [img, setImg] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const quillRef = useRef();
  const titleRef = useRef();
  const navigate = useNavigate();

  // Auto-grow the title field so it never scrolls or clips on small screens
  useEffect(() => {
    if (titleRef.current) {
      titleRef.current.style.height = "auto";
      titleRef.current.style.height = `${titleRef.current.scrollHeight}px`;
    }
  }, [title]);

  // Insert uploaded image at the current cursor position
  useEffect(() => {
    if (img?.url) {
      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection(true);
      quill.insertEmbed(range.index, "image", img.url);
      quill.setSelection(range.index + 1);
      toast.success("Image added");
    }
  }, [img]);

  // Insert uploaded video at the current cursor position
  useEffect(() => {
    if (video?.url) {
      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection(true);
      quill.insertEmbed(range.index, "video", video.url);
      quill.setSelection(range.index + 1);
      toast.success("Video added");
    }
  }, [video]);

  const wordCount = useMemo(() => {
    const text = value.replace(/<[^>]*>/g, " ").trim();
    return text ? text.split(/\s+/).length : 0;
  }, [value]);

  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost);
    },
    onSuccess: (res) => {
      toast.success("Post published successfully!");
      navigate(`/${res.data.slug}`);
    },
    onError: () => {
      toast.error("Couldn't publish. Please try again.");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isUploading) return toast.warning("Hang on — your upload is still finishing.");
    if (!title.trim()) return toast.error("Give your story a title.");
    if (!value.trim()) return toast.error("Your story needs some content before it can be published.");

    mutation.mutate({
      title: title.trim(),
      category,
      desc: desc.trim(),
      content: value,
      img: cover?.filePath || "",
    });
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pb-16">
      {/* STICKY HEADER — actions live here instead of a fixed footer, so the keyboard
          never fights with the publish button on mobile */}
      <div className="sticky top-0 z-40 bg-[#FAF9F6]/95 backdrop-blur-md border-b border-[#B76E79]/10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-[#1B1B1F]/50 hover:text-[#581845] text-sm font-medium transition-colors shrink-0"
          >
            <IoChevronBack size={18} />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="flex-1 min-w-0 flex items-center justify-center gap-2 text-xs text-[#B76E79]">
            {isUploading ? (
              <span className="flex items-center gap-1.5 font-semibold">
                <span className="w-3 h-3 border-2 border-[#B76E79] border-t-transparent rounded-full animate-spin" />
                Uploading {progress}%
              </span>
            ) : (
              <span className="hidden sm:flex items-center gap-1.5">
                <IoTimeOutline size={14} />
                {wordCount === 0 ? "Start writing..." : `${wordCount} words · ${readingTime} min read`}
              </span>
            )}
          </div>

          <button
            form="write-form"
            type="submit"
            disabled={mutation.isPending || isUploading}
            className="shrink-0 bg-[#581845] text-white px-5 py-2.5 rounded-full font-bold text-sm shadow-md shadow-[#581845]/20 hover:bg-[#1B1B1F] active:scale-95 transition-all disabled:opacity-50 disabled:active:scale-100"
          >
            {mutation.isPending ? "Publishing..." : "Publish"}
          </button>
        </div>
      </div>

      <form id="write-form" onSubmit={handleSubmit} className="max-w-3xl mx-auto px-4 py-8 flex flex-col gap-6">
        {/* COVER IMAGE */}
        <div className="group relative w-full h-44 md:h-64 bg-white border-2 border-dashed border-[#B76E79]/25 rounded-3xl overflow-hidden flex items-center justify-center">
          {cover?.url ? (
            <>
              <img src={cover.url} className="w-full h-full object-cover" alt="Cover" />
              <div className="absolute inset-0 bg-[#1B1B1F]/0 group-hover:bg-[#1B1B1F]/40 transition-all flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
                <Upload type="image" setProgress={setProgress} setData={setCover} setIsUploading={setIsUploading}>
                  <span className="bg-white text-[#1B1B1F] text-xs font-bold px-4 py-2 rounded-full cursor-pointer">
                    Change Cover
                  </span>
                </Upload>
                <button
                  type="button"
                  onClick={() => setCover("")}
                  className="bg-white/90 text-red-500 text-xs font-bold px-4 py-2 rounded-full flex items-center gap-1"
                >
                  <IoCloseCircle size={14} /> Remove
                </button>
              </div>
            </>
          ) : (
            <Upload type="image" setProgress={setProgress} setData={setCover} setIsUploading={setIsUploading}>
              <div className="flex flex-col items-center cursor-pointer text-[#B76E79] hover:text-[#581845] transition-colors px-4 text-center">
                <IoImageOutline size={36} />
                <span className="text-sm font-bold mt-2">Add a Cover Photo</span>
                <span className="text-xs text-[#1B1B1F]/40 mt-1">Recommended: 1600×900, JPG, PNG, or GIF</span>
              </div>
            </Upload>
          )}
        </div>

        {/* TITLE */}
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter Title..."
          rows={1}
          className="w-full resize-none overflow-hidden text-3xl md:text-5xl font-bold bg-transparent outline-none placeholder:text-[#1B1B1F]/15 text-[#1B1B1F]"
          style={{ fontFamily: "Georgia, serif" }}
        />

        {/* CATEGORY + EXCERPT */}
        <div className="flex flex-col gap-3 py-4 border-y border-[#B76E79]/10">
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setCategory(c.value)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  category === c.value
                    ? "bg-[#581845] text-white"
                    : "bg-white text-[#1B1B1F]/60 border border-[#B76E79]/15 hover:border-[#581845]/30"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
          <input
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Write a short excerpt readers will see in previews..."
            className="w-full bg-transparent text-sm text-[#1B1B1F]/60 outline-none italic"
          />
        </div>

        {/* MEDIA INSERT ROW — plain, in-flow buttons that always sit above the editor,
            so nothing gets clipped off the side of a phone screen */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold text-[#B76E79] uppercase tracking-widest mr-1">Insert:</span>
          <Upload type="image" setProgress={setProgress} setData={setImg} setIsUploading={setIsUploading}>
            <span className="flex items-center gap-1.5 bg-white border border-[#B76E79]/15 text-[#1B1B1F] text-xs font-bold px-3 py-2 rounded-full cursor-pointer hover:border-[#581845]/40 hover:text-[#581845] transition-all">
              <IoImageOutline size={16} /> Photo / GIF
            </span>
          </Upload>
          <Upload type="video" setProgress={setProgress} setData={setVideo} setIsUploading={setIsUploading}>
            <span className="flex items-center gap-1.5 bg-white border border-[#B76E79]/15 text-[#1B1B1F] text-xs font-bold px-3 py-2 rounded-full cursor-pointer hover:border-[#581845]/40 hover:text-[#581845] transition-all">
              <IoVideocamOutline size={16} /> Video
            </span>
          </Upload>
          {(cover?.url || img?.url) && (
            <span className="flex items-center gap-1 text-[10px] text-[#B76E79] ml-1">
              <IoCheckmarkCircle size={13} /> Tap into the story below to place the next image at your cursor
            </span>
          )}
        </div>

        {/* EDITOR */}
        <div className="bg-white rounded-3xl border border-[#B76E79]/10 shadow-sm overflow-hidden">
          <ReactQuill
            ref={quillRef}
            theme="snow"
            value={value}
            onChange={setValue}
            placeholder="Tell your story..."
            className="write-quill"
            modules={QUILL_MODULES}
          />
        </div>
      </form>

      {/* Scoped Quill overrides — bigger, calmer writing surface, toolbar that
          wraps cleanly instead of overflowing on narrow screens */}
      <style>{`
        .write-quill .ql-toolbar {
          border: none;
          border-bottom: 1px solid rgba(183, 110, 121, 0.12);
          padding: 12px 16px;
          position: sticky;
          top: 57px;
          background: #ffffff;
          z-index: 10;
          flex-wrap: wrap;
        }
        .write-quill .ql-container {
          border: none;
          font-size: 1.05rem;
          line-height: 1.8;
          font-family: Georgia, serif;
        }
        .write-quill .ql-editor {
          min-height: 340px;
          padding: 24px 20px 60px;
        }
        .write-quill .ql-editor.ql-blank::before {
          font-style: normal;
          color: rgba(27, 27, 31, 0.25);
          left: 20px;
        }
        .write-quill .ql-editor img,
        .write-quill .ql-editor video {
          border-radius: 18px;
          margin: 12px 0;
          max-width: 100%;
        }
        @media (max-width: 640px) {
          .write-quill .ql-toolbar {
            top: 53px;
          }
        }
      `}</style>
    </div>
  );
};

export default Write;
// import { useAuth, useUser } from "@clerk/clerk-react";
import "react-quill-new/dist/quill.snow.css";
import ReactQuill from "react-quill-new";
import { useMutation } from "@tanstack/react-query";
import "../index.css";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
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

  // Insert image at current cursor position
  useEffect(() => {
    if (img && value !== "") {
      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection(true);
      if (quill && range) {
        quill.insertEmbed(range.index, "image", img.url);
        quill.setSelection(range.index + 1);
      } else {
        setValue((prev) => prev + `<p><img src="${img.url}" /></p>`);
      }
    }
  }, [img]);

  // Insert video at current cursor position
  useEffect(() => {
    if (video && value !== "") {
      const quill = quillRef.current?.getEditor();
      const range = quill?.getSelection(true);
      if (quill && range) {
        quill.insertEmbed(range.index, "video", video.url);
        quill.setSelection(range.index + 1);
      } else {
        setValue((prev) => prev + `<p><iframe class="ql-video" src="${video.url}" /></p>`);
      }
    }
  }, [video]);

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return axios.post(`${import.meta.env.VITE_API_URL}/posts`, newPost, {
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: (res) => {
      toast.success("Post has been created");
      navigate(`/${res.data.slug}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isUploading) {
      toast.error("Please wait until the upload is finished.");
      return;
    }

    const formData = new FormData(e.target);
    const imgPath = cover?.filePath || "";
    const data = {
      title: formData.get("title") || "",
      category: formData.get("category") || "",
      desc: formData.get("desc") || "",
      content: value || "",
      img: imgPath,
    };

    if (!data.title || !data.category || !data.desc || !data.content) {
      toast.error("All fields are required!");
      return;
    }

    mutation.mutate(data);
  };

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Create a New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCover} setIsUploading={setIsUploading}>
          <button type="button" className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white">
            Add a cover image
          </button>
        </Upload>
        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="My Awesome Story"
          name="title"
        />
        <div className="flex items-center gap-4">
          <label htmlFor="" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            className="p-2 rounded-xl bg-white shadow-md"
          >
            <option value="general">General</option>
            <option value="technology">Technology</option>
            <option value="spotlight">Spotlight</option>
            <option value="tailor">Tailoring</option>
            <option value="tread">Treads</option>
            <option value="story">Stories</option>
          </select>
        </div>
        <textarea
          className="p-4 rounded-xl bg-white shadow-md"
          name="desc"
          placeholder="A Short Description"
        />
        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg} setIsUploading={setIsUploading}>
              <button type="button">🌆</button>
            </Upload>
            <Upload type="video" setProgress={setProgress} setData={setVideo} setIsUploading={setIsUploading}>
              <button type="button">▶️</button>
            </Upload>
          </div>
          <ReactQuill
            ref={quillRef}
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md custom-quill"
            value={value}
            onChange={setValue}
            readOnly={0 < progress && progress < 100}
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ["bold", "italic", "underline", "strike"],
                [{ list: "ordered" }, { list: "bullet" }],
                ["blockquote", "code-block"],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
                ["link", "image", "video"],
                ["clean"],
              ],
              clipboard: {
                matchVisual: false,
              },
            }}
            formats={[
              "header",
              "bold",
              "italic",
              "underline",
              "strike",
              "list",
              "bullet",
              "blockquote",
              "code-block",
              "align",
              "color",
              "background",
              "link",
              "image",
              "video",
            ]}
          />
        </div>
        <button
          disabled={mutation.isPending || (0 < progress && progress < 100) || isUploading}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "Loading..." : "Send"}
        </button>
        {"Progress:" + progress}
        {mutation.isError && <span>{mutation.error.message}</span>}
      </form>
    </div>
  );
};

export default Write;

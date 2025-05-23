import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import Upload from "../components/Upload";

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
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/posts/${slug}`
        );
        setPost(data);
        setValue(data.content);
        setCover({ filePath: data.img });
      } catch (error) {
        toast.error("Error fetching post data");
        console.error(error);
      }
    };

    fetchPost();
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

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

    try {
      const { data: updatedPost } = await axios.put(
        `${import.meta.env.VITE_API_URL}/posts/${slug}`,
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      toast.success("Post updated successfully!");
      navigate(`/posts`);
    } catch (error) {
      toast.error("Error updating post");
      console.error(error);
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] flex flex-col gap-6">
      <h1 className="text-cl font-light">Edit Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1 mb-6">
        <Upload type="image" setProgress={setProgress} setData={setCover} img={cover.filePath}>
          <button
            type="button"
            className="w-max p-2 shadow-md rounded-xl text-sm text-gray-500 bg-white"
          >
            Change Cover Image
          </button>
        </Upload>

        <input
          className="text-4xl font-semibold bg-transparent outline-none"
          type="text"
          placeholder="Post Title"
          name="title"
          defaultValue={post.title}
        />

        <div className="flex items-center gap-4">
          <label htmlFor="category" className="text-sm">
            Choose a category:
          </label>
          <select
            name="category"
            id="category"
            className="p-2 rounded-xl bg-white shadow-md"
            defaultValue={post.category}
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
          defaultValue={post.desc}
        />

        <div className="flex flex-1">
          <div className="flex flex-col gap-2 mr-2">
            <Upload type="image" setProgress={setProgress} setData={setImg} img={img?.url}>
              <button type="button">🌆</button>
            </Upload>
          </div>

          <ReactQuill
            theme="snow"
            className="flex-1 rounded-xl bg-white shadow-md custom-quill"
            value={value}
            onChange={setValue}
            readOnly={progress > 0 && progress < 100}
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
          disabled={progress > 0 && progress < 100}
          className="bg-blue-800 text-white font-medium rounded-xl mt-4 p-2 w-36 disabled:bg-blue-400 disabled:cursor-not-allowed"
        >
          {progress > 0 && progress < 100 ? "Loading..." : "Update Post"}
        </button>
      </form>
    </div>
  );
};

export default EditPost;

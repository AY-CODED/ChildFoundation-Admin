import { useState } from "react";
import {
  Upload,
  Image as ImageIcon,
  FileText,
  User,
  PenSquare,
  Loader2,
  CheckCircle
} from "lucide-react";
import api from "../services/api";

export default function CMS() {
  const [post, setPost] = useState({
    title: "",
    content: "",
    author: "",
    imageUrl: "",
  });

  const [uploading, setUploading] = useState(false);
  const [publishing, setPublishing] = useState(false);

  const handleImageUpload = async (file) => {
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    // Replace with your Cloudinary Upload Preset
    formData.append("upload_preset", "your_cloudinary_preset");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/cg7rte5t/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      setPost((prev) => ({
        ...prev,
        imageUrl: data.secure_url,
      }));

      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  };

  const handlePublish = async () => {
    if (!post.title || !post.content) {
      alert("Title and Content are required.");
      return;
    }

    setPublishing(true);

    try {
      await api.post("/posts", post);

      alert("Post Published Successfully!");

      setPost({
        title: "",
        content: "",
        author: "",
        imageUrl: "",
      });
    } catch (err) {
      console.log(err);
      alert("Publishing failed");
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-5">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800">
            Content Management
          </h1>

          <p className="text-slate-500 mt-2">
            Create, upload and publish articles professionally.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8">

            {/* Title */}

            <div className="mb-6">
              <label className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                <FileText size={18} />
                Title
              </label>

              <input
                type="text"
                placeholder="Enter article title..."
                value={post.title}
                onChange={(e) =>
                  setPost({ ...post, title: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-600 outline-none transition"
              />
            </div>

            {/* Author */}

            <div className="mb-6">
              <label className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                <User size={18} />
                Author
              </label>

              <input
                type="text"
                placeholder="Author Name"
                value={post.author}
                onChange={(e) =>
                  setPost({ ...post, author: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:ring-4 focus:ring-green-200 focus:border-green-600 outline-none transition"
              />
            </div>

            {/* Content */}

            <div className="mb-6">
              <label className="flex items-center gap-2 mb-2 font-semibold text-gray-700">
                <PenSquare size={18} />
                Content
              </label>

              <textarea
                rows="12"
                placeholder="Write something amazing..."
                value={post.content}
                onChange={(e) =>
                  setPost({ ...post, content: e.target.value })
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:ring-4 focus:ring-green-200 focus:border-green-600 outline-none transition"
              />

              <div className="text-right mt-2 text-sm text-gray-500">
                {post.content.length} characters
              </div>
            </div>

            {/* Upload */}

            <label className="block">
              <div className="border-2 border-dashed border-green-300 rounded-2xl p-10 text-center cursor-pointer hover:border-green-600 transition">

                <Upload
                  className="mx-auto text-green-600"
                  size={40}
                />

                <p className="font-semibold mt-3">
                  Click to upload an image
                </p>

                <p className="text-gray-500 text-sm mt-1">
                  PNG, JPG, JPEG
                </p>

                <input
                  type="file"
                  className="hidden"
                  onChange={(e) =>
                    handleImageUpload(e.target.files[0])
                  }
                />
              </div>
            </label>

            {uploading && (
              <div className="flex items-center gap-3 mt-4 text-green-600">
                <Loader2 className="animate-spin" />
                Uploading image...
              </div>
            )}

            <button
              onClick={handlePublish}
              disabled={publishing}
              className="mt-8 w-full bg-green-600 hover:bg-green-700 transition text-white py-4 rounded-xl font-bold text-lg shadow-lg flex justify-center items-center gap-3"
            >
              {publishing ? (
                <>
                  <Loader2 className="animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  Publish Post
                </>
              )}
            </button>
          </div>

          {/* Right Preview */}

          <div className="bg-white rounded-3xl shadow-xl p-6 h-fit sticky top-6">

            <h2 className="text-xl font-bold mb-6">
              Live Preview
            </h2>

            {post.imageUrl ? (
              <>
                <img
                  src={post.imageUrl}
                  alt="preview"
                  className="rounded-xl h-52 object-cover w-full"
                />

                <div className="flex items-center gap-2 mt-3 text-green-600">
                  <CheckCircle size={18} />
                  Image Uploaded
                </div>
              </>
            ) : (
              <div className="bg-slate-100 rounded-xl h-52 flex flex-col justify-center items-center">

                <ImageIcon
                  size={55}
                  className="text-gray-400"
                />

                <p className="mt-3 text-gray-500">
                  No Image Selected
                </p>
              </div>
            )}

            <h3 className="text-2xl font-bold mt-6">
              {post.title || "Post Title"}
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              {post.author || "Author Name"}
            </p>

            <hr className="my-5" />

            <p className="text-gray-700 whitespace-pre-wrap leading-7">
              {post.content ||
                "Your article preview will appear here as you type..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
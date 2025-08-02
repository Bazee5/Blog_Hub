import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../utils/axiosInstance";
import useAuth from "../context/UseAuth";

// BlogDetail component to display a single blog post
const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  // Handle blog deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`/blogs/${id}`);
      navigate("/");
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  if (!blog) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">

      {/* Display blog title, author, and content */}
      <h1 className="text-3xl font-bold mb-2">{blog.title}</h1>
      <p className="text-sm text-gray-500">
        by {blog.user?.name || "Unknown"} on{" "}
        {new Date(blog.createdAt).toLocaleDateString()}
      </p>
      <hr className="my-4" />
      <div className="text-lg leading-relaxed">{blog.content}</div>

      {/* Show edit and delete buttons if the current user is the blog author */}
      {user?._id === blog.user?._id && (
        <div className="mt-6 flex gap-4">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
            onClick={() => navigate(`/edit/${id}`)}
          >
            Edit
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogDetail;

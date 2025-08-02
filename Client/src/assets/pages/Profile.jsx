import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  BookOpen,
  Loader2,
  AlertCircle,
  Plus,
  X,
} from "lucide-react";
import axiosInstance from "../utils/axiosInstance";
import BlogCard from "../components/BlogCard";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  // Toast notification function
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    const fetchProfileAndBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const [profileRes, blogsRes] = await Promise.all([
          axiosInstance.get("/users/me"),
          axiosInstance.get("/blogs/myblogs"),
        ]);
        setProfile(profileRes.data);
        setBlogs(blogsRes.data);
      } catch (err) {
        console.error("Failed to fetch profile or blogs", err);
        setError("Failed to load profile data. Please try again.");
        if (err.response?.status === 401) {
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchProfileAndBlogs();
  }, [navigate]);

  const handleDelete = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this blog? This action cannot be undone."
      )
    ) {
      try {
        setDeleteLoading(true);
        await axiosInstance.delete(`/blogs/${id}`);
        setBlogs((blogs) => blogs.filter((b) => b._id !== id));
        showToast("Blog deleted successfully");
      } catch (err) {
        showToast("Failed to delete blog", "error");
      } finally {
        setDeleteLoading(false);
      }
    }
  };

  const retryFetch = async () => {
    const fetchProfileAndBlogs = async () => {
      try {
        setLoading(true);
        setError("");
        const [profileRes, blogsRes] = await Promise.all([
          axiosInstance.get("/users/me"),
          axiosInstance.get("/blogs/myblogs"),
        ]);
        setProfile(profileRes.data);
        setBlogs(blogsRes.data);
      } catch (err) {
        setError("Failed to load profile data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    await fetchProfileAndBlogs();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-sm border border-red-200 p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Profile
          </h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={retryFetch}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Profile Header */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-8 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="flex items-center space-x-6">
                {/* Avatar */}
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-10 h-10 text-white" />
                </div>

                {/* Profile Info */}
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">
                    My Profile
                  </h1>
                  <p className="text-gray-600">
                    Manage your account and view your blog posts
                  </p>
                </div>
              </div>

              {/* Stats */}
              <div className="mt-6 md:mt-0 bg-orange-50 rounded-lg p-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {blogs.length}
                  </div>
                  <div className="text-sm text-gray-600">Blog Posts</div>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Details Card */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Account Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Full Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {profile.name}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Email Address
                  </p>
                  <p className="text-lg font-semibold text-gray-900">
                    {profile.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* My Blogs Section */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <BookOpen className="w-6 h-6 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  My Blog Posts
                </h2>
              </div>
              <button
                onClick={() => navigate("/")}
                className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
              >
                <Plus className="w-4 h-4" />
                <span>Create New</span>
              </button>
            </div>

            {blogs && blogs.length > 0 ? (
              <div className="space-y-6">
                {blogs.map((blog) => (
                  <BlogCard
                    key={blog._id}
                    blog={{ ...blog, author: blog.user }}
                    currentUserId={profile._id}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No blog posts yet
                </h3>
                <p className="text-gray-600 mb-6">
                  Start sharing your thoughts with the world!
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                >
                  Write Your First Blog
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div
            className={`
            flex items-center space-x-3 p-4 rounded-lg shadow-lg max-w-md
            ${
              toast.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }
          `}
          >
            {toast.type === "success" ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            <p className="font-medium">{toast.message}</p>
            <button
              onClick={() => setToast(null)}
              className="p-1 hover:bg-current hover:bg-opacity-10 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;

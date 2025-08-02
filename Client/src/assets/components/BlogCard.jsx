import { useState, useMemo } from "react";
import {
  Eye,
  Edit3,
  Trash2,
  X,
  User,
  Calendar,
  Clock,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import BlogForm from "./BlogForm";
import axios from "../utils/axiosInstance";

const BlogCard = ({ blog, currentUserId, onDelete }) => {
  const isAuthor = blog?.author?._id === currentUserId;
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Toast notification function
  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Handle blog deletion confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await onDelete(blog._id);
      showToast("Blog deleted successfully");
    } catch (err) {
      showToast("Failed to delete blog", "error");
    } finally {
      setDeleteLoading(false);
      setShowDeleteConfirm(false);
    }
  };

  // Handle blog edit
  const handleEdit = async (form) => {
    try {
      setEditLoading(true);
      await axios.put(`/blogs/${blog._id}`, form);
      setShowEditModal(false);
      showToast("Blog updated successfully!");
      window.location.reload();
    } catch (err) {
      showToast("Failed to update blog", "error");
    } finally {
      setEditLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const isUpdated =
    blog?.updatedAt &&
    new Date(blog.updatedAt).getTime() !== new Date(blog.createdAt).getTime();

  // Memoize initialValues for edit form
  const initialValues = useMemo(
    () => ({ title: blog.title, content: blog.content }),
    [blog.title, blog.content]
  );

  return (
    <>
      <article className="bg-white rounded-xl shadow-sm border border-orange-100 hover:shadow-md hover:border-orange-200 transition-all duration-200 overflow-hidden">
        {/* Card Content */}
        <div className="p-6">
          {/* Blog Title */}
          <h3
            className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer"
            onClick={() => setShowModal(true)}
          >
            {blog?.title}
          </h3>

          {/* Author Info */}
          <div className="flex items-center space-x-2 mb-3">
            <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-sm font-medium text-gray-700">
              {blog?.author?.name}
            </span>
          </div>

          {/* Content Preview */}
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {blog?.content?.slice(0, 200)}...
          </p>

          {/* Date Info */}
          <div className="flex items-center space-x-4 mb-4 text-xs text-gray-500">
            {isUpdated ? (
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span>Updated {formatDate(blog.updatedAt)}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <Calendar className="w-3 h-3" />
                <span>Created {formatDate(blog.createdAt)}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <button
              className="flex items-center space-x-2 text-orange-600 hover:text-orange-700 hover:bg-orange-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
              onClick={() => setShowModal(true)}
            >
              <Eye className="w-4 h-4" />
              <span>Read More</span>
            </button>

            {isAuthor && (
              <div className="flex items-center space-x-2">
                <button
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium"
                  onClick={() => setShowEditModal(true)}
                >
                  <Edit3 className="w-4 h-4" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  disabled={deleteLoading}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-all duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {deleteLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Trash2 className="w-4 h-4" />
                  )}
                  <span>{deleteLoading ? "Deleting..." : "Delete"}</span>
                </button>
                {/* Delete Confirmation Modal */}
                {showDeleteConfirm && (
                  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-8 flex flex-col items-center">
                      <AlertTriangle className="w-10 h-10 text-red-500 mb-4" />
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        Delete Blog Post?
                      </h3>
                      <p className="text-gray-700 mb-6 text-center">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-red-600">
                          "{blog?.title}"
                        </span>
                        ? This action cannot be undone.
                      </p>
                      <div className="flex gap-4 w-full justify-center">
                        <button
                          className="px-6 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium transition-all duration-200"
                          onClick={() => setShowDeleteConfirm(false)}
                          disabled={deleteLoading}
                        >
                          Cancel
                        </button>
                        <button
                          className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-all duration-200 shadow-sm hover:shadow-md disabled:bg-red-300"
                          onClick={handleDelete}
                          disabled={deleteLoading}
                        >
                          {deleteLoading ? (
                            <Loader2 className="w-4 h-4 animate-spin inline-block mr-2" />
                          ) : null}
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </article>

      {/* View More Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 rounded-t-xl">
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4">
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {blog?.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <User className="w-3 h-3 text-orange-600" />
                      </div>
                      <span>By {blog?.author?.name}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      {isUpdated ? (
                        <>
                          <Clock className="w-3 h-3" />
                          <span>Updated {formatDate(blog.updatedAt)}</span>
                        </>
                      ) : (
                        <>
                          <Calendar className="w-3 h-3" />
                          <span>Created {formatDate(blog.createdAt)}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  onClick={() => setShowModal(false)}
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {blog?.content}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                Edit Blog Post
              </h2>
              <button
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowEditModal(false)}
                disabled={editLoading}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              {/** Memoize initialValues to prevent update depth exceeded error */}
              <BlogForm
                initialValues={initialValues}
                onSubmit={handleEdit}
                loading={editLoading}
              />
            </div>
          </div>
        </div>
      )}

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
              <AlertTriangle className="w-5 h-5 text-red-500" />
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

export default BlogCard;

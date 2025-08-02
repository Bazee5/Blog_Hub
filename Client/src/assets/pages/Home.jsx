import { useEffect, useState } from 'react';
import { Plus, X, AlertCircle, Loader2 } from 'lucide-react';
import axios from '../utils/axiosInstance';
import BlogCard from '../components/BlogCard';
import BlogForm from '../components/BlogForm';

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [createLoading, setCreateLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Toast notification function
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await axios.get('/blogs');
      setBlogs(res.data);
      
      try {
        const userRes = await axios.get('/users/me');
        setCurrentUser(userRes.data);
      } catch (userErr) {
        setCurrentUser(null);
      }
    } catch (err) {
      setError('Failed to load blogs. Please try again.');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await axios.delete(`/blogs/${id}`);
        showToast('Blog deleted successfully');
        fetchData();
      } catch (err) {
        showToast('Failed to delete blog', 'error');
      }
    }
  };

  const handleCreateBlog = async (form) => {
    try {
      setCreateLoading(true);
      await axios.post('/blogs', form);
      setShowCreateModal(false);
      showToast('Blog created successfully!');
      fetchData();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to create blog. Please login.', 'error');
    } finally {
      setCreateLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm border border-orange-100 p-6 mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">All Blogs</h1>
                <p className="text-gray-600">Discover stories, thinking, and expertise from writers on any topic.</p>
              </div>
              {currentUser && (
                <button
                  className="flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md"
                  onClick={() => setShowCreateModal(true)}
                >
                  <Plus className="w-5 h-5" />
                  <span>Create Blog</span>
                </button>
              )}
            </div>
          </div>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                <div>
                  <h3 className="text-red-800 font-medium">Error</h3>
                  <p className="text-red-700 text-sm mt-1">{error}</p>
                </div>
                <button
                  onClick={fetchData}
                  className="ml-auto bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-8 h-8 text-orange-500 animate-spin mb-4" />
              <p className="text-gray-600">Loading blogs...</p>
            </div>
          ) : (
            /* Blog Cards */
            <div className="space-y-6">
              {blogs.length > 0 ? (
                [...blogs]
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .map((blog) => (
                    <BlogCard 
                      key={blog._id} 
                      blog={{ ...blog, author: blog.user }} 
                      currentUserId={currentUser?._id} 
                      onDelete={handleDelete} 
                    />
                  ))
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No blogs yet</h3>
                  <p className="text-gray-600 mb-6">Be the first to share your thoughts with the community.</p>
                  {currentUser && (
                    <button
                      className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200"
                      onClick={() => setShowCreateModal(true)}
                    >
                      Create Your First Blog
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Create Blog Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Create New Blog</h2>
              <button 
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() => setShowCreateModal(false)}
                disabled={createLoading}
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              <BlogForm onSubmit={handleCreateBlog} loading={createLoading} />
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-top-2">
          <div className={`
            flex items-center space-x-3 p-4 rounded-lg shadow-lg max-w-md
            ${toast.type === 'success' 
              ? 'bg-green-50 border border-green-200 text-green-800' 
              : 'bg-red-50 border border-red-200 text-red-800'
            }
          `}>
            {toast.type === 'success' ? (
              <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
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

export default Home;
import { useState, useEffect } from "react";
import { Type, FileText, Send } from "lucide-react";

const BlogForm = ({ onSubmit, initialValues = { title: "", content: "" } }) => {
  const [form, setForm] = useState(initialValues);

  useEffect(() => {
    setForm(initialValues);
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 bg-white p-6 rounded-xl"
    >
      {/* Title Input */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Blog Title
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Type className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Enter your blog title..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Content Textarea */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Blog Content
        </label>
        <div className="relative">
          <div className="absolute top-3 left-3 pointer-events-none">
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <textarea
            placeholder="Write your blog content here..."
            className="w-full pl-10 pr-4 py-3 h-40 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <button className="flex items-center justify-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-medium transition-all duration-200 shadow-sm hover:shadow-md">
        <Send className="w-4 h-4" />
        <span>Post Blog</span>
      </button>
    </form>
  );
};

export default BlogForm;

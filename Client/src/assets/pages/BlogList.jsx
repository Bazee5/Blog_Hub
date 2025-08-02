import React, { useEffect, useState } from 'react';
import { fetchBlogs } from '../api/blog';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs()
      .then((data) => setBlogs(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">All Blogs</h1>
      {blogs.map((blog) => (
        <div key={blog._id} className="border p-4 mb-2 rounded">
          <h2 className="font-semibold">{blog.title}</h2>
          <p>{blog.content}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;

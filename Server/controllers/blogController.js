import Blog from "../models/blog.js";

// Create a new blog
export const createBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = new Blog({
      title,
      content,
      user: req.user._id,
    });

    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: "Blog creation failed" });
  }
};

// Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("user", "name email");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch blogs" });
  }
};

// Get single blog
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving blog" });
  }
};

// To Update blog
export const updateBlog = async (req, res) => {
  const { title, content } = req.body;
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    blog.title = title || blog.title;
    blog.content = content || blog.content;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Error updating blog" });
  }
};

// To Delete the selected blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await Blog.deleteOne({ _id: blog._id });
    res.json({ message: "Blog deleted" });
  } catch (error) {
    console.error("Delete blog error:", error);
    res
      .status(500)
      .json({ message: "Error deleting blog", error: error.message });
  }
};

// Get blogs of logged-in user
export const getMyBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching your blogs" });
  }
};

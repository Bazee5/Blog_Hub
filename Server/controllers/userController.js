// To Get current user
import Blog from "../models/blog.js";

export const getMe = async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: "Not authorized" });
  }
  try {
    const blogs = await Blog.find({ user: req.user._id }).populate(
      "user",
      "name email"
    );

    // Mapping blogs to include required fields and rename user to author
    const formattedBlogs = blogs.map((blog) => ({
      _id: blog._id,
      title: blog.title,
      content: blog.content,
      author: blog.user,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));
    res.json({
      _id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      blogs: formattedBlogs,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user blogs" });
  }
};

import User from "../models/users.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

// Register new user
export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create new user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};

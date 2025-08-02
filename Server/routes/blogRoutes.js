import { protect } from '../middleware/authMiddleware.js ';

import express from 'express';
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getMyBlogs,
} from '../controllers/blogController.js';

const router = express.Router();

router.route('/').get(getBlogs).post(protect, createBlog);
router.route('/myblogs').get(protect, getMyBlogs);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router;

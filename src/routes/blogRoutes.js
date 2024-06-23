// src/routes/blogRoutes.js
const express = require('express');
const {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs
} = require('../controllers/blogController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').get(getBlogs).post(protect, createBlog);
router.get('/my-blogs', protect, getMyBlogs);
router
  .route('/:id')
  .get(getBlogById)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog)

module.exports = router;

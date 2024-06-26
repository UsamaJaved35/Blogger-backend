// src/controllers/blogController.js
const BlogPost = require('../models/BlogPost');
const { validateBlog } = require('../validators/blogValidators');
const validate = require('../middleware/validate');
const errorResponse = require('../utils/errorResponse');

const getBlogs = async (req, res) => {
  const blogs = await BlogPost.find().populate('author', 'username email');
  res.json(blogs);
};

const getBlogById = async (req, res) => {
  const blog = await BlogPost.findById(req.params.id).populate('author', 'username email');
  if (blog) {
    res.json(blog);
  } else {
    return errorResponse(res, 404, 'Blog not found');
  }
};

const createBlog = [
  validateBlog,
  validate,
  async (req, res) => {
    const { title, content } = req.body;
    const blog = new BlogPost({
      title,
      content,
      author: req.user._id,
    });
    const createdBlog = await blog.save();
    if(createdBlog){
      res.status(201).json(createdBlog);
    }else{
      return errorResponse(res, 404, 'Blog not created');
//      res.status(404).json({message:'Blog not created'});
    }
  },
];

const updateBlog = [
  validateBlog,
  validate,
  async (req, res) => {
    const { title, content } = req.body;
    const blog = await BlogPost.findById(req.params.id);
    if (blog) {
      blog.title = title;
      blog.content = content;
      const updatedBlog = await blog.save();
      res.json(updatedBlog);
    } else {
      return errorResponse(res, 404, 'Blog not found');
      //res.status(404).json({ message: 'Blog not found' });
    }
  },
];

const deleteBlog = async (req, res) => {
  const { id } = req.params;
  const deletedBlogPost = await BlogPost.findByIdAndDelete(id);

  if (!deletedBlogPost) {
    return errorResponse(res, 404, 'Blog post not found');
    //return res.status(404).json({ message: 'Blog post not found' });
  }
  res.status(200).json({ message: 'Blog post deleted successfully' });
};

const getMyBlogs = async (req, res) => {
  const userId = req.user.id;
  try {
    const blogs = await BlogPost.find({ author: userId }).populate('author', 'username email');;
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Error fetching user blogs:', error);
    return errorResponse(res, 500, 'Server error');
    //res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
  getMyBlogs
};

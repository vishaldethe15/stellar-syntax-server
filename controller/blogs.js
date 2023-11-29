const Blog = require("../models/Blog");
const { BadRequestError } = require("../errors");

const blogsPerPage = 3;
// get all Blogs
const getAllBlogs = async (req, res) => {
  const { featured, page } = req.query;

  const pageNum = parseInt(page) || 0;

  const skip = pageNum * blogsPerPage;

  const totalDocs = await Blog.countDocuments();

  const totalPages = Math.ceil(totalDocs / blogsPerPage);

  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" && true;
  }

  const blogs = await Blog.find(queryObj)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(blogsPerPage);

  if (!blogs) {
    throw new BadRequestError("No blogs found");
  } else {
    res.status(200).json({ blogs, nBHits: blogs.length, totalPages });
  }
};

// category specific blogs
const getBlogsByCategories = async (req, res) => {
  const { category } = req.params;
  const { featured, page } = req.query;

  const queryObj = {};

  if (category) {
    queryObj.category = category;
  }

  if (featured) {
    queryObj.featured = featured === "true" && true;
  }

  const totalDocs = await Blog.countDocuments(queryObj);

  const totalPages = Math.ceil(totalDocs / blogsPerPage);

  const blogs = await Blog.find(queryObj)
    .sort({ createdAt: -1 })
    .skip((parseInt(page) - 1) * blogsPerPage)
    .limit(blogsPerPage);

  if (blogs.length === 0) {
    const customErr = new BadRequestError("No Blogs Found");
    res.status(customErr.statusCode).json(customErr.message);
  } else {
    res.status(200).json({ blogs, nBHits: blogs.length, totalPages });
  }
};

// get single Blog
const getSingleBlog = async (req, res) => {
  const { id: blogID } = req.params;
  const blog = await Blog.findOne({ _id: blogID });

  if (!blog) {
    const customErr = new BadRequestError(`No blog with ID: ${blogID}`);
    res.status(customErr.statusCode).json(customErr.message);
  } else {
    res.status(200).json({ blog });
  }
};

module.exports = {
  getAllBlogs,
  getBlogsByCategories,
  getSingleBlog,
};

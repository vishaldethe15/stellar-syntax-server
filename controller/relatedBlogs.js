const Blog = require("../models/Blog");
const { BadRequestError } = require("../errors");

const blogsPerPage = 5;

// get related blogs

const getRelatedBlogs = async (req, res) => {
  const { tags } = req.query;

  const matchingTags = tags.split(",");

  const relatedBlogs = await Blog.find({ tags: { $in: matchingTags } })
    .sort({ createdAt: -1 })
    .limit(blogsPerPage)
    .exec();

  if (!relatedBlogs || relatedBlogs.length === 0) {
    const customErr = new BadRequestError(`No related blogs found`);
    res.status(customErr.statusCode).json(customErr.message);
  } else {
    res.status(200).json({ relatedBlogs });
  }
};

module.exports = { getRelatedBlogs };

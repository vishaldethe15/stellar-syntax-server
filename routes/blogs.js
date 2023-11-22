const express = require("express");
const router = express.Router();
const {
  getAllBlogs,
  getSingleBlog,
  getBlogsByCategories,
} = require("../controller/blogs");

router.route("/").get(getAllBlogs);

router.route("/:category").get(getBlogsByCategories);

router.route("/:category/:id").get(getSingleBlog);

module.exports = router;

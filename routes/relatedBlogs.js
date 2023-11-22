const express = require("express");
const router = express.Router();

const { getRelatedBlogs } = require("../controller/relatedBlogs");

router.route("/").get(getRelatedBlogs);

module.exports = router;

const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "blog title is required"],
    },
    subTitle: {
      type: String,
      required: [true, " blog subtitle is required"],
    },
    author: {
      type: String,
      required: [true, "author name is required"],
      default: "Vishal",
    },
    authorImg: {
      type: String,
      required: [true, "author image is required"],
      default:
        "https://oladino.com/wp-content/uploads/2022/07/Anime-Naruto-Uzumaki-Lovers-Anime-Character-Lovers-SVG-SVG010722T007.jpg",
    },
    blogImg: {
      type: String,
      required: [true, "blog image is required"],
      default:
        "https://kluppy.com/wp-content/plugins/tutor/assets/images/placeholder.svg",
    },
    blogDesc: {
      type: String,
      required: [true, "blog desc is required"],
    },
    featured: {
      type: Boolean,
      default: false,
    },

    category: {
      type: String,
      enum: {
        values: ["programming", "space"],
        message: "{VALUE} is not supported",
      },
    },

    tags: {
      type: Array,
      required: [true, "tags are required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);

const express = require("express");
const app = express();

const connectDB = require("./db/connect");

const cors = require("cors");
require("dotenv").config();

const blogsRouter = require("./routes/blogs");
const relatedBlogsRouter = require("./routes/relatedBlogs");

const errorHandler = require("./middleware/error-handler");

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/blogs", blogsRouter);
app.use("/api/v1/related-blogs", relatedBlogsRouter);

app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("app is running");
});

const port = 3300;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();

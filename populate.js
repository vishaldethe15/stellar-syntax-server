require("dotenv").config();
const connectDB = require("./db/connect");

const Blogs = require("./models/Blog");

const jsonData = require("./blogs.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Blogs.deleteMany();
    await Blogs.create(jsonData);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();

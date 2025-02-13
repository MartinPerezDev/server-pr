import express from "express";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async (req, res) => {
  try {
    const posts = await Post.find().lean();
    for (const post of posts) {
      const user = await User.findById(post.userId); // Buscar usuario por ID
      post.name = user.name;
    }
    res.render("home", { posts });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
})

viewsRouter.get("/post", async (req, res) => {
  try {
    res.render("post");
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
})

viewsRouter.get('/register', (req, res) => {
  res.render('register');
});

viewsRouter.post('')


export default viewsRouter;
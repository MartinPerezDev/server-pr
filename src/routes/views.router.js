import express from "express";
import Post from "../models/post.model.js";

const viewsRouter = express.Router();

viewsRouter.get("/", async(req, res)=> {
  try {
    const posts = await Post.find().lean();
    res.render("home", { posts });
  } catch (error) {
    res.status(500).send({ status: "error", message: err.message });
  }
})

export default viewsRouter;
import express from 'express';
import Post from '../models/post.model.js';

const postRouter = express.Router();

// Ruta para crear un nuevo post
postRouter.post('/', async (req, res) => {
  const { userId, text } = req.body;
  try {
    const post = new Post({ userId, text });
    await post.save();
    res.status(201).send({ status: "success", payload: post });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

// Ruta para obtener todos los posts
postRouter.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(201).send({ status: "success", payload: posts });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

export default postRouter;

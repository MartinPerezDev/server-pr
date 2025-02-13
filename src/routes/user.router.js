import express from 'express';
import User from '../models/user.model.js';

const userRouter = express.Router();

// Ruta para crear un nuevo usuario
userRouter.post('/', async (req, res) => {
  const { name, profilePic } = req.body;
  try {
    const user = new User({ name, profilePic });
    await user.save();
    res.status(201).send({ status: "success", payload: user });
  } catch (err) {
    res.status(500).send({ status: "error", message: err.message });
  }
});

export default userRouter;

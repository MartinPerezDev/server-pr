import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // ID del usuario como string
  text: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

export default Post;

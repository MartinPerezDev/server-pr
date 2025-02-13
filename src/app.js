import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.router.js';
import postRouter from './routes/post.router.js';
import viewsRouter from './routes/views.router.js';
import { engine } from "express-handlebars"
import { Server } from 'socket.io';
import Post from "./models/post.model.js"

//inicializamos nuestras variables de entorno
dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const PORT = 8080;

app.use(express.json());
app.use(express.static("public"));

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set("views", "./src/views");

const connectMongoDB = async() => {
  try {
    await mongoose.connect(process.env.URI_MONGODB);
    console.log("Conectado con MongoDB!");
  } catch (error) {
    console.error('Error al conectar con MongoDB: ', error.message);
  }
}

connectMongoDB();

//enpoints
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/", viewsRouter);

// Manejo de WebSockets para los likes
io.on('connection', (socket) => {
  console.log('Usuario conectado');

  socket.on('like', async (postId) => {
    const post = await Post.findById(postId);
    if (post) {
      post.likes += 1;
      await post.save();
      io.emit('updateLikes', { postId, likes: post.likes }); // Enviar actualización a todos los clientes
    }
  });

  socket.on('disconnect', () => {
    console.log('Usuario desconectado');
  });
});

server.listen(PORT, ()=> {
  console.log("Servidor iniciado correctamente!");
})
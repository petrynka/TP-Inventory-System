import { Server } from "socket.io";
import http from "http";
import express from "express";
// import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } 
});

let activeConnections = 0;

io.on("connection", (socket) => {
  activeConnections++;
  console.log("Новий клієнт підключився. Активних сесій:", activeConnections);

 
  io.emit("activeSessions", activeConnections);

  socket.on("disconnect", () => {
    activeConnections--;
    console.log("Клієнт відключився. Активних сесій:", activeConnections);
    io.emit("activeSessions", activeConnections);
  });
});

server.listen(4000, () => console.log("✅ Socket.io сервер працює на порту 4000"));
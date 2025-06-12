import { Server } from "socket.io";
import http from "http";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

// Щоб правильно визначити __dirname (в ES-модулях)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Socket.io з CORS
const io = new Server(server, {
  cors: { origin: "*" }
});

// 🔌 WebSocket логіка
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

// 🧱 Обслуговуємо статичні файли з білду Vite

app.use(express.static(path.join(__dirname, "../dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../dist/index.html"));
});

// 📦 Запуск сервера
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;
console.log("👉 Зареєстровані Express-маршрути:");
app._router.stack
  .filter(r => r.route)
  .forEach(r => console.log(Object.keys(r.route.methods).join(','), r.route.path));
server.listen(PORT, () => console.log(`✅ Сервер запущений на порту ${PORT}`));
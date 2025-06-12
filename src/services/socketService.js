import { io } from "socket.io-client";

export const socket = io(import.meta.env.VITE_SOCKET_URL || window.location.origin, {
  transports: ["websocket"],
  autoConnect: true,
});

export default socket;
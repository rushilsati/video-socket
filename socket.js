const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.emit("connected");

  socket.on("join-call", (callId) => {
    socket.join(callId);
    socket.to(callId).emit("user-joined", socket.id);
    socket.on("user-disconnected", () => {
      socket.to(callId).emit("user-disconnected");
    });
  });
});

const port = process.env.PORT || 4000;

server.listen(port);

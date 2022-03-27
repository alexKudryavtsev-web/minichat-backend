const { Server } = require("socket.io");
const PORT = process.env.SOCKET_PORT;

const io = new Server({
  port: PORT,
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  let currentName;
  socket.on("login", (name) => {
    currentName = name;
    io.emit("event", {
      contentMessage: `Пользователь ${name} присоединился к беседе`,
    });
  });

  socket.on("message", (message) => {
    io.emit("message", {
      contentMessage: message,
      name: currentName,
    });
  });

  socket.on("disconnect", () => {
    io.emit("event", {
      contentMessage: `Пользователь ${currentName} вышел из беседы`,
    });
  });
});

module.exports = io;

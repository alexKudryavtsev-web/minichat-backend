const uuid = require("uuid");
const { Server } = require("socket.io");

const history = [];

const io = new Server({
  port: process.env.SOCKET_PORT,
  cors: { origin: process.env.CLIENT_URL },
});

io.on("connection", (socket) => {
  let currentUsername;
  socket.on("login", (name) => {
    currentUsername = name;
    socket.emit("history", history);
    if (currentUsername) {
      sendAndSaveMessage({
        message: `User ${name} has join`,
        isEvent: true,
      });
    }
  });

  socket.on("message", (message) => {
    sendAndSaveMessage({ message, username: currentUsername, isEvent: false });
  });

  socket.on("disconnect", () => {
    if (currentUsername) {
      sendAndSaveMessage({
        message: `User ${currentUsername} has left`,
        isEvent: true,
      });
    }
  });
});

function sendAndSaveMessage(messageObj) {
  const data = {
    ...messageObj,
    date: Date.now(),
    id: uuid.v4(),
  };
  history.push(data);
  io.emit("message", data);
}

module.exports = io;

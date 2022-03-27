const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();
const io = require("./socket/socket.js");

const app = express();
const httpServer = http.createServer(app);
io.attach(httpServer);

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  })
);

async function start() {
  try {
    const HTTP_PORT = process.env.HTTP_PORT;
    await mongoose.connect(
      `mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0.lyps2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );
    httpServer.listen(HTTP_PORT, 511, () => {
      console.log(`Server started on ${HTTP_PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

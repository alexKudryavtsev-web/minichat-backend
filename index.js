const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();
const HTTP_PORT = process.env.HTTP_PORT;

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
  })
);
app.get("/", (req, res) => {
  res.json("Hello World");
});

async function start() {
  try {
    await mongoose.connect(
      `mongodb+srv://user:${process.env.DB_PASSWORD}@cluster0.lyps2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );

    httpServer.listen(HTTP_PORT, 511, () => {
      console.log(`Server start on ${HTTP_PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();

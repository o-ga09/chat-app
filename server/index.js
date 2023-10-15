"use strict";
// import {express} from 'express';
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const app = express();
const port = 8080;
const cors = require("cors");
const socketOptions = {
    cors: {
        origin: "http://localhost:3000",
    },
};
const httpServer = http.createServer({}, app);
const io = socketIo(httpServer, socketOptions);
const corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));
io.on("connection", (socket) => {
    console.log("user connected");
    socket.on("send message", (msg) => {
        io.emit("receive message", msg);
        console.log(msg);
    });
});
// ルーティングの設定
app.get("/", (req, res) => {
    res.send("Hello World!");
    console.log("/ へアクセスがありました");
});
// HTTPサーバを起動する
httpServer.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
});

// import {express} from 'express';
const express = require("express");
const app  = express();
const port = 8080;

// ルーティングの設定
app.get("/", (req, res) =>{
  res.send('Hello World!');
  console.log("/ へアクセスがありました");
});

// HTTPサーバを起動する
app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
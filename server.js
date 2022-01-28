const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const http = require("http");
const app = express();
const server = http.createServer(app);

(async function () {
    try {
      // db connection
      console.log("test");
      await mongoose.connect("mongodb://localhost:27017/PracIntegral");
      console.log("DB CONNECTED");
      server.listen(80, () => // 서버 실행
        console.log("Server is listening to port: ", 80)
      );
    } catch (err) {
      console.log("DB CONNECTION ERROR");
      console.log(err);
    }
  })();
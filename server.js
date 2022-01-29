const express = require('express');
const mongoose = require('mongoose');
const http = require("http");
const app = express();
const server = http.createServer(app);
const { Socket } = require('./socket.js');


(async function () {
    try {
      // db connection
      console.log("test");
      await mongoose.connect("mongodb://localhost:27017/PracIntegral");
      console.log("DB CONNECTED");
      Socket(server, app); // socket connection start
      server.listen(80, () => 
        console.log("Server is listening to port: ", 80)
      );
    } catch (err) {
      console.log(err);
    }
  })();
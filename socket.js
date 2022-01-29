const SocketIO = require("socket.io");

const Socket = async (server) => {
    const io = SocketIO(server, {path: "/socket.io"});
    io.on("connection", (socket) => {
        //at here we handle the socket event(?)
        const req = socket.request;
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
        console.log(
          `${ip} Client Connected, socket id: ${socket.id}, req.ip: ${req.ip}`  
        );

        socket.on("disconnect", ()=> {
            console.log(`${ip} Client disconnected, socket id: ${socket.id}`);
            //clearInterval(socket.interval);
        });

        socket.on("error", (error) => {});

        socket.on("answer", (data) => {
            console.log(data);

        });

        socket.emit("problem",);

    }) 
}

module.exports = {Socket};
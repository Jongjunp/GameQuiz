const SocketIO = require("socket.io");


const Socket = async (server,app) => {
    const io = SocketIO(server, {path: "/socket.io"});
    app.set('io',io);

    const room = io.of('/room');
    const chat = io.of('/chat');

    //room namespace
    room.on("connection", (socket) => {
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

        //problem send
        socket.emit("problem",() => {
            
        })

        socket.on("answer", (data) => {
            console.log(data);

        });

    })
    
    //chat namespace
    chat.on("connection", (socket) => {
        const req = socket.request;
        const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
      
        socket.on("disconnect", ()=> {
            console.log(`${ip} Client disconnected, socket id: ${socket.id}`);
        });

        socket.on("error", (error) => {});



    })
}

module.exports = {Socket};
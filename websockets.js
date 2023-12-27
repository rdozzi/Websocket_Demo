const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.static('public')); // express.static files in the named directory will act as static resources
const server = http.createServer(app);

// After extracting the Server object from socket.io, we then add our express app server as a new object
// of the Socket.io server
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("User Connected", socket.id);
    // setInterval(() => {
    //     socket.emit("message", "hello from server" + " - " + new Date().getTime())
    // }, 2000);

    // Broadcast Set Up
    socket.on("message", (data) => {
        socket.broadcast.emit("broadcast",data);
    })

    // Disconnect Event
    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })

});

// app.get('/', (req,res) => {
//     res.send('Hello World')
// })

server.listen(3000,() => {
    console.log("Server Started");
})


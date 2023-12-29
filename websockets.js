const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
app.use(express.static('public')); // express.static files in the named directory will act as static resources
const server = http.createServer(app);

// After extracting the Server object from socket.io, we then add our express app server as a new object
// of the Socket.io server
const io = new Server(server);
let room;

io.on("connection", (socket) => {
    console.log("user connected", socket.id);
    // setInterval(() => {
    //     socket.emit("message", "hello from server" + " - " + new Date().getTime())
    // }, 2000);

    /** Broadcast Setup */
    socket.on("message", (data) => {
        socket.broadcast.emit("broadcast",data);
    })

    /** Listen to Create Group */
    socket.on("create group", (roomId, callback) => {
        console.log("group created",roomId);
        room = roomId;
        socket.join(roomId); //first member of the room
        callback("group created")
    })

    /** Listen to Join Group */
    socket.on("join_grp", () => {
        console.log(socket.id + "joined the room " + room);
        socket.join(room);
    });

    socket.on("grp message", (data) => {
        socket.to(room).emit("server_grp_msg",data);
    })

    /**  Disconnect Event */
    socket.on("disconnect", () => {
        console.log("user disconnected", socket.id);
    })

});

// app.get('/', (req,res) => {
//     res.send('Hello World')
// })

server.listen(3000,() => {
    console.log("Server Started");
})


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

// After extracting the Server object from socket.io, we then add our express app server as a new object
// of the Socket.io server
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("User Connected")
})

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(3000,() => {
    console.log("Server Started")
})


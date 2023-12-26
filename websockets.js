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
    console.log("User Connected");
    socket.emit("Message: ", "Welcome from Server")
});

// app.get('/', (req,res) => {
//     res.send('Hello World')
// })

app.listen(3000,() => {
    console.log("Server Started")
})


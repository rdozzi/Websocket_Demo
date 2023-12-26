const express = require('express');
const http = require('http');

const app = express();
const server = http.createServer(app);

app.get('/', (req,res) => {
    res.send('Hello World')
})

app.listen(3000,() => {
    console.log("Server Started")
})


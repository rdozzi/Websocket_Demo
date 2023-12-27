const socket = io(); // Available in global scope because of server side code
socket.on("message", (message) =>{
    console.log("receiving message", message);
})
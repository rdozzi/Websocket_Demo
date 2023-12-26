const socket = io(); // Available in global scope because of server side code
socket.on("Message", (message) =>{
    console.log("receiving message", message)
})

const socket = io(); // Available in global scope because of server side code
const btn = document.getElementById("btn"); // Recall that you should call elements by id
const input = document.getElementById("message");

btn.addEventListener("click", () =>{
    console.log("sending message", input.value);
    socket.emit("message", input.value);
    input.value="";
});

socket.on("message", (message) =>{
    console.log("receiving message", message);
})
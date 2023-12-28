const socket = io(); // Available in global scope because of server side code
const btn = document.getElementById("send"); // Recall that you should call elements by id
const input = document.getElementById("message");
const ul = document.getElementById("list");

btn.addEventListener("click", () =>{
    const value = input.value;
    const div = document.createElement("div");
    div.setAttribute("class","sender");
    const li = document.createElement("li");
    li.innerText = value;
    const para = document.createElement("p");
    para.innerText = "sender";
    div.appendChild(para);
    div.appendChild(li);
    ul.appendChild(div);

    console.log("sending message", input.value);
    socket.emit("message", input.value);
    input.value="";
});

socket.on("message", (message) =>{
    console.log("receiving message", message);
})
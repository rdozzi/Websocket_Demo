const socket = io(); // Available in global scope because of server side code
const btn = document.getElementById("send"); // Recall that you should call elements by id
const input = document.getElementById("message");
const ul = document.getElementById("list");
const grpBtn = document.getElementById("createGrp");
const joinGrp = document.getElementById("joinGrp");
const stg = document.getElementById("stg");
const leaveBtn = document.getElementById("leave");


/** Button to send messages */
btn.addEventListener("click", () =>{
    const value = input.value;
    const div = document.createElement("div");
    div.setAttribute("class","sender");
    const li = document.createElement("li");
    li.innerText = value; //value
    const para = document.createElement("p");
    para.innerText = "sender";
    div.appendChild(para);
    div.appendChild(li);
    ul.appendChild(div);

    console.log("sending message", input.value);
    socket.emit("message", input.value);
    input.value="";
});

/** Method to broadcast message from sender */
socket.on("broadcast", (message) => {
    console.log("broadcast message",message);
    const div = document.createElement("div");
    div.setAttribute("class","receiver");
    const li = document.createElement("li")
    li.innerText = message;
    const para = document.createElement("p");
    para.innerText = "receiver";
    div.appendChild(para);
    div.appendChild(li);
    ul.appendChild(div);

});

/** Button/Listener to Create Group */
grpBtn.addEventListener("click", () =>{
    console.log("group created req");
    socket.emit(
        "create group", // create_grp
        Math.floor(Math.random(0, 1) * 1000),
        (response) => {
            console.log(response);
        }
    );
});

/** Button/Listener to Join Group */
joinGrp.addEventListener("click", () => {
    console.log("group joined req");
    socket.emit("join_grp");
});

/** Button/Listener to Broadcast to Group */
stg.addEventListener("click", () => {
    const value = input.value;
    if(value){
        socket.emit("server_grp_msg",value); //grp message
    }
});

leaveBtn.addEventListener("click", () => {
    socket.emit("leave_room")
})

socket.on("server_grp_msg", (data) =>{
    console.log("grp message", data)
});

socket.on("message", (message) =>{
    console.log("receiving message", message);
});
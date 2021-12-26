let chatTypeInput = document.getElementById("msg");
let sendButton = document.getElementById("send-button");
let displayMessage = document.getElementById("chat-message-display");
let addUserDiv = document.getElementById("add-user-here");
let channelNameP = document.getElementById("channel-name");
const socket = io(window.location.origin, {
    transports: ["websocket"],
});
// const socket = io("http://localhost:3000", {
//     transports: ["websocket"],
// });

const { username, channel } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
});

// Channel join send to server
socket.emit("joinChannel", { username, channel });

// To update the Channel & User info
socket.on("channelInfo", ({ username, channel }) => {
    updateChannelName(channel);
    updateUserName(username);
});

// Receive the message from server
socket.on("message", (message) => {
    renderMessage(message);

    // Scroll down to latest message
    displayMessage.scrollTop = displayMessage.scrollHeight;
});

// Type message & send to server
sendButton.addEventListener("click", () => {
    // Get typed message
    let msg = chatTypeInput.value;

    // Emit the message to a server
    socket.emit("chatMessage", msg);

    // Clear input
    chatTypeInput.value = "";
    chatTypeInput.focus();
});

// To render message on DOM
function renderMessage(message) {
    if (message.username === username) {
        let div = document.createElement("div");
        div.classList.add("chat-body-right-container-other2");
        div.innerHTML = ` 
                        <span><b>${message.username}(you)</b></span>
                        <span>${message.time}</span>
                        <p>
                           ${message.text}
                        </p>`;
        displayMessage.appendChild(div);
    }
    else { 
        let div = document.createElement("div");
        div.classList.add("chat-body-right-container-other1");
         div.innerHTML = ` 
                        <span><b>${message.username}</b></span>
                        <span>${message.time}</span>
                        <p>
                           ${message.text}
                        </p>`;
         displayMessage.appendChild(div);
    }
}

// To update the channel name at leftside bar
function updateChannelName(channel) {
    channelNameP.innerHTML = channel;
}

// To add or update the Username at leftside bar
function updateUserName(username) {
    addUserDiv.innerHTML = `${username.map(
        (userr) => `<p>${userr.username}</p>`
    ).join('')}`
}

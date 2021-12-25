let chatTypeInput = document.getElementById("msg");
let sendButton = document.getElementById("send-button");
let displayMessage = document.getElementById("chat-message-display");
const socket = io("http://localhost:3000");

socket.on("message", (message) => {
    console.log(message);
    renderMessage(message);

    // Scroll down to latest message
    displayMessage.scrollTop = displayMessage.scrollHeight;
});

sendButton.addEventListener("click", () => {
    // Get typed message
    let msg = chatTypeInput.value;

    // Emit the message to a server
    socket.emit("chatMessage", msg);

    // Clear input
    chatTypeInput.value = '';
});

// To render message on DOM
function renderMessage(message) {
    let div = document.createElement('div');
    div.innerHTML = ` 
                        <span>Bhanu</span>
                        <span>2:15am</span>
                        <p>
                           ${message}
                        </p>`;
    displayMessage.appendChild(div);
}

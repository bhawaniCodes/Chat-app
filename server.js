require('dotenv').config();
const formatMessage = require('./utils/messages');
const {userJoin, getCurrentUser, leaveUser, getChannelStudents } = require('./utils/users')
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();

// Static file set
app.use('/static', express.static(path.join(__dirname, 'public')));
// this http & createserver use internally but we want
//  it here to use server for socket
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;

const chatBotName = 'StudentChatBot';


// Run when a Client connects
io.on('connection', (socket) => {

    // To join the student inside the channel
    socket.on("joinChannel", ({ username, channel }) => {
        const user = userJoin(socket.id, username, channel);

        // join user to specific channel
        socket.join(user.channel);

        // To emit message to specific joined student
        socket.emit(
            "message",
            formatMessage(chatBotName, "Welcome to Student-Chat-bot")
        );

        // Broadcast on user connects - To send message to everyone except me
        socket.broadcast
            .to(user.channel)
            .emit(
                "message",
                formatMessage(chatBotName, `${user.username} has joined the chat`)
        );
        
        // To update Channel & User info
        io.to(user.channel).emit("channelInfo", {
            username: getChannelStudents(user.channel),
            channel: user.channel,
        });
    });
    
    // Get the chatMessage from client side
    socket.on('chatMessage', (msg) => { 
        const user = getCurrentUser(socket.id);

        io.to(user.channel).emit('message', formatMessage(user.username, msg));
    })

    // Runs when user disconnects
    socket.on('disconnect', () => {
        const user = leaveUser(socket.id);

        if (user) {
            io.to(user.channel).emit(
                "message",
                formatMessage(chatBotName, `${user.username} has left the chat`)
            );
        }

        // To update Channel & User info
        io.to(user.channel).emit("channelInfo", {
            username: getChannelStudents(user.channel),
            channel: user.channel,
        });
    })
})

server.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});

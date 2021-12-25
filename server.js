require('dotenv').config();
const cors = require('cors');
const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const app = express();
app.use(cors());

// Static file set
app.use('/static', express.static(path.join(__dirname, 'public')));
// this http & createserver use internally but we want
//  it here to use server for socket
const server = http.createServer(app);
const io = socketio(server);

const PORT = process.env.PORT || 3000;
// Set static folder

// Run when a Client connects
io.on('connection', (socket) => {
    
    // To emit message
    socket.emit('message', 'Welcome to Chat-bot')

    // Broadcast on user connects
    socket.broadcast.emit('message', 'A student has joined chat');

    // Runs when user disconnects
    socket.on('disconnect', () => { 
        io.emit('message', 'A student has left the chat');
    })

    // Get the chatMessage from client side
    socket.on('chatMessage', (msg) => { 
        console.log(msg)
        io.emit('message', msg);
    })
})

server.listen(PORT, () => {
    console.log(`connected to port ${PORT}`);
});

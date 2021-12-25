
let users = [];

// Join student to chat
const userJoin = (id, username, channel) => { 
    const user = { id, username, channel };

    users.push(user);

    return user;
}

// get current student
const getCurrentUser = (id) => {
    return users.find((user) => user.id === id)
}

// Leave user
const leaveUser = (id) => { 
    const index = users.findIndex(user => user.id === id);

    if (index !== -1) { 
        return users.splice(index, 1)[0];
    }
}

// Get channel students
const getChannelStudents = (channel) => { 
    return users.filter(user => user.channel === channel);
}

module.exports = { userJoin, getCurrentUser, leaveUser, getChannelStudents };

const d = new Date();
let hour =
     ((d.getHours() + 5) === 12 ? '12' : (d.getHours()+5) % 12) +
    ":" +
    (d.getMinutes() + 30) +
    ` ${(d.getHours() + 5) >= 12 ? "pm" : "am"}`;

function formatMessage(username, text) {
    return {
        username,
        text,
        time: hour
    }
}

module.exports = formatMessage;
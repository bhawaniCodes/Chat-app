let moment = require('moment');

let timeZone = moment.clone().tz("Asia/Kolkata");

console.log("timeee", timeZone.format());

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;
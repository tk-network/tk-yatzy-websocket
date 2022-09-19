// Raum löschen, wenn keine Teilnehmer mehr drin sind
const moment = require("moment");

module.exports = (wss) => {
    wss.rooms.forEach((room, index, object) => {
        if(!room.members.length && moment().diff(room.lastDisconnect, "minutes") > 10) {
            object.splice(index, 1);
        }
    });
}
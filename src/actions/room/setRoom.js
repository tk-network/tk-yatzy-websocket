const moment = require("moment");

module.exports = function() {
    const room = this.wss.rooms.find(room => room.id == this.data);
    if(!room) return this.message("error", "Fehler!", "Der Raum konnte nicht gefunden werden!");

    room.members.push({ time: moment(), user: this.ws.id });
    
    this.wss.send(this.ws, {
        action: "setup",
        data: {
            key: "room",
            value: room.id,
        }
    });

    this.broadcastRoom(room.id);
}
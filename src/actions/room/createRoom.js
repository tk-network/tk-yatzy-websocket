const moment = require("moment");

module.exports = function() {
    let finish = false;
    let roomNumber = 0;

    while(finish === false) {
        roomNumber = Math.floor(Math.random() * 100000) + 99999;
        if(!this.wss.rooms.find(room => room.id == roomNumber)) finish = true;
    }

    this.wss.rooms.push({
        id: roomNumber,
        presenter: this.ws.id,
        members: [ { time: moment(), user: this.ws.id } ],
        round: 1,
        rounds: [],
        activeUser: this.ws.id,
        numberOfThrows: 0,
        lastDisconnect: null,
    });

    this.wss.send(this.ws, {
        action: "setup",
        data: {
            key: "room",
            value: roomNumber,
        }
    });

    this.broadcastRoom(roomNumber);
}
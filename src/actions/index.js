class handler {
    constructor(wss, ws, data) {
        this.wss = wss;
        this.ws = ws;
        this.data = data;
    }
    // global
    broadcast = require("./global/broadcast");
    message = require("./global/message");

    // user
    setUsername = require("./user/setUsername");

    // room
    setRoom = require("./room/setRoom");
    createRoom = require("./room/createRoom");
    broadcastRoom = require("./room/broadcastRoom");

    // round
    nextRound = require("./round/nextRound");

    // cube
    roleTheCube = require("./cube/roleTheCube");
    setField = require("./cube/setField");
}

module.exports = handler;
class handler {
    constructor(wss, ws, data) {
        this.wss = wss;
        this.ws = ws;
        this.data = data;
    }
    broadcast = require("./global/broadcast");

    setUsername = require("./user/setUsername");
    setRoom = require("./room/setRoom");
    createRoom = require("./room/createRoom");
    broadcastRoom = require("./room/broadcastRoom");
    roleTheCube = require("./cube/roleTheCube");
    setField = require("./cube/setField");
}

module.exports = handler;
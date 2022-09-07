// Importing the required modules
const WebSocketServer = require("ws");
const handler = require("./src/actions");
const WebSocketHandler = require("./src/actions");
 
// Creating a new websocket server
const port = process.env.PLATTFORM == "production" ? 8091 : 8080;
const wss = new WebSocketServer.Server({ port: port })

wss.getUniqueID = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }
    return s4() + s4() + '-' + s4();
};

wss.send = function(ws, data) {
    ws.send(JSON.stringify(data));
}

wss.rooms = [];
wss.cubeSpinCount = 6;
wss.cubeSpinTime = 300;
 
// Creating connection using websocket
wss.on("connection", ws => {
    ws.id = wss.getUniqueID();
    console.log(`new client connected (${ws.id})`);

    wss.send(ws, { action: "setup", data: {
        key: "id",
        value: ws.id,
    } })

    // sending message
    ws.on("message", data => {
        data = JSON.parse(data);
        const handler = new WebSocketHandler(wss, ws, data.data);

        switch(data.action) {
            case "setUsername":
                return handler.setUsername();
            case "setRoom":
                return handler.setRoom();
            case "createRoom":
                return handler.createRoom();
            case "roleTheCube":
                return handler.roleTheCube();
            case "setField":
                return handler.setField();
        }
        /*
        wss.clients.forEach(function(client) {
            client.send(data.toString());
        });
        */
    });
    // handling what to do when clients disconnects from server
    ws.on("close", () => {
        const handler = new WebSocketHandler(wss, ws, null);

        wss.rooms.forEach((room, index, object) => {
            // Teilnehmer aus Teilnehmerliste entfernen
            let memberIndex = room.members.findIndex(member => member.user == ws.id);
            if(index != -1) {
                room.members.splice(memberIndex, 1);
                handler.broadcastRoom(room.id)
            }

            // Raum löschen, wenn keine teilnehmer mehr drin sind
            if(!room.members.length) return object.splice(index, 1);

            // Neuen Moderator auswählen
            if(room.presenter == ws.id) {
                room.presenter = room.members[0].user;
                handler.broadcastRoom(room.id)
            }
        });

        console.log("the client has connected");
    });
    // handling client connection error
    ws.onerror = function () {
        console.log("Some Error occurred")
    }
});
console.log("The WebSocket server is running on port 8080");
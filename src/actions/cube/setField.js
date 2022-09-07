const rules = require("./rules");

module.exports = function() {
    const room = this.wss.rooms.find((room) => room.members.some(member => member.user == this.ws.id));

    if(room.activeUser != this.ws.id) return this.wss.send(this.ws, { action: "error", data: "Du bist nicht dran!" });

    const round = room.rounds[room.rounds.length-1];
    round.fieldId = this.data;
    if(!(this.data in rules)) return this.wss.send(this.ws, { action: "error", data: "Feld nicht gefunden!" });
    round.fieldValue = rules[this.data](Object.values(round.thrownNumbers));

    let memberIndex = room.members.findIndex(member => member.user == this.ws.id);
    room.activeUser = room.members[memberIndex == room.members.length-1 ? 0 : memberIndex + 1].user;
    room.numberOfThrows = 0;

    this.broadcastRoom(room.id);
}
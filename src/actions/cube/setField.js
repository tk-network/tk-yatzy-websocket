const rules = require("./rules");

module.exports = function() {
    const room = this.wss.rooms.find((room) => room.members.some(member => member.user == this.ws.id));

    if(room.activeUser != this.ws.id) return this.message("error", "Fehler!", "Du bist nicht dran!");

    const round = room.rounds[room.rounds.length-1];
    round.fieldId = this.data;
    if(!(this.data in rules)) return this.message("error", "Fehler!", "Feld nicht gefunden!");
    round.fieldValue = rules[this.data](Object.values(round.thrownNumbers));

    let memberIndex = room.members.findIndex(member => member.user == this.ws.id);
    room.activeUser = room.members[memberIndex == room.members.length-1 ? 0 : memberIndex + 1].user;
    room.numberOfThrows = 0;

    this.broadcastRoom(room.id);

    if(Object.keys(rules).length * room.members.length == room.rounds.filter(round => round.round == room.round && round.fieldId).length) {
        this.broadcast("modal", { component: "winnersPodium", data: room.rounds.filter(r => r.round == room.round) }, room.id)
    }
}
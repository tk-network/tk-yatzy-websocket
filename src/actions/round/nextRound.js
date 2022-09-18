module.exports = function(actionBy) {
    const room = this.wss.rooms.find((room) => room.members.some(member => member.user == this.ws.id));

    if(room.presenter != this.ws.id && actionBy != "system") return this.message("error", "Fehler!", "Du bist nicht der Moderator!");

    room.round++;
    room.numberOfThrows = 0;
    room.activeUser = room.members[0].user;

    this.broadcastRoom(room.id);
}
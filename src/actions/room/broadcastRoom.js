module.exports = function(roomId) {
    const room = this.wss.rooms.find(room => room.id == roomId);
    if(!room) return this.wss.send(this.ws, { action: "error", data: "Der Raum konnte nicht gefunden werden!" });

    const users = [...this.wss.clients].map(client => {
        if(!room.members.some(member => member.user == client.id)) return false;
        return {
            id: client.id,
            username: client.username,
        }
    });

    this.broadcast("room", { room: room, users: users.filter(user => user) }, roomId)
}
module.exports = function(action, data, roomId) {
    const filter = roomId ? (room) => room.id == roomId : (room) => room.members.some(member => member.user == this.ws.id);
    const room = this.wss.rooms.find(filter);
    if(!room) return this.wss.send(this.ws, { action: "error", data: "Der Raum konnte nicht gefunden werden!" });

    this.wss.clients.forEach(client => {
        if(room.members.some(member => member.user == client.id)) {
            this.wss.send(client, {
                action: action,
                data: data,
            });
        }
    });
}
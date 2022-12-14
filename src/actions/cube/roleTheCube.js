const moment = require("moment");
const rules = require("./rules");

module.exports = function() {
    const room = this.wss.rooms.find((room) => room.members.some(member => member.user == this.ws.id));
    let data = {};

    if(Object.keys(rules).length * room.members.length == room.rounds.filter(round => round.round == room.round && round.fieldId).length) {
        return this.message("error", "Fehler!", "Die Runde ist bereits zuende!");
    }
    if(room.activeUser != this.ws.id) return this.message("error", "Fehler!", "Du bist nicht dran!");
    if(room.numberOfThrows == 3) return this.message("error", "Fehler!", "Maximale Anzahl an Würfen in dieser Runde ist erreicht!");

    if(room.numberOfThrows == 0) {
        room.rounds.push({
            time: moment(),
            round: room.round,
            user: this.ws.id,
            thrownNumbers: {},
            fieldId: "",
            fieldValue: 0,
        })
    }
    room.numberOfThrows++;

    const round = room.rounds[room.rounds.length-1];
    
    this.data.forEach(position => {
        let numbers = [];

        while(numbers.length < this.wss.cubeSpinCount) {
            let found = false;
            let number = 0;
    
            while(found === false) {
                number = Math.floor(Math.random() * 6) + 1;
                if(!numbers.length || numbers[numbers.length-1] != number) found = true;
            }
    
            numbers.push(number);
        }
    
        data[position] = numbers;

        // zur aktuellen Runde hinzufügen
        round.thrownNumbers[position] = numbers[this.wss.cubeSpinCount-1];
    })
    
    setTimeout(() => this.broadcastRoom(room.id), this.wss.cubeSpinTime * this.wss.cubeSpinCount);
    this.broadcast("cube", data);
}
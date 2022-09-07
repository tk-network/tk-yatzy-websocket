module.exports = function() {
    this.ws["username"] = this.data;
    return this.wss.send(this.ws, {
        action: "setup",
        data: {
            key: "username",
            value: this.data,
        }
    })
}
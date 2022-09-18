module.exports = function(type, title, message) {
    this.wss.send(this.ws, {
        action: "message",
        data: {
            type: type,
            title: title,
            message: message,
        },
    });
}
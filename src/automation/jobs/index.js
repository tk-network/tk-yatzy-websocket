const fs = require("fs");
const path = require("path");

module.exports = fs
    .readdirSync(__dirname)
    .filter(name => name != "index.js")
    .map(name => require(path.join(__dirname, name)));
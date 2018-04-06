"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var express_1 = require("./config/express");
var port = normalizePort(process.env.PORT) || 3000;
express_1.default.set('port', port);
var server = http.createServer(express_1.default);
server.listen(port);
server.on('listen', onListening);
server.on('error', onError);
function onListening() {
    var addr = server.address();
    var bind = (typeof addr === "string") ? "pipe " + addr : "port " + addr.port;
    console.info("Listening on " + bind);
}
function onError(err) {
    if (err.syscall !== "listen")
        throw err;
    var bind = (typeof port === "string") ? "pipe " + port : "port " + port;
    switch (err.code) {
        case 'EACCESS':
            console.error("You don't have access to " + bind);
            process.exit(1);
        case 'EADDRINUSE':
            console.error("The address " + bind + " is taken. Boohoo for you.");
            process.exit(1);
        default:
            throw err;
    }
}
/**
 * Normalize port
 * @param {*} val
 */
function normalizePort(val) {
    var port = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port))
        return val;
    else if (port >= 0)
        return port;
    else
        return false;
}
//# sourceMappingURL=server.js.map
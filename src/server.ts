import * as http from 'http';
import * as debug from 'debug';


import Express from './config/express';

const port = normalizePort(process.env.PORT) || 3000;


Express.set('port', port);

const server = http.createServer(Express);

server.listen(port);
server.on('listen', onListening);
server.on('error', onError);

function onListening ():void {
    let addr = server.address();
    let bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`
    console.info(`Listening on ${bind}`);
}

function onError (err: NodeJS.ErrnoException):void {
    if (err.syscall !== "listen") throw err;

    let bind = (typeof port === "string") ? `pipe ${port}` : `port ${port}`;

    switch (err.code) {
        case 'EACCESS':
            console.error(`You don't have access to ${bind}`);
            process.exit(1);

        case 'EADDRINUSE':
            console.error(`The address ${bind} is taken. Boohoo for you.`);
            process.exit(1);
        default:
            throw err;
    }
}

/**
 * Normalize port
 * @param {*} val 
 */
function normalizePort(val: number | string): number | string | boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
}
/**
 * Entry point of the application.
 * Imports App which has bootstrapped ExpressJS with config for simplicity
 * You might not need to change this file
 */

import * as http from 'http';
import App from './App';

const port = normalizePort(3000);

const server = http.createServer(App);
server.on('error', onError);
server.on('listening', onListening);
server.listen(port);

// Convert port to number
function normalizePort(val: number|string): number {
  return (typeof val === 'string') ? parseInt(val, 10) : val;
}

// Error handler
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;
  let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
  switch(error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening(): void {
  let addr = server.address();
  let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
  console.log('Server listening on ' + bind);
}
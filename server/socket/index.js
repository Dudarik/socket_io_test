import SocketClients from './clients.js';
import SocketHandlers from './handlers.js';
import { createSocketRouter } from './router.js';

/**
 *
 * @param {Server} io
 */
export const createSocket = (io) => {
  const socketClients = new SocketClients();

  const onConnection = (socket) => {
    socketClients.addClient(socket.id);

    const sh = new SocketHandlers(io, socket, socketClients);

    console.log('onConnect', socket.id);

    console.log('connection clients:', socketClients.getSocketClients());

    createSocketRouter(socket, sh);
  };

  io.on('connection', onConnection);
};

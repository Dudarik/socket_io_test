/**
 *
 * @param {Socket} socket
 * @param {SocketHandlers} sh
 */

export const createSocketRouter = (socket, sh) => {
  socket.on('disconnecting', sh.onDisconnect.bind(sh));
  socket.on('send_admin_message', sh.onSendAdminMessage.bind(sh));
};

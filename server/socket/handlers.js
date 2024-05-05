export default class SocketHandlers {
  constructor(io, socket, socketClients) {
    this.io = io;
    this.socket = socket;
    this.socketClients = socketClients;
  }
  onDisconnect() {
    console.log('onDisconnect', this.socket.id);
    this.socketClients.removeClient(this.socket.id);
    console.log('onDisconnect clients:', this.socketClients.getSocketClients());
    setTimeout(() => {
      console.log('user disconnected', this.io.engine.clientsCount);
    }, 10);
  }

  onSendAdminMessage(msg) {
    console.log(msg);
    this.socket.broadcast.emit('send_admin_message', msg);
  }
}

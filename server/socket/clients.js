export default class SocketClients {
  clients = [];
  constructor() {
    this.clients = [];
  }
  addClient(clientId) {
    this.clients.push(clientId);
  }
  removeClient(clientId) {
    this.clients.splice(this.clients.findIndex((item) => item === clientId));
  }
  getSocketClients() {
    return this.clients;
  }
}

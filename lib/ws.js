const socket = require('socket.io-client');
class Biu {
  constructor(options = {}) {
    this.name = options.name;
    this.socket = options.socket + (this.name ? (options.socket.slice(-1) === '/' ? '' : '/') + this.name : '');
    this.onConnect = options.onConnect || (() => { });
    this.onMessage = options.onMessage || (() => { });
    this.open();
  }

  open() {
    this.ws = socket(this.socket, { 'transports': ['websocket', 'polling'] });
    this.ws.on('connected', this.onConnect);
    this.ws.on('push', this.onMessage);
  }

  send(msg) {
    if(!this.ws){
      console.error('please open first');
      return;
    }
    if (msg && typeof msg === 'string') msg = { text: msg };
    if(!msg.text){
      console.error('text field cannot be empty');
      return;
    }
    this.ws.emit('message', msg);
  }

  stop() {
    if (this.ws) this.ws.disconnect();
  }

}

module.exports = Biu;
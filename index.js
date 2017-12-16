const anime = require('animejs')
const socket = require('socket.io-client/dist/socket.io.slim.js')
require('./style.css');

class Biu {
  constructor(options = {}) {
    this.name = options.name;
    this.socket = options.socket  + (this.name ? (options.socket.slice(-1) === '/' ? '' : '/') + this.name :'');
    this.defaultQueue = options.defaultQueue || [];
    this.defaultQueueInterval = options.defaultQueueInterval || 2000;
    this.duration = options.duration || 10000;
    this.minDuration = options.minDuration || 5000;
    this.colors = options.colors || ['#f55b15', '#764ba5', '#00a762', '#0193e6', '#e0463c'] ;
    this.onMessage = options.onMessage;
    // this.queue = options.queue || [];

    this.stopRandomRun = false;
    this.screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.container = document.createElement('div');
    this.container.className = 'biu-container';
  }

  openWs(){
    this.ws = socket(this.socket,{ 'transports': ['websocket','polling'] });
    // this.ws = socket(this.socket);
    this.ws.on('connected', function(data) {
      console.log('connected:', data);
    });
    this.ws.on('push', (data)=> {
      this.push(data);
    });
  }

  send(msg){
    this.ws.emit('message',msg);
  }

  push(barrage){
    // this.queue.push(barrage);
    this.draw(barrage);
  }

  draw(barrage) {
    if(typeof barrage === 'string') barrage = {text:barrage};
    if(!barrage.text) return;
    if(this.onMessage) this.onMessage(barrage);
    const dom = document.createElement('span');
    dom.innerHTML = barrage.text;
    dom.className = `biu-text ` + (barrage.className || '');

    // top and color will cover className attribute
    const style = {
      top: Math.random() * this.screenHeight + 'px',
      color: this.colors[Math.round(Math.random() * this.colors.length)]
    }
    if (typeof barrage.style === 'string'){
      try{
        barrage.style = JSON.parse(barrage.style);        
      }catch(e){
      }
    }
    Object.assign(dom.style, style, barrage.style);
    this.container.append(dom);

    // use css animation
    // dom.className += ' go';

    // use anime.js
    const width = dom.getBoundingClientRect().width;
    const duration = barrage.duration || this.duration * Math.random();
    const p = anime({
      targets: dom,
      left: -width,
      duration: duration < this.minDuration ? this.minDuration : duration,
      easing: 'easeInOutQuad',
      complete: () => {
        this.container.removeChild(dom)
      }
    })
  }

  setRandomInterval(fn, defaultQueueInterval) {
    this.stopRandomRun = false;
    const loop = () => {
      if (this.stopRandomRun) return;
      const interval = Math.round(Math.random() * defaultQueueInterval);
      setTimeout(() => {
        fn();
        loop();
      }, interval);
    };
    loop();
  }

  clearRandomInterval() {
    this.stopRandomRun = true;
  }

  startDefaultQueue() {
    if (this.defaultQueue.length > 0) {
      this.setRandomInterval(() => {
        this.draw(this.defaultQueue[Math.round(Math.random() * (this.defaultQueue.length - 1))]);
      }, this.defaultQueueInterval)
    }
  }

  start() {
    document.body.appendChild(this.container);
    this.visibleChangeEvt = ()=>{this.pause()};
    document.addEventListener("visibilitychange", this.visibleChangeEvt);
    this.openWs();
    this.startDefaultQueue();
  }

  pause() {
    this.stopRandomRun = !this.stopRandomRun;
    if (!this.stopRandomRun) {
      this.startDefaultQueue();
      this.openWs();
    }else{
      this.ws.disconnect();
    }
  }

  stop() {
    this.clearRandomInterval();
    document.removeEventListener("visibilitychange", this.visibleChangeEvt);
    if(this.ws) this.ws.disconnect();
    if (this.container) document.body.removeChild(this.container);
  }

}

module.exports = Biu;
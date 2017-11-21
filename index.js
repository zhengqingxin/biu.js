// import anime from 'animejs';
// import socket from 'socket.io-client/dist/socket.io.slim.js';
// import { setInterval } from 'timers';
const anime = require('animejs')
const socket = require('socket.io-client/dist/socket.io.slim.js')
const {setInterval} = require('timers')
require('./style.css');

class Biu {
  constructor(options = {}) {
    this.socket = options.socket;
    this.defaultQueue = options.defaultQueue || [];
    this.minInterval = options.minInterval || 2000;
    this.duration = options.duration || 10000;
    this.minDuration = options.minDuration || 5000;
    this.colors = options.colors || ['#f55b15', '#764ba5', '#00a762', '#0193e6', '#e0463c'] ;
    this.onMessage = options.onMessage;
    // this.queue = options.queue || [];

    this.stopRandomRun = false;
    this.screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.container = document.createElement('div');
    this.container.className = 'biu-container';
    this.openWs(options.socket);
  }

  openWs(){
    this.socket = socket(this.socket);
    this.socket.on('connected', function(data) {
      console.log('connected:', data);
    });
    this.socket.on('push', (data)=> {
      this.push(data);
    });
  }

  send(msg){
    this.socket.emit('message',msg);
  }

  push(barrage){
    // this.queue.push(barrage);
    this.draw(barrage);
  }

  draw(barrage) {
    if(!barrage.text) return;
    if(this.onMessage) this.onMessage(barrage);
    const dom = document.createElement('span');
    dom.innerHTML = barrage.text;
    dom.className = `biu-text`;

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

  setRandomInterval(fn, minInterval) {
    this.stopRandomRun = false;
    const loop = () => {
      if (this.stopRandomRun) return;
      const interval = Math.round(Math.random() * minInterval);
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
      }, this.minInterval)
    }
  }

  start() {
    document.body.appendChild(this.container);
    this.visibleChangeEvt = ()=>{this.pause()};
    document.addEventListener("visibilitychange", this.visibleChangeEvt);
    this.startDefaultQueue();
  }

  pause() {
    this.stopRandomRun = !this.stopRandomRun;
    if (!this.stopRandomRun) {
      this.startDefaultQueue();
      this.openWs();
    }else{
      this.socket.disconnect();
    }
  }

  stop() {
    this.clearRandomInterval();
    document.removeEventListener("visibilitychange", this.visibleChangeEvt);
    if(this.socket) this.socket.disconnect();
    if (this.container) document.body.removeChild(this.container);
  }

}

// export default Biu;
module.exports = Biu;
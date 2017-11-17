import anime from 'animejs';
require('./style.css');

class Biu {
  constructor(options = {}) {
    this.defaultQueue = options.defaultQueue || [];
    this.minInterval = options.minInterval || 2000;
    this.duration = options.duration || 10000;
    this.minDuration = options.minDuration || 5000;
    // this.queue = options.queue || [];

    this.stopRandomRun = false;
    this.screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.colors = ['#f55b15', '#764ba5', '#00a762', '#0193e6', '#e0463c'];
    this.container = document.createElement('div');
    this.container.className = 'biu-container';

  }

  push(barrage){
    // this.queue.push(barrage);
    this.draw(barrage);
  }

  draw(barrage) {
    const dom = document.createElement('span');
    dom.innerHTML = barrage.text;
    dom.className = 'biu-text';

    const style = {
      top: Math.random() * this.screenHeight + 'px',
      color: this.colors[Math.round(Math.random() * this.colors.length)]
    }
    Object.assign(dom.style, style, barrage.style);
    this.container.append(dom);

    // use css animation
    // dom.className += ' go';

    // use anime.js
    const width = dom.getBoundingClientRect().width;
    const duration = this.duration * Math.random();
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
    document.addEventListener("visibilitychange", this.pause);
    this.startDefaultQueue();
  }

  pause() {
    this.stopRandomRun = !this.stopRandomRun;
    if (!this.stopRandomRun) this.startDefaultQueue();
  }

  stop() {
    this.clearRandomInterval();
    document.removeEventListener("visibilitychange", this.pause);
    if (this.container) document.body.removeChild(this.container);
  }

}
window.Biu = Biu;
// module.exports = Biu;

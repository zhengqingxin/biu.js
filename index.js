import anime from 'animejs';
require('./style.css');

class Biu {
  constructor(options = {}) {
    this.container = document.createElement('div');
    this.container.className = 'biu-container';
    this.defaultQueue = options.defaultQueue || [];
    this.minInterval = options.minInterval || 2000;
    this.stopRandomRun = false;
    this.queue = options.queue || [];
    this.screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.colors = ['#f55b15', '#764ba5', '#00a762', '#0193e6', '#e0463c'];
  }

  draw(barrage) {
    const dom = document.createElement('span');
    dom.innerHTML = barrage.text;
    dom.className = 'biu-text';

    let style = {
      top: Math.random() * this.screenHeight + 'px',
      color: this.colors[Math.round(Math.random() * this.colors.length)]
    }
    Object.assign(dom.style, style, barrage.style);
    this.container.append(dom);

    // use css animation
    // dom.className += ' go';

    // use anime.js
    const width = dom.getBoundingClientRect().width;
    const p = anime({
      targets: dom,
      left: -width,
      duration: 10000 * Math.random(),
      easing: 'easeInOutQuad',
      complete: () => {
        this.container.removeChild(dom)
      }
    })
  }

  start() {
    document.body.appendChild(this.container);
    // run default queue
    if (this.defaultQueue.length > 0) {
      this.setRandomInterval(() => {
        this.draw(this.defaultQueue[Math.round(Math.random() * (this.defaultQueue.length - 1))]);
      }, this.minInterval)
    }
  }

  stop() {
    this.clearRandomInterval();
    document.body.removeChild(this.container);
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

}
window.Biu = Biu;
// module.exports = Biu;

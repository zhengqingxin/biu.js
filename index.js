import anime from 'animejs';
require('./style.css');

class Biu {
  constructor(options = {}) {
    this.defaultQueue = options.defaultQueue || [];
    this.minInterval = options.minInterval || 10000;
    this.stopRandomRun = false;
    this.queue = options.queue || [];
    this.screenHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }

  draw(barrage) {
    const dom = document.createElement('span');
    dom.innerHTML = barrage.text;
    dom.className = 'biu-text';
    dom.style.top = (isNaN(barrage.top) ? barrage.top : barrage.top + 'px') || Math.random() * this.screenHeight + 'px';
    document.body.append(dom);
    
    // use css animation
    // dom.className += ' go';
    
    // use anime.js
    const width = dom.getBoundingClientRect().width;
    anime({
      targets: dom,
      left: -width,
      duration: 10000,
      easing: 'easeInOutQuad'
    })
  }

  run() {
    // run default queue
    if (this.defaultQueue.length > 0) {
      this.setRandomInterval(() => {
        this.draw(this.defaultQueue[Math.round(Math.random() * (this.defaultQueue.length - 1))]);
      }, this.minInterval)
    }
  }

  setRandomInterval(fn, minInterval) {
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
module.exports = Biu;

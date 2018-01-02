require('./anime.css');

class Anime {
  constructor(options = {}) {
    this.colors = options.colors || ['#f55b15', '#764ba5', '#00a762', '#0193e6', '#e0463c'];
    this.container = document.createElement('div');
    this.container.className = 'biu-container';
    this.maxDuration = options.duration || 20000;
    this.minDuration = options.minDuration || 8000;
    
    this.windowHeight = document.body.clientHeight;
    document.body.appendChild(this.container);
  }

  run(barrage) {
    console.log(barrage);

    if (typeof barrage === 'string') barrage = { text: barrage };
    if (!barrage.text) return;

    const dom = document.createElement('span');
    dom.textContent = barrage.text;
    dom.className = 'biu-text';
    let duration = barrage.duration || this.maxDuration * Math.random();
    duration = duration < this.minDuration ? this.minDuration : duration;

    const style = {
      top: Math.random() * this.windowHeight + 'px',
      color: this.colors[Math.round(Math.random() * this.colors.length)],
      'animation-duration': duration / 1000 + 's',
    }

    if (typeof barrage.style === 'string'){
      try{
        barrage.style = JSON.parse(barrage.style);        
      }catch(e){
      }
    }
    Object.assign(dom.style, style, barrage.style);
    // use css animation
    dom.className += ' go';
    this.container.append(dom);


    var transitionEnd = this.getTransitionEndEventName();    
    dom.addEventListener(transitionEnd, ()=>{
      this.container.removeChild(dom);
    }, false);
  }

  getTransitionEndEventName () {
    var i,
        undefined,
        el = document.createElement('div'),
        transitions = {
            'transition':'transitionend',
            'OTransition':'otransitionend',  // oTransitionEnd in very old Opera
            'MozTransition':'transitionend',
            'WebkitTransition':'webkitTransitionEnd'
        };

    for (i in transitions) {
        if (transitions.hasOwnProperty(i) && el.style[i] !== undefined) {
            return transitions[i];
        }
    }
  }
}

module.exports = Anime;
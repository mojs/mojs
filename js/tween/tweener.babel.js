require('../polyfills/raf');
require('../polyfills/performance');
import h from '../h';

class Tweener {
  constructor() { this.vars(); return this; }
  
  vars () {
    this.tweens = []; this.loop = h.bind(this.loop, this);
  }

  loop() {
    if (!this.isRunning) { return false; }
    var time = performance.now(); this._update(time);
    if (!this.tweens.length) { return this.isRunning = false; }
    requestAnimationFrame(this.loop);
    return this;
  }

  startLoop() {
    if (this.isRunning) { return; }; this.isRunning = true
    requestAnimationFrame(this.loop);
  }

  stopLoop() { this.isRunning = false; }

  _update(time) {
    var i = this.tweens.length;
    while(i--) {
      if (this.tweens[i]._update(time) === true) { this.remove(i); }
    }
  }

  add(tween) {
    this.tweens.push(tween); this.startLoop();
  }
  
  removeAll() {
    this.tweens.length = 0;
  }

  remove(tween) {
    var index = (typeof tween === 'number')
      ? tween
      : this.tweens.indexOf(tween);

    if (index !== -1) { this.tweens.splice(index, 1); }
  }
}
  
var t = new Tweener
export default t;
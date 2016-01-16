require('../polyfills/raf');
require('../polyfills/performance');
import h from '../h';

class Tweener {
  constructor() { this._vars(); return this; }
  
  _vars () {
    this.tweens = []; this._loop = h.bind(this._loop, this);
  }

  _loop() {
    if (!this._isRunning) { return false; }
    var time = performance.now(); this._update(time);
    if (!this.tweens.length) { return this._isRunning = false; }
    requestAnimationFrame(this._loop);
    return this;
  }

  _startLoop() {
    if (this._isRunning) { return; }; this._isRunning = true
    requestAnimationFrame(this._loop);
  }

  _stopLoop() { this._isRunning = false; }

  _update(time) {
    var i = this.tweens.length;
    while(i--) {
      // COVER
      // cache the current tween
      var tween = this.tweens[i];
      if (tween && tween._update(time) === true) {
        this.remove(i);
        tween._prevTime = null;
      }
    }
  }
  /*
    Method to add a Tween/Timeline to loop pool.
    @param {Object} Tween/Timeline to add.
  */
  add(tween) {
    // return if tween is already running
    if ( tween._isRunning ) { return; }
    tween._isRunning = true;
    this.tweens.push(tween);
    this._startLoop();
  }
  
  removeAll() { this.tweens.length = 0; }

  remove(tween) {
    var index = (typeof tween === 'number')
      ? tween
      : this.tweens.indexOf(tween);

    if (index !== -1) {
      // cover
      if ( this.tweens[index] ) {
        this.tweens[index]._isRunning = false;
        this.tweens.splice(index, 1);
      }
    }
  }
}
  
var t = new Tweener
export default t;
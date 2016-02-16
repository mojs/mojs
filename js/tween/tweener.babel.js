import '../polyfills/raf';
import '../polyfills/performance';
import h from '../h';

class Tweener {
  constructor() { this._vars(); return this; }
  
  _vars () { this.tweens = []; this._loop = h.bind(this._loop, this); }
  /*
    Main animation loop. Should have only one concurrent loop.
    @private
    @returns this
  */
  _loop() {
    if (!this._isRunning) { return false; }
    var time = performance.now(); this._update(time);
    if (!this.tweens.length) { return this._isRunning = false; }
    requestAnimationFrame(this._loop);
    return this;
  }
  /*
    Method to start animation loop.
    @private
  */
  _startLoop() {
    if (this._isRunning) { return; }; this._isRunning = true
    requestAnimationFrame(this._loop);
  }
  /*
    Method to stop animation loop.
    @private
  */
  _stopLoop() { this._isRunning = false; }
  /*
    Method to update every tween/timeline on animation frame.
    @private
  */
  _update(time) {
    var i = this.tweens.length;
    while(i--) {
      // cache the current tween
      var tween = this.tweens[i];
      if ( tween && tween._update(time) === true ) {
        this.remove(i);
        tween._onTweenerFinish();
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
  /*
    Method stop updating all the child tweens/timelines.
    @private
  */
  removeAll() { this.tweens.length = 0; }
  /*
    Method to remove specific tween/timeline form updating.
    @private
  */
  remove(tween) {
    var index = (typeof tween === 'number')
      ? tween
      : this.tweens.indexOf(tween);

    if (index !== -1) {
      tween = this.tweens[index];
      if ( tween ) {
        tween._isRunning = false;
        this.tweens.splice(index, 1);
        tween._onTweenerRemove();
      }
    }
  }
}
  
var t = new Tweener
export default t;
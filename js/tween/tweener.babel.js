import '../polyfills/raf';
import '../polyfills/performance';
import h from '../h';

class Tweener {
  constructor() {
    this._vars();
    this._listenVisibilityChange();
    return this;
  }
  
  _vars () {
    this.tweens = [];
    this._savedTweens = [];
    this._loop = this._loop.bind(this);
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
  }
  /*
    Main animation loop. Should have only one concurrent loop.
    @private
    @returns this
  */
  _loop() {
    if (!this._isRunning) { return false; }
    this._update(window.performance.now());
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
        this.remove( tween );
        tween._onTweenerFinish();
        tween._prevTime = undefined;
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

  /*
    Method to initialize event listeners to visibility change events.
    @private
  */
  _listenVisibilityChange () {
    if (typeof document.hidden !== "undefined") {
      this._visibilityHidden = "hidden";
      this._visibilityChange = "visibilitychange";
    } else if (typeof document.mozHidden !== "undefined") {
      this._visibilityHidden = "mozHidden";
      this._visibilityChange = "mozvisibilitychange";
    } else if (typeof document.msHidden !== "undefined") {
      this._visibilityHidden = "msHidden";
      this._visibilityChange = "msvisibilitychange";
    } else if (typeof document.webkitHidden !== "undefined") {
      this._visibilityHidden = "webkitHidden";
      this._visibilityChange = "webkitvisibilitychange";
    }

    document.addEventListener(this._visibilityChange,
      this._onVisibilityChange, false);
  }
  /*
    Method that will fire on visibility change.
  */
  _onVisibilityChange () {
    if (document[this._visibilityHidden]) { this._savePlayingTweens() }
    else { this._restorePlayingTweens(); }
  }
  /*
    Method to save all playing tweens.
    @private
  */
  _savePlayingTweens () {
    this._savedTweens = this.tweens.slice(0);
    for (let i = 0; i < this._savedTweens.length; i++ ) {
      this._savedTweens[i].pause();
    }
  }
  /*
    Method to restore all playing tweens.
    @private
  */
  _restorePlayingTweens () {
    for (let i = 0; i < this._savedTweens.length; i++ ) {
      this._savedTweens[i].resume();
    }
  }
}
  
var t = new Tweener
export default t;

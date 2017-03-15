const { performance } = window;
const { now } = performance;
/**
 * Tweener - singleton object that is responsible of:
 *  - starting `requestAnimationFrame` loop
 *  - stopping `requestAnimationFrame` loop
 *  - holding `tween`/`timeline` objects and passing current time to them.
 */
class Tweener {
  constructor() {
    this._vars();
    this._listenVisibilityChange();
    return this;
  }

  /**
   * _vars - function for creating variables.
   *
   * @return {type}  description
   */
  _vars () {
    this._tweens = [];
    this._onVisibilityChange = this._onVisibilityChange.bind(this);
  }

  /**
   * _loop - main animation loop, takes care of running at most `1` animation loop
   *         and stopping itself if there is no active `tweens` left.
   * @private
   */
  _loop = () => {
    // if already running simply return immediately
    if (!this._isRunning) { return false; }
    // update all active `tweens` with current time
    this._update(now());
    // if there is no active `tweens` running - stop the `loop`
    if (!this._tweens.length) { return this._isRunning = false; }
    // else request new animation frame
    requestAnimationFrame(this._loop);
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
    var i = this._tweens.length;
    while(i--) {
      // cache the current tween
      var tween = this._tweens[i];
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
    this._tweens.push(tween);
    this._startLoop();
  }
  /*
    Method stop updating all the child tweens/timelines.
    @private
  */
  removeAll() { this._tweens.length = 0; }
  /*
    Method to remove specific tween/timeline form updating.
    @private
  */
  remove(tween) {
    var index = (typeof tween === 'number')
      ? tween
      : this._tweens.indexOf(tween);

    if (index !== -1) {
      tween = this._tweens[index];
      if ( tween ) {
        tween._isRunning = false;
        this._tweens.splice(index, 1);
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
    this._savedTweens = this._tweens.slice(0);
    for (let i = 0; i < this._savedTweens.length; i++ ) {
      this._savedTweens[i].pause();
    }
  }
  /*
    Method to restore all playing tweens.
    @private
  */
  _restorePlayingTweens () {
    if (this._savedTweens == null) { return; }

    for (let i = 0; i < this._savedTweens.length; i++ ) {
      this._savedTweens[i].resume();
    }
  }
}

var t = new Tweener
export default t;

/**
 * Tweener - singleton object that is responsible of:
 *  - starting `requestAnimationFrame` loop
 *  - stopping `requestAnimationFrame` loop
 *  - holding `tween`/`timeline` objects and passing current time to them.
 */
const tweener = {
  init() {
    this._vars();
    this._listenVisibilityChange();
    return this;
  },

  _vars () {
    this.tweens = [];
    this._savedTweens = [];
  },

  /*
   Main animation loop. Should have only one concurrent loop.
   @private
   @returns this
  */
  _loop() {
    if (tweener.tweens.length === 0) { return tweener._stopLoop(); }
    tweener.update(performance.now());
    // if (!this.tweens.length) { return this._isRunning = false; }
    requestAnimationFrame(tweener._loop);
  },

  /*
   Method to start animation loop.
   @private
  */
  _startLoop() {
    if (this._isRunning) { return; };
    this._isRunning = true;
    //  if (this.tweens.length > 0) { return; };
    requestAnimationFrame(this._loop);
  },

  /*
   Method to stop animation loop.
   @private
  */
  _stopLoop() {
    this.tweens.length = 0;
    this._isRunning = false;
  },

  /*
   Method stop updating all the child tweens/timelines.
   @private
  */
  removeAll() { this.tweens.length = 0; },

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
      tween._isRunning = false;
      this.tweens.splice(index, 1);
      //  tween._onTweenerRemove();
    }
  },

  /*
   Method to initialize event listeners to visibility change events.
   @private
  */
  _listenVisibilityChange () {
    document.addEventListener('visibilitychange', this._onVisibilityChange, false);
  },

  /*
   Method that will fire on visibility change.
  */
  _onVisibilityChange() {
    if (document['hidden']) { tweener._savePlayingTweens() }
    else { tweener._restorePlayingTweens(); }
  },

  /*
   Method to save all playing tweens.
   @private
  */
  _savePlayingTweens() {
    this._savedTweens = this.tweens.slice(0);
    for (let i = 0; i < this._savedTweens.length; i++ ) {
      this._savedTweens[i].pause();
    }
  },

  /*
   Method to restore all playing tweens.
   @private
  */
  _restorePlayingTweens () {
    for (let i=0; i < this._savedTweens.length; i++ ) {
      this._savedTweens[i].resume();
    }
  },

  /*
   Method to update every tween/timeline on animation frame.
   @private
  */
  update(time) {
    var i = this.tweens.length;
    while(i--) {
      var tween = this.tweens[i];
      if (tween.update(time) === true) {
        this.remove(tween);
        tween.onTweenerFinish();
      }
    }
  },

  /*
   Method to add a Tween/Timeline to loop pool.
   @param {Object} Tween/Timeline to add.
  */
  add(tween) {
    // return if tween is already running
    // if (tween._isRunning) { return; }
    // tween._isRunning = true;
    this.tweens.push(tween);
    this._startLoop();
  },

  /**
   * caffeinate - function to keep tweener awake on page blur.
   *
   * @public
   */
  caffeinate() {
    document.removeEventListener('visibilitychange', this._onVisibilityChange, false);
  }
}

tweener.init();

// const tweener = new Tweener;
export { tweener as tweener };

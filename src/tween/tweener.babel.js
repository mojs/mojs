/**
 * Helper to get cross-brower `visibility change` event.
 */
const getVisiblityEvent = () => {
  if (typeof document.mozHidden !== "undefined") {
    return ["mozHidden", "mozvisibilitychange"];
  } else if (typeof document.msHidden !== "undefined") {
    return ["msHidden", "msvisibilitychange"];
  } else if (typeof document.webkitHidden !== "undefined") {
    return ["webkitHidden", "webkitvisibilitychange"];
  }

  return ['hidden', 'visibilitychange'];
};

/**
 * Tweener - singleton object that is responsible of:
 *  - starting `requestAnimationFrame` loop
 *  - stopping `requestAnimationFrame` loop
 *  - holding `tween`/`timeline` objects and passing current time to them.
 */
const tweenerFactory = () => {
  /**
   * Variables
   */
  const { now } = window.performance;
  const [visibilityHidden, visibilityChange] = getVisiblityEvent();
  const tweens = [];

  let isRunning = false;
  let savedTweens;

  /**
   * _loop - main animation loop, takes care of running at most `1` animation loop
   *         and stopping itself if there is no active `tweens` left.
   * @private
   */
  const loop = () => {
    // if already running simply return immediately
    if (!isRunning) { return false; }
    // update all active `tweens` with current time
    update(now());
    // if there is no active `tweens` running - stop the `loop`
    if (!tweens.length) { return isRunning = false; }
    // else request new animation frame
    requestAnimationFrame(loop);
  }

  /*
    Method to start the animation loop.
    @private
  */
  const startLoop = () => {
    if (isRunning) { return; };
    isRunning = true;
    requestAnimationFrame(loop);
  }

  /*
    Method to stop the animation loop.
    @private
  */
  const stopLoop = () => { isRunning = false; }

  /*
    Method to update every tween/timeline on animation frame.
    @private
  */
  const update = (time) => {
    var i = tweens.length;
    while(i--) {
      // cache the current tween
      var tween = _tweens[i];
      if ( tween && tween._update(time) === true ) {
        remove(tween);
        tween.onTweenerFinish();
        // tween.resetPrevTime();
        // tween._prevTime = undefined;
      }
    }
  }

  /*
    Method to save all playing tweens.
    @private
  */
  const savePlayingTweens = () => {
    savedTweens = tweens.slice(0);
    for (let i = 0; i < savedTweens.length; i++) {
      savedTweens[i].pause();
    }
  }
  /*
    Method to restore all playing tweens.
    @private
  */
  const restorePlayingTweens = () => {
    if (savedTweens == null) { return; }

    for (let i = 0; i < savedTweens.length; i++) {
      savedTweens[i].resume();
    }
  }

  /**
   * Listen to page visibility change, if page loose focus, save all playing
   * tweens and pause them.
   * If page gets focus back - restore the paused tweens.
   */
  document.addEventListener(visibilityChange, () => {
    if (document[visibilityHidden]) { savePlayingTweens() }
    else { restorePlayingTweens(); }
  }, false);

  /***** Public Methods *****/

  /**
   * add - Method to add a Tween/Timeline to loop pool.
   *
   * @public
   * @param {Object} Tween/Timeline to add.
   */
  const add = (tween) => {
    // return if tween is already running
    if (tween._isRunning) { return; }
    tween._isRunning = true;
    tweens.push(tween);
    startLoop();
  }

  /**
   * removeAll - Method stop updating all the child tweens/timelines.
   *
   * @public
   * @return {type}  description
   */
  const removeAll = () => { tweens.length = 0; }

  /**
   * remove - Method to remove specific tween/timeline form updating.
   *
   * @public
   * @param  {type} tween description
   * @return {type}       description
   */
  const remove = (tween) => {
    const index = (typeof tween === 'number') ? tween : tweens.indexOf(tween);

    if (index !== -1) {
      tween = tweens[index];
      if (tween) {
        tween._isRunning = false;
        tweens.splice(index, 1);
        tween.onTweenerRemove();
      }
    }
  }

  /**
   * Export public methods
   */
  return { add, remove, removeAll };
};

export default tweenerFactory();

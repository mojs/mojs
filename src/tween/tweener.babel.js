/**
 * Tweener - singleton object that is responsible of:
 *  - starting `requestAnimationFrame` loop
 *  - stopping `requestAnimationFrame` loop
 *  - holding `tween`/`timeline` objects and passing current time to them.
 */

const tweens = [];
let savedTweens = [];
let isRunning = false;

/**
 * `savePlayingTweens` - function to store all playing tweenes
 *                       when user leaves a page.
 */
const savePlayingTweens = () => {
  savedTweens = tweens.slice(0);
  for (let i = 0; i < savedTweens.length; i++ ) {
    savedTweens[i].pause();
  }
};

/**
 * `restorePlayingTweens` - function to restore all playing tweens.
 */
const restorePlayingTweens = () => {
  for (let i=0; i < savedTweens.length; i++ ) {
    savedTweens[i].play();
  }
};

/**
 * `onVisibilityChange` - visibilityChange handler.
 */
const onVisibilityChange = () => {
  if (document['hidden']) { savePlayingTweens() }
  else { restorePlayingTweens(); }
};

/**
 * `stop` - function to stop the animation loop.
 */
const stop = () => {
  tweens.length = 0;
  isRunning = false;
};

// needed?
// /**
//  * `removeAll` - function stop updating all the child tweens/timelines.
//  *
//  * @return {type}  description
//  */
// const removeAll = () => { tweens.length = 0; };

/**
 * `remove` - function to remove specific tween/timeline form updating.
 */
const remove = (tween) => {
  var index = (typeof tween === 'number')
                ? tween : tweens.indexOf(tween);

  if (index !== -1) {
    tween = tweens[index];
    // needed?
    // tween._isRunning = false;
    tweens.splice(index, 1);
  }
};

/**
 *  `update` - fucntion  to update every tween/timeline on animation frame.
 */
const update = (time) => {
  var i = tweens.length;
  while(i--) {
    var tween = tweens[i];
    if (tween.update(time) === true) {
      remove(tween);
      tween.onTweenerFinish();
    }
  }
};

/*
 Main animation loop. Should have only one concurrent loop.
 @private
 @returns this
*/
const loop = () => {
  if (tweens.length === 0) { return stop(); }
  update(performance.now());
  requestAnimationFrame(loop);
};

/**
 * `start` - function to start the animation loop.
 */
const start = () => {
  if (isRunning) { return; };
  isRunning = true;
  requestAnimationFrame(loop);
};

/**
 * `add` - function to add a Tween/Timeline to loop pool.
 */
const add = (tween) => {
 tweens.push(tween);
 start();
};

/**
 * `caffeinate` - function to keep tweener awake on page blur.
 */
const caffeinate = () => {
  document.removeEventListener('visibilitychange', onVisibilityChange, false);
};

// listen to visibility change
document.addEventListener('visibilitychange', onVisibilityChange, false);

const tweener = { add, remove, caffeinate };

// const tweener = new Tweener;
export { tweener as tweener };

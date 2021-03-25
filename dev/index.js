import mojs from 'src/mojs.babel.js';
import MojsPlayer from '@mojs/player';

// get the current mojs version
document.querySelector('.mojs-version').innerHTML += ' ' + mojs.revision;

// build the tween
const burst = new mojs.Burst({
  radius: { 1 : 200 },
  count: 20,
  children: {
    radius: 'rand(20, 10)',
    delay: 'rand(0, 500)',
    duration: 2000,
    opacity: 'rand(0.1, 1)'
  }
});

// build the timeline and add the tween
const timeline = new mojs.Timeline().add(
  burst
);

// build the player and add the timeline
new MojsPlayer({
  add: timeline,
  isSaveState: true,
  isPlaying: true,
  isRepeat: true
});

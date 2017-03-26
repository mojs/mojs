import tweener from './tweener';

const tweenData = [0, 0, 0, 0, 0, 0, 0, 30, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 48, 0, 0, 0, 0, 0, 0, 20, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 16, 112];

// export default (o = {}) => {
//   let i = 0;
//   let time = 0;
//
//   const duration = 300;
//   const repeat = 1;
//   const delay = 100;
//   const totalTime = (repeat+1)*(duration + delay);
//
//   const { onRefresh, onStart, onRepeatStart, onFirstUpdate, onUpdate, onRepeatComplete, onComplete } = o;
//
//   const tween = {};
//   const _setStartTime = () => { return performance.now(); };
//   let startTime;
//
//   const play = () => {
//     startTime = _setStartTime();
//
//     tweener.add(tween);
//   }
//
//   const _runCallBacks = (id) => {
//     if (id === 0) { return };
//
//     let mask = 1;
//
//     (id & mask) && onRefresh();
//     (id & (mask <<= 1)) && onStart();
//     (id & (mask <<= 1)) && onRepeatStart();
//     (id & (mask <<= 1)) && onFirstUpdate();
//     (id & (mask <<= 1)) && onUpdate();
//     (id & (mask <<= 1)) && onRepeatComplete();
//     (id & (mask <<= 1)) && onComplete();
//   }
//
//   const update = (time) => {
//     const deltaTime = time - startTime;
//     if (deltaTime > totalTime) {
//       while (i < tweenData.length) {
//         const id = tweenData[i];
//         _runCallBacks(id);
//         i++;
//       }
//       return true;
//     }
//
//     while (time < deltaTime) {
//        const id = tweenData[i];
//        _runCallBacks(id);
//        time += 16;
//        i++;
//     }
//   }
//
//   tween.play = play;
//   tween.update = update;
//   tween.onTweenerFinish = () => {};
//
//   return tween;
// };

export default class SuperTween {
  constructor(o = {}) {
    this._o = o;
    const duration = 300;
    const repeat = 1;
    const delay = 100;
    //   const totalTime = (repeat+1)*(duration + delay);

    this._callbacks = [this._o.onRefresh, this._o.onStart, this._o.onRepeatStart, this._o.onFirstUpdate, this._o.onUpdate, this._o.onRepeatComplete, this._o.onComplete];

    this._totalTime = (repeat+1)*(duration + delay);
  }

  _setStartTime() {
    this._startTime = performance.now();
    this._i = 0;
    this._time = 0;
  }

  update(time) {
    const deltaTime = time - this._startTime;

    if (deltaTime > this._totalTime) {
      while (this._i < tweenData.length) {
        const id = tweenData[this._i];
        this._runCallBacks(id);
        this._i++;
      }
      return true;
    }

    while (this._time < deltaTime) {
      const id = tweenData[this._i];
      this._runCallBacks(id);
      this._time += 16;
      this._i++;
    }
  }

  _runCallBacks(id) {
    if (id === 0) { return };
    let mask = 1;

    (id & mask) && this._o.onRefresh();
    (id & (mask <<= 1)) && this._o.onStart();
    (id & (mask <<= 1)) && this._o.onRepeatStart();
    (id & (mask <<= 1)) && this._o.onFirstUpdate();
    (id & (mask <<= 1)) && this._o.onUpdate();
    (id & (mask <<= 1)) && this._o.onRepeatComplete();
    (id & (mask <<= 1)) && this._o.onComplete();
  }

  play() {
    this._setStartTime();
    tweener.add(this);
  }

  onTweenerFinish(){}
}

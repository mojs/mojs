var Tween = mojs.Tween;

var helpers = mojs.__helpers__;
var tweener = helpers.tweener;
var ClassProto = helpers.ClassProto;
var tweenDefaults = helpers.tweenDefaults;

describe('tween ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var tween = Tween();
      expect(ClassProto.isPrototypeOf(tween)).toBe(true);
    });

    it('should declare `defaults`', function () {
      var tween = Tween();
      expect(tween._defaults).toEqual(tweenDefaults);
    });
  });

  describe('`update` function ->', function() {
    it('should pass current `progress` to `onUpdate`', function () {
      var progress = -1;
      var options = {
        duration: 50,
        easing: 'linear.none',
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      // the first update to set the `_prevTime`
      tween.update(startTime - 10);

      tween.update(startTime);

      expect(progress).toBe(0);

      tween.update(startTime += 15);

      expect(progress).toBeCloseTo(0.3, 3);

      tween.update(startTime += 15);

      expect(progress).toBeCloseTo(0.6, 3);

      tween.update(startTime += 15);

      expect(progress).toBeCloseTo(0.9, 3);

      tween.update(startTime += 15);

      expect(progress).toBe(1);
    });

    it('should pass current `progress` to `onUpdate` #backward', function () {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        easing: 'linear.none',
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      var endTime = startTime + duration;
      // the first update to set the `_prevTime`
      tween.update(endTime + 15);

      tween.update(endTime);

      expect(progress).toBe(1);

      tween.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.7, 3);

      tween.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.4, 3);

      tween.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.1, 3);

      tween.update(endTime -= 15);

      expect(progress).toBe(0);
    });

    it('should not `onUpdate` if smaller than start time', function () {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime - 10);

      expect(progress).toBe(-1);
    });

    it('should not `onUpdate` second time #smaller', function () {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + 10);
      tween.update(startTime - 10);
      expect(progress).toBe(0);

      progress = -1;

      tween.update(startTime - 20);
      expect(progress).toBe(-1);
    });

    it('should not `onUpdate` if greater than end time', function () {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime + duration + 10);

      expect(progress).toBe(-1);
    });

    it('should not `onUpdate` second time #larger', function () {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      var endTime = startTime + duration;

      tween.update(endTime);
      tween.update(endTime - 10);
      tween.update(endTime + 10);
      expect(progress).toBe(1);

      progress = -1;

      tween.update(endTime + 20);
      expect(progress).toBe(-1);
    });

    it('should pass current `progress` to `onUpdate` #reverse', function () {
      var progress = -1;
      var duration = 50;

      var options = {
        isReverse: true,
        easing: 'linear.none',
        duration: duration,
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      // the first update to set the `_prevTime`
      tween.update(startTime - 10);
      tween.update(startTime);

      expect(progress).toBe(1);

      tween.update(startTime += 15);

      expect(progress).toBeCloseTo(0.7, 3);

      tween.update(startTime += 15);

      expect(progress).toBeCloseTo(0.4, 3);

      tween.update(startTime += 15);

      expect(progress).toBeCloseTo(0.1, 3);

      tween.update(startTime += 15);

      expect(progress).toBe(0);
    });

    it('should save `_elapsed`', function () {
      var duration = 200;
      var options = {
        onUpdate: function() {},
        duration: duration
      };

      var tween = new Tween(options);
      tween.setStartTime();

      var updateTime = tween._start + 10;

      tween.update(updateTime);
      expect(tween._elapsed).toBe(updateTime - tween._spot);

      updateTime += duration/2;
      tween.update(updateTime);
      expect(tween._elapsed).toBe(updateTime - tween._spot);

      updateTime += duration/2;
      tween.update(updateTime);
      expect(tween._elapsed).toBe(updateTime - tween._spot);
    });

    it('should pass current `progress` to `onUpdate` #reverse #backward', function () {
      var progress = -1;
      var duration = 50;

      var options = {
        isReverse: true,
        easing: 'linear.none',
        duration: duration,
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      var endTime = startTime + duration;
      // the first update to set the `_prevTime`
      tween.update(endTime + 10);
      tween.update(endTime);

      expect(progress).toBe(0);

      tween.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.3, 3);

      tween.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.6, 3);

      tween.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.9, 3);

      tween.update(endTime -= 15);

      expect(progress).toBe(1);
    });

    it('should not call `onStart` twice', function () {
      var cnt = 0;
      var options = {
        duration: 500,
        onStart: function() {
          cnt++;
        }
      };

      var tween = Tween(options);
      tween.setStartTime(200);

      var startTime = tween._start;

      tween.update(startTime - 10);
      tween.update(startTime);
      tween.update(startTime + 10);

      expect(cnt).toBe(1);
    });

    it('should not call `onStart` on backward', function () {
      var cnt = 0;
      var duration = 500;
      var options = {
        duration: duration,
        onStart: function() {
          cnt++;
        }
      };

      var tween = Tween(options);
      tween.setStartTime(200);

      var startTime = tween._start;

      tween.update(startTime - 10);
      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);
      tween.update(startTime + duration + 10);
      cnt = 0;
      tween.update(startTime + duration);

      expect(cnt).toBe(0);
    });

    it('should not call `onComplete` twice', function () {
      var cnt = 0;
      var duration = 500;

      var options = {
        duration: duration,
        onComplete: function() {
          cnt++;
        }
      };

      var tween = Tween(options);
      tween.setStartTime(200);

      var startTime = tween._start;

      tween.update(startTime - 10);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);
      tween.update(startTime + duration + 10);
      tween.update(startTime + duration);
      cnt = 0;
      tween.update(startTime + duration - 10);

      expect(cnt).toBe(0);
    });

    it('should return when active period is completed', function () {
      var duration = 500;

      var options = {
        duration: duration,
        onComplete: function() {}
      };

      var tween = Tween(options);
      tween.setStartTime(200);

      var startTime = tween._start;

      tween.update(startTime - 10);
      tween.update(startTime + duration/2);
      var result = tween.update(startTime + duration);

      expect(tween._prevTime).toBe(startTime + duration);
      expect(result).toBe(true);
    });

    it('should return when active period is completed #2', function () {
      var duration = 500;

      var options = {
        duration: duration,
        onComplete: function() {}
      };

      var tween = Tween(options);
      tween.setStartTime(200);

      var startTime = tween._start;

      tween.update(startTime - 10);
      tween.update(startTime + duration/2);
      var result = tween.update(startTime + duration + 10);

      expect(tween._prevTime).toBe(startTime + duration + 10);
      expect(result).toBe(true);
    });

    it('should return when active period is completed #backward', function () {
      var duration = 500;

      var options = {
        duration: duration,
        onComplete: function() {}
      };

      var tween = Tween(options);
      tween.setStartTime(200);

      var end = tween._end;

      tween.update(end + 10);
      tween.update(end - duration/2);
      var result = tween.update(end - duration);

      expect(tween._prevTime).toBe(end - duration);
      expect(result).toBe(true);
    });

    it('should return when active period is completed #backward #2', function () {
      var duration = 500;

      var options = {
        duration: duration,
        onComplete: function() {}
      };

      var tween = Tween(options);
      tween.setStartTime(200);

      var end = tween._end;

      tween.update(end + 10);
      tween.update(end - duration/2);
      var result = tween.update(end - duration - 10);

      expect(tween._prevTime).toBe(end - duration - 10);
      expect(result).toBe(true);
    });

    it('should recalculate `time` regarding `speed`', function() {
      var duration = 500;
      var tween = new Tween({
        duration: duration,
        repeat: 5
      });
      tween.setStartTime();

      tween._playTime = 200;
      tween._speed = 2;
      var time = tween._start + duration/2;
      var normalizedTime = tween._playTime + tween._speed * (time - tween._playTime);

      tween.update(time);

      expect(tween._prevTime).toBe(normalizedTime);
    });

    it('should recalculate `time` regarding `speed` #2', function() {
      var duration = 500;
      var tween = new Tween({
        duration: duration,
        repeat: 5
      });
      tween.setStartTime();

      tween._playTime = 200;
      tween._speed = .5;
      var time = tween._start + duration/2;
      var normalizedTime = tween._playTime + tween._speed * (time - tween._playTime);

      tween.update(time);

      expect(tween._prevTime).toBe(normalizedTime);
    });

    it('should pass current `progress` to `onUpdate` with `easing`', function () {
      var ep = -1;
      var p = -1;
      var easing = mojs.easing.cubic.in;

      var options = {
        duration: 50,
        easing: easing,
        onUpdate: function(eproc, proc) {
          ep = eproc;
          p = proc
        }
      };
      var tween = Tween(options);
      tween.setStartTime();

      var startTime = tween._start;

      tween.update(startTime - 10);
      tween.update(startTime);

      expect(ep).toBe(easing(0));
      expect(p).toBe(0);

      tween.update(startTime += 15);

      expect(ep).toBeCloseTo(easing(0.3), 3);
      expect(p).toBeCloseTo(0.3, 3);

      tween.update(startTime += 15);

      expect(ep).toBeCloseTo(easing(0.6), 3);
      expect(p).toBeCloseTo(0.6, 3);

      tween.update(startTime += 15);

      expect(ep).toBeCloseTo(easing(0.9), 3);
      expect(p).toBeCloseTo(0.9, 3);

      tween.update(startTime += 15);

      expect(ep).toBeCloseTo(easing(1), 3);
      expect(p).toBeCloseTo(1, 3);
    });

    it('should pass current `progress` to `onUpdate` with `backwardEasingeasing`', function () {
      var ep = -1;
      var p = -1;
      var backwardEasing = mojs.easing.sin.inout;

      var options = {
        duration: 50,
        backwardEasing: backwardEasing,
        onUpdate: function(eproc, proc) {
          ep = eproc;
          p = proc
        }
      };
      var tween = Tween(options);
      tween.setStartTime();

      var end = tween._end;
      tween.update(end + 10);
      tween.update(end);

      expect(ep).toBeCloseTo(backwardEasing(1), 3);
      expect(p).toBeCloseTo(1, 3);

      tween.update(end -= 15);

      expect(ep).toBeCloseTo(backwardEasing(0.7), 3);
      expect(p).toBeCloseTo(0.7, 3);

      tween.update(end -= 15);

      expect(ep).toBeCloseTo(backwardEasing(0.4), 3);
      expect(p).toBeCloseTo(0.4, 3);

      tween.update(end -= 15);

      expect(ep).toBeCloseTo(backwardEasing(0.1), 3);
      expect(p).toBeCloseTo(0.1, 3);

      tween.update(end -= 15);

      expect(ep).toBeCloseTo(backwardEasing(0), 3);
      expect(p).toBeCloseTo(0, 3);
    });

    it('should pass current `progress` to `onUpdate` with `easing` #reverse', function () {
      var ep = -1;
      var p = -1;
      var backwardEasing = mojs.easing.cubic.in;

      var options = {
        duration: 50,
        isReverse: true,
        backwardEasing: backwardEasing,
        onUpdate: function(eproc, proc) {
          ep = eproc;
          p = proc
        }
      };
      var tween = Tween(options);
      tween.setStartTime();

      var startTime = tween._start;

      tween.update(startTime - 10);
      tween.update(startTime);

      expect(ep).toBe(backwardEasing(1));
      expect(p).toBe(1);

      tween.update(startTime += 15);

      expect(ep).toBeCloseTo(backwardEasing(0.7), 3);
      expect(p).toBeCloseTo(0.7, 3);

      tween.update(startTime += 15);

      expect(ep).toBeCloseTo(backwardEasing(0.4), 3);
      expect(p).toBeCloseTo(0.4, 3);

      tween.update(startTime += 15);

      expect(ep).toBeCloseTo(backwardEasing(0.1), 3);
      expect(p).toBeCloseTo(0.1, 3);

      tween.update(startTime += 15);

      expect(ep).toBeCloseTo(backwardEasing(0), 3);
      expect(p).toBeCloseTo(0, 3);
    });

    it('should pass current `progress` to `onUpdate` with `easing` #reverse', function () {
      var ep = -1;
      var p = -1;
      var easing = mojs.easing.sin.inout;

      var options = {
        duration: 50,
        isReverse: true,
        easing: easing,
        onUpdate: function(eproc, proc) {
          ep = eproc;
          p = proc
        }
      };
      var tween = Tween(options);
      tween.setStartTime();

      var end = tween._end;
      tween.update(end + 10);
      tween.update(end);

      expect(ep).toBeCloseTo(easing(0), 3);
      expect(p).toBeCloseTo(0, 3);

      tween.update(end -= 15);

      expect(ep).toBeCloseTo(easing(0.3), 3);
      expect(p).toBeCloseTo(0.3, 3);

      tween.update(end -= 15);

      expect(ep).toBeCloseTo(easing(0.6), 3);
      expect(p).toBeCloseTo(0.6, 3);

      tween.update(end -= 15);

      expect(ep).toBeCloseTo(easing(0.9), 3);
      expect(p).toBeCloseTo(0.9, 3);

      tween.update(end -= 15);

      expect(ep).toBeCloseTo(easing(1), 3);
      expect(p).toBeCloseTo(1, 3);
    });

    it('should save progress', function () {
      var progress = -1;
      var options = {
        duration: 50,
        easing: 'linear.none'
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      // the first update to set the `_prevTime`
      tween.update(startTime - 10);

      tween.update(startTime);

      expect(tween._progress).toBe(0);

      tween.update(startTime += 15);

      expect(tween._progress).toBeCloseTo(0.3, 3);

      tween.update(startTime += 15);

      expect(tween._progress).toBeCloseTo(0.6, 3);

      tween.update(startTime += 15);

      expect(tween._progress).toBeCloseTo(0.9, 3);

      tween.update(startTime += 15);

      expect(tween._progress).toBe(1);
    });

    it('should save progress #reverse', function () {
      var progress = -1;
      var options = {
        duration: 50,
        isReverse: true,
        easing: 'linear.none'
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      // the first update to set the `_prevTime`
      tween.update(startTime - 10);

      tween.update(startTime);

      expect(tween._progress).toBe(1);

      tween.update(startTime += 15);

      expect(tween._progress).toBeCloseTo(0.7, 3);

      tween.update(startTime += 15);

      expect(tween._progress).toBeCloseTo(0.4, 3);

      tween.update(startTime += 15);

      expect(tween._progress).toBeCloseTo(0.1, 3);

      tween.update(startTime += 15);

      expect(tween._progress).toBe(0);
    });
  });

  describe('`onComplete` callback ->', function() {
    it('should be called on end', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      spyOn(tween._cbs, 1);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration + 10);

      expect(tween._cbs[1]).toHaveBeenCalledWith(true, false, 0);
    });

    it('should be called on exact end', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 4,
        duration: duration,
        onComplete: function() {}
      };

      var tween = Tween(options);

      spyOn(tween._cbs, 1);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);

      expect(tween._cbs[1]).toHaveBeenCalledWith(true, false, options.index);
    });

    it('should be called on if complete and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 2,
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration + 10);
      spyOn(tween._cbs, 1);
      tween.update(startTime + duration - 10);

      expect(tween._cbs[1]).toHaveBeenCalledWith(false, false, options.index);
    });

    it('should be called on if complete and returned #2', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 1,
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);
      spyOn(tween._cbs, 1);
      tween.update(startTime + duration - 10);

      expect(tween._cbs[1]).toHaveBeenCalledWith(false, false, options.index);
    });

    it('should be called on if complete and returned #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 2,
        isReverse: true,
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      // the first update to set the `_prevTime`
      tween.update(startTime - 10);

      spyOn(tween._cbs, 0);
      tween.update(startTime);

      expect(tween._cbs[0]).toHaveBeenCalledWith(true, true, options.index);
    });

    it('should not be called twice on if complete and returned #reverse', function() {
      var progress = -1;
      var duration = 50;
      var cnt = 0;

      var options = {
        index: 1,
        duration: duration,
        onComplete: function() {
          cnt++;
        }
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration + 10);
      cnt = 0;
      tween.update(startTime + duration);

      expect(cnt).toBe(1);
    });
  });

  describe('`onStart` callback ->', function() {
    it('should be called on start', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      spyOn(tween._cbs, 0);
      tween.update(startTime - 10);

      expect(tween._cbs[0]).toHaveBeenCalledWith(false, false, 0);
    });

    it('should be called on exact start', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 3,
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);


      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      spyOn(tween._cbs, 0);
      tween.update(startTime);

      expect(tween._cbs[0]).toHaveBeenCalledWith(false, false, options.index);
    });

    it('should be called on if went before start and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 6,
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime);
      spyOn(tween._cbs, 0);
      tween.update(startTime + 10);

      expect(tween._cbs[0]).toHaveBeenCalledWith(true, false, options.index);
    });

    it('should be called on if went before start and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 1,
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime - 10);
      spyOn(tween._cbs, 0);
      tween.update(startTime + 10);

      expect(tween._cbs[0]).toHaveBeenCalledWith(true, false, options.index);
    });

    it('should be called on if went before start and returned #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 1,
        isReverse: true,
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      spyOn(tween._cbs, 1);
      tween.update(startTime + duration);

      expect(tween._cbs[1]).toHaveBeenCalledWith(true, true, options.index);
    });
  });

  describe('`onChimeOut` callback ->', function() {
    it('should be called on end', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      spyOn(tween._chCbs, 1);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration + 10);

      expect(tween._chCbs[1]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + duration + 10);
    });

    it('should be called on end #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 4,
        isReverse: true,
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      spyOn(tween._chCbs, 1);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration + 10);

      expect(tween._chCbs[1]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + duration + 10);
    });

    it('should be called on exact end #2', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 2,
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      spyOn(tween._chCbs, 1);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);

      expect(tween._chCbs[1]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + duration);
    });

    it('should be called on exact end #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 5,
        isReverse: true,
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      spyOn(tween._chCbs, 1);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);

      expect(tween._chCbs[1]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + duration);
    });

    it('should be called on if complete and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 3,
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration + 10);
      spyOn(tween._chCbs, 1);
      tween.update(startTime + duration - 10);

      expect(tween._chCbs[1]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime + duration - 10);
    });

    it('should be called on if complete and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 1,
        isReverse: true,
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration + 10);
      spyOn(tween._chCbs, 1);
      tween.update(startTime + duration - 10);

      expect(tween._chCbs[1]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime + duration - 10);
    });

    it('should be called on if complete and returned #2', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);
      spyOn(tween._chCbs, 1);
      tween.update(startTime + duration - 10);

      expect(tween._chCbs[1]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime + duration - 10);
    });

    it('should be called on if complete and returned #2 #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 4,
        isReverse: true,
        duration: duration,
        onComplete: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);
      spyOn(tween._chCbs, 1);
      tween.update(startTime + duration - 10);

      expect(tween._chCbs[1]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime + duration - 10);
    });

  });

  describe('`onChimeIn` callback ->', function() {
    it('should be called on start', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onChimeIn: function() {},
        onChimeOut: function() {}
      };
      var tween = Tween(options);


      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      spyOn(tween._chCbs, 0);
      tween.update(startTime - 10);

      expect(tween._chCbs[0]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime - 10);
    });

    it('should be called on start #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 4,
        isReverse: true,
        duration: duration,
        onChimeIn: function() {},
        onChimeOut: function() {}
      };
      var tween = Tween(options);


      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      spyOn(tween._chCbs, 0);
      tween.update(startTime - 10);

      expect(tween._chCbs[0]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime - 10);
    });

    it('should be called on exact start', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 7,
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);


      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      spyOn(tween._chCbs, 0);
      tween.update(startTime);

      expect(tween._chCbs[0]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime);
    });

    it('should be called on exact start #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 3,
        isReverse: true,
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);


      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      spyOn(tween._chCbs, 0);
      tween.update(startTime);

      expect(tween._chCbs[0]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime);
    });

    it('should be called on if went before start and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 4,
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime);
      spyOn(tween._chCbs, 0);
      tween.update(startTime + 10);

      expect(tween._chCbs[0]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + 10);
    });

    it('should be called on if went before start and returned #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 0,
        isReverse: true,
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime);
      spyOn(tween._chCbs, 0);
      tween.update(startTime + 10);

      expect(tween._chCbs[0]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + 10);
    });

    it('should be called on if went before start and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime - 10);
      spyOn(tween._chCbs, 0);
      tween.update(startTime + 10);

      expect(tween._chCbs[0]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + 10);
    });

    it('should be called on if went before start and returned #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 5,
        isReverse: true,
        duration: duration,
        onStart: function() {}
      };
      var tween = Tween(options);

      var startTime = 200;
      tween.setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime - 10);
      spyOn(tween._chCbs, 0);
      tween.update(startTime + 10);

      expect(tween._chCbs[0]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + 10);
    });
  });

  describe('`isReverse` option ->', function() {
    it('should flip callbacks and numbers in `_cbs`', function() {
      var duration = 50;

      var options = {
        duration: duration,
        onStart: function() {},
        onComplete: function() {},
        isReverse: true
      };
      var tween = Tween(options);

      expect(tween._cbs[0]).toBe(options.onComplete);
      expect(tween._cbs[1]).toBe(options.onStart);

      expect(tween._cbs[2]).toBe(1);
      expect(tween._cbs[3]).toBe(0);
    });
  });

  describe('`setStartTime` function ->', function() {
    it('should set the `_start` time', function() {
      var duration = 400;
      var tween = Tween({
        duration: duration
      });
      var startTime = 250;

      tween.setStartTime(startTime);

      expect(tween._start).toBe(startTime);
      expect(tween._end).toBe(startTime + duration);
      expect(tween._time).toBe(duration);
    });

    it('should set the `_start` time regarding `delay`', function() {
      var duration = 100;
      var delay = 50;

      var options = {
        duration: duration,
        delay: delay
      };
      var tween = Tween(options);
      var startTime = 350;

      tween.setStartTime(startTime);

      expect(tween._start).toBe(startTime + delay);
      expect(tween._end).toBe(startTime + delay + duration);
      expect(tween._time).toBe(delay + duration);
    });

    it('should set the `_start` time regarding `shiftTime`', function() {
      var duration = 100;
      var delay = 50;

      var shiftTime = 200;

      var options = {
        duration: duration,
        delay: delay,
        shiftTime: shiftTime
      };
      var tween = Tween(options);
      var startTime = 350;

      tween.setStartTime(startTime);

      expect(tween._start).toBe(startTime + delay + shiftTime);
    });

    it('should set the `_start` time regarding negative `shiftTime`', function() {
      var duration = 100;
      var delay = 50;

      var shiftTime = -200;

      var options = {
        duration: duration,
        delay: delay,
        shiftTime: shiftTime
      };
      var tween = Tween(options);
      var startTime = 350;

      tween.setStartTime(startTime);

      expect(tween._start).toBe(startTime + delay + shiftTime);
    });
  });

  describe('`onRefresh` callback ->', function() {
    it('should be called when `_progress` is not on the right side', function() {
      var duration = 400;
      var index = 3;
      var tween = Tween({
        duration: duration,
        onRefresh: function() {},
        index: index
      });

      tween.setStartTime();

      var startTime = tween._start;

      tween._progress = 1;

      spyOn(tween._props, 'onRefresh');

      tween.update(startTime - 10);
      tween.update(startTime - 20);
      expect(tween._props.onRefresh).toHaveBeenCalledWith(false, index, startTime - 10);
      expect(tween._props.onRefresh.calls.count()).toBe(1);
    });

    it('should be called when `_progress` is not on the right side', function() {
      var duration = 400;
      var index = 3;
      var tween = Tween({
        isReverse: true,
        duration: duration,
        onRefresh: function() {},
        index: index
      });

      tween.setStartTime();

      var startTime = tween._start;

      tween._progress = 1;

      spyOn(tween._props, 'onRefresh');

      tween.update(startTime - 10);
      expect(tween._props.onRefresh).not.toHaveBeenCalled();
    });

    it('should be called when `_progress` is not on the right side', function() {
      var duration = 400;
      var index = 3;
      var tween = Tween({
        isIt: 1,
        isReverse: true,
        duration: duration,
        onRefresh: function() {},
        index: index
      });

      tween.setStartTime();

      var startTime = tween._start;

      tween._progress = 0;

      spyOn(tween._props, 'onRefresh');

      tween.update(startTime - 10);
      tween.update(startTime - 20);
      expect(tween._props.onRefresh).toHaveBeenCalledWith(false, index, startTime - 10);
      expect(tween._props.onRefresh.calls.count()).toBe(1);
    });

    it('should be called when `_progress` is not on the right side', function() {
      var duration = 400;
      var index = 3;
      var tween = Tween({
        duration: duration,
        onRefresh: function() {},
        index: index
      });

      tween.setStartTime();

      var endTime = tween._start + duration;

      tween._progress = 0;

      spyOn(tween._props, 'onRefresh');

      tween.update(endTime + 10);
      tween.update(endTime + 20);
      expect(tween._props.onRefresh).toHaveBeenCalledWith(true, index, endTime + 10);
      expect(tween._props.onRefresh.calls.count()).toBe(1);
    });

  });

  describe('`reset` function ->', function() {
    it('should reset the tween', function() {
      var duration = 400;
      var tween = Tween({
        duration: duration,
        onSkip: function() {}
      });

      tween._isActive = true;
      tween._repeatCount = 1000;
      tween.reset();

      expect(tween._isActive).toBe(false);
      expect(tween._prevTime).not.toBeDefined();
      expect(tween._repeatCount).toBe(0);
    });

    it('should call the `tweener.remove` function', function() {
      var tween = new Tween();
      tween.play();
      spyOn(tweener, 'remove');
      tween.reset();

      expect(tweener.remove).toHaveBeenCalledWith(tween);
    });

    it('should return `this`', function() {
      var tween = new Tween();
      tween.play();
      var result = tween.reset();

      expect(result).toBe(tween);
    });
  });

  describe('_setState function ->', function() {
    it('should set playback state', function() {
      var tween = new Tween();
      tween._setState('play');
      expect(tween._state).toBe('play');
    });
    it('should track previous playback state', function() {
      var t;
      t = new Tween();
      t._setState('play');
      t._setState('pause');
      expect(t._prevState).toBe('play');
      expect(t._state).toBe('pause');
    });
    describe('onPlaybackStart / play callback ->', function() {
      it('should call `onPlaybackStart` method if `play`', function() {
        var duration = 50;
        var tween = new Tween({
          duration: duration,
          onPlaybackStart: function() {}
        });
        spyOn(tween._props, 'onPlaybackStart');
        tween._setState('play');
        expect(tween._props.onPlaybackStart).toHaveBeenCalledWith('play', 'stop');
      });
      it('should call `onPlaybackStart` method if `play` after `pause`', function() {
        var duration = 50;
        var tween = new Tween({
          duration: duration
        });
        tween._setState('play');
        tween._setState('pause');
        spyOn(tween._props, 'onPlaybackStart');
        tween._setState('play');
        expect(tween._props.onPlaybackStart).toHaveBeenCalledWith('play', 'pause');
      });
      it('should not call `onPlaybackStart` method if already `play`', function() {
        var duration = 50;
        var tween = new Tween({
          duration: duration
        });
        tween._setState('play');
        spyOn(tween._props, 'onPlaybackStart');
        tween._setState('play');
        expect(tween._props.onPlaybackStart).not.toHaveBeenCalled();
      });
      it('should not call `onPlaybackStart` method if already `reverse`', function() {
        var duration = 50;
        var tween = new Tween({
          duration: duration
        });
        tween._setState('reverse');
        spyOn(tween._props, 'onPlaybackStart');
        tween._setState('play');
        expect(tween._props.onPlaybackStart).not.toHaveBeenCalled();
      });
    });

    describe('onPlaybackStart / reverse callback ->', function() {
      it('should call `onPlaybackStart` method if `reverse`', function() {
        var duration = 50;
        var tween = new Tween({
          duration: duration
        });
        spyOn(tween._props, 'onPlaybackStart');
        tween._setState('reverse');
        expect(tween._props.onPlaybackStart).toHaveBeenCalled();
      });
      it('should call onPlaybackStart method if reverse', function() {
        var duration = 50;
        var tween = new Tween({
          duration: duration
        });
        tween._setState('reverse');
        tween._setState('pause');
        spyOn(tween._props, 'onPlaybackStart');
        tween._setState('reverse');
        expect(tween._props.onPlaybackStart).toHaveBeenCalled();
      });
      it('should not call onPlaybackStart method if already reverse', function() {
        var duration = 50;
        var tween = new Tween({
          duration: duration
        });
        tween._setState('reverse');
        spyOn(tween._props, 'onPlaybackStart');
        tween._setState('reverse');
        expect(tween._props.onPlaybackStart).not.toHaveBeenCalled();
      });
      it('should not call onPlaybackStart method if already play', function() {
        var duration = 50;
        var tween = new Tween({
          duration: duration
        });
        tween._setState('play');
        spyOn(tween._props, 'onPlaybackStart');
        tween._setState('reverse');
        expect(tween._props.onPlaybackStart).not.toHaveBeenCalled();
      });
    });

    describe('onPlaybackPause / pause callback ->', function() {
      it('should call onPlaybackPause method if pause', function() {
        var tween = new Tween();
        tween._setState('play');
        spyOn(tween._props, 'onPlaybackPause');
        tween._setState('pause');
        return expect(tween._props.onPlaybackPause).toHaveBeenCalled();
      });
      it('should call onPlaybackPause method if play', function() {
        var tween = new Tween();
        tween._setState('play');
        spyOn(tween._props, 'onPlaybackPause');
        tween._setState('pause');
        expect(tween._props.onPlaybackPause).toHaveBeenCalled();
      });
      it('should call onPlaybackPause method if already was reverse', function() {
        var tween = new Tween();
        tween._setState('reverse');
        spyOn(tween._props, 'onPlaybackPause');
        tween._setState('pause');
        expect(tween._props.onPlaybackPause).toHaveBeenCalled();
      });
      it('should not call onPlaybackPause method if already stopped', function() {
        var tween = new Tween();
        spyOn(tween._props, 'onPlaybackPause');
        tween._setState('pause');
        expect(tween._props.onPlaybackPause).not.toHaveBeenCalled();
      });
      it('should not call onPlaybackPause method if already paused', function() {
        var tween = new Tween();
        tween._setState('play');
        tween._setState('pause');
        spyOn(tween._props, 'onPlaybackPause');
        tween._setState('pause');
        expect(tween._props.onPlaybackPause).not.toHaveBeenCalled();
      });
    });
    describe('onPlaybackStop / stop callback ->', function() {
      it('should call onPlaybackStop method if stop', function() {
        var tween = new Tween();
        tween._setState('play');
        spyOn(tween._props, 'onPlaybackStop');
        tween._setState('stop');
        expect(tween._props.onPlaybackStop).toHaveBeenCalled();
      });
      it('should call onPlaybackStop method if stop', function() {
        var tween = new Tween();
        tween._setState('play');
        spyOn(tween._props, 'onPlaybackStop');
        tween._setState('stop');
        expect(tween._props.onPlaybackStop).toHaveBeenCalled();
      });
      it('should call onPlaybackStop method if was play', function() {
        var tween = new Tween();
        tween._setState('play');
        spyOn(tween._props, 'onPlaybackStop');
        tween._setState('stop');
        expect(tween._props.onPlaybackStop).toHaveBeenCalled();
      });
      it('should call onPlaybackStop method if already paused', function() {
        var tween = new Tween();
        tween._setState('play');
        tween._setState('pause');
        spyOn(tween._props, 'onPlaybackStop');
        tween._setState('stop');
        expect(tween._props.onPlaybackStop).toHaveBeenCalled();
      });
      it('should not call onPlaybackStop method if already stopped', function() {
        var tween = new Tween();
        spyOn(tween._props, 'onPlaybackStop');
        tween._setState('stop');
        expect(tween._props.onPlaybackStop).not.toHaveBeenCalled();
      });
    });
  });

  describe('`_setupPlay` function ->', function() {
    it('should call the `setStartTime` function', function() {
      var tween = new Tween();
      spyOn(tween, 'setStartTime');
      tween._setupPlay();

      expect(tween.setStartTime).toHaveBeenCalledWith();
    });
    it('should add the tween to the `tweener`', function() {
      var tween = new Tween();
      spyOn(tweener, 'add');
      tween._setupPlay();

      expect(tweener.add).toHaveBeenCalledWith(tween);
    });
  });

  describe('`play` function ->', function() {
    it('should call the `_setState` function', function() {
      var tween = new Tween();
      spyOn(tween, '_setState');
      tween.play();

      expect(tween._setState).toHaveBeenCalledWith('play');
    });

    it('should call the `_setupPlay` function', function() {
      var tween = new Tween();
      spyOn(tween, '_setupPlay');
      tween.play();

      expect(tween._setupPlay).toHaveBeenCalled();
    });

    it('should return `this`', function() {
      var tween = new Tween();
      var result = tween.play();

      expect(result).toBe(tween);
    });

    it('should return if already playing', function() {
      var tween = new Tween();
      tween._state = 'play';
      spyOn(tween, 'setStartTime');
      var result = tween.play();

      expect(result).toBe(tween);
      expect(tween.setStartTime).not.toHaveBeenCalled();
    });

    it('should set `_playTime`', function() {
      var tween = new Tween();
      tween.play();

      var time = performance.now();
      expect(tween._playTime).toBeDefined();
      expect(time - tween._playTime).not.toBeGreaterThan(10);
    });

    it('should set `_speed`', function() {
      var speed = 2;

      var tween = new Tween({
        speed: speed
      });
      tween._speed = -1;

      tween.play();

      expect(tween._speed).toBe(speed);
    });
  });

  describe('`replay` function ->', function() {
    it('should call the `reset` function', function() {
      var tween = new Tween();
      spyOn(tween, 'reset');
      tween.replay();

      expect(tween.reset).toHaveBeenCalled();
    });

    it('should call the `play` function', function() {
      var tween = new Tween();
      spyOn(tween, 'play');
      tween.replay();

      expect(tween.play).toHaveBeenCalled();
    });

    it('should pass `repeat` to the `play` function', function() {
      var tween = new Tween();
      var repeat = 5;
      spyOn(tween, 'play');
      tween.replay(repeat);

      expect(tween.play).toHaveBeenCalledWith(repeat);
    });

    it('should return `this`', function() {
      var tween = new Tween();
      var result = tween.replay();

      expect(result).toBe(tween);
    });
  });

  describe('`pause` function ->', function() {
    it('should call the `tweener.remove` function', function() {
      var tween = new Tween();
      tween.play();
      spyOn(tweener, 'remove');
      tween.pause();

      expect(tweener.remove).toHaveBeenCalledWith(tween);
    });

    it('should call the `_setState` function', function() {
      var tween = new Tween();
      tween.play();
      spyOn(tween, '_setState');
      tween.pause();

      expect(tween._setState).toHaveBeenCalledWith('pause');
    });

    it('should not call the `_setState` if already `paused`', function() {
      var tween = new Tween();
      tween.pause();
      spyOn(tween, '_setState');
      tween.pause();

      expect(tween._setState).not.toHaveBeenCalledWith('pause');
    });

    it('should not call the `_setState` if already `stopped`', function() {
      var tween = new Tween();
      tween._state = 'stop';
      spyOn(tween, '_setState');
      tween.pause();

      expect(tween._setState).not.toHaveBeenCalledWith('pause');
    });

    it('should return `this`', function() {
      var tween = new Tween();
      var result = tween.pause();

      expect(result).toBe(tween);
    });

    it('should reset `_speed` to `1`', function() {
      var speed = 2;

      var tween = new Tween({
        speed: speed
      });
      tween._speed = -1;

      tween.play();
      expect(tween._speed).toBe(speed);

      tween.pause();
      expect(tween._speed).toBe(1);

    });
  });

  describe('`setSpeed` function ->', function () {
    it('should set `speed` on `_props`', function () {
      var tween = new Tween();
      var speed = 2;
      var result = tween.setSpeed(speed);

      expect(tween._props.speed).toBe(speed);
    });

    it('should set `_speed` if state is `play`', function () {
      var tween = new Tween();
      var speed = 2;
      expect(tween._speed).toBe(1);
      tween._setState('play');
      var result = tween.setSpeed(speed);

      expect(tween._speed).toBe(speed);
    });

    it('should call `setStartTime` if state is `play`', function () {
      var tween = new Tween();
      var speed = 2;
      expect(tween._playTime).not.toBeDefined();
      tween._setState('play');

      var now = performance.now();

      spyOn(tween, 'setStartTime');
      var result = tween.setSpeed(speed);
      expect(tween.setStartTime).toHaveBeenCalled()
    });

    it('should reset `_playTime` if state is `play`', function () {
      var tween = new Tween();
      var speed = 2;
      expect(tween._playTime).not.toBeDefined();
      tween._setState('play');

      var now = performance.now();
      var result = tween.setSpeed(speed);

      expect(tween._playTime).toBeDefined();
      expect(tween._playTime - now).not.toBeGreaterThan(10);
    });

    it('should return this', function () {
      var tween = new Tween();
      var result = tween.setSpeed(2);

      expect(result).toBe(tween);
    });
  });

  describe('`reset` function ->', function() {
    it('should set `_elapsed` to 0', function() {
      var tween = new Tween({
        repeat: 2
      });

      tween._elapsed = 100;
      tween.reset();
      expect(tween._elapsed).toBe(0);
    });
  });

  describe('`onTweenerFinish` function ->', function() {
    it('should call the `_setState` function', function() {
      var tween = new Tween();
      spyOn(tween, '_setState');
      tween.onTweenerFinish();

      expect(tween._setState).toHaveBeenCalledWith('stop');
    });

    it('should envoke `onPlaybackComplete` callback', function() {
      var tween = new Tween();
      spyOn(tween._props, 'onPlaybackComplete');
      tween.onTweenerFinish();

      expect(tween._props.onPlaybackComplete).toHaveBeenCalled();
    });

    it('should increase `_repeatCount`', function() {
      var tween = new Tween({
        repeat: 5
      });

      tween.onTweenerFinish();

      expect(tween._repeatCount).toBe(1);
    });

    it('should pass `repeat` count to the `onPlaybackComplete`', function() {
      var tween = new Tween({ repeat: 2 });

      spyOn(tween._props, 'onPlaybackComplete');
      tween.onTweenerFinish();

      expect(tween._props.onPlaybackComplete).toHaveBeenCalledWith(true, 0, 2);
    });

    it('should not pass `repeat` count to the `onPlaybackComplete`', function() {
      var tween = new Tween();
      spyOn(tween._props, 'onPlaybackComplete');
      tween.onTweenerFinish();

      expect(tween._props.onPlaybackComplete).toHaveBeenCalledWith(true, 0, 0);
    });

    it('should call `play` if `_repeat`', function() {
      var tween = new Tween({
        repeat: 2
      });

      spyOn(tween, 'play');

      tween.onTweenerFinish();
      expect(tween.play).toHaveBeenCalled();

      tween.onTweenerFinish();
      expect(tween.play.calls.count()).toBe(2);

      tween.onTweenerFinish();
      expect(tween.play.calls.count()).toBe(2);
    });

    it('should flip the direction if `isReverseOnRepeat`', function() {
      var tween = new Tween({
        isReverseOnRepeat: true,
        repeat: 2
      });

      spyOn(tween, 'reverse');
      tween.onTweenerFinish();

      expect(tween.reverse).toHaveBeenCalled();
    });

    it('should flip the direction if `isReverseOnRepeat` #function', function() {
      var fun = function(count) {
        return count % 2;
      };

      fun.__mojs__isStaggerFunction = true;

      var tween = new Tween({
        isReverseOnRepeat: [fun],
        repeat: 4
      });

      spyOn(tween, 'reverse');

      tween.onTweenerFinish(); // 0 % 2 = 0  => 0

      expect(tween.reverse.calls.count()).toBe(0);

      tween.onTweenerFinish(); // 1 % 2 = 1  => 1

      expect(tween.reverse.calls.count()).toBe(1);

      tween.onTweenerFinish(); // 2 % 2 = 0  => 1

      expect(tween.reverse.calls.count()).toBe(1);

      tween.onTweenerFinish(); // 3 % 2 = 1  => 2

      expect(tween.reverse.calls.count()).toBe(2);
    });

    it('should flip the direction if `isReverseOnRepeat` #map', function() {
      var tween = new Tween({
        isReverseOnRepeat: [[true, false]],
        repeat: 3
      });

      spyOn(tween, 'reverse');

      tween.onTweenerFinish();

      expect(tween.reverse.calls.count()).toBe(1); // true

      tween.onTweenerFinish();

      expect(tween.reverse.calls.count()).toBe(1); // false

      tween.onTweenerFinish();

      expect(tween.reverse.calls.count()).toBe(2); // true
    });

    it('should not call `play` if not `_repeat`', function() {
      var tween = new Tween();

      spyOn(tween, 'play');
      tween.onTweenerFinish();

      expect(tween.play).not.toHaveBeenCalled();
    });

    it('should call the `reset` function', function() {
      var tween = new Tween();
      spyOn(tween, 'reset');
      tween.onTweenerFinish();

      expect(tween.reset).toHaveBeenCalled();
    });
  });

  describe('`setStartTime` function ->', function () {
    it('should set `_start` time', function () {
      var tween = new Tween();
      var startTime = 500;

      tween.setStartTime(startTime);
      expect(tween._start).toBe(startTime);
      expect(tween._spot).toBe(tween._start - tween._props.delay);
      expect(tween._playTime).toBe(tween._spot);
    });

    it('should set `_start` time regarding `_elapsed`', function () {
      var delay = 50;
      var tween = new Tween({
        delay: delay
      });
      var startTime = 500;
      tween._elapsed = 200;

      tween.setStartTime(startTime);
      expect(tween._spot).toBe(startTime - tween._elapsed);
      expect(tween._start).toBe(tween._spot + delay);
    });

    it('should set `_start` time #delay', function () {
      var delay = 200;
      var duration = 500;
      var tween = new Tween({
        delay: delay,
        duration: duration
      });
      var startTime = 200;

      tween.setStartTime(startTime);
      expect(tween._start).toBe(startTime + delay);
    });

    it('should set `_time` regarding `repeat`', function () {
      var delay = 200;
      var duration = 500;
      var repeat = 3;
      var tween = new Tween({
        delay: delay,
        duration: duration,
        repeat: repeat
      });
      var startTime = 200;

      tween.setStartTime(startTime);
    });

    it('should set `_start` time to `performance.now` if not set', function () {
      var tween = new Tween();
      tween.setStartTime();
      var newTime = performance.now();
      expect(Math.abs(newTime - tween._start)).not.toBeGreaterThan(5);
    });

    it('should set `_start` time to `performance.now` if not set #delay', function () {
      var delay = 150;
      var tween = new Tween({ delay: delay });
      tween.setStartTime();
      var newTime = performance.now();
      expect(Math.abs(tween._start - (newTime + delay))).not.toBeGreaterThan(5);
    });

    it('should set `_end` to the `_start` + `duration`', function () {
      var duration = 2000;
      var options = {
        duration: duration,
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      expect(tween._end).toBe(tween._start + duration);
    });

    it('should recalculate `_elapsed` if >= `_end`', function () {
      var duration = 500;
      var tween = new Tween({
        duration: duration
      });
      tween.setStartTime();

      var start = tween._start;
      tween.update(start);
      tween.update(start + duration/2);
      tween.update(start + duration);

      tween.setStartTime();

      expect(tween._elapsed).toBe(0);
    });

    it('should recalculate `_elapsed` if > `_end`', function () {
      var duration = 500;
      var tween = new Tween({
        duration: duration
      });
      tween.setStartTime();

      var start = tween._start;
      tween.update(start);
      tween.update(start + duration/2);
      tween.update(start + duration + 20);

      tween.setStartTime();

      expect(tween._elapsed).toBe(0);
    });
  });

  describe('`reverse` function ->', function() {
    it('should flip `isReverse` in `_props`', function() {
      var tween = new Tween();
      tween.reverse();
      expect(tween._props.isReverse).toBe(true);
      tween.reverse();
      expect(tween._props.isReverse).toBe(false);
    });

    it('should call the `_reverseCallbacks` function', function() {
      var tween = new Tween();

      spyOn(tween, '_reverseCallbacks');
      tween.reverse();
      expect(tween._reverseCallbacks).toHaveBeenCalled();
    });

    it('should flip the `_elapsed` time', function() {
      var delay = 200;
      var duration = 800;
      var tween = new Tween({
        delay: delay,
        duration: duration
      });

      tween.setStartTime();
      var start = tween._start;
      tween.update(start - delay);
      tween.update(start);
      tween.update(start + duration / 2);

      var elapsed = tween._elapsed;

      tween.reverse();
      expect(tween._elapsed).toBeCloseTo((tween._end - tween._spot) - (elapsed - delay), 5);
    });

    it('should not flip the `_elapsed` time if `0`', function() {
      var delay = 200;
      var duration = 800;
      var tween = new Tween({
        delay: delay,
        duration: duration
      });

      var elapsed = tween._elapsed;

      tween.reverse();
      expect(tween._elapsed).toBe(0);
    });

    it('should call `setStartTime`', function() {
      var tween = new Tween();
      spyOn(tween, 'setStartTime');
      tween.reverse();
      expect(tween.setStartTime).toHaveBeenCalled();
    });

    it('should return this', function() {
      var tween = new Tween();
      var result = tween.reverse();
      expect(result).toBe(tween);
    });
  });

  describe('`setProgress` function', function () {
    it('should call `setStartTime` is `_start` is not set', function () {
      var tween = new Tween();
      spyOn(tween, 'setStartTime');
      tween.setProgress(.5);
      expect(tween.setStartTime).toHaveBeenCalled();
    });

    it('should call `update` with the progress time', function () {
      var progress = .25;
      var tween = new Tween();
      spyOn(tween, 'update');
      tween.setProgress(progress);
      expect(tween.update).toHaveBeenCalledWith(tween._spot + progress*(tween._end - tween._spot));
    });

    it('should temporary reset `speed`', function () {
      var progress = .25;
      var tween = new Tween();
      tween._speed = 20
      tween.setProgress(progress);

      expect(tween._elapsed).toBeCloseTo(87.5);
    });

    it('should set `_prevTime` if not defined', function () {
      var tween = new Tween();
      // override `update` so `_prevTime` won't be set
      tween.update = function() {}
      tween.setProgress(.5);
      expect(tween._prevTime).toBe(tween._start);
    });

    it('should set not `_prevTime` if defined', function () {
      var tween = new Tween();
      // override `update` so `_prevTime` won't be set
      tween.update = function() {}
      var prevTime = 500;
      tween._prevTime = prevTime;
      tween.setProgress(.5);
      expect(tween._prevTime).toBe(prevTime);
    });

    it('should return `this`', function () {
      var progress = .25;
      var tween = new Tween();
      var result = tween.setProgress(progress);
      expect(result).toBe(tween);
    });
  });

  describe('`stop` function', function () {
    it('should call `setProgress`', function () {
      var progress = .25;
      var tween = new Tween();
      tween.play();
      spyOn(tween, 'setProgress');
      tween.stop(progress);
      expect(tween.setProgress).toHaveBeenCalledWith(progress);
    });

    it('should call `setProgress` if `progress` is not passed', function () {
      var tween = new Tween();
      tween.play();
      spyOn(tween, 'setProgress');
      tween.stop();
      expect(tween.setProgress).toHaveBeenCalledWith(0);
    });

    it('should call `setProgress` if `progress` is not passed #reverse', function () {
      var tween = new Tween({
        isReverse: true
      });
      tween.play();
      spyOn(tween, 'setProgress');
      tween.stop();
      expect(tween.setProgress).toHaveBeenCalledWith(1);
    });

    it('should not run if already stopped', function () {
      var tween = new Tween();
      tween.play().stop();
      spyOn(tween, 'setProgress');
      spyOn(tween, 'reset');
      tween.stop();
      expect(tween.reset).not.toHaveBeenCalled();
      expect(tween.setProgress).not.toHaveBeenCalled();
    });

    it('should call `_setState`', function () {
      var tween = new Tween();
      tween.play();
      spyOn(tween, '_setState');
      tween.stop();
      expect(tween._setState).toHaveBeenCalledWith('stop');
    });

    it('should call `reset`', function () {
      var tween = new Tween();
      tween.play();
      spyOn(tween, 'reset');
      tween.stop();
      expect(tween.reset).toHaveBeenCalled();
    });

    it('should return `this`', function () {
      var tween = new Tween();
      var result = tween.stop();
      expect(result).toBe(tween);
    });
  });

  describe('`_reverseCallbacks` function ->', function() {
    it('should reverse the `_cb` in pairs', function() {
      var tween = new Tween();
      var cbs = [ Math.random(), Math.random(), Math.random(), Math.random() ];
      tween._cbs = cbs;

      tween._reverseCallbacks();

      expect(tween._cbs[0]).toBe(cbs[1]);
      expect(tween._cbs[1]).toBe(cbs[0]);

      expect(tween._cbs[2]).toBe(cbs[3]);
      expect(tween._cbs[3]).toBe(cbs[2]);

      tween._reverseCallbacks();

      expect(tween._cbs[0]).toBe(cbs[0]);
      expect(tween._cbs[1]).toBe(cbs[1]);

      expect(tween._cbs[2]).toBe(cbs[2]);
      expect(tween._cbs[3]).toBe(cbs[3]);

    });
  });

  describe('`_extendDefaults` function ->', function() {
    it('should call the super', function() {
      spyOn(ClassProto, '_extendDefaults').and.callThrough();
      var tween = new Tween();

      expect(ClassProto._extendDefaults).toHaveBeenCalled();
    });

    it('should parse `easing`', function() {
      var tween = new Tween({
        easing: 'sin.in'
      });

      expect(tween._props.easing).toBe(mojs.easing.sin.in);
    });

    it('should parse `backwardEasing`', function() {
      var tween = new Tween({
        backwardEasing: 'sin.in'
      });

      expect(tween._props.backwardEasing).toBe(mojs.easing.sin.in);
    });

    it('`backwardEasing` should  fallback to `easing`', function() {
      var tween = new Tween({
        easing: 'sin.in'
      });

      expect(tween._props.backwardEasing).toBe(mojs.easing.sin.in);
    });
  });

  describe('`onUpdate` callback ->', function() {
    it('should pass current `ep`, `p`, `isForward`, `time`', function () {
      var duration = 50;

      var options = {
        easing: 'linear.none',
        duration: duration,
        onUpdate: function() {}
      };
      var tween = Tween(options);

      tween.setStartTime(200);
      var startTime = tween._start;

      spyOn(tween._props, 'onUpdate')

      tween.update(startTime - 10);
      tween.update(startTime);

      expect(tween._props.onUpdate).toHaveBeenCalledWith(0, 0, true, startTime);

      tween.update(startTime + duration/2);

      expect(tween._props.onUpdate).toHaveBeenCalledWith(.5, .5, true, startTime + duration/2);

      tween.update(startTime + duration/4);

      expect(tween._props.onUpdate).toHaveBeenCalledWith(.25, .25, false, startTime + duration/4);

      tween.update(startTime);

      expect(tween._props.onUpdate).toHaveBeenCalledWith(0, 0, false, startTime);
    });
  });

  describe('`stagger` properties ->', function() {
    it('parse stagger properties', function () {
      var onUpdate = function() {};

      var tween = Tween({
        index: 3,
        delay: 'stagger(20, 10)',
        duration: 'stagger(0, 2000)',
        isReverse: [false, true],
        onUpdate: onUpdate
      });

      expect(tween._props.delay).toBe(20 + 3*10);
      expect(tween._props.duration).toBe(0 + 3*2000);
      expect(tween._props.isReverse).toBe(true);
      expect(tween._props.onUpdate).toBe(onUpdate);
    });
  });
});

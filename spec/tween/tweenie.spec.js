var Tweenie = mojs.Tweenie;

var helpers = mojs.__helpers__;
var tweener = helpers.tweener;
var ClassProto = helpers.ClassProto;
var tweenieDefaults = helpers.tweenieDefaults;

var eps = 0.0000001;

describe('tweenie ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var tweenie = Tweenie();
      expect(ClassProto.isPrototypeOf(tweenie)).toBe(true);
    });

    it('should declare `defaults`', function () {
      var tweenie = Tweenie();
      expect(tweenie._defaults).toBe(tweenieDefaults);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      // the first update to set the `_prevTime`
      tweenie.update(startTime - 10);

      tweenie.update(startTime);

      expect(progress).toBe(0);

      tweenie.update(startTime += 15);

      expect(progress).toBeCloseTo(0.3, 3);

      tweenie.update(startTime += 15);

      expect(progress).toBeCloseTo(0.6, 3);

      tweenie.update(startTime += 15);

      expect(progress).toBeCloseTo(0.9, 3);

      tweenie.update(startTime += 15);

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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      var endTime = startTime + duration;
      // the first update to set the `_prevTime`
      tweenie.update(endTime + 15);

      tweenie.update(endTime);

      expect(progress).toBe(1);

      tweenie.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.7, 3);

      tweenie.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.4, 3);

      tweenie.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.1, 3);

      tweenie.update(endTime -= 15);

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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime - 10);

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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + 10);
      tweenie.update(startTime - 10);
      expect(progress).toBe(0);

      progress = -1;

      tweenie.update(startTime - 20);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime + duration + 10);

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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      var endTime = startTime + duration;

      tweenie.update(endTime);
      tweenie.update(endTime - 10);
      tweenie.update(endTime + 10);
      expect(progress).toBe(1);

      progress = -1;

      tweenie.update(endTime + 20);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      // the first update to set the `_prevTime`
      tweenie.update(startTime - 10);
      tweenie.update(startTime);

      expect(progress).toBe(1);

      tweenie.update(startTime += 15);

      expect(progress).toBeCloseTo(0.7, 3);

      tweenie.update(startTime += 15);

      expect(progress).toBeCloseTo(0.4, 3);

      tweenie.update(startTime += 15);

      expect(progress).toBeCloseTo(0.1, 3);

      tweenie.update(startTime += 15);

      expect(progress).toBe(0);
    });

    it('should save `_elapsed`', function () {
      var duration = 200;
      var options = {
        onUpdate: function() {},
        duration: duration
      };

      var tweenie = new Tweenie(options);
      tweenie.setStartTime();

      var updateTime = tweenie._start + 10;

      tweenie.update(updateTime);
      expect(tweenie._elapsed).toBe(updateTime - tweenie._spot);

      updateTime += duration/2;
      tweenie.update(updateTime);
      expect(tweenie._elapsed).toBe(updateTime - tweenie._spot);

      updateTime += duration/2;
      tweenie.update(updateTime);
      expect(tweenie._elapsed).toBe(updateTime - tweenie._spot);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      var endTime = startTime + duration;
      // the first update to set the `_prevTime`
      tweenie.update(endTime + 10);
      tweenie.update(endTime);

      expect(progress).toBe(0);

      tweenie.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.3, 3);

      tweenie.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.6, 3);

      tweenie.update(endTime -= 15);

      expect(progress).toBeCloseTo(0.9, 3);

      tweenie.update(endTime -= 15);

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

      var tweenie = Tweenie(options);
      tweenie.setStartTime(200);

      var startTime = tweenie._start;

      tweenie.update(startTime - 10);
      tweenie.update(startTime);
      tweenie.update(startTime + 10);

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

      var tweenie = Tweenie(options);
      tweenie.setStartTime(200);

      var startTime = tweenie._start;

      tweenie.update(startTime - 10);
      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration);
      tweenie.update(startTime + duration + 10);
      cnt = 0;
      tweenie.update(startTime + duration);

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

      var tweenie = Tweenie(options);
      tweenie.setStartTime(200);

      var startTime = tweenie._start;

      tweenie.update(startTime - 10);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration);
      tweenie.update(startTime + duration + 10);
      tweenie.update(startTime + duration);
      cnt = 0;
      tweenie.update(startTime + duration - 10);

      expect(cnt).toBe(0);
    });

    it('should return when active period is completed', function () {
      var duration = 500;

      var options = {
        duration: duration,
        onComplete: function() {}
      };

      var tweenie = Tweenie(options);
      tweenie.setStartTime(200);

      var startTime = tweenie._start;

      tweenie.update(startTime - 10);
      tweenie.update(startTime + duration/2);
      var result = tweenie.update(startTime + duration);

      expect(tweenie._prevTime).toBe(startTime + duration);
      expect(result).toBe(true);
    });

    it('should return when active period is completed #2', function () {
      var duration = 500;

      var options = {
        duration: duration,
        onComplete: function() {}
      };

      var tweenie = Tweenie(options);
      tweenie.setStartTime(200);

      var startTime = tweenie._start;

      tweenie.update(startTime - 10);
      tweenie.update(startTime + duration/2);
      var result = tweenie.update(startTime + duration + 10);

      expect(tweenie._prevTime).toBe(startTime + duration + 10);
      expect(result).toBe(true);
    });

    it('should return when active period is completed #backward', function () {
      var duration = 500;

      var options = {
        duration: duration,
        onComplete: function() {}
      };

      var tweenie = Tweenie(options);
      tweenie.setStartTime(200);

      var end = tweenie._end;

      tweenie.update(end + 10);
      tweenie.update(end - duration/2);
      var result = tweenie.update(end - duration);

      expect(tweenie._prevTime).toBe(end - duration);
      expect(result).toBe(true);
    });

    it('should return when active period is completed #backward #2', function () {
      var duration = 500;

      var options = {
        duration: duration,
        onComplete: function() {}
      };

      var tweenie = Tweenie(options);
      tweenie.setStartTime(200);

      var end = tweenie._end;

      tweenie.update(end + 10);
      tweenie.update(end - duration/2);
      var result = tweenie.update(end - duration - 10);

      expect(tweenie._prevTime).toBe(end - duration - 10);
      expect(result).toBe(true);
    });

    it('should recalculate `time` regarding `speed`', function() {
      var duration = 500;
      var tweenie = new Tweenie({
        duration: duration,
        repeat: 5
      });
      tweenie.setStartTime();

      tweenie._playTime = 200;
      tweenie._speed = 2;
      var time = tweenie._start + duration/2;
      var normalizedTime = tweenie._playTime + tweenie._speed * (time - tweenie._playTime);

      tweenie.update(time);

      expect(tweenie._prevTime).toBe(normalizedTime);
    });

    it('should recalculate `time` regarding `speed` #2', function() {
      var duration = 500;
      var tweenie = new Tweenie({
        duration: duration,
        repeat: 5
      });
      tweenie.setStartTime();

      tweenie._playTime = 200;
      tweenie._speed = .5;
      var time = tweenie._start + duration/2;
      var normalizedTime = tweenie._playTime + tweenie._speed * (time - tweenie._playTime);

      tweenie.update(time);

      expect(tweenie._prevTime).toBe(normalizedTime);
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
      var tweenie = Tweenie(options);
      tweenie.setStartTime();

      var startTime = tweenie._start;

      tweenie.update(startTime - 10);
      tweenie.update(startTime);

      expect(ep).toBe(easing(0));
      expect(p).toBe(0);

      tweenie.update(startTime += 15);

      expect(ep).toBeCloseTo(easing(0.3), 3);
      expect(p).toBeCloseTo(0.3, 3);

      tweenie.update(startTime += 15);

      expect(ep).toBeCloseTo(easing(0.6), 3);
      expect(p).toBeCloseTo(0.6, 3);

      tweenie.update(startTime += 15);

      expect(ep).toBeCloseTo(easing(0.9), 3);
      expect(p).toBeCloseTo(0.9, 3);

      tweenie.update(startTime += 15);

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
      var tweenie = Tweenie(options);
      tweenie.setStartTime();

      var end = tweenie._end;
      tweenie.update(end + 10);
      tweenie.update(end);

      expect(ep).toBe(backwardEasing(1));
      expect(p).toBe(1);

      tweenie.update(end -= 15);

      expect(ep).toBeCloseTo(backwardEasing(0.7), 3);
      expect(p).toBeCloseTo(0.7, 3);

      tweenie.update(end -= 15);

      expect(ep).toBeCloseTo(backwardEasing(0.4), 3);
      expect(p).toBeCloseTo(0.4, 3);

      tweenie.update(end -= 15);

      expect(ep).toBeCloseTo(backwardEasing(0.1), 3);
      expect(p).toBeCloseTo(0.1, 3);

      tweenie.update(end -= 15);

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
      var tweenie = Tweenie(options);
      tweenie.setStartTime();

      var startTime = tweenie._start;

      tweenie.update(startTime - 10);
      tweenie.update(startTime);

      expect(ep).toBe(backwardEasing(1));
      expect(p).toBe(1);

      tweenie.update(startTime += 15);

      expect(ep).toBeCloseTo(backwardEasing(0.7), 3);
      expect(p).toBeCloseTo(0.7, 3);

      tweenie.update(startTime += 15);

      expect(ep).toBeCloseTo(backwardEasing(0.4), 3);
      expect(p).toBeCloseTo(0.4, 3);

      tweenie.update(startTime += 15);

      expect(ep).toBeCloseTo(backwardEasing(0.1), 3);
      expect(p).toBeCloseTo(0.1, 3);

      tweenie.update(startTime += 15);

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
      var tweenie = Tweenie(options);
      tweenie.setStartTime();

      var end = tweenie._end;
      tweenie.update(end + 10);
      tweenie.update(end);

      expect(ep).toBe(easing(0));
      expect(p).toBe(0);

      tweenie.update(end -= 15);

      expect(ep).toBeCloseTo(easing(0.3), 3);
      expect(p).toBeCloseTo(0.3, 3);

      tweenie.update(end -= 15);

      expect(ep).toBeCloseTo(easing(0.6), 3);
      expect(p).toBeCloseTo(0.6, 3);

      tweenie.update(end -= 15);

      expect(ep).toBeCloseTo(easing(0.9), 3);
      expect(p).toBeCloseTo(0.9, 3);

      tweenie.update(end -= 15);

      expect(ep).toBeCloseTo(easing(1), 3);
      expect(p).toBeCloseTo(1, 3);
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
      var tweenie = Tweenie(options);

      spyOn(tweenie._cbs, 1);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration + 10);

      expect(tweenie._cbs[1]).toHaveBeenCalledWith(true, false, 0);
    });

    it('should be called on exact end', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 4,
        duration: duration,
        onComplete: function() {}
      };
      var tweenie = Tweenie(options);

      spyOn(tweenie._cbs, 1);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration);

      expect(tweenie._cbs[1]).toHaveBeenCalledWith(true, false, options.index);
    });

    it('should be called on if complete and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 2,
        duration: duration,
        onComplete: function() {}
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration + 10);
      spyOn(tweenie._cbs, 1);
      tweenie.update(startTime + duration - 10);

      expect(tweenie._cbs[1]).toHaveBeenCalledWith(false, false, options.index);
    });

    it('should be called on if complete and returned #2', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 1,
        duration: duration,
        onComplete: function() {}
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration);
      spyOn(tweenie._cbs, 1);
      tweenie.update(startTime + duration - 10);

      expect(tweenie._cbs[1]).toHaveBeenCalledWith(false, false, options.index);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      // the first update to set the `_prevTime`
      tweenie.update(startTime - 10);

      spyOn(tweenie._cbs, 0);
      tweenie.update(startTime);

      expect(tweenie._cbs[0]).toHaveBeenCalledWith(true, true, options.index);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration + 10);
      cnt = 0;
      tweenie.update(startTime + duration);

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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      spyOn(tweenie._cbs, 0);
      tweenie.update(startTime - 10);

      expect(tweenie._cbs[0]).toHaveBeenCalledWith(false, false, 0);
    });

    it('should be called on exact start', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 3,
        duration: duration,
        onStart: function() {}
      };
      var tweenie = Tweenie(options);


      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      spyOn(tweenie._cbs, 0);
      tweenie.update(startTime);

      expect(tweenie._cbs[0]).toHaveBeenCalledWith(false, false, options.index);
    });

    it('should be called on if went before start and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 6,
        duration: duration,
        onStart: function() {}
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime);
      spyOn(tweenie._cbs, 0);
      tweenie.update(startTime + 10);

      expect(tweenie._cbs[0]).toHaveBeenCalledWith(true, false, options.index);
    });

    it('should be called on if went before start and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 1,
        duration: duration,
        onStart: function() {}
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime - 10);
      spyOn(tweenie._cbs, 0);
      tweenie.update(startTime + 10);

      expect(tweenie._cbs[0]).toHaveBeenCalledWith(true, false, options.index);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      spyOn(tweenie._cbs, 1);
      tweenie.update(startTime + duration);

      expect(tweenie._cbs[1]).toHaveBeenCalledWith(true, true, options.index);
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
      var tweenie = Tweenie(options);

      spyOn(tweenie._chCbs, 1);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration + 10);

      expect(tweenie._chCbs[1]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + duration + 10);
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
      var tweenie = Tweenie(options);

      spyOn(tweenie._chCbs, 1);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration + 10);

      expect(tweenie._chCbs[1]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + duration + 10);
    });

    it('should be called on exact end', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 2,
        duration: duration,
        onComplete: function() {}
      };
      var tweenie = Tweenie(options);

      spyOn(tweenie._chCbs, 1);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration);

      expect(tweenie._chCbs[1]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + duration);
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
      var tweenie = Tweenie(options);

      spyOn(tweenie._chCbs, 1);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration);

      expect(tweenie._chCbs[1]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + duration);
    });

    it('should be called on if complete and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 3,
        duration: duration,
        onComplete: function() {}
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration + 10);
      spyOn(tweenie._chCbs, 1);
      tweenie.update(startTime + duration - 10);

      expect(tweenie._chCbs[1]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime + duration - 10);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration + 10);
      spyOn(tweenie._chCbs, 1);
      tweenie.update(startTime + duration - 10);

      expect(tweenie._chCbs[1]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime + duration - 10);
    });

    it('should be called on if complete and returned #2', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onComplete: function() {}
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration);
      spyOn(tweenie._chCbs, 1);
      tweenie.update(startTime + duration - 10);

      expect(tweenie._chCbs[1]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime + duration - 10);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration);
      spyOn(tweenie._chCbs, 1);
      tweenie.update(startTime + duration - 10);

      expect(tweenie._chCbs[1]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime + duration - 10);
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
      var tweenie = Tweenie(options);


      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime - 10);

      expect(tweenie._chCbs[0]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime - 10);
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
      var tweenie = Tweenie(options);


      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime - 10);

      expect(tweenie._chCbs[0]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime - 10);
    });

    it('should be called on exact start', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 7,
        duration: duration,
        onStart: function() {}
      };
      var tweenie = Tweenie(options);


      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime);

      expect(tweenie._chCbs[0]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime);
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
      var tweenie = Tweenie(options);


      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime);

      expect(tweenie._chCbs[0]).toHaveBeenCalledWith(false, !!options.isReverse, options.index || 0, startTime);
    });

    it('should be called on if went before start and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        index: 4,
        duration: duration,
        onStart: function() {}
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime);
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime + 10);

      expect(tweenie._chCbs[0]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + 10);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime);
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime + 10);

      expect(tweenie._chCbs[0]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + 10);
    });

    it('should be called on if went before start and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
        duration: duration,
        onStart: function() {}
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime - 10);
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime + 10);

      expect(tweenie._chCbs[0]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + 10);
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
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime - 10);
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime + 10);

      expect(tweenie._chCbs[0]).toHaveBeenCalledWith(true, !!options.isReverse, options.index || 0, startTime + 10);
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
      var tweenie = Tweenie(options);

      expect(tweenie._cbs[0]).toBe(options.onComplete);
      expect(tweenie._cbs[1]).toBe(options.onStart);

      expect(tweenie._cbs[2]).toBe(1);
      expect(tweenie._cbs[3]).toBe(0);
    });
  });

  describe('`setStartTime` function ->', function() {
    it('should set the `_start` time', function() {
      var duration = 400;
      var tweenie = Tweenie({
        duration: duration
      });
      var startTime = 250;

      tweenie.setStartTime(startTime);

      expect(tweenie._start).toBe(startTime);
      expect(tweenie._end).toBe(startTime + duration);
      expect(tweenie._time).toBe(duration);
    });

    it('should set the `_start` time regarding `delay`', function() {
      var duration = 100;
      var delay = 50;

      var options = {
        duration: duration,
        delay: delay
      };
      var tweenie = Tweenie(options);
      var startTime = 350;

      tweenie.setStartTime(startTime);

      expect(tweenie._start).toBe(startTime + delay);
      expect(tweenie._end).toBe(startTime + delay + duration);
      expect(tweenie._time).toBe(delay + duration);
    });
  });

  describe('`onSkip` callback ->', function() {
    it('should be called when greater or equal than _end and suddenly smaller than `_start`', function() {
      var duration = 400;
      var index = 3;
      var tweenie = Tweenie({
        duration: duration,
        onSkip: function() {},
        index: index
      });

      tweenie.setStartTime(250);
      var startTime = tweenie._start;

      tweenie.update(startTime);
      tweenie.update(startTime + duration/2);
      tweenie.update(startTime + duration);
      tweenie.update(startTime + duration + 10);

      spyOn(tweenie._props, 'onSkip');

      tweenie.update(startTime - 10);
      expect(tweenie._props.onSkip).toHaveBeenCalledWith(false, index, startTime - 10, startTime + duration + 10);
      expect(tweenie._props.onSkip.calls.count()).toBe(1);
    });

    it('should be called when greater or equal than _end and suddenly smaller than `_start` #2', function() {
      var duration = 400;
      var index = 3;
      var tweenie = Tweenie({
        duration: duration,
        onSkip: function() {},
        index: index,
        isIt: 1
      });

      tweenie.setStartTime(250);
      var startTime = tweenie._start;

      tweenie.update(startTime + duration + 10);

      spyOn(tweenie._props, 'onSkip');

      tweenie.update(startTime);
      expect(tweenie._props.onSkip).toHaveBeenCalledWith(false, index, startTime, startTime + duration + 10);
      expect(tweenie._props.onSkip.calls.count()).toBe(1);
    });

    it('should be called when greater or equal than _end and suddenly smaller than `_start`', function() {
      var duration = 400;
      var index = 4;
      var tweenie = Tweenie({
        duration: duration,
        onSkip: function() {},
        index: index
      });

      tweenie.setStartTime(250);
      var startTime = tweenie._start;

      tweenie.update(startTime - 10);

      spyOn(tweenie._props, 'onSkip');

      tweenie.update(startTime + duration + 10);

      expect(tweenie._props.onSkip).toHaveBeenCalledWith(true, index, startTime + duration + 10, startTime - 10);
    });

    it('should be called when greater or equal than _end and suddenly smaller than `_start` #2', function() {
      var duration = 400;
      var index = 4;
      var tweenie = Tweenie({
        duration: duration,
        onSkip: function() {},
        index: index
      });

      tweenie.setStartTime(250);
      var startTime = tweenie._start;

      tweenie.update(startTime - 10);

      spyOn(tweenie._props, 'onSkip');

      tweenie.update(startTime + duration);

      expect(tweenie._props.onSkip).toHaveBeenCalledWith(true, index, startTime + duration, startTime - 10);
    });

  });

  describe('`reset` dunction ->', function() {
    it('should reset the tweenie', function() {
      var duration = 400;
      var tweenie = Tweenie({
        duration: duration,
        onSkip: function() {}
      });

      tweenie._isActive = true;
      tweenie.reset();

      expect(tweenie._isActive).toBe(false);
      expect(tweenie._prevTime).not.toBeDefined();
    });
  });

  describe('_setState function ->', function() {
    it('should set playback state', function() {
      var tweenie = new Tweenie();
      tweenie._setState('play');
      expect(tweenie._state).toBe('play');
    });
    it('should track previous playback state', function() {
      var t;
      t = new Tweenie();
      t._setState('play');
      t._setState('pause');
      expect(t._prevState).toBe('play');
      expect(t._state).toBe('pause');
    });
    describe('onPlaybackStart / play callback ->', function() {
      it('should call `onPlaybackStart` method if `play`', function() {
        var duration = 50;
        var tweenie = new Tweenie({
          duration: duration,
          onPlaybackStart: function() {}
        });
        spyOn(tweenie._props, 'onPlaybackStart');
        tweenie._setState('play');
        expect(tweenie._props.onPlaybackStart).toHaveBeenCalledWith('play', 'stop');
      });
      it('should call `onPlaybackStart` method if `play` after `pause`', function() {
        var duration = 50;
        var tweenie = new Tweenie({
          duration: duration
        });
        tweenie._setState('play');
        tweenie._setState('pause');
        spyOn(tweenie._props, 'onPlaybackStart');
        tweenie._setState('play');
        expect(tweenie._props.onPlaybackStart).toHaveBeenCalledWith('play', 'pause');
      });
      it('should not call `onPlaybackStart` method if already `play`', function() {
        var duration = 50;
        var tweenie = new Tweenie({
          duration: duration
        });
        tweenie._setState('play');
        spyOn(tweenie._props, 'onPlaybackStart');
        tweenie._setState('play');
        expect(tweenie._props.onPlaybackStart).not.toHaveBeenCalled();
      });
      it('should not call `onPlaybackStart` method if already `reverse`', function() {
        var duration = 50;
        var tweenie = new Tweenie({
          duration: duration
        });
        tweenie._setState('reverse');
        spyOn(tweenie._props, 'onPlaybackStart');
        tweenie._setState('play');
        expect(tweenie._props.onPlaybackStart).not.toHaveBeenCalled();
      });
    });

    describe('onPlaybackStart / reverse callback ->', function() {
      it('should call `onPlaybackStart` method if `reverse`', function() {
        var duration = 50;
        var tweenie = new Tweenie({
          duration: duration
        });
        spyOn(tweenie._props, 'onPlaybackStart');
        tweenie._setState('reverse');
        expect(tweenie._props.onPlaybackStart).toHaveBeenCalled();
      });
      it('should call onPlaybackStart method if reverse', function() {
        var duration = 50;
        var tweenie = new Tweenie({
          duration: duration
        });
        tweenie._setState('reverse');
        tweenie._setState('pause');
        spyOn(tweenie._props, 'onPlaybackStart');
        tweenie._setState('reverse');
        expect(tweenie._props.onPlaybackStart).toHaveBeenCalled();
      });
      it('should not call onPlaybackStart method if already reverse', function() {
        var duration = 50;
        var tweenie = new Tweenie({
          duration: duration
        });
        tweenie._setState('reverse');
        spyOn(tweenie._props, 'onPlaybackStart');
        tweenie._setState('reverse');
        expect(tweenie._props.onPlaybackStart).not.toHaveBeenCalled();
      });
      it('should not call onPlaybackStart method if already play', function() {
        var duration = 50;
        var tweenie = new Tweenie({
          duration: duration
        });
        tweenie._setState('play');
        spyOn(tweenie._props, 'onPlaybackStart');
        tweenie._setState('reverse');
        expect(tweenie._props.onPlaybackStart).not.toHaveBeenCalled();
      });
    });

    describe('onPlaybackPause / pause callback ->', function() {
      it('should call onPlaybackPause method if pause', function() {
        var tweenie = new Tweenie();
        tweenie._setState('play');
        spyOn(tweenie._props, 'onPlaybackPause');
        tweenie._setState('pause');
        return expect(tweenie._props.onPlaybackPause).toHaveBeenCalled();
      });
      it('should call onPlaybackPause method if play', function() {
        var tweenie = new Tweenie();
        tweenie._setState('play');
        spyOn(tweenie._props, 'onPlaybackPause');
        tweenie._setState('pause');
        expect(tweenie._props.onPlaybackPause).toHaveBeenCalled();
      });
      it('should call onPlaybackPause method if already was reverse', function() {
        var tweenie = new Tweenie();
        tweenie._setState('reverse');
        spyOn(tweenie._props, 'onPlaybackPause');
        tweenie._setState('pause');
        expect(tweenie._props.onPlaybackPause).toHaveBeenCalled();
      });
      it('should not call onPlaybackPause method if already stopped', function() {
        var tweenie = new Tweenie();
        spyOn(tweenie._props, 'onPlaybackPause');
        tweenie._setState('pause');
        expect(tweenie._props.onPlaybackPause).not.toHaveBeenCalled();
      });
      it('should not call onPlaybackPause method if already paused', function() {
        var tweenie = new Tweenie();
        tweenie._setState('play');
        tweenie._setState('pause');
        spyOn(tweenie._props, 'onPlaybackPause');
        tweenie._setState('pause');
        expect(tweenie._props.onPlaybackPause).not.toHaveBeenCalled();
      });
    });
    describe('onPlaybackStop / stop callback ->', function() {
      it('should call onPlaybackStop method if stop', function() {
        var tweenie = new Tweenie();
        tweenie._setState('play');
        spyOn(tweenie._props, 'onPlaybackStop');
        tweenie._setState('stop');
        expect(tweenie._props.onPlaybackStop).toHaveBeenCalled();
      });
      it('should call onPlaybackStop method if stop', function() {
        var tweenie = new Tweenie();
        tweenie._setState('play');
        spyOn(tweenie._props, 'onPlaybackStop');
        tweenie._setState('stop');
        expect(tweenie._props.onPlaybackStop).toHaveBeenCalled();
      });
      it('should call onPlaybackStop method if was play', function() {
        var tweenie = new Tweenie();
        tweenie._setState('play');
        spyOn(tweenie._props, 'onPlaybackStop');
        tweenie._setState('stop');
        expect(tweenie._props.onPlaybackStop).toHaveBeenCalled();
      });
      it('should call onPlaybackStop method if already paused', function() {
        var tweenie = new Tweenie();
        tweenie._setState('play');
        tweenie._setState('pause');
        spyOn(tweenie._props, 'onPlaybackStop');
        tweenie._setState('stop');
        expect(tweenie._props.onPlaybackStop).toHaveBeenCalled();
      });
      it('should not call onPlaybackStop method if already stopped', function() {
        var tweenie = new Tweenie();
        spyOn(tweenie._props, 'onPlaybackStop');
        tweenie._setState('stop');
        expect(tweenie._props.onPlaybackStop).not.toHaveBeenCalled();
      });
    });
  });

  describe('`_setupPlay` function ->', function() {
    it('should call the `setStartTime` function', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie, 'setStartTime');
      tweenie._setupPlay();

      expect(tweenie.setStartTime).toHaveBeenCalledWith();
    });
    it('should add the tweenie to the `tweener`', function() {
      var tweenie = new Tweenie();
      spyOn(tweener, 'add');
      tweenie._setupPlay();

      expect(tweener.add).toHaveBeenCalledWith(tweenie);
    });
  });

  describe('`play` function ->', function() {
    it('should call the `_setState` function', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie, '_setState');
      tweenie.play();

      expect(tweenie._setState).toHaveBeenCalledWith('play');
    });

    it('should call the `_setupPlay` function', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie, '_setupPlay');
      tweenie.play();

      expect(tweenie._setupPlay).toHaveBeenCalledWith('play');
    });

    it('should return `this`', function() {
      var tweenie = new Tweenie();
      var result = tweenie.play();

      expect(result).toBe(tweenie);
    });

    it('should return if already playing', function() {
      var tweenie = new Tweenie();
      tweenie._state = 'play';
      spyOn(tweenie, 'setStartTime');
      var result = tweenie.play();

      expect(result).toBe(tweenie);
      expect(tweenie.setStartTime).not.toHaveBeenCalled();
    });

    it('should set `_playTime`', function() {
      var tweenie = new Tweenie();
      tweenie.play();

      var time = performance.now();
      expect(tweenie._playTime).toBeDefined();
      expect(time - tweenie._playTime).not.toBeGreaterThan(10);
    });

    it('should set `_speed`', function() {
      var speed = 2;

      var tweenie = new Tweenie({
        speed: speed
      });
      tweenie._speed = -1;

      tweenie.play();

      expect(tweenie._speed).toBe(speed);
    });

    it('should set the `_repeat` property', function() {
      var tweenie = new Tweenie();
      tweenie._repeat = 0;

      var repeat = 12;
      tweenie.play(repeat);

      expect(tweenie._repeat).toBe(repeat);
    });

    it('should not set the `_repeat` property', function() {
      var tweenie = new Tweenie();

      var repeat = 12;
      tweenie._repeat = repeat;
      tweenie.play();

      expect(tweenie._repeat).toBe(repeat);
    });
  });


  describe('`replay` function ->', function() {
    it('should call the `reset` function', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie, 'reset');
      tweenie.replay();

      expect(tweenie.reset).toHaveBeenCalled();
    });

    it('should call the `play` function', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie, 'play');
      tweenie.replay();

      expect(tweenie.play).toHaveBeenCalled();
    });

    it('should pass `repeat` to the `play` function', function() {
      var tweenie = new Tweenie();
      var repeat = 5;
      spyOn(tweenie, 'play');
      tweenie.replay(repeat);

      expect(tweenie.play).toHaveBeenCalledWith(repeat);
    });

    it('should return `this`', function() {
      var tweenie = new Tweenie();
      var result = tweenie.replay();

      expect(result).toBe(tweenie);
    });
  });

  describe('`pause` function ->', function() {
    it('should call the `tweener.remove` function', function() {
      var tweenie = new Tweenie();
      tweenie.play();
      spyOn(tweener, 'remove');
      tweenie.pause();

      expect(tweener.remove).toHaveBeenCalledWith(tweenie);
    });

    it('should call the `_setState` function', function() {
      var tweenie = new Tweenie();
      tweenie.play();
      spyOn(tweenie, '_setState');
      tweenie.pause();

      expect(tweenie._setState).toHaveBeenCalledWith('pause');
    });

    it('should not call the `_setState` if already `paused`', function() {
      var tweenie = new Tweenie();
      tweenie.pause();
      spyOn(tweenie, '_setState');
      tweenie.pause();

      expect(tweenie._setState).not.toHaveBeenCalledWith('pause');
    });

    it('should not call the `_setState` if already `stopped`', function() {
      var tweenie = new Tweenie();
      tweenie._state = 'stop';
      spyOn(tweenie, '_setState');
      tweenie.pause();

      expect(tweenie._setState).not.toHaveBeenCalledWith('pause');
    });

    it('should return `this`', function() {
      var tweenie = new Tweenie();
      var result = tweenie.pause();

      expect(result).toBe(tweenie);
    });

    it('should reset `_speed` to `1`', function() {
      var speed = 2;

      var tweenie = new Tweenie({
        speed: speed
      });
      tweenie._speed = -1;

      tweenie.play();
      expect(tweenie._speed).toBe(speed);

      tweenie.pause();
      expect(tweenie._speed).toBe(1);

    });
  });

  describe('`setSpeed` function ->', function () {
    it('should set `speed` on `_props`', function () {
      var tweenie = new Tweenie();
      var speed = 2;
      var result = tweenie.setSpeed(speed);

      expect(tweenie._props.speed).toBe(speed);
    });

    it('should set `_speed` if state is `play`', function () {
      var tweenie = new Tweenie();
      var speed = 2;
      expect(tweenie._speed).toBe(1);
      tweenie._setState('play');
      var result = tweenie.setSpeed(speed);

      expect(tweenie._speed).toBe(speed);
    });

    it('should call `setStartTime` if state is `play`', function () {
      var tweenie = new Tweenie();
      var speed = 2;
      expect(tweenie._playTime).not.toBeDefined();
      tweenie._setState('play');

      var now = performance.now();

      spyOn(tweenie, 'setStartTime');
      var result = tweenie.setSpeed(speed);
      expect(tweenie.setStartTime).toHaveBeenCalled()
    });

    it('should reset `_playTime` if state is `play`', function () {
      var tweenie = new Tweenie();
      var speed = 2;
      expect(tweenie._playTime).not.toBeDefined();
      tweenie._setState('play');

      var now = performance.now();
      var result = tweenie.setSpeed(speed);

      expect(tweenie._playTime).toBeDefined();
      expect(tweenie._playTime - now).not.toBeGreaterThan(10);
    });

    it('should return this', function () {
      var tweenie = new Tweenie();
      var result = tweenie.setSpeed(2);

      expect(result).toBe(tweenie);
    });
  });

  describe('`reset` function ->', function() {
    it('should set `_elapsed` to 0', function() {
      var tweenie = new Tweenie({
        repeat: 2
      });

      tweenie._elapsed = 100;
      tweenie.reset();
      expect(tweenie._elapsed).toBe(0);
    });
  });

  describe('`onTweenerFinish` function ->', function() {
    it('should call the `_setState` function', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie, '_setState');
      tweenie.onTweenerFinish();

      expect(tweenie._setState).toHaveBeenCalledWith('stop');
    });

    it('should envoke `onPlaybackComplete` callback', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie._props, 'onPlaybackComplete');
      tweenie.onTweenerFinish();

      expect(tweenie._props.onPlaybackComplete).toHaveBeenCalled();
    });

    it('should pass `repeat` count to the `onPlaybackComplete`', function() {
      var tweenie = new Tweenie();

      var repeat = 2;
      tweenie._repeat = repeat;
      spyOn(tweenie._props, 'onPlaybackComplete');
      tweenie.onTweenerFinish();

      expect(tweenie._props.onPlaybackComplete).toHaveBeenCalledWith(true, repeat - 1);
    });

    it('should not pass `repeat` count to the `onPlaybackComplete`', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie._props, 'onPlaybackComplete');
      tweenie.onTweenerFinish();

      expect(tweenie._props.onPlaybackComplete).toHaveBeenCalledWith(true, 0);
    });

    it('should call `play` if `_repeat`', function() {
      var tweenie = new Tweenie();

      var repeat = 2;
      tweenie._repeat = repeat;
      spyOn(tweenie, 'play');
      tweenie.onTweenerFinish();

      expect(tweenie.play).toHaveBeenCalledWith(repeat-1);
    });

    it('should not call `play` if not `_repeat`', function() {
      var tweenie = new Tweenie();

      tweenie._repeat = 0;
      spyOn(tweenie, 'play');
      tweenie.onTweenerFinish();

      expect(tweenie.play).not.toHaveBeenCalled();
    });

    it('should not call `play` if not `_repeat`', function() {
      var tweenie = new Tweenie();

      var repeat = 0;
      tweenie._repeat = undefined;
      spyOn(tweenie, 'play');
      tweenie.onTweenerFinish();

      expect(tweenie.play).not.toHaveBeenCalled();
    });

    it('should call the `reset` function', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie, 'reset');
      tweenie.onTweenerFinish();

      expect(tweenie.reset).toHaveBeenCalled();
    });
  });

  describe('`setStartTime` function ->', function () {
    it('should set `_start` time', function () {
      var tweenie = new Tweenie();
      var startTime = 500;

      tweenie.setStartTime(startTime);
      expect(tweenie._start).toBe(startTime);
      expect(tweenie._spot).toBe(tweenie._start - tweenie._props.delay);
      expect(tweenie._playTime).toBe(tweenie._spot);
    });

    it('should set `_start` time regarding `_elapsed`', function () {
      var delay = 50;
      var tweenie = new Tweenie({
        delay: delay
      });
      var startTime = 500;
      tweenie._elapsed = 200;

      tweenie.setStartTime(startTime);
      expect(tweenie._spot).toBe(startTime - tweenie._elapsed);
      expect(tweenie._start).toBe(tweenie._spot + delay);
    });

    it('should set `_start` time #delay', function () {
      var delay = 200;
      var duration = 500;
      var tweenie = new Tweenie({
        delay: delay,
        duration: duration
      });
      var startTime = 200;

      tweenie.setStartTime(startTime);
      expect(tweenie._start).toBe(startTime + delay);
    });

    it('should set `_time` regarding `repeat`', function () {
      var delay = 200;
      var duration = 500;
      var repeat = 3;
      var tweenie = new Tweenie({
        delay: delay,
        duration: duration,
        repeat: repeat
      });
      var startTime = 200;

      tweenie.setStartTime(startTime);
    });

    it('should set `_start` time to `performance.now` if not set', function () {
      var tweenie = new Tweenie();
      tweenie.setStartTime();
      var newTime = performance.now();
      expect(Math.abs(newTime - tweenie._start)).not.toBeGreaterThan(5);
    });

    it('should set `_start` time to `performance.now` if not set #delay', function () {
      var delay = 150;
      var tweenie = new Tweenie({ delay: delay });
      tweenie.setStartTime();
      var newTime = performance.now();
      expect(Math.abs(tweenie._start - (newTime + delay))).not.toBeGreaterThan(5);
    });

    it('should set `_end` to the `_start` + `duration`', function () {
      var duration = 2000;
      var options = {
        duration: duration,
        onUpdate: function() {},
        repeat: 5
      };

      var tweenie = new Tweenie(options);
      tweenie.setStartTime();

      expect(tweenie._end).toBe(tweenie._start + duration);
    });

    it('should recalculate `_elapsed` if >= `_end`', function () {
      var duration = 500;
      var tweenie = new Tweenie({
        duration: duration
      });
      tweenie.setStartTime();

      var start = tweenie._start;
      tweenie.update(start);
      tweenie.update(start + duration/2);
      tweenie.update(start + duration);

      tweenie.setStartTime();

      expect(tweenie._elapsed).toBe(0);
    });

    it('should recalculate `_elapsed` if > `_end`', function () {
      var duration = 500;
      var tweenie = new Tweenie({
        duration: duration
      });
      tweenie.setStartTime();

      var start = tweenie._start;
      tweenie.update(start);
      tweenie.update(start + duration/2);
      tweenie.update(start + duration + 20);

      tweenie.setStartTime();

      expect(tweenie._elapsed).toBe(0);
    });
  });

  describe('`reverse` function ->', function() {
    it('should flip `isReverse` in `_props`', function() {
      var tweenie = new Tweenie();
      tweenie.reverse();
      expect(tweenie._props.isReverse).toBe(true);
      tweenie.reverse();
      expect(tweenie._props.isReverse).toBe(false);
    });

    it('should call the `_reverseCallbacks` function', function() {
      var tweenie = new Tweenie();

      spyOn(tweenie, '_reverseCallbacks');
      tweenie.reverse();
      expect(tweenie._reverseCallbacks).toHaveBeenCalled();
    });

    it('should flip the `_elapsed` time', function() {
      var delay = 200;
      var duration = 800;
      var tweenie = new Tweenie({
        delay: delay,
        duration: duration
      });

      tweenie.setStartTime();
      var start = tweenie._start;
      tweenie.update(start - delay);
      tweenie.update(start);
      tweenie.update(start + duration / 2);

      var elapsed = tweenie._elapsed;

      tweenie.reverse();
      expect(tweenie._elapsed).toBeCloseTo((tweenie._end - tweenie._spot) - (elapsed - delay), 5);
    });

    it('should not flip the `_elapsed` time if `0`', function() {
      var delay = 200;
      var duration = 800;
      var tweenie = new Tweenie({
        delay: delay,
        duration: duration
      });

      var elapsed = tweenie._elapsed;

      tweenie.reverse();
      expect(tweenie._elapsed).toBe(0);
    });

    it('should call `setStartTime`', function() {
      var tweenie = new Tweenie();
      spyOn(tweenie, 'setStartTime');
      tweenie.reverse();
      expect(tweenie.setStartTime).toHaveBeenCalled();
    });

    it('should return this', function() {
      var tweenie = new Tweenie();
      var result = tweenie.reverse();
      expect(result).toBe(tweenie);
    });
  });

  describe('`setProgress` function', function () {
    it('should call `setStartTime` is `_start` is not set', function () {
      var tweenie = new Tweenie();
      spyOn(tweenie, 'setStartTime');
      tweenie.setProgress(.5);
      expect(tweenie.setStartTime).toHaveBeenCalled();
    });

    it('should call `update` with the progress time', function () {
      var progress = .25;
      var tweenie = new Tweenie();
      spyOn(tweenie, 'update');
      tweenie.setProgress(progress);
      expect(tweenie.update).toHaveBeenCalledWith(tweenie._spot + progress*(tweenie._end - tweenie._spot));
    });

    it('should set `_prevTime` if not defined', function () {
      var tweenie = new Tweenie();
      // override `update` so `_prevTime` won't be set
      tweenie.update = function() {}
      tweenie.setProgress(.5);
      expect(tweenie._prevTime).toBe(tweenie._start);
    });

    it('should set not `_prevTime` if defined', function () {
      var tweenie = new Tweenie();
      // override `update` so `_prevTime` won't be set
      tweenie.update = function() {}
      var prevTime = 500;
      tweenie._prevTime = prevTime;
      tweenie.setProgress(.5);
      expect(tweenie._prevTime).toBe(prevTime);
    });

    it('should return `this`', function () {
      var progress = .25;
      var tweenie = new Tweenie();
      var result = tweenie.setProgress(progress);
      expect(result).toBe(tweenie);
    });
  });

  describe('`stop` function', function () {
    it('should call `setProgress`', function () {
      var progress = .25;
      var tweenie = new Tweenie();
      tweenie.play();
      spyOn(tweenie, 'setProgress');
      tweenie.stop(progress);
      expect(tweenie.setProgress).toHaveBeenCalledWith(progress);
    });

    it('should call `setProgress` if `progress` is not passed', function () {
      var tweenie = new Tweenie();
      tweenie.play();
      spyOn(tweenie, 'setProgress');
      tweenie.stop();
      expect(tweenie.setProgress).toHaveBeenCalledWith(0);
    });

    it('should call `setProgress` if `progress` is not passed #reverse', function () {
      var tweenie = new Tweenie({
        isReverse: true
      });
      tweenie.play();
      spyOn(tweenie, 'setProgress');
      tweenie.stop();
      expect(tweenie.setProgress).toHaveBeenCalledWith(1);
    });

    it('should not run if already stopped', function () {
      var tweenie = new Tweenie();
      tweenie.play().stop();
      spyOn(tweenie, 'setProgress');
      spyOn(tweenie, 'reset');
      tweenie.stop();
      expect(tweenie.reset).not.toHaveBeenCalled();
      expect(tweenie.setProgress).not.toHaveBeenCalled();
    });

    it('should call `_setState`', function () {
      var tweenie = new Tweenie();
      tweenie.play();
      spyOn(tweenie, '_setState');
      tweenie.stop();
      expect(tweenie._setState).toHaveBeenCalledWith('stop');
    });

    it('should call `reset`', function () {
      var tweenie = new Tweenie();
      tweenie.play();
      spyOn(tweenie, 'reset');
      tweenie.stop();
      expect(tweenie.reset).toHaveBeenCalled();
    });

    it('should call the `tweener.remove` function', function() {
      var tweenie = new Tweenie();
      tweenie.play();
      spyOn(tweener, 'remove');
      tweenie.stop();

      expect(tweener.remove).toHaveBeenCalledWith(tweenie);
    });

    it('should return `this`', function () {
      var tweenie = new Tweenie();
      var result = tweenie.stop();
      expect(result).toBe(tweenie);
    });
  });

  describe('`_reverseCallbacks` function ->', function() {
    it('should reverse the `_cb` in pairs', function() {
      var tweenie = new Tweenie();
      var cbs = [ Math.random(), Math.random(), Math.random(), Math.random() ];
      tweenie._cbs = cbs;

      tweenie._reverseCallbacks();

      expect(tweenie._cbs[0]).toBe(cbs[1]);
      expect(tweenie._cbs[1]).toBe(cbs[0]);

      expect(tweenie._cbs[2]).toBe(cbs[3]);
      expect(tweenie._cbs[3]).toBe(cbs[2]);

      tweenie._reverseCallbacks();

      expect(tweenie._cbs[0]).toBe(cbs[0]);
      expect(tweenie._cbs[1]).toBe(cbs[1]);

      expect(tweenie._cbs[2]).toBe(cbs[2]);
      expect(tweenie._cbs[3]).toBe(cbs[3]);

    });
  });

  describe('`_extendDefaults` function ->', function() {
    it('should call the super', function() {
      spyOn(ClassProto, '_extendDefaults').and.callThrough();
      var tweenie = new Tweenie();

      expect(ClassProto._extendDefaults).toHaveBeenCalled();
    });

    it('should parse `easing`', function() {
      var tweenie = new Tweenie({
        easing: 'sin.in'
      });

      expect(tweenie._props.easing).toBe(mojs.easing.sin.in);
    });

    it('should parse `backwardEasing`', function() {
      var tweenie = new Tweenie({
        backwardEasing: 'sin.in'
      });

      expect(tweenie._props.backwardEasing).toBe(mojs.easing.sin.in);
    });

    it('`backwardEasing` should  fallback to `easing`', function() {
      var tweenie = new Tweenie({
        easing: 'sin.in'
      });

      expect(tweenie._props.backwardEasing).toBe(mojs.easing.sin.in);
    });
  });
});

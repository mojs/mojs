var Tweenie = mojs.Tweenie;

var helpers = mojs.__helpers__;
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
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

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
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

      var endTime = startTime + duration;
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
        duration: duration,
        onUpdate: function(p) {
          progress = p;
        }
      };
      var tweenie = Tweenie(options);

      var startTime = 200;
      tweenie.setStartTime(startTime);

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

    it('should pass current `progress` to `onUpdate` #reverse #backward', function () {
      var progress = -1;
      var duration = 50;

      var options = {
        isReverse: true,
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

      expect(tweenie._cbs[1]).toHaveBeenCalled();
    });

    it('should be called on exact end', function() {
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
      tweenie.update(startTime + duration);

      expect(tweenie._cbs[1]).toHaveBeenCalled();
    });

    it('should be called on if complete and returned', function() {
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
      tweenie.update(startTime + duration + 10);
      spyOn(tweenie._cbs, 1);
      tweenie.update(startTime + duration - 10);

      expect(tweenie._cbs[1]).toHaveBeenCalled();
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
      spyOn(tweenie._cbs, 1);
      tweenie.update(startTime + duration - 10);

      expect(tweenie._cbs[1]).toHaveBeenCalled();
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

      expect(tweenie._cbs[0]).toHaveBeenCalled();
    });

    it('should be called on exact start', function() {
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
      tweenie.update(startTime);

      expect(tweenie._cbs[0]).toHaveBeenCalled();
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
      tweenie.update(startTime);
      spyOn(tweenie._cbs, 0);
      tweenie.update(startTime + 10);

      expect(tweenie._cbs[0]).toHaveBeenCalled();
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
      spyOn(tweenie._cbs, 0);
      tweenie.update(startTime + 10);

      expect(tweenie._cbs[0]).toHaveBeenCalled();
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

      expect(tweenie._chCbs[1]).toHaveBeenCalled();
    });

    it('should be called on end #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
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

      expect(tweenie._chCbs[1]).toHaveBeenCalled();
    });

    it('should be called on exact end', function() {
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
      tweenie.update(startTime + duration);

      expect(tweenie._chCbs[1]).toHaveBeenCalled();
    });

    it('should be called on exact end #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
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

      expect(tweenie._chCbs[1]).toHaveBeenCalled();
    });

    it('should be called on if complete and returned', function() {
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
      tweenie.update(startTime + duration + 10);
      spyOn(tweenie._chCbs, 1);
      tweenie.update(startTime + duration - 10);

      expect(tweenie._chCbs[1]).toHaveBeenCalled();
    });

    it('should be called on if complete and returned', function() {
      var progress = -1;
      var duration = 50;

      var options = {
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

      expect(tweenie._chCbs[1]).toHaveBeenCalled();
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

      expect(tweenie._chCbs[1]).toHaveBeenCalled();
    });

    it('should be called on if complete and returned #2 #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
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

      expect(tweenie._chCbs[1]).toHaveBeenCalled();
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

      expect(tweenie._chCbs[0]).toHaveBeenCalled();
    });

    it('should be called on start #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
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

      expect(tweenie._chCbs[0]).toHaveBeenCalled();
    });

    it('should be called on exact start', function() {
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
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime);

      expect(tweenie._chCbs[0]).toHaveBeenCalled();
    });

    it('should be called on exact start #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
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

      expect(tweenie._chCbs[0]).toHaveBeenCalled();
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
      tweenie.update(startTime);
      spyOn(tweenie._chCbs, 0);
      tweenie.update(startTime + 10);

      expect(tweenie._chCbs[0]).toHaveBeenCalled();
    });

    it('should be called on if went before start and returned #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
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

      expect(tweenie._chCbs[0]).toHaveBeenCalled();
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

      expect(tweenie._chCbs[0]).toHaveBeenCalled();
    });

    it('should be called on if went before start and returned #reverse', function() {
      var progress = -1;
      var duration = 50;

      var options = {
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

      expect(tweenie._chCbs[0]).toHaveBeenCalled();
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
});

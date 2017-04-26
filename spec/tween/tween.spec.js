var Tweenie = mojs.Tweenie;
var Tween = mojs.Tween;

var helpers = mojs.__helpers__;
var ClassProto = helpers.ClassProto;
var tweenieDefaults = helpers.tweenieDefaults;
var tweenDefaults = helpers.tweenDefaults;

var eps = 0.0000001;

describe('tween ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var tween = new Tween();
      expect(ClassProto.isPrototypeOf(tween)).toBe(true);
    });

    it('should declare `defaults`', function () {
      var tween = new Tween();
      expect(tween._defaults).toBe(tweenDefaults);
    });
  });

  describe('`repeat` option ->', function () {
    it('should create `n+1` tweenies', function () {
      var tween = new Tween();
      expect(tween._tweenies.length).toBe(1);
      expect(Object.getPrototypeOf(tween._tweenies[0])).toBe(Object.getPrototypeOf(new Tweenie()));
    });

    it('should create `n+1` tweenies #2', function () {
      var n = 1;
      var tween = new Tween({ repeat: n });
      expect(tween._tweenies.length).toBe(n + 1);
      for (var i = 0; i <= n; i++) {
        expect(Object.getPrototypeOf(tween._tweenies[i])).toBe(Object.getPrototypeOf(new Tweenie()));
      }
    });

    it('should create `n+1` tweenies #3', function () {
      var n = 5;
      var tween = new Tween({ repeat: n });
      expect(tween._tweenies.length).toBe(n + 1);
      for (var i = 0; i <= n; i++) {
        expect(Object.getPrototypeOf(tween._tweenies[i])).toBe(Object.getPrototypeOf(new Tweenie()));
      }
    });

    it('should pass `index` to tweenies', function () {
      var n = 5;
      var tween = new Tween({ repeat: n });
      expect(tween._tweenies.length).toBe(n + 1);
      for (var i = 0; i <= n; i++) {
        expect(tween._tweenies[i]._props.index).toBe(i);
      }
    });

    it('should set `_currentTween` to `0`', function () {
      var n = 5;
      var tween = new Tween({ repeat: n });
      expect(tween._active).toBe(0);
    });
  });

  describe('`onUpdate` callback ->', function () {
    it('should pass the `onUpdate` callback ', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };
      var tween = new Tween(options);
      for (var i = 0; i <= options.repeat; i++) {
        expect(tween._tweenies[i]._o.onUpdate).toBe(options.onUpdate);
      }
    });
  });

  describe('`setStartTime` function ->', function () {
    it('should set `_start` time', function () {
      var tween = new Tween();
      var startTime = 500;

      tween.setStartTime(startTime);
      expect(tween._start).toBe(startTime);
    });

    it('should set `_start` time #delay', function () {

      var delay = 200;
      var tween = new Tween({ delay: delay });
      var startTime = 200;

      tween.setStartTime(startTime);
      expect(tween._start).toBe(startTime + delay);
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

    it('should set `_start` time on each `Tweenie`', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      spyOn(tween._tweenies[0], 'setStartTime');
      spyOn(tween._tweenies[1], 'setStartTime');
      spyOn(tween._tweenies[2], 'setStartTime');
      spyOn(tween._tweenies[3], 'setStartTime');
      spyOn(tween._tweenies[4], 'setStartTime');
      spyOn(tween._tweenies[5], 'setStartTime');

      tween.setStartTime();

      expect(tween._tweenies[0].setStartTime).toHaveBeenCalledWith(tween._start);
      expect(tween._tweenies[1].setStartTime).toHaveBeenCalledWith(tween._tweenies[0]._end);
      expect(tween._tweenies[2].setStartTime).toHaveBeenCalledWith(tween._tweenies[1]._end);
      expect(tween._tweenies[3].setStartTime).toHaveBeenCalledWith(tween._tweenies[2]._end);
      expect(tween._tweenies[4].setStartTime).toHaveBeenCalledWith(tween._tweenies[3]._end);
      expect(tween._tweenies[5].setStartTime).toHaveBeenCalledWith(tween._tweenies[4]._end);
    });

    it('should set `_end` to the `_end` of the last `Tweenie`', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      expect(tween._end).toBe(tween._tweenies[tween._tweenies.length-1]._end);
    });
  });

  describe('`update` function ->', function () {
    it('should update only current tween', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween._tweenies[0], 'update');
      spyOn(tween._tweenies[1], 'update');
      spyOn(tween._tweenies[2], 'update');
      spyOn(tween._tweenies[3], 'update');
      spyOn(tween._tweenies[4], 'update');
      spyOn(tween._tweenies[5], 'update');

      var updateTime = tween._start + 10;

      tween.update(updateTime);
      expect(tween._tweenies[0].update).toHaveBeenCalledWith(updateTime);
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();
    });

    it('should save `_prevTime`', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      var updateTime = tween._start + 10;
      tween.update(updateTime);

      expect(tween._prevTime).toBe(updateTime);
    });
  });

  describe('`onChimeOut` callback ->', function () {
    it('should be set to `_chimeOut`', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween, '_chimeOut');

      tween._tweenies[0]._props.onChimeOut();
      expect(tween._chimeOut.calls.count()).toBe(1);

      tween._tweenies[1]._props.onChimeOut();
      expect(tween._chimeOut.calls.count()).toBe(2);

      tween._tweenies[2]._props.onChimeOut();
      expect(tween._chimeOut.calls.count()).toBe(3);

      tween._tweenies[3]._props.onChimeOut();
      expect(tween._chimeOut.calls.count()).toBe(4);

      tween._tweenies[4]._props.onChimeOut();
      expect(tween._chimeOut.calls.count()).toBe(5);

      tween._tweenies[5]._props.onChimeOut();
      expect(tween._chimeOut.calls.count()).toBe(6);
    });
  });

  describe('`_chimeOut` function ->', function () {
    it('should increase `_active`', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      tween._tweenies[0]._props.onChimeOut(true);
      expect(tween._active).toBe(1);

      tween._tweenies[1]._props.onChimeOut(true);
      expect(tween._active).toBe(2);

      tween._tweenies[2]._props.onChimeOut(true);
      expect(tween._active).toBe(3);

      tween._tweenies[3]._props.onChimeOut(true);
      expect(tween._active).toBe(4);

      tween._tweenies[4]._props.onChimeOut(true);
      expect(tween._active).toBe(5);

      tween._tweenies[5]._props.onChimeOut(true);
      expect(tween._active).toBe(5);
    });

    it('should not increase `_active` if backward', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      tween._tweenies[0]._props.onChimeOut(false);
      expect(tween._active).toBe(0);

      tween._tweenies[1]._props.onChimeOut(false);
      expect(tween._active).toBe(0);

      tween._tweenies[2]._props.onChimeOut(false);
      expect(tween._active).toBe(0);

      tween._tweenies[3]._props.onChimeOut(false);
      expect(tween._active).toBe(0);

      tween._tweenies[4]._props.onChimeOut(false);
      expect(tween._active).toBe(0);

      tween._tweenies[5]._props.onChimeOut(false);
      expect(tween._active).toBe(0);
    });

    it('should update the newly `_active` tweenie', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween._tweenies[0], 'update');
      spyOn(tween._tweenies[1], 'update');
      spyOn(tween._tweenies[2], 'update');
      spyOn(tween._tweenies[3], 'update');
      spyOn(tween._tweenies[4], 'update');
      spyOn(tween._tweenies[5], 'update');

      var time = 200;
      tween._tweenies[0]._props.onChimeOut(true, time);
      expect(tween._active).toBe(1);

      expect(tween._tweenies[0].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[1].update).toHaveBeenCalledWith(time);
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();

      tween._tweenies[1]._props.onChimeOut(true, time += 10);
      expect(tween._active).toBe(2);
      expect(tween._act).toBe(tween._tweenies[2]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[1].update.calls.count()).toBe(1);
      expect(tween._tweenies[2].update).toHaveBeenCalledWith(time);
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();

      tween._tweenies[2]._props.onChimeOut(true, time += 10);
      expect(tween._active).toBe(3);
      expect(tween._act).toBe(tween._tweenies[3]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[1].update.calls.count()).toBe(1);
      expect(tween._tweenies[2].update.calls.count()).toBe(1);
      expect(tween._tweenies[3].update).toHaveBeenCalledWith(time);
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();

      tween._tweenies[3]._props.onChimeOut(true, time += 10);
      expect(tween._active).toBe(4);
      expect(tween._act).toBe(tween._tweenies[4]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[1].update.calls.count()).toBe(1);
      expect(tween._tweenies[2].update.calls.count()).toBe(1);
      expect(tween._tweenies[3].update.calls.count()).toBe(1);
      expect(tween._tweenies[4].update).toHaveBeenCalledWith(time);
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();

      tween._tweenies[4]._props.onChimeOut(true, time += 10);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[1].update.calls.count()).toBe(1);
      expect(tween._tweenies[2].update.calls.count()).toBe(1);
      expect(tween._tweenies[3].update.calls.count()).toBe(1);
      expect(tween._tweenies[4].update.calls.count()).toBe(1);
      expect(tween._tweenies[5].update).toHaveBeenCalledWith(time);

      tween._tweenies[5]._props.onChimeOut(true, time += 10);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[1].update.calls.count()).toBe(1);
      expect(tween._tweenies[2].update.calls.count()).toBe(1);
      expect(tween._tweenies[3].update.calls.count()).toBe(1);
      expect(tween._tweenies[4].update.calls.count()).toBe(1);
      expect(tween._tweenies[5].update.calls.count()).toBe(1);
    });

    it('should not update the newly `_active` tweenie if backward', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween._tweenies[0], 'update');
      spyOn(tween._tweenies[1], 'update');
      spyOn(tween._tweenies[2], 'update');
      spyOn(tween._tweenies[3], 'update');
      spyOn(tween._tweenies[4], 'update');
      spyOn(tween._tweenies[5], 'update');

      var time = 200;
      tween._tweenies[0]._props.onChimeOut(false, time);
      expect(tween._active).toBe(0);

      expect(tween._tweenies[0].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();

      tween._tweenies[1]._props.onChimeOut(false, time += 10);
      expect(tween._active).toBe(0);
      expect(tween._act).toBe(tween._tweenies[0]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();

      tween._tweenies[2]._props.onChimeOut(false, time += 10);
      expect(tween._active).toBe(0);
      expect(tween._act).toBe(tween._tweenies[0]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();

      tween._tweenies[3]._props.onChimeOut(false, time += 10);
      expect(tween._active).toBe(0);
      expect(tween._act).toBe(tween._tweenies[0]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();

      tween._tweenies[4]._props.onChimeOut(false, time += 10);
      expect(tween._active).toBe(0);
      expect(tween._act).toBe(tween._tweenies[0]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();

      tween._tweenies[5]._props.onChimeOut(false, time += 10);
      expect(tween._active).toBe(0);
      expect(tween._act).toBe(tween._tweenies[0]);

      expect(tween._tweenies[0].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[5].update).not.toHaveBeenCalled();
    });
  });

  describe('`_chimeIn` function ->', function () {
    it('should decrease `_active`', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      tween._active = 5;
      tween._act = tween._tweenies[tween._active];

      tween._tweenies[5]._props.onChimeIn(false);
      expect(tween._active).toBe(4);
      expect(tween._act).toBe(tween._tweenies[4]);

      tween._tweenies[4]._props.onChimeIn(false);
      expect(tween._active).toBe(3);
      expect(tween._act).toBe(tween._tweenies[3]);

      tween._tweenies[3]._props.onChimeIn(false);
      expect(tween._active).toBe(2);
      expect(tween._act).toBe(tween._tweenies[2]);

      tween._tweenies[2]._props.onChimeIn(false);
      expect(tween._active).toBe(1);
      expect(tween._act).toBe(tween._tweenies[1]);

      tween._tweenies[1]._props.onChimeIn(false);
      expect(tween._active).toBe(0);
      expect(tween._act).toBe(tween._tweenies[0]);

      tween._tweenies[0]._props.onChimeIn(false);
      expect(tween._active).toBe(0);
      expect(tween._act).toBe(tween._tweenies[0]);
    });

    it('should not decrease `_active` if forward', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      tween._active = 5;
      tween._act = tween._tweenies[tween._active];

      tween._tweenies[5]._props.onChimeIn(true);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      tween._tweenies[4]._props.onChimeIn(true);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      tween._tweenies[3]._props.onChimeIn(true);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      tween._tweenies[2]._props.onChimeIn(true);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      tween._tweenies[1]._props.onChimeIn(true);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      tween._tweenies[0]._props.onChimeIn(true);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);
    });

    it('should update the newly `_active` tweenie', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween._tweenies[0], 'update');
      spyOn(tween._tweenies[1], 'update');
      spyOn(tween._tweenies[2], 'update');
      spyOn(tween._tweenies[3], 'update');
      spyOn(tween._tweenies[4], 'update');
      spyOn(tween._tweenies[5], 'update');

      tween._active = 5;

      var time = 200;
      tween._tweenies[5]._props.onChimeIn(false, time);
      expect(tween._active).toBe(4);

      expect(tween._tweenies[5].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[4].update).toHaveBeenCalledWith(time);
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();

      tween._tweenies[4]._props.onChimeIn(false, time -= 10);
      expect(tween._active).toBe(3);
      expect(tween._act).toBe(tween._tweenies[3]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[4].update.calls.count()).toBe(1);
      expect(tween._tweenies[3].update).toHaveBeenCalledWith(time);
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();

      tween._tweenies[3]._props.onChimeIn(false, time -= 10);
      expect(tween._active).toBe(2);
      expect(tween._act).toBe(tween._tweenies[2]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[4].update.calls.count()).toBe(1);
      expect(tween._tweenies[3].update.calls.count()).toBe(1);
      expect(tween._tweenies[2].update).toHaveBeenCalledWith(time);
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();

      tween._tweenies[2]._props.onChimeIn(false, time -= 10);
      expect(tween._active).toBe(1);
      expect(tween._act).toBe(tween._tweenies[1]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[4].update.calls.count()).toBe(1);
      expect(tween._tweenies[3].update.calls.count()).toBe(1);
      expect(tween._tweenies[2].update.calls.count()).toBe(1);
      expect(tween._tweenies[1].update).toHaveBeenCalledWith(time);
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();

      tween._tweenies[1]._props.onChimeIn(false, time -= 10);
      expect(tween._active).toBe(0);
      expect(tween._act).toBe(tween._tweenies[0]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[4].update.calls.count()).toBe(1);
      expect(tween._tweenies[3].update.calls.count()).toBe(1);
      expect(tween._tweenies[2].update.calls.count()).toBe(1);
      expect(tween._tweenies[1].update.calls.count()).toBe(1);
      expect(tween._tweenies[0].update).toHaveBeenCalledWith(time);

      tween._tweenies[0]._props.onChimeIn(false, time -= 10);
      expect(tween._active).toBe(0);
      expect(tween._act).toBe(tween._tweenies[0]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalledWith(time);
      expect(tween._tweenies[4].update.calls.count()).toBe(1);
      expect(tween._tweenies[3].update.calls.count()).toBe(1);
      expect(tween._tweenies[2].update.calls.count()).toBe(1);
      expect(tween._tweenies[1].update.calls.count()).toBe(1);
      expect(tween._tweenies[0].update.calls.count()).toBe(1);
    });

    it('should not update the newly `_active` tweenie if forward', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween._tweenies[0], 'update');
      spyOn(tween._tweenies[1], 'update');
      spyOn(tween._tweenies[2], 'update');
      spyOn(tween._tweenies[3], 'update');
      spyOn(tween._tweenies[4], 'update');
      spyOn(tween._tweenies[5], 'update');

      tween._active = 5;
      tween._act = tween._tweenies[tween._active];

      var time = 200;
      tween._tweenies[5]._props.onChimeIn(true, time);
      expect(tween._active).toBe(5);

      expect(tween._tweenies[5].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();

      tween._tweenies[4]._props.onChimeIn(true, time -= 10);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();

      tween._tweenies[3]._props.onChimeIn(true, time -= 10);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();

      tween._tweenies[2]._props.onChimeIn(true, time -= 10);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();

      tween._tweenies[1]._props.onChimeIn(true, time -= 10);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();

      tween._tweenies[0]._props.onChimeIn(true, time -= 10);
      expect(tween._active).toBe(5);
      expect(tween._act).toBe(tween._tweenies[5]);

      expect(tween._tweenies[5].update).not.toHaveBeenCalled();
      expect(tween._tweenies[4].update).not.toHaveBeenCalled();
      expect(tween._tweenies[3].update).not.toHaveBeenCalled();
      expect(tween._tweenies[2].update).not.toHaveBeenCalled();
      expect(tween._tweenies[1].update).not.toHaveBeenCalled();
      expect(tween._tweenies[0].update).not.toHaveBeenCalled();
    });
  });

  describe('`_onStart` function ->', function () {
    it('should be called by tweenies `onStart` callback', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween, '_onStart');

      tween._tweenies[0]._props.onStart();
      expect(tween._onStart.calls.count()).toBe(1);

      tween._tweenies[1]._props.onStart();
      expect(tween._onStart.calls.count()).toBe(2);

      tween._tweenies[2]._props.onStart();
      expect(tween._onStart.calls.count()).toBe(3);

      tween._tweenies[3]._props.onStart();
      expect(tween._onStart.calls.count()).toBe(4);

      tween._tweenies[4]._props.onStart();
      expect(tween._onStart.calls.count()).toBe(5);

      tween._tweenies[5]._props.onStart();
      expect(tween._onStart.calls.count()).toBe(6);
    });

    it('should be call `onRepeatStart` callback', function () {
      var options = {
        onRepeatStart: function() {},
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween._props, 'onRepeatStart');
      // TODO: add arguments to the callback pass
      tween._tweenies[0]._props.onStart();
      expect(tween._props.onRepeatStart.calls.count()).toBe(1);

      tween._tweenies[1]._props.onStart();
      expect(tween._props.onRepeatStart.calls.count()).toBe(2);

      tween._tweenies[2]._props.onStart();
      expect(tween._props.onRepeatStart.calls.count()).toBe(3);

      tween._tweenies[3]._props.onStart();
      expect(tween._props.onRepeatStart.calls.count()).toBe(4);

      tween._tweenies[4]._props.onStart();
      expect(tween._props.onRepeatStart.calls.count()).toBe(5);

      tween._tweenies[5]._props.onStart();
      expect(tween._props.onRepeatStart.calls.count()).toBe(6);
    });
  });

  describe('`_onComplete` function ->', function () {
    it('should be called by tweenies `onStart` callback', function () {
      var options = {
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween, '_onComplete');

      tween._tweenies[0]._props.onComplete();
      expect(tween._onComplete.calls.count()).toBe(1);

      tween._tweenies[1]._props.onComplete();
      expect(tween._onComplete.calls.count()).toBe(2);

      tween._tweenies[2]._props.onComplete();
      expect(tween._onComplete.calls.count()).toBe(3);

      tween._tweenies[3]._props.onComplete();
      expect(tween._onComplete.calls.count()).toBe(4);

      tween._tweenies[4]._props.onComplete();
      expect(tween._onComplete.calls.count()).toBe(5);

      tween._tweenies[5]._props.onComplete();
      expect(tween._onComplete.calls.count()).toBe(6);
    });

    it('should be call `onRepeatStart` callback', function () {
      var options = {
        onRepeatComplete: function() {},
        onUpdate: function() {},
        repeat: 5
      };

      var tween = new Tween(options);
      tween.setStartTime();

      spyOn(tween._props, 'onRepeatComplete');
      // TODO: add arguments to the callback pass
      tween._tweenies[0]._props.onComplete();
      expect(tween._props.onRepeatComplete.calls.count()).toBe(1);

      tween._tweenies[1]._props.onComplete();
      expect(tween._props.onRepeatComplete.calls.count()).toBe(2);

      tween._tweenies[2]._props.onComplete();
      expect(tween._props.onRepeatComplete.calls.count()).toBe(3);

      tween._tweenies[3]._props.onComplete();
      expect(tween._props.onRepeatComplete.calls.count()).toBe(4);

      tween._tweenies[4]._props.onComplete();
      expect(tween._props.onRepeatComplete.calls.count()).toBe(5);

      tween._tweenies[5]._props.onComplete();
      expect(tween._props.onRepeatComplete.calls.count()).toBe(6);
    });
  });

});

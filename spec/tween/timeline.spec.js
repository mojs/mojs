var Timeline = mojs.Timeline;
var Tweenie = mojs.Tweenie;

var helpers = mojs.__helpers__;
var tweener = helpers.tweener;
var ClassProto = helpers.ClassProto;

var Super = Tweenie.__mojsClass;

describe('timeline ->', function () {
  describe('extension ->', function() {
    it('should extend `Tweenie`', function () {
      var timeline = Timeline();
      expect(Tweenie.__mojsClass.isPrototypeOf(timeline)).toBe(true);
    });
  });

  describe('`_declareDefaults` function ->', function() {
    it('should reset `easing` on `defaults`', function () {
      var timeline = Timeline();
      // // not needed until we will decide if timeline
      // // should have the ablility to recieve duration
      // expect(timeline._defaults.duration).toBe(0);
      expect(timeline._defaults.easing).toBe('linear.none');
    });

    it('should call `super`', function () {
      var timeline = Timeline();
      // just check some tween defaults
      expect(timeline._defaults.delay).toBe(0);
      expect(timeline._defaults.isReverse).toBe(false);
    });
  });

  describe('`_vars` function ->', function() {
    it('should set `_items`', function () {
      var timeline = Timeline();
      expect(timeline._items).toEqual([]);
    });

    it('should call `super`', function () {
      spyOn(Super, '_vars');
      var timeline = Timeline();
      expect(Super._vars).toHaveBeenCalled();
    });

    it('should reset `duration`', function () {
      var timeline = Timeline({ duration: 2500 });
      expect(timeline._props.duration).toBe(0);
    });
  });

  describe('`stop` function ->', function() {
    it('should call `super`', function () {
      spyOn(Super, 'stop');
      var progress = Math.random();

      var timeline = Timeline();
      timeline.stop(progress);
      expect(Super.stop).toHaveBeenCalledWith(progress);
    });

    it('should call `stop` on all items', function () {
      var timeline = Timeline();

      timeline._items = [
        { stop: function() {} },
        { stop: function() {} },
        { stop: function() {} }
      ];

      spyOn(timeline._items[0], 'stop');
      spyOn(timeline._items[1], 'stop');
      spyOn(timeline._items[2], 'stop');

      var progress = Math.random();
      timeline.stop(progress);

      expect(timeline._items[0].stop).toHaveBeenCalledWith(progress);
      expect(timeline._items[1].stop).toHaveBeenCalledWith(progress);
      expect(timeline._items[2].stop).toHaveBeenCalledWith(progress);
    });

    it('should return `this`', function () {
      var timeline = Timeline();

      expect(timeline.stop()).toBe(timeline);
    });
  });

  describe('`reset` function ->', function() {
    it('should call `super`', function () {
      spyOn(Super, 'reset');

      var timeline = Timeline();
      timeline.reset();
      expect(Super.reset).toHaveBeenCalled();
    });

    it('should call `reset` on all items', function () {
      var timeline = Timeline();

      timeline._items = [
        { reset: function() {} },
        { reset: function() {} },
        { reset: function() {} }
      ];

      spyOn(timeline._items[0], 'reset');
      spyOn(timeline._items[1], 'reset');
      spyOn(timeline._items[2], 'reset');

      timeline.reset();

      expect(timeline._items[0].reset).toHaveBeenCalled();
      expect(timeline._items[1].reset).toHaveBeenCalled();
      expect(timeline._items[2].reset).toHaveBeenCalled();
    });

    it('should return `this`', function () {
      var timeline = Timeline();

      expect(timeline.reset()).toBe(timeline);
    });
  });

  describe('`setStartTime` function ->', function() {
    it('should call `super`', function () {
      spyOn(Super, 'setStartTime');

      var timeline = Timeline();
      timeline.setStartTime();
      expect(Super.setStartTime).toHaveBeenCalled();
    });

    it('should call `setStartTime` on all items', function () {
      var timeline = Timeline();

      timeline._items = [
        { setStartTime: function() {} },
        { setStartTime: function() {} },
        { setStartTime: function() {} }
      ];

      spyOn(timeline._items[0], 'setStartTime');
      spyOn(timeline._items[1], 'setStartTime');
      spyOn(timeline._items[2], 'setStartTime');

      var time = Math.random()*100;
      timeline.setStartTime(time);

      expect(timeline._items[0].setStartTime).toHaveBeenCalledWith(time);
      expect(timeline._items[1].setStartTime).toHaveBeenCalledWith(time);
      expect(timeline._items[2].setStartTime).toHaveBeenCalledWith(time);
    });

    it('should call `setStartTime` on all items #2', function () {
      var timeline = Timeline();

      timeline._items = [
        { setStartTime: function() {} },
        { setStartTime: function() {} },
        { setStartTime: function() {} }
      ];

      spyOn(timeline._items[0], 'setStartTime');
      spyOn(timeline._items[1], 'setStartTime');
      spyOn(timeline._items[2], 'setStartTime');

      timeline.setStartTime();

      expect(timeline._items[0].setStartTime).toHaveBeenCalledWith(timeline._start);
      expect(timeline._items[1].setStartTime).toHaveBeenCalledWith(timeline._start);
      expect(timeline._items[2].setStartTime).toHaveBeenCalledWith(timeline._start);
    });

    it('should return `this`', function () {
      var timeline = Timeline();

      expect(timeline.setStartTime()).toBe(timeline);
    });
  });

  describe('`_update` function ->', function() {
    it('should be passed to Tweenie `onUpdate`', function () {
      var options = {
        onUpdate: function() {}
      }

      var timeline = Timeline(options);

      expect(typeof timeline._props.onUpdate).toBe('function');
      expect(timeline._props.onUpdate).not.toBe(options.onUpdate);
      expect(timeline._onUpdate).toBe(options.onUpdate);
    });

    it('should update all child `_items`', function () {
      var timeline = Timeline();

      timeline._items = [
        { update: function() {} },
        { update: function() {} },
        { update: function() {} }
      ];

      spyOn(timeline._items[0], 'update');
      spyOn(timeline._items[1], 'update');
      spyOn(timeline._items[2], 'update');

      // since the `_update` is reassined, the context is not guaranteed
      var update = timeline._props.onUpdate;
      var options = [Math.random(), Math.random(), Math.random(), Math.random()];
      update(options[0], options[1], options[2], options[3]);

      expect(timeline._items[0].update).toHaveBeenCalledWith(options[0], options[1], options[2], options[3]);
      expect(timeline._items[1].update).toHaveBeenCalledWith(options[0], options[1], options[2], options[3]);
      expect(timeline._items[2].update).toHaveBeenCalledWith(options[0], options[1], options[2], options[3]);
    });

    it('should call overwritten `onUpdate`', function () {
      var args = null;
      var options = {
        onUpdate: function() {
          args = Array.prototype.slice.call(arguments);
        }
      }

      var timeline = Timeline(options);

      // since the `_update` is reassined, the context is not guaranteed
      var update = timeline._props.onUpdate;
      var options = [1, 2, 3, 4];
      update(options[0], options[1], options[2], options[3]);

      expect(args).toEqual(options);
    });
  });

  describe('`add` function ->', function() {
    it('should add `tweenie` to the `_items`', function () {
      var timeline = Timeline();
      var tweenie1 = new Tweenie();
      var tweenie2 = new Tweenie();
      var tweenie3 = new Tweenie();

      timeline.add(tweenie1);
      timeline.add(tweenie2);
      timeline.add(tweenie3);

      expect(timeline._items.length).toBe(3);
      expect(timeline._items[0]).toBe(tweenie1);
      expect(timeline._items[1]).toBe(tweenie2);
      expect(timeline._items[2]).toBe(tweenie3);
    });

    it('should increase `duration`', function () {
      var timeline = Timeline();

      var tweenie1 = new Tweenie({ duration: 200 });
      var tweenie2 = new Tweenie({ duration: 500 });
      var tweenie3 = new Tweenie({ duration: 600 });

      timeline.add(tweenie1);
      timeline.add(tweenie2);
      timeline.add(tweenie3);

      expect(timeline._props.duration).toBe(tweenie3._props.duration);
    });

    it('should increase `duration` #2', function () {
      var timeline = Timeline();

      var duration = 2000;
      timeline._props.duration = duration;

      var tweenie1 = new Tweenie({ duration: 250 });
      var tweenie2 = new Tweenie({ duration: 300 });
      var tweenie3 = new Tweenie({ duration: 700 });

      timeline.add(tweenie1);
      timeline.add(tweenie2);
      timeline.add(tweenie3);

      expect(timeline._props.duration).toBe(duration);
    });

    it('should increase `duration` according to `delay`', function () {
      var timeline = Timeline();

      var tweenie1 = new Tweenie({ duration: 200 });
      var tweenie2 = new Tweenie({ duration: 500, delay: 700 });
      var tweenie3 = new Tweenie({ duration: 600 });

      timeline.add(tweenie1);
      timeline.add(tweenie2);
      timeline.add(tweenie3);

      expect(timeline._props.duration).toBe(tweenie2._props.duration + tweenie2._props.delay);
    });

    it('should increase `duration` according to `shift`', function () {
      var timeline = Timeline();

      var tweenie1 = new Tweenie({ duration: 200 });
      var tweenie2 = new Tweenie({ duration: 500, delay: 50 });
      var tweenie3 = new Tweenie({ duration: 700 });

      var shift = 200;
      timeline.add(tweenie1);
      timeline.add(tweenie2, shift);
      timeline.add(tweenie3);

      expect(timeline._props.duration).toBe(tweenie2._props.duration + tweenie2._props.delay + shift);
    });

    it('should treat negative `shift` as positive', function () {
      var timeline = Timeline();

      var tweenie1 = new Tweenie({ duration: 200 });
      var tweenie2 = new Tweenie({ duration: 500, delay: 50 });
      var tweenie3 = new Tweenie({ duration: 700 });

      var shift = -200;
      timeline.add(tweenie1);
      timeline.add(tweenie2, shift);
      timeline.add(tweenie3);

      expect(timeline._props.duration).toBe(tweenie2._props.duration + tweenie2._props.delay + Math.abs(shift));
    });

    it('should set `shiftTime` on a `tweenie`', function () {
      var timeline = Timeline();

      var tweenie1 = new Tweenie({ duration: 200 });
      var tweenie2 = new Tweenie({ duration: 500, delay: 50 });
      var tweenie3 = new Tweenie({ duration: 700 });

      var shift = 200;

      tweenie2._props.shiftTime = 0
      timeline.add(tweenie2, shift);

      expect(tweenie2._props.shiftTime).toBe(shift);
    });

    it('should always set positive `shiftTime`', function () {
      var timeline = Timeline();

      var tweenie1 = new Tweenie({ duration: 200 });
      var tweenie2 = new Tweenie({ duration: 500, delay: 50 });
      var tweenie3 = new Tweenie({ duration: 700 });

      var shift = -200;

      tweenie2._props.shiftTime = 0
      timeline.add(tweenie2, shift);

      expect(tweenie2._props.shiftTime).toBe(Math.abs(shift));
    });

    it('should work with arrays', function () {
      var timeline = Timeline();
      var tweenie1 = new Tweenie();
      var tweenie2 = new Tweenie();
      var tweenie3 = new Tweenie();

      timeline.add([tweenie1, tweenie2]);
      timeline.add(tweenie3);

      expect(timeline._items.length).toBe(3);
      expect(timeline._items[0]).toBe(tweenie1);
      expect(timeline._items[1]).toBe(tweenie2);
      expect(timeline._items[2]).toBe(tweenie3);
    });

    it('should return `this`', function () {
      var timeline = Timeline();

      expect(timeline.add(new Tweenie())).toBe(timeline);
    });
  });

  describe('`add` function ->', function() {
    it('should call the `add` function with current as `shift`', function () {
      var timeline = Timeline();

      var duration = 2000*Math.random();
      timeline._props.duration = duration;

      var tweenie1 = new Tweenie();

      spyOn(timeline, 'add');

      timeline.append(tweenie1);

      expect(timeline.add).toHaveBeenCalledWith(tweenie1, duration);
    });

    it('should call the `add` function with current as `shift` #array', function () {
      var timeline = Timeline();

      var duration = 2000*Math.random();
      timeline._props.duration = duration;

      var tweenie1 = new Tweenie();
      var tweenie2 = new Tweenie();
      var tweenie3 = new Tweenie();

      spyOn(timeline, 'add');

      var tweenies = [tweenie1, tweenie2, tweenie3];
      timeline.append(tweenies);

      expect(timeline.add).toHaveBeenCalledWith(tweenies, duration);
    });

    it('should add the `shift`', function () {
      var timeline = Timeline();

      var duration = 2000*Math.random();
      timeline._props.duration = duration;

      var shift = 200*Math.random();

      var tweenie1 = new Tweenie();
      var tweenie2 = new Tweenie();
      var tweenie3 = new Tweenie();

      spyOn(timeline, 'add');

      var tweenies = [tweenie1, tweenie2, tweenie3];
      timeline.append(tweenies, shift);

      expect(timeline.add).toHaveBeenCalledWith(tweenies, duration + shift);
    });

    it('should always add the `shift` as positive', function () {
      var timeline = Timeline();

      var duration = 2000*Math.random();
      timeline._props.duration = duration;

      var shift = -200*Math.random();

      var tweenie1 = new Tweenie();
      var tweenie2 = new Tweenie();
      var tweenie3 = new Tweenie();

      spyOn(timeline, 'add');

      var tweenies = [tweenie1, tweenie2, tweenie3];
      timeline.append(tweenies, shift);

      expect(timeline.add).toHaveBeenCalledWith(tweenies, duration + Math.abs(shift));
    });

    it('should return `this`', function () {
      var timeline = Timeline();

      expect(timeline.append(new Tweenie())).toBe(timeline);
    });
  });
});

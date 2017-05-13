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
    it('should reset `duration` etc on `defaults`', function () {
      var timeline = Timeline();
      expect(timeline._defaults.duration).toBe(0);
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

});

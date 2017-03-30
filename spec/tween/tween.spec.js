var Tween = mojs.Tween;
var tweener = mojs.tweener;

var helpers = mojs.__helpers__;
var ClassProto = helpers.ClassProto;
var TweenPlanner = helpers.TweenPlanner;
var tweenDefaults = helpers.tweenDefaults;

var eps = 0.0000001;

describe('tween ->', function () {

  describe('extension', function() {
    it('should extend `ClassProto`', function () {
      var tween = new Tween;
      expect(tween instanceof ClassProto).toBe(true);
    });
  });

  describe('initialization ->', function() {
    it('should have `defaults` of `tween` ->', function () {
      var tween = new Tween;
      expect(tween._defaults).toEqual(tweenDefaults);
    });

    it('should create planner ->', function () {
      var tween = new Tween({ duration: 2000 });
      expect(tween._planner instanceof TweenPlanner).toBe(true);
      expect(tween._planner._o).toBe(tween._o);
    });
  });

  describe('_setStartTime function ->', function() {
    it('should set start time ->', function () {
      var tween = new Tween;
      var startTime = 0;
      tween._setStartTime(startTime);
      expect(tween._startTime).toBe(startTime);
    });

    it('should set start time to performance.now() ->', function () {
      var tween = new Tween;
      tween._setStartTime();
      expect(tween._startTime).toEqual(jasmine.any(Number));
    });
  });

  describe('update function ->', function() {
    it('should envoke callbacks ->', function () {

      var options = {
        duration: 50,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {}
      };

      var tween = new Tween(options);
      var props = tween._props;

      tween._setStartTime(0);

      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

      var startTime = 0;

      tween.update(startTime - 10);
      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(1);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime += 16;
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(2);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime += 16;
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(3);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime += 16;
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      startTime += 16;
      expect(tween.update(startTime)).toBe(true);
    });
  });

  describe('_envokeCallBacks function ->', function() {
    it('should envoke callbacks regarding snapshot ->', function () {
      var options = {
        duration: 50,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {}
      };

      var tween = new Tween(options);
      var props = tween._props;

      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

      tween._envokeCallBacks(0);
      tween._envokeCallBacks(0);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacks(1);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacks(1 << 1);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacks(1 << 1 | 1 << 2);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacks(1 << 2);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacks(1 << 3);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(1);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacks(1 << 3 | 1 << 4);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(2);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacks(1 << 3 | 1 << 4 | 1 << 2);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(3);
      expect(props.onUpdate.calls.count()).toBe(3);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacks(1 << 3 | 1 << 4 | 1 << 2 | 1 << 5);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(4);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(3);
      expect(props.onComplete.calls.count()).toBe(1);

      tween._envokeCallBacks(1 << 5);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(4);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(3);
      expect(props.onComplete.calls.count()).toBe(2);

      tween._envokeCallBacks(1 << 4 | 1 << 5);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(4);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(4);
      expect(props.onComplete.calls.count()).toBe(3);

      tween._envokeCallBacks(1 << 3);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(4);
      expect(props.onUpdate.calls.count()).toBe(5);
      expect(props.onRepeatComplete.calls.count()).toBe(4);
      expect(props.onComplete.calls.count()).toBe(3);
    });
  });

  describe('play function ->', function () {
    it('should call `_setStartTime` ->', function () {
      var tween = new Tween;

      var returnValue = tween.play();
      spyOn(tween, '_setStartTime');
      spyOn(tweener, 'add');

      tween.play();

      expect(tween._setStartTime).toHaveBeenCalled();
      expect(tweener.add).toHaveBeenCalledWith(tween);

      expect(returnValue).toBe(tween);
    });
  });

});

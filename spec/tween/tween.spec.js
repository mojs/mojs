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

    it('should set `_cb` and `_cbr` functions ->', function () {
      var tween = new Tween({ duration: 2000 });
      expect(tween._cb).toBe(tween._envokeCallBacks);
      expect(tween._cbr).toBe(tween._envokeCallBacksRev);
    });

    it('should set `_cb` and `_cbr` functions #reverse ->', function () {
      var tween = new Tween({
        isIt: 1,
        duration: 2000,
        isReverse: true
      });
      expect(tween._cb).toBe(tween._envokeCallBacksRev);
      expect(tween._cbr).toBe(tween._envokeCallBacks);
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

      var startTime = 200;

      tween._setStartTime(startTime);
      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

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

      startTime += 16; // 16
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(2);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime += 16; // 32
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(3);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime += 16; // 48
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      startTime += 16; // 64
      expect(tween.update(startTime)).toBe(true);
      expect(tween._frameIndex).toBe(tween._planner._plan.length);
    });

    it('should envoke callbacks and jump if ended #delay #duration ->', function () {
      var duration = 100;
      var delay = 50;

      var options = {
        duration: duration,
        delay: delay,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {}
      };

      var tween = new Tween(options);
      var props = tween._props;

      tween._setStartTime(200);
      var startTime = tween._startTime;
      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

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

      tween.update(startTime + duration/2);
      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(5);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + duration);
      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);
    });

    it('should envoke callbacks and jump if ended #delay #duration ->', function () {
      var duration = 100;
      var delay = 50;

      var options = {
        duration: duration,
        delay: delay,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {}
      };

      var tween = new Tween(options);
      var props = tween._props;

      tween._setStartTime(200);
      var startTime = tween._startTime;
      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

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

      tween.update(startTime + 10);
      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(2);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      expect(tween.update(startTime + duration + 10)).toBe(true);
      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      expect(tween._prevTime).toBe(+Infinity);
      expect(tween._frameIndex).toBe(tween._planner._plan.length);
    });

    it('should envoke callbacks and jump if ended #delay #duration #backward ->', function () {
      var duration = 100;
      var delay = 50;

      var options = {
        duration: duration,
        delay: delay,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {}
      };

      var tween = new Tween(options);
      var props = tween._props;

      tween._setStartTime(200);
      var startTime = tween._startTime;

      tween.update(startTime - 10);
      tween.update(startTime);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);
      tween.update(startTime + duration + 10);

      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

      var endTime = startTime + duration;

      tween.update(endTime);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(1);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - 10);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(2);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      expect(tween.update(endTime - duration - 10)).toBe(true);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      expect(tween._prevTime).toBe(-Infinity);
      expect(tween._frameIndex).toBe(-1);
    });

    it('should envoke callbacks #backward ->', function () {
      var duration = 50;

      var options = {
        duration: duration,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {}
      };

      var tween = new Tween(options);
      var props = tween._props;

      var startTime = 350;

      tween._setStartTime(startTime);

      tween.update(startTime);
      tween.update(startTime + duration / 4);
      tween.update(startTime + duration / 2);

      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

      tween.update(startTime + duration);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(1);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      var endTime = startTime + duration;

      tween.update(endTime + 10);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(1);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(2);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(2);

      tween.update(endTime -= 16); // 34

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(3);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(2);

      tween.update(endTime -= 16); // 18

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(2);

      tween.update(endTime -= 16); // 2

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(5);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(2);

      tween.update(endTime -= 16); // -14

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(5);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(2);

      expect(tween._prevTime).toBe(-Infinity);
      expect(tween._frameIndex).toBe(-1);
    });

    it('should not envoke callbacks twice ->', function () {
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

      var startTime = 150;

      tween._setStartTime(startTime);

      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

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

      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      startTime += 16;
      expect(tween.update(startTime)).toBe(true);
      expect(tween._frameIndex).toBe(tween._plan.length);
      expect(tween._prevTime).toBe(+Infinity);
    });

    it('should save previous time to `_prevTime` ->', function () {
      var options = {
        duration: 50,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {}
      };

      var tween = new Tween(options);
      tween._setStartTime(0);

      var startTime = 0;
      tween.update(startTime);
      expect(tween._prevTime).toBe(0);

      tween.update(startTime + 1*16);
      expect(tween._prevTime).toBe(startTime + 1*16);

      tween.update(startTime + 2*16);
      expect(tween._prevTime).toBe(startTime + 2*16);

      tween.update(startTime + 3*16);
      expect(tween._prevTime).toBe(startTime + 3*16);
    });

    it('should be able to switch direction ->', function () {
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

      startTime += 16; // 16
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(2);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime += 16; // 32
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(3);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime -= 16; // 16
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime -= 16; // 0
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(5);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime += 16; // 16
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(6);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime -= 16; // 0
      tween.update(startTime);

      expect(props.onStart.calls.count()).toBe(3);
      expect(props.onRepeatStart.calls.count()).toBe(3);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      startTime -= 16; // -16
      expect(tween.update(startTime)).toBe(true);
      expect(tween._prevTime).toBe(-Infinity);
      expect(tween._frameIndex).toBe(-1);
    });

    it('should envoke callbacks #duration #delay #repeat ->', function () {
      var duration = 100;
      var delay = 50;
      var repeat = 2;

      var options = {
        duration: duration,
        delay: delay,
        repeat: repeat,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {}
      };

      var tween = new Tween(options);
      var props = tween._props;

      tween._setStartTime();
      var startTime = tween._startTime;
      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

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

      tween.update(startTime + duration/2);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(5);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + duration);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + duration + 10);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + duration + delay/2);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + duration + delay - 10);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + duration + delay);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(8);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(0);


      var period = duration + delay;

      tween.update(startTime + period + duration/2);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(11);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + period + duration);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(13);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(0);

      period += duration;

      tween.update(startTime + period + 10);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(13);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + period + delay/2);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(13);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + period + delay);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(3);
      expect(props.onUpdate.calls.count()).toBe(14);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + period + delay + 10);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(3);
      expect(props.onUpdate.calls.count()).toBe(15);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + period + delay + duration/2);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(3);
      expect(props.onUpdate.calls.count()).toBe(17);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(0);

      tween.update(startTime + period + delay + duration);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(3);
      expect(props.onUpdate.calls.count()).toBe(20);
      expect(props.onRepeatComplete.calls.count()).toBe(3);
      expect(props.onComplete.calls.count()).toBe(1);

      expect(tween.update(startTime + period + delay + duration + 10)).toBe(true);
    });

    it('should envoke callbacks #duration #delay #repeat #backward ->', function () {
      var duration = 100;
      var delay = 50;
      var repeat = 2;

      var options = {
        duration: duration,
        delay: delay,
        repeat: repeat,
        onStart: function() {},
        onRepeatStart: function() {},
        onUpdate: function() {},
        onRepeatComplete: function() {},
        onComplete: function() {}
      };

      var tween = new Tween(options);
      var props = tween._props;

      tween._setStartTime();
      var startTime = tween._startTime;

      tween.update(startTime - 10);
      tween.update(startTime + duration/2);
      tween.update(startTime + duration);
      tween.update(startTime + duration + delay/2);
      tween.update(startTime + duration + delay);
      tween.update(startTime + duration + delay + duration/2);
      tween.update(startTime + duration + delay + duration);
      tween.update(startTime + duration + delay + duration + delay/2);
      tween.update(startTime + duration + delay + duration + delay);
      tween.update(startTime + duration + delay + duration + delay + duration);
      tween.update(startTime + duration + delay + duration + delay + duration + 10);

      spyOn(props, 'onStart').and.callThrough();
      spyOn(props, 'onRepeatStart').and.callThrough();
      spyOn(props, 'onUpdate').and.callThrough();
      spyOn(props, 'onRepeatComplete').and.callThrough();
      spyOn(props, 'onComplete').and.callThrough();

      var endTime = startTime + duration + delay + duration + delay + duration;

      tween.update(endTime);
      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(1);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - duration/2);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(5);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - duration);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - duration - 10);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - duration - delay/2);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - duration - delay + 10);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(7);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(1);

      var period = duration + delay;

      tween.update(endTime - period);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(8);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - period - duration/2);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(11);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - period - duration);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(13);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - period - duration - delay/2);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(13);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(1);

      period = period + duration + delay;

      tween.update(endTime - period);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(14);
      expect(props.onRepeatComplete.calls.count()).toBe(3);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - period - 10);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(15);
      expect(props.onRepeatComplete.calls.count()).toBe(3);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - period - duration/2);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(17);
      expect(props.onRepeatComplete.calls.count()).toBe(3);
      expect(props.onComplete.calls.count()).toBe(1);

      tween.update(endTime - period - duration);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(3);
      expect(props.onUpdate.calls.count()).toBe(20);
      expect(props.onRepeatComplete.calls.count()).toBe(3);
      expect(props.onComplete.calls.count()).toBe(1);

      expect(tween.update(endTime - period - duration - 10)).toBe(true);
    });

    describe('callback functions used ->', function () {
      it('should call `_cb` on forward direction', function() {
        var tween = new Tween();

        tween._setStartTime();

        var startTime = tween._startTime;

        spyOn(tween, '_cb');
        tween.update(startTime);
        expect(tween._cb).toHaveBeenCalled();
      });

      it('should call `_cbr` on backward direction', function() {
        var tween = new Tween();

        tween._setStartTime();
        var startTime = tween._startTime;

        tween.update(startTime);
        tween.update(startTime + 16);
        tween.update(startTime + 32);

        spyOn(tween, '_cbr');
        tween.update(startTime + 16);

        expect(tween._cbr).toHaveBeenCalled();
      });
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


  describe('_envokeCallBacksRev function ->', function() {
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

      tween._envokeCallBacksRev(0);
      tween._envokeCallBacksRev(0);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacksRev(1);

      expect(props.onStart.calls.count()).toBe(0);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacksRev(1 << 1);

      expect(props.onStart.calls.count()).toBe(1);
      expect(props.onRepeatStart.calls.count()).toBe(0);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacksRev(1 << 1 | 1 << 2);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(1);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacksRev(1 << 2);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(0);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacksRev(1 << 3);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(1);
      expect(props.onRepeatComplete.calls.count()).toBe(0);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacksRev(1 << 3 | 1 << 4);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(2);
      expect(props.onUpdate.calls.count()).toBe(2);
      expect(props.onRepeatComplete.calls.count()).toBe(1);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacksRev(1 << 3 | 1 << 4 | 1 << 2);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(3);
      expect(props.onUpdate.calls.count()).toBe(3);
      expect(props.onRepeatComplete.calls.count()).toBe(2);
      expect(props.onComplete.calls.count()).toBe(0);

      tween._envokeCallBacksRev(1 << 3 | 1 << 4 | 1 << 2 | 1 << 5);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(4);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(3);
      expect(props.onComplete.calls.count()).toBe(1);

      tween._envokeCallBacksRev(1 << 5);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(4);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(3);
      expect(props.onComplete.calls.count()).toBe(2);

      tween._envokeCallBacksRev(1 << 4 | 1 << 5);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(4);
      expect(props.onUpdate.calls.count()).toBe(4);
      expect(props.onRepeatComplete.calls.count()).toBe(4);
      expect(props.onComplete.calls.count()).toBe(3);

      tween._envokeCallBacksRev(1 << 3);

      expect(props.onStart.calls.count()).toBe(2);
      expect(props.onRepeatStart.calls.count()).toBe(4);
      expect(props.onUpdate.calls.count()).toBe(5);
      expect(props.onRepeatComplete.calls.count()).toBe(4);
      expect(props.onComplete.calls.count()).toBe(3);
    });
  });

  describe('_setPlaybackState function ->', function() {
    it('should set playback state', function() {
      var tween = new Tween;
      tween._setPlaybackState('play');
      expect(tween._state).toBe('play');
      expect(tween._prevState).toBe('stop');
    });
    it('should track previous playback state', function() {
      var tween = new Tween;
      tween._setPlaybackState('play');
      tween._setPlaybackState('pause');
      expect(tween._prevState).toBe('play');
      expect(tween._state).toBe('pause');
    });
  });

  describe('_setResumeTime function ->', function() {
    it('should call _setStartTime method', function() {
      var tween = new Tween;
      spyOn(tween, '_setStartTime');
      var shift = 20;
      tween._setResumeTime('play', shift);
      time = tween._resumeTime - Math.abs(shift) - tween._elapsed;
      expect(tween._setStartTime).toHaveBeenCalledWith(time, false);
    });
    it('should have default of 0 shift', function() {
      var tween = new Tween;
      spyOn(tween, '_setStartTime');
      tween._setResumeTime('play');
      var time = tween._resumeTime - Math.abs(0) - tween._elapsed;
      expect(tween._setStartTime).toHaveBeenCalledWith(time, false);
    });

    describe('_prevTime normalization ->', function() {
      it('should not set _prevTime if it is undefined', function() {
        var tween = new Tween;
        tween._setResumeTime('play');
        expect(tween._prevTime).toBe(-Infinity);
      });
      it('should set prevTime to (`startTime` + `elapsed` + `delay`) if `play`', function() {
        var tween = new Tween;
        tween._prevTime = 200;
        tween._setResumeTime('play');
        expect(tween._prevTime).toBe(tween._startTime + tween._elapsed - tween._props.delay);
      });
      it('should set prevTime to (`startTime` + `elapsed` + `delay`) if `playBackward`', function() {
        var tween = new Tween;
        tween._prevTime = 200;
        tween._setResumeTime('playBackward');
        var endTime = tween._startTime + tween._totalTime - tween._props.delay;
        expect(tween._prevTime).toBe(endTime - tween._elapsed);
      });
      });
    });

    describe('_setStartTime function ->', function() {
      it('should calculate start time', function() {
        var delay = 500;
        var tween = new Tween({
          duration: 1000,
          delay: delay
        });
        tween._setStartTime();
        var expectedTime = performance.now() + delay;
        expect(tween._startTime).toBeGreaterThan(expectedTime - delay/10);
        expect(tween._startTime).not.toBeGreaterThan(expectedTime);
        expect(tween._startPoint).toBeCloseTo(tween._startTime - delay, 2);
      });
      it('should receive the start time', function() {
        var tween = new Tween({
          duration: 1000
        });
        tween._setStartTime(1);
        expect(tween._startTime).toBe(1);
        expect(tween._startPoint).toBe(tween._startTime);
      });

      it('should set start time ->', function () {
        var tween = new Tween;
        var startTime = 0;
        tween._setStartTime(startTime);
        expect(tween._startTime).toBe(startTime);
        expect(tween._startPoint).toBe(startTime);
      });

      it('should set start time #delay ->', function () {
        var delay = 200;
        var tween = new Tween({ delay: delay });
        var startTime = 0;
        tween._setStartTime(startTime);
        expect(tween._startTime).toBe(startTime + delay);
        expect(tween._startPoint).toBe(startTime);
      });

      it('should set start time #reverse ->', function () {
        var tween = new Tween({ isReverse: true });
        var startTime = 0;
        tween._setStartTime(startTime);
        expect(tween._startTime).toBe(startTime);
        expect(tween._startPoint).toBe(startTime);
      });

      it('should set start time #reverse #delay ->', function () {
        var delay = 200;
        var tween = new Tween({
          isReverse: true,
          delay: delay
        });
        var startTime = 0;
        tween._setStartTime(startTime);
        expect(tween._startTime).toBe(startTime);
        expect(tween._startPoint).toBe(startTime);
      });

      it('should set start time to performance.now() ->', function () {
        var tween = new Tween;
        tween._setStartTime();
        expect(tween._startTime).toEqual(jasmine.any(Number));
        expect(tween._startPoint).toEqual(tween._startTime);
      });

      //
      // commented out because not using `endTime` at the moment
      // it('should calculate end time', function() {
      //   var duration = 1000;
      //   var delay = 500;
      //   var tween = new Tween({
      //     duration: duration,
      //     delay: delay
      //   });
      //   tween._setStartTime();
      //   var endTime = t._props.startTime + t._props.repeatTime - t._props.delay;
      //   return expect(t._props.endTime).toBe(endTime);
      // });
      //
      // commented out because not using `endTime` at the moment
      // it('should calculate end time with repeat', function() {
      //   var duration = 1000;
      //   var delay = 500;
      //   var tween = new Tween({
      //     duration: duration,
      //     delay: delay,
      //     repeat: 2
      //   });
      //   tween._setStartTime();
      //   var endTime = tween._startTime + tween._totalTime - tween._props.delay;
      //   return expect(tween._props.endTime).toBe(endTime);
      // });
      //
      // commented out because not using `endTime` at the moment
      // it('should calculate end time if repeat', function() {
      //   var delay, duration, t, time;
      //   duration = 1000;
      //   delay = 500;
      //   t = new Tween({
      //     duration: duration,
      //     delay: delay,
      //     repeat: 2
      //   })._setStartTime();
      //   time = t._props.startTime + (3 * (duration + delay)) - delay;
      //   return expect(t._props.endTime).toBe(time);
      // });

      it('should calculate startTime if shifted', function() {
        var duration = 1000;
        var delay = 500;
        var shiftTime = 500;
        var tween = new Tween({
          duration: duration,
          delay: delay,
          repeat: 2,
          shiftTime: shiftTime
        });
        tween._setStartTime();
        expectedTime = performance.now() + shiftTime + delay;
        expect(tween._startTime).toBeGreaterThan(expectedTime - 50);
        expect(tween._startTime).not.toBeGreaterThan(expectedTime);
        expect(tween._startPoint).toBeCloseTo(tween._startTime - 2*delay, 2);
        //
        // commented out because not using _endTime at the moment
        // endTime = tween._startTime + (3 * (duration + delay)) - delay;
        // expect(tween._props.endTime).toBe(endTime);
      });
      //
      // TODO: make the flags work
      // it('should restart flags', function() {
      //   var tween = new Tween({
      //     duration: 20,
      //     repeat: 2
      //   });
      //   tween._setStartTime();
      //   tween.update(tween._startTime + 10);
      //   tween.update(tween._startTime + 60);
      //   expect(tween._isCompleted).toBe(true);
      //   expect(tween._isStarted).toBe(false);
      //   expect(tween._isRepeatCompleted).toBe(true);
      //   tween._setStartTime();
      //   expect(tween._isCompleted).toBe(false);
      //   expect(tween._isRepeatCompleted).toBe(false);
      //   expect(tween._isStarted).toBe(false);
      // });
      //
      // TODO: make the flags work
      // it('should not restart _repeatComplete flag is second param is false', function() {
      //   var t;
      //   t = new Tween({
      //     duration: 20,
      //     repeat: 2
      //   })._setStartTime();
      //   t.update(t._props.startTime + 10);
      //   t.update(t._props.startTime + 60);
      //   expect(t._isRepeatCompleted).toBe(true);
      //   t._setStartTime(1, false);
      //   return expect(t._isRepeatCompleted).toBe(true);
      // });
      it('should set _playTime', function() {
        var tween = new Tween();

        var now = performance.now();
        tween._setStartTime();
        expect(Math.abs(tween._playTime - now)).not.toBeGreaterThan(16);
      });
      it('should the start time should be shifted', function() {
        var shiftTime = 2000;
        var tween = new Tween({ shiftTime: shiftTime });
        tween._setStartTime();
        var now = performance.now();
        expect(tween._playTime).toBeDefined();
        expect(Math.abs(tween._playTime - (now + shiftTime)))
          .not.toBeGreaterThan(5);
      });
      it('should set _playTime to passed time', function() {
        var tween = new Tween();
        var now = performance.now() + 50;
        tween._setStartTime(now);
        expect(tween._playTime).toBe(now);
      });
      it('should set _playTime to _resumeTime if present', function() {
        var tween = new Tween;
        var resumeTime = 3200;
        tween._resumeTime = resumeTime;
        tween._setStartTime();
        return expect(tween._playTime).toBe(resumeTime);
      });
      it('should reset _resumeTime', function() {
        var tween = new Tween();
        tween._resumeTime = 3200;
        tween._setStartTime();
        return expect(tween._resumeTime).toBe(undefined);
      });
    });

  describe('playback callbacks ->', function() {

    describe('onPlaybackStart callback ->', function() {
      it('should envoke `onPlaybackStart` callback', function() {
        var options = {
          onPlaybackStart: function () {}
        };

        spyOn(options, 'onPlaybackStart');
        var tween = new Tween(options);
        tween.play();
        expect(options.onPlaybackStart).toHaveBeenCalled();
      });

      it('should envoke `onPlaybackPause` callback', function() {
        var options = {
          onPlaybackPause: function () {}
        };
        spyOn(options, 'onPlaybackPause');
        var tween = new Tween(options);

        tween
          .play()
          .pause();

        expect(options.onPlaybackPause).toHaveBeenCalled();
      });

      it('should envoke `onPlaybackStop` callback', function() {
        var options = {
          onPlaybackStop: function () {}
        };

        spyOn(options, 'onPlaybackStop');
        var tween = new Tween(options);

        tween
          .play()
          .stop();

        expect(options.onPlaybackStop).toHaveBeenCalled();
      });

    });
  });

  describe('play function ->', function() {
    it('should get the start time', function() {
      var tween = new Tween;
      tween.play();
      expect(tween._startTime).toBeDefined();
    });
    it('should set _state to "play"', function() {
      var tween = new Tween;
      tween.play();
      return expect(tween._state).toBe('play');
    });
    it('should reset _elpased to 0 if tween ended', function() {
      var tween = new Tween;
      tween._setStartTime();
      var time = tween._startTime;
      tween.setProgress(1).play();
      expect(Math.abs(time - tween._startTime)).not.toBeGreaterThan(5);
    });
    it('should reset isReversed to false', function() {
      var tween = new Tween;
      tween._isReversed = true;
      tween.play();
      expect(tween._isReversed).toBe(false);
    });
    it('should call the setStartTime method', function() {
      var tween = new Tween;
      spyOn(tween, '_setStartTime');
      tween.play();
      expect(tween._setStartTime).toHaveBeenCalled();
    });
    it('should add itself to tweener', function() {
      var tween = new Tween;
      spyOn(tweener, 'add');
      tween.play();
      return expect(tweener.add).toHaveBeenCalledWith(tween);
    });
    it('should receive progress time', function() {
      var tween = new Tween;
      tween._setStartTime();
      var time = tween._startTime;
      var shift = 200;
      tween.play(shift);
      var startTime = time - shift;
      expect(startTime - tween._startTime).not.toBeGreaterThan(5);
    });
    it('should treat negative progress time as positive', function() {
      var tween = new Tween;
      tween._setStartTime();
      var time = tween._startTime;
      var shift = -200;
      tween.play(shift);
      var startTimeDelta = tween._startTime - (time - Math.abs(shift));
      expect(Math.abs(startTimeDelta)).not.toBeGreaterThan(5);
    });
    // needed
    // it('should encount time progress', function() {
    //   var duration = 1000;
    //   var tween = new Tween({
    //     duration: duration
    //   });
    //   var progress = .5;
    //   tween.setProgress(progress - .01);
    //   tween.setProgress(progress);
    //   tween.play();
    //   var start = performance.now() - progress * tween._totalTime;
    //   console.log(tween._startTime, performance.now());
    //   expect(Math.abs(tween._startTime - start)).not.toBeGreaterThan(16);
    // });
    it('should return immediately if already playing', function() {
      var tween = new Tween({
        duration: 1000
      });
      tween.play();
      spyOn(tween, '_subPlay');
      var result = tween.play();
      expect(tween._subPlay).not.toHaveBeenCalled();
      expect(result).toBe(tween);
    });

    it('should run if already playing but ended', function(dfr) {
      var duration = 50;
      var tween = new Tween({ duration: duration });

      tween.play();
      setTimeout(function() {
        spyOn(tween, '_subPlay').and.callThrough();
        tween.play();
        expect(tween._subPlay).toHaveBeenCalled();
        dfr();
      }, 3*duration);
    });

    it('should call _subPlay with "play" string', function() {
      var duration = 50;
      var tween = new Tween({
        duration: duration
      });
      spyOn(tween, '_subPlay');
      tween.play();
      expect(tween._subPlay).toHaveBeenCalledWith(0, 'play');
    });
  });

  describe('pause funtion ->', function() {
    it('should call tweener.remove method with tween', function() {
      tweener.removeAll();
      var tween = new Tween({
        duration: 2000
      });
      spyOn(tweener, 'remove');

      tween
        .play()
        .pause();

      expect(tweener.remove).toHaveBeenCalledWith(tween);
    });
    it('should set _state to "pause"', function() {
      var tween = new Tween;
      tween
        .play()
        .pause();

      expect(tween._state).toBe('pause');
    });
    it('should `remove` immediately if paused', function() {
      var tween = new Tween;
      tween
        .play()
        .pause();

      spyOn(tweener, 'remove');
      var result = tween.pause();
      expect(tweener.remove).not.toHaveBeenCalled();
      expect(result).toBe(tween);
    });
  });

  describe('playBackward function ->', function() {
    it('should set _state to "playBlackward"', function() {
      var tween = new Tween;
      tween.playBackward();
      return expect(tween._state).toBe('playBackward');
    });
    it('should return `this`', function() {
      var tween = new Tween;
      var obj = tween.playBackward(200);
      return expect(obj).toBe(tween);
    });
    it('should overwrite play state', function() {
      var tween = new Tween;
      tween.playBackward(200);
      expect(tween._prevState).toBe('stop');
      return expect(tween._state).toBe('playBackward');
    });
    it('should recalc _elapsed', function() {
      var duration = 1000;
      var tween = new Tween({
        duration: duration
      });
      tween.setProgress(.75);
      var progress = tween._elapsed;
      tween.playBackward();
      expect(tween._elapsed).toBe(progress);
    });
    it('should recalc _elapsed if previous state was `play`', function() {
      var duration = 1000;
      var tween = new Tween({
        duration: duration
      });
      tween.setProgress(.75);
      progress = tween._elapsed;

      tween
        .play()
        .playBackward();

      expect(tween._elapsed).toBe(tween._totalTime - progress);
    });
    it('should return immediately if already reversing', function() {
      var tween = new Tween({
        duration: 1000
      });
      tween.playBackward();
      spyOn(tween, '_subPlay');
      var result = tween.playBackward();
      expect(tween._subPlay).not.toHaveBeenCalled();
      return expect(result).toBe(tween);
    });
    it('should run if already reversing but ended', function(dfr) {
      var duration = 50;
      var tween = new Tween({
        duration: duration
      });
      tween.playBackward();
      setTimeout(function() {
        spyOn(tween, '_subPlay');
        tween.playBackward();
        expect(tween._subPlay).toHaveBeenCalled();
        dfr();
      }, 2*duration);
    });
    it('should call `_subPlay` with "reverse" string', function() {
      var duration = 50;
      var tween = new Tween({
        duration: duration
      });
      spyOn(tween, '_subPlay');
      tween.playBackward();
      expect(tween._subPlay).toHaveBeenCalledWith(0, 'playBackward');
    });
  });

  describe('stop function ->', function() {
    it('should call reset method', function() {
      tweener.removeAll();
      var tween = new Tween({
        duration: 2000
      });
      tween.play();
      spyOn(tween, 'reset');
      tween.stop();
      return expect(tween.reset).toHaveBeenCalled();
    });
    it('should reset progress to 0 if played', function() {
      tweener.removeAll();
      var tween = new Tween({
        duration: 2000
      });
      tween.play();
      spyOn(tween, 'setProgress');
      tween.stop();
      expect(tween.setProgress).toHaveBeenCalledWith(0);
    });
    it('should reset progress to 1 if playedBackward', function() {
      tweener.removeAll();
      var tween = new Tween({
        duration: 2000
      });
      tween.playBackward();
      spyOn(tween, 'setProgress');
      tween.stop();
      expect(tween.setProgress).toHaveBeenCalledWith(1);
    });
    it('should receive progress to set', function() {
      tweener.removeAll();
      var tween = new Tween({
        duration: 2000
      });
      tween.playBackward();
      spyOn(tween, 'setProgress');
      tween.stop(.5);
      return expect(tween.setProgress).toHaveBeenCalledWith(.5);
    });
    it('should return immediately if already stopped', function() {
      var tween = new Tween();
      tween.stop();
      tween._isReversed = true;
      var result = tween.stop();
      expect(tween._isReversed).toBe(true);
      expect(result).toBe(tween);
    });
    //
    // commented out until `_wasUknownUpdate` needed
    // it('should set `_wasUknownUpdate` to undefined', function() {
    //   var tween = new Tween();
    //   tween.play();
    //   spyOn(tween, 'reset');
    //   spyOn(tween, 'setProgress');
    //   tween._wasUknownUpdate = true;
    //   tween.stop();
    //   return expect(tween._wasUknownUpdate).not.toBeDefined();
    // });
  });

  describe('reset function ->', function() {
    it('should remove tween from tweener', function() {
      tweener.removeAll();
      var tween = new Tween({
        duration: 2000
      });
      tween.play();
      spyOn(tweener, 'remove');
      tween.reset();
      expect(tweener.remove).toHaveBeenCalledWith(tween);
    });
    it('should reset _prevTime to undefined', function() {
      tweener.removeAll();
      var tween = new Tween({
        duration: 2000
      });
      tween.play();
      tween.reset();
      expect(tween._elapsed).toBe(0);
      expect(tween._frameIndex).toBe(-1);
    });
    it('should call _setPlaybackState', function() {
      tweener.removeAll();
      var tween = new Tween({
        duration: 2000
      });
      tween.play();
      spyOn(tween, '_setPlaybackState');
      tween.reset();
      expect(tween._setPlaybackState).toHaveBeenCalledWith('stop');
    });
  });

  describe('setProgress function ->', function() {
    it('should call _setStartTime if there is no this._startTime', function() {
      var tween = new Tween;
      spyOn(tween, '_setStartTime');
      tween.setProgress(.5);
      expect(tween._setStartTime).toHaveBeenCalled();
    });
    it('should call `update`', function() {
      var duration = 500;
      var progress = .75;
      var tween = new Tween({
        duration: duration
      });
      spyOn(tween, 'update');
      tween.setProgress(progress);
      return expect(tween.update).toHaveBeenCalledWith(tween._startTime + (progress * duration));
    });
    it('should not set the progress less then 0', function() {
      var delay = 5000;
      var tween = new Tween({
        delay: delay
      });
      spyOn(tween, 'update');
      tween.setProgress(-1.5);
      var startPoint = tween._startTime - delay;
      return expect(tween.update).toHaveBeenCalledWith(startPoint);
    });
    it('should not set the progress more then 1', function() {
      var delay = 200;
      var tween = new Tween({
        delay: delay
      });
      spyOn(tween, 'update');
      tween.setProgress(1.5);
      var startPoint = tween._startTime - delay;
      expect(tween.update).toHaveBeenCalledWith(startPoint + tween._totalTime);
    });
    it('should set _playTime to null', function() {
      var delay = 200;
      var tween = new Tween({
        delay: delay
      });
      tween.play().pause();
      tween.setProgress(.5);
      expect(tween._playTime).not.toBeDefined();
    });
    it('should return `this`', function() {
      var tween = new Tween;
      var result = tween.setProgress(.5);
      expect(result).toBe(tween);
    });
  });

  describe('onTweenerFinish function ->', function() {
    it('should call onPlaybackComplete method', function() {
      var tween = new Tween({
        duration: 50
      });
      spyOn(tween._props, 'onPlaybackComplete');
      tween.onTweenerFinish();
      expect(tween._props.onPlaybackComplete).toHaveBeenCalled();
    });
    it('should set _state to stop', function(dfr) {
      var duration = 50;
      var tween = new Tween({
        duration: duration
      });
      tween.play();
      setTimeout(function() {
        expect(tween._state).toBe('stop');
        expect(tween._prevState).toBe('play');
        dfr();
      }, 2*duration);
    });
    it('should return `this`', function() {
      var tween = new Tween({
        duration: 50
      });
      spyOn(tween._props, 'onPlaybackComplete');
      var result = tween.onTweenerFinish();
      expect(result).toBe(tween);
    });
  });

  describe('replay method ->', function() {
    it('should call reset and play methods', function() {
      var tween = new Tween;
      spyOn(tween, 'reset').and.callThrough();
      spyOn(tween, 'play').and.callThrough();
      tween.replay(200);
      expect(tween.reset).toHaveBeenCalled();
      expect(tween.play).toHaveBeenCalledWith(200);
    });
    it('should return this', function() {
      var tween = new Tween;
      var result = tween.replay(200);
      expect(result).toBe(tween);
    });
    return it('should fallback to 0 shift', function() {
      var tween = new Tween;
      spyOn(tween, 'play').and.callThrough();
      tween.replay();
      return expect(tween.play).toHaveBeenCalledWith(0);
    });
  });

  describe('replayBackward method ->', function() {
    it('should call reset and playBackward methods', function() {
      var tween = new Tween;
      spyOn(tween, 'reset').and.callThrough();
      spyOn(tween, 'playBackward').and.callThrough();
      tween.replayBackward(200);
      expect(tween.reset).toHaveBeenCalled();
      expect(tween.playBackward).toHaveBeenCalledWith(200);
    });
    it('should return this', function() {
      var tween = new Tween;
      var result = tween.replayBackward(200);
      expect(result).toBe(tween);
    });
    return it('should fallback to 0 shift', function() {
      var tween = new Tween;
      spyOn(tween, 'playBackward').and.callThrough();
      tween.replayBackward();
      expect(tween.playBackward).toHaveBeenCalledWith(0);
    });
  });

  describe('setSpeed method ->', function() {
    it('should return this', function() {
      var tween = new Tween;
      expect(tween.setSpeed(.5)).toBe(tween);
    });
    it('should set speed', function() {
      var tween = new Tween;
      var speed = 3.2;
      tween.setSpeed(speed);
      expect(tween._props.speed).toBe(speed);
    });
    it('should call _setResume time if playing', function() {
      var tween = new Tween;
      var speed = 3.2;
      tween._setPlaybackState('play');
      spyOn(tween, '_setResumeTime');
      tween.setSpeed(speed);
      return expect(tween._setResumeTime).toHaveBeenCalledWith('play');
    });
    it('should call _setResume time if playingBackward', function() {
      var tween = new Tween;
      var speed = 3.2;
      tween._setPlaybackState('playingBackward');
      spyOn(tween, '_setResumeTime');
      tween.setSpeed(speed);
      expect(tween._setResumeTime).toHaveBeenCalledWith('playingBackward');
    });
    it('should not call _setResume time if stopped', function() {
      var tween = new Tween;
      var speed = 3.2;
      spyOn(tween, '_setResumeTime');
      tween.setSpeed(speed);
      expect(tween._setResumeTime)
        .not.toHaveBeenCalledWith('stop');
    });
    it('should not call _setResume time if paused', function() {
      var tween = new Tween;
      var speed = 3.2;
      spyOn(tween, '_setResumeTime');
      tween.setSpeed(speed);
      expect(tween._setResumeTime)
        .not.toHaveBeenCalledWith('pause');
    });
  });

});

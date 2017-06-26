var Timeline = mojs.Timeline;
var Tween = mojs.Tween;

var helpers = mojs.__helpers__;
var Tweenable = helpers.Tweenable;
var ClassProto = helpers.ClassProto;

var Super = Tween.__mojsClass;

describe('timeline ->', function () {
  describe('extension ->', function() {
    it('should extend `Tween`', function () {
      var tweenable = Tweenable();
      expect(ClassProto.isPrototypeOf(tweenable)).toBe(true);
    });
  });

  describe('tween public methods proxy #timeline ->', function() {
    var tweenable = Tweenable();
    tweenable.tween = new Tween;
    tweenable.timeline = new Timeline;

    it('should proxy public methods of `Tween`', function () {
      var methods = ['play', 'pause', 'stop', 'replay', 'setSpeed', 'reverse', 'setProgress', 'reset', 'setStartTime'];

      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        spyOn(tweenable.timeline, method);
        arguments = [ Math.random(), Math.random(), Math.random(), Math.random() ];
        tweenable[method](arguments[0], arguments[1], arguments[2], arguments[3]);
        expect(tweenable.timeline[method]).toHaveBeenCalledWith(arguments[0], arguments[1], arguments[2], arguments[3]);
      }
    });
  });

  describe('tween public methods proxy if no timeline #tween ->', function() {
    var tweenable = Tweenable();
    tweenable.tween = new Tween;

    it('should proxy public methods of `Tween`', function () {
      var methods = ['play', 'pause', 'stop', 'replay', 'setSpeed', 'reverse', 'setProgress', 'reset', 'setStartTime'];

      for (var i = 0; i < methods.length; i++) {
        var method = methods[i];
        spyOn(tweenable.tween, method);
        arguments = [ Math.random(), Math.random(), Math.random(), Math.random() ];
        tweenable[method](arguments[0], arguments[1], arguments[2], arguments[3]);
        expect(tweenable.tween[method]).toHaveBeenCalledWith(arguments[0], arguments[1], arguments[2], arguments[3]);
      }
    });
  });
});

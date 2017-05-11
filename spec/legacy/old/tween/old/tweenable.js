(function() {
  var Module, Timeline, Tween, Tweenable,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Tween = mojs.Tween;

  Timeline = mojs.Timeline;

  Tweenable = mojs.Tweenable;

  Module = mojs.Module;

  describe('tweenable ->', function() {
    describe('extention ->', function() {
      return it('should extend Module', function() {
        var tw;
        tw = new Tweenable;
        return expect(tw instanceof Module).toBe(true);
      });
    });
    describe('options ->', function() {
      it('should save options to this._o ->', function() {
        var option, tw;
        option = 'some string';
        tw = new Tweenable({
          option1: option
        });
        return expect(tw._o.option1).toBe(option);
      });
      return it('should fallback to empty object ->', function() {
        var tw;
        tw = new Tweenable;
        return expect(typeof tw._o).toBe('object');
      });
    });
    describe('constructor ->', function() {
      return it('should call _transformTweenOptions method ->', function() {
        var tw;
        spyOn(Tweenable.prototype, '_transformTweenOptions');
        tw = new Tweenable;
        return expect(Tweenable.prototype._transformTweenOptions).toHaveBeenCalled();
      });
    });
    describe('initialization ->', function() {
      it('should pass this as callbacksContext object to timeline', function() {
        var tw;
        tw = new Tweenable;
        return expect(tw.timeline._props.callbacksContext).toBe(tw);
      });
      return it('should pass this as callbacksContext object to tween', function() {
        var tw;
        tw = new Tweenable;
        return expect(tw.timeline._timelines[0]._props.callbacksContext).toBe(tw);
      });
    });
    describe('_makeTween ->', function() {
      it('should call _makeTween on the construction stage ->', function() {
        var tw;
        spyOn(Tweenable.prototype, '_makeTween').and.callThrough();
        tw = new Tweenable;
        return expect(Tweenable.prototype._makeTween).toHaveBeenCalled();
      });
      it('should create tween ->', function() {
        var tw;
        tw = new Tweenable;
        return expect(tw.tween instanceof Tween).toBe(true);
      });
      return it('should construct tween with this._o ->', function() {
        var tw;
        tw = new Tweenable;
        return expect(tw.tween._o).toBe(tw._o);
      });
    });
    describe('_makeTimeline ->', function() {
      it('should call _makeTimeline on the construction stage ->', function() {
        var tw;
        spyOn(Tweenable.prototype, '_makeTimeline');
        tw = new Tweenable;
        return expect(Tweenable.prototype._makeTimeline).toHaveBeenCalled();
      });
      it('should create timeline ->', function() {
        var tw;
        tw = new Tweenable;
        return expect(tw.timeline instanceof Timeline).toBe(true);
      });
      it('should timeline with this._o.timeline ->', function() {
        var timelineOptions, tw;
        timelineOptions = {
          delay: 200,
          repeat: 2
        };
        tw = new Tweenable({
          timeline: timelineOptions
        });
        return expect(tw.timeline._o).toBe(tw._o.timeline);
      });
      it('should add add tween to the timeline ->', function() {
        var tw;
        tw = new Tweenable;
        return expect(tw.timeline._timelines[0]).toBe(tw.tween);
      });
      it('should not add tween if there is no one ->', function() {
        var TweenableExtention, tw;
        TweenableExtention = (function(_super) {
          __extends(TweenableExtention, _super);

          function TweenableExtention() {
            return TweenableExtention.__super__.constructor.apply(this, arguments);
          }

          TweenableExtention.prototype._makeTween = function() {};

          return TweenableExtention;

        })(Tweenable);
        tw = new TweenableExtention;
        return expect(tw.timeline._timelines[0]).not.toBeDefined();
      });
      it('should set _isTimeine ->', function() {
        var tw;
        tw = new Tweenable;
        return expect(tw._isTimeline).toBe(true);
      });
      return it('should not set _isTimeine if isTimelineLess ->', function() {
        var tw;
        tw = new Tweenable({
          isTimelineLess: true
        });
        return expect(tw._isTimeline).toBe(void 0);
      });
    });
    describe('play method ->', function() {
      it('should call timeline\'s play method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'play');
        progress = .5;
        tw.play(progress);
        return expect(tw.timeline.play).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.play();
        return expect(result).toBe(tw);
      });
    });
    describe('playBackward ->', function() {
      it('should call timeline\'s playBackward method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'playBackward');
        progress = .5;
        tw.playBackward(progress);
        return expect(tw.timeline.playBackward).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.playBackward();
        return expect(result).toBe(tw);
      });
    });
    describe('pause ->', function() {
      it('should call timeline\'s pause method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'pause');
        progress = .5;
        tw.pause(progress);
        return expect(tw.timeline.pause).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.pause();
        return expect(result).toBe(tw);
      });
    });
    describe('stop ->', function() {
      it('should call timeline\'s stop method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'stop');
        progress = .5;
        tw.stop(progress);
        return expect(tw.timeline.stop).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.stop();
        return expect(result).toBe(tw);
      });
    });
    describe('reset ->', function() {
      it('should call timeline\'s reset method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'reset');
        progress = .5;
        tw.reset(progress);
        return expect(tw.timeline.reset).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.reset();
        return expect(result).toBe(tw);
      });
    });
    describe('replay method ->', function() {
      it('should call timeline\'s replay method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'replay');
        progress = .5;
        tw.replay(progress);
        return expect(tw.timeline.replay).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.replay();
        return expect(result).toBe(tw);
      });
    });
    describe('replayBackward method ->', function() {
      it('should call timeline\'s replayBackward method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'replayBackward');
        progress = .5;
        tw.replayBackward(progress);
        return expect(tw.timeline.replayBackward).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.replayBackward();
        return expect(result).toBe(tw);
      });
    });
    describe('resume method ->', function() {
      it('should call timeline\'s resume method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'resume');
        progress = .5;
        tw.resume(progress);
        return expect(tw.timeline.resume).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.resume();
        return expect(result).toBe(tw);
      });
    });
    describe('setProgress ->', function() {
      it('should call timeline\'s setProgress method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'setProgress');
        progress = .5;
        tw.setProgress(progress);
        return expect(tw.timeline.setProgress).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.setProgress(.5);
        return expect(result).toBe(tw);
      });
    });
    describe('setSpeed ->', function() {
      it('should call timeline\'s setSpeed method', function() {
        var progress, tw;
        tw = new Tweenable;
        spyOn(tw.timeline, 'setSpeed');
        progress = .5;
        tw.setSpeed(progress);
        return expect(tw.timeline.setSpeed).toHaveBeenCalledWith(progress);
      });
      return it('should return this', function() {
        var result, tw;
        tw = new Tweenable;
        result = tw.setSpeed(.5);
        return expect(result).toBe(tw);
      });
    });
    describe('isTimelineLess option ->', function() {
      it('should not create timeline', function() {
        var tw;
        tw = new Tweenable({
          isTimelineLess: true
        });
        return expect(tw._o.timeline).not.toBeDefined();
      });
      return it('should save tween as timeline property', function() {
        var tw;
        tw = new Tweenable({
          isTimelineLess: true
        });
        expect(tw.timeline instanceof Timeline).toBe(false);
        return expect(tw.timeline instanceof Tween).toBe(true);
      });
    });
    describe('isTweenLess option ->', function() {
      return it('should save tween as tween property', function() {
        var tw;
        tw = new Tweenable({
          isTweenLess: true
        });
        expect(tw.tween instanceof Tween).toBe(false);
        return expect(tw.timeline instanceof Timeline).toBe(true);
      });
    });
    return describe('callbacksContext option ->', function() {
      return it('should pass the options to the tween', function() {
        var isRightContext, obj, tr;
        obj = {};
        isRightContext = null;
        tr = new Tweenable({
          callbacksContext: obj
        });
        expect(tr.tween._props.callbacksContext).toBe(obj);
        return expect(tr.timeline._props.callbacksContext).toBe(obj);
      });
    });
  });

}).call(this);

var tweener = mojs.tweener;

describe('Tweener ->', function() {
  var isPageVisibility;
  afterEach(function() {
    tweener._stopLoop();
    return tweener.removeAll();
  });
  beforeEach(function() {
    tweener._stopLoop();
    return tweener.removeAll();
  });
  it('have tweens array', function() {
    expect(tweener.tweens).toBeDefined();
    return expect(tweener.tweens instanceof Array).toBe(true);
  });
  describe('polyfills ->', function() {
    it('should have performance now defined', function() {
      return expect(window.performance.now).toBeDefined();
    });
    return it('should have requestAnimationFrame defined', function() {
      return expect(window.requestAnimationFrame).toBeDefined();
    });
  });
  describe('_loop ->', function() {
    it('should loop over', function(dfr) {
      tweener._startLoop();
      tweener.add(new Tween);
      spyOn(tweener, '_loop');
      return setTimeout(function() {
        expect(tweener._loop).toHaveBeenCalled();
        return dfr();
      }, 100);
    });
    it('should call update fun', function(dfr) {
      tweener._startLoop();
      spyOn(tweener, 'update');
      return setTimeout(function() {
        expect(tweener.update).toHaveBeenCalledWith(jasmine.any(Number));
        return dfr();
      }, 100);
    });
    it('should stop at the end', function(dfr) {
      tweener.add(new Tween);
      tweener._startLoop();
      setTimeout((function() {
        return tweener.tweens[0].update = function() {
          return true;
        };
      }), 100);
      return setTimeout((function() {
        expect(tweener._isRunning).toBe(false);
        return dfr();
      }), 200);
    });
    return it('should stop if !@isRunning', function() {
      tweener._isRunning = false;
      spyOn(window, 'requestAnimationFrame');
      spyOn(tweener, 'update');
      tweener._loop();
      expect(window.requestAnimationFrame).not.toHaveBeenCalled();
      return expect(tweener.update).not.toHaveBeenCalled();
    });
  });
  describe('_startLoop method ->', function() {
    it('should call loop method', function(dfr) {
      spyOn(tweener, '_loop');
      tweener._startLoop();
      return setTimeout(function() {
        expect(tweener._loop).toHaveBeenCalled();
        return dfr();
      }, 60);
    });
    it('should set isRunning flag', function() {
      expect(tweener._isRunning).toBeFalsy();
      tweener._startLoop();
      return expect(tweener._isRunning).toBe(true);
    });
    it('should call loop only once', function() {
      tweener._startLoop();
      spyOn(tweener, '_loop');
      tweener._startLoop();
      return expect(tweener._loop).not.toHaveBeenCalled();
    });
    return it('should start only 1 concurrent loop', function() {
      tweener._startLoop();
      expect(tweener._isRunning).toBe(true);
      spyOn(window, 'requestAnimationFrame');
      tweener._startLoop();
      return expect(window.requestAnimationFrame).not.toHaveBeenCalled();
    });
  });
  describe('_stopLoop method ->', function() {
    return it('should set isRunning to false', function() {
      tweener._startLoop();
      tweener._stopLoop();
      return expect(tweener._isRunning).toBe(false);
    });
  });
  describe('add method ->', function() {
    it('should add to tweens', function() {
      tweener.add(new Tween);
      expect(tweener.tweens.length).toBe(1);
      return expect(tweener.tweens[0] instanceof Tween).toBe(true);
    });
    it('should add to tweens only once', function() {
      var t1;
      t1 = new Tween;
      tweener.add(t1);
      tweener.add(t1);
      expect(tweener.tweens.length).toBe(1);
      return expect(tweener.tweens[0]).toBe(t1);
    });
    it('should call _startLoop method', function() {
      spyOn(tweener, '_startLoop');
      tweener.add(new Tween);
      return expect(tweener._startLoop).toHaveBeenCalled();
    });
    return it('should set _isRunning to true', function() {
      var t1;
      t1 = new Tween;
      tweener.add(t1);
      return expect(t1._isRunning).toBe(true);
    });
  });
  describe('remove method ->', function() {
    it('should remove a tween', function() {
      var t1, t2;
      t1 = new Tween;
      t2 = new Tween;
      tweener.add(t1);
      tweener.add(t2);
      expect(tweener.tweens.length).toBe(2);
      tweener.remove(t2);
      return expect(tweener.tweens.length).toBe(1);
    });
    it('should be able to remove by i', function() {
      var t1, t2;
      t1 = new Tween;
      t2 = new Tween;
      tweener.add(t1);
      tweener.add(t2);
      expect(tweener.tweens.length).toBe(2);
      tweener.remove(1);
      expect(tweener.tweens.length).toBe(1);
      return expect(tweener.tweens[0]).toBe(t1);
    });
    it('should set _isRunning to false', function() {
      var t1, t2;
      t1 = new Tween;
      t2 = new Tween;
      tweener.add(t1);
      tweener.add(t2);
      expect(tweener.tweens.length).toBe(2);
      tweener.remove(t1);
      expect(t1._isRunning).toBe(false);
      return expect(t2._isRunning).toBe(true);
    });
    return it('should call _onTweenerRemove method on each ', function() {
      var t1;
      t1 = new Tween;
      tweener.add(t1);
      expect(tweener.tweens.length).toBe(1);
      spyOn(t1, '_onTweenerRemove');
      tweener.remove(t1);
      return expect(t1._onTweenerRemove).toHaveBeenCalled();
    });
  });
  describe('removeAll method ->', function() {
    return it('should remove all tweens', function() {
      var t1, t2;
      t1 = new Tween;
      t2 = new Tween;
      tweener.add(t1);
      tweener.add(t2);
      expect(tweener.tweens.length).toBe(2);
      tweener.removeAll();
      return expect(tweener.tweens.length).toBe(0);
    });
  });
  describe('_update method ->', function() {
    it('should update the current time on every timeline', function() {
      var time;
      tweener.add(new Tween);
      tweener.add(new Tween);
      spyOn(tweener.tweens[0], 'update');
      spyOn(tweener.tweens[1], 'update');
      tweener.update(time = performance.now() + 200);
      expect(tweener.tweens[0].update).toHaveBeenCalledWith(time);
      return expect(tweener.tweens[1].update).toHaveBeenCalledWith(time);
    });
    it('should remove tween if ended', function() {
      var time, tw;
      tw = new Tween;
      tweener.add(tw);
      tw.update = function() {
        return true;
      };
      expect(tweener.tweens[0]).toBe(tw);
      spyOn(tweener, 'remove').and.callThrough();
      tweener.update(time = performance.now() + 200);
      expect(tweener.remove).toHaveBeenCalledWith(tw);
      return expect(tweener.tweens[0]).not.toBeDefined();
    });
    it('should set tween\'s _prevTime to undefined if ended', function(dfr) {
      var startTime, tw;
      tw = new Tween({
        duration: 100
      });
      tw._setStartTime();
      tweener.add(tw);
      expect(tweener.tweens[0]).toBe(tw);
      spyOn(tweener, 'remove').and.callThrough();
      startTime = performance.now();
      return setTimeout(function() {
        expect(tw._prevTime).toBe(void 0);
        return dfr();
      }, 400);
    });
    return it('should call tween\'s onTweenerFinish if ended', function(dfr) {
      var duration, tw;
      duration = 50;
      tw = new Tween({
        duration: duration
      });
      tw._setStartTime();
      tweener.add(tw);
      expect(tweener.tweens[0]).toBe(tw);
      spyOn(tw, 'onTweenerFinish');
      return setTimeout(function() {
        expect(tw.onTweenerFinish).toHaveBeenCalled();
        return dfr();
      }, 2 * duration);
    });
  });
  isPageVisibility = function() {
    return (typeof document.hidden !== "undefined") || (typeof document.mozHidden !== "undefined") || (typeof document.msHidden !== "undefined") || (typeof document.webkitHidden !== "undefined");
  };
  describe('_listenVisibilityChange method ->', function() {
    if (!isPageVisibility()) {
      return;
    }
    describe('page visibility init ->', function() {
      return it('should have ran _listenVisibilityChange method ->', function() {
        expect(typeof tweener._visibilityHidden).toBe('string');
        return expect(typeof tweener._visibilityChange).toBe('string');
      });
    });
    it('should set _visibilityHidden property', function() {
      var isIE, isMozilla, isOldOpera, isWebkit;
      tweener._visibilityHidden = null;
      tweener._listenVisibilityChange();
      isOldOpera = tweener._visibilityHidden === 'hidden';
      isMozilla = tweener._visibilityHidden === 'mozHidden';
      isIE = tweener._visibilityHidden === 'msHidden';
      isWebkit = tweener._visibilityHidden === 'webkitHidden';
      return expect(isOldOpera || isMozilla || isIE || isWebkit).toBe(true);
    });
    it('should set _visibilityChange property', function() {
      var isIE, isMozilla, isOldOpera, isWebkit;
      tweener._visibilityChange = null;
      tweener._listenVisibilityChange();
      isOldOpera = tweener._visibilityChange === 'visibilitychange';
      isMozilla = tweener._visibilityChange === 'mozvisibilitychange';
      isIE = tweener._visibilityChange === 'msvisibilitychange';
      isWebkit = tweener._visibilityChange === 'webkitvisibilitychange';
      return expect(isOldOpera || isMozilla || isIE || isWebkit).toBe(true);
    });
    it('should set up visiblilityChange event listener', function() {
      spyOn(document, 'addEventListener');
      tweener._listenVisibilityChange();
      expect(document.addEventListener).toHaveBeenCalledWith(tweener._visibilityChange, tweener._onVisibilityChange, false);
    });

    describe('caffeinate ->', function() {
      it('should remove `visibilityChange` listener', function () {
        spyOn(document, 'removeEventListener');
        tweener.caffeinate();
        expect(document.removeEventListener)
          .toHaveBeenCalledWith(tweener._visibilityChange, tweener._onVisibilityChange, false);
      });
    });
  });
  describe('_savePlayingTweens method ->', function() {
    it('should copy all playing tweens to _savedTweens array', function(done) {
      var tw1, tw2, tw3;
      tw1 = new Tween;
      tw1._setStartTime();
      tw2 = new Tween;
      tw2._setStartTime();
      tw3 = new Tween;
      tw3._setStartTime();
      tweener.add(tw1);
      tweener.add(tw2);
      tweener.add(tw3);
      return setTimeout(function() {
        tweener._savedTweens = [];
        tweener._savePlayingTweens();
        expect(tweener._savedTweens.length).toBe(3);
        expect(tweener._savedTweens[0]).toBe(tw1);
        expect(tweener._savedTweens[1]).toBe(tw2);
        expect(tweener._savedTweens[2]).toBe(tw3);
        return done();
      }, 50);
    });
    return it('should call `pause` on each tween', function(done) {
      var tw1, tw2, tw3;
      tw1 = new Tween;
      tw1._setStartTime();
      tw2 = new Tween;
      tw2._setStartTime();
      tw3 = new Tween;
      tw3._setStartTime();
      tweener.add(tw1);
      tweener.add(tw2);
      tweener.add(tw3);
      spyOn(tw1, 'pause');
      spyOn(tw2, 'pause');
      spyOn(tw3, 'pause');
      return setTimeout(function() {
        tweener._savedTweens = [];
        tweener._savePlayingTweens();
        expect(tw1.pause).toHaveBeenCalled();
        expect(tw2.pause).toHaveBeenCalled();
        expect(tw3.pause).toHaveBeenCalled();
        return done();
      }, 50);
    });
  });
  describe('_restorePlayingTweens method ->', function() {
    it('should copy all _savedTweens tweens to tweens array', function() {
      var tw1, tw2, tw3;
      tw1 = new Tween;
      tw2 = new Tween;
      tw3 = new Tween;
      tw1.play();
      tw2.play();
      tw3.play();
      tweener._savePlayingTweens();
      tweener._restorePlayingTweens();
      expect(tweener.tweens.length).toBe(3);
      expect(tweener.tweens[0]).toBe(tw1);
      expect(tweener.tweens[1]).toBe(tw2);
      return expect(tweener.tweens[2]).toBe(tw3);
    });
    it('should call `resume` on each tween', function() {
      var tw1, tw2, tw3;
      tw1 = new Tween;
      tw1._setStartTime();
      tw2 = new Tween;
      tw2._setStartTime();
      tw3 = new Tween;
      tw3._setStartTime();
      spyOn(tw1, 'resume');
      spyOn(tw2, 'resume');
      spyOn(tw3, 'resume');
      tweener.tweens = [];
      tweener._savedTweens = [tw1, tw2, tw3];
      tweener._restorePlayingTweens();
      expect(tw1.resume).toHaveBeenCalled();
      expect(tw2.resume).toHaveBeenCalled();
      return expect(tw3.resume).toHaveBeenCalled();
    });
    return it('should check for empty array before resuming', function() {
      tweener.tweens = [];
      return expect(function() {
        return tweener._restorePlayingTweens();
      }).not.toThrow();
    });
  });
  return describe('_onVisibilityChange method ->', function() {
    it('should call _savePlayingTweens if hidden', function() {
      tweener._visibilityHidden = 'mojs-tweener-visibility-test';
      document[tweener._visibilityHidden] = true;
      spyOn(tweener, '_savePlayingTweens');
      tweener._onVisibilityChange();
      return expect(tweener._savePlayingTweens).toHaveBeenCalled();
    });
    return it('should call _restorePlayingTweens if visible', function() {
      tweener._visibilityHidden = 'mojs-tweener-visibility-test';
      document[tweener._visibilityHidden] = false;
      spyOn(tweener, '_restorePlayingTweens');
      tweener._onVisibilityChange();
      return expect(tweener._restorePlayingTweens).toHaveBeenCalled();
    });
  });
});

(function() {
  var Timeline, Tween, t;

  t = window.mojs.tweener;

  Tween = window.mojs.Tween;

  Timeline = window.mojs.Timeline;

  describe('Tweener ->', function() {
    var isPageVisibility;
    afterEach(function() {
      t._stopLoop();
      return t.removeAll();
    });
    beforeEach(function() {
      t._stopLoop();
      return t.removeAll();
    });
    it('have tweens array', function() {
      expect(t.tweens).toBeDefined();
      return expect(t.tweens instanceof Array).toBe(true);
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
        t._startLoop();
        t.add(new Tween);
        spyOn(t, '_loop');
        return setTimeout(function() {
          expect(t._loop).toHaveBeenCalled();
          return dfr();
        }, 100);
      });
      it('should call update fun', function(dfr) {
        t._startLoop();
        spyOn(t, '_update');
        return setTimeout(function() {
          expect(t._update).toHaveBeenCalledWith(jasmine.any(Number));
          return dfr();
        }, 100);
      });
      it('should stop at the end', function(dfr) {
        t.add(new Tween);
        t._startLoop();
        setTimeout((function() {
          return t.tweens[0]._update = function() {
            return true;
          };
        }), 100);
        return setTimeout((function() {
          expect(t._isRunning).toBe(false);
          return dfr();
        }), 200);
      });
      return it('should stop if !@isRunning', function() {
        t._isRunning = false;
        spyOn(window, 'requestAnimationFrame');
        spyOn(t, '_update');
        t._loop();
        expect(window.requestAnimationFrame).not.toHaveBeenCalled();
        return expect(t._update).not.toHaveBeenCalled();
      });
    });
    describe('_startLoop method ->', function() {
      it('should call loop method', function(dfr) {
        spyOn(t, '_loop');
        t._startLoop();
        return setTimeout(function() {
          expect(t._loop).toHaveBeenCalled();
          return dfr();
        }, 60);
      });
      it('should set isRunning flag', function() {
        expect(t._isRunning).toBeFalsy();
        t._startLoop();
        return expect(t._isRunning).toBe(true);
      });
      it('should call loop only once', function() {
        t._startLoop();
        spyOn(t, '_loop');
        t._startLoop();
        return expect(t._loop).not.toHaveBeenCalled();
      });
      return it('should start only 1 concurrent loop', function() {
        t._startLoop();
        expect(t._isRunning).toBe(true);
        spyOn(window, 'requestAnimationFrame');
        t._startLoop();
        return expect(window.requestAnimationFrame).not.toHaveBeenCalled();
      });
    });
    describe('_stopLoop method ->', function() {
      return it('should set isRunning to false', function() {
        t._startLoop();
        t._stopLoop();
        return expect(t._isRunning).toBe(false);
      });
    });
    describe('add method ->', function() {
      it('should add to tweens', function() {
        t.add(new Tween);
        expect(t.tweens.length).toBe(1);
        return expect(t.tweens[0] instanceof Tween).toBe(true);
      });
      it('should add to tweens only once', function() {
        var t1;
        t1 = new Tween;
        t.add(t1);
        t.add(t1);
        expect(t.tweens.length).toBe(1);
        return expect(t.tweens[0]).toBe(t1);
      });
      it('should call _startLoop method', function() {
        spyOn(t, '_startLoop');
        t.add(new Tween);
        return expect(t._startLoop).toHaveBeenCalled();
      });
      return it('should set _isRunning to true', function() {
        var t1;
        t1 = new Tween;
        t.add(t1);
        return expect(t1._isRunning).toBe(true);
      });
    });
    describe('remove method ->', function() {
      it('should remove a tween', function() {
        var t1, t2;
        t1 = new Tween;
        t2 = new Tween;
        t.add(t1);
        t.add(t2);
        expect(t.tweens.length).toBe(2);
        t.remove(t2);
        return expect(t.tweens.length).toBe(1);
      });
      it('should be able to remove by i', function() {
        var t1, t2;
        t1 = new Tween;
        t2 = new Tween;
        t.add(t1);
        t.add(t2);
        expect(t.tweens.length).toBe(2);
        t.remove(1);
        expect(t.tweens.length).toBe(1);
        return expect(t.tweens[0]).toBe(t1);
      });
      it('should set _isRunning to false', function() {
        var t1, t2;
        t1 = new Tween;
        t2 = new Tween;
        t.add(t1);
        t.add(t2);
        expect(t.tweens.length).toBe(2);
        t.remove(t1);
        expect(t1._isRunning).toBe(false);
        return expect(t2._isRunning).toBe(true);
      });
      return it('should call _onTweenerRemove method on each ', function() {
        var t1;
        t1 = new Tween;
        t.add(t1);
        expect(t.tweens.length).toBe(1);
        spyOn(t1, '_onTweenerRemove');
        t.remove(t1);
        return expect(t1._onTweenerRemove).toHaveBeenCalled();
      });
    });
    describe('removeAll method ->', function() {
      return it('should remove all tweens', function() {
        var t1, t2;
        t1 = new Tween;
        t2 = new Tween;
        t.add(t1);
        t.add(t2);
        expect(t.tweens.length).toBe(2);
        t.removeAll();
        return expect(t.tweens.length).toBe(0);
      });
    });
    describe('_update method ->', function() {
      it('should update the current time on every timeline', function() {
        var time;
        t.add(new Tween);
        t.add(new Tween);
        spyOn(t.tweens[0], '_update');
        spyOn(t.tweens[1], '_update');
        t._update(time = performance.now() + 200);
        expect(t.tweens[0]._update).toHaveBeenCalledWith(time);
        return expect(t.tweens[1]._update).toHaveBeenCalledWith(time);
      });
      it('should remove tween if ended', function() {
        var time, tw;
        tw = new Tween;
        t.add(tw);
        tw._update = function() {
          return true;
        };
        expect(t.tweens[0]).toBe(tw);
        spyOn(t, 'remove').and.callThrough();
        t._update(time = performance.now() + 200);
        expect(t.remove).toHaveBeenCalledWith(tw);
        return expect(t.tweens[0]).not.toBeDefined();
      });
      it('should set tween\'s _prevTime to undefined if ended', function(dfr) {
        var startTime, tw;
        tw = new Tween({
          duration: 100
        });
        tw._setStartTime();
        t.add(tw);
        expect(t.tweens[0]).toBe(tw);
        spyOn(t, 'remove').and.callThrough();
        startTime = performance.now();
        return setTimeout(function() {
          expect(tw._prevTime).toBe(void 0);
          return dfr();
        }, 400);
      });
      return it('should call tween\'s _onTweenerFinish if ended', function(dfr) {
        var duration, tw;
        duration = 50;
        tw = new Tween({
          duration: duration
        });
        tw._setStartTime();
        t.add(tw);
        expect(t.tweens[0]).toBe(tw);
        spyOn(tw, '_onTweenerFinish');
        return setTimeout(function() {
          expect(tw._onTweenerFinish).toHaveBeenCalled();
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
          expect(typeof t._visibilityHidden).toBe('string');
          return expect(typeof t._visibilityChange).toBe('string');
        });
      });
      it('should set _visibilityHidden property', function() {
        var isIE, isMozilla, isOldOpera, isWebkit;
        t._visibilityHidden = null;
        t._listenVisibilityChange();
        isOldOpera = t._visibilityHidden === 'hidden';
        isMozilla = t._visibilityHidden === 'mozHidden';
        isIE = t._visibilityHidden === 'msHidden';
        isWebkit = t._visibilityHidden === 'webkitHidden';
        return expect(isOldOpera || isMozilla || isIE || isWebkit).toBe(true);
      });
      it('should set _visibilityChange property', function() {
        var isIE, isMozilla, isOldOpera, isWebkit;
        t._visibilityChange = null;
        t._listenVisibilityChange();
        isOldOpera = t._visibilityChange === 'visibilitychange';
        isMozilla = t._visibilityChange === 'mozvisibilitychange';
        isIE = t._visibilityChange === 'msvisibilitychange';
        isWebkit = t._visibilityChange === 'webkitvisibilitychange';
        return expect(isOldOpera || isMozilla || isIE || isWebkit).toBe(true);
      });
      return it('should set up visiblilityChange even listener', function() {
        spyOn(document, 'addEventListener');
        t._listenVisibilityChange();
        return expect(document.addEventListener).toHaveBeenCalledWith(t._visibilityChange, t._onVisibilityChange, false);
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
        t.add(tw1);
        t.add(tw2);
        t.add(tw3);
        return setTimeout(function() {
          t._savedTweens = [];
          t._savePlayingTweens();
          expect(t._savedTweens.length).toBe(3);
          expect(t._savedTweens[0]).toBe(tw1);
          expect(t._savedTweens[1]).toBe(tw2);
          expect(t._savedTweens[2]).toBe(tw3);
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
        t.add(tw1);
        t.add(tw2);
        t.add(tw3);
        spyOn(tw1, 'pause');
        spyOn(tw2, 'pause');
        spyOn(tw3, 'pause');
        return setTimeout(function() {
          t._savedTweens = [];
          t._savePlayingTweens();
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
        t._savePlayingTweens();
        t._restorePlayingTweens();
        expect(t.tweens.length).toBe(3);
        expect(t.tweens[0]).toBe(tw1);
        expect(t.tweens[1]).toBe(tw2);
        return expect(t.tweens[2]).toBe(tw3);
      });
      return it('should call `resume` on each tween', function() {
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
        t.tweens = [];
        t._savedTweens = [tw1, tw2, tw3];
        t._restorePlayingTweens();
        expect(tw1.resume).toHaveBeenCalled();
        expect(tw2.resume).toHaveBeenCalled();
        return expect(tw3.resume).toHaveBeenCalled();
      });
    });
    return describe('_onVisibilityChange method ->', function() {
      it('should call _savePlayingTweens if hidden', function() {
        t._visibilityHidden = 'mojs-tweener-visibility-test';
        document[t._visibilityHidden] = true;
        spyOn(t, '_savePlayingTweens');
        t._onVisibilityChange();
        return expect(t._savePlayingTweens).toHaveBeenCalled();
      });
      return it('should call _restorePlayingTweens if visible', function() {
        t._visibilityHidden = 'mojs-tweener-visibility-test';
        document[t._visibilityHidden] = false;
        spyOn(t, '_restorePlayingTweens');
        t._onVisibilityChange();
        return expect(t._restorePlayingTweens).toHaveBeenCalled();
      });
    });
  });

}).call(this);

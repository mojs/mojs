(function() {
  var Timeline, Tween, t;

  t = window.mojs.tweener;

  Tween = window.mojs.Tween;

  Timeline = window.mojs.Timeline;

  describe('Twenner ->', function() {
    afterEach(function() {
      t.stopLoop();
      return t.tweens.length = 0;
    });
    beforeEach(function() {
      t.stopLoop();
      return t.tweens.length = 0;
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
    describe('loop ->', function() {
      it('should loop over', function(dfr) {
        t.startLoop();
        t.add(new Tween);
        spyOn(t, 'loop');
        return setTimeout(function() {
          expect(t.loop).toHaveBeenCalled();
          return dfr();
        }, 100);
      });
      it('should call update fun', function(dfr) {
        t.startLoop();
        spyOn(t, '_update');
        return setTimeout(function() {
          expect(t._update).toHaveBeenCalledWith(jasmine.any(Number));
          return dfr();
        }, 100);
      });
      it('should stop at the end', function(dfr) {
        t.add(new Tween);
        t.startLoop();
        setTimeout((function() {
          return t.tweens[0]._update = function() {
            return true;
          };
        }), 100);
        return setTimeout((function() {
          expect(t.isRunning).toBe(false);
          return dfr();
        }), 200);
      });
      return it('should stop if !@isRunning', function() {
        t.isRunning = false;
        spyOn(window, 'requestAnimationFrame');
        spyOn(t, '_update');
        t.loop();
        expect(window.requestAnimationFrame).not.toHaveBeenCalled();
        return expect(t._update).not.toHaveBeenCalled();
      });
    });
    describe('startLoop method ->', function() {
      it('should call loop method', function(dfr) {
        spyOn(t, 'loop');
        t.startLoop();
        return setTimeout(function() {
          expect(t.loop).toHaveBeenCalled();
          return dfr();
        }, 60);
      });
      it('should set isRunning flag', function() {
        expect(t.isRunning).toBeFalsy();
        t.startLoop();
        return expect(t.isRunning).toBe(true);
      });
      it('should call loop only once', function() {
        t.startLoop();
        spyOn(t, 'loop');
        t.startLoop();
        return expect(t.loop).not.toHaveBeenCalled();
      });
      return it('should start only 1 concurrent loop', function() {
        t.startLoop();
        expect(t.isRunning).toBe(true);
        spyOn(window, 'requestAnimationFrame');
        t.startLoop();
        return expect(window.requestAnimationFrame).not.toHaveBeenCalled();
      });
    });
    describe('stopLoop method ->', function() {
      return it('should set isRunning to false', function() {
        t.startLoop();
        t.stopLoop();
        return expect(t.isRunning).toBe(false);
      });
    });
    describe('add method ->', function() {
      it('should add to tweens', function() {
        t.add(new Tween);
        expect(t.tweens.length).toBe(1);
        return expect(t.tweens[0] instanceof Tween).toBe(true);
      });
      return it('should call startLoop method', function() {
        spyOn(t, 'startLoop');
        t.add(new Tween);
        return expect(t.startLoop).toHaveBeenCalled();
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
      return it('should be able to remove by i', function() {
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
    return describe('update method ->', function() {
      return it('should update the current time on every timeline', function() {
        var time;
        t.add(new Tween);
        t.add(new Tween);
        spyOn(t.tweens[0], '_update');
        spyOn(t.tweens[1], '_update');
        t._update(time = performance.now() + 200);
        expect(t.tweens[0]._update).toHaveBeenCalledWith(time);
        return expect(t.tweens[1]._update).toHaveBeenCalledWith(time);
      });
    });
  });

}).call(this);

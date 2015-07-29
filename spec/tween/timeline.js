(function() {
  var Timeline, Transit, Tween, tweener;

  Timeline = window.mojs.Timeline;

  Tween = window.mojs.Tween;

  tweener = window.mojs.tweener;

  Transit = window.mojs.Transit;

  describe('Timeline ->', function() {
    beforeEach(function() {
      return tweener.removeAll();
    });
    it('should have timelines var', function() {
      var t;
      t = new Timeline;
      expect(t.timelines.length).toBe(0);
      expect(t.props.time).toBe(0);
      expect(t.props.repeatTime).toBe(0);
      return expect(t.props.shiftedRepeatTime).toBe(0);
    });
    it('should have initial state flags', function() {
      var t;
      t = new Timeline;
      return expect(t.state).toBe('stop');
    });
    describe('defaults ->', function() {
      return it('should have defaults', function() {
        var t;
        t = new Timeline;
        expect(t.defaults.repeat).toBe(0);
        expect(t.defaults.delay).toBe(0);
        return expect(typeof t.props).toBe('object');
      });
    });
    describe('_extendDefaults method ->', function() {
      it('should extend defaults by options #1', function() {
        var t;
        t = new Timeline({
          delay: 200
        });
        expect(t.props.delay).toBe(200);
        expect(t.props.repeat).toBe(0);
        return expect(t.props.shiftedRepeatTime).toBe(0);
      });
      it('should extend defaults by options #2', function() {
        var t;
        t = new Timeline({
          repeat: 2
        });
        expect(t.props.repeat).toBe(2);
        expect(t.props.delay).toBe(0);
        return expect(t.props.shiftedRepeatTime).toBe(0);
      });
      return it('should extend defaults by options #3', function() {
        var t;
        t = new Timeline({
          repeat: 2,
          delay: 300
        });
        expect(t.props.repeat).toBe(2);
        expect(t.props.delay).toBe(300);
        return expect(t.props.shiftedRepeatTime).toBe(0);
      });
    });
    describe('setProp method ->', function() {
      it('should set a prop to the props object', function() {
        var t;
        t = new Timeline({
          repeat: 4
        });
        t.setProp({
          repeat: 8
        });
        return expect(t.props.repeat).toBe(8);
      });
      return it('should call recalcDuration method', function() {
        var t;
        t = new Timeline({
          repeat: 4
        });
        spyOn(t, 'recalcDuration');
        t.setProp({
          repeat: 8
        });
        return expect(t.recalcDuration).toHaveBeenCalled();
      });
    });
    describe('add method ->', function() {
      it('should add timeline', function() {
        var t;
        t = new Timeline;
        t.add(new Tween);
        expect(t.timelines.length).toBe(1);
        return expect(t.timelines[0] instanceof Tween).toBe(true);
      });
      it('should return self for chaining', function() {
        var obj, t;
        t = new Timeline;
        obj = t.add(new Tween);
        return expect(obj).toBe(t);
      });
      it('should treat a module with timeline object as a timeline', function() {
        var t;
        t = new Timeline;
        t.add(new Transit);
        expect(t.timelines.length).toBe(1);
        return expect(t.timelines[0] instanceof Timeline).toBe(true);
      });
      it('should work with arrays of tweens', function() {
        var t, t1, t2;
        t = new Timeline;
        t1 = new Tween({
          duration: 1000
        });
        t2 = new Tween({
          duration: 1500
        });
        t.add([t1, t2, new Timeline]);
        expect(t.timelines.length).toBe(3);
        expect(t.props.repeatTime).toBe(1500);
        expect(t.timelines[0] instanceof Tween).toBe(true);
        expect(t.timelines[1] instanceof Tween).toBe(true);
        return expect(t.timelines[2] instanceof Timeline).toBe(true);
      });
      it('should calculate shiftedRepeatTime', function() {
        var t, t1, t2;
        t = new Timeline;
        t1 = new Tween({
          duration: 1000
        });
        t2 = new Tween({
          duration: 1500
        });
        t.add([t1, t2, new Timeline]);
        expect(t.timelines.length).toBe(3);
        expect(t.props.repeatTime).toBe(1500);
        return expect(t.props.shiftedRepeatTime).toBe(1500);
      });
      it('should calculate shiftedRepeatTime #2', function() {
        var t, t1, t2;
        t = new Timeline;
        t1 = new Tween({
          duration: 1000
        });
        t2 = new Tween({
          duration: 1500
        });
        t.setProp({
          'shiftTime': 500
        });
        t.add([t1, t2, new Timeline]);
        expect(t.timelines.length).toBe(3);
        expect(t.props.repeatTime).toBe(1500);
        return expect(t.props.shiftedRepeatTime).toBe(2000);
      });
      it('should work with arguments', function() {
        var t1, t2, tween;
        tween = new Timeline;
        t1 = new Tween({
          duration: 500,
          delay: 200
        });
        t2 = new Tween({
          duration: 500,
          delay: 500
        });
        tween.add(t1, t2);
        expect(tween.props.repeatTime).toBe(1000);
        return expect(tween.timelines.length).toBe(2);
      });
      it('should work with mixed arguments', function() {
        var t, t1, t2;
        t = new Timeline;
        t1 = new Tween({
          duration: 1000
        });
        t2 = new Tween({
          duration: 1500
        });
        t.add([t1, new Tween, new Timeline], t2);
        expect(t.timelines.length).toBe(4);
        expect(t.props.repeatTime).toBe(1500);
        expect(t.timelines[0] instanceof Tween).toBe(true);
        expect(t.timelines[1] instanceof Tween).toBe(true);
        expect(t.timelines[2] instanceof Timeline).toBe(true);
        return expect(t.timelines[3] instanceof Tween).toBe(true);
      });
      it('should calc self duration', function() {
        var t;
        t = new Timeline;
        t.add(new Tween({
          duration: 500,
          delay: 200
        }));
        expect(t.props.repeatTime).toBe(700);
        t.add(new Tween({
          duration: 500,
          delay: 200,
          repeat: 1
        }));
        return expect(t.props.repeatTime).toBe(1400);
      });
      return it('should work with another tweens', function() {
        var t, t1;
        t1 = new Timeline;
        t = new Timeline;
        t.add(new Tween({
          duration: 500,
          delay: 200
        }));
        t.add(new Tween({
          duration: 500,
          delay: 200,
          repeat: 1
        }));
        t1.add(t);
        return expect(t1.props.repeatTime).toBe(1400);
      });
    });
    describe('pushTimeline method ->', function() {
      return it('should push timeline to timelines and calc repeatTime', function() {
        var t;
        t = new Timeline;
        t.pushTimeline(new Tween({
          duration: 4000
        }));
        expect(t.timelines.length).toBe(1);
        expect(t.timelines[0] instanceof Tween).toBe(true);
        return expect(t.props.repeatTime).toBe(4000);
      });
    });
    describe('repeat option ->', function() {
      it('should increase repeatTime', function() {
        var t;
        t = new Timeline({
          repeat: 2
        });
        t.add(new Tween({
          duration: 200
        }));
        expect(t.props.repeatTime).toBe(600);
        return expect(t.props.time).toBe(200);
      });
      return it('should set nearest start time', function() {
        var t;
        t = new Timeline({
          repeat: 2
        });
        t.add(new Tween({
          duration: 200
        }));
        t.setProgress(.6);
        return expect(t.timelines[0].progress).toBeCloseTo(.8, 5);
      });
    });
    describe('startTime ->', function() {
      return it('should set startTime', function() {
        var expectedTime, t;
        t = new Timeline({
          repeat: 2
        });
        t.add(new Tween({
          duration: 200
        }));
        t.setStartTime();
        expectedTime = performance.now();
        expect(t.props.startTime).toBeGreaterThan(expectedTime - 50);
        return expect(t.props.startTime).not.toBeGreaterThan(expectedTime);
      });
    });
    describe('endTime ->', function() {
      return it('should set endTime', function() {
        var expectedTime, t;
        t = new Timeline({
          repeat: 2
        });
        t.add(new Tween({
          duration: 200
        }));
        t.setStartTime();
        expectedTime = performance.now();
        return expect(t.props.endTime).toBe(t.props.startTime + t.props.shiftedRepeatTime);
      });
    });
    return describe('append method ->', function() {
      it('should add timeline', function() {
        var t;
        t = new Timeline;
        t.append(new Tween);
        expect(t.timelines.length).toBe(1);
        return expect(t.timelines[0] instanceof Tween).toBe(true);
      });
      return it('should treat every argument as new append call', function() {
        var t, tm1, tm2;
        t = new Timeline({
          isIt: true
        });
        tm1 = new Tween({
          duration: 1000,
          delay: 500
        });
        tm2 = new Tween({
          duration: 1000,
          delay: 700
        });
        t.append(tm1, tm2);
        expect(t.timelines.length).toBe(2);
        expect(t.timelines[0] instanceof Tween).toBe(true);
        expect(t.timelines[1] instanceof Tween).toBe(true);
        return expect(t.props.time).toBe(3200);
      });
    });
  });

}).call(this);

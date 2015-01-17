(function() {
  var Burst, Transit;

  Transit = mojs.Transit;

  Burst = mojs.Burst;

  describe('Burst ->', function() {
    describe('extension ->', function() {
      it('should extend Transit class', function() {
        var burst;
        burst = new Burst;
        return expect(burst instanceof Transit).toBe(true);
      });
      return it('should have its own defaults', function() {
        var burst;
        burst = new Burst;
        expect(burst.defaults.degree).toBe(360);
        expect(burst.defaults.points).toBe(5);
        return expect(burst.defaults.type).toBe('circle');
      });
    });
    describe('initialization ->', function() {
      it('should create transits', function() {
        var burst;
        burst = new Burst;
        expect(burst.transits.length).toBe(5);
        return expect(burst.transits[0] instanceof Transit).toBe(true);
      });
      return it('should pass properties to transits', function() {
        var burst;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ],
            stroke: ['deeppink', 'yellow'],
            fill: '#fff'
          }
        });
        expect(burst.transits[0].o.radius[20]).toBe(50);
        expect(burst.transits[1].o.radius).toBe(20);
        expect(burst.transits[2].o.radius).toBe('500');
        expect(burst.transits[3].o.radius[20]).toBe(50);
        expect(burst.transits[4].o.radius).toBe(20);
        expect(burst.transits[1].o.stroke).toBe('yellow');
        expect(burst.transits[2].o.stroke).toBe('deeppink');
        expect(burst.transits[1].o.fill).toBe('#fff');
        return expect(burst.transits[2].o.fill).toBe('#fff');
      });
    });
    describe('childOptions ->', function() {
      it('should save childOptions from options ->', function() {
        var burst;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        expect(burst.childOptions).toBeDefined();
        return expect(burst.childOptions.radius[1]).toBe(20);
      });
      return it('should extend childDefaults ->', function() {
        var burst;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        return expect(burst.childOptions.strokeWidth[2]).toBe(0);
      });
    });
    describe('getOption method ->', function() {
      return it('should return an option obj based on i ->', function() {
        var burst, option0, option1, option7;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        option0 = burst.getOption(0);
        option1 = burst.getOption(1);
        option7 = burst.getOption(7);
        expect(option0.radius[20]).toBe(50);
        expect(option1.radius).toBe(20);
        return expect(option7.radius).toBe(20);
      });
    });
    describe('randomness ->', function() {
      it('should have isRandom option ->', function() {
        var burst;
        burst = new Burst;
        expect(burst.props.isRandom).toBeDefined();
        return expect(burst.props.isRandom).toBe(false);
      });
      return it('should calculate stepRand and radiusRand for every transit ->', function() {
        var burst;
        burst = new Burst({
          isRand: true
        });
        expect(burst.transits[0].stepRand).toBeDefined();
        expect(burst.transits[0].radiusRand).toBeDefined();
        expect(burst.transits[1].stepRand).toBeDefined();
        return expect(burst.transits[1].radiusRand).toBeDefined();
      });
    });
    describe('getPropByMod method ->', function() {
      it('should return the prop from @o based on i ->', function() {
        var burst, opt0, opt1, opt2, opt8;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500'
            ]
          }
        });
        opt0 = burst.getPropByMod('radius', 0);
        opt1 = burst.getPropByMod('radius', 1);
        opt2 = burst.getPropByMod('radius', 2);
        opt8 = burst.getPropByMod('radius', 8);
        expect(opt0[20]).toBe(50);
        expect(opt1).toBe(20);
        expect(opt2).toBe('500');
        return expect(opt8).toBe('500');
      });
      it('should return the prop from @o based on i #2->', function() {
        var burst;
        return burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20, '500', 10, 20
            ]
          }
        });
      });
      return it('should the same prop if not an array ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          childOptions: {
            radius: 20
          }
        });
        opt0 = burst.getPropByMod('radius', 0);
        opt1 = burst.getPropByMod('radius', 1);
        opt8 = burst.getPropByMod('radius', 8);
        expect(opt0).toBe(20);
        expect(opt1).toBe(20);
        return expect(opt8).toBe(20);
      });
    });
    describe('size calculations ->', function() {
      it('should calculate size based on largest transit + self radius', function() {
        var burst;
        burst = new Burst({
          radius: 50,
          childOptions: {
            radius: [
              {
                20: 50
              }, 20
            ],
            strokeWidth: 20
          }
        });
        expect(burst.props.size).toBe(240);
        return expect(burst.props.center).toBe(120);
      });
      return it('should calculate size based on largest transit + self radius #2', function() {
        var burst;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20
            ],
            strokeWidth: 20
          }
        });
        expect(burst.props.size).toBe(290);
        return expect(burst.props.center).toBe(145);
      });
    });
    describe('setProgress method ->', function() {
      it('should setProgress on all transits', function() {
        var burst;
        burst = new Burst({
          childOptions: {
            radius: [
              {
                20: 50
              }, 20
            ],
            strokeWidth: 20
          }
        });
        burst.setProgress(.5);
        expect(burst.transits[0].progress).toBe(.5);
        expect(burst.transits[1].progress).toBe(.5);
        expect(burst.transits[2].progress).toBe(.5);
        expect(burst.transits[3].progress).toBe(.5);
        return expect(burst.transits[4].progress).toBe(.5);
      });
      return it('should call super method', function() {
        var burst;
        burst = new Burst({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Burst.__super__, 'setProgress');
        burst.setProgress(.5);
        return expect(Burst.__super__.setProgress).toHaveBeenCalled();
      });
    });
    describe('run method ->', function() {
      it('should call super', function() {
        var burst;
        burst = new Burst({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Burst.__super__, 'run');
        burst.run();
        return expect(Burst.__super__.run).toHaveBeenCalled();
      });
      it('should call generateRandom method if isRandom was passed', function() {
        var burst;
        burst = new Burst({
          isRandom: true
        });
        spyOn(burst, 'generateRandom');
        burst.run();
        return expect(burst.generateRandom).toHaveBeenCalled();
      });
      return it('should not call generateRandom method if isRandom was not passed', function() {
        var burst;
        burst = new Burst({
          isRandom: false
        });
        spyOn(burst, 'generateRandom');
        burst.run();
        return expect(burst.generateRandom).not.toHaveBeenCalled();
      });
    });
    return describe('draw method ->', function() {
      return it('should set x/y coordinates on every transit', function() {
        var burst;
        burst = new Burst;
        burst.draw();
        expect(burst.transits[0].props.x).not.toBe('0px');
        expect(burst.transits[1].props.x).not.toBe('0px');
        expect(burst.transits[2].props.x).not.toBe('0px');
        expect(burst.transits[3].props.x).not.toBe('0px');
        return expect(burst.transits[4].props.x).not.toBe('0px');
      });
    });
  });

}).call(this);

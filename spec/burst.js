(function() {
  var Burst, Swirl, Transit;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

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
        return expect(burst.transits[0] instanceof Swirl).toBe(true);
      });
      it('should pass properties to transits', function() {
        var burst;
        burst = new Burst({
          swirlSize: 20,
          swirlFrequency: 'rand(10,20)',
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
        expect(burst.transits[2].o.fill).toBe('#fff');
        expect(burst.transits[0].o.isSwirlLess).toBe(true);
        expect(burst.transits[0].o.swirlSize).toBe(20);
        return expect(burst.transits[0].o.swirlFrequency).toBe('rand(10,20)');
      });
      return it('should pass x/y to transits', function() {
        var burst, center;
        burst = new Burst({
          radius: {
            50: 75
          },
          points: 2
        });
        center = burst.props.center;
        expect(burst.transits[0].o.x[center]).toBe(center);
        expect(burst.transits[0].o.y[center - 50]).toBe(center - 75);
        expect(burst.transits[1].o.x[center]).toBe(center);
        return expect(burst.transits[1].o.y[center + 50]).toBe(center + 75);
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
      describe('random angle ->', function() {
        it('should have randomAngle option ->', function() {
          var burst;
          burst = new Burst;
          expect(burst.props.randomAngle).toBeDefined();
          return expect(burst.props.randomAngle).toBe(0);
        });
        return it('should calculate angleRand for every transit ->', function() {
          var burst;
          burst = new Burst({
            randomAngle: true
          });
          expect(burst.transits[0].o.angleShift).toBeDefined();
          return expect(burst.transits[1].o.angleShift).toBeDefined();
        });
      });
      return describe('random radius ->', function() {
        it('should have randomRadius option ->', function() {
          var burst;
          burst = new Burst;
          expect(burst.props.randomRadius).toBeDefined();
          return expect(burst.props.randomRadius).toBe(0);
        });
        return it('should calculate radiusRand for every transit ->', function() {
          var burst;
          burst = new Burst({
            randomRadius: true
          });
          expect(burst.transits[0].o.radiusScale).toBeDefined();
          return expect(burst.transits[1].o.radiusScale).toBeDefined();
        });
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
        opt0 = burst.getPropByMod({
          propName: 'radius',
          i: 0
        });
        opt1 = burst.getPropByMod({
          propName: 'radius',
          i: 1
        });
        opt2 = burst.getPropByMod({
          propName: 'radius',
          i: 2
        });
        opt8 = burst.getPropByMod({
          propName: 'radius',
          i: 8
        });
        expect(opt0[20]).toBe(50);
        expect(opt1).toBe(20);
        expect(opt2).toBe('500');
        return expect(opt8).toBe('500');
      });
      it('should the same prop if not an array ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          childOptions: {
            radius: 20
          }
        });
        opt0 = burst.getPropByMod({
          propName: 'radius',
          i: 0
        });
        opt1 = burst.getPropByMod({
          propName: 'radius',
          i: 1
        });
        opt8 = burst.getPropByMod({
          propName: 'radius',
          i: 8
        });
        expect(opt0).toBe(20);
        expect(opt1).toBe(20);
        return expect(opt8).toBe(20);
      });
      return it('should work with another options object ->', function() {
        var burst, opt0, opt1, opt8;
        burst = new Burst({
          radius: 40,
          childOptions: {
            radius: 20
          }
        });
        opt0 = burst.getPropByMod({
          propName: 'radius',
          i: 0,
          from: 'o'
        });
        opt1 = burst.getPropByMod({
          propName: 'radius',
          i: 1,
          from: 'o'
        });
        opt8 = burst.getPropByMod({
          propName: 'radius',
          i: 8,
          from: 'o'
        });
        expect(opt0).toBe(40);
        expect(opt1).toBe(40);
        return expect(opt8).toBe(40);
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
      it('should calculate size based on largest transit + self radius #2', function() {
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
      return it('should call addBitOptions method', function() {
        var burst;
        burst = new Burst;
        spyOn(burst, 'addBitOptions');
        burst.calcSize();
        return expect(burst.addBitOptions).toHaveBeenCalled();
      });
    });
    describe('addBitOptions method ->', function() {
      return it('should set props on all transits', function() {
        var burst, center;
        burst = new Burst({
          radius: {
            0: 75
          },
          points: 2
        });
        return center = burst.props.center;
      });
    });
    describe('setProgress method ->', function() {
      return it('should setProgress on all transits', function() {
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
    });
    describe('run method ->', function() {
      it('should call super', function() {
        var burst;
        burst = new Burst({
          radius: {
            20: 50
          }
        });
        spyOn(Burst.__super__, 'run');
        burst.run();
        return expect(Burst.__super__.run).toHaveBeenCalled();
      });
      it('should call generateRandomAngle method if randomAngle was passed', function() {
        var burst;
        burst = new Burst({
          randomAngle: true
        });
        spyOn(burst, 'generateRandomAngle');
        burst.run();
        return expect(burst.generateRandomAngle).toHaveBeenCalled();
      });
      it('should not call generateRandomAngle method', function() {
        var burst;
        burst = new Burst({
          randomAngle: false
        });
        spyOn(burst, 'generateRandomAngle');
        burst.run();
        return expect(burst.generateRandomAngle).not.toHaveBeenCalled();
      });
      it('should call generateRandomRadius method if randomAngle was passed', function() {
        var burst;
        burst = new Burst({
          randomRadius: true
        });
        spyOn(burst, 'generateRandomRadius');
        burst.run();
        return expect(burst.generateRandomRadius).toHaveBeenCalled();
      });
      return it('should not call generateRandomRadius method', function() {
        var burst;
        burst = new Burst({
          randomRadius: false
        });
        spyOn(burst, 'generateRandomRadius');
        burst.run();
        return expect(burst.generateRandomRadius).not.toHaveBeenCalled();
      });
    });
    describe('generateRandomAngle method ->', function() {
      return it('should generate random angle based on randomness', function() {
        var angle, burst;
        burst = new Burst({
          randomAngle: .75
        });
        angle = burst.generateRandomAngle();
        expect(angle).toBeGreaterThan(45);
        return expect(angle).not.toBeGreaterThan(315);
      });
    });
    return describe('generateRandomRadius method ->', function() {
      return it('should generate random radius based on randomness', function() {
        var burst, radius;
        burst = new Burst({
          randomRadius: .75
        });
        radius = burst.generateRandomRadius();
        expect(radius).toBeGreaterThan(.24);
        return expect(radius).not.toBeGreaterThan(1);
      });
    });
  });

}).call(this);

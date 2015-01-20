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
          expect(burst.transits[0].angleRand).toBeDefined();
          return expect(burst.transits[1].angleRand).toBeDefined();
        });
      });
      describe('random radius ->', function() {
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
          expect(burst.transits[0].radiusRand).toBeDefined();
          return expect(burst.transits[1].radiusRand).toBeDefined();
        });
      });
      return describe('random sign ->', function() {
        return it('should calculate signRand for every transit ->', function() {
          var burst, sign;
          burst = new Burst({
            isSwirl: true
          });
          sign = burst.transits[0].signRand;
          expect(sign).toBeDefined();
          expect(sign === -1 || sign === 1).toBe(true);
          sign = burst.transits[1].signRand;
          expect(sign).toBeDefined();
          return expect(sign === -1 || sign === 1).toBe(true);
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
      it('should not call generateRandomRadius method', function() {
        var burst;
        burst = new Burst({
          randomRadius: false
        });
        spyOn(burst, 'generateRandomRadius');
        burst.run();
        return expect(burst.generateRandomRadius).not.toHaveBeenCalled();
      });
      it('should call generateSwirl method if isSwirl was passed', function() {
        var burst;
        burst = new Burst({
          isSwirl: true
        });
        spyOn(burst, 'generateSwirl');
        burst.run();
        return expect(burst.generateSwirl).toHaveBeenCalled();
      });
      return it('should not call generateSwirl method if isSwirl was not passed', function() {
        var burst;
        burst = new Burst({
          isSwirl: false
        });
        spyOn(burst, 'generateSwirl');
        burst.run();
        return expect(burst.generateSwirl).not.toHaveBeenCalled();
      });
    });
    describe('generateRandomAngle method ->', function() {
      return it('should generate random angle based on randomness', function() {
        var burst;
        burst = new Burst({
          randomAngle: .75
        });
        burst.generateRandomAngle(0);
        expect(burst.transits[0].angleRand).toBeGreaterThan(45);
        return expect(burst.transits[0].angleRand).not.toBeGreaterThan(315);
      });
    });
    describe('generateRandomRadius method ->', function() {
      return it('should generate random radius based on randomness', function() {
        var burst;
        burst = new Burst({
          randomRadius: .75
        });
        burst.generateRandomRadius(0);
        expect(burst.transits[0].radiusRand).toBeGreaterThan(.24);
        return expect(burst.transits[0].radiusRand).not.toBeGreaterThan(1);
      });
    });
    describe('getSwirl method ->', function() {
      return it('should calc swirl based on swirlFrequency and swirlSize props', function() {
        var burst, freq, sign, swirl1;
        burst = new Burst({
          isSwirl: true
        });
        swirl1 = burst.getSwirl(.5, 0);
        freq = Math.sin(burst.transits[0].swirlFrequency * .5);
        sign = burst.transits[0].signRand;
        return expect(swirl1).toBe(sign * burst.transits[0].swirlSize * freq);
      });
    });
    describe('generateSwirl method ->', function() {
      it('should generate simple swirl', function() {
        var burst;
        burst = new Burst({
          swirlSize: 3,
          swirlFrequency: 2
        });
        burst.generateSwirl(0);
        expect(burst.transits[0].swirlSize).toBe(3);
        return expect(burst.transits[0].swirlFrequency).toBe(2);
      });
      it('should generate rand swirl', function() {
        var burst;
        burst = new Burst({
          swirlSize: 'rand(10,20)',
          swirlFrequency: 'rand(3,7)'
        });
        burst.generateSwirl(0);
        expect(burst.transits[0].swirlSize).toBeGreaterThan(9);
        expect(burst.transits[0].swirlSize).not.toBeGreaterThan(20);
        expect(burst.transits[0].swirlFrequency).toBeGreaterThan(2);
        return expect(burst.transits[0].swirlFrequency).not.toBeGreaterThan(7);
      });
      it('should generate the same rand swirl if not array', function() {
        var burst, isEqual;
        burst = new Burst({
          swirlSize: 'rand(10,20)'
        });
        burst.generateSwirl(0);
        burst.generateSwirl(1);
        isEqual = burst.transits[0].swirlSize === burst.transits[1].swirlSize;
        return expect(isEqual).toBe(true);
      });
      it('should generate array swirl', function() {
        var burst;
        burst = new Burst({
          swirlSize: [3, 4],
          swirlFrequency: [5, 2, 1]
        });
        burst.generateSwirl(0);
        burst.generateSwirl(1);
        burst.generateSwirl(2);
        expect(burst.transits[0].swirlSize).toBe(3);
        expect(burst.transits[1].swirlSize).toBe(4);
        expect(burst.transits[2].swirlSize).toBe(3);
        expect(burst.transits[0].swirlFrequency).toBe(5);
        expect(burst.transits[1].swirlFrequency).toBe(2);
        return expect(burst.transits[2].swirlFrequency).toBe(1);
      });
      return it('should generate array swirl with randoms', function() {
        var burst;
        burst = new Burst({
          swirlSize: ['rand(1,3)', 2, 'rand(7,9)'],
          swirlFrequency: [1, 'rand(1,3)', 'rand(7,9)']
        });
        burst.generateSwirl(0);
        burst.generateSwirl(1);
        burst.generateSwirl(2);
        expect(burst.transits[0].swirlSize).toBeGreaterThan(0);
        expect(burst.transits[0].swirlSize).not.toBeGreaterThan(3);
        expect(burst.transits[1].swirlSize).toBe(2);
        expect(burst.transits[2].swirlSize).toBeGreaterThan(6);
        expect(burst.transits[2].swirlSize).not.toBeGreaterThan(9);
        expect(burst.transits[0].swirlFrequency).toBe(1);
        expect(burst.transits[1].swirlFrequency).toBeGreaterThan(0);
        expect(burst.transits[1].swirlFrequency).not.toBeGreaterThan(3);
        expect(burst.transits[2].swirlFrequency).toBeGreaterThan(6);
        return expect(burst.transits[2].swirlFrequency).not.toBeGreaterThan(9);
      });
    });
    return describe('draw method ->', function() {
      it('should set x/y coordinates on every transit', function() {
        var burst;
        burst = new Burst;
        burst.draw();
        expect(burst.transits[0].props.x).not.toBe('0px');
        expect(burst.transits[1].props.x).not.toBe('0px');
        expect(burst.transits[2].props.x).not.toBe('0px');
        expect(burst.transits[3].props.x).not.toBe('0px');
        return expect(burst.transits[4].props.x).not.toBe('0px');
      });
      it('should not call drawEl method', function() {
        var burst;
        burst = new Burst;
        spyOn(burst, 'drawEl');
        burst.draw();
        return expect(burst.drawEl).toHaveBeenCalled();
      });
      return it('should pass the current progress and i to getSwirl method', function() {
        var burst;
        burst = new Burst({
          isSwirl: true
        });
        spyOn(burst, 'getSwirl');
        burst.draw(.5);
        return expect(burst.getSwirl).toHaveBeenCalledWith(.5, 0);
      });
    });
  });

}).call(this);

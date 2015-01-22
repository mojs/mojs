(function() {
  var Swirl, Transit, tr;

  Transit = mojs.Transit;

  Swirl = mojs.Swirl;

  tr = new Transit;

  describe('Swirl ->', function() {
    describe('extension ->', function() {
      it('should extend Transit class', function() {
        var swirl;
        swirl = new Swirl;
        return expect(swirl instanceof Transit).toBe(true);
      });
      return it('should have skipPropsDelta', function() {
        var swirl;
        swirl = new Swirl;
        expect(swirl.skipPropsDelta.x).toBe(1);
        return expect(swirl.skipPropsDelta.y).toBe(1);
      });
    });
    describe('position calc ->', function() {
      it('should calc position radius', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 20
          }
        });
        return expect(swirl.positionDelta.radius).toBe(Math.sqrt(10 * 10 + 20 * 20));
      });
      it('should calc position angle', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          }
        });
        return expect(swirl.positionDelta.angle).toBe(135);
      });
      it('should save startX and StartY values', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            10: 10
          }
        });
        expect(swirl.positionDelta.x.start).toBe(0);
        return expect(swirl.positionDelta.y.start).toBe(10);
      });
      it('should set start position anyways', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: 0,
          isRunLess: true
        });
        expect(swirl.props.x).toBe('0.0000px');
        return expect(swirl.props.y).toBe('0.0000px');
      });
      return it('should call super extendDefaults method', function() {
        var swirl;
        swirl = new Swirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Swirl.__super__, 'extendDefaults');
        swirl.extendDefaults();
        return expect(Swirl.__super__.extendDefaults).toHaveBeenCalled();
      });
    });
    describe('setProgress ->', function() {
      it('should call super setProgress method', function() {
        var swirl;
        swirl = new Swirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Swirl.__super__, 'setProgress');
        swirl.setProgress(.5);
        return expect(Swirl.__super__.setProgress).toHaveBeenCalledWith(.5);
      });
      it('should set x/y progress', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isRunLess: true,
          isSwirlLess: true
        });
        swirl.setProgress(.5);
        expect(swirl.props.x).toBe('5.0000px');
        return expect(swirl.props.y).toBe('5.0000px');
      });
      it('should set x/y progress', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isRunLess: true,
          isSwirlLess: true
        });
        swirl.setProgress(1);
        expect(swirl.props.x).toBe('10.0000px');
        return expect(swirl.props.y).toBe('10.0000px');
      });
      it('should respect angleShift value', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isRunLess: true,
          isSwirlLess: true,
          angleShift: 90
        });
        swirl.setProgress(.5);
        expect(swirl.props.x).toBe('-5.0000px');
        return expect(swirl.props.y).toBe('5.0000px');
      });
      it('should respect radiusScale value', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isRunLess: true,
          isSwirlLess: true,
          radiusScale: .5
        });
        swirl.setProgress(1);
        expect(swirl.props.x).toBe('5.0000px');
        return expect(swirl.props.y).toBe('5.0000px');
      });
      return it('should set add swirl if option was passed', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isRunLess: true
        });
        swirl.setProgress(.5);
        expect(swirl.props.x).not.toBe('5.0000px');
        return expect(swirl.props.y).not.toBe('5.0000px');
      });
    });
    describe('generateSwirl method ->', function() {
      it('should generate simple swirl', function() {
        var swirl;
        swirl = new Swirl({
          swirlSize: 3,
          swirlFrequency: 2
        });
        swirl.generateSwirl();
        expect(swirl.props.swirlSize).toBe(3);
        return expect(swirl.props.swirlFrequency).toBe(2);
      });
      it('should generate rand swirl', function() {
        var swirl;
        swirl = new Swirl({
          swirlSize: 'rand(10,20)',
          swirlFrequency: 'rand(3,7)'
        });
        swirl.generateSwirl();
        expect(swirl.props.swirlSize).toBeGreaterThan(9);
        return expect(swirl.props.swirlSize).not.toBeGreaterThan(20);
      });
      return it('should not generate simple swirl is isSwirlLess was passed', function() {
        var swirl;
        swirl = new Swirl({
          isSwirlLess: true
        });
        spyOn(swirl, 'generateSwirl');
        swirl.init();
        return expect(swirl.generateSwirl).not.toHaveBeenCalled();
      });
    });
    return describe('getSwirl method ->', function() {
      return it('should calc swirl based on swirlFrequency and swirlSize props', function() {
        var freq, sign, swirl, swirl1;
        swirl = new Swirl;
        swirl1 = swirl.getSwirl(.5);
        freq = Math.sin(swirl.props.swirlFrequency * .5);
        sign = swirl.props.signRand;
        return expect(swirl1).toBe(sign * swirl.props.swirlSize * freq);
      });
    });
  });

}).call(this);

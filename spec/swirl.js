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
      it('should have skipPropsDelta', function() {
        var swirl;
        swirl = new Swirl;
        expect(swirl.skipPropsDelta.x).toBe(1);
        return expect(swirl.skipPropsDelta.y).toBe(1);
      });
      return it('should have angleShift value', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirlLess: true,
          angleShift: 90
        });
        return expect(swirl._props.angleShift).toBe(90);
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
      it('should calc position angle', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: -10
          },
          y: {
            0: -10
          }
        });
        return expect(swirl.positionDelta.angle).toBe - 45;
      });
      it('should calc position angle', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 0
          },
          y: {
            0: -10
          }
        });
        return expect(swirl.positionDelta.angle).toBe(0);
      });
      it('should calc position angle', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: -10
          },
          y: {
            0: 0
          }
        });
        return expect(swirl.positionDelta.angle).toBe(270);
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
          y: 0
        });
        expect(swirl._props.x).toBe('0.0000px');
        return expect(swirl._props.y).toBe('0.0000px');
      });
      return it('should call super _extendDefaults method', function() {
        var swirl;
        swirl = new Swirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Swirl.__super__, '_extendDefaults');
        swirl._extendDefaults();
        return expect(Swirl.__super__._extendDefaults).toHaveBeenCalled();
      });
    });
    describe('_setProgress ->', function() {
      it('should call super _setProgress method', function() {
        var swirl;
        swirl = new Swirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Swirl.__super__, '_setProgress');
        swirl._setProgress(.5);
        return expect(Swirl.__super__._setProgress).toHaveBeenCalledWith(.5);
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
          isSwirlLess: true
        });
        swirl._setProgress(.5);
        expect(swirl._props.x).toBe('5.0000px');
        return expect(swirl._props.y).toBe('5.0000px');
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
          isSwirlLess: true
        });
        swirl._setProgress(1);
        expect(swirl._props.x).toBe('10.0000px');
        return expect(swirl._props.y).toBe('10.0000px');
      });
      it('should set negative x/y progress', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: '-10'
          },
          y: {
            0: '-10'
          },
          isSwirlLess: true
        });
        swirl._setProgress(1);
        expect(swirl._props.x).toBe('-10.0000px');
        return expect(swirl._props.y).toBe('-10.0000px');
      });
      it('should set plain x/y progress if foreign context', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          ctx: tr.ctx,
          isSwirlLess: true
        });
        swirl._setProgress(1);
        expect(swirl._props.x + '').toBe('10.0000');
        return expect(swirl._props.y + '').toBe('10.0000');
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
          isSwirlLess: true,
          radiusScale: .5
        });
        swirl._setProgress(1);
        expect(swirl._props.x).toBe('5.0000px');
        return expect(swirl._props.y).toBe('5.0000px');
      });
      it('should not add swirl', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          }
        });
        swirl._setProgress(.5);
        expect(swirl._props.x).toBe('5.0000px');
        return expect(swirl._props.y).toBe('5.0000px');
      });
      return it('should add swirl if isSwirl', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirl: true
        });
        swirl._setProgress(.5);
        expect(swirl._props.x).not.toBe('5.0000px');
        return expect(swirl._props.y).not.toBe('5.0000px');
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
        expect(swirl._props.swirlSize).toBe(3);
        return expect(swirl._props.swirlFrequency).toBe(2);
      });
      it('should generate rand swirl', function() {
        var swirl;
        swirl = new Swirl({
          swirlSize: 'rand(10,20)',
          swirlFrequency: 'rand(3,7)'
        });
        swirl.generateSwirl();
        expect(swirl._props.swirlSize).toBeGreaterThan(9);
        return expect(swirl._props.swirlSize).not.toBeGreaterThan(20);
      });
      return it('should not generate simple swirl is isSwirlLess was passed', function() {
        var swirl;
        swirl = new Swirl({
          isSwirlLess: true
        });
        spyOn(swirl, 'generateSwirl');
        swirl._vars();
        return expect(swirl.generateSwirl).not.toHaveBeenCalled();
      });
    });
    return describe('getSwirl method ->', function() {
      return it('should calc swirl based on swirlFrequency and swirlSize props', function() {
        var freq, sign, swirl, swirl1;
        swirl = new Swirl;
        swirl1 = swirl.getSwirl(.5);
        freq = Math.sin(swirl._props.swirlFrequency * .5);
        sign = swirl._props.signRand;
        return expect(swirl1).toBe(sign * swirl._props.swirlSize * freq);
      });
    });
  });

}).call(this);

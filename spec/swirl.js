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
      return it('should have angleShift value', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirl: false,
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
        return expect(swirl._posData.radius).toBe(Math.sqrt(10 * 10 + 20 * 20));
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
        return expect(swirl._posData.angle).toBe(135);
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
        return expect(swirl._posData.angle).toBe - 45;
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
        return expect(swirl._posData.angle).toBe(0);
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
        return expect(swirl._posData.angle).toBe(270);
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
        expect(swirl._posData.x.start).toBe(0);
        return expect(swirl._posData.y.start).toBe(10);
      });
      it('should set start position anyways', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: 0,
          isIt: 1
        });
        expect(swirl._props.x).toBe('0px');
        return expect(swirl._props.y).toBe('0px');
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
        spyOn(Swirl.prototype, '_extendDefaults').and.callThrough();
        swirl._extendDefaults();
        return expect(Swirl.prototype._extendDefaults).toHaveBeenCalled();
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
        spyOn(Swirl.prototype, '_setProgress').and.callThrough();
        swirl._setProgress(.5);
        return expect(Swirl.prototype._setProgress).toHaveBeenCalledWith(.5);
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
          isSwirl: false
        });
        swirl._setProgress(.4);
        swirl._setProgress(.5);
        expect(parseInt(swirl._props.x, 10)).toBe(5);
        return expect(parseInt(swirl._props.y, 10)).toBe(5);
      });
      it('should set x/y progress regarding angleShift', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirl: false,
          angleShift: 90
        });
        swirl._setProgress(.5);
        expect(parseInt(swirl._props.x, 10)).toBe(-5);
        return expect(parseInt(swirl._props.y, 10)).toBe(5);
      });
      it('should set x/y progress regarding delta angleShift', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirl: false,
          angleShift: {
            0: 180
          }
        });
        swirl._setProgress(.5);
        swirl._setProgress(.5);
        expect(parseInt(swirl._props.x, 10)).toBe(-5);
        return expect(parseInt(swirl._props.y, 10)).toBe(5);
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
          isSwirl: false
        });
        swirl._setProgress(1);
        expect(parseInt(swirl._props.x, 10)).toBe(10);
        return expect(parseInt(swirl._props.y, 10)).toBe(10);
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
          isSwirl: false
        });
        swirl._setProgress(1);
        expect(parseInt(swirl._props.x, 10)).toBe(-10);
        return expect(parseInt(swirl._props.y, 10)).toBe(-10);
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
          isSwirl: false
        });
        swirl._setProgress(.5);
        swirl._setProgress(1);
        expect(swirl._props.x.toFixed(2)).toBe('10.00');
        return expect(swirl._props.y.toFixed(2)).toBe('10.00');
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
          isSwirl: false,
          radiusScale: .5
        });
        swirl._setProgress(.5);
        swirl._setProgress(1);
        expect(parseInt(swirl._props.x, 10)).toBe(5);
        return expect(parseInt(swirl._props.y, 10)).toBe(5);
      });
      it('should not add swirl', function() {
        var swirl;
        swirl = new Swirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirl: false
        });
        swirl._setProgress(.5);
        expect(parseInt(swirl._props.x, 10)).toBe(5);
        return expect(parseInt(swirl._props.y, 10)).toBe(5);
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
    return describe('_getSwirl method ->', function() {
      return it('should calc swirl based on swirlFrequency and swirlSize props', function() {
        var freq, sign, swirl, swirl1;
        swirl = new Swirl;
        swirl1 = swirl._getSwirl(.5);
        freq = Math.sin(swirl._props.swirlFrequency * .5);
        sign = swirl._props.signRand;
        return expect(swirl1).toBe(sign * swirl._props.swirlSize * freq);
      });
    });
  });

}).call(this);

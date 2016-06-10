(function() {
  var Module, Shape, ShapeSwirl, tr;

  Shape = mojs.Shape;

  ShapeSwirl = mojs.ShapeSwirl;

  Module = mojs.Module;

  tr = new Shape;

  describe('ShapeSwirl ->', function() {
    describe('extension ->', function() {
      it('should extend Shape class', function() {
        var swirl;
        swirl = new ShapeSwirl;
        return expect(swirl instanceof Shape).toBe(true);
      });
      return it('should have degreeShift value', function() {
        var swirl;
        swirl = new ShapeSwirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirl: false,
          degreeShift: 90
        });
        return expect(swirl._props.degreeShift).toBe(90);
      });
    });
    describe('_calcPosData method ->', function() {
      it('should calc position radius', function() {
        var swirl;
        swirl = new ShapeSwirl({
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
        swirl = new ShapeSwirl({
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
        swirl = new ShapeSwirl({
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
        swirl = new ShapeSwirl({
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
        swirl = new ShapeSwirl({
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
        swirl = new ShapeSwirl({
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
      return it('should set start position anyways', function() {
        var swirl;
        swirl = new ShapeSwirl({
          x: {
            0: 10
          },
          y: 0
        });
        expect(swirl._props.x).toBe('0px');
        return expect(swirl._props.y).toBe('0px');
      });
    });
    describe('_extendDefaults method ->', function() {
      it('should call super _extendDefaults method', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Module.prototype, '_extendDefaults').and.callThrough();
        swirl._extendDefaults();
        return expect(Module.prototype._extendDefaults).toHaveBeenCalled();
      });
      return it('should call _calcPosData method', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(swirl, '_calcPosData').and.callThrough();
        swirl._extendDefaults();
        return expect(swirl._calcPosData).toHaveBeenCalled();
      });
    });
    describe('_tuneNewOptions method ->', function() {
      it('should call super _tuneNewOptions method', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Module.prototype, '_tuneNewOptions').and.callThrough();
        swirl._tuneNewOptions({});
        return expect(Module.prototype._tuneNewOptions).toHaveBeenCalled();
      });
      it('should not call super _tuneNewOptions method if no o', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(Module.prototype, '_tuneNewOptions').and.callThrough();
        swirl._tuneNewOptions();
        return expect(Module.prototype._tuneNewOptions).not.toHaveBeenCalled();
      });
      it('should call _calcPosData method if x changes', function() {
        var swirl;
        swirl = new ShapeSwirl({
          x: 200
        });
        spyOn(swirl, '_calcPosData').and.callThrough();
        swirl._tuneNewOptions({
          x: 300
        });
        return expect(swirl._calcPosData).toHaveBeenCalled();
      });
      it('should call _calcPosData method if y changes', function() {
        var swirl;
        swirl = new ShapeSwirl({
          y: 200
        });
        spyOn(swirl, '_calcPosData').and.callThrough();
        swirl._tuneNewOptions({
          y: 300
        });
        return expect(swirl._calcPosData).toHaveBeenCalled();
      });
      return it('should not call _calcPosData method if no x/y changes', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(swirl, '_calcPosData').and.callThrough();
        swirl._tuneNewOptions({
          radius: 200
        });
        return expect(swirl._calcPosData).not.toHaveBeenCalled();
      });
    });
    describe('_declareDefaults method ->', function() {
      it('should call super _declareDefaults', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(ShapeSwirl.prototype, '_declareDefaults').and.callThrough();
        swirl._declareDefaults();
        return expect(ShapeSwirl.prototype._declareDefaults).toHaveBeenCalled();
      });
      it('should add swirlSize default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        return expect(swirl._defaults.swirlSize).toBe(10);
      });
      it('should add swirlFrequency default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        return expect(swirl._defaults.swirlFrequency).toBe(3);
      });
      it('should add isSwirl default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        return expect(swirl._defaults.isSwirl).toBe(true);
      });
      it('should add pathScale default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        return expect(swirl._defaults.pathScale).toBe(1);
      });
      it('should add degreeShift default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        return expect(swirl._defaults.degreeShift).toBe(0);
      });
      it('should modify radius default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          fill: 'cyan'
        });
        return expect(swirl._defaults.radius).toBe(5);
      });
      it('should modify scale default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          fill: 'cyan'
        });
        return expect(swirl._defaults.scale[1]).toBe(0);
      });
      it('should modify x default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          fill: 'cyan'
        });
        return expect(swirl._defaults.x).toBe(0);
      });
      it('should modify x default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          fill: 'cyan'
        });
        return expect(swirl._defaults.y).toBe(0);
      });
      it('should add direction default', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        return expect(swirl._defaults.direction).toBe(1);
      });
      return it('should have isWithShape', function() {
        var swirl;
        swirl = new ShapeSwirl({
          fill: 'cyan'
        });
        return expect(swirl._defaults.isWithShape).toBe(true);
      });
    });
    describe('_setProgress ->', function() {
      it('should svae progress', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        swirl._progress = -1;
        swirl._setProgress(.5);
        return expect(swirl._progress).toBe(.5);
      });
      it('should call _calcCurrentProps method', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(swirl, '_calcCurrentProps').and.callThrough();
        swirl._setProgress(.5, .35);
        return expect(swirl._calcCurrentProps).toHaveBeenCalledWith(.5, .35);
      });
      it('should call _draw method', function() {
        var swirl;
        swirl = new ShapeSwirl({
          radius: [
            {
              20: 50
            }, 20
          ]
        });
        spyOn(swirl, '_draw').and.callThrough();
        swirl._setProgress(.5);
        return expect(swirl._draw).toHaveBeenCalledWith(.5);
      });
      it('should set x/y progress', function() {
        var swirl;
        swirl = new ShapeSwirl({
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
      it('should set x/y progress regarding degreeShift', function() {
        var swirl, x;
        swirl = new ShapeSwirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirl: false,
          degreeShift: 90
        });
        swirl._setProgress(.5);
        x = parseFloat(swirl._props.x).toFixed(2);
        expect(x).toBe('-5.00');
        return expect(parseInt(swirl._props.y, 10)).toBe(5);
      });
      it('should set x/y progress regarding delta degreeShift', function() {
        var swirl, x;
        swirl = new ShapeSwirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirl: false,
          degreeShift: {
            0: 180
          }
        });
        swirl._setProgress(.5);
        x = parseFloat(swirl._props.x).toFixed(2);
        expect(x).toBe('-5.00');
        return expect(parseInt(swirl._props.y, 10)).toBe(5);
      });
      it('should set x/y progress', function() {
        var swirl;
        swirl = new ShapeSwirl({
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
        var swirl, x, y;
        swirl = new ShapeSwirl({
          x: {
            0: '-10'
          },
          y: {
            0: '-10'
          },
          isSwirl: false
        });
        swirl._setProgress(1);
        x = parseFloat(swirl._props.x).toFixed(2);
        expect(x).toBe('-10.00');
        y = parseFloat(swirl._props.y).toFixed(2);
        return expect(y).toBe('-10.00');
      });
      it('should respect pathScale value', function() {
        var swirl;
        swirl = new ShapeSwirl({
          x: {
            0: 10
          },
          y: {
            0: 10
          },
          isSwirl: false,
          pathScale: .5
        });
        swirl._setProgress(1);
        expect(parseInt(swirl._props.x, 10)).toBe(5);
        return expect(parseInt(swirl._props.y, 10)).toBe(5);
      });
      it('should not add swirl', function() {
        var swirl;
        swirl = new ShapeSwirl({
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
        swirl = new ShapeSwirl({
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
    describe('_getSwirl method ->', function() {
      return it('should calc swirl based on swirlFrequency and swirlSize props', function() {
        var freq, sign, swirl, swirl1;
        swirl = new ShapeSwirl;
        swirl1 = swirl._getSwirl(.5);
        freq = Math.sin(swirl._props.swirlFrequency * .5);
        sign = swirl._props.direction;
        return expect(swirl1).toBe(sign * swirl._props.swirlSize * freq);
      });
    });
    describe('_draw method ->', function() {
      it('should call super', function() {
        var swirl;
        swirl = new ShapeSwirl;
        spyOn(Shape.prototype, '_draw');
        swirl._draw();
        return expect(Shape.prototype._draw).toHaveBeenCalled();
      });
      return it('should not call super if !isWithShape', function() {
        var swirl;
        swirl = new ShapeSwirl({
          isWithShape: false
        });
        spyOn(Shape.prototype, '_draw');
        spyOn(Shape.prototype, '_drawEl');
        swirl._draw();
        expect(Shape.prototype._draw).not.toHaveBeenCalled();
        return expect(Shape.prototype._drawEl).toHaveBeenCalled();
      });
    });
    return describe('_calcSwirlXY method ->', function() {
      it('should set values without exponintail values', function() {
        var swirl;
        swirl = new ShapeSwirl({
          x: {
            0: 250
          },
          y: {
            0: 250
          }
        });
        swirl._calcSwirlXY(.000000001);
        swirl._calcSwirlXY(.000000001);
        expect(swirl._props.x).not.toMatch(/e/);
        return expect(swirl._props.y).not.toMatch(/e/);
      });
      return it('should set negative values without exponintail values', function() {
        var swirl;
        swirl = new ShapeSwirl({
          x: {
            0: -250
          },
          y: {
            0: -250
          }
        });
        swirl._calcSwirlXY(.000000001);
        swirl._calcSwirlXY(.000000001);
        expect(swirl._props.x).not.toMatch(/e/);
        return expect(swirl._props.y).not.toMatch(/e/);
      });
    });
  });

}).call(this);

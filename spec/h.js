(function() {
  var h;

  h = mojs.helpers;

  describe('Helpers ->', function() {
    describe('prefix', function() {
      return it('should have prefix', function() {
        expect(h.prefix).toBeDefined();
        expect(h.prefix.js).toBeDefined();
        expect(h.prefix.css).toBeDefined();
        expect(h.prefix.lowercase).toBeDefined();
        return expect(h.prefix.dom).toBeDefined();
      });
    });
    describe('browsers detection', function() {
      return it('should have browsers flag', function() {
        expect(h.isFF).toBeDefined();
        return expect(h.isIE).toBeDefined();
      });
    });
    return describe('methods ->', function() {
      describe('strToArr method', function() {
        it('should parse string to array', function() {
          return expect(h.strToArr('200 100').join(' ')).toBe('200 100');
        });
        it('should parse number to array', function() {
          return expect(h.strToArr(200).join(' ')).toBe('200');
        });
        it('should parse string with multiple spaces to array', function() {
          return expect(h.strToArr('200   100').join(' ')).toBe('200 100');
        });
        it('should trim string before parse', function() {
          return expect(h.strToArr(' 200   100 ').join(' ')).toBe('200 100');
        });
        it('should return array of numbers', function() {
          return expect(h.strToArr(' 200.5   100 ')[0]).toBe(200.5);
        });
        return it('should throw if parsing fails', function() {
          return expect(function() {
            return h.strToArr(' 200.5 ,  100 ');
          }).toThrow();
        });
      });
      describe('normDashArrays method', function() {
        it('should normalize two inconsistent dash arrays', function() {
          var arr1, arr2;
          arr1 = [100, 500];
          arr2 = [150, 200, 300.7];
          h.normDashArrays(arr1, arr2);
          return expect(arr1.join(' ')).toBe('100 500 0');
        });
        it('should normalize MODIFY passed arrays', function() {
          var arr1, arr2;
          arr1 = [100];
          arr2 = [150, 200, 25];
          h.normDashArrays(arr1, arr2);
          return expect(arr1.join(' ')).toBe('100 0 0');
        });
        it('should normalize two inconsistent dash arrays #2', function() {
          var arr1, arr2;
          arr1 = [100, 500];
          arr2 = [150];
          h.normDashArrays(arr1, arr2);
          return expect(arr1.join(' ')).toBe('100 500');
        });
        it('should normalize two inconsistent dash arrays #3', function() {
          var arr1, arr2;
          arr1 = [100];
          arr2 = [150, 200, 17.5];
          h.normDashArrays(arr1, arr2);
          return expect(arr2.join(' ')).toBe('150 200 17.5');
        });
        return it('should should throw if one arg or nothing was passed', function() {
          expect(function() {
            return h.normDashArrays([100, 500]);
          }).toThrow();
          return expect(function() {
            return h.normDashArrays();
          }).toThrow();
        });
      });
      describe('isArray method', function() {
        return it('should check if variable is array', function() {
          expect(h.isArray([])).toBe(true);
          expect(h.isArray({})).toBe(false);
          expect(h.isArray('')).toBe(false);
          expect(h.isArray(2)).toBe(false);
          expect(h.isArray(NaN)).toBe(false);
          expect(h.isArray(null)).toBe(false);
          return expect(h.isArray()).toBe(false);
        });
      });
      describe('calcArrDelta method', function() {
        it('should should throw if on of the args are not arrays', function() {
          expect(function() {
            return h.calcArrDelta([200, 300, 100], 'a');
          }).toThrow();
          return expect(function() {
            return h.calcArrDelta('a', [200, 300, 100]);
          }).toThrow();
        });
        it('should should throw if less then 2 arrays passed', function() {
          expect(function() {
            return h.calcArrDelta([200, 300, 100]);
          }).toThrow();
          return expect(function() {
            return h.calcArrDelta();
          }).toThrow();
        });
        return it('should calculate delta of two arrays', function() {
          var arr1, arr2, delta;
          arr1 = [200, 300, 100];
          arr2 = [250, 150, 0];
          delta = h.calcArrDelta(arr1, arr2);
          return expect(delta.join(' ')).toBe('50 -150 -100');
        });
      });
      describe('getRadialPoint', function() {
        it('should calculate radial point', function() {
          var point;
          point = h.getRadialPoint({
            radius: 50,
            angle: 90,
            center: {
              x: 50,
              y: 50
            }
          });
          expect(point.x).toBe(100);
          return expect(point.y).toBe(50);
        });
        it('should return false if 1 of 3 options missed', function() {
          var point;
          point = h.getRadialPoint({
            radius: 50,
            angle: 90
          });
          return expect(point).toBeFalsy();
        });
        it('should return false only if 1 of 3 options missed but not falsy', function() {
          var point;
          point = h.getRadialPoint({
            radius: 0,
            angle: 90,
            center: {
              x: 0,
              y: 0
            }
          });
          return expect(point).toBeTruthy();
        });
        return it('options should have default empty object', function() {
          var point;
          point = h.getRadialPoint();
          expect(point).toBeFalsy();
          return expect(h.getRadialPoint).not.toThrow();
        });
      });
      return describe('color parsing makeColorObj', function() {
        it('should have shortColors map', function() {
          return expect(h.shortColors).toBeDefined();
        });
        it('should have div node', function() {
          return expect(h.div.tagName.toLowerCase()).toBe('div');
        });
        it('should parse 3 hex color', function() {
          var colorObj;
          colorObj = h.makeColorObj('#f0f');
          expect(colorObj.r).toBe(255);
          expect(colorObj.g).toBe(0);
          expect(colorObj.b).toBe(255);
          return expect(colorObj.a).toBe(1);
        });
        it('should parse 6 hex color', function() {
          var colorObj;
          colorObj = h.makeColorObj('#0000ff');
          expect(colorObj.r).toBe(0);
          expect(colorObj.g).toBe(0);
          expect(colorObj.b).toBe(255);
          return expect(colorObj.a).toBe(1);
        });
        it('should parse color shorthand', function() {
          var colorObj;
          colorObj = h.makeColorObj('deeppink');
          expect(colorObj.r).toBe(255);
          expect(colorObj.g).toBe(20);
          expect(colorObj.b).toBe(147);
          return expect(colorObj.a).toBe(1);
        });
        it('should parse rgb color', function() {
          var colorObj;
          colorObj = h.makeColorObj('rgb(200,100,0)');
          expect(colorObj.r).toBe(200);
          expect(colorObj.g).toBe(100);
          expect(colorObj.b).toBe(0);
          return expect(colorObj.a).toBe(1);
        });
        it('should parse rgba color', function() {
          var colorObj;
          colorObj = h.makeColorObj('rgba(0,200,100,.1)');
          expect(colorObj.r).toBe(0);
          expect(colorObj.g).toBe(200);
          expect(colorObj.b).toBe(100);
          return expect(colorObj.a).toBe(.1);
        });
        return it('should parse rgba color with float starting by 0', function() {
          var colorObj;
          colorObj = h.makeColorObj('rgba(0,200,100,0.5)');
          expect(colorObj.r).toBe(0);
          expect(colorObj.g).toBe(200);
          expect(colorObj.b).toBe(100);
          return expect(colorObj.a).toBe(.5);
        });
      });
    });
  });

}).call(this);

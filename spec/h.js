(function() {
  var h;

  h = mojs.helpers;

  describe('Helpers ->', function() {
    it('should have logBadgeCss', function() {
      return expect(h.logBadgeCss).toBeDefined();
    });
    it('should have RAD_TO_DEG CONSTANT', function() {
      return expect(h.RAD_TO_DEG).toBe(180 / Math.PI);
    });
    it('should have remBase', function() {
      return expect(typeof h.remBase).toBe('number');
    });
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
        expect(h.isIE).toBeDefined();
        return expect(h.isOldOpera).toBeDefined();
      });
    });
    describe('tween related map ->', function() {
      return it('should be a map of tween related options ->', function() {
        var mapLen;
        expect(h.chainOptionMap.duration).toBe(1);
        expect(h.chainOptionMap.delay).toBe(1);
        expect(h.chainOptionMap.repeat).toBe(1);
        expect(h.chainOptionMap.easing).toBe(1);
        expect(h.chainOptionMap.yoyo).toBe(1);
        expect(h.chainOptionMap.onStart).toBe(1);
        expect(h.chainOptionMap.onComplete).toBe(1);
        expect(h.chainOptionMap.onCompleteChain).toBe(1);
        expect(h.chainOptionMap.onUpdate).toBe(1);
        expect(h.chainOptionMap.points).toBe(1);
        mapLen = Object.keys(h.chainOptionMap).length;
        return expect(mapLen).toBe(10);
      });
    });
    describe('pure tween props ->', function() {
      return it('should be a map of tween related options ->', function() {
        expect(h.tweenOptionMap.duration).toBe(1);
        expect(h.tweenOptionMap.delay).toBe(1);
        expect(h.tweenOptionMap.repeat).toBe(1);
        expect(h.tweenOptionMap.easing).toBe(1);
        expect(h.tweenOptionMap.yoyo).toBe(1);
        return expect(Object.keys(h.tweenOptionMap).length).toBe(5);
      });
    });
    describe('pure callbacks props ->', function() {
      return it('should be a map of callback related options ->', function() {
        expect(h.callbacksMap.onStart).toBe(1);
        expect(h.callbacksMap.onUpdate).toBe(1);
        expect(h.callbacksMap.onComplete).toBe(1);
        expect(h.callbacksMap.onCompleteChain).toBe(1);
        return expect(Object.keys(h.callbacksMap).length).toBe(4);
      });
    });
    return describe('methods ->', function() {
      describe('clamp method', function() {
        return it('should clamp value to max and min', function() {
          expect(h.clamp(10, 0, 5)).toBe(5);
          expect(h.clamp(-10, 0, 5)).toBe(0);
          return expect(h.clamp(2, 0, 5)).toBe(2);
        });
      });
      describe('extend method', function() {
        return it('should extend object by other one', function() {
          var obj1, obj2;
          obj1 = {
            a: 1
          };
          obj2 = {
            b: 1
          };
          h.extend(obj1, obj2);
          expect(obj1.a).toBe(1);
          expect(obj1.b).toBe(1);
          expect(obj2.a).not.toBeDefined();
          return expect(obj2.b).toBe(1);
        });
      });
      describe('parseRand method', function() {
        it('should get random number from string', function() {
          var rand;
          rand = h.parseRand('rand(10,20)');
          expect(typeof rand).toBe('number');
          expect(rand).toBeGreaterThan(9);
          return expect(rand).not.toBeGreaterThan(20);
        });
        return it('should get random number with units', function() {
          var rand;
          rand = h.parseRand('rand(10%,20%)');
          expect(parseFloat(rand)).toBeGreaterThan(9);
          expect(parseFloat(rand)).not.toBeGreaterThan(20);
          return expect(rand.match(/\%/)).toBeTruthy();
        });
      });
      describe('parseIfRand method', function() {
        it('should get random number from string if it is rand', function() {
          var rand;
          rand = h.parseIfRand('rand(10,20)');
          expect(typeof rand).toBe('number');
          expect(rand).toBeGreaterThan(9);
          return expect(rand).not.toBeGreaterThan(20);
        });
        return it('should return the value if it is not a string', function() {
          var rand;
          rand = h.parseIfRand(20);
          expect(typeof rand).toBe('number');
          return expect(rand).toBe(20);
        });
      });
      describe('rand method', function() {
        it('should return random digit form range', function() {
          expect(h.rand(10, 20)).toBeGreaterThan(9);
          return expect(h.rand(10, 20)).not.toBeGreaterThan(20);
        });
        it('should work with negative numbers', function() {
          expect(h.rand(-10, -20)).toBeGreaterThan(-20);
          return expect(h.rand(-10, -20)).not.toBeGreaterThan(-10);
        });
        it('should work with mixed numbers', function() {
          expect(h.rand(-10, 20)).toBeGreaterThan(-10);
          return expect(h.rand(-10, 20)).not.toBeGreaterThan(20);
        });
        return it('should work with float numbers', function() {
          expect(h.rand(.2, .9)).toBeGreaterThan(.1);
          return expect(h.rand(.2, .9)).not.toBeGreaterThan(.9);
        });
      });
      describe('getDelta method', function() {
        describe('numeric values ->', function() {
          it('should calculate delta', function() {
            var delta;
            delta = h.parseDelta('radius', {
              25: 75
            });
            expect(delta.start).toBe(25);
            expect(delta.delta).toBe(50);
            return expect(delta.type).toBe('number');
          });
          it('should calculate delta with string arguments', function() {
            var delta;
            delta = h.parseDelta('radius', {
              25: 75
            });
            expect(delta.start).toBe(25);
            return expect(delta.delta).toBe(50);
          });
          it('should calculate delta with float arguments', function() {
            var delta;
            delta = h.parseDelta('radius', {
              '25.50': 75.50
            });
            expect(delta.start).toBe(25.5);
            return expect(delta.delta).toBe(50);
          });
          it('should calculate delta with negative start arguments', function() {
            var delta;
            delta = h.parseDelta('radius', {
              '-25.50': 75.50
            });
            expect(delta.start).toBe(-25.5);
            return expect(delta.delta).toBe(101);
          });
          return it('should calculate delta with negative end arguments', function() {
            var delta;
            delta = h.parseDelta('radius', {
              '25.50': -75.50
            });
            expect(delta.start).toBe(25.5);
            expect(delta.end).toBe(-75.5);
            return expect(delta.delta).toBe(-101);
          });
        });
        describe('color values ->', function() {
          it('should calculate color delta', function() {
            var delta;
            delta = h.parseDelta('stroke', {
              '#000': 'rgb(255,255,255)'
            });
            expect(delta.start.r).toBe(0);
            expect(delta.end.r).toBe(255);
            expect(delta.delta.r).toBe(255);
            return expect(delta.type).toBe('color');
          });
          return it('should ignore stroke-linecap prop, use start prop and warn', function() {
            var delta;
            spyOn(console, 'warn');
            delta = h.parseDelta('strokeLinecap', {
              'round': 'butt'
            });
            expect(function() {
              return h.parseDelta('strokeLinecap', {
                'round': 'butt'
              });
            }).not.toThrow();
            expect(console.warn).toHaveBeenCalled();
            return expect(delta.type).not.toBeDefined();
          });
        });
        describe('array values ->', function() {
          return it('should calculate array delta', function() {
            var delta;
            delta = h.parseDelta('strokeDasharray', {
              '200 100': '300'
            });
            expect(delta.start.join(' ')).toBe('200 100');
            expect(delta.end.join(' ')).toBe('300 0');
            expect(delta.delta.join(' ')).toBe('100 -100');
            return expect(delta.type).toBe('array');
          });
        });
        describe('unit values ->', function() {
          return it('should calculate unit delta', function() {
            var delta;
            delta = h.parseDelta('x', {
              '0%': '100%'
            });
            expect(delta.start.string).toBe('0%');
            expect(delta.end.string).toBe('100%');
            expect(delta.delta).toBe(100);
            return expect(delta.type).toBe('unit');
          });
        });
        describe('tween-related values ->', function() {
          return it('should not calc delta for tween related props', function() {
            var delta;
            delta = h.parseDelta('duration', {
              '2000': 1000
            });
            return expect(delta.type).not.toBeDefined();
          });
        });
        return describe('rand values ->', function() {
          return it('should calculate unit delta', function() {
            var delta;
            delta = h.parseDelta('x', {
              'rand(2, 20)': 'rand(0, 5)'
            });
            expect(delta.start.value).toBeGreaterThan(-1);
            expect(delta.start.value).not.toBeGreaterThan(20);
            expect(delta.end.value).toBeGreaterThan(-1);
            return expect(delta.end.value).not.toBeGreaterThan(5);
          });
        });
      });
      describe('computedStyle method', function() {
        it('should return computed styles', function() {
          document.body.style['fontSize'] = '10px';
          return expect(h.computedStyle(document.body).fontSize).toBe('10px');
        });
        return it('should call getComputedStyle under the hood', function() {
          spyOn(window, 'getComputedStyle');
          h.computedStyle(document.body);
          return expect(window.getComputedStyle).toHaveBeenCalled();
        });
      });
      describe('getRemBase method', function() {
        it('should return remBase', function() {
          expect(h.getRemBase()).toBeDefined();
          return expect(typeof h.getRemBase()).toBe('number');
        });
        return it('should set remBase to h', function() {
          h.getRemBase();
          return expect(h.remBase).toBe(16);
        });
      });
      describe('logging methods', function() {
        describe('prepareForLog method', function() {
          return it('should prepare for arguments for logging', function() {
            var prepared;
            prepared = h.prepareForLog(['message']);
            expect(prepared[0]).toBe('%cmo·js%c');
            expect(prepared[1]).toBe(h.logBadgeCss);
            expect(prepared[2]).toBe('::');
            return expect(prepared[3]).toBe('message');
          });
        });
        describe('log method', function() {
          it('should log to console', function() {
            spyOn(console, 'log');
            h.log('something');
            return expect(console.log).toHaveBeenCalled();
          });
          return it('should prepend mojs badge to message', function() {
            spyOn(console, 'log');
            h.log('smth');
            return expect(console.log).toHaveBeenCalledWith('%cmo·js%c', h.logBadgeCss, '::', 'smth');
          });
        });
        describe('warn method', function() {
          it('should warn to console', function() {
            spyOn(console, 'warn');
            h.warn('something');
            return expect(console.warn).toHaveBeenCalled();
          });
          return it('should prepend mojs badge to message', function() {
            spyOn(console, 'warn');
            h.warn('smth');
            return expect(console.warn).toHaveBeenCalledWith('%cmo·js%c', h.logBadgeCss, '::', 'smth');
          });
        });
        return describe('error method', function() {
          it('should error to console', function() {
            spyOn(console, 'error');
            h.error('something');
            return expect(console.error).toHaveBeenCalled();
          });
          return it('should prepend mojs badge to message', function() {
            spyOn(console, 'error');
            h.error('smth');
            return expect(console.error).toHaveBeenCalledWith('%cmo·js%c', h.logBadgeCss, '::', 'smth');
          });
        });
      });
      describe('setPrefixedStyle method', function() {
        return it('should set prefixed style', function() {
          var el, prefixed;
          el = document.createElement('div');
          h.setPrefixedStyle(el, 'transform', 'translate(20px, 10px)');
          prefixed = "" + h.prefix.css + "transform";
          expect(el.style[prefixed]).toBe('translate(20px, 10px)');
          return expect(el.style['transform']).toBe('translate(20px, 10px)');
        });
      });
      describe('parseUnit method', function() {
        it('should parse number to pixels', function() {
          var unit;
          unit = h.parseUnit(100);
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('px');
          return expect(unit.string).toBe('100px');
        });
        it('should parse unitless string', function() {
          var unit;
          unit = h.parseUnit('100');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('px');
          return expect(unit.string).toBe('100px');
        });
        it('should parse pixel string', function() {
          var unit;
          unit = h.parseUnit('100px');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('px');
          return expect(unit.string).toBe('100px');
        });
        it('should parse percent string', function() {
          var unit;
          unit = h.parseUnit('100%');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('%');
          return expect(unit.string).toBe('100%');
        });
        it('should parse rem string', function() {
          var unit;
          unit = h.parseUnit('100rem');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('rem');
          return expect(unit.string).toBe('100rem');
        });
        it('should parse em string', function() {
          var unit;
          unit = h.parseUnit('100em');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('em');
          return expect(unit.string).toBe('100em');
        });
        it('should parse ex string', function() {
          var unit;
          unit = h.parseUnit('100ex');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('ex');
          return expect(unit.string).toBe('100ex');
        });
        it('should parse cm string', function() {
          var unit;
          unit = h.parseUnit('100cm');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('cm');
          return expect(unit.string).toBe('100cm');
        });
        it('should parse mm string', function() {
          var unit;
          unit = h.parseUnit('100mm');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('mm');
          return expect(unit.string).toBe('100mm');
        });
        it('should parse in string', function() {
          var unit;
          unit = h.parseUnit('100in');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('in');
          return expect(unit.string).toBe('100in');
        });
        it('should parse pt string', function() {
          var unit;
          unit = h.parseUnit('100pt');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('pt');
          return expect(unit.string).toBe('100pt');
        });
        it('should parse pc string', function() {
          var unit;
          unit = h.parseUnit('100pc');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('pc');
          return expect(unit.string).toBe('100pc');
        });
        it('should parse ch string', function() {
          var unit;
          unit = h.parseUnit('100ch');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('ch');
          return expect(unit.string).toBe('100ch');
        });
        it('should parse vh string', function() {
          var unit;
          unit = h.parseUnit('100vh');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('vh');
          return expect(unit.string).toBe('100vh');
        });
        it('should parse vw string', function() {
          var unit;
          unit = h.parseUnit('100vw');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('vw');
          return expect(unit.string).toBe('100vw');
        });
        return it('should parse vmin string', function() {
          var unit;
          unit = h.parseUnit('100vmin');
          expect(unit.value).toBe(100);
          expect(unit.unit).toBe('vmin');
          return expect(unit.string).toBe('100vmin');
        });
      });
      describe('strToArr method', function() {
        it('should parse string to array', function() {
          var array;
          array = h.strToArr('200 100');
          expect(array[0].value).toBe(200);
          return expect(array[0].unit).toBe('px');
        });
        it('should parse % string to array', function() {
          var array;
          array = h.strToArr('200% 100');
          expect(array[0].value).toBe(200);
          expect(array[0].unit).toBe('%');
          expect(array[1].value).toBe(100);
          return expect(array[1].unit).toBe('px');
        });
        it('should parse number to array', function() {
          var array;
          array = h.strToArr(200);
          expect(array[0].value).toBe(200);
          return expect(array[0].unit).toBe('px');
        });
        it('should parse string with multiple spaces to array', function() {
          var array;
          array = h.strToArr('200   100%');
          expect(array[0].value).toBe(200);
          expect(array[0].unit).toBe('px');
          expect(array[1].value).toBe(100);
          return expect(array[1].unit).toBe('%');
        });
        return it('should trim string before parse', function() {
          var array;
          array = h.strToArr('  200   100% ');
          expect(array[0].value).toBe(200);
          expect(array[0].unit).toBe('px');
          expect(array[1].value).toBe(100);
          return expect(array[1].unit).toBe('%');
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
        it('should with radiusX and fallback to radius', function() {
          var point;
          point = h.getRadialPoint({
            radius: 50,
            radiusX: 100,
            angle: 90,
            center: {
              x: 50,
              y: 50
            }
          });
          expect(point.x).toBe(150);
          return expect(point.y).toBe(50);
        });
        it('should with radiusY and fallback to radius', function() {
          var point;
          point = h.getRadialPoint({
            radius: 50,
            radiusY: 100,
            angle: 0,
            center: {
              x: 50,
              y: 50
            }
          });
          expect(point.x).toBe(50);
          return expect(point.y).toBe(-50);
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
      describe('cloneObj method', function() {
        it('should clone object', function() {
          var clonedObj, obj;
          obj = {
            a: 2,
            b: 3
          };
          clonedObj = h.cloneObj(obj);
          expect(clonedObj.a).toBe(2);
          expect(clonedObj.b).toBe(3);
          return expect(Object.keys(clonedObj).length).toBe(2);
        });
        return it('should exclude defined keys', function() {
          var clonedObj, exclude, obj;
          obj = {
            a: 2,
            b: 3
          };
          exclude = {
            a: 1
          };
          clonedObj = h.cloneObj(obj, exclude);
          expect(clonedObj.b).toBe(3);
          expect(clonedObj.a).not.toBeDefined();
          return expect(Object.keys(clonedObj).length).toBe(1);
        });
      });
      describe('capitalize method', function() {
        it('should capitalize strings', function() {
          return expect(h.capitalize('hello there')).toBe('Hello there');
        });
        it('should should throw if bad string was passed', function() {
          return expect(function() {
            return h.capitalize();
          }).toThrow();
        });
        return it('should should not throw with empty strings', function() {
          return expect(function() {
            return h.capitalize('');
          }).not.toThrow();
        });
      });
      describe('splitEasing method', function() {
        it('should split easing string to array', function() {
          expect(h.splitEasing('Linear.None')[0]).toBe('Linear');
          return expect(h.splitEasing('Linear.None')[1]).toBe('None');
        });
        it('should return default easing Linear.None if argument is bad', function() {
          expect(h.splitEasing(4)[0]).toBe('Linear');
          return expect(h.splitEasing(4)[1]).toBe('None');
        });
        it('should return default easing Linear.None if argument is bad #2', function() {
          expect(h.splitEasing('')[0]).toBe('Linear');
          return expect(h.splitEasing('')[1]).toBe('None');
        });
        it('should return default easing Linear.None if argument is bad #3', function() {
          expect(h.splitEasing('Linear..None')[0]).toBe('Linear');
          return expect(h.splitEasing('Linear..None')[1]).toBe('None');
        });
        it('should work with lovercase easing', function() {
          expect(h.splitEasing('linear..none')[0]).toBe('Linear');
          return expect(h.splitEasing('linear..none')[1]).toBe('None');
        });
        return it('should work with function easing', function() {
          var easing;
          easing = function() {
            return console.log('function');
          };
          return expect(h.splitEasing(easing) + '').toBe(easing + '');
        });
      });
      return describe('color parsing - makeColorObj method', function() {
        it('should have shortColors map', function() {
          return expect(h.shortColors).toBeDefined();
        });
        it('should have posPropsMap map', function() {
          expect(h.posPropsMap.x).toBe(1);
          expect(h.posPropsMap.y).toBe(1);
          expect(h.posPropsMap.shiftX).toBe(1);
          return expect(h.posPropsMap.shiftY).toBe(1);
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

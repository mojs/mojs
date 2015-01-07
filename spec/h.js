(function() {
  var h;

  h = mojs.helpers;

  describe('Helpers ->', function() {
    return describe('methods ->', function() {
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

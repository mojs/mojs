(function() {
  var MotionPath;

  MotionPath = window.mojs.MotionPath;

  describe('MotionPath ::', function() {
    return describe('enviroment ::', function() {
      it('SVG should be supported', function() {
        var isSVG;
        isSVG = !!(typeof document.createElementNS === "function" ? document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect : void 0);
        return expect(isSVG).toBeTruthy();
      });
      it('SVG path should have getTotalLength method', function() {
        var path;
        path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        return expect(path.getTotalLength).toBeDefined();
      });
      it('SVG path should have getPointAtLength method', function() {
        var path;
        path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        return expect(path.getPointAtLength).toBeDefined();
      });
      it('document.querySelector should be defined', function() {
        return expect(document.querySelector).toBeDefined();
      });
      it('style propety should be defined on DOM node', function() {
        var div, path;
        path = document.createElementNS('http://www.w3.org/2000/svg', "path");
        div = document.createElement('div');
        expect(path.style).toBeDefined();
        return expect(div.style).toBeDefined();
      });
      return it('transforms should be supported', function() {
        var isTransforms;
        isTransforms = function() {
          var i, prefixes;
          prefixes = "transform WebkitTransform MozTransform OTransform msTransform".split(" ");
          i = 0;
          while (i < prefixes.length) {
            if (document.createElement("div").style[prefixes[i]] !== undefined) {
              return prefixes[i];
            }
            i++;
          }
          return false;
        };
        return expect(isTransforms()).toBeTruthy();
      });
    });
  });

}).call(this);

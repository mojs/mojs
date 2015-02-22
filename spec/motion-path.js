(function() {
  var MotionPath;

  MotionPath = window.mojs.MotionPath;

  describe('MotionPath ->', function() {
    var ns;
    ns = 'http://www.w3.org/2000/svg';
    describe('enviroment ->', function() {
      it('SVG should be supported', function() {
        var isSVG;
        isSVG = !!(typeof document.createElementNS === "function" ? document.createElementNS(ns, "svg").createSVGRect : void 0);
        return expect(isSVG).toBeTruthy();
      });
      it('SVG path should have getTotalLength method', function() {
        var path;
        path = document.createElementNS(ns, "path");
        return expect(path.getTotalLength).toBeDefined();
      });
      it('SVG path should have getPointAtLength method', function() {
        var path;
        path = document.createElementNS(ns, "path");
        return expect(path.getPointAtLength).toBeDefined();
      });
      it('document.querySelector should be defined', function() {
        return expect(document.querySelector).toBeDefined();
      });
      it('style propety should be defined on DOM node', function() {
        var div, path;
        path = document.createElementNS(ns, "path");
        div = document.createElement('div');
        expect(path.style).toBeDefined();
        return expect(div.style).toBeDefined();
      });
      it('transforms should be supported', function() {
        var isTransforms;
        isTransforms = function() {
          var div, i, isProp, prefixes, trS;
          trS = "transform WebkitTransform MozTransform OTransform msTransform";
          prefixes = trS.split(" ");
          i = 0;
          while (i < prefixes.length) {
            div = document.createElement("div");
            isProp = div.style[prefixes[i]] !== 'undefined';
            if (isProp) {
              return prefixes[i];
            }
            i++;
          }
          return false;
        };
        return expect(isTransforms()).toBeTruthy();
      });
      return it('HTML el should have offsetWidth/offsetHeight propety', function() {
        var div;
        div = document.createElement('div');
        expect(div.offsetWidth).toBeDefined();
        return expect(div.offsetHeight).toBeDefined();
      });
    });
    describe('defaults ->', function() {
      var el, mp;
      el = document.createElement('div');
      mp = new MotionPath({
        path: 'M0.55859375,593.527344L0.55859375,593.527344',
        el: el
      });
      it('delay should be defined', function() {
        return expect(mp.delay).toBeDefined();
      });
      it('resize should be defined', function() {
        return expect(mp.resize).toBeDefined();
      });
      it('duration should be defined', function() {
        return expect(mp.duration).toBeDefined();
      });
      it('offsetX should be defined', function() {
        return expect(mp.offsetX).toBeDefined();
      });
      it('isReverse should be defined', function() {
        return expect(mp.isReverse).toBeDefined();
      });
      it('offsetY should be defined', function() {
        return expect(mp.offsetY).toBeDefined();
      });
      it('isAngle should be defined', function() {
        return expect(mp.isAngle).toBeDefined();
      });
      it('isRunLess should be defined', function() {
        return expect(mp.isRunLess).toBeDefined();
      });
      it('easing should be defined', function() {
        expect(mp.easing).toBeDefined();
        return expect(mp.easings).toBeDefined();
      });
      it('yoyo should be defined', function() {
        return expect(mp.yoyo).toBeDefined();
      });
      return it('repeat should be defined', function() {
        return expect(mp.repeat).toBeDefined();
      });
    });
    return describe('functionality ->', function() {
      var coords, div;
      div = document.createElement('div');
      coords = 'M0.55859375,593.527344L0.55859375,593.527344';
      return describe('run ability ->', function() {
        it('should not run with isRunLess option passed', function() {
          var isDelayed, isStarted, mp;
          isStarted = false;
          isDelayed = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            isRunLess: true,
            duration: 20,
            onStart: function() {
              return isStarted = true;
            }
          });
          return setTimeout((function() {
            return expect(isStarted).toBe(false);
          }), 100);
        });
        return describe('callbacks ->', function() {
          return it('onStart callback should work', function(dfr) {
            var isStarted, mp;
            isStarted = false;
            mp = new MotionPath({
              path: coords,
              el: div,
              onStart: function() {
                return isStarted = true;
              }
            });
            return setTimeout((function() {
              expect(isStarted).toBe(true);
              return dfr();
            }), 100);
          });
        });
      });
    });
  });

}).call(this);

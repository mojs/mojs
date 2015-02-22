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
    describe('functionality ->', function() {
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
        return it('run call should extend defaults', function(dfr) {
          var isComplete, mp;
          div = document.createElement('div');
          coords = 'M0,0 L500,00';
          isComplete = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            isRunLess: true,
            duration: 50,
            r: true
          });
          mp.run({
            onComplete: function() {
              return isComplete = true;
            },
            path: 'M0,0 L600,00'
          });
          return setTimeout(function() {
            var pos;
            pos = div.style.transform.split(/(translate\()|\,|\)/)[2];
            pos = parseInt(pos, 10);
            expect(pos).toBe(600);
            return dfr();
          }, 100);
        });
      });
    });
    describe('callbacks ->', function() {
      var coords, div;
      div = document.createElement('div');
      coords = 'M0.55859375,593.527344L0.55859375,593.527344';
      describe('onStart callback ->', function() {
        it('onStart callback should work', function(dfr) {
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
        return it('should have the scope of MotionPath', function(dfr) {
          var isRightScope, mp;
          isRightScope = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            onStart: function() {
              return isRightScope = this instanceof MotionPath;
            }
          });
          return setTimeout((function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }), 100);
        });
      });
      describe('onComplete callback ->', function() {
        it('onComplete callback should work', function(dfr) {
          var isCompleted, mp;
          isCompleted = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onComplete: function() {
              return isCompleted = true;
            }
          });
          return setTimeout(function() {
            expect(isCompleted).toBe(true);
            return dfr();
          }, 100);
        });
        return it('should have the scope of MotionPath', function(dfr) {
          var isRightScope, mp;
          isRightScope = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onComplete: function() {
              return isRightScope = this instanceof MotionPath;
            }
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 100);
        });
      });
      return describe('onUpdate callback ->', function() {
        it('onUpdate callback should work', function(dfr) {
          var isOnUpdate, mp;
          isOnUpdate = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onUpdate: function() {
              return isOnUpdate = true;
            }
          });
          return setTimeout(function() {
            expect(isOnUpdate).toBe(true);
            return dfr();
          }, 100);
        });
        it('onUpdate callback should have "progress" argument', function(dfr) {
          var isOnUpdate, mp;
          isOnUpdate = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onUpdate: function(progress) {
              if (progress != null) {
                return isOnUpdate = true;
              }
            }
          });
          return setTimeout(function() {
            expect(isOnUpdate).toBe(true);
            return dfr();
          }, 100);
        });
        return it('should have the scope of MotionPath', function(dfr) {
          var isRightScope, mp;
          isRightScope = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 5,
            onUpdate: function() {
              return isRightScope = this instanceof MotionPath;
            }
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 100);
        });
      });
    });
    return describe('fill ->', function() {
      var container, div;
      div = container = null;
      beforeEach(function() {
        var size;
        container = document.createElement('div');
        div = document.createElement('div');
        size = 200;
        container.style.width = "" + size + "px";
        container.style.height = "" + size + "px";
        container.style.position = 'absolute';
        container.style.top = '-100%';
        container.setAttribute('id', 'js-container');
        return document.body.appendChild(container);
      });
      it('container could be specified by selector or DOM node', function() {
        var mp;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          fill: {
            container: '#js-container'
          }
        });
        return expect(mp.container instanceof HTMLElement).toBe(true);
      });
      it('if fill is specified it should have container, fillRule, cSize', function() {
        var mp;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          fill: {
            container: container
          }
        });
        expect(mp.container).toBeDefined();
        expect(mp.fillRule).toBeDefined();
        return expect(mp.cSize).toBeDefined();
      });
      it('if fillRule is "all" it should keep container\'s size', function(dfr) {
        var isFilled, motionPath;
        isFilled = false;
        motionPath = new MotionPath({
          path: 'M0,0 L500,500',
          el: div,
          duration: 64,
          fill: {
            container: container
          },
          all: true,
          isIt: true,
          onComplete: function() {
            var args, height, isHeight, isWidth, width;
            args = motionPath.el.style.transform.split(/(translate\()|\,|\)/);
            width = parseInt(args[2], 10);
            height = parseInt(args[4], 10);
            isWidth = width === container.offsetWidth;
            isHeight = height === container.offsetHeight;
            return isFilled = isWidth && isHeight;
          }
        });
        return setTimeout((function() {
          expect(isFilled).toBe(true);
          return dfr();
        }), 100);
      });
      it("if fillRule is \"width\" it should keep container\'s width and set \"height\" with aspect ratio", function(dfr) {
        var isFilled, mp;
        isFilled = false;
        mp = new MotionPath({
          path: 'M0,0 L500,250',
          el: div,
          duration: 50,
          fill: {
            container: container,
            fillRule: 'width'
          },
          all: true,
          onComplete: function() {
            var args, height, isHeight, isWidth, width;
            args = mp.el.style.transform.split(/(translate\()|\,|\)/);
            width = parseInt(args[2], 10);
            height = parseInt(args[4], 10);
            isWidth = width === container.offsetWidth;
            isHeight = height === (width / 2);
            return isFilled = isWidth && isHeight;
          }
        });
        return setTimeout(function() {
          expect(isFilled).toBe(true);
          return dfr();
        }, 100);
      });
      it("if fillRule is \"height\" it should keep container\'s height and set \"width\" with aspect ratio", function(dfr) {
        var isFilled, mp;
        isFilled = false;
        mp = new MotionPath({
          path: 'M0,0 L250,500',
          el: div,
          duration: 50,
          fill: {
            container: container,
            fillRule: 'height'
          },
          onComplete: function() {
            var args, height, isHeight, isWidth, width;
            args = mp.el.style.transform.split(/(translate\()|\,|\)/);
            width = parseInt(args[2], 10);
            height = parseInt(args[4], 10);
            isWidth = width === (height / 2);
            isHeight = height === container.offsetHeight;
            return isFilled = isWidth && isHeight;
          }
        });
        return setTimeout(function() {
          expect(isFilled).toBe(true);
          return dfr();
        }, 100);
      });
      return it('if container size was changed should recalc scaler', function() {
        var c, el, isSizeChange, mp, size, x;
        isSizeChange = false;
        el = document.createElement('div');
        c = document.createElement('div');
        size = 200;
        c.style.width = "" + size + "px";
        c.style.height = "" + size + "px";
        c.style.position = 'absolute';
        c.style.top = '-100%';
        c.setAttribute('id', 'js-container2');
        document.body.appendChild(c);
        x = -1;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: el,
          duration: 50,
          fill: {
            container: c
          },
          onUpdate: function(proc) {
            if (proc >= .1 && !isSizeChange) {
              mp.container.style.width = '100px';
              return isSizeChange = true;
            }
          },
          onComplete: function() {
            return x = mp.el.style.transform.split(/(translate\()|\,|\)/)[2];
          }
        });
        return setTimeout(function() {
          return expect(parseInt(x, 10)).toBe(100);
        }, 100);
      });
    });
  });

}).call(this);

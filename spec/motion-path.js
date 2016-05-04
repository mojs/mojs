(function() {
  var MotionPath, Shape, coords, h, isMotionReset, mp, parseQadraticCurve;

  MotionPath = window.mojs.MotionPath;

  Shape = window.mojs.Shape;

  h = window.mojs.helpers;

  mp = new MotionPath({
    path: 'M0,0 L100,100',
    el: document.createElement('div')
  });

  isMotionReset = mp.isMotionBlurReset;

  parseQadraticCurve = function(d) {
    var control, end, m, q, returnObject, shapes, start;
    shapes = d.split(/M|Q/);
    m = shapes[1].split(/\s|\,/);
    m = m.filter(function(e) {
      return !!e;
    });
    start = {
      x: parseFloat(m[0]),
      y: parseFloat(m[1])
    };
    q = shapes[2].split(/\s|\,/);
    q = q.filter(function(e) {
      return !!e;
    });
    end = {
      x: parseFloat(q[2]),
      y: parseFloat(q[3])
    };
    control = {
      x: parseFloat(q[0]),
      y: parseFloat(q[1])
    };
    return returnObject = {
      start: start,
      end: end,
      control: control
    };
  };

  coords = 'M0.55859375,593.527344L0.55859375,593.527344';

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
      var el;
      el = document.createElement('div');
      mp = new MotionPath({
        path: 'M0.55859375,593.527344L0.55859375,593.527344',
        el: el
      });
      it('have angle of 0', function() {
        el = document.createElement('div');
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: el,
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(mp.angle).toBe(0);
      });
      it('should have isCompositeLayer default of true', function() {
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: document.createElement('div')
        });
        return expect(mp.defaults.isCompositeLayer).toBe(true);
      });
      it('have speed of 0', function() {
        el = document.createElement('div');
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: el,
          isRunLess: true,
          isPresetPosition: false
        });
        expect(mp.speedX).toBe(0);
        return expect(mp.speedY).toBe(0);
      });
      it('have blur of 0', function() {
        el = document.createElement('div');
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: el,
          isRunLess: true,
          isPresetPosition: false
        });
        expect(mp.blurX).toBe(0);
        return expect(mp.blurY).toBe(0);
      });
      it('have blurAmount of 20', function() {
        el = document.createElement('div');
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: el,
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(mp.blurAmount).toBe(20);
      });
      it('have prevCoords object', function() {
        el = document.createElement('div');
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: el,
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(mp.prevCoords).toBeDefined();
      });
      it('defaults should be defined', function() {
        expect(mp.defaults.delay).toBe(0);
        expect(mp.defaults.duration).toBe(1000);
        expect(mp.defaults.easing).toBe(null);
        expect(mp.defaults.repeat).toBe(0);
        expect(mp.defaults.yoyo).toBe(false);
        expect(mp.defaults.offsetX).toBe(0);
        expect(mp.defaults.offsetY).toBe(0);
        expect(mp.defaults.angleOffset).toBe(null);
        expect(mp.defaults.pathStart).toBe(0);
        expect(mp.defaults.pathEnd).toBe(1);
        expect(mp.defaults.transformOrigin).toBe(null);
        expect(mp.defaults.motionBlur).toBe(0);
        expect(mp.defaults.isAngle).toBe(false);
        expect(mp.defaults.isReverse).toBe(false);
        expect(mp.defaults.isRunLess).toBe(false);
        expect(mp.defaults.isPresetPosition).toBe(true);
        expect(mp.defaults.onStart).toBe(null);
        expect(mp.defaults.onComplete).toBe(null);
        expect(mp.defaults.onUpdate).toBe(null);
        expect(mp.defaults.curvature.x).toBe('75%');
        return expect(mp.defaults.curvature.y).toBe('50%');
      });
      it('should extend defaults to props', function() {
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: document.createElement('div'),
          duration: 2000
        });
        expect(mp.props.duration).toBe(2000);
        return expect(mp.props.delay).toBe(0);
      });
      it('should clamp pathStart and pathEnd further', function() {
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: document.createElement('div'),
          duration: 2000,
          pathStart: 2,
          pathEnd: 2
        });
        expect(mp.props.pathStart).toBe(1);
        return expect(mp.props.pathEnd).toBe(1);
      });
      it('should clamp pathStart and pathEnd further', function() {
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: document.createElement('div'),
          duration: 2000,
          pathStart: -2,
          pathEnd: -2
        });
        expect(mp.props.pathStart).toBe(0);
        return expect(mp.props.pathEnd).toBe(0);
      });
      return it('pathEnd should not be smaller then pathStart', function() {
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: document.createElement('div'),
          duration: 2000,
          pathStart: .5,
          pathEnd: -2
        });
        expect(mp.props.pathStart).toBe(.5);
        return expect(mp.props.pathEnd).toBe(.5);
      });
    });
    describe('run method ->', function() {
      var div;
      div = document.createElement('div');
      coords = 'M0.55859375,593.527344L0.55859375,593.527344';
      it('should extend the old options', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true,
          pathEnd: .75,
          pathStart: .25
        });
        mp.run({
          pathStart: .5
        });
        expect(mp.props.pathStart).toBe(.5);
        return expect(mp.props.pathEnd).toBe(.75);
      });
      it('shoud call tuneOptions if options passed', function() {
        var o;
        o = {
          duration: 500
        };
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div,
          isRunLess: true
        }).then({
          pathEnd: .5
        });
        spyOn(mp, 'tuneOptions');
        mp.run(o);
        return expect(mp.tuneOptions).toHaveBeenCalledWith(o);
      });
      it('shoud not call tuneOptions if options wasn\'t passed', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true
        }).then({
          pathEnd: .5
        });
        spyOn(mp, 'tuneOptions');
        mp.run();
        return expect(mp.tuneOptions).not.toHaveBeenCalled();
      });
      it('shoud override the first history item', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true,
          pathStart: .25,
          pathEnd: .5
        }).then({
          pathEnd: .5
        });
        mp.run({
          pathStart: .35
        });
        return expect(mp.history[0].pathStart).toBe(.35);
      });
      return it('shoud warn if tweenValues changed on run', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true,
          pathStart: .25,
          pathEnd: .5,
          duration: 2000
        }).then({
          pathEnd: .5
        });
        spyOn(h, 'warn');
        mp.run({
          pathStart: .35,
          duration: 200,
          delay: 100,
          repeat: 1,
          yoyo: false,
          easing: 'Linear.None',
          onStart: function() {},
          onUpdate: function() {},
          onComplete: function() {}
        });
        expect(h.warn).toHaveBeenCalled();
        expect(mp.history[0].duration).toBe(2000);
        return expect(mp.props.duration).toBe(2000);
      });
    });
    describe('callbacks ->', function() {
      var div;
      div = document.createElement('div');
      coords = 'M0.55859375,593.527344L0.55859375,593.527344';
      describe('onStart callback ->', function() {
        it('should run on start', function(dfr) {
          var isStarted;
          isStarted = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 200,
            onStart: function() {
              return isStarted = true;
            }
          });
          return setTimeout((function() {
            expect(isStarted).toBe(true);
            return dfr();
          }), 500);
        });
        return it('should have the scope of MotionPath', function(dfr) {
          var isRightScope;
          isRightScope = null;
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
          }), 500);
        });
      });
      describe('onComplete callback ->', function() {
        it('onComplete callback should work', function(dfr) {
          var isCompleted;
          isCompleted = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 200,
            onComplete: function() {
              return isCompleted = true;
            }
          });
          return setTimeout(function() {
            expect(isCompleted).toBe(true);
            return dfr();
          }, 500);
        });
        return it('should have the scope of MotionPath', function(dfr) {
          var isRightScope;
          isRightScope = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 200,
            onComplete: function() {
              return isRightScope = this instanceof MotionPath;
            }
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 500);
        });
      });
      return describe('onUpdate callback ->', function() {
        it('onUpdate callback should work', function(dfr) {
          var isOnUpdate;
          isOnUpdate = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 200,
            onUpdate: function() {
              return isOnUpdate = true;
            }
          });
          return setTimeout(function() {
            expect(isOnUpdate).toBe(true);
            return dfr();
          }, 500);
        });
        it('onUpdate callback should have "progress" argument', function(dfr) {
          var isOnUpdate;
          isOnUpdate = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 200,
            onUpdate: function(progress) {
              if (progress != null) {
                return isOnUpdate = true;
              }
            }
          });
          return setTimeout(function() {
            expect(isOnUpdate).toBe(true);
            return dfr();
          }, 500);
        });
        it('should have the scope of MotionPath', function(dfr) {
          var isRightScope;
          isRightScope = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 200,
            onUpdate: function() {
              return isRightScope = this instanceof MotionPath;
            }
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 500);
        });
        return it('should be called with progress, x, y and angle', function() {
          var angle, progress, x, y;
          progress = null;
          x = null;
          y = null;
          angle = null;
          mp = new MotionPath({
            path: 'M0,100 L100,0',
            el: document.createElement('div'),
            isRunLess: true,
            easing: 'linear.none',
            onUpdate: function(p, o) {
              progress = p;
              x = o.x;
              y = o.y;
              return angle = o.angle;
            }
          });
          mp.timeline.setProgress(.45);
          mp.timeline.setProgress(.5);
          expect(progress.toFixed(1)).toBe('0.5');
          expect(x).toBeCloseTo(50, 5);
          expect(y).toBeCloseTo(50, 5);
          return expect(angle).toBeCloseTo(0, 5);
        });
      });
    });
    describe('fill ->', function() {
      var container, div;
      div = null;
      container = null;
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
        return motionPath = new MotionPath({
          path: 'M0,0 L500,500',
          el: div,
          duration: 200,
          fill: {
            container: container
          },
          onComplete: function() {
            var args, height, isHeight, isWidth, prefixed, style, tr, width;
            style = motionPath.el.style;
            prefixed = "" + h.prefix.css + "transform";
            tr = style[prefixed] != null ? style[prefixed] : style.transform;
            div = document.createElement('div');
            args = tr.split(/(translate\()|\,|\)/);
            width = parseInt(args[2], 10);
            height = parseInt(args[4], 10);
            isWidth = width === container.offsetWidth;
            isHeight = height === container.offsetHeight;
            isFilled = isWidth && isHeight;
            expect(isFilled).toBe(true);
            return dfr();
          }
        });
      });
      it("if fillRule is \"width\" it should keep container\'s width and set \"height\" with aspect ratio", function(dfr) {
        var isFilled;
        isFilled = false;
        return mp = new MotionPath({
          path: 'M0,0 L500,250',
          el: div,
          duration: 200,
          fill: {
            container: container,
            fillRule: 'width'
          },
          all: true,
          onComplete: function() {
            var args, height, isHeight, isWidth, prefixed, style, tr, width;
            style = mp.el.style;
            prefixed = "" + h.prefix.css + "transform";
            tr = style[prefixed] != null ? style[prefixed] : style.transform;
            args = tr.split(/(translate\()|\,|\)/);
            width = parseInt(args[2], 10);
            height = parseInt(args[4], 10);
            isWidth = width === container.offsetWidth;
            isHeight = height === (width / 2);
            isFilled = isWidth && isHeight;
            expect(isFilled).toBe(true);
            return dfr();
          }
        });
      });
      it("if fillRule is \"height\" it should keep container\'s height and set \"width\" with aspect ratio", function(dfr) {
        var isFilled;
        isFilled = false;
        return mp = new MotionPath({
          path: 'M0,0 L250,500',
          el: div,
          duration: 200,
          fill: {
            container: container,
            fillRule: 'height'
          },
          onComplete: function() {
            var args, height, isHeight, isWidth, prefixed, style, tr, width;
            style = mp.el.style;
            prefixed = "" + h.prefix.css + "transform";
            tr = style[prefixed] != null ? style[prefixed] : style.transform;
            args = tr.split(/(translate\()|\,|\)/);
            width = parseInt(args[2], 10);
            height = parseInt(args[4], 10);
            isWidth = width === (height / 2);
            isHeight = height === container.offsetHeight;
            isFilled = isWidth && isHeight;
            expect(isFilled).toBe(true);
            return dfr();
          }
        });
      });
      return it('if container size was changed should recalc scaler', function(dfr) {
        var c, el, isSizeChange, size, x;
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
          duration: 200,
          fill: {
            container: c
          },
          onUpdate: function(proc) {
            if (proc >= .1 && !isSizeChange) {
              mp.container.style.width = '100px';
              return isSizeChange = true;
            }
          }
        });
        return setTimeout(function() {
          var tr;
          tr = mp.el.style.transform || mp.el.style["" + h.prefix.css + "transform"];
          x = tr.split(/(translate\()|\,|\)/);
          expect(parseInt(x[2], 10)).toBe(100);
          return dfr();
        }, 500);
      });
    });
    describe('functionality ->', function() {
      var div;
      div = document.createElement('div');
      coords = 'M0.55859375,593.527344L0.55859375,593.527344';
      it('should work with positive offsetX', function(dfr) {
        var isEqual, x;
        coords = 'M0,0 L0,10';
        x = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetX: 10,
          duration: 200,
          isAngle: true
        });
        return setTimeout((function() {
          var tr;
          tr = mp.el.style.transform || mp.el.style["" + h.prefix.css + "transform"];
          x = tr.split(/(translate\()|,|\)/)[2];
          isEqual = parseInt(x, 10) === 10;
          expect(isEqual).toBe(true);
          return dfr();
        }), 500);
      });
      it('should work with negative offsetX', function(dfr) {
        var isEqual, x;
        coords = 'M0,0 L0,10';
        x = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetX: -10,
          duration: 200,
          onComplete: function() {
            var tr;
            tr = mp.el.style.transform || mp.el.style["" + h.prefix.css + "transform"];
            x = tr.split(/(translate\()|,|\)/)[2];
            x = parseInt(x, 10);
            return isEqual = x === -10;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 500);
      });
      it('should work with positive offsetY', function(dfr) {
        var isEqual, y;
        coords = 'M0,0 L10,0';
        y = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetY: 10,
          duration: 200,
          onComplete: function() {
            var tr;
            tr = mp.el.style.transform || mp.el.style["" + h.prefix.css + "transform"];
            y = tr.split(/(translate\()|,|\)/)[4];
            y = parseInt(y, 10);
            return isEqual = y === 10;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 500);
      });
      it('should work with negative offsetY', function(dfr) {
        var isEqual, y;
        coords = 'M0,0 L10,0';
        y = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetY: -10,
          duration: 200,
          onComplete: function() {
            var tr;
            tr = mp.el.style.transform || mp.el.style["" + h.prefix.css + "transform"];
            y = tr.split(/(translate\()|,|\)/)[4];
            return isEqual = parseInt(y, 10) === -10;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 500);
      });
      it('should calculate current angle', function(dfr) {
        var angle, detect, isEqual, isEquial2;
        coords = 'M0,0 L10,0 L10,10';
        angle = 0;
        isEqual = false;
        isEquial2 = false;
        detect = {};
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          isAngle: true,
          onUpdate: function() {
            if (detect.firstAngle == null) {
              detect.firstAngle = mp.angle;
            }
            return isEquial2 = detect.firstAngle === 0;
          },
          onComplete: function() {
            return isEqual = mp.angle === 90;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 500);
      });
      it('should calculate current angle if transformOrigin is a fun', function(dfr) {
        var angle, detect, isEqual, isEquial2;
        coords = 'M0,0 L10,0 L10,10';
        angle = 0;
        isEqual = false;
        isEquial2 = false;
        detect = {};
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          transformOrigin: function() {},
          onUpdate: function() {
            if (detect.firstAngle == null) {
              detect.firstAngle = mp.angle;
            }
            return isEquial2 = detect.firstAngle === 0;
          },
          onComplete: function() {
            return isEqual = mp.angle === 90;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 500);
      });
      it('should calculate current angle with isReverse', function(dfr) {
        var angle, detect, isEqual, isEquial2;
        coords = 'M0,0 L10,0 L10,10';
        angle = 0;
        isEqual = false;
        isEquial2 = false;
        detect = {};
        return mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          isAngle: true,
          isReverse: true,
          onUpdate: function() {
            if (detect.firstAngle == null) {
              detect.firstAngle = mp.angle;
            }
            return isEquial2 = detect.firstAngle === 90;
          },
          onComplete: function() {
            return isEqual = mp.angle === 0;
          }
        }, setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 500));
      });
      it('should have transform-origin', function(dfr) {
        var isComplete;
        coords = 'M0,0 L10,0 L10,10';
        isComplete = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          transformOrigin: '50% 50%',
          onComplete: function() {
            return isComplete = true;
          }
        });
        return setTimeout(function() {
          var s, tr;
          s = mp.el.style;
          tr = s['transform-origin'] || s["" + h.prefix.css + "transform-origin"];
          expect(tr.length >= 1).toBe(true);
          return dfr();
        }, 100);
      });
      return it('transform-origin could be a function', function(dfr) {
        var isAngle, isProgress;
        coords = 'M0,0 L10,0 L10,10';
        isAngle = false;
        isProgress = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          transformOrigin: function(angle, proc) {
            var isFunction;
            isFunction = true;
            isAngle = angle != null;
            isProgress = proc != null;
            return '50% 50%';
          }
        });
        return setTimeout((function() {
          expect(isAngle && isProgress).toBe(true);
          return dfr();
        }), 100);
      });
    });
    describe('angleOffset ->', function() {
      var div;
      div = document.createElement('div');
      it('angleOffset should work with positive angles', function(dfr) {
        var isEqual;
        coords = 'M0,0 L10,0 L10,10';
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          angleOffset: 90,
          isAngle: true,
          onComplete: function() {
            return isEqual = mp.angle === 180;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 500);
      });
      it('angleOffset should work with negative angles', function(dfr) {
        var isEqual;
        coords = 'M0,0 L10,0 L10,10';
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          angleOffset: -90,
          isAngle: true
        });
        return setTimeout((function() {
          isEqual = mp.angle === 0;
          expect(isEqual).toBe(true);
          return dfr();
        }), 500);
      });
      it('should be evaluated if a function', function(dfr) {
        var isFunction;
        coords = 'M0,0 L10,0 L10,10';
        isFunction = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          angleOffset: function(angle) {
            isFunction = true;
            return angle;
          }
        });
        return setTimeout((function() {
          expect(isFunction).toBe(true);
          return dfr();
        }), 500);
      });
      it('should get current angle', function(dfr) {
        var angleSum1, angleSum2, isOnAngle;
        coords = 'M0,0 L10,0 L10,10';
        isOnAngle = null;
        angleSum1 = 0;
        angleSum2 = 0;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          isAngle: true,
          isRunLess: true,
          isPresetPosition: false,
          angleOffset: function(angle) {
            angleSum1 += angle;
            angleSum2 += this.angle;
            return angle;
          },
          onComplete: function() {
            return isOnAngle = angleSum1 === angleSum2;
          }
        });
        mp.run();
        return setTimeout((function() {
          expect(isOnAngle).toBe(true);
          return dfr();
        }), 500);
      });
      it('should set current angle', function(dfr) {
        var angleShift, currAngle, isAnglesArray, isSet;
        coords = 'M0,0 L10,0 L10,10';
        isSet = false;
        currAngle = 0;
        isAnglesArray = [];
        angleShift = 5;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          angleOffset: function(angle) {
            currAngle = angle;
            return angle + angleShift;
          },
          onUpdate: function() {
            return isAnglesArray.push(currAngle + angleShift === mp.angle);
          },
          onComplete: function() {
            var i, isSetItem, _i, _len, _results;
            _results = [];
            for (i = _i = 0, _len = isAnglesArray.length; _i < _len; i = ++_i) {
              isSetItem = isAnglesArray[i];
              if (!isSetItem) {
                _results.push(isSet = true);
              } else {
                _results.push(void 0);
              }
            }
            return _results;
          }
        });
        return setTimeout((function() {
          expect(isSet).toBe(false);
          return dfr();
        }), 500);
      });
      it('angleOffset should get current progress as second parameter', function(dfr) {
        var isProgress, proc;
        coords = 'M0,0 L10,0 L10,10';
        isProgress = false;
        proc = -1;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          angleOffset: function(angle, progress) {
            proc = progress;
            return angle;
          },
          onComplete: function() {
            return isProgress = proc === 1;
          }
        });
        return setTimeout((function() {
          expect(isProgress).toBe(true);
          return dfr();
        }), 500);
      });
      return it('should have scope of motion path', function() {
        var angleSum1, angleSum2, isRightScope;
        coords = 'M0,0 L10,0 L10,10';
        isRightScope = false;
        angleSum1 = 0;
        angleSum2 = 0;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 200,
          isAngle: true,
          angleOffset: function() {
            return isRightScope = this instanceof MotionPath;
          }
        });
        return setTimeout(function() {
          return expect(isRightScope).toBe(true);
        }, 500);
      });
    });
    describe('setProgress method ->', function(dfr) {
      it('should have own function for setting up current progress', function() {
        var div, pos, tr;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          isRunLess: true
        });
        mp.setProgress(.5);
        tr = mp.el.style.transform || mp.el.style["" + h.prefix.css + "transform"];
        pos = parseInt(tr.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(250);
      });
      it('should call the onUpdate callback', function() {
        var div, progress;
        div = document.createElement('div');
        progress = null;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          isRunLess: true,
          onUpdate: function(p) {
            return progress = p;
          }
        });
        mp.setProgress(.5);
        return expect(progress).toBe(.5);
      });
      it('should not call the onUpdate callback on start', function() {
        var isCalled;
        isCalled = false;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: document.createElement('div'),
          isRunLess: true,
          onUpdate: function() {
            return isCalled = true;
          }
        });
        return expect(isCalled).toBe(false);
      });
      it('should set transform if it was returned from the onUpdate', function() {
        var prefixed, style, tr, transform;
        transform = 'translate(20px, 50px)';
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: document.createElement('div'),
          isRunLess: true,
          onUpdate: function() {
            return transform;
          }
        });
        mp.setProgress(.5);
        style = mp.el.style;
        prefixed = "" + h.prefix.css + "transform";
        tr = style[prefixed] != null ? style[prefixed] : style.transform;
        return expect(tr).toBe(transform);
      });
      return it('should not set transform if something other then string was returned from onUpdate callback', function() {
        var transform;
        transform = 'translate(20px, 50px)';
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: document.createElement('div'),
          isRunLess: true,
          onUpdate: function() {
            return null;
          }
        });
        mp.setProgress(.5);
        return expect(mp.el.style.transform).not.toBe(null);
      });
    });
    describe('preset position ->', function() {
      it('should preset initial position by default', function() {
        var div, pos, tr;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M50,0 L500,0',
          el: div
        });
        tr = mp.el.style.transform || mp.el.style["" + h.prefix.css + "transform"];
        pos = parseInt(tr.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(50);
      });
      return it('should not set initial position if isPresetPosition is false', function() {
        var div;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M50,0 L500,0',
          el: div,
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(div.style.transform).toBeFalsy();
      });
    });
    describe('progress bounds ->', function() {
      it('should calc the @slicedLen and @startLen properties', function() {
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: document.createElement('div'),
          isRunLess: true,
          pathStart: .5,
          pathEnd: .75
        });
        expect(mp.slicedLen).toBe(125);
        return expect(mp.startLen).toBe(250);
      });
      it('should start from pathStart position', function() {
        var div, pos, tr;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          isRunLess: true,
          pathStart: .5,
          pathEnd: .75
        });
        mp.timeline.setProgress(0);
        tr = mp.el.style.transform || mp.el.style["" + h.prefix.css + "transform"];
        pos = parseInt(tr.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(250);
      });
      return it('should end at pathEnd position', function(dfr) {
        var div, pos;
        div = document.createElement('div');
        pos = -1;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          duration: 200,
          pathStart: .25,
          pathEnd: .5,
          onComplete: function() {
            var tr;
            tr = mp.el.style.transform || mp.el.style["" + h.prefix.css + "transform"];
            pos = tr.split(/(translate\()|\,|\)/)[2];
            return pos = parseInt(pos, 10);
          }
        });
        return setTimeout((function() {
          expect(pos).toBe(250);
          return dfr();
        }), 500);
      });
    });
    describe('path option ->', function() {
      return it('should error if path has no d attribute', function() {
        var div, path;
        path = document.createElementNS(ns, 'path');
        div = document.createElement('div');
        spyOn(h, 'error');
        mp = new MotionPath({
          path: path,
          el: div
        });
        return expect(h.error).toHaveBeenCalled();
      });
    });
    describe('isCompositeLayer option ->', function() {
      it('should be true by default', function() {
        mp = new MotionPath({
          path: document.createElementNS(ns, 'path'),
          el: document.createElement('div')
        });
        return expect(mp.props.isCompositeLayer).toBe(true);
      });
      it('should be able to be set to false', function() {
        mp = new MotionPath({
          path: document.createElementNS(ns, 'path'),
          el: document.createElement('div'),
          isCompositeLayer: false
        });
        return expect(mp.props.isCompositeLayer).toBe(false);
      });
      it('should set translateZ(0) if isCompositeLayer is set to true and h.is3d', function() {
        var prefixed, style, tr;
        mp = new MotionPath({
          path: 'M0,0 L100,100',
          el: document.createElement('div'),
          isRunLess: true
        });
        mp.setProgress(.5);
        style = mp.el.style;
        prefixed = "" + h.prefix.css + "transform";
        tr = style[prefixed] != null ? style[prefixed] : style.transform;
        return expect(tr.match(/translateZ/gi) || !h.is3d).toBeTruthy();
      });
      return it('should not set translateZ(0) is isCompositeLayer is set to false', function() {
        var tr;
        mp = new MotionPath({
          path: 'M0,0 L100,100',
          el: document.createElement('div'),
          isRunLess: true,
          isCompositeLayer: false
        });
        mp.setProgress(.5);
        tr = mp.el.style.transform || mp.el.style["" + mojs.h.prefix.css + "transform"];
        return expect(tr.match(/translateZ/gi)).toBeFalsy();
      });
    });
    describe('getPath method ->', function() {
      it('should have a getPath method', function() {
        var div;
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div
        });
        return expect(mp.getPath).toBeDefined();
      });
      it('getPath should return a path when was specified by coordinates', function() {
        var div;
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div
        });
        return expect(mp.getPath() instanceof SVGElement).toBe(true);
      });
      it('getPath should return a path when it was specified by SVG path', function() {
        var div, path;
        path = document.createElementNS(ns, 'path');
        path.setAttribute('d', 'M0,0 L500,500 L1000, 0');
        div = document.createElement('div');
        mp = new MotionPath({
          path: path,
          el: div
        });
        return expect(mp.getPath() instanceof SVGElement).toBe(true);
      });
      it('getPath should return a path when it was specified by a selector', function() {
        var div, id, path, svg;
        id = 'js-path';
        div = document.createElement('div');
        svg = document.createElementNS(ns, 'svg');
        path = document.createElementNS(ns, 'path');
        path.setAttribute('id', id);
        path.setAttribute('class', id);
        svg.appendChild(path);
        document.body.appendChild(svg);
        mp = new MotionPath({
          path: "#" + id,
          el: div
        });
        expect(mp.getPath() instanceof SVGElement).toBe(true);
        mp = new MotionPath({
          path: "." + id,
          el: div
        });
        return expect(mp.getPath() instanceof SVGElement).toBe(true);
      });
      it('getPath should return a path when it was specified by coords', function() {
        var d, points;
        mp = new MotionPath({
          path: {
            x: -100,
            y: 100
          },
          curvature: {
            x: '50%',
            y: '25%'
          },
          el: document.createElement('div')
        });
        d = mp.path.getAttribute('d');
        expect(mp.getPath() instanceof SVGElement).toBe(true);
        points = parseQadraticCurve(d);
        expect(points.start.x).toBe(0);
        expect(points.start.y).toBe(0);
        expect(points.end.x).toBe(-100);
        expect(points.end.y).toBe(100);
        expect(points.control.x).toBeCloseTo(-75);
        return expect(points.control.y).toBeCloseTo(25);
      });
      it('fallback to defaults if only 1 curvature coord set', function() {
        var d, points;
        mp = new MotionPath({
          path: {
            x: -100,
            y: 100
          },
          curvature: {
            x: '50%'
          },
          el: document.createElement('div')
        });
        d = mp.path.getAttribute('d');
        expect(mp.getPath() instanceof SVGElement).toBe(true);
        points = parseQadraticCurve(d);
        expect(points.start.x).toBe(0);
        expect(points.start.y).toBe(0);
        expect(points.end.x).toBe(-100);
        expect(points.end.y).toBe(100);
        expect(points.control.x).toBeCloseTo(-100);
        return expect(points.control.y).toBeCloseTo(0);
      });
      it('should fallback to defaults if only 1 curve coord set #2', function() {
        var d, points;
        mp = new MotionPath({
          path: {
            x: -100,
            y: 100
          },
          curvature: {
            y: '50%'
          },
          el: document.createElement('div')
        });
        d = mp.path.getAttribute('d');
        expect(mp.getPath() instanceof SVGElement).toBe(true);
        points = parseQadraticCurve(d);
        expect(points.start.x).toBe(0);
        expect(points.start.y).toBe(0);
        expect(points.end.x).toBe(-100);
        expect(points.end.y).toBe(100);
        expect(points.control.x).toBeCloseTo(-125);
        return expect(points.control.y).toBeCloseTo(25);
      });
      it('should fallback to 0 if only 1 path coord set', function() {
        var d, points;
        mp = new MotionPath({
          path: {
            x: -100
          },
          curvature: {
            y: '50%'
          },
          el: document.createElement('div')
        });
        d = mp.path.getAttribute('d');
        expect(mp.getPath() instanceof SVGElement).toBe(true);
        points = parseQadraticCurve(d);
        expect(points.start.x).toBe(0);
        expect(points.start.y).toBe(0);
        expect(points.end.x).toBe(-100);
        expect(points.end.y).toBe(0);
        expect(points.control.x).toBeCloseTo(-75);
        return expect(points.control.y).toBeCloseTo(-50);
      });
      return it('should fallback to 0 if only 1 path coord set #2', function() {
        var d, points;
        mp = new MotionPath({
          path: {
            y: -100
          },
          curvature: {
            y: '50%'
          },
          el: document.createElement('div')
        });
        d = mp.path.getAttribute('d');
        expect(mp.getPath() instanceof SVGElement).toBe(true);
        points = parseQadraticCurve(d);
        expect(points.start.x).toBe(0);
        expect(points.start.y).toBe(0);
        expect(points.end.x).toBe(0);
        expect(points.end.y).toBe(-100);
        expect(points.control.x).toBeCloseTo(50);
        return expect(points.control.y).toBeCloseTo(-75);
      });
    });
    describe('curveToPath method', function() {
      it('should return a path', function() {
        var path;
        mp = new MotionPath({
          path: "M100, 299",
          el: document.createElement('div')
        });
        path = mp.curveToPath({
          start: {
            x: 0,
            y: 0
          },
          shift: {
            x: 100,
            y: -200
          },
          curvature: {
            x: 20,
            y: 20
          }
        });
        return expect(path instanceof SVGElement).toBe(true);
      });
      it('should calculate end coordinates relative to start ones', function() {
        var d, path, points;
        mp = new MotionPath({
          path: "M100, 299",
          el: document.createElement('div')
        });
        path = mp.curveToPath({
          start: {
            x: 200,
            y: 200
          },
          shift: {
            x: 100,
            y: -200
          },
          curvature: {
            x: 223,
            y: 200
          }
        });
        d = path.getAttribute('d');
        points = parseQadraticCurve(d);
        expect(points.start.x).toBe(200);
        expect(points.start.y).toBe(200);
        expect(points.end.x).toBe(300);
        expect(points.end.y).toBe(0);
        expect(points.control.x).toBeCloseTo(478.61);
        return expect(points.control.y).toBeCloseTo(89.985);
      });
      it('should calculate curvature based on curve direction', function() {
        var d, path, points;
        mp = new MotionPath({
          path: "M100, 299",
          el: document.createElement('div')
        });
        path = mp.curveToPath({
          start: {
            x: 200,
            y: 200
          },
          shift: {
            x: -100,
            y: 100
          },
          curvature: {
            x: 141,
            y: 50
          }
        });
        d = path.getAttribute('d');
        points = parseQadraticCurve(d);
        expect(points.start.x).toBe(200);
        expect(points.start.y).toBe(200);
        expect(points.end.x).toBe(100);
        expect(points.end.y).toBe(300);
        expect(points.control.x).toBeCloseTo(64.94);
        return expect(points.control.y).toBeCloseTo(264.346);
      });
      return it('should calculate percent curvature', function() {
        var d, path, points;
        mp = new MotionPath({
          path: "M100, 299",
          el: document.createElement('div')
        });
        path = mp.curveToPath({
          start: {
            x: 200,
            y: 200
          },
          shift: {
            x: -100,
            y: 100
          },
          curvature: {
            x: '50%',
            y: '25%'
          }
        });
        d = path.getAttribute('d');
        points = parseQadraticCurve(d);
        expect(points.start.x).toBe(200);
        expect(points.start.y).toBe(200);
        expect(points.end.x).toBe(100);
        expect(points.end.y).toBe(300);
        expect(points.control.x).toBeCloseTo(125);
        return expect(points.control.y).toBeCloseTo(225);
      });
    });
    describe('el option (parseEl method) ->', function() {
      it('should return an el when it was specified by selector', function() {
        var div, id;
        id = 'js-el';
        div = document.createElement('div');
        div.setAttribute('id', id);
        div.setAttribute('class', id);
        document.body.appendChild(div);
        mp = new MotionPath({
          path: coords,
          el: "#" + id
        });
        expect(mp.el instanceof HTMLElement).toBe(true);
        mp = new MotionPath({
          path: coords,
          el: "." + id
        });
        return expect(mp.el instanceof HTMLElement).toBe(true);
      });
      it('should return the el when the element was passed', function() {
        var div;
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div
        });
        return expect(mp.el instanceof HTMLElement).toBe(true);
      });
      it('should return the module when module was passed', function() {
        var tr;
        tr = new Shape;
        mp = new MotionPath({
          path: coords,
          el: tr,
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(mp.el).toBe(tr);
      });
      return it('should nicely error to console if el wasn\'t specified', function() {
        spyOn(h, 'error');
        mp = new MotionPath({
          path: coords,
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(h.error).toHaveBeenCalled();
      });
    });
    describe('then method ->', function() {
      it('should contribute to history on init', function() {
        var options;
        options = {
          path: coords,
          el: document.createElement('div'),
          duration: 2000
        };
        mp = new MotionPath(options);
        expect(mp.history.length).toBe(1);
        return expect(mp.history[0].duration).toBe(2000);
      });
      it('should contribute to history on then', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5
        }).then({
          pathStart: .5,
          pathEnd: 1
        });
        expect(mp.history.length).toBe(2);
        expect(mp.history[1].pathStart).toBe(.5);
        return expect(mp.history[1].pathEnd).toBe(1);
      });
      it('should copy duration from previous record', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5,
          delay: 100
        }).then({
          pathStart: .5,
          pathEnd: 1
        });
        expect(mp.history[1].delay).toBe(void 0);
        return expect(mp.history[1].duration).toBe(2000);
      });
      it('should save previous options to the current history record #2', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5,
          delay: 100
        }).then({
          pathStart: .5,
          pathEnd: 1
        });
        return expect(mp.timeline._timelines[1]._props.shiftTime).toBe(2100);
      });
      it('should not copy previous callbacks', function() {
        var onUpdate;
        onUpdate = function() {};
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5,
          delay: 100,
          onUpdate: onUpdate
        }).then({
          pathStart: .5,
          pathEnd: 1,
          delay: 0
        });
        mp.timeline.setProgress(.74);
        mp.timeline.setProgress(.75);
        expect(mp.history[1].onUpdate).not.toBeDefined();
        return expect(mp.props.onUpdate).not.toBeDefined();
      });
      it('should add new callbacks if specified', function() {
        var onUpdate;
        onUpdate = function() {};
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5,
          delay: 100,
          onUpdate: onUpdate
        }).then({
          pathStart: .5,
          pathEnd: 1,
          delay: 0,
          onUpdate: function() {}
        });
        mp.timeline.setProgress(.75);
        expect(mp.history[1].onUpdate).toBeDefined();
        return expect(mp.props.onUpdate).toBeDefined();
      });
      it('should add new timeline', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5,
          onUpdate: function() {}
        }).then({
          pathStart: .5,
          pathEnd: 1
        });
        expect(mp.timeline._timelines.length).toBe(2);
        expect(mp.timeline._timelines[1]._o.duration).toBe(2000);
        return expect(mp.timeline._timelines[1]._o.onFirstUpdate).toBeDefined();
      });
      it('should add isChained option to the new timeline', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5,
          onUpdate: function() {}
        }).then({
          pathStart: .5,
          pathEnd: 1
        });
        return expect(mp.timeline._timelines[1]._o.isChained).toBe(true);
      });
      return it('should not add isChained option if delay', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5,
          onUpdate: function() {}
        }).then({
          pathStart: .5,
          pathEnd: 1,
          delay: 100
        });
        return expect(mp.timeline._timelines[1]._o.isChained).toBe(false);
      });
    });
    describe('tuneOptions ->', function() {
      it('should tune options', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5
        });
        mp.tuneOptions({
          duration: 5000
        });
        expect(mp.props.duration).toBe(5000);
        return expect(mp.props.pathEnd).toBe(.5);
      });
      return it('should recalc el, path, len, fill, container if defined', function() {
        var coordsIE, pathCoords;
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5,
          isRunLess: true
        });
        coords = 'M0,0 L 105,105';
        coordsIE = 'M 0 0 L 105 105';
        mp.tuneOptions({
          duration: 5000,
          path: coords
        });
        pathCoords = mp.path.getAttribute('d');
        return expect(pathCoords === coords || pathCoords === coordsIE).toBe(true);
      });
    });
    describe('createTween method', function() {
      return it('should bind the onFirstUpdate metod', function() {
        var type;
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div')
        });
        type = typeof mp.timeline._timelines[0]._o.onFirstUpdate;
        return expect(type).toBe('function');
      });
    });
    describe('isModule flag ->', function() {
      return it('should be set if module was passed', function() {
        mp = new MotionPath({
          path: coords,
          el: new Shape({
            isRunLess: true
          }),
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(mp.isModule).toBe(true);
      });
    });
    describe('setModulePosition method ->', function() {
      it('should use setProp of the module to set position', function() {
        var module;
        module = new Shape({
          isRunLess: true
        });
        mp = new MotionPath({
          path: coords,
          el: module,
          isRunLess: true,
          isPresetPosition: false
        });
        spyOn(module, '_setProp');
        mp.angle = 0;
        mp.setModulePosition(100, 200);
        return expect(module._setProp).toHaveBeenCalledWith({
          shiftX: '100px',
          shiftY: '200px',
          angle: 0
        });
      });
      it('should call module.draw method', function() {
        var module;
        module = new Shape({
          isRunLess: true
        });
        mp = new MotionPath({
          path: coords,
          el: module,
          isRunLess: true,
          isPresetPosition: false
        });
        spyOn(mp.el, '_draw');
        mp.setProgress(0, true);
        return expect(mp.el._draw).toHaveBeenCalled();
      });
      it('should be called if isModule', function() {
        var module;
        module = new Shape({
          isRunLess: true
        });
        mp = new MotionPath({
          path: coords,
          el: module,
          isRunLess: true,
          isPresetPosition: false
        });
        spyOn(mp, 'setModulePosition');
        mp.setProgress(0, true);
        return expect(mp.setModulePosition).toHaveBeenCalled();
      });
      return it('should not be called if !isModule', function() {
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true,
          isPresetPosition: false
        });
        spyOn(mp, 'setModulePosition');
        mp.setProgress(0, true);
        return expect(mp.setModulePosition).not.toHaveBeenCalled();
      });
    });
    describe('addEvent method ->', function() {
      return it('should add event listener', function() {
        var div, handler, isHandler;
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div')
        });
        isHandler = false;
        div = document.createElement('div');
        handler = function() {
          return isHandler = true;
        };
        spyOn(div, 'addEventListener');
        mp.addEvent(div, 'click', handler);
        return expect(div.addEventListener).toHaveBeenCalledWith('click', handler, false);
      });
    });
    describe('extendDefaults method ->', function() {
      it('should copy options to self', function() {
        var div, path;
        path = 'M10,10 L100,100';
        div = document.createElement('div');
        mp = new MotionPath({
          path: path,
          el: div,
          isRunLess: true
        });
        mp.extendDefaults({
          path: path,
          el: div
        });
        expect(mp.path).toBe(path);
        return expect(mp.el).toBe(div);
      });
      return it('should not copy prototypes', function() {
        var Options, div, options, path;
        path = 'M10,10 L100,100';
        div = document.createElement('div');
        Options = (function() {
          function Options() {}

          Options.prototype.prop = 'some value';

          return Options;

        })();
        options = new Options;
        options.path = 'M10,10 L100,100';
        options.el = div;
        mp = new MotionPath({
          path: path,
          el: div,
          isRunLess: true
        });
        mp.extendDefaults(options);
        expect(mp.path).toBe(options.path);
        expect(mp.el).toBe(options.el);
        return expect(mp.props).not.toBe(options.props);
      });
    });
    describe('calcWidth method', function() {
      it('should calc scaler.x based on passed size', function() {
        var size;
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true
        });
        size = {
          width: 200
        };
        mp.cSize = {
          width: 200
        };
        mp.scaler = {};
        mp.calcWidth(size);
        return expect(mp.scaler.x).toBe(mp.cSize.width / size.width);
      });
      return it('if result scaler.x is not finite, then should be set to 1', function() {
        var size;
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true
        });
        size = {
          width: 0
        };
        mp.cSize = {
          width: 200
        };
        mp.scaler = {};
        mp.calcWidth(size);
        return expect(mp.scaler.x).toBe(1);
      });
    });
    describe('calcHeight method', function() {
      it('should calc scaler.y based on passed size', function() {
        var size;
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true
        });
        size = {
          height: 200
        };
        mp.cSize = {
          height: 200
        };
        mp.scaler = {};
        mp.calcHeight(size);
        return expect(mp.scaler.y).toBe(mp.cSize.height / size.height);
      });
      return it('if result scaler.x is not finite, then should be set to 1', function() {
        var size;
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true
        });
        size = {
          height: 0
        };
        mp.cSize = {
          height: 200
        };
        mp.scaler = {};
        mp.calcHeight(size);
        return expect(mp.scaler.y).toBe(1);
      });
    });
    describe('createFilter method ->', function() {
      var path;
      path = "M0,20 L100,150 L200,100";
      it('should get svg id', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        if (!isMotionReset) {
          return expect(mp.filterID).toBeDefined();
        }
      });
      it('should add svg element to body', function() {
        spyOn(h, 'getUniqID');
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        if (!isMotionReset) {
          expect(document.querySelector("#" + mp.filterID)).toBeTruthy();
          expect(document.querySelector("#" + mp.filterID).tagName).toBe('filter');
          return expect(h.getUniqID).toHaveBeenCalled();
        }
      });
      it('should add hidden svg element', function() {
        var el;
        spyOn(h, 'getUniqID');
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        if (!isMotionReset) {
          el = document.querySelector("#" + mp.filterID);
          expect(el.parentNode.style.visibility).toBe('hidden');
          expect(el.parentNode.style.width).toBe('0px');
          return expect(el.parentNode.style.height).toBe('0px');
        }
      });
      it('should add filter', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        if (!isMotionReset) {
          expect(mp.filter.tagName).toBe('feGaussianBlur');
          return expect(mp.filterOffset.tagName).toBe('feOffset');
        }
      });
      return it('should apply blur on element', function() {
        var prefixedStyle, style;
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: .5
        });
        mp.setProgress(.1);
        if (!isMotionReset) {
          style = mp.el.style.filter;
          prefixedStyle = mp.el.style[h.prefix.css + 'filter'];
          return expect((style || prefixedStyle).replace(/\"/gim, '')).toBe("url(#" + mp.filterID + ")");
        }
      });
    });
    describe('motionBlur at the end ->', function() {
      var path;
      path = "M0,20 L100,150 L200,100";
      return it('should set motion blur and offset to 0 at the end', function(dfr) {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          motionBlur: 1,
          duration: 200
        });
        return setTimeout(function() {
          if (isMotionReset) {
            return dfr();
          }
          expect(mp.filter.getAttribute('stdDeviation')).toBe('0,0');
          expect(mp.filterOffset.getAttribute('dx')).toBe('0');
          expect(mp.filterOffset.getAttribute('dy')).toBe('0');
          return dfr();
        }, 500);
      });
    });
    describe('motionBlur reset ->', function() {
      var path;
      path = "M0,20 L100,150 L200,100";
      return it('should reset motionBlur to 0 if in Safari or IE', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: .5
        });
        if (isMotionReset) {
          return expect(mp.props.motionBlur === 0).toBe(true);
        } else {
          return expect(mp.props.motionBlur === .5).toBe(true);
        }
      });
    });
    describe('motionBlur, makeMotionBlur method ->', function() {
      var path;
      if (isMotionReset) {
        return;
      }
      path = "M0,20 L100,150 L200,100";
      it('should be called if motionBlur passed', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: .5
        });
        spyOn(mp, 'makeMotionBlur');
        mp.setProgress(.1);
        return expect(mp.makeMotionBlur).toHaveBeenCalled();
      });
      it('should not be called if motionBlur was not passed', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true
        });
        spyOn(mp, 'makeMotionBlur');
        mp.setProgress(.1);
        return expect(mp.makeMotionBlur).not.toHaveBeenCalled();
      });
      it('save previous coordinates if motionBlur is defined', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: .5
        });
        mp.setProgress(.1);
        expect(mp.prevCoords.x).toBeCloseTo(16.81, 1);
        return expect(mp.prevCoords.y).toBeCloseTo(41.86, 1);
      });
      it('calculate speed and blur based on prevCoords', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1
        });
        mp.setProgress(.1);
        mp.setProgress(.11);
        expect(mp.speedX).toBeCloseTo(1.68, 1);
        expect(mp.speedY).toBeCloseTo(2.18, 1);
        expect(mp.blurX).toBeCloseTo(.1051, 5);
        return expect(mp.blurY).toBeCloseTo(.1366, 4);
      });
      it('should set speed to 0 if prevCoords are undefined yet', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1,
          isPresetPosition: false
        });
        mp.setProgress(.1);
        expect(mp.speedX).toBe(0);
        return expect(mp.speedY).toBe(0);
      });
      it('should have blur in range of [0,1]', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1,
          isPresetPosition: false
        });
        mp.setProgress(.1);
        mp.setProgress(.9);
        expect(mp.blurX).toBe(1);
        return expect(mp.blurY).toBe(1);
      });
      it('motionBlur should be in a range of [0,1]', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: -.5
        });
        return expect(mp.props.motionBlur).toBe(0);
      });
      it('motionBlur should be in a range of [0,1] #2', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        return expect(mp.props.motionBlur).toBe(1);
      });
      it('motionBlur should be in a range of [0,1] #2', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        return expect(mp.props.motionBlur).toBe(1);
      });
      it('should set blur to filter', function() {
        var attrs;
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        mp.setProgress(.1);
        mp.setProgress(.5);
        attrs = mp.filter.getAttribute('stdDeviation').split(',');
        expect(parseInt(attrs[0], 10)).toBeCloseTo(52);
        return expect(parseInt(attrs[1], 10)).toBeCloseTo(60);
      });
      return it('should set blur to filterOffset', function() {
        var dx, dy;
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        mp.setProgress(.1);
        mp.setProgress(.5);
        dx = mp.filterOffset.getAttribute('dx');
        dy = mp.filterOffset.getAttribute('dy');
        expect(parseInt(dx, 10)).toBeCloseTo(-52);
        return expect(parseInt(dy, 10)).toBeCloseTo(-60);
      });
    });
    describe('angToCoords method ->', function() {
      var degree45, path;
      path = "M0,20 L100,150 L200,100";
      degree45 = 1;
      it('should translate angle to coordinates *y*', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        expect(mp.angToCoords(0).y).toBeCloseTo(-1);
        expect(mp.angToCoords(45).y).toBeCloseTo(-degree45, 1);
        expect(mp.angToCoords(90).y).toBe(0);
        expect(mp.angToCoords(135).y).toBeCloseTo(degree45, 1);
        expect(mp.angToCoords(180).y).toBeCloseTo(1);
        expect(mp.angToCoords(225).y).toBeCloseTo(degree45, 1);
        expect(mp.angToCoords(270).y).toBeCloseTo(0, 1);
        expect(mp.angToCoords(315).y).toBeCloseTo(-degree45, 1);
        expect(mp.angToCoords(-45).y).toBeCloseTo(-degree45, 1);
        return expect(mp.angToCoords(360).y).toBeCloseTo(-1);
      });
      return it('should translate angle to coordinates *x*', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1.5
        });
        expect(mp.angToCoords(0).x).toBeCloseTo(0, 1);
        expect(mp.angToCoords(45).x).toBeCloseTo(degree45, 1);
        expect(mp.angToCoords(90).x).toBeCloseTo(1, 1);
        expect(mp.angToCoords(135).x).toBeCloseTo(degree45, 1);
        expect(mp.angToCoords(180).x).toBeCloseTo(0, 1);
        expect(mp.angToCoords(225).x).toBeCloseTo(-degree45, 1);
        expect(mp.angToCoords(270).x).toBeCloseTo(-1, 1);
        expect(mp.angToCoords(315).x).toBeCloseTo(-degree45, 1);
        expect(mp.angToCoords(-45).x).toBeCloseTo(-degree45, 1);
        return expect(mp.angToCoords(360).x).toBeCloseTo(0, 1);
      });
    });
    return describe('setBlur method ->', function() {
      var path;
      if (isMotionReset) {
        return;
      }
      path = "M0,20 L100,150 L200,100";
      return it('should set blur and blurOffset to filter', function() {
        mp = new MotionPath({
          path: path,
          el: document.createElement('div'),
          isRunLess: true,
          motionBlur: 1
        });
        mp.setBlur({
          blur: {
            x: 5,
            y: 10
          },
          offset: {
            x: 6,
            y: 9
          }
        });
        expect(mp.filter.getAttribute('stdDeviation')).toBe('5,10');
        expect(mp.filterOffset.getAttribute('dx')).toBe('6');
        return expect(mp.filterOffset.getAttribute('dy')).toBe('9');
      });
    });
  });

}).call(this);

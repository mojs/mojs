(function() {
  var MotionPath, Transit, coords, h;

  MotionPath = window.mojs.MotionPath;

  Transit = window.mojs.Transit;

  h = window.mojs.helpers;

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
      var el, mp;
      el = document.createElement('div');
      mp = new MotionPath({
        path: 'M0.55859375,593.527344L0.55859375,593.527344',
        el: el
      });
      it('have angleof 0', function() {
        el = document.createElement('div');
        mp = new MotionPath({
          path: 'M0.55859375,593.527344L0.55859375,593.527344',
          el: el,
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(mp.angle).toBe(0);
      });
      it('delay should be defined', function() {
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
        expect(mp.defaults.isAngle).toBe(false);
        expect(mp.defaults.isReverse).toBe(false);
        expect(mp.defaults.isRunLess).toBe(false);
        expect(mp.defaults.isPresetPosition).toBe(true);
        expect(mp.defaults.onStart).toBe(null);
        expect(mp.defaults.onComplete).toBe(null);
        return expect(mp.defaults.onUpdate).toBe(null);
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
        var mp;
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
        var mp, o;
        o = {
          duration: 500
        };
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          isRunLess: true
        }).then({
          pathEnd: .5
        });
        spyOn(mp, 'tuneOptions');
        mp.run(o);
        return expect(mp.tuneOptions).toHaveBeenCalledWith(o);
      });
      it('shoud not call tuneOptions if options wasn\'t passed', function() {
        var mp;
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
        var mp;
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
        var mp;
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
          duration: 100,
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
          var isStarted, mp;
          isStarted = false;
          mp = new MotionPath({
            path: coords,
            el: div,
            duration: 64,
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
        return motionPath = new MotionPath({
          path: 'M0,0 L500,500',
          el: div,
          duration: 64,
          fill: {
            container: container
          },
          onComplete: function() {
            var args, height, isHeight, isWidth, width;
            args = motionPath.el.style.transform.split(/(translate\()|\,|\)/);
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
        var isFilled, mp;
        isFilled = false;
        return mp = new MotionPath({
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
            isFilled = isWidth && isHeight;
            expect(isFilled).toBe(true);
            return dfr();
          }
        });
      });
      it("if fillRule is \"height\" it should keep container\'s height and set \"width\" with aspect ratio", function(dfr) {
        var isFilled, mp;
        isFilled = false;
        return mp = new MotionPath({
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
            isFilled = isWidth && isHeight;
            expect(isFilled).toBe(true);
            return dfr();
          }
        });
      });
      return it('if container size was changed should recalc scaler', function(dfr) {
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
        return mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: el,
          duration: 100,
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
            x = mp.el.style.transform.split(/(translate\()|\,|\)/)[2];
            expect(parseInt(x, 10)).toBe(100);
            return dfr();
          }
        });
      });
    });
    describe('functionality ->', function() {
      var div;
      div = document.createElement('div');
      coords = 'M0.55859375,593.527344L0.55859375,593.527344';
      it('should work with positive offsetX', function(dfr) {
        var isEqual, mp, x;
        coords = 'M0,0 L0,10';
        x = 0;
        isEqual = false;
        return mp = new MotionPath({
          path: coords,
          el: div,
          offsetX: 10,
          duration: 50,
          isAngle: true,
          onComplete: function() {
            x = div.style.transform.split(/(translate\()|,|\)/)[2];
            return isEqual = parseInt(x, 10) === 10;
          }
        }, setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 100));
      });
      it('should work with negative offsetX', function(dfr) {
        var isEqual, mp, x;
        coords = 'M0,0 L0,10';
        x = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetX: -10,
          duration: 50,
          onComplete: function() {
            x = div.style.transform.split(/(translate\()|,|\)/)[2];
            x = parseInt(x, 10);
            return isEqual = x === -10;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 100);
      });
      it('should work with positive offsetY', function(dfr) {
        var isEqual, mp, y;
        coords = 'M0,0 L10,0';
        y = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetY: 10,
          duration: 50,
          onComplete: function() {
            y = div.style.transform.split(/(translate\()|,|\)/)[4];
            y = parseInt(y, 10);
            return isEqual = y === 10;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 100);
      });
      it('should work with negative offsetY', function(dfr) {
        var isEqual, mp, y;
        coords = 'M0,0 L10,0';
        y = 0;
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          offsetY: -10,
          duration: 50,
          onComplete: function() {
            y = div.style.transform.split(/(translate\()|,|\)/)[4];
            return isEqual = parseInt(y, 10) === -10;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 100);
      });
      it('should calculate current angle', function(dfr) {
        var angle, detect, isEqual, isEquial2, mp;
        coords = 'M0,0 L10,0 L10,10';
        angle = 0;
        isEqual = false;
        isEquial2 = false;
        detect = {};
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
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
        }), 100);
      });
      it('should calculate current angle with isReverse', function(dfr) {
        var angle, detect, isEqual, isEquial2, mp;
        coords = 'M0,0 L10,0 L10,10';
        angle = 0;
        isEqual = false;
        isEquial2 = false;
        detect = {};
        return mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
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
        }), 100));
      });
      it('should have transform-origin', function(dfr) {
        var isComplete, mp;
        coords = 'M0,0 L10,0 L10,10';
        isComplete = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          transformOrigin: '50% 50%',
          onComplete: function() {
            return isComplete = true;
          }
        });
        return setTimeout(function() {
          expect(mp.el.style['transform-origin'].length >= 1).toBe(true);
          return dfr();
        }, 100);
      });
      return it('transform-origin could be a function', function(dfr) {
        var isAngle, isProgress, mp;
        coords = 'M0,0 L10,0 L10,10';
        isAngle = false;
        isProgress = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
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
        var isEqual, mp;
        coords = 'M0,0 L10,0 L10,10';
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          angleOffset: 90,
          isAngle: true,
          onComplete: function() {
            return isEqual = mp.angle === 180;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 300);
      });
      it('angleOffset should work with negative angles', function(dfr) {
        var isEqual, mp;
        coords = 'M0,0 L10,0 L10,10';
        isEqual = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          angleOffset: -90,
          isAngle: true,
          onComplete: function() {
            return isEqual = mp.angle === 0;
          }
        });
        return setTimeout((function() {
          expect(isEqual).toBe(true);
          return dfr();
        }), 300);
      });
      it('should be evaluated if a function', function(dfr) {
        var isFunction, mp;
        coords = 'M0,0 L10,0 L10,10';
        isFunction = false;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          angleOffset: function(angle) {
            isFunction = true;
            return angle;
          }
        });
        return setTimeout((function() {
          expect(isFunction).toBe(true);
          return dfr();
        }), 300);
      });
      it('should get current angle', function(dfr) {
        var angleSum1, angleSum2, isOnAngle, mp;
        coords = 'M0,0 L10,0 L10,10';
        isOnAngle = false;
        angleSum1 = 0;
        angleSum2 = 0;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          isAngle: true,
          isRunLess: true,
          isPresetPosition: false,
          angleOffset: function(angle) {
            angleSum1 += angle;
            angleSum2 += mp.angle;
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
        }), 100);
      });
      it('should set current angle', function(dfr) {
        var angleShift, currAngle, isAnglesArray, isSet, mp;
        coords = 'M0,0 L10,0 L10,10';
        isSet = false;
        currAngle = 0;
        isAnglesArray = [];
        angleShift = 5;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
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
        }), 100);
      });
      it('angleOffset should get current progress as second parameter', function(dfr) {
        var isProgress, mp, proc;
        coords = 'M0,0 L10,0 L10,10';
        isProgress = false;
        proc = -1;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
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
        }), 100);
      });
      return it('should have scope of motion path', function() {
        var angleSum1, angleSum2, isRightScope, mp;
        coords = 'M0,0 L10,0 L10,10';
        isRightScope = false;
        angleSum1 = 0;
        angleSum2 = 0;
        mp = new MotionPath({
          path: coords,
          el: div,
          duration: 50,
          isAngle: true,
          angleOffset: function() {
            return isRightScope = this instanceof MotionPath;
          }
        });
        return expect(isRightScope).toBe(true);
      });
    });
    describe('setProgress function ->', function(dfr) {
      it('should have own function for setting up current progress', function() {
        var div, mp, pos;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          isRunLess: true
        });
        mp.setProgress(.5);
        pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(250);
      });
      it('should call the onUpdate callback', function() {
        var div, mp;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          isRunLess: true,
          onUpdate: function() {}
        });
        spyOn(mp, 'onUpdate');
        mp.setProgress(.5);
        return expect(mp.onUpdate).toHaveBeenCalledWith(.5);
      });
      return it('should not call the onUpdate callback on start', function() {
        var isCalled, mp;
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
    });
    describe('preset position ->', function() {
      it('should preset initial position by default', function() {
        var div, mp, pos;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M50,0 L500,0',
          el: div
        });
        pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(50);
      });
      return it('should not set initial position if isPresetPosition is false', function() {
        var div, mp;
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
        var mp;
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
        var div, mp, pos;
        div = document.createElement('div');
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          isRunLess: true,
          pathStart: .5,
          pathEnd: .75,
          isIt: true
        });
        mp.tween.setProgress(0);
        pos = parseInt(div.style.transform.split(/(translate\()|\,|\)/)[2], 10);
        return expect(pos).toBe(250);
      });
      return it('should end at pathEnd position', function(dfr) {
        var div, mp, pos;
        div = document.createElement('div');
        pos = -1;
        mp = new MotionPath({
          path: 'M0,0 L500,0',
          el: div,
          duration: 50,
          pathStart: .25,
          pathEnd: .5,
          onComplete: function() {
            pos = div.style.transform.split(/(translate\()|\,|\)/)[2];
            return pos = parseInt(pos, 10);
          }
        });
        return setTimeout((function() {
          expect(pos).toBe(250);
          return dfr();
        }), 100);
      });
    });
    describe('path option ->', function() {
      it('should have a getPath method', function() {
        var div, mp;
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div
        });
        return expect(mp.getPath).toBeDefined();
      });
      it('getPath should return a path when was specified by coordinates', function() {
        var div, mp;
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div
        });
        return expect(mp.getPath() instanceof SVGElement).toBe(true);
      });
      it('getPath should return a path when it was specified by SVG path', function() {
        var div, mp, path;
        path = document.createElementNS(ns, 'path');
        path.setAttribute('d', 'M0,0 L500,500 L1000, 0');
        div = document.createElement('div');
        mp = new MotionPath({
          path: path,
          el: div
        });
        return expect(mp.getPath() instanceof SVGElement).toBe(true);
      });
      it('should error if path has no d attribute', function() {
        var div, mp, path;
        path = document.createElementNS(ns, 'path');
        div = document.createElement('div');
        spyOn(h, 'error');
        mp = new MotionPath({
          path: path,
          el: div
        });
        return expect(h.error).toHaveBeenCalled();
      });
      return it('getPath should return a path when it was specified selector', function() {
        var div, id, mp, path, svg;
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
    });
    describe('el option (parseEl method) ->', function() {
      it('should return an el when it was specified by selector', function() {
        var div, id, mp;
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
        var div, mp;
        div = document.createElement('div');
        mp = new MotionPath({
          path: coords,
          el: div
        });
        return expect(mp.el instanceof HTMLElement).toBe(true);
      });
      return it('should return the module when module was passed', function() {
        var mp, tr;
        tr = new Transit({
          isRunLess: true
        });
        mp = new MotionPath({
          path: coords,
          el: tr,
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(mp.el).toBe(tr);
      });
    });
    describe('then method ->', function() {
      it('should contribute to history on init', function() {
        var mp, options;
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
        var mp;
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
      it('should save previous options to the current history record', function() {
        var mp;
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
        return expect(mp.history[1].delay).toBe(100);
      });
      it('should save previous options to the current history record #2', function() {
        var mp;
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div'),
          duration: 2000,
          pathEnd: .5,
          delay: 100
        }).then({
          pathStart: .5,
          pathEnd: 1,
          delay: 0
        });
        return expect(mp.tween.timelines[1].o.delay).toBe(2100);
      });
      it('should not copy previous callbacks', function() {
        var mp, onUpdate;
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
        mp.tween.setProgress(.75);
        expect(mp.history[1].onUpdate).not.toBeDefined();
        return expect(mp.props.onUpdate).not.toBeDefined();
      });
      return it('should add new timeline', function() {
        var mp;
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
        expect(mp.tween.timelines.length).toBe(2);
        expect(mp.tween.timelines[1].o.duration).toBe(2000);
        return expect(mp.tween.timelines[1].o.onFirstUpdate).toBeDefined();
      });
    });
    describe('tuneOptions ->', function() {
      it('should tune options', function() {
        var mp;
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
        var coordsIE, mp, pathCoords;
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
      return it('should bind the onFirstUpdateBackward metod', function() {
        var mp;
        mp = new MotionPath({
          path: coords,
          el: document.createElement('div')
        });
        return expect(typeof mp.timeline.o.onFirstUpdateBackward).toBe('function');
      });
    });
    describe('isModule flag ->', function() {
      return it('should be set if module was passed', function() {
        var mp;
        mp = new MotionPath({
          path: coords,
          el: new Transit({
            isRunLess: true
          }),
          isRunLess: true,
          isPresetPosition: false
        });
        return expect(mp.isModule).toBe(true);
      });
    });
    return describe('setModulePosition method ->', function() {
      it('should use setProp of the module to set position', function() {
        var module, mp;
        module = new Transit({
          isRunLess: true
        });
        mp = new MotionPath({
          path: coords,
          el: module,
          isRunLess: true,
          isPresetPosition: false
        });
        spyOn(module, 'setProp');
        mp.angle = 0;
        mp.setModulePosition(100, 200);
        return expect(module.setProp).toHaveBeenCalledWith({
          shiftX: '100px',
          shiftY: '200px',
          angle: 0
        });
      });
      it('should call module.draw method', function() {
        var module, mp;
        module = new Transit({
          isRunLess: true
        });
        mp = new MotionPath({
          path: coords,
          el: module,
          isRunLess: true,
          isPresetPosition: false
        });
        spyOn(mp.el, 'draw');
        mp.setProgress(0, true);
        return expect(mp.el.draw).toHaveBeenCalled();
      });
      it('should be called if isModule', function() {
        var module, mp;
        module = new Transit({
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
        var mp;
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
  });

}).call(this);

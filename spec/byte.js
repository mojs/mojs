(function() {
  var Bit, Byte, Rect, h, ns, svg;

  Byte = mojs.Byte;

  Bit = mojs.Bit;

  Rect = mojs.Rect;

  h = mojs.helpers;

  ns = 'http://www.w3.org/2000/svg';

  svg = typeof document.createElementNS === "function" ? document.createElementNS(ns, 'svg') : void 0;

  describe('Byte ->', function() {
    describe('extension ->', function() {
      return it('should extend Bit class', function() {
        var byte;
        byte = new Byte;
        return expect(byte instanceof Bit).toBe(true);
      });
    });
    it('should have vars function', function() {
      var byte;
      byte = new Byte;
      expect(byte.vars).toBeDefined();
      return expect(function() {
        return byte.vars();
      }).not.toThrow();
    });
    describe('defaults object ->', function() {
      return it('should have defaults object', function() {
        var byte;
        byte = new Byte;
        return expect(byte.defaults).toBeDefined();
      });
    });
    describe('options object ->', function() {
      it('should recieve empty options object by default', function() {
        var byte;
        byte = new Byte;
        return expect(byte.o).toBeDefined();
      });
      return it('should recieve options object', function() {
        var byte;
        byte = new Byte({
          option: 1
        });
        return expect(byte.o.option).toBe(1);
      });
    });
    it('should extend defaults object to properties', function() {
      var byte;
      byte = new Byte({
        radius: 45
      });
      return expect(byte.props.radius).toBe(45);
    });
    it('should extend defaults object to properties if object was passed', function() {
      var byte;
      byte = new Byte({
        radius: {
          45: 55
        }
      });
      return expect(byte.props.radius).toBe(45);
    });
    it('should calculate transform object', function() {
      var byte;
      byte = new Byte({
        deg: 90,
        radius: 25,
        strokeWidth: 4
      });
      expect(byte.props.transform).toBe('rotate(90,27,27)');
      return expect(byte.calcTransform).toBeDefined();
    });
    describe('size calculations ->', function() {
      it('should calculate size el size depending on largest value', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            6: 4
          }
        });
        return expect(byte.props.size).toBe(206);
      });
      it('should have sizeGap option', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            6: 4
          },
          sizeGap: 40
        });
        return expect(byte.props.size).toBe(286);
      });
      it('should calculate size el size depending on shape\'s ratio', function() {
        var byte, rect;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            6: 4
          },
          type: 'rect'
        });
        svg = document.createElementNS(ns, 'svg');
        rect = new Rect({
          ctx: svg
        });
        return expect(byte.props.size).toBe(206 * rect.ratio);
      });
      it('should not calculate size el size if size was passed', function() {
        var byte;
        byte = new Byte({
          radius: 100,
          strokeWidth: 5,
          size: 400
        });
        return expect(byte.props.size).toBe(400);
      });
      it('should not calculate size el size if external context was passed', function() {
        var byte;
        byte = new Byte({
          radius: 100,
          strokeWidth: 5,
          size: 400,
          ctx: svg
        });
        return expect(byte.props.size).toBe(400);
      });
      return it('should calculate center based on el size', function() {
        var byte;
        byte = new Byte({
          radius: {
            25: -100
          },
          strokeWidth: {
            4: 6
          }
        });
        expect(byte.props.size).toBe(206);
        return expect(byte.props.center).toBe(103);
      });
    });
    describe('el creation ->', function() {
      it('should create el', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        return expect(byte.el.tagName.toLowerCase()).toBe('div');
      });
      it('should create context', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        return expect(byte.el.firstChild.tagName.toLowerCase()).toBe('svg');
      });
      it('should set context styles', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        svg = byte.el.firstChild;
        expect(svg.style.position).toBe('absolute');
        expect(svg.style.width).toBe('100%');
        return expect(svg.style.height).toBe('100%');
      });
      it('should not create context and el if context was passed', function() {
        var byte;
        svg.isSvg = true;
        byte = new Byte({
          ctx: svg
        });
        expect(byte.el).not.toBeDefined();
        expect(byte.ctx).toBeDefined();
        return expect(byte.ctx.isSvg).toBe(true);
      });
      it('should set el size', function() {
        var byte;
        byte = new Byte({
          radius: 25,
          strokeWidth: 2
        });
        expect(byte.el.style.position).toBe('absolute');
        expect(byte.el.style.width).toBe('3.25rem');
        expect(byte.el.style.height).toBe('3.25rem');
        expect(byte.el.style['backface-visibility']).toBe('hidden');
        return expect(byte.el.style["" + h.prefix.css + "backface-visibility"]).toBe('hidden');
      });
      it('should create bit', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        expect(byte.bit).toBeDefined();
        return expect(byte.bit.o.isDrawLess).toBe(true);
      });
      it('should create bit based on type option or fallback to line', function() {
        var byte, byte2;
        byte = new Byte({
          radius: 25,
          type: 'rect'
        });
        byte2 = new Byte({
          radius: 25
        });
        expect(byte.bit.type).toBe('rect');
        return expect(byte2.bit.type).toBe('line');
      });
      it('should add itself to body', function() {
        var byte;
        byte = new Byte({
          radius: 25
        });
        return expect(byte.el.parentNode.tagName.toLowerCase()).toBe('body');
      });
      it('should add itself to parent if the option was passed', function() {
        var byte, div;
        div = typeof document.createElement === "function" ? document.createElement('div') : void 0;
        div.isDiv = true;
        byte = new Byte({
          radius: 25,
          parent: div
        });
        return expect(byte.el.parentNode.isDiv).toBe(true);
      });
      describe('render method ->', function() {
        it('should call draw method', function() {
          var byte;
          byte = new Byte({
            radius: 25
          });
          spyOn(byte, 'draw');
          byte.render();
          return expect(byte.draw).toHaveBeenCalled();
        });
        it('should not call draw method if isDrawLess option is true', function() {
          var byte;
          byte = new Byte({
            radius: 25,
            isDrawLess: true
          });
          spyOn(byte, 'draw');
          byte.render();
          return expect(byte.draw).not.toHaveBeenCalled();
        });
        it('should call createBit method', function() {
          var byte;
          byte = new Byte({
            radius: 25
          });
          spyOn(byte, 'createBit');
          byte.render();
          return expect(byte.createBit).toHaveBeenCalled();
        });
        it('should call calcSize method', function() {
          var byte;
          byte = new Byte({
            radius: 25
          });
          spyOn(byte, 'calcSize');
          byte.render();
          return expect(byte.calcSize).toHaveBeenCalled();
        });
        return it('should not call calcSize method id context was passed', function() {
          var byte;
          byte = new Byte({
            radius: 25,
            ctx: svg
          });
          spyOn(byte, 'calcSize');
          byte.render();
          return expect(byte.calcSize).not.toHaveBeenCalled();
        });
      });
      describe('draw method ->', function() {
        it('should call setProp method', function() {
          var byte;
          byte = new Byte({
            radius: 25
          });
          spyOn(byte.bit, 'setProp');
          byte.draw();
          return expect(byte.bit.setProp).toHaveBeenCalled();
        });
        it('should call bit.draw method', function() {
          var byte;
          byte = new Byte({
            radius: 25
          });
          spyOn(byte.bit, 'draw');
          byte.draw();
          return expect(byte.bit.draw).toHaveBeenCalled();
        });
        return it('should call calcTransform method', function() {
          var byte;
          byte = new Byte({
            radius: 25
          });
          spyOn(byte, 'calcTransform');
          byte.draw();
          return expect(byte.calcTransform).toHaveBeenCalled();
        });
      });
      describe('delta calculations ->', function() {
        describe('numeric values ->', function() {
          it('should calculate delta', function() {
            var byte, radiusDelta;
            byte = new Byte({
              radius: {
                25: 75
              }
            });
            radiusDelta = byte.deltas.radius;
            expect(radiusDelta.start).toBe(25);
            return expect(radiusDelta.delta).toBe(50);
          });
          it('should calculate delta with string arguments', function() {
            var byte, radiusDelta;
            byte = new Byte({
              radius: {
                '25': '75'
              }
            });
            radiusDelta = byte.deltas.radius;
            expect(radiusDelta.start).toBe(25);
            return expect(radiusDelta.delta).toBe(50);
          });
          it('should calculate delta with float arguments', function() {
            var byte, radiusDelta;
            byte = new Byte({
              radius: {
                '25.50': 75.50
              }
            });
            radiusDelta = byte.deltas.radius;
            expect(radiusDelta.start).toBe(25.5);
            return expect(radiusDelta.delta).toBe(50);
          });
          it('should calculate delta with negative start arguments', function() {
            var byte, radiusDelta;
            byte = new Byte({
              radius: {
                '-25.50': 75.50
              }
            });
            radiusDelta = byte.deltas.radius;
            expect(radiusDelta.start).toBe(-25.5);
            return expect(radiusDelta.delta).toBe(101);
          });
          return it('should calculate delta with negative end arguments', function() {
            var byte, radiusDelta;
            byte = new Byte({
              radius: {
                '25.50': -75.50
              }
            });
            radiusDelta = byte.deltas.radius;
            expect(radiusDelta.start).toBe(25.5);
            expect(radiusDelta.end).toBe(-75.5);
            return expect(radiusDelta.delta).toBe(-101);
          });
        });
        describe('color values ->', function() {
          return it('should calculate color delta', function() {
            var byte, colorDelta;
            byte = new Byte({
              stroke: {
                '#000': 'rgb(255,255,255)'
              }
            });
            colorDelta = byte.deltas.stroke;
            expect(colorDelta.start.r).toBe(0);
            expect(colorDelta.end.r).toBe(255);
            return expect(colorDelta.delta.r).toBe(255);
          });
        });
        describe('array values ->', function() {
          return it('should calculate array delta', function() {
            var arrayDelta, byte;
            byte = new Byte({
              strokeDasharray: {
                '200 100': '300'
              }
            });
            arrayDelta = byte.deltas.strokeDasharray;
            expect(arrayDelta.start.join(' ')).toBe('200 100');
            expect(arrayDelta.end.join(' ')).toBe('300 0');
            return expect(arrayDelta.delta.join(' ')).toBe('100 -100');
          });
        });
        return describe('tween-related values ->', function() {
          return it('should not calc delta for tween related props', function() {
            var byte;
            byte = new Byte({
              duration: {
                2000: 1000
              },
              isRunLess: true
            });
            return expect(byte.deltas.duration).not.toBeDefined();
          });
        });
      });
      return describe('setProgress method ->', function() {
        it('should set transition progress', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25.50': -75.50
            }
          });
          byte.setProgress(.5);
          return expect(byte.progress).toBe(.5);
        });
        it('should set value progress', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          byte.setProgress(.5);
          return expect(byte.props.radius).toBe(50);
        });
        it('should set color value progress and only int', function() {
          var byte, colorDelta;
          byte = new Byte({
            stroke: {
              '#000': 'rgb(255,255,255)'
            }
          });
          colorDelta = byte.deltas.stroke;
          byte.setProgress(.5);
          return expect(byte.props.stroke).toBe('rgba(127,127,127,1)');
        });
        it('should set color value progress for delta starting with 0', function() {
          var byte, colorDelta;
          byte = new Byte({
            stroke: {
              '#000': 'rgb(0,255,255)'
            }
          });
          colorDelta = byte.deltas.stroke;
          byte.setProgress(.5);
          return expect(byte.props.stroke).toBe('rgba(0,127,127,1)');
        });
        it('should set strokeDasharray/strokeDashoffset value progress', function() {
          var byte;
          byte = new Byte({
            strokeDasharray: {
              '200 100': '400'
            }
          });
          byte.setProgress(.5);
          return expect(byte.props.strokeDasharray).toBe('300 50 ');
        });
        it('should set 0 if progress is less then 0', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          byte.setProgress(-1);
          return expect(byte.progress).toBe(0);
        });
        return it('should set 1 if progress is greater then 1', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          byte.setProgress(2);
          return expect(byte.progress).toBe(1);
        });
      });
    });
    describe('Callbacks ->', function() {
      describe('onStart callback', function() {
        it('should call onStart callback', function() {
          var byte, isOnStart;
          isOnStart = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onStart: function() {
              return isOnStart = true;
            }
          });
          return expect(isOnStart).toBe(true);
        });
        return it('should have scope of byte', function() {
          var byte, isRightScope;
          isRightScope = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onStart: function() {
              return isRightScope = this instanceof Byte;
            }
          });
          return expect(isRightScope).toBe(true);
        });
      });
      describe('onUpdate callback', function() {
        it('should call onUpdate callback', function(dfr) {
          var byte, isOnUpdate;
          isOnUpdate = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onUpdate: function() {
              return isOnUpdate = true;
            }
          });
          return setTimeout(function() {
            expect(isOnUpdate).toBe(true);
            return dfr();
          }, 34);
        });
        it('should have scope of byte', function(dfr) {
          var byte, isRightScope;
          isRightScope = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onUpdate: function() {
              return isRightScope = this instanceof Byte;
            }
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 34);
        });
        return it('should set current progress', function(dfr) {
          var byte, progress;
          progress = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onUpdate: function(p) {
              return progress = p;
            },
            duration: 64
          });
          return setTimeout(function() {
            expect(progress).toBeGreaterThan(0);
            expect(progress).not.toBeGreaterThan(1);
            return dfr();
          }, 34);
        });
      });
      return describe('onComplete callback', function() {
        it('should call onComplete callback', function(dfr) {
          var byte, isOnComplete;
          isOnComplete = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onComplete: function() {
              return isOnComplete = true;
            },
            duration: 20
          });
          return setTimeout(function() {
            expect(isOnComplete).toBe(true);
            return dfr();
          }, 40);
        });
        return it('should have scope of byte', function(dfr) {
          var byte, isRightScope;
          isRightScope = null;
          byte = new Byte({
            radius: {
              '25': 75
            },
            onComplete: function() {
              return isRightScope = this instanceof Byte;
            },
            duration: 20
          });
          return setTimeout(function() {
            expect(isRightScope).toBe(true);
            return dfr();
          }, 40);
        });
      });
    });
    describe('Tweens ->', function() {
      it('should have TWEEN object', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        return expect(byte.TWEEN).toBeDefined();
      });
      it('should create tween object', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          }
        });
        return expect(byte.tween).toBeDefined();
      });
      it('should start tween after init', function() {
        var byte;
        byte = new Byte({
          radius: {
            '25': 75
          },
          onStart: function() {
            return spyOn(this.tween, 'start');
          }
        });
        return expect(byte.tween.start).toHaveBeenCalled();
      });
      it('should not start tween after init is isRunLess was passed', function() {
        var byte, isStarted;
        isStarted = null;
        byte = new Byte({
          radius: {
            '25': 75
          },
          isRunLess: true,
          onStart: function() {
            return isStarted = true;
          }
        });
        return expect(isStarted).toBeFalsy();
      });
      return describe('startTween method', function() {
        it('should start tween', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          spyOn(byte.tween, 'start');
          byte.startTween();
          h.stopAnimationLoop();
          return expect(byte.tween.start).toHaveBeenCalled();
        });
        return it('should start animation loop', function() {
          var byte;
          byte = new Byte({
            radius: {
              '25': 75
            }
          });
          spyOn(byte.h, 'startAnimationLoop');
          byte.startTween();
          return expect(byte.h.startAnimationLoop).toHaveBeenCalled();
        });
      });
    });
    return describe('easing ->', function() {
      it('should set easing option to props', function() {
        var byte;
        byte = new Byte({
          easing: 'Linear.None'
        });
        return expect(byte.props.easing).toBe('Linear.None');
      });
      it('should work with easing function', function() {
        var byte, easings;
        easings = {
          one: function() {
            var a;
            return a = 1;
          }
        };
        byte = new Byte({
          easing: easings.one
        });
        return expect(byte.props.easing.toString()).toBe(easings.one.toString());
      });
      return it('should work with easing function', function(dfr) {
        var byte, easings;
        easings = {
          one: function() {
            var a;
            return a = 2;
          }
        };
        spyOn(easings, 'one');
        byte = new Byte({
          easing: easings.one
        });
        byte.startTween();
        return setTimeout(function() {
          expect(easings.one).toHaveBeenCalled();
          return dfr();
        }, 25);
      });
    });
  });

}).call(this);

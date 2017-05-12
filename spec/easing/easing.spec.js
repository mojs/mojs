var easing = mojs.easing;

describe('easing ->', function() {
  describe('Linear ->', function() {
    it('should have None', function() {
      expect(easing.linear.none(.5)).toBe(.5);
    });
  });
  describe('sin ->', function() {
    it('should have In', function() {
      expect(easing.sin["in"](.5)).toBe(1 - Math.cos(.5 * Math.PI / 2));
    });
    it('should have Out', function() {
      expect(easing.sin.out(.5)).toBe(Math.sin(.5 * Math.PI / 2));
    });
    it('should have InOut', function() {
      var result;
      result = 0.5 * (1 - Math.cos(Math.PI * .5));
      expect(easing.sin.inout(.5)).toBe(result);
    });
  });
  describe('quad ->', function() {
    it('should have In', function() {
      expect(easing.quad["in"](.5)).toBe(.5 * .5);
    });
    it('should have Out', function() {
      expect(easing.quad.out(.5)).toBe(.5 * (2 - .5));
    });
    it('should have InOut', function() {
      expect(easing.quad.inout(.5)).toBe(.5);
      expect(easing.quad.inout(.25)).toBe(.125);
    });
  });
  describe('cubic ->', function() {
    it('should have In', function() {
      expect(easing.cubic["in"](.5)).toBe(.5 * .5 * .5);
    });
    it('should have Out', function() {
      expect(easing.cubic.out(.5)).toBe(.875);
    });
    it('should have InOut', function() {
      expect(easing.cubic.inout(.5)).toBe(.5);
      expect(easing.cubic.inout(.25)).toBe(.0625);
    });
  });
  describe('quart ->', function() {
    it('should have In', function() {
      expect(easing.quart["in"](.5)).toBe(.5 * .5 * .5 * .5);
    });
    it('should have Out', function() {
      expect(easing.quart.out(.5)).toBe(.9375);
    });
    it('should have InOut', function() {
      expect(easing.quart.inout(.5)).toBe(.5);
      expect(easing.quart.inout(.25)).toBe(.03125);
    });
  });
  describe('quint ->', function() {
    it('should have In', function() {
      expect(easing.quint["in"](.5)).toBe(.5 * .5 * .5 * .5 * .5);
    });
    it('should have Out', function() {
      expect(easing.quint.out(.5)).toBe(.96875);
    });
    it('should have InOut', function() {
      expect(easing.quint.inout(.5)).toBe(.5);
      expect(easing.quint.inout(.25)).toBe(.015625);
    });
  });
  describe('expo ->', function() {
    it('should have In', function() {
      expect(easing.expo["in"](0)).toBe(0);
      expect(easing.expo["in"](.5)).toBe(Math.pow(1024, .5 - 1));
    });
    it('should have Out', function() {
      expect(easing.expo.out(1)).toBe(1);
      expect(easing.expo.out(.5)).toBe(1 - Math.pow(2, -10 * .5));
    });
    it('should have InOut', function() {
      expect(easing.expo.inout(0)).toBe(0);
      expect(easing.expo.inout(1)).toBe(1);
      expect(easing.expo.inout(.25)).toBe(0.5 * Math.pow(1024, .5 - 1));
      expect(easing.expo.inout(.5)).toBe(.5);
    });
  });
  describe('circ ->', function() {
    it('should have In', function() {
      expect(easing.circ["in"](.5)).toBe(1 - Math.sqrt(1 - .5 * .5));
    });
    it('should have Out', function() {
      var k;
      k = .5;
      expect(easing.circ.out(k)).toBe(Math.sqrt(1 - (--k * k)));
    });
    it('should have InOut', function() {
      expect(easing.circ.inout(.25).toFixed(2)).toBe('0.07');
      expect(easing.circ.inout(.6).toFixed(2)).toBe('0.80');
    });
  });
  describe('elastic ->', function() {
    it('should have In', function() {
      expect(easing.elastic["in"](0)).toBe(0);
      expect(easing.elastic["in"](1)).toBe(1);
      expect(easing.elastic["in"](.75).toFixed(5)).toBe('-0.12500');
      expect(easing.elastic["in"](.1).toFixed(2)).toBe('0.00');
    });
    it('should have Out', function() {
      expect(easing.elastic.out(0)).toBe(0);
      expect(easing.elastic.out(1)).toBe(1);
      expect(easing.elastic.out(.75).toFixed(2)).toBe('1.00');
    });
    it('should have InOut', function() {
      expect(easing.elastic.inout(0)).toBe(0);
      expect(easing.elastic.inout(1)).toBe(1);
      expect(easing.elastic.inout(.25)).toBeCloseTo(0, 3);
      expect(easing.elastic.inout(.75).toFixed(2)).toBe('1.00');
    });
  });
  describe('back ->', function() {
    it('should have In', function() {
      expect(easing.back["in"](.75).toFixed(2)).toBe('0.18');
    });
    it('should have Out', function() {
      expect(easing.back.out(.75).toFixed(2)).toBe('1.06');
    });
    it('should have InOut', function() {
      expect(easing.back.inout(.25).toFixed(2)).toBe('-0.10');
      expect(easing.back.inout(.75).toFixed(2)).toBe('1.10');
    });
  });
  describe('bounce ->', function() {
    it('should have In', function() {
      expect(easing.bounce["in"](.75).toFixed(2)).toBe('0.53');
    });
    it('should have Out', function() {
      expect(easing.bounce.out(.1).toFixed(2)).toBe('0.08');
      expect(easing.bounce.out(.25).toFixed(2)).toBe('0.47');
      expect(easing.bounce.out(.75).toFixed(2)).toBe('0.97');
      expect(easing.bounce.out(.99).toFixed(2)).toBe('0.99');
    });
    it('should have InOut', function() {
      expect(easing.bounce.inout(.25).toFixed(2)).toBe('0.12');
      expect(easing.bounce.inout(.75).toFixed(2)).toBe('0.88');
    });
  });
  // describe('bezier ->', function() {
  //   it('should have bezier constructor', function() {
  //     expect(typeof easing.bezier).toBe('function');
  //   });
  // });
  // describe('path ->', function() {
  //   it('should have path constructor', function() {
  //     expect(typeof easing.path).toBe('function');
  //   });
  // });
  // describe('PathEasing ->', function() {
  //   it('should have PathEasing constructor', function() {
  //     expect(typeof easing.PathEasing).toBe('function');
  //   });
  // });
  // describe('inverse method ->', function() {
  //   it('should inverse passed value', function() {
  //     expect(easing.inverse(-2)).toBeCloseTo(3, 4);
  //     expect(easing.inverse(-1)).toBeCloseTo(2, 4);
  //     expect(easing.inverse(0)).toBeCloseTo(1, 4);
  //     expect(easing.inverse(.2)).toBeCloseTo(.8, 4);
  //     expect(easing.inverse(.5)).toBeCloseTo(.5, 4);
  //     expect(easing.inverse(.7)).toBeCloseTo(.3, 4);
  //     expect(easing.inverse(1)).toBeCloseTo(0, 4);
  //     expect(easing.inverse(2)).toBeCloseTo(-1, 4);
  //     expect(easing.inverse(3)).toBeCloseTo(-2, 4);
  //   });
  // });
  // describe('mix method ->', function() {
  //   it('should be definede', function() {
  //     expect(typeof easing.mix).toBe('function');
  //   });
  // });
  // describe('parseEasing method ->', function() {
  //   it('should parse function easing', function() {
  //     var fun;
  //     fun = function() {};
  //     expect(easing.parseEasing(fun)).toBe(fun);
  //     expect(typeof easing.parseEasing(fun)).toBe('function');
  //   });
  //   it('should parse null/undefined to liner.none', function() {
  //     var fun;
  //     fun = easing.parseEasing(null);
  //     expect(fun).toBe(mojs.easing.linear.none);
  //   });
  //   describe('easing name option ->', function() {
  //     it('should parse string easing', function() {
  //       expect(typeof easing.parseEasing('cubic.in')).toBe('function');
  //     });
  //     it('should error if easing was not found and fallback to linear one', function() {
  //       var fun;
  //       spyOn(mojs.h, 'error');
  //       fun = easing.parseEasing('sinusoidal.in');
  //       expect(mojs.h.error).toHaveBeenCalled();
  //       expect(fun).toBe(mojs.easing.linear.none);
  //     });
  //     describe('SVG path option ->', function() {
  //       it('should parse SVG path easing', function() {
  //         expect(typeof easing.parseEasing('M0,100 L100,0')).toBe('function');
  //       });
  //       it('should call easing.path method', function() {
  //         spyOn(window.mojs.easing, 'path');
  //         easing.parseEasing('M0,100 L100,0');
  //         expect(window.mojs.easing.path).toHaveBeenCalled();
  //       });
  //     });
  //     describe('bezier option ->', function() {
  //       it('should parse bezier easing', function() {
  //         expect(typeof easing.parseEasing([0.42, 0, 1, 1])).toBe('function');
  //       });
  //       it('should call bezier method', function() {
  //         spyOn(window.mojs.easing, 'bezier');
  //         easing.parseEasing([0.42, 0, 1, 1]);
  //         expect(window.mojs.easing.bezier).toHaveBeenCalled();
  //       });
  //     });
  //   });
  // });
  // describe('splitEasing method ->', function() {
  //   it('should split easing string to array', function() {
  //     expect(easing._splitEasing('Linear.None')[0]).toBe('linear');
  //     expect(easing._splitEasing('Linear.None')[1]).toBe('none');
  //   });
  //   it('should default easing Linear.None if argument is bad', function() {
  //     expect(easing._splitEasing(4)[0]).toBe('linear');
  //     expect(easing._splitEasing(4)[1]).toBe('none');
  //   });
  //   it('should default easing Linear.None if argument is bad #2', function() {
  //     expect(easing._splitEasing('')[0]).toBe('linear');
  //     expect(easing._splitEasing('')[1]).toBe('none');
  //   });
  //   it('should default easing Linear.None if argument is bad #3', function() {
  //     expect(easing._splitEasing('Linear..None')[0]).toBe('linear');
  //     expect(easing._splitEasing('Linear..None')[1]).toBe('none');
  //   });
  //   it('should work with lovercase easing', function() {
  //     expect(easing._splitEasing('linear..none')[0]).toBe('linear');
  //     expect(easing._splitEasing('linear..none')[1]).toBe('none');
  //   });
  //   it('should work with function easing', function() {
  //     var fun;
  //     fun = function() {
  //       console.log('function');
  //     };
  //     expect(easing._splitEasing(fun) + '').toBe(fun + '');
  //   });
  // });
  // describe('approximate object', function() {
  //   it('should de defined', function() {
  //     expect(easing.approximate).toBeDefined();
  //   });
  // });
});

easing = mojs.easing
describe 'easing ->', ->
  describe 'Linear ->', ->
    it 'should have None', ->
      expect(easing.linear.none(.5)).toBe .5
  describe 'ease ->', ->
    it 'should have In', ->
      expect(easing.ease.in.toStr()).toBe     'bezier(0.42,0,1,1)'
    it 'should have Out', ->
      expect(easing.ease.out.toStr()).toBe    'bezier(0,0,0.58,1)'
    it 'should have InOut', ->
      expect(easing.ease.inout.toStr()).toBe  'bezier(0.42,0,0.58,1)'
  describe 'quad ->', ->
    it 'should have In', ->
      expect(easing.quad.in(.5)).toBe .5*.5
    it 'should have Out', ->
      expect(easing.quad.out(.5)).toBe .5*(2-.5)
    it 'should have InOut', ->
      expect(easing.quad.inout(.5)).toBe .5
      expect(easing.quad.inout(.25)).toBe .125
  describe 'cubic ->', ->
    it 'should have In', ->
      expect(easing.cubic.in(.5)).toBe .5*.5*.5
    it 'should have Out', ->
      expect(easing.cubic.out(.5)).toBe .875
    it 'should have InOut', ->
      expect(easing.cubic.inout(.5)).toBe .5
      expect(easing.cubic.inout(.25)).toBe .0625
  describe 'quart ->', ->
    it 'should have In', ->
      expect(easing.quart.in(.5)).toBe .5*.5*.5*.5
    it 'should have Out', ->
      expect(easing.quart.out(.5)).toBe .9375
    it 'should have InOut', ->
      expect(easing.quart.inout(.5)).toBe .5
      expect(easing.quart.inout(.25)).toBe .03125
  describe 'quint ->', ->
    it 'should have In', ->
      expect(easing.quint.in(.5)).toBe .5*.5*.5*.5*.5
    it 'should have Out', ->
      expect(easing.quint.out(.5)).toBe .96875
    it 'should have InOut', ->
      expect(easing.quint.inout(.5)).toBe .5
      expect(easing.quint.inout(.25)).toBe .015625
  describe 'sin ->', ->
    it 'should have In', ->
      expect(easing.sin.in(.5)).toBe 1 - Math.cos(.5 * Math.PI / 2)
    it 'should have Out', ->
      expect(easing.sin.out(.5)).toBe Math.sin(.5 * Math.PI / 2)
    it 'should have InOut', ->
      result = 0.5 * (1 - Math.cos(Math.PI * .5))
      expect(easing.sin.inout(.5)).toBe result
  describe 'expo ->', ->
    it 'should have In', ->
      expect(easing.expo.in(0)).toBe 0
      expect(easing.expo.in(.5)).toBe Math.pow(1024, .5 - 1)
    it 'should have Out', ->
      expect(easing.expo.out(1)).toBe 1
      expect(easing.expo.out(.5)).toBe 1 - Math.pow(2, -10 * .5)
    it 'should have InOut', ->
      expect(easing.expo.inout(0)).toBe 0
      expect(easing.expo.inout(1)).toBe 1
      expect(easing.expo.inout(.25)).toBe 0.5 * Math.pow(1024, .5 - 1)
      expect(easing.expo.inout(.5)).toBe  .5
  describe 'circ ->', ->
    it 'should have In', ->
      expect(easing.circ.in(.5)).toBe 1 - Math.sqrt(1 - .5 * .5)
    it 'should have Out', ->
      k = .5
      expect(easing.circ.out(k)).toBe Math.sqrt 1 - (--k * k)
    it 'should have InOut', ->
      expect(easing.circ.inout(.25).toFixed(2)).toBe '0.07'
      expect(easing.circ.inout(.6).toFixed(2)).toBe  '0.80'
  describe 'elastic ->', ->
    it 'should have In', ->
      expect(easing.elastic.in(0)).toBe 0
      expect(easing.elastic.in(1)).toBe 1
      expect(easing.elastic.in(.75).toFixed(5)).toBe '-0.12500'
      expect(easing.elastic.in(.1).toFixed(2)).toBe '0.00'
    it 'should have Out', ->
      expect(easing.elastic.out(0)).toBe 0
      expect(easing.elastic.out(1)).toBe 1
      expect(easing.elastic.out(.75).toFixed(2)).toBe '1.00'
    it 'should have InOut', ->
      expect(easing.elastic.inout(0)).toBe 0
      expect(easing.elastic.inout(1)).toBe 1
      expect(easing.elastic.inout(.25).toFixed(2)).toBe '0.00'
      expect(easing.elastic.inout(.75).toFixed(2)).toBe '1.00'
  describe 'back ->', ->
    it 'should have In', ->
      expect(easing.back.in(.75).toFixed(2)).toBe '0.18'
    it 'should have Out', ->
      expect(easing.back.out(.75).toFixed(2)).toBe '1.06'
    it 'should have InOut', ->
      expect(easing.back.inout(.25).toFixed(2)).toBe '-0.10'
      expect(easing.back.inout(.75).toFixed(2)).toBe '1.10'
  describe 'bounce ->', ->
    it 'should have In', ->
      expect(easing.bounce.in(.75).toFixed(2)).toBe '0.53'
    it 'should have Out', ->
      expect(easing.bounce.out(.1).toFixed(2)).toBe   '0.08'
      expect(easing.bounce.out(.25).toFixed(2)).toBe  '0.47'
      expect(easing.bounce.out(.75).toFixed(2)).toBe  '0.97'
      expect(easing.bounce.out(.99).toFixed(2)).toBe  '0.99'
    it 'should have InOut', ->
      expect(easing.bounce.inout(.25).toFixed(2)).toBe '0.12'
      expect(easing.bounce.inout(.75).toFixed(2)).toBe '0.88'
  describe 'bezier ->', ->
    it 'should have bezier constructor', ->
      expect(typeof easing.bezier).toBe 'function'
  describe 'path ->', ->
    it 'should have path constructor', ->
      expect(typeof easing.path).toBe 'function'
  describe 'PathEasing ->', ->
    it 'should have PathEasing constructor', ->
      expect(typeof easing.PathEasing).toBe 'function'
  describe 'inverse method ->', ->
    it 'should inverse passed value', ->
      expect(easing.inverse(-2)).toBeCloseTo  3, 4
      expect(easing.inverse(-1)).toBeCloseTo  2, 4
      expect(easing.inverse(0)) .toBeCloseTo  1, 4
      expect(easing.inverse(.2)).toBeCloseTo .8, 4
      expect(easing.inverse(.5)).toBeCloseTo .5, 4
      expect(easing.inverse(.7)).toBeCloseTo .3, 4
      expect(easing.inverse(1)) .toBeCloseTo  0, 4
      expect(easing.inverse(2)) .toBeCloseTo -1, 4
      expect(easing.inverse(3)) .toBeCloseTo -2, 4
  describe 'mix method ->', ->
    it 'should be definede', ->
      expect(typeof easing.mix).toBe 'function'

  describe 'parseEasing method ->', ->
    it 'should parse function easing', ->
      fun = ->
      expect(easing.parseEasing(fun)).toBe fun
      expect(typeof easing.parseEasing(fun)).toBe 'function'
    it 'should parse null/undefined to liner.none', ->
        fun = easing.parseEasing(null)
        expect(fun).toBe mojs.easing.linear.none
        
    describe 'easing name option ->', ->
      it 'should parse string easing', ->
        expect(typeof easing.parseEasing('cubic.in')).toBe 'function'
      it 'should error if easing was not found and fallback to linear one', ->
        spyOn mojs.h, 'error'
        fun = easing.parseEasing('sinusoidal.in')
        expect(mojs.h.error).toHaveBeenCalled()
        expect(fun).toBe mojs.easing.linear.none
      # it 'should call easing.splitEasing method', ->
      #   t = new Tween duration: 100
      #   spyOn h, 'splitEasing'
      #   easing.parseEasing('cubic.in')
      #   expect(easing.splitEasing).toHaveBeenCalled()
      describe 'SVG path option ->', ->
        it 'should parse SVG path easing', ->
          expect(typeof easing.parseEasing('M0,100 L100,0')).toBe 'function'
        it 'should call easing.path method', ->
          spyOn window.mojs.easing, 'path'
          easing.parseEasing('M0,100 L100,0')
          expect(window.mojs.easing.path).toHaveBeenCalled()
      describe 'bezier option ->', ->
        it 'should parse bezier easing', ->
          expect(typeof easing.parseEasing([0.42,0,1,1])).toBe 'function'
        it 'should call bezier method', ->
          spyOn window.mojs.easing, 'bezier'
          easing.parseEasing([0.42,0,1,1])
          expect(window.mojs.easing.bezier).toHaveBeenCalled()

  describe 'splitEasing method ->', ->
    it 'should split easing string to array',->
      expect(easing._splitEasing('Linear.None')[0]).toBe 'linear'
      expect(easing._splitEasing('Linear.None')[1]).toBe 'none'
    it 'should return default easing Linear.None if argument is bad', ->
      expect(easing._splitEasing(4)[0]).toBe 'linear'
      expect(easing._splitEasing(4)[1]).toBe 'none'
    it 'should return default easing Linear.None if argument is bad #2', ->
      expect(easing._splitEasing('')[0]).toBe 'linear'
      expect(easing._splitEasing('')[1]).toBe 'none'
    it 'should return default easing Linear.None if argument is bad #3', ->
      expect(easing._splitEasing('Linear..None')[0]).toBe 'linear'
      expect(easing._splitEasing('Linear..None')[1]).toBe 'none'
    it 'should work with lovercase easing', ->
      expect(easing._splitEasing('linear..none')[0]).toBe 'linear'
      expect(easing._splitEasing('linear..none')[1]).toBe 'none'
    it 'should work with function easing', ->
      fun = -> console.log 'function'
      expect(easing._splitEasing(fun)+'').toBe fun+''

  describe 'approximate object', ->
    it 'should de defined', ->
      expect(easing.approximate).toBeDefined();

    












easing = mojs.easing
describe 'easing ->', ->
  describe 'Linear ->', ->
    it 'should have None', ->
      expect(easing.linear.none(.5)).toBe .5
  describe 'quadratic ->', ->
    it 'should have In', ->
      expect(easing.quadratic.in(.5)).toBe .5*.5
    it 'should have Out', ->
      expect(easing.quadratic.out(.5)).toBe .5*(2-.5)
    it 'should have InOut', ->
      expect(easing.quadratic.inout(.5)).toBe .5
      expect(easing.quadratic.inout(.25)).toBe .125
  describe 'cubic ->', ->
    it 'should have In', ->
      expect(easing.cubic.in(.5)).toBe .5*.5*.5
    it 'should have Out', ->
      expect(easing.cubic.out(.5)).toBe .875
    it 'should have InOut', ->
      expect(easing.cubic.inout(.5)).toBe .5
      expect(easing.cubic.inout(.25)).toBe .0625
  describe 'quartic ->', ->
    it 'should have In', ->
      expect(easing.quartic.in(.5)).toBe .5*.5*.5*.5
    it 'should have Out', ->
      expect(easing.quartic.out(.5)).toBe .9375
    it 'should have InOut', ->
      expect(easing.quartic.inout(.5)).toBe .5
      expect(easing.quartic.inout(.25)).toBe .03125
  describe 'quintic ->', ->
    it 'should have In', ->
      expect(easing.quintic.in(.5)).toBe .5*.5*.5*.5*.5
    it 'should have Out', ->
      expect(easing.quintic.out(.5)).toBe .96875
    it 'should have InOut', ->
      expect(easing.quintic.inout(.5)).toBe .5
      expect(easing.quintic.inout(.25)).toBe .015625
  describe 'sinusoidal ->', ->
    it 'should have In', ->
      expect(easing.sinusoidal.in(.5)).toBe 1 - Math.cos(.5 * Math.PI / 2)
    it 'should have Out', ->
      expect(easing.sinusoidal.out(.5)).toBe Math.sin(.5 * Math.PI / 2)
    it 'should have InOut', ->
      result = 0.5 * (1 - Math.cos(Math.PI * .5))
      expect(easing.sinusoidal.inout(.5)).toBe result
  describe 'exponential ->', ->
    it 'should have In', ->
      expect(easing.exponential.in(0)).toBe 0
      expect(easing.exponential.in(.5)).toBe Math.pow(1024, .5 - 1)
    it 'should have Out', ->
      expect(easing.exponential.out(1)).toBe 1
      expect(easing.exponential.out(.5)).toBe 1 - Math.pow(2, -10 * .5)
    it 'should have InOut', ->
      expect(easing.exponential.inout(0)).toBe 0
      expect(easing.exponential.inout(1)).toBe 1
      expect(easing.exponential.inout(.25)).toBe 0.5 * Math.pow(1024, .5 - 1)
      expect(easing.exponential.inout(.5)).toBe  .5
  describe 'circular ->', ->
    it 'should have In', ->
      expect(easing.circular.in(.5)).toBe 1 - Math.sqrt(1 - .5 * .5)
    it 'should have Out', ->
      k = .5
      expect(easing.circular.out(k)).toBe Math.sqrt 1 - (--k * k)
    it 'should have InOut', ->
      expect(easing.circular.inout(.25).toFixed(2)).toBe '0.07'
      expect(easing.circular.inout(.6).toFixed(2)).toBe  '0.80'
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
    












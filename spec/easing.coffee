easing = mojs.easing
describe 'easing', ->
  describe 'Linear ->', ->
    it 'should have None', ->
      expect(easing.Linear.None(.5)).toBe .5
  describe 'Quadratic ->', ->
    it 'should have In', ->
      expect(easing.Quadratic.In(.5)).toBe .5*.5
    it 'should have Out', ->
      expect(easing.Quadratic.Out(.5)).toBe .5*(2-.5)
    it 'should have InOut', ->
      expect(easing.Quadratic.InOut(.5)).toBe .5
      expect(easing.Quadratic.InOut(.25)).toBe .125
  describe 'Cubic ->', ->
    it 'should have In', ->
      expect(easing.Cubic.In(.5)).toBe .5*.5*.5
    it 'should have Out', ->
      expect(easing.Cubic.Out(.5)).toBe .875
    it 'should have InOut', ->
      expect(easing.Cubic.InOut(.5)).toBe .5
      expect(easing.Cubic.InOut(.25)).toBe .0625
  describe 'Quartic ->', ->
    it 'should have In', ->
      expect(easing.Quartic.In(.5)).toBe .5*.5*.5*.5
    it 'should have Out', ->
      expect(easing.Quartic.Out(.5)).toBe .9375
    it 'should have InOut', ->
      expect(easing.Quartic.InOut(.5)).toBe .5
      expect(easing.Quartic.InOut(.25)).toBe .03125
  describe 'Quintic ->', ->
    it 'should have In', ->
      expect(easing.Quintic.In(.5)).toBe .5*.5*.5*.5*.5
    it 'should have Out', ->
      expect(easing.Quintic.Out(.5)).toBe .96875
    it 'should have InOut', ->
      expect(easing.Quintic.InOut(.5)).toBe .5
      expect(easing.Quintic.InOut(.25)).toBe .015625
  describe 'Sinusoidal ->', ->
    it 'should have In', ->
      expect(easing.Sinusoidal.In(.5)).toBe 1 - Math.cos(.5 * Math.PI / 2)
    it 'should have Out', ->
      expect(easing.Sinusoidal.Out(.5)).toBe Math.sin(.5 * Math.PI / 2)
    it 'should have InOut', ->
      result = 0.5 * (1 - Math.cos(Math.PI * .5))
      expect(easing.Sinusoidal.InOut(.5)).toBe result
  describe 'Exponential ->', ->
    it 'should have In', ->
      expect(easing.Exponential.In(0)).toBe 0
      expect(easing.Exponential.In(.5)).toBe Math.pow(1024, .5 - 1)
    it 'should have Out', ->
      expect(easing.Exponential.Out(1)).toBe 1
      expect(easing.Exponential.Out(.5)).toBe 1 - Math.pow(2, -10 * .5)
    it 'should have InOut', ->
      expect(easing.Exponential.InOut(0)).toBe 0
      expect(easing.Exponential.InOut(1)).toBe 1
      expect(easing.Exponential.InOut(.25)).toBe 0.5 * Math.pow(1024, .5 - 1)
      expect(easing.Exponential.InOut(.5)).toBe  .5
  describe 'Circular ->', ->
    it 'should have In', ->
      expect(easing.Circular.In(.5)).toBe 1 - Math.sqrt(1 - .5 * .5)
    it 'should have Out', ->
      k = .5
      expect(easing.Circular.Out(k)).toBe Math.sqrt 1 - (--k * k)
    it 'should have InOut', ->
      expect(easing.Circular.InOut(.25).toFixed(2)).toBe '0.07'
      expect(easing.Circular.InOut(.6).toFixed(2)).toBe  '0.80'
  describe 'Elastic ->', ->
    it 'should have In', ->
      expect(easing.Elastic.In(0)).toBe 0
      expect(easing.Elastic.In(1)).toBe 1
      expect(easing.Elastic.In(.75).toFixed(5)).toBe '-0.12500'
      expect(easing.Elastic.In(.1).toFixed(2)).toBe '0.00'
    it 'should have Out', ->
      expect(easing.Elastic.Out(0)).toBe 0
      expect(easing.Elastic.Out(1)).toBe 1
      expect(easing.Elastic.Out(.75).toFixed(2)).toBe '1.00'
    it 'should have InOut', ->
      expect(easing.Elastic.InOut(0)).toBe 0
      expect(easing.Elastic.InOut(1)).toBe 1
      expect(easing.Elastic.InOut(.25).toFixed(2)).toBe '0.00'
      expect(easing.Elastic.InOut(.75).toFixed(2)).toBe '1.00'
  describe 'Back ->', ->
    it 'should have In', ->
      expect(easing.Back.In(.75).toFixed(2)).toBe '0.18'
    it 'should have Out', ->
      expect(easing.Back.Out(.75).toFixed(2)).toBe '1.06'
    it 'should have InOut', ->
      expect(easing.Back.InOut(.25).toFixed(2)).toBe '-0.10'
      expect(easing.Back.InOut(.75).toFixed(2)).toBe '1.10'
  describe 'Bounce ->', ->
    it 'should have In', ->
      expect(easing.Bounce.In(.75).toFixed(2)).toBe '0.53'
    it 'should have Out', ->
      expect(easing.Bounce.Out(.1).toFixed(2)).toBe   '0.08'
      expect(easing.Bounce.Out(.25).toFixed(2)).toBe  '0.47'
      expect(easing.Bounce.Out(.75).toFixed(2)).toBe  '0.97'
      expect(easing.Bounce.Out(.99).toFixed(2)).toBe  '0.99'
    it 'should have InOut', ->
      expect(easing.Bounce.InOut(.25).toFixed(2)).toBe '0.12'
      expect(easing.Bounce.InOut(.75).toFixed(2)).toBe '0.88'
    












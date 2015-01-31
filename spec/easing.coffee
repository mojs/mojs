Easing = mojs.Easing
describe 'Easing', ->
  describe 'Linear ->', ->
    it 'should have None', ->
      expect(Easing.Linear.None(.5)).toBe .5
  describe 'Quadratic ->', ->
    it 'should have In', ->
      expect(Easing.Quadratic.In(.5)).toBe .5*.5
    it 'should have Out', ->
      expect(Easing.Quadratic.Out(.5)).toBe .5*(2-.5)
    it 'should have InOut', ->
      expect(Easing.Quadratic.InOut(.5)).toBe .5
      expect(Easing.Quadratic.InOut(.25)).toBe .125
  describe 'Cubic ->', ->
    it 'should have In', ->
      expect(Easing.Cubic.In(.5)).toBe .5*.5*.5
    it 'should have Out', ->
      expect(Easing.Cubic.Out(.5)).toBe .875
    it 'should have InOut', ->
      expect(Easing.Cubic.InOut(.5)).toBe .5
      expect(Easing.Cubic.InOut(.25)).toBe .0625
  describe 'Quartic ->', ->
    it 'should have In', ->
      expect(Easing.Quartic.In(.5)).toBe .5*.5*.5*.5
    it 'should have Out', ->
      expect(Easing.Quartic.Out(.5)).toBe .9375
    it 'should have InOut', ->
      expect(Easing.Quartic.InOut(.5)).toBe .5
      expect(Easing.Quartic.InOut(.25)).toBe .03125
  describe 'Quintic ->', ->
    it 'should have In', ->
      expect(Easing.Quintic.In(.5)).toBe .5*.5*.5*.5*.5
    it 'should have Out', ->
      expect(Easing.Quintic.Out(.5)).toBe .96875
    it 'should have InOut', ->
      expect(Easing.Quintic.InOut(.5)).toBe .5
      expect(Easing.Quintic.InOut(.25)).toBe .015625
  describe 'Sinusoidal ->', ->
    it 'should have In', ->
      expect(Easing.Sinusoidal.In(.5)).toBe 1 - Math.cos(.5 * Math.PI / 2)
    it 'should have Out', ->
      expect(Easing.Sinusoidal.Out(.5)).toBe Math.sin(.5 * Math.PI / 2)
    it 'should have InOut', ->
      result = 0.5 * (1 - Math.cos(Math.PI * .5))
      expect(Easing.Sinusoidal.InOut(.5)).toBe result
  describe 'Exponential ->', ->
    it 'should have In', ->
      expect(Easing.Exponential.In(0)).toBe 0
      expect(Easing.Exponential.In(.5)).toBe Math.pow(1024, .5 - 1)
    it 'should have Out', ->
      expect(Easing.Exponential.Out(1)).toBe 1
      expect(Easing.Exponential.Out(.5)).toBe 1 - Math.pow(2, -10 * .5)
    it 'should have InOut', ->
      expect(Easing.Exponential.InOut(0)).toBe 0
      expect(Easing.Exponential.InOut(1)).toBe 1
      expect(Easing.Exponential.InOut(.25)).toBe 0.5 * Math.pow(1024, .5 - 1)
      expect(Easing.Exponential.InOut(.5)).toBe  .5
  describe 'Circular ->', ->
    it 'should have In', ->
      expect(Easing.Circular.In(.5)).toBe 1 - Math.sqrt(1 - .5 * .5)
    it 'should have Out', ->
      k = .5
      expect(Easing.Circular.Out(k)).toBe Math.sqrt 1 - (--k * k)
    it 'should have InOut', ->
      expect(Easing.Circular.InOut(.25).toFixed(2)).toBe '0.07'
      expect(Easing.Circular.InOut(.6).toFixed(2)).toBe  '0.80'
  describe 'Elastic ->', ->
    it 'should have In', ->
      expect(Easing.Elastic.In(0)).toBe 0
      expect(Easing.Elastic.In(1)).toBe 1
      expect(Easing.Elastic.In(.75).toFixed(5)).toBe '-0.12500'
      expect(Easing.Elastic.In(.1).toFixed(2)).toBe '0.00'
    it 'should have Out', ->
      expect(Easing.Elastic.Out(0)).toBe 0
      expect(Easing.Elastic.Out(1)).toBe 1
      expect(Easing.Elastic.Out(.75).toFixed(2)).toBe '1.00'
    it 'should have InOut', ->
      expect(Easing.Elastic.InOut(0)).toBe 0
      expect(Easing.Elastic.InOut(1)).toBe 1
      expect(Easing.Elastic.InOut(.25).toFixed(2)).toBe '0.00'
      expect(Easing.Elastic.InOut(.75).toFixed(2)).toBe '1.00'
  describe 'Back ->', ->
    it 'should have In', ->
      expect(Easing.Back.In(.75).toFixed(2)).toBe '0.18'
    it 'should have Out', ->
      expect(Easing.Back.Out(.75).toFixed(2)).toBe '1.06'
    it 'should have InOut', ->
      expect(Easing.Back.InOut(.25).toFixed(2)).toBe '-0.10'
      expect(Easing.Back.InOut(.75).toFixed(2)).toBe '1.10'
  describe 'Bounce ->', ->
    it 'should have In', ->
      expect(Easing.Bounce.In(.75).toFixed(2)).toBe '0.53'
    it 'should have Out', ->
      expect(Easing.Bounce.Out(.1).toFixed(2)).toBe   '0.08'
      expect(Easing.Bounce.Out(.25).toFixed(2)).toBe  '0.47'
      expect(Easing.Bounce.Out(.75).toFixed(2)).toBe  '0.97'
      expect(Easing.Bounce.Out(.99).toFixed(2)).toBe  '0.99'
    it 'should have InOut', ->
      expect(Easing.Bounce.InOut(.25).toFixed(2)).toBe '0.12'
      expect(Easing.Bounce.InOut(.75).toFixed(2)).toBe '0.88'
    












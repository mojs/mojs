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
      expect(easing.quad.in.toStr()).toBe     'bezier(0.55,0.085,0.68,0.53)'
    it 'should have Out', ->
      expect(easing.quad.out.toStr()).toBe    'bezier(0.25,0.46,0.45,0.94)'
    it 'should have InOut', ->
      expect(easing.quad.inout.toStr()).toBe  'bezier(0.455,0.03,0.515,0.955)'
  describe 'cubic ->', ->
    it 'should have In', ->
      expect(easing.cubic.in.toStr()).toBe    'bezier(0.55,0.055,0.675,0.19)'
    it 'should have Out', ->
      expect(easing.cubic.out.toStr()).toBe   'bezier(0.215,0.61,0.355,1)'
    it 'should have InOut', ->
      expect(easing.cubic.inout.toStr()).toBe 'bezier(0.645,0.045,0.355,1)'
  describe 'quart ->', ->
    it 'should have In', ->
      expect(easing.quart.in.toStr()).toBe    'bezier(0.895,0.03,0.685,0.22)'
    it 'should have Out', ->
      expect(easing.quart.out.toStr()).toBe   'bezier(0.165,0.84,0.44,1)'
    it 'should have InOut', ->
      expect(easing.quart.inout.toStr()).toBe 'bezier(0.77,0,0.175,1)'
  describe 'quint ->', ->
    it 'should have In', ->
      expect(easing.quint.in.toStr()).toBe    'bezier(0.895,0.03,0.685,0.22)'
    it 'should have Out', ->
      expect(easing.quint.out.toStr()).toBe   'bezier(0.165,0.84,0.44,1)'
    it 'should have InOut', ->
      expect(easing.quint.inout.toStr()).toBe 'bezier(0.77,0,0.175,1)'
  describe 'sin ->', ->
    it 'should have In', ->
      expect(easing.sin.in.toStr()).toBe      'bezier(0.47,0,0.745,0.715)'
    it 'should have Out', ->
      expect(easing.sin.out.toStr()).toBe     'bezier(0.39,0.575,0.565,1)'
    it 'should have InOut', ->
      expect(easing.sin.inout.toStr()).toBe   'bezier(0.445,0.05,0.55,0.95)'
  describe 'expo ->', ->
    it 'should have In', ->
      expect(easing.expo.in.toStr()).toBe      'bezier(0.95,0.05,0.795,0.035)'
    it 'should have Out', ->
      expect(easing.expo.out.toStr()).toBe     'bezier(0.19,1,0.22,1)'
    it 'should have InOut', ->
      expect(easing.expo.inout.toStr()).toBe   'bezier(1,0,0,1)'
  describe 'circ ->', ->
    it 'should have In', ->
      expect(easing.circ.in.toStr()).toBe      'bezier(0.6,0.04,0.98,0.335)'
    it 'should have Out', ->
      expect(easing.circ.out.toStr()).toBe     'bezier(0.075,0.82,0.165,1)'
    it 'should have InOut', ->
      expect(easing.circ.inout.toStr()).toBe   'bezier(0.785,0.135,0.15,0.86)'
  describe 'back ->', ->
    it 'should have In', ->
      expect(easing.back.in.toStr()).toBe     'bezier(0.6,0,0.735,0.045)'
    it 'should have Out', ->
      expect(easing.back.out.toStr()).toBe    'bezier(0.175,0.885,0.32,1)'
    it 'should have InOut', ->
      expect(easing.back.inout.toStr()).toBe  'bezier(0.68,0,0.265,1)'
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
    












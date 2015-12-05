bezier = mojs.easing.bezier

describe 'bezier easing ->', ->
  it 'should be a function', ->
    expect(typeof bezier).toBe 'function'
  it 'should return a function', ->
    expect(typeof bezier(0, 0, 1, 1)).toBe 'function'
  describe 'linear curves ->', ->
    it 'shoud be linear', ->
      bezier1 = bezier(0,0,1,1); bezier2 = bezier 1,1,0,0
      samples = 100
      for i in [0..samples]
        x = i / samples
        expect(bezier1(x)).toBe bezier2(x)
        expect(bezier1(x)).toBe x
        expect(bezier1(x)).toBeDefined()
  describe 'common props ->', ->
    it 'should be the right value at extremes', ->
      for i in [0...1000]
        a = Math.random(); b = 2*Math.random()-0.5
        c = Math.random(); d = 2*Math.random()-0.5
        easing = bezier(a,b,c,d)
        expect(easing(0)).toBe 0
        expect(easing(1)).toBe 1
    it 'should approach the projected value of its x=y projected curve', ->
      samples = 1000
      for i in [0...samples]
        x = i / samples
        a = Math.random(); b = Math.random()
        c = Math.random(); d = Math.random()
        easing    = bezier(a,b,c,d)
        projected = bezier(b,a,d,c)
        composed  = (x)-> projected easing x
        expect(x).toBeCloseTo composed(x), 1
  describe 'two same instances ->', ->
    it 'should be strictly equal', ->
      samples = 100
      for i in [0..samples]
        a = Math.random(); b = 2*Math.random()-0.5
        c = Math.random(); d = 2*Math.random()-0.5
        x = i/samples
        expect(bezier(a,b,c,d)(x)).toBe bezier(a,b,c,d)(x)

  describe 'symetric curves ->', ->
    it 'should have a central value y~=0.5 at x=0.5', ->
      samples = 100
      for i in [0..samples]
        a = Math.random(); b = 2*Math.random()-0.5
        c = 1-a; d = 1-b; easing = bezier(a,b,c,d)
        expect(easing(.5)).toBeCloseTo .5

    it 'should be symetrical', ->
      samples = 100
      for i in [0..samples]
        a = Math.random(); b = 2*Math.random()-0.5
        c = 1-a; d = 1-b; easing = bezier(a,b,c,d)
        sym = (x)-> 1 - easing(1-x)
        x = i/samples
        expect(easing(x)).toBeCloseTo sym(x)

  describe 'toStr method ->', ->
    it 'should return params, the function was called with', ->
      expect(bezier(0,1,0,1).toStr()).toBe 'bezier(0,1,0,1)'


  describe 'arguments parsing ->', ->
    it 'should error if no arguments', ->
      spyOn mojs.h, 'error'
      expect(bezier()).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if 1 argument', ->
      spyOn mojs.h, 'error'
      expect(bezier(1)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if 2 arguments', ->
      spyOn mojs.h, 'error'
      expect(bezier(2, 1)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if 3 arguments', ->
      spyOn mojs.h, 'error'
      expect(bezier(2, 1, 3)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if 3 arguments', ->
      spyOn mojs.h, 'error'
      expect(bezier(2, 1, 3)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if string argument', ->
      spyOn mojs.h, 'error'
      expect(bezier(2, 1, 3, 'a')).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if NaN argument', ->
      spyOn mojs.h, 'error'
      expect(bezier(2, 1, 3, NaN)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if Infinity argument', ->
      spyOn mojs.h, 'error'
      expect(bezier(2, 1, 3, Infinity)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if Infinity argument', ->
      spyOn mojs.h, 'error'
      expect(bezier(2, 1, 3, Infinity)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if x < 0', ->
      spyOn mojs.h, 'error'
      expect(bezier(0.5, 0.5, -5, 0.5)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if x < 0 #2', ->
      spyOn mojs.h, 'error'
      expect(bezier(-2, 0.5, 1, 0.5)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if x < 0 #3', ->
      spyOn mojs.h, 'error'
      expect(bezier(-Math.random()-0.000001, 0.5, 0.5, 0.5)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if x > 1', ->
      spyOn mojs.h, 'error'
      expect(bezier(0.5, 0.5, 5, 0.5)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if x > 1 #2', ->
      spyOn mojs.h, 'error'
      expect(bezier(2, 0.5, 1, 0.5)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()
    it 'should error if x > 1 #3', ->
      spyOn mojs.h, 'error'
      expect(bezier(0.5, 0.5, 1.000001+Math.random(), 0.5)).toBe undefined
      expect(mojs.h.error).toHaveBeenCalled()

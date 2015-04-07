
bezier = mojs.easing.bezier

describe 'bezier easing ->', ->
  it 'should be a function', ->
    expect(typeof bezier).toBe 'function'
  it 'should return a function', ->
    expect(typeof bezier(0, 0, 1, 1)).toBe 'function'

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

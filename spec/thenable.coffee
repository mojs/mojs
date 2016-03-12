h         = mojs.h
Tweenable = mojs.Tweenable
Thenable  = mojs.Thenable

describe 'thenable ->', ->
  describe 'extention ->', ->
    it 'should extend tweenable', ->
      th = new Thenable
      expect(th instanceof Tweenable).toBe true
  describe '_vars method ->', ->
    it 'should create _history object', ->
      th = new Thenable
      th._vars()
      expect(h.isArray(th._history)).toBe true
      expect(th._history.length).toBe 1
    it 'should clone _o object and save it as the first history record', ->
      options = { a: 2, b: 3 }
      th = new Thenable options
      th._vars()
      expect(th._history[0]).not.toBe options
      expect(th._history[0].a).toBe options.a
      expect(th._history[0].b).toBe options.b

  describe 'then method ->', ->
    it "instance of the module should have .constructor
        property pointing to the module class", ->
      th = new Thenable
      expect(th.constructor).toBe Thenable
    it "should return this", ->
      th = new Thenable
      expect(th.then()).toBe th


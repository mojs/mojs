Stagger = mojs.Stagger
h       = mojs.helpers
ns      = 'http://www.w3.org/2000/svg'
# svg  = document.createElementNS?(ns, 'svg')

els   = document.createElementNS ns, 'g'
path1 = document.createElementNS ns, 'path'
path2 = document.createElementNS ns, 'path'
els.appendChild(path1); els.appendChild path2

describe 'Stagger ->', ->
  describe 'defaults ->', ->
    it 'should have its own defaults', ->
      s = new Stagger els: els
      expect(s.ownDefaults.delay).toBe 'stagger(200)'
      expect(s.ownDefaults.els)  .toBeDefined()

    it 'should have isSkipDelta flag', ->
      s = new Stagger els: els
      expect(s.isSkipDelta).toBe true

  describe 'defaults extend ->', ->
    it 'defaults should extend ownDefaults', ->
      s = new Stagger els: els
      expect(s.defaults.strokeWidth).toBe 2
      expect(s.defaults.delay)      .toBe 'stagger(200)'
      expect(s.ownDefaults.els)     .toBeDefined()

  describe 'extendDefaults method ->', ->
    it 'should override extendDefaults method', ->
      s = new Stagger els: els
      expect(s.extendDefaults).not.toBe Stagger.__super__.extendDefaults
    it 'should define props object', ->
      s = new Stagger els: els
      s.props = undefined; s.extendDefaults()
      expect(s.props).toBeDefined()
    it 'should define deltas object', ->
      s = new Stagger els: els
      s.deltas = undefined; s.extendDefaults()
      expect(s.deltas).toBeDefined()
    it 'should just copy options to props and fallback to defaults', ->
      s = new Stagger els: els, stroke: 'deeppink'
      expect(s.props.stroke).toBe 'deeppink'
      expect(s.props.delay) .toBe s.defaults.delay

  describe 'isDelta method ->', ->
    it 'should override isDelta method', ->
      s = new Stagger els: els
      expect(s.isDelta).not.toBe Stagger.__super__.isDelta
    it 'should always return false', ->
      s = new Stagger els: els
      expect(s.isDelta()).toBe false

  describe 'createBit method ->', ->
    it 'should override createBit method', ->
      s = new Stagger els: els
      expect(s.createBit).not.toBe Stagger.__super__.createBit
    it 'should create transit for every el', ->
      els   = document.createElementNS ns, 'g'
      path1 = document.createElementNS ns, 'path'
      path2 = document.createElementNS ns, 'path'
      els.appendChild(path1); els.appendChild path2
      s = new Stagger
        els: els
        stroke: ['deeppink', 'cyan', 'yellow']
        isIt: true
      expect(s.transits.length)   .toBe 2
      expect(s.transits[0].o.bit).toBe path1
      expect(s.transits[1].o.bit).toBe path2
      expect(s.transits[0].o.stroke).toBe 'deeppink'
      expect(s.transits[1].o.stroke).toBe 'cyan'

  describe 'render method ->', ->
    it 'should override render method', ->
      s = new Stagger els: els
      expect(s.render).not.toBe Stagger.__super__.render

    it 'should call createBit method', ->
      s = new Stagger els: els
      spyOn s, 'createBit'
      s.render()
      expect(s.createBit).toHaveBeenCalled()

    it 'should call setProgress method', ->
      s = new Stagger els: els, isRunLess: true
      spyOn s, 'setProgress'
      s.render()
      expect(s.setProgress).toHaveBeenCalledWith 0, true

    it 'should call createTween method', ->
      s = new Stagger els: els
      spyOn s, 'createTween'
      s.render()
      expect(s.createTween).toHaveBeenCalled()

  describe 'createTween method ->', ->
    it 'should override createTween method', ->
      s = new Stagger els: els
      expect(s.createTween).not.toBe Stagger.__super__.createTween

    it 'should call super createTween method', ->
      s = new Stagger els: els
      spyOn Stagger.__super__, 'createTween'
      s.createTween()
      expect(Stagger.__super__.createTween).toHaveBeenCalled()

    it 'should add timelines to the tween', ->
      s = new Stagger els: els
      expect(s.tween.timelines.length).toBe 3

  describe 'draw method ->', ->
    it 'should override draw method', ->
      s = new Stagger els: els
      expect(s.draw).not.toBe Stagger.__super__.draw

  describe 'parseEls method ->', ->
    it 'should recieve els as a DOM node', ->
      els   = document.createElementNS ns, 'g'
      path1 = document.createElementNS ns, 'path'
      path2 = document.createElementNS ns, 'path'
      els.appendChild(path1); els.appendChild path2
      s = new Stagger els: els
      expect(h.isArray(s.props.els)).toBe true
    it 'should recieve els as an Array of nodes', ->
      path1 = document.createElementNS ns, 'path'
      path2 = document.createElementNS ns, 'path'
      s = new Stagger els: [path1, path2]
      expect(h.isArray(s.props.els)).toBe true
    it 'should recieve els as children', ->
      els   = document.createElementNS ns, 'g'
      path1 = document.createElementNS ns, 'path'
      path2 = document.createElementNS ns, 'path'
      els.appendChild(path1); els.appendChild path2
      s = new Stagger els: els.childNodes
      expect(h.isArray(s.props.els)).toBe true
    it 'should recieve as a selector of parent', ->
      els   = document.createElementNS ns, 'g'
      path1 = document.createElementNS ns, 'path'
      path2 = document.createElementNS ns, 'path'
      els.appendChild(path1); els.appendChild path2
      document.body.appendChild els
      s = new Stagger els: 'g'
      expect(h.isArray(s.props.els)).toBe true
  describe 'getPropByMod method ->', ->
    it 'should return property by mod', ->
      s = new Stagger els: els, stroke: ['deeppink', 'cyan', 'white', 'orange']
      expect(s.getPropByMod('stroke', 2)).toBe 'white'
      expect(s.getPropByMod('stroke', 5)).toBe 'cyan'
    it 'should return property if single property was passed', ->
      s = new Stagger els: els, stroke: 'deeppink'
      expect(s.getPropByMod('stroke', 2)).toBe 'deeppink'

  describe 'getOption method ->', ->
    it 'should get options for a transit by its index', ->
      s = new Stagger els: els, stroke: ['deeppink', 'cyan', 'yellow']
      expect(s.getOption(0).stroke)   .toBe 'deeppink'
      expect(s.getOption(0).bit)      .toBe path1
      expect(s.getOption(0).duration) .toBe 500
      expect(s.getOption(1).stroke)   .toBe 'cyan'
      expect(s.getOption(1).bit)      .toBe path2
      expect(s.getOption(1).duration) .toBe 500









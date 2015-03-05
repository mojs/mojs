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

  describe 'defaults extend ->', ->
    it 'defaults should extend ownDefaults', ->
      s = new Stagger els: els
      expect(s.defaults.strokeWidth).toBe 2
      expect(s.defaults.delay)      .toBe 'stagger(200)'
      expect(s.ownDefaults.els)     .toBeDefined()

  describe 'createBit method ->', ->
    it 'should override createBit method', ->
      s = new Stagger els: els
      expect(s.createBit).not.toBe Stagger.__super__.createBit
    it 'should create transit for every el', ->
      els   = document.createElementNS ns, 'g'
      path1 = document.createElementNS ns, 'path'
      path2 = document.createElementNS ns, 'path'
      els.appendChild(path1); els.appendChild path2
      s = new Stagger els: els, stroke: ['deeppink', 'cyan', 'yellow']
      console.log s.transits+''
      expect(s.transits.length)   .toBe 2
      expect(s.transits[0].o.bit).toBe path1
      expect(s.transits[1].o.bit).toBe path2
      
      expect(s.transits[0].stroke).toBe 'deeppink'
      expect(s.transits[1].stroke).toBe 'cyan'

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








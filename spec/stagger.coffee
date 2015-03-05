Stagger = mojs.Stagger
h       = mojs.helpers
ns      = 'http://www.w3.org/2000/svg'
# svg  = document.createElementNS?(ns, 'svg')

describe 'Stagger ->', ->
  describe 'defaults ->', ->
    it 'should have its own defaults', ->
      s = new Stagger
      expect(s.ownDefaults.delay).toBe 'stagger(200)'
      expect(s.ownDefaults.els)  .toBeDefined()

  describe 'defaults extend ->', ->
    it 'defaults should extend ownDefaults', ->
      s = new Stagger
      expect(s.defaults.strokeWidth).toBe 2
      expect(s.defaults.delay)      .toBe 'stagger(200)'
      expect(s.ownDefaults.els)     .toBeDefined()

  describe 'createBit method ->', ->
    it 'should override createBit method', ->
      s = new Stagger
      expect(s.createBit).not.toBe Stagger.__super__.createBit

  describe 'els recieve and transform extend ->', ->
    it 'should recieve els as DOM node', ->
      els   = document.createElementNS ns, 'g'
      path1 = document.createElementNS ns, 'path'
      path2 = document.createElementNS ns, 'path'
      els.appendChild(path1); els.appendChild path2

      s = new Stagger els: els, isIt: true
      console.log s.props.els
      expect(h.isArray(s.props.els)).toBe true










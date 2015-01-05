Cross = mojs.Cross
Bit   = mojs.Bit
ns    = 'http://www.w3.org/2000/svg'
svg   = document.createElementNS?(ns, "svg")
line  = new Cross ctx: svg

describe 'Cross ->', ->
  describe 'draw ->', ->
    it 'should add properties to el', ->
      svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross
        ctx:    svg
        radius: 20
      d = cross.el.getAttribute('d')
      expect(d).toBe('M-20,0 L20,0 M0,-20 L0,20')
    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross ctx: svg
      spyOn(Cross.__super__, 'draw')
      cross.draw()
      expect(Cross.__super__.draw).toHaveBeenCalled()


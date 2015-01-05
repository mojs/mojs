Triangle  = mojs.Triangle
Bit     = mojs.Bit
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")
triangle  = new Triangle ctx: svg

describe 'Triangle ->', ->
  describe 'draw ->', ->
    it 'should add properties to el', ->
      svg   = document.createElementNS?(ns, "svg")
      cross = new Triangle
        ctx:      svg
        radius:   20
      d = cross.el.getAttribute('d')
      d2 = "M1.2246467991473533e-15, -20
        L17.320508075688775, 9.999999999999998
        M17.320508075688775, 9.999999999999998
        L-17.320508075688775, 9.999999999999998
        M-17.320508075688775, 9.999999999999998
        L1.2246467991473533e-15, -20"
      expect(d).toBe d2
    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      triangle  = new Triangle ctx: svg
      spyOn(Triangle.__super__, 'draw')
      triangle.draw()
      expect(Triangle.__super__.draw).toHaveBeenCalled()


Circle  = mojs.Circle
Bit     = mojs.Bit
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")
circle  = new Circle ctx: svg

describe 'Circle ->', ->
  describe 'draw ->', ->
    it 'should add properties to el', ->
      svg   = document.createElementNS?(ns, "svg")
      cross = new Circle
        ctx:      svg
        radius:   20
        radiusX:  40
        y:        50
      rx = cross.el.getAttribute('rx')
      ry = cross.el.getAttribute('ry')
      cx = cross.el.getAttribute('cx')
      cy = cross.el.getAttribute('cy')
      expect(rx).toBe('40')
      expect(ry).toBe('20')
      expect(cx).toBe('0')
      expect(cy).toBe('50')
    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      circle  = new Circle ctx: svg
      spyOn(Circle.__super__, 'draw')
      circle.draw()
      expect(Circle.__super__.draw).toHaveBeenCalled()


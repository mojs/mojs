Rect    = mojs.Rect
Bit     = mojs.Bit
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")
rect    = new Rect ctx: svg

describe 'Rect ->', ->
  it 'should extend Bit', ->
    expect(rect instanceof Bit).toBe(true)
  describe 'defaults ->', ->
    it 'should have type of "rect"', ->
      expect(rect.type).toBe 'rect'
  describe 'draw ->', ->
    it 'should add properties to el', ->
      svg     = document.createElementNS?(ns, "svg")
      rect    = new Rect ctx: svg, radius: 20, x: 50, y: 100
      width   = rect.el.getAttribute 'width'
      height  = rect.el.getAttribute 'height'
      x       = rect.el.getAttribute 'x'
      y       = rect.el.getAttribute 'y'
      expect(width) .toBe   '40'
      expect(height).toBe   '40'
      expect(x).toBe        '30'
      expect(y).toBe        '80'
    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      rect  = new Rect ctx: svg
      spyOn(Rect.__super__, 'draw')
      rect.draw()
      expect(Rect.__super__.draw).toHaveBeenCalled()


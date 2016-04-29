Rect    = mojs.shapesMap.getShape('rect')
Bit     = mojs.shapesMap.getShape('bit')
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")
rect    = new Rect ctx: svg

describe 'Rect ->', ->
  it 'should extend Bit', ->
    expect(rect instanceof Bit).toBe(true)
  describe 'defaults ->', ->
    it 'should have shape of "rect"', ->
      expect(rect._defaults.shape).toBe 'rect'
    # it 'should have ratio of 1.43', ->
    #   expect(rect._defaults.ratio).toBe 1.43
  describe 'draw ->', ->
    it 'should add properties to el', ->
      svg     = document.createElementNS?(ns, "svg")
      rect    = new Rect ctx: svg, radius: 20, x: 50, y: 100, rx: 10, ry: 20
      width   = rect.el.getAttribute 'width'
      height  = rect.el.getAttribute 'height'
      x       = rect.el.getAttribute 'x'
      y       = rect.el.getAttribute 'y'
      rx      = rect.el.getAttribute 'rx'
      ry      = rect.el.getAttribute 'ry'
      expect(width) .toBe   '40'
      expect(height).toBe   '40'
      expect(x).toBe        '30'
      expect(y).toBe        '80'
      expect(rx).toBe       '10px'
      expect(ry).toBe       '20px'
    it 'should work with radiusX/radiusY props', ->
      svg     = document.createElementNS?(ns, "svg")
      rect    = new Rect ctx: svg, radiusY: 50, radiusX: 40, x: 100, y: 200
      width   = rect.el.getAttribute 'width'
      height  = rect.el.getAttribute 'height'
      expect(width) .toBe   '80'
      expect(height).toBe   '100'
      x       = rect.el.getAttribute 'x'
      y       = rect.el.getAttribute 'y'
      expect(x).toBe        '60'
      expect(y).toBe        '150'
    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      rect  = new Rect ctx: svg
      spyOn(Rect.__super__, 'draw')
      rect.draw()
      expect(Rect.__super__.draw).toHaveBeenCalled()
  describe 'getLength method', ->
    it 'should calculate total length of the path', ->
      radius = 100
      bit = new Rect
        ctx:    document.createElementNS ns, 'svg'
        radius: radius
      expect(bit.getLength()).toBe 400

    it 'should calculate total length of the with different radiusX/Y', ->
      radiusX = 100
      radiusY = 50
      bit = new Rect
        ctx:    document.createElementNS ns, 'svg'
        radiusX: radiusX
        radiusY: radiusY
      expect(bit.getLength()).toBe 2*radiusX + 2*radiusY







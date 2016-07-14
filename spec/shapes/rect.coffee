Rect    = mojs.shapesMap.getShape('rect')
Bit     = mojs.shapesMap.getShape('bit')
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")
rect    = new Rect ctx: svg

describe 'Rect ->', ->
  it 'should extend Bit', ->
    expect(rect instanceof Bit).toBe(true)
  describe '_declareDefaults method ->', ->
    it 'should call super', ->
      rect = new Rect
      spyOn Bit::, '_declareDefaults'
      rect._declareDefaults()
      expect(Bit::_declareDefaults).toHaveBeenCalled()
    it 'should set `shape` to `path`', ->
      rect = new Rect
      expect(rect._defaults.tag).toBe 'rect'
    it 'should set `rx` to `0`', ->
      rect = new Rect
      expect(rect._defaults.rx).toBe 0
    it 'should set `ry` to `0`', ->
      rect = new Rect
      expect(rect._defaults.ry).toBe 0
  describe '_draw method ->', ->
    it 'should add properties to el', ->
      # svg     = document.createElementNS?(ns, "svg")
      rect    = new Rect
        radius: 20,
        x: 50,     y: 100,
        rx: 10,    ry: 20
        width: 50, height: 50

      rect._draw()

      width   = rect.el.getAttribute 'width'
      height  = rect.el.getAttribute 'height'
      x       = rect.el.getAttribute 'x'
      y       = rect.el.getAttribute 'y'
      rx      = rect.el.getAttribute 'rx'
      ry      = rect.el.getAttribute 'ry'
      expect(width) .toBe   '40'
      expect(height).toBe   '40'
      expect(x).toBe        '5'
      expect(y).toBe        '5'
      expect(rx).toBe       '10px'
      expect(ry).toBe       '20px'
    it 'should work with radiusX/radiusY props', ->
      # svg     = document.createElementNS?(ns, "svg")
      rect    = new Rect
        radiusY: 50, radiusX: 40, width: 100, height: 200
      rect._draw()
      width   = rect.el.getAttribute 'width'
      height  = rect.el.getAttribute 'height'
      expect(width) .toBe   '80'
      expect(height).toBe   '100'
      x       = rect.el.getAttribute 'x'
      y       = rect.el.getAttribute 'y'
      expect(x).toBe        '10'
      expect(y).toBe        '50'
    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      rect  = new Rect
      spyOn(Bit::, '_draw')
      rect._draw()
      expect(Bit::_draw).toHaveBeenCalled()
  describe 'getLength method', ->
    it 'should calculate total length of the path', ->
      radius = 100
      bit = new Rect
        ctx:    document.createElementNS ns, 'svg'
        radius: radius
      expect(bit._getLength()).toBe 800

    it 'should calculate total length of the with different radiusX/Y', ->
      radiusX = 100
      radiusY = 50
      bit = new Rect
        ctx:    document.createElementNS ns, 'svg'
        radiusX: radiusX
        radiusY: radiusY
      expect(bit._getLength()).toBe 2*(2*radiusX + 2*radiusY)







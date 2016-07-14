Circle  = mojs.shapesMap.getShape('circle')
Bit     = mojs.shapesMap.getShape('bit')
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")
circle  = new Circle ctx: svg

describe 'Circle ->', ->
  it 'should extend Bit', ->
    expect(circle instanceof Bit).toBe(true)
  describe '_draw method ->', ->
    it 'should add properties to el', ->
      # svg   = document.createElementNS?(ns, "svg")
      circle = new Circle
        radius:   20
        radiusX:  40
        radiusY:  35
        y:        50
        width:    100
        height:   100
      circle._draw()
      rx = circle.el.getAttribute('rx')
      ry = circle.el.getAttribute('ry')
      cx = circle.el.getAttribute('cx')
      cy = circle.el.getAttribute('cy')
      expect(rx).toBe('40')
      expect(ry).toBe('35')
      expect(cx).toBe('50')
      expect(cy).toBe('50')

    it 'should fallback to radius', ->
      svg   = document.createElementNS?(ns, "svg")
      circle = new Circle
        radius:   20
        radiusY:  35

      circle._draw()

      rx = circle.el.getAttribute('rx')
      ry = circle.el.getAttribute('ry')
      expect(rx).toBe('20')
      expect(ry).toBe('35')

    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      circle  = new Circle ctx: svg
      spyOn(Circle.__super__, '_draw')
      circle._draw()
      expect(Circle.__super__._draw).toHaveBeenCalled()

  describe 'getLength method', ->
    it 'should calculate total length of the path', ->
      radius = 100
      bit = new Circle
        ctx:    document.createElementNS ns, 'svg'
        radius: radius
      expect(bit._getLength()).toBe 2*Math.PI*radius

    it 'should calculate total length of the with different radiusX/Y', ->
      radiusX = 100
      radiusY = 50
      bit = new Circle
        ctx:    document.createElementNS ns, 'svg'
        radiusX: radiusX
        radiusY: radiusY
      sqrt = Math.sqrt (radiusX*radiusX + radiusY*radiusY)/2
      expect(bit._getLength()).toBe 2*Math.PI*sqrt


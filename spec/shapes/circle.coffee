Circle  = mojs.shapesMap.getShape('circle')
Bit     = mojs.shapesMap.getShape('bit')
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")
circle  = new Circle ctx: svg

describe 'Circle ->', ->
  it 'should extend Bit', ->
    expect(circle instanceof Bit).toBe(true)
  describe 'draw ->', ->
    it 'should add properties to el', ->
      svg   = document.createElementNS?(ns, "svg")
      cross = new Circle
        ctx:      svg
        radius:   20
        radiusX:  40
        radiusY:  35
        y:        50
      rx = cross.el.getAttribute('rx')
      ry = cross.el.getAttribute('ry')
      cx = cross.el.getAttribute('cx')
      cy = cross.el.getAttribute('cy')
      expect(rx).toBe('40')
      expect(ry).toBe('35')
      expect(cx).toBe('0')
      expect(cy).toBe('50')

    it 'should fallback to radius', ->
      svg   = document.createElementNS?(ns, "svg")
      cross = new Circle
        ctx:      svg
        radius:   20
        radiusY:  35
      rx = cross.el.getAttribute('rx')
      ry = cross.el.getAttribute('ry')
      expect(rx).toBe('20')
      expect(ry).toBe('35')

    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      circle  = new Circle ctx: svg
      spyOn(Circle.__super__, 'draw')
      circle.draw()
      expect(Circle.__super__.draw).toHaveBeenCalled()

  describe 'getLength method', ->
    it 'should calculate total length of the path', ->
      radius = 100
      bit = new Circle
        ctx:    document.createElementNS ns, 'svg'
        radius: radius
      expect(bit.getLength()).toBe 2*Math.PI*radius

    it 'should calculate total length of the with different radiusX/Y', ->
      radiusX = 100
      radiusY = 50
      bit = new Circle
        ctx:    document.createElementNS ns, 'svg'
        radiusX: radiusX
        radiusY: radiusY
      sqrt = Math.sqrt (radiusX*radiusX + radiusY*radiusY)/2
      expect(bit.getLength()).toBe 2*Math.PI*sqrt


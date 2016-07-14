Polygon = mojs.shapesMap.getShape('polygon')
Bit     = mojs.shapesMap.getShape('bit')
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")

describe 'Polygon ->', ->
  it 'should extend Bit', ->
    polygon  = new Polygon
    expect(polygon instanceof Bit).toBe true

  describe '_declareDefaults method ->', ->
    it 'should call super', ->
      polygon = new Polygon
      spyOn Bit::, '_declareDefaults'
      polygon._declareDefaults()
      expect(Bit::._declareDefaults).toHaveBeenCalled()
    it 'should defaults for `tag` and `points`', ->
      polygon = new Polygon
      expect(polygon._defaults.tag).toBe 'path'
      expect(polygon._defaults.points).toBe 3

  it 'should have points prop', ->
    tri = new Polygon
    expect(tri._props.points).toBe 3
  it 'should have recieve points prop', ->
    tri = new Polygon points: 8
    expect(tri._props.points).toBe 8
  it 'should calculate _radialPoints', ->
    tri = new Polygon
    tri._draw()
    expect(tri._radialPoints).toBeDefined()
    expect(tri._radialPoints.length).toBe tri._props.points

  describe '_draw method ->', ->
    it 'should add properties to el', ->
      tri = new Polygon
        radius:   20

      tri._draw()
      d   = tri.el.getAttribute('d')
      d2  = 'M0.0000,-20.0000 L17.3205,10.0000 L-17.3205,10.0000 z'
      isD = d is d2
      isIE9D = d is 'M 0 -20 L 17.3205 10 L -17.3205 10 Z'
      expect(isD or isIE9D).toBe true

    it 'should work with radiusX and fallback to radius', ->
      # svg = document.createElementNS?(ns, "svg")
      tri = new Polygon
        # ctx:      svg
        radius:   20
        radiusX:  40
      tri._draw()
      d   = tri.el.getAttribute('d')
      d2  = 'M0.0000,-20.0000 L34.6410,10.0000 L-34.6410,10.0000 z'
      isD = d is d2
      isIE9D = d is 'M 0 -20 L 34.641 10 L -34.641 10 Z'
      expect(isD or isIE9D).toBe true

    it 'should work with radiusY and fallback to radius', ->
      # svg = document.createElementNS?(ns, "svg")
      tri = new Polygon
        # ctx:      svg
        radius:   20
        radiusY:  40

      tri._draw()

      d   = tri.el.getAttribute('d')
      d2  = 'M0.0000,-40.0000 L17.3205,20.0000 L-17.3205,20.0000 z'
      isD = d is d2
      isIE9D = d is 'M 0 -40 L 17.3205 20 L -17.3205 20 Z'
      expect(isD or isIE9D).toBe true
    it 'should call super method', ->
      polygon  = new Polygon
      spyOn(Polygon.__super__, '_draw')
      polygon._draw()
      expect(Polygon.__super__._draw).toHaveBeenCalled()

    it 'should not set `d` attribute if nothing changed', ->
      polygon = new Polygon
        radius: 20
        points: 10
      polygon._draw()
      spyOn polygon.el, 'setAttribute'
      polygon._draw()
      expect( polygon.el.setAttribute ).not.toHaveBeenCalled()

    it 'should set `d` attribute if `radiusX` changed', ->
      polygon = new Polygon
        radius: 20
        points: 10
      polygon._draw()
      spyOn polygon.el, 'setAttribute'
      polygon._props.radiusX = 30
      polygon._draw()
      expect( polygon.el.setAttribute ).toHaveBeenCalled()

    it 'should set `d` attribute if `radiusY` changed', ->
      polygon = new Polygon
        radius: 20
        points: 10
      polygon._draw()
      spyOn polygon.el, 'setAttribute'
      polygon._props.radiusY = 30
      polygon._draw()
      expect( polygon.el.setAttribute ).toHaveBeenCalled()

    it 'should set `d` attribute if `points` changed', ->
      polygon = new Polygon
        radius: 20
        points: 10
      polygon._draw()
      spyOn polygon.el, 'setAttribute'
      polygon._props.points = 30
      polygon._draw()
      expect( polygon.el.setAttribute ).toHaveBeenCalled()

  describe 'getLength method', ->
    it 'should calculate sum between all points', ->
      polygon  = new Polygon radiusX: 100, radiusY: 200
      polygon._draw()

      expect( polygon._getLength() )
        .toBe polygon._getPointsPerimiter( polygon._radialPoints )

  describe '_pointsDelta method ->', ->
    it 'should return distance between points', ->
      tri = new Polygon

      for i in [ 0...50 ]
        point1 = { x: 20*i, y: 120+i }
        point2 = { x: 200+i, y: -120*i }
        dx = Math.abs( point1.x - point2.x )
        dy = Math.abs( point1.y - point2.y )
        expect( tri._pointsDelta( point1, point2 ) )
          .toBe Math.sqrt( dx*dx + dy*dy )

  describe '_getPointsPerimiter method', ->
    it 'should calculate sum between all points', ->
      tri  = new Polygon
      # create points for test
      points = []
      for i in [1...20]
        points.push( {  x: 100*Math.random(), y: 100*Math.random() }  )

      sum = 0
      for i in [1...points.length]
        sum += tri._pointsDelta points[i-1], points[i]

      sum += tri._pointsDelta points[0], mojs.h.getLastItem points

      expect( tri._getPointsPerimiter( points ) ).toBe sum

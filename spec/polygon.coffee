Polygon  = mojs.Polygon
Bit     = mojs.Bit
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")

describe 'Polygon ->', ->
  it 'should extend Bit', ->
    polygon  = new Polygon ctx: svg
    expect(polygon instanceof Bit).toBe(true)

  it 'should have points prop', ->
    tri = new Polygon ctx: svg
    expect(tri.props.points).toBe 3
  it 'should have recieve points prop', ->
    tri = new Polygon ctx: svg, points: 8
    expect(tri.props.points).toBe 8
  
  it 'should call drawShape method', ->
    tri = new Polygon ctx: svg, points: 8
    spyOn tri, 'drawShape'
    tri.isDraw = false
    tri.draw()
    expect(tri.drawShape).toHaveBeenCalled()
  # it 'should call drawShape only once', ->
  #   tri = new Polygon ctx: svg, points: 8
  #   spyOn tri, 'drawShape'
  #   tri.draw()
  #   expect(tri.drawShape).not.toHaveBeenCalled()

  it 'should calculate radialPoints', ->
    tri = new Polygon ctx: svg
    expect(tri.radialPoints).toBeDefined()
    expect(tri.radialPoints.length).toBe tri.props.points
  it 'should calculate radialPoints', ->
    tri = new Polygon ctx: svg
    expect(tri.radialPoints).toBeDefined()
    expect(tri.radialPoints.length).toBe tri.props.points

  describe 'draw ->', ->
    it 'should add properties to el', ->
      svg = document.createElementNS?(ns, "svg")
      tri = new Polygon
        ctx:      svg
        radius:   20
      d   = tri.el.getAttribute('points')
      d2  = '0.0000,-20.0000 17.3205,10.0000 -17.3205,10.0000 '
      isD = d is d2
      isIE9D = d is '0,-20 17.3205,10 -17.3205,10' 
      expect(isD or isIE9D).toBe true
    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      polygon  = new Polygon ctx: svg
      spyOn(Polygon.__super__, 'draw')
      polygon.draw()
      expect(Polygon.__super__.draw).toHaveBeenCalled()


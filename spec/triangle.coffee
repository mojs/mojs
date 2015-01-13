Triangle  = mojs.Triangle
Bit     = mojs.Bit
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")

describe 'Triangle ->', ->
  it 'should extend Bit', ->
    triangle  = new Triangle ctx: svg
    expect(triangle instanceof Bit).toBe(true)

  it 'should have points prop', ->
    tri = new Triangle ctx: svg
    expect(tri.props.points).toBe 3
  it 'should have recieve points prop', ->
    tri = new Triangle ctx: svg, points: 8
    expect(tri.props.points).toBe 8
  
  it 'should call drawShape method', ->
    tri = new Triangle ctx: svg, points: 8
    spyOn tri, 'drawShape'
    tri.isDraw = false
    tri.draw()
    expect(tri.drawShape).toHaveBeenCalled()
  it 'should call drawShape only once', ->
    tri = new Triangle ctx: svg, points: 8
    spyOn tri, 'drawShape'
    tri.draw()
    expect(tri.drawShape).not.toHaveBeenCalled()

  it 'should calculate radialPoints', ->
    tri = new Triangle ctx: svg
    expect(tri.radialPoints).toBeDefined()
    expect(tri.radialPoints.length).toBe tri.props.points
  it 'should calculate radialPoints', ->
    tri = new Triangle ctx: svg
    expect(tri.radialPoints).toBeDefined()
    expect(tri.radialPoints.length).toBe tri.props.points

  describe 'draw ->', ->
    it 'should add properties to el', ->
      svg   = document.createElementNS?(ns, "svg")
      tri = new Triangle
        ctx:      svg
        radius:   20
      d   = tri.el.getAttribute('points')
      d2  = '1.2246467991473533e-15,-20 17.320508075688775,9.999999999999998
         -17.320508075688775,9.999999999999998 '
      expect(d).toBe d2
    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      triangle  = new Triangle ctx: svg
      spyOn(Triangle.__super__, 'draw')
      triangle.draw()
      expect(Triangle.__super__.draw).toHaveBeenCalled()


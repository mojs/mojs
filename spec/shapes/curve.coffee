Curve  = mojs.shapesMap.getShape('curve')
Bit    = mojs.shapesMap.getShape('bit')
ns      = 'http://www.w3.org/2000/svg'
svg     = document.createElementNS?(ns, "svg")
curve  = new Curve ctx: svg

describe 'Curve ->', ->
  it 'should extend Bit', ->
    expect(curve instanceof Bit).toBe(true)

  describe '_declareDefaults method ->', ->
    it 'should call super', ->
      spyOn Bit::, '_declareDefaults'
      curve._declareDefaults()
      expect(Bit::_declareDefaults).toHaveBeenCalled()

    it 'should set `shape` to `path`', ->
      expect(curve._defaults.tag).toBe 'path'

  # nope
  # describe '_extendDefaults method', ->
  #   it 'should call super', ->
  #     spyOn Bit::, '_extendDefaults'
  #     curve._extendDefaults()
  #     expect(Bit::_extendDefaults).toHaveBeenCalled()
  #   it '`radiusX` should fallback to `radius`', ->
  #     curve = new Curve ctx: svg, radius: 20
  #     curve._extendDefaults()
  #     expect(curve._props.radiusX).toBe 20
  #   it '`radiusX` should not fallback to `radius` if falsy', ->
  #     curve = new Curve ctx: svg, radius: 20, radiusX: 0
  #     curve._extendDefaults()
  #     expect(curve._props.radiusX).toBe 0
  #   it '`radiusY` should fallback to `radius`', ->
  #     curve = new Curve ctx: svg, radius: 20
  #     curve._extendDefaults()
  #     expect(curve._props.radiusY).toBe 20
  #   it '`radiusY` should not fallback to `radius` if falsy', ->
  #     curve = new Curve ctx: svg, radius: 20, radiusY: 0
  #     curve._extendDefaults()
  #     expect(curve._props.radiusY).toBe 0

  describe '_draw method ->', ->
    it 'should call super', ->
      spyOn Bit::, '_draw'
      curve._draw()
      expect(Bit::_draw).toHaveBeenCalled()
    it 'should call `el.setAttribute` for `d` attribute ', ->
      radiusX = 20; radiusY = 30
      curve = new Curve ctx: svg, radiusX, radiusY
      curve._draw()

      p = curve._props

      radiusX = if p.radiusX? then p.radiusX else p.radius
      radiusY = if p.radiusY? then p.radiusY else p.radius

      x  = p.width/2
      y  = p.height/2
      
      x1 = x - radiusX
      x2 = x
      x3 = x + radiusX
      y1 = y - radiusY
      y2 = y
      y3 = y + radiusY

      d = curve.el.getAttribute('d')
      isD1 = d is "M#{x1} #{y} Q #{x2} #{ y - 2*radiusY } #{x3} #{y}"
      isD2 = d is "M #{x1} #{y} Q #{x2} #{ y - 2*radiusY } #{x3} #{y}"
      expect( isD1 or isD2 ).toBe true

    it 'should save `radiusX/radiusY/points` properties', ->
      radiusX = 20; radiusY = 30
      curve = new Curve ctx: svg, radiusX, radiusY
      curve._draw()

      p = curve._props

      radiusX = if p.radiusX? then p.radiusX else p.radius
      radiusY = if p.radiusY? then p.radiusY else p.radius

      x  = 1*p.x
      y  = 1*p.y
      
      x1 = x - radiusX
      x2 = x
      x3 = x + radiusX
      y1 = y - radiusY
      y2 = y
      y3 = y + radiusY

      expect( curve._prevRadiusX ).toBe radiusX
      expect( curve._prevRadiusY ).toBe radiusY
      expect( curve._prevPoints ).toBe p.points

    it 'should not set the `d` attribute if nothing changed', ->
      radiusX = 20; radiusY = 30
      curve = new Curve ctx: svg, radiusX, radiusY

      curve._draw()
      spyOn curve.el, 'setAttribute'
      curve._draw()

      expect( curve.el.setAttribute )
        .not.toHaveBeenCalled()

    it 'should set `d` attribute if `radiusX` changed', ->
      curve = new Curve
        ctx:    document.createElementNS?(ns, "svg")
        radius: 20
        points: 10
      curve._draw()
      spyOn curve.el, 'setAttribute'
      curve._props.radiusX = 30
      curve._draw()
      expect( curve.el.setAttribute ).toHaveBeenCalled()

    it 'should set `d` attribute if `radiusY` changed', ->
      curve = new Curve
        ctx:    document.createElementNS?(ns, "svg")
        radius: 20
        points: 10
      curve._draw()
      spyOn curve.el, 'setAttribute'
      curve._props.radiusY = 30
      curve._draw()
      expect( curve.el.setAttribute ).toHaveBeenCalled()

    it 'should set `d` attribute if `points` changed', ->
      curve = new Curve
        ctx:    document.createElementNS?(ns, "svg")
        radius: 20
        points: 10
      curve._draw()
      spyOn curve.el, 'setAttribute'
      curve._props.points = 30
      curve._draw()
      expect( curve.el.setAttribute ).toHaveBeenCalled()

  describe 'getLength method', ->
    it 'should calculate total length of the path', ->
      radiusX = 20; radiusY = 30
      curve = new Curve ctx: svg, radiusX, radiusY

      p = curve._props

      radiusX = if p.radiusX? then p.radiusX else p.radius
      radiusY = if p.radiusY? then p.radiusY else p.radius

      dRadius = radiusX + radiusY
      sqrt = Math.sqrt((3*radiusX + radiusY)*(radiusX + 3*radiusY))
      len = .5 * Math.PI * ( 3*dRadius - sqrt );

      expect( curve._getLength() ).toBe len

  
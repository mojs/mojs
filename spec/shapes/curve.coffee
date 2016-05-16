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
      expect(curve._defaults.shape).toBe 'path'

  describe '_extendDefaults method', ->
    it 'should call super', ->
      spyOn Bit::, '_extendDefaults'
      curve._extendDefaults()
      expect(Bit::_extendDefaults).toHaveBeenCalled()
    it '`radiusX` should fallback to `radius`', ->
      curve = new Curve ctx: svg, radius: 20
      curve._extendDefaults()
      expect(curve._props.radiusX).toBe 20
    it '`radiusX` should not fallback to `radius` if falsy', ->
      curve = new Curve ctx: svg, radius: 20, radiusX: 0
      curve._extendDefaults()
      expect(curve._props.radiusX).toBe 0
    it '`radiusY` should fallback to `radius`', ->
      curve = new Curve ctx: svg, radius: 20
      curve._extendDefaults()
      expect(curve._props.radiusY).toBe 20
    it '`radiusY` should not fallback to `radius` if falsy', ->
      curve = new Curve ctx: svg, radius: 20, radiusY: 0
      curve._extendDefaults()
      expect(curve._props.radiusY).toBe 0

  describe 'draw method ->', ->
    it 'should call super', ->
      spyOn Bit::, 'draw'
      curve.draw()
      expect(Bit::draw).toHaveBeenCalled()
    it 'should call `el.setAttribute` for `d` attribute ', ->
      radiusX = 20; radiusY = 30
      curve = new Curve ctx: svg, radiusX, radiusY
      curve.draw()

      p = curve._props
      x  = 1*p.x
      y  = 1*p.y
      
      x1 = x - p.radiusX
      x2 = x
      x3 = x + p.radiusX
      y1 = y - p.radiusY
      y2 = y
      y3 = y + p.radiusY

      expect( curve.el.getAttribute('d') )
        .toBe "M#{x1} #{p.y} Q #{x2} #{ p.y - 2*p.radiusY } #{x3} #{p.y}"

    it 'should save `d` to `_d` property', ->
      radiusX = 20; radiusY = 30
      curve = new Curve ctx: svg, radiusX, radiusY
      curve.draw()

      p = curve._props
      x  = 1*p.x
      y  = 1*p.y
      
      x1 = x - p.radiusX
      x2 = x
      x3 = x + p.radiusX
      y1 = y - p.radiusY
      y2 = y
      y3 = y + p.radiusY

      expect( curve._prevD )
        .toBe "M#{x1} #{p.y} Q #{x2} #{ p.y - 2*p.radiusY } #{x3} #{p.y}"

    it 'should not set the `d` attribute if nothing changed', ->
      radiusX = 20; radiusY = 30
      curve = new Curve ctx: svg, radiusX, radiusY

      curve.draw()
      spyOn curve.el, 'setAttribute'
      curve.draw()

      expect( curve.el.setAttribute )
        .not.toHaveBeenCalled()

  describe 'getLength method', ->
    it 'should calculate total length of the path', ->
      radiusX = 20; radiusY = 30
      curve = new Curve ctx: svg, radiusX, radiusY

      p = curve._props
      dRadius = p.radiusX + p.radiusY
      sqrt = Math.sqrt((3*p.radiusX + p.radiusY)*(p.radiusX + 3*p.radiusY))
      len = .5 * Math.PI * ( 3*dRadius - sqrt );

      expect( curve.getLength() ).toBe len

  
Zigzag = mojs.shapesMap.getShape('zigzag')
Bit    = mojs.shapesMap.getShape('bit')
ns     = 'http://www.w3.org/2000/svg'
svg    = document.createElementNS?(ns, 'svg')
document.body.appendChild svg

describe 'Zigzag ->', ->
  it 'should extend Bit', ->
    line = new Zigzag ctx: svg
    expect(line instanceof Bit).toBe(true)
  it 'should add itself to context', ->
    line = new Zigzag ctx: svg
    expect(svg.firstChild).toBeDefined()
  describe '_declareDefaults method ->', ->
    it 'should call super', ->
      zigzag = new Zigzag
      spyOn Bit::, '_declareDefaults'
      zigzag._declareDefaults()
      expect(Bit::_declareDefaults).toHaveBeenCalled()
    it 'should set `shape` to `path`', ->
      zigzag = new Zigzag
      expect(zigzag._defaults.tag).toBe 'path'
    it 'should set `points` to `3`', ->
      zigzag = new Zigzag
      expect(zigzag._defaults.points).toBe 3
  describe 'methods ->', ->
    describe 'draw method ->', ->
      it 'should add properties to el', ->
        zigzag = new Zigzag
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
      it 'should define points', ->
        zigzag = new Zigzag
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
        expect(zigzag.el.getAttribute('d')).toBeTruthy()
      it 'should not work with 0 points', ->
        zigzag = new Zigzag
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
          points: 0
        expect(zigzag.el.getAttribute('d')).toBeFalsy()
      it 'should calculate path length', ->
        zigzag = new Zigzag
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
          points: 10
        zigzag._draw()
        expect(zigzag._length).toBeCloseTo 184.390, 2

      it 'should set `d` attribute', ->
        zigzag = new Zigzag
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
          points: 10
        zigzag._draw()

        p = zigzag._props

        radiusX = if p.radiusX? then p.radiusX else p.radius
        radiusY = if p.radiusY? then p.radiusY else p.radius

        x = p.width/2
        y = p.height/2

        currentX = x-radiusX
        currentY = y
        stepX    = (2*radiusX) / (p.points-1)
        yFlip    = -1

        delta = Math.sqrt(stepX*stepX + radiusY*radiusY)
        length = -delta

        points = "M#{currentX}, #{y} "
        for i in [0...p.points]
          points   += "L#{currentX}, #{currentY} "
          currentX += stepX
          length   += delta

          currentY = if yFlip is -1 then y-radiusY else y
          yFlip    = -yFlip


        expect( zigzag.el.getAttribute( 'd' ) ).toBe points
        expect( zigzag._prevRadiusX ).toBe radiusX
        expect( zigzag._prevRadiusY ).toBe radiusY
        expect( zigzag._prevPoints ).toBe p.points

      it 'should not set `d` attribute if nothing changed', ->
        zigzag = new Zigzag
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
          points: 10
        zigzag._draw()
        spyOn zigzag.el, 'setAttribute'
        zigzag._draw()
        expect( zigzag.el.setAttribute ).not.toHaveBeenCalled()

      it 'should set `d` attribute if `radiusX` changed', ->
        zigzag = new Zigzag
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
          points: 10
        zigzag._draw()
        spyOn zigzag.el, 'setAttribute'
        zigzag._props.radiusX = 30
        zigzag._draw()
        expect( zigzag.el.setAttribute ).toHaveBeenCalled()

      it 'should set `d` attribute if `radiusY` changed', ->
        zigzag = new Zigzag
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
          points: 10
        zigzag._draw()
        spyOn zigzag.el, 'setAttribute'
        zigzag._props.radiusY = 30
        zigzag._draw()
        expect( zigzag.el.setAttribute ).toHaveBeenCalled()

      it 'should set `d` attribute if `points` changed', ->
        zigzag = new Zigzag
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
          points: 10
        zigzag._draw()
        spyOn zigzag.el, 'setAttribute'
        zigzag._props.points = 30
        zigzag._draw()
        expect( zigzag.el.setAttribute ).toHaveBeenCalled()

  describe 'getLength method ->', ->
    it 'should calculate total length of the path', ->
      bit = new Zigzag
        ctx:    document.createElementNS ns, 'svg'
        radiusX: 100
        radiusY: 550

      bit._draw()

      expect( bit._getLength() ).toBe bit._length

Cross = mojs.shapesMap.getShape('cross')
Bit   = mojs.shapesMap.getShape('bit')
ns    = 'http://www.w3.org/2000/svg'
svg   = document.createElementNS?(ns, "svg")
cross  = new Cross ctx: svg

describe 'Cross ->', ->
  it 'should extend Bit', ->
    expect(cross instanceof Bit).toBe(true)

  describe '_declareDefaults method ->', ->
    it 'should call super', ->
      spyOn Bit::, '_declareDefaults'
      cross._declareDefaults()
      expect(Bit::_declareDefaults).toHaveBeenCalled()

    it 'should set `shape` to `path`', ->
      expect(cross._defaults.tag).toBe 'path'

  describe '_draw method ->', ->
    it 'should add properties to el', ->
      # svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross radius: 20, width: 40, height: 40
      cross._draw()
      d = cross.el.getAttribute('d')
      isD = d is 'M0,20 L40,20 M20,0 L20,40'
      isIE9D = d is 'M 0 20 L 40 20 M 20 0 L 20 40'
      expect(isD or isIE9D).toBe true
    it 'should work with radiusX and fallback to radius', ->
      # svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross
        # ctx:    svg
        radius:  20
        radiusX: 40

      cross._draw()

      d = cross.el.getAttribute('d')
      isD = d is 'M-40,0 L40,0 M0,-20 L0,20'
      isIE9D = d is 'M -40 0 L 40 0 M 0 -20 L 0 20'
      expect(isD or isIE9D).toBe true
    it 'should work with radiusY and fallback to radius', ->
      # svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross
        # ctx:    svg
        radius:  20
        radiusY: 40

      cross._draw()
      
      d = cross.el.getAttribute('d')
      isD = d is 'M-20,0 L20,0 M0,-40 L0,40'
      isIE9D = d is 'M -20 0 L 20 0 M 0 -40 L 0 40'
      expect(isD or isIE9D).toBe true
    it 'should call super method', ->
      # svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross
      spyOn(Cross.__super__, '_draw')
      cross._draw()
      expect(Cross.__super__._draw).toHaveBeenCalled()

    it 'should not set `d` attribute if nothing changed', ->
      cross = new Cross
        radius: 20
        points: 10
      cross._draw()
      spyOn cross.el, 'setAttribute'
      cross._draw()
      expect( cross.el.setAttribute ).not.toHaveBeenCalled()

    it 'should set `d` attribute if `radiusX` changed', ->
      cross = new Cross
        radius: 20
        points: 10
      cross._draw()
      spyOn cross.el, 'setAttribute'
      cross._props.radiusX = 30
      cross._draw()
      expect( cross.el.setAttribute ).toHaveBeenCalled()

    it 'should set `d` attribute if `radiusY` changed', ->
      cross = new Cross
        radius: 20
        points: 10
      cross._draw()
      spyOn cross.el, 'setAttribute'
      cross._props.radiusY = 30
      cross._draw()
      expect( cross.el.setAttribute ).toHaveBeenCalled()

  describe '_getLength method', ->
    it 'should calculate total length of the path', ->
      bit = new Cross
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      expect(bit._getLength()).toBe 400

    it 'should calculate total length of the with different radiusX/Y', ->
      bit = new Cross
        ctx:    document.createElementNS ns, 'svg'
        radiusX: 100
        radiusY: 50
      expect(bit._getLength()).toBe 300

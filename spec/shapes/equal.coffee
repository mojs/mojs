Equal  = mojs.shapesMap.getShape('equal')
Bit    = mojs.shapesMap.getShape('bit')
ns     = 'http://www.w3.org/2000/svg'
svg    = document.createElementNS?(ns, "svg")

describe 'Equal ->', ->
  it 'should extend Bit', ->
    equal = new Equal
    expect(equal instanceof Bit).toBe(true)

  describe '_declareDefaults method ->', ->
    it 'should call super', ->
      equal = new Equal
      spyOn Bit::, '_declareDefaults'
      equal._declareDefaults()
      expect(Bit::_declareDefaults).toHaveBeenCalled()

    it 'should set `shape` to `path`', ->
      equal = new Equal
      expect(equal._defaults.tag).toBe 'path'
    it 'should set `points` to `2`', ->
      equal = new Equal
      expect(equal._defaults.points).toBe 2

  describe '_draw method ->', ->
    it 'should define points', ->
      equal = new Equal radius: 20
      equal._draw()
      expect(equal.el.getAttribute('d')).toBeTruthy()
    it 'should not work with 0 points', ->
      equal = new Equal
        radius: 20
        points: 0
      expect(equal.el.getAttribute('points')).toBeFalsy()

    it 'should not set `d` attribute if nothing changed', ->
      equal = new Equal
        radius: 20
        points: 10
      equal._draw()
      spyOn equal.el, 'setAttribute'
      equal._draw()
      expect( equal.el.setAttribute ).not.toHaveBeenCalled()

    it 'should set `d` attribute if `radiusX` changed', ->
      equal = new Equal
        radius: 20
        points: 10
      equal._draw()
      spyOn equal.el, 'setAttribute'
      equal._props.radiusX = 30
      equal._draw()
      expect( equal.el.setAttribute ).toHaveBeenCalled()

    it 'should set `d` attribute if `radiusY` changed', ->
      equal = new Equal
        radius: 20
        points: 10
      equal._draw()
      spyOn equal.el, 'setAttribute'
      equal._props.radiusY = 30
      equal._draw()
      expect( equal.el.setAttribute ).toHaveBeenCalled()

    it 'should set `d` attribute if `points` changed', ->
      equal = new Equal
        radius: 20
        points: 10
      equal._draw()
      spyOn equal.el, 'setAttribute'
      equal._props.points = 30
      equal._draw()
      expect( equal.el.setAttribute ).toHaveBeenCalled()

  describe 'getLength method', ->
    it 'should calculate total length of the path', ->
      radius = 100
      bit = new Equal
        radius: radius
      expect(bit._getLength()).toBe 2*radius

    it 'should calculate total length of the with different radiusX/Y', ->
      radiusX = 100
      radiusY = 50
      bit = new Equal
        radiusX: radiusX
        radiusY: radiusY
      expect(bit._getLength()).toBe 2*radiusX

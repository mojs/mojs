Cross = mojs.Cross
Bit   = mojs.Bit
ns    = 'http://www.w3.org/2000/svg'
svg   = document.createElementNS?(ns, "svg")
cross  = new Cross ctx: svg

describe 'Cross ->', ->
  it 'should extend Bit', ->
    expect(cross instanceof Bit).toBe(true)
  describe 'draw ->', ->
    it 'should add properties to el', ->
      svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross
        ctx:    svg
        radius: 20
      d = cross.el.getAttribute('d')
      isD = d is 'M-20,0 L20,0 M0,-20 L0,20'
      isIE9D = d is 'M -20 0 L 20 0 M 0 -20 L 0 20'
      expect(isD or isIE9D).toBe true
    it 'should work with radiusX and fallback to radius', ->
      svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross
        ctx:    svg
        radius:  20
        radiusX: 40
      d = cross.el.getAttribute('d')
      isD = d is 'M-40,0 L40,0 M0,-20 L0,20'
      isIE9D = d is 'M -40 0 L 40 0 M 0 -20 L 0 20'
      expect(isD or isIE9D).toBe true
    it 'should work with radiusY and fallback to radius', ->
      svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross
        ctx:    svg
        radius:  20
        radiusY: 40
      d = cross.el.getAttribute('d')
      isD = d is 'M-20,0 L20,0 M0,-40 L0,40'
      isIE9D = d is 'M -20 0 L 20 0 M 0 -40 L 0 40'
      expect(isD or isIE9D).toBe true
    it 'should call super method', ->
      svg     = document.createElementNS?(ns, "svg")
      cross     = new Cross ctx: svg
      spyOn(Cross.__super__, 'draw')
      cross.draw()
      expect(Cross.__super__.draw).toHaveBeenCalled()

  describe 'getLength method', ->
    it 'should calculate total length of the path', ->
      bit = new Cross
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      expect(bit.getLength()).toBe 400

    it 'should calculate total length of the with different radiusX/Y', ->
      bit = new Cross
        ctx:    document.createElementNS ns, 'svg'
        radiusX: 100
        radiusY: 50
      expect(bit.getLength()).toBe 300

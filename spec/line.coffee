# console.log mojs.Line
Line  = mojs.Line
Bit   = mojs.Bit
ns    = 'http://www.w3.org/2000/svg'
svg   = document.createElementNS?(ns, "svg")
line  = new Line ctx: svg

describe 'Line', ->
  it 'should extend Bit', ->
    bit = new Bit ctx: svg
    expect(line instanceof Bit).toBe(true)
  it 'should add itself to context', ->
    line = new Line ctx: svg
    expect(svg.firstChild).toBeDefined()

  describe 'methods ->', ->
    describe 'draw method ->', ->
      it 'should have draw method', ->
        expect(line.draw).toBeDefined()

      it 'should add properties to el', ->
        svg     = document.createElementNS?(ns, "svg")
        line     = new Line
          ctx:    svg
          radius: 20
        attr1 = parseInt line.el.getAttribute('x1'), 10
        attr2 = parseInt line.el.getAttribute('x2'), 10
        delta = attr2 - attr1
        expect(delta).toBe(40)



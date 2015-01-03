Bit   = mojs.Bit
ns    = 'http://www.w3.org/2000/svg'
svg   = document.createElementNS?(ns, "svg")
bit   = new Bit ctx: svg
describe 'Bit', ->
  describe 'context', ->
    it 'context passed should be real svg node', ->
      expect(-> new Bit).toThrow()
      expect(-> bit = new Bit ctx: 'a').toThrow()
      expect(-> bit = new Bit ctx: svg).not.toThrow()
  describe 'methods', ->
    it 'should have vars method', ->
      expect(bit.vars).toBeDefined()

  describe 'render method', ->
    it 'should have render method', ->
      expect(bit.render).toBeDefined()
    it 'should call render method on init', ->
      expect(bit.isRendered).toBe(true)
    it 'should add self to context', ->
      svg     = document.createElementNS?(ns, "svg")
      bit     = new Bit ctx: svg
      expect(svg.firstChild).toBeTruthy()
  describe 'setAttr method', ->
    it 'should have setAttr method', ->
      expect(bit.setAttr).toBeDefined()
    it 'should set attribute on element', ->
      bit.el = document.createElementNS?(ns, "line")
      bit.setAttr 'stroke', '#ff00ff'
      expect(bit.el.getAttribute('stroke')).toBe '#ff00ff'
    it 'should set multiple attributes on element', ->
      bit.el = document.createElementNS?(ns, "circle")
      bit.setAttr
        stroke:           '#f0f'
        fill:             '#0f0'
      expect(bit.el.getAttribute('stroke')).toBe '#f0f'
      expect(bit.el.getAttribute('fill')).toBe   '#0f0'
    it 'should work with camelCase attribute names', ->
      bit.el = document.createElementNS?(ns, "rect")
      bit.setAttr strokeWidth: 2
      expect(bit.el.getAttribute('stroke-width')).toBe '2'
  describe 'defaults and options', ->
    it 'should have defaults object', ->
      expect(bit.defaults).toBeDefined()
    it 'should have options object', ->
      expect(bit.o).toBeDefined()
    it 'should have dafaults', ->
      svg     = document.createElementNS?(ns, "svg")
      bit     = new Bit ctx:    svg
      expect(bit.props.radius).toBe(50)
    it 'should extend defaults object to properties', ->
      bit = new Bit
        ctx:    svg
        radius: 45
      expect(bit.props.radius).toBe(45)
    it 'should have namespace object', ->
      expect(bit.ns).toBe 'http://www.w3.org/2000/svg'
    it 'should have type object', ->
      expect(bit.type).toBeDefined()

  describe 'calculations', ->
    it 'should calculate center points', ->
      bit = new Bit ctx: svg
      expect(bit.props.cX).toBe(-50)
      expect(bit.props.cY).toBe(-50)
    it 'should calculate transform object', ->
      bit = new Bit
        ctx: svg
        deg: 90
      expect(bit.props.transform).toBe('translate(-50, -50) rotate(90, -50, -50)')



Bit   = mojs.Bit
ns    = 'http://www.w3.org/2000/svg'
svg   = document.createElementNS?(ns, 'svg')
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
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit ctx: svg
      expect(svg.firstChild).toBeTruthy()
    it 'should run draw method', ->
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit ctx: svg
      spyOn bit, 'draw'
      bit.render()
      expect(bit.draw).toHaveBeenCalled()
    it 'should not run draw method if isDrawLess option passed', ->
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit
        ctx:        svg
        isDrawLess: true
      spyOn bit, 'draw'
      bit.render()
      expect(bit.draw).not.toHaveBeenCalled()
  describe 'draw method ->', ->
    it 'should set presentations attributes', ->
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit
        ctx: svg
        stroke:               '#0f0'
        strokeWidth:          3
        fill:                 '#0ff'
        strokeDasharray:      100
        strokeDashoffset:     50
        deg:                  45
      stroke          = bit.el.getAttribute 'stroke'
      strokeWidth     = bit.el.getAttribute 'stroke-width'
      fill            = bit.el.getAttribute 'fill'
      strokeDasharray = bit.el.getAttribute 'stroke-dasharray'
      strokeOffset    = bit.el.getAttribute 'stroke-dashoffset'
      transform       = bit.el.getAttribute 'transform'
      expect(stroke)          .toBe   '#0f0'
      expect(strokeWidth)     .toBe   '3'
      expect(fill)            .toBe   '#0ff'
      expect(strokeDasharray) .toBe   '100'
      expect(strokeOffset)    .toBe   '50'
      expect(transform)       .toBe   'rotate(45, 0, 0)'

  describe 'setProp method ->', ->
    it 'should set properties ->', ->
      bit     = new Bit
        ctx:    svg
        stroke: '#0f0'

      bit.setProp 'stroke', '#ff0000'
      expect(bit.props.stroke).toBe '#ff0000'

    it 'should set multiple properties ->', ->
      bit     = new Bit
        ctx:    svg
        stroke: '#0f0'

      bit.setProp
        stroke:   '#ff0000'
        fill:     '#0000ff'
      expect(bit.props.stroke)  .toBe '#ff0000'
      expect(bit.props.fill)    .toBe '#0000ff'
  describe 'setAttr method ->', ->
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
    it 'should have ratio', ->
      expect(bit.ratio).toBeDefined()
    it 'should have dafaults', ->
      svg     = document.createElementNS?(ns, "svg")
      bit     = new Bit ctx:    svg
      expect(bit.props.radius).toBe(50)
    it 'should have extendDefaults method', ->
      bit = new Bit
        ctx:    svg
        radius: 45
      expect(bit.extendDefaults).toBeDefined()
      expect(-> bit.extendDefaults()).not.toThrow()
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
    it 'should calculate transform object', ->
      bit = new Bit
        ctx: svg
        deg: 90
      expect(bit.props.transform).toBe('rotate(90, 0, 0)')
      expect(bit.calcTransform).toBeDefined()



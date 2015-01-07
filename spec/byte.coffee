Byte = mojs.Byte
Bit  = mojs.Bit
h    = mojs.helpers
ns   = 'http://www.w3.org/2000/svg'
svg  = document.createElementNS?(ns, 'svg')
# circle  = new Circle ctx: svg

describe 'Byte ->', ->
  describe 'extension ->', ->
    it 'should extend Bit class', ->
      byte = new Byte
      expect(byte instanceof Bit).toBe(true)
  it 'should have vars function', ->
    byte = new Byte
    expect(byte.vars).toBeDefined()
    expect(-> byte.vars()).not.toThrow()
  describe 'defaults object ->', ->
    it 'should have defaults object', ->
      byte = new Byte
      expect(byte.defaults).toBeDefined()
  describe 'options object ->', ->
    it 'should recieve empty options object by default', ->
      byte = new Byte
      expect(byte.o).toBeDefined()
    it 'should recieve options object', ->
      byte = new Byte option: 1
      expect(byte.o.option).toBe 1

  it 'should extend defaults object to properties', ->
    byte = new Byte radius: 45
    expect(byte.props.radius).toBe(45)

  it 'should extend defaults object to properties if object was passed', ->
    byte = new Byte radius: {45: 55}
    expect(byte.props.radius).toBe(45)

  it 'should calculate transform object', ->
    byte = new Byte deg: 90
    expect(byte.props.transform).toBe('rotate(90, 0, 0)')
    expect(byte.calcTransform).toBeDefined()

  describe 'size calculations ->', ->
    it 'should calculate size el size depending on largest value', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 6:  4    }
      expect(byte.props.size).toBe(206)
    it 'should not calculate size el size if size was passed', ->
      byte = new Byte
        radius:       100
        strokeWidth:  5
        size: 400
      expect(byte.props.size).toBe(400)
    it 'should not calculate size el size if external context was passed', ->
      byte = new Byte
        radius:       100
        strokeWidth:  5
        size:         400
        ctx:          svg
      expect(byte.props.size).toBe(400)
    it 'should calculate center based on el size', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 4:  6    }
      expect(byte.props.size)   .toBe(206)
      expect(byte.props.center) .toBe(103)

  describe 'el creation ->', ->
    it 'should create el', ->
      byte = new Byte radius: 25
      expect(byte.el.tagName.toLowerCase()).toBe('div')
    it 'should create context', ->
      byte = new Byte radius: 25
      expect(byte.el.firstChild.tagName.toLowerCase()).toBe('svg')
    it 'should set context styles', ->
      byte = new Byte radius: 25
      svg = byte.el.firstChild
      expect(svg.style.position)                .toBe 'absolute'
      expect(svg.style.width)                   .toBe '100%'
      expect(svg.style.height)                  .toBe '100%'
    it 'should not create context and el if context was passed', ->
      svg.isSvg = true
      byte = new Byte ctx: svg
      expect(byte.el)           .not.toBeDefined()
      expect(byte.ctx)          .toBeDefined()
      expect(byte.ctx.isSvg)    .toBe true
    it 'should set el size', ->
      byte = new Byte
        radius:       25
        strokeWidth:  2
      expect(byte.el.style.position)  .toBe 'absolute'
      expect(byte.el.style.width)     .toBe '3.25rem'
      expect(byte.el.style.height)    .toBe '3.25rem'
      expect(byte.el.style['backface-visibility']).toBe 'hidden'
      expect(byte.el.style["#{h.prefix.css}backface-visibility"]).toBe 'hidden'
    it 'should create bit', ->
      byte = new Byte radius: 25
      expect(byte.bit).toBeDefined()
      expect(byte.bit.o.isDrawLess).toBe true
    it 'should create bit based on type option or fallback to line', ->
      byte = new Byte
        radius: 25
        type:   'rect'
      byte2 = new Byte radius: 25
      expect(byte.bit.type).toBe  'rect'
      expect(byte2.bit.type).toBe 'line'

    it 'should add itself to body', ->
      byte = new Byte radius: 25
      expect(byte.el.parentNode.tagName.toLowerCase()).toBe('body')

    it 'should add itself to parent if the option was passed', ->
      div  = document.createElement?('div')
      div.isDiv = true
      byte = new Byte
        radius: 25
        parent: div
      expect(byte.el.parentNode.isDiv).toBe true

    describe 'render method ->', ->
      it 'should call draw method', ->
        byte = new Byte radius: 25
        spyOn byte, 'draw'
        byte.render()
        expect(byte.draw).toHaveBeenCalled()
      it 'should not call draw method if isDrawLess option is true', ->
        byte = new Byte radius: 25, isDrawLess: true
        spyOn byte, 'draw'
        byte.render()
        expect(byte.draw).not.toHaveBeenCalled()

    describe 'delta calculations ->', ->
      it 'should calculate delta', ->
        byte = new Byte radius:  {25: 75}
        radiusDelta = byte.deltas.radius
        expect(radiusDelta.start)   .toBe   25
        expect(radiusDelta.delta)   .toBe   50
      it 'should calculate delta with string arguments', ->
        byte = new Byte radius:  {'25': '75'}
        radiusDelta = byte.deltas.radius
        expect(radiusDelta.start)   .toBe   25
        expect(radiusDelta.delta)   .toBe   50
      it 'should calculate delta with float arguments', ->
        byte = new Byte radius:  {'25.50': 75.50}
        radiusDelta = byte.deltas.radius
        expect(radiusDelta.start)   .toBe   25.5
        expect(radiusDelta.delta)   .toBe   50
      it 'should calculate delta with negative start arguments', ->
        byte = new Byte radius:  {'-25.50': 75.50}
        radiusDelta = byte.deltas.radius
        expect(radiusDelta.start)   .toBe   -25.5
        expect(radiusDelta.delta)   .toBe   101
      it 'should calculate delta with negative end arguments', ->
        byte = new Byte radius:  {'25.50': -75.50}
        radiusDelta = byte.deltas.radius
        expect(radiusDelta.start)   .toBe   25.5
        expect(radiusDelta.end)     .toBe   -75.5
        expect(radiusDelta.delta)   .toBe   -101

    describe 'setProgress method ->', ->
      it 'should set transition progress', ->
        byte = new Byte radius:  {'25.50': -75.50}
        byte.setProgress .5
        expect(byte.progress).toBe .5
      it 'should set value progress', ->
        byte = new Byte radius:  {'25': 75}
        byte.setProgress .5
        expect(byte.props.radius).toBe 50
      it 'should set 0 if progress is less then 0', ->
        byte = new Byte radius:  {'25': 75}
        byte.setProgress -1
        expect(byte.progress).toBe 0
      it 'should set 1 if progress is greater then 1', ->
        byte = new Byte radius:  {'25': 75}
        byte.setProgress 2
        expect(byte.progress).toBe 1

















    




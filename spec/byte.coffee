Byte = mojs.Byte
Bit  = mojs.Bit
Rect = mojs.Rect
h    = mojs.helpers
ns   = 'http://www.w3.org/2000/svg'
svg  = document.createElementNS?(ns, 'svg')

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
    byte = new Byte
      deg: 90
      radius:       25
      strokeWidth:  4
    expect(byte.props.transform).toBe('rotate(90,27,27)')
    expect(byte.calcTransform).toBeDefined()
  describe 'size calculations ->', ->
    it 'should calculate size el size depending on largest value', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 6:  4    }
      expect(byte.props.size).toBe(206)
    it 'should calculate size el size depending on shape\'s ratio', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 6:  4    }
        type:         'rect'
      svg = document.createElementNS ns, 'svg'
      rect  = new Rect ctx: svg
      expect(byte.props.size).toBe(206*rect.ratio)
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
      it 'should call createBit method', ->
        byte = new Byte radius: 25
        spyOn byte, 'createBit'
        byte.render()
        expect(byte.createBit).toHaveBeenCalled()
      it 'should call calcSize method', ->
        byte = new Byte radius: 25
        spyOn byte, 'calcSize'
        byte.render()
        expect(byte.calcSize).toHaveBeenCalled()
      it 'should not call calcSize method id context was passed', ->
        byte = new Byte radius: 25, ctx: svg
        spyOn byte, 'calcSize'
        byte.render()
        expect(byte.calcSize).not.toHaveBeenCalled()

    describe 'draw method ->', ->
      it 'should call setProp method', ->
        byte = new Byte radius: 25
        spyOn byte.bit, 'setProp'
        byte.draw()
        expect(byte.bit.setProp).toHaveBeenCalled()
      it 'should call bit.draw method', ->
        byte = new Byte radius: 25
        spyOn byte.bit, 'draw'
        byte.draw()
        expect(byte.bit.draw).toHaveBeenCalled()

      it 'should call calcTransform method', ->
        byte = new Byte radius: 25
        spyOn byte, 'calcTransform'
        byte.draw()
        expect(byte.calcTransform).toHaveBeenCalled()

    describe 'delta calculations ->', ->
      describe 'numeric values ->', ->
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
      describe 'color values ->', ->
        it 'should calculate color delta', ->
          byte = new Byte stroke:  {'#000': 'rgb(255,255,255)'}
          colorDelta = byte.deltas.stroke
          expect(colorDelta.start.r)    .toBe   0
          expect(colorDelta.end.r)      .toBe   255
          expect(colorDelta.delta.r)    .toBe   255
      describe 'array values ->', ->
        it 'should calculate array delta', ->
          byte = new Byte strokeDasharray:  { '200 100': '300' }
          arrayDelta = byte.deltas.strokeDasharray
          expect(arrayDelta.start.join(' '))   .toBe   '200 100'
          expect(arrayDelta.end.join(' '))     .toBe   '300 0'
          expect(arrayDelta.delta.join(' '))   .toBe   '100 -100'
    describe 'setProgress method ->', ->
      it 'should set transition progress', ->
        byte = new Byte radius:  {'25.50': -75.50}
        byte.setProgress .5
        expect(byte.progress).toBe .5
      it 'should set value progress', ->
        byte = new Byte radius:  {'25': 75}
        byte.setProgress .5
        expect(byte.props.radius).toBe 50
      it 'should set color value progress and only int', ->
        byte = new Byte stroke:  {'#000': 'rgb(255,255,255)'}
        colorDelta = byte.deltas.stroke
        byte.setProgress .5
        expect(byte.props.stroke).toBe 'rgba(127,127,127,1)'
      it 'should set color value progress for delta starting with 0', ->
        byte = new Byte stroke:  {'#000': 'rgb(0,255,255)'}
        colorDelta = byte.deltas.stroke
        byte.setProgress .5
        expect(byte.props.stroke).toBe 'rgba(0,127,127,1)'

      it 'should set strokeDasharray/strokeDashoffset value progress', ->
        byte = new Byte strokeDasharray:  {'200 100': '400'}
        byte.setProgress .5
        expect(byte.props.strokeDasharray).toBe '300 50 '

      it 'should set 0 if progress is less then 0', ->
        byte = new Byte radius:  {'25': 75}
        byte.setProgress -1
        expect(byte.progress).toBe 0
      it 'should set 1 if progress is greater then 1', ->
        byte = new Byte radius:  {'25': 75}
        byte.setProgress 2
        expect(byte.progress).toBe 1

















    




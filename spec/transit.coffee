Byte = mojs.Transit
Bit  = mojs.Bit
Rect = mojs.Rect
h    = mojs.helpers
ns   = 'http://www.w3.org/2000/svg'
svg  = document.createElementNS?(ns, 'svg')

# console.log   = ->
console.warn  = ->
console.error = ->

describe 'Transit ->', ->
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
  describe 'extendDefaults method ->', ->
    it 'should extend defaults object to properties', ->
      byte = new Byte radius: 45
      expect(byte.props.radius).toBe(45)
    it 'should extend defaults object to properties if 0', ->
      byte = new Byte radius: 0
      expect(byte.props.radius).toBe(0)
    it 'should extend defaults object to properties if object was passed', ->
      byte = new Byte radius: {45: 55}
      expect(byte.props.radius).toBe(45)
    # for burst
    it 'should extend defaults object to properties if array was passed', ->
      byte = new Byte radius: [50, 100]
      expect(byte.props.radius.join ', ').toBe '50, 100'
    it 'should extend defaults object to properties if rand was passed', ->
      byte = new Byte radius: 'rand(0, 10)'
      expect(byte.props.radius).toBeDefined()
      expect(byte.props.radius).toBeGreaterThan -1
      expect(byte.props.radius).not.toBeGreaterThan 10
  it 'should calculate transform object', ->
    byte = new Byte
      angle:        90
      radius:       25
      strokeWidth:  4
    expect(byte.props.transform).toBe('rotate(90,29,29)')
    expect(byte.calcTransform).toBeDefined()
  describe 'size calculations ->', ->
    it 'should calculate size el size depending on largest value', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 6:  4    }
      expect(byte.props.size).toBe(212)
    it 'should have sizeGap option', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 6:  4    }
        sizeGap: 40
      expect(byte.props.size).toBe(292)

    it 'should calculate size el size depending on shape\'s ratio', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 6:  4    }
        type:         'rect'
      svg = document.createElementNS ns, 'svg'
      rect  = new Rect ctx: svg
      expect(byte.props.size).toBe(212*rect.ratio)
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
      expect(byte.props.size)   .toBe(212)
      expect(byte.props.center) .toBe(106)
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
        x:            10
        y:            20
        isRunLess:    true
      expect(byte.el.style.position)              .toBe 'absolute'
      expect(byte.el.style.width)                 .toBe '54px'
      expect(byte.el.style.height)                .toBe '54px'
      expect(byte.el.style.display)               .toBe 'none'
      expect(byte.el.style['margin-left'])        .toBe '-27px'
      expect(byte.el.style['margin-top'])         .toBe '-27px'
      expect(byte.el.style['backface-visibility']).toBe 'hidden'
      expect(byte.el.style["#{h.prefix.css}backface-visibility"]).toBe 'hidden'
      expect(byte.isShown).toBe false
    it 'should set display: block if isShowInit was passed', ->
      byte = new Byte isShowInit: true
      expect(byte.el.style.display).toBe 'block'
      expect(byte.isShown).toBe true
    it 'should set el size based', ->
    # it 'should set el size based on remBase', ->
      byte = new Byte
        radius:       25
        strokeWidth:  2
        x:            10
        y:            20
      
      byte.isRendered = false
      byte.h.remBase = 8
      byte.render()
      byte.h.remBase = 16

      expect(byte.el.style.position)              .toBe 'absolute'
      expect(byte.el.style.width)                 .toBe '54px'
      expect(byte.el.style.height)                .toBe '54px'
      expect(byte.el.style['margin-left'])        .toBe '-27px'
      expect(byte.el.style['margin-top'])         .toBe '-27px'
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
  describe 'opacity set ->', ->
    it 'should set a position with respect to units', ->
      byte = new Byte opacity: .5
      expect(byte.el.style.opacity).toBe '0.5'
    it 'should animate opacity', (dfr)->
      byte = new Byte
        opacity: { 1: 0}
        duration: 50
      setTimeout ->
        expect(byte.el.style.opacity).toBe '0'
        dfr()
      , 100
    describe 'position set ->', ->
      describe 'x/y coordinates ->', ->
        it 'should set a position with respect to units', ->
          byte = new Byte
            x: 100
            y: 50
          expect(byte.el.style.left)   .toBe '100px'
          expect(byte.el.style.top)    .toBe '50px'
        it 'should animate position', (dfr)->
          byte = new Byte
            x: {100: '200px'}
            duration: 20
          setTimeout ->
            expect(byte.el.style.left)   .toBe '200px'
            dfr()
          , 100
        it 'should warn when x/y animated position and not foreign context',->
          spyOn console, 'warn'
          byte = new Byte x: {100: '200px'}
          expect(console.warn).toHaveBeenCalled()
        it 'should notwarn when x/y animated position and foreign context',->
          spyOn console, 'warn'
          byte = new Byte x: {100: '200px'}, ctx: svg
          expect(console.warn).not.toHaveBeenCalled()
          
        it 'should animate position with respect to units', (dfr)->
          byte = new Byte
            x: {'20%': '50%'}
            duration: 20
          setTimeout ->
            expect(byte.el.style.left)   .toBe '50%'
            dfr()
          , 100
        it 'should fallback to end units if units are differnt', (dfr)->
          byte = new Byte
            x: {'20%': '50px'}
            duration: 20
          setTimeout ->
            expect(byte.el.style.left)   .toBe '50px'
            dfr()
          , 100
      describe 'shiftX/shiftY coordinates', ->
        it 'should set a position with respect to units', ->
          byte = new Byte
            shiftX: 100
            shiftY: 50
          expect(byte.el.style.transform).toBe 'translate(100px, 50px)'
        it 'should animate position', (dfr)->
          byte = new Byte
            shiftX: {100: '200px'}
            duration: 20
          setTimeout ->
            expect(byte.el.style.transform) .toBe 'translate(200px, 0px)'
            dfr()
          , 100
        it 'should animate position with respect to units', (dfr)->
          byte = new Byte
            shiftX: {'20%': '50%'}
            duration: 20
          setTimeout ->
            expect(byte.el.style.transform) .toBe 'translate(50%, 0px)'
            dfr()
          , 100
        it 'should fallback to end units if units are differnt', (dfr)->
          byte = new Byte
            shiftX: {'20%': '50px'}
            shiftY: { 0: '50%'}
            duration: 20
          setTimeout ->
            expect(byte.el.style.transform) .toBe 'translate(50px, 50%)'
            dfr()
          , 100

  describe 'fillTransform method ->', ->
    it 'return tranform string of the el', ->
      byte = new Byte
        shiftX: 100, shiftY: 100
      expect(byte.fillTransform()).toBe 'translate(100px, 100px)'
  describe 'isNeedsTransform method ->', ->
    it 'return boolean if fillTransform needed', ->
      byte = new Byte shiftX: 100, shiftY: 100
      expect(byte.isNeedsTransform()).toBe true

  describe 'show method ->', ->
    it 'should set display: block to el', ->
      byte = new Byte
      byte.show()
      expect(byte.el.style.display).toBe 'block'
    it 'should return if isShow is already true', ->
      byte = new Byte
      byte.show()
      byte.el.style.display = 'inline'
      byte.show()
      expect(byte.el.style.display).toBe 'inline'
  describe 'hide method ->', ->
    it 'should set display: block to el', ->
      byte = new Byte
      byte.hide()
      expect(byte.el.style.display).toBe 'none'

  describe 'mergeThenOptions method ->', ->
    it 'should call copyEndOptions method', ->
      byte = new Byte
        strokeWidth:  { 40: 20 }
        radius:       25
        duration:     500
        isRunLess:    true
      byte.chainArr = [{
        options: {strokeWidth: 0}
        type: 'then'
      }]

      spyOn byte, 'copyEndOptions'
      byte.mergeThenOptions byte.chainArr[0]
      expect(byte.copyEndOptions).toHaveBeenCalled()
    it 'should call merge options values with old ones', ->
      byte = new Byte
        strokeWidth:  { 40: 20 }
        radius:       25
        duration:     500
        isRunLess:    true
      
      byte.chainArr = [{
        options: {strokeWidth: 0}
        type: 'then'
      }]
      byte.mergeThenOptions byte.chainArr[0]
      expect(byte.o.strokeWidth[20]).toBe 0
    it 'should set new values', ->
      byte = new Byte
        strokeWidth:      { 40: 20 }
        radius:           25
        duration:         500
        isRunLess:        true
        strokeDasharray:  '100'
      byte.chainArr = [{
        options: {strokeWidth: 0, duration: 1500}
        type: 'then'
      }]
      byte.mergeThenOptions byte.chainArr[0]
      expect(byte.o.duration).toBe 1500

  describe 'copyEndOptions method ->', ->
    it 'should copy end value of options', ->
      byte = new Byte
        strokeWidth:  { 40: 20 }
        radius:       25
        duration:     500
        isRunLess:    true
      
      byte.chainArr = [{
        options: {strokeWidth: 0}
        type: 'then'
      }]

      opt = byte.copyEndOptions()
      expect(opt.strokeWidth).toBe  20
      expect(opt.radius).toBe       25
      expect(opt.duration).toBe     500
      expect(opt.isRunLess).toBe    true

  describe 'render method ->', ->
    it 'should call draw method', ->
      byte = new Byte radius: 25
      spyOn byte, 'draw'
      byte.render()
      expect(byte.draw).toHaveBeenCalled()
    it 'should call createBit method', ->
      byte = new Byte radius: 25
      spyOn byte, 'createBit'
      byte.isRendered = false
      byte.render()
      expect(byte.createBit).toHaveBeenCalled()
    it 'should set isRendered to true method', ->
      byte = new Byte radius: 25
      expect(byte.isRendered).toBe true
      byte.isRendered = false; byte.render()
      expect(byte.isRendered).toBe true
    it 'should call calcSize method', ->
      byte = new Byte radius: 25
      spyOn byte, 'calcSize'
      byte.isRendered = false
      byte.render()
      expect(byte.calcSize).toHaveBeenCalled()
    it 'should have option for force render', ->
      byte = new Byte radius: 25
      spyOn byte, 'calcSize'
      byte.render true
      expect(byte.calcSize).toHaveBeenCalled()

    it 'should not create new el', ->
      byte = new Byte radius: 25
      cnt = document.body.children.length
      byte.render true
      expect(cnt).toBe document.body.children.length
  describe 'draw method ->', ->
    it 'should call setProp method', ->
      byte = new Byte radius: 25
      spyOn byte.bit, 'setProp'
      byte.draw()
      expect(byte.bit.setProp).toHaveBeenCalled()
    it 'should set x/y to center', ->
      byte = new Byte radius: 25
      byte.draw()
      expect(byte.bit.props.x).toBe byte.props.center
      expect(byte.bit.props.y).toBe byte.props.center
    it 'should set x/y to props.x/props.y if context was passed', ->
      byte = new Byte radius: 25, ctx: svg
      byte.draw()
      expect(byte.bit.props.x).toBe parseFloat byte.props.x
      expect(byte.bit.props.y).toBe parseFloat byte.props.y
    it 'should call bit.draw method', ->
      byte = new Byte radius: 25
      spyOn byte.bit, 'draw'
      byte.draw()
      expect(byte.bit.draw).toHaveBeenCalled()
    it 'should call drawEl method', ->
      byte = new Byte radius: 25
      spyOn byte, 'drawEl'
      byte.draw()
      expect(byte.drawEl).toHaveBeenCalled()
    it 'should call calcTransform method', ->
      byte = new Byte radius: 25
      spyOn byte, 'calcTransform'
      byte.draw()
      expect(byte.calcTransform).toHaveBeenCalled()
    it 'should recieve the current progress', ->
      byte = new Byte radius: 25
      spyOn byte, 'draw'
      byte.setProgress .5
      expect(byte.draw).toHaveBeenCalledWith .5
  describe 'drawEl method ->', ->
    it 'should set el positions and transforms', ->
      byte = new Byte radius: 25, y: 10
      byte.draw()
      expect(byte.el.style.left)      .toBe     '0px'
      expect(byte.el.style.top)       .toBe     '10px'
      expect(byte.el.style.opacity)   .toBe     '1'
      expect(byte.el.style.transform) .toBe     'translate(0px, 0px)'
    it 'should set new values', ->
      byte = new Byte radius: 25, y: 10
      byte.draw()
      byte.props.x = '1px'
      byte.draw()
      expect(byte.el.style.left)      .toBe     '1px'
      expect(byte.lastSet.x.value)    .toBe     '1px'
      expect(byte.lastSet.x.isChanged).toBe     true
    it 'should not set old values', ->
      byte = new Byte radius: 25, y: 10
      byte.draw()
      byte.draw()
      expect(byte.el.style.left)      .toBe     '0px'
      expect(byte.lastSet.x.value)    .toBe     '0px'
      expect(byte.lastSet.x.isChanged).toBe     false
    it 'should call fillTransform method', ->
      byte = new Byte radius: 25
      spyOn byte, 'fillTransform'
      byte.draw()
      expect(byte.fillTransform).toHaveBeenCalled()

  describe 'isPropChanged method ->', ->
    it 'should return bool showing if prop was changed after the last set', ->
      byte = new Byte radius: 25, y: 10
      byte.props.x = '20px'
      expect(byte.isPropChanged 'x').toBe true
      byte.props.x = '20px'
      expect(byte.isPropChanged 'x').toBe false
    it 'should add prop object to lastSet if undefined', ->
      byte = new Byte radius: 25, y: 10
      byte.isPropChanged('x')
      expect(byte.lastSet.x).toBeDefined()

  describe 'delta calculations ->', ->
    it 'should skip delta for excludePropsDelta object', ->
      byte = new Byte radius: {45: 55}
      byte.skipPropsDelta = radius: 1
      byte.extendDefaults()
      expect(byte.deltas.radius).not.toBeDefined()

    describe 'numeric values ->', ->
      it 'should calculate delta', ->
        byte = new Byte radius:  {25: 75}
        radiusDelta = byte.deltas.radius
        expect(radiusDelta.start)   .toBe   25
        expect(radiusDelta.delta)   .toBe   50
        expect(radiusDelta.type)    .toBe   'number'
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
        expect(colorDelta.type)       .toBe   'color'
      it 'should ignore stroke-linecap prop, use start prop and warn', ->
        byte = null
        spyOn console, 'warn'
        fun = -> byte = new Byte strokeLinecap:  {'round': 'butt'}
        expect(-> fun()).not.toThrow()
        expect(console.warn).toHaveBeenCalled()
        expect(byte.deltas.strokeLinecap).not.toBeDefined()
    describe 'array values ->', ->
      it 'should calculate array delta', ->
        byte = new Byte strokeDasharray:  { '200 100': '300' }
        arrayDelta = byte.deltas.strokeDasharray
        expect(arrayDelta.start.join(' '))        .toBe   '200 100'
        expect(arrayDelta.end.join(' '))          .toBe   '300 0'
        expect(arrayDelta.delta.join(' '))        .toBe   '100 -100'
        expect(arrayDelta.type)                   .toBe   'array'
    describe 'unit values ->', ->
      it 'should calculate unit delta', ->
        byte = new Byte x:  {'0%': '100%'}
        xDelta = byte.deltas.x
        expect(xDelta.start.string)    .toBe   '0%'
        expect(xDelta.end.string)      .toBe   '100%'
        expect(xDelta.delta)          .toBe   100
        expect(xDelta.type)            .toBe   'unit'
    describe 'tween-related values ->', ->
      it 'should not calc delta for tween related props', ->
        byte = new Byte
          duration:  { 2000: 1000 }
          isRunLess: true
        expect(byte.deltas.duration).not.toBeDefined()
  describe 'setProgress method ->', ->
    it 'should set transition progress', ->
      byte = new Byte radius:  {'25.50': -75.50}
      byte.setProgress .5
      expect(byte.progress).toBe .5
    it 'should set value progress', ->
      byte = new Byte radius:  {'25': 75}
      byte.setProgress .5
      expect(byte.props.radius).toBe 50
    it 'should call calcOrigin method', ->
      byte = new Byte radius:  {'25': 75}
      spyOn byte, 'calcOrigin'
      byte.setProgress .5
      expect(byte.calcOrigin).toHaveBeenCalled()
    it 'should have origin object', ->
      byte = new Byte radius:  {'25': 75}
      byte.setProgress .5
      expect(byte.origin.x).toBeDefined()
      expect(byte.origin.y).toBeDefined()
    it 'should have origin should be the center of the transit', ->
      byte = new Byte radius:  {'25': 75}
      byte.setProgress .5
      expect(byte.origin.x).toBe byte.props.center
      expect(byte.origin.y).toBe byte.props.center
    it 'should have origin should be x/y if foreign context', ->
      byte = new Byte radius:{'25': 75}, ctx: svg
      byte.setProgress .5
      expect(byte.origin.x).toBe parseFloat byte.props.x
      expect(byte.origin.y).toBe parseFloat byte.props.x
    it 'should have origin should be number if foreign context', ->
      byte = new Byte radius:{'25': 75}, ctx: svg
      byte.setProgress .5
      expect(typeof byte.origin.x).toBe 'number'
      expect(typeof byte.origin.y).toBe 'number'
    it 'should show el', ->
      byte = new Byte radius:  {'25': 75}
      spyOn byte, 'show'
      byte.setProgress .5
      expect(byte.show).toHaveBeenCalled()
    it 'should not show el if isShow passed', ->
      byte = new Byte radius:  {'25': 75}
      spyOn byte, 'show'
      byte.setProgress .5, true
      expect(byte.show).not.toHaveBeenCalled()
    it 'should call calcCurrentProps', ->
      byte = new Byte radius:  {'25': 75}
      spyOn byte, 'calcCurrentProps'
      byte.setProgress .5
      expect(byte.calcCurrentProps).toHaveBeenCalledWith .5
    # ----- removed ----- #
    # it 'should not call calcCurrentProps if isPropsCalcLess', ->
    #   byte = new Byte radius:  {'25': 75}
    #   spyOn byte, 'calcCurrentProps'
    #   byte.isPropsCalcLess = true
    #   byte.setProgress .5
    #   expect(byte.calcCurrentProps).not.toHaveBeenCalledWith .5
    it 'should not call onUpdate if isShow was passed', ->
      byte = new Byte radius:  {'25': 75}
      spyOn byte, 'onUpdate'
      byte.setProgress .5, true
      expect(byte.onUpdate).not.toHaveBeenCalled()
    it 'not thow', ->
      byte = new Byte radius:  {'25': 75}, ctx: svg
      expect(-> byte.show()).not.toThrow()
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
  describe 'Callbacks ->', ->
    describe 'onStart callback ->', ->
      it 'should call onStart callback', (dfr)->
        isOnStart = null
        byte = new Byte radius:  {'25': 75}, onStart:-> isOnStart = true
        setTimeout ->
          expect(isOnStart).toBe(true); dfr()
        , 100
      it 'should have scope of byte', (dfr)->
        isRightScope = null
        byte = new Byte
          radius: {'25': 75}
          onStart:-> isRightScope = @ instanceof Byte
        setTimeout ->
          expect(isRightScope).toBe(true); dfr()
        , 100
    describe 'onUpdate callback', ->
      it 'should call onUpdate callback', (dfr)->
        isOnUpdate = null
        byte = new Byte radius:  {'25': 75}, onUpdate:-> isOnUpdate = true
        setTimeout ->
          expect(isOnUpdate).toBe true
          dfr()
        , 100
      it 'should have scope of byte', (dfr)->
        isRightScope = null
        byte = new Byte
          radius: {'25': 75}
          onUpdate:-> isRightScope = @ instanceof Byte
        setTimeout ->
          expect(isRightScope).toBe true
          dfr()
        , 100
      it 'should set current progress', (dfr)->
        progress = null
        byte = new Byte
          radius: {'25': 75}
          onUpdate:(p)-> progress = p
          duration: 64
        setTimeout ->
          expect(progress).toBeGreaterThan 0
          expect(progress).not.toBeGreaterThan 1
          dfr()
        , 100
    describe 'onComplete callback ->', ->
      it 'should call onComplete callback',(dfr)->
        isOnComplete = null
        byte = new Byte
          radius:  {'25': 75}
          onComplete:-> isOnComplete = true
          duration: 20
        setTimeout ->
          expect(isOnComplete).toBe true
          dfr()
        , 100
      it 'should have scope of byte', (dfr)->
        isRightScope = null
        byte = new Byte
          radius: {'25': 75}
          onComplete:-> isRightScope = @ instanceof Byte
          duration: 20
        setTimeout ->
          expect(isRightScope).toBe true
          dfr()
        , 100
    describe 'onCompleteChain callback', ->
      it 'should call onCompleteChain callback when chain ends', (dfr)->
        isOnComplete = null
        byte = new Byte
          radius:   {'25': 75}
          onCompleteChain:-> isOnComplete = true
          duration: 20
        setTimeout ->
          expect(isOnComplete).toBe true
          dfr()
        , 100
      it 'should have scope of byte', (dfr)->
        isRightScope = null
        byte = new Byte
          radius: {'25': 75}
          duration: 20
          onCompleteChain:-> isRightScope = @ instanceof Byte
        setTimeout ->
          expect(isRightScope).toBe true
          dfr()
        , 100
  describe 'Tweens ->', ->
    it 'should create tween object', ->
      byte = new Byte radius:  {'25': 75}
      expect(byte.tween).toBeDefined()
    it 'should not create tween object if isTweenLess', ->
      byte = new Byte radius:  {'25': 75}, isTweenLess: true
      expect(byte.tween).not.toBeDefined()
    it 'should start tween after init', (dfr)->
      isStarted = false
      byte = new Byte
        radius: {'25': 75}
        onStart:-> isStarted = true
      setTimeout ->
        expect(isStarted).toBe(true); dfr()
      , 100
    it 'should not start tween after init is isRunLess was passed', (dfr)->
      isStarted = null
      byte = new Byte
        radius: {'25': 75}
        isRunLess: true
        onStart:-> isStarted = true
      setTimeout ->
        expect(isStarted).toBeFalsy(); dfr()
      , 100
    describe 'startTween method', ->
      it 'should start tween', ()->
        byte = new Byte radius:  {'25': 75}
        spyOn byte.tween, 'start'
        byte.startTween()
        expect(byte.tween.start).toHaveBeenCalled()
  describe 'easing ->', ->
    it 'should set easing option to props', ->
      byte = new Byte easing: 'Linear.None'
      expect(byte.props.easing).toBe 'Linear.None'
  describe 'chain ->', ->
    it 'should have chain array', ->
      byte = new Byte(strokeWidth: {10: 5}, duration: 20)
      expect(byte.chainArr).toBeDefined()
    it 'should push to chainArr', ->
      byte = new Byte(strokeWidth: {10: 5}, duration: 20)
        .chain(strokeWidth: {5: 0}, duration: 20)
      expect(byte.chainArr.length).toBe 1
    it 'should inherit type', ->
      byte = new Byte(type: 'circle', strokeWidth: {10: 5}, duration: 20)
        .chain(strokeWidth: {5: 0}, duration: 20)
      expect(byte.chainArr[0].options.type).toBe 'circle'
    it 'should wrap options to object with chain type', ->
      byte = new Byte(strokeWidth: {10: 5}, duration: 20)
        .chain(strokeWidth: {5: 0}, duration: 20)
      expect(byte.chainArr[0].type)                    .toBe 'chain'
      expect(byte.chainArr[0].options.strokeWidth[5])  .toBe 0
    it 'should run next chain', (dfr)->
      byte = new Byte(strokeWidth: {10: 5}, duration: 20)
        .chain(strokeWidth: {5: 0}, duration: 20)
      setTimeout ->
        expect(byte.props.strokeWidth).toBe 0
        dfr()
      , 120
    it 'should run next chain from setProgress', ->
      byte = new Byte
        strokeWidth: {20:30}
        duration: 20
      byte.chainArr = [{strokeWidth: {30:20}}]
      spyOn byte, 'runChain'
      byte.setProgress 1
      expect(byte.runChain).toHaveBeenCalled()
    describe 'runChain method ->', ->
      it 'should run chain', ->
        byte = new Byte
          strokeWidth: {20:30}
          isRunLess:   true
          duration: 20
        byte.chainArr = [{options: {strokeWidth: {30:20}}, type: 'chain'}]
        spyOn byte, 'init'
        byte.runChain()
        expect(byte.chainArr.length).toBe     0
        expect(byte.o.strokeWidth[30]).toBe   20
        expect(byte.init).toHaveBeenCalled()
      it 'should not run empty chain', ->
        byte = new Byte
          strokeWidth: {20:30}
          isRunLess:   true
          duration: 20
        byte.chainArr = []; spyOn byte, 'init'
        byte.runChain()
        expect(byte.o.strokeWidth[20]).toBe   30
        expect(byte.init).not.toHaveBeenCalled()
      it 'should hide element at the end', ->
        byte = new Byte
          strokeWidth: {20:30}
          isRunLess:   true
          duration: 20
        byte.chainArr = []; spyOn byte, 'hide'
        byte.runChain()
        expect(byte.hide).toHaveBeenCalled()
      it 'should not hide element at the end if isShowEnd was passed', ->
        byte = new Byte
          strokeWidth: {20:30}
          isShowEnd: true
          duration:    20
        byte.chainArr = []; spyOn byte, 'hide'
        byte.runChain()
        expect(byte.hide).not.toHaveBeenCalled()

  describe 'then ->', ->
    it 'should push to chainArr with type of then', ->
      byte = new Byte(strokeWidth: {10: 5}, duration: 20)
        .then(strokeWidth: {5: 0}, duration: 20)
      expect(byte.chainArr[0].type)                    .toBe 'then'
      expect(byte.chainArr[0].options.strokeWidth[5])  .toBe 0
    it 'should continue the current prop', (dfr)->
      byte = new Byte(strokeWidth: {10: 5}, duration: 20)
        .then(strokeWidth: 0, duration: 20)
      setTimeout ->
        expect(byte.props.strokeWidth).toBe 0
        dfr()
      , 100
    it 'should warn if new value is object and use end value', (dfr)->
      byte = new Byte(strokeWidth: {10: 5}, duration: 20)
      spyOn console, 'warn'
      byte.then strokeWidth: { 7: 20 }, duration: 20
      setTimeout ->
        expect(console.warn).toHaveBeenCalled()
        delta = byte.deltas.strokeWidth
        # OLD DELTA
        expect(delta.start).toBe            5
        expect(delta.end).toBe              20
        expect(byte.props.strokeWidth).toBe 20
        dfr()
      , 120
  describe 'createTween method ->', ->
    # it 'should stop the old tween', ()->
    #   byte = new Byte radius:  {'25': 75}, isIt: true
    #   spyOn byte.tween, 'stop'
    #   byte.createTween()
    #   expect(byte.tween.stop).toHaveBeenCalled()

  describe 'run method->', ->
    it 'should create tween', ->
      byte = new Byte(strokeWidth: {10: 5}, isRunLess: true)
      spyOn byte, 'createTween'
      byte.run()
      expect(byte.createTween).toHaveBeenCalled()
    # it 'should run tween', ->
    #   byte = new Byte(strokeWidth: {10: 5}, isRunLess: true)
    #   spyOn byte, 'startTween'
    #   byte.run()
    #   expect(byte.startTween).toHaveBeenCalled()
    it 'should call render method', ->
      byte = new Byte(strokeWidth: {10: 5}, isRunLess: true)
      spyOn byte, 'render'
      byte.run()
      expect(byte.render).toHaveBeenCalledWith true
    it 'should accept new options', ->
      byte = new Byte(strokeWidth: {10: 5}, isRunLess: true)
      byte.run strokeWidth: 25
      expect(byte.props.strokeWidth).toBe 25
      expect(byte.deltas.strokeWidth).not.toBeDefined()
    it 'should not modify old options', ->
      byte = new Byte(strokeWidth: {10: 5}, radius: 33, isRunLess: true)
      byte.run strokeWidth: 25
      expect(byte.props.radius).toBe 33
    it 'should calculate new el size', ->
      byte = new Byte(radius: {10: 5}, isRunLess: true)
      byte.run radius: 50
      expect(byte.el.style.width).toBe '104px'
    it 'should call setProgress(0, true)', ->
      byte = new Byte(radius: {10: 5}, isRunLess: true)
      spyOn byte, 'setProgress'
      byte.run radius: 50
      expect(byte.setProgress).toHaveBeenCalledWith 0, true












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
  it 'should have ownvars function', ->
    byte = new Byte
    expect(byte.vars).toBeDefined()
    expect(-> byte.vars()).not.toThrow()
  describe 'extension ->', ->
    it 'should extend Bit class', ->
      byte = new Byte
      expect(byte instanceof Bit).toBe(true)
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
    it 'should ignore properties defined in skipProps object', ->
      byte = new Byte radius: 45
      byte.skipProps = radius: 1
      byte.o.radius = 50
      byte.extendDefaults()
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
    it 'should recieve object to iterate from', ->
      byte = new Byte
        radius: 'rand(0, 10)'
        isRunLess: true
        fill: 'deeppink'
      # byte.props = {}
      fillBefore = byte.props.fill
      byte.extendDefaults {radius: 10}
      expect(byte.props.radius).toBe 10
      expect(byte.props.fill).toBe fillBefore

  describe 'options history ->', ->
    it 'should have history array', ->
      byte = new Byte
      expect(byte.h.isArray(byte.history)).toBe true
    it 'should save options to history array', ->
      byte = new Byte radius: 20
      expect(byte.history.length).toBe 1
    it 'should rewrite the first history item on run', ->
      byte = new Byte radius: 20
      byte.run radius: 10
      expect(byte.history[0].radius).toBe 10
    it 'should extend options by defaults on the first add', ->
      byte = new Byte opacity: .5
      expect(byte.history[0].radius[0]).toBe 50
    it 'should extend options by defaults on run first add', ->
      byte = new Byte opacity: .5
      byte.run()
      expect(byte.history[0].radius[0]).toBe 50

  describe 'transformHistory method->', ->
    it 'should add new options to the history', ->
      byte = new Byte isRunLess: true
      byte.then radius: 0
      byte.transformHistory x: 20
      expect(byte.history[1].x).toBe 20

    it 'should rewrite options in the history', ->
      byte = new Byte isRunLess: true, x: 200
      byte.then radius: 0
      byte.transformHistory x: 100
      expect(byte.history[1].x).toBe 100

    it 'should stop rewriting if further option is defined', ->
      byte = new Byte isRunLess: true, x: 200
        .then radius: 0
        .then radius: 0, x: 20

      byte.transformHistory x: 100
      expect(byte.history[1].x)     .toBe 100
      expect(byte.history[2].x[100]).toBe 20
      expect(byte.history[2].x[200]).not.toBeDefined()

    it 'should stop rewriting if further option is defined', ->
      byte = new Byte isRunLess: true, x: 200
        .then radius: 0
        .then radius: 0, x: 20
        .then radius: 0, x: 10

      byte.transformHistory x: 100
      expect(byte.history[3].x[20]).toBe 10
    it 'should rewrite until defined if object was passed', ->
      byte = new Byte isRunLess: true, x: 200
        .then radius: 0
        .then radius: 0, x: 20

      byte.transformHistory x: {100: 50}
      expect(byte.history[1].x[100]).toBe 50
      expect(byte.history[2].x[50]).toBe 20

  describe 'then method ->', ->
    it 'should add new timeline with options', ->
      byte = new Byte radius: 20, duration: 1000
      byte.then radius: 5
      expect(byte.tween.timelines.length).toBe 2

    it 'should add new timeline with options', ->
      byte = new Byte radius: 20, duration: 1000, delay: 10
      byte.then radius: 5, yoyo: true, delay: 100
      expect(byte.tween.timelines[1].o.duration).toBe 1000
      expect(byte.tween.timelines[1].o.yoyo).toBe true
      expect(byte.tween.timelines[1].o.delay).toBe 1110

    it 'should merge then options and add them to the history', ->
      byte = new Byte radius: 20, duration: 1000, delay: 10
      byte.then radius: 5, yoyo: true, delay: 100
      expect(byte.history.length)       .toBe 2
      expect(byte.history[1].radius[20]).toBe 5
      expect(byte.history[1].duration).toBe 1000
      expect(byte.history[1].delay)   .toBe 100
      expect(byte.history[1].yoyo)    .toBe true

    it 'should always merge then options with the last history item', ->
      byte = new Byte radius: 20, duration: 1000, delay: 10
      byte.then radius: 5, yoyo: true, delay: 100
      byte.then radius: {100:10}, delay: 0, stroke: 'green'
      expect(byte.history.length)       .toBe 3
      expect(byte.history[2].radius[100]).toBe 10
      expect(byte.history[2].duration).toBe 1000
      expect(byte.history[2].delay)   .toBe 0
      expect(byte.history[2].yoyo)    .toBe true
      expect(byte.history[2].stroke['transparent']).toBe 'green'

    it 'should bind onUpdate function', ->
      byte = new Byte radius: 20, duration: 1000, delay: 10
      byte.then radius: 5, yoyo: true, delay: 100
      byte.then radius: {100:10}, delay: 200, stroke: 'green'
      expect(typeof byte.tween.timelines[1].o.onUpdate).toBe 'function'
      expect(typeof byte.tween.timelines[2].o.onUpdate).toBe 'function'

    it 'should bind onStart function', ->
      byte = new Byte radius: 20, duration: 1000, delay: 10
      byte.then radius: 5, yoyo: true, delay: 100
      byte.then radius: {100:10}, delay: 200, stroke: 'green'
      expect(typeof byte.tween.timelines[1].o.onStart).toBe 'function'
      expect(typeof byte.tween.timelines[2].o.onStart).toBe 'function'

    it 'should bind onFirstUpdate function', ->
      byte = new Byte radius: 20, duration: 1000, delay: 10
      byte.then radius: 5, yoyo: true, delay: 100
      byte.then radius: {100:10}, delay: 200, stroke: 'green'
      expect(typeof byte.tween.timelines[1].o.onFirstUpdate).toBe 'function'
      expect(typeof byte.tween.timelines[2].o.onFirstUpdate).toBe 'function'

  describe 'tuneOptions method ->', ->
    it 'should call extendDefaults with options', ->
      byte = new Byte
      o = radius: 50
      spyOn byte, 'tuneOptions'
      byte.tuneOptions o
      expect(byte.tuneOptions).toHaveBeenCalled()
    it 'should call calcSize and setElStyles methods', ->
      byte = new Byte
      spyOn byte, 'calcSize'
      spyOn byte, 'setElStyles'
      byte.tuneOptions radius: 50
      expect(byte.calcSize).toHaveBeenCalled()
      expect(byte.setElStyles).toHaveBeenCalled()


  describe 'size calculations ->', ->
    it 'should calculate size el size depending on largest value', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 6:  4    }
      expect(byte.props.size).toBe(212)

    it 'should calculate size el size based on radiusX/Y', ->
      byte = new Byte
        radius:       { 25: -100 }
        radiusX:      200
        strokeWidth:  { 6:  4    }
      expect(byte.props.size).toBe(412)

    it 'should calculate size el size based on radiusX/Y', ->
      byte = new Byte
        radius:       { 25: -100 }
        radiusX:      200
        radiusY:      300
        strokeWidth:  { 6:  4    }
      expect(byte.props.size).toBe(612)

    it 'should calculate size el size based on radiusX/Y', ->
      byte = new Byte
        radius:       { 25: -100 }
        radiusY:      30
        strokeWidth:  { 6:  4    }
      expect(byte.props.size).toBe(212)

    it 'should calculate size el size based on radiusX/Y', ->
      byte = new Byte
        radius:       50
        radiusY:      30
        strokeWidth:  { 6:  4 }
      expect(byte.props.size).toBe(112)

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

    it 'should increase size if elastic.out/inout easing', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 4:  6    }
        easing: 'Elastic.Out'
      expect(byte.props.size)   .toBe(212*1.25)
      expect(byte.props.center) .toBe(byte.props.size/2)

      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 4:  6    }
        easing: 'Elastic.InOut'
      expect(byte.props.size)   .toBe(212*1.25)
      expect(byte.props.center) .toBe(byte.props.size/2)


    it 'should increase size if back.out/inout easing', ->
      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 4:  6    }
        easing: 'back.Out'
      expect(byte.props.size)   .toBe(212*1.1)
      expect(byte.props.center) .toBe(byte.props.size/2)

      byte = new Byte
        radius:       { 25: -100 }
        strokeWidth:  { 4:  6    }
        easing: 'Back.InOut'
      expect(byte.props.size)   .toBe(212*1.1)
      expect(byte.props.center) .toBe(byte.props.size/2)


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
      expect(byte.el)           .toBe byte.bit.el
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
    
    it 'should skip props if foreign context', ->
      byte = new Byte
        radius:       25
        strokeWidth:  2
        x:            10
        y:            20
        isRunLess:    true
        ctx: svg
      expect(byte.el.style.display)               .toBe 'none'
      expect(byte.el.style.opacity)               .toBe '1'

      expect(byte.el.style.position)              .not.toBe 'absolute'
      expect(byte.el.style.width)                 .not.toBe '54px'
      expect(byte.el.style.height)                .not.toBe '54px'
      expect(byte.el.style['margin-left'])        .not.toBe '-27px'
      expect(byte.el.style['margin-top'])         .not.toBe '-27px'
      expect(byte.el.style['backface-visibility']).not.toBe 'hidden'
      prefixedProp = "#{h.prefix.css}backface-visibility"
      expect(byte.el.style[prefixedProp]).not.toBe 'hidden'
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
    it 'should merge 2 objects', ->
      byte = new Byte
      start = radius: 10, duration: 1000, stroke: '#ff00ff'
      end   = radius: 20, duration: 500
      mergedOpton = byte.mergeThenOptions start, end
      expect(mergedOpton.radius[10]).toBe 20
      expect(mergedOpton.duration).toBe 500
      expect(mergedOpton.stroke).toBe '#ff00ff'
    it 'should merge 2 objects if the first was an object', ->
      byte = new Byte isRunLess: true
      start = radius: {10: 0}
      end   = radius: 20
      mergedOpton = byte.mergeThenOptions start, end
      expect(mergedOpton.radius[0]).toBe 20
    it 'should use the second value if it is an object', ->
      byte = new Byte
      start = radius: 10
      end   = radius: {20: 0}
      mergedOpton = byte.mergeThenOptions start, end
      expect(mergedOpton.radius[20]).toBe 0
    it 'should save the old tween values', ->
      byte = new Byte
      start = duration: 10
      end   = radius: {20: 0}
      mergedOpton = byte.mergeThenOptions start, end
      expect(mergedOpton.duration).toBe 10
    it 'should fallback to default value is start is undefined', ->
      byte = new Byte
      start = radius: 10, duration: 1000
      end   = radius: 20, duration: 500, stroke: '#ff00ff'
      mergedOpton = byte.mergeThenOptions start, end
      expect(mergedOpton.stroke['transparent']).toBe '#ff00ff'

  describe 'render method ->', ->
    it 'should call draw method', ->
      byte = new Byte radius: 25
      spyOn byte, 'draw'
      byte.render()
      expect(byte.draw).toHaveBeenCalled()
    it 'should call setElStyles method', ->
      byte = new Byte radius: 25
      spyOn byte, 'setElStyles'
      byte.render()
      expect(byte.setElStyles).toHaveBeenCalled()
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
    it 'should calculate transform object', ->
      byte = new Byte
        angle:        90
        radius:       25
        strokeWidth:  4
      expect(byte.props.transform).toBe('rotate(90,29,29)')
      expect(byte.calcTransform).toBeDefined()
  describe 'drawEl method ->', ->
    it 'should set el positions and transforms', ->
      byte = new Byte radius: 25, y: 10
      byte.draw()
      expect(byte.el.style.left)      .toBe     '0px'
      expect(byte.el.style.top)       .toBe     '10px'
      expect(byte.el.style.opacity)   .toBe     '1'
      expect(byte.el.style.transform) .toBe     'translate(0px, 0px)'
    it 'should set only opacity if foreign context', ->
      byte = new Byte radius: 25, y: 10, ctx: svg
      byte.draw()
      expect(byte.el.style.opacity)   .toBe         '1'
      expect(byte.el.style.left)      .not.toBe     '0px'
      expect(byte.el.style.top)       .not.toBe     '10px'
      expect(byte.el.style.transform) .not.toBe     'translate(0px, 0px)'
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

    it 'should call calcCurrentProps', ->
      byte = new Byte radius:  {'25': 75}
      spyOn byte, 'calcCurrentProps'
      byte.setProgress .5
      expect(byte.calcCurrentProps).toHaveBeenCalledWith .5
    
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

      it 'should show el', ->
        byte = new Byte radius:  {'25': 75}
        spyOn byte, 'show'
        byte.tween.setProgress .5
        expect(byte.show).toHaveBeenCalled()

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
    
  describe 'onFirstUpdateBackward callback ->', ->
    it 'should call tuneOptions method when the tween goes backward', ->
      byte = new Byte radius:  {'25': 75}
        .then { radius: 20 }
      spyOn byte, 'tuneOptions'
      byte.tween.setProgress .99
      byte.tween.setProgress 0
      expect(byte.tuneOptions).toHaveBeenCalled()

    it 'should call not tuneOptions if history length is one record', ->
      byte = new Byte radius:  {'25': 75}
      spyOn byte, 'tuneOptions'
      byte.tween.setProgress .99
      byte.tween.setProgress 0
      expect(byte.tuneOptions).not.toHaveBeenCalled()

  describe 'createTween method ->', ->
    it 'should create tween object', ->
      byte = new Byte radius:  {'25': 75}
      expect(byte.tween).toBeDefined()
    it 'should bind the onFirstUpdateBackward metod', ->
      byte = new Byte radius:  {'25': 75}
      expect(typeof byte.timeline.o.onFirstUpdateBackward)
        .toBe 'function'
    # it 'should not create tween object if isTweenLess', ->
    #   byte = new Byte radius:  {'25': 75}, isTweenLess: true
    #   expect(byte.tween).not.toBeDefined()
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
    describe 'startTween method ->', ->
      it 'should start tween', (dfr)->
        byte = new Byte radius:  {'25': 75}
        spyOn byte.tween, 'start'
        byte.startTween()
        setTimeout ->
          expect(byte.tween.start).toHaveBeenCalled(); dfr()
        , 10

  describe 'easing ->', ->
    it 'should set easing option to props', ->
      byte = new Byte easing: 'Linear.None'
      expect(byte.props.easing).toBe 'Linear.None'

  describe 'run method->', ->
    it 'should extend defaults with passed object', ->
      byte = new Byte(strokeWidth: {10: 5}, isRunLess: true)
      spyOn byte, 'extendDefaults'
      o = { strokeWidth: 20 }
      byte.run(o)
      expect(byte.extendDefaults).toHaveBeenCalledWith o
    it 'should not extend defaults if object was not passed', ->
      byte = new Byte(strokeWidth: {10: 5}, isRunLess: true)
      spyOn byte, 'extendDefaults'
      byte.run()
      expect(byte.extendDefaults).not.toHaveBeenCalled()
    it 'should not override deltas', ->
      byte = new Byte(strokeWidth: {10: 5}, isRunLess: true)
      byte.run stroke: 'green'
      expect(byte.deltas.strokeWidth).toBeDefined()

    it 'should calculate el size', ->
      byte = new Byte(radius: {10: 5}, isRunLess: true)
      spyOn byte, 'calcSize'
      byte.run radius: 50
      expect(byte.calcSize).toHaveBeenCalled()
    it 'should set new el size', ->
      byte = new Byte(radius: {10: 5}, isRunLess: true)
      spyOn byte, 'setElStyles'
      byte.run radius: 50
      expect(byte.setElStyles).toHaveBeenCalled()
    it 'should set new el size #2', ->
      byte = new Byte(radius: {10: 5}, isRunLess: true)
      byte.run radius: 50
      expect(byte.el.style.width).toBe '104px'

    it 'should set new el size with respect to radiusX/radiusY', ->
      byte = new Byte(radius: {10: 5}, isRunLess: true)
      byte.run radius: 50, radiusX: {100: 0}
      expect(byte.el.style.width).toBe '204px'

    it 'should set new el size with respect to radiusX/radiusY', ->
      byte = new Byte(radius: {10: 5}, isRunLess: true)
      byte.run radius: 50, radiusY: 110
      expect(byte.el.style.width).toBe '224px'

    it 'should set new el size with respect to radiusX/radiusY', ->
      byte = new Byte(radius: {10: 5}, isRunLess: true)
      byte.run radius: 450, radiusY: 110, radiusX: {200:0}
      expect(byte.el.style.width).toBe '404px'

    it 'should start tween', ->
      byte = new Byte(strokeWidth: {10: 5}, isRunLess: true)
      spyOn byte, 'startTween'
      byte.run()
      expect(byte.startTween).toHaveBeenCalled()
    it 'should accept new options', ->
      byte = new Byte(strokeWidth: {10: 5}, isRunLess: true)
      byte.run strokeWidth: 25
      expect(byte.props.strokeWidth).toBe 25
      expect(byte.deltas.strokeWidth).not.toBeDefined()
    it 'should not modify old options', ->
      byte = new Byte(strokeWidth: {10: 5}, radius: 33, isRunLess: true)
      byte.run strokeWidth: 25
      expect(byte.props.radius).toBe 33
    it 'should call setProgress(0, true)', ->
      byte = new Byte(radius: {10: 5}, isRunLess: true)
      spyOn byte, 'setProgress'
      byte.run radius: 50
      expect(byte.setProgress).toHaveBeenCalledWith 0, true
    it 'should warn if type was passed', ->
      byte = new Byte(type: 'polygon', isRunLess: true)
      spyOn byte.h, 'warn'
      byte.run type: 'circle'
      expect(byte.h.warn).toHaveBeenCalled()
      expect(byte.o.type).toBe 'polygon'
    it 'should set new options on timeline', ->
      byte = new Byte
        isRunLess: true
        duration: 500, delay: 200, repeat: 1, easing: 'cubic.in'
        yoyo: true
        onStart:    ->
        onComplete: ->
      onStart = (->); onComplete = (->)
      byte.run
        duration: 2000, delay: 0, repeat: 2, easing: 'linear.none'
        onStart: onStart, onComplete: onComplete, yoyo: false
      expect(byte.timeline.o.duration).toBe     2000
      expect(byte.timeline.o.delay).toBe        0
      expect(byte.timeline.o.repeat).toBe       2
      expect(byte.timeline.o.easing).toBe       'linear.none'
      expect(byte.timeline.o.onStart).toBe      onStart
      expect(byte.timeline.o.onComplete).toBe   onComplete
      expect(byte.timeline.o.yoyo).toBe         false
    it 'should call recalcDuration on tween', ->
      byte = new Byte
      spyOn byte.tween, 'recalcDuration'
      byte.run duration: 2000
      expect(byte.tween.recalcDuration).toHaveBeenCalled()

    it 'should call transformHistory', ->
      byte = new Byte
      spyOn byte, 'transformHistory'
      o = duration: 2000
      byte.run o
      expect(byte.transformHistory).toHaveBeenCalledWith o

    it 'should not call transformHistory if optionless', ->
      byte = new Byte
      spyOn byte, 'transformHistory'
      byte.run()
      expect(byte.transformHistory).not.toHaveBeenCalled()

    it 'shoud warn if tweenValues changed on run', ->
      byte = new Byte(
        isRunLess:  true, duration:  2000
      ).then radius: 40
      spyOn h, 'warn'
      byte.run
        duration: 100
        delay:    100
        repeat:   1
        yoyo:     false
        easing:   'Linear.None'
        onStart:    ->
        onUpdate:   ->
        onComplete: ->
      expect(h.warn).toHaveBeenCalled()
      expect(byte.history[0].duration).toBe 2000
      expect(byte.props.duration)     .toBe 2000

    it 'shoud not warn if history is 1 record long', ->
      byte = new Byte(isRunLess:  true, duration:  2000)
      spyOn h, 'warn'
      byte.run
        duration: 100
        delay:    100
        repeat:   1
        yoyo:     false
        easing:   'Linear.None'
        onStart:    ->
        onUpdate:   ->
        onComplete: ->
      expect(h.warn).not.toHaveBeenCalled()
      expect(byte.history[0].duration).toBe 100
      expect(byte.props.duration)     .toBe 100

  describe 'isForeign flag ->', ->
    it 'should not be set by default', ->
      byte = new Byte
      expect(byte.isForeign).toBe false
    it 'should be set if context was passed', ->
      byte = new Byte ctx: svg
      expect(byte.isForeign).toBe true
    it 'if context passed el should be bit\'s el', ->
      byte = new Byte ctx: svg
      expect(byte.el).toBe byte.bit.el

  describe 'show/hide on start/end ->', ->
    it 'should show the el on start', ->
      byte = new Byte ctx: svg
      byte.tween.setProgress .5
      expect(byte.el.style.display).toBe 'block'

    it 'should hide the el on end', ->
      byte = new Byte ctx: svg
      byte.tween.setProgress 1
      expect(byte.el.style.display).toBe 'none'

    it 'should not hide the el on end if isShowEnd was passed', ->
      byte = new Byte ctx: svg, isShowEnd: true
      byte.tween.setProgress 1
      expect(byte.el.style.display).toBe 'block'

    it 'should not hide the el on end if isShowEnd was passed #2 - chain', ->
      byte = new Byte ctx: svg, isShowEnd: true, isRunLess: true
        .then radius: 10
        .then radius: 20
      byte.tween.setProgress 1
      expect(byte.el.style.display).toBe 'block'

    it 'should hide the el on reverse end', ->
      byte = new Byte ctx: svg
      byte.tween.setProgress .5
      byte.tween.setProgress 0
      expect(byte.el.style.display).toBe 'none'

    it 'should not hide the el on reverse end if isShowInit passed', ->
      byte = new Byte ctx: svg, isShowInit: true
      byte.tween.setProgress .5
      byte.tween.setProgress 0
      expect(byte.el.style.display).toBe 'block'

  describe 'getRadiusSize method ->', ->
    it 'should return max from delatas if key is defined', ->
      byte = new Byte radiusX: 20: 30
      size = byte.getRadiusSize key: 'radiusX', fallback: 0
      expect(size).toBe 30

    it 'should return props\' value if delats\' one is not defined ', ->
      byte = new Byte radiusX: 20
      size = byte.getRadiusSize key: 'radiusX', fallback: 0
      expect(size).toBe 20

    it 'should fallback to passed fallback option', ->
      byte = new Byte
      size = byte.getRadiusSize key: 'radiusX', fallback: 0
      expect(size).toBe 0

    it 'should fallback to 0 by default', ->
      byte = new Byte
      size = byte.getRadiusSize key: 'radiusX'
      expect(size).toBe 0

      





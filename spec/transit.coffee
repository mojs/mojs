Byte    = mojs.Transit
Transit = mojs.Transit
Bit     = mojs.shapesMap.getShape('bit')
Tweenable = mojs.Tweenable
Rect = mojs.shapesMap.getShape('rect')
h    = mojs.helpers
ns   = 'http://www.w3.org/2000/svg'
svg  = document.createElementNS?(ns, 'svg')

# console.log   = ->
console.warn  = ->
console.error = ->

describe 'Transit ->', ->
#   it 'should have own _vars function ->', ->
#     byte = new Byte
#     expect(byte._vars).toBeDefined()
#     expect(-> byte._vars()).not.toThrow()
#   describe 'extension ->', ->
#     it 'should extend Tweenable class', ->
#       byte = new Byte
#       expect(byte instanceof Tweenable).toBe(true)
#   describe 'defaults object ->', ->
#     it 'should have defaults object', ->
#       byte = new Byte
#       expect(byte.defaults).toBeDefined()
#   describe 'origin object ->', ->
#     it 'should have origin object', ->
#       byte = new Byte
#       expect(byte.origin).toBeDefined()
#       expect(typeof byte.origin).toBe 'object'
#   describe 'options object ->', ->
#     it 'should receive empty options object by default', ->
#       byte = new Byte
#       expect(byte._o).toBeDefined()
#     it 'should receive options object', ->
#       byte = new Byte option: 1
#       expect(byte._o.option).toBe 1
#   describe 'index option ->', ->
#     it 'should receive index option', ->
#       byte = new Byte index: 5
#       expect(byte.index).toBe 5
#     it 'should fallback to 0', ->
#       byte = new Byte
#       expect(byte.index).toBe 0
#   describe '_isDelta method ->', ->
#     it 'should detect if value is not a delta value', ->
#       byte = new Byte radius: 45, stroke: 'deeppink': 'pink'
#       expect(byte._isDelta(45))    .toBe false
#       expect(byte._isDelta('45'))  .toBe false
#       expect(byte._isDelta(['45'])).toBe false
#       expect(byte._isDelta({ unit: 'px', value: 20 })).toBe false
#       expect(byte._isDelta({ 20: 30 })).toBe true
#   describe '_extendDefaults method ->', ->
#     it 'should extend defaults object to properties', ->
#       byte = new Byte radius: 45, radiusX: 50
#       expect(byte._props.radius) .toBe(45)
#       expect(byte._props.radiusX).toBe(50)
#       expect(byte._props.radiusY).toBe(45)
#     it 'should extend defaults object to properties if 0', ->
#       byte = new Byte radius: 0
#       expect(byte._props.radius).toBe(0)
#     it 'should extend defaults object to properties if object was passed', ->
#       byte = new Byte radius: {45: 55}
#       expect(byte._props.radius).toBe(45)
#     it 'should ignore properties defined in skipProps object', ->
#       byte = new Byte radius: 45
#       byte.skipProps = radius: 1
#       byte._o.radius = 50
#       byte._extendDefaults()
#       expect(byte._props.radius).toBe(45)
#     # for burst
#     it 'should extend defaults object to properties if array was passed', ->
#       byte = new Byte radius: [50, 100]
#       expect(byte._props.radius.join ', ').toBe '50, 100'
#     it 'should extend defaults object to properties if rand was passed', ->
#       byte = new Byte radius: 'rand(0, 10)'
#       expect(byte._props.radius).toBeDefined()
#       expect(byte._props.radius).toBeGreaterThan -1
#       expect(byte._props.radius).not.toBeGreaterThan 10
#     it 'should receive object to iterate from', ->
#       byte = new Byte
#         radius: 'rand(0, 10)'
#         fill: 'deeppink'
#       fillBefore = byte._props.fill
#       byte._extendDefaults {radius: 10}
#       expect(byte._props.radius).toBe 10
#       expect(byte._props.fill).toBe fillBefore
#     it 'should allways inherit radiusX/Y from radius', ->
#       byte = new Byte radius: 10
#       byte._extendDefaults {radius: 100}
#       expect(byte._props.radius) .toBe 100
#       expect(byte._props.radiusX).toBe 100
#       expect(byte._props.radiusY).toBe 100
#     it 'should work with new values', ->
#       onStart = ->
#       byte = new Byte radius: 10
#       .then onStart: onStart
#       expect(byte.history[1].onStart).toBe onStart
#   describe 'stagger values', ->
#     it 'should extend defaults object to properties if stagger was passed', ->
#       byte = new Byte radius: 'stagger(200)'
#       byte.index = 2
#       byte._extendDefaults()
#       expect(byte._props.radius).toBe 400
#   # probably redundant
#   # describe 'skipDelta flag', ->
#   #   it 'should skip delta calcultaions on module', ->
#   #     byte = new Byte ctx: svg, radius: {20:30}
#   #     byte.isSkipDelta = true
#   #     spyOn byte, '_getDelta'
#   #     byte._extendDefaults byte.o
#   #     expect(byte._getDelta).not.toHaveBeenCalled()
#   describe 'options history ->', ->
#     it 'should have history array', ->
#       byte = new Byte
#       expect(byte.h.isArray(byte.history)).toBe true
#     it 'should save options to history array', ->
#       byte = new Byte radius: 20
#       expect(byte.history.length).toBe 1
#     # it 'should rewrite the first history item on run', ->
#     #   byte = new Byte radius: 20
#     #   byte.run radius: 10
#     #   expect(byte.history[0].radius).toBe 10
#     it 'should extend options by defaults on the first add', ->
#       byte = new Byte opacity: .5
#       expect(byte.history[0].radius[0]).toBe 50
#     # it 'should extend options by defaults on run first add', ->
#     #   byte = new Byte opacity: .5
#     #   byte.run()
#     #   expect(byte.history[0].radius[0]).toBe 50
#   # describe '_transformHistory method ->', ->
#   #   it 'should add new options to the history', ->
#   #     byte = new Byte
#   #     byte.then radius: 0
#   #     byte._transformHistory x: 20
#   #     expect(byte.history[1].x).toBe 20
#   #   it 'should rewrite options in the history', ->
#   #     byte = new Byte x: 200
#   #     byte.then radius: 0
#   #     byte._transformHistory x: 100
#   #     expect(byte.history[1].x).toBe 100
#   #   it 'should stop rewriting if further option is defined #1', ->
#   #     byte = new Byte x: 200
#   #       .then radius: 0
#   #       .then radius: 0, x: 20
#   #     byte._transformHistory x: 100
#   #     expect(byte.history[0].x)     .toBe 100
#   #     expect(byte.history[1].x)     .toBe 100
#   #     expect(byte.history[2].x[100]).toBe 20
#   #     expect(byte.history[2].x[200]).not.toBeDefined()
#   #   it 'should stop rewriting if further option is defined #2', ->
#   #     byte = new Byte( x: 200 )
#   #       .then radius: 0
#   #       .then radius: 0, x: 20
#   #       .then radius: 0, x: 10
#   #     byte._transformHistory x: 100
#   #     expect(byte.history[3].x[20]).toBe 10
#   #   it 'should stop rewriting if further option is defined #3', ->
#   #     byte = new Byte( x: 200 )
#   #       .then radius: 0, x: 10
#   #       .then radius: 0, x: 20
#   #       .then radius: 0, x: 10
#   #     byte._transformHistory x: 100
#   #     expect(byte.history[0].x)     .toBe 100
#   #     expect(byte.history[1].x[100]).toBe 10
#   #     expect(byte.history[2].x[10]) .toBe 20
#   #     expect(byte.history[2].x[200]).not.toBeDefined()
#   #   it 'should stop rewriting if further option is defined #4', ->
#   #     byte = new Byte( x: { 30 : 40 })
#   #       .then radius: 0, x: 10
#   #       .then radius: 0, x: 20
#   #       .then radius: 0, x: 60
#   #     byte._transformHistory x: 100
#   #     expect(byte.history[0].x)     .toBe 100
#   #     expect(byte.history[1].x[100]).toBe 10
#   #     expect(byte.history[2].x[10]) .toBe 20
#   #     expect(byte.history[3].x[20]) .toBe 60
#   #     expect(byte.history[4]).not.toBeDefined()
#   #   it 'should rewrite until defined if object was passed', ->
#   #     byte = new Byte x: 200          # x: 200
#   #       .then radius: 0               # x: 200
#   #       .then radius: 0, x: 20        # x: { 200: 20 }
#   #     byte._transformHistory x: {100: 50}
#   #     expect(byte.history[1].x[100]).toBe 50 # x: { 100: 50 }
#   #     expect(byte.history[2].x[50]).toBe 20  # x: { 50: 20 }
#   describe 'then method ->', ->
#     it 'should add new timeline with options', ->
#       byte = new Byte radius: 20, duration: 1000
#       byte.then radius: 5
#       expect(byte.timeline._timelines.length).toBe 2
#     it 'should return if no options passed or options are empty', ->
#       byte = new Byte radius: 20, duration: 1000, delay: 10
#       spyOn byte, '_mergeThenOptions'
#       byte.then()
#       expect(byte._mergeThenOptions).not.toHaveBeenCalled()
#     it 'should inherit radius for radiusX/Y options', ->
#       byte = new Byte radius: 20, duration: 1000
#       byte.then radiusX: 5
#       expect(byte.history[1].radiusX[20]).toBe 5
#     # probably redundant
#     # it 'should pass isChained to timeline', ->
#     #   byte = new Byte radius: 20, duration: 1000
#     #   byte.then radiusX: 5
#     #   expect(byte.timeline._timelines[1]._props.isChained).toBe true
#     it 'should not pass isChained to timeline if delay', ->
#       byte = new Byte radius: 20, duration: 1000
#       byte.then radiusX: 5, delay: 100
#       expect(byte.timeline._timelines[1]._props.isChained).toBe false
#     it 'should inherit radius for radiusX/Y options in further chain', ->
#       byte = new Byte radius: 20, duration: 1000
#       byte.then radiusX: 5
#       byte.then radiusY: 40
#       expect(byte.history[2].radiusX[20]).toBe  5
#       expect(byte.history[2].radiusY[20]).toBe 40
#     it 'should inherit radius for radiusX/Y options in further chain #2', ->
#       byte = new Byte radius: 20, duration: 1000
#       byte.then radiusX: 5
#       byte.then radiusY: 40, radiusX: 50
#       expect(byte.history[2].radiusX[5]) .toBe 50
#       expect(byte.history[2].radiusY[20]).toBe 40
#     it 'should add new timeline with options #2', ->
#       byte = new Byte
#         radius: 20, duration: 1000, delay: 10, yoyo: true
#       byte.then radius: 5
#       expect(byte.timeline._timelines[1]._props.duration).toBe 1000
#       expect(byte.timeline._timelines[1]._props.yoyo)    .toBe false
#       expect(byte.timeline._timelines[1]._props.shiftTime).toBe 1010
#     it 'should merge then options and add them to the history', ->
#       byte = new Byte radius: 20, duration: 1000, delay: 10
#       byte.then radius: 5, yoyo: true, delay: 100
#       expect(byte.history.length)       .toBe 2
#       expect(byte.history[1].radius[20]).toBe 5
#       expect(byte.history[1].duration).toBe 1000
#       expect(byte.history[1].delay)   .toBe 100
#       expect(byte.history[1].yoyo)    .toBe true
#     it 'should always merge then options with the last history item', ->
#       byte = new Byte radius: 20, duration: 1000, delay: 10
#       byte.then radius: 5, yoyo: true, delay: 100
#       byte.then radius: {100:10}, delay: 0, stroke: 'green'
#       expect(byte.history.length)       .toBe 3
#       expect(byte.history[2].radius[100]).toBe 10
#       expect(byte.history[2].duration).toBe 1000
#       expect(byte.history[2].delay)   .toBe 0
#       expect(byte.history[2].yoyo)    .toBe undefined
#       expect(byte.history[2].stroke['transparent']).toBe 'green'
#     it 'should not copy callbacks', ->
#       onUpdate = ->
#       onStart  = ->
#       byte = new Byte
#         radius: 20, duration: 1000, delay: 200
#         onUpdate:  onUpdate, onStart: onStart
#       byte.then radius: 5, yoyo: true, delay: 100
#       expect(byte.history.length)       .toBe 2
#       expect(byte.history[1].radius[20]).toBe 5
#       expect(byte.history[1].duration)  .toBe 1000
#       expect(byte.history[1].delay)     .toBe 100
#       expect(byte.history[1].yoyo)      .toBe true
#       expect(byte.history[1].onComplete).toBe undefined
#       expect(byte.history[1].onUpdate).toBeDefined()
#       expect(byte.history[1].onUpdate).not.toBe onUpdate
#       byte.timeline.setProgress .73
#       byte.timeline.setProgress .74
#       byte.timeline.setProgress .75
#       expect(byte._props.onComplete).not.toBeDefined()
#       expect(byte._props.onStart) .not.toBeDefined()
#     describe 'onUpdate binding', ->
#       it 'should override onUpdate', ->
#         tr = new Transit()
#           .then({ fill: 'red' })
#         expect(typeof tr.timeline._timelines[1].onUpdate).toBe 'function'

#       it 'should not override onUpdate function if exists', ->
#         isRightScope = null; args = null
#         options = {
#           onUpdate:->
#             isRightScope = @ is tr
#             args = arguments
#           }
#         tr = new Transit().then(options)
#         expect(typeof tr.timeline._timelines[1].onUpdate).toBe 'function'

#         tr.timeline.setProgress 0
#         tr.timeline.setProgress .1
#         tr.timeline.setProgress .4
#         tr.timeline.setProgress .5
#         tr.timeline.setProgress .8
#         expect(isRightScope).toBe true

#         expect(args[0]).toBe .6
#         expect(args[1]).toBe .6
#         expect(args[2]).toBe true
#         expect(args[3]).toBe false

#       it 'should call _setProgress method', ->
#         options = { onUpdate:-> }
#         tr = new Transit().then(options);

#         tr.timeline.setProgress 0
#         spyOn tr, '_setProgress'
#         tr.timeline.setProgress .8
#         expect(tr._setProgress).toHaveBeenCalledWith .6

#     describe 'onFirstUpdate binding', ->
#       it 'should override onFirstUpdate', ->
#         tr = new Transit().then({ fill: 'red' })
#         expect(typeof tr.timeline._timelines[1]._props.onFirstUpdate)
#           .toBe 'function'

#       it 'should not override onFirstUpdate function if exists', ->
#         isRightScope = null; args = null
#         options = {
#           onFirstUpdate:->
#             isRightScope = @ is tr
#             args = arguments
#           }
#         tr = new Transit().then(options)
#         expect(typeof tr.timeline._timelines[1]._props.onFirstUpdate).toBe 'function'

#         tr.timeline.setProgress 0
#         tr.timeline.setProgress .1
#         tr.timeline.setProgress .4
#         tr.timeline.setProgress .5
#         tr.timeline.setProgress .8
#         expect(isRightScope).toBe true

#         expect(args[0]).toBe true
#         expect(args[1]).toBe false

#       it 'should call _tuneOptions method', ->
#         tr = new Transit(isIt: 1).then({ onUpdate:-> });

#         tr.timeline.setProgress 0
#         tr.timeline.setProgress .2
#         spyOn tr, '_tuneOptions'
#         tr.timeline.setProgress .8
#         expect(tr._tuneOptions).toHaveBeenCalledWith tr.history[1]

#     it 'should bind onFirstUpdate function #1', ->
#       byte = new Byte radius: 20, duration: 1000, delay: 10
#       byte.then radius: 5, yoyo: true, delay: 100
#       byte.then radius: {100:10}, delay: 200, stroke: 'green'
#       type1 = typeof byte.timeline._timelines[1]._props.onFirstUpdate
#       type2 = typeof byte.timeline._timelines[2]._props.onFirstUpdate
#       expect(type1).toBe 'function'
#       expect(type2).toBe 'function'
#     it 'should bind onFirstUpdate function #2', ->
#       byte = new Byte radius: 20, duration: 1000, delay: 10
#       byte.then radius: 5, yoyo: true, delay: 100
#       byte.then radius: {100:10}, delay: 200, stroke: 'green'
#       type1 = typeof byte.timeline._timelines[1]._props.onFirstUpdate
#       type2 = typeof byte.timeline._timelines[2]._props.onFirstUpdate
#       expect(type1).toBe 'function'
#       expect(type2).toBe 'function'
#     it 'should call _overrideUpdateCallbacks method with merged object', ->
#       byte = new Byte radius: 20, duration: 1000, delay: 10
#       spyOn byte, '_overrideUpdateCallbacks'
#       byte.then({ fill: 'red' })
#       expect(byte._overrideUpdateCallbacks).toHaveBeenCalled()

#   describe '_tuneOptions method ->', ->
#     it 'should call _extendDefaults with options', ->
#       byte = new Byte
#       o = radius: 50
#       spyOn byte, '_tuneOptions'
#       byte._tuneOptions o
#       expect(byte._tuneOptions).toHaveBeenCalled()
#     it 'should call _calcSize and _setElStyles methods', ->
#       byte = new Byte
#       spyOn byte, '_calcSize'
#       spyOn byte, '_setElStyles'
#       byte._tuneOptions radius: 50
#       expect(byte._calcSize).toHaveBeenCalled()
#       expect(byte._setElStyles).toHaveBeenCalled()
#   describe 'size calculations ->', ->
#     it 'should calculate size el size depending on largest value', ->
#       byte = new Byte
#         radius:       { 25: -100 }
#         strokeWidth:  { 6:  4    }
#       expect(byte._props.size).toBe(212)
#     it 'should calculate size el size based on radiusX/Y', ->
#       byte = new Byte
#         radius:       { 25: -100 }
#         radiusX:      200
#         strokeWidth:  { 6:  4    }
#       expect(byte._props.size).toBe(412)
#     it 'should calculate size el size based on radiusX/Y', ->
#       byte = new Byte
#         radius:       { 25: -100 }
#         radiusX:      200
#         radiusY:      300
#         strokeWidth:  { 6:  4    }
#       expect(byte._props.size).toBe(612)
#     it 'should calculate size el size based on radiusX/Y', ->
#       byte = new Byte
#         radius:       { 25: -100 }
#         radiusY:      30
#         strokeWidth:  { 6:  4    }
#       expect(byte._props.size).toBe(212)
#     it 'should calculate size el size based on radiusX/Y', ->
#       byte = new Byte
#         radius:       50
#         radiusY:      30
#         strokeWidth:  { 6:  4 }
#       expect(byte._props.size).toBe(112)
#     it 'should have sizeGap option', ->
#       byte = new Byte
#         radius:       { 25: -100 }
#         strokeWidth:  { 6:  4    }
#         sizeGap: 40
#       expect(byte._props.size).toBe(292)
#     it 'should calculate size el size depending on shape\'s ratio', ->
#       byte = new Byte
#         radius:       { 25: -100 }
#         strokeWidth:  { 6:  4    }
#         shape:        'rect'
#       svg = document.createElementNS ns, 'svg'
#       rect  = new Rect ctx: svg
#       expect(byte._props.size).toBe(212*rect.ratio)
#     it 'should not calculate size el size if size was passed', ->
#       byte = new Byte
#         radius:       100
#         strokeWidth:  5
#         size: 400
#       expect(byte._props.size).toBe(400)
#     it 'should not calculate size el size if external context was passed', ->
#       byte = new Byte
#         radius:       100
#         strokeWidth:  5
#         size:         400
#         ctx:          svg
#       expect(byte._props.size).toBe(400)
#     it 'should calculate center based on el size', ->
#       byte = new Byte
#         radius:       { 25: -100 }
#         strokeWidth:  { 4:  6    }
#       expect(byte._props.size)   .toBe(212)
#       expect(byte._props.center) .toBe(106)
#     it 'should increase size if elastic.out/inout easing', ->
#       byte = new Byte
#         radius:       { 25: -100 }
#         strokeWidth:  { 4:  6    }
#         easing: 'Elastic.Out'
#       expect(byte._props.size)   .toBe(212*1.25)
#       expect(byte._props.center) .toBe(byte._props.size/2)
#       byte = new Byte
#         radius:       { 25: -100 }
#         strokeWidth:  { 4:  6    }
#         easing: 'Elastic.InOut'
#       expect(byte._props.size)   .toBe(212*1.25)
#       expect(byte._props.center) .toBe(byte._props.size/2)
#     it 'should increase size if back.out/inout easing', ->
#       byte = new Byte
#         radius:       { 25: -100 }
#         strokeWidth:  { 4:  6    }
#         easing: 'back.Out'
#       expect(byte._props.size)   .toBe(212*1.1)
#       expect(byte._props.center) .toBe(byte._props.size/2)
#       byte = new Byte
#         radius:       { 25: -100 }
#         strokeWidth:  { 4:  6    }
#         easing: 'Back.InOut'
#       expect(byte._props.size)   .toBe(212*1.1)
#       expect(byte._props.center) .toBe(byte._props.size/2)
#   describe 'el creation ->', ->
#     it 'should create el', ->
#       byte = new Byte radius: 25
#       expect(byte.el.tagName.toLowerCase()).toBe('div')
#     it 'should create context', ->
#       byte = new Byte radius: 25
#       expect(byte.el.firstChild.tagName.toLowerCase()).toBe('svg')
#     it 'should set context styles', ->
#       byte = new Byte radius: 25
#       svg = byte.el.firstChild
#       expect(svg.style.position)                .toBe 'absolute'
#       expect(svg.style.width)                   .toBe '100%'
#       expect(svg.style.height)                  .toBe '100%'
#     it 'should not create context and el if context was passed', ->
#       svg.isSvg = true
#       byte = new Byte ctx: svg
#       expect(byte.el)           .toBe byte.bit.el
#       expect(byte.ctx)          .toBeDefined()
#       expect(byte.ctx.isSvg)    .toBe true
#     it 'should set el size', ->
#       byte = new Byte
#         radius:       25
#         strokeWidth:  2
#         x:            10
#         y:            20
#       expect(byte.el.style.position)              .toBe 'absolute'
#       expect(byte.el.style.width)                 .toBe '54px'
#       expect(byte.el.style.height)                .toBe '54px'
#       expect(byte.el.style.display)               .toBe 'none'
#       expect(byte.el.style['margin-left'])        .toBe '-27px'
#       expect(byte.el.style['margin-top'])         .toBe '-27px'
#       expect(byte.el.style['marginLeft'])         .toBe '-27px'
#       expect(byte.el.style['marginTop'])          .toBe '-27px'
#       #expect(byte.el.style['backface-visibility']).toBe 'hidden'
#       #expect(byte.el.style["#{h.prefix.css}backface-visibility"]).toBe 'hidden'
#       expect(byte.isShown).toBe false
#     it 'should skip props if foreign context', ->
#       byte = new Byte
#         radius:       25
#         strokeWidth:  2
#         x:            10
#         y:            20
#         ctx: svg
#       expect(byte.el.style.display)               .toBe 'none'
#       expect(byte.el.style.opacity)               .toBe '1'
#       expect(byte.el.style.position)              .not.toBe 'absolute'
#       expect(byte.el.style.width)                 .not.toBe '54px'
#       expect(byte.el.style.height)                .not.toBe '54px'
#       expect(byte.el.style['margin-left'])        .not.toBe '-27px'
#       expect(byte.el.style['margin-top'])         .not.toBe '-27px'
#       expect(byte.el.style['marginLeft'])         .not.toBe '-27px'
#       expect(byte.el.style['marginTop'])          .not.toBe '-27px'
#       # expect(byte.el.style['backface-visibility']).not.toBe 'hidden'
#       # prefixedProp = "#{h.prefix.css}backface-visibility"
#       # expect(byte.el.style[prefixedProp]).not.toBe 'hidden'
#       expect(byte.isShown).toBe false
#     it 'should set display: block if isShowInit was passed', ->
#       byte = new Byte isShowInit: true
#       expect(byte.el.style.display).toBe 'block'
#       expect(byte.isShown).toBe true
#     it 'should set el size', ->
#     # it 'should set el size based on remBase', ->
#       byte = new Byte
#         radius:       25
#         strokeWidth:  2
#         x:            10
#         y:            20
#       byte.isRendered = false
#       byte.h.remBase = 8
#       byte._render()
#       byte.h.remBase = 16
#       expect(byte.el.style.position)              .toBe 'absolute'
#       expect(byte.el.style.width)                 .toBe '54px'
#       expect(byte.el.style.height)                .toBe '54px'
#       expect(byte.el.style['margin-left'])        .toBe '-27px'
#       expect(byte.el.style['margin-top'])         .toBe '-27px'
#       expect(byte.el.style['marginLeft'])         .toBe '-27px'
#       expect(byte.el.style['marginTop'])          .toBe '-27px'
#       #expect(byte.el.style['backface-visibility']).toBe 'hidden'
#       #expect(byte.el.style["#{h.prefix.css}backface-visibility"]).toBe 'hidden'
#     it 'should create bit', ->
#       byte = new Byte radius: 25
#       expect(byte.bit).toBeDefined()
#       expect(byte.bit.o.isDrawLess).toBe true
#     it 'should create bit based on shape option or fallback to circle', ->
#       byte = new Byte
#         radius:  25
#         shape:   'rect'
#       byte2 = new Byte radius: 25
#       expect(byte.bit.shape).toBe  'rect'
#       expect(byte2.bit.shape).toBe 'ellipse'
#     it 'should add itself to body', ->
#       byte = new Byte radius: 25
#       expect(byte.el.parentNode.tagName.toLowerCase()).toBe('body')
#     it 'should add itself to parent if the option was passed', ->
#       div  = document.createElement?('div')
#       div.isDiv = true
#       byte = new Byte
#         radius: 25
#         parent: div
#       expect(byte.el.parentNode.isDiv).toBe true
#   describe 'opacity set ->', ->
#     it 'should set a position with respect to units', ->
#       byte = new Byte opacity: .5
#       expect(byte.el.style.opacity).toBe '0.5'
#     # it 'should animate opacity', (dfr)->
#     #   byte = new Byte
#     #     opacity:    { 1: 0}
#     #     duration:   100
#     #     onComplete:->
#     #       expect(byte.el.style.opacity).toBe('0');
#     #       dfr()
#     #   byte.run()

#   describe 'position set ->', ->
#     describe 'x/y coordinates ->', ->
#       it 'should set a position with respect to units', ->
#         byte = new Byte left: 100, top: 50
#         expect(byte.el.style.left).toBe '100px'
#         expect(byte.el.style.top) .toBe '50px'
#       it 'should animate position', (dfr)->
#         byte = new Byte
#           left: {100: '200px'}
#           duration: 100
#           onComplete:-> expect(byte.el.style.left).toBe('200px'); dfr()
#         byte.play()
#   #     # it 'should warn when x/y animated position and not foreign context',->
#   #     #   spyOn console, 'warn'
#   #     #   byte = new Byte left: {100: '200px'}
#   #     #   byte.run()
#   #     #   expect(console.warn).toHaveBeenCalled()
#   #     # it 'should notwarn when x/y animated position and foreign context',->
#   #     #   spyOn console, 'warn'
#   #     #   byte = new Byte left: {100: '200px'}, ctx: svg
#   #     #   byte.run()
#   #     #   expect(console.warn).not.toHaveBeenCalled()
#       it 'should animate position with respect to units', (dfr)->
#         byte = new Byte
#           left: {'20%': '50%'}
#           duration: 100
#         byte.play()
#         setTimeout ->
#           expect(byte.el.style.left)   .toBe '50%'
#           dfr()
#         , 500
#       it 'end unit that were not specified should fallback to start unit', ()->
#         byte = new Byte
#           left: {'20%': 50}
#           duration: 200
#         byte.play()
#         expect(byte.deltas.left.start.unit).toBe '%'
#         expect(byte.deltas.left.end.unit)  .toBe '%'
#       it 'should fallback to end units if units are different', (dfr)->
#         byte = new Byte
#           left: {'20%': '50px'}
#           duration: 200
#           onComplete:-> expect(byte.el.style.left).toBe('50px'); dfr()
#         byte.play()
#       describe 'x/y coordinates ->', ->
#         it 'should set a position with respect to units', ->
#           byte = new Byte
#             x: 100
#             y: 50
#           s = byte.el.style
#           tr = s.transform or s["#{mojs.h.prefix.css}transform"]
#           expect(tr).toBe 'translate(100px, 50px) scale(1)'
#         it 'should animate position', (dfr)->
#           byte = new Byte
#             x: {100: '200px'}
#             duration: 200
#             onComplete:->
#               s = byte.el.style
#               tr = s.transform or s["#{mojs.h.prefix.css}transform"]
#               expect(tr) .toBe 'translate(200px, 0px) scale(1)'
#               dfr()
#           byte.play()
#         it 'should animate position with respect to units', (dfr)->
#           byte = new Byte
#             x: {'20%': '50%'}
#             duration: 200
#             onComplete:->
#               s = byte.el.style
#               tr = s.transform or s["#{mojs.h.prefix.css}transform"]
#               expect(tr).toBe 'translate(50%, 0px) scale(1)'
#               dfr()
#           byte.play()
#         it 'should fallback to end units if units are differnt', (dfr)->
#           byte = new Byte
#             x: { '20%': '50px' }
#             y: { 0    : '50%'  }
#             duration: 200
#             onComplete:->
#               s = byte.el.style
#               tr = s.transform or s["#{mojs.h.prefix.css}transform"]
#               expect(tr).toBe 'translate(50px, 50%) scale(1)'
#               dfr()
#           byte.play()
#   # probably redundant
#   # describe '_isNeedsTransform method ->', ->
#   #   it 'should return boolean if transform needed', ->
#   #     byte = new Byte x: 100, y: 100
#   #     byte._setProp x: 101
#   #     expect(byte._isNeedsTransform()).toBe true
#   #   it 'should execute for both x and y ', ->
#   #     byte = new Byte x: 100, y: 100
#   #     spyOn byte, '_isPropChanged'
#   #     byte._isNeedsTransform()
#   #     expect(byte._isPropChanged).toHaveBeenCalledWith 'x'
#   #     expect(byte._isPropChanged).toHaveBeenCalledWith 'y'
#   describe '_show method ->', ->
#     it 'should set display: block to el', ->
#       byte = new Byte
#       byte._show()
#       expect(byte.el.style.display).toBe 'block'
#     it 'should return if isShow is already true', ->
#       byte = new Byte
#       byte._show()
#       byte.el.style.display = 'inline'
#       byte._show()
#       expect(byte.el.style.display).toBe 'inline'
#   describe '_hide method ->', ->
#     it 'should set display: block to el', ->
#       byte = new Byte
#       byte._hide()
#       expect(byte.el.style.display).toBe 'none'
  describe '_mergeThenOptions method ->', ->
    it 'should merge 2 objects', ->
      byte = new Byte
      start =
        radius: 10,
        duration: 10,
        fill: '#ff00ff',
        strokeWidth: { 10: 20 }
      end =
        radius: 20,
        duration: 500,
        opacity: { 2: 1 }

      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radius[10]).toBe 20
      expect(mergedOpton.duration).toBe 500
      expect(mergedOpton.fill).toBe '#ff00ff'
      expect(mergedOpton.strokeWidth).toBe 20
      expect(mergedOpton.opacity[2]).toBe 1
    it 'should merge 2 objects if the first was an object', ->
      byte = new Byte
      start = radius: {10: 0}
      end   = radius: 20
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radius[0]).toBe 20
    it 'should use the second value if it is an object', ->
      byte = new Byte
      start = radius: 10
      end   = radius: {20: 0}
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radius[20]).toBe 0
    it 'should save the old tween values', ->
      byte = new Byte
      start = duration: 10
      end   = radius: {20: 0}
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.duration).toBe 10
    it 'should fallback to default value is start is undefined', ->
      byte = new Byte
      start = radius: 10, duration: 1000
      end   = radius: 20, duration: 500, stroke: '#ff00ff'
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.stroke['transparent']).toBe '#ff00ff'
    it 'should use start value if end value is null or undefined', ->
      byte = new Byte
      start = radius: 10, duration: 1000, fill: 'orange', points: 5
      end   =
        radius: 20, duration: null, points: undefined
        fill: null, stroke: '#ff00ff'
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.duration).toBe 1000
      expect(mergedOpton.fill)    .toBe 'orange'
      expect(mergedOpton.points)  .toBe 5
    it 'should use end of the start value if end value is null or undefined', ->
      byte = new Byte
      start = radius: 10, duration: 1000, fill: {'orange' : 'cyan'}, points: 5
      end   =
        radius: 20, duration: null, points: undefined
        fill: null, stroke: '#ff00ff'
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.fill)    .toBe 'cyan'
    it 'should work with new tween values', ->
      byte = new Byte
      start = radius: 10
      end   = duration: 1000, delay: 200, repeat: 2, easing: 'elastic.in'
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.duration).toBe 1000
      expect(mergedOpton.delay)   .toBe 200
      expect(mergedOpton.repeat)  .toBe 2
      expect(mergedOpton.easing)  .toBe 'elastic.in'
    it 'should push merged options to the history', ->
      byte = new Byte
      start = radius: 10, duration: 1000, fill: 'orange', points: 5
      end   =
        radius: 20, duration: null, points: undefined
        fill: null, stroke: '#ff00ff'
      mergedOpton = byte._mergeThenOptions start, end
      expect(byte.history[1]).toBe mergedOpton
  describe '_render method ->', ->
    it 'should call draw method', ->
      byte = new Byte radius: 25
      spyOn byte, '_draw'
      byte._render()
      expect(byte._draw).toHaveBeenCalled()
    it 'should call _setElStyles method', ->
      byte = new Byte radius: 25
      spyOn byte, '_setElStyles'
      byte._render()
      expect(byte._setElStyles).toHaveBeenCalled()
    it 'should call _createBit method', ->
      byte = new Byte radius: 25
      spyOn byte, '_createBit'
      byte.isRendered = false
      byte._render()
      expect(byte._createBit).toHaveBeenCalled()
    it 'should set isRendered to true method', ->
      byte = new Byte radius: 25
      expect(byte.isRendered).toBe true
      byte.isRendered = false; byte._render()
      expect(byte.isRendered).toBe true
    it 'should call _calcSize method', ->
      byte = new Byte radius: 25
      spyOn byte, '_calcSize'
      byte.isRendered = false
      byte._render()
      expect(byte._calcSize).toHaveBeenCalled()
    it 'should not create new el', ->
      byte = new Byte radius: 25
      cnt = document.body.children.length
      byte._render true
      expect(cnt).toBe document.body.children.length
  describe '_draw method ->', ->
    it 'should call _setProp method', ->
      byte = new Byte radius: 25
      spyOn byte.bit, 'setProp'
      byte._draw()
      expect(byte.bit.setProp).toHaveBeenCalled()
    it 'should set x/y to center', ->
      byte = new Byte radius: 25
      byte._draw()
      expect(byte.bit.props.x).toBe byte._props.center
      expect(byte.bit.props.y).toBe byte._props.center
    it 'should set x/y to props.x/props.y if context was passed', ->
      byte = new Byte radius: 25, ctx: svg
      byte._draw()
      expect(byte.bit.props.x).toBe parseFloat byte._props.x
      expect(byte.bit.props.y).toBe parseFloat byte._props.y
    it 'should call bit._draw method', ->
      byte = new Byte radius: 25
      spyOn byte.bit, 'draw'
      byte._draw()
      expect(byte.bit.draw).toHaveBeenCalled()
    it 'should call _drawEl method', ->
      byte = new Byte radius: 25
      spyOn byte, '_drawEl'
      byte._draw()
      expect(byte._drawEl).toHaveBeenCalled()
    it 'should call _calcShapeTransform method', ->
      byte = new Byte radius: 25
      spyOn byte, '_calcShapeTransform'
      byte._draw()
      expect(byte._calcShapeTransform).toHaveBeenCalled()
    it 'should receive the current progress', ->
      byte = new Byte radius: 25
      spyOn byte, '_draw'
      byte._setProgress .5
      expect(byte._draw).toHaveBeenCalledWith .5
    it 'should calculate transform object', ->
      byte = new Byte
        angle:        90
        radius:       25
        strokeWidth:  4
      expect(byte.bit.props.transform).toBe('rotate(90, 29, 29)')
      expect(byte._calcShapeTransform).toBeDefined()
  describe '_drawEl method ->', ->
    it 'should set el positions and transforms', ->
      byte = new Byte radius: 25, top: 10
      expect(byte.el.style.left)      .toBe     '0px'
      expect(byte.el.style.top)       .toBe     '10px'
      expect(byte.el.style.opacity)   .toBe     '1'
      s = byte.el.style
      tr = s.transform or s["#{mojs.h.prefix.css}transform"]
      expect(tr) .toBe     'translate(0px, 0px) scale(1)'
    it 'should set only opacity if foreign context', ->
      byte = new Byte radius: 25, top: 10, ctx: svg
      byte._draw()
      expect(byte.el.style.opacity)   .toBe         '1'
      expect(byte.el.style.left)      .not.toBe     '0px'
      expect(byte.el.style.top)       .not.toBe     '10px'
      s = byte.el.style
      tr = if s.transform? then s.transform
      else s["#{mojs.h.prefix.css}transform"]
      expect(tr).toBeFalsy()
    it 'should set new values', ->
      byte = new Byte radius: 25, top: 10
      byte._draw()
      byte._props.left = '1px'
      byte._draw()
      expect(byte.el.style.left)      .toBe     '1px'
      expect(byte.lastSet.left.value) .toBe     '1px'
    it 'should not set old values', ->
      byte = new Byte radius: 25, y: 10
      byte._draw()
      byte._draw()
      expect(byte.el.style.left)      .toBe     '0px'
      expect(byte.lastSet.x.value)    .toBe     '0px'
    # redundant
    # it 'should call _fillTransform method', ->
    #   byte = new Byte radius: 25
    #   spyOn byte, '_fillTransform'
    #   byte._setProp x: 20
    #   byte._draw()
    #   expect(byte._fillTransform).toHaveBeenCalled()
    it 'should return true if there is no el', ->
      byte = new Byte radius: 25
      byte.el = null
      expect(byte._drawEl()).toBe true
    it 'should set transform if on of the x, y or scale changed', ->
      byte = new Byte radius: 25, top: 10, ctx: svg
      byte._draw()
      spyOn h, 'setPrefixedStyle'
      byte._draw()
      expect(h.setPrefixedStyle).not.toHaveBeenCalled()
    it 'should set transform if x changed', ->
      byte = new Byte radius: 25, top: 10, x: { 0: 10 }
      byte._props.x = '4px'
      spyOn byte.h, 'setPrefixedStyle'
      byte._draw()
      expect(byte.h.setPrefixedStyle)
        .toHaveBeenCalledWith(
          byte.el,
          'transform',
          'translate(4px, 0px) scale(1)'
        )
    it 'should set transform if x changed', ->
      byte = new Byte radius: 25, top: 10, y: { 0: 10 }
      byte._props.y = '4px'
      spyOn byte.h, 'setPrefixedStyle'
      byte._draw()
      expect(byte.h.setPrefixedStyle)
        .toHaveBeenCalledWith(
          byte.el,
          'transform',
          'translate(0px, 4px) scale(1)'
        )
    it 'should set transform if x changed', ->
      byte = new Byte radius: 25, top: 10, scale: { 0: 10 }
      byte._props.scale = 3
      spyOn byte.h, 'setPrefixedStyle'
      byte._draw()
      expect(byte.h.setPrefixedStyle)
        .toHaveBeenCalledWith(
          byte.el,
          'transform',
          'translate(0px, 0px) scale(3)'
        )
      
  describe '_isPropChanged method ->', ->
    it 'should return bool showing if prop was changed after the last set', ->
      byte = new Byte radius: 25, y: 10
      byte._props.left = '20px'
      expect(byte._isPropChanged 'left').toBe true
      byte._props.left = '20px'
      expect(byte._isPropChanged 'left').toBe false
    it 'should add prop object to lastSet if undefined', ->
      byte = new Byte radius: 25, y: 10
      byte._isPropChanged('x')
      expect(byte.lastSet.x).toBeDefined()
  describe 'delta calculations ->', ->
    it 'should skip delta for excludePropsDelta object', ->
      byte = new Byte radius: {45: 55}
      byte.skipPropsDelta = radius: 1
      byte._extendDefaults()
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
         
        expect(byte.deltas.duration).not.toBeDefined()
  describe '_calcOrigin method ->', ->
    it "should set x and y to center by
        default (if no drawing context passed)", ->
      byte = new Byte radius:  {'25.50': -75.50}
      byte._calcOrigin .5
      expect(byte.origin.x).toBe byte._props.center
      expect(byte.origin.y).toBe byte._props.center
    it "should set x and y to x and y if drawing context passed", ->
      byte = new Byte radius:  {'25.50': -75.50}, ctx: svg
      byte._calcOrigin .5
      expect(byte.origin.x).toBe parseFloat byte._props.x
      expect(byte.origin.y).toBe parseFloat byte._props.y
  describe '_setProgress method ->', ->
    it 'should set transition progress', ->
      byte = new Byte radius:  {'25.50': -75.50}
      byte._setProgress .5
      expect(byte.progress).toBe .5
    it 'should set value progress', ->
      byte = new Byte radius:  {'25': 75}
      byte._setProgress .5
      expect(byte._props.radius).toBe 50
    it 'should call _calcOrigin method', ->
      byte = new Byte radius:  {'25': 75}
      spyOn byte, '_calcOrigin'
      byte._setProgress .5
      expect(byte._calcOrigin).toHaveBeenCalled()
    it 'should have origin object', ->
      byte = new Byte radius:  {'25': 75}
      byte._setProgress .5
      expect(byte.origin.x).toBeDefined()
      expect(byte.origin.y).toBeDefined()
    it 'should have origin should be the center of the transit', ->
      byte = new Byte radius:  {'25': 75}
      byte._setProgress .5
      expect(byte.origin.x).toBe byte._props.center
      expect(byte.origin.y).toBe byte._props.center
    it 'should have origin should be x/y if foreign context', ->
      byte = new Byte radius:{'25': 75}, ctx: svg
      byte._setProgress .5
      expect(byte.origin.x).toBe parseFloat byte._props.x
      expect(byte.origin.y).toBe parseFloat byte._props.x
    it 'should have origin should be number if foreign context', ->
      byte = new Byte radius:{'25': 75}, ctx: svg
      byte._setProgress .5
      expect(typeof byte.origin.x).toBe 'number'
      expect(typeof byte.origin.y).toBe 'number'
    it 'should call _calcCurrentProps', ->
      byte = new Byte radius:  {'25': 75}
      spyOn byte, '_calcCurrentProps'
      byte._setProgress .5
      expect(byte._calcCurrentProps).toHaveBeenCalledWith .5
    it 'not to thow', ->
      byte = new Byte radius:  {'25': 75}, ctx: svg
      expect(-> byte._show()).not.toThrow()
    it 'should set color value progress and only int', ->
      byte = new Byte stroke:  {'#000': 'rgb(255,255,255)'}
      colorDelta = byte.deltas.stroke
      byte._setProgress .5
      expect(byte._props.stroke).toBe 'rgba(127,127,127,1)'
    it 'should set color value progress for delta starting with 0', ->
      byte = new Byte stroke:  {'#000': 'rgb(0,255,255)'}
      colorDelta = byte.deltas.stroke
      byte._setProgress .5
      expect(byte._props.stroke).toBe 'rgba(0,127,127,1)'

  describe 'strokeDash.. values', ->
    it 'should set strokeDasharray/strokeDashoffset value progress', ->
      byte = new Byte strokeDasharray:  {'200 100': '400'}
      byte._setProgress .5
      expect(byte._props.strokeDasharray[0].value).toBe 300
      expect(byte._props.strokeDasharray[0].unit) .toBe 'px'
      expect(byte._props.strokeDasharray[1].value).toBe 50
      expect(byte._props.strokeDasharray[1].unit) .toBe 'px'
    it 'should set strokeDasharray/strokeDashoffset with percents', ->
      byte = new Byte
        type: 'circle'
        strokeDasharray:  {'0% 200': '100%'}
        radius: 100
      byte._setProgress .5
      expect(byte._props.strokeDasharray[0].value).toBe 50
      expect(byte._props.strokeDasharray[0].unit) .toBe '%'
      expect(byte._props.strokeDasharray[1].value).toBe 100
      expect(byte._props.strokeDasharray[1].unit) .toBe 'px'
    it 'should parse non-deltas strokeDasharray/strokeDashoffset values', ->
      byte = new Byte
        type: 'circle'
        strokeDasharray:  '100%'
        radius: 100
      expect(byte._props.strokeDasharray[0].value).toBe 100
      expect(byte._props.strokeDasharray[0].unit).toBe '%'
    it 'should parse multiple strokeDash.. values', ->
      byte = new Byte strokeDasharray: '7 100 7'
      expect(h.isArray(byte._props.strokeDasharray)).toBe true
      expect(byte._props.strokeDasharray.length).toBe 3
      expect(byte._props.strokeDasharray[0].value).toBe 7
      expect(byte._props.strokeDasharray[1].value).toBe 100
      expect(byte._props.strokeDasharray[2].value).toBe 7
    it 'should parse num values', ->
      byte = new Byte strokeDasharray: 7
      expect(h.isArray(byte._props.strokeDasharray)).toBe true
      expect(byte._props.strokeDasharray.length)    .toBe 1
  describe 'callbacks ->', ->
    describe 'onStart callback ->', ->
      it 'should call onStart callback', (dfr)->
        isOnStart = null
        byte = new Byte radius:  {'25': 75}, onStart:-> isOnStart = true
        byte.play()
        setTimeout ->
          expect(isOnStart).toBe(true); dfr()
        , 500
      # old
      # it 'should have scope of transit', (dfr)->
      #   isRightScope = null
      #   byte = new Byte
      #     radius: {'25': 75}
      #     onStart:-> isRightScope = @ instanceof Byte
      #   byte.play()
      #   setTimeout ->
      #     expect(isRightScope).toBe(true); dfr()
      #   , 500
      it 'should show el', ->
        byte = new Byte radius:  {'25': 75}
        spyOn byte, '_show'
        byte.timeline.setProgress .48
        byte.timeline.setProgress .49
        byte.timeline.setProgress .5
        expect(byte._show).toHaveBeenCalled()
    describe 'onUpdate callback', ->
      it 'should call onUpdate callback', (dfr)->
        isOnUpdate = null
        byte = new Byte
          radius:  {'25': 75}
          onUpdate:-> isOnUpdate = true

        setTimeout ->
          expect('onUpdate called').toBe('onUpdate called'); dfr()
        , 500
      it 'should have scope of Transit', (dfr)->
        isRightScope = null
        byte = new Byte
          radius: {'25': 75}
          onUpdate:-> isRightScope = @ instanceof Byte
        byte.play()
        setTimeout (-> expect(isRightScope).toBe(true); dfr()), 500
      it 'should set current progress', (dfr)->
        progress = null
        byte = new Byte
          radius: {'25': 75}
          onUpdate:(p)-> progress = p
          duration: 100
        byte.play()
        setTimeout ->
          expect(progress).toBeGreaterThan 0
          expect(progress).not.toBeGreaterThan 1
          dfr()
        , 500
    describe 'onComplete callback ->', ->
      it 'should call onComplete callback',(dfr)->
        isOnComplete = null
        byte = new Byte
          radius:  {'25': 75}
          onComplete:-> isOnComplete = true
          duration: 200
        byte.play()
        setTimeout ->
          expect(isOnComplete).toBe(true); dfr()
        , 500
      it 'should have scope of Transit', (dfr)->
        isRightScope = null
        byte = new Byte
          radius: {'25': 75}
          duration: 100
          onComplete:-> isRightScope = @ instanceof Byte
        byte.play()
        setTimeout ->
          expect(isRightScope).toBe(true); dfr()
        , 500
    describe 'onFirstUpdate callback ->', ->
      it 'should call _tuneOptions method when the tween goes backward', ->
        byte = new Byte radius:  {'25': 75}
          .then { radius: 20 }
        spyOn byte, '_tuneOptions'
        byte.timeline.setProgress .99
        byte.timeline.setProgress .98
        byte.timeline.setProgress 0
        expect(byte._tuneOptions).toHaveBeenCalled()
      it 'should call not _tuneOptions if history length is one record', ->
        byte = new Byte radius:  {'25': 75}
        spyOn byte, '_tuneOptions'
        byte.timeline.setProgress .99
        byte.timeline.setProgress 0
        expect(byte._tuneOptions).not.toHaveBeenCalled()
  describe 'createTween method ->', ->
    it 'should create tween object', ->
      byte = new Byte radius:  {'25': 75}
      expect(byte.timeline).toBeDefined()
    it 'should bind the onFirstUpdate method', ->
      byte = new Byte radius:  {'25': 75}
      expect(typeof byte.tween.o.onFirstUpdate).toBe 'function'
    # redundant
    # it 'should start tween after init', (dfr)->
    #   isStarted = null
    #   byte = new Byte
    #     radius: {'25': 75}
    #     onStart:-> isStarted = true
    #   byte.play()
    #   setTimeout ->
    #     expect(isStarted).toBe(true); dfr()
    #   , 100
  # # old
  # # describe 'easing ->', ->
  # #   it 'should set easing option to props', ->
  # #     byte = new Byte easing: 'Linear.None'
  # #     expect(byte._props.easing).toBe 'Linear.None'
  # # describe 'run method ->', ->
  # #   it 'should extend defaults with passed object', ->
  # #     byte = new Byte(strokeWidth: {10: 5})
  # #     spyOn byte, '_extendDefaults'
  # #     o = { strokeWidth: 20 }
  # #     byte.run(o)
  # #     expect(byte._extendDefaults).toHaveBeenCalledWith o
  # #   it 'should not transform history if object was not passed', ->
  # #     byte = new Byte(strokeWidth: {10: 5})
  # #     spyOn byte, '_transformHistory'
  # #     byte.run()
  # #     expect(byte._transformHistory).not.toHaveBeenCalled()
  # #   it 'should not override deltas', ->
  # #     byte = new Byte(strokeWidth: {10: 5})
  # #     byte.run stroke: 'green'
  # #     expect(byte.deltas.strokeWidth).toBeDefined()
  # #   it 'should calculate el size', ->
  # #     byte = new Byte(radius: {10: 5})
  # #     spyOn byte, '_calcSize'
  # #     byte.run radius: 50
  # #     expect(byte._calcSize).toHaveBeenCalled()
  # #   it 'should set new el size', ->
  # #     byte = new Byte(radius: {10: 5})
  # #     spyOn byte, '_setElStyles'
  # #     byte.run radius: 50
  # #     expect(byte._setElStyles).toHaveBeenCalled()
  # #   it 'should set new el size #2', ->
  # #     byte = new Byte(radius: {10: 5})
  # #     byte.run radius: 50
  # #     expect(byte.el.style.width).toBe '104px'
  # #   it 'should set new el size with respect to radiusX/radiusY', ->
  # #     byte = new Byte(radius: {10: 5})
  # #     byte.run radius: 50, radiusX: {100: 0}
  # #     expect(byte.el.style.width).toBe '204px'
  # #   it 'should set new el size with respect to radiusX/radiusY', ->
  # #     byte = new Byte(radius: {10: 5})
  # #     byte.run radius: 50, radiusY: 110
  # #     expect(byte.el.style.width).toBe '224px'
  # #   it 'should set new el size with respect to radiusX/radiusY', ->
  # #     byte = new Byte(radius: {10: 5})
  # #     byte.run radius: 450, radiusY: 110, radiusX: {200:0}
  # #     expect(byte.el.style.width).toBe '404px'
  # #   it 'should start tween', ->
  # #     byte = new Byte(strokeWidth: {10: 5})
  # #     spyOn byte, 'play'
  # #     byte.run()
  # #     expect(byte.play).toHaveBeenCalled()
  # #   it 'should accept new options', ->
  # #     byte = new Byte(strokeWidth: {10: 5})
  # #     byte.run strokeWidth: 25
  # #     expect(byte._props.strokeWidth).toBe 25
  # #     expect(byte.deltas.strokeWidth).not.toBeDefined()
  # #   it 'should not modify old options', ->
  # #     byte = new Byte(strokeWidth: {10: 5}, radius: 33)
  # #     byte.run strokeWidth: 25
  # #     expect(byte._props.radius).toBe 33
  # #   # probably reduntant
  # #   # it 'should call _setProgress(0, true)', ->
  # #   #   byte = new Byte(radius: {10: 5})
  # #   #   spyOn byte, '_setProgress'
  # #   #   byte.run radius: 50
  # #   #   expect(byte._setProgress).toHaveBeenCalledWith 0, true
  # #   it 'should warn if shape was passed', ->
  # #     byte = new Byte(shape: 'polygon')
  # #     spyOn byte.h, 'warn'
  # #     byte.run shape: 'circle'
  # #     expect(byte.h.warn).toHaveBeenCalled()
  # #     expect(byte._o.shape).toBe 'polygon'
  #   # TODO: check the tween props
  #   # it 'should set new options on timeline', ->
  #   #   byte = new Byte
  #   #     duration: 500, delay: 200, repeat: 1,
  #   #     easing: 'cubic.in'
  #   #     yoyo: true
  #   #     onStart:    ->
  #   #     onComplete: ->
  #   #   onStart = (->); onComplete = (->)
  #   #   byte.run
  #   #     duration: 2000, delay: 0, repeat: 2, easing: 'linear.none'
  #   #     onStart: onStart, onComplete: onComplete, yoyo: false
  #   #   expect(byte.tween._props.duration).toBe     2000
  #   #   expect(byte.tween._props.delay).toBe        0
  #   #   expect(byte.tween._props.repeat).toBe       2
  #   #   expect(typeof byte.tween._props.easing).toBe 'function'
  #   #   expect(byte.tween._props.easing).toBe       mojs.easing.linear.none
  #   #   expect(byte.tween._props.onStart).toBe      onStart
  #   #   expect(byte.tween._props.onComplete).toBe   onComplete
  #   #   expect(byte.tween._props.yoyo).toBe         false
  #   # TODO: check the tween props
  #   # it 'should call _recalcTotalDuration on timeline', ->
  #   #   byte = new Byte
  #   #   spyOn byte.timeline, '_recalcTotalDuration'
  #   #   byte.run duration: 2000
  #   #   expect(byte.timeline._recalcTotalDuration).toHaveBeenCalled()
  #   # it 'should call _transformHistory', ->
  #   #   byte = new Byte
  #   #   spyOn byte, '_transformHistory'
  #   #   o = duration: 2000
  #   #   byte.run o
  #   #   expect(byte._transformHistory).toHaveBeenCalledWith o
  #   # it 'should not call _transformHistory if optionless', ->
  #   #   byte = new Byte
  #   #   spyOn byte, '_transformHistory'
  #   #   byte.run()
  #   #   expect(byte._transformHistory).not.toHaveBeenCalled()
  #   # it 'shoud warn if tweenValues changed on run', ->
  #   #   byte = new Byte( duration:  2000 ).then radius: 40
  #   #   spyOn h, 'warn'
  #   #   byte.run
  #   #     duration: 100
  #   #     delay:    100
  #   #     repeat:   1
  #   #     yoyo:     false
  #   #     easing:   'Linear.None'
  #   #     onStart:    ->
  #   #     onUpdate:   ->
  #   #     onComplete: ->
  #   #   expect(h.warn).toHaveBeenCalled()
  #   #   expect(byte.history[0].duration).toBe 2000
  #   #   expect(byte._props.duration)     .toBe 2000
  #   # it 'shoud not warn if history is 1 record long', ->
  #   #   byte = new Byte(duration:  2000)
  #   #   spyOn h, 'warn'
  #   #   byte.run
  #   #     duration: 100
  #   #     delay:    100
  #   #     repeat:   1
  #   #     yoyo:     false
  #   #     easing:   'Linear.None'
  #   #     onStart:    ->
  #   #     onUpdate:   ->
  #   #     onComplete: ->
  #   #   expect(h.warn).not.toHaveBeenCalled()
  #   #   expect(byte.history[0].duration).toBe 100
  #   #   expect(byte._props.duration)     .toBe 100
  #   # it 'shoud work with no arguments passed', ->
  #   #   byte = new Byte(duration:  2000)
  #   #     .then radius: 500
  #   #   expect(-> byte.run()).not.toThrow()
  #   # TODO: decide what to do with `else if (o) {`
  #   # propbably redundant
  #   # it 'should _tuneNewOption on run', ->
  #   #   byte = new Byte(isRunLess:  true, duration:  2000)
  #   #     .then radius: 500
  #   #   byte.run()
  #   #   spyOn byte, '_tuneNewOption'
  #   #   byte.run({})
  #   #   expect(byte._tuneNewOption).toHaveBeenCalledWith byte.history[0]
  # describe 'isForeign flag ->', ->
  #   it 'should not be set by default', ->
  #     byte = new Byte
  #     expect(byte.isForeign).toBe false
  #   it 'should be set if context was passed', ->
  #     byte = new Byte ctx: svg
  #     expect(byte.isForeign).toBe true
  #   it 'if context passed el should be bit\'s el', ->
  #     byte = new Byte ctx: svg
  #     expect(byte.el).toBe byte.bit.el
  # describe 'show/hide on start/end ->', ->
  #   it 'should show the el on start', ->
  #     byte = new Byte ctx: svg
  #     byte.timeline.setProgress .45
  #     byte.timeline.setProgress .5
  #     expect(byte.el.style.display).toBe 'block'
  #   it 'should hide the el on end', ->
  #     byte = new Byte ctx: svg
  #     byte.timeline.setProgress .99
  #     byte.timeline.setProgress 1
  #     expect(byte.el.style.display).toBe 'none'
  #   it 'should not hide the el on end if isShowEnd was passed', ->
  #     byte = new Byte ctx: svg, isShowEnd: true
  #     byte.timeline.setProgress .98
  #     byte.timeline.setProgress .99
  #     byte.timeline.setProgress 1
  #     expect(byte.el.style.display).toBe 'block'
  #   # it 'should not hide the el on end if isShowEnd was passed #2 - chain', ->
  #   #   byte = new Byte ctx: svg, isShowEnd: true
  #   #     .then radius: 10
  #   #     .then radius: 20
  #   #   byte.timeline.setProgress .99
  #   #   byte.timeline.setProgress 1
  #   #   expect(byte.el.style.display).toBe 'block'
  #   it 'should hide the el on reverse end', ->
  #     byte = new Byte ctx: svg
  #     byte.timeline.setProgress 1
  #     byte.timeline.setProgress .25
  #     byte.timeline.setProgress 0
  #     expect(byte.el.style.display).toBe 'none'
  #   it 'should not hide the el on reverse end if isShowInit passed', ->
  #     byte = new Byte ctx: svg, isShowInit: true
  #     byte.timeline.setProgress .5
  #     byte.timeline.setProgress 0
  #     expect(byte.el.style.display).toBe 'block'
  # describe '_getRadiusSize method ->', ->
  #   it 'should return max from delatas if key is defined', ->
  #     byte = new Byte radiusX: 20: 30
  #     size = byte._getRadiusSize key: 'radiusX', fallback: 0
  #     expect(size).toBe 30
  #   it 'should return props\' value if delats\' one is not defined ', ->
  #     byte = new Byte radiusX: 20
  #     size = byte._getRadiusSize key: 'radiusX', fallback: 0
  #     expect(size).toBe 20
  #   it 'should fallback to passed fallback option', ->
  #     byte = new Byte
  #     size = byte._getRadiusSize key: 'radiusX', fallback: 0
  #     expect(size).toBe 0
  #   it 'should fallback to 0 by default', ->
  #     byte = new Byte
  #     size = byte._getRadiusSize key: 'radiusX'
  #     expect(size).toBe 0
  # describe 'foreign bit option ->', ->
  #   it 'should receive a foreign bit to work with', ->
  #     svg  = document.createElementNS?(ns, 'svg')
  #     bit  = document.createElementNS?(ns, 'rect')
  #     svg.appendChild bit
  #     byte = new Byte bit: bit
  #     expect(byte.bit.el).toBe bit
  #   it 'should set isForeignBit flag', ->
  #     svg  = document.createElementNS?(ns, 'svg')
  #     bit  = document.createElementNS?(ns, 'rect')
  #     svg.appendChild bit
  #     byte = new Byte bit: bit
  #     expect(byte.isForeignBit).toBe true
  # # redundant
  # # describe 'getBitLength method', ->
  # #   it 'should call getLength method on bit', ->
  # #     byte = new Byte()
  # #     spyOn byte.bit, 'getLength'
  # #     byte.getBitLength()
  # #     expect(byte.bit.getLength).toHaveBeenCalled()
  # #   it 'should cache the value to props', ->
  # #     byte = new Byte()
  # #     byte._props.bitLength = null
  # #     byte.getBitLength()
  # #     expect(byte._props.bitLength).not.toBe null

  # # describe '_overrideUpdateCallbacks method ->', ->
  # #   describe 'onUpdate binding ->', ->
  # #     it 'should override this._o.onUpdate', ->
  # #       tr = new Transit
  # #       o = {}
  # #       tr._overrideUpdateCallbacks( o )
  # #       expect(typeof o.onUpdate).toBe 'function'

  # #     it 'should not override onUpdate function if exists', ->
  # #       isRightScope = null; args = null
  # #       options = {
  # #         onUpdate:->
  # #           # should call callback with default this
  # #           isRightScope = @ is tr
  # #           args = arguments
  # #         }
  # #       tr = new Transit
  # #       tr._overrideUpdateCallbacks( options )
  # #       expect(typeof options.onUpdate).toBe 'function'

  # #       options.onUpdate( .1, .1, true, false )

  # #       expect(isRightScope).toBe true
  # #       expect(args[0]).toBe .1
  # #       expect(args[1]).toBe .1
  # #       expect(args[2]).toBe true
  # #       expect(args[3]).toBe false

  # #     it 'should call _setProgress method', ->
  # #       options = { onUpdate:-> }
  # #       tr = new Transit
  # #       tr._overrideUpdateCallbacks( options )
  # #       spyOn tr, '_setProgress'
  # #       progress = .1
  # #       options.onUpdate( progress, progress, true, false )
  # #       expect(tr._setProgress).toHaveBeenCalledWith progress
  # #   describe 'onFirstUpdate binding ->', ->
  # #     it 'should override onFirstUpdate', ->
  # #       tr = new Transit().then({ fill: 'red' })
  # #       options = {}
  # #       tr._overrideUpdateCallbacks( options )
  # #       expect(typeof options.onFirstUpdate).toBe 'function'

  # #     it 'should not override onFirstUpdate function if exists', ->
  # #       isRightScope = null; args = null
  # #       options = {
  # #         onFirstUpdate:->
  # #           # default this binding
  # #           isRightScope = @ is options
  # #           args = arguments
  # #         }
  # #       tr = new Transit()
  # #       tr._overrideUpdateCallbacks( options )
  # #       expect(typeof options.onFirstUpdate).toBe 'function'

  # #       options.onFirstUpdate( true, false )
  # #       expect(isRightScope).toBe true
  # #       expect(args[0]).toBe true
  # #       expect(args[1]).toBe false

  # #     it 'should call _tuneOptions method', ->
  # #       options = { index: 1, onUpdate:-> }
  # #       tr = new Transit().then({ fill: 'red' })
  # #       tr._overrideUpdateCallbacks( options )

  # #       spyOn tr, '_tuneOptions'
  # #       options.onFirstUpdate( true, false )
  # #       # should be called with index of the tween
  # #       expect(tr._tuneOptions).toHaveBeenCalledWith tr.history[options.index]

  # #     it 'should call _tuneOptions method with history[0] if no index', ->
  # #       options = { onUpdate:-> }
  # #       tr = new Transit().then({ fill: 'red' })
  # #       tr._overrideUpdateCallbacks( options )

  # #       spyOn tr, '_tuneOptions'
  # #       options.onFirstUpdate( false, false )
  # #       # should be called with index of the tween
  # #       expect(tr._tuneOptions).toHaveBeenCalledWith tr.history[0]

  # #     it 'should only call _tuneOptions if history > 1', ->
  # #       options = { onUpdate:-> }
  # #       tr = new Transit()
  # #       tr._overrideUpdateCallbacks( options )

  # #       spyOn tr, '_tuneOptions'
  # #       options.onFirstUpdate( true, false )
  # #       expect(tr._tuneOptions).not.toHaveBeenCalledWith tr.history[0]

  # #     it 'should not call tune options if no index and forward direction', ->
  # #       options = { onUpdate:-> }
  # #       tr = new Transit().then({ fill: 'cyan' })
  # #       tr._overrideUpdateCallbacks( options )

  # #       spyOn tr, '_tuneOptions'
  # #       options.onFirstUpdate( true, false )
  # #       expect(tr._tuneOptions).not.toHaveBeenCalledWith tr.history[0]

  # # describe '_makeTweenControls method ->', ->
  # #   it 'should override this._o.onUpdate', ->
  # #     tr = new Transit
  # #     expect(typeof tr._o.onUpdate).toBe 'function'

  # #   it 'should not override onUpdate function if exists', ->
  # #     isRightScope = null; args = null
  # #     options = {
  # #       onUpdate:->
  # #         isRightScope = @ is tr.tween
  # #         args = arguments
  # #       }
  # #     tr = new Transit options
  # #     expect(typeof tr._o.onUpdate).toBe 'function'

  # #     tr.timeline.setProgress 0
  # #     tr.timeline.setProgress .1
  # #     expect(isRightScope).toBe true

  # #     expect(args[0]).toBe .1
  # #     expect(args[1]).toBe .1
  # #     expect(args[2]).toBe true
  # #     expect(args[3]).toBe false

  # #   it 'should call _setProgress method', ->
  # #     options = { onUpdate:-> }
  # #     tr = new Transit options

  # #     tr.timeline.setProgress 0
  # #     spyOn tr, '_setProgress'
  # #     progress = .1
  # #     tr.timeline.setProgress progress
  # #     expect(tr._setProgress).toHaveBeenCalledWith progress

  # #   it 'should override this._o.onStart', ->
  # #     tr = new Transit
  # #     expect(typeof tr._o.onStart).toBe 'function'

  # #   it 'should not override onStart function if exists', ->
  # #     isRightScope = null; args = null
  # #     options = {
  # #       onStart:->
  # #         isRightScope = @ is tr.tween
  # #         args = arguments
  # #       }
  # #     tr = new Transit options
  # #     expect(typeof tr._o.onStart).toBe 'function'

  # #     tr.timeline.setProgress 0
  # #     tr.timeline.setProgress .1
  # #     expect(isRightScope).toBe true

  # #     expect(args[0]).toBe true
  # #     expect(args[1]).toBe false

  # #   it 'should show module ', ->
  # #     tr = new Transit

  # #     tr.timeline.setProgress 0
  # #     spyOn(tr, '_show').and.callThrough()
  # #     tr.timeline.setProgress .1
  # #     expect(tr._show).toHaveBeenCalled()

  # #   it 'should hide module ', ->
  # #     tr = new Transit

  # #     tr.timeline.setProgress .1
  # #     spyOn(tr, '_hide').and.callThrough()
  # #     tr.timeline.setProgress 0
  # #     expect(tr._hide).toHaveBeenCalled()

  # #   it 'should not hide module is isShowInit was set', ->
  # #     tr = new Transit isShowInit: true

  # #     tr.timeline.setProgress .2
  # #     tr.timeline.setProgress .1
  # #     spyOn(tr, '_hide').and.callThrough()
  # #     tr.timeline.setProgress 0
  # #     expect(tr._hide).not.toHaveBeenCalled()

  # #   it 'should call _overrideUpdateCallbacks method with merged object', ->
  # #     byte = new Byte radius: 20, duration: 1000, delay: 10
  # #     spyOn byte, '_overrideUpdateCallbacks'
  # #     byte._makeTweenControls()
  # #     expect(byte._overrideUpdateCallbacks).toHaveBeenCalledWith( byte._o )

  # # describe '_makeTimelineControls method ->', ->
  # #   it 'should override this._o.onComplete', ->
  # #     tr = new Transit
  # #     expect(typeof tr._o.timeline.onComplete).toBe 'function'

  # #   it 'should not override onUpdate function if exists', ->
  # #     isRightScope = null; args = null
  # #     options = {
  # #       timeline: {
  # #         onComplete:->
  # #           isRightScope = @ is tr.timeline
  # #           args = arguments
  # #         }
  # #       }
  # #     tr = new Transit options
  # #     expect(typeof tr._o.timeline.onComplete).toBe 'function'

  # #     tr.timeline.setProgress 0
  # #     tr.timeline.setProgress .1
  # #     tr.timeline.setProgress .8
  # #     tr.timeline.setProgress 1
  # #     expect(isRightScope).toBe true
  # #     expect(args[0]).toBe true
  # #     expect(args[1]).toBe false

  # #   it 'should call _show method', ->
  # #     tr = new Transit

  # #     tr.timeline.setProgress 1
  # #     spyOn(tr, '_show').and.callThrough()
  # #     tr.timeline.setProgress .9
  # #     expect(tr._show).toHaveBeenCalled()

  # #   it 'should call _hide method', ->
  # #     tr = new Transit

  # #     tr.timeline.setProgress 0
  # #     spyOn(tr, '_hide').and.callThrough()
  # #     tr.timeline.setProgress .1
  # #     tr.timeline.setProgress 1
  # #     expect(tr._hide).toHaveBeenCalled()

  # #   it 'should not call _hide method if isShowEnd is set', ->
  # #     tr = new Transit isShowEnd: true

  # #     tr.timeline.setProgress 0
  # #     spyOn(tr, '_hide').and.callThrough()
  # #     tr.timeline.setProgress .1
  # #     tr.timeline.setProgress 1
  # #     expect(tr._hide).not.toHaveBeenCalled()

  # # describe '_increaseSizeWithEasing method ->', ->
  # #   it 'should increase size based on easing - elastic.out', ->
  # #     tr = new Transit easing: 'elastic.out'

  # #     tr._props.size = 1
  # #     tr._increaseSizeWithEasing()
  # #     expect(tr._props.size).toBe 1.25

  # #   it 'should increase size based on easing - elastic.inout', ->
  # #     tr = new Transit easing: 'elastic.inout'

  # #     tr._props.size = 1
  # #     tr._increaseSizeWithEasing()
  # #     expect(tr._props.size).toBe 1.25

  # #   it 'should increase size based on easing - back.out', ->
  # #     tr = new Transit easing: 'back.out'

  # #     tr._props.size = 1
  # #     tr._increaseSizeWithEasing()
  # #     expect(tr._props.size).toBe 1.1

  # #   it 'should increase size based on easing - back.inout', ->
  # #     tr = new Transit easing: 'back.inout'

  # #     tr._props.size = 1
  # #     tr._increaseSizeWithEasing()
  # #     expect(tr._props.size).toBe 1.1

  # # describe '_increaseSizeWithBitRatio method ->', ->
  # #   it 'should increase size based on bit ratio', ->
  # #     tr = new Transit shape: 'equal'

  # #     tr._props.size = 1
  # #     tr._increaseSizeWithBitRatio()
  # #     expect(tr._props.size).toBe tr.bit.ratio

  # #   it 'should increase size based 2 gap sizes', ->
  # #     gap = 20
  # #     tr = new Transit shape: 'equal', sizeGap: gap

  # #     tr._props.size = 1
  # #     tr._increaseSizeWithBitRatio()
  # #     expect(tr._props.size).toBe tr.bit.ratio + 2*gap




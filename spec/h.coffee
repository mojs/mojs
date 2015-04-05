h  = mojs.helpers
ns = 'http://www.w3.org/2000/svg'

describe 'Helpers ->', ->
  it 'should have logBadgeCss', ->
    expect(h.logBadgeCss).toBeDefined()
  it 'should have RAD_TO_DEG CONSTANT', ->
    expect(h.RAD_TO_DEG).toBe 180/Math.PI
  it 'should have remBase', ->
    expect(typeof h.remBase).toBe 'number'
  it 'should have posPropsMap map', ->
    expect(h.posPropsMap.x).toBe      1
    expect(h.posPropsMap.y).toBe      1
    expect(h.posPropsMap.shiftX).toBe 1
    expect(h.posPropsMap.shiftY).toBe 1

  it 'should have strokeDashPropsMap map', ->
    expect(h.strokeDashPropsMap.strokeDasharray) .toBe    1
    expect(h.strokeDashPropsMap.strokeDashoffset).toBe    1
    expect(Object.keys(h.strokeDashPropsMap).length).toBe  2

  describe 'prefix', ->
    it 'should have prefix', ->
      expect(h.prefix).toBeDefined()
      expect(h.prefix.js).toBeDefined()
      expect(h.prefix.css).toBeDefined()
      expect(h.prefix.lowercase).toBeDefined()
      expect(h.prefix.dom).toBeDefined()
  describe 'browsers detection', ->
    it 'should have browsers flag', ->
      expect(h.isFF).toBeDefined()
      expect(h.isIE).toBeDefined()
      expect(h.isOldOpera).toBeDefined()
  describe 'tween related map ->', ->
    it 'should be a map of tween related options ->', ->
      expect(h.chainOptionMap.duration)         .toBe 1
      expect(h.chainOptionMap.delay)            .toBe 1
      expect(h.chainOptionMap.repeat)           .toBe 1
      expect(h.chainOptionMap.easing)           .toBe 1
      expect(h.chainOptionMap.yoyo)             .toBe 1
      expect(h.chainOptionMap.onStart)          .toBe 1
      expect(h.chainOptionMap.onComplete)       .toBe 1
      expect(h.chainOptionMap.onCompleteChain)  .toBe 1
      expect(h.chainOptionMap.onUpdate)         .toBe 1
      expect(h.chainOptionMap.points)           .toBe 1
      mapLen = Object.keys(h.chainOptionMap).length
      expect(mapLen)                            .toBe 10
  describe 'pure tween props ->', ->
    it 'should be a map of tween related options ->', ->
      expect(h.tweenOptionMap.duration)           .toBe 1
      expect(h.tweenOptionMap.delay)              .toBe 1
      expect(h.tweenOptionMap.repeat)             .toBe 1
      expect(h.tweenOptionMap.easing)             .toBe 1
      expect(h.tweenOptionMap.yoyo)               .toBe 1
      expect(Object.keys(h.tweenOptionMap).length).toBe 5
  describe 'pure callbacks props ->', ->
    it 'should be a map of callback related options ->', ->
      expect(h.callbacksMap.onStart)            .toBe 1
      expect(h.callbacksMap.onUpdate)           .toBe 1
      expect(h.callbacksMap.onComplete)         .toBe 1
      expect(h.callbacksMap.onCompleteChain)    .toBe 1
      expect(Object.keys(h.callbacksMap).length).toBe 4
  describe 'methods ->', ->
    describe 'clamp method', ->
      it 'should clamp value to max and min', ->
        expect(h.clamp(10, 0, 5)) .toBe  5
        expect(h.clamp(-10, 0, 5)).toBe 0
        expect(h.clamp(2, 0, 5))  .toBe 2

    describe 'extend method', ->
      it 'should extend object by other one', ->
        obj1 = a: 1
        obj2 = b: 1
        h.extend(obj1, obj2)
        expect(obj1.a).toBe 1
        expect(obj1.b).toBe 1
        expect(obj2.a).not.toBeDefined()
        expect(obj2.b).toBe 1
    describe 'parseRand method', ->
      it 'should get random number from string', ->
        rand = h.parseRand 'rand(10,20)'
        expect(typeof rand).toBe 'number'
        expect(rand).toBeGreaterThan 9
        expect(rand).not.toBeGreaterThan 20
      it 'should get random number with units', ->
        rand = h.parseRand 'rand(10%,20%)'
        expect(parseFloat rand).toBeGreaterThan      9
        expect(parseFloat rand).not.toBeGreaterThan  20
        expect(rand.match(/\%/)).toBeTruthy()

    describe 'parseStagger method', ->
      it 'should get random number from string', ->
        value = h.parseStagger 'stagger(150)', 3
        expect(typeof value).toBe 'number'
        expect(value).toBe 450
      it 'should get random if was passed', ->
        value = h.parseStagger 'stagger(rand(10%,20%))', 0
        expect(value).toBe '0%'
        
        value = parseInt(h.parseStagger('stagger(rand(10%,20%))', 3), 10)
        expect(value).toBeGreaterThan     29
        expect(value).not.toBeGreaterThan 60

      it 'should get string of unit value', ->
        value = h.parseStagger 'stagger(20%)', 2
        expect(value).toBe '40%'
      it 'should parse stagger with base', ->
        value = h.parseStagger 'stagger(1000, 20)', 2
        expect(value).toBe 1040
      it 'should parse stagger with unit base', ->
        value = h.parseStagger 'stagger(1000%, 20)', 2
        expect(value).toBe '1040%'
      it 'should parse stagger with unit value', ->
        value = h.parseStagger 'stagger(1000, 20%)', 2
        expect(value).toBe '1040%'
      it 'should prefer base units over the value ones', ->
        value = h.parseStagger 'stagger(1000px, 20%)', 2
        expect(value).toBe '1040px'
      it 'should parse value rand values', ->
        value = h.parseStagger 'stagger(500, rand(10,20))', 2
        expect(value).toBeGreaterThan     520
        expect(value).not.toBeGreaterThan 540
      it 'should parse base rand values', ->
        value = h.parseStagger 'stagger(rand(500,600), 20)', 2
        expect(value).toBeGreaterThan     539
        expect(value).not.toBeGreaterThan 640
      it 'should respect units in rands', ->
        value = h.parseStagger 'stagger(rand(500%,600%), 20)', 2
        expect(parseInt(value),10).toBeGreaterThan     539
        expect(parseInt(value),10).not.toBeGreaterThan 639
        expect(value.match /\%/ ).toBeTruthy()

    describe 'parseIfRand method', ->
      it 'should get random number from string if it is rand', ->
        rand = h.parseIfRand 'rand(10,20)'
        expect(typeof rand).toBe 'number'
        expect(rand).toBeGreaterThan 9
        expect(rand).not.toBeGreaterThan 20
      it 'should return the value if it is not a string', ->
        rand = h.parseIfRand 20
        expect(typeof rand).toBe 'number'
        expect(rand).toBe 20

    describe 'rand method', ->
      it 'should return random digit form range', ->
        expect(h.rand(10, 20)).toBeGreaterThan      9
        expect(h.rand(10, 20)).not.toBeGreaterThan  20
      it 'should work with negative numbers', ->
        expect(h.rand(-10, -20)).toBeGreaterThan      -20
        expect(h.rand(-10, -20)).not.toBeGreaterThan  -10
      it 'should work with mixed numbers', ->
        expect(h.rand(-10, 20)).toBeGreaterThan      -10
        expect(h.rand(-10, 20)).not.toBeGreaterThan  20
      it 'should work with float numbers', ->
        expect(h.rand(.2, .9)).toBeGreaterThan      .1
        expect(h.rand(.2, .9)).not.toBeGreaterThan  .9
    describe 'getDelta method ->', ->
      describe 'numeric values ->', ->
        it 'should calculate delta', ->
          delta = h.parseDelta 'radius', {25: 75}
          expect(delta.start)   .toBe   25
          expect(delta.delta)   .toBe   50
          expect(delta.type)    .toBe   'number'
        it 'should calculate delta with string arguments', ->
          delta = h.parseDelta 'radius', {25: 75}
          expect(delta.start)   .toBe   25
          expect(delta.delta)   .toBe   50
        it 'should calculate delta with float arguments', ->
          delta = h.parseDelta 'radius',  {'25.50': 75.50}
          expect(delta.start)   .toBe   25.5
          expect(delta.delta)   .toBe   50
        it 'should calculate delta with negative start arguments', ->
          delta = h.parseDelta 'radius',  {'-25.50': 75.50}
          expect(delta.start)   .toBe   -25.5
          expect(delta.delta)   .toBe   101
        it 'should calculate delta with negative end arguments', ->
          delta = h.parseDelta 'radius',  {'25.50': -75.50}
          expect(delta.start)   .toBe   25.5
          expect(delta.end)     .toBe   -75.5
          expect(delta.delta)   .toBe   -101

        it 'should fallback to declared units if one of them is not defined', ->
          delta = h.parseDelta 'x',  {'25.50%': -75.50}

          expect(delta.start.unit)    .toBe   '%'
          expect(delta.start.value)   .toBe   25.5
          expect(delta.start.string)  .toBe   '25.5%'

          expect(delta.end.unit)    .toBe   '%'
          expect(delta.end.value)   .toBe   -75.5
          expect(delta.end.string)  .toBe   '-75.5%'

        it 'should fallback to declared units if one of them defined #2', ->
          delta = h.parseDelta 'x',  {'25.50': '-75.50%'}

          expect(delta.start.unit)    .toBe   '%'
          expect(delta.start.value)   .toBe   25.5
          expect(delta.start.string)  .toBe   '25.5%'

          expect(delta.end.unit)    .toBe   '%'
          expect(delta.end.value)   .toBe   -75.5
          expect(delta.end.string)  .toBe   '-75.5%'

        it 'should fallback to end units if two units undefined and warn', ->
          spyOn h, 'warn'
          delta = h.parseDelta 'x',  {'25.50%': '-75.50px'}
          expect(h.warn).toHaveBeenCalled()

          expect(delta.start.unit)    .toBe   'px'
          expect(delta.start.value)   .toBe   25.5
          expect(delta.start.string)  .toBe   '25.5px'

          expect(delta.end.unit)    .toBe   'px'
          expect(delta.end.value)   .toBe   -75.5
          expect(delta.end.string)  .toBe   '-75.5px'

        it 'should not warn with the same units', ->
          spyOn h, 'warn'
          delta = h.parseDelta 'x',  {'25.50%': '-75.50%'}
          expect(h.warn).not.toHaveBeenCalled()

        it 'should work with strokeDash.. properties', ->
          delta = h.parseDelta 'strokeDashoffset',  {'25.50': '-75.50%'}

          expect(delta.start[0].unit)    .toBe   '%'
          expect(delta.start[0].value)   .toBe   25.5
          expect(delta.start[0].string)  .toBe   '25.5%'

          expect(delta.end[0].unit)    .toBe   '%'
          expect(delta.end[0].value)   .toBe   -75.5
          expect(delta.end[0].string)  .toBe   '-75.5%'

        it 'should work with strokeDash.. properties #2', ->
          delta = h.parseDelta 'strokeDashoffset',  {'25.50%': '-75.50'}
          expect(delta.start[0].unit)    .toBe   '%'
          expect(delta.start[0].value)   .toBe   25.5
          expect(delta.start[0].string)  .toBe   '25.5%'

          expect(delta.end[0].unit)    .toBe   '%'
          expect(delta.end[0].value)   .toBe   -75.5
          expect(delta.end[0].string)  .toBe   '-75.5%'
        
        it 'should work with strokeDash.. properties #3', ->
          delta = h.parseDelta 'strokeDashoffset',  {'25.50%': '-75.50px'}

          expect(delta.start[0].unit)    .toBe   'px'
          expect(delta.start[0].value)   .toBe   25.5
          expect(delta.start[0].string)  .toBe   '25.5px'

          expect(delta.end[0].unit)    .toBe   'px'
          expect(delta.end[0].value)   .toBe   -75.5
          expect(delta.end[0].string)  .toBe   '-75.5px'

      describe 'color values ->', ->
        it 'should calculate color delta', ->
          delta = h.parseDelta 'stroke',  {'#000': 'rgb(255,255,255)'}
          expect(delta.start.r)    .toBe   0
          expect(delta.end.r)      .toBe   255
          expect(delta.delta.r)    .toBe   255
          expect(delta.type)       .toBe   'color'
        it 'should ignore stroke-linecap prop, use start prop and warn', ->
          spyOn console, 'warn'
          delta = h.parseDelta 'strokeLinecap', {'round': 'butt'}
          expect(-> h.parseDelta 'strokeLinecap', {'round': 'butt'})
            .not.toThrow()
          expect(console.warn).toHaveBeenCalled()
          expect(delta.type).not.toBeDefined()
      describe 'array values ->', ->
        it 'should calculate array delta', ->
          delta = h.parseDelta 'strokeDasharray', { '200 100%': '300' }
          expect(delta.type)           .toBe   'array'
          expect(delta.start[0].value) .toBe   200
          expect(delta.start[0].unit)  .toBe   'px'
          expect(delta.end[0].value)   .toBe   300
          expect(delta.end[0].unit)    .toBe   'px'
          expect(delta.start[1].value) .toBe   100
          expect(delta.start[1].unit)  .toBe   '%'
          expect(delta.end[1].value)   .toBe   0
          expect(delta.end[1].unit)    .toBe   '%'

      describe 'unit values ->', ->
        it 'should calculate unit delta', ->
          delta = h.parseDelta 'x', {'0%': '100%'}
          expect(delta.start.string)    .toBe   '0%'
          expect(delta.end.string)      .toBe   '100%'
          expect(delta.delta)           .toBe   100
          expect(delta.type)            .toBe   'unit'
      describe 'tween-related values ->', ->
        it 'should not calc delta for tween related props', ->
          delta = h.parseDelta 'duration', {'2000': 1000}
          expect(delta.type).not.toBeDefined()
      describe 'rand values ->', ->
        it 'should calculate unit delta', ->
          delta = h.parseDelta 'x', { 'rand(2, 20)': 'rand(0, 5)' }
          expect(delta.start.value).toBeGreaterThan     -1
          expect(delta.start.value).not.toBeGreaterThan 20
          expect(delta.end.value).toBeGreaterThan     -1
          expect(delta.end.value).not.toBeGreaterThan 5

    describe 'computedStyle method', ->
      it 'should return computed styles',->
        document.body.style['fontSize'] = '10px'
        expect(h.computedStyle(document.body).fontSize).toBe '10px'
      it 'should call getComputedStyle under the hood',->
        spyOn window, 'getComputedStyle'
        h.computedStyle(document.body)
        expect(window.getComputedStyle).toHaveBeenCalled()
    describe 'getRemBase method', ->
      it 'should return remBase', ->
        expect(h.getRemBase()).toBeDefined()
        expect(typeof h.getRemBase()).toBe 'number'
      it 'should set remBase to h', ->
        h.getRemBase()
        expect(h.remBase).toBe 16
    describe 'logging methods', ->
      describe 'prepareForLog method', ->
        it 'should prepare for arguments for logging', ->
          prepared = h.prepareForLog [ 'message' ]
          expect(prepared[0]).toBe '%cmo·js%c'
          expect(prepared[1]).toBe h.logBadgeCss
          expect(prepared[2]).toBe '::'
          expect(prepared[3]).toBe 'message'
      describe 'log method', ->
        it 'should log to console',->
          spyOn console, 'log'
          h.log 'something'
          expect(console.log).toHaveBeenCalled()
        it 'should not log to console if !isDebug',->
          mojs.isDebug = false
          spyOn console, 'log'
          h.log 'something'
          expect(console.log).not.toHaveBeenCalled()
          mojs.isDebug = true
        it 'should prepend mojs badge to message',->
          spyOn console, 'log'
          h.log 'smth'
          expect(console.log)
            .toHaveBeenCalledWith '%cmo·js%c', h.logBadgeCss, '::', 'smth'
      describe 'warn method', ->
        it 'should warn to console',->
          spyOn console, 'warn'
          h.warn 'something'
          expect(console.warn).toHaveBeenCalled()
        it 'should not warn to console if !isDebug',->
          mojs.isDebug = false
          spyOn console, 'warn'
          h.warn 'something'
          expect(console.warn).not.toHaveBeenCalled()
          mojs.isDebug = true
        it 'should prepend mojs badge to message',->
          spyOn console, 'warn'
          h.warn 'smth'
          expect(console.warn)
            .toHaveBeenCalledWith '%cmo·js%c', h.logBadgeCss, '::', 'smth'
      describe 'error method', ->
        it 'should error to console',->
          spyOn console, 'error'
          h.error 'something'
          expect(console.error).toHaveBeenCalled()
        it 'should not error to console if !isDebug',->
          mojs.isDebug = false
          spyOn console, 'error'
          h.error 'something'
          expect(console.error).not.toHaveBeenCalled()
          mojs.isDebug = true
        it 'should prepend mojs badge to message',->
          spyOn console, 'error'
          h.error 'smth'
          expect(console.error)
            .toHaveBeenCalledWith '%cmo·js%c', h.logBadgeCss, '::', 'smth'
    describe 'setPrefixedStyle method', ->
      it 'should set prefixed style', ->
        el = document.createElement 'div'
        h.setPrefixedStyle el, 'transform', 'translate(20px, 10px)'
        prefixed = "#{h.prefix.css}transform"
        expect(el.style[prefixed]).toBe 'translate(20px, 10px)'
        expect(el.style['transform']).toBe         'translate(20px, 10px)'
    describe 'parseUnit method', ->
      it 'should parse number to pixels', ->
        unit = h.parseUnit(100)
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'px'
        expect(unit.string)   .toBe '100px'
      it 'should parse unitless string', ->
        unit = h.parseUnit('100')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'px'
        expect(unit.string)   .toBe '100px'
      it 'should parse pixel string', ->
        unit = h.parseUnit('100px')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'px'
        expect(unit.string)   .toBe '100px'
      it 'should parse percent string', ->
        unit = h.parseUnit('100%')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe '%'
        expect(unit.string)   .toBe '100%'
      it 'should parse rem string', ->
        unit = h.parseUnit('100rem')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'rem'
        expect(unit.string)   .toBe '100rem'
      it 'should parse em string', ->
        unit = h.parseUnit('100em')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'em'
        expect(unit.string)   .toBe '100em'
      it 'should parse ex string', ->
        unit = h.parseUnit('100ex')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'ex'
        expect(unit.string)   .toBe '100ex'
      it 'should parse cm string', ->
        unit = h.parseUnit('100cm')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'cm'
        expect(unit.string)   .toBe '100cm'
      it 'should parse mm string', ->
        unit = h.parseUnit('100mm')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'mm'
        expect(unit.string)   .toBe '100mm'
      it 'should parse in string', ->
        unit = h.parseUnit('100in')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'in'
        expect(unit.string)   .toBe '100in'
      it 'should parse pt string', ->
        unit = h.parseUnit('100pt')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'pt'
        expect(unit.string)   .toBe '100pt'
      it 'should parse pc string', ->
        unit = h.parseUnit('100pc')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'pc'
        expect(unit.string)   .toBe '100pc'
      it 'should parse ch string', ->
        unit = h.parseUnit('100ch')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'ch'
        expect(unit.string)   .toBe '100ch'
      it 'should parse vh string', ->
        unit = h.parseUnit('100vh')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'vh'
        expect(unit.string)   .toBe '100vh'
      it 'should parse vw string', ->
        unit = h.parseUnit('100vw')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'vw'
        expect(unit.string)   .toBe '100vw'
      it 'should parse vmin string', ->
        unit = h.parseUnit('100vmin')
        expect(unit.value)    .toBe 100
        expect(unit.unit)     .toBe 'vmin'
        expect(unit.string)   .toBe '100vmin'
      it 'should return value if is not string nor number', ->
        obj = {20:30}
        unit = h.parseUnit(obj)
        expect(unit).toBe obj
      it 'should detect if unit if strict', ->
        unit = h.parseUnit(100)
        expect(unit.isStrict).toBe false
        unit = h.parseUnit('100px')
        expect(unit.isStrict).toBe true

    describe 'strToArr method', ->
      it 'should parse string to array',->
        array = h.strToArr('200 100')
        expect(array[0].value).toBe 200
        expect(array[0].unit).toBe  'px'
      it 'should parse % string to array',->
        array = h.strToArr('200% 100')
        expect(array[0].value).toBe 200
        expect(array[0].unit).toBe  '%'
        expect(array[1].value).toBe 100
        expect(array[1].unit).toBe  'px'
      it 'should parse number to array',->
        array = h.strToArr(200)
        expect(array[0].value).toBe 200
        expect(array[0].unit).toBe  'px'
      it 'should parse string with multiple spaces to array',->
        array = h.strToArr('200   100%')
        expect(array[0].value).toBe 200
        expect(array[0].unit).toBe  'px'
        expect(array[1].value).toBe 100
        expect(array[1].unit).toBe  '%'
      it 'should trim string before parse',->
        array = h.strToArr('  200   100% ')
        expect(array[0].value).toBe 200
        expect(array[0].unit).toBe  'px'
        expect(array[1].value).toBe 100
        expect(array[1].unit).toBe  '%'
      it 'should parse rand values',->
        array = h.strToArr('  200   rand(10,20) ')
        expect(array[0].value).toBe 200
        expect(array[0].unit).toBe  'px'
        expect(array[1].value).toBeGreaterThan     10
        expect(array[1].value).not.toBeGreaterThan 20
        expect(array[1].unit).toBe  'px'

    describe 'normDashArrays method', ->
      it 'should normalize two inconsistent dash arrays', ->
        arr1 = [h.parseUnit(100), h.parseUnit(500)]
        arr2 = [h.parseUnit(150), h.parseUnit(200), h.parseUnit(307)]
        h.normDashArrays(arr1, arr2)
        expect(arr1[0].value).toBe 100
        expect(arr1[0].unit) .toBe 'px'
        expect(arr1[1].value).toBe 500
        expect(arr1[1].unit) .toBe 'px'
        expect(arr1[2].value).toBe 0
        expect(arr1[2].unit) .toBe 'px'
        expect(arr2[0].value).toBe 150
        expect(arr2[0].unit) .toBe 'px'
        expect(arr2[1].value).toBe 200
        expect(arr2[1].unit) .toBe 'px'
        expect(arr2[2].value).toBe 307
        expect(arr2[2].unit) .toBe 'px'
      it 'should copy units from the another array', ->
        arr1 = [h.parseUnit(100), h.parseUnit(500)]
        arr2 = [h.parseUnit(150), h.parseUnit(200), h.parseUnit('307%')]
        h.normDashArrays(arr1, arr2)
        expect(arr1[0].value).toBe 100
        expect(arr1[0].unit) .toBe 'px'
        expect(arr1[1].value).toBe 500
        expect(arr1[1].unit) .toBe 'px'
        expect(arr1[2].value).toBe 0
        expect(arr1[2].unit) .toBe '%'
        expect(arr1.length)  .toBe 3
        expect(arr2[0].value).toBe 150
        expect(arr1[0].unit) .toBe 'px'
        expect(arr2[1].value).toBe 200
        expect(arr1[1].unit) .toBe 'px'
        expect(arr2[2].value).toBe 307
        expect(arr2[2].unit) .toBe '%'
        expect(arr2.length)  .toBe 3
      it 'should copy units from the another array #2', ->
        arr1 = [h.parseUnit(100), h.parseUnit(500), h.parseUnit('500%')]
        arr2 = [h.parseUnit('150%')]
        h.normDashArrays(arr1, arr2)
        expect(arr1[0].value).toBe 100
        expect(arr1[0].unit) .toBe 'px'
        expect(arr1[1].value).toBe 500
        expect(arr1[1].unit) .toBe 'px'
        expect(arr1[2].value).toBe 500
        expect(arr1[2].unit) .toBe '%'
        expect(arr1.length)  .toBe 3
        expect(arr2[0].value).toBe 150
        expect(arr2[0].unit) .toBe '%'
        expect(arr2[1].value).toBe 0
        expect(arr2[1].unit) .toBe 'px'
        expect(arr2[2].value).toBe 0
        expect(arr2[2].unit) .toBe '%'
        expect(arr2.length)  .toBe 3
      
    describe 'isArray method', ->
      it 'should check if variable is array', ->
        expect(h.isArray []).toBe true
        expect(h.isArray {}).toBe false
        expect(h.isArray '').toBe false
        expect(h.isArray 2).toBe false
        expect(h.isArray NaN).toBe false
        expect(h.isArray null).toBe false
        expect(h.isArray()).toBe false

    describe 'calcArrDelta method', ->
      it 'should calculate delta of two arrays', ->
        arr1 = [h.parseUnit(200), h.parseUnit(300), h.parseUnit('100%')]
        arr2 = [h.parseUnit(250), h.parseUnit(150), h.parseUnit('0%')]
        delta = h.calcArrDelta arr1, arr2
        expect(delta[0].value).toBe 50
        expect(delta[0].unit) .toBe 'px'

        expect(delta[1].value).toBe -150
        expect(delta[1].unit) .toBe 'px'

        expect(delta[2].value).toBe -100
        expect(delta[2].unit) .toBe '%'
      # NOT SURE IF NEEDED
      # it 'should should throw if on of the args are not arrays', ->
      #   expect(-> h.calcArrDelta([200, 300, 100], 'a')).toThrow()
      #   expect(-> h.calcArrDelta('a', [200, 300, 100])).toThrow()
      # it 'should should throw if less then 2 arrays passed', ->
      #   expect(-> h.calcArrDelta [200, 300, 100]).toThrow()
      #   expect(-> h.calcArrDelta()).toThrow()
      
    describe 'getRadialPoint', ->
      it 'should calculate radial point', ->
        point = h.getRadialPoint
          radius: 50
          angle:  90
          center: x: 50, y: 50
        expect(point.x).toBe 100
        expect(point.y).toBe 50
      it 'should with radiusX and fallback to radius', ->
        point = h.getRadialPoint
          radius: 50
          radiusX:100
          angle:  90
          center: x: 50, y: 50
        expect(point.x).toBe 150
        expect(point.y).toBe 50
      it 'should with radiusY and fallback to radius', ->
        point = h.getRadialPoint
          radius: 50
          radiusY:100
          angle:  0
          center: x: 50, y: 50
        expect(point.x).toBe 50
        expect(point.y).toBe -50
      it 'should return false if 1 of 3 options missed', ->
        point = h.getRadialPoint
          radius: 50
          angle:  90
        expect(point).toBeFalsy()
      it 'should return false only if 1 of 3 options missed but not falsy', ->
        point = h.getRadialPoint
          radius: 0
          angle:  90
          center: x: 0, y: 0
        expect(point).toBeTruthy()
      it 'options should have default empty object', ->
        point = h.getRadialPoint()
        expect(point).toBeFalsy()
        expect(h.getRadialPoint).not.toThrow()

    describe 'cloneObj method', ->
      it 'should clone object', ->
        obj = { a: 2, b: 3 }
        clonedObj = h.cloneObj(obj)
        expect(clonedObj.a).toBe 2
        expect(clonedObj.b).toBe 3
        expect(Object.keys(clonedObj).length).toBe 2
      it 'should exclude defined keys', ->
        obj = { a: 2, b: 3 }
        exclude = { a: 1 }
        clonedObj = h.cloneObj(obj, exclude)
        expect(clonedObj.b).toBe 3
        expect(clonedObj.a).not.toBeDefined()
        expect(Object.keys(clonedObj).length).toBe 1

    describe 'capitalize method', ->
      it 'should capitalize strings', ->
        expect(h.capitalize 'hello there').toBe 'Hello there'
      it 'should should throw if bad string was passed', ->
        expect(-> h.capitalize()).toThrow()
      it 'should should not throw with empty strings', ->
        expect(-> h.capitalize('')).not.toThrow()
    describe 'splitEasing method', ->
      it 'should split easing string to array',->
        expect(h.splitEasing('Linear.None')[0]).toBe 'linear'
        expect(h.splitEasing('Linear.None')[1]).toBe 'none'
      it 'should return default easing Linear.None if argument is bad', ->
        expect(h.splitEasing(4)[0]).toBe 'linear'
        expect(h.splitEasing(4)[1]).toBe 'none'
      it 'should return default easing Linear.None if argument is bad #2', ->
        expect(h.splitEasing('')[0]).toBe 'linear'
        expect(h.splitEasing('')[1]).toBe 'none'
      it 'should return default easing Linear.None if argument is bad #3', ->
        expect(h.splitEasing('Linear..None')[0]).toBe 'linear'
        expect(h.splitEasing('Linear..None')[1]).toBe 'none'
      it 'should work with lovercase easing', ->
        expect(h.splitEasing('linear..none')[0]).toBe 'linear'
        expect(h.splitEasing('linear..none')[1]).toBe 'none'
      it 'should work with function easing', ->
        easing = -> console.log 'function'
        expect(h.splitEasing(easing)+'').toBe easing+''
    describe 'color parsing - makeColorObj method', ->
      it 'should have shortColors map', ->
        expect(h.shortColors).toBeDefined()
      it 'should have div node', ->
        expect(h.div.tagName.toLowerCase()).toBe 'div'
      it 'should parse 3 hex color', ->
        colorObj = h.makeColorObj '#f0f'
        expect(colorObj.r)  .toBe 255
        expect(colorObj.g)  .toBe 0
        expect(colorObj.b)  .toBe 255
        expect(colorObj.a)  .toBe 1
      it 'should parse 6 hex color', ->
        colorObj = h.makeColorObj '#0000ff'
        expect(colorObj.r)  .toBe 0
        expect(colorObj.g)  .toBe 0
        expect(colorObj.b)  .toBe 255
        expect(colorObj.a)  .toBe 1
      it 'should parse color shorthand', ->
        colorObj = h.makeColorObj 'deeppink'
        expect(colorObj.r)  .toBe 255
        expect(colorObj.g)  .toBe 20
        expect(colorObj.b)  .toBe 147
        expect(colorObj.a)  .toBe 1
      it 'should parse rgb color', ->
        colorObj = h.makeColorObj 'rgb(200,100,0)'
        expect(colorObj.r)  .toBe 200
        expect(colorObj.g)  .toBe 100
        expect(colorObj.b)  .toBe 0
        expect(colorObj.a)  .toBe 1
      it 'should parse rgba color', ->
        colorObj  = h.makeColorObj 'rgba(0,200,100,.1)'
        expect(colorObj.r)  .toBe 0
        expect(colorObj.g)  .toBe 200
        expect(colorObj.b)  .toBe 100
        expect(colorObj.a)  .toBe .1
      it 'should parse rgba color with float starting by 0', ->
        colorObj = h.makeColorObj 'rgba(0,200,100,0.5)'
        expect(colorObj.r)  .toBe 0
        expect(colorObj.g)  .toBe 200
        expect(colorObj.b)  .toBe 100
        expect(colorObj.a)  .toBe .5
    describe 'isDOM method ->', ->
      it 'should detect if object is DOM node #1', ->
        expect(h.isDOM('string')).toBe false
      it 'should detect if object is DOM node #2', ->
        expect(h.isDOM({})).toBe false
      it 'should detect if object is DOM node #3', ->
        expect(h.isDOM([])).toBe false
      it 'should detect if object is DOM node #4', ->
        expect(h.isDOM({})).toBe false
      it 'should detect if object is DOM node #5', ->
        expect(h.isDOM(null)).toBe false
      it 'should detect if object is DOM node #6', ->
        expect(h.isDOM(document.createElement 'div')).toBe true
      it 'should detect if object is DOM node #7', ->
        expect(h.isDOM(document.createElementNS ns, 'g')).toBe true
      # it 'should Node is function it should check if object is instance', ->
      #   expect(h.isDOM(document.body)).toBe document.body instanceof Node

  describe 'getChildElements method', ->
    ns    = 'http://www.w3.org/2000/svg'
    els   = document.createElementNS ns, 'g'
    path1 = document.createElementNS ns, 'path'
    path2 = document.createElementNS ns, 'path'
    els.appendChild(path1); els.appendChild path2
    it 'should return els children', ->
      expect(h.getChildElements(els).length).toBe 2
    it 'should return an array', ->
      expect(h.isArray(h.getChildElements(els))).toBe true
    it 'should filter text nodes', ->
      els.appendChild document.createTextNode 'hey'
      expect(h.getChildElements(els).length).toBe 2


  describe 'mergeUnits method', ->
    it 'should merge units if end one was not defined', ->
      start = { unit: '%',  value: 25, string: '25%', isStrict: true }
      end   = { unit: 'px', value: 50, string:'50px', isStrict: false }
      h.mergeUnits start, end, 'key'
      expect(end.unit)  .toBe '%'
      expect(end.string).toBe '50%'

    it 'should merge units if start one was not defined', ->
      start = { unit: '%',  value: 25, string: '25%', isStrict: false }
      end   = { unit: 'px', value: 50, string:'50px', isStrict: true }
      h.mergeUnits start, end, 'key'
      expect(start.unit)  .toBe 'px'
      expect(start.string).toBe '25px'

    it 'should fallback to end unit if two were defined and warn', ->
      start = { unit: 'px', value: 25, string: '25px', isStrict: true }
      end   = { unit: '%',  value: 50, string:'50%',   isStrict: true }
      spyOn h, 'warn'
      h.mergeUnits start, end, 'key'
      expect(start.unit)  .toBe '%'
      expect(start.string).toBe '25%'
      expect(h.warn).toHaveBeenCalled()

  describe 'delta method', ->
    it 'should create object from variables', ->
      start = 0; end = 1
      delta = h.delta(start, end)
      expect(delta[0]).toBe 1
    it 'should work with strings', ->
      start = '0'; end = 1
      delta = h.delta(start, end)
      expect(delta['0']).toBe 1
    it 'should error if unexpected types', ->
      start = (->); end = 1
      spyOn mojs.helpers, 'error'
      delta = h.delta(start, end)
      expect(mojs.helpers.error).toHaveBeenCalled()
      expect(delta).toBe undefined
    it 'should error if unexpected types #2', ->
      start = 2; end = (->)
      spyOn mojs.helpers, 'error'
      delta = h.delta(start, end)
      expect(mojs.helpers.error).toHaveBeenCalled()
      expect(delta).toBe undefined
    it 'should error if unexpected types #3', ->
      start = 2; end = {}
      spyOn mojs.helpers, 'error'
      delta = h.delta(start, end)
      expect(mojs.helpers.error).toHaveBeenCalled()
      expect(delta).toBe undefined
    it 'should error if unexpected types #4', ->
      start = {}; end = 2
      spyOn mojs.helpers, 'error'
      delta = h.delta(start, end)
      expect(mojs.helpers.error).toHaveBeenCalled()
      expect(delta).toBe undefined
    it 'should not work with NaN arguments', ->
      start = NaN; end = 2
      spyOn mojs.helpers, 'error'
      delta = h.delta(start, end)
      expect(mojs.helpers.error).toHaveBeenCalled()
      expect(delta).toBe undefined
    it 'should not work with NaN arguments #2', ->
      start = '2'; end = NaN
      spyOn mojs.helpers, 'error'
      delta = h.delta(start, end)
      expect(mojs.helpers.error).toHaveBeenCalled()
      expect(delta).toBe undefined





h  = mojs.helpers

describe 'Helpers ->', ->
  it 'should have logBadgeCss', ->
    expect(h.logBadgeCss).toBeDefined()
  it 'should have remBase', ->
    expect(typeof h.remBase).toBe 'number'
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
  describe 'tween related map ->', ->
    it 'should be a map of tween related options ->', ->
      expect(h.tweenOptionMap.duration)         .toBe 1
      expect(h.tweenOptionMap.delay)            .toBe 1
      expect(h.tweenOptionMap.repeat)           .toBe 1
      expect(h.tweenOptionMap.easing)           .toBe 1
      expect(h.tweenOptionMap.yoyo)             .toBe 1
      expect(h.tweenOptionMap.onStart)          .toBe 1
      expect(h.tweenOptionMap.onComplete)       .toBe 1
      expect(h.tweenOptionMap.onCompleteChain)  .toBe 1
      expect(h.tweenOptionMap.onUpdate)         .toBe 1
      expect(h.tweenOptionMap.points)           .toBe 1
      mapLen = Object.keys(h.tweenOptionMap).length
      expect(mapLen)                            .toBe 10
  describe 'methods ->', ->
    describe 'computedStyle method', ->
      it 'should return computed styles',->
        document.body.style['font-size'] = '10px'
        expect(h.computedStyle(document.body)).toBeDefined()
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
        it 'should prepend mojs badge to message',->
          spyOn console, 'error'
          h.error 'smth'
          expect(console.error)
            .toHaveBeenCalledWith '%cmo·js%c', h.logBadgeCss, '::', 'smth'
    describe 'setPrefixedStyle method', ->
      it 'should set prefixed style', ->
        el = document.createElement 'div'
        h.setPrefixedStyle el, 'transform', 'translate(20px, 10px)'
        expect(el.style['-webkit-transform']).toBe 'translate(20px, 10px)'
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
    describe 'strToArr method', ->
      it 'should parse string to array',->
        expect(h.strToArr('200 100').join ' ').toBe '200 100'
      it 'should parse number to array',->
        expect(h.strToArr(200).join ' ').toBe '200'
      it 'should parse string with multiple spaces to array',->
        expect(h.strToArr('200   100').join ' ').toBe '200 100'
      it 'should trim string before parse',->
        expect(h.strToArr(' 200   100 ').join ' ').toBe '200 100'
      it 'should return array of numbers',->
        expect(h.strToArr(' 200.5   100 ')[0]).toBe 200.5
      it 'should throw if parsing fails',->
        expect(-> h.strToArr(' 200.5 ,  100 ')).toThrow()
    describe 'normDashArrays method', ->
      it 'should normalize two inconsistent dash arrays', ->
        arr1 = [100, 500]; arr2 = [150, 200, 300.7]
        h.normDashArrays(arr1, arr2)
        expect(arr1.join(' ')).toBe '100 500 0'
      it 'should normalize MODIFY passed arrays', ->
        arr1 = [100]; arr2 = [150, 200, 25]
        h.normDashArrays(arr1, arr2)
        expect(arr1.join(' ')).toBe '100 0 0'
      it 'should normalize two inconsistent dash arrays #2', ->
        arr1 = [100, 500]; arr2 = [150]
        h.normDashArrays(arr1, arr2)
        expect(arr1.join(' ')).toBe '100 500'
      it 'should normalize two inconsistent dash arrays #3', ->
        arr1 = [100]; arr2 = [150, 200, 17.5]
        h.normDashArrays(arr1, arr2)
        expect(arr2.join(' ')).toBe '150 200 17.5'
      it 'should should throw if one arg or nothing was passed', ->
        expect(-> h.normDashArrays([100, 500])).toThrow()
        expect(-> h.normDashArrays()).toThrow()
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
      it 'should should throw if on of the args are not arrays', ->
        expect(-> h.calcArrDelta([200, 300, 100], 'a')).toThrow()
        expect(-> h.calcArrDelta('a', [200, 300, 100])).toThrow()

      it 'should should throw if less then 2 arrays passed', ->
        expect(-> h.calcArrDelta [200, 300, 100]).toThrow()
        expect(-> h.calcArrDelta()).toThrow()
      it 'should calculate delta of two arrays', ->
        arr1 = [200, 300, 100]; arr2 = [250, 150, 0]
        delta = h.calcArrDelta arr1, arr2
        expect(delta.join ' ').toBe '50 -150 -100'
    describe 'getRadialPoint', ->
      it 'should calculate radial point', ->
        point = h.getRadialPoint
          radius: 50
          angle:  90
          center: x: 50, y: 50
        expect(point.x).toBe 100
        expect(point.y).toBe 50
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

    describe 'capitalize method', ->
      it 'should capitalize strings', ->
        expect(h.capitalize 'hello there').toBe 'Hello there'
      it 'should should throw if bad string was passed', ->
        expect(-> h.capitalize()).toThrow()
      it 'should should not throw with empty strings', ->
        expect(-> h.capitalize('')).not.toThrow()
    describe 'splitEasing method', ->
      it 'should split easing string to array',->
        expect(h.splitEasing('Linear.None')[0]).toBe 'Linear'
        expect(h.splitEasing('Linear.None')[1]).toBe 'None'
      it 'should return default easing Linear.None if argument is bad', ->
        expect(h.splitEasing(4)[0]).toBe 'Linear'
        expect(h.splitEasing(4)[1]).toBe 'None'
      it 'should return default easing Linear.None if argument is bad #2', ->
        expect(h.splitEasing('')[0]).toBe 'Linear'
        expect(h.splitEasing('')[1]).toBe 'None'
      it 'should return default easing Linear.None if argument is bad #3', ->
        expect(h.splitEasing('Linear..None')[0]).toBe 'Linear'
        expect(h.splitEasing('Linear..None')[1]).toBe 'None'
      it 'should work with lovercase easing', ->
        expect(h.splitEasing('linear..none')[0]).toBe 'Linear'
        expect(h.splitEasing('linear..none')[1]).toBe 'None'
      it 'should work with function easing', ->
        easing = -> console.log 'function'
        expect(h.splitEasing(easing)+'').toBe easing+''
    describe 'color parsing - makeColorObj method', ->
      it 'should have shortColors map', ->
        expect(h.shortColors).toBeDefined()
      it 'should have posPropsMap map', ->
        expect(h.posPropsMap.x).toBe      1
        expect(h.posPropsMap.y).toBe      1
        expect(h.posPropsMap.shiftX).toBe 1
        expect(h.posPropsMap.shiftY).toBe 1
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
    describe 'animation loop ->', ->
      it 'should have TWEEN object', ->
        expect(h.TWEEN).toBeDefined()
      it 'update Tweens on loop', (dfr)->
        spyOn h.TWEEN, 'update'
        tween = new h.TWEEN.Tween({p:0}).to({p:1}, 120)
          .start()
        h.startAnimationLoop()
        setTimeout ->
          expect(h.TWEEN.update).toHaveBeenCalled()
          dfr()
        , 34
      it 'should start animation loop', (dfr)->
        spyOn h, 'animationLoop'
        h.startAnimationLoop()
        setTimeout ->
          expect(h.animationLoop).toHaveBeenCalled()
          dfr()
        , 160
      it 'should stop animation loop', (dfr)->
        h.stopAnimationLoop()
        setTimeout ->
          spyOn h, 'animationLoop'
          setTimeout ->
            expect(h.animationLoop).not.toHaveBeenCalled()
            dfr()
          , 34
        , 20

      it 'should stop itself if there is no tween left', (dfr)->
        tween = new h.TWEEN.Tween({p:0}).to({p:1}, 20)
          .start()
        h.startAnimationLoop()
        setTimeout ->
          h.TWEEN.removeAll()
          spyOn h, 'animationLoop'
          setTimeout ->
            expect(h.animationLoop).not.toHaveBeenCalled()
            expect(h.isAnimateLoop).toBe false
            dfr()
          , 84
        , 34

      it 'should start only 1 concurrent loop', (dfr)->
        h.stopAnimationLoop()
        setTimeout ->
          spyOn h, 'animationLoop'
          h.isAnimateLoop = true
          h.startAnimationLoop()
          setTimeout ->
            expect(h.animationLoop).not.toHaveBeenCalled()
            h.isAnimateLoop = false
            dfr()
          , 34
        , 34







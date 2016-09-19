h         = mojs.h
Tweenable = mojs.Tweenable
Thenable  = mojs.Thenable

describe 'thenable ->', ->
  describe 'extention ->', ->
    it 'should extend tweenable', ->
      th = new Thenable
      expect(th instanceof Tweenable).toBe true
  describe '_vars method ->', ->
    it 'should create _history object', ->
      th = new Thenable
      th._vars()
      expect(h.isArray(th._history)).toBe true
      expect(th._history.length).toBe 1
    it 'should clone _prop object and save it as the first history record', ->
      options = { fill: 'hotpink', x: 200  }
      th = new Thenable {}
      th._props = options
      th._vars()
      expect(th._history[0]).toEqual th._props

    it 'should save string _arrayPropertyMap values', ->
      options = {
        strokeDasharray: '50% 50%',
        strokeDashoffset: '200 100'
      }
      th = new Thenable options
      th._props = { strokeDasharray: [], strokeDashoffset: [] }
      th._vars()
      expect(th._history[0].strokeDasharray).toEqual options.strokeDasharray
      expect(th._history[0].strokeDashoffset).toEqual options.strokeDashoffset

    it 'should pre parse property', ->
      options = {
        strokeDasharray: 'stagger(200, 100)',
        strokeDashoffset: 'stagger(100, 200)'
      }
      th = new Thenable options
      th._props = { strokeDasharray: [], strokeDashoffset: [] }
      th._vars()
      expect(th._history[0].strokeDasharray)
        .toEqual th._parsePreArrayProperty 'strokeDasharray', options.strokeDasharray
      expect(th._history[0].strokeDashoffset)
      .toEqual th._parsePreArrayProperty 'strokeDashoffset', options.strokeDashoffset

    it 'should create _modules object', ->
      th = new Thenable
      th._vars()
      expect(h.isArray(th._modules)).toBe true
      expect(th._modules.length).toBe 1
      expect(th._modules[0]).toBe th
    it 'should declare _nonMergeProps map', ->
      th = new Thenable
      th._vars()
      expect(h.isObject(th._nonMergeProps)).toBe true
      expect(Object.keys(th._nonMergeProps).length).toBe 1
      expect(th._nonMergeProps['shape']).toBe 1

    it 'should save passed _o.masterModule to _masterModule', ->
      obj = {}
      thenable = new Thenable masterModule: obj
      thenable._masterModule = null
      thenable._vars()
      expect(thenable._masterModule).toBe obj
    it 'should set `_isChained` based on `prevChainModule` option', ->
      thenable0 = new Thenable

      thenable = new Thenable
        prevChainModule: thenable0
        masterModule:    thenable0

      thenable._isChained = null
      thenable._vars()
      expect(thenable._isChained).toBe true

  Byte = Thenable
  describe '_mergeThenOptions method ->', ->
    it 'should merge 2 objects', ->
      byte = new Byte
      start =
        radius: 10,
        duration: 10,
        fill: '#ff00ff',
        strokeWidth: { 10: 20 }
        left: { 0: '200px' }
        strokeDasharray: '50%'
      end =
        radius:   20,
        duration: 500,
        opacity:  { 2: 1 }
        left:     100
        strokeDasharray: '150%'

      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
        
      expect(mergedOpton.radius[10]).toBe 20
      expect(mergedOpton.duration).toBe 500
      expect(mergedOpton.fill).toBe '#ff00ff'
      expect(mergedOpton.strokeWidth).toBe 20
      expect(mergedOpton.opacity[2]).toBe 1
      expect(mergedOpton.left['200px']).toBe '100px'
      expect(mergedOpton.strokeDasharray['50%']).toBe '150%'

    it 'should merge 2 objects if the first was an object', ->
      byte = new Byte
      start = radius: {10: 0}
      end   = radius: 20

      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radius[0]).toBe 20
    it 'should use the second value if it is an object', ->
      byte = new Byte
      start =
        radius: 10
        left: '200px'
      end =
          radius: {20: 0}
          left:   {'stagger(100, 0)' : 'stagger(150, -25)'}
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radius[20]).toBe 0
      expect(mergedOpton.left['100px']).toBe '150px'
    it 'should not parse delta on end array props object', ->
      byte = new Byte
      start = strokeDasharray: '200px'
      end = strokeDasharray: {'1200px' : 0 }
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.strokeDasharray['1200px']).toBe 0
    it 'should save the old tween values', ->
      byte = new Byte
      start = duration: 10
      end   = radius: {20: 0}
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.duration).toBe 10
    it 'should fallback to default value is start is undefined', ->
      byte = new Byte
      start = radius: 10, duration: 1000
      end   = radius: 20, duration: 500, stroke: '#ff00ff'
      byte._vars()
      byte._defaults = { stroke: 'transparent' }
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.stroke['transparent']).toBe '#ff00ff'
    it 'should use start value if end value is null or undefined', ->
      byte = new Byte
      start = radius: 10, duration: 1000, fill: 'orange', points: 5
      end   =
        radius: 20, duration: null, points: undefined
        fill: null, stroke: '#ff00ff'
      byte._defaults = {}
      byte._vars()
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
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.fill)    .toBe 'cyan'

    it 'should not merge properties from _nonMergeProps ', ->
      byte = new Byte
      start = radius: 10, duration: 1000, fill: {'orange' : 'cyan'}, points: 5
      end   =
        radius: 20, duration: null, points: undefined
        fill: null, shape: 'rect'
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.shape)    .toBe 'rect'

    it 'should not merge booleans', ->
      byte = new Byte
      start = isShowEnd: true
      end   = isShowEnd: false 
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.isShowEnd)    .toBe false

    it 'should work with new tween values', ->
      byte = new Byte
      start = radius: 10
      end   = duration: 1000, delay: 200, repeat: 2, easing: 'elastic.in'
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.duration).toBe 1000
      expect(mergedOpton.delay)   .toBe 200
      expect(mergedOpton.repeat)  .toBe 2
      expect(mergedOpton.easing)  .toBe 'elastic.in'

    it 'should fallback to radius for radiusX/radiusY props', ->
      byte = new Byte
      start = radius: 10
      end   = radiusX: 200, radiusY: 100
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radiusX[10]).toBe 200
      expect(mergedOpton.radiusY[10]).toBe 100

    it "should fallback to radius for radiusX/radiusY props
        and not ovveride previous values", ->
      byte = new Byte
      start = radius: 10, radiusY: 20
      end   = radiusX: 200, radiusY: 100
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radiusX[10]).toBe 200
      expect(mergedOpton.radiusY[20]).toBe 100

    it 'should fallback to radius for scaleX/scaleY props', ->
      byte = new Byte
      start = scale: 10
      end   = scaleX: 200, scaleY: 100
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.scaleX[10]).toBe 200
      expect(mergedOpton.scaleY[10]).toBe 100

    it "should fallback to scale for scaleX/scaleY props
        and not ovveride previous values", ->
      byte = new Byte
      start = scale: 10, scaleY: 20
      end   = scaleX: 200, scaleY: 100
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.scaleX[10]).toBe 200
      expect(mergedOpton.scaleY[20]).toBe 100

    it "should always take sub radius values", ->
      byte = new Byte
      start = radiusX: { 50: 200 }, radius: 50
      end   = radiusX: 500, radius: 800
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radiusX[200]).toBe 500

    it 'should push merged options to the history', ->
      byte = new Byte
      start = radius: 10, duration: 1000, fill: 'orange', points: 5
      end   =
        radius: 20, duration: null, points: undefined
        fill: null, stroke: '#ff00ff'
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(byte._history[1]).toBe mergedOpton

    it 'should parse end option when making delta from two statics', ->
      byte = new Byte
      start = left: '10px'
      end   = left: 'stagger(100, 25)'
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.left['10px']).toBe '100px'
    it 'should just copy parent option', ->
      byte = new Byte

      parent = {}
      start = parent: null
      end   = parent: parent

      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.parent).toBe parent

    it 'should call _checkStartValue with startValue', ->
      byte = new Byte
      start = left: '10px'
      end   = left: 'stagger(100, 25)'
      byte._defaults = {}
      byte._vars()
      spyOn byte, '_checkStartValue'
      mergedOpton = byte._mergeThenOptions start, end
      expect(byte._checkStartValue).toHaveBeenCalledWith 'left', '10px'

    describe 'easing based property', ->
      it 'should parse easing', ->
        byte = new Byte
        start = radius: 10
        end = radius: { to: 20, easing: 'cubic.out' }

        byte._defaults = {}
        byte._vars()
        mergedOpton = byte._mergeThenOptions start, end
        expect(mergedOpton.radius[10]).toBe 20
        expect(mergedOpton.radius.easing).toBe 'cubic.out'

      it 'should parse easing if both ∆s', ->
        byte = new Byte
        start = radius: { 10 : 0 }
        end = radius: { to: 20, easing: 'cubic.out' }

        byte._defaults = {}
        byte._vars()
        mergedOpton = byte._mergeThenOptions start, end
        expect(mergedOpton.radius[0]).toBe 20
        expect(mergedOpton.radius.easing).toBe 'cubic.out'

    describe 'curve based property', ->
      curve = "M0,100 L100, 0"
      it 'should parse easing', ->
        byte = new Byte
        start = radius: 10
        end = radius: { to: 20, curve: curve }

        byte._defaults = {}
        byte._vars()
        mergedOpton = byte._mergeThenOptions start, end
        expect(mergedOpton.radius[10]).toBe 20
        expect(mergedOpton.radius.curve).toBe curve

      it 'should parse easing if both ∆s', ->
        byte = new Byte
        start = radius: { 10 : 0 }
        end = radius: { to: 20, curve: curve }

        byte._defaults = {}
        byte._vars()
        mergedOpton = byte._mergeThenOptions start, end
        expect(mergedOpton.radius[0]).toBe 20
        expect(mergedOpton.radius.curve).toBe curve


    # nope
    # it 'should not push merged options to the history if !isPush', ->
    #   byte = new Byte
    #   start = radius: 10, duration: 1000, fill: 'orange', points: 5
    #   end   =
    #     radius: 20, duration: null, points: undefined
    #     fill: null, stroke: '#ff00ff'
    #   byte._defaults = {}
    #   byte._vars()
    #   mergedOpton = byte._mergeThenOptions start, end, false
    #   expect(byte._history[1]).not.toBe mergedOpton
    # nope
    # it 'should merge if first is array', ->
    #   byte = new Byte
    #   start = radius: [10, 30]
    #   end   = radius: 20
    #   byte._defaults = {}
    #   byte._vars()
    #   mergedOpton = byte._mergeThenOptions start, end
    #   expect(mergedOpton.radius[0]).toEqual { 10: 20 }
    #   expect(mergedOpton.radius[1]).toEqual { 30: 20 }
    # nope
    # it 'should merge if last is array', ->
    #   byte = new Byte
    #   start = radius: 10
    #   end   = radius: [20, 40]
    #   byte._defaults = {}
    #   byte._vars()
    #   mergedOpton = byte._mergeThenOptions start, end
    #   expect(mergedOpton.radius[0]).toEqual { 10: 20 }
    #   expect(mergedOpton.radius[1]).toEqual { 10: 40 }
    # nope
    # it 'should merge if both are arrays and first is larger', ->
    #   byte = new Byte
    #   start = radius: [10, 50, 100]
    #   end   = radius: [20, 40]
    #   byte._defaults = {}
    #   byte._vars()
    #   mergedOpton = byte._mergeThenOptions start, end
    #   expect(mergedOpton.radius[0]).toEqual { 10:  20 }
    #   expect(mergedOpton.radius[1]).toEqual { 50:  40 }
    #   expect(mergedOpton.radius[2]).toEqual { 100: 20 }
    # nope
    # it 'should merge if both are arrays and last is larger', ->
    #   byte = new Byte
    #   start = radius: [ 10, 50 ]
    #   end   = radius: [ 20, 40, 70 ]
    #   byte._defaults = {}
    #   byte._vars()
    #   mergedOpton = byte._mergeThenOptions start, end
    #   expect(mergedOpton.radius[0]).toEqual { 10:  20 }
    #   expect(mergedOpton.radius[1]).toEqual { 50:  40 }
    #   expect(mergedOpton.radius[2]).toEqual { 10:  70 }

  describe '_isDelta method ->', ->
    it 'should detect if value is not a delta value', ->
      byte = new Byte radius: 45, stroke: 'deeppink': 'pink'
      expect(byte._isDelta(45))    .toBe false
      expect(byte._isDelta('45'))  .toBe false
      expect(byte._isDelta(['45'])).toBe false
      expect(byte._isDelta({ unit: 'px', to: 20 })).toBe false
      expect(byte._isDelta({ 20: 30 })).toBe true

  describe 'then method ->', ->
    it "instance of the module should have .constructor
        property pointing to the module class", ->
      th = new Thenable
      expect(th.constructor).toBe Thenable
    it 'should return this', ->
      th = new Thenable
      th._defaults = {}
      th._vars()
      expect(th.then({ fill: 'cyan' })).toBe th
    it 'should merge then options and add them to the history', ->
      th = new Thenable radius: 20, duration: 1000, delay: 10

      th._defaults = {}
      th._props = { radius: 20, duration: 1000, delay: 10 }
      th._vars()
      th.then radius: 5, isYoyo: true, delay: 100
      expect(th._history.length)       .toBe 2
      
      expect(th._history[1].radius[20]).toBe 5
      expect(th._history[1].duration).toBe 1000
      expect(th._history[1].delay)   .toBe 100
      expect(th._history[1].isYoyo)  .toBe true


    it 'should always merge then options with the last history item', ->
      th = new Thenable radius: 20, duration: 1000, delay: 10
      
      th._defaults = { stroke: 'transparent' }
      th._props = { radius: 20, duration: 1000, delay: 10 } 

      th._vars()
      th.then radius: 5, yoyo: true, delay: 100
      th.then radius: {100:10}, delay: 0, stroke: 'green'

      expect(th._history.length)        .toBe 3
      expect(th._history[2].radius[100]).toBe 10
      expect(th._history[2].duration)   .toBe 1000
      expect(th._history[2].delay)      .toBe 0
      expect(th._history[2].isYoyo)       .toBe undefined
      expect(th._history[2].stroke['transparent']).toBe 'green'

    it 'should not copy callbacks', ->
      onUpdate = ->
      onStart  = ->
      th = new Thenable
        radius: 20, duration: 1000, delay: 200
        onUpdate:  onUpdate, onStart: onStart
      th._props =
        radius: 20, duration: 1000, delay: 200
        onUpdate:  onUpdate, onStart: onStart
      th._defaults = {}
      th._vars()
      th.then radius: 5, isYoyo: true, delay: 100
      expect(th._history.length)       .toBe 2
      expect(th._history[1].radius[20]).toBe 5
      expect(th._history[1].duration)  .toBe 1000
      expect(th._history[1].delay)     .toBe 100
      expect(th._history[1].isYoyo)      .toBe true
      expect(th._history[1].onComplete).toBe undefined
      # expect(th._history[1].onUpdate).toBeDefined()
      expect(th._history[1].onUpdate).not.toBe onUpdate
      th.timeline.setProgress .73
      th.timeline.setProgress .74
      th.timeline.setProgress .75
      # expect(th._props.onComplete).not.toBeDefined()
      # expect(th._props.onStart)  .not.toBeDefined()
    it 'should return if no options passed or options are empty', ->
      th = new Thenable radius: 20, duration: 1000, delay: 10
      th._defaults = {}
      th._vars()
      spyOn th, '_mergeThenOptions'
      th.then()
      expect(th._mergeThenOptions).not.toHaveBeenCalled()

    describe 'submodule creation ->', ->
      it 'should create the new Module with options', ->
        th = new Thenable radius: 20, duration: 1000, delay: 10
        th._defaults = {}
        th._vars()
        th.then({ stroke: 'cyan' })
        expect(th._modules[1]._o).toBe th._history[1]
      it 'should pass isTimelineLess to the submodule', ->
        th = new Thenable radius: 20, duration: 1000, delay: 10
        th._defaults = {}
        th._vars()
        th.then({ stroke: 'cyan' })
        expect(th._modules[1]._o.isTimelineLess).toBe true
      it 'should pass _props.callbacksContext to the submodule', ->
        th = new Thenable radius: 20, duration: 1000, delay: 10
        th._defaults = {}
        th._props.callbacksContext = {}
        th._vars()
        th.then({ stroke: 'cyan' })
        expect(th.timeline._timelines[1]._o.callbacksContext)
          .toBe th._props.callbacksContext
      it 'should reset isShowStart flag on submodule', ->
        th = new Thenable
          radius: 20, duration: 1000, delay: 10
          isShowStart: true

        th._defaults = {}
        th._vars()
        
        th.then({ stroke: 'cyan' })
        expect(th._modules[1]._o.isShowStart).toBe false

      # nope
      # it 'should reset isShowEnd flag on previous submodule', ->
      #   th = new Thenable
      #     radius: 20, duration: 1000, delay: 10
      #     isShowEnd: true

      #   # expect that _props and _setProps are defiened
      #   th._props   = {}
      #   th._setProp = ( key, value )-> this._props[key] = value

      #   th._defaults = {}
      #   th._vars()
        
      #   th.then({ stroke: 'cyan' })

      #   expect(th._modules[0]._props.isShowEnd).toBe false

      it 'should add the submodule to the _modules array', ->
        th = new Thenable radius: 20, duration: 1000, delay: 10
        th._defaults = {}
        th._vars()
        th.then({ stroke: 'cyan' })
        expect(th._modules.length).toBe 2
        expect(th._modules[1] instanceof Thenable).toBe true
      it "should add the submodule's tween to timeline", ->
        th = new Thenable radius: 20, duration: 1000, delay: 10
        th._defaults = {}
        th._vars()
        th.then({ stroke: 'cyan' })
        expect(th.timeline._timelines.length).toBe 2
        expect(th.timeline._timelines[1]).toBe th._modules[1].tween

  describe '_resetMergedFlags method ->', ->
    it 'should return the same object', ->
      obj = {}
      th = new Thenable
      expect(th._resetMergedFlags(obj)).toBe obj
    it 'should reset flags on the piped object', ->
      obj = { }
      th = new Thenable({}).then({ x: 20 })
      th.el = document.createElement 'div'
      th._resetMergedFlags(obj)
      expect(obj.isTimelineLess)  .toBe true
      expect(obj.isShowStart)     .toBe false
      expect(obj.isRefreshState)  .toBe false
      expect(obj.prevChainModule) .toBe th._modules[th._modules.length-1]
      expect(obj.callbacksContext).toBe th
      expect(obj.masterModule).toBe     th
    it 'should set callbacksContext to this if not set', ->
      obj = {}
      th = new Thenable({})
      th._resetMergedFlags(obj)
      expect(obj.callbacksContext).toBe th

  describe '_getArrayLength method ->', ->
    it 'should get length if array', ->
      th = new Thenable
      expect(th._getArrayLength( [ 1, 2, 3, 4 ] )).toBe 4
    it 'should return -1 if not array', ->
      th = new Thenable
      expect(th._getArrayLength( {} )).toBe -1
      expect(th._getArrayLength( 'some string' )).toBe -1
      expect(th._getArrayLength( true )).toBe -1

  describe '_isFirstInChain method', ->
    it 'should return `true` if element is master', ->
      shape = new Thenable
      expect(shape._isFirstInChain()).toBe true

    it 'should return `false` if element isnt master', ->
      shape = new Thenable({}).then({ radius: 0 })
      expect(shape._modules[1]._isFirstInChain()).toBe false

  describe '_isLastInChain method', ->
    it 'should return `true` if element is master', ->
      shape = new Thenable
      expect(shape._isLastInChain()).toBe true

    it 'should return `false` if element isnt master', ->
      shape = new Thenable().then({radius: 20}).then({radius: 40})

      expect(shape._modules[0]._isLastInChain()).toBe false
      # expect(shape._modules[1]._isLastInChain()).toBe false
      # expect(shape._modules[2]._isLastInChain()).toBe true

  describe '_checkStartValue method ->', ->
    it 'should return startValue', ->
      shape = new Thenable()

      expect(shape._checkStartValue 'x', 20).toBe 20





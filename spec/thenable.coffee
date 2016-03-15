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
    it 'should clone _o object and save it as the first history record', ->
      options = { a: 2, b: 3 }
      th = new Thenable options
      th._vars()
      expect(th._history[0]).not.toBe options
      expect(th._history[0].a).toBe options.a
      expect(th._history[0].b).toBe options.b
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

  Byte = Thenable
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

      byte._defaults = {}
      byte._vars()
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
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radius[0]).toBe 20
    it 'should use the second value if it is an object', ->
      byte = new Byte
      start = radius: 10
      end   = radius: {20: 0}
      byte._defaults = {}
      byte._vars()
      mergedOpton = byte._mergeThenOptions start, end
      expect(mergedOpton.radius[20]).toBe 0
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
  describe '_isDelta method ->', ->
    it 'should detect if value is not a delta value', ->
      byte = new Byte radius: 45, stroke: 'deeppink': 'pink'
      expect(byte._isDelta(45))    .toBe false
      expect(byte._isDelta('45'))  .toBe false
      expect(byte._isDelta(['45'])).toBe false
      expect(byte._isDelta({ unit: 'px', value: 20 })).toBe false
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
      th._vars()
      th.then radius: 5, yoyo: true, delay: 100
      expect(th._history.length)       .toBe 2
      expect(th._history[1].radius[20]).toBe 5
      expect(th._history[1].duration).toBe 1000
      expect(th._history[1].delay)   .toBe 100
      expect(th._history[1].yoyo)    .toBe true
    it 'should always merge then options with the last history item', ->
      th = new Thenable radius: 20, duration: 1000, delay: 10
      
      th._defaults = { stroke: 'transparent' }

      th._vars()
      th.then radius: 5, yoyo: true, delay: 100
      th.then radius: {100:10}, delay: 0, stroke: 'green'

      expect(th._history.length)        .toBe 3
      expect(th._history[2].radius[100]).toBe 10
      expect(th._history[2].duration)   .toBe 1000
      expect(th._history[2].delay)      .toBe 0
      expect(th._history[2].yoyo)       .toBe undefined
      expect(th._history[2].stroke['transparent']).toBe 'green'
    it 'should not copy callbacks', ->
      onUpdate = ->
      onStart  = ->
      th = new Thenable
        radius: 20, duration: 1000, delay: 200
        onUpdate:  onUpdate, onStart: onStart
      th._defaults = {}
      th._vars()
      th.then radius: 5, yoyo: true, delay: 100
      expect(th._history.length)       .toBe 2
      expect(th._history[1].radius[20]).toBe 5
      expect(th._history[1].duration)  .toBe 1000
      expect(th._history[1].delay)     .toBe 100
      expect(th._history[1].yoyo)      .toBe true
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

    describe 'submodule creation', ->
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
      it 'should pass this as callbacksContext to the submodule', ->
        th = new Thenable radius: 20, duration: 1000, delay: 10
        th._defaults = {}
        th._vars()
        th.then({ stroke: 'cyan' })
        expect(th.timeline._timelines[1]._props.callbacksContext).toBe th
      it 'should reset isShowStart flag on submodule', ->
        th = new Thenable
          radius: 20, duration: 1000, delay: 10
          isShowStart: true

        th._defaults = {}
        th._vars()
        
        th.then({ stroke: 'cyan' })
        expect(th._modules[1]._o.isShowStart).toBe false

      it 'should reset isShowEnd flag on previous submodule', ->
        th = new Thenable
          radius: 20, duration: 1000, delay: 10
          isShowEnd: true

        # expect that _props and _setProps are defiened
        th._props   = {}
        th._setProp = ( key, value )-> this._props[key] = value

        th._defaults = {}
        th._vars()
        
        th.then({ stroke: 'cyan' })

        expect(th._modules[0]._props.isShowEnd).toBe false

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

  describe '_resetMergedFlags method', ->
    it 'should return the same object', ->
      obj = {}
      th = new Thenable
      expect(th._resetMergedFlags(obj)).toBe obj

    it 'should reset flags on the piped object', ->
      obj = {}
      th = new Thenable
      th._resetMergedFlags(obj)
      expect(obj.isTimelineLess)  .toBe true
      expect(obj.isShowStart)     .toBe false
      expect(obj.callbacksContext).toBe th



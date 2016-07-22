Deltas = mojs._pool.Deltas
Delta  = mojs._pool.Delta

options = {}
props   = {}

describe 'Deltas ->', ->
  it 'should have _o', ->
    deltas = new Deltas
      options: options,
      props: props

    expect( deltas._o.options ).toBe options
    expect( deltas._o.props ).toBe props

  describe '_createTimeline method', ->
    it 'should create a Timeline', ->
      deltas = new Deltas
        options:  options,
        props:    props

      deltas.timeline = null

      deltas._createTimeline()
      
      expect(deltas.timeline instanceof mojs.Timeline).toBe true

    it 'should be called on initialization', ->
      spyOn Deltas::, '_createTimeline'
      timeline = {}
      deltas = new Deltas
        options:  options,
        props:    props
        timeline: timeline

      expect( Deltas::_createTimeline ).toHaveBeenCalledWith timeline

    it 'should pass timeline options to the timeline', ->
      timeline = {}
      deltas = new Deltas
        options:  options,
        props:    props
        timeline: {}

      expect(deltas.timeline._o).toEqual timeline

    it 'should pass callbackOverrides to the timeline', ->
      
      fun = ->
      deltas = new Deltas
        options:  options,
        props:    props,
        onUpdate: fun
      
      expect(deltas.timeline._callbackOverrides.onUpdate).toBe fun

    it 'should add _deltas to the Timeline', ->
      options = {
        stroke: 'cyan',
        x: { 20: 0, easing: 'cubic.in' },
        y: { 0: 40, easing: 'cubic.out' },
        radius: { 0: 40, duration: 400 },
        fill: { 'cyan' : 'red' },
        duration: 1000,
        backwardEasing: 'cubic.out'
      }

      deltas = new Deltas
        options:  options,
        props:    props

      expect( deltas.timeline._timelines.length ).toBe 4

  describe '_parseDeltas method ->', ->
    it 'should parse main tween options', ->
      deltas = new Deltas
        options:  options,
        props:    props

      opts = {
        stroke: 'cyan',
        x: { 20: 0 },
        y: { 0: 40 },
        fill: { 'cyan' : 'red' },
        duration: 1000,
        backwardEasing: 'cubic.out'
      }

      deltas._mainTweenOptions = null
      deltas._parseDeltas opts

      expect( deltas._mainTweenOptions ).toEqual { duration: 1000, backwardEasing: 'cubic.out' }

    it 'should parse main deltas', ->
      deltas = new Deltas
        options:  options,
        props:    props

      opts = {
        stroke: 'cyan',
        x: { 20: 0 },
        y: { 0: 40 },
        fill: { 'cyan' : 'red' },
        duration: 1000,
        backwardEasing: 'cubic.out'
      }

      deltas._mainDeltas = null

      deltas._parseDeltas opts

      expect( deltas._mainDeltas )
      .toEqual [
        mojs.h.parseDelta('x', { 20: 0 }),
        mojs.h.parseDelta('y', { 0:  40 }),
        mojs.h.parseDelta('fill', { 'cyan':  'red' }),
      ]

    it 'should parse child deltas', ->
      deltas = new Deltas
        options:  options,
        props:    props

      opts = {
        stroke: 'cyan',
        x: { 20: 0, duration: 4000 },
        y: { 0: 40, delay: 200 },
        fill: { 'cyan' : 'red' },
        duration: 1000,
        backwardEasing: 'cubic.out'
      }

      deltas._childDeltas = null

      deltas._parseDeltas opts

      expect( deltas._childDeltas )
      .toEqual [
        { delta: mojs.h.parseDelta('x', { 20: 0 }), tweenOptions: { duration: 4000 } },
        { delta: mojs.h.parseDelta('y', { 0: 40 }), tweenOptions: { delay: 200 } }
      ]

    it 'should be called on initialization', ->
      spyOn(Deltas.prototype, '_parseDeltas').and.callThrough()
      deltas = new Deltas
        options:  options,
        props:    props

      expect( Deltas.prototype._parseDeltas ).toHaveBeenCalledWith options


  describe '_parseDelta method ->', ->
    it 'should call _splitTweenOptions method with passed object', ->
      deltas = new Deltas
        options:  options,
        props:    props

      deltas.isIt = 1
      spyOn(deltas, '_splitTweenOptions').and.callThrough()

      result = deltas._parseDelta 'x', { 20: 10 }

    it 'should parse delta object', ->
      deltas = new Deltas
        options:  options,
        props:    props

      spyOn mojs.h, 'parseDelta'
      result = deltas._parseDelta 'x', { 20: 10, duration: 2000 }
      expect( mojs.h.parseDelta ).toHaveBeenCalledWith 'x', { 20: 10 }

    it 'should return parsed delta and tween properties', ->
      deltas = new Deltas
        options:  options,
        props:    props

      result = deltas._parseDelta 'x', { 20: 10, duration: 2000 }
      expect( result.delta ).toEqual mojs.h.parseDelta 'x', { 20: 10 }
      expect( result.tweenOptions ).toEqual { duration: 2000 }

    it 'should return falsy tweenOptions if none', ->
      deltas = new Deltas
        options:  options,
        props:    props

      result = deltas._parseDelta 'x', { 20: 10 }
      expect( result.delta ).toEqual mojs.h.parseDelta 'x', { 20: 10 }
      expect( result.tweenOptions ).toBeFalsy()

  describe '_splitTweenOptions method', ->
    it 'should return tween options separated from delta', ->
      deltas = new Deltas
        options:  options,
        props:    props

      result = deltas._splitTweenOptions { 0: 20, duration: 2000, delay: 200, easing: 'cubic.in' }

      expect( result.delta ).toEqual { 0: 20 }
      expect( result.tweenOptions ).toEqual { duration: 2000, delay: 200, easing: 'cubic.in' }

    it 'should not return tweenOptions if any', ->
      deltas = new Deltas
        options:  options,
        props:    props

      result = deltas._splitTweenOptions { 0: 20 }

      expect( result.delta ).toEqual { 0: 20 }
      expect( result.tweenOptions ).toBeFalsy()

    it 'should parse curve as part of delta', ->
      deltas = new Deltas
        options:  options,
        props:    props

      result = deltas._splitTweenOptions { 0: 20, curve: 'M0,0 L100,0' }

      expect( result.delta ).toEqual { 0: 20, curve: 'M0,0 L100,0' }
      expect( result.tweenOptions ).toBeFalsy()

  describe '_createDeltas method ->', ->
    it 'should create deltas from parsed object ->', ->
      options = {
        stroke: 'cyan',
        x: { 20: 0, duration: 4000 },
        y: { 0: 40, delay: 200 },
        fill: { 'cyan' : 'red' },
        duration: 1000,
        backwardEasing: 'cubic.out'
      }

      deltas = new Deltas
        options:  options,
        props:    props

      deltas._deltas = null

      deltas._createDeltas()
      mainDelta = deltas._deltas[0]

      expect( mainDelta._o.deltas ).toBe deltas._mainDeltas
      expect( mainDelta._o.tweenOptions ).toBe deltas._mainTweenOptions
      expect( mainDelta._o.props ).toBe props
      expect( mainDelta instanceof Delta ).toBe true

    it 'should create deltas from parsed child objects ->', ->
      options = {
        stroke: 'cyan',
        x: { 20: 0, duration: 4000 },
        y: { 0: 40, delay: 200 },
        fill: { 'cyan' : 'red' },
        duration: 1000,
        backwardEasing: 'cubic.out'
      }

      deltas = new Deltas
        options:  options,
        props:    props

      deltas._deltas = null

      deltas._createDeltas()
      childDelta1 = deltas._deltas[1]
      childDelta2 = deltas._deltas[2]

      expect( childDelta1._o.deltas ).toEqual [deltas._childDeltas[0].delta]
      expect( childDelta1._o.tweenOptions ).toBe deltas._childDeltas[0].tweenOptions
      expect( childDelta1._o.props ).toBe props
      expect( childDelta1 instanceof Delta ).toBe true

      expect( childDelta2._o.deltas ).toEqual [deltas._childDeltas[1].delta]
      expect( childDelta2._o.tweenOptions ).toBe deltas._childDeltas[1].tweenOptions
      expect( childDelta2._o.props ).toBe props
      expect( childDelta2 instanceof Delta ).toBe true

    it 'should be called on initialization', ->
      spyOn(Deltas.prototype, '_createDeltas').and.callThrough()
      deltas = new Deltas
        options:  options,
        props:    props

      expect( Deltas.prototype._createDeltas ).toHaveBeenCalled()


  describe '_isDelta method ->', ->
    it 'should detect if value is not a delta value', ->
      deltas = new Deltas
        options:  options,
        props:    props

      expect(deltas._isDelta(45))    .toBe false
      expect(deltas._isDelta('45'))  .toBe false
      expect(deltas._isDelta(['45'])).toBe false
      expect(deltas._isDelta({ unit: 'px', value: 20 })).toBe false
      expect(deltas._isDelta({ 20: 30 })).toBe true


  describe '_createDelta method ->', ->
    it 'should create delta from passed objects', ->
      deltas = new Deltas
        options:  options,
        props:    props

      deltasArr = []
      tweenOpts = {}
      result = deltas._createDelta deltasArr, tweenOpts

      expect( result instanceof Delta ).toBe true
      expect( result._o.deltas ).toBe deltasArr
      expect( result._o.tweenOptions ).toBe tweenOpts
      expect( result._o.props ).toBe props

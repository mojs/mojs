# import Delta from '../../js/delta/delta.babel.js'

# Module  = mojs.Module
Tween   = mojs.Tween
h       = mojs.h
Delta   = mojs._pool.Delta

deltas  = [ h.parseDelta('x', { 0: 20 }, 0), h.parseDelta('y', { 20: 10 }, 0) ]
tweenOptions = {}
props = {}

describe 'Delta ->', ->
  it 'should have _o', ->
    delta = new Delta
      deltas: deltas,
      tweenOptions: tweenOptions,
      props: props

    expect( delta._o.deltas ).toBe deltas
    expect( delta._o.tweenOptions ).toBe tweenOptions
    expect( delta._o.props ).toBe props

  it 'should call refresh on tween when constructing', ->
    spyOn mojs.Tween.prototype, '_refresh'
    delta = new Delta
      deltas: deltas,
      tweenOptions: tweenOptions,
      props: props

    expect( mojs.Tween.prototype._refresh ).toHaveBeenCalledWith true

  it 'should not call `refresh` on tween when constructing is `isChained`', ->
    spyOn mojs.Tween.prototype, '_refresh'
    delta = new Delta
      deltas: deltas,
      tweenOptions: tweenOptions,
      props: props,
      isChained: true

    expect( mojs.Tween.prototype._refresh )
      .not.toHaveBeenCalled()

  describe '_calcCurrentProps method ->', ->
    it 'should call sub functions based on each delta type', ->
      fillDelta   =  h.parseDelta( 'fill', { 'rgba(0,0,0,0)' : 'rgba(200,100,20,1)' }, 0 )
      xDelta      =  h.parseDelta( 'x', { '0px' : '100px' }, 0 )
      arrDelta    =  h.parseDelta( 'strokeDasharray', { '0 100' : '200 0' }, 0 )
      radiusDelta =  h.parseDelta( 'radius', { 0 : 100 }, 0 )
      props = {}

      delta = new Delta
        deltas: [ fillDelta, xDelta, arrDelta, radiusDelta ],
        tweenOptions: tweenOptions,
        props: props

      spyOn delta, '_calcCurrent_color'
      spyOn delta, '_calcCurrent_number'
      spyOn delta, '_calcCurrent_unit'
      spyOn delta, '_calcCurrent_array'

      delta._calcCurrentProps .5, .5

      expect( delta._calcCurrent_color ).toHaveBeenCalledWith  fillDelta, .5, .5
      expect( delta._calcCurrent_number ).toHaveBeenCalledWith radiusDelta, .5, .5
      expect( delta._calcCurrent_unit ).toHaveBeenCalledWith   xDelta, .5, .5
      expect( delta._calcCurrent_array ).toHaveBeenCalledWith  arrDelta, .5, .5

  describe '_calcCurrent_color method', ->
    it 'should calc color with alpha', ->
      fillDelta =  h.parseDelta( 'fill', { 'rgba(0,0,0,0)' : 'rgba(200,100,20,1)' }, 0 )
      props = {}

      delta = new Delta
        deltas: [ fillDelta ],
        tweenOptions: tweenOptions,
        props: props

      delta._calcCurrent_color fillDelta, .5, .5

      expect( delta._o.props['fill'] ).toBe 'rgba(100,50,10,0.5)'

    it 'should calc color with curve', ->
      fillDelta = h.parseDelta( 'fill', {
        'rgba(200,100,20,1)' : 'rgba(200,100,20,1)', curve: 'M0,0 L100,50'
      }, 0 );

      props = {}

      delta = new Delta
        deltas: [ fillDelta ],
        tweenOptions: tweenOptions,
        props: props

      delta._calcCurrent_color fillDelta, .5, .5

      fill = delta._o.props['fill']

      fillArr = fill.split /rgba\(|\)|,/

      expect( parseInt(fillArr[1]) ).toBe 150
      expect( parseInt(fillArr[2]) ).toBe 75
      expect( parseInt(fillArr[3]) ).toBe 15
      expect( parseFloat(fillArr[4]) ).toBeCloseTo .75, 2

  describe '_calcCurrent_number method', ->
    it 'should calc number', ->
      radiusDelta =  h.parseDelta( 'radius', { 0 : 100 }, 0 )
      props = {}

      delta = new Delta
        deltas: [ radiusDelta ],
        tweenOptions: tweenOptions,
        props: props

      delta._calcCurrent_number radiusDelta, .5, .5

      expect( delta._o.props['radius'] ).toBe 50

    it 'should calc number # curve', ->
      radiusDelta =  h.parseDelta( 'radius', {
        100 : 100, curve: 'M0,0 L100,50'
      }, 0 )
      props = {}

      delta = new Delta
        deltas: [ radiusDelta ],
        tweenOptions: tweenOptions,
        props: props

      delta._calcCurrent_number radiusDelta, .5, .5

      expect( delta._o.props['radius'] ).toBeCloseTo 75, 1

  describe '_calcCurrent_unit method', ->
    it 'should calc unit based number', ->
      xDelta =  h.parseDelta( 'x', { '0px' : '100px' }, 0 )
      props = {}

      delta = new Delta
        deltas: [ xDelta ],
        tweenOptions: tweenOptions,
        props: props

      delta._calcCurrent_unit xDelta, .5, .5

      expect( delta._o.props['x'] ).toBe '50px'

    it 'should calc unit based number # curve', ->
      xDelta =  h.parseDelta( 'x', {
        100 : 100, curve: 'M0,0 L100,50'
      }, 0 )

      props = {}

      delta = new Delta
        deltas: [ xDelta ],
        tweenOptions: tweenOptions,
        props: props

      delta._calcCurrent_unit xDelta, .5, .5

      expect( parseFloat(delta._o.props['x']) ).toBeCloseTo 75, 1

  describe '_calcCurrent_array method', ->
    it 'should calc array', ->
      arrDelta =  h.parseDelta( 'strokeDasharray', { '0 100' : '200 0' }, 0 )
      props = {}
      delta = new Delta
        deltas: [ arrDelta ],
        tweenOptions: tweenOptions,
        props: props

      delta._calcCurrent_array arrDelta, .5, .5
      expect( delta._o.props['strokeDasharray'] )
        # .toEqual [ { string : '100px', value : 100, unit : 'px' }, { string : '50px', value : 50, unit : 'px' } ]
        .toEqual '100px 50px '

    it 'should calc array # curve', ->
      arrDelta =  h.parseDelta( 'strokeDasharray', {
        '0 100' : '200 0', curve: 'M0,0 L100,50'
      }, 0 )
      props = {}
      delta = new Delta
        deltas: [ arrDelta ],
        tweenOptions: tweenOptions,
        props: props

      delta._calcCurrent_array arrDelta, .5, .5

      strokeDasharray = delta._o.props['strokeDasharray'].split /\s/

      expect( parseFloat(strokeDasharray[0]) ).toBeCloseTo 75, 1
      expect( parseFloat(strokeDasharray[1]) ).toBeCloseTo 37.5, 1
      # expect( strokeDasharray.length ).toBeCloseTo 2

    # not now
    # it 'should reuse the props array', ->
    #   arrDelta =  h.parseDelta( 'strokeDasharray', { '0 100' : '200 0' }, 0 )
    #   arr = []
    #   props = { strokeDasharray: arr }
    #   delta = new Delta
    #     deltas: [ arrDelta ],
    #     tweenOptions: tweenOptions,
    #     props: props

    #   delta._calcCurrent_array arrDelta, .5, .5
    #   expect( delta._o.props['strokeDasharray'] ).toBe arr

  describe '_createTween method ->', ->
    it 'should create a tween', ->
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      delta.tween = null
      delta._createTween tweenOptions

      expect( delta.tween instanceof mojs.Tween ).toBe true

    it 'should pass options to the tween', ->
      tweenOptions = { duration: 200 }
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      delta.tween = null
      delta._createTween tweenOptions

      expect( delta.tween._o ).toBe tweenOptions

    it 'should add onUpdate callback override', ->
      tweenOptions = { duration: 200 }
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      delta.tween = null
      delta._createTween tweenOptions

      expect( typeof delta.tween._callbackOverrides.onUpdate )
        .toBe 'function'

      spyOn delta, '_calcCurrentProps'

      delta.tween._callbackOverrides.onUpdate( .2, .1 )

      expect( delta._calcCurrentProps ).toHaveBeenCalledWith .2, .1

    it 'should add onRefresh callback override', ->
      tweenOptions = { duration: 200 }
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      delta.tween = null
      delta._createTween tweenOptions

      expect( typeof delta.tween._callbackOverrides.onRefresh )
        .toBe 'function'

      spyOn delta, '_calcCurrentProps'

      delta.tween._callbackOverrides.onRefresh( true, .2, .1 )

      expect( delta._calcCurrentProps ).toHaveBeenCalledWith .2, .1

    it 'should add not onRefresh callback override is isChained', ->
      tweenOptions = { duration: 200 }
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props
        isChained: true

      delta.tween = null
      delta._createTween tweenOptions

      expect( typeof delta.tween._callbackOverrides.onRefresh )
        .toBe 'undefined'

    it 'should be called on initialization', ->
      spyOn(Delta.prototype, '_createTween').and.callThrough()
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      expect( Delta.prototype._createTween ).toHaveBeenCalledWith tweenOptions

    it 'should pass callbacksContext to tween', ->
      callbacksContext = {}
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props,
        callbacksContext: callbacksContext

      expect( delta.tween._o.callbacksContext ).toBe callbacksContext

  describe 'refresh method ->', ->
    it 'should call `_refresh` on `tween` // before', ->
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      spyOn(delta.tween, '_refresh').and.callThrough()

      delta.refresh( true )
      expect( delta.tween._refresh ).toHaveBeenCalledWith true

    it 'should call `_refresh` on `tween` // after', ->
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      spyOn(delta.tween, '_refresh').and.callThrough()

      delta.refresh( false )
      expect( delta.tween._refresh ).toHaveBeenCalledWith false

    it 'should save `_previousValues`', ->
      deltas  = [ h.parseDelta('x', { 0: 20 }, 0), h.parseDelta('y', { 20: 10 }, 0) ]
      props = { }
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      delta._previousValues = null
      
      delta.refresh( false )

      p = delta._previousValues
      expect( p[0].name ).toBe 'x'
      expect( p[0].value ).toBe '0px'

      expect( p[1].name ).toBe 'y'
      expect( p[1].value ).toBe '20px'

    it 'should return this', ->
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      result = delta.refresh( false )
      expect( result ).toBe delta


  describe 'restore method ->', ->
    it 'should call restore values from `_previousValues`', ->
      props = { }
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      props.z = null
      props.f = null
      delta._previousValues = [ { name: 'z', value: 20 }, { name: 'f', value: 40 } ]

      delta.restore()
      expect( props.z ).toBe 20
      expect( props.f ).toBe 40

    it 'should return `this`', ->
      props = { }
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      delta._previousValues = [ { name: 'z', value: 20 }, { name: 'f', value: 40 } ]

      result = delta.restore()
      expect( result ).toBe delta




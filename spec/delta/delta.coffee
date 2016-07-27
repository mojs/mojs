# import Delta from '../../js/delta/delta.babel.js'

# Module  = mojs.Module
Tween   = mojs.Tween
h       = mojs.h
Delta   = mojs._pool.Delta

deltas  = [ {}, {} ]
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

  describe '_createTween method', ->
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

    it 'should be called on initialization', ->
      spyOn Delta.prototype, '_createTween'
      delta = new Delta
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: props

      expect( Delta.prototype._createTween ).toHaveBeenCalledWith tweenOptions





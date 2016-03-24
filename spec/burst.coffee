Transit = mojs.Transit
Swirl   = mojs.Swirl
Burst   = mojs.Burst
t       = mojs.tweener
h       = mojs.h

describe 'Burst ->', ->
  beforeEach -> t.removeAll()

  describe 'extension ->', ->
    it 'should extend Transit class', ->
      burst = new Burst
      expect(burst instanceof Swirl).toBe true
  describe 'initialization ->', ->
    it 'should have _defaults', ->
      b = new Burst
      s = new Swirl
      # delete b._defaults.childOptions
      delete b._defaults.count
      delete b._defaults.degree
      b._defaults.radius = s._defaults.radius
      expect(b._defaults).toEqual s._defaults
    # it 'should have childOptions', ->
    #   b = new Burst
    #   expect(b._defaults.childOptions).toBe null
    it 'should add Burts properties' , ->
      b = new Burst
      expect(b._defaults.degree).toBe 360
      expect(b._defaults.count).toBe 5
    it 'should have _childDefaults', ->
      b = new Burst
      s = new Swirl

      for key, value of h.tweenOptionMap
        delete b._childDefaults[key]
      for key, value of h.callbacksMap
        delete b._childDefaults[key]

      b._childDefaults.isSwirl = true
      expect(b._childDefaults).toEqual s._defaults

    it 'should modify isSwirl', ->
      b = new Burst
      s = new Swirl
      expect(b._childDefaults.isSwirl).toBe false

    it 'should add tween options to _childDefaults', ->
      b = new Burst

      for key, value of h.tweenOptionMap
        expect(b._childDefaults[key]).toBe null
      for key, value of h.callbacksMap
        expect(b._childDefaults[key]).toBe null

    it 'should have _optionsIntersection', ->
      b = new Burst
      s = new Swirl
      expect(b._optionsIntersection['radius']) .toBe 1
      expect(b._optionsIntersection['radiusX']).toBe 1
      expect(b._optionsIntersection['radiusY']).toBe 1
      expect(b._optionsIntersection['angle'])  .toBe 1
      expect(b._optionsIntersection['opacity']).toBe 1
      expect(b._optionsIntersection['scale']).toBe 1

  describe '_createBit method ->', ->
    it 'should create _swirls array', ->
      b = new Burst
      b._createBit()
      expect(b._swirls.length).toBe b._props.count
    it 'should pass index to the swirls', ->
      b = new Burst
      b._createBit()
      expect(b._swirls[0]._o.index).toBe 0
      expect(b._swirls[1]._o.index).toBe 1
      expect(b._swirls[2]._o.index).toBe 2
      expect(b._swirls[3]._o.index).toBe 3
      expect(b._swirls[4]._o.index).toBe 4
    it 'should pass isTimelineLess option to the swirls', ->
      b = new Burst
      b._createBit()
      expect(b._swirls[0]._o.isTimelineLess).toBe true
      expect(b._swirls[1]._o.isTimelineLess).toBe true
      expect(b._swirls[2]._o.isTimelineLess).toBe true
      expect(b._swirls[3]._o.isTimelineLess).toBe true
      expect(b._swirls[4]._o.isTimelineLess).toBe true
    it 'should pass options to swirls', ->
      b = new Burst
      b._createBit()
      options0 = b._getOption 0
      delete options0.callbacksContext
      for key of options0
        expect(b._swirls[0]._o[key]).toEqual options0[key]
      options1 = b._getOption 1
      delete options1.callbacksContext
      for key of options1
        expect(b._swirls[1]._o[key]).toEqual options1[key]
      options2 = b._getOption 2
      delete options2.callbacksContext
      for key of options2
        expect(b._swirls[2]._o[key]).toEqual options2[key]

  describe '_getPropByMod method ->', ->
    it 'should fallback to empty object', ->
      burst = new Burst
        childOptions: radius: [ { 20: 50}, 20, '500' ]
      opt0 = burst._getPropByMod 'radius', 0
      expect(opt0).toBe undefined
    it 'should return the prop from passed object based on index ->', ->
      burst = new Burst
        childOptions: radius: [ { 20: 50}, 20, '500' ]
      opt0 = burst._getPropByMod 'radius', 0, burst._o.childOptions
      opt1 = burst._getPropByMod 'radius', 1, burst._o.childOptions
      opt2 = burst._getPropByMod 'radius', 2, burst._o.childOptions
      opt8 = burst._getPropByMod 'radius', 8, burst._o.childOptions
      expect(opt0[20]).toBe 50
      expect(opt1)    .toBe 20
      expect(opt2)    .toBe '500'
      expect(opt8)    .toBe '500'
    it 'should the same prop if not an array ->', ->
      burst = new Burst childOptions: radius: 20
      opt0 = burst._getPropByMod 'radius', 0, burst._o.childOptions
      opt1 = burst._getPropByMod 'radius', 1, burst._o.childOptions
      opt8 = burst._getPropByMod 'radius', 8, burst._o.childOptions
      expect(opt0).toBe 20
      expect(opt1).toBe 20
      expect(opt8).toBe 20
    it 'should work with another options object ->', ->
      burst = new Burst
        radius: 40
        childOptions: radius: 20
      from = burst._o
      opt0 = burst._getPropByMod 'radius', 0, from
      opt1 = burst._getPropByMod 'radius', 1, from
      opt8 = burst._getPropByMod 'radius', 8, from
      expect(opt0).toBe 40
      expect(opt1).toBe 40
      expect(opt8).toBe 40
  describe '_getOption method ->', ->
    it 'should return an option obj based on i ->', ->
      burst = new Burst
        childOptions: radius: [ { 20: 50}, 20, '500' ]
      option0 = burst._getOption 0
      option1 = burst._getOption 1
      option7 = burst._getOption 7
      expect(option0.radius[20]).toBe 50
      expect(option1.radius)    .toBe 20
      expect(option7.radius)    .toBe 20
    it 'should try to fallback to childDefaiults first ->', ->
      burst = new Burst
        duration: 2000
        childOptions: radius: [ 200, null, '500' ]
      option0 = burst._getOption 0
      option1 = burst._getOption 1
      option7 = burst._getOption 7
      option8 = burst._getOption 8
      expect(option0.radius)   .toBe 200
      expect(option1.radius[5]).toBe 0
      expect(option7.radius[5]).toBe 0
      expect(option8.radius)   .toBe '500'
    it 'should fallback to parent prop if defined  ->', ->
      burst = new Burst
        fill: 2000
        childOptions: fill: [ 200, null, '500' ]
      option0 = burst._getOption 0
      option1 = burst._getOption 1
      option7 = burst._getOption 7
      option8 = burst._getOption 8
      expect(option0.fill).toBe 200
      expect(option1.fill).toBe 2000
      expect(option7.fill).toBe 2000
      expect(option8.fill).toBe '500'
    it 'should fallback to parent default ->', ->
      burst = new Burst
        childOptions: fill: [ 200, null, '500' ]
      option0 = burst._getOption 0
      option1 = burst._getOption 1
      option7 = burst._getOption 7
      option8 = burst._getOption 8
      expect(option0.fill).toBe 200
      expect(option1.fill).toBe 'deeppink'
      expect(option7.fill).toBe 'deeppink'
      expect(option8.fill).toBe '500'
    it 'should have all the props filled ->', ->
      burst = new Burst
        childOptions: duration: [ 200, null, '500' ]
      option0 = burst._getOption 0
      option1 = burst._getOption 1
      option7 = burst._getOption 7
      option8 = burst._getOption 8
      expect(option0.radius[5]).toBe 0
      expect(option1.radius[5]).toBe 0
      expect(option7.radius[5]).toBe 0
      expect(option8.radius[5]).toBe 0
    it 'should have parent only options ->', ->
      burst = new Burst
        radius: { 'rand(10,20)': 100 }
        angle: {50: 0}
      option0 = burst._getOption 0
      expect(option0.radius[5]) .toBe 0
      expect(option0.angle)     .toBe 90

    it 'should parse stagger ->', ->
      burst = new Burst
        radius: { 0: 100 }
        count:  2,
        childOptions: {
          angle: 'stagger(20, 40)'
        }

      option0 = burst._getOption 0
      option1 = burst._getOption 1
      expect(option0.angle).toBe 90 + (20)
      expect(option1.angle).toBe 270 + (20 + 40)

    it 'should parse rand ->', ->
      burst = new Burst
        radius: { 0: 100 }
        count:  2,
        childOptions: {
          angle: 'rand(20, 40)'
        }

      option0 = burst._getOption 0
      option1 = burst._getOption 1
      expect(option0.angle).toBeGreaterThan 90 + (20)
      expect(option1.angle).not.toBeGreaterThan 270 + (20 + 40)

    # old
    # it 'should add x/y deltas to the _swirls ->', ->
    #   burst = new Burst
    #     radius: { 0: 100 }
    #     count:  2

    #   expect(burst._swirls[0]._o.x[0]).toBeCloseTo 0, 5
    #   expect(burst._swirls[0]._o.y[0]).toBe -100

    #   expect(burst._swirls[1]._o.x[0]).toBeCloseTo 0, 5
    #   expect(burst._swirls[1]._o.y[0]).toBe 100
    # old
    # it 'should parent option to swirls ->', ->
    #   burst = new Burst
    #     radius: { 0: 100 }
    #     count:  2

    #   expect(burst._swirls[0]._o.parent).toBe burst.el
    #   expect(burst._swirls[1]._o.parent).toBe burst.el

  describe '_calcSize method ->', ->
    it 'should calc set size to 2', ->
      bs = new Burst
      expect(bs._props.size).toBe 2
      expect(bs._props.center).toBe 1
    it 'should recieve size', ->
      bs = new Burst size: 40
      expect(bs._props.size).toBe 40
      expect(bs._props.center).toBe 20
  describe '_draw method ->', ->
    it 'should call _drawEl method ->', ->
      bs = new Burst
      spyOn bs, '_drawEl'
      bs._draw()
      expect(bs._drawEl).toHaveBeenCalled()

  describe '_transformTweenOptions method', ->
    it 'should call _applyCallbackOverrides with _o.timeline', ->
      tr = new Burst timeline: { delay: 200 }
      spyOn(tr, '_applyCallbackOverrides').and.callThrough()
      tr._transformTweenOptions()
      expect(tr._applyCallbackOverrides).toHaveBeenCalledWith tr._o.timeline
    it 'should fallback to an empty `timeline options` object on _o', ->
      tr = new Transit
      expect(tr._o.timeline).toBeDefined()

  describe '_makeTimeline method ->', ->
    it 'should call super _makeTimeline', ->
      bs = new Burst
      spyOn Burst.prototype, '_makeTimeline'
      bs._makeTimeline()
      expect(Burst.prototype._makeTimeline).toHaveBeenCalled()

    it 'should add swirls to the timeline', ->
      bs = new Burst
      bs.timeline._timelines.length = 0
      bs._makeTimeline()
      expect(bs.timeline._timelines.length).toBe bs._defaults.count

  describe '_makeTween method ->', ->
    it 'should override parent', ->
      bs = new Burst
      spyOn mojs.Tweenable.prototype, '_makeTween'
      bs._makeTween()
      expect(mojs.Tweenable.prototype._makeTween).not.toHaveBeenCalled()

  describe '_getSidePoint method ->', ->
    it 'should return the side\'s point', ->
      burst = new Burst radius: {5:25}, radiusX: {10:20}, radiusY: {30:10}
      point = burst._getSidePoint('start', 0)
      expect(point.x).toBeDefined()
      expect(point.y).toBeDefined()

  describe '_getSideRadius method ->', ->
    it 'should return the side\'s radius, radiusX and radiusY', ->
      burst = new Burst radius: {5:25}, radiusX: {10:20}, radiusY: {30:10}
      sides = burst._getSideRadius('start')
      expect(sides.radius) .toBe 5
      expect(sides.radiusX).toBe 10
      expect(sides.radiusY).toBe 30

  describe '_getRadiusByKey method ->', ->
    it 'should return the key\'s radius', ->
      burst = new Burst radius: {5:25}, radiusX: {10:20}, radiusY: {30:20}
      radius  = burst._getRadiusByKey('radius',  'start')
      radiusX = burst._getRadiusByKey('radiusX', 'start')
      radiusY = burst._getRadiusByKey('radiusX', 'end')
      expect(radius).toBe   5
      expect(radiusX).toBe 10
      expect(radiusY).toBe 20

  describe '_getDeltaFromPoints method ->', ->
    it 'should return the delta', ->
      burst = new Burst
      delta  = burst._getDeltaFromPoints('x', {x: 10, y: 20}, {x: 20, y: 40})
      expect(delta[10]).toBe 20
    it 'should return one value if start and end positions are equal', ->
      burst = new Burst
      delta  = burst._getDeltaFromPoints('x', {x: 10, y: 20}, {x: 10, y: 40})
      expect(delta).toBe 10


  describe '_addOptionalProperties method ->', ->
    it 'should return the passed object', ->
      burst = new Burst
      obj = {}
      result = burst._addOptionalProperties obj, 0
      expect(result).toBe obj
    it 'should add parent, index and isTimelineLess', ->
      burst = new Burst
      obj = {}
      result = burst._addOptionalProperties obj, 0
      expect(result.index).toBe 0
      expect(result.parent).toBe burst.el
      expect(result.isTimelineLess).toBe true

    it 'should hard rewrite `left` and `top` properties to 50%', ->
      burst = new Burst
      obj = {}
      result = burst._addOptionalProperties obj, 0
      expect(result.left).toBe '50%'
      expect(result.top).toBe '50%'

    it 'should add x/y ->', ->
      burst = new Burst
        radius: { 0: 100 }
        count:  2,
        size: 0,

      obj0 = {}
      obj1 = {}
      result0 = burst._addOptionalProperties obj0, 0
      result1 = burst._addOptionalProperties obj1, 1

      expect(obj0.x[0]).toBeCloseTo 0, 5
      expect(obj0.y[0]).toBeCloseTo -100, 5

      expect(obj1.x[0]).toBeCloseTo 0, 5
      expect(obj1.y[0]).toBeCloseTo 100, 5

    it 'should add x/y ->', ->
      burst = new Burst
        radius: { 0: 100 }
        count:  2,
        size: 0,

      obj0 = {}
      obj1 = {}
      result0 = burst._addOptionalProperties obj0, 0
      result1 = burst._addOptionalProperties obj1, 1

      expect(obj0.x[0]).toBeCloseTo 0, 5
      expect(obj0.y[0]).toBeCloseTo -100, 5

      expect(obj1.x[0]).toBeCloseTo 0, 5
      expect(obj1.y[0]).toBeCloseTo 100, 5

    it 'should add angles ->', ->
      burst = new Burst
        radius: { 0: 100 }
        count:  2

      obj0 = { angle: 0 }
      obj1 = { angle: 0 }
      result0 = burst._addOptionalProperties obj0, 0
      result1 = burst._addOptionalProperties obj1, 1

      expect(obj0.angle).toBe 90
      expect(obj1.angle).toBe 270

  describe '_getBitAngle method ->', ->
    it 'should get angle by i', ->
      burst = new Burst radius: { 'rand(10,20)': 100 }
      expect(burst._getBitAngle(0, 0)).toBe 90
      expect(burst._getBitAngle(0, 1)).toBe 162
      expect(burst._getBitAngle(0, 2)).toBe 234
      expect(burst._getBitAngle(90, 2)).toBe 234 + 90
      expect(burst._getBitAngle(0, 3)).toBe 306
      expect(burst._getBitAngle(90, 3)).toBe 306 + 90
      expect(burst._getBitAngle(0, 4)).toBe 378
      expect(burst._getBitAngle(50, 4)).toBe 378 + 50
    it 'should get delta angle by i', ->
      burst = new Burst radius: { 'rand(10,20)': 100 }
      expect(burst._getBitAngle({180:0}, 0)[270]).toBe 90
      expect(burst._getBitAngle({50:20}, 3)[356]).toBe 326
      expect(burst._getBitAngle({50:20}, 4)[428]).toBe 398

    it 'should work with `stagger` values', ->
      burst = new Burst count: 2
      
      expect(burst._getBitAngle({'stagger(20, 10)':0}, 0)[110]).toBe 90
      expect(burst._getBitAngle({'stagger(20, 10)':0}, 1)[300]).toBe 270

      expect(burst._getBitAngle({0:'stagger(20, 10)'}, 1)[270]).toBe 300

    it 'should work with `random` values', ->
      burst = new Burst count: 2
      
      angle = burst._getBitAngle({'rand(10, 20)':0}, 0)
      for key, value in angle
        baseAngle = 90
        expect(parseInt(key)).toBeGreaterThan  baseAngle + 10
        expect(parseInt(key)).not.toBeGreaterThan baseAngle + 20
        expect(parseInt(value)).toBe baseAngle

      angle = burst._getBitAngle({'rand(10, 20)':0}, 1)
      for key, value in angle
        baseAngle = 270
        expect(parseInt(key)).toBeGreaterThan  baseAngle + 10
        expect(parseInt(key)).not.toBeGreaterThan baseAngle + 20
        expect(parseInt(value)).toBe baseAngle

      angle = burst._getBitAngle({0:'rand(10, 20)'}, 1)
      for key, value in angle
        baseAngle = 270
        expect(parseInt(key)).toBe baseAngle
        expect(parseInt(value)).toBeGreaterThan  baseAngle + 10
        expect(parseInt(value)).not.toBeGreaterThan baseAngle + 20

  describe '_extendDefaults method ->', ->
    it 'should call super', ->
      b = new Burst
      spyOn Swirl.prototype, '_extendDefaults'
      b._extendDefaults()
      expect(Swirl.prototype._extendDefaults)
        .toHaveBeenCalled()

    it 'should call _calcSize', ->
      b = new Burst
      spyOn b, '_calcSize'
      b._extendDefaults()
      expect(b._calcSize).toHaveBeenCalled()

  #   it 'should have its own defaults', ->
  #     burst = new Burst
  #     # skip childOptions from _extendDefaults
  #     expect(burst.skipProps.childOptions).toBe 1
  #     # presentation props
  #     expect(burst._defaults.degree) .toBe       360
  #     expect(burst._defaults.count) .toBe        5
  #     expect(burst._defaults.opacity).toBe       1
  #     expect(burst._defaults.randomAngle) .toBe  0
  #     expect(burst._defaults.randomRadius).toBe  0
  #     # position props/el props
  #     expect(burst._defaults.left).toBe          100
  #     expect(burst._defaults.top).toBe           100
  #     expect(burst._defaults.x).toBe             0
  #     expect(burst._defaults.y).toBe             0
  #     # size props
  #     expect(burst._defaults.radius[25]) .toBe  75
  #     expect(burst._defaults.angle)      .toBe  0
  #     expect(burst._defaults.size)       .toBe  null
  #     expect(burst._defaults.sizeGap)    .toBe  0
  #   it 'should have _childDefaults', ->
  #     burst = new Burst
  #     expect(burst._childDefaults.radius[7]).toBe 0
  #     expect(burst._childDefaults.points)   .toBe 3
  #     expect(burst._childDefaults.angle)    .toBe 0
  #     # callbacks
  #     # expect(burst._childDefaults.onStart)   .toBe null
  #     # expect(burst._childDefaults.onComplete).toBe null
  #     # expect(burst._childDefaults.onUpdate)  .toBe null
  #     # expect(burst._childDefaults.duration)         .toBe  500
  #     # expect(burst._childDefaults.delay)            .toBe  0
  #     # expect(burst._childDefaults.repeat)           .toBe  0
  #     # expect(burst._childDefaults.yoyo)             .toBe  false
  #     # expect(burst._childDefaults.easing)           .toBe  'Linear.None'
  #     expect(burst._childDefaults.shape)            .toBe  'circle'
  #     expect(burst._childDefaults.fill)             .toBe  'deeppink'
  #     expect(burst._childDefaults.fillOpacity)      .toBe  1
  #     expect(burst._childDefaults.stroke)           .toBe  'transparent'
  #     expect(burst._childDefaults.strokeWidth)      .toBe  2
  #     expect(burst._childDefaults.strokeDasharray)  .toBe  ''
  #     expect(burst._childDefaults.strokeDashoffset) .toBe  0
  #     # expect(burst._childDefaults.strokeLinecap)    .toBe  null
  #     # expect(burst._childDefaults.isSwirl)          .toBe  false
  #     # expect(burst._childDefaults.swirlSize)        .toBe  10
  #     # expect(burst._childDefaults.swirlFrequency)   .toBe  3
  #   it 'should have _optionsIntersection object', ->
  #     burst = new Burst
  #     expect(burst._optionsIntersection.radius)    .toBe 1
  #     expect(burst._optionsIntersection.radiusX)   .toBe 1
  #     expect(burst._optionsIntersection.radiusY)   .toBe 1
  #     expect(burst._optionsIntersection.opacity)   .toBe 1
  #     expect(burst._optionsIntersection.angle)     .toBe 1
  #     expect(burst._optionsIntersection.onUpdate)  .toBe 1
  #     expect(burst._optionsIntersection.onStart)   .toBe 1
  #     expect(burst._optionsIntersection.onComplete).toBe 1
  #     expect(Object.keys(burst._optionsIntersection).length).toBe 8
  # describe 'initialization ->', ->
  #   it 'should create transits', ->
  #     burst = new Burst
  #     expect(burst._transits.length).toBe 5
  #     expect(burst._transits[0] instanceof Swirl).toBe true
  #   it 'should pass indexes to transits', ->
  #     burst = new Burst
  #     expect(burst._transits.length).toBe 5
  #     expect(burst._transits[0]._o.index).toBe 0
  #     expect(burst._transits[1]._o.index).toBe 1
  #     expect(burst._transits[2]._o.index).toBe 2
  #     expect(burst._transits[3]._o.index).toBe 3
  #     expect(burst._transits[4]._o.index).toBe 4
  #   it 'should pass properties to transits', ->
  #     burst = new Burst
  #       stroke: 'red'
  #       strokeWidth:    {10:0}
  #       strokeOpacity:  {1:0}
  #       strokeDasharray:  '200 10 0'
  #       strokeDashoffset: '50'
  #       strokeLinecap:    'round'
  #       fill: 'deeppink'
  #       fillOpacity: .5
  #       shape: 'rect'
  #       swirlSize: 20
  #       swirlFrequency: 'rand(10,20)'
  #       count: 6
  #       isSwirl: true
  #       radius: {'rand(10,20)': 100}
  #       childOptions:
  #         stroke: [ 'deeppink', 'yellow', null ]
  #         strokeWidth: [null, null, 20]
  #         strokeOpacity: [null, 1 ,null]
  #         fill:   ['#fff', null]
  #         shape:  ['circle', null, 'polygon']
  #         swirlSize: [10, null]
  #         swirlFrequency: [null, 3]
  #         radius: [ { 20: 50}, 20, '500' ]
  #         strokeDasharray: ['10 20', null, { '40': '10' }]
  #         strokeDashoffset: ['200', null, null]
  #         fillOpacity:  [null, 1]
  #         strokeLinecap: ['butt', null]
  #         points: [10, null, 10]
  #     expect(burst._transits[0]._o.radius[20]).toBe 50
  #     expect(burst._transits[1]._o.radius)    .toBe 20
  #     expect(burst._transits[2]._o.radius)    .toBe '500'
  #     expect(burst._transits[3]._o.radius[20]).toBe 50
  #     expect(burst._transits[4]._o.radius)    .toBe 20
      
  #     expect(burst._transits[0]._o.stroke)    .toBe 'deeppink'
  #     expect(burst._transits[1]._o.stroke)    .toBe 'yellow'
  #     expect(burst._transits[2]._o.stroke)    .toBe 'red'
  #     expect(burst._transits[3]._o.stroke)    .toBe 'deeppink'

  #     expect(burst._transits[3]._o.strokeWidth[10]).toBe 0
  #     expect(burst._transits[1]._o.strokeWidth[10]).toBe 0
  #     expect(burst._transits[2]._o.strokeWidth).toBe 20

  #     expect(burst._transits[0]._o.fill)      .toBe '#fff'
  #     expect(burst._transits[1]._o.fill)      .toBe 'deeppink'

  #     expect(burst._transits[0]._o.fillOpacity).toBe .5
  #     expect(burst._transits[1]._o.fillOpacity).toBe 1

  #     expect(burst._transits[0]._o.isSwirl)       .toBe  true
  #     expect(burst._transits[0]._o.swirlSize)     .toBe  10
  #     expect(burst._transits[1]._o.swirlSize)     .toBe  20
      
  #     expect(burst._transits[0]._o.swirlFrequency).toBe  'rand(10,20)'
  #     expect(burst._transits[1]._o.swirlFrequency).toBe  3
      
  #     expect(burst._transits[0]._o.shape).toBe     'circle'
  #     expect(burst._transits[1]._o.shape).toBe     'rect'
  #     expect(burst._transits[2]._o.shape).toBe     'polygon'

  #     expect(burst._transits[0]._o.strokeOpacity[1]).toBe     0
  #     expect(burst._transits[1]._o.strokeOpacity)   .toBe     1
  #     expect(burst._transits[2]._o.strokeOpacity[1]).toBe     0

  #     expect(burst._transits[0]._o.strokeDasharray).toBe        '10 20'
  #     expect(burst._transits[1]._o.strokeDasharray).toBe        '200 10 0'
  #     expect(burst._transits[2]._o.strokeDasharray['40']).toBe  '10'

  #     expect(burst._transits[0]._o.strokeDashoffset).toBe  '200'
  #     expect(burst._transits[1]._o.strokeDashoffset).toBe  '50'
  #     expect(burst._transits[2]._o.strokeDashoffset).toBe  '50'

  #     expect(burst._transits[0]._o.strokeLinecap).toBe  'butt'
  #     expect(burst._transits[1]._o.strokeLinecap).toBe  'round'
  #     expect(burst._transits[2]._o.strokeLinecap).toBe  'butt'

  #     expect(burst._transits[0]._o.points).toBe  10
  #     expect(burst._transits[1]._o.points).toBe  3
  #     expect(burst._transits[2]._o.points).toBe  10
  #   it 'should keep the bit angle', ->
  #     burst = new Burst
  #       radius: 2
  #       childOptions: angle: [10, null]
  #     expect(burst._transits[0]._o.angle).toBe 100
  #     expect(burst._transits[1]._o.angle).toBe 162
  #   it 'should keep the bit angle if delta passed', ->
  #     burst = new Burst
  #       radius: 2
  #       childOptions: angle: [{200: 10}, null]
  #     expect(burst._transits[0]._o.angle[290]).toBe 100
  #     expect(burst._transits[1]._o.angle)     .toBe 162
  #   it 'should not keep the bit angle if isResetAngles is passed', ->
  #     burst = new Burst
  #       count: 2
  #       radius: 2
  #       isResetAngles: true
  #       childOptions: angle: [{200: 10}, null]
  #     # console.log burst._transits[0]._o.angle
  #     # console.log burst._transits[1]._o.angle
  #     expect(burst._transits[0]._o.angle[200]).toBe 10
  #     expect(burst._transits[1]._o.angle)     .toBe 0
  #   it 'should pass x/y to transits', ->
  #     burst = new Burst
  #       radius: { 50: 75 }
  #       count: 2
  #     center = burst._props.center
  #     expect(burst._transits[0]._o.x).toBe center
  #     expect(burst._transits[0]._o.y[center - 50]).toBe center - 75
  #     expect(burst._transits[1]._o.x).toBe center
  #     expect(burst._transits[1]._o.y[center + 50]).toBe center + 75
  # # describe '_isNeedsTransform method ->', ->
  # #   it 'return boolean if _fillTransform needed', ->
  # #     burst = new Burst x: 100, y: 100, angle: 50
  # #     expect(burst._isNeedsTransform()).toBe true
  # describe 'randomness ->', ->
  #   describe 'random angle ->', ->
  #     it 'should have randomAngle option ->', ->
  #       burst = new Burst
  #       expect(burst._props.randomAngle).toBeDefined()
  #       expect(burst._props.randomAngle).toBe 0
  #     it 'should calculate angleRand for every transit ->', ->
  #       burst = new Burst randomAngle: true
  #       expect(burst._transits[0]._o.angleShift).toBeDefined()
  #       expect(burst._transits[1]._o.angleShift).toBeDefined()
  #   describe 'random radius ->', ->
  #     it 'should have randomRadius option ->', ->
  #       burst = new Burst
  #       expect(burst._props.randomRadius).toBeDefined()
  #       expect(burst._props.randomRadius).toBe 0
  #     it 'should calculate radiusRand for every transit ->', ->
  #       burst = new Burst randomRadius: true
  #       expect(burst._transits[0]._o.radiusScale).toBeDefined()
  #       expect(burst._transits[1]._o.radiusScale).toBeDefined()
  # describe 'size calculations _calcSize method ->', ->
  #   it 'should calculate size based on largest transit + self radius', ->
  #     burst = new Burst
  #       radius: 50
  #       childOptions:
  #         radius:      [{ 20: 50 }, 20]
  #         strokeWidth: 20
      
  #     expect(burst._props.size)  .toBe 240
  #     expect(burst._props.center).toBe 120


  #   it 'should calculate size based on largest transit + self radius #2', ->
  #     burst = new Burst
  #       radius: 50, radiusX: 100
  #       childOptions:
  #         radius:      [{ 20: 50 }, 20]
  #         strokeWidth: 20
  #     expect(burst._props.size)  .toBe 340
  #     expect(burst._props.center).toBe 170
  #   it 'should calculate size based on largest transit + self radius #3', ->
  #     burst = new Burst
  #       radius: {20: 50}, radiusX: 20
  #       childOptions:
  #         radius:      [{ 20: 50 }, 20]
  #         strokeWidth: 20
  #     expect(burst._props.size)  .toBe 240
  #     expect(burst._props.center).toBe 120
  #   it 'should calculate size based on largest transit + self radius #4', ->
  #     burst = new Burst
  #       radius: 50, radiusY: {20: 100}
  #       childOptions:
  #         radius:      [{ 20: 50 }, 20]
  #         strokeWidth: 20
  #     expect(burst._props.size)  .toBe 340
  #     expect(burst._props.center).toBe 170
  #   it 'should calculate size based on largest transit + self radius #5', ->
  #     burst = new Burst
  #       childOptions:
  #         radius:      [{ 20: 50 }, 20]
  #         strokeWidth: 20
  #     expect(burst._props.size)  .toBe 290
  #     expect(burst._props.center).toBe 145
  #   it 'should call the _calcSize of every transit', ->
  #     burst = new Burst
  #       childOptions:
  #         radius:      [{ 20: 50 }, 20]
  #         strokeWidth: 20
  #     spyOn burst._transits[0], '_calcSize'
  #     spyOn burst._transits[1], '_calcSize'
  #     burst._calcSize()
  #     expect(burst._transits[0]._calcSize).toHaveBeenCalled()
  #     expect(burst._transits[1]._calcSize).toHaveBeenCalled()
  #   it 'should call _addBitOptions method', ->
  #     burst = new Burst
  #     spyOn burst, '_addBitOptions'
  #     burst._calcSize()
  #     expect(burst._addBitOptions).toHaveBeenCalled()

  #   it 'should work with sizeGap', ->
  #     burst = new Burst
  #       sizeGap: 20
  #       childOptions:
  #         radius:      [{ 20: 50 }, 20]
  #         strokeWidth: 20
  #     expect(burst._props.size)  .toBe 330
  #     expect(burst._props.center).toBe burst._props.size/2

  # describe '_addBitOptions method ->', ->
  #   it 'should set x/y on every transit', ->
  #     burst = new Burst radius: {0: 120}
  #     expect(typeof burst._transits[1]._o.x).toBe 'object'
  #   it 'should work if end radius is 0', ->
  #     burst = new Burst radius: {120: 0}
  #     x = burst._transits[1]._o.x; keys = Object.keys x
  #     expect(x[keys[0]]+'').not.toBe keys[0]
  #   it 'should work with radiusX', ->
  #     burst = new Burst
  #       radius: {120: 0}, radiusX: 30
  #     expect(parseInt(burst._transits[1]._o.x,10)).toBe 157
  #   it 'should work with radiusY', ->
  #     burst = new Burst
  #       radius: {120: 0}, radiusY: {30: 0}
  #     keys = Object.keys(burst._transits[1]._o.y)
  #     center = burst._props.center
  #     expect(burst._transits[1]._o.y[keys[0]]).toBe center
  #   it 'should increase angle and position delta on angleShift', ->
  #     burst1 = new Burst radius: {120: 0}, count: 2
  #     burst2 = new Burst radius: {120: 0}, count: 2, randomAngle: .5
  #     expect(burst2._transits[1]._o.angle)
  #       .toBe burst1._transits[1]._o.angle+burst2._transits[1]._props.angleShift

  #   it 'should increase angle and position delta on angleShift for deltas', ->
  #     burst1 = new Burst
  #       radius: {120: 0}, count: 2, childOptions: angle: {25: 50}
  #     burst2 = new Burst
  #       radius: {120: 0}, count: 2, randomAngle: 1
  #       childOptions: angle: {25: 50}
  #     start2 = burst2._transits[1]._deltas.angle.start
  #     end2   = burst2._transits[1]._deltas.angle.start
  #     start1 = burst1._transits[1]._deltas.angle.start
  #     end1   = burst1._transits[1]._deltas.angle.start
  #     expect(start2)
  #       .toBe start1+burst2._transits[1]._props.angleShift
  #     expect(end2)
  #       .toBe end1+burst2._transits[1]._props.angleShift
  #   it 'should increase position', ->
  #     burst1 = new Burst radius: 50, count: 2
  #     burst2 = new Burst radius: 50, count: 2, randomAngle: .5
  #     expect(burst2._transits[1]._o.x)
  #       .not.toBe burst1._transits[1]._o.x
  #     expect(burst2._transits[1]._o.y)
  #       .not.toBe burst1._transits[1]._o.y

  #   it 'should keep degreeCnt not less than 1', ->
  #     burst = new Burst radius: {0: 120}, degree: 270, count:  1
  #     expect(burst.degreeCnt).toBe 1

  # # describe 'createTween method ->', ->
  # #   it 'should create tween', ->
  # #     burst = new Burst
  # #     expect(burst.timeline).toBeDefined()
  # #   it 'should add tweens to timeline', ->
  # #     burst = new Burst
  # #     expect(burst.timeline._timelines.length).toBe 6

  # # describe 'onStart callback ->', ->
  # #   it 'should run onStart callback', (dfr)->
  # #     burst = new Burst onStart:->
  # #     spyOn burst._props, 'onStart'
  # #     burst.run()
  # #     setTimeout ->
  # #       expect(burst._props.onStart).toHaveBeenCalled(); dfr()
  # #     , 500
  # #   it 'should have the scope of burst', (dfr)->
  # #     isRightScope = null
  # #     burst = new Burst onStart:-> isRightScope = @ instanceof Burst
  # #     burst.run()
  # #     setTimeout ->
  # #       expect(isRightScope).toBe(true); dfr()
  # #     , 500

  # # # describe 'onComplete callback ->', ->
  # # #   it 'should run onComplete callback', (dfr)->
  # # #     t.removeAll()
  # # #     burst = new Burst
  # # #       duration: 200, onComplete:-> expect(true).toBe(true); dfr()
  # # #     burst.run()
  # # #   it 'should have the scope of burst', (dfr)->
  # # #     # timeout to fix jasmine's issue
  # # #     setTimeout ->
  # # #       t.removeAll()
  # # #       isRightScope = null
  # # #       burst = new Burst
  # # #         duration: 200, onComplete:-> isRightScope = @ instanceof Burst
  # # #       burst.run()
  # # #       setTimeout ->
  # # #         expect(isRightScope).toBe(true); dfr()
  # # #       , 500
  # # #     , 1

  # # # describe 'onUpdate callback ->', ->
  # # #   t.removeAll()
  # # #   it 'should run onUpdate callback', (dfr)->
  # # #     burst = new Burst
       
  # # #       duration: 200
  # # #       onUpdate:->
  # # #     spyOn burst, 'onUpdate'
  # # #     burst.run()
  # # #     setTimeout ->
  # # #       expect(burst.onUpdate).toHaveBeenCalledWith(1); dfr()
  # # #     , 500
  # # #   it 'should have the scope of burst', (dfr)->
  # # #     t.removeAll()
  # # #     isRightScope = null
  # # #     burst = new Burst
  # # #       duration: 200
  # # #       onUpdate:-> isRightScope = @ instanceof Burst
  # # #     burst.run()
  # # #     setTimeout (-> expect(isRightScope).toBe(true); dfr()), 500
  
  # # # describe 'then method ->', ->
  # # #   it 'should call the h.error method', ->
  # # #     burst = new Burst
  # # #     spyOn burst.h, 'error'
  # # #     burst.then()
  # # #     expect(burst.h.error).toHaveBeenCalled()
  # # #   # it 'should call then method on every transit', ->
  # # #   #   burst = new Burst
  # # #   #     radius: { 20: 50 }, count: 2
  # # #   #     duration: 10
  # # #   #     childOptions:
  # # #   #       duration: [null, 200]
  # # #   #   spyOn burst._transits[0], 'then'
  # # #   #   spyOn burst._transits[1], 'then'
  # # #   #   burst.then radius: 0
  # # #   #   expect(burst._transits[0].then).toHaveBeenCalledWith duration: 10
  # # #   #   expect(burst._transits[1].then).toHaveBeenCalledwith duration: 200

  # # # describe 'run method ->', ->
  # # #   it 'should call _extendDefaults', ->
  # # #     burst = new Burst radius: { 20: 50 }
  # # #     spyOn burst, '_extendDefaults'
  # # #     o = { radius: 10}
  # # #     burst.run o
  # # #     expect(burst._extendDefaults).toHaveBeenCalledWith o
  # # #   it 'should return this', ->
  # # #     burst = new Burst radius: { 20: 50 }
  # # #     returnValue = burst.run()
  # # #     expect(returnValue).toBe burst
  # # #   it 'should not call _extendDefaults if no obj passed', ->
  # # #     burst = new Burst radius: { 20: 50 }
  # # #     spyOn burst, '_extendDefaults'
  # # #     burst.run()
  # # #     expect(burst._extendDefaults).not.toHaveBeenCalled()
  # # #   it 'should recieve new options', ->
  # # #     burst = new Burst radius: { 20: 50 }
  # # #     burst.run radius: 10
  # # #     expect(burst._props.radius).toBe  10
  # # #     expect(burst._deltas.radius).not.toBeDefined()
  # # #   it 'should recieve new child options', ->
  # # #     burst = new Burst radius: { 20: 50 }, duration: 400
  # # #     burst.run duration: 500, childOptions: duration: [null, 1000, null]
      
  # # #     expect(burst._o.childOptions).toBeDefined()
  # # #     expect(burst._transits[0]._o.duration).toBe 500
  # # #     expect(burst._transits[1]._o.duration).toBe 1000
  # # #     expect(burst._transits[2]._o.duration).toBe 500
  # # #   it 'should extend old childOptions', ->
  # # #     burst = new Burst
  # # #       duration: 400, childOptions: fill: 'deeppink'
  # # #     newDuration = [null, 1000, null]
  # # #     burst.run duration: 500, childOptions: duration: newDuration
  # # #     expect(burst._o.childOptions.fill)    .toBe 'deeppink'
  # # #     expect(burst._o.childOptions.duration).toBe newDuration
  # # #   it 'should call _recalcTotalDuration on tween', ->
  # # #     burst = new Burst
  # # #       duration: 400, childOptions: fill: 'deeppink'
  # # #     newDuration = [null, 1000, null]
  # # #     spyOn burst.timeline, '_recalcTotalDuration'
  # # #     burst.run duration: 500, childOptions: duration: newDuration
  # # #     expect(burst.timeline._recalcTotalDuration).toHaveBeenCalled()
  # # #   it 'should start timeline', ->
  # # #     burst = new Burst
  # # #     spyOn burst, 'play'
  # # #     burst.run duration: 500
  # # #     expect(burst.play).toHaveBeenCalled()
  # # #   it 'should call _generateRandomAngle method if randomAngle was passed', ->
  # # #     burst = new Burst randomAngle: .1
  # # #     spyOn burst, '_generateRandomAngle'
  # # #     burst.run()
  # # #     expect(burst._generateRandomAngle).toHaveBeenCalled()
  # # #   it 'should not call _generateRandomAngle method', ->
  # # #     burst = new Burst
  # # #     spyOn burst, '_generateRandomAngle'
  # # #     burst.run()
  # # #     expect(burst._generateRandomAngle).not.toHaveBeenCalled()
  # # #   it 'should call _generateRandomRadius method if randomAngle was passed', ->
  # # #     burst = new Burst randomRadius: .1
  # # #     spyOn burst, '_generateRandomRadius'
  # # #     burst.run()
  # # #     expect(burst._generateRandomRadius).toHaveBeenCalled()
  # # #   it 'should not call _generateRandomRadius method', ->
  # # #     burst = new Burst
  # # #     spyOn burst, '_generateRandomRadius'
  # # #     burst.run()
  # # #     expect(burst._generateRandomRadius).not.toHaveBeenCalled()
  # # #   it 'should warn if count was passed', ->
  # # #     burst = new Burst
  # # #     spyOn burst.h, 'warn'
  # # #     burst.run count: 10
  # # #     expect(burst.h.warn).toHaveBeenCalled()
  # # #   it 'should keep angles on run', ->
  # # #     burst = new Burst
  # # #     burst.run count: 10
  # # #     expect(burst._transits[3]._o.angle).toBe 306
  # # #   it 'should recieve new angle options', ->
  # # #     burst = new Burst
  # # #     burst.run childOptions: angle: 90
  # # #     expect(burst._transits[3]._o.angle).toBe 396
  # # #     expect(burst._transits[4]._o.angle).toBe 468
  # # #   it 'should recieve new angle delta options', ->
  # # #     burst = new Burst
  # # #     burst.run childOptions: angle: 90: 0
  # # #     expect(burst._transits[3]._o.angle[396]).toBe 306
  # # #     expect(burst._transits[4]._o.angle[468]).toBe 378
  # # #   it 'should skip circular shape angle on isResetAngles', ->
  # # #     burst = new Burst
  # # #     burst.run isResetAngles: true, childOptions: angle: 90: 0
  # # #     expect(burst._transits[3]._o.angle[90]).toBe 0
  # # #     expect(burst._transits[4]._o.angle[90]).toBe 0


  # describe '_generateRandomAngle method ->', ->
  #   it 'should generate random angle based on randomness', ->
  #     burst = new Burst randomAngle: .5
  #     angle = burst._generateRandomAngle()
  #     expect(angle).toBeGreaterThan     -1
  #     expect(angle).not.toBeGreaterThan 180
  #   it 'should generate random angle based on randomness #2', ->
  #     burst = new Burst randomAngle: .75
  #     angle = burst._generateRandomAngle()
  #     expect(angle).toBeGreaterThan     -1
  #     expect(angle).not.toBeGreaterThan 270
  # describe '_generateRandomRadius method ->', ->
  #   it 'should generate random radius based on randomness', ->
  #     burst = new Burst randomRadius: .75
  #     radius = burst._generateRandomRadius()
  #     expect(radius).toBeGreaterThan     .24
  #     expect(radius).not.toBeGreaterThan 1

  # describe 'draw method ->', ->
  #   it 'should not call _drawEl method', ->
  #     burst = new Burst
  #     spyOn burst, '_drawEl'
  #     burst._draw()
  #     expect(burst._drawEl).toHaveBeenCalled()
  #   it 'should call _fillTransform method', ->
  #     burst = new Burst radius: 25
  #     spyOn burst, '_fillTransform'
  #     burst._draw()
  #     expect(burst._fillTransform).toHaveBeenCalled()

















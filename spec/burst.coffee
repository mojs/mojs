Transit  = mojs.Transit
Swirl    = mojs.Swirl
Burst    = mojs.Burst
Tunable  = mojs.Tunable
Tunable  = mojs.Tunable
t        = mojs.tweener
h        = mojs.h

describe 'Burst ->', ->
  beforeEach -> t.removeAll()

  describe 'extension ->', ->
    it 'should extend Transit class', ->
      burst = new Burst
      expect(burst instanceof Tunable).toBe true

  describe '_defaults ->', ->
    it 'should have Burst\'s defaults', ->
      burst = new Burst
      expect(burst._defaults.count).toBe 5
      expect(burst._defaults.degree).toBe 360
      expect(burst._defaults.radius).toEqual { 0 : 50 }
      expect(burst._defaults.radiusX).toEqual null
      expect(burst._defaults.radiusY).toEqual null
      expect(burst._defaults.isSwirl).toEqual false

  describe '_render method ->', ->
    it 'should create master swirl', ->
      burst = new Burst
      burst.masterSwirl = undefined
      burst._render()
      expect(burst.masterSwirl instanceof Swirl).toBe true

    it 'should pass options to master swirl', ->
      opts = {}
      burst = new Burst opts
      burst.masterSwirl = undefined
      burst._render()
      expect(burst.masterSwirl._o).toBe opts

    it 'should pass isWithShape option to master swirl', ->
      opts = {}
      burst = new Burst opts
      expect(burst.masterSwirl._o.isWithShape).toBe false

    it 'should pass radius option to master swirl', ->
      opts = {}
      burst = new Burst opts
      expect(burst.masterSwirl._o.radius).toBe 0

    it 'should call _renderSwirls method', ->
      opts = {}
      burst = new Burst opts
      spyOn burst, '_renderSwirls'
      burst._render()
      expect(burst._renderSwirls).toHaveBeenCalled()

    it 'should create _masterSwirls object', ->
      burst = new Burst
      expect(burst._masterSwirls[0]).toBe burst.masterSwirl
      expect(typeof burst._masterSwirls).toBe 'object'
      # not null
      expect(burst._masterSwirls).toBe burst._masterSwirls

    it 'should add optional properties to option', ->
      burst = new Burst
      spyOn burst, '_addOptionalProps'
      burst._renderSwirls()
      
      expect(burst._addOptionalProps.calls.count()).toBe 5

    it 'should set time on tween of masterSwirl', ->
      burst = new Burst
        childOptions:
          duration: 'stagger(500, 1000)'
          repeat: 2
      burst.masterSwirl.tween._props.duration = null
      burst._renderSwirls()
      expect(burst.masterSwirl.tween._props.duration)
        .toBe burst._calcPackTime burst._swirls[0]

  describe '_renderSwirls method', ->
    it 'should create _swirls object', ->
      burst = new Burst
      expect(typeof burst._swirls).toBe 'object'
      # not null
      expect(burst._swirls).toBe burst._swirls

    it 'should create _swirls pack', ->
      count = 5
      burst = new Burst count: count
      pack = burst._swirls[0]
      expect( h.isArray(pack) ).toBe true
      expect( pack.length ).toBe count
      expect( pack[0] instanceof Swirl ).toBe true
      expect( pack[1] instanceof Swirl ).toBe true
      expect( pack[2] instanceof Swirl ).toBe true
      expect( pack[3] instanceof Swirl ).toBe true
      expect( pack[4] instanceof Swirl ).toBe true

    it 'should pass options to swirls', ->
      count = 5; fills = [ 'cyan', 'yellow', 'blue' ]
      burst = new Burst
        count: count
        childOptions:
          fill: fills
      pack = burst._swirls[0]
      expect( pack[0]._o.fill ).toBe fills[0]
      expect( pack[1]._o.fill ).toBe fills[1]
      expect( pack[2]._o.fill ).toBe fills[2]
      expect( pack[3]._o.fill ).toBe fills[0]
      expect( pack[4]._o.fill ).toBe fills[1]

    it 'should parent to swirls', ->
      count = 5
      burst = new Burst
        count: count
        # childOptions: {}

      pack = burst._swirls[0]
      expect( pack[0]._o.parent ).toBe burst.masterSwirl.el
      expect( pack[1]._o.parent ).toBe burst.masterSwirl.el
      expect( pack[2]._o.parent ).toBe burst.masterSwirl.el
      expect( pack[3]._o.parent ).toBe burst.masterSwirl.el
      expect( pack[4]._o.parent ).toBe burst.masterSwirl.el

  describe '_getChildOption method ->', ->
    it 'should get options from childOptions', ->
      b = new Burst count: 2
      o = { childOptions: { fill: [ 'yellow', 'cyan', 'blue' ] } }
      result = b._getChildOption( o, 1 )
      expect(result.fill).toBe 'cyan'

      it 'should not throw if there is no childOptions', ->
        b = new Burst count: 2
        o = { }
        result = b._getChildOption( o, 1 )
        expect(result).toEqual {}

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
        fill: 'cyan'
        childOptions: radius: 20

      from = burst._o
      opt0 = burst._getPropByMod 'fill', 0, from
      opt1 = burst._getPropByMod 'fill', 1, from
      opt8 = burst._getPropByMod 'fill', 8, from

      expect(opt0).toBe 'cyan'
      expect(opt1).toBe 'cyan'
      expect(opt8).toBe 'cyan'

  describe '_makeTween method ->', ->
    it 'should override parent', ->
      bs = new Burst
      spyOn mojs.Tweenable.prototype, '_makeTween'
      bs._makeTween()
      expect(mojs.Tweenable.prototype._makeTween).not.toHaveBeenCalled()

  describe '_makeTimeline method ->', ->
    it 'should call super', ->
      bs = new Burst
      spyOn mojs.Tweenable::, '_makeTimeline'
      bs._makeTimeline()
      expect(mojs.Tweenable::_makeTimeline).toHaveBeenCalled()

    it 'should add masterSwirl to the timeline', ->
      bs = new Burst
      expect(bs.timeline._timelines[0]).toBe bs.masterSwirl.timeline

    it 'should add swirls to the timeline', ->
      bs = new Burst count: 5
      expect(bs.timeline._timelines[1]).toBe bs._swirls[0][0].timeline
      expect(bs.timeline._timelines[2]).toBe bs._swirls[0][1].timeline
      expect(bs.timeline._timelines[3]).toBe bs._swirls[0][2].timeline
      expect(bs.timeline._timelines[4]).toBe bs._swirls[0][3].timeline
      expect(bs.timeline._timelines[5]).toBe bs._swirls[0][4].timeline

  describe '_addOptionalProps method ->', ->
    it 'should return the passed object', ->
      burst = new Burst
      obj = {}
      result = burst._addOptionalProps obj, 0
      expect(result).toBe obj

    it 'should add parent, index', ->
      burst = new Burst
      obj = {}
      result = burst._addOptionalProps obj, 0
      expect(result.index).toBe 0
      expect(result.parent).toBe burst.masterSwirl.el

    it 'should set isSiwrl to false by default', ->
      burst = new Burst
      obj = { }
      result = burst._addOptionalProps obj, 0
      expect(result.isSwirl).toBe false

      obj = { isSwirl: true }
      result = burst._addOptionalProps obj, 0
      expect(result.isSwirl).toBe true

    it 'should hard rewrite `left` and `top` properties to 50%', ->
      burst = new Burst
      obj = {}
      result = burst._addOptionalProps obj, 0
      expect(result.left).toBe '50%'
      expect(result.top).toBe '50%'

    it 'should add x/y ->', ->
      burst = new Burst
        isIt: 1,
        radius: { 0: 100 }
        count:  2,
        size: 0,

      obj0 = {}
      obj1 = {}
      result0 = burst._addOptionalProps obj0, 0
      result1 = burst._addOptionalProps obj1, 1

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
      result0 = burst._addOptionalProps obj0, 0
      result1 = burst._addOptionalProps obj1, 1

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
    it 'should fallback to 0', ->
      burst = new Burst radius: { 'rand(10,20)': 100 }
      expect(burst._getBitAngle(undefined, 0)).toBe 90
      expect(burst._getBitAngle(undefined, 1)).toBe 162
      expect(burst._getBitAngle(undefined, 2)).toBe 234
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

  describe '_vars method ->', ->
    it 'should call super', ->
      burst = new Burst
      spyOn mojs.Thenable::, '_vars'
      burst._vars()
      expect(mojs.Thenable::_vars).toHaveBeenCalled()
    it 'should create _bufferTimeline', ->
      burst = new Burst
      burst._bufferTimeline = null
      burst._vars()
      expect(burst._bufferTimeline instanceof mojs.Timeline).toBe true

  # describe 'initialization ->', ->
  #   it 'should have _defaults', ->
  #     b = new Burst
  #     s = new Swirl
  #     # delete b._defaults.childOptions
  #     delete b._defaults.count
  #     delete b._defaults.degree
  #     b._defaults.radius = s._defaults.radius
  #     expect(b._defaults).toEqual s._defaults
  #   # it 'should have childOptions', ->
  #   #   b = new Burst
  #   #   expect(b._defaults.childOptions).toBe null
  #   it 'should add Burts properties' , ->
  #     b = new Burst
  #     expect(b._defaults.degree).toBe 360
  #     expect(b._defaults.count).toBe 5
  #   it 'should have _childDefaults', ->
  #     b = new Burst
  #     s = new Swirl

  #     for key, value of h.tweenOptionMap
  #       delete b._childDefaults[key]
  #     for key, value of h.callbacksMap
  #       delete b._childDefaults[key]

  #     b._childDefaults.isSwirl = true
  #     expect(b._childDefaults).toEqual s._defaults

  #   it 'should modify isSwirl', ->
  #     b = new Burst
  #     s = new Swirl
  #     expect(b._childDefaults.isSwirl).toBe false

  #   it 'should add tween options to _childDefaults', ->
  #     b = new Burst

  #     for key, value of h.tweenOptionMap
  #       expect(b._childDefaults[key]).toBe null
  #     for key, value of h.callbacksMap
  #       expect(b._childDefaults[key]).toBe null

  #   # old
  #   # it 'should have _optionsIntersection', ->
  #   #   b = new Burst
  #   #   s = new Swirl
  #   #   expect(b._optionsIntersection['radius']) .toBe 1
  #   #   expect(b._optionsIntersection['radiusX']).toBe 1
  #   #   expect(b._optionsIntersection['radiusY']).toBe 1
  #   #   expect(b._optionsIntersection['angle'])  .toBe 1
  #   #   expect(b._optionsIntersection['opacity']).toBe 1
  #   #   expect(b._optionsIntersection['scale']).toBe 1

  #   it 'should add unitTimeline to the _skipPropsDelta', ->
  #     b = new Burst
  #     expect(b._skipPropsDelta.unitTimeline).toBeDefined()

  # describe '_createBit method ->', ->
  #   it 'should create _swirls array', ->
  #     b = new Burst
  #     b._createBit()
  #     expect(b._swirls.length).toBe b._props.count
  #   it 'should pass index to the swirls', ->
  #     b = new Burst
  #     b._createBit()
  #     expect(b._swirls[0]._o.index).toBe 0
  #     expect(b._swirls[1]._o.index).toBe 1
  #     expect(b._swirls[2]._o.index).toBe 2
  #     expect(b._swirls[3]._o.index).toBe 3
  #     expect(b._swirls[4]._o.index).toBe 4
  #   # probably not
  #   # it 'should pass isTimelineLess option to the swirls', ->
  #   #   b = new Burst
  #   #   b._createBit()
  #   #   expect(b._swirls[0]._o.isTimelineLess).toBe true
  #   #   expect(b._swirls[1]._o.isTimelineLess).toBe true
  #   #   expect(b._swirls[2]._o.isTimelineLess).toBe true
  #   #   expect(b._swirls[3]._o.isTimelineLess).toBe true
  #   #   expect(b._swirls[4]._o.isTimelineLess).toBe true
  #   it 'should pass options to swirls', ->
  #     b = new Burst
  #     b._createBit()
  #     options0 = b._getOption 0
  #     delete options0.callbacksContext
  #     for key of options0
  #       expect(b._swirls[0]._o[key]).toEqual options0[key]
  #     options1 = b._getOption 1
  #     delete options1.callbacksContext
  #     for key of options1
  #       expect(b._swirls[1]._o[key]).toEqual options1[key]
  #     options2 = b._getOption 2
  #     delete options2.callbacksContext
  #     for key of options2
  #       expect(b._swirls[2]._o[key]).toEqual options2[key]

  # describe '_getOption method ->', ->
  #   it 'should return an option obj based on i ->', ->
  #     burst = new Burst
  #       childOptions: radius: [ { 20: 50}, 20, '500' ]
  #     option0 = burst._getOption 0
  #     option1 = burst._getOption 1
  #     option7 = burst._getOption 7
  #     expect(option0.radius[20]).toBe 50
  #     expect(option1.radius)    .toBe 20
  #     expect(option7.radius)    .toBe 20
  #   it 'should try to fallback to childDefaiults first ->', ->
  #     burst = new Burst
  #       duration: 2000
  #       childOptions: radius: [ 200, null, '500' ]
  #     option0 = burst._getOption 0
  #     option1 = burst._getOption 1
  #     option7 = burst._getOption 7
  #     option8 = burst._getOption 8
  #     expect(option0.radius)   .toBe 200
  #     expect(option1.radius[5]).toBe 0
  #     expect(option7.radius[5]).toBe 0
  #     expect(option8.radius)   .toBe '500'
  #   # old
  #   # it 'should fallback to parent prop if defined  ->', ->
  #   #   burst = new Burst
  #   #     fill: 2000
  #   #     childOptions: fill: [ 200, null, '500' ]
  #   #   option0 = burst._getOption 0
  #   #   option1 = burst._getOption 1
  #   #   option7 = burst._getOption 7
  #   #   option8 = burst._getOption 8
  #   #   expect(option0.fill).toBe 200
  #   #   expect(option1.fill).toBe 2000
  #   #   expect(option7.fill).toBe 2000
  #   #   expect(option8.fill).toBe '500'
  #   # old
  #   # it 'should fallback to parent default ->', ->
  #   #   burst = new Burst
  #   #     childOptions: fill: [ 200, null, '500' ]
  #   #   option0 = burst._getOption 0
  #   #   option1 = burst._getOption 1
  #   #   option7 = burst._getOption 7
  #   #   option8 = burst._getOption 8
  #   #   expect(option0.fill).toBe 200
  #   #   expect(option1.fill).toBe 'deeppink'
  #   #   expect(option7.fill).toBe 'deeppink'
  #   #   expect(option8.fill).toBe '500'
  #   # old
  #   # it 'should have all the props filled ->', ->
  #   #   burst = new Burst
  #   #     childOptions: duration: [ 200, null, '500' ]
  #   #   option0 = burst._getOption 0
  #   #   option1 = burst._getOption 1
  #   #   option7 = burst._getOption 7
  #   #   option8 = burst._getOption 8
  #   #   expect(option0.radius[5]).toBe 0
  #   #   expect(option1.radius[5]).toBe 0
  #   #   expect(option7.radius[5]).toBe 0
  #   #   expect(option8.radius[5]).toBe 0
  #   it 'should have parent only options ->', ->
  #     burst = new Burst
  #       radius: { 'rand(10,20)': 100 }
  #       angle: {50: 0}
  #     option0 = burst._getOption 0
  #     expect(option0.radius[5]) .toBe 0
  #     expect(option0.angle)     .toBe 90

  #   it 'should parse stagger ->', ->
  #     burst = new Burst
  #       radius: { 0: 100 }
  #       count:  2,
  #       childOptions: {
  #         angle: 'stagger(20, 40)'
  #       }

  #     option0 = burst._getOption 0
  #     option1 = burst._getOption 1
  #     expect(option0.angle).toBe 90 + (20)
  #     expect(option1.angle).toBe 270 + (20 + 40)

  #   it 'should parse rand ->', ->
  #     burst = new Burst
  #       radius: { 0: 100 }
  #       count:  2,
  #       childOptions: {
  #         angle: 'rand(20, 40)'
  #       }

  #     option0 = burst._getOption 0
  #     option1 = burst._getOption 1
  #     expect(option0.angle).toBeGreaterThan 90 + (20)
  #     expect(option1.angle).not.toBeGreaterThan 270 + (20 + 40)

  # describe '_calcSize method ->', ->
  #   it 'should calc set size to 2', ->
  #     bs = new Burst
  #     expect(bs._props.size).toBe 2
  #     expect(bs._props.center).toBe 1
  #   it 'should recieve size', ->
  #     bs = new Burst size: 40
  #     expect(bs._props.size).toBe 40
  #     expect(bs._props.center).toBe 20
  # describe '_draw method ->', ->
  #   it 'should call _drawEl method ->', ->
  #     bs = new Burst
  #     spyOn bs, '_drawEl'
  #     bs._draw()
  #     expect(bs._drawEl).toHaveBeenCalled()

  # describe '_transformTweenOptions method ->', ->
  #   it 'should call _applyCallbackOverrides with _o.timeline', ->
  #     tr = new Burst timeline: { delay: 200 }
  #     spyOn(tr, '_applyCallbackOverrides').and.callThrough()
  #     tr._transformTweenOptions()
  #     expect(tr._applyCallbackOverrides).toHaveBeenCalledWith tr._o.unitTimeline
  #   it 'should fallback to an empty `timeline options` object on _o', ->
  #     tr = new Burst
  #     expect(tr._o.unitTimeline).toBeDefined()

  #   it 'should add `this` as callbacksContext to the unitTimeline', ->
  #     b = new Burst
  #     expect(b.unitTimeline._o.callbacksContext).toBe b

  # describe '_makeTimeline method ->', ->
  #   it 'should create unitTimeline', ->
  #     bs = new Burst
  #     opts = bs._o.unitTimeline
  #     bs._makeTimeline()
  #     expect(bs.unitTimeline instanceof mojs.Timeline).toBe true
  #     expect(bs.unitTimeline._o).toBe opts

  #   it 'should add swirls to the unitTimeline', ->
  #     bs = new Burst
  #     bs.unitTimeline._timelines.length = 0
  #     bs._makeTimeline()
  #     expect(bs.unitTimeline._timelines.length).toBe bs._defaults.count

  #   describe 'if !wasTimelineLess ->', ->
  #     it 'should call super _makeTimeline', ->
  #       bs = new Burst
  #       spyOn Burst.prototype, '_makeTimeline'
  #       bs._makeTimeline()
  #       expect(Burst.prototype._makeTimeline).toHaveBeenCalled()

  #     it 'should add unitTimeline', ->
  #       bs = new Burst
  #       bs._makeTimeline()
  #       expect(bs.timeline._timelines[0]).toBe bs.unitTimeline

  #   describe 'if wasTimelineLess ->', ->
  #     it 'should set unitTimeline as timeline', ->
  #       bs = new Burst
  #       bs._o.wasTimelineLess = true
  #       bs._makeTimeline()
  #       expect(bs.timeline).toBe bs.unitTimeline

  #   it 'should reset _o.timeline object', ->
  #     bs = new Burst timeline: { delay: 400 }
  #     bs.timeline._timelines.length = 0
  #     bs._makeTimeline()
  #     expect(bs._o.timeline).toBe null

  #   # it 'should reset _o.unitTimeline object', ->
  #   #   bs = new Burst unitTimeline: { delay: 400 }
  #   #   bs._makeTimeline()
  #   #   expect(bs._o.unitTimeline).tooBe null

  # describe '_extendDefaults method ->', ->
  #   it 'should call super', ->
  #     b = new Burst
  #     spyOn Swirl.prototype, '_extendDefaults'
  #     b._extendDefaults()
  #     expect(Swirl.prototype._extendDefaults)
  #       .toHaveBeenCalled()

  #   it 'should call _calcSize', ->
  #     b = new Burst
  #     spyOn b, '_calcSize'
  #     b._extendDefaults()
  #     expect(b._calcSize).toHaveBeenCalled()

  # # describe '_tuneSubModules method ->', ->
  # #   it 'should call super', ->
  # #     b = new Burst
  # #     spyOn Tunable.prototype, '_tuneSubModules'
  # #     b._tuneSubModules()
  # #     expect(Tunable.prototype._tuneSubModules)
  # #       .toHaveBeenCalled()
  # #   it 'should call _tuneNewOptions on each swirl', ->
  # #     b = new Burst count: 2
  # #     spyOn b._swirls[0], '_tuneNewOptions'
  # #     spyOn b._swirls[1], '_tuneNewOptions'
  # #     spyOn b, '_resetTween'
  # #     b._tuneSubModules()
  # #     expect(b._swirls[0]._tuneNewOptions.calls.first().args[0])
  # #       .toEqual b._getOption(0)
  # #     expect(b._swirls[1]._tuneNewOptions.calls.first().args[0])
  # #       .toEqual b._getOption(1)

  # #     expect(b._resetTween.calls.argsFor(0)[0]).toBe b._swirls[0].tween
  # #     expect(b._resetTween.calls.argsFor(0)[1]).toEqual b._getOption(0)

  # #     expect(b._resetTween.calls.argsFor(1)[0]).toBe b._swirls[1].tween
  # #     expect(b._resetTween.calls.argsFor(1)[1]).toEqual b._getOption(1)

  # #     expect(b._resetTween.calls.count()).toBe 2

  # #   it 'should set prop on timeline', ->
  # #     isCalled = null
  # #     b = new Burst count: 2
  # #     timelineOpts = { onComplete: null }
  # #     b._o.timeline = timelineOpts
  # #     spyOn b.timeline, '_setProp'
  # #     b._tuneSubModules()
  # #     expect(b.timeline._setProp).toHaveBeenCalledWith timelineOpts

  # #   it 'should not set prop on timeline if no object', ->
  # #     isCalled = null
  # #     b = new Burst count: 2
  # #     timelineOpts = { onComplete: null }
  # #     spyOn b.timeline, '_setProp'
  # #     b._tuneSubModules()
  # #     expect(b.timeline._setProp).not.toHaveBeenCalled()

  # #   it 'should call _recalcTotalDuration on timeline', ->
  # #     b = new Burst count: 2
  # #     spyOn b.timeline, '_recalcTotalDuration'
  # #     b._tuneSubModules()
  # #     expect(b.timeline._recalcTotalDuration.calls.count()).toBe 1

  # describe '_resetMergedFlags method', ->
  #   it 'should call the super method', ->
  #     b = new Burst count: 2

  #     spyOn Thenable.prototype, '_resetMergedFlags'
  #     obj = {}
  #     b._resetMergedFlags(obj)
  #     expect(Thenable.prototype._resetMergedFlags).toHaveBeenCalledWith obj

  #   it 'should return the same object back', ->
  #     b = new Burst count: 2

  #     obj = {}
  #     expect(b._resetMergedFlags(obj)).toBe obj

  #   it 'should set isTimelineLess option to false', ->
  #     b = new Burst count: 2

  #     obj = {}
  #     expect(b._resetMergedFlags(obj).isTimelineLess).toBe false

  #   it 'should save the isTimelineLess flag option to false', ->
  #     b = new Burst count: 2

  #     obj = {}
  #     expect(b._resetMergedFlags(obj).wasTimelineLess).toBe true
  #     expect(b._resetMergedFlags(obj).isTimelineLess).toBe false

  # # describe '_mergeThenOptions method ->', ->
  # #   it 'should call super', ->
  # #     b = new Burst count: 2

  # #     spyOn(Thenable.prototype, '_mergeThenOptions')
  # #       .and.callThrough()
  # #     startObj = { fill: 'cyan', childOptions: { fill: 'yellow' } }
  # #     endObj   = { fill: 'purple', childOptions: { fill: 'black' } }
  # #     b._mergeThenOptions( startObj, endObj )
  # #     expect(Thenable.prototype._mergeThenOptions)
  # #       .toHaveBeenCalledWith startObj, endObj, false

  # #   it 'should call super with childOptions', ->
  # #     b = new Burst count: 2

  # #     spyOn(Thenable.prototype, '_mergeThenOptions')
  # #       .and.callThrough()
  # #     startChildObj = { fill: 'yellow' }
  # #     endChildObj   = { fill: 'black' }
  # #     startObj = { fill: 'cyan', childOptions: startChildObj }
  # #     endObj   = { fill: 'purple', childOptions: endChildObj }
  # #     b._mergeThenOptions( startObj, endObj )
  # #     expect(Thenable.prototype._mergeThenOptions)
  # #       .toHaveBeenCalledWith startChildObj, endChildObj, false

  # #   it 'should fallback to {} for childOptions', ->
  # #     b = new Burst count: 2

  # #     spyOn(Thenable.prototype, '_mergeThenOptions')
  # #       .and.callThrough()
  # #     startChildObj = null
  # #     endChildObj   = null
  # #     startObj = { fill: 'cyan', childOptions: startChildObj }
  # #     endObj   = { fill: 'purple', childOptions: endChildObj }
  # #     b._mergeThenOptions( startObj, endObj )
  # #     expect(Thenable.prototype._mergeThenOptions)
  # #       .toHaveBeenCalledWith {}, {}, false

  # #   it 'should set merged children to parent', ->
  # #     b = new Burst count: 2

  # #     startChildObj = { fill: 'yellow' }
  # #     endChildObj   = { fill: 'black' }
  # #     startObj = { fill: 'cyan', childOptions: startChildObj }
  # #     endObj   = { fill: 'purple', childOptions: endChildObj }
      
  # #     childResult  = Thenable.prototype
  # #       ._mergeThenOptions.call(b, startChildObj, endChildObj )
  # #     parentResult = Thenable.prototype
  # #       ._mergeThenOptions.call(b, startObj, endObj )

  # #     result = b._mergeThenOptions( startObj, endObj )

  # #     parentResult.childOptions = childResult

  # #     expect(result).toEqual parentResult

  # #   it 'should push merged object to history', ->
  # #     b = new Burst count: 2

  # #     startChildObj = { fill: 'yellow' }
  # #     endChildObj   = { fill: 'black' }
  # #     startObj = { fill: 'cyan', childOptions: startChildObj }
  # #     endObj   = { fill: 'purple', childOptions: endChildObj }
      
  # #     result = b._mergeThenOptions( startObj, endObj )

  # #     expect(b._history[1]).toBe result

  # describe '_getThenOption method ->', ->
  #   it 'should get options from childOptions', ->
  #     b = new Burst count: 2
  #     o = { childOptions: { fill: [ 'yellow', 'cyan', 'blue' ] } }
  #     result = b._getThenOption( o, 1 )
  #     expect(result.fill).toBe 'cyan'

  #   it 'should not throw if there is no childOptions', ->
  #     b = new Burst count: 2
  #     o = { }
  #     result = b._getThenOption( o, 1 )
  #     expect(result).toEqual {}

  describe '_masterThen method ->', ->
    it 'should pass options to masterSwirl', ->
      b = new Burst count: 2
        
      spyOn b.masterSwirl, 'then'

      o = { opacity: .5 }
      b._masterThen(o)

      expect( b.masterSwirl.then ).toHaveBeenCalledWith o

    it 'should save the new master swirl', ->
      b = new Burst count: 2
        
      b._masterThen( { opacity: .5 } )
      expect( b._masterSwirls.length ).toBe 2

    it 'should return the new swirl', ->
      b = new Burst count: 2
        
      result = b._masterThen( { opacity: .5 } )
      expect( result ).toBe b._masterSwirls[b._masterSwirls.length-1]

  describe '_childThen method ->', ->
    it 'should pass options to swirls', ->
      b = new Burst count: 2
        
      pack = b._swirls[0] 
      spyOn pack[0], 'then'
      spyOn pack[1], 'then'

      o = { childOptions: { radius: [ 10, 20 ] } }
      b._childThen(o, b._masterThen(o))

      option0 = b._getChildOption( o, 0 )
      option0.parent = b._masterSwirls[1].el
      expect(pack[0].then).toHaveBeenCalledWith option0

      option1 = b._getChildOption( o, 1 )
      option1.parent = b._masterSwirls[1].el
      expect(pack[1].then).toHaveBeenCalledWith option1

    it 'should save new swirls to _swirls', ->
      b = new Burst count: 2
        
      o = { childOptions: { radius: [ 10, 20 ] } }

      b._childThen(o, b._masterThen(o))

      expect(b._swirls[1].length).toBe 2
      expect(b._swirls[1][0] instanceof Swirl).toBe true
      expect(b._swirls[1][1] instanceof Swirl).toBe true

    it 'should return the new pack', ->
      b = new Burst count: 2
        
      o = { childOptions: { radius: [ 10, 20 ] } }

      result = b._childThen(o, b._masterThen(o))

      expect(result).toBe b._swirls[1]

  describe 'then method ->', ->
    it 'should call _masterThen method', ->
      b = new Burst count: 2
      spyOn(b, '_masterThen').and.callThrough()
      options = {}
      b.then options
      expect( b._masterThen ).toHaveBeenCalledWith options

    it 'should call _childThen method', ->
      b = new Burst count: 2
      spyOn(b, '_childThen').and.callThrough()
      options = {}
      b.then options

      expect( b._childThen )
        .toHaveBeenCalledWith options, b._getLastItem b._masterSwirls

    it 'should set duration on new msater swirl', ->
      b = new Burst count: 2
      spyOn(b, '_setSwirlDuration').and.callThrough()
      b.then({ childOptions: { duration: 50 } })
      time = b._calcPackTime( b._swirls[1] )
      expect(b._setSwirlDuration)
        .toHaveBeenCalledWith b._masterSwirls[1], time

    it 'should return this', ->
      b = new Burst count: 2
      expect( b.then({}) ).toBe b

    it 'should call _recalcTotalDuration method', ->
      b = new Burst count: 2
  
      spyOn b.timeline, '_recalcTotalDuration'      
      b.then({ childOptions: { radius: [ 10, 20 ] } })

      expect(b.timeline._recalcTotalDuration).toHaveBeenCalled()


  describe '_getLastItem method ->', ->
    it 'should get the last item of array', ->
      b = new Burst count: 2

      expect(b._getLastItem([1,2,3,4])).toBe 4
      expect(b._getLastItem([1,2,3,7])).toBe 7
      expect(b._getLastItem([1,2,3])).toBe 3
      expect(b._getLastItem([1,2])).toBe 2
      expect(b._getLastItem([1])).toBe 1

  describe '_calcPackTime method ->', ->
    it 'should calculate time of swirls array', ->
      # should not include shift time
      sw = new Swirl
      sw.timeline._props.shiftTime = 200000

      pack = [
        sw,
        new Swirl( duration: 2000 ),
        new Swirl( duration: 1800, delay: 400 ),
        new Swirl( duration: 4000, speed: 3 )
      ]

      b = new Burst
      tm = new mojs.Timeline

      maxTime = 0
      for swirl, i in pack
        tween = swirl.tween; p = tween._props
        maxTime = Math.max( p.repeatTime/p.speed, maxTime )

      expect( b._calcPackTime pack ).toBe maxTime

  describe '_setSwirlDuration method ->', ->
    it 'should set tweens time', ->
      b = new Burst
      sw = new Swirl

      spyOn sw.tween,    '_setProp'
      spyOn sw.timeline, '_recalcTotalDuration'

      duration = 10
      b._setSwirlDuration sw, duration

      expect(sw.tween._setProp).toHaveBeenCalledWith 'duration', duration
      expect(sw.timeline._recalcTotalDuration).toHaveBeenCalled()

    it 'should not throw if Swirl has no timeline', ->
      b = new Burst
      sw = new Swirl

      sw.timeline = sw.tween

      set = -> b._setSwirlDuration sw, 10

      expect(set).not.toThrow()


  #   it 'should create swirless master Burst', ->
  #     b = new Burst count: 2
  
  #     b.then({ childOptions: { radius: [ 10, 20 ] } })

  #     expect(b._modules[1] instanceof Burst).toBe true
  #     expect(b._modules[1]._o.count).toBe 0

  #   it 'should pass the swirlLess Burst to swirls', ->
  #     b = new Burst count: 2
  
  #     b.then({ childOptions: { radius: [ 10, 20 ] } })

  #     expect(b._swirls[1]._modules[1]._o.parent).toBe b._modules[1].el

  #   it 'should pass merged options to the master busrt', ->
  #     b = new Burst(count: 2, opacity: { 0: 1 } )
        
  #       .then({ opacity: 0, childOptions: { radius: [ 10, 20 ] } })

  #     expect(b._modules[1]._o.opacity[1]).toBe 0

  #   it 'should set duration prop on master Burst', ->
  #     b = new Burst(count: 2, opacity: { 0: 1 } )
  #       .then({
  #         opacity: 0,
  #         childOptions: { duration: 'stagger(100, 200)', radius: [ 10, 20 ] }
  #       })

  #     expect(b._modules[1].timeline._props.duration).toBe 300












Transit = mojs.Transit
Swirl   = mojs.Swirl
Burst   = mojs.Burst
t       = mojs.tweener

describe 'Burst ->', ->
  beforeEach -> t.removeAll()

  describe 'extension ->', ->
    it 'should extend Transit class', ->
      burst = new Burst
      expect(burst instanceof Transit).toBe true
    it 'should have its own defaults', ->
      burst = new Burst
      # skip childOptions from _extendDefaults
      expect(burst.skipProps.childOptions).toBe 1
      # presentation props
      expect(burst.defaults.degree) .toBe       360
      expect(burst.defaults.count) .toBe        5
      expect(burst.defaults.opacity).toBe       1
      expect(burst.defaults.randomAngle) .toBe  0
      expect(burst.defaults.randomRadius).toBe  0
      # position props/el props
      expect(burst.defaults.left).toBe          100
      expect(burst.defaults.top).toBe           100
      expect(burst.defaults.x).toBe             0
      expect(burst.defaults.y).toBe             0
      # size props
      expect(burst.defaults.radius[25]) .toBe  75
      expect(burst.defaults.angle)      .toBe  0
      expect(burst.defaults.size)       .toBe  null
      expect(burst.defaults.sizeGap)    .toBe  0
      # callbacks
      expect(burst.defaults.onStart)        .toBe  null
      expect(burst.defaults.onComplete)     .toBe  null
      expect(burst.defaults.onCompleteChain).toBe  null
      expect(burst.defaults.onUpdate)       .toBe  null
    it 'should have childDefaults', ->
      burst = new Burst
      expect(burst.childDefaults.radius[7]).toBe 0
      expect(burst.childDefaults.points)   .toBe 3
      expect(burst.childDefaults.angle)    .toBe 0
      # callbacks
      expect(burst.childDefaults.onStart)   .toBe null
      expect(burst.childDefaults.onComplete).toBe null
      expect(burst.childDefaults.onUpdate)  .toBe null
      expect(burst.childDefaults.duration)         .toBe  500
      expect(burst.childDefaults.delay)            .toBe  0
      expect(burst.childDefaults.repeat)           .toBe  0
      expect(burst.childDefaults.yoyo)             .toBe  false
      expect(burst.childDefaults.easing)           .toBe  'Linear.None'
      expect(burst.childDefaults.shape)            .toBe  'circle'
      expect(burst.childDefaults.fill)             .toBe  'deeppink'
      expect(burst.childDefaults.fillOpacity)      .toBe  1
      expect(burst.childDefaults.stroke)           .toBe  'transparent'
      expect(burst.childDefaults.strokeWidth)      .toBe  0
      expect(burst.childDefaults.strokeDasharray)  .toBe  ''
      expect(burst.childDefaults.strokeDashoffset) .toBe  ''
      expect(burst.childDefaults.strokeLinecap)    .toBe  null
      expect(burst.childDefaults.isSwirl)          .toBe  false
      expect(burst.childDefaults.swirlSize)        .toBe  10
      expect(burst.childDefaults.swirlFrequency)   .toBe  3
    it 'should have optionsIntersection object', ->
      burst = new Burst
      expect(burst.optionsIntersection.radius)    .toBe 1
      expect(burst.optionsIntersection.radiusX)   .toBe 1
      expect(burst.optionsIntersection.radiusY)   .toBe 1
      expect(burst.optionsIntersection.opacity)   .toBe 1
      expect(burst.optionsIntersection.angle)     .toBe 1
      expect(burst.optionsIntersection.onUpdate)  .toBe 1
      expect(burst.optionsIntersection.onStart)   .toBe 1
      expect(burst.optionsIntersection.onComplete).toBe 1
      expect(Object.keys(burst.optionsIntersection).length).toBe 8
  describe 'initialization ->', ->
    it 'should create transits', ->
      burst = new Burst
      expect(burst.transits.length).toBe 5
      expect(burst.transits[0] instanceof Swirl).toBe true
    it 'should pass indexes to transits', ->
      burst = new Burst
      expect(burst.transits.length).toBe 5
      expect(burst.transits[0].o.index).toBe 0
      expect(burst.transits[1].o.index).toBe 1
      expect(burst.transits[2].o.index).toBe 2
      expect(burst.transits[3].o.index).toBe 3
      expect(burst.transits[4].o.index).toBe 4
    it 'should pass properties to transits', ->
      burst = new Burst
        stroke: 'red'
        strokeWidth:    {10:0}
        strokeOpacity:  {1:0}
        strokeDasharray:  '200 10 0'
        strokeDashoffset: '50'
        strokeLinecap:    'round'
        fill: 'deeppink'
        fillOpacity: .5
        shape: 'rect'
        swirlSize: 20
        swirlFrequency: 'rand(10,20)'
        count: 6
        isSwirl: true
        radius: {'rand(10,20)': 100}
        childOptions:
          stroke: [ 'deeppink', 'yellow', null ]
          strokeWidth: [null, null, 20]
          strokeOpacity: [null, 1 ,null]
          fill:   ['#fff', null]
          shape:  ['circle', null, 'polygon']
          swirlSize: [10, null]
          swirlFrequency: [null, 3]
          radius: [ { 20: 50}, 20, '500' ]
          strokeDasharray: ['10 20', null, { '40': '10' }]
          strokeDashoffset: ['200', null, null]
          fillOpacity:  [null, 1]
          strokeLinecap: ['butt', null]
          points: [10, null, 10]
      expect(burst.transits[0].o.radius[20]).toBe 50
      expect(burst.transits[1].o.radius)    .toBe 20
      expect(burst.transits[2].o.radius)    .toBe '500'
      expect(burst.transits[3].o.radius[20]).toBe 50
      expect(burst.transits[4].o.radius)    .toBe 20
      
      expect(burst.transits[1].o.stroke)    .toBe 'yellow'
      expect(burst.transits[2].o.stroke)    .toBe 'red'
      expect(burst.transits[3].o.stroke)    .toBe 'deeppink'

      expect(burst.transits[3].o.strokeWidth[10]).toBe 0
      expect(burst.transits[1].o.strokeWidth[10]).toBe 0
      expect(burst.transits[2].o.strokeWidth).toBe 20

      expect(burst.transits[0].o.fill)      .toBe '#fff'
      expect(burst.transits[1].o.fill)      .toBe 'deeppink'

      expect(burst.transits[0].o.fillOpacity).toBe .5
      expect(burst.transits[1].o.fillOpacity).toBe 1

      expect(burst.transits[0].o.isSwirl)       .toBe  true
      expect(burst.transits[0].o.swirlSize)     .toBe  10
      expect(burst.transits[1].o.swirlSize)     .toBe  20
      
      expect(burst.transits[0].o.swirlFrequency).toBe  'rand(10,20)'
      expect(burst.transits[1].o.swirlFrequency).toBe  3
      
      expect(burst.transits[0].o.shape).toBe     'circle'
      expect(burst.transits[1].o.shape).toBe     'rect'
      expect(burst.transits[2].o.shape).toBe     'polygon'

      expect(burst.transits[0].o.strokeOpacity[1]).toBe     0
      expect(burst.transits[1].o.strokeOpacity)   .toBe     1
      expect(burst.transits[2].o.strokeOpacity[1]).toBe     0

      expect(burst.transits[0].o.strokeDasharray).toBe        '10 20'
      expect(burst.transits[1].o.strokeDasharray).toBe        '200 10 0'
      expect(burst.transits[2].o.strokeDasharray['40']).toBe  '10'

      expect(burst.transits[0].o.strokeDashoffset).toBe  '200'
      expect(burst.transits[1].o.strokeDashoffset).toBe  '50'
      expect(burst.transits[2].o.strokeDashoffset).toBe  '50'

      expect(burst.transits[0].o.strokeLinecap).toBe  'butt'
      expect(burst.transits[1].o.strokeLinecap).toBe  'round'
      expect(burst.transits[2].o.strokeLinecap).toBe  'butt'

      expect(burst.transits[0].o.points).toBe  10
      expect(burst.transits[1].o.points).toBe  3
      expect(burst.transits[2].o.points).toBe  10
    it 'should keep the bit angle', ->
      burst = new Burst
        cound: 2
        childOptions: angle: [10, null]
      expect(burst.transits[0].o.angle).toBe 100
      expect(burst.transits[1].o.angle).toBe 162
    it 'should keep the bit angle if delta passed', ->
      burst = new Burst
        cound: 2
        childOptions: angle: [{200: 10}, null]
      expect(burst.transits[0].o.angle[290]).toBe 100
      expect(burst.transits[1].o.angle)     .toBe 162
    it 'should not keep the bit angle if isResetAngles is passed', ->
      burst = new Burst
        cound: 2
        isResetAngles: true
        childOptions: angle: [{200: 10}, null]
      expect(burst.transits[0].o.angle[200]).toBe 10
      expect(burst.transits[1].o.angle)     .toBe 0
    it 'should pass x/y to transits', ->
      burst = new Burst
        radius: { 50: 75 }
        count: 2
      center = burst.props.center
      expect(burst.transits[0].o.x).toBe center
      expect(burst.transits[0].o.y[center - 50]).toBe center - 75
      expect(burst.transits[1].o.x).toBe center
      expect(burst.transits[1].o.y[center + 50]).toBe center + 75
  describe '_fillTransform method ->', ->
    it 'return tranform string of the el', ->
      burst = new Burst x: 100, y: 100, angle: 50
      expect(burst._fillTransform())
        .toBe 'rotate(50deg) translate(100px, 100px)'
  describe '_isNeedsTransform method ->', ->
    it 'return boolean if _fillTransform needed', ->
      burst = new Burst x: 100, y: 100, angle: 50
      expect(burst._isNeedsTransform()).toBe true
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
      expect(option1.radius[7]).toBe 0
      expect(option7.radius[7]).toBe 0
      expect(option8.radius)   .toBe '500'
    it 'should fallback to parent prop if defined  ->', ->
      burst = new Burst
        duration: 2000
        childOptions: duration: [ 200, null, '500' ]
      option0 = burst._getOption 0
      option1 = burst._getOption 1
      option7 = burst._getOption 7
      option8 = burst._getOption 8
      expect(option0.duration).toBe 200
      expect(option1.duration).toBe 2000
      expect(option7.duration).toBe 2000
      expect(option8.duration).toBe '500'
    it 'should fallback to parent default ->', ->
      burst = new Burst
        childOptions: duration: [ 200, null, '500' ]
      option0 = burst._getOption 0
      option1 = burst._getOption 1
      option7 = burst._getOption 7
      option8 = burst._getOption 8
      expect(option0.duration).toBe 200
      expect(option1.duration).toBe 500
      expect(option7.duration).toBe 500
      expect(option8.duration).toBe '500'
    it 'should have all the props filled ->', ->
      burst = new Burst
        childOptions: duration: [ 200, null, '500' ]
      option0 = burst._getOption 0
      option1 = burst._getOption 1
      option7 = burst._getOption 7
      option8 = burst._getOption 8
      expect(option0.radius[7]).toBe 0
      expect(option1.radius[7]).toBe 0
      expect(option7.radius[7]).toBe 0
      expect(option8.radius[7]).toBe 0
    it 'should have parent only options ->', ->
      burst = new Burst
        radius: { 'rand(10,20)': 100 }
        angle: {50: 0}
        onUpdate:->
        onStart:->
        onComplete:->
      option0 = burst._getOption 0
      expect(option0.radius[7]) .toBe 0
      expect(option0.angle)     .toBe 0
      expect(option0.onUpdate)  .toBe null
      expect(option0.onStart)   .toBe null
      expect(option0.onComplete).toBe null
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
  describe '_getPropByMod method ->', ->
    it 'should return the prop from @o based on i ->', ->
      burst = new Burst
        childOptions: radius: [ { 20: 50}, 20, '500' ]
      opt0 = burst._getPropByMod key: 'radius', i: 0
      opt1 = burst._getPropByMod key: 'radius', i: 1
      opt2 = burst._getPropByMod key: 'radius', i: 2
      opt8 = burst._getPropByMod key: 'radius', i: 8
      expect(opt0[20]).toBe 50
      expect(opt1)    .toBe 20
      expect(opt2)    .toBe '500'
      expect(opt8)    .toBe '500'
    it 'should the same prop if not an array ->', ->
      burst = new Burst childOptions: radius: 20
      opt0 = burst._getPropByMod key: 'radius', i: 0
      opt1 = burst._getPropByMod key: 'radius', i: 1
      opt8 = burst._getPropByMod key: 'radius', i: 8
      expect(opt0).toBe 20
      expect(opt1).toBe 20
      expect(opt8).toBe 20
    it 'should work with another options object ->', ->
      burst = new Burst
        radius: 40
        childOptions: radius: 20
      from = burst.o
      opt0 = burst._getPropByMod key: 'radius', i: 0, from: from
      opt1 = burst._getPropByMod key: 'radius', i: 1, from: from
      opt8 = burst._getPropByMod key: 'radius', i: 8, from: from
      expect(opt0).toBe 40
      expect(opt1).toBe 40
      expect(opt8).toBe 40
  describe 'randomness ->', ->
    describe 'random angle ->', ->
      it 'should have randomAngle option ->', ->
        burst = new Burst
        expect(burst.props.randomAngle).toBeDefined()
        expect(burst.props.randomAngle).toBe 0
      it 'should calculate angleRand for every transit ->', ->
        burst = new Burst randomAngle: true
        expect(burst.transits[0].o.angleShift).toBeDefined()
        expect(burst.transits[1].o.angleShift).toBeDefined()
    describe 'random radius ->', ->
      it 'should have randomRadius option ->', ->
        burst = new Burst
        expect(burst.props.randomRadius).toBeDefined()
        expect(burst.props.randomRadius).toBe 0
      it 'should calculate radiusRand for every transit ->', ->
        burst = new Burst randomRadius: true
        expect(burst.transits[0].o.radiusScale).toBeDefined()
        expect(burst.transits[1].o.radiusScale).toBeDefined()
  describe 'size calculations _calcSize method ->', ->
    
    it 'should calculate size based on largest transit + self radius', ->
      burst = new Burst
        radius: 50
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      
      expect(burst.props.size)  .toBe 240
      expect(burst.props.center).toBe 120


    it 'should calculate size based on largest transit + self radius #2', ->
      burst = new Burst
        radius: 50, radiusX: 100
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      expect(burst.props.size)  .toBe 340
      expect(burst.props.center).toBe 170
    it 'should calculate size based on largest transit + self radius #3', ->
      burst = new Burst
        radius: {20: 50}, radiusX: 20
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      expect(burst.props.size)  .toBe 240
      expect(burst.props.center).toBe 120
    it 'should calculate size based on largest transit + self radius #4', ->
      burst = new Burst
        radius: 50, radiusY: {20: 100}
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      expect(burst.props.size)  .toBe 340
      expect(burst.props.center).toBe 170
    it 'should calculate size based on largest transit + self radius #5', ->
      burst = new Burst
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      expect(burst.props.size)  .toBe 290
      expect(burst.props.center).toBe 145
    it 'should call the _calcSize of every transit', ->
      burst = new Burst
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      spyOn burst.transits[0], '_calcSize'
      spyOn burst.transits[1], '_calcSize'
      burst._calcSize()
      expect(burst.transits[0]._calcSize).toHaveBeenCalled()
      expect(burst.transits[1]._calcSize).toHaveBeenCalled()
    it 'should call _addBitOptions method', ->
      burst = new Burst
      spyOn burst, '_addBitOptions'
      burst._calcSize()
      expect(burst._addBitOptions).toHaveBeenCalled()

    it 'should work with sizeGap', ->
      burst = new Burst
        sizeGap: 20
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      expect(burst.props.size)  .toBe 330
      expect(burst.props.center).toBe burst.props.size/2

  describe '_addBitOptions method ->', ->
    it 'should set x/y on every transit', ->
      burst = new Burst radius: {0: 120}
      expect(typeof burst.transits[1].o.x).toBe 'object'
    it 'should work if end radius is 0', ->
      burst = new Burst radius: {120: 0}
      x = burst.transits[1].o.x; keys = Object.keys x
      expect(x[keys[0]]+'').not.toBe keys[0]
    it 'should work with radiusX', ->
      burst = new Burst
        radius: {120: 0}, radiusX: 30
      expect(parseInt(burst.transits[1].o.x,10)).toBe 155
    it 'should work with radiusY', ->
      burst = new Burst
        radius: {120: 0}, radiusY: {30: 0}
      keys = Object.keys(burst.transits[1].o.y)
      center = burst.props.center
      expect(burst.transits[1].o.y[keys[0]]).toBe center
    it 'should increase angle and position delta on angleShift', ->
      burst1 = new Burst radius: {120: 0}, count: 2
      burst2 = new Burst radius: {120: 0}, count: 2, randomAngle: .5
      expect(burst2.transits[1].o.angle)
        .toBe burst1.transits[1].o.angle+burst2.transits[1].props.angleShift

    it 'should increase angle and position delta on angleShift for deltas', ->
      burst1 = new Burst
        radius: {120: 0}, count: 2, childOptions: angle: {25: 50}
      burst2 = new Burst
        radius: {120: 0}, count: 2, randomAngle: 1
        childOptions: angle: {25: 50}
      start2 = burst2.transits[1].deltas.angle.start
      end2   = burst2.transits[1].deltas.angle.start
      start1 = burst1.transits[1].deltas.angle.start
      end1   = burst1.transits[1].deltas.angle.start
      expect(start2)
        .toBe start1+burst2.transits[1].props.angleShift
      expect(end2)
        .toBe end1+burst2.transits[1].props.angleShift
    it 'should increase position', ->
      burst1 = new Burst radius: 50, count: 2
      burst2 = new Burst radius: 50, count: 2, randomAngle: .5
      expect(burst2.transits[1].o.x)
        .not.toBe burst1.transits[1].o.x
      expect(burst2.transits[1].o.y)
        .not.toBe burst1.transits[1].o.y

    it 'should keep degreeCnt not less than 1', ->
      burst = new Burst radius: {0: 120}, degree: 270, count:  1
      expect(burst.degreeCnt).toBe 1

  describe 'createTween method ->', ->
    it 'should create tween', ->
      burst = new Burst
      expect(burst.timeline).toBeDefined()
    it 'should add tweens to timeline', ->
      burst = new Burst
      expect(burst.timeline._timelines.length).toBe 6

  describe 'onStart callback ->', ->
    it 'should run onStart callback', (dfr)->
      burst = new Burst onStart:->
      spyOn burst.props, 'onStart'
      burst.run()
      setTimeout ->
        expect(burst.props.onStart).toHaveBeenCalled(); dfr()
      , 500
    it 'should have the scope of burst', (dfr)->
      isRightScope = null
      burst = new Burst onStart:-> isRightScope = @ instanceof Burst
      burst.run()
      setTimeout ->
        expect(isRightScope).toBe(true); dfr()
      , 500

  describe 'onComplete callback ->', ->
    it 'should run onComplete callback', (dfr)->
      t.removeAll()
      burst = new Burst
        duration: 200, onComplete:-> expect(true).toBe(true); dfr()
      burst.run()
    it 'should have the scope of burst', (dfr)->
      t.removeAll()
      isRightScope = null
      burst = new Burst
        duration: 200, onComplete:-> isRightScope = @ instanceof Burst
      burst.run()
      setTimeout ->
        expect(isRightScope).toBe(true); dfr()
      , 500

  describe 'onUpdate callback ->', ->
    t.removeAll()
    it 'should run onUpdate callback', (dfr)->
      burst = new Burst
       
        duration: 200
        onUpdate:->
      spyOn burst, 'onUpdate'
      burst.run()
      setTimeout ->
        expect(burst.onUpdate).toHaveBeenCalledWith(1); dfr()
      , 500
    it 'should have the scope of burst', (dfr)->
      t.removeAll()
      isRightScope = null
      burst = new Burst
        duration: 200
        onUpdate:-> isRightScope = @ instanceof Burst
      burst.run()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 500
  
  describe 'then method ->', ->
    it 'should call the h.error method', ->
      burst = new Burst
      spyOn burst.h, 'error'
      burst.then()
      expect(burst.h.error).toHaveBeenCalled()
    # it 'should call then method on every transit', ->
    #   burst = new Burst
    #     radius: { 20: 50 }, count: 2
    #     duration: 10
    #     childOptions:
    #       duration: [null, 200]
    #   spyOn burst.transits[0], 'then'
    #   spyOn burst.transits[1], 'then'
    #   burst.then radius: 0
    #   expect(burst.transits[0].then).toHaveBeenCalledWith duration: 10
    #   expect(burst.transits[1].then).toHaveBeenCalledwith duration: 200

  describe 'run method ->', ->
    it 'should call _extendDefaults', ->
      burst = new Burst radius: { 20: 50 }
      spyOn burst, '_extendDefaults'
      o = { radius: 10}
      burst.run o
      expect(burst._extendDefaults).toHaveBeenCalledWith o
    it 'should return this', ->
      burst = new Burst radius: { 20: 50 }
      returnValue = burst.run()
      expect(returnValue).toBe burst
    it 'should not call _extendDefaults if no obj passed', ->
      burst = new Burst radius: { 20: 50 }
      spyOn burst, '_extendDefaults'
      burst.run()
      expect(burst._extendDefaults).not.toHaveBeenCalled()
    it 'should recieve new options', ->
      burst = new Burst radius: { 20: 50 }
      burst.run radius: 10
      expect(burst.props.radius).toBe  10
      expect(burst.deltas.radius).not.toBeDefined()
    it 'should recieve new child options', ->
      burst = new Burst radius: { 20: 50 }, duration: 400
      burst.run duration: 500, childOptions: duration: [null, 1000, null]
      
      expect(burst.o.childOptions).toBeDefined()
      expect(burst.transits[0].o.duration).toBe 500
      expect(burst.transits[1].o.duration).toBe 1000
      expect(burst.transits[2].o.duration).toBe 500
    it 'should extend old childOptions', ->
      burst = new Burst
        duration: 400, childOptions: fill: 'deeppink'
      newDuration = [null, 1000, null]
      burst.run duration: 500, childOptions: duration: newDuration
      expect(burst.o.childOptions.fill)    .toBe 'deeppink'
      expect(burst.o.childOptions.duration).toBe newDuration
    it 'should call _recalcTotalDuration on tween', ->
      burst = new Burst
        duration: 400, childOptions: fill: 'deeppink'
      newDuration = [null, 1000, null]
      spyOn burst.timeline, '_recalcTotalDuration'
      burst.run duration: 500, childOptions: duration: newDuration
      expect(burst.timeline._recalcTotalDuration).toHaveBeenCalled()
    it 'should start timeline', ->
      burst = new Burst
      spyOn burst, 'play'
      burst.run duration: 500
      expect(burst.play).toHaveBeenCalled()
    it 'should call _generateRandomAngle method if randomAngle was passed', ->
      burst = new Burst randomAngle: .1
      spyOn burst, '_generateRandomAngle'
      burst.run()
      expect(burst._generateRandomAngle).toHaveBeenCalled()
    it 'should not call _generateRandomAngle method', ->
      burst = new Burst
      spyOn burst, '_generateRandomAngle'
      burst.run()
      expect(burst._generateRandomAngle).not.toHaveBeenCalled()
    it 'should call _generateRandomRadius method if randomAngle was passed', ->
      burst = new Burst randomRadius: .1
      spyOn burst, '_generateRandomRadius'
      burst.run()
      expect(burst._generateRandomRadius).toHaveBeenCalled()
    it 'should not call _generateRandomRadius method', ->
      burst = new Burst
      spyOn burst, '_generateRandomRadius'
      burst.run()
      expect(burst._generateRandomRadius).not.toHaveBeenCalled()
    it 'should warn if count was passed', ->
      burst = new Burst
      spyOn burst.h, 'warn'
      burst.run count: 10
      expect(burst.h.warn).toHaveBeenCalled()
    it 'should keep angles on run', ->
      burst = new Burst
      burst.run count: 10
      expect(burst.transits[3].o.angle).toBe 306
    it 'should recieve new angle options', ->
      burst = new Burst
      burst.run childOptions: angle: 90
      expect(burst.transits[3].o.angle).toBe 396
      expect(burst.transits[4].o.angle).toBe 468
    it 'should recieve new angle delta options', ->
      burst = new Burst
      burst.run childOptions: angle: 90: 0
      expect(burst.transits[3].o.angle[396]).toBe 306
      expect(burst.transits[4].o.angle[468]).toBe 378
    it 'should skip circular shape angle on isResetAngles', ->
      burst = new Burst
      burst.run isResetAngles: true, childOptions: angle: 90: 0
      expect(burst.transits[3].o.angle[90]).toBe 0
      expect(burst.transits[4].o.angle[90]).toBe 0
  describe '_generateRandomAngle method ->', ->
    it 'should generate random angle based on randomness', ->
      burst = new Burst randomAngle: .5
      angle = burst._generateRandomAngle()
      expect(angle).toBeGreaterThan     -1
      expect(angle).not.toBeGreaterThan 180
    it 'should generate random angle based on randomness #2', ->
      burst = new Burst randomAngle: .75
      angle = burst._generateRandomAngle()
      expect(angle).toBeGreaterThan     -1
      expect(angle).not.toBeGreaterThan 270
  describe '_generateRandomRadius method ->', ->
    it 'should generate random radius based on randomness', ->
      burst = new Burst randomRadius: .75
      radius = burst._generateRandomRadius()
      expect(radius).toBeGreaterThan     .24
      expect(radius).not.toBeGreaterThan 1

  describe 'draw method ->', ->
    it 'should not call _drawEl method', ->
      burst = new Burst
      spyOn burst, '_drawEl'
      burst._draw()
      expect(burst._drawEl).toHaveBeenCalled()
    it 'should call _fillTransform method', ->
      burst = new Burst radius: 25
      spyOn burst, '_fillTransform'
      burst._draw()
      expect(burst._fillTransform).toHaveBeenCalled()

  describe '_getSideRadius method ->', ->
    it 'should return the side\'s radius, radiusX and radiusY', ->
      burst = new Burst radius: {5:25}, radiusX: {10:20}, radiusY: {30:10}
      sides = burst._getSideRadius('start')
      expect(sides.radius) .toBe 5
      expect(sides.radiusX).toBe 10
      expect(sides.radiusY).toBe 30

  describe '_getSidePoint method ->', ->
    it 'should return the side\'s point', ->
      burst = new Burst radius: {5:25}, radiusX: {10:20}, radiusY: {30:10}
      point = burst._getSidePoint('start', 0)
      expect(point.x).toBeDefined()
      expect(point.y).toBeDefined()

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

















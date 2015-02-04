Transit = mojs.Transit
Swirl   = mojs.Swirl
Burst   = mojs.Burst

describe 'Burst ->', ->
  describe 'extension ->', ->
    
    it 'should extend Transit class', ->
      burst = new Burst
      expect(burst instanceof Transit).toBe true
    
    it 'should have its own defaults', ->
      burst = new Burst
      # presentation props
      expect(burst.defaults.degree) .toBe       360
      expect(burst.defaults.count) .toBe       5
      expect(burst.defaults.opacity).toBe       1
      expect(burst.defaults.randomAngle) .toBe  0
      expect(burst.defaults.randomRadius).toBe  0
      # position props/el props
      expect(burst.defaults.x).toBe       100
      expect(burst.defaults.y).toBe       100
      expect(burst.defaults.shiftX).toBe  0
      expect(burst.defaults.shiftY).toBe  0
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
      expect(burst.childDefaults.repeat)           .toBe  1
      expect(burst.childDefaults.yoyo)             .toBe  false
      expect(burst.childDefaults.easing)           .toBe  'Linear.None'
      expect(burst.childDefaults.type)             .toBe  'circle'
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

  describe 'initialization ->', ->
    it 'should create transits', ->
      burst = new Burst
      expect(burst.transits.length).toBe 5
      expect(burst.transits[0] instanceof Swirl).toBe true
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
        type: 'rect'
        swirlSize: 20
        swirlFrequency: 'rand(10,20)'
        count: 6
        isSwirl: true
        childOptions:
          stroke: [ 'deeppink', 'yellow', null ]
          strokeWidth: [null, null, 20]
          strokeOpacity: [null, 1 ,null]
          fill:   ['#fff', null]
          type:   ['circle', null, 'polygon']
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
      
      expect(burst.transits[0].o.type).toBe     'circle'
      expect(burst.transits[1].o.type).toBe     'rect'
      expect(burst.transits[2].o.type).toBe     'polygon'

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
    it 'should pass x/y to transits', ->
      burst = new Burst
        radius: { 50: 75 }
        count: 2
      center =  burst.props.center
      expect(burst.transits[0].o.x[center]).toBe center
      expect(burst.transits[0].o.y[center - 50]).toBe center - 75
      expect(burst.transits[1].o.x[center]).toBe center
      expect(burst.transits[1].o.y[center + 50]).toBe center + 75

  describe 'fillTransform method ->', ->
    it 'return tranform string of the el', ->
      burst = new Burst
        shiftX: 100, shiftY: 100, angle: 50
      expect(burst.fillTransform())
        .toBe 'rotate(50deg) translate(100px, 100px)'

  describe 'isNeedsTransform method ->', ->
    it 'return boolean if fillTransform needed', ->
      burst = new Burst shiftX: 100, shiftY: 100, angle: 50
      expect(burst.isNeedsTransform()).toBe true

  describe 'getOption method ->', ->
    it 'should return an option obj based on i ->', ->
      burst = new Burst
        childOptions: radius: [ { 20: 50}, 20, '500' ]
      option0 = burst.getOption 0
      option1 = burst.getOption 1
      option7 = burst.getOption 7
      expect(option0.radius[20]).toBe 50
      expect(option1.radius)    .toBe 20
      expect(option7.radius)    .toBe 20
    it 'should try to fallback to childDefaiults first ->', ->
      burst = new Burst
        duration: 2000
        childOptions: radius: [ 200, null, '500' ]
      option0 = burst.getOption 0
      option1 = burst.getOption 1
      option7 = burst.getOption 7
      option8 = burst.getOption 8
      expect(option0.radius)   .toBe 200
      expect(option1.radius[7]).toBe 0
      expect(option7.radius[7]).toBe 0
      expect(option8.radius)   .toBe '500'
    it 'should fallback to parent prop if defined  ->', ->
      burst = new Burst
        duration: 2000
        childOptions: duration: [ 200, null, '500' ]
      option0 = burst.getOption 0
      option1 = burst.getOption 1
      option7 = burst.getOption 7
      option8 = burst.getOption 8
      expect(option0.duration).toBe 200
      expect(option1.duration).toBe 2000
      expect(option7.duration).toBe 2000
      expect(option8.duration).toBe '500'
    it 'should fallback to parent default ->', ->
      burst = new Burst
        childOptions: duration: [ 200, null, '500' ]
      option0 = burst.getOption 0
      option1 = burst.getOption 1
      option7 = burst.getOption 7
      option8 = burst.getOption 8
      expect(option0.duration).toBe 200
      expect(option1.duration).toBe 500
      expect(option7.duration).toBe 500
      expect(option8.duration).toBe '500'
    it 'should have all the props filled ->', ->
      burst = new Burst
        childOptions: duration: [ 200, null, '500' ]
      option0 = burst.getOption 0
      option1 = burst.getOption 1
      option7 = burst.getOption 7
      option8 = burst.getOption 8
      expect(option0.radius[7]).toBe 0
      expect(option1.radius[7]).toBe 0
      expect(option7.radius[7]).toBe 0
      expect(option8.radius[7]).toBe 0


  describe 'getPropByMod method ->', ->
    it 'should return the prop from @o based on i ->', ->
      burst = new Burst
        childOptions: radius: [ { 20: 50}, 20, '500' ]
      opt0 = burst.getPropByMod key: 'radius', i: 0
      opt1 = burst.getPropByMod key: 'radius', i: 1
      opt2 = burst.getPropByMod key: 'radius', i: 2
      opt8 = burst.getPropByMod key: 'radius', i: 8
      expect(opt0[20]).toBe 50
      expect(opt1)    .toBe 20
      expect(opt2)    .toBe '500'
      expect(opt8)    .toBe '500'
    it 'should the same prop if not an array ->', ->
      burst = new Burst childOptions: radius: 20
      opt0 = burst.getPropByMod key: 'radius', i: 0
      opt1 = burst.getPropByMod key: 'radius', i: 1
      opt8 = burst.getPropByMod key: 'radius', i: 8
      expect(opt0).toBe 20
      expect(opt1).toBe 20
      expect(opt8).toBe 20
    it 'should work with another options object ->', ->
      burst = new Burst
        radius: 40
        childOptions: radius: 20
      from = burst.o
      opt0 = burst.getPropByMod key: 'radius', i: 0, from: from
      opt1 = burst.getPropByMod key: 'radius', i: 1, from: from
      opt8 = burst.getPropByMod key: 'radius', i: 8, from: from
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
  describe 'size calculations calcSize method ->', ->
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
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      expect(burst.props.size)  .toBe 290
      expect(burst.props.center).toBe 145
    it 'should call the calcSize of every transit', ->
      burst = new Burst
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      spyOn burst.transits[0], 'calcSize'
      spyOn burst.transits[1], 'calcSize'
      burst.calcSize()
      expect(burst.transits[0].calcSize).toHaveBeenCalled()
      expect(burst.transits[1].calcSize).toHaveBeenCalled()
    it 'should call addBitOptions method', ->
      burst = new Burst
      spyOn burst, 'addBitOptions'
      burst.calcSize()
      expect(burst.addBitOptions).toHaveBeenCalled()
  describe 'addBitOptions ->', ->
    it 'should set x/y on every transit', ->
      burst = new Burst radius: {0: 120}
      expect(typeof burst.transits[1].o.x).toBe 'object'
    it 'should work if end radius is 0', ->
      burst = new Burst radius: {120: 0}
      x = burst.transits[1].o.x; keys = Object.keys x
      expect(x[keys[0]]+'').not.toBe keys[0]

  describe 'createTween method ->', ->
    it 'should create tween', ->
      burst = new Burst
      expect(burst.tween).toBeDefined()
    it 'should add timelines to tween', ->
      burst = new Burst
      expect(burst.tween.timelines.length).toBe 5
    it 'should call startTween method', ->
      burst = new Burst
      spyOn burst, 'startTween'
      burst.createTween()
      expect(burst.startTween).toHaveBeenCalled()
    it 'should not call startTween method if isRunLess', ->
      burst = new Burst isRunLess: true
      spyOn burst, 'startTween'
      burst.createTween()
      expect(burst.startTween).not.toHaveBeenCalled()
  describe 'onStart callback ->', ->
    it 'should run onStart callback',->
      burst = new Burst isRunLess: true, onStart:->
      spyOn burst.o, 'onStart'
      burst.run()
      expect(burst.o.onStart).toHaveBeenCalled()
    it 'should have the scope of burst',->
      isRightScope = false
      burst = new Burst onStart:-> isRightScope = @ instanceof Burst
      expect(isRightScope).toBe true
  describe 'onComplete callback ->', ->
    it 'should run onComplete callback', (dfr)->
      burst = new Burst isRunLess: true, duration: 20, onComplete:->
      spyOn burst.o, 'onComplete'
      burst.run()
      setTimeout ->
        expect(burst.o.onComplete).toHaveBeenCalled(); dfr()
      , 100
    it 'should have the scope of burst', (dfr)->
      isRightScope = false
      burst = new Burst
        duration: 20, onComplete:-> isRightScope = @ instanceof Burst
      burst.run()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100
  describe 'onUpdate callback ->', ->
    it 'should run onUpdate callback', (dfr)->
      burst = new Burst
        isRunLess: true
        duration: 20
        onUpdate:->
      spyOn burst.o, 'onUpdate'
      burst.run()
      setTimeout ->
        expect(burst.o.onUpdate).toHaveBeenCalledWith(1); dfr()
      , 100
    it 'should have the scope of burst', (dfr)->
      isRightScope = false
      burst = new Burst
        duration: 20, onUpdate:-> isRightScope = @ instanceof Burst
      burst.run()
      setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100
  describe 'run method ->', ->
    it 'should call super', ->
      burst = new Burst radius: { 20: 50 }
      spyOn Burst.__super__, 'run'
      burst.run()
      expect(Burst.__super__.run).toHaveBeenCalled()
    it 'should call generateRandomAngle method if randomAngle was passed', ->
      burst = new Burst randomAngle: true
      spyOn burst, 'generateRandomAngle'
      burst.run()
      expect(burst.generateRandomAngle).toHaveBeenCalled()
    it 'should not call generateRandomAngle method', ->
      burst = new Burst randomAngle: false
      spyOn burst, 'generateRandomAngle'
      burst.run()
      expect(burst.generateRandomAngle).not.toHaveBeenCalled()
    it 'should call generateRandomRadius method if randomAngle was passed', ->
      burst = new Burst randomRadius: true
      spyOn burst, 'generateRandomRadius'
      burst.run()
      expect(burst.generateRandomRadius).toHaveBeenCalled()
    it 'should not call generateRandomRadius method', ->
      burst = new Burst randomRadius: false
      spyOn burst, 'generateRandomRadius'
      burst.run()
      expect(burst.generateRandomRadius).not.toHaveBeenCalled()
  describe 'generateRandomAngle method ->', ->
    it 'should generate random angle based on randomness', ->
      burst = new Burst randomAngle: .75
      angle = burst.generateRandomAngle()
      expect(angle).toBeGreaterThan     45
      expect(angle).not.toBeGreaterThan 315

  describe 'generateRandomRadius method ->', ->
    it 'should generate random radius based on randomness', ->
      burst = new Burst randomRadius: .75
      radius = burst.generateRandomRadius()
      expect(radius).toBeGreaterThan     .24
      expect(radius).not.toBeGreaterThan 1

  describe 'draw method ->', ->
    it 'should not call drawEl method', ->
      burst = new Burst
      spyOn burst, 'drawEl'
      burst.draw()
      expect(burst.drawEl).toHaveBeenCalled()

    it 'should call fillTransform method', ->
      burst = new Burst radius: 25
      spyOn burst, 'fillTransform'
      burst.draw()
      expect(burst.fillTransform).toHaveBeenCalled()




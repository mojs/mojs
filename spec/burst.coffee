Transit = mojs.Transit
Burst   = mojs.Burst

describe 'Burst ->', ->
  describe 'extension ->', ->
    it 'should extend Transit class', ->
      burst = new Burst
      expect(burst instanceof Transit).toBe true
    it 'should have its own defaults', ->
      burst = new Burst
      expect(burst.defaults.degree).toBe       360
      expect(burst.defaults.points).toBe       5
      expect(burst.defaults.type).toBe         'circle'

  describe 'initialization ->', ->
    it 'should create transits', ->
      burst = new Burst
      expect(burst.transits.length).toBe 5
      expect(burst.transits[0] instanceof Transit).toBe true
    it 'should pass properties to transits', ->
      burst = new Burst
        childOptions:
          radius: [ { 20: 50}, 20, '500' ]
          stroke: [ 'deeppink', 'yellow' ]
          fill:   '#fff'
      expect(burst.transits[0].o.radius[20]).toBe 50
      expect(burst.transits[1].o.radius)    .toBe 20
      expect(burst.transits[2].o.radius)    .toBe '500'
      expect(burst.transits[3].o.radius[20]).toBe 50
      expect(burst.transits[4].o.radius)    .toBe 20
      expect(burst.transits[1].o.stroke)    .toBe 'yellow'
      expect(burst.transits[2].o.stroke)    .toBe 'deeppink'
      expect(burst.transits[1].o.fill)      .toBe '#fff'
      expect(burst.transits[2].o.fill)      .toBe '#fff'

  describe 'childOptions ->', ->
    it 'should save childOptions from options ->', ->
      burst = new Burst
        childOptions:
          radius: [ { 20: 50}, 20, '500' ]
      expect(burst.childOptions).toBeDefined()
      expect(burst.childOptions.radius[1]).toBe 20
    it 'should extend childDefaults ->', ->
      burst = new Burst
        childOptions:
          radius: [ { 20: 50}, 20, '500' ]
      expect(burst.childOptions.strokeWidth[2]).toBe 0

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

  describe 'randomness ->', ->
    describe 'random angle ->', ->
      it 'should have randomAngle option ->', ->
        burst = new Burst
        expect(burst.props.randomAngle).toBeDefined()
        expect(burst.props.randomAngle).toBe 0
      it 'should calculate angleRand for every transit ->', ->
        burst = new Burst randomAngle: true
        expect(burst.transits[0].angleRand).toBeDefined()
        expect(burst.transits[1].angleRand).toBeDefined()
    describe 'random radius ->', ->
      it 'should have randomRadius option ->', ->
        burst = new Burst
        expect(burst.props.randomRadius).toBeDefined()
        expect(burst.props.randomRadius).toBe 0
      it 'should calculate radiusRand for every transit ->', ->
        burst = new Burst randomRadius: true
        expect(burst.transits[0].radiusRand).toBeDefined()
        expect(burst.transits[1].radiusRand).toBeDefined()
    describe 'random sign ->', ->
      it 'should calculate signRand for every transit ->', ->
        burst = new Burst isSwirl: true
        sign = burst.transits[0].signRand
        expect(sign).toBeDefined()
        expect(sign is -1 or sign is 1).toBe true
        sign = burst.transits[1].signRand
        expect(sign).toBeDefined()
        expect(sign is -1 or sign is 1).toBe true

  describe 'getPropByMod method ->', ->
    it 'should return the prop from @o based on i ->', ->
      burst = new Burst
        childOptions: radius: [ { 20: 50}, 20, '500' ]
      opt0 = burst.getPropByMod propName: 'radius', i: 0
      opt1 = burst.getPropByMod propName: 'radius', i: 1
      opt2 = burst.getPropByMod propName: 'radius', i: 2
      opt8 = burst.getPropByMod propName: 'radius', i: 8
      expect(opt0[20]).toBe 50
      expect(opt1)    .toBe 20
      expect(opt2)    .toBe '500'
      expect(opt8)    .toBe '500'
    it 'should the same prop if not an array ->', ->
      burst = new Burst childOptions: radius: 20
      opt0 = burst.getPropByMod propName: 'radius', i: 0
      opt1 = burst.getPropByMod propName: 'radius', i: 1
      opt8 = burst.getPropByMod propName: 'radius', i: 8
      expect(opt0).toBe 20
      expect(opt1).toBe 20
      expect(opt8).toBe 20
    it 'should work with another options object ->', ->
      burst = new Burst
        radius: 40
        childOptions: radius: 20
      opt0 = burst.getPropByMod propName: 'radius', i: 0, from: 'o'
      opt1 = burst.getPropByMod propName: 'radius', i: 1, from: 'o'
      opt8 = burst.getPropByMod propName: 'radius', i: 8, from: 'o'
      expect(opt0).toBe 40
      expect(opt1).toBe 40
      expect(opt8).toBe 40


  describe 'size calculations ->', ->
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

  describe 'setProgress method ->', ->
    it 'should setProgress on all transits', ->
      burst = new Burst
        childOptions:
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
      burst.setProgress .5
      expect(burst.transits[0].progress).toBe .5
      expect(burst.transits[1].progress).toBe .5
      expect(burst.transits[2].progress).toBe .5
      expect(burst.transits[3].progress).toBe .5
      expect(burst.transits[4].progress).toBe .5
    # it 'should call super method', ->
    #   burst = new Burst radius: [{ 20: 50 }, 20]
    #   spyOn Burst.__super__, 'setProgress'
    #   burst.setProgress .5
    #   expect(Burst.__super__.setProgress).toHaveBeenCalled()

  describe 'run method ->', ->
    it 'should call super', ->
      burst = new Burst radius: [{ 20: 50 }, 20]
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
    it 'should call generateSwirl method if isSwirl was passed', ->
      burst = new Burst isSwirl: true
      spyOn burst, 'generateSwirl'
      burst.run()
      expect(burst.generateSwirl).toHaveBeenCalled()
    it 'should not call generateSwirl method if isSwirl was not passed', ->
      burst = new Burst isSwirl: false
      spyOn burst, 'generateSwirl'
      burst.run()
      expect(burst.generateSwirl).not.toHaveBeenCalled()

  describe 'generateRandomAngle method ->', ->
    it 'should generate random angle based on randomness', ->
      burst = new Burst randomAngle: .75
      burst.generateRandomAngle 0
      expect(burst.transits[0].angleRand).toBeGreaterThan     45
      expect(burst.transits[0].angleRand).not.toBeGreaterThan 315

  describe 'generateRandomRadius method ->', ->
    it 'should generate random radius based on randomness', ->
      burst = new Burst randomRadius: .75
      burst.generateRandomRadius 0
      expect(burst.transits[0].radiusRand).toBeGreaterThan      .24
      expect(burst.transits[0].radiusRand).not.toBeGreaterThan 1

  describe 'getSwirl method ->', ->
    it 'should calc swirl based on swirlFrequency and swirlSize props', ->
      burst = new Burst isSwirl: true
      swirl1 = burst.getSwirl .5, 0
      freq = Math.sin(burst.transits[0].swirlFrequency*.5)
      sign = burst.transits[0].signRand
      expect(swirl1).toBe sign*burst.transits[0].swirlSize*freq

  describe 'generateSwirl method ->', ->
    it 'should generate simple swirl', ->
      burst = new Burst swirlSize: 3, swirlFrequency: 2
      burst.generateSwirl 0
      expect(burst.transits[0].swirlSize).toBe 3
      expect(burst.transits[0].swirlFrequency).toBe 2
    it 'should generate rand swirl', ->
      burst = new Burst swirlSize: 'rand(10,20)', swirlFrequency: 'rand(3,7)'
      burst.generateSwirl 0
      expect(burst.transits[0].swirlSize).toBeGreaterThan     9
      expect(burst.transits[0].swirlSize).not.toBeGreaterThan 20
      expect(burst.transits[0].swirlFrequency).toBeGreaterThan     2
      expect(burst.transits[0].swirlFrequency).not.toBeGreaterThan 7
    it 'should generate the same rand swirl if not array', ->
      burst = new Burst swirlSize: 'rand(10,20)'
      burst.generateSwirl 0
      burst.generateSwirl 1
      isEqual = burst.transits[0].swirlSize is burst.transits[1].swirlSize
      expect(isEqual).toBe true
      
    it 'should generate array swirl', ->
      burst = new Burst swirlSize: [ 3, 4 ], swirlFrequency: [ 5, 2, 1 ]
      burst.generateSwirl 0
      burst.generateSwirl 1
      burst.generateSwirl 2
      expect(burst.transits[0].swirlSize).toBe 3
      expect(burst.transits[1].swirlSize).toBe 4
      expect(burst.transits[2].swirlSize).toBe 3
      expect(burst.transits[0].swirlFrequency).toBe 5
      expect(burst.transits[1].swirlFrequency).toBe 2
      expect(burst.transits[2].swirlFrequency).toBe 1
    it 'should generate array swirl with randoms', ->
      burst = new Burst
        swirlSize: [ 'rand(1,3)', 2, 'rand(7,9)' ]
        swirlFrequency: [ 1, 'rand(1,3)', 'rand(7,9)' ]
      burst.generateSwirl 0
      burst.generateSwirl 1
      burst.generateSwirl 2
      expect(burst.transits[0].swirlSize).toBeGreaterThan     0
      expect(burst.transits[0].swirlSize).not.toBeGreaterThan 3
      expect(burst.transits[1].swirlSize).toBe 2
      expect(burst.transits[2].swirlSize).toBeGreaterThan     6
      expect(burst.transits[2].swirlSize).not.toBeGreaterThan 9

      expect(burst.transits[0].swirlFrequency).toBe 1
      expect(burst.transits[1].swirlFrequency).toBeGreaterThan     0
      expect(burst.transits[1].swirlFrequency).not.toBeGreaterThan 3
      expect(burst.transits[2].swirlFrequency).toBeGreaterThan     6
      expect(burst.transits[2].swirlFrequency).not.toBeGreaterThan 9

  describe 'draw method ->', ->
    it 'should set x/y coordinates on every transit', ->
      burst = new Burst
      burst.draw()
      expect(burst.transits[0].props.x).not.toBe '0px'
      expect(burst.transits[1].props.x).not.toBe '0px'
      expect(burst.transits[2].props.x).not.toBe '0px'
      expect(burst.transits[3].props.x).not.toBe '0px'
      expect(burst.transits[4].props.x).not.toBe '0px'
    it 'should not call drawEl method', ->
      burst = new Burst
      spyOn burst, 'drawEl'
      burst.draw()
      expect(burst.drawEl).toHaveBeenCalled()
    it 'should pass the current progress and i to getSwirl method', ->
      burst = new Burst isSwirl: true
      spyOn burst, 'getSwirl'
      burst.draw .5
      expect(burst.getSwirl).toHaveBeenCalledWith .5, 0




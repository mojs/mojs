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
    it 'should have isRandomRadius option ->', ->
      burst = new Burst
      expect(burst.props.isRandomRadius).toBeDefined()
      expect(burst.props.isRandomRadius).toBe false
    it 'should calculate radiusRand for every transit ->', ->
      burst = new Burst isRandomRadius: true
      expect(burst.transits[0].radiusRand).toBeDefined()
      expect(burst.transits[1].radiusRand).toBeDefined()
    it 'should calculate angleRand for every transit ->', ->
      burst = new Burst isRandomAngle: true
      expect(burst.transits[0].angleRand).toBeDefined()
      expect(burst.transits[1].angleRand).toBeDefined()
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
      opt0 = burst.getPropByMod 'radius', 0
      opt1 = burst.getPropByMod 'radius', 1
      opt2 = burst.getPropByMod 'radius', 2
      opt8 = burst.getPropByMod 'radius', 8
      expect(opt0[20]).toBe 50
      expect(opt1)    .toBe 20
      expect(opt2)    .toBe '500'
      expect(opt8)    .toBe '500'

    it 'should return the prop from @o based on i #2->', ->
      burst = new Burst
        childOptions: radius: [ { 20: 50}, 20, '500', 10, 20 ]

    it 'should the same prop if not an array ->', ->
      burst = new Burst childOptions: radius: 20

      opt0 = burst.getPropByMod 'radius', 0
      opt1 = burst.getPropByMod 'radius', 1
      opt8 = burst.getPropByMod 'radius', 8
      expect(opt0).toBe 20
      expect(opt1).toBe 20
      expect(opt8).toBe 20

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
    it 'should call super method', ->
      burst = new Burst radius: [{ 20: 50 }, 20]
      spyOn Burst.__super__, 'setProgress'
      burst.setProgress .5
      expect(Burst.__super__.setProgress).toHaveBeenCalled()

  describe 'run method ->', ->
    it 'should call super', ->
      burst = new Burst radius: [{ 20: 50 }, 20]
      spyOn Burst.__super__, 'run'
      burst.run()
      expect(Burst.__super__.run).toHaveBeenCalled()
    it 'should call generateRandomAngle method if isRandomAngle was passed', ->
      burst = new Burst isRandomAngle: true
      spyOn burst, 'generateRandomAngle'
      burst.run()
      expect(burst.generateRandomAngle).toHaveBeenCalled()
    it 'should not call generateRandomAngle method if isRandom was not passed', ->
      burst = new Burst isRandomAngle: false
      spyOn burst, 'generateRandomAngle'
      burst.run()
      expect(burst.generateRandomAngle).not.toHaveBeenCalled()
    it 'should call generateRandomRadius method if isRandomAngle was passed', ->
      burst = new Burst isRandomRadius: true
      spyOn burst, 'generateRandomRadius'
      burst.run()
      expect(burst.generateRandomRadius).toHaveBeenCalled()
    it 'should not call generateRandomRadius method if isRandom was not passed', ->
      burst = new Burst isRandomRadius: false
      spyOn burst, 'generateRandomRadius'
      burst.run()
      expect(burst.generateRandomRadius).not.toHaveBeenCalled()
    it 'should call generateSign method if isSwirl was passed', ->
      burst = new Burst isSwirl: true, isRandom: true
      spyOn burst, 'generateSign'
      burst.run()
      expect(burst.generateSign).toHaveBeenCalled()
    it 'should not call generateSign method if isSwirl was not passed', ->
      burst = new Burst isSwirl: false
      spyOn burst, 'generateSign'
      burst.run()
      expect(burst.generateSign).not.toHaveBeenCalled()

  describe 'getSwirl method ->', ->
    it 'should calc swirl based on swirlFrequency and swirlSize props', ->
      burst = new Burst isSwirl: true
      swirl1 = burst.getSwirl .5, 1
      swirl2 = burst.getSwirl .5, -1
      freq = Math.sin(burst.props.swirlFrequency*.5)
      expect(swirl1).toBe 1*burst.props.swirlSize*freq
      freq = Math.sin(burst.props.swirlFrequency*.5)
      expect(swirl2).toBe -1*burst.props.swirlSize*freq

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
    it 'should call getSwirl method if isSwirl is set', ->
      burst = new Burst isSwirl: true
      spyOn burst, 'getSwirl'
      burst.draw .5
      expect(burst.getSwirl).toHaveBeenCalled()
    it 'should pass the current progress and i to getSwirl method', ->
      burst = new Burst isSwirl: true
      spyOn burst, 'getSwirl'
      burst.draw .5
      expect(burst.getSwirl).toHaveBeenCalledWith .5, -1




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
    it 'should have isRandom option ->', ->
      burst = new Burst
      expect(burst.props.isRandom).toBeDefined()
      expect(burst.props.isRandom).toBe false

    it 'should calculate stepRand and radiusRand for every transit ->', ->
      burst = new Burst isRandom: true
      expect(burst.transits[0].stepRand).toBeDefined()
      expect(burst.transits[0].radiusRand).toBeDefined()
      expect(burst.transits[1].stepRand).toBeDefined()
      expect(burst.transits[1].radiusRand).toBeDefined()

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
    it 'should call generateRandom method if isRandom was passed', ->
      burst = new Burst isRandom: true
      spyOn burst, 'generateRandom'
      burst.run()
      expect(burst.generateRandom).toHaveBeenCalled()
    it 'should not call generateRandom method if isRandom was not passed', ->
      burst = new Burst isRandom: false
      spyOn burst, 'generateRandom'
      burst.run()
      expect(burst.generateRandom).not.toHaveBeenCalled()

  describe 'draw method ->', ->
    it 'should set x/y coordinates on every transit', ->
      burst = new Burst
      burst.draw()
      expect(burst.transits[0].props.x).not.toBe '0px'
      expect(burst.transits[1].props.x).not.toBe '0px'
      expect(burst.transits[2].props.x).not.toBe '0px'
      expect(burst.transits[3].props.x).not.toBe '0px'
      expect(burst.transits[4].props.x).not.toBe '0px'

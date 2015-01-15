Transit = mojs.Transit
Burst   = mojs.Burst

describe 'Byte ->', ->
  describe 'extension ->', ->
    it 'should extend Transit class', ->
      burst = new Burst
      expect(burst instanceof Transit).toBe true
    it 'should have its own defaults', ->
      burst = new Burst
      expect(burst.defaults.burstDegree).toBe       360
      expect(burst.defaults.burstPoints).toBe       5
      expect(burst.defaults.burstRadius[50]).toBe   75
  
  describe 'initialization ->', ->
    it 'should create transits', ->
      burst = new Burst
      expect(burst.transits.length).toBe 5
      expect(burst.transits[0] instanceof Transit).toBe true
    it 'should pass properties to transits', ->
      burst = new Burst
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

  describe 'getOption method ->', ->
    it 'should return an option obj based on i ->', ->
      burst = new Burst radius: [ { 20: 50}, 20, '500' ]
      option0 = burst.getOption 0
      option1 = burst.getOption 1
      option7 = burst.getOption 7
      expect(option0.radius[20]).toBe 50
      expect(option1.radius)    .toBe 20
      expect(option7.radius)    .toBe 20

  describe 'getPropByMod method ->', ->
    it 'should return the prop from @o based on i ->', ->
      burst = new Burst radius: [ { 20: 50}, 20, '500' ]
      opt0 = burst.getPropByMod 'radius', 0
      opt1 = burst.getPropByMod 'radius', 1
      opt8 = burst.getPropByMod 'radius', 8
      expect(opt0[20]).toBe 50
      expect(opt1)    .toBe 20
      expect(opt8)    .toBe '500'
    it 'should the same prop if not an array ->', ->
      burst = new Burst radius: 20
      opt0 = burst.getPropByMod 'radius', 0
      opt1 = burst.getPropByMod 'radius', 1
      opt8 = burst.getPropByMod 'radius', 8
      expect(opt0).toBe 20
      expect(opt1).toBe 20
      expect(opt8).toBe 20

  describe 'size calculations ->', ->
    it 'should calculate size based on largest transit + self radius', ->
      burst = new Burst
          radius:      [{ 20: 50 }, 20]
          strokeWidth: 20
        expect(burst.props.size)  .toBe 215
        expect(burst.props.center).toBe 70








    


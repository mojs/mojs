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
  # describe 'initialization ->', ->
  #   it 'should create transits', ->
  #     burst = new Burst
  #     expect(burst.transits.length).toBe 5
  #     expect(burst.transits[0] instanceof Transit).toBe true
    


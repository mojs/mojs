h         = mojs.h
Runable   = mojs.Runable
Thenable  = mojs.Thenable

describe 'Runable ->', ->
  describe 'extention ->', ->
    it 'should extend Thenable', ->
      rn = new Runable
      expect(rn instanceof Thenable).toBe true
  describe '_vars method ->', ->

  describe '_transformHistoryRecord method', ->
    

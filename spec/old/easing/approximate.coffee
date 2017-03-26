
approximate = mojs.easing.approximate

describe 'approximate method ->', ->
  describe '_sample method', ->
    it 'should call _proximate method with fn, samples', ->
      spyOn approximate, '_proximate'

      fn = (k)-> 2*k
      n = 4
      samplesCount = Math.pow( 10, n )
      approximate fn, n

      samples = approximate._proximate.calls.first().args[0]
      keys = Object.keys(samples)
      expect(keys.length).toBe samplesCount + 2

      expect(samples[0]).toBe fn(0)
      p = 0
      step = 1/samplesCount
      for i in [0...samplesCount-1]
        p += step
        index = parseFloat(p.toFixed(n));
        expect(samples[ index ]).toBe fn(p)

      expect(samples[1]).toBe fn(1)

    it 'should preserve presicion', ->
      spyOn approximate, '_proximate'

      fn = (k)-> 2*k
      n = 4
      samplesCount = Math.pow( 10, n )
      approximate fn, n

      samples = approximate._proximate.calls.first().args[0]
      keys = Object.keys(samples)

      expect(parseFloat(keys[101]) - parseFloat(keys[100]))
        .toBeCloseTo 0, n-1

    it 'should set base to the samples', ->
      spyOn approximate, '_proximate'

      fn = (k)-> 2*k
      n = 4
      samplesCount = Math.pow( 10, n )
      approximate fn, n

      samples = approximate._proximate.calls.first().args[0]
      expect(samples.base).toBe n

    it 'should return a function', ->
      fn = (k)-> 2*k
      n = 4
      result = approximate fn, n

      expect(typeof result).toBe 'function'

      p = 0; size = 10000; step = 1/size
      for i in [0..size]
        expect(result(p)).toBeCloseTo fn(p)
        p += Math.random()
        if p > 1 then p = 0

    it 'should return samples', ->
      spyOn(approximate, '_proximate').and.callThrough()
      fn = (k)-> 2*k
      n = 4
      result = approximate(fn, n)
      samples = approximate._proximate.calls.first().args[0]

      expect(result.getSamples()).toBe samples

    it 'should be able to load with samples', ->
      spyOn(approximate, '_proximate').and.callThrough()

      loadSamples = {}
      fn = (k)-> 2*k
      n = 4
      result = approximate(fn, loadSamples)

      expect(approximate._proximate).toHaveBeenCalledWith loadSamples
      samples = approximate._proximate.calls.first().args[0]
      expect(result.getSamples()).toBe loadSamples

    it 'should be able to load with stringified samples', ->
      spyOn(approximate, '_proximate').and.callThrough()

      loadSamples = { a: 2, c: 3, d: 10 }
      fn = (k)-> 2*k
      n = 4
      result = approximate(fn, JSON.stringify(loadSamples) )

      expect(approximate._proximate).toHaveBeenCalledWith loadSamples
      samples = approximate._proximate.calls.first().args[0]
      expect(result.getSamples()).toEqual loadSamples



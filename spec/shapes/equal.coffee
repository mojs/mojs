Equal  = mojs.Equal
Bit    = mojs.Bit
ns     = 'http://www.w3.org/2000/svg'
svg    = document.createElementNS?(ns, "svg")

describe 'Equal', ->
  it 'should extend Bit', ->
    equal = new Equal ctx: svg
    expect(equal instanceof Bit).toBe(true)
  it 'have type of path', ->
    equal = new Equal ctx: svg
    expect(equal.type).toBe 'path'
  it 'have ratio of 1.43', ->
    equal = new Equal ctx: svg
    expect(equal.ratio).toBe 1.43
  describe 'methods ->', ->
    describe 'draw method ->', ->
      it 'should define points', ->
        equal = new Equal
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
        expect(equal.el.getAttribute('d')).toBeTruthy()
      it 'should not work with 0 points', ->
        equal = new Equal
          ctx:    document.createElementNS?(ns, "svg")
          radius: 20
          points: 0
        expect(equal.el.getAttribute('points')).toBeFalsy()



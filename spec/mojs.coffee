describe 'mojs ->', ->
  it 'should have revision', ->
    expect(typeof mojs.revision).toBe 'string'
  it 'should have isDebug = true', ->
    expect(mojs.isDebug).toBe true
  it 'should have helpers defined', ->
    expect(mojs.helpers).toBeDefined()
  it 'should expose helpers to h variable', ->
    expect(mojs.h).toBe mojs.helpers
  it 'should expose h.delta mojs', ->
    expect(mojs.delta).toBe mojs.helpers.delta
  it 'should expose shapesMap.addShape mojs', ->
    expect(mojs.addShape).toBe mojs.shapesMap.addShape
  it 'should expose shapesMap.customShape mojs', ->
    expect(mojs.CustomShape).toBe mojs.shapesMap.custom
  it 'should have Burst', ->
    expect(mojs.Burst).toBeDefined()
  it 'should have Shape', ->
    expect(mojs.Shape).toBeDefined()
  it 'should have Transit alias', ->
    expect(mojs.Transit).toBe mojs.Shape
  it 'should have Html', ->
    expect(mojs.Html).toBeDefined()
  it 'should have ShapeSwirl', ->
    expect(mojs.ShapeSwirl).toBeDefined()
  it 'should have Swirl alias', ->
    expect(mojs.Swirl).toBe mojs.ShapeSwirl
  it 'should have stagger', ->
    expect(mojs.stagger).toBeDefined()
  it 'should have Spriter', ->
    expect(mojs.Spriter).toBeDefined()
  it 'should have MotionPath', ->
    expect(mojs.MotionPath).toBeDefined()
  it 'should have Timeline', ->
    expect(mojs.Timeline).toBeDefined()
  it 'should have Tween', ->
    expect(mojs.Tween).toBeDefined()
  it 'should have Tweenable', ->
    expect(mojs.Tweenable).toBeDefined()
  it 'should have Thenable', ->
    expect(mojs.Thenable).toBeDefined()
  it 'should have Tunable', ->
    expect(mojs.Tunable).toBeDefined()
  it 'should have Module', ->
    expect(mojs.Module).toBeDefined()
  it 'should have tweener', ->
    expect(mojs.tweener).toBeDefined()
  it 'should have easing', ->
    expect(mojs.easing).toBeDefined()
  it 'should have shapesMap', ->
    expect(mojs.shapesMap).toBeDefined()
  
  it 'should have _pool', ->
    expect(typeof mojs._pool).toBe 'object'
    expect(mojs._pool).toBe mojs._pool
  it 'should have delta', ->
    expect(mojs._pool.Delta).toBeDefined()
  it 'should have deltas', ->
    expect(mojs._pool.Deltas).toBeDefined()

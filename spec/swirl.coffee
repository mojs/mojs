Transit = mojs.Transit
Swirl   = mojs.Swirl
Module  = mojs.Module

tr = new Transit
describe 'Swirl ->', ->
  describe 'extension ->', ->
    it 'should extend Transit class', ->
      swirl = new Swirl
      expect(swirl instanceof Transit).toBe true
    # it 'should have _skipPropsDelta', ->
    #   swirl = new Swirl
    #   expect(swirl._skipPropsDelta.x).toBe 1
    #   expect(swirl._skipPropsDelta.y).toBe 1
    it 'should have degreeShift value', ->
      swirl = new Swirl
        x: {0:10}, y: {0:10}
        isSwirl: false, degreeShift: 90
      expect(swirl._props.degreeShift).toBe 90

  describe '_calcPosData method ->', ->
    it 'should calc position radius', ->
      swirl = new Swirl x: {0:10}, y: {0:20}
      expect(swirl._posData.radius).toBe Math.sqrt (10*10 + 20*20)
    it 'should calc position angle', ->
      swirl = new Swirl x: {0:10}, y: {0:10}
      expect(swirl._posData.angle).toBe 135
    it 'should calc position angle', ->
      swirl = new Swirl x: {0:-10}, y: {0:-10}
      expect(swirl._posData.angle).toBe - 45
    it 'should calc position angle', ->
      swirl = new Swirl x: {0:0}, y: {0:-10}
      expect(swirl._posData.angle).toBe 0
    it 'should calc position angle', ->
      swirl = new Swirl x: {0:-10}, y: {0:0}
      expect(swirl._posData.angle).toBe 270
    it 'should save startX and StartY values', ->
      swirl = new Swirl x: {0:10}, y: {10:10}
      expect(swirl._posData.x.start).toBe 0
      expect(swirl._posData.y.start).toBe 10
    it 'should set start position anyways', ->
      swirl = new Swirl x: {0:10}, y: 0
      expect(swirl._props.x).toBe '0px'
      expect(swirl._props.y).toBe '0px'

  describe '_extendDefaults method ->', ->
    it 'should call super _extendDefaults method', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn(Module.prototype, '_extendDefaults').and.callThrough()
      swirl._extendDefaults()
      expect(Module.prototype._extendDefaults).toHaveBeenCalled()

    it 'should call _calcPosData method', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn(swirl, '_calcPosData').and.callThrough()
      swirl._extendDefaults()
      expect(swirl._calcPosData).toHaveBeenCalled()

  describe '_tuneNewOptions method ->', ->
    it 'should call super _tuneNewOptions method', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn(Module.prototype, '_tuneNewOptions').and.callThrough()
      swirl._tuneNewOptions({})
      expect(Module.prototype._tuneNewOptions).toHaveBeenCalled()

    it 'should call _calcPosData method', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn(swirl, '_calcPosData').and.callThrough()
      swirl._tuneNewOptions()
      expect(swirl._calcPosData).toHaveBeenCalled()

  describe '_declareDefaults method ->', ->
    it 'should call super _declareDefaults', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn(Swirl.prototype, '_declareDefaults').and.callThrough()
      swirl._declareDefaults()
      expect(Swirl.prototype._declareDefaults).toHaveBeenCalled()
    it 'should add swirlSize default', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.swirlSize).toBe 10
    it 'should add swirlFrequency default', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.swirlFrequency).toBe 3
    it 'should add isSwirl default', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.isSwirl).toBe true
    it 'should add pathScale default', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.pathScale).toBe 1
    it 'should add degreeShift default', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.degreeShift).toBe 0
    it 'should modify radius default', ->
      swirl = new Swirl fill: 'cyan'
      expect(swirl._defaults.radius[5]).toBe 0
    it 'should have isWithShape', ->
      swirl = new Swirl fill: 'cyan'
      expect(swirl._defaults.isWithShape).toBe true

  describe '_setProgress ->', ->
    it 'should svae progress', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      swirl._progress = -1
      swirl._setProgress .5
      expect(swirl._progress).toBe .5
    it 'should call _calcCurrentProps method', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn(swirl, '_calcCurrentProps').and.callThrough()
      swirl._setProgress .5
      expect(swirl._calcCurrentProps).toHaveBeenCalledWith .5
    it 'should call _calcOrigin method', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn(swirl, '_calcOrigin').and.callThrough()
      swirl._setProgress .5
      expect(swirl._calcOrigin).toHaveBeenCalled()
    it 'should call _draw method', ->
      swirl = new Swirl radius: [{ 20: 50 }, 20]
      spyOn(swirl, '_draw').and.callThrough()
      swirl._setProgress .5
      expect(swirl._draw).toHaveBeenCalledWith .5

    it 'should set x/y progress', ->
      swirl = new Swirl x: {0:10}, y: {0:10}, isSwirl: false
      swirl._setProgress .4
      swirl._setProgress .5
      expect(parseInt(swirl._props.x, 10)).toBe 5
      expect(parseInt(swirl._props.y, 10)).toBe 5
    it 'should set x/y progress regarding degreeShift', ->
      swirl = new Swirl
        x: {0:10}, y: {0:10}, isSwirl: false,
        degreeShift: 90
      # swirl._setProgress .4
      swirl._setProgress .5
      expect(parseInt(swirl._props.x, 10)).toBe -5
      expect(parseInt(swirl._props.y, 10)).toBe 5
    it 'should set x/y progress regarding delta degreeShift', ->
      swirl = new Swirl
        x: {0:10}, y: {0:10}, isSwirl: false,
        degreeShift: { 0: 180 }
      # swirl._setProgress .5
      swirl._setProgress .5
      expect(parseInt(swirl._props.x, 10)).toBe -5
      expect(parseInt(swirl._props.y, 10)).toBe 5
    it 'should set x/y progress', ->
      swirl = new Swirl x: {0:10}, y: {0:10}, isSwirl: false
      swirl._setProgress 1
      expect(parseInt(swirl._props.x, 10)).toBe 10
      expect(parseInt(swirl._props.y, 10)).toBe 10
    it 'should set negative x/y progress', ->
      swirl = new Swirl
        x: {0:'-10'}, y: {0:'-10'}, isSwirl: false
      swirl._setProgress 1
      expect(parseInt(swirl._props.x, 10)).toBe -10
      expect(parseInt(swirl._props.y, 10)).toBe -10
    it 'should set plain x/y progress if foreign context', ->
      swirl = new Swirl
        x: {0:10}, y: {0:10}, ctx: tr.ctx, isSwirl: false
      swirl._setProgress .5
      swirl._setProgress 1
      expect(swirl._props.x.toFixed(2)).toBe '10.00'
      expect(swirl._props.y.toFixed(2)).toBe '10.00'
    it 'should respect pathScale value', ->
      swirl = new Swirl
        x: {0:10}, y: {0:10},
        isSwirl: false, pathScale: .5
      swirl._setProgress 1
      expect(parseInt(swirl._props.x, 10) ).toBe 5
      expect(parseInt(swirl._props.y, 10) ).toBe 5
    it 'should not add swirl', ->
      swirl = new Swirl x: {0:10}, y: {0:10}, isSwirl: false
      swirl._setProgress .5
      expect( parseInt(swirl._props.x, 10) ).toBe 5
      expect( parseInt(swirl._props.y, 10) ).toBe 5
    it 'should add swirl if isSwirl', ->
      swirl = new Swirl x: {0:10}, y: {0:10}, isSwirl: true
      swirl._setProgress .5
      expect(swirl._props.x).not.toBe '5.0000px'
      expect(swirl._props.y).not.toBe '5.0000px'
  describe '_getSwirl method ->', ->
    it 'should calc swirl based on swirlFrequency and swirlSize props', ->
      swirl = new Swirl
      swirl1 = swirl._getSwirl(.5)
      freq = Math.sin(swirl._props.swirlFrequency*.5)
      sign = swirl._props.signRand
      expect(swirl1).toBe sign*swirl._props.swirlSize*freq

  describe '_draw method ->', ->
    it 'should call super', ->
      swirl = new Swirl
      spyOn Transit::, '_draw'
      swirl._draw()
      expect(Transit::_draw).toHaveBeenCalled()

    it 'should not call super if !isWithShape', ->
      swirl = new Swirl isWithShape: false
      spyOn Transit::, '_draw'
      spyOn Transit::, '_drawEl'
      swirl._draw()
      expect(Transit::_draw).not.toHaveBeenCalled()
      expect(Transit::_drawEl).toHaveBeenCalled()





Shape       = mojs.Shape
ShapeSwirl  = mojs.ShapeSwirl
Module      = mojs.Module

tr = new Shape
describe 'ShapeSwirl ->', ->
  describe 'extension ->', ->
    it 'should extend Shape class', ->
      swirl = new ShapeSwirl
      expect(swirl instanceof Shape).toBe true
    it 'should have degreeShift value', ->
      swirl = new ShapeSwirl
        x: {0:10}, y: {0:10}
        isSwirl: false, degreeShift: 90
      expect(swirl._props.degreeShift).toBe 90

  describe '_calcPosData method ->', ->
    it 'should calc position radius', ->
      swirl = new ShapeSwirl x: {0:10}, y: {0:20}
      expect(swirl._posData.radius).toBe Math.sqrt (10*10 + 20*20)
    it 'should calc position angle', ->
      swirl = new ShapeSwirl x: {0:10}, y: {0:10}
      expect(swirl._posData.angle).toBe 135
    it 'should calc position angle', ->
      swirl = new ShapeSwirl x: {0:-10}, y: {0:-10}
      expect(swirl._posData.angle).toBe - 45
    it 'should calc position angle', ->
      swirl = new ShapeSwirl x: {0:0}, y: {0:-10}
      expect(swirl._posData.angle).toBe 0
    it 'should calc position angle', ->
      swirl = new ShapeSwirl x: {0:-10}, y: {0:0}
      expect(swirl._posData.angle).toBe 270
    it 'should save startX and StartY values', ->
      swirl = new ShapeSwirl x: {0:10}, y: {10:10}
      expect(swirl._posData.x.start).toBe 0
      expect(swirl._posData.y.start).toBe 10
    it 'should set start position anyways', ->
      swirl = new ShapeSwirl x: {0:10}, y: 0
      expect(swirl._props.x).toBe '0px'
      expect(swirl._props.y).toBe '0px'
    # it 'should call _calcSwirlXY method with 1', ->
    #   swirl = new ShapeSwirl x: {0:10}, y: 0
    #   spyOn swirl, '_calcSwirlXY'
    #   swirl._calcPosData()
    #   expect(swirl._calcSwirlXY).toHaveBeenCalledWith 1

  describe '_extendDefaults method ->', ->
    it 'should call super _extendDefaults method', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      spyOn(Module.prototype, '_extendDefaults').and.callThrough()
      swirl._extendDefaults()
      expect(Module.prototype._extendDefaults).toHaveBeenCalled()

    it 'should call _calcPosData method', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      spyOn(swirl, '_calcPosData').and.callThrough()
      swirl._extendDefaults()
      expect(swirl._calcPosData).toHaveBeenCalled()

  describe '_tuneNewOptions method ->', ->
    it 'should call super _tuneNewOptions method', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      spyOn(Module.prototype, '_tuneNewOptions').and.callThrough()
      swirl._tuneNewOptions({})
      expect(Module.prototype._tuneNewOptions).toHaveBeenCalled()

    it 'should not call super _tuneNewOptions method if no o', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      spyOn(Module.prototype, '_tuneNewOptions').and.callThrough()
      swirl._tuneNewOptions()
      expect(Module.prototype._tuneNewOptions).not.toHaveBeenCalled()

    it 'should call _calcPosData method if x changes', ->
      swirl = new ShapeSwirl x: 200
      spyOn(swirl, '_calcPosData').and.callThrough()
      swirl._tuneNewOptions({ x: 300 })
      expect(swirl._calcPosData).toHaveBeenCalled()

    it 'should call _calcPosData method if y changes', ->
      swirl = new ShapeSwirl y: 200
      spyOn(swirl, '_calcPosData').and.callThrough()
      swirl._tuneNewOptions({ y: 300 })
      expect(swirl._calcPosData).toHaveBeenCalled()

    it 'should not call _calcPosData method if no x/y changes', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      spyOn(swirl, '_calcPosData').and.callThrough()
      swirl._tuneNewOptions({ radius: 200 })
      expect(swirl._calcPosData).not.toHaveBeenCalled()

  describe '_declareDefaults method ->', ->
    it 'should call super _declareDefaults', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      spyOn(ShapeSwirl.prototype, '_declareDefaults').and.callThrough()
      swirl._declareDefaults()
      expect(ShapeSwirl.prototype._declareDefaults).toHaveBeenCalled()
    it 'should add swirlSize default', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.swirlSize).toBe 10
    it 'should add swirlFrequency default', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.swirlFrequency).toBe 3
    it 'should add isSwirl default', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.isSwirl).toBe true
    it 'should add pathScale default', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.pathScale).toBe 1
    it 'should add degreeShift default', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.degreeShift).toBe 0
    it 'should modify radius default', ->
      swirl = new ShapeSwirl fill: 'cyan'
      expect(swirl._defaults.radius).toBe 5
    it 'should modify scale default', ->
      swirl = new ShapeSwirl fill: 'cyan'
      expect(swirl._defaults.scale[1]).toBe 0
    it 'should modify x default', ->
      swirl = new ShapeSwirl fill: 'cyan'
      expect(swirl._defaults.x).toBe 0
    it 'should modify x default', ->
      swirl = new ShapeSwirl fill: 'cyan'
      expect(swirl._defaults.y).toBe 0
    it 'should add direction default', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      expect(swirl._defaults.direction).toBe 1
    it 'should have isWithShape', ->
      swirl = new ShapeSwirl fill: 'cyan'
      expect(swirl._defaults.isWithShape).toBe true

  describe '_setProgress ->', ->
    it 'should svae progress', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      swirl._progress = -1
      swirl._setProgress .5
      expect(swirl._progress).toBe .5
    it 'should call _calcCurrentProps method', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      spyOn(swirl, '_calcCurrentProps').and.callThrough()
      swirl._setProgress .5, .35
      expect(swirl._calcCurrentProps).toHaveBeenCalledWith .5, .35
    it 'should call _draw method', ->
      swirl = new ShapeSwirl radius: [{ 20: 50 }, 20]
      spyOn(swirl, '_draw').and.callThrough()
      swirl._setProgress .5
      expect(swirl._draw).toHaveBeenCalledWith .5

    it 'should set x/y progress', ->
      swirl = new ShapeSwirl x: {0:10}, y: {0:10}, isSwirl: false
      swirl._setProgress .4
      swirl._setProgress .5
      expect(parseInt(swirl._props.x, 10)).toBe 5
      expect(parseInt(swirl._props.y, 10)).toBe 5
    it 'should set x/y progress regarding degreeShift', ->
      swirl = new ShapeSwirl
        x: {0:10}, y: {0:10}, isSwirl: false,
        degreeShift: 90
      # swirl._setProgress .4
      swirl._setProgress .5
      x = parseFloat(swirl._props.x).toFixed 2
      expect(x).toBe '-5.00'
      expect(parseInt(swirl._props.y, 10)).toBe 5
      
    it 'should set x/y progress regarding delta degreeShift', ->
      swirl = new ShapeSwirl
        x: {0:10}, y: {0:10}, isSwirl: false,
        degreeShift: { 0: 180 }
      # swirl._setProgress .5
      swirl._setProgress .5
      
      x = parseFloat(swirl._props.x).toFixed 2
      expect(x).toBe '-5.00'
      expect(parseInt(swirl._props.y, 10)).toBe 5
    it 'should set x/y progress', ->
      swirl = new ShapeSwirl x: {0:10}, y: {0:10}, isSwirl: false
      swirl._setProgress 1
      expect(parseInt(swirl._props.x, 10)).toBe 10
      expect(parseInt(swirl._props.y, 10)).toBe 10
    it 'should set negative x/y progress', ->
      swirl = new ShapeSwirl
        x: {0:'-10'}, y: {0:'-10'}, isSwirl: false
      swirl._setProgress 1
      
      x = parseFloat(swirl._props.x).toFixed 2
      expect(x).toBe '-10.00'
      y = parseFloat(swirl._props.y).toFixed 2
      expect(y).toBe '-10.00'
      # expect(parseInt(swirl._props.x, 10)).toBe -10
      # expect(parseInt(swirl._props.y, 10)).toBe -10
    # old foreign
    # it 'should set plain x/y progress if foreign context', ->
    #   swirl = new ShapeSwirl
    #     x: {0:10}, y: {0:10}, ctx: tr.ctx, isSwirl: false
    #   swirl._setProgress .5
    #   swirl._setProgress 1
    #   expect(swirl._props.x.toFixed(2)).toBe '10.00'
    #   expect(swirl._props.y.toFixed(2)).toBe '10.00'
    it 'should respect pathScale value', ->
      swirl = new ShapeSwirl
        x: {0:10}, y: {0:10},
        isSwirl: false, pathScale: .5
      swirl._setProgress 1
      expect(parseInt(swirl._props.x, 10) ).toBe 5
      expect(parseInt(swirl._props.y, 10) ).toBe 5
    it 'should not add swirl', ->
      swirl = new ShapeSwirl x: {0:10}, y: {0:10}, isSwirl: false
      swirl._setProgress .5
      expect( parseInt(swirl._props.x, 10) ).toBe 5
      expect( parseInt(swirl._props.y, 10) ).toBe 5
    it 'should add swirl if isSwirl', ->
      swirl = new ShapeSwirl x: {0:10}, y: {0:10}, isSwirl: true
      swirl._setProgress .5
      expect(swirl._props.x).not.toBe '5.0000px'
      expect(swirl._props.y).not.toBe '5.0000px'
  describe '_getSwirl method ->', ->
    it 'should calc swirl based on swirlFrequency and swirlSize props', ->
      swirl = new ShapeSwirl
      swirl1 = swirl._getSwirl(.5)
      freq = Math.sin(swirl._props.swirlFrequency*.5)
      sign = swirl._props.direction
      expect(swirl1).toBe sign*swirl._props.swirlSize*freq

  describe '_draw method ->', ->
    it 'should call super', ->
      swirl = new ShapeSwirl
      spyOn Shape::, '_draw'
      swirl._draw()
      expect(Shape::_draw).toHaveBeenCalled()

    it 'should not call super if !isWithShape', ->
      swirl = new ShapeSwirl isWithShape: false
      spyOn Shape::, '_draw'
      spyOn Shape::, '_drawEl'
      swirl._draw()
      expect(Shape::_draw).not.toHaveBeenCalled()
      expect(Shape::_drawEl).toHaveBeenCalled()


  describe '_calcSwirlXY method ->', ->
    it 'should set values without exponintail values', ->
      swirl = new ShapeSwirl x: { 0: 250 }, y: { 0: 250 }

      swirl._calcSwirlXY( .000000001 )
      swirl._calcSwirlXY( .000000001 )
      # console.log swirl._props.x
      expect(swirl._props.x).not.toMatch /e/
      expect(swirl._props.y).not.toMatch /e/

    it 'should set negative values without exponintail values', ->
      swirl = new ShapeSwirl x: { 0: -250 }, y: { 0: -250 }

      swirl._calcSwirlXY( .000000001 )
      swirl._calcSwirlXY( .000000001 )
      # console.log swirl._props.x
      expect(swirl._props.x).not.toMatch /e/
      expect(swirl._props.y).not.toMatch /e/



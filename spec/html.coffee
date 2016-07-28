
Html  = mojs.Html
h     = mojs.h

el = document.createElement('div');

describe 'Html ->', ->
  it 'should extend Tunable', ->
    html = new Html
      el: el

    expect( html instanceof mojs.Tunable ).toBe true

  describe '_extendDefaults method ->', ->
    it 'should copy all non-delta properties to _props', ->
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        y:            40
        x:            { 20: 40 }
        skewX:        { 20: 40 }
        color:        { 'cyan': 'orange' }
        # prevChainModule: { foo: 'bar' }

      p = html._props

      expect( p['borderWidth'] ).toBe '20px'
      expect( p['borderRadius'] ).toBe '40px'
      expect( p['y'] ).toBe '40px'

      equal = {
        el: el
        'borderWidth':  '20px'
        'borderRadius': '40px'
        y: 40
        x:      { 20: 40 }
        skewX:  { 20: 40 }
        color:  { 'cyan': 'orange' }
      }
      expect( html._addDefaults html._o ).toEqual html._addDefaults( equal )

      expect( html._renderProps )
        .toEqual [ 'borderWidth', 'borderRadius' ]

      expect( html._drawProps )
        .toEqual [ 'color' ]

    it 'should not copy tween properties _renderProps', ->
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        y:            40
        x:            { 20: 40 }
        skewX:        { 20: 40 }
        color:        { 'cyan': 'orange' }
        duration:     300
        # prevChainModule: { foo: 'bar' }

      p = html._props

      expect( html._renderProps )
        .toEqual [ 'borderWidth', 'borderRadius' ]


    it 'should call _createDeltas method ->', ->
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }

      spyOn html, '_createDeltas'

      html._extendDefaults()

      expect( html._createDeltas ).toHaveBeenCalledWith html._addDefaults html._o

  
  describe '_createDeltas method ->', ->
    it 'should create deltas with passed object', ->
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }

      html.deltas   = null
      html.timeline = null

      html._createDeltas html._o

      expect( html.deltas instanceof mojs._pool.Deltas ).toBe true
      expect( html.deltas._o.options ).toBe html._o
      
      expect( typeof html.deltas._o.onUpdate ).toBe 'function'
      spyOn html, '_draw'
      html.deltas._o.onUpdate()
      expect( html._draw ).toHaveBeenCalled()

      expect( html.deltas._o.props ).toBe html._props
      expect( html.timeline ).toBe html.deltas.timeline

    it 'should pass property maps to Deltas', ->
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }

      html.deltas._o._arrayPropertyMap  = null
      html.deltas._o._numberPropertyMap = null

      html._createDeltas html._o

      expect( html.deltas._o.arrayPropertyMap ).toBe html._arrayPropertyMap
      expect( html.deltas._o.numberPropertyMap ).toBe html._numberPropertyMap

  describe '_makeTween and _makeTimeline methods ->', ->
    it 'should override them to empty methods', ->
      spyOn mojs.Tweenable.prototype, '_makeTween'
      spyOn mojs.Tweenable.prototype, '_makeTimeline'

      html = new Html
        el: el

      expect( mojs.Tweenable.prototype._makeTween ).not.toHaveBeenCalled()
      expect( mojs.Tweenable.prototype._makeTimeline ).not.toHaveBeenCalled()

  describe '_vars method ->', ->
    it 'should call super', ->
      spyOn mojs.Module.prototype, '_vars'

      html = new Html
        el: el

      expect( mojs.Module.prototype._vars ).toHaveBeenCalled()

    it 'should create _state object', ->

      html = new Html
        el: el

      html._state = null
      html._vars()

      expect( typeof html._state ).toBe 'object'
      expect( html._state ).toBe html._state

  describe '_declareDefaults method ->', ->
    it 'should _declareDefaults', ->
      html = new Html
        el: el

      html._defaults = null
      html._declareDefaults()

      expect( html._defaults.x ).toBe 0
      expect( html._defaults.y ).toBe 0
      expect( html._defaults.z ).toBe 0
      
      expect( html._defaults.skewX ).toBe 0
      expect( html._defaults.skewY ).toBe 0
      
      expect( html._defaults.rotate ).toBe  0
      expect( html._defaults.rotateX ).toBe 0
      expect( html._defaults.rotateY ).toBe 0
      expect( html._defaults.rotateZ ).toBe 0
      
      expect( html._defaults.scale ).toBe  1
      expect( html._defaults.scaleX ).toBe 1
      expect( html._defaults.scaleY ).toBe 1

    it 'should create _drawExclude object', ->

      html = new Html
        el: el

      html._drawExclude = null
      html._declareDefaults()

      expect( html._drawExclude.el ).toBe 1

    it 'should create _3dProperties object', ->

      html = new Html
        el: el

      html._3dProperties = null
      html._declareDefaults()

      expect( html._3dProperties ).toEqual [ 'rotateX', 'rotateY', 'z' ]

    it 'should create _arrayPropertyMap object', ->

      html = new Html el: el

      html._arrayPropertyMap = null
      html._declareDefaults()

      expect( html._arrayPropertyMap.transformOrigin ).toBe 1
      expect( html._arrayPropertyMap.backgroundPosition ).toBe 1

    it 'should create _numberPropertyMap object', ->

      html = new Html el: el

      html._numberPropertyMap = null
      html._declareDefaults()

      expect( html._numberPropertyMap.opacity ).toBe 1
      expect( html._numberPropertyMap.scale ).toBe 1
      expect( html._numberPropertyMap.scaleX ).toBe 1
      expect( html._numberPropertyMap.scaleY ).toBe 1
      expect( html._numberPropertyMap.rotate ).toBe 1
      expect( html._numberPropertyMap.rotateX ).toBe 1
      expect( html._numberPropertyMap.rotateY ).toBe 1
      expect( html._numberPropertyMap.skewX ).toBe 1
      expect( html._numberPropertyMap.skewY ).toBe 1

    it 'should create _prefixPropertyMap object', ->

      html = new Html el: el

      html._prefixPropertyMap = null
      html._declareDefaults()

      expect( html._prefixPropertyMap.transform ).toBe 1
      expect( html._prefixPropertyMap.transformOrigin ).toBe 1

    it 'should create _prefix property', ->

      html = new Html el: el

      html._prefix = null
      html._declareDefaults()

      expect( html._prefix ).toBe h.prefix.css

  describe '_addDefaults method', ->
    it 'should add defaults to passed object', ->
      html = new Html
        el: el

      obj = { skewX: 20 }

      result = html._addDefaults( obj )

      isOk = true
      for key, value of html._defaults
        if ( value isnt result[key] && key isnt 'skewX' ) then isOk = false

      expect( isOk ).toBe true

    it 'should fallback for scaleX/scaleY to scale', ->
      html = new Html
        el: el

      obj = { skewX: 20, scale: 2, scaleY: 3 }

      result = html._addDefaults( obj )

      expect( result.scale  ).toBe 2
      expect( result.scaleX ).toBe 2
      expect( result.scaleY ).toBe 3

    it 'should get if any 3d present', ->
      html = new Html
        el: el

      html._is3d = null

      obj = { skewX: 20, scale: 2, scaleY: 3 }
      result = html._addDefaults( obj )
      expect( html._is3d  ).toBe false


  describe '_setStyle method', ->
    it 'should set style on el', ->
      el = document.createElement 'div'
      html = new Html
        el: el

      html._props.el.style['borderWidth'] = null
      html._setStyle 'borderWidth', '50px'
      expect( html._props.el.style['borderWidth'] ).toBe '50px'

    it 'should prefix properties that are in _prefixPropertyMap', ->
      el = document.createElement 'div'
      html = new Html el: el

      html._props.el.style["#{h.prefix.css}transform"] = null
      html._setStyle 'transform', 'scale(1)'
      expect( html._props.el.style["#{h.prefix.css}transform"] ).toBe 'scale(1)'

    it 'should add the style to _state', ->
      el = document.createElement 'div'
      html = new Html
        el: el

      html._props.el.style['borderWidth'] = null
      html._setStyle 'borderWidth', '50px'
      expect( html._state['borderWidth'] ).toBe '50px'

    it 'should not set style if it is in _state', ->
      el = document.createElement 'div'
      html = new Html el: el

      html._state['borderWidth'] = '50px'
      html._props.el.style['borderWidth'] = '20px'
      html._setStyle 'borderWidth', '50px'
      expect( html._props.el.style['borderWidth'] ).toBe '20px'

  describe '_drawTransform method', ->
    it 'should set transform on el', ->
      el = document.createElement 'div'
      document.body.appendChild el

      html = new Html
        el: el

      spyOn html, '_setStyle'
      html._drawTransform()

      args = html._setStyle.calls.first().args

      expect( args[0] ).toBe 'transform'
      string = args[1]
      string = string.replace /\n/gim, ' '
      string = string.replace /\s{2,}/gim, ' '
      expect( string ).toBe 'translate(0, 0) rotate(0deg) skew(0deg, 0deg) scale(1, 1)'

    it 'should set 3d transform on el', ->
      el = document.createElement 'div'
      document.body.appendChild el

      html = new Html
        el: el
        z:  '10px'

      spyOn html, '_setStyle'
      html._drawTransform()

      args = html._setStyle.calls.first().args

      expect( args[0] ).toBe 'transform'
      string = args[1]
      string = string.replace /\n/gim, ' '
      string = string.replace /\s{2,}/gim, ' '
      expect( string )
        .toBe 'translate3d(0, 0, 10px) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg) scale(1, 1)'

  describe '_draw method', ->
    it 'should style _props to el', ->
      el = document.createElement 'div'
      html = new Html
        el: el
        left: { '20px': '40px' }

      spyOn(html, '_setStyle').and.callThrough()
      html._props.left = '30px'
      html._state.left = '0px'
      el.style['left'] = ''

      html._draw()

      expect( el.style['left'] ).toBe html._props.left

      expect( html._setStyle ).toHaveBeenCalledWith

    it 'should call _drawTransform method', ->
      el = document.createElement 'div'
      html = new Html
        el: el
        left: { '20px': '40px' }

      spyOn html, '_drawTransform'
      html._draw()

      expect( html._drawTransform ).toHaveBeenCalled()


  describe '_render method ->', ->
    it 'should set initial properties', ->
      el = document.createElement 'div'
      html = new Html
        el: el
        borderRadius: 25

      spyOn html, '_setStyle'
      html._render()

      expect( html._setStyle ).toHaveBeenCalledWith 'borderRadius', '25px'
      expect( html._setStyle.calls.count() ).toBe 2

    it 'should not add pixels if a string', ->
      el = document.createElement 'div'
      html = new Html
        el: el
        borderRadius: '25rem'

      spyOn html, '_setStyle'
      html._render()

      expect( html._setStyle ).toHaveBeenCalledWith 'borderRadius', '25rem'
      expect( html._setStyle.calls.count() ).toBe 2

    it 'should call _draw method', ->
      el = document.createElement 'div'
      html = new Html el: el

      spyOn html, '_draw'
      html._render()

      expect( html._draw ).toHaveBeenCalled()
      expect( html._draw.calls.count() ).toBe 1

  describe '_arrToString method ->', ->
    it 'should cast array to string', ->
      el = document.createElement 'div'
      html = new Html el: el

      arr = h.strToArr( '200px 300px' )

      expect( html._arrToString( arr ) ).toBe '200px 300px '


  describe '_parseOption method ->', ->
    it 'should call super', ->
      name = 'x'; value = 20
      html = new Html el: document.createElement 'div'

      spyOn mojs.Module.prototype, '_parseOption'

      html._parseOption name, value

      expect( mojs.Module.prototype._parseOption )
        .toHaveBeenCalledWith name, value

    it 'should cast array values', ->
      name = 'transformOrigin'; value = '200px 300px'
      html = new Html
        el: document.createElement 'div'

      html._parseOption name, value

      expect( html._props[name] ).toBe '200px 300px '



  # describe '_renameProperties method ->', ->
  #   it 'should rename camelCase to spinal-case', ->
  #     html = new Html
  #       el: el

  #     opts =
  #       borderWidth:  '20px'
  #       borderRadius: '40px'
  #       x:            { 20: 40 }
  #       color:        { 'cyan': 'orange' }

  #     newOpts = html._renameProperties opts

  #     expect( newOpts['border-width'] ).toBe opts.borderWidth
  #     expect( newOpts['border-radius'] ).toBe opts.borderRadius
  #     expect( newOpts['x'] ).toBe opts.x
  #     expect( newOpts['color'] ).toBe opts.color

  #   it 'should ignore tween properties', ->
  #     html = new Html
  #       el: el

  #     opts =
  #       borderWidth:  '20px'
  #       borderRadius: '40px'
  #       x:            { 20: 40 }
  #       color:        { 'cyan': 'orange' }
  #       callbacksContext: {}
  #       onUpdate: ->

  #     newOpts = html._renameProperties opts

  #     expect( newOpts['border-width'] ).toBe opts.borderWidth
  #     expect( newOpts['border-radius'] ).toBe opts.borderRadius
  #     expect( newOpts['x'] ).toBe opts.x
  #     expect( newOpts['color'] ).toBe opts.color

  #     expect( newOpts['callbacksContext'] ).toBe opts.callbacksContext
  #     expect( newOpts['onUpdate'] ).toBe opts.onUpdate

  #   it 'should ignore defauls properties', ->
  #     html = new Html
  #       el: el

  #     opts =
  #       borderRadius: '40px'
  #       x:            { 20: 40 }
  #       skewY:        '20px'
  #       rotateY:      { 40: 10 }

  #     newOpts = html._renameProperties opts

  #     expect( newOpts['border-radius'] ).toBe opts.borderRadius
  #     expect( newOpts['x'] ).toBe opts.x
  #     expect( newOpts['skewY'] ).toBe opts.skewY
  #     expect( newOpts['rotateY'] ).toBe opts.rotateY

  # describe '_renameProperty method ->', ->
  #   it 'should change string from camelCase to spinal-case', ->
  #     html = new Html
  #       el: el

  #     expect( html._renameProperty( 'borderRadius' ) ).toBe 'border-radius'


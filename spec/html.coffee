
Html  = mojs.Html
h     = mojs.h

el = document.createElement('div');

describe 'Html ->', ->
  it 'should extend Thenable', ->
    html = new Html el: el

    expect( html instanceof mojs.Thenable ).toBe true

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
      
      # defaults
      expect( p['z'] ).toBe 0
      expect( p['skewY'] ).toBe 0

      # expect( p['rotate'] ).toBe 0
      expect( p['angleX'] ).toBe 0
      expect( p['angleY'] ).toBe 0
      expect( p['angleZ'] ).toBe 0
      
      expect( p['scale'] ).toBe  1
      expect( p['scaleX'] ).toBe 1
      expect( p['scaleY'] ).toBe 1
      
      expect( p['isRefreshState'] ).toBe true
      expect( p['isShowStart'] ).toBe true
      expect( p['isShowEnd'] ).toBe true
      expect( p['isSoftHide'] ).toBe true
      expect( p['isForce3d'] ).toBe false
      # defaults end

      expect( html._renderProps )
        .toEqual [ 'borderWidth', 'borderRadius' ]

      expect( html._drawProps )
        .toEqual [ 'color' ]

    it 'should not copy tween properties _drawProps', ->
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        y:            40
        x:            { 20: 40 }
        skewX:        { 20: 40 }
        color:        { 'cyan': 'orange' }
        duration:     300
        timeline:     { delay: 300 }
        # prevChainModule: { foo: 'bar' }

      p = html._props

      expect( html._drawProps )
        .toEqual [ 'color' ]

    it 'should not copy customProperties _drawProps', ->
      customProperties = {
        originX: {
          type: 'number',
          default: 0
        }
        draw: -> {}
      }
      html = new Html
        el: el
        color:        'cyan' : 'red'
        originX:      { 20: 40 }
        customProperties: customProperties
        # prevChainModule: { foo: 'bar' }

      p = html._props

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

    it 'should not copy customProperties to _renderProps', ->
      customProperties = {
        originX: {
          type: 'number',
          default: 0
        }
        draw: -> {}
      }
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        originX:      20
        customProperties: customProperties

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

    it 'should parse el ->', ->
      div = document.createElement('div')
      div.setAttribute( 'id', 'js-el' )
      document.body.appendChild div
      html = new Html
        el: '#js-el'
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }

      html._props.el = null
      html._extendDefaults()

      expect( html._props.el instanceof HTMLElement ).toBe true
      expect( html._props.el ).toBe div

    it 'should save _props.el to el ->', ->
      div = document.createElement('div')
      html = new Html
        el: div
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }

      expect( html.el ).toBe div

    it 'should use props if passed ->', ->
      props = {}
      html = new Html
        el: document.createElement 'div'
        props: props

      expect( html._props ).toBe props

  describe '_createDeltas method ->', ->
    it 'should create deltas with passed object', ->
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }

      html.deltas   = null
      # html.timeline = null

      html._createDeltas html._o

      expect( html.deltas instanceof mojs._pool.Deltas ).toBe true
      expect( html.deltas._o.options ).toBe html._o
      expect( html.deltas._o.props ).toBe html._props

    it 'should pass property maps to Deltas', ->
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }

      html.deltas._o.arrayPropertyMap  = null
      html.deltas._o.numberPropertyMap = null

      html._createDeltas html._o

      expect( html.deltas._o.arrayPropertyMap ).toBe html._arrayPropertyMap
      expect( html.deltas._o.numberPropertyMap ).toBe html._numberPropertyMap


    it 'should pass options callbacksContext to deltas', ->
      html = new Html el: el

      callbacksContext = {}
      o = {
        callbacksContext: callbacksContext,
        x:                { 20: 40 }
      }

      html._createDeltas o

      expect( html.deltas._o.callbacksContext ).toBe callbacksContext

    it 'should pass `this` as callbacksContext to deltas', ->
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }

      html.deltas._o.callbacksContext  = null

      html._createDeltas html._o

      expect( html.deltas._o.callbacksContext ).toBe html

    it 'should pass prevChainModule to deltas', ->
      prevChainModule = {}
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }
        prevChainModule: prevChainModule

      html.deltas._o.isChained = null
      html._createDeltas html._o

      expect( html.deltas._o.isChained ).toBe true

    it 'should _customProps to deltas', ->
      fun = ->
      customProps = {
        origin: 50,
        draw: fun
      }
      html = new Html
        el: el
        borderWidth:  '20px'
        borderRadius: '40px'
        x:            { 20: 40 }
        color:        { 'cyan': 'orange' }
        customProperties:  customProps

      html._createDeltas html._o

      expect( html.deltas._o.customProps )
        .toEqual jasmine.objectContaining({
          origin: 50
        })

  describe '_makeTween and _makeTimeline methods ->', ->
    it 'should override them to empty methods', ->
      spyOn mojs.Tweenable.prototype, '_makeTween'
      # spyOn mojs.Tweenable.prototype, '_makeTimeline'

      html = new Html el: el

      expect( mojs.Tweenable.prototype._makeTween ).not.toHaveBeenCalled()
      # expect( mojs.Tweenable.prototype._makeTimeline ).not.toHaveBeenCalled()

  describe '_vars method ->', ->
    it 'should call refresh on deltas', ->
      html = new Html el: el

      spyOn html.deltas, 'refresh'

      html._vars()

      expect( html.deltas.refresh ).toHaveBeenCalledWith false


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

    it 'should call restore on deltas', ->
      html = new Html el: el

      spyOn html.deltas, 'restore'

      html._vars()

      expect( html.deltas.restore ).toHaveBeenCalled()

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
      
      expect( html._defaults.angleX ).toBe 0
      expect( html._defaults.angleY ).toBe 0
      expect( html._defaults.angleZ ).toBe 0
      
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

      expect( html._3dProperties ).toEqual [ 'angleX', 'angleY', 'z' ]

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
      # expect( html._numberPropertyMap.rotate ).toBe 1
      expect( html._numberPropertyMap.angleX ).toBe 1
      expect( html._numberPropertyMap.angleY ).toBe 1
      expect( html._numberPropertyMap.angleZ ).toBe 1
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

    it 'should get if any 3d present // positive', ->
      html = new Html
        el: el

      html._is3d = null

      obj = { skewX: 20, scale: 2, scaleY: 3, z: 20 }
      result = html._addDefaults( obj )
      expect( html._is3d  ).toBe true

    it 'should _is3d be true is isForce3d set', ->
      html = new Html
        el: el
        isForce3d: true

      html._is3d = null

      obj = { skewX: 20, scale: 2, scaleY: 3 }
      result = html._addDefaults( obj )
      expect( html._is3d  ).toBe true


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

    it 'should call _customDraw method', ->
      el = document.createElement 'div'
      customDraw = ->
      html = new Html
        el: el
        left: { '20px': '40px' }
        customProperties: {
          x: {
            type: 'number',
            default: 0
          },
          draw: customDraw
        }

      spyOn html, '_customDraw'
      html._draw()

      expect( html._customDraw )
        .toHaveBeenCalledWith html._props.el, html._props

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

    it 'should return immediately if `prevChainModule`', ->
      el = document.createElement 'div'
      html = new Html
        el: el
        prevChainModule: {}

      spyOn html, '_draw'
      spyOn html, '_setStyle'

      html._render()

      expect( html._draw ).not.toHaveBeenCalled()
      expect( html._setStyle ).not.toHaveBeenCalled()

    it 'should not call _hide if isShowStart is true', ->
      html = new Html
        el: document.createElement 'div'

      spyOn html, '_hide'

      html._render()

      expect( html._hide ).not.toHaveBeenCalled()

    it 'should call _hide if isShowStart is false', ->
      html = new Html
        el: document.createElement 'div'
        isShowStart: false

      spyOn html, '_hide'

      html._render()

      expect( html._hide ).toHaveBeenCalled()

    it 'should not call _hide if module is chained', ->
      html = new Html
        el: document.createElement 'div'
        prevChainModule: {}
        isShowStart: false

      spyOn html, '_hide'

      html._render()

      expect( html._hide ).not.toHaveBeenCalled()


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


  describe 'then method ->', ->
    it 'should call `refresh` on the last `_module`', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      spyOn html._modules[0].deltas, 'refresh'

      html.then({ borderRadius: 0 })

      expect( html._modules[0].deltas.refresh ).toHaveBeenCalledWith false

    it 'should call `refresh` on the last `_module` #2', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        }).then({ borderRadius: 0 })

      spyOn(html._modules[1].deltas, 'refresh').and.callThrough()

      html.then({ borderRadius: 20 })

      expect( html._modules[1].deltas.refresh ).toHaveBeenCalledWith false

    it 'should set the last `_history` record to last `_modules` `_props`', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      html._history[0] = undefined

      html.then({ borderRadius: 0 })

      expect( html._history[0] ).toBeDefined()

    it 'should set the last `_history` record to last `_modules` `_props` #2', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        }).then({ borderRadius: 0 })

      html._history[1] = undefined

      html.then({ borderRadius: 0 })

      expect( html._history[1] ).toBeDefined()

    it 'should call `super`', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      spyOn mojs.Thenable.prototype, 'then'
      opts = { borderRadius: 0 }
      html.then(opts)

      expect( mojs.Thenable.prototype.then ).toHaveBeenCalledWith opts

    it 'should restore `deltas`', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      spyOn html._modules[0].deltas, 'restore'

      html.then({ borderRadius: 0 })

      expect( html._modules[0].deltas.restore ).toHaveBeenCalled()

    it 'should restore `deltas` #2', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        }).then({ borderRadius: 0 })

      spyOn html._modules[1].deltas, 'restore'

      html.then({ borderRadius: 0 })

      expect( html._modules[1].deltas.restore ).toHaveBeenCalled()

    it 'should return `this`', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      result = html.then({ borderRadius: 0 })

      expect( result ).toBe html

    it 'should return if no options passed', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      spyOn html._modules[0].deltas, 'refresh'

      html.then()

      expect( html._modules[0].deltas.refresh ).not.toHaveBeenCalled()

    it 'should return if empty object passed', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      spyOn html._modules[0].deltas, 'refresh'

      html.then({})

      expect( html._modules[0].deltas.refresh ).not.toHaveBeenCalled()

  describe '_checkStartValue method ->', ->
    it 'should pipe the start value', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      expect(html._checkStartValue 'x', 20).toBe 20

    it 'should fallback to 1 for opacity', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      expect(html._checkStartValue 'opacity').toBe '1'
      expect(html._checkStartValue 'opacity', .5).toBe .5

    it 'should fallback to _defaults if property is there', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })

      for key, value of html._defaults
        expect(html._checkStartValue key).toBe value
        expect(html._checkStartValue key, .5).toBe .5

    it 'should fallback to _customProps if property is there', ->
      customProperties = {
        originY: 50
      }
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10,
        customProperties: customProperties
      });

      expect(html._checkStartValue 'originY').toBe customProperties.originY

    it 'should fallback DOM defaults otherwise', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })
      
      div = document.createElement 'div'
      expect(html._checkStartValue 'borderRadius').toBe h.defaultStyles['borderRadius']
      expect(html._checkStartValue 'borderRadius', .5).toBe .5

    it 'should fallback to 0 at the end', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        })
      
      expect(html._checkStartValue 'someUnknownProperty').toBe 0
      expect(html._checkStartValue 'someUnknownProperty', .5).toBe .5


  describe 'custom properties ->', ->

    describe '_saveCustomProperties method ->', ->
      draw = (el, props) -> { el }
      customProps = {
        originX: {
          type:     'unit',
          default:  '50%'
        },
        draw: draw
      }

      it 'should save customProperties object', ->
        spyOn(Html.prototype, '_saveCustomProperties').and.callThrough()

        fun = ->
        customProps = {
          origin: 50,
          draw: fun
        }

        html = new Html({
          el: document.createElement 'div'
          borderRadius: 10,
          customProperties: customProps
        });

        expect( Html.prototype._saveCustomProperties )
          .toHaveBeenCalled()

        expect( html._customProps ).toEqual { origin: 50 }
        expect( html._customDraw ).toBe fun
        expect( html._customProps.draw ).not.toBeDefined()
        expect( html._o.customProperties ).not.toBeDefined()

      it 'should call _copyDefaultCustomProps method', ->
        html = new Html({
          el: document.createElement 'div'
          borderRadius: 10,
          customProperties: customProps
        });

        spyOn html, '_copyDefaultCustomProps'

        html._saveCustomProperties()

        expect( html._copyDefaultCustomProps ).toHaveBeenCalled()
        
  describe '_makeTimeline method ->', ->
    it 'should call super', ->

      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
      })
      html.timeline = null

      spyOn(mojs.Tweenable.prototype, '_makeTimeline').and.callThrough()
      html._makeTimeline()

      expect( mojs.Tweenable.prototype._makeTimeline )
        .toHaveBeenCalled()

    it 'should add deltas to the timeline', ->

      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
      })
      html.timeline = null

      spyOn(mojs.Timeline.prototype, 'add').and.callThrough()

      html._makeTimeline()

      expect( mojs.Timeline.prototype.add )
        .toHaveBeenCalledWith html.deltas

      expect( html.timeline._timelines[0] )
        .toBe( html.deltas.timeline )

    it 'should not call super if prevChainModule set', ->

      html0 = new Html
        el: document.createElement 'div'

      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
        prevChainModule: html0
      })
      html.timeline = null

      spyOn(mojs.Tweenable.prototype, '_makeTimeline').and.callThrough()
      html._makeTimeline()

      expect( mojs.Tweenable.prototype._makeTimeline )
        .not.toHaveBeenCalled()

    it 'should not add deltas to the timeline if chained', ->
      html0 = new Html
        el: document.createElement 'div'

      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10,
        prevChainModule: html0
      })

      spyOn(mojs.Timeline.prototype, 'add').and.callThrough()

      html._makeTimeline()

      expect( mojs.Timeline.prototype.add )
        .not.toHaveBeenCalledWith html.deltas

      expect( html.timeline ).toBe html.deltas.timeline

  describe '_addCallbackOverrides method ->', ->
    it 'should add callbackOverrides passed object', ->

      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
      })

      obj = {}
      html._addCallbackOverrides( obj )

      expect( obj.callbackOverrides.onUpdate ).toBe html._draw
      expect( obj.callbackOverrides.onRefresh ).toBe html._draw

    it 'should not add onRefresh if isRefreshState set to false', ->

      html = new Html({
        el: document.createElement 'div'
        borderRadius:   10,
        isRefreshState: false
      })

      obj = {}
      html._addCallbackOverrides( obj )

      expect( obj.callbackOverrides.onUpdate ).toBe html._draw
      expect( obj.callbackOverrides.onRefresh ).not.toBeDefined()


    describe 'onStart callback override ->', ->
      it 'should override this._o.onStart', ->
        html = new Html el: document.createElement 'div'
        obj = {}
        html._addCallbackOverrides( obj )
        expect(typeof obj.callbackOverrides.onStart).toBe 'function'
      it 'should call _show if isForward and !_isChained
          and isShowStart is false', ->
        html = new Html
          el: document.createElement 'div'
          isShowStart: false
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_show'
        obj.callbackOverrides.onStart true
        expect(html._show).toHaveBeenCalled()
      it 'should not call _show if isShowStart is true', ->
        html = new Html el: document.createElement 'div'
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_show'
        obj.callbackOverrides.onStart true
        expect(html._show).not.toHaveBeenCalled()
      it 'should not call _show if _isChained', ->
        html = new Html
          el: document.createElement 'div'
          masterModule: new Html el: document.createElement 'div'
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_show'
        obj.callbackOverrides.onStart true
        expect(html._show).not.toHaveBeenCalled()
      it 'should call _hide if not isForward and !_isChained
          and isShowStart is false', ->
        html = new Html
          el: document.createElement 'div'
          isShowStart: false
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onStart false
        expect(html._hide).toHaveBeenCalled()
      it 'should not call _hide if not isForward and !_isChained
          and isShowStart is true', ->
        html = new Html el: document.createElement 'div'
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onStart false
        expect(html._hide).not.toHaveBeenCalled()
      it 'should not call _hide if _isChained', ->
        html = new Html
          el: document.createElement 'div'
          isShowStart: false
          masterModule: new Html el: document.createElement 'div'
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onStart false
        expect(html._hide).not.toHaveBeenCalled()
      it 'should not call _hide if not isForward and isShowStart', ->
        html = new Html el: document.createElement 'div'
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onStart false
        expect(html._hide).not.toHaveBeenCalled()
      
    describe 'onComplete callback override ->', ->
      it 'should override this._o.onComplete', ->
        html = new Html el: document.createElement 'div'
        obj = {}
        html._addCallbackOverrides( obj )
        expect(typeof obj.callbackOverrides.onComplete).toBe 'function'
      it 'should call _show if !isForward and isShowEnd is false', ->
        html = new Html
          el: document.createElement 'div'
          isShowEnd: false
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_show'
        obj.callbackOverrides.onComplete false
        expect(html._show).toHaveBeenCalled()
      it 'should not call _show if !isForward and isShowEnd is true', ->
        html = new Html el: document.createElement 'div'
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_show'
        obj.callbackOverrides.onComplete false
        expect(html._show).not.toHaveBeenCalled()
      it 'should call _show if !isForward and _isChained
          and isShowEnd is false', ->
        html = new Html
          el: document.createElement 'div'
          isShowEnd: false
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_show'
        obj.callbackOverrides.onComplete false
        expect(html._show).toHaveBeenCalled()
      it 'should call _show if !isForward and !_isChained', ->
        html = new Html({ el: document.createElement('div'), isShowEnd: false})
          .then radius: 0
        el = html._modules[1]
        obj = {}
        obj2 = {}
        html._addCallbackOverrides( obj )
        el._addCallbackOverrides( obj2 )
        spyOn html, '_show'
        spyOn el, '_show'
        obj.callbackOverrides.onComplete false
        obj2.callbackOverrides.onComplete false
        expect(el._show).not.toHaveBeenCalled()
        expect(html._show).toHaveBeenCalled()
      it 'should call _hide if isForward and !isShowEnd', ->
        html = new Html
          el: document.createElement('div'),
          isShowEnd: false
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onComplete true
        expect(html._hide).toHaveBeenCalled()
      it 'should not call _hide if isForward but isShowEnd', ->
        html = new Html el: document.createElement('div')
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onComplete true
        expect(html._hide).not.toHaveBeenCalled()
      it 'should call _hide if isForward and !_isChained', ->
        html = new Html
          el: document.createElement('div'),
          isShowEnd: false
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onComplete true
        expect(html._hide).toHaveBeenCalled()
      it 'should call not _hide if isForward and _isChained', ->
        html = new Html({
          isShowEnd: false,
          el: document.createElement('div')
        }).then({ radius: 0 })
        # module = html._modules[1]
        obj = {}
        el._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onComplete true
        expect(html._hide).not.toHaveBeenCalled()
      it 'should not call _hide if isForward and _isLastInChain but isShowEnd', ->
        html = new Html el: document.createElement('div')
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onComplete true
        expect(html._hide).not.toHaveBeenCalled()
      it 'should not call _hide if isForward but !_isLastInChain and isShowEnd', ->
        html = new Html({ el: document.createElement('div') }).then radius: 0
        obj = {}
        html._addCallbackOverrides( obj )
        spyOn html, '_hide'
        obj.callbackOverrides.onComplete true
        expect(html._hide).not.toHaveBeenCalled()

  describe '_resetMergedFlags method ->', ->
    it 'should call super and add props', ->
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10
      })

      spyOn mojs.Thenable.prototype, '_resetMergedFlags'

      opts = {}
      result = html._resetMergedFlags opts

      expect( result ).toBe opts
      expect( result.props ).toBe html._props
      expect( result.customProperties ).toBe html._customProps
      expect( mojs.Thenable.prototype._resetMergedFlags )
        .toHaveBeenCalledWith opts

  describe '_copyDefaultCustomProps method ->', ->
    it 'should copy _customProps defaults to _o', ->
      customProperties = {
        originY: 1000
        originX: 500
      }
      
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10,
        customProperties: customProperties
      })

      html._o.originY = null
      html._o.originX = null

      html._copyDefaultCustomProps()

      expect( html._o.originY ).toBe customProperties.originY
      expect( html._o.originX ).toBe customProperties.originX

    it 'should not copy _customProps defaults to _o if set', ->
      customProperties = {
        originY: 1000
        originX: 500
      }
      
      html = new Html({
        el: document.createElement 'div'
        borderRadius: 10,
        originX: 200
        customProperties: customProperties
      })

      html._copyDefaultCustomProps()

      expect( html._o.originY ).toBe customProperties.originY
      expect( html._o.originX ).toBe 200

  describe '_showByTransform method', ->
    it 'should call _drawTransform method', ->
      shape = new Html
        el: document.createElement 'div'
        easing: (k)-> return 1

      spyOn shape, '_drawTransform'
      shape._showByTransform()

      expect( shape._drawTransform ).toHaveBeenCalled()






Bit   = mojs.shapesMap.getShape('bit')
ns    = 'http://www.w3.org/2000/svg'
svg   = document.createElementNS?(ns, 'svg')
bit   = new Bit ctx: svg
h     = mojs.h

describe 'Bit ->', ->
  describe 'extention ->', ->
    it 'should extend Module', ->
      bit = new Bit
      expect(bit instanceof mojs.Module).toBe true

  describe '_defaults', ->
    it 'should have defaults', ->
      bit = new Bit
      defaults = bit._defaults
      expect(defaults[ 'ns' ]).toBe 'http://www.w3.org/2000/svg'
      expect(defaults[ 'ratio' ]).toBe 1
      expect(defaults[ 'radius' ]).toBe 50
      expect(defaults[ 'radiusX' ]).toBe null
      expect(defaults[ 'radiusY' ]).toBe null
      expect(defaults[ 'stroke' ]).toBe 'hotpink'
      expect(defaults[ 'stroke-width' ]).toBe 2
      expect(defaults[ 'stroke-opacity' ]).toBe 1
      expect(defaults[ 'fill' ]).toBe 'transparent'
      expect(defaults[ 'fill-opacity' ]).toBe 1
      expect(defaults[ 'stroke-dasharray' ]).toBe ''
      expect(defaults[ 'stroke-dashoffset' ]).toBe ''
      expect(defaults[ 'stroke-linecap' ]).toBe ''
      expect(defaults[ 'width' ]).toBe 0
      expect(defaults[ 'height' ]).toBe 0

  describe '_render method ->', ->
    it 'should set `_isRendered` to `true`', ->
      bit = new Bit
      bit._isRendered = false
      bit._render()
      expect(bit._isRendered).toBe true

    it 'should call `_createSVGCanvas` method', ->
      bit = new Bit
      bit._isRendered = false
      spyOn bit, '_createSVGCanvas'
      bit._render()
      expect(bit._createSVGCanvas).toHaveBeenCalled()

    it 'should `return` if `_isRendered`', ->
      bit = new Bit
      spyOn bit, '_createSVGCanvas'
      bit._render()
      expect(bit._createSVGCanvas).not.toHaveBeenCalled()

    it 'should call `_setCanvasSize` method', ->
      bit = new Bit
      bit._isRendered = false
      spyOn bit, '_setCanvasSize'
      bit._render()
      expect(bit._setCanvasSize).toHaveBeenCalled()

    it 'should append `_canvas` to the `parent`', ->
      bit = new Bit
      bit._isRendered = false
      spyOn(bit._props.parent, 'appendChild').and.callThrough()
      bit._render()
      expect(bit._props.parent.appendChild).toHaveBeenCalledWith bit._canvas
      expect(bit._canvas.parentNode).toBe bit._props.parent

    # nope
    # it 'should call `_draw` method', ->
    #   bit = new Bit
    #   bit._isRendered = false
    #   spyOn bit, '_draw'
    #   bit._render()
    #   expect(bit._draw).toHaveBeenCalled()

  describe '_createSVGCanvas method ->', ->
    it 'should create _canvas', ->
      bit = new Bit
      bit._canvas = null
      bit._createSVGCanvas()
      expect(bit._canvas.tagName.toLowerCase()).toBe 'svg'
    it 'should create `el`', ->
      bit = new Bit
      bit.el = null
      bit._createSVGCanvas()
      expect(bit.el.tagName.toLowerCase()).toBe bit._props.tag
      expect(bit.el.parentNode).toBe bit._canvas

  describe '_setCanvasSize method ->', ->
    it 'should set size of the `_canvas`', ->
      width = 20; height = 50
      bit = new Bit width: width, height: height
      style = bit._canvas.style
      style.width = ''
      style.height = ''
      bit._setCanvasSize()
      expect( style.width ).toBe   '100%'
      expect( style.width ).toBe   '100%'
      expect( style.left ).toBe    '0px'
      expect( style.top ).toBe     '0px'
      expect( style.display ).toBe 'block'
  # old
  # describe '_render method ->', ->
  #   it 'should have _render method', ->
  #     expect(bit._render).toBeDefined()
  #   it 'should call _render method on init', ->
  #     expect(bit.isRendered).toBe(true)
  #   it 'should add self to context', ->
  #     svg     = document.createElementNS?(ns, 'svg')
  #     bit     = new Bit ctx: svg
  #     expect(svg.firstChild).toBeTruthy()
  #   it 'should run draw method', ->
  #     svg     = document.createElementNS?(ns, 'svg')
  #     bit     = new Bit ctx: svg
  #     spyOn bit, '_draw'
  #     bit._render()
  #     expect(bit._draw).toHaveBeenCalled()
  #   it 'should not run draw method if isDrawLess option passed', ->
  #     svg     = document.createElementNS?(ns, 'svg')
  #     bit     = new Bit
  #       ctx:        svg
  #       isDrawLess: true
  #     spyOn bit, '_draw'
  #     bit._render()
  #     expect(bit._draw).not.toHaveBeenCalled()

  # describe 'context ->', ->
  #   it 'context passed should be real svg node', ->
  #     b = new Bit ctx: svg, isIt: 1
  #     delete b._o.ctx
  #     expect(b._vars()).toBe true
  #     b._o.ctx = svg
  #     expect(b._vars()).not.toBeDefined()
  describe '_draw method ->', ->
    it 'should set attributes', ->
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit
        'stroke':               '#0f0'
        'stroke-width':         3
        'fill':                 '#0ff'
        'stroke-dasharray':     100
        'stroke-dashoffset':    50
        'angle':                45

      bit._draw()

      stroke          = bit.el.getAttribute 'stroke'
      strokeWidth     = bit.el.getAttribute 'stroke-width'
      fill            = bit.el.getAttribute 'fill'
      strokeArray     = bit.el.getAttribute 'stroke-dasharray'
      strokeOffset    = bit.el.getAttribute 'stroke-dashoffset'
      transform       = bit.el.getAttribute 'transform'
      expect(stroke)          .toBe   '#0f0'
      expect(strokeWidth)     .toBe   '3'
      expect(fill)            .toBe   '#0ff'
      expect(strokeArray)     .toBe   '100'
      expect(strokeOffset)    .toBe   '50'

    it 'should save its state', ->
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit
        ctx: svg
        x: 20
        y: 20
        stroke:               '#0f0'
        'stroke-width':       3
        'fill':               '#0ff'
        'fill-opacity':       '#f0f'
        'stroke-dasharray':   100
        'stroke-dashoffset':  50
        'stroke-linecap':     'round'
        'stroke-opacity':     .5
        angle:                45
      bit._draw()
      expect(bit._state['stroke'])           .toBe '#0f0'
      expect(bit._state['stroke-width'])     .toBe 3
      expect(bit._state['stroke-opacity'])   .toBe .5
      expect(bit._state['stroke-dasharray']) .toBe 100
      expect(bit._state['stroke-dashoffset']).toBe 50
      expect(bit._state['stroke-linecap'])   .toBe 'round'
      expect(bit._state['fill'])             .toBe '#0ff'
      expect(bit._state['fill-opacity'])     .toBe '#f0f'
      # expect(bit._state['transform'])        .toBe 'rotate(45, 20, 20)'

    it 'should not set attribute if property not changed ->', ->
      svg = document.createElementNS?(ns, 'svg')
      bit = new Bit ctx: svg, 'stroke-width': 3
      bit._draw()
      spyOn bit.el, 'setAttribute'
      bit._draw()
      expect(bit.el.setAttribute).not.toHaveBeenCalled()

    it 'should set attribute if property changed ->', ->
      svg = document.createElementNS?(ns, 'svg')
      bit = new Bit ctx: svg, 'stroke-width': 3
      spyOn bit.el, 'setAttribute'
      bit._setProp 'stroke-width': 4
      bit._draw()
      expect(bit.el.setAttribute).toHaveBeenCalled()

  describe 'castStrokeDash method ->', ->
    it 'should not cast pixel values', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      bit._props['stroke-dashoffset'] = { unit: 'px', value: 100 }
      bit.castStrokeDash 'stroke-dashoffset'
      expect(bit._props['stroke-dashoffset']).toBe 100
    it 'should cast % values', ->
      bit = new Bit
        # ctx:    document.createElementNS ns, 'svg'
        radius: 100
      bit._draw()
      bit._props['stroke-dashoffset'] = { unit: '%', value: 100 }
      bit.castStrokeDash 'stroke-dashoffset'
      expect(bit._props['stroke-dashoffset']).toBe bit._props.length
    
    it 'should not set 0 value >> ff issue fix', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
        
      bit._props['stroke-dasharray'] = { unit: 'px', value: 0 }
      bit.castStrokeDash 'stroke-dasharray'
      expect(bit._props['stroke-dasharray']).toBe ''

    it 'should not set 0 value >> ff issue fix #2', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
        
      bit._props['stroke-dasharray'] = [{ unit: 'px', value: 0 }]
      bit.castStrokeDash 'stroke-dasharray'
      expect(bit._props['stroke-dasharray']).toBe ''

  describe 'stroke-dash value setting ->', ->
    it 'should set the property from an array', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      bit._setProp 'stroke-dasharray', [{ value: 100, unit: 'px' }]
      bit._draw()
      expect(bit._props['stroke-dasharray']).toBe '100 '

    it 'should cast % values', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius:  100
      bit._draw()
      bit._setProp 'stroke-dasharray', [
        { value: 100, unit: 'px' }, { value: 50, unit: '%' }
      ]
      bit._draw()
      dash = (bit._props.length/100)*50
      expect(bit._props['stroke-dasharray']).toBe "100 #{dash} "

    it 'should cast % single values', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius:  100
      bit._setProp 'stroke-dasharray', { value: 25, unit: '%' }
      bit._draw()
      dash = (bit._props.length/100)*25
      expect(bit._props['stroke-dasharray']).toBe dash

  describe 'castPercent method ->', ->
    it 'should cast % values to pixels', ->
      bit = new Bit radius: 100
      bit._draw()
      pixels = bit.castPercent 50
      expect(pixels).toBe (bit._props.length/100) * 50


  describe 'setSize method ->', ->
    it 'should set width and height of the module', ->
      bit = new Bit radius: 100
      bit._setSize 200, 100

      p = bit._props
      expect( p.width ).toBe 200
      expect( p.height ).toBe 100

    it 'should call _draw method', ->
      bit = new Bit radius: 100

      spyOn bit, '_draw'
      bit._setSize 200, 100
      expect( bit._draw ).toHaveBeenCalled()












  # old
  # describe 'setAttrsIfChanged method ->', ->
  #   it 'should not set attribute if property not changed ->', ->
  #     svg = document.createElementNS?(ns, 'svg')
  #     bit = new Bit ctx: svg, 'stroke-width': 3
  #     spyOn bit.el, 'setAttribute'
  #     bit._props['stroke-width'] = 3
  #     bit.setAttrsIfChanged 'stroke-width': 3
  #     expect(bit.el.setAttribute).not.toHaveBeenCalled()

  #   it 'should set attribute if property changed ->', ->
  #     svg = document.createElementNS?(ns, 'svg')
  #     bit = new Bit ctx: svg, 'stroke-width', 3
  #     spyOn bit.el, 'setAttribute'
  #     # bit._props['stroke-width'] = 4
  #     bit.setAttrsIfChanged 'stroke-width': 4
  #     expect(bit.el.setAttribute).toHaveBeenCalled()

  #   it 'should save the current value to state if changed ->', ->
  #     svg = document.createElementNS?(ns, 'svg')
  #     bit = new Bit ctx: svg, 'stroke-width', 2
  #     # bit._props['stroke-width'] = 30
  #     bit.setAttrsIfChanged 'stroke-width': 30
  #     expect(bit._state['stroke-width']).toBe 30

  #   # old
  #   # it 'should recieve value to set ->', ->
  #   #   svg = document.createElementNS?(ns, 'svg')
  #   #   bit = new Bit ctx: svg, radius: 20
  #   #   bit.setAttrsIfChanged 'radius', 30
  #   #   expect(bit._state['radius']).toBe 30

  #   it 'should work with values hash ->', ->
  #     svg = document.createElementNS?(ns, 'svg')
  #     bit = new Bit ctx: svg, radius: 20
  #     bit.setAttrsIfChanged radius: 30, stroke: 'orange'
  #     expect(bit._state['radius']).toBe 30
  #     expect(bit._state['stroke']).toBe 'orange'
  #     # expect(bit.el.getAttribute('rx'))    .toBe 30
  #     # expect(bit.el.getAttribute('stroke')).toBe 'orange'
  
  # # old
  # # describe 'setProp method ->', ->
  # #   it 'should set properties ->', ->
  # #     bit     = new Bit
  # #       ctx:    svg
  # #       stroke: '#0f0'

  # #     bit._setProp 'stroke', '#ff0000'
  # #     expect(bit._props.stroke).toBe '#ff0000'

  # #   it 'should set multiple properties ->', ->
  # #     bit     = new Bit
  # #       ctx:    svg
  # #       stroke: '#0f0'

  # #     bit._setProp
  # #       stroke:   '#ff0000'
  # #       fill:     '#0000ff'
  # #     expect(bit._props.stroke)  .toBe '#ff0000'
  # #     expect(bit._props.fill)    .toBe '#0000ff'
  # old
  # describe 'setAttr method ->', ->
  #   it 'should have setAttr method', ->
  #     expect(bit.setAttr).toBeDefined()
  #   it 'should set attribute on element', ->
  #     bit.el = document.createElementNS?(ns, "line")
  #     bit.setAttr 'stroke', '#ff00ff'
  #     expect(bit.el.getAttribute('stroke')).toBe '#ff00ff'
  #   it 'should set multiple attributes on element', ->
  #     bit.el = document.createElementNS?(ns, "circle")
  #     bit.setAttr
  #       stroke:           '#f0f'
  #       fill:             '#0f0'
  #     expect(bit.el.getAttribute('stroke')).toBe '#f0f'
  #     expect(bit.el.getAttribute('fill')).toBe   '#0f0'
  #   # it 'should work with camelCase attribute names', ->
  #   #   bit.el = document.createElementNS?(ns, "rect")
  #   #   bit.setAttr strokeWidth: 2
  #   #   expect(bit.el.getAttribute('stroke-width')).toBe '2'
  # describe 'defaults and options', ->
  #   it 'should have defaults object', ->
  #     expect(bit._defaults).toBeDefined()
  #   it 'should have state object', ->
  #     expect(bit._state).toBeDefined()
  #   it 'should have _drawMap object', ->
  #     expect(bit._drawMap).toBeDefined()
  #     expect(bit._drawMapLength).toBeDefined()
  #   it 'should have options object', ->
  #     expect(bit._o).toBeDefined()
  #   it 'should have ratio', ->
  #     expect(bit._defaults.ratio).toBeDefined()
  #   it 'should have dafaults', ->
  #     svg     = document.createElementNS?(ns, "svg")
  #     bit     = new Bit ctx:    svg
  #     expect(bit._props.radius).toBe(50)
  #   # nope
  #   # it 'should have extendDefaults method', ->
  #   #   bit = new Bit
  #   #     ctx:    svg
  #   #     radius: 45
  #   #   expect(bit.extendDefaults).toBeDefined()
  #   #   expect(-> bit.extendDefaults()).not.toThrow()
  #   # nope
  #   # it 'should extend defaults object to properties', ->
  #   #   bit = new Bit
  #   #     ctx:            svg
  #   #     radius:         45
  #   #     'stroke-width': 5
  #   #   expect(bit._props.radius).toBe(45)
  #   #   expect(bit._props['stroke-width']).toBe(5)
  #   # nope
  #   # it 'should work with 0 values', ->
  #   #   bit = new Bit
  #   #     ctx:            svg
  #   #     radius:         45
  #   #     'stroke-width': 5
  #   #     points:         0
  #   #   expect(bit._props.points).toBe 0
  #   it 'should have namespace object', ->
  #     expect(bit._defaults.ns).toBe 'http://www.w3.org/2000/svg'
  #   it 'should have shape object', ->
  #     expect(bit._defaults.shape).toBeDefined()
  # # nope
  # # describe 'calculations', ->
  # #   it 'should calculate transform object', ->
  # #     bit = new Bit
  # #       ctx: svg
  # #       angle: 90
  # #     expect(bit._props.transform).toBe('rotate(90, 0, 0)')
  # #     expect(bit.calcTransform).toBeDefined()

  # describe 'foreign el ->', ->
  #   it 'should recieve foreign el', ->
  #     el = document.createElementNS ns, 'rect'
  #     svg.appendChild el
  #     bit = new Bit el: el
  #     expect(bit.el).toBe el

  #   it 'should set isForeign flag', ->
  #     el = document.createElementNS ns, 'rect'
  #     svg.appendChild el
  #     bit = new Bit el: el
  #     expect(bit.isForeign).toBe true

  # describe '_getLength method ->', ->
  #   it 'should calculate total length of the path', ->
  #     bit = new Bit
  #       ctx:    document.createElementNS ns, 'svg'
  #       radius: 100
  #     expect(bit._getLength()).toBe 200

  #   it 'should if el has getTotalLength method, it should use it', ->
  #     path = document.createElementNS ns, 'path'
  #     path.setAttribute 'd', 'M0,0 L100,100'
  #     bit = new Bit
  #       ctx:    document.createElementNS ns, 'svg'
  #       radius: 100
  #       el: path
  #     expect(bit._getLength()).toBe path.getTotalLength()

  #   it 'should should call getTotalLength on path only if d attr was set', ->
  #     path = document.createElementNS ns, 'path'
  #     # path.setAttribute 'd', 'M0,0 L100,100'
  #     bit = new Bit
  #       ctx:    document.createElementNS ns, 'svg'
  #       radius: 100
  #       el:     path
  #     spyOn path, 'getTotalLength'
  #     bit._getLength()
  #     expect(path.getTotalLength).not.toHaveBeenCalled()

  # describe 'length tracking ->', ->
  #   it 'should track self length', ->
  #     bit = new Bit
  #       ctx:    document.createElementNS ns, 'svg'
  #       radius: 100
  #     expect(bit._props.length).toBe 200

  #   it 'should call _getLength method', ->
  #     bit = new Bit
  #       ctx:    document.createElementNS ns, 'svg'
  #       radius: 100
  #     spyOn bit, '_getLength'
  #     bit._setProp 'radius', 200
  #     bit._draw()
  #     expect(bit._getLength).toHaveBeenCalled()

  #   # probably not needed http://jsperf.com/gettotallength-vs-3-functions
  #   # as getTotalLength is faster then 3 function calls for webkits
  #   # and longer for ff and ies, but anyways it is too fast to care about
  #   # it 'should not call _getLength method if radius didnt change', ->
  #   #   bit = new Bit
  #   #     ctx:    document.createElementNS ns, 'svg'
  #   #     radius: 100
  #   #
  #   #   bit.setAttrsIfChanged 'radius', 100
  #   #   bit._draw()
  #   #   spyOn bit, '_getLength'
  #   #   bit.setAttrsIfChanged 'radius', 100
  #   #   bit._draw()
  #   #   expect(bit._getLength).not.toHaveBeenCalled()

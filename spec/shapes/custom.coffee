Custom  = mojs.shapesMap.getShape('custom')
Bit     = mojs.shapesMap.getShape('bit')
ns      = 'http://www.w3.org/2000/svg'
# svg     = document.createElementNS?(ns, "svg")

parent = document.createElement 'div'
custom  = new Custom parent: parent

describe 'Custom ->', ->
  it 'should extend Bit', ->
    expect(custom instanceof Bit).toBe(true)

  describe 'getShape method', ->
    it 'should return an empty string', ->
      custom = new Custom parent: parent
      expect( custom.getShape() ).toEqual ''

  describe '_declareDefaults method', ->
    it 'should call super', ->
      custom = new Custom parent: parent
      spyOn Bit::, '_declareDefaults'
      custom._declareDefaults()
      expect( Bit::_declareDefaults ).toHaveBeenCalled()
    it 'should call super', ->
      custom = new Custom parent: parent
      spyOn Bit::, '_declareDefaults'
      custom._declareDefaults()
      expect( Bit::_declareDefaults ).toHaveBeenCalled()
    it 'should set tag to path', ->
      custom = new Custom parent: parent
      expect( custom._defaults.tag ).toBe 'path'
    it 'should set parent to null', ->
      custom = new Custom parent: parent
      expect( custom._defaults.parent ).toBe null

    it 'should remove strokeWidth from _drawMap', ->
      custom = new Custom parent: parent

      for item in custom._drawMap
        expect( item ).not.toBe 'stroke-width'

  describe '_render method ->', ->
    it 'should set innerHtml of parent with the string', ->

      class Shape extends Custom
        getShape: -> return '<path />'

      custom = new Shape parent: parent
      custom._isRendered = false
      custom._props.parent.innerHTML = ''

      # prevent from setting styles on canvas
      spyOn custom, '_setCanvasSize'

      custom._render()

      svg   = custom._props.parent.firstChild
      g     = svg.firstChild
      path  = g.firstChild
      expect(svg.tagName.toLowerCase()).toBe 'svg'
      expect(svg.getAttribute('id').toLowerCase()).toBe 'js-mojs-shape-canvas'
      expect(g.tagName.toLowerCase()).toBe 'g'
      expect(g.getAttribute('id').toLowerCase()).toBe 'js-mojs-shape-el'
      expect(path.tagName.toLowerCase()).toBe 'path'
      # expect(custom._props.parent.innerHTML)
      #   .toBe "<svg id=\"js-mojs-shape-canvas\" xmlns=\"http://www.w3.org/2000/svg\" xlink=\"http://www.w3.org/1999/xlink\"><g id=\"js-mojs-shape-el\"><line></line></g></svg>"

    it 'should find el', ->
      class Shape extends Custom
        getShape: -> return '<line />'

      custom = new Shape parent: parent
      custom._isRendered = false
      custom._props.parent.innerHTML = ''

      custom._render()

      expect(custom._canvas.tagName.toLowerCase()).toBe 'svg'
      expect(custom._canvas.parentNode).toBe custom._props.parent

      expect(custom.el.tagName.toLowerCase()).toBe 'g'
      expect(custom.el.parentNode).toBe custom._canvas

    it 'should call _setCanvasSize', ->
      custom = new Custom parent: parent
      spyOn custom, '_setCanvasSize'
      custom._isRendered = false
      custom._render()
      expect(custom._setCanvasSize).toHaveBeenCalled()

    it 'should call _setCanvasSize', ->
      custom = new Custom parent: parent
      spyOn custom, 'getLength'
      custom._isRendered = false
      custom._render()
      expect(custom.getLength).toHaveBeenCalled()

    it 'should set _isRendered to true', ->
      custom = new Custom parent: parent
      custom._isRendered = false
      custom._render()
      expect(custom._isRendered).toBe true

    it 'should render just once', ->
      custom = new Custom parent: parent
      custom._props.parent.innerHTML = ''
      custom._render()
      expect(custom._props.parent.innerHTML).toBe ''

    it 'should set _length', ->
      custom = new Custom parent: parent
      custom._isRendered = false
      custom._length = null
      custom._render()
      expect(custom._length).toBe custom.getLength()

  describe '_getScale method ->', ->
    it 'should calculate x scale', ->
      radiusX = 25
      custom = new Custom radiusX: radiusX, parent: parent
      custom._getScale()
      expect( custom._props.scaleX ).toBe (2*radiusX)/100

    it 'should fallback to radius value', ->
      radiusX = 25
      custom = new Custom radius: radiusX, parent: parent
      custom._getScale()
      expect( custom._props.scaleX ).toBe (2*radiusX)/100

    it 'should calculate y scale', ->
      radiusY = 25
      custom = new Custom radiusY: radiusY, parent: parent
      custom._getScale()
      expect( custom._props.scaleY ).toBe (2*radiusY)/100

    it 'should fallback to radius value', ->
      radiusY = 25
      custom = new Custom radius: radiusY, parent: parent
      custom._getScale()
      expect( custom._props.scaleY ).toBe (2*radiusY)/100

    it 'should calculate max scale #1', ->
      radiusY = 25
      custom = new Custom radiusY: radiusY, radius: 100, parent: parent
      custom._getScale()
      p = custom._props
      expect( custom._props.maxScale ).toBe Math.max( p.scaleX, p.scaleY )

    it 'should calculate max scale #2', ->
      radiusY = 125
      custom = new Custom radiusY: radiusY, radius: 100, parent: parent
      custom._getScale()
      p = custom._props
      expect( custom._props.maxScale ).toBe Math.max( p.scaleX, p.scaleY )

    it 'should calculate max scale #2', ->
      radiusX = 125
      custom = new Custom radiusX: radiusX, radius: 100, parent: parent
      custom._getScale()
      p = custom._props
      expect( custom._props.maxScale ).toBe Math.max( p.scaleX, p.scaleY )

    it 'should calculate max scale #3', ->
      radiusX = 25
      custom = new Custom radiusX: radiusX, radius: 100, parent: parent
      custom._getScale()
      p = custom._props
      expect( custom._props.maxScale ).toBe Math.max( p.scaleX, p.scaleY )

    it 'should calculate x shift', ->
      width  = 100
      height = 200
      custom = new Custom width: width, height: height, parent: parent
      custom._getScale()
      expect( custom._props.shiftX )
        .toBe width/2 - 50*custom._props.scaleX

    it 'should calculate y shift', ->
      width  = 100
      height = 200
      custom = new Custom width: width, height: height, parent: parent
      custom._getScale()
      expect( custom._props.shiftY )
        .toBe height/2 - 50*custom._props.scaleY

    it 'should return transform string', ->
      width  = 100
      height = 200
      custom = new Custom width: width, height: height, parent: parent

      p = custom._props
      expect( custom._getScale())
        .toBe "translate(#{p.shiftX}, #{p.shiftY}) scale(#{p.scaleX}, #{p.scaleY})"

  describe '_draw method ->', ->
    it 'should call super', ->
      custom = new Custom parent: parent
      spyOn Bit::, '_draw'
      custom._draw()
      expect( Bit::._draw ).toHaveBeenCalled()
    it 'should set transform on el', ->
      width  = 100
      height = 200
      custom = new Custom width: width, height: height, parent: parent
      custom.el.setAttribute 'transform', ''
      custom._draw()

      isTr1 = custom.el.getAttribute('transform') is 'translate(0, 50) scale(1, 1)'
      isTr2 = custom.el.getAttribute('transform') is 'translate(0 50) scale(1)'
      expect( isTr1 or isTr2 ).toBe true

    it 'should not set transform on el if nothing changed', ->
      width  = 100
      height = 200
      custom = new Custom width: width, height: height, parent: parent
      custom._draw()
      spyOn custom.el, 'setAttribute'
      custom._draw()
      expect( custom.el.setAttribute ).not.toHaveBeenCalled()
      expect( custom._state[ 'radiusX' ] ).toBe custom._props[ 'radiusX' ]
      expect( custom._state[ 'radiusY' ] ).toBe custom._props[ 'radiusY' ]
      expect( custom._state[ 'radius' ] ).toBe custom._props[ 'radius' ]

    it 'should set stroke-width on el', ->
      width  = 100
      height = 200
      custom = new Custom width: width, height: height, parent: parent
      custom._draw()
      expect( custom.el.getAttribute('stroke-width') )
        .toBe "#{custom._props['stroke-width']}"

  describe 'getLength method', ->
    it 'should return 100', ->
      custom = new Custom parent: parent
      expect(custom.getLength()).toBe 100

  describe '_getLength method', ->
    it 'should return _length property', ->
      custom = new Custom parent: parent
      custom._length = 200
      expect(custom._getLength()).toBe 200


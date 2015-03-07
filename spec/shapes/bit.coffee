Bit   = mojs.Bit
ns    = 'http://www.w3.org/2000/svg'
svg   = document.createElementNS?(ns, 'svg')
bit   = new Bit ctx: svg

describe 'Bit', ->
  describe 'context', ->
    it 'context passed should be real svg node', ->
      expect(-> new Bit).toThrow()
      expect(-> bit = new Bit ctx: 'a').toThrow()
      expect(-> bit = new Bit ctx: svg).not.toThrow()
  describe 'methods', ->
    it 'should have vars method', ->
      expect(bit.vars).toBeDefined()
  describe 'render method', ->
    it 'should have render method', ->
      expect(bit.render).toBeDefined()
    it 'should call render method on init', ->
      expect(bit.isRendered).toBe(true)
    it 'should add self to context', ->
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit ctx: svg
      expect(svg.firstChild).toBeTruthy()
    it 'should run draw method', ->
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit ctx: svg
      spyOn bit, 'draw'
      bit.render()
      expect(bit.draw).toHaveBeenCalled()
    it 'should not run draw method if isDrawLess option passed', ->
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit
        ctx:        svg
        isDrawLess: true
      spyOn bit, 'draw'
      bit.render()
      expect(bit.draw).not.toHaveBeenCalled()
  describe 'draw method ->', ->
    it 'should set attributes', ->
      svg     = document.createElementNS?(ns, 'svg')
      bit     = new Bit
        ctx: svg
        x: 20
        y: 20
        stroke:               '#0f0'
        'stroke-width':          3
        fill:                 '#0ff'
        'stroke-dasharray':      100
        'stroke-dashoffset':     50
        angle:                45
      stroke          = bit.el.getAttribute 'stroke'
      strokeWidth     = bit.el.getAttribute 'stroke-width'
      fill            = bit.el.getAttribute 'fill'
      strokeDasharray = bit.el.getAttribute 'stroke-dasharray'
      strokeOffset    = bit.el.getAttribute 'stroke-dashoffset'
      transform       = bit.el.getAttribute 'transform'
      isTransform     = transform is 'rotate(45, 20, 20)'
      isIE9Transform  = transform is 'rotate(45 20 20)'
      expect(stroke)          .toBe   '#0f0'
      expect(strokeWidth)     .toBe   '3'
      expect(fill)            .toBe   '#0ff'
      expect(strokeDasharray) .toBe   '100'
      expect(strokeOffset)    .toBe   '50'
      expect(isTransform or isIE9Transform).toBe true
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
      bit.draw()
      expect(bit.state['stroke'])           .toBe '#0f0'
      expect(bit.state['stroke-width'])     .toBe 3
      expect(bit.state['stroke-opacity'])   .toBe .5
      expect(bit.state['stroke-dasharray']) .toBe 100
      expect(bit.state['stroke-dashoffset']).toBe 50
      expect(bit.state['stroke-linecap'])   .toBe 'round'
      expect(bit.state['fill'])             .toBe '#0ff'
      expect(bit.state['fill-opacity'])     .toBe '#f0f'
      expect(bit.state['transform'])        .toBe 'rotate(45, 20, 20)'

    it 'should not set attribute if property not changed ->', ->
      svg = document.createElementNS?(ns, 'svg')
      bit = new Bit ctx: svg, 'stroke-width': 3
      spyOn bit.el, 'setAttribute'
      bit.draw()
      expect(bit.el.setAttribute).not.toHaveBeenCalled()

    it 'should set attribute if property changed ->', ->
      svg = document.createElementNS?(ns, 'svg')
      bit = new Bit ctx: svg, 'stroke-width': 3
      spyOn bit.el, 'setAttribute'
      bit.setProp 'stroke-width': 4
      bit.draw()
      expect(bit.el.setAttribute).toHaveBeenCalled()

  describe 'setAttrsIfChanged method ->', ->
    it 'should not set attribute if property not changed ->', ->
      svg = document.createElementNS?(ns, 'svg')
      bit = new Bit ctx: svg, 'stroke-width': 3
      spyOn bit.el, 'setAttribute'
      bit.props['stroke-width'] = 3
      bit.setAttrsIfChanged 'stroke-width'
      expect(bit.el.setAttribute).not.toHaveBeenCalled()

    it 'should set attribute if property changed ->', ->
      svg = document.createElementNS?(ns, 'svg')
      bit = new Bit ctx: svg, 'stroke-width', 3
      spyOn bit.el, 'setAttribute'
      bit.props['stroke-width'] = 4
      bit.setAttrsIfChanged 'stroke-width'
      expect(bit.el.setAttribute).toHaveBeenCalled()

    it 'should save the current value to state if changed ->', ->
      svg = document.createElementNS?(ns, 'svg')
      bit = new Bit ctx: svg, 'stroke-width', 2
      bit.props['stroke-width'] = 30
      bit.setAttrsIfChanged 'stroke-width'
      expect(bit.state['stroke-width']).toBe 30

    it 'should recieve value to set ->', ->
      svg = document.createElementNS?(ns, 'svg')
      bit = new Bit ctx: svg, radius: 20
      bit.setAttrsIfChanged 'radius', 30
      expect(bit.state['radius']).toBe 30

    it 'should work with values hash ->', ->
      svg = document.createElementNS?(ns, 'svg')
      bit = new Bit ctx: svg, radius: 20
      bit.setAttrsIfChanged radius: 30, stroke: 'orange'
      expect(bit.state['radius']).toBe 30
      expect(bit.state['stroke']).toBe 'orange'
      # expect(bit.el.getAttribute('rx'))    .toBe 30
      # expect(bit.el.getAttribute('stroke')).toBe 'orange'
      
  describe 'setProp method ->', ->
    it 'should set properties ->', ->
      bit     = new Bit
        ctx:    svg
        stroke: '#0f0'

      bit.setProp 'stroke', '#ff0000'
      expect(bit.props.stroke).toBe '#ff0000'

    it 'should set multiple properties ->', ->
      bit     = new Bit
        ctx:    svg
        stroke: '#0f0'

      bit.setProp
        stroke:   '#ff0000'
        fill:     '#0000ff'
      expect(bit.props.stroke)  .toBe '#ff0000'
      expect(bit.props.fill)    .toBe '#0000ff'
  describe 'setAttr method ->', ->
    it 'should have setAttr method', ->
      expect(bit.setAttr).toBeDefined()
    it 'should set attribute on element', ->
      bit.el = document.createElementNS?(ns, "line")
      bit.setAttr 'stroke', '#ff00ff'
      expect(bit.el.getAttribute('stroke')).toBe '#ff00ff'
    it 'should set multiple attributes on element', ->
      bit.el = document.createElementNS?(ns, "circle")
      bit.setAttr
        stroke:           '#f0f'
        fill:             '#0f0'
      expect(bit.el.getAttribute('stroke')).toBe '#f0f'
      expect(bit.el.getAttribute('fill')).toBe   '#0f0'
    # it 'should work with camelCase attribute names', ->
    #   bit.el = document.createElementNS?(ns, "rect")
    #   bit.setAttr strokeWidth: 2
    #   expect(bit.el.getAttribute('stroke-width')).toBe '2'
  describe 'defaults and options', ->
    it 'should have defaults object', ->
      expect(bit.defaults).toBeDefined()
    it 'should have state object', ->
      expect(bit.state).toBeDefined()
    it 'should have drawMap object', ->
      expect(bit.drawMap).toBeDefined()
      expect(bit.drawMapLength).toBeDefined()
    it 'should have options object', ->
      expect(bit.o).toBeDefined()
    it 'should have ratio', ->
      expect(bit.ratio).toBeDefined()
    it 'should have dafaults', ->
      svg     = document.createElementNS?(ns, "svg")
      bit     = new Bit ctx:    svg
      expect(bit.props.radius).toBe(50)
    it 'should have extendDefaults method', ->
      bit = new Bit
        ctx:    svg
        radius: 45
      expect(bit.extendDefaults).toBeDefined()
      expect(-> bit.extendDefaults()).not.toThrow()
    it 'should extend defaults object to properties', ->
      bit = new Bit
        ctx:            svg
        radius:         45
        'stroke-width': 5
      expect(bit.props.radius).toBe(45)
      expect(bit.props['stroke-width']).toBe(5)
    it 'should work with 0 values', ->
      bit = new Bit
        ctx:            svg
        radius:         45
        'stroke-width': 5
        points:         0
      expect(bit.props.points).toBe 0
    it 'should have namespace object', ->
      expect(bit.ns).toBe 'http://www.w3.org/2000/svg'
    it 'should have type object', ->
      expect(bit.type).toBeDefined()
  describe 'calculations', ->
    it 'should calculate transform object', ->
      bit = new Bit
        ctx: svg
        angle: 90
      expect(bit.props.transform).toBe('rotate(90, 0, 0)')
      expect(bit.calcTransform).toBeDefined()

  describe 'foreign el ->', ->
    it 'should recieve foreign el', ->
      el = document.createElementNS ns, 'rect'
      svg.appendChild el
      bit = new Bit el: el
      expect(bit.el).toBe el

    it 'should set isForeign flag', ->
      el = document.createElementNS ns, 'rect'
      svg.appendChild el
      bit = new Bit el: el
      expect(bit.isForeign).toBe true

  describe 'getLength method ->', ->
    it 'should calculate total length of the path', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      expect(bit.getLength()).toBe 200

    it 'should el has getTotalLength method, it should use it', ->
      path = document.createElementNS ns, 'path'
      path.setAttribute 'd', 'M0,0 L100,100'
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
        el: path
      expect(bit.getLength()).toBe path.getTotalLength()

  describe 'length tracking ->', ->
    it 'should track self length', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      expect(bit.props.length).toBe 200

    it 'should call getLength method', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      spyOn bit, 'getLength'
      bit.setProp 'radius', 200
      bit.draw()
      expect(bit.getLength).toHaveBeenCalled()

    it 'should not call getLength method if radius didnt change', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
        isIt: true
      bit.setAttrsIfChanged 'radius', 100
      bit.draw()
      spyOn bit, 'getLength'
      bit.setAttrsIfChanged 'radius', 100
      bit.draw()
      expect(bit.getLength).not.toHaveBeenCalled()


  describe 'castPercent method ->', ->
    it 'should cast % values to pixels', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      pixels = bit.castPercent 50
      expect(pixels).toBe (bit.props.length/100) * 50

  describe 'castStrokeDash method ->', ->
    it 'should not cast pixel values', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      bit.props['stroke-dashoffset'] = { unit: 'px', value: 100 }
      bit.castStrokeDash 'stroke-dashoffset'
      expect(bit.props['stroke-dashoffset']).toBe 100

    it 'should cast % values', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      bit.props['stroke-dashoffset'] = { unit: '%', value: 100 }
      bit.castStrokeDash 'stroke-dashoffset'
      expect(bit.props['stroke-dashoffset']).toBe bit.props.length

  describe 'isChanged method ->', ->
    it 'should check if attribute was changed', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        stroke: 'deeppink'
      expect(bit.isChanged('stroke')).toBe false
      bit.setProp 'stroke', 'green'
      expect(bit.isChanged('stroke')).toBe true

    it 'should recieve value to set', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 20
      expect(bit.isChanged('radius', 30)).toBe true

  describe 'stroke-dash value setting ->', ->
    it 'should set the property from an array', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius: 100
      bit.setProp 'stroke-dasharray', [{ value: 100, unit: 'px' }]
      bit.draw()
      expect(bit.props['stroke-dasharray']).toBe '100 '

    it 'should cast % values', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius:  100
      bit.setProp 'stroke-dasharray', [
        { value: 100, unit: 'px' }, { value: 50, unit: '%' }
      ]
      bit.draw()
      dash = (bit.props.length/100)*50
      expect(bit.props['stroke-dasharray']).toBe "100 #{dash} "

    it 'should cast % single values', ->
      bit = new Bit
        ctx:    document.createElementNS ns, 'svg'
        radius:  100
      bit.setProp 'stroke-dasharray', { value: 25, unit: '%' }
      bit.draw()
      dash = (bit.props.length/100)*25
      expect(bit.props['stroke-dasharray']).toBe dash




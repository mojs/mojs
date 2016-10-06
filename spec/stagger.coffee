Stagger = mojs.stagger mojs.MotionPath

describe 'stagger ->', ->

  it 'should extend Tunable', ->
    stagger = new Stagger bit: ['foo', 'bar', 'baz']
    expect( stagger instanceof mojs.Tunable ).toBe true

  describe '_getOptionByMod method ->', ->
    it 'should get an option by modulo of i', ->
      options = bit: ['foo', 'bar', 'baz'], path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getOptionByMod('bit', 0, options)).toBe 'foo'
      expect(s._getOptionByMod('bit', 1, options)).toBe 'bar'
      expect(s._getOptionByMod('bit', 2, options)).toBe 'baz'
      expect(s._getOptionByMod('bit', 3, options)).toBe 'foo'
      expect(s._getOptionByMod('bit', 7, options)).toBe 'bar'
    it 'should return option if it isnt defined by array', ->
      options = bit: 'foo', path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getOptionByMod('bit', 0, options)).toBe 'foo'
      expect(s._getOptionByMod('bit', 1, options)).toBe 'foo'
    it 'should get option if it is array like', ->
      div1 = document.createElement 'div'
      div2 = document.createElement 'div'
      divWrapper = document.createElement 'div'
      divWrapper.appendChild div1
      divWrapper.appendChild div2
      options = bit: divWrapper.childNodes, path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getOptionByMod('bit', 0, options)).toBe div1
      expect(s._getOptionByMod('bit', 1, options)).toBe div2

    it 'should get option if it is array like #HTMLCollection', ->
      div1 = document.createElement 'div'
      div2 = document.createElement 'div'
      divWrapper = document.createElement 'div'
      divWrapper.appendChild div1
      divWrapper.appendChild div2
      options = bit: divWrapper.children, path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getOptionByMod('bit', 0, options)).toBe div1
      expect(s._getOptionByMod('bit', 1, options)).toBe div2

    it 'should parse stagger options', ->
      options = bit: 'stagger(200)', path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getOptionByMod('bit', 0, options)).toBe 0
      expect(s._getOptionByMod('bit', 1, options)).toBe 200
      expect(s._getOptionByMod('bit', 2, options)).toBe 400
  
  describe '_getOptionByIndex method ->', ->
    it 'should get option by modulo of index', ->
      options =
        bax:  ['foo', 'bar', 'baz']
        qux:  200
        norf: ['norf', 300]
        path: 'M0,0 L100,100'
      s = new Stagger options
      option1 = s._getOptionByIndex 0, options
      expect(option1.bax) .toBe 'foo'
      expect(option1.qux) .toBe 200
      expect(option1.norf).toBe 'norf'

  describe '_getChildQuantity method', ->
    it 'should get quantity of child modules #array', ->
      options = el: ['body', 'body', 'body'], path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getChildQuantity 'el', options).toBe 3
    it 'should get quantity of child modules #dom list', ->
      div1 = document.createElement 'div'
      div2 = document.createElement 'div'
      divWrapper = document.createElement 'div'
      divWrapper.appendChild div1
      divWrapper.appendChild div2
      options = el: divWrapper.childNodes, path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getChildQuantity 'el', options).toBe 2
    it 'should get quantity of child modules #dom HTMLCollection', ->
      div1 = document.createElement 'div'
      div2 = document.createElement 'div'
      divWrapper = document.createElement 'div'
      divWrapper.appendChild div1
      divWrapper.appendChild div2
      options = el: divWrapper.children, path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getChildQuantity 'el', options).toBe 2
    it 'should get quantity of child modules #single value', ->
      options = el: document.createElement('div'), path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getChildQuantity 'el', options).toBe 1
    it 'should get quantity of child modules #string', ->
      options = el: 'body', path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getChildQuantity 'el', options).toBe 1
    it 'should get quantity of is number was passed', ->
      options = el: ['body', 'body', 'body'], path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getChildQuantity 2, options).toBe 2

  describe '_createTimeline method ->', ->
    it 'should create timeline', ->
      options = el: 'body', path: 'M0,0 L100,100'
      s = new Stagger options
      s._createTimeline()
      expect(s.timeline instanceof mojs.Timeline).toBe true
  describe '_init method ->', ->
    it 'should make stagger', ->
      div = document.createElement 'div'
      options = el: [div, div], path: 'M0,0 L100,100', delay: '200'
      s = new Stagger options
      s._init options, mojs.MotionPath
      expect(s.timeline._timelines.length).toBe 2
    it 'should pass isRunLess = true', ->
      div = document.createElement 'div'
      options = el: [div, div], path: 'M0,0 L100,100', delay: '200'
      s = new Stagger options
      s._init options, mojs.MotionPath
      expect(s._modules[0].o.isRunLess).toBe true
    it 'should pass index to the module', ->
      div = document.createElement 'div'
      options = el: [div, div], path: 'M0,0 L100,100', delay: '200'
      s = new Stagger options
      s._init options, mojs.Shape
      expect(s._modules[0]._o.index).toBe 0
      expect(s._modules[1]._o.index).toBe 1
    it 'should return self', ->
      div = document.createElement 'div'
      options = el: [div, div], path: 'M0,0 L100,100', delay: '200'
      s = new Stagger options
      expect(s._init options, mojs.MotionPath).toBe s

  describe 'timeline options', ->
    it 'should pass timeline options to main timeline', ->
      timeline = {}
      s = new Stagger { timeline: timeline }
      expect( s.timeline._o ).toBe timeline

  describe 'then method ->', ->
    it 'should call _getOptionByIndex for each module', ->
      StaggeredShape = mojs.stagger mojs.Shape

      s = new StaggeredShape quantifier: 5

      spyOn s, '_getOptionByIndex'

      options = { duration: 400 }
      s.then(options);
      
      expect(s._getOptionByIndex.calls.count()).toBe 5
      expect(s._getOptionByIndex).toHaveBeenCalledWith 0, options
      expect(s._getOptionByIndex).toHaveBeenCalledWith 1, options
      expect(s._getOptionByIndex).toHaveBeenCalledWith 2, options
      expect(s._getOptionByIndex).toHaveBeenCalledWith 3, options
      expect(s._getOptionByIndex).toHaveBeenCalledWith 4, options

    it 'should call _getOptionByIndex for each module', ->
      StaggeredShape = mojs.stagger mojs.Shape

      s = new StaggeredShape quantifier: 5

      spyOn s._modules[0], 'then'
      spyOn s._modules[1], 'then'
      spyOn s._modules[2], 'then'
      spyOn s._modules[3], 'then'
      spyOn s._modules[4], 'then'

      options = {
        duration: 400,
        fill: ['cyan', 'orange', 'yellow', 'blue'],
        delay: 'stagger(200)'
      }
      s.then(options);
      
      expect(s._modules[0].then)
        .toHaveBeenCalledWith s._getOptionByIndex 0, options
      expect(s._modules[1].then)
        .toHaveBeenCalledWith s._getOptionByIndex 1, options
      expect(s._modules[2].then)
        .toHaveBeenCalledWith s._getOptionByIndex 2, options
      expect(s._modules[3].then)
        .toHaveBeenCalledWith s._getOptionByIndex 3, options
      expect(s._modules[4].then)
        .toHaveBeenCalledWith s._getOptionByIndex 4, options

    it 'should not call _getOptionByIndex if no options passed', ->
      StaggeredShape = mojs.stagger mojs.Shape

      s = new StaggeredShape quantifier: 5

      spyOn s, '_getOptionByIndex'

      options = undefined
      s.then(options);
      
      expect(s._getOptionByIndex.calls.count()).toBe 0
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 0, options
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 1, options
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 2, options
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 3, options
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 4, options

    it 'should call _recalcTotalDuration on timeline', ->
      StaggeredShape = mojs.stagger mojs.Shape
      s = new StaggeredShape quantifier: 5
      spyOn s.timeline, '_recalcTotalDuration'
      expect(s.then({ delay: 200 })).toBe s
      expect(s.timeline._recalcTotalDuration).toHaveBeenCalled()

    it 'should return this', ->
      StaggeredShape = mojs.stagger mojs.Shape
      s = new StaggeredShape quantifier: 5
      expect(s.then({ delay: 200 })).toBe s

    it 'should return this if no options passed', ->
      StaggeredShape = mojs.stagger mojs.Shape
      s = new StaggeredShape quantifier: 5
      expect(s.then()).toBe s

  describe 'tune method ->', ->
    it 'should call _getOptionByIndex for each module', ->
      StaggeredShape = mojs.stagger mojs.Shape

      s = new StaggeredShape quantifier: 5

      spyOn s, '_getOptionByIndex'

      options = { duration: 400 }
      s.tune(options);
      
      expect(s._getOptionByIndex.calls.count()).toBe 5
      expect(s._getOptionByIndex).toHaveBeenCalledWith 0, options
      expect(s._getOptionByIndex).toHaveBeenCalledWith 1, options
      expect(s._getOptionByIndex).toHaveBeenCalledWith 2, options
      expect(s._getOptionByIndex).toHaveBeenCalledWith 3, options
      expect(s._getOptionByIndex).toHaveBeenCalledWith 4, options

    it 'should call _getOptionByIndex for each module', ->
      StaggeredShape = mojs.stagger mojs.Shape

      s = new StaggeredShape quantifier: 5

      spyOn s._modules[0], 'tune'
      spyOn s._modules[1], 'tune'
      spyOn s._modules[2], 'tune'
      spyOn s._modules[3], 'tune'
      spyOn s._modules[4], 'tune'

      options = {
        duration: 400,
        fill: ['cyan', 'orange', 'yellow', 'blue'],
        delay: 'stagger(200)'
      }
      s.tune(options);
      
      expect(s._modules[0].tune)
        .toHaveBeenCalledWith s._getOptionByIndex 0, options
      expect(s._modules[1].tune)
        .toHaveBeenCalledWith s._getOptionByIndex 1, options
      expect(s._modules[2].tune)
        .toHaveBeenCalledWith s._getOptionByIndex 2, options
      expect(s._modules[3].tune)
        .toHaveBeenCalledWith s._getOptionByIndex 3, options
      expect(s._modules[4].tune)
        .toHaveBeenCalledWith s._getOptionByIndex 4, options

    it 'should not call _getOptionByIndex if no options passed', ->
      StaggeredShape = mojs.stagger mojs.Shape

      s = new StaggeredShape quantifier: 5

      spyOn s, '_getOptionByIndex'

      options = undefined
      s.tune(options);
      
      expect(s._getOptionByIndex.calls.count()).toBe 0
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 0, options
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 1, options
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 2, options
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 3, options
      expect(s._getOptionByIndex).not.toHaveBeenCalledWith 4, options

    it 'should call _recalcTotalDuration on timeline', ->
      StaggeredShape = mojs.stagger mojs.Shape
      s = new StaggeredShape quantifier: 5
      spyOn s.timeline, '_recalcTotalDuration'
      expect(s.tune({ delay: 200 })).toBe s
      expect(s.timeline._recalcTotalDuration).toHaveBeenCalled()

    it 'should return this', ->
      StaggeredShape = mojs.stagger mojs.Shape
      s = new StaggeredShape quantifier: 5
      expect(s.tune({ delay: 200 })).toBe s

    it 'should return this if no options passed', ->
      StaggeredShape = mojs.stagger mojs.Shape
      s = new StaggeredShape quantifier: 5
      expect(s.tune()).toBe s


  describe 'generate method ->', ->
    it 'should call generate for each module', ->
      StaggeredShape = mojs.stagger mojs.Shape

      s = new StaggeredShape quantifier: 5

      spyOn s._modules[0], 'generate'
      spyOn s._modules[1], 'generate'
      spyOn s._modules[2], 'generate'
      spyOn s._modules[3], 'generate'
      spyOn s._modules[4], 'generate'

      s.generate()
      
      expect(s._modules[0].generate).toHaveBeenCalled()
      expect(s._modules[1].generate).toHaveBeenCalled()
      expect(s._modules[2].generate).toHaveBeenCalled()
      expect(s._modules[3].generate).toHaveBeenCalled()
      expect(s._modules[4].generate).toHaveBeenCalled()

    it 'should call _recalcTotalDuration on timeline', ->
      StaggeredShape = mojs.stagger mojs.Shape
      s = new StaggeredShape quantifier: 5
      spyOn s.timeline, '_recalcTotalDuration'
      expect(s.generate()).toBe s
      expect(s.timeline._recalcTotalDuration).toHaveBeenCalled()

    it 'should return this', ->
      StaggeredShape = mojs.stagger mojs.Shape
      s = new StaggeredShape quantifier: 5
      expect(s.generate()).toBe s

    it 'should return this if no options passed', ->
      StaggeredShape = mojs.stagger mojs.Shape
      s = new StaggeredShape quantifier: 5
      expect(s.generate()).toBe s

  
  describe 'quantifier option ->', ->
    it 'should be passed to the _getChildQuantity method', ->
      s = new Stagger
        delay:  [100, 200, 300], quantifier: 2
        el:     document.createElement 'div'
        path:   'M0,0 L100,100'
      expect(s._modules[0].o.delay).toBe 100
      expect(s._modules[1].o.delay).toBe 200
      expect(s._modules[2]).not.toBeDefined()

  describe '_makeTween and _makeTimeline methods ->', ->
    it 'should override them to empty methods', ->
      spyOn mojs.Tweenable.prototype, '_makeTween'
      spyOn mojs.Tweenable.prototype, '_makeTimeline'

      stagger = new Stagger {}

      expect( mojs.Tweenable.prototype._makeTween ).not.toHaveBeenCalled()
      expect( mojs.Tweenable.prototype._makeTimeline ).not.toHaveBeenCalled()

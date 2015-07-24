StaggerWrapper = mojs.Stagger
Stagger = StaggerWrapper mojs.MotionPath

describe 'Stagger ->', ->
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
    it 'should get quantity of child modules #single value', ->
      options = el: document.createElement('div'), path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getChildQuantity 'el', options).toBe 1
    it 'should get quantity of child modules #string', ->
      options = el: 'body', path: 'M0,0 L100,100'
      s = new Stagger options
      expect(s._getChildQuantity 'el', options).toBe 1
  describe '_createTimeline method ->', ->
    it 'should create timeline', ->
      options = el: 'body', path: 'M0,0 L100,100'
      s = new Stagger options
      s._createTimeline()
      expect(s.timeline instanceof mojs.Timeline).toBe true
  describe 'init ->', ->
    it 'should make stagger', ->
      div = document.createElement 'div'
      options = el: [div, div], path: 'M0,0 L100,100', delay: '200'
      s = new Stagger options
      s.init options, mojs.MotionPath
      expect(s.timeline.timelines.length).toBe 2
    it 'should pass isRunLess = true', ->
      div = document.createElement 'div'
      options = el: [div, div], path: 'M0,0 L100,100', delay: '200'
      s = new Stagger options
      s.init options, mojs.MotionPath
      expect(s.childModules[0].o.isRunLess).toBe true
    it 'should return self', ->
      div = document.createElement 'div'
      options = el: [div, div], path: 'M0,0 L100,100', delay: '200'
      s = new Stagger options
      expect(s.init options, mojs.MotionPath).toBe s
  describe 'run method ->', ->
    it 'should run timeline', ->
      div = document.createElement 'div'
      options = el: [div, div], path: 'M0,0 L100,100', delay: '200'
      s = new Stagger options
      s.init options, mojs.MotionPath
      spyOn s.timeline, 'start'
      s.run()
      expect(s.timeline.start).toHaveBeenCalled()

  describe 'stagger callbacks ->', ->
    it 'should pass onStaggerStart callback to timeline', ->
      fun = ->
      s = new Stagger onStaggerStart: fun
      expect(s.timeline.o.onStart).toBe fun
    it 'should pass onStaggerUpdate callback to timeline', ->
      fun = ->
      s = new Stagger onStaggerUpdate: fun
      expect(s.timeline.o.onUpdate).toBe fun
    it 'should pass onStaggerComplete callback to timeline', ->
      fun = ->
      s = new Stagger onStaggerComplete: fun
      expect(s.timeline.o.onComplete).toBe fun
    it 'should pass onStaggerReverseComplete callback to timeline', ->
      fun = ->
      s = new Stagger onStaggerReverseComplete: fun
      expect(s.timeline.o.onReverseComplete).toBe fun






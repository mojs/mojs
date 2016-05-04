MotionPath = window.mojs.MotionPath
Shape      = window.mojs.Shape
h          = window.mojs.helpers

mp = new MotionPath path: 'M0,0 L100,100', el: document.createElement 'div'
isMotionReset = mp.isMotionBlurReset

parseQadraticCurve = (d)->
  shapes = d.split /M|Q/
  m = shapes[1].split /\s|\,/
  m = m.filter (e)-> !!e
  start = x: parseFloat(m[0]), y: parseFloat(m[1])
  q = shapes[2].split /\s|\,/
  q = q.filter (e)-> !!e
  end = x: parseFloat(q[2]), y: parseFloat(q[3])
  control = x: parseFloat(q[0]), y: parseFloat(q[1])

  returnObject =
    start:    start
    end:      end
    control:  control

coords = 'M0.55859375,593.527344L0.55859375,593.527344'
describe 'MotionPath ->', ->
  ns = 'http://www.w3.org/2000/svg'
  # move to general env
  describe 'enviroment ->', ->
    it 'SVG should be supported', ->
      isSVG = !!document.createElementNS?(ns, "svg").createSVGRect
      expect(isSVG).toBeTruthy()
    it 'SVG path should have getTotalLength method', ->
      path = document.createElementNS(ns, "path")
      expect(path.getTotalLength).toBeDefined()
    it 'SVG path should have getPointAtLength method', ->
      path = document.createElementNS(ns, "path")
      expect(path.getPointAtLength).toBeDefined()
    it 'document.querySelector should be defined', ->
      expect(document.querySelector).toBeDefined()
    it 'style propety should be defined on DOM node', ->
      path = document.createElementNS(ns, "path")
      div  = document.createElement 'div'
      expect(path.style).toBeDefined()
      expect(div.style).toBeDefined()
    it 'transforms should be supported', ->
      isTransforms = ->
        trS = "transform WebkitTransform MozTransform OTransform msTransform"
        prefixes = trS.split(" ")
        i = 0
        while i < prefixes.length
          div = document.createElement("div")
          isProp = div.style[prefixes[i]] isnt 'undefined'
          return prefixes[i] if isProp
          i++
        false
      expect(isTransforms()).toBeTruthy()
    it 'HTML el should have offsetWidth/offsetHeight propety', ->
      div = document.createElement('div')
      expect(div.offsetWidth).toBeDefined()
      expect(div.offsetHeight).toBeDefined()
  describe 'defaults ->', ->
    el = document.createElement 'div'
    mp = new MotionPath
      path: 'M0.55859375,593.527344L0.55859375,593.527344'
      el: el
    it 'have angle of 0', ->
      el = document.createElement 'div'
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el: el
        isRunLess: true
        isPresetPosition: false
      expect(mp.angle).toBe 0
    it 'should have isCompositeLayer default of true', ->
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el:    document.createElement 'div'
      expect(mp.defaults.isCompositeLayer).toBe true
    it 'have speed of 0', ->
      el = document.createElement 'div'
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el: el
        isRunLess: true
        isPresetPosition: false
      expect(mp.speedX).toBe 0
      expect(mp.speedY).toBe 0
    it 'have blur of 0', ->
      el = document.createElement 'div'
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el: el
        isRunLess: true
        isPresetPosition: false
      expect(mp.blurX).toBe 0
      expect(mp.blurY).toBe 0
    it 'have blurAmount of 20', ->
      el = document.createElement 'div'
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el: el
        isRunLess: true
        isPresetPosition: false
      expect(mp.blurAmount).toBe 20
    it 'have prevCoords object', ->
      el = document.createElement 'div'
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el: el
        isRunLess: true
        isPresetPosition: false
      expect(mp.prevCoords).toBeDefined()
    it 'defaults should be defined', ->
      expect(mp.defaults.delay)           .toBe 0
      expect(mp.defaults.duration)        .toBe 1000
      expect(mp.defaults.easing)          .toBe null
      expect(mp.defaults.repeat)          .toBe 0
      expect(mp.defaults.yoyo)            .toBe false
      expect(mp.defaults.offsetX)         .toBe 0
      expect(mp.defaults.offsetY)         .toBe 0
      expect(mp.defaults.angleOffset)     .toBe null
      expect(mp.defaults.pathStart)       .toBe 0
      expect(mp.defaults.pathEnd)         .toBe 1
      expect(mp.defaults.transformOrigin) .toBe null
      
      expect(mp.defaults.motionBlur)      .toBe 0
      
      expect(mp.defaults.isAngle)         .toBe false
      expect(mp.defaults.isReverse)       .toBe false
      expect(mp.defaults.isRunLess)       .toBe false
      expect(mp.defaults.isPresetPosition).toBe true
      
      expect(mp.defaults.onStart)         .toBe null
      expect(mp.defaults.onComplete)      .toBe null
      expect(mp.defaults.onUpdate)        .toBe null
      
      expect(mp.defaults.curvature.x)     .toBe '75%'
      expect(mp.defaults.curvature.y)     .toBe '50%'

    it 'should extend defaults to props', ->
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el:   document.createElement 'div'
        duration: 2000

      expect(mp.props.duration).toBe 2000
      expect(mp.props.delay)   .toBe 0

    it 'should clamp pathStart and pathEnd further', ->
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el:   document.createElement 'div'
        duration: 2000
        pathStart: 2
        pathEnd:   2

      expect(mp.props.pathStart).toBe 1
      expect(mp.props.pathEnd)  .toBe 1

    it 'should clamp pathStart and pathEnd further', ->
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el:   document.createElement 'div'
        duration: 2000
        pathStart: -2
        pathEnd:   -2

      expect(mp.props.pathStart).toBe 0
      expect(mp.props.pathEnd)  .toBe 0

    it 'pathEnd should not be smaller then pathStart', ->
      mp = new MotionPath
        path: 'M0.55859375,593.527344L0.55859375,593.527344'
        el:   document.createElement 'div'
        duration: 2000
        pathStart: .5
        pathEnd:   -2

      expect(mp.props.pathStart).toBe .5
      expect(mp.props.pathEnd)  .toBe .5

  describe 'run method ->', ->
    div = document.createElement 'div'
    coords = 'M0.55859375,593.527344L0.55859375,593.527344'
    it 'should extend the old options', ->
      mp = new MotionPath(
        path:       coords
        el:         document.createElement 'div'
        isRunLess:  true
        pathEnd:   .75
        pathStart: .25
      )

      mp.run pathStart: .5
      expect(mp.props.pathStart).toBe .5
      expect(mp.props.pathEnd)  .toBe .75

    it 'shoud call tuneOptions if options passed', ->
      o = duration: 500
      div = document.createElement('div')
      mp = new MotionPath(
        path:       coords
        el:         div
        isRunLess:  true
      ).then pathEnd: .5
      spyOn mp, 'tuneOptions'
      mp.run o
      expect(mp.tuneOptions).toHaveBeenCalledWith o

    it 'shoud not call tuneOptions if options wasn\'t passed', ->
      mp = new MotionPath(
        path:       coords
        el:         document.createElement 'div'
        isRunLess:  true
      ).then pathEnd: .5
      spyOn mp, 'tuneOptions'
      mp.run()
      expect(mp.tuneOptions).not.toHaveBeenCalled()

    it 'shoud override the first history item', ->
      mp = new MotionPath(
        path:       coords
        el:         document.createElement 'div'
        isRunLess:  true
        pathStart: .25
        pathEnd:   .5
      ).then pathEnd: .5
      mp.run pathStart: .35
      expect(mp.history[0].pathStart).toBe .35

    it 'shoud warn if tweenValues changed on run', ->
      mp = new MotionPath(
        path:       coords
        el:         document.createElement 'div'
        isRunLess:  true
        pathStart: .25
        pathEnd:   .5
        duration:  2000
      ).then pathEnd: .5
      spyOn h, 'warn'
      mp.run
        pathStart: .35
        duration: 200
        delay:    100
        repeat:   1
        yoyo:     false
        easing:   'Linear.None'
        onStart:    ->
        onUpdate:   ->
        onComplete: ->
      expect(h.warn).toHaveBeenCalled()
      expect(mp.history[0].duration).toBe 2000
      expect(mp.props.duration)     .toBe 2000

  describe 'callbacks ->', ->
    div = document.createElement 'div'
    coords = 'M0.55859375,593.527344L0.55859375,593.527344'

    describe 'onStart callback ->', ->
      it 'should run on start', (dfr)->
        isStarted = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 200
          onStart:-> isStarted = true

        setTimeout (->
          expect(isStarted).toBe(true); dfr()
          ), 500
      it 'should have the scope of MotionPath', (dfr)->
        isRightScope = null
        mp = new MotionPath
          path: coords
          el: div
          onStart:-> isRightScope = @ instanceof MotionPath
        setTimeout (-> expect(isRightScope).toBe(true); dfr()), 500
    
    describe 'onComplete callback ->', ->
      it 'onComplete callback should work', (dfr)->
        isCompleted = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 200
          onComplete:-> isCompleted = true
        setTimeout ->
          expect(isCompleted).toBe(true); dfr()
        , 500

      it 'should have the scope of MotionPath', (dfr)->
        isRightScope = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 200
          onComplete:-> isRightScope = @ instanceof MotionPath
        setTimeout ->
          expect(isRightScope).toBe(true); dfr()
        , 500
    
    describe 'onUpdate callback ->', ->
      it 'onUpdate callback should work', (dfr)->
        isOnUpdate = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 200
          onUpdate:-> isOnUpdate = true
        setTimeout ->
          expect(isOnUpdate).toBe(true); dfr()
        , 500

      it 'onUpdate callback should have "progress" argument', (dfr)->
        isOnUpdate = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 200
          onUpdate:(progress)-> isOnUpdate = true if progress?
        setTimeout ->
          expect(isOnUpdate).toBe(true); dfr()
        , 500

      it 'should have the scope of MotionPath', (dfr)->
        isRightScope = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 200
          onUpdate:-> isRightScope = @ instanceof MotionPath
        setTimeout ->
          expect(isRightScope).toBe(true); dfr()
        , 500
      it 'should be called with progress, x, y and angle', ->
        progress = null; x = null; y = null; angle = null
        mp = new MotionPath
          path:       'M0,100 L100,0'
          el:         document.createElement 'div'
          isRunLess:  true,
          easing:     'linear.none',
          onUpdate:(p, o)->
            progress = p; x = o.x; y = o.y; angle = o.angle

        mp.timeline.setProgress .45
        mp.timeline.setProgress .5
        expect(progress.toFixed(1)).toBe '0.5'
        expect(x)       .toBeCloseTo 50, 5
        expect(y)       .toBeCloseTo 50, 5
        expect(angle)   .toBeCloseTo 0, 5

  describe 'fill ->', ->
    div = null; container = null
    beforeEach ->
      container = document.createElement 'div'
      div = document.createElement 'div'
      size = 200
      container.style.width  = "#{size}px"
      container.style.height = "#{size}px"
      container.style.position = 'absolute'
      container.style.top = '-100%'
      container.setAttribute 'id', 'js-container'
      document.body.appendChild container

    it 'container could be specified by selector or DOM node', ->
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: div
        fill: { container: '#js-container' }
      expect(mp.container instanceof HTMLElement).toBe(true)

    it 'if fill is specified it should have container, fillRule, cSize', ->
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: div
        fill: { container: container }

      expect(mp.container).toBeDefined()
      expect(mp.fillRule).toBeDefined()
      expect(mp.cSize).toBeDefined()

    it 'if fillRule is "all" it should keep container\'s size', (dfr)->
      isFilled = false
      motionPath = new MotionPath
        path: 'M0,0 L500,500'
        el: div
        duration: 200
        fill: { container: container }
        # all: true
        onComplete:->
          style = motionPath.el.style; prefixed = "#{h.prefix.css}transform"
          tr = if style[prefixed]? then style[prefixed] else style.transform
          div = document.createElement 'div'
          args = tr.split /(translate\()|\,|\)/
          width  = parseInt(args[2], 10)
          height = parseInt(args[4], 10)
          isWidth  = width  is container.offsetWidth
          isHeight = height is container.offsetHeight
          isFilled = isWidth and isHeight
          expect(isFilled).toBe(true); dfr()

    it "if fillRule is \"width\" it should keep container\'s width
    and set \"height\" with aspect ratio", (dfr)->
      isFilled = false
      mp = new MotionPath
        path: 'M0,0 L500,250'
        el: div
        duration: 200
        fill: { container: container, fillRule: 'width' }
        all: true
        onComplete:->
          style = mp.el.style; prefixed = "#{h.prefix.css}transform"
          tr = if style[prefixed]? then style[prefixed] else style.transform
          args = tr.split /(translate\()|\,|\)/
          width  = parseInt(args[2], 10)
          height = parseInt(args[4], 10)
          isWidth  = width  is container.offsetWidth
          isHeight = height is (width/2)
          isFilled = isWidth and isHeight
          expect(isFilled).toBe(true); dfr()

    it "if fillRule is \"height\" it should keep container\'s height
      and set \"width\" with aspect ratio", (dfr)->

      isFilled = false
      mp = new MotionPath
        path: 'M0,0 L250,500'
        el: div
        duration: 200
        fill: { container: container, fillRule: 'height' }
        onComplete:->
          style = mp.el.style; prefixed = "#{h.prefix.css}transform"
          tr = if style[prefixed]? then style[prefixed] else style.transform
          args = tr.split /(translate\()|\,|\)/
          width  = parseInt(args[2], 10)
          height = parseInt(args[4], 10)
          isWidth  = width  is (height/2)
          isHeight = height is container.offsetHeight
          isFilled = isWidth and isHeight
          expect(isFilled).toBe(true); dfr()

    it 'if container size was changed should recalc scaler', (dfr)->
      isSizeChange = false
      el = document.createElement 'div'
      c = document.createElement 'div'
      size = 200
      c.style.width  = "#{size}px"
      c.style.height = "#{size}px"
      c.style.position = 'absolute'
      c.style.top = '-100%'
      c.setAttribute 'id', 'js-container2'
      document.body.appendChild c
      x = -1
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: el
        duration: 200
        fill: { container: c }
        onUpdate:(proc)->
          if proc >= .1 and !isSizeChange
            mp.container.style.width = '100px'
            isSizeChange = true

      setTimeout ->
        tr = mp.el.style.transform or mp.el.style["#{h.prefix.css}transform"]
        x = tr.split /(translate\()|\,|\)/
        expect(parseInt(x[2], 10)).toBe(100); dfr()
      , 500

  describe 'functionality ->', ->
    div = document.createElement 'div'
    coords = 'M0.55859375,593.527344L0.55859375,593.527344'
    # describe 'offsets ->', ->
    it 'should work with positive offsetX', (dfr)->
      coords = 'M0,0 L0,10'
      x = 0; isEqual = false
      mp = new MotionPath
        path: coords
        el: div
        offsetX: 10
        duration: 200
        isAngle: true
      
      setTimeout (->
        tr = mp.el.style.transform or mp.el.style["#{h.prefix.css}transform"]
        x = tr.split(/(translate\()|,|\)/)[2]
        isEqual = parseInt(x, 10) is 10
        expect(isEqual).toBe(true); dfr()
      ), 500

    it 'should work with negative offsetX', (dfr)->
      coords = 'M0,0 L0,10'
      x = 0; isEqual = false
      mp = new MotionPath
        path: coords
        el: div
        offsetX: -10
        duration: 200
        onComplete: ->
          tr = mp.el.style.transform or mp.el.style["#{h.prefix.css}transform"]
          x = tr.split(/(translate\()|,|\)/)[2]
          x = parseInt(x, 10)
          isEqual = x is -10
      setTimeout (-> expect(isEqual).toBe(true); dfr()), 500

    it 'should work with positive offsetY', (dfr)->
      coords = 'M0,0 L10,0'
      y = 0; isEqual = false
      mp = new MotionPath
        path: coords
        el: div
        offsetY: 10
        duration: 200
        onComplete: ->
          tr = mp.el.style.transform or mp.el.style["#{h.prefix.css}transform"]
          y = tr.split(/(translate\()|,|\)/)[4]
          y = parseInt(y, 10)
          isEqual = y is 10
      setTimeout (-> expect(isEqual).toBe(true); dfr()), 500

    it 'should work with negative offsetY', (dfr)->
      coords = 'M0,0 L10,0'
      y = 0; isEqual = false
      mp = new MotionPath
        path: coords
        el: div
        offsetY: -10
        duration: 200
        onComplete: ->
          tr = mp.el.style.transform or mp.el.style["#{h.prefix.css}transform"]
          y = tr.split(/(translate\()|,|\)/)[4]
          isEqual = parseInt(y, 10) is -10

      setTimeout (-> expect(isEqual).toBe(true); dfr()), 500

    it 'should calculate current angle', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      angle = 0; isEqual = false; isEquial2 = false; detect = {}
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        isAngle: true
        onUpdate:->
          detect.firstAngle ?= mp.angle
          isEquial2 = detect.firstAngle is 0
        onComplete:-> isEqual = mp.angle is 90
      setTimeout (-> expect(isEqual).toBe(true); dfr()), 500

    it 'should calculate current angle if transformOrigin is a fun', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      angle = 0; isEqual = false; isEquial2 = false; detect = {}
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        transformOrigin: ->
        onUpdate:->
          detect.firstAngle ?= mp.angle
          isEquial2 = detect.firstAngle is 0
        onComplete:-> isEqual = mp.angle is 90
      setTimeout (-> expect(isEqual).toBe(true); dfr()), 500

    it 'should calculate current angle with isReverse', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      angle = 0; isEqual = false; isEquial2 = false; detect = {}
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        isAngle: true
        isReverse: true
        onUpdate:->
          detect.firstAngle ?= mp.angle
          isEquial2 = detect.firstAngle is 90
        onComplete: -> isEqual = mp.angle is 0

        setTimeout (-> expect(isEqual).toBe(true); dfr()), 500

    it 'should have transform-origin', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isComplete = false
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        transformOrigin: '50% 50%'
        onComplete: -> isComplete = true

      setTimeout ->
        s = mp.el.style
        tr = s['transform-origin'] or s["#{h.prefix.css}transform-origin"]
        expect(tr.length >= 1).toBe(true); dfr()
      , 100

    it 'transform-origin could be a function', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isAngle = false; isProgress = false
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        transformOrigin:(angle, proc)->
          isFunction = true
          isAngle = angle?; isProgress = proc?
          '50% 50%'
      setTimeout (-> expect(isAngle and isProgress).toBe(true); dfr()), 100

  describe 'angleOffset ->', ->
    div = document.createElement 'div'
    it 'angleOffset should work with positive angles', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isEqual = false
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        angleOffset: 90
        isAngle: true
        onComplete:-> isEqual = mp.angle is 180

      setTimeout (-> expect(isEqual).toBe(true); dfr()), 500

    it 'angleOffset should work with negative angles', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isEqual = false
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        angleOffset: -90
        isAngle: true
        # onComplete:->
      setTimeout (->
        isEqual = mp.angle is 0
        expect(isEqual).toBe(true); dfr()
      ), 500

    it 'should be evaluated if a function', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isFunction = false
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        angleOffset:(angle)->
          isFunction = true
          angle

      setTimeout (-> expect(isFunction).toBe(true); dfr()), 500

    it 'should get current angle', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isOnAngle = null
      angleSum1 = 0; angleSum2 = 0
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        isAngle: true
        isRunLess: true
        isPresetPosition: false
        angleOffset:(angle)->
          angleSum1 += angle; angleSum2 += @angle
          angle
        onComplete:-> isOnAngle = angleSum1 is angleSum2
      mp.run()
      setTimeout (-> expect(isOnAngle).toBe(true); dfr()), 500

    it 'should set current angle', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isSet = false
      currAngle = 0; isAnglesArray = []
      angleShift = 5
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        angleOffset:(angle)-> currAngle = angle; angle+angleShift
        onUpdate:-> isAnglesArray.push currAngle+angleShift is mp.angle
        onComplete:->
          for isSetItem, i in isAnglesArray
            if !isSetItem then isSet = true
      
      setTimeout (-> expect(isSet).toBe(false); dfr()), 500

    it 'angleOffset should get current progress as second parameter', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isProgress = false; proc = -1
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        angleOffset:(angle, progress)-> proc = progress; angle
        onComplete:-> isProgress = proc is 1
      setTimeout (-> expect(isProgress).toBe(true); dfr()), 500

    it 'should have scope of motion path', ->
      coords = 'M0,0 L10,0 L10,10'
      isRightScope = false
      angleSum1 = 0; angleSum2 = 0
      mp = new MotionPath
        path: coords
        el: div
        duration: 200
        isAngle: true
        angleOffset:-> isRightScope = @ instanceof MotionPath

      setTimeout ->
        expect(isRightScope).toBe(true)
      , 500

  describe 'setProgress method ->', (dfr)->
    it 'should have own function for setting up current progress', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: div
        isRunLess: true
      mp.setProgress(.5)
      tr = mp.el.style.transform or mp.el.style["#{h.prefix.css}transform"]
      pos = parseInt tr.split(/(translate\()|\,|\)/)[2], 10
      expect(pos).toBe(250)
    it 'should call the onUpdate callback', ->
      div = document.createElement 'div'
      progress = null
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: div
        isRunLess: true
        onUpdate:(p)-> progress = p
      # spyOn mp, 'onUpdate'
      mp.setProgress(.5)
      expect(progress).toBe .5
    it 'should not call the onUpdate callback on start', ->
      isCalled = false
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: document.createElement 'div'
        isRunLess: true
        onUpdate:-> isCalled = true
      expect(isCalled).toBe false
    it 'should set transform if it was returned from the onUpdate', ->
      transform = 'translate(20px, 50px)'
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: document.createElement 'div'
        isRunLess: true
        onUpdate:-> transform
      mp.setProgress .5
      style = mp.el.style; prefixed = "#{h.prefix.css}transform"
      tr = if style[prefixed]? then style[prefixed] else style.transform
      expect(tr).toBe transform
    it 'should not set transform if something other then string
        was returned from onUpdate callback', ->
      transform = 'translate(20px, 50px)'
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: document.createElement 'div'
        isRunLess: true
        onUpdate:-> null
      mp.setProgress .5
      expect(mp.el.style.transform).not.toBe null

  describe 'preset position ->', ->
    it 'should preset initial position by default', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: 'M50,0 L500,0'
        el:   div
      tr = mp.el.style.transform or mp.el.style["#{h.prefix.css}transform"]
      pos = parseInt tr.split(/(translate\()|\,|\)/)[2], 10
      expect(pos).toBe(50)

    it 'should not set initial position if isPresetPosition is false', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: 'M50,0 L500,0'
        el: div
        isRunLess: true
        isPresetPosition: false
      expect(div.style.transform).toBeFalsy()

  describe 'progress bounds ->', ->
    it 'should calc the @slicedLen and @startLen properties', ->
      mp = new MotionPath
        path:       'M0,0 L500,0'
        el:         document.createElement 'div'
        isRunLess:  true
        pathStart: .5
        pathEnd:   .75
      expect(mp.slicedLen).toBe 125
      expect(mp.startLen) .toBe 250

    it 'should start from pathStart position', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: div
        isRunLess: true
        pathStart: .5
        pathEnd:   .75

      mp.timeline.setProgress 0
      tr = mp.el.style.transform or mp.el.style["#{h.prefix.css}transform"]
      pos = parseInt tr.split(/(translate\()|\,|\)/)[2], 10
      expect(pos).toBe(250)

    it 'should end at pathEnd position', (dfr)->
      div = document.createElement 'div'
      pos = -1
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: div
        duration: 200
        pathStart:  .25
        pathEnd:    .5
        onComplete:->
          tr = mp.el.style.transform or mp.el.style["#{h.prefix.css}transform"]
          pos = tr.split(/(translate\()|\,|\)/)[2]
          pos = parseInt pos, 10
    
      setTimeout (-> expect(pos).toBe(250); dfr()), 500

  describe 'path option ->', ->
    it 'should error if path has no d attribute', ->
      path = document.createElementNS ns, 'path'
      # path.setAttribute 'd', 'M0,0 L500,500 L1000, 0'
      div = document.createElement 'div'
      spyOn h, 'error'
      mp = new MotionPath
        path: path
        el: div
      expect(h.error).toHaveBeenCalled()

  describe 'isCompositeLayer option ->', ->
    it 'should be true by default', ->
      mp = new MotionPath
        path:   document.createElementNS ns, 'path'
        el:     document.createElement 'div'
      expect(mp.props.isCompositeLayer).toBe true
    it 'should be able to be set to false', ->
      mp = new MotionPath
        path:   document.createElementNS ns, 'path'
        el:     document.createElement 'div'
        isCompositeLayer: false
      expect(mp.props.isCompositeLayer).toBe false
    it 'should set translateZ(0) if isCompositeLayer is set to true
        and h.is3d', ()->
      mp = new MotionPath
        path:       'M0,0 L100,100'
        el:         document.createElement 'div'
        isRunLess:  true
      mp.setProgress(.5)
      style = mp.el.style; prefixed = "#{h.prefix.css}transform"
      tr = if style[prefixed]? then style[prefixed] else style.transform
      expect(tr.match(/translateZ/gi) or !h.is3d).toBeTruthy()

    it 'should not set translateZ(0) is isCompositeLayer is set to false', ()->
      mp = new MotionPath
        path:             'M0,0 L100,100'
        el:               document.createElement 'div'
        isRunLess:        true
        isCompositeLayer: false
      mp.setProgress(.5)
      tr = mp.el.style.transform or mp.el.style["#{mojs.h.prefix.css}transform"]
      expect(tr.match /translateZ/gi).toBeFalsy()

  describe 'getPath method ->', ->
    it 'should have a getPath method', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: coords
        el: div
      expect(mp.getPath).toBeDefined()

    it 'getPath should return a path when was specified by coordinates', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: coords
        el: div
      expect(mp.getPath() instanceof SVGElement).toBe(true)

    it 'getPath should return a path when it was specified by SVG path', ->
      path = document.createElementNS ns, 'path'
      path.setAttribute 'd', 'M0,0 L500,500 L1000, 0'
      div = document.createElement 'div'
      mp = new MotionPath
        path: path
        el: div
      expect(mp.getPath() instanceof SVGElement).toBe(true)

    it 'getPath should return a path when it was specified by a selector', ->
      id = 'js-path'
      div = document.createElement 'div'
      svg = document.createElementNS ns, 'svg'
      path = document.createElementNS ns, 'path'
      path.setAttribute 'id', id
      path.setAttribute 'class', id
      svg.appendChild path
      document.body.appendChild svg
      mp = new MotionPath
        path: "##{id}"
        el: div
      expect(mp.getPath() instanceof SVGElement).toBe(true)

      mp = new MotionPath
        path: ".#{id}"
        el: div
      expect(mp.getPath() instanceof SVGElement).toBe(true)

    it 'getPath should return a path when it was specified by coords', ->
      mp = new MotionPath
        path:     x: -100,  y: 100
        curvature: x: '50%', y: '25%'
        el:     document.createElement 'div'

      d = mp.path.getAttribute 'd'
      expect(mp.getPath() instanceof SVGElement).toBe(true)

      points = parseQadraticCurve d
      expect(points.start.x).toBe 0
      expect(points.start.y).toBe 0
      expect(points.end.x).toBe -100
      expect(points.end.y).toBe 100
      expect(points.control.x).toBeCloseTo -75
      expect(points.control.y).toBeCloseTo  25

    it 'fallback to defaults if only 1 curvature coord set', ->
      mp = new MotionPath
        path:     x: -100,  y: 100
        curvature: x: '50%'
        el:     document.createElement 'div'

      d = mp.path.getAttribute 'd'
      expect(mp.getPath() instanceof SVGElement).toBe(true)

      points = parseQadraticCurve d
      expect(points.start.x).toBe 0
      expect(points.start.y).toBe 0
      expect(points.end.x).toBe -100
      expect(points.end.y).toBe 100
      expect(points.control.x).toBeCloseTo -100
      expect(points.control.y).toBeCloseTo  0

    it 'should fallback to defaults if only 1 curve coord set #2', ->
      mp = new MotionPath
        path:     x: -100,  y: 100
        curvature: y: '50%'
        el:     document.createElement 'div'

      d = mp.path.getAttribute 'd'
      expect(mp.getPath() instanceof SVGElement).toBe(true)

      points = parseQadraticCurve d
      expect(points.start.x).toBe 0
      expect(points.start.y).toBe 0
      expect(points.end.x).toBe -100
      expect(points.end.y).toBe 100
      expect(points.control.x).toBeCloseTo -125
      expect(points.control.y).toBeCloseTo  25

    it 'should fallback to 0 if only 1 path coord set', ->
      mp = new MotionPath
        path:     x: -100
        curvature: y: '50%'
        el:     document.createElement 'div'

      d = mp.path.getAttribute 'd'
      expect(mp.getPath() instanceof SVGElement).toBe(true)

      points = parseQadraticCurve d
      expect(points.start.x).toBe 0
      expect(points.start.y).toBe 0
      expect(points.end.x).toBe -100
      expect(points.end.y).toBe 0
      expect(points.control.x).toBeCloseTo  -75
      expect(points.control.y).toBeCloseTo  -50

    it 'should fallback to 0 if only 1 path coord set #2', ->
      mp = new MotionPath
        path:      {y: -100}
        curvature: {y: '50%'}
        el:     document.createElement 'div'

      d = mp.path.getAttribute 'd'
      expect(mp.getPath() instanceof SVGElement).toBe(true)

      points = parseQadraticCurve d
      expect(points.start.x).toBe 0
      expect(points.start.y).toBe 0
      expect(points.end.x).toBe 0
      expect(points.end.y).toBe -100
      expect(points.control.x).toBeCloseTo  50
      expect(points.control.y).toBeCloseTo -75

  describe 'curveToPath method', ->
    it 'should return a path',->
      mp = new MotionPath
        path: "M100, 299"
        el: document.createElement 'div'
      path = mp.curveToPath
        start:     x: 0, y: 0
        shift:     x:100, y:-200
        curvature: x: 20, y: 20
      expect(path instanceof SVGElement).toBe true

    it 'should calculate end coordinates relative to start ones',->
      mp = new MotionPath
        path: "M100, 299"
        el: document.createElement 'div'
      path = mp.curveToPath
        start:     x: 200, y: 200
        shift:     x: 100, y:-200
        curvature: x: 223, y: 200

      d = path.getAttribute 'd'
      points = parseQadraticCurve d
      expect(points.start.x).toBe 200
      expect(points.start.y).toBe 200
      expect(points.end.x).toBe 300
      expect(points.end.y).toBe 0
      expect(points.control.x).toBeCloseTo 478.61
      expect(points.control.y).toBeCloseTo 89.985

    it 'should calculate curvature based on curve direction',->
      mp = new MotionPath
        path: "M100, 299"
        el: document.createElement 'div'
      path = mp.curveToPath
        start:     x: 200,  y: 200
        shift:     x: -100,  y: 100
        curvature: x: 141,  y: 50
      d = path.getAttribute 'd'

      points = parseQadraticCurve d
      expect(points.start.x).toBe 200
      expect(points.start.y).toBe 200
      expect(points.end.x).toBe 100
      expect(points.end.y).toBe 300
      expect(points.control.x).toBeCloseTo 64.94
      expect(points.control.y).toBeCloseTo 264.346

    it 'should calculate percent curvature',->
      mp = new MotionPath path: "M100, 299", el: document.createElement 'div'
      path = mp.curveToPath
        start:     x: 200,   y: 200
        shift:     x: -100,  y: 100
        curvature: x: '50%', y: '25%'
      
      d = path.getAttribute 'd'
      points = parseQadraticCurve d

      expect(points.start.x).toBe 200
      expect(points.start.y).toBe 200
      expect(points.end.x).toBe 100
      expect(points.end.y).toBe 300
      expect(points.control.x).toBeCloseTo 125
      expect(points.control.y).toBeCloseTo 225

  describe 'el option (parseEl method) ->', ->
    it 'should return an el when it was specified by selector', ->
      id = 'js-el'
      div = document.createElement 'div'
      div.setAttribute 'id', id
      div.setAttribute 'class', id
      document.body.appendChild div
      mp = new MotionPath
        path: coords
        el: "##{id}"
      expect(mp.el instanceof HTMLElement).toBe(true)
      mp = new MotionPath
        path: coords
        el: ".#{id}"
      expect(mp.el instanceof HTMLElement).toBe(true)

    it 'should return the el when the element was passed', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: coords
        el: div
      expect(mp.el instanceof HTMLElement).toBe(true)

    it 'should return the module when module was passed', ->
      tr = new Shape
      mp = new MotionPath
        path: coords
        el:   tr
        isRunLess: true
        isPresetPosition: false
      expect(mp.el).toBe tr

    it 'should nicely error to console if el wasn\'t specified', ->
      spyOn h, 'error'
      mp = new MotionPath
        path: coords
        isRunLess: true
        isPresetPosition: false
      expect(h.error).toHaveBeenCalled()

  describe 'then method ->', ->
    it 'should contribute to history on init', ->
      options =
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
      mp = new MotionPath options
      expect(mp.history.length).toBe(1)
      expect(mp.history[0].duration).toBe 2000

    it 'should contribute to history on then', ->
      mp = new MotionPath(
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
        pathEnd:  .5
      
      ).then pathStart: .5, pathEnd: 1

      expect(mp.history.length)       .toBe   2
      expect(mp.history[1].pathStart) .toBe   .5
      expect(mp.history[1].pathEnd)   .toBe   1

    it 'should copy duration from previous record', ->
      mp = new MotionPath(
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
        pathEnd:  .5
        delay:    100
      ).then pathStart: .5, pathEnd: 1
      expect(mp.history[1].delay)   .toBe   undefined
      expect(mp.history[1].duration).toBe   2000

    it 'should save previous options to the current history record #2', ->
      mp = new MotionPath(
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
        pathEnd:  .5
        delay:    100
      )
      .then pathStart: .5, pathEnd: 1
      expect(mp.timeline._timelines[1]._props.shiftTime).toBe 2100

    it 'should not copy previous callbacks', ->
      onUpdate = ->
      mp = new MotionPath(
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
        pathEnd:  .5
        delay:    100
        onUpdate: onUpdate
      ).then pathStart: .5, pathEnd: 1, delay: 0
      
      mp.timeline.setProgress .74
      mp.timeline.setProgress .75
      
      expect(mp.history[1].onUpdate).not.toBeDefined()
      expect(mp.props.onUpdate)     .not.toBeDefined()

    it 'should add new callbacks if specified', ->
      onUpdate = ->
      mp = new MotionPath(
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
        pathEnd:  .5
        delay:    100
        onUpdate: onUpdate
      ).then pathStart: .5, pathEnd: 1, delay: 0, onUpdate: ->
      mp.timeline.setProgress .75
      expect(mp.history[1].onUpdate).toBeDefined()
      expect(mp.props.onUpdate)     .toBeDefined()

    it 'should add new timeline', ->
      mp = new MotionPath(
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
        pathEnd:  .5
        onUpdate: ->
      ).then pathStart: .5, pathEnd: 1
      expect(mp.timeline._timelines.length)            .toBe 2
      expect(mp.timeline._timelines[1]._o.duration)     .toBe 2000
      expect(mp.timeline._timelines[1]._o.onFirstUpdate).toBeDefined()

    it 'should add isChained option to the new timeline', ->
      mp = new MotionPath(
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
        pathEnd:  .5
        onUpdate: ->
      ).then pathStart: .5, pathEnd: 1
      
      expect(mp.timeline._timelines[1]._o.isChained).toBe true

    it 'should not add isChained option if delay', ->
      mp = new MotionPath(
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
        pathEnd:  .5
        onUpdate: ->
      ).then pathStart: .5, pathEnd: 1, delay: 100
      
      expect(mp.timeline._timelines[1]._o.isChained).toBe false

  describe 'tuneOptions ->', ->
    it 'should tune options', ->
      mp = new MotionPath(
        path:     coords
        el:       document.createElement 'div'
        duration: 2000
        pathEnd:  .5
      )

      mp.tuneOptions duration: 5000

      expect(mp.props.duration).toBe 5000
      expect(mp.props.pathEnd) .toBe .5

    it 'should recalc el, path, len, fill, container if defined', ->
      mp = new MotionPath(
        path:       coords
        el:         document.createElement 'div'
        duration:   2000
        pathEnd:    .5
        isRunLess:  true
      )
      coords = 'M0,0 L 105,105'
      coordsIE = 'M 0 0 L 105 105'
      mp.tuneOptions duration: 5000, path: coords
      pathCoords = mp.path.getAttribute('d')
      expect(pathCoords is coords or pathCoords is coordsIE).toBe true

  describe 'createTween method', ->
    it 'should bind the onFirstUpdate metod', ->
      mp = new MotionPath
        path:       coords
        el:         document.createElement 'div'
      type = typeof mp.timeline._timelines[0]._o.onFirstUpdate
      expect(type).toBe 'function'

  describe 'isModule flag ->', ->
    it 'should be set if module was passed', ->
      mp = new MotionPath
        path:       coords
        el:         (new Shape isRunLess: true)
        isRunLess: true
        isPresetPosition: false
      expect(mp.isModule).toBe true

  describe 'setModulePosition method ->', ->
    it 'should use setProp of the module to set position', ->
      module = (new Shape isRunLess: true)
      mp = new MotionPath
        path:       coords
        el:         module
        isRunLess:  true
        isPresetPosition: false
      spyOn module, '_setProp'
      mp.angle = 0
      mp.setModulePosition 100, 200
      expect(module._setProp).toHaveBeenCalledWith
        shiftX: '100px', shiftY: '200px', angle: 0

    it 'should call module.draw method', ->
      module = (new Shape isRunLess: true)
      mp = new MotionPath
        path:       coords
        el:         module
        isRunLess:  true
        isPresetPosition: false
      spyOn mp.el, '_draw'
      mp.setProgress 0, true
      expect(mp.el._draw).toHaveBeenCalled()

    it 'should be called if isModule', ->
      module = (new Shape isRunLess: true)
      mp = new MotionPath
        path:       coords
        el:         module
        isRunLess:  true
        isPresetPosition: false
      spyOn mp, 'setModulePosition'
      mp.setProgress 0, true
      expect(mp.setModulePosition).toHaveBeenCalled()

    it 'should not be called if !isModule', ->
      mp = new MotionPath
        path:       coords
        el:         document.createElement 'div'
        isRunLess:  true
        isPresetPosition: false
      spyOn mp, 'setModulePosition'
      mp.setProgress 0, true
      expect(mp.setModulePosition).not.toHaveBeenCalled()

  describe 'addEvent method ->', ->
    it 'should add event listener', ->
      mp = new MotionPath
        path:       coords
        el:         document.createElement 'div'

      isHandler = false
      div = document.createElement('div')
      handler = -> isHandler = true
      spyOn div, 'addEventListener'
      mp.addEvent div, 'click', handler
      expect(div.addEventListener)
        .toHaveBeenCalledWith 'click', handler, false

  describe 'extendDefaults method ->', ->
    it 'should copy options to self', ->
      path = 'M10,10 L100,100'; div = document.createElement 'div'
      mp = new MotionPath
        path:      path
        el:        div
        isRunLess: true
      mp.extendDefaults path: path, el:   div
      expect(mp.path).toBe path
      expect(mp.el)  .toBe  div
    it 'should not copy prototypes', ->
      path = 'M10,10 L100,100'; div = document.createElement 'div'
      class Options
        prop: 'some value'
      options = new Options
      options.path = 'M10,10 L100,100'
      options.el   = div
      mp = new MotionPath
        path:      path
        el:        div
        isRunLess: true
      mp.extendDefaults options
      expect(mp.path) .toBe      options.path
      expect(mp.el)   .toBe      options.el
      expect(mp.props).not.toBe  options.props

  describe 'calcWidth method', ->
    it 'should calc scaler.x based on passed size',->
      mp = new MotionPath
        path:       coords
        el:         document.createElement 'div'
        isRunLess:  true

      size = width: 200; mp.cSize = width: 200; mp.scaler = {}
      mp.calcWidth(size)
      expect(mp.scaler.x).toBe mp.cSize.width/size.width

    it 'if result scaler.x is not finite, then should be set to 1',->
      mp = new MotionPath
        path:       coords
        el:         document.createElement 'div'
        isRunLess:  true

      size = width: 0; mp.cSize = width: 200; mp.scaler = {}
      mp.calcWidth(size)
      expect(mp.scaler.x).toBe 1

  describe 'calcHeight method', ->
    it 'should calc scaler.y based on passed size',->
      mp = new MotionPath
        path:       coords
        el:         document.createElement 'div'
        isRunLess:  true

      size = height: 200; mp.cSize = height: 200; mp.scaler = {}
      mp.calcHeight(size)
      expect(mp.scaler.y).toBe mp.cSize.height/size.height

    it 'if result scaler.x is not finite, then should be set to 1',->
      mp = new MotionPath
        path:       coords
        el:         document.createElement 'div'
        isRunLess:  true

      size = height: 0; mp.cSize = height: 200; mp.scaler = {}
      mp.calcHeight(size)
      expect(mp.scaler.y).toBe 1

  describe 'createFilter method ->', ->
    path = "M0,20 L100,150 L200,100"
    it 'should get svg id', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      if !isMotionReset
        expect(mp.filterID).toBeDefined()

    it 'should add svg element to body', ->
      spyOn h, 'getUniqID'
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      if !isMotionReset
        expect(document.querySelector("##{mp.filterID}")).toBeTruthy()
        expect(document.querySelector("##{mp.filterID}").tagName).toBe 'filter'
        expect(h.getUniqID).toHaveBeenCalled()

    it 'should add hidden svg element', ->
      spyOn h, 'getUniqID'
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      if !isMotionReset
        el = document.querySelector("##{mp.filterID}")
        expect(el.parentNode.style.visibility).toBe   'hidden'
        expect(el.parentNode.style.width)     .toBe   '0px'
        expect(el.parentNode.style.height)    .toBe   '0px'

    it 'should add filter', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      if !isMotionReset
        expect(mp.filter.tagName).toBe 'feGaussianBlur'
        expect(mp.filterOffset.tagName).toBe 'feOffset'

    it 'should apply blur on element', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: .5
      mp.setProgress(.1)
      if !isMotionReset
        style = mp.el.style.filter
        prefixedStyle = mp.el.style[h.prefix.css+'filter']
        expect((style or prefixedStyle).replace /\"/gim, '')
          .toBe "url(##{mp.filterID})"

  describe 'motionBlur at the end ->', ->
    path = "M0,20 L100,150 L200,100"
    it 'should set motion blur and offset to 0 at the end', (dfr)->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        # isRunLess:  true
        motionBlur: 1
        duration: 200
      # mp.setProgress .5
      # spyOn mp, 'setBlur'
      # mp.setProgress 1
      # expect(mp.setBlur).toHaveBeenCalledWith
      #   blur:   x: 0, y:0
      #   offset: x: 0, y:0
      setTimeout ->
        return dfr() if isMotionReset
        expect(mp.filter.getAttribute('stdDeviation')).toBe '0,0'
        expect(mp.filterOffset.getAttribute('dx')).toBe '0'
        expect(mp.filterOffset.getAttribute('dy')).toBe '0'
        dfr()
      , 500

  describe 'motionBlur reset ->', ->
    path = "M0,20 L100,150 L200,100"
    it 'should reset motionBlur to 0 if in Safari or IE', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: .5
      if isMotionReset
        expect(mp.props.motionBlur is 0).toBe true
      else
        expect(mp.props.motionBlur is .5).toBe true

  describe 'motionBlur, makeMotionBlur method ->', ->
    return if isMotionReset
    path = "M0,20 L100,150 L200,100"
    it 'should be called if motionBlur passed', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: .5
      spyOn mp, 'makeMotionBlur'
      mp.setProgress(.1)
      expect(mp.makeMotionBlur).toHaveBeenCalled()
    
    it 'should not be called if motionBlur was not passed', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
      spyOn mp, 'makeMotionBlur'
      mp.setProgress(.1)
      expect(mp.makeMotionBlur).not.toHaveBeenCalled()

    it 'save previous coordinates if motionBlur is defined', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: .5
      mp.setProgress(.1)
      expect(mp.prevCoords.x).toBeCloseTo 16.81, 1
      expect(mp.prevCoords.y).toBeCloseTo 41.86, 1
    it 'calculate speed and blur based on prevCoords', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1
      mp.setProgress(.1)
      mp.setProgress(.11)
      expect(mp.speedX).toBeCloseTo 1.68, 1
      expect(mp.speedY).toBeCloseTo 2.18, 1
      expect(mp.blurX).toBeCloseTo .1051, 5
      expect(mp.blurY).toBeCloseTo .1366, 4
    it 'should set speed to 0 if prevCoords are undefined yet', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1
        isPresetPosition: false
      mp.setProgress(.1)
      expect(mp.speedX).toBe 0
      expect(mp.speedY).toBe 0
    it 'should have blur in range of [0,1]', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1
        isPresetPosition: false
      mp.setProgress(.1)
      mp.setProgress(.9)
      expect(mp.blurX).toBe 1
      expect(mp.blurY).toBe 1
    it 'motionBlur should be in a range of [0,1]', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: -.5
      expect(mp.props.motionBlur).toBe 0
    it 'motionBlur should be in a range of [0,1] #2', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      expect(mp.props.motionBlur).toBe 1
    it 'motionBlur should be in a range of [0,1] #2', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      expect(mp.props.motionBlur).toBe 1
    it 'should set blur to filter', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      mp.setProgress .1
      mp.setProgress .5
      attrs = mp.filter.getAttribute('stdDeviation').split ','
      expect(parseInt(attrs[0],10)).toBeCloseTo 52
      expect(parseInt(attrs[1],10)).toBeCloseTo 60

    it 'should set blur to filterOffset', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      mp.setProgress .1
      mp.setProgress .5
      dx = mp.filterOffset.getAttribute('dx')
      dy = mp.filterOffset.getAttribute('dy')
      expect(parseInt(dx,10)).toBeCloseTo -52
      expect(parseInt(dy,10)).toBeCloseTo -60

  describe 'angToCoords method ->', ->
    path = "M0,20 L100,150 L200,100"
    degree45 = 1
    it 'should translate angle to coordinates *y*', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      expect(mp.angToCoords(0).y)   .toBeCloseTo -1
      expect(mp.angToCoords(45).y)  .toBeCloseTo -degree45, 1
      expect(mp.angToCoords(90).y)  .toBe         0
      expect(mp.angToCoords(135).y) .toBeCloseTo  degree45, 1
      expect(mp.angToCoords(180).y) .toBeCloseTo  1
      expect(mp.angToCoords(225).y) .toBeCloseTo  degree45, 1
      expect(mp.angToCoords(270).y) .toBeCloseTo  0, 1
      expect(mp.angToCoords(315).y) .toBeCloseTo -degree45, 1
      expect(mp.angToCoords(-45).y) .toBeCloseTo -degree45, 1
      expect(mp.angToCoords(360).y) .toBeCloseTo -1
    it 'should translate angle to coordinates *x*', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1.5
      expect(mp.angToCoords(0).x)   .toBeCloseTo  0, 1
      expect(mp.angToCoords(45).x)  .toBeCloseTo  degree45, 1
      expect(mp.angToCoords(90).x)  .toBeCloseTo  1, 1
      expect(mp.angToCoords(135).x) .toBeCloseTo  degree45, 1
      expect(mp.angToCoords(180).x) .toBeCloseTo  0, 1
      expect(mp.angToCoords(225).x) .toBeCloseTo -degree45, 1
      expect(mp.angToCoords(270).x) .toBeCloseTo -1, 1
      expect(mp.angToCoords(315).x) .toBeCloseTo -degree45, 1
      expect(mp.angToCoords(-45).x) .toBeCloseTo -degree45, 1
      expect(mp.angToCoords(360).x) .toBeCloseTo  0, 1
  
  describe 'setBlur method ->',->
    return if isMotionReset
    path = "M0,20 L100,150 L200,100"
    it 'should set blur and blurOffset to filter', ->
      mp = new MotionPath
        path:       path
        el:         document.createElement 'div'
        isRunLess:  true
        motionBlur: 1
      mp.setBlur
        blur:   x: 5, y: 10
        offset: x: 6, y: 9
      expect(mp.filter.getAttribute('stdDeviation')).toBe '5,10'
      expect(mp.filterOffset.getAttribute('dx')).toBe '6'
      expect(mp.filterOffset.getAttribute('dy')).toBe '9'

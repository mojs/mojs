MotionPath = window.mojs.MotionPath

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
    it 'delay should be defined', ->
      expect(mp.delay).toBeDefined()
    it 'resize should be defined', ->
      expect(mp.resize).toBeDefined()
    it 'duration should be defined', ->
      expect(mp.duration).toBeDefined()
    it 'offsetX should be defined', ->
      expect(mp.offsetX).toBeDefined()
    it 'isReverse should be defined', ->
      expect(mp.isReverse).toBeDefined()
    it 'offsetY should be defined', ->
      expect(mp.offsetY).toBeDefined()
    it 'isAngle should be defined', ->
      expect(mp.isAngle).toBeDefined()
    it 'isRunLess should be defined', ->
      expect(mp.isRunLess).toBeDefined()
    it 'easing should be defined', ->
      expect(mp.easing).toBeDefined()
      expect(mp.easings).toBeDefined()
    it 'yoyo should be defined', ->
      expect(mp.yoyo).toBeDefined()
    it 'repeat should be defined', ->
      expect(mp.repeat).toBeDefined()
  describe 'run ability ->', ->
    div = document.createElement 'div'
    coords = 'M0.55859375,593.527344L0.55859375,593.527344'
    it 'should not run with isRunLess option passed', (dfr)->
      isStarted = false; isDelayed = false
      mp = new MotionPath
        path: coords
        el: div
        isRunLess: true
        duration: 20
        onStart:-> isStarted = true
      setTimeout (-> expect(isStarted).toBe(false); dfr()), 100

    it 'should extend defaults', (dfr)->
      div = document.createElement 'div'
      coords = 'M0,0 L500,00'
      mp = new MotionPath
        path: coords, el: div, isRunLess: true, duration: 50
      mp.run path: 'M0,0 L600,00'
      setTimeout ->
        pos = div.style.transform.split(/(translate\()|\,|\)/)[2]
        pos = parseInt pos, 10
        expect(pos).toBe(600)
        dfr()
      , 100

  describe 'callbacks ->', ->
    div = document.createElement 'div'
    coords = 'M0.55859375,593.527344L0.55859375,593.527344'

    describe 'onStart callback ->', ->
      it 'should run on start', (dfr)->
        isStarted = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 64
          onStart:-> isStarted = true

        setTimeout (->
          expect(isStarted).toBe(true); dfr()
          ), 100
      it 'should have the scope of MotionPath', (dfr)->
        isRightScope = false
        mp = new MotionPath
          path: coords
          el: div
          onStart:-> isRightScope = @ instanceof MotionPath
        setTimeout (-> expect(isRightScope).toBe(true); dfr()), 100
    
    describe 'onComplete callback ->', ->
      it 'onComplete callback should work', (dfr)->
        isCompleted = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 5
          onComplete:-> isCompleted = true
        setTimeout ->
          expect(isCompleted).toBe(true); dfr()
        , 100

      it 'should have the scope of MotionPath', (dfr)->
        isRightScope = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 5
          onComplete:-> isRightScope = @ instanceof MotionPath
        setTimeout ->
          expect(isRightScope).toBe(true); dfr()
        , 100
    
    describe 'onUpdate callback ->', ->
      it 'onUpdate callback should work', (dfr)->
        isOnUpdate = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 5
          onUpdate:-> isOnUpdate = true

        setTimeout ->
          expect(isOnUpdate).toBe(true); dfr()
        , 100
      it 'onUpdate callback should have "progress" argument', (dfr)->
        isOnUpdate = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 5
          onUpdate:(progress)-> isOnUpdate = true if progress?
        setTimeout ->
          expect(isOnUpdate).toBe(true); dfr()
        , 100

      it 'should have the scope of MotionPath', (dfr)->
        isRightScope = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 5
          onUpdate:-> isRightScope = @ instanceof MotionPath
        setTimeout ->
          expect(isRightScope).toBe(true); dfr()
        , 100

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
        duration: 64
        fill: { container: container }
        all: true
        isIt: true
        onComplete:->
          args = motionPath.el.style.transform.split /(translate\()|\,|\)/
          width  = parseInt(args[2], 10)
          height = parseInt(args[4], 10)
          isWidth  = width  is container.offsetWidth
          isHeight = height is container.offsetHeight
          isFilled = isWidth and isHeight
      setTimeout (-> expect(isFilled).toBe(true); dfr()), 100

    it "if fillRule is \"width\" it should keep container\'s width
    and set \"height\" with aspect ratio", (dfr)->
      isFilled = false
      mp = new MotionPath
        path: 'M0,0 L500,250'
        el: div
        duration: 50
        fill: { container: container, fillRule: 'width' }
        all: true
        onComplete:->
          args = mp.el.style.transform.split /(translate\()|\,|\)/
          width  = parseInt(args[2], 10)
          height = parseInt(args[4], 10)
          isWidth  = width  is container.offsetWidth
          isHeight = height is (width/2)
          isFilled = isWidth and isHeight

      setTimeout ->
        expect(isFilled).toBe(true); dfr()
      , 100

    it "if fillRule is \"height\" it should keep container\'s height
      and set \"width\" with aspect ratio", (dfr)->

      isFilled = false
      mp = new MotionPath
        path: 'M0,0 L250,500'
        el: div
        duration: 50
        fill: { container: container, fillRule: 'height' }
        onComplete:->
          args = mp.el.style.transform.split /(translate\()|\,|\)/
          width  = parseInt(args[2], 10)
          height = parseInt(args[4], 10)
          isWidth  = width  is (height/2)
          isHeight = height is container.offsetHeight
          isFilled = isWidth and isHeight
      setTimeout ->
        expect(isFilled).toBe(true); dfr()
      , 100

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
        duration: 50
        fill: { container: c }
        onUpdate:(proc)->
          if proc >= .1 and !isSizeChange
            mp.container.style.width = '100px'
            isSizeChange = true
        onComplete:-> x = mp.el.style.transform.split(/(translate\()|\,|\)/)[2]

      setTimeout ->
        expect(parseInt(x, 10)).toBe(100); dfr()
      , 100

  describe 'functionality ->', ->
    div = document.createElement 'div'
    coords = 'M0.55859375,593.527344L0.55859375,593.527344'
    # describe 'offsets ->', ->
    describe 'angleOffset ->', ->
      it 'angleOffset should work with positive angles', (dfr)->
        coords = 'M0,0 L10,0 L10,10'
        isEqual = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 50
          angleOffset: 90
          isAngle: true
          onComplete:-> isEqual = mp.angle is 180
        setTimeout (-> expect(isEqual).toBe(true); dfr()), 100

      it 'angleOffset should work with negative angles', (dfr)->
        coords = 'M0,0 L10,0 L10,10'
        isEqual = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 50
          angleOffset: -90
          isAngle: true
          onComplete:-> isEqual = mp.angle is 0

        setTimeout (-> expect(isEqual).toBe(true); dfr()), 100

      it 'should be evaluated if a function', (dfr)->
        coords = 'M0,0 L10,0 L10,10'
        isFunction = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 50
          angleOffset:(angle)->
            isFunction = true
            angle

        setTimeout (-> expect(isFunction).toBe(true); dfr()), 100

      it 'should get current angle', (dfr)->
        coords = 'M0,0 L10,0 L10,10'
        isOnAngle = false
        angleSum1 = 0; angleSum2 = 0
        mp = new MotionPath
          path: coords
          el: div
          duration: 50
          isAngle: true
          angleOffset:(angle)->
            angleSum1 += angle; angleSum2 += mp.angle
            angle
          onComplete:->
            isOnAngle = angleSum1 is angleSum2
        setTimeout (-> expect(isOnAngle).toBe(true); dfr()), 100

      it 'should set current angle', (dfr)->
        coords = 'M0,0 L10,0 L10,10'
        isSet = false
        currAngle = 0; isAnglesArray = []
        angleShift = 5
        mp = new MotionPath
          path: coords
          el: div
          duration: 50
          angleOffset:(angle)-> currAngle = angle; angle+angleShift
          onUpdate:-> isAnglesArray.push currAngle+angleShift is mp.angle
          onComplete:->
            for isSetItem, i in isAnglesArray
              if !isSetItem then isSet = true
        setTimeout (-> expect(isSet).toBe(false); dfr()), 100

      it 'angleOffset should get current progress as second parameter', (dfr)->
        coords = 'M0,0 L10,0 L10,10'
        isProgress = false; proc = -1
        mp = new MotionPath
          path: coords
          el: div
          duration: 50
          angleOffset:(angle, progress)-> proc = progress; angle
          onComplete:-> isProgress = proc is 1
        setTimeout (-> expect(isProgress).toBe(true); dfr()), 100

      it 'should work with positive offsetX', (dfr)->
        coords = 'M0,0 L0,10'
        x = 0; isEqual = false
        mp = new MotionPath
          path: coords
          el: div
          offsetX: 10
          duration: 50
          isAngle: true
          onComplete: ->
            x = div.style.transform.split(/(translate\()|,|\)/)[2]
            isEqual = parseInt(x, 10) is 10
          setTimeout (-> expect(isEqual).toBe(true); dfr()), 100
    it 'should work with negative offsetX', (dfr)->
      coords = 'M0,0 L0,10'
      x = 0; isEqual = false
      mp = new MotionPath
        path: coords
        el: div
        offsetX: -10
        duration: 50
        onComplete: ->
          x = div.style.transform.split(/(translate\()|,|\)/)[2]
          x = parseInt(x, 10)
          isEqual = x is -10
      setTimeout (-> expect(isEqual).toBe(true); dfr()), 100

    it 'should work with positive offsetY', (dfr)->
      coords = 'M0,0 L10,0'
      y = 0; isEqual = false
      mp = new MotionPath
        path: coords
        el: div
        offsetY: 10
        duration: 50
        onComplete: ->
          y = div.style.transform.split(/(translate\()|,|\)/)[4]
          y = parseInt(y, 10)
          isEqual = y is 10
      setTimeout (-> expect(isEqual).toBe(true); dfr()), 100

    it 'should work with negative offsetY', (dfr)->
      coords = 'M0,0 L10,0'
      y = 0; isEqual = false
      mp = new MotionPath
        path: coords
        el: div
        offsetY: -10
        duration: 50
        onComplete: ->
          y = div.style.transform.split(/(translate\()|,|\)/)[4]
          isEqual = parseInt(y, 10) is -10

      setTimeout (-> expect(isEqual).toBe(true); dfr()), 100

    it 'should calculate current angle', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      angle = 0; isEqual = false; isEquial2 = false; detect = {}
      mp = new MotionPath
        path: coords
        el: div
        duration: 50
        isAngle: true
        onUpdate:->
          detect.firstAngle ?= mp.angle
          isEquial2 = detect.firstAngle is 0
        onComplete:-> isEqual = mp.angle is 90
      setTimeout (-> expect(isEqual).toBe(true); dfr()), 100

    it 'should calculate current angle with isReverse', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      angle = 0; isEqual = false; isEquial2 = false; detect = {}
      mp = new MotionPath
        path: coords
        el: div
        duration: 50
        isAngle: true
        isReverse: true
        onUpdate:->
          detect.firstAngle ?= mp.angle
          isEquial2 = detect.firstAngle is 90
        onComplete: -> isEqual = mp.angle is 0

        setTimeout (-> expect(isEqual).toBe(true); dfr()), 100

    it 'should have transform-origin', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isComplete = false
      mp = new MotionPath
        path: coords
        el: div
        duration: 50
        transformOrigin: '50% 50%'
        onComplete: -> isComplete = true

      setTimeout ->
        expect(mp.el.style.transformOrigin.length >= 1).toBe(true); dfr()
      , 100

    it 'transform-origin could be a function', (dfr)->
      coords = 'M0,0 L10,0 L10,10'
      isAngle = false; isProgress = false
      mp = new MotionPath
        path: coords
        el: div
        duration: 50
        transformOrigin:(angle, proc)->
          isFunction = true
          isAngle = angle?; isProgress = proc?
          '50% 50%'
      setTimeout (-> expect(isAngle and isProgress).toBe(true); dfr()), 100

  describe 'setProgress function ->', (dfr)->
    it 'should have own function for setting up current progress', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: div
        isRunLess: true

      mp.setProgress(.5)
      pos = parseInt div.style.transform.split(/(translate\()|\,|\)/)[2], 10
      expect(pos).toBe(250)

  describe 'preset position ->', ->
    it 'should preset initial position by default if isRunLess', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: 'M50,0 L500,0'
        el: div
        isRunLess: true
      pos = parseInt div.style.transform.split(/(translate\()|\,|\)/)[2], 10
      expect(pos).toBe(50)

    it 'should not set initial position if isPresetPosition is false', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: 'M50,0 L500,0'
        el: div
        isRunLess: true
        isPresetPosition: false
      pos = parseInt div.style.transform.split(/(translate\()|\,|\)/)[2], 10
      expect(pos).toBe(50)

  describe 'progress bounds ->', ->
    it 'should start from pathStart position', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: div
        isRunLess: true
        pathStart: .5

      pos = parseInt div.style.transform.split(/(translate\()|\,|\)/)[2], 10
      expect(pos).toBe(250)

    it 'should end at pathEnd position', (dfr)->
      div = document.createElement 'div'
      pos = -1
      mp = new MotionPath
        path: 'M0,0 L500,0'
        el: div
        duration:   50
        pathEnd:    .5
        onComplete:->
          pos = div.style.transform.split(/(translate\()|\,|\)/)[2]
          pos = parseInt pos, 10
    
      setTimeout (-> expect(pos).toBe(250); dfr()), 100

  describe 'path option ->', ->
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
      div = document.createElement 'div'
      mp = new MotionPath
        path: path
        el: div
      expect(mp.getPath() instanceof SVGElement).toBe(true)

    it 'getPath should return a path when it was specified selector', ->
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

  describe 'el option ->', ->
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

    it 'getPath should return an el when an element was passed', ->
      div = document.createElement 'div'
      mp = new MotionPath
        path: coords
        el: div
      expect(mp.el instanceof HTMLElement).toBe(true)


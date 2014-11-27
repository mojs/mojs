MotionPath = window.mojs.MotionPath

describe 'MotionPath ::', ->
  ns = 'http://www.w3.org/2000/svg'

  describe 'enviroment ::', ->
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
        trStr = "transform WebkitTransform MozTransform OTransform msTransform"
        prefixes = trStr.split(" ")
        i = 0
        while i < prefixes.length
          div = document.createElement("div")
          isProp = div.style[prefixes[i]] isnt 'undefined'
          return prefixes[i] if isProp
          i++
        false
      expect(isTransforms()).toBeTruthy()

  describe 'defaults ::', ->
    el = document.createElement 'div'
    mp = new MotionPath
      path: 'M0.55859375,593.527344L0.55859375,593.527344'
      el: el
    it 'delay should be defined', ->
      expect(mp.delay).toBeDefined()

    it 'TWEEN should be defined', ->
      expect(mp.T).toBeDefined()

    it 'helpers should be defined', ->
      expect(mp.h).toBeDefined()

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

    # it 'angleOffset should be defined', ->
    #   expect(mp.angleOffset).toBeDefined()

    it 'isRunLess should be defined', ->
      expect(mp.isRunLess).toBeDefined()

    it 'easing should be defined', ->
      expect(mp.easing).toBeDefined()
      expect(mp.easings).toBeDefined()

    it 'yoyo should be defined', ->
      expect(mp.yoyo).toBeDefined()

    it 'repeat should be defined', ->
      expect(mp.repeat).toBeDefined()

  describe 'functionality ::', ->
    div = document.createElement 'div'

    # describe 'fill ::', ->
    #   it 'if '



    coords = 'M0.55859375,593.527344L0.55859375,593.527344'
    describe 'offsets ::', ->
      describe 'angleOffset ::', ->
        it 'angleOffset should work with positive angles', ->
          coords = 'M0,0 L10,0 L10,10'
          isEqual = false
          mp = new MotionPath
            path: coords
            el: div
            duration: 50
            angleOffset: 90
            isAngle: true
            onComplete:-> isEqual = mp.angle is 180

          waitsFor((-> isEqual), 'isEqual should be true', 100)
          runs -> expect(isEqual).toBe(true)

        it 'angleOffset should work with negative angles', ->
          coords = 'M0,0 L10,0 L10,10'
          isEqual = false
          mp = new MotionPath
            path: coords
            el: div
            duration: 50
            angleOffset: -90
            isAngle: true
            onComplete:-> isEqual = mp.angle is 0

          waitsFor((-> isEqual), 'isEqual should be true', 100)
          runs -> expect(isEqual).toBe(true)

        it 'angleOffset should be evaluated if a function', ->
          coords = 'M0,0 L10,0 L10,10'
          isFunction = false
          mp = new MotionPath
            path: coords
            el: div
            duration: 50
            angleOffset:(angle)->
              isFunction = true
              angle

          waitsFor((-> isFunction), 'isFunction should be true', 100)
          runs -> expect(isFunction).toBe(true)

        it 'angleOffset should get current angle', ->
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
            onComplete:-> isOnAngle = angleSum1 is angleSum2

          waitsFor((-> isOnAngle), '', 100)
          runs -> expect(isOnAngle).toBe(true)

        it 'angleOffset should set current angle', ->
          coords = 'M0,0 L10,0 L10,10'
          isSet = false; isCompleted = false
          currAngle = 0; isAnglesArray = []
          angleShift = 5
          mp = new MotionPath
            path: coords
            el: div
            duration: 50
            angleOffset:(angle)->
              currAngle = angle; angle+angleShift
            onUpdate:-> isAnglesArray.push currAngle+angleShift is mp.angle
            onComplete:->
              for isSetItem, i in isAnglesArray
                if !isSetItem then isSet = true
                isCompleted = true; return
              isCompleted = true

          waitsFor((-> isCompleted), '', 100)
          runs -> expect(isSet).toBe(false)


        it 'angleOffset should get current progress as second parameter', ->
          coords = 'M0,0 L10,0 L10,10'
          isProgress = false; proc = -1
          mp = new MotionPath
            path: coords
            el: div
            duration: 50
            angleOffset:(angle, progress)-> proc = progress; angle
            onComplete:-> isProgress = proc is 1

          waitsFor((-> isProgress), '', 100)
          runs -> expect(isProgress).toBe(true)


      it 'should work with positive offsetX', ->
        coords = 'M0,0 L0,10'
        x = 0; isEquial = false
        mp = new MotionPath
          path: coords
          el: div
          offsetX: 10
          duration: 50
          isAngle: true
          onComplete: ->
            x = parseInt div.style.transform.split(/(translate\()|,|\)/)[2], 10
            isEquial = x is 10

        waitsFor((-> isEquial), 'isOnUpdate should be changed to true', 100)
        runs -> expect(isEquial).toBe(true)

      it 'should work with negative offsetX', ->
        coords = 'M0,0 L0,10'
        x = 0; isEquial = false
        mp = new MotionPath
          path: coords
          el: div
          offsetX: -10
          duration: 50
          onComplete: ->
            x = parseInt div.style.transform.split(/(translate\()|,|\)/)[2], 10
            isEquial = x is -10

        waitsFor((-> isEquial), 'isOnUpdate should be changed to true', 100)
        runs -> expect(isEquial).toBe(true)


      it 'should work with positive offsetY', ->
        coords = 'M0,0 L10,0'
        y = 0; isEquial = false
        mp = new MotionPath
          path: coords
          el: div
          offsetY: 10
          duration: 50
          onComplete: ->
            y = parseInt div.style.transform.split(/(translate\()|,|\)/)[4], 10
            isEquial = y is 10

        waitsFor((-> isEquial), 'isEquial should be changed to true', 100)
        runs -> expect(isEquial).toBe(true)

      it 'should work with negative offsetY', ->
        coords = 'M0,0 L10,0'
        y = 0; isEquial = false
        mp = new MotionPath
          path: coords
          el: div
          offsetY: -10
          duration: 50
          onComplete: ->
            y = parseInt div.style.transform.split(/(translate\()|,|\)/)[4], 10
            isEquial = y is -10

        waitsFor((-> isEquial), 'isEquial should be changed to true', 100)
        runs -> expect(isEquial).toBe(true)

      it 'should calculate current angle', ->
        coords = 'M0,0 L10,0 L10,10'
        angle = 0; isEquial = false; isEquial2 = false; detect = {}
        mp = new MotionPath
          path: coords
          el: div
          duration: 50
          isAngle: true
          onUpdate:->
            detect.firstAngle ?= mp.angle
            isEquial2 = detect.firstAngle is 0
          onComplete:-> isEquial = mp.angle is 90
        waitsFor((-> isEquial), 'isEquial should be changed to true', 100)
        runs -> expect(isEquial).toBe(true)

      it 'should calculate current angle with isReverse', ->
        coords = 'M0,0 L10,0 L10,10'
        angle = 0; isEquial = false; isEquial2 = false; detect = {}
        mp = new MotionPath
          path: coords
          el: div
          duration: 50
          isAngle: true
          isReverse: true
          onUpdate:->
            detect.firstAngle ?= mp.angle
            isEquial2 = detect.firstAngle is 90
          onComplete: -> isEquial = mp.angle is 0
        waitsFor((-> isEquial and isEquial2), '', 100)
        runs -> expect(isEquial).toBe(true)

    describe 'path option ::', ->
      it 'should have a getPath method', ->
        mp = new MotionPath
          path: coords
          el: div
        expect(mp.getPath).toBeDefined()

      it 'getPath should return a path when it was specified by coordinates', ->
        mp = new MotionPath
          path: coords
          el: div
        expect(mp.getPath() instanceof SVGElement).toBe(true)

      it 'getPath should return a path when it was specified by SVG path', ->
        path = document.createElementNS ns, 'path'
        mp = new MotionPath
          path: path
          el: div
        expect(mp.getPath() instanceof SVGElement).toBe(true)

      it 'getPath should return a path when it was specified selector', ->
        id = 'js-path'
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

    describe 'el option ::', ->
      it 'should have a getEl method', ->
        mp = new MotionPath
          path: coords
          el: div
        expect(mp.getEl).toBeDefined()
      it 'getPath should return an el when it was specified by selector', ->
        id = 'js-el'
        div = document.createElement 'div'
        div.setAttribute 'id', id
        div.setAttribute 'class', id
        document.body.appendChild div
        mp = new MotionPath
          path: coords
          el: "##{id}"
        expect(mp.getEl() instanceof HTMLElement).toBe(true)
        mp = new MotionPath
          path: coords
          el: ".#{id}"
        expect(mp.getEl() instanceof HTMLElement).toBe(true)

      it 'getPath should return an el when an element was passed', ->
        div = document.createElement 'div'
        mp = new MotionPath
          path: coords
          el: div
        expect(mp.getEl() instanceof HTMLElement).toBe(true)

    describe 'run ability ::', ->
      it 'should not run with isRunLess option passed', ->
        isStarted = false; isDelayed = false
        mp = new MotionPath
          path: coords
          el: div
          isRunLess: true
          duration: 50
          onStart:->
            console.log 'a'
            isStarted = true

        setTimeout (=>isDelayed = true), 70
        waitsFor((-> isDelayed), 'isDelayed should be true', 100)
        runs -> expect(isStarted).toBe(false)

      it 'run call should modify defaults', ->
        mp = new MotionPath
          path: coords
          el: div
          isRunLess: true
          duration: 50

        mp.run duration: 100

        expect(mp.duration).toBe(100)

        

    describe 'callbacks ::', ->
      it 'onStart callback should work', ->
        isOnStart = false
        mp = new MotionPath
          path: coords
          el: div
          onStart:-> isOnStart = true

        waitsFor((-> isOnStart), 'isOnStart should be changed to true', 50)
        runs -> expect(isOnStart).toBe(true)

      it 'onComplete callback should work', ->
        isOnComplete = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 5
          onComplete:-> isOnComplete = true

        waitsFor((-> isOnComplete), 'isOnComplete should be true', 100)
        runs -> expect(isOnComplete).toBe(true)

      it 'onUpdate callback should work', ->
        isOnUpdate = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 5
          onUpdate:-> isOnUpdate = true
        waitsFor((-> isOnUpdate), 'isOnUpdate should be changed to true', 100)
        runs -> expect(isOnUpdate).toBe(true)

      it 'onUpdate callback should have "p" property', ->
        isOnUpdate = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 5
          onUpdate:->
            isOnUpdate = true if @p?
            isOnUpdate = isOnUpdate and @ isnt mp

        waitsFor((-> isOnUpdate), 'isOnUpdate should be changed to true', 100)
        runs -> expect(isOnUpdate).toBe(true)










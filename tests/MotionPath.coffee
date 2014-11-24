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

    it 'duration should be defined', ->
      expect(mp.duration).toBeDefined()

    it 'easing should be defined', ->
      expect(mp.easing).toBeDefined()
      expect(mp.easings).toBeDefined()

    it 'yoyo should be defined', ->
      expect(mp.yoyo).toBeDefined()

    it 'repeat should be defined', ->
      expect(mp.yoyo).toBeDefined()

  describe 'functionality ::', ->
    coords = 'M0.55859375,593.527344L0.55859375,593.527344'
    div = document.createElement 'div'
    
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

    describe 'callbacks :: ', ->
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
          duration: 1
          onComplete:-> isOnComplete = true

        waitsFor((-> isOnComplete), 'isOnComplete should be changed to true', 50)
        runs -> expect(isOnComplete).toBe(true)

      it 'onUpdate callback should work', ->
        isOnUpdate = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 3
          onUpdate:-> isOnUpdate = true
        waitsFor((-> isOnUpdate), 'isOnUpdate should be changed to true', 50)
        runs -> expect(isOnUpdate).toBe(true)

      it 'onUpdate callback should have tween\'s scope and have "p" property', ->
        isOnUpdate = false
        mp = new MotionPath
          path: coords
          el: div
          duration: 3
          onUpdate:->
            isOnUpdate = true if @p?
            isOnUpdate = isOnUpdate and @ isnt mp

        waitsFor((-> isOnUpdate), 'isOnUpdate should be changed to true', 50)
        runs -> expect(isOnUpdate).toBe(true)












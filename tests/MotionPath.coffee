MotionPath = window.mojs.MotionPath

describe 'MotionPath ::', ->
  describe 'enviroment ::', ->
    it 'SVG should be supported', ->
      isSVG = !!document.createElementNS?('http://www.w3.org/2000/svg', "svg").createSVGRect
      expect(isSVG).toBeTruthy()
    it 'SVG path should have getTotalLength method', ->
      path = document.createElementNS('http://www.w3.org/2000/svg', "path")
      expect(path.getTotalLength).toBeDefined()
    it 'SVG path should have getPointAtLength method', ->
      path = document.createElementNS('http://www.w3.org/2000/svg', "path")
      expect(path.getPointAtLength).toBeDefined()

    it 'document.querySelector should be defined', ->
      expect(document.querySelector).toBeDefined()
    it 'style propety should be defined on DOM node', ->
      path = document.createElementNS('http://www.w3.org/2000/svg', "path")
      div  = document.createElement 'div'
      expect(path.style).toBeDefined()
      expect(div.style).toBeDefined()

    it 'transforms should be supported', ->
      isTransforms = ->
        prefixes = "transform WebkitTransform MozTransform OTransform msTransform".split(" ")
        i = 0
        while i < prefixes.length
          return prefixes[i]  if document.createElement("div").style[prefixes[i]] isnt `undefined`
          i++
        false
      expect(isTransforms()).toBeTruthy()

      # mp = new MotionPath
      #   repeat: 5
      #   duration: 1500
      #   # yoyo: true
      #   path: document.getElementById('js-svg-path').getAttribute 'd'
      #   el:  document.getElementById('js-el')

      # console.log mp
      # expect(mp.T).toBeDefined()


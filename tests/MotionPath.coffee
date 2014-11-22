MotionPath = window.mojs.MotionPath

describe 'MotionPath', ->
  describe 'enviroment', ->
    it 'SVG should be supported', ->
      isSVG = document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Shape', '1.1')
      expect(isSVG).toBeTruthy()

      # mp = new MotionPath
      #   repeat: 5
      #   duration: 1500
      #   # yoyo: true
      #   path: document.getElementById('js-svg-path').getAttribute 'd'
      #   el:  document.getElementById('js-el')

      # console.log mp
      # expect(mp.T).toBeDefined()


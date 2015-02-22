MotionPath = window.mojs.MotionPath
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

  describe 'defaults ::', ->
    el = document.createElement 'div'
    mp = new MotionPath
      path: 'M0.55859375,593.527344L0.55859375,593.527344'
      el: el
    it 'delay should be defined', ->
      expect(mp.delay).toBeDefined()
    # it 'TWEEN should be defined', ->
    #   expect(mp.T).toBeDefined()
    # it 'helpers should be defined', ->
    #   expect(mp.h).toBeDefined()
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

# describe 'functionality ::', ->
#   div = document.createElement 'div'
#   describe 'fill ::', ->
#     container = document.createElement 'div'
#     div = document.createElement 'div'
#     size = 200
#     container.style.width  = "#{size}px"
#     container.style.height = "#{size}px"
#     container.style.position = 'absolute'
#     container.style.top = '-100%'
#     container.setAttribute 'id', 'js-container'
#     document.body.appendChild container

#     it 'container could be specified by selector or DOM node', ->
#       mp = new MotionPath
#         path: 'M0,0 L500,0'
#         el: div
#         fill: { container: '#js-container' }

#       expect(mp.container instanceof HTMLElement).toBe(true)

#     it 'if fill is specified it should have container, fillRule, cSize', ->
#       mp = new MotionPath
#         path: 'M0,0 L500,0'
#         el: div
#         fill: { container: container }

#       expect(mp.container).toBeDefined()
#       expect(mp.fillRule).toBeDefined()
#       expect(mp.cSize).toBeDefined()

#     it 'if fillRule is "all" it should keep container\'s size', ->
#       isFilled = false; isCompleted = false
#       mp = new MotionPath
#         path: 'M0,0 L500,500'
#         el: div
#         duration: 50
#         fill: { container: container }
#         all: true
#         onComplete:->
#           args = mp.el.style.transform.split /(translate\()|\,|\)/
#           width  = parseInt(args[2], 10)
#           height = parseInt(args[4], 10)
#           isWidth  = width  is container.offsetWidth
#           isHeight = height is container.offsetHeight
#           isFilled = isWidth and isHeight
#           isCompleted = true

#       waitsFor((-> isCompleted), '', 100)
#       runs -> expect(isFilled).toBe(true)

#     it "if fillRule is \"width\" it should keep container\'s width
#     and set \"height\" with aspect ratio", ->
#       isFilled = false; isCompleted = false
#       mp = new MotionPath
#         path: 'M0,0 L500,250'
#         el: div
#         duration: 50
#         fill: { container: container, fillRule: 'width' }
#         all: true
#         onComplete:->
#           args = mp.el.style.transform.split /(translate\()|\,|\)/
#           width  = parseInt(args[2], 10)
#           height = parseInt(args[4], 10)
#           isWidth  = width  is container.offsetWidth
#           isHeight = height is (width/2)
#           isFilled = isWidth and isHeight
#           isCompleted = true
#       waitsFor((-> isCompleted), '', 100)
#       runs -> expect(isFilled).toBe(true)

#     it "if fillRule is \"height\" it should keep container\'s height
#     and set \"width\" with aspect ratio", ->
#       isFilled = false; isCompleted = false
#       mp = new MotionPath
#         path: 'M0,0 L250,500'
#         el: div
#         duration: 50
#         fill: { container: container, fillRule: 'height' }
#         onComplete:->
#           args = mp.el.style.transform.split /(translate\()|\,|\)/
#           width  = parseInt(args[2], 10)
#           height = parseInt(args[4], 10)
#           isWidth  = width  is (height/2)
#           isHeight = height is container.offsetHeight
#           isFilled = isWidth and isHeight
#           isCompleted = true
#       waitsFor((-> isCompleted), '', 100)
#       runs -> expect(isFilled).toBe(true)

#     it 'if container size was changed should recalc scaler', ->
#       isCompleted = false; isSizeChange = false
#       el = document.createElement 'div'
#       c = document.createElement 'div'
#       size = 200
#       c.style.width  = "#{size}px"
#       c.style.height = "#{size}px"
#       c.style.position = 'absolute'
#       c.style.top = '-100%'
#       c.setAttribute 'id', 'js-container2'
#       document.body.appendChild c
#       x = -1
#       mp = new MotionPath
#         path: 'M0,0 L500,0'
#         el: el
#         duration: 300
#         fill: { container: c }
#         onUpdate:(proc)->
#           if proc >= .1 and !isSizeChange
#             mp.container.style.width = '100px'
#             isSizeChange = true

#         onComplete:->
#           x = mp.el.style.transform.split(/(translate\()|\,|\)/)[2]
#           isCompleted = true

#       waitsFor((-> isCompleted), '', 400)
#       runs -> expect(parseInt(x, 10)).toBe(100)

#   coords = 'M0.55859375,593.527344L0.55859375,593.527344'
#   describe 'offsets ::', ->
#     describe 'angleOffset ::', ->
#       it 'angleOffset should work with positive angles', ->
#         coords = 'M0,0 L10,0 L10,10'
#         isEqual = false
#         mp = new MotionPath
#           path: coords
#           el: div
#           duration: 50
#           angleOffset: 90
#           isAngle: true
#           onComplete:-> isEqual = mp.angle is 180

#         waitsFor((-> isEqual), 'isEqual should be true', 100)
#         runs -> expect(isEqual).toBe(true)

#       it 'angleOffset should work with negative angles', ->
#         coords = 'M0,0 L10,0 L10,10'
#         isEqual = false
#         mp = new MotionPath
#           path: coords
#           el: div
#           duration: 50
#           angleOffset: -90
#           isAngle: true
#           onComplete:-> isEqual = mp.angle is 0

#         waitsFor((-> isEqual), 'isEqual should be true', 100)
#         runs -> expect(isEqual).toBe(true)

#       it 'angleOffset should be evaluated if a function', ->
#         coords = 'M0,0 L10,0 L10,10'
#         isFunction = false
#         mp = new MotionPath
#           path: coords
#           el: div
#           duration: 50
#           angleOffset:(angle)->
#             isFunction = true
#             angle

#         waitsFor((-> isFunction), 'isFunction should be true', 100)
#         runs -> expect(isFunction).toBe(true)

#       it 'angleOffset should get current angle', ->
#         coords = 'M0,0 L10,0 L10,10'
#         isOnAngle = false
#         angleSum1 = 0; angleSum2 = 0
#         mp = new MotionPath
#           path: coords
#           el: div
#           duration: 50
#           isAngle: true
#           angleOffset:(angle)->
#             angleSum1 += angle; angleSum2 += mp.angle
#             angle
#           onComplete:-> isOnAngle = angleSum1 is angleSum2

#         waitsFor((-> isOnAngle), '', 100)
#         runs -> expect(isOnAngle).toBe(true)

#       it 'angleOffset should set current angle', ->
#         coords = 'M0,0 L10,0 L10,10'
#         isSet = false; isCompleted = false
#         currAngle = 0; isAnglesArray = []
#         angleShift = 5
#         mp = new MotionPath
#           path: coords
#           el: div
#           duration: 50
#           angleOffset:(angle)->
#             currAngle = angle; angle+angleShift
#           onUpdate:-> isAnglesArray.push currAngle+angleShift is mp.angle
#           onComplete:->
#             for isSetItem, i in isAnglesArray
#               if !isSetItem then isSet = true
#               isCompleted = true; return
#             isCompleted = true

#         waitsFor((-> isCompleted), '', 100)
#         runs -> expect(isSet).toBe(false)

#       it 'angleOffset should get current progress as second parameter', ->
#         coords = 'M0,0 L10,0 L10,10'
#         isProgress = false; proc = -1
#         mp = new MotionPath
#           path: coords
#           el: div
#           duration: 50
#           angleOffset:(angle, progress)-> proc = progress; angle
#           onComplete:-> isProgress = proc is 1

#         waitsFor((-> isProgress), '', 100)
#         runs -> expect(isProgress).toBe(true)

#     it 'should work with positive offsetX', ->
#       coords = 'M0,0 L0,10'
#       x = 0; isEquial = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         offsetX: 10
#         duration: 50
#         isAngle: true
#         onComplete: ->
#           x = div.style.transform.split(/(translate\()|,|\)/)[2]
#           isEquial = parseInt(x, 10) is 10

#       waitsFor((-> isEquial), 'isOnUpdate should be changed to true', 100)
#       runs -> expect(isEquial).toBe(true)

#     it 'should work with negative offsetX', ->
#       coords = 'M0,0 L0,10'
#       x = 0; isEquial = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         offsetX: -10
#         duration: 50
#         onComplete: ->
#           x = div.style.transform.split(/(translate\()|,|\)/)[2]
#           x = parseInt(x, 10)
#           isEquial = x is -10

#       waitsFor((-> isEquial), 'isOnUpdate should be changed to true', 100)
#       runs -> expect(isEquial).toBe(true)

#     it 'should work with positive offsetY', ->
#       coords = 'M0,0 L10,0'
#       y = 0; isEquial = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         offsetY: 10
#         duration: 50
#         onComplete: ->
#           y = div.style.transform.split(/(translate\()|,|\)/)[4]
#           y = parseInt(y, 10)
#           isEquial = y is 10

#       waitsFor((-> isEquial), 'isEquial should be changed to true', 100)
#       runs -> expect(isEquial).toBe(true)

#     it 'should work with negative offsetY', ->
#       coords = 'M0,0 L10,0'
#       y = 0; isEquial = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         offsetY: -10
#         duration: 50
#         onComplete: ->
#           y = div.style.transform.split(/(translate\()|,|\)/)[4]
#           isEquial = parseInt(y, 10) is -10

#       waitsFor((-> isEquial), 'isEquial should be changed to true', 100)
#       runs -> expect(isEquial).toBe(true)

#     it 'should calculate current angle', ->
#       coords = 'M0,0 L10,0 L10,10'
#       angle = 0; isEquial = false; isEquial2 = false; detect = {}
#       mp = new MotionPath
#         path: coords
#         el: div
#         duration: 50
#         isAngle: true
#         onUpdate:->
#           detect.firstAngle ?= mp.angle
#           isEquial2 = detect.firstAngle is 0
#         onComplete:-> isEquial = mp.angle is 90
#       waitsFor((-> isEquial), 'isEquial should be changed to true', 100)
#       runs -> expect(isEquial).toBe(true)

#     it 'should calculate current angle with isReverse', ->
#       coords = 'M0,0 L10,0 L10,10'
#       angle = 0; isEquial = false; isEquial2 = false; detect = {}
#       mp = new MotionPath
#         path: coords
#         el: div
#         duration: 50
#         isAngle: true
#         isReverse: true
#         onUpdate:->
#           detect.firstAngle ?= mp.angle
#           isEquial2 = detect.firstAngle is 90
#         onComplete: -> isEquial = mp.angle is 0
#       waitsFor((-> isEquial and isEquial2), '', 100)
#       runs -> expect(isEquial).toBe(true)

#     it 'should have transform-origin', ->
#       coords = 'M0,0 L10,0 L10,10'
#       isComplete = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         duration: 50
#         transformOrigin: '50% 50%'
#         onComplete: -> isComplete = true

#       waitsFor((-> isComplete), '', 100)
#       runs -> expect(mp.el.style.transformOrigin.length >= 1).toBe(true)

#     it 'transform-origin could be a function', ->
#       coords = 'M0,0 L10,0 L10,10'
#       isComplete = false; isAngle = false; isProgress = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         duration: 50
#         transformOrigin:(angle, proc)->
#           isFunction = true
#           isAngle = angle?; isProgress = proc?
#           '50% 50%'
#         onComplete: -> isComplete = true

#       waitsFor((-> isComplete), '', 100)
#       runs -> expect(isAngle and isProgress).toBe(true)

#   describe 'setProgress function ::', ->
#     it 'should have own function for setting up current progress', ->
#       div = document.createElement 'div'
#       mp = new MotionPath
#         path: 'M0,0 L500,0'
#         el: div
#         isRunLess: true

#       mp.setProgress(.5)
#       pos = parseInt div.style.transform.split(/(translate\()|\,|\)/)[2], 10
#       expect(pos).toBe(250)

#   describe 'preset position ::', ->
#     it 'should preset initial position by default if isRunLess', ->
#       div = document.createElement 'div'
#       mp = new MotionPath
#         path: 'M50,0 L500,0'
#         el: div
#         isRunLess: true
#       pos = parseInt div.style.transform.split(/(translate\()|\,|\)/)[2], 10
#       expect(pos).toBe(50)

#     it 'should not set initial position if isPresetPosition is false', ->
#       div = document.createElement 'div'
#       mp = new MotionPath
#         path: 'M50,0 L500,0'
#         el: div
#         isRunLess: true
#         isPresetPosition: false
#       pos = parseInt div.style.transform.split(/(translate\()|\,|\)/)[2], 10
#       expect(pos).toBe(50)

#   describe 'progress bounds ::', ->
#     it 'should start from pathStart position', ->
#       div = document.createElement 'div'
#       mp = new MotionPath
#         path: 'M0,0 L500,0'
#         el: div
#         isRunLess: true
#         pathStart: .5

#       pos = parseInt div.style.transform.split(/(translate\()|\,|\)/)[2], 10
#       expect(pos).toBe(250)

#     it 'should start from pathEnd position', ->
#       div = document.createElement 'div'
#       pos = -1; isComplete = false
#       mp = new MotionPath
#         path: 'M0,0 L500,0'
#         el: div
#         duration:   50
#         pathEnd:    .5
#         onComplete:->
#           pos = div.style.transform.split(/(translate\()|\,|\)/)[2]
#           pos = parseInt pos, 10
#           isComplete = true
    
#       waitsFor((-> isComplete), '', 100)
#       runs -> expect(pos).toBe(250)

#   describe 'path option ::', ->
#     it 'should have a getPath method', ->
#       mp = new MotionPath
#         path: coords
#         el: div
#       expect(mp.getPath).toBeDefined()

#     it 'getPath should return a path when was specified by coordinates', ->
#       mp = new MotionPath
#         path: coords
#         el: div
#       expect(mp.getPath() instanceof SVGElement).toBe(true)

#     it 'getPath should return a path when it was specified by SVG path', ->
#       path = document.createElementNS ns, 'path'
#       mp = new MotionPath
#         path: path
#         el: div
#       expect(mp.getPath() instanceof SVGElement).toBe(true)

#     it 'getPath should return a path when it was specified selector', ->
#       id = 'js-path'
#       svg = document.createElementNS ns, 'svg'
#       path = document.createElementNS ns, 'path'
#       path.setAttribute 'id', id
#       path.setAttribute 'class', id
#       svg.appendChild path
#       document.body.appendChild svg
#       mp = new MotionPath
#         path: "##{id}"
#         el: div
#       expect(mp.getPath() instanceof SVGElement).toBe(true)

#       mp = new MotionPath
#         path: ".#{id}"
#         el: div
#       expect(mp.getPath() instanceof SVGElement).toBe(true)

#   describe 'el option ::', ->
#     it 'should return an el when it was specified by selector', ->
#       id = 'js-el'
#       div = document.createElement 'div'
#       div.setAttribute 'id', id
#       div.setAttribute 'class', id
#       document.body.appendChild div
#       mp = new MotionPath
#         path: coords
#         el: "##{id}"
#       expect(mp.el instanceof HTMLElement).toBe(true)
#       mp = new MotionPath
#         path: coords
#         el: ".#{id}"
#       expect(mp.el instanceof HTMLElement).toBe(true)

#     it 'getPath should return an el when an element was passed', ->
#       div = document.createElement 'div'
#       mp = new MotionPath
#         path: coords
#         el: div
#       expect(mp.el instanceof HTMLElement).toBe(true)

#   describe 'run ability ::', ->
#     it 'should not run with isRunLess option passed', ->
#       isStarted = false; isDelayed = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         isRunLess: true
#         duration: 50
#         onStart:->
#           isStarted = true

#       setTimeout (->isDelayed = true), 70
#       waitsFor((-> isDelayed), 'isDelayed should be true', 100)
#       runs -> expect(isStarted).toBe(false)

#     it 'run call should extend defaults', ->
#       div = document.createElement 'div'
#       coords = 'M0,0 L500,00'
#       isComplete = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         isRunLess: true
#         duration: 50
#         r: true

#       mp.run
#         onComplete:-> isComplete = true
#         path: 'M0,0 L600,00'

#       waitsFor((-> isComplete), 'isComplete should be true', 100)
#       runs ->
#         pos = parseInt div.style.transform.split(/(translate\()|\,|\)/)[2], 10
#         expect(pos).toBe(600)
    

#   describe 'callbacks ::', ->
#     it 'onStart callback should work', ->
#       isOnStart = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         onStart:-> isOnStart = true

#       waitsFor((-> isOnStart), 'isOnStart should be changed to true', 50)
#       runs -> expect(isOnStart).toBe(true)

#     it 'onComplete callback should work', ->
#       isOnComplete = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         duration: 5
#         onComplete:-> isOnComplete = true

#       waitsFor((-> isOnComplete), 'isOnComplete should be true', 100)
#       runs -> expect(isOnComplete).toBe(true)

#     it 'onUpdate callback should work', ->
#       isOnUpdate = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         duration: 5
#         onUpdate:-> isOnUpdate = true
#       waitsFor((-> isOnUpdate), 'isOnUpdate should be changed to true', 100)
#       runs -> expect(isOnUpdate).toBe(true)

#     it 'onUpdate callback should have "progress" argument', ->
#       isOnUpdate = false
#       mp = new MotionPath
#         path: coords
#         el: div
#         duration: 5
#         onUpdate:(progress)-> isOnUpdate = true if progress?

#       waitsFor((-> isOnUpdate), 'isOnUpdate should be changed to true', 100)
#       runs -> expect(isOnUpdate).toBe(true)










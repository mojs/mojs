# div = document.querySelector '#js-div'

# setTimeout ->
#   div.style.width = '50px'
# , 5000

# Transit   = require './transit'
Burst     = require './burst'
Swirl     = require './Swirl'
Timeline  = require './timeline'
Tween     = require './tween'
Transit   = require './transit'

# t = new Tween
# tw1 = new Timeline
#   duration: 5000
#   delay: 4000

# tw2 = new Timeline
#   duration: 5000
#   delay: 12000

# t.add tw1
# t.add tw2
# t.start()

# burst = new Transit(
#   # isRunLess: true
#   type: 'polygon'
#   duration: 2000
#   count: 3
#   isIt: true
#   isRunLess: true
#   # randomAngle: .3
#   # degree:      20
#   radius:      {0: 75}
#   points: 5
# )

# document.body.addEventListener 'click', (e)->
#   burst.run
#     x: e.x
#     y: e.y
#     duration: 4000
#     type: 'circle'
#     # angle: 'rand(0,400)'
#     # radius: { 'rand(10,20)': 0}
#     # # swirlFrequency: 50
#     # angle: {360: 0}
#     # isIt: true
#     # childOptions:
#     #   fill: 'green'

# document.body.addEventListener 'touchstart', (e)->
#   burst.run
#     x: e.touches[0].pageX
#     y: e.touches[0].pageY

pupil = document.querySelector '#js-pupil'
eye = document.querySelector '#js-eye'

# setTimeout ->
#   eye.setAttribute 'class', 'page__inner is-scaled'
# , 1500

scale = 1280; eye = document.querySelector '#js-eye'
pupil = document.querySelector '#js-pupil'
pupilInner = document.querySelector '#js-pupil-inner'
# TweenMax.to pupil, 1, scale: (1/scale), delay: 5
# TweenMax.to eye,   1, scale: scale,     delay: 5

timeline = new Timeline
  duration: 1000
  delay: 3000
  onStart:-> eye.style.opacity = 1
  onUpdate:(p)->
    eye.style['-webkit-transform'] = "scale(#{(p*scale)})"
    pupil.style['-webkit-transform'] = "scale(#{1/(p*scale)})"
    # eye.style['transform'] = "scale(#{(p*scale)})"
    # pupil.style['transform'] = "scale(#{1/(p*scale)})"
    # console.log p
t = new Tween
t.add timeline
t.start()

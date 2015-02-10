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

eye   = document.querySelector '#js-eye'
pupil = document.querySelector '#js-pupil'
page  = document.querySelector '#js-page'

setTimeout ->
  eye.classList.add 'is-scaled'
  setTimeout ->
    eye.classList.remove('is-scaled')
    eye.classList.add('is-normal')
  , 7000
, 1500

# scale = 1280
# TweenMax.to pupil, 1, scale: (1/scale), delay: 1
# TweenMax.to eye, 1,   scale: scale,     delay: 1

# timeline = new Timeline
#   duration: 10000
#   delay: 1000
#   # onStart:-> eye.classList.add 'is-scaled'
#   onUpdate:(p)->
#     eye.style['-webkit-transform'] = "scale(#{(p*scale)})"
#     pupil.style['-webkit-transform'] = "scale(#{1/(p*scale)})"
#     # pupil.style.width = "#{40+(10*p)}px"
#     # eye.style['transform'] = "scale(#{(p*scale)})"
#     # pupil.style['transform'] = "scale(#{1/(p*scale)})"
#     # console.log p
# t = new Tween
# t.add timeline
# t.start()

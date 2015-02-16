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

burst = new Burst(
  # isRunLess: true
  x: 300, y: 300
  type: 'polygon'
  duration: 500
  count: 3
  isIt: true
  # isRunLess: true
  radius:      {0: 75}
  points: 5
  isSwirl: true
  swirlFrequency: 'rand(0,10)'
  swirlSize:      'rand(0,10)'
  onComplete: -> console.log 'onComplete'
  # angle: {360: 0}
  # delay: 2000
  # isShowInit: true
)

burst.tween.prepareStart()
burst.tween.startTimelines()

slider = document.getElementById 'js-slider'

slider.addEventListener 'input', (e)->
  burst.tween.setProgress (@value/1000)
# i = 0
# setInterval ->
#   if i is 100 then i = 0
#   burst.tween.setProgress (i++)/100
# , 10


# .then(opacity: 0, radius: '75', duration: 1000, fill: 'orange')
# .run()


# document.addEventListener 'click', (e)->
#   burst.run x: e.x, y: e.y,
#     duration: 1000
    # angle: {360: 0}
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

# setTimeout ->
#   eye.classList.add 'is-scaled'
#   setTimeout ->
#     eye.classList.remove('is-scaled')
#     eye.classList.add('is-normal')
#   , 3000
# , 1500

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

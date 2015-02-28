# Transit   = require './transit'
Burst       = require './burst'
Swirl       = require './Swirl'
Transit     = require './transit'
MotionPath  = require './motion-path'
Timeline    = require './tween/timeline'
Tween       = require './tween/tween'

burst = new Transit(
  x: 400, y: 400
  type:         'circle'
  el:           document.getElementById 'js-ellipse'
  duration:     2000
  count:        3
  isShowInit: true
  isShowEnd:  true
  strokeWidth: 1
  repeat: 99999
  stroke: 'deeppink'
  # fill: 'transparent'
  # angle: {0: 180}

  # isRunLess:  true
  # points: 2
  radius: 20
  # radius: 100
  radiusY:  {10:40}
  swirlFrequency: 'rand(0,10)'
  swirlSize:      'rand(0,10)'
  # childOptions: radius: 10
  # onUpdate:(p)-> console.log p
)
# .then radius: 0, duration: 2000
# .then radius: 75#, delay: 0

# mp = new MotionPath(
#   path:     'M0,0 L500,500 L1000, 0'
#   el:       burst.el
#   duration: 2000
#   repeat: 99999
#   # isReverse: true
#   isRunLess: true
#   # pathStart: 0
#   pathEnd:   1
#   fill: { container: 'body' }
#   # onStart:-> burst.show()
#   # onChainUpdate:(p)-> burst.tween.setProgress(p)
# )
# # .then duration: 500, pathStart: .25, pathEnd:  .5
# # .then duration: 500, pathStart: .5,  pathEnd:  .75
# # .then duration: 500, pathStart: .75, pathEnd:  1

# mp.run()

# slider = document.getElementById 'js-slider'
# slider.addEventListener 'input', (e)->
#   burst.tween.setProgress (@value/100000)


# # lines = document.querySelectorAll '#js-line'
# # # line = document.querySelector '#js-line'
# # len = 1000

# # timeline = new Timeline
# #   duration: 6000, delay: 700, repeat: 20
# #   onUpdate:(p)->
# #     nP = 1-p
# #     linesLen = lines.length
# #     while(linesLen--)
# #       lines[linesLen].setAttribute 'stroke-dashoffset', len*nP
# # tween = new Tween
# # tween.add timeline
# # tween.start()

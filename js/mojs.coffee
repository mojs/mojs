# Transit   = require './transit'
Burst       = require './burst'
Swirl       = require './Swirl'
Transit     = require './transit'
Stagger     = require './stagger'
MotionPath  = require './motion-path'
Timeline    = require './tween/timeline'
Tween       = require './tween/tween'

paths = document.getElementById 'js-svg'
path1 = document.getElementById 'js-path1'
path2 = document.getElementById 'js-path2'
path3 = document.getElementById 'js-path3'

# burst = new Transit
#   bit:         path1
#   stroke:      'deeppink'
#   strokeWidth: 10
#   fill:        'transparent'
#   strokeDasharray: '100%'
#   strokeDashoffset: '-1000': 0
#   duration:         2000
#   delay:            1000

burst = new Stagger
  els:              paths
  # stroke:           'deeppink'
  strokeWidth:      5
  delay:            'stagger(2000, 50)'
  duration:         2000
  fill:             'transparent'
  strokeDasharray:  '200%'
  strokeDashoffset: { '200%': '100%' }
  isShowEnd:        true
  isShowInit:       true
  angle:            {0:360}
  easing:           'Sinusoidal.Out'

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

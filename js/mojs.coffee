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

# burst = new Burst
#   fill:      ['deeppink', 'cyan', 'yellow']
#   # strokeWidth: 'rand(1,3)': 0
#   # fill:        'transparent'
#   count:       50
#   degree:      140
#   radius:      0: 75
#   isSwirl:     true
#   # fill:        'transparent'
#   # strokeDasharray: '100%'
#   # strokeDashoffset: '-1000': 0
#   duration:         800
#   delay:            'stagger(2000, rand(0,150))'
#   childOptions: radius: 'rand(2,6)': 0

stagger = new Stagger
  els:              paths
  strokeWidth:      3
  delay:            'stagger(2000, 100)'
  duration:         2000
  isShowEnd:        true
  isShowInit:       true
  easing:           'Sinusoidal.Out'
  strokeDashoffset:  { '100%': 0 }
  # opacity:          0: 3

# .then radius: 0, duration: 2000
# .then radius: 75#, delay: 0

# mp = new MotionPath(
#   path:     '#js-path1'
#   el:       burst.el
#   duration: 2000
#   # repeat: 99999
#   # isReverse: true
#   # isRunLess: true
#   pathStart: 0
#   pathEnd:   1
#   # fill: { container: 'body' }
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

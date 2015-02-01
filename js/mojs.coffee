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

burst = new Burst
  x:            300
  y:            150
  duration:     1000
  # angle: {10:200}
  # delay:        1000
  # points:       10
  radius:        { 0: 100 }
  isSwirl:       true
  swirlFrequency: 'rand(0, 5)'
  swirlSize:      'rand(3,20)'
  # randomRadius: .5
  randomAngle:  .2
  degree: 180
  angle: -45
  # isShowEnd: true
  # type: 'line'
  points: 15
  stroke: {'deeppink': 'orange'}
  childOptions:
    # swirlFrequency: 'rand(0, 12)'
    fill:         ['deeppink', 'orange', 'cyan', 'lime', 'hotpink']
    points:       3
    # type:         ['rect', 'circle', 'polygon', 'circle']
    strokeWidth:  0
    radius:       {'rand(3,6)':0}
    duration:     'rand(500,1000)'
    delay:        'rand(0,2000)'
    # duration:     'rand(400,1200)'

document.body.addEventListener 'click', (e)->
  burst.run(x: e.x, y: e.y)

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
  duration: 4000
  count: 2
  randomAngle: .3
  degree:      20
  radius:      {0: 75}
  points: 5
  type:       'polygon'
  # childOptions: radius: {1:0}
)

document.body.addEventListener 'click', (e)->
  burst.run
    x: e.x
    y: e.y
    # radius: { 'rand(10,20)': 0}
    # # swirlFrequency: 50
    # angle: {360: 0}
    # isIt: true
    # childOptions:
    #   fill: 'green'

document.body.addEventListener 'touchstart', (e)->
  burst.run
    x: e.touches[0].pageX
    y: e.touches[0].pageY




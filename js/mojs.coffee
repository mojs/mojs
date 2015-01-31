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
#   onUpdate:(proc)-> console.log proc

# tw2 = new Timeline
#   duration: 5000
#   delay: 12000
#   onUpdate:(proc)-> console.log proc

# t.add tw1
# t.add tw2
# t.start()

burst = new Transit
  x:            300
  y:            150
  duration:     600
  # delay:        1000
  points:       10
  radius:        { 0: 100 }
  isSwirl: true
  swirlFrequency: 'rand(0, 5)'
  swirlSize:      10
  randomRadius: 1
  # childOptions:
  #   swirlFrequency: ['rand(0, 8)', 0, 0]
  #   fill:         ['deeppink', 'orange', 'cyan', 'lime', 'hotpink']
  #   points:       3
  #   strokeWidth:  0
  #   radius:       { 'rand(3, 6)': 0}
  
document.body.addEventListener 'click', (e)->
  burst.run(x: e.x, y: e.y)

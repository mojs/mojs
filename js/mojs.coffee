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
  # x:            300
  # y:            150
  isRunLess: true
  isSwirl: false
  duration: 400
  # duration:     1000
  # radius:        { 0: 100 }
  # isSwirl:       true
  # angle: 'rand(0,360)'
  # isShowEnd: true
  # count: 5
  # stroke: {'deeppink': 'orange'}
  # fill: 'green'
  # # swirlFrequency: 50
  # # strokeWidth: 2
  # type: 'rect'
  # isIt: true
  # # onUpdate:(p)-> console.log p
  # childOptions:
  #   isSwirl:      false
  #   fill:         ['deeppink', null, 'cyan', 'lime', 'hotpink']
  #   points:       3
  #   strokeWidth:  0
    # radius:       6
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




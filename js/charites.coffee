Bubble = require './bits/Bubble'


# TODO
# chains
# positions

burst = new Bubble
  radiusStart:  100
  lineWidth:    2
  color:        'deeppink'
  duration:     5000
  lineDash:    [400,20,100, 500, 200, 400]
  lineDashEnd: [0]
  # degreeOffsetEnd: 180
  # degreeEnd: 0
  
window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

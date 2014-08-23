Bubble = require './bits/Bubble'


# TODO
# chains
# positions

burst = new Bubble
  radiusStart:  100
  radiusEnd:    50
  lineWidth:    2
  # lineWidthEnd: 0
  color:        'deeppink'
  duration:     500
  degree:       360
  degreeEnd:    0
  degreeOffset:    0
  degreeOffsetEnd: 360
  angle:    180
  angleEnd: 360
  
window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

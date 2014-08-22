Bubble = require './bits/Bubble'


# TODO
# chains
# positions

burst = new Bubble
  radiusStart:  15
  radiusEnd:    25
  # radiusStartX: 20
  # radiusEndX:   15
  lineWidth:    5
  lineWidthEnd: 0
  color:        'deeppink'
  duration:     500
  angle:        90
  
window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

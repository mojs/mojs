Bubble = require './bits/Bubble'


# TODO
# chains
# positions

burst = new Bubble
  # radiusStart:  100
  # radiusEnd:    150
  radiusStartX: 85
  radiusEndX:   35
  radiusStartY: 15
  radiusEndY:   10
  lineWidth:    50
  lineWidthEnd: 0
  color:        'deeppink'
  duration:     5000
  angle:        90
  angleEnd:     720
  repeat:       99999
  yoyo:         true
  
window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

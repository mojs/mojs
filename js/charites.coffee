Bubble = require './bits/Bubble'


# TODO
# chains
# positions

burst = new Bubble
  radiusStart:  10
  radiusEnd:    20
  radiusStartX: 30
  radiusEndX:   60
  lineWidth:    5
  lineWidthEnd: 0
  color:        'deeppink'
  duration:     500
  
window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

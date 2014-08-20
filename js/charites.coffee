Bubble = require './bits/Bubble'

burst = new Bubble
  radiusStart:  0
  radiusEnd:    30
  lineWidth:    4
  lineWidthEnd: 0
  color:        'deeppink'
  duration:     500
  
window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

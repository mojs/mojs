Bubble = require './bits/Bubble'


# TODO
# chains
# positions

burst = new Bubble
  radiusStart:  100
  lineWidth:    2
  color:        'deeppink'
  duration:     500
  lineDash: [100, 200]
  
window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

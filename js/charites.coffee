Bubble = require './bits/Bubble'

burst = new Bubble
  radiusStart: 20
  radiusEnd:   40
  lineWidth: 10
  color: 'deeppink'
  
window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

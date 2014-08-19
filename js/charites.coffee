Burst = require './bits/burst'

burst = new Burst
  lineWidth: 2
  lineWidthEnd: 2
  lineCap: 'round'
  duration:  300
  radiusStart: 20
  radiusEnd:   40
  opacity: .25
  cnt: 5
  isRunLess: true
  color: 'maroon'

window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

Bubble = require './bits/Bubble'


# TODO
# chains
# positions

burst = new Bubble
  radius: 100
  # radiusStart:  100
  # radiusEnd:    120
  # radiusEndX:   200
  lineWidth:    3
  lineWidthEnd: 10
  color:        'deeppink'
  colorEnd:     '#0000FF'
  duration:     5000
  lineDash:    [400,20,100, 500, 20, 400]
  lineDashEnd: [200,10,50, 200, 100, 200]
  angleEnd:    -360
  degreeEnd:   0
  
window.addEventListener 'click', (e)->
  burst.el.style.top  = "#{e.y-(burst.size/2)}px"
  burst.el.style.left = "#{e.x-(burst.size/2)}px"
  burst.run()

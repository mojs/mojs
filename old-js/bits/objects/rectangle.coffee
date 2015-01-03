Object = require './object'

class Square extends Object
  name: 'Square'

  render:->
    @preRender()


    # 70% of the rectangle
    # or rectangle placed in radius 2
    @ctx.rect(.3, .3, 1.4, 1.4)
    
    @postRender()


module.exports = Square
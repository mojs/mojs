h = require '../helpers'

class Bit
  constructor:(@o={})->
    console.log 'bit'
    @vars()

  vars:->
    @size = @o.size or 100
    @size *= h.pixel
    @radius = @o.radius or @size/2 or 50
    @radius *= h.pixel
    if !@o.context then @createContext()
    else @context = @o.context

  createContext:->
    @el = document.createElement 'canvas'

    @el.setAttribute 'width',  2*@radius
    @el.setAttribute 'height', 2*@radius
    
    # for retina
    if h.pixel > 1
      @el.style.width   = "#{@radius}px"
      @el.style.height  = "#{@radius}px"
    h.body.appendChild @el

    # @context =

module.exports = do -> Bit
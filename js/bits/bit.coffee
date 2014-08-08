class Bit
  x:   0
  y:   0
  deg: 0

  constructor:(@o={})->
    @vars?()
    @setProp x: 10

  setProp:(props)->
    for propName, propValue of props
      @[propName] = propValue

module.exports = Bit
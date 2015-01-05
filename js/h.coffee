class Helpers
  getRadialPoint:(o={})->
    return if !o.radius? or !o.angle? or !o.center?
    radAngle = (o.angle-90)*(Math.PI/180)
    point =
      x: o.center.x + (Math.cos(radAngle)*o.radius)
      y: o.center.y + (Math.sin(radAngle)*o.radius)

### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "Helpers", [], -> new Helpers
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = new Helpers
### istanbul ignore next ###
window?.mojs ?= {}
window?.mojs.helpers = new Helpers


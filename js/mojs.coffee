
mojs =
  revision:   '0.132.3', isDebug: true
  helpers     : require './h'
  Bit         : require './shapes/bit'
  bitsMap     : require './shapes/bitsMap'
  Circle      : require './shapes/circle'
  Cross       : require './shapes/cross'
  Line        : require './shapes/line'
  Rect        : require './shapes/rect'
  Polygon     : require './shapes/polygon'
  Equal       : require './shapes/equal'
  Zigzag      : require './shapes/zigzag'
  Burst       : require './burst'
  Transit     : require './transit'
  Swirl       : require './swirl'
  Stagger     : require './stagger'
  Spriter     : require './spriter'
  MotionPath  : require './motion-path'
  Tween       : require './tween/tween'
  Timeline    : require './tween/timeline'
  tweener     : require './tween/tweener'
  easing      : require './easing/easing'

mojs.h     = mojs.helpers
mojs.delta = mojs.h.delta


# easing = mojs.easing.path 'M0,99.9660556 L3.13085938,99.9660558 C11.128418,-42.5141612 24.7357688,10.3389432 24.7357688,10.3389432 C24.7357688,10.3389432 35.4207115,6.43611673 35.420711,19.551763 C35.420711,19.551763 35.4207115,28.5204487 38.4679491,20.1010452 C45.9122391,-2.41706848 48.2480469,19.3280379 49.4205542,19.3280385 C49.4205546,6.88000841 55.0592461,-3.51334643 59,15.8785806 C60.6251608,22.5931723 56.8918457,-3.3408203 65.4951172,-3.3408203 C68.7340668,-3.54252346 69.730594,6.60260412 70.328125,14.0234368 C70.9301836,21.5004985 74.0961573,27.0302603 74.7888322,18.8316301 C77.5927734,-0.603027419 100,0 100,0'
# tw = new mojs.Tween
#   onUpdate:(p)->
#     console.log easing p
  
# tw.run()


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs

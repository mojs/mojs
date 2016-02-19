'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _transit = require('./transit');

var _transit2 = _interopRequireDefault(_transit);

var Swirl = require('./swirl');
var h = require('./h');

var Burst = (function (_Transit) {
    _inherits(Burst, _Transit);

    function Burst() {
        _classCallCheck(this, Burst);

        _get(Object.getPrototypeOf(Burst.prototype), 'constructor', this).apply(this, arguments);
    }

    return Burst;
})(_transit2['default'])
//   skipProps: childOptions: 1
//   defaults:
//     # presentation props
//     count:              5
//     degree:             360
//     opacity:            1
//     randomAngle:        0
//     randomRadius:       0
//     # position props/el props
//     left:               100
//     top:                100
//     x:                  0
//     y:                  0
//     easing:             'Linear.None'
//     # size props
//     radius:             { 25: 75 }
//     radiusX:            undefined
//     radiusY:            undefined
//     angle:              0
//     size:               null
//     sizeGap:            0
//     # callbacks
//     duration:           600
//     delay:              0
//     onStart:            null
//     onComplete:         null
//     onCompleteChain:    null
//     onUpdate:           null
//     isResetAngles:      false
//   childDefaults:
//     #-- intersection starts
//     radius:             { 7 : 0 }
//     radiusX:            undefined
//     radiusY:            undefined
//     angle:              0
//     opacity:            1
//     # callbacks
//     onStart:            null
//     onComplete:         null
//     onUpdate:           null
//     #-- intersection ends
//     points:             3
//     duration:           500
//     delay:              0
//     repeat:             0
//     yoyo:               false
//     easing:             'Linear.None'
//     shape:              'circle'
//     fill:               'deeppink'
//     fillOpacity:        1
//     isSwirl:            false
//     swirlSize:          10
//     swirlFrequency:     3
//     stroke:             'transparent'
//     strokeWidth:        0
//     strokeOpacity:      1
//     strokeDasharray:    ''
//     strokeDashoffset:   ''
//     strokeLinecap:      null
//   optionsIntersection:
//     radius:     1
//     radiusX:    1
//     radiusY:    1
//     angle:      1
//     opacity:    1
//     onStart:    1
//     onComplete: 1
//     onUpdate:   1
//   run:(o)->
//     if o? and Object.keys(o).length
//       if o.count or o.childOptions?.count
//         @h.warn 'Sorry, count can not be changed on run'
//       @extendDefaults(o)
//       # copy child options to options
//       keys = Object.keys(o.childOptions or {}); @o.childOptions ?= {}
//       @o.childOptions[key] = o.childOptions[key] for key, i in keys
//       # tune transits
//       len = @transits.length
//       while(len--)
//         # we should keep transit's angle otherwise
//         # it will fallback to default 0 value
//         option = @getOption(len)
//         if !o.childOptions?.angle? and !o.angleShift?
//           option.angle = @transits[len].o.angle
//         # calculate bit angle if new angle related option passed
//         # and not isResetAngles
//         else if !o.isResetAngles
//           option.angle = @getBitAngle option.angle, len

//         @transits[len].tuneNewOption option, true
//       @timeline._recalcTotalDuration()
//     if @props.randomAngle or @props.randomRadius
//       len = @transits.length
//       while(len--)
//         tr = @transits[len]
//         @props.randomAngle  and tr.setProp angleShift:  @generateRandomAngle()
//         @props.randomRadius and tr.setProp radiusScale: @generateRandomRadius()
//     @startTween()

//   _createBit:->
//     @transits = []
//     for i in [0...@props.count]
//       option = @getOption(i); option.ctx = @ctx; option.index = i
//       # option.isDrawLess = option.isRunLess = option.isTweenLess = true
//       option.isDrawLess = true
//       @props.randomAngle  and (option.angleShift  = @generateRandomAngle())
//       @props.randomRadius and (option.radiusScale = @generateRandomRadius())
//       @transits.push new Swirl option

//   addBitOptions:->
//     points = @props.count
//     @degreeCnt = if @props.degree % 360 is 0 then points else points-1 or 1

//     step = @props.degree/@degreeCnt
//     for transit, i in @transits
//       aShift = transit.props.angleShift or 0
//       pointStart = @getSidePoint 'start', i*step + aShift
//       pointEnd   = @getSidePoint 'end',   i*step + aShift

//       transit.o.x = @getDeltaFromPoints 'x', pointStart, pointEnd
//       transit.o.y = @getDeltaFromPoints 'y', pointStart, pointEnd

//       transit.o.angle = @getBitAngle transit.o.angle, i if !@props.isResetAngles
//       transit.extendDefaults()
//   # ---

//   # Method to get transits angle in burst so
//   # it will follow circular shape
//   #
//   # @method   getBitAngle
//   # @param    {Number, Object} base angle
//   # @param    {Integer} transit's index in burst
//   # @return   {Numebr} angle in burst
//   getBitAngle:(angle, i)->
//     points = @props.count
//     degCnt = if @props.degree % 360 is 0 then points else points-1 or 1
//     step = @props.degree/degCnt; angleAddition = i*step + 90
//     angleShift = @transits[i].props.angleShift or 0
//     # if not delta option
//     angle = if typeof angle isnt 'object'
//       angle + angleAddition + angleShift
//     # if delta option calculate delta based on
//     # angle in burst for each transit and angleShift
//     else
//       keys = Object.keys(angle); start = keys[0]
//       end = angle[start]; curAngleShift = angleAddition+angleShift
//       newStart = parseFloat(start) + curAngleShift
//       newEnd   = parseFloat(end)   + curAngleShift
//       delta = {}; delta[newStart] = newEnd
//       delta
//     angle

//   getSidePoint:(side, angle)->
//     sideRadius = @getSideRadius side
//     pointStart = @h.getRadialPoint
//       radius:  sideRadius.radius
//       radiusX: sideRadius.radiusX
//       radiusY: sideRadius.radiusY
//       angle:   angle
//       center:  x: @props.center, y: @props.center
//   getSideRadius:(side)->
//     radius:  @getRadiusByKey 'radius',  side
//     radiusX: @getRadiusByKey 'radiusX', side
//     radiusY: @getRadiusByKey 'radiusY', side
//   getRadiusByKey:(key, side)->
//     if @deltas[key]? then @deltas[key][side]
//     else if @props[key]? then @props[key]
//   getDeltaFromPoints:(key, pointStart, pointEnd)->
//     delta = {}
//     if pointStart[key] is pointEnd[key] then delta = pointStart[key]
//     else delta[pointStart[key]] = pointEnd[key]; delta
//   _draw:(progress)-> @_drawEl()

//   isNeedsTransform:->
//     @isPropChanged('x')or@isPropChanged('y')or@isPropChanged('angle')
//   _fillTransform:->
//     "rotate(#{@props.angle}deg) translate(#{@props.x}, #{@props.y})"
//   createTween:->
//     super; i = @transits.length; @timeline.add(@transits[i].tween) while(i--)

//   _calcSize:->
//     largestSize = -1
//     for transit, i in @transits
//       transit.calcSize()
//       largestSize = transit.props.size if largestSize < transit.props.size
//     radius = @_calcMaxShapeRadius()
//     @props.size   = largestSize + 2*radius
//     @props.size   += 2*@props.sizeGap
//     @props.center = @props.size/2
//     @addBitOptions()

//   getOption: (i)->
//     option = {}; keys = Object.keys(@childDefaults); len = keys.length
//     while(len--)
//       key = keys[len]
//       # firstly try to find the prop in @o.childOptions
//       option[key]  = @getPropByMod key: key, i: i, from: @o.childOptions
//       # if fail
//       # if the same option could be defined for parent and child
//       # get the option from childDefaults and continue
//       if @optionsIntersection[key]
//         option[key] ?= @getPropByMod key: key, i: i, from: @childDefaults
//         continue
//       # else check the option on parent
//       option[key] ?= @getPropByMod key: key, i: i, from: @o
//       option[key] ?= @getPropByMod key: key, i: i, from: @childDefaults
//     option

//   getPropByMod:(o)->
//     prop = (o.from or @o.childOptions)?[o.key]
//     if @h.isArray(prop) then prop[o.i % prop.length] else prop
//   generateRandomAngle:(i)->
//     randomness = parseFloat(@props.randomAngle)
//     randdomness = if randomness > 1 then 1 else if randomness < 0 then 0
//     @h.rand(0, if randomness then randomness*360 else 180)
//   generateRandomRadius:(i)->
//     randomness = parseFloat(@props.randomRadius)
//     randdomness = if randomness > 1 then 1 else if randomness < 0 then 0
//     start = if randomness then (1-randomness)*100 else (1-.5)*100
//     @h.rand(start, 100)/100

//   then:(o)->
//     @h.error "Burst's \"then\" method is under consideration,
//       you can vote for it in github repo issues"
//     # 1. merge @o and o
//     # 2. get i option from merged object
//     # 3. pass the object to transit then
//     # 4. transform self chain on run
//     # i = @transits.length
//     # while(i--)
//     #   @transits[i].then(o)
//     @

// module.exports = Burst

;

exports['default'] = Burst;
module.exports = exports['default'];
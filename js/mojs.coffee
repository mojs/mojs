
mojs =
  revision:   '0.120.1', isDebug: true
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
  Timeline    : require './tween/timeline'
  Tween       : require './tween/tween'
  tweener     : require './tween/tweener'
  easing      : require './easing'

mojs.h     = mojs.helpers
mojs.delta = mojs.h.delta


el = document.querySelector '#js-sprite'
path = 'M0,100 C4.00577744,92.3519448
        8.46993511,63.9895504 13.1512887,0.0901667719
        L21.3497674,0 C21.3497674,-1.77229627
        30.5883328,115.057627 42.9949846,0
        L48.1345723,0 C48.1345723,-0.774700647
        54.5357691,56.4124428 63.0607938,0
        L66.17434,0 C66.17434,-0.960124778
        70.5072591,29.23993 76.7835754,0
        L78.6555388,0 C78.6555388,0.000360393587
        81.8632425,16.4914595 86.0928122,0
        L87.2894428,0 C87.2894428,-0.761743229
        89.1622181,9.6571475 92.2144672,0
        L93.1382971,0 C93.1382971,-0.227841855
        94.7579743,4.40567189 96.9144218,0
        L97.5682773,0 C97.5682773,-0.227841855
        98.9774879,1.86613741 100,0'
path2 = 'M0,100 C0,100
          4.50292969,98.5458979 13.1655083,129.599609 C13.1655083,125.550292
          14.5922587,111.423982 14.9775391,100 C18.3436489,0.118817967
          21.3763133,100 21.3763133,100 C21.3763133,100
          24.1020114,143.589313 31.182035,100.498105 C31.328125,99.3914616
          32.96875,99.9925683 32.96875,99.9925683 C32.96875,99.9925683
          37.7038574,101.822997 43.1033936,119.37915 C43.4711914,114.650634
          44.145598,101.943658 44.3303223,99.9925683 C46.303074,64.0298992
          48.1256605,100 48.1256605,100 C48.1199951,99.9868613
          49.9071233,128.571455 54.5492038,100.31832 C54.644989,99.5927399
          55.7206794,99.9868608 55.7206794,99.9868608 C55.7206794,99.9868608
          59.6297405,101.239014 63.1699944,112.749862 C63.4111443,109.649569
          64.0730787,101.271818 64.1941948,99.9925683 C65.7125677,79.1142212
          66.3750221,100 66.3750221,100 C66.3750221,100
          75.6449112,100 76.9499613,100 C77.9891495,90.3360533
          78.7952818,100 78.7952818,100 C78.7952818,100
          85.3866104,100 86.163329,100 C86.7355255,95.6422743
          87.4229688,100 87.4229688,100 C87.4229688,100
          91.4811997,100 92.0937284,100 C92.6703705,97.8777651
          93.2507552,100 93.2507552,100 C93.2507552,100
          96.5008682,100 97.0045401,100 C97.4574799,98.8978552
          97.8392386,100 97.8392386,100 L100,100'
easing = mojs.easing.path path2

# easing2 = mojs.easing.path('M0,100, L100,0')

# ease = new mojs.easing.PathEasing path
# console.log ease.path.getPointAtLength 0

timeline = new mojs.Timeline
  delay:    1000
  duration: 20000
  onUpdate:(p)->
    # console.time 'sample'
    ease = easing(p)
    # ease = easing(p)
    # ease = easing(p)
    # ease = easing(p)
    # ease = easing(p)
    # console.log ease
    # console.log ease
    # ease2 = easing2(p)
    # console.log ease
    # console.timeEnd 'sample'
    # console.log p, ease
    # mojs.easing.bounce.out
    el.style.transform = "translateY(#{600*ease}px)"

tween = new mojs.Tween

tween.add timeline
tween.start()


### istanbul ignore next ###
if (typeof define is "function") and define.amd
  define "mojs", [], -> mojs
### istanbul ignore next ###
if (typeof module is "object") and (typeof module.exports is "object")
  module.exports = mojs
### istanbul ignore next ###
return window?.mojs = mojs

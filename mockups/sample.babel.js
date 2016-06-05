
var cache = function cache ( fun, samples, n ) {

  var samplesAmount = Math.pow( 10, n );
  var samplesStep   = 1/samplesAmount;

  function RoundNumber (input, numberDecimals)
  {
    numberDecimals = +numberDecimals || 0; // +var magic!

    var multiplyer = Math.pow(10.0, numberDecimals);

    return Math.round(input * multiplyer) / multiplyer;
  }

  window.RoundNumber = RoundNumber;

  var cached = function cached (p) {

    // return parseFloat(RoundNumber(obj.a, n));

    var newKey = RoundNumber(p, n);
    var sample = samples[ newKey.toString() ];

    if ( Math.abs(p - newKey) < samplesStep ) { return sample; }

    if ( p > newKey ) {
      var nextIndex = newKey + samplesStep;
      var nextValue = samples[ nextIndex ];
    } else {
      var nextIndex = newKey - samplesStep;
      var nextValue = samples[ nextIndex ];
    }

    var dLength = nextIndex - newKey;
    var dValue  = nextValue - sample;
    if ( dValue < samplesStep ) {
      return sample;
    }

    var progressScale = (p - newKey)/dLength;
    var coef = ( nextValue > sample ) ? -1 : 1;
    var scaledDifference = coef*progressScale*dValue;

    return sample + scaledDifference; 
  }
  
  cached.getSamples = () => { return samples; }

  return cached;
}

var preSample = function preSample ( fun, n = 4 ) {
  var samples = {},
      p       = 0;

  var samplesCount = Math.pow( 10, n );
  var step = 1/samplesCount;

  samples[ 0 ] = fun(0);
  for (var i = 0; i < samplesCount-1; i++) {
    p += step;

    var index = parseFloat(p.toFixed(n));
    samples[ index ] = fun( p );
  }
  samples[ 1 ] = fun(1);

  return cache( fun, samples, n );
}


var curvePath = mojs.easing.path( 'M0,100 C21.3776817,95.8051376 50,77.3262711 50,-700 C50,80.1708527 76.6222458,93.9449005 100,100' );

const id = function (p) {
  return p;
}

const scale = function (curve, n) {
  return (p) => { return n*curve(p); }
}

const increase = function (curve, n) {
  return (p) => { return n + curve(p); }
}

const scaleCurve = id(id(id(id(increase( scale( curvePath, .65 ), 1 )))));

var preScaleCurve = preSample( scaleCurve );

var simple = mojs.easing.cubic.out;

var p = 0;
var suite = new Benchmark.Suite;
// add tests
suite
.add('normal', function() {
  p += Math.random()/100;
  p = (p > 1) ? 0 : p;
  scaleCurve(p);
})
.add('cached', function() {
  p += Math.random()/100;
  p = (p > 1) ? 0 : p;
  preScaleCurve(p);
})
.add('simple', function() {
  p += Math.random()/100;
  p = (p > 1) ? 0 : p;
  simple(p);
})
.on('start', function () {
  console.log('setup');
})
.on('error', function (e) {
  console.log(e);
})
// add listeners
.on('cycle', function(event) {
  console.log(String(event.target));
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  // console.log(JSON.stringify( preScaleCurve.getSamples() ));
})
// run async
.run({ 'async': true });
import h from '../h';

/*
  Method to bootstrap approximation function.
  @private
  @param   {Object} Samples Object.
  @returns {Function} Approximate function.
*/
const _proximate = (samples) => {
    var n             = samples.base,
        samplesAmount = Math.pow( 10, n ),
        samplesStep   = 1/samplesAmount;

    function RoundNumber (input, numberDecimals)
    {
      numberDecimals = +numberDecimals || 0; // +var magic!

      var multiplyer = Math.pow(10.0, numberDecimals);

      return Math.round(input * multiplyer) / multiplyer;
    }

    var cached = function cached (p) {
      var newKey = RoundNumber(p, n),
          sample = samples[ newKey.toString() ];

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
/*
    Method to take samples of the function and call the _proximate
    method with the dunction and samples. Or if samples passed - pipe
    them to the _proximate method without sampling.
    @private
    @param {Function} Function to sample.
    @param {Number, Object, String} Precision or precomputed samples.
  */
const _sample = (fn, n = 4) => {

  const nType = typeof n;

  var samples = {};
  if (nType === 'number') {
    var p            = 0,
        samplesCount = Math.pow( 10, n ),
        step         = 1/samplesCount;

    samples[ 0 ] = fn(0);
    for (var i = 0; i < samplesCount-1; i++) {
      p += step;

      var index = parseFloat(p.toFixed(n));
      samples[ index ] = fn( p );
    }
    samples[ 1 ] = fn(1);

    samples.base = n;
  }
  else if (nType === 'object') { samples = n; }
  else if (nType === 'string' ) { samples = JSON.parse(n); }

  return Approximate._sample._proximate( samples );
}

const Approximate = { _sample, _proximate };
Approximate._sample._proximate = Approximate._proximate;

export default Approximate._sample;
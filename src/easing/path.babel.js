const parsePath = (path) => {
  const domPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  domPath.setAttributeNS(null, 'd', path);
  return domPath;
};

const sample = (path, n) => {
  const step = 1/n;
  const totalLength = path.getTotalLength();
  // create the samples map and save main properties
  const samples = [];
  // samples the path, `key` is in range of [0..1]
  for (var i = 0; i < n+1; i++) {
    const point = path.getPointAtLength(i*step*totalLength);
    samples[i] = {
      x: point.x/100,
      y: point.y/100
    };
  };

  return samples;
};


const findY = (key, samples, n) => {
  let start = 0;
  let end = samples.length-1;
  const step = 1/n;
  // find `start`/`end` bounds with binary search
  while (Math.abs(end - start) > 1) {
    const n = end - start;
    const middle = start + Math.floor(n/2);
    const value = samples[middle];

    if (key === value.x) { return value.y; }
    // shift a bound regarding the `value.x` value
    (key < value.x) ? (end = middle) : (start = middle);
  }
  // when the loop stops - we've found `start` and `end` bounds
  const value = samples[start];
  // if key is greate than `start` - normalize it
  if (key > value.x) {
    const nextValue = samples[start+1];
    if (nextValue !== void 0) {
      const diff = value.x - key;
      return value.y - ((nextValue.y - value.y)*(diff/step));
    }
  }

  return value.y;
};

const translateSamples = (samples, n) => {
  const map = new Map();
  const step = 1/n;
  // samples the path, `key` is in range of [0..1]
  for (var i = 0; i < n+1; i++) {
    const key = i*step;
    map.set(key, 1 - findY(key, samples, n));
  }

  return map;
};

const path = (path, n = 200) => {
  const preSamples = sample(parsePath(path), n);
  const samples = translateSamples(preSamples, n);
  const step = 1/n;

  return (p) => {
    const index = (p/step) | 0; // convert to integer
    const key = index*step; // get the key
    const nextKey = (index + 1)*step; // get the next key
    let y = samples.get(key); // get the y
    // if next key is present, calculate the normalized y
    // regarding the progress error
    if (nextKey <= 1)  {
      const nextY = samples.get(nextKey);
      y = y + ((nextY - y) * ((p - key)/step));
    }

    return y;
  };
};

export { path };

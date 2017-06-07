var Deltas = mojs.Deltas;
var stagger = mojs.stagger;
var Timeline = mojs.Timeline;
var helpers = mojs.__helpers__;
var Tweenable = helpers.Tweenable;

describe('`deltas` ->', function () {
  it('should wrap a class', function () {
    expect(typeof stagger(Deltas)).toBe('function');
  });

  it('should create timeline', function () {
    var DeltasStagger = stagger(Deltas);

    var timelineOptions = {};
    var deltasStagger = new DeltasStagger({
      timeline: timelineOptions
    });

    expect(Timeline.__mojsClass.isPrototypeOf(deltasStagger.timeline)).toBe(true);
    expect(deltasStagger.timeline._o).toBe(timelineOptions);
    expect(deltasStagger._o.timeline).not.toBeDefined();
  });

  it('should create `n` modules #el', function () {
    var DeltasStagger = stagger(Deltas);

    var deltasStagger = new DeltasStagger({
      el: {}
    });

    expect(deltasStagger._modules.length).toBe(1);
    expect(deltasStagger.timeline._items.length).toBe(1);
  });

  it('should create `n` modules #el with length', function () {
    var DeltasStagger = stagger(Deltas);

    var deltasStagger = new DeltasStagger({
      el: [{}, {}, {}]
    });

    expect(deltasStagger._modules.length).toBe(3);
    expect(deltasStagger.timeline._items.length).toBe(3);
  });

  it('should create `n` modules count', function () {
    var DeltasStagger = stagger(Deltas);

    var deltasStagger = new DeltasStagger({
      items: 5,
      el: [{}, {}, {}]
    });

    expect(deltasStagger._modules.length).toBe(5);
    expect(deltasStagger.timeline._items.length).toBe(5);
  });


  it('should stagger options', function () {
    var DeltasStagger = stagger(Deltas);

    var options = {
      items: 5,
      el: [{}, {}, {}],
      delay: 'stagger(200, 100)',
      z: { 'stagger(20rem)': 'stagger(10rem, 20rem)' }
    }

    var deltasStagger = new DeltasStagger(options);

    expect(deltasStagger._modules[0]._o.el).toBe(options.el[0]);
    expect(deltasStagger._modules[1]._o.el).toBe(options.el[1]);
    expect(deltasStagger._modules[2]._o.el).toBe(options.el[2]);
    expect(deltasStagger._modules[3]._o.el).toBe(options.el[0]);
    expect(deltasStagger._modules[4]._o.el).toBe(options.el[1]);

    expect(deltasStagger._modules[0]._o.delay).toBe(200 + 0*100);
    expect(deltasStagger._modules[1]._o.delay).toBe(200 + 1*100);
    expect(deltasStagger._modules[2]._o.delay).toBe(200 + 2*100);
    expect(deltasStagger._modules[3]._o.delay).toBe(200 + 3*100);
    expect(deltasStagger._modules[4]._o.delay).toBe(200 + 4*100);

    expect(deltasStagger._modules[0]._o.z).toEqual({ 'stagger(20rem)': 'stagger(10rem, 20rem)' });
    expect(deltasStagger._modules[1]._o.z).toEqual({ 'stagger(20rem)': 'stagger(10rem, 20rem)' });
    expect(deltasStagger._modules[2]._o.z).toEqual({ 'stagger(20rem)': 'stagger(10rem, 20rem)' });
    expect(deltasStagger._modules[3]._o.z).toEqual({ 'stagger(20rem)': 'stagger(10rem, 20rem)' });
    expect(deltasStagger._modules[4]._o.z).toEqual({ 'stagger(20rem)': 'stagger(10rem, 20rem)' });
  });

  it('should pass index to the Modules', function () {
    var DeltasStagger = stagger(Deltas);

    var options = {
      items: 5,
      el: [{}, {}, {}],
      delay: 'stagger(200, 100)',
      z: { 'stagger(20rem)': 'stagger(10rem, 20rem)' }
    }

    var deltasStagger = new DeltasStagger(options);

    expect(deltasStagger._modules[0].index).toBe(0);
    expect(deltasStagger._modules[1].index).toBe(1);
    expect(deltasStagger._modules[2].index).toBe(2);
    expect(deltasStagger._modules[3].index).toBe(3);
    expect(deltasStagger._modules[4].index).toBe(4);
  });

});

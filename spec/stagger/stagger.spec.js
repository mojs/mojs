var Deltas = mojs.Deltas;
var stagger = mojs.stagger;
var Timeline = mojs.Timeline;
var helpers = mojs.__helpers__;
var Tweenable = helpers.Tweenable;

describe('`stagger` ->', function () {
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
    expect(deltasStagger.timeline._o).toEqual(timelineOptions);
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
      el: mojs.stagger.map({}, {}, {}),
      delay: mojs.stagger.step(200, 100),
      z: {
        from: mojs.stagger.step('20rem'),
        to: mojs.stagger.step('10rem', '20rem')
      }
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

    expect(typeof deltasStagger._modules[0]._o.z.from).toBe('function');
    expect(typeof deltasStagger._modules[0]._o.z.to).toBe('function');

    expect(typeof deltasStagger._modules[1]._o.z.from).toBe('function');
    expect(typeof deltasStagger._modules[1]._o.z.to).toBe('function');

    expect(typeof deltasStagger._modules[2]._o.z.from).toBe('function');
    expect(typeof deltasStagger._modules[2]._o.z.to).toBe('function');

    expect(typeof deltasStagger._modules[3]._o.z.from).toBe('function');
    expect(typeof deltasStagger._modules[3]._o.z.to).toBe('function');

    expect(typeof deltasStagger._modules[4]._o.z.from).toBe('function');
    expect(typeof deltasStagger._modules[4]._o.z.to).toBe('function');
  });

  it('should pass `index` and `totalItemsInStagger` to the Modules', function () {
    var DeltasStagger = stagger(Deltas);

    var items = 5;

    var options = {
      items: items,
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

    expect(deltasStagger._modules[0]._totalItemsInStagger).toBe(items);
    expect(deltasStagger._modules[1]._totalItemsInStagger).toBe(items);
    expect(deltasStagger._modules[2]._totalItemsInStagger).toBe(items);
    expect(deltasStagger._modules[3]._totalItemsInStagger).toBe(items);
    expect(deltasStagger._modules[4]._totalItemsInStagger).toBe(items);
  });

  it('should remove the `items` from options', function () {
    var DeltasStagger = stagger(Deltas);

    var items = 5;

    var options = {
      items: items,
      el: [{}, {}, {}],
      delay: 'stagger(200, 100)',
      z: { 'stagger(20rem)': 'stagger(10rem, 20rem)' }
    }

    var deltasStagger = new DeltasStagger(options);

    expect(deltasStagger._modules[0]._o.items).not.toBeDefined();
    expect(deltasStagger._modules[1]._o.items).not.toBeDefined();
    expect(deltasStagger._modules[2]._o.items).not.toBeDefined();
    expect(deltasStagger._modules[3]._o.items).not.toBeDefined();
    expect(deltasStagger._modules[4]._o.items).not.toBeDefined();
  });
});

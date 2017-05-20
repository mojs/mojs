var helpers = mojs.__helpers__;
var Deltas = helpers.Deltas;
var ClassProto = helpers.ClassProto;

var options = {
  x: { '200': 300, delay: 200 },
  y: { '200': 300 },
  delay: 200,
  duration: 2000,
  onUpdate: function () {}
};

describe('`deltas` ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var deltas = Deltas();
      expect(ClassProto.isPrototypeOf(deltas)).toBe(true);
    });
  });

  describe('main tweenie ->', function() {
    it('should create the main tweenie', function () {
      var options = {
        x: { '200': 300, delay: 200 },
        y: { '200': 300 },
        delay: 200,
        duration: 2000,
        onUpdate: function () {}
      };

      var deltas = Deltas(options);

      expect(deltas._tween._props.delay).toBe(options.delay);
      expect(deltas._tween._props.duration).toBe(options.duration);
    });
  });

  describe('timeline ->', function() {
    it('should create the timeline', function () {
      var options = {
        x: { '200': 300, delay: 200 },
        y: { '200': 300 },
        delay: 200,
        duration: 2000,
        onUpdate: function () {},
        timeline: {}
      };

      var deltas = Deltas(options);

      expect(deltas._timeline).toBeDefined();
      expect(deltas._timeline._o).toBe(options.timeline);
      expect(deltas._timeline._items[0]).toBe(deltas._tween);
    });
  });

  describe('deltas parsing ->', function() {
    it('should hold deltas with tweenies', function () {
      var options = {
        x: { '200': 300, delay: 200 },
        y: { '200': 300 },
        f: 5,
        z: { '200': 300, delay: 200 }
      };

      var deltas = Deltas(options);

      expect(deltas._tweenDeltas.length).toBe(2);
      expect(deltas._plainDeltas.length).toBe(1);
      expect(deltas._timeline._items.length).toBe(1 + deltas._tweenDeltas.length);
      expect(deltas._staticProps.f).toBe(5);
      expect(deltas._timeline._items[0]).toBe(deltas._tween);
      expect(deltas._timeline._items[1]).toBe(deltas._tweenDeltas[0]);
      expect(deltas._timeline._items[2]).toBe(deltas._tweenDeltas[1]);
    });

    it('should pass `_el` as target to deltas', function () {
      var options = {
        x: { '200': 300, delay: 200 },
        y: { '200': 300 },
        f: 5,
        z: { '200': 300, delay: 200 },
        el: {}
      };

      var deltas = Deltas(options);

      expect(deltas._tweenDeltas[0]._props.target).toBe(deltas._el);
      expect(deltas._tweenDeltas[1]._props.target).toBe(deltas._el);
      expect(deltas._plainDeltas[0]._props.target).toBe(deltas._el);
    });
  });

  describe('`_upd_deltas` function ->', function() {
    it('should update the plain deltas', function () {
      var options = {
        x: { '200': 300, delay: 200 },
        y: { '200': 300 },
        f: 5,
        z: { '50': 125 }
      };

      var deltas = Deltas(options);

      spyOn(deltas._plainDeltas[0], 'update');
      spyOn(deltas._plainDeltas[1], 'update');

      var progress = Math.random();
      var isForward = true;
      deltas._upd_deltas(progress, progress, isForward);

      expect(deltas._plainDeltas[0].update).toHaveBeenCalledWith(progress, progress, isForward);
      expect(deltas._plainDeltas[1].update).toHaveBeenCalledWith(progress, progress, isForward);
    });

    it('should be called by main\'s tween onUpdate', function () {
      var options = {
        x: { '200': 300, delay: 200 },
        y: { '200': 300 },
        f: 5,
        z: { '50': 125 },
        onUpdate: function() {}
      };

      var deltas = Deltas(options);
      spyOn(deltas, '_upd_deltas');

      var progress = Math.random();
      var isForward = true;
      deltas._tween._props.onUpdate(progress, progress, isForward);

      expect(deltas._upd_deltas).toHaveBeenCalledWith(progress, progress, isForward);
    });

    it('should call the onUpdate', function () {
      var options = {
        el: {},
        x: { '200': 300, delay: 200 },
        y: { '200': 300 },
        f: 5,
        z: { '50': 125 },
        onUpdate: function() {}
      };

      spyOn(options, 'onUpdate');

      var deltas = Deltas(options);

      var progress = Math.random();
      var isForward = true;
      deltas._tween._props.onUpdate(progress, progress, isForward);

      expect(options.onUpdate).toHaveBeenCalledWith(progress, progress, isForward);
      expect(options.onUpdate.calls.count()).toBe(1);
    });
  });
});

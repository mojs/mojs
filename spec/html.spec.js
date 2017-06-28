var Html = mojs.Html;
var Deltas = mojs.Deltas;
var Tweenable = helpers.Tweenable;

var el = document.createElement('div');

describe('`html` ->', function () {
  describe('extension ->', function() {
    it('should extend `ClassProto`', function () {
      var html = new Html({
        el: el
      });
      expect(Tweenable.__mojsClass.isPrototypeOf(html)).toBe(true);
    });

    it('should have `_defaults`', function () {
      var html = new Html({
        el: el
      });
      expect(html._defaults.is3d).toBe(false);
      expect(html._defaults.el).toBe(null);
      expect(html._defaults.customProperties).toEqual({});

      expect(html._defaults.x).toBe(0);
      expect(html._defaults.y).toBe(0);
      expect(html._defaults.z).toBe(0);

      expect(html._defaults.skewX).toBe(0);
      expect(html._defaults.skewY).toBe(0);

      expect(html._defaults.angle).toBe(0);
      expect(html._defaults.angleX).toBe(0);
      expect(html._defaults.angleY).toBe(0);
      expect(html._defaults.angleZ).toBe(void 0);

      expect(html._defaults.scale).toBe(1);
      expect(html._defaults.scaleX).toBe(void 0);
      expect(html._defaults.scaleY).toBe(void 0);
      expect(html._defaults.scaleZ).toBe(void 0);
    });
  });

  describe('initialization ->', function() {
    it('should remove `is3d` from `_o`', function () {
      var is3d = true;
      var html = new Html({
          el: el,
          is3d: is3d
      });
      expect(html._props.is3d).not.toBeDefined();
      expect(html._is3d).toBe(is3d);
    });

    it('should parse `el` #object', function () {
      var el = document.createElement('div');
      var html = new Html({
          el: el
      });
      expect(html.el).toBe(el);
      expect(html._props.el).toBe(el.style);
    });

    it('should parse `el` #string', function () {
      var el = document.createElement('div');
      var id = 'js-el';
      el.setAttribute('id', id);
      document.body.appendChild(el);

      var html = new Html({
          el: '#' + id
      });
      expect(html.el).toBe(document.querySelector('#' + id));
      expect(html._props.el).toBe(html.el.style);
    });
  });

  describe('`deltas` creation ->', function() {
    it('should create `deltas`', function () {
      var is3d = true;
      var html = new Html({
          el: el,
          is3d: is3d
      });
      expect(Deltas.__mojsClass.isPrototypeOf(html._deltas)).toBe(true);
      // it should set `timeline` on `html` to `deltas.timeline`
      // to make the `deltas` work with `tweenable`
      expect(html.timeline).toBe(html._deltas.timeline);

      var opts = html._deltas._o;
      delete opts.customProperties;
      var props = html._props;
      delete props.customProperties;
      // should pass options
      expect(opts).toEqual(props);
    });
  });

  describe('`customProperties` options ->', function() {
    it('should pass `customProperties`', function () {
      var is3d = true;
      var html = new Html({
          el: el,
          is3d: is3d
      });
      var customProperties = html._deltas._o.customProperties;

      delete customProperties.render
      delete customProperties.pipeObj

      expect(customProperties).toEqual({
        x: {
          type: 'unit',
          isSkipRender: true
        },
        y: {
          type: 'unit',
          isSkipRender: true
        },
        z: {
          type: 'unit',
          isSkipRender: true
        },
        angle: {
          type: 'number',
          isSkipRender: true
        },
        angleX: {
          type: 'number',
          isSkipRender: true
        },
        angleY: {
          type: 'number',
          isSkipRender: true
        },
        angleZ: {
          type: 'number',
          isSkipRender: true
        },
        skewX: {
          type: 'number',
          isSkipRender: true
        },
        skewY: {
          type: 'number',
          isSkipRender: true
        },
        scale: {
          type: 'number',
          isSkipRender: true
        },
        scaleX: {
          type: 'number',
          isSkipRender: true
        },
        scaleY: {
          type: 'number',
          isSkipRender: true
        },
        scaleZ: {
          type: 'number',
          isSkipRender: true
        }
      });
    });
    it('should pass `render`', function () {
      var html = new Html({
          el: el,
          x: 20
      });
      var customProperties = html._deltas._o.customProperties;

      expect(customProperties.render).toBe(html._render);
    });

    it('should pass original `render` in `pipeObj`', function () {
      var render = function() {};
      var html = new Html({
          el: el,
          x: 20,
          customProperties: {
            render: render
          }
      });

      var htmlRender = html._deltas._o.customProperties.pipeObj.htmlRender;

      expect(htmlRender).toBe(render);
    });

    it('should pipe original `pipeObj`', function () {
      var pipeObj = {
        a: Math.random(),
        c: Math.random(),
      }
      var html = new Html({
          el: el,
          x: 20,
          customProperties: {
            pipeObj: pipeObj
          }
      });

      var resultPipeObj = html._deltas._o.customProperties.pipeObj;

      expect(resultPipeObj.a).toBe(pipeObj.a);
      expect(resultPipeObj.c).toBe(pipeObj.c);
    });

    it('should pass `supportRender` #2', function () {
      var render = function() {};
      var html = new Html({
          el: el,
          customProperties: {
            render: render
          }
      });

      var htmlRender = html._deltas._o.customProperties.pipeObj.htmlRender;

      expect(htmlRender).not.toBe(render);
      expect(typeof htmlRender).toBe('function');
    });

    it('should pass `render` #is3d', function () {
      var is3d = true;
      var html = new Html({
          el: el,
          is3d: is3d,
          x: 20
      });
      var customProperties = html._deltas._o.customProperties;

      expect(customProperties.render).toBe(html._render3d);
    });

    it('should pass `render` #3Dprops #z', function () {
      var html = new Html({
          el: el,
          z: 20
      });
      var customProperties = html._deltas._o.customProperties;

      expect(customProperties.render).toBe(html._render3d);
    });

    it('should pass `render` #3Dprops #angleX', function () {
      var html = new Html({
          el: el,
          angleX: 20
      });
      var customProperties = html._deltas._o.customProperties;

      expect(customProperties.render).toBe(html._render3d);
    });

    it('should pass `render` #3Dprops #angleY', function () {
      var html = new Html({
          el: el,
          angleY: 20
      });
      var customProperties = html._deltas._o.customProperties;

      expect(customProperties.render).toBe(html._render3d);
    });

    it('should pass `render` #3Dprops #angleZ', function () {
      var html = new Html({
          el: el,
          angleZ: 20
      });
      var customProperties = html._deltas._o.customProperties;

      expect(customProperties.render).toBe(html._render3d);
    });

    it('should not pass `render`', function () {
      var html = new Html({
          el: el,
          k: { 20: 30 }
      });
      var customProperties = html._deltas._o.customProperties;

      expect(customProperties.render).not.toBeDefined();
    });
  });

  describe('`_render` function ->', function() {
    it('should set transform on `props`', function () {
      var props = {};

      var html = new Html({ el: el });

      var support = {
        props: {
          x: '20px',
          y: '30%',
          angle: 40,
          skewX: 10,
          skewY: 20,
          scale: 1
        },
        pipeObj: {
          htmlRender: function() {}
        }
      };

      html._render(props, support);

      expect(props.transform).toBe('translate(20px, 30%) rotate(40deg) skew(10deg, 20deg) scale(1, 1)');
    });

    it('should set transform on `props` #scaleX #scaleY', function () {
      var props = {};

      var html = new Html({ el: el });

      var support = {
        props: {
          x: '20px',
          y: '30%',
          angle: 40,
          skewX: 10,
          skewY: 20,
          scaleX: 2,
          scaleY: 5
        },
        pipeObj: {
          htmlRender: function() {}
        }
      };

      html._render(props, support);

      expect(props.transform).toBe('translate(20px, 30%) rotate(40deg) skew(10deg, 20deg) scale(2, 5)');
    });

    it('should call original `render`', function () {
      var arg1 = null;
      var arg2 = null;

      var obj = {
        originalRender: function(a1, a2) {
          arg1 = a1;
          arg2 = a2;
        }
      };

      var props = {};
      var support = {
        props: {},
        pipeObj: {
          htmlRender: obj.originalRender,
        }
      };

      var html = new Html({
        el: el
      });

      spyOn(obj, 'originalRender');
      html._render(props, support);

      expect(arg1).toBe(props);
      expect(arg2).toBe(support);
    });
  });

  describe('`_render3d` function ->', function() {
    it('should set transform on `props`', function () {
      var props = {};

      var html = new Html({ el: el });
      var support = {
        props: {
          x: '20px',
          y: '30%',
          z: '20fr',
          angleX: 40,
          angleY: 20,
          angleZ: 10,
          skewX: 10,
          skewY: 20,
          scaleX: 1,
          scaleY: 2,
          scaleZ: 1.5
        },
        pipeObj: {
          htmlRender: function() {}
        }
      };

      html._render3d(props, support);

      expect(props.transform).toBe('translate3d(20px, 30%, 20fr) rotateX(40deg) rotateY(20deg) rotateZ(10deg) skew(10deg, 20deg) scale3d(1, 2, 1.5)');
    });

    it('should call original `render`', function () {
      var arg1 = null;
      var arg2 = null;

      var obj = {
        originalRender: function(a1, a2) {
          arg1 = a1;
          arg2 = a2;
        }
      };

      var props = {};
      var support = {
        props: {},
        pipeObj: {
          htmlRender: obj.originalRender
        }
      };

      var html = new Html({
        el: el
      });

      spyOn(obj, 'originalRender');
      html._render3d(props, support);

      expect(arg1).toBe(props);
      expect(arg2).toBe(support);
    });

    it('should fallback to props', function () {
      var props = {};

      var html = new Html({ el: el });

      var support = {
        props: {
          x: '20px',
          y: '30%',
          z: '20fr',
          angleX: 0,
          angleY: 0,
          angle: 40,
          skewX: 10,
          skewY: 20,
          scaleX: 1,
          scaleY: 2,
          scaleZ: 1.5
        },
        pipeObj: {
          htmlRender: function() {}
        }
      };

      html._render3d(props, support);

      expect(props.transform).toBe('translate3d(20px, 30%, 20fr) rotateX(0deg) rotateY(0deg) rotateZ(40deg) skew(10deg, 20deg) scale3d(1, 2, 1.5)');
    });
  });
});

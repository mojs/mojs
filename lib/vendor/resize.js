
/*!
  LegoMushroom @legomushroom http://legomushroom.com
  MIT License 2014
 */


/* istanbul ignore next */

(function() {
  (function() {
    var Main;
    Main = (function() {
      function Main(o) {
        this.o = o != null ? o : {};
        if (window.isAnyResizeEventInited) {
          return;
        }
        this.vars();
        this.redefineProto();
      }

      Main.prototype.vars = function() {
        window.isAnyResizeEventInited = true;
        this.allowedProtos = [HTMLDivElement, HTMLFormElement, HTMLLinkElement, HTMLBodyElement, HTMLParagraphElement, HTMLFieldSetElement, HTMLLegendElement, HTMLLabelElement, HTMLButtonElement, HTMLUListElement, HTMLOListElement, HTMLLIElement, HTMLHeadingElement, HTMLQuoteElement, HTMLPreElement, HTMLBRElement, HTMLFontElement, HTMLHRElement, HTMLModElement, HTMLParamElement, HTMLMapElement, HTMLTableElement, HTMLTableCaptionElement, HTMLImageElement, HTMLTableCellElement, HTMLSelectElement, HTMLInputElement, HTMLTextAreaElement, HTMLAnchorElement, HTMLObjectElement, HTMLTableColElement, HTMLTableSectionElement, HTMLTableRowElement];
        return this.timerElements = {
          img: 1,
          textarea: 1,
          input: 1,
          embed: 1,
          object: 1,
          svg: 1,
          canvas: 1,
          tr: 1,
          tbody: 1,
          thead: 1,
          tfoot: 1,
          a: 1,
          select: 1,
          option: 1,
          optgroup: 1,
          dl: 1,
          dt: 1,
          br: 1,
          basefont: 1,
          font: 1,
          col: 1,
          iframe: 1
        };
      };

      Main.prototype.redefineProto = function() {
        var i, it, proto, t;
        it = this;
        return t = (function() {
          var _i, _len, _ref, _results;
          _ref = this.allowedProtos;
          _results = [];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            proto = _ref[i];
            if (proto.prototype == null) {
              continue;
            }
            _results.push((function(proto) {
              var listener, remover;
              listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
              (function(listener) {
                var wrappedListener;
                wrappedListener = function() {
                  var option;
                  if (this !== window || this !== document) {
                    option = arguments[0] === 'onresize' && !this.isAnyResizeEventInited;
                    option && it.handleResize({
                      args: arguments,
                      that: this
                    });
                  }
                  return listener.apply(this, arguments);
                };
                if (proto.prototype.addEventListener) {
                  return proto.prototype.addEventListener = wrappedListener;
                } else if (proto.prototype.attachEvent) {
                  return proto.prototype.attachEvent = wrappedListener;
                }
              })(listener);
              remover = proto.prototype.removeEventListener || proto.prototype.detachEvent;
              return (function(remover) {
                var wrappedRemover;
                wrappedRemover = function() {
                  this.isAnyResizeEventInited = false;
                  this.iframe && this.removeChild(this.iframe);
                  return remover.apply(this, arguments);
                };
                if (proto.prototype.removeEventListener) {
                  return proto.prototype.removeEventListener = wrappedRemover;
                } else if (proto.prototype.detachEvent) {
                  return proto.prototype.detachEvent = wrappedListener;
                }
              })(remover);
            })(proto));
          }
          return _results;
        }).call(this);
      };

      Main.prototype.handleResize = function(args) {
        var computedStyle, el, iframe, isEmpty, isNoPos, isStatic, _ref;
        el = args.that;
        if (!this.timerElements[el.tagName.toLowerCase()]) {
          iframe = document.createElement('iframe');
          el.appendChild(iframe);
          iframe.style.width = '100%';
          iframe.style.height = '100%';
          iframe.style.position = 'absolute';
          iframe.style.zIndex = -999;
          iframe.style.opacity = 0;
          iframe.style.top = 0;
          iframe.style.left = 0;
          computedStyle = window.getComputedStyle ? getComputedStyle(el) : el.currentStyle;
          isNoPos = el.style.position === '';
          isStatic = computedStyle.position === 'static' && isNoPos;
          isEmpty = computedStyle.position === '' && el.style.position === '';
          if (isStatic || isEmpty) {
            el.style.position = 'relative';
          }
          if ((_ref = iframe.contentWindow) != null) {
            _ref.onresize = (function(_this) {
              return function(e) {
                return _this.dispatchEvent(el);
              };
            })(this);
          }
          el.iframe = iframe;
        } else {
          this.initTimer(el);
        }
        return el.isAnyResizeEventInited = true;
      };

      Main.prototype.initTimer = function(el) {
        var height, width;
        width = 0;
        height = 0;
        return this.interval = setInterval((function(_this) {
          return function() {
            var newHeight, newWidth;
            newWidth = el.offsetWidth;
            newHeight = el.offsetHeight;
            if (newWidth !== width || newHeight !== height) {
              _this.dispatchEvent(el);
              width = newWidth;
              return height = newHeight;
            }
          };
        })(this), this.o.interval || 62.5);
      };

      Main.prototype.dispatchEvent = function(el) {
        var e;
        if (document.createEvent) {
          e = document.createEvent('HTMLEvents');
          e.initEvent('onresize', false, false);
          return el.dispatchEvent(e);
        } else if (document.createEventObject) {
          e = document.createEventObject();
          return el.fireEvent('onresize', e);
        } else {
          return false;
        }
      };

      Main.prototype.destroy = function() {
        var i, it, proto, _i, _len, _ref, _results;
        clearInterval(this.interval);
        this.interval = null;
        window.isAnyResizeEventInited = false;
        it = this;
        _ref = this.allowedProtos;
        _results = [];
        for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
          proto = _ref[i];
          if (proto.prototype == null) {
            continue;
          }
          _results.push((function(proto) {
            var listener;
            listener = proto.prototype.addEventListener || proto.prototype.attachEvent;
            if (proto.prototype.addEventListener) {
              proto.prototype.addEventListener = Element.prototype.addEventListener;
            } else if (proto.prototype.attachEvent) {
              proto.prototype.attachEvent = Element.prototype.attachEvent;
            }
            if (proto.prototype.removeEventListener) {
              return proto.prototype.removeEventListener = Element.prototype.removeEventListener;
            } else if (proto.prototype.detachEvent) {
              return proto.prototype.detachEvent = Element.prototype.detachEvent;
            }
          })(proto));
        }
        return _results;
      };

      return Main;

    })();
    if ((typeof define === "function") && define.amd) {
      return define("any-resize-event", [], function() {
        return new Main;
      });
    } else if ((typeof module === "object") && (typeof module.exports === "object")) {
      return module.exports = new Main;
    } else {
      if (typeof window !== "undefined" && window !== null) {
        window.AnyResizeEvent = Main;
      }
      return typeof window !== "undefined" && window !== null ? window.anyResizeEvent = new Main : void 0;
    }
  })();

}).call(this);

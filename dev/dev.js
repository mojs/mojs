/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@mojs/player/build/mojs-player.min.js":
/*!************************************************************!*\
  !*** ./node_modules/@mojs/player/build/mojs-player.min.js ***!
  \************************************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,function(){return function(t){function e(i){if(n[i])return n[i].exports;var s=n[i]={exports:{},id:i,loaded:!1};return t[i].call(s.exports,s,s.exports,e),s.loaded=!0,s.exports}var n={};return e.m=t,e.c=n,e.p="build/",e(0)}([function(t,e,n){t.exports=n(1)},function(t,e,n){var i;(function(t,s){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var r=n(3),a=o(r),u=n(70),l=o(u),p=n(72),c=o(p),h=n(77),d=o(h),f=n(78),_=o(f),v=n(79),y=o(v),g=n(87),m=(o(g),n(88)),b=o(m),x=n(89),S=o(x),w=n(90),P=o(w),T=n(110),k=o(T),C=n(122),E=o(C),M=n(134),j=o(M),L=n(142),O=o(L),B=n(146),D=o(B),I=n(154),R=o(I),A=n(155),F=o(A);n(159);var N=n(161),z=function(t){function e(n){if((0,d["default"])(this,e),"undefined"==typeof mojs)throw new Error("MojsPlayer relies on mojs^0.225.2, please include it before player initialization. [ https://github.com/mojs/mojs ] ");return(0,_["default"])(this,t.call(this,n))}return(0,y["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.isSaveState=!0,this._defaults.isPlaying=!1,this._defaults.progress=0,this._defaults.isRepeat=!1,this._defaults.isBounds=!1,this._defaults.leftBound=0,this._defaults.rightBound=1,this._defaults.isSpeed=!1,this._defaults.speed=1,this._defaults.isHidden=!1,this._defaults.precision=.1,this._defaults.name="mojs-player",this._defaults.onToggleHide=null,this._defaults.onPlayStateChange=null,this._defaults.onSeekStart=null,this._defaults.onSeekEnd=null,this._defaults.onProgress=null,this._play=this._play.bind(this),this.revision="1.0.1";var e=this._fallbackTo(this._o.name,this._defaults.name);e+=e===this._defaults.name?"":"__"+this._defaults.name,this._localStorage=e+"__"+this._hashCode(e)},e.prototype._extendDefaults=function(){this._props={};var t=this._props,e=this._o,n=this._defaults;t.isSaveState=this._fallbackTo(e.isSaveState,n.isSaveState);var i=t.isSaveState?JSON.parse(localStorage.getItem(this._localStorage))||{}:{};for(var s in n){var o=this._fallbackTo(i[s],e[s]);this._assignProp(s,this._fallbackTo(o,n[s]))}this._props["raw-speed"]=this._fallbackTo(i["raw-speed"],.5)},e.prototype._keyUp=function(t){if(t.altKey)switch(t.keyCode){case 80:this._props.isPlaying=!this._props.isPlaying,this._onPlayStateChange(this._props.isPlaying);break;case 189:this.playButton.off(),this.playerSlider.decreaseProgress(t.shiftKey?.1:.01);break;case 187:this.playButton.off(),this.playerSlider.increaseProgress(t.shiftKey?.1:.01);break;case 83:this._onStop();break;case 82:this._props.isRepeat=!this._props.isRepeat;var e=this._props.isRepeat?"on":"off";this.repeatButton[e]();break;case 66:this._props.isBounds=!this._props.isBounds;var e=this._props.isBounds?"on":"off";this.boundsButton[e]();break;case 72:this._props.isHidden=!this._props.isHidden,this._onHideStateChange(this._props.isHidden);var e=this._props.isHidden?"on":"off";this.hideButton[e]();break;case 81:this.speedControl.reset();break;case 50:this.speedControl.decreaseSpeed(t.shiftKey?.05:.01);break;case 51:this.speedControl.increaseSpeed(t.shiftKey?.05:.01)}},e.prototype._vars=function(){this._hideCount=0},e.prototype._render=function(){this._initTimeline();var e=this._props,n="mojs-player";new b["default"]({prefix:this._props.prefix});t.prototype._render.call(this),this.el.classList.add(N[n]),this.el.setAttribute("id","js-mojs-player");var i=this._createChild("div",N[n+"__left"]),s=this._createChild("div",N[n+"__mid"]),o=this._createChild("div",N[n+"__right"]);this.repeatButton=new D["default"]({parent:i,isOn:e.isRepeat,onStateChange:this._onRepeatStateChange.bind(this),prefix:this._props.prefix}),this.playerSlider=new P["default"]({parent:s,isBounds:e.isBounds,leftProgress:e.leftBound,rightProgress:e.rightBound,progress:e.progress,onLeftProgress:this._onLeftProgress.bind(this),onProgress:this._onProgress.bind(this),onRightProgress:this._onRightProgress.bind(this),onSeekStart:this._onSeekStart.bind(this),onSeekEnd:this._onSeekEnd.bind(this)}),this.boundsButton=new R["default"]({isOn:e.isBounds,parent:i,onStateChange:this._boundsStateChange.bind(this),prefix:this._props.prefix}),this.speedControl=new E["default"]({parent:i,speed:e.speed,isOn:e.isSpeed,onSpeedChange:this._onSpeedChange.bind(this),onIsSpeed:this._onIsSpeed.bind(this),prefix:this._props.prefix});this.stopButton=new O["default"]({parent:i,isPrepend:!0,onPointerUp:this._onStop.bind(this),prefix:this._props.prefix}),this.playButton=new j["default"]({parent:i,isOn:e.isPlaying,isPrepend:!0,onStateChange:this._onPlayStateChange.bind(this),prefix:this._props.prefix}),this.mojsButton=new k["default"]({parent:o,className:N[n+"__mojs-logo"],icon:"mojs",target:"_blank",link:"https://github.com/mojs/mojs-player",title:"mo • js",prefix:this._props.prefix}),this.hideButton=new F["default"]({parent:this.el,className:N[n+"__hide-button"],isOn:e.isHidden,onStateChange:this._onHideStateChange.bind(this),prefix:this._props.prefix}),this._listen()},e.prototype._listen=function(){var t="onpagehide"in window?"pagehide":"beforeunload";window.addEventListener(t,this._onUnload.bind(this)),document.addEventListener("keyup",this._keyUp.bind(this))},e.prototype._onSeekStart=function(t){this._sysTween.pause();var e=this._props.onSeekStart;this._isFunction(e)&&e(t)},e.prototype._onSeekEnd=function(t){var e=this;clearTimeout(this._endTimer),this._endTimer=setTimeout(function(){e._props.isPlaying&&e._play()},20)},e.prototype._initTimeline=function(){var t=this;this.timeline=new mojs.Timeline({});var e=this._o.add,n="undefined"==typeof e;n||(e=e.timeline||e.tween||e);var i=!!e.setProgress;if(n||!i)throw new Error("MojsPlayer expects Tween/Timeline/Module as `add` option in constructor call. [ new MojsPlayer({ add: new mojs.Tween }); ]");this.timeline.add(this._o.add);var s=this.timeline._props,o=void 0!==s.repeatTime?s:s.delay+s.duration;this._sysTween=new mojs.Tween({easing:"linear.none",duration:o,onUpdate:this._onSysProgress.bind(this),onComplete:this._onSysTweenComplete.bind(this),onPlaybackStop:function(){t._setPlayState("off")},onPlaybackPause:function(){t._setPlayState("off")},onPlaybackStart:function(){t._setPlayState("on")}})},e.prototype._onSysProgress=function(t){this.playerSlider.setTrackProgress(t);var e=this._props.isBounds?this._props.rightBound:1,n=this._props.isBounds?this._props.leftBound:-1;t<n-.01&&0!==t&&(this._reset(),requestAnimationFrame(this._play)),t>=e&&(this._reset(1===e),this._props.isRepeat?requestAnimationFrame(this._play):this._props.isPlaying=!1)},e.prototype._play=function(){var t=this._props,e=t.isBounds?t.leftBound:t.progress,n=t.progress>=this._getBound("right")?e:t.progress;1===n&&(n=t.isBounds?t.leftBound:0),0!==n&&this._sysTween.setProgress(n),this._sysTween.play()},e.prototype._reset=function(t){this._sysTween.reset(),this.timeline.reset()},e.prototype._setPlayState=function(t){var e=this;clearTimeout(this._playTimeout),this._playTimeout=setTimeout(function(){e.playButton&&e.playButton[t](!1)},20)},e.prototype._onSysTweenComplete=function(t){},e.prototype._onPlayStateChange=function(t){this._props.isPlaying=t,t?this._play():this._sysTween.pause();var e=this._props.onPlayStateChange;this._isFunction(e)&&e(t)},e.prototype._onHideStateChange=function(t){this._props.isHidden=t;var e=this._props.onToggleHide;this._isFunction(e)&&e(t);var n=t?"add":"remove";this.el.classList[n](N["is-hidden"]),1===this._hideCount++&&this.el.classList.add(N["is-transition"])},e.prototype._onStop=function(){var t=this._props;t.isPlaying=!1;var e=t.isBounds?t.leftBound:0;this._sysTween.setProgress(e+.01),this._sysTween.setProgress(e),this._reset()},e.prototype._onRepeatStateChange=function(t){this._props.isRepeat=t},e.prototype._boundsStateChange=function(t){this.playerSlider._props.isBounds=t,this.playerSlider[(t?"enable":"disable")+"Bounds"](),this._props.isBounds=t},e.prototype._onSpeedChange=function(t,e){this._props["raw-speed"]=e,this._props.speed=t,this._sysTween.setSpeed(t)},e.prototype._onIsSpeed=function(t){this._props.isSpeed=t},e.prototype._onLeftProgress=function(t){this._props.leftBound=t},e.prototype._onProgress=function(t){this._props.progress=t,this.timeline.setProgress(t)},e.prototype._onRightProgress=function(t){this._props.rightBound=t},e.prototype._onUnload=function(t){if(!this._props.isSaveState)return localStorage.removeItem(this._localStorage);var e=(0,c["default"])({},this._props);delete e.parent,delete e.className,delete e.isSaveState,delete e.precision,localStorage.setItem(this._localStorage,(0,l["default"])(e))},e.prototype._fallbackTo=function(t,e){return null!=t?t:e},e.prototype._getBound=function(t){var e=this._props,n="left"===t?0:1;return e.isBounds?e[t+"Bound"]:n},e.prototype._defer=function(t){setTimeout(t.bind(this),1)},e.prototype._hashCode=function(t){var e,n,i,s=0;if(0===t.length)return s;for(e=0,i=t.length;e<i;e++)n=t.charCodeAt(e),s=(s<<5)-s+n,s|=0;return Math.abs(s)},e.prototype._isFunction=function(t){return"function"==typeof t},e}(S["default"]);i=function(){return z}.call(e,n,e,t),!(void 0!==i&&(t.exports=i)),"object"===(0,a["default"])(t)&&"object"===(0,a["default"])(t.exports)&&(t.exports=z);var X="undefined"!=typeof s?s:window;X.MojsPlayer=z,e["default"]=z}).call(e,n(2)(t),function(){return this}())},function(t,e){t.exports=function(t){return t.webpackPolyfill||(t.deprecate=function(){},t.paths=[],t.children=[],t.webpackPolyfill=1),t}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(4),o=i(s),r=n(55),a=i(r),u="function"==typeof a["default"]&&"symbol"==typeof o["default"]?function(t){return typeof t}:function(t){return t&&"function"==typeof a["default"]&&t.constructor===a["default"]&&t!==a["default"].prototype?"symbol":typeof t};e["default"]="function"==typeof a["default"]&&"symbol"===u(o["default"])?function(t){return"undefined"==typeof t?"undefined":u(t)}:function(t){return t&&"function"==typeof a["default"]&&t.constructor===a["default"]&&t!==a["default"].prototype?"symbol":"undefined"==typeof t?"undefined":u(t)}},function(t,e,n){t.exports={"default":n(5),__esModule:!0}},function(t,e,n){n(6),n(50),t.exports=n(54).f("iterator")},function(t,e,n){"use strict";var i=n(7)(!0);n(10)(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=i(e,n),this._i+=t.length,{value:t,done:!1})})},function(t,e,n){var i=n(8),s=n(9);t.exports=function(t){return function(e,n){var o,r,a=String(s(e)),u=i(n),l=a.length;return u<0||u>=l?t?"":void 0:(o=a.charCodeAt(u),o<55296||o>56319||u+1===l||(r=a.charCodeAt(u+1))<56320||r>57343?t?a.charAt(u):o:t?a.slice(u,u+2):(o-55296<<10)+(r-56320)+65536)}}},function(t,e){var n=Math.ceil,i=Math.floor;t.exports=function(t){return isNaN(t=+t)?0:(t>0?i:n)(t)}},function(t,e){t.exports=function(t){if(void 0==t)throw TypeError("Can't call method on  "+t);return t}},function(t,e,n){"use strict";var i=n(11),s=n(12),o=n(28),r=n(17),a=n(29),u=n(30),l=n(46),p=n(48),c=n(47)("iterator"),h=!([].keys&&"next"in[].keys()),d="@@iterator",f="keys",_="values",v=function(){return this};t.exports=function(t,e,n,y,g,m,b){u(n,e,y);var x,S,w,P=function(t){if(!h&&t in E)return E[t];switch(t){case f:return function(){return new n(this,t)};case _:return function(){return new n(this,t)}}return function(){return new n(this,t)}},T=e+" Iterator",k=g==_,C=!1,E=t.prototype,M=E[c]||E[d]||g&&E[g],j=M||P(g),L=g?k?P("entries"):j:void 0,O="Array"==e?E.entries||M:M;if(O&&(w=p(O.call(new t)),w!==Object.prototype&&w.next&&(l(w,T,!0),i||"function"==typeof w[c]||r(w,c,v))),k&&M&&M.name!==_&&(C=!0,j=function(){return M.call(this)}),i&&!b||!h&&!C&&E[c]||r(E,c,j),a[e]=j,a[T]=v,g)if(x={values:k?j:P(_),keys:m?j:P(f),entries:L},b)for(S in x)S in E||o(E,S,x[S]);else s(s.P+s.F*(h||C),e,x);return x}},function(t,e){t.exports=!0},function(t,e,n){var i=n(13),s=n(14),o=n(15),r=n(17),a=n(27),u="prototype",l=function(t,e,n){var p,c,h,d=t&l.F,f=t&l.G,_=t&l.S,v=t&l.P,y=t&l.B,g=t&l.W,m=f?s:s[e]||(s[e]={}),b=m[u],x=f?i:_?i[e]:(i[e]||{})[u];f&&(n=e);for(p in n)c=!d&&x&&void 0!==x[p],c&&a(m,p)||(h=c?x[p]:n[p],m[p]=f&&"function"!=typeof x[p]?n[p]:y&&c?o(h,i):g&&x[p]==h?function(t){var e=function(e,n,i){if(this instanceof t){switch(arguments.length){case 0:return new t;case 1:return new t(e);case 2:return new t(e,n)}return new t(e,n,i)}return t.apply(this,arguments)};return e[u]=t[u],e}(h):v&&"function"==typeof h?o(Function.call,h):h,v&&((m.virtual||(m.virtual={}))[p]=h,t&l.R&&b&&!b[p]&&r(b,p,h)))};l.F=1,l.G=2,l.S=4,l.P=8,l.B=16,l.W=32,l.U=64,l.R=128,t.exports=l},function(t,e){var n=t.exports="undefined"!=typeof window&&window.Math==Math?window:"undefined"!=typeof self&&self.Math==Math?self:Function("return this")();"number"==typeof __g&&(__g=n)},function(t,e){var n=t.exports={version:"2.6.9"};"number"==typeof __e&&(__e=n)},function(t,e,n){var i=n(16);t.exports=function(t,e,n){if(i(t),void 0===e)return t;switch(n){case 1:return function(n){return t.call(e,n)};case 2:return function(n,i){return t.call(e,n,i)};case 3:return function(n,i,s){return t.call(e,n,i,s)}}return function(){return t.apply(e,arguments)}}},function(t,e){t.exports=function(t){if("function"!=typeof t)throw TypeError(t+" is not a function!");return t}},function(t,e,n){var i=n(18),s=n(26);t.exports=n(22)?function(t,e,n){return i.f(t,e,s(1,n))}:function(t,e,n){return t[e]=n,t}},function(t,e,n){var i=n(19),s=n(21),o=n(25),r=Object.defineProperty;e.f=n(22)?Object.defineProperty:function(t,e,n){if(i(t),e=o(e,!0),i(n),s)try{return r(t,e,n)}catch(a){}if("get"in n||"set"in n)throw TypeError("Accessors not supported!");return"value"in n&&(t[e]=n.value),t}},function(t,e,n){var i=n(20);t.exports=function(t){if(!i(t))throw TypeError(t+" is not an object!");return t}},function(t,e){t.exports=function(t){return"object"==typeof t?null!==t:"function"==typeof t}},function(t,e,n){t.exports=!n(22)&&!n(23)(function(){return 7!=Object.defineProperty(n(24)("div"),"a",{get:function(){return 7}}).a})},function(t,e,n){t.exports=!n(23)(function(){return 7!=Object.defineProperty({},"a",{get:function(){return 7}}).a})},function(t,e){t.exports=function(t){try{return!!t()}catch(e){return!0}}},function(t,e,n){var i=n(20),s=n(13).document,o=i(s)&&i(s.createElement);t.exports=function(t){return o?s.createElement(t):{}}},function(t,e,n){var i=n(20);t.exports=function(t,e){if(!i(t))return t;var n,s;if(e&&"function"==typeof(n=t.toString)&&!i(s=n.call(t)))return s;if("function"==typeof(n=t.valueOf)&&!i(s=n.call(t)))return s;if(!e&&"function"==typeof(n=t.toString)&&!i(s=n.call(t)))return s;throw TypeError("Can't convert object to primitive value")}},function(t,e){t.exports=function(t,e){return{enumerable:!(1&t),configurable:!(2&t),writable:!(4&t),value:e}}},function(t,e){var n={}.hasOwnProperty;t.exports=function(t,e){return n.call(t,e)}},function(t,e,n){t.exports=n(17)},function(t,e){t.exports={}},function(t,e,n){"use strict";var i=n(31),s=n(26),o=n(46),r={};n(17)(r,n(47)("iterator"),function(){return this}),t.exports=function(t,e,n){t.prototype=i(r,{next:s(1,n)}),o(t,e+" Iterator")}},function(t,e,n){var i=n(19),s=n(32),o=n(44),r=n(41)("IE_PROTO"),a=function(){},u="prototype",l=function(){var t,e=n(24)("iframe"),i=o.length,s="<",r=">";for(e.style.display="none",n(45).appendChild(e),e.src="javascript:",t=e.contentWindow.document,t.open(),t.write(s+"script"+r+"document.F=Object"+s+"/script"+r),t.close(),l=t.F;i--;)delete l[u][o[i]];return l()};t.exports=Object.create||function(t,e){var n;return null!==t?(a[u]=i(t),n=new a,a[u]=null,n[r]=t):n=l(),void 0===e?n:s(n,e)}},function(t,e,n){var i=n(18),s=n(19),o=n(33);t.exports=n(22)?Object.defineProperties:function(t,e){s(t);for(var n,r=o(e),a=r.length,u=0;a>u;)i.f(t,n=r[u++],e[n]);return t}},function(t,e,n){var i=n(34),s=n(44);t.exports=Object.keys||function(t){return i(t,s)}},function(t,e,n){var i=n(27),s=n(35),o=n(38)(!1),r=n(41)("IE_PROTO");t.exports=function(t,e){var n,a=s(t),u=0,l=[];for(n in a)n!=r&&i(a,n)&&l.push(n);for(;e.length>u;)i(a,n=e[u++])&&(~o(l,n)||l.push(n));return l}},function(t,e,n){var i=n(36),s=n(9);t.exports=function(t){return i(s(t))}},function(t,e,n){var i=n(37);t.exports=Object("z").propertyIsEnumerable(0)?Object:function(t){return"String"==i(t)?t.split(""):Object(t)}},function(t,e){var n={}.toString;t.exports=function(t){return n.call(t).slice(8,-1)}},function(t,e,n){var i=n(35),s=n(39),o=n(40);t.exports=function(t){return function(e,n,r){var a,u=i(e),l=s(u.length),p=o(r,l);if(t&&n!=n){for(;l>p;)if(a=u[p++],a!=a)return!0}else for(;l>p;p++)if((t||p in u)&&u[p]===n)return t||p||0;return!t&&-1}}},function(t,e,n){var i=n(8),s=Math.min;t.exports=function(t){return t>0?s(i(t),9007199254740991):0}},function(t,e,n){var i=n(8),s=Math.max,o=Math.min;t.exports=function(t,e){return t=i(t),t<0?s(t+e,0):o(t,e)}},function(t,e,n){var i=n(42)("keys"),s=n(43);t.exports=function(t){return i[t]||(i[t]=s(t))}},function(t,e,n){var i=n(14),s=n(13),o="__core-js_shared__",r=s[o]||(s[o]={});(t.exports=function(t,e){return r[t]||(r[t]=void 0!==e?e:{})})("versions",[]).push({version:i.version,mode:n(11)?"pure":"global",copyright:"© 2019 Denis Pushkarev (zloirock.ru)"})},function(t,e){var n=0,i=Math.random();t.exports=function(t){return"Symbol(".concat(void 0===t?"":t,")_",(++n+i).toString(36))}},function(t,e){t.exports="constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")},function(t,e,n){var i=n(13).document;t.exports=i&&i.documentElement},function(t,e,n){var i=n(18).f,s=n(27),o=n(47)("toStringTag");t.exports=function(t,e,n){t&&!s(t=n?t:t.prototype,o)&&i(t,o,{configurable:!0,value:e})}},function(t,e,n){var i=n(42)("wks"),s=n(43),o=n(13).Symbol,r="function"==typeof o,a=t.exports=function(t){return i[t]||(i[t]=r&&o[t]||(r?o:s)("Symbol."+t))};a.store=i},function(t,e,n){var i=n(27),s=n(49),o=n(41)("IE_PROTO"),r=Object.prototype;t.exports=Object.getPrototypeOf||function(t){return t=s(t),i(t,o)?t[o]:"function"==typeof t.constructor&&t instanceof t.constructor?t.constructor.prototype:t instanceof Object?r:null}},function(t,e,n){var i=n(9);t.exports=function(t){return Object(i(t))}},function(t,e,n){n(51);for(var i=n(13),s=n(17),o=n(29),r=n(47)("toStringTag"),a="CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,TextTrackList,TouchList".split(","),u=0;u<a.length;u++){var l=a[u],p=i[l],c=p&&p.prototype;c&&!c[r]&&s(c,r,l),o[l]=o.Array}},function(t,e,n){"use strict";var i=n(52),s=n(53),o=n(29),r=n(35);t.exports=n(10)(Array,"Array",function(t,e){this._t=r(t),this._i=0,this._k=e},function(){var t=this._t,e=this._k,n=this._i++;return!t||n>=t.length?(this._t=void 0,s(1)):"keys"==e?s(0,n):"values"==e?s(0,t[n]):s(0,[n,t[n]])},"values"),o.Arguments=o.Array,i("keys"),i("values"),i("entries")},function(t,e){t.exports=function(){}},function(t,e){t.exports=function(t,e){return{value:e,done:!!t}}},function(t,e,n){e.f=n(47)},function(t,e,n){t.exports={"default":n(56),__esModule:!0}},function(t,e,n){n(57),n(67),n(68),n(69),t.exports=n(14).Symbol},function(t,e,n){"use strict";var i=n(13),s=n(27),o=n(22),r=n(12),a=n(28),u=n(58).KEY,l=n(23),p=n(42),c=n(46),h=n(43),d=n(47),f=n(54),_=n(59),v=n(60),y=n(63),g=n(19),m=n(20),b=n(49),x=n(35),S=n(25),w=n(26),P=n(31),T=n(64),k=n(66),C=n(61),E=n(18),M=n(33),j=k.f,L=E.f,O=T.f,B=i.Symbol,D=i.JSON,I=D&&D.stringify,R="prototype",A=d("_hidden"),F=d("toPrimitive"),N={}.propertyIsEnumerable,z=p("symbol-registry"),X=p("symbols"),U=p("op-symbols"),H=Object[R],W="function"==typeof B&&!!C.f,Y=i.QObject,$=!Y||!Y[R]||!Y[R].findChild,q=o&&l(function(){return 7!=P(L({},"a",{get:function(){return L(this,"a",{value:7}).a}})).a})?function(t,e,n){var i=j(H,e);i&&delete H[e],L(t,e,n),i&&t!==H&&L(H,e,i)}:L,V=function(t){var e=X[t]=P(B[R]);return e._k=t,e},G=W&&"symbol"==typeof B.iterator?function(t){return"symbol"==typeof t}:function(t){return t instanceof B},Z=function(t,e,n){return t===H&&Z(U,e,n),g(t),e=S(e,!0),g(n),s(X,e)?(n.enumerable?(s(t,A)&&t[A][e]&&(t[A][e]=!1),n=P(n,{enumerable:w(0,!1)})):(s(t,A)||L(t,A,w(1,{})),t[A][e]=!0),q(t,e,n)):L(t,e,n)},J=function(t,e){g(t);for(var n,i=v(e=x(e)),s=0,o=i.length;o>s;)Z(t,n=i[s++],e[n]);return t},K=function(t,e){return void 0===e?P(t):J(P(t),e)},Q=function(t){var e=N.call(this,t=S(t,!0));return!(this===H&&s(X,t)&&!s(U,t))&&(!(e||!s(this,t)||!s(X,t)||s(this,A)&&this[A][t])||e)},tt=function(t,e){if(t=x(t),e=S(e,!0),t!==H||!s(X,e)||s(U,e)){var n=j(t,e);return!n||!s(X,e)||s(t,A)&&t[A][e]||(n.enumerable=!0),n}},et=function(t){for(var e,n=O(x(t)),i=[],o=0;n.length>o;)s(X,e=n[o++])||e==A||e==u||i.push(e);return i},nt=function(t){for(var e,n=t===H,i=O(n?U:x(t)),o=[],r=0;i.length>r;)!s(X,e=i[r++])||n&&!s(H,e)||o.push(X[e]);return o};W||(B=function(){if(this instanceof B)throw TypeError("Symbol is not a constructor!");var t=h(arguments.length>0?arguments[0]:void 0),e=function(n){this===H&&e.call(U,n),s(this,A)&&s(this[A],t)&&(this[A][t]=!1),q(this,t,w(1,n))};return o&&$&&q(H,t,{configurable:!0,set:e}),V(t)},a(B[R],"toString",function(){return this._k}),k.f=tt,E.f=Z,n(65).f=T.f=et,n(62).f=Q,C.f=nt,o&&!n(11)&&a(H,"propertyIsEnumerable",Q,!0),f.f=function(t){return V(d(t))}),r(r.G+r.W+r.F*!W,{Symbol:B});for(var it="hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables".split(","),st=0;it.length>st;)d(it[st++]);for(var ot=M(d.store),rt=0;ot.length>rt;)_(ot[rt++]);r(r.S+r.F*!W,"Symbol",{"for":function(t){return s(z,t+="")?z[t]:z[t]=B(t)},keyFor:function(t){if(!G(t))throw TypeError(t+" is not a symbol!");for(var e in z)if(z[e]===t)return e},useSetter:function(){$=!0},useSimple:function(){$=!1}}),r(r.S+r.F*!W,"Object",{create:K,defineProperty:Z,defineProperties:J,getOwnPropertyDescriptor:tt,getOwnPropertyNames:et,getOwnPropertySymbols:nt});var at=l(function(){C.f(1)});r(r.S+r.F*at,"Object",{getOwnPropertySymbols:function(t){return C.f(b(t))}}),D&&r(r.S+r.F*(!W||l(function(){var t=B();return"[null]"!=I([t])||"{}"!=I({a:t})||"{}"!=I(Object(t))})),"JSON",{stringify:function(t){for(var e,n,i=[t],s=1;arguments.length>s;)i.push(arguments[s++]);if(n=e=i[1],(m(e)||void 0!==t)&&!G(t))return y(e)||(e=function(t,e){if("function"==typeof n&&(e=n.call(this,t,e)),!G(e))return e}),i[1]=e,I.apply(D,i)}}),B[R][F]||n(17)(B[R],F,B[R].valueOf),c(B,"Symbol"),c(Math,"Math",!0),c(i.JSON,"JSON",!0)},function(t,e,n){var i=n(43)("meta"),s=n(20),o=n(27),r=n(18).f,a=0,u=Object.isExtensible||function(){return!0},l=!n(23)(function(){return u(Object.preventExtensions({}))}),p=function(t){r(t,i,{value:{i:"O"+ ++a,w:{}}})},c=function(t,e){if(!s(t))return"symbol"==typeof t?t:("string"==typeof t?"S":"P")+t;if(!o(t,i)){if(!u(t))return"F";if(!e)return"E";p(t)}return t[i].i},h=function(t,e){if(!o(t,i)){if(!u(t))return!0;if(!e)return!1;p(t)}return t[i].w},d=function(t){return l&&f.NEED&&u(t)&&!o(t,i)&&p(t),t},f=t.exports={KEY:i,NEED:!1,fastKey:c,getWeak:h,onFreeze:d}},function(t,e,n){var i=n(13),s=n(14),o=n(11),r=n(54),a=n(18).f;t.exports=function(t){var e=s.Symbol||(s.Symbol=o?{}:i.Symbol||{});"_"==t.charAt(0)||t in e||a(e,t,{value:r.f(t)})}},function(t,e,n){var i=n(33),s=n(61),o=n(62);t.exports=function(t){var e=i(t),n=s.f;if(n)for(var r,a=n(t),u=o.f,l=0;a.length>l;)u.call(t,r=a[l++])&&e.push(r);return e}},function(t,e){e.f=Object.getOwnPropertySymbols},function(t,e){e.f={}.propertyIsEnumerable},function(t,e,n){var i=n(37);t.exports=Array.isArray||function(t){return"Array"==i(t)}},function(t,e,n){var i=n(35),s=n(65).f,o={}.toString,r="object"==typeof window&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],a=function(t){try{return s(t)}catch(e){return r.slice()}};t.exports.f=function(t){return r&&"[object Window]"==o.call(t)?a(t):s(i(t))}},function(t,e,n){var i=n(34),s=n(44).concat("length","prototype");e.f=Object.getOwnPropertyNames||function(t){return i(t,s)}},function(t,e,n){var i=n(62),s=n(26),o=n(35),r=n(25),a=n(27),u=n(21),l=Object.getOwnPropertyDescriptor;e.f=n(22)?l:function(t,e){if(t=o(t),e=r(e,!0),u)try{return l(t,e)}catch(n){}if(a(t,e))return s(!i.f.call(t,e),t[e])}},function(t,e){},function(t,e,n){n(59)("asyncIterator")},function(t,e,n){n(59)("observable")},function(t,e,n){t.exports={"default":n(71),__esModule:!0}},function(t,e,n){var i=n(14),s=i.JSON||(i.JSON={stringify:JSON.stringify});t.exports=function(t){return s.stringify.apply(s,arguments)}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(73),o=i(s);e["default"]=o["default"]||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var i in n)Object.prototype.hasOwnProperty.call(n,i)&&(t[i]=n[i])}return t}},function(t,e,n){t.exports={"default":n(74),__esModule:!0}},function(t,e,n){n(75),t.exports=n(14).Object.assign},function(t,e,n){var i=n(12);i(i.S+i.F,"Object",{assign:n(76)})},function(t,e,n){"use strict";var i=n(22),s=n(33),o=n(61),r=n(62),a=n(49),u=n(36),l=Object.assign;t.exports=!l||n(23)(function(){var t={},e={},n=Symbol(),i="abcdefghijklmnopqrst";return t[n]=7,i.split("").forEach(function(t){e[t]=t}),7!=l({},t)[n]||Object.keys(l({},e)).join("")!=i})?function(t,e){for(var n=a(t),l=arguments.length,p=1,c=o.f,h=r.f;l>p;)for(var d,f=u(arguments[p++]),_=c?s(f).concat(c(f)):s(f),v=_.length,y=0;v>y;)d=_[y++],i&&!h.call(f,d)||(n[d]=f[d]);return n}:l},function(t,e){"use strict";e.__esModule=!0,e["default"]=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(3),o=i(s);e["default"]=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!==("undefined"==typeof e?"undefined":(0,o["default"])(e))&&"function"!=typeof e?t:e}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(80),o=i(s),r=n(84),a=i(r),u=n(3),l=i(u);e["default"]=function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+("undefined"==typeof e?"undefined":(0,l["default"])(e)));t.prototype=(0,a["default"])(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(o["default"]?(0,o["default"])(t,e):t.__proto__=e)}},function(t,e,n){t.exports={"default":n(81),__esModule:!0}},function(t,e,n){n(82),t.exports=n(14).Object.setPrototypeOf},function(t,e,n){var i=n(12);i(i.S,"Object",{setPrototypeOf:n(83).set})},function(t,e,n){var i=n(20),s=n(19),o=function(t,e){if(s(t),!i(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,i){try{i=n(15)(Function.call,n(66).f(Object.prototype,"__proto__").set,2),i(t,[]),e=!(t instanceof Array)}catch(s){e=!0}return function(t,n){return o(t,n),e?t.__proto__=n:i(t,n),t}}({},!1):void 0),check:o}},function(t,e,n){t.exports={"default":n(85),__esModule:!0}},function(t,e,n){n(86);var i=n(14).Object;t.exports=function(t,e){return i.create(t,e)}},function(t,e,n){var i=n(12);i(i.S,"Object",{create:n(31)})},function(t,e){"document"in window.self&&("classList"in document.createElement("_")&&(!document.createElementNS||"classList"in document.createElementNS("http://www.w3.org/2000/svg","g"))||!function(t){"use strict";if("Element"in t){var e="classList",n="prototype",i=t.Element[n],s=Object,o=String[n].trim||function(){return this.replace(/^\s+|\s+$/g,"")},r=Array[n].indexOf||function(t){for(var e=0,n=this.length;e<n;e++)if(e in this&&this[e]===t)return e;return-1},a=function(t,e){this.name=t,this.code=DOMException[t],this.message=e},u=function(t,e){if(""===e)throw new a("SYNTAX_ERR","An invalid or illegal string was specified");if(/\s/.test(e))throw new a("INVALID_CHARACTER_ERR","String contains an invalid character");return r.call(t,e)},l=function(t){for(var e=o.call(t.getAttribute("class")||""),n=e?e.split(/\s+/):[],i=0,s=n.length;i<s;i++)this.push(n[i]);this._updateClassName=function(){t.setAttribute("class",this.toString())}},p=l[n]=[],c=function(){return new l(this)};if(a[n]=Error[n],p.item=function(t){return this[t]||null},p.contains=function(t){return t+="",u(this,t)!==-1},p.add=function(){var t,e=arguments,n=0,i=e.length,s=!1;do t=e[n]+"",u(this,t)===-1&&(this.push(t),s=!0);while(++n<i);s&&this._updateClassName()},p.remove=function(){var t,e,n=arguments,i=0,s=n.length,o=!1;do for(t=n[i]+"",e=u(this,t);e!==-1;)this.splice(e,1),o=!0,e=u(this,t);while(++i<s);o&&this._updateClassName()},p.toggle=function(t,e){t+="";var n=this.contains(t),i=n?e!==!0&&"remove":e!==!1&&"add";return i&&this[i](t),e===!0||e===!1?e:!n},p.toString=function(){return this.join(" ")},s.defineProperty){var h={get:c,enumerable:!0,configurable:!0};try{s.defineProperty(i,e,h)}catch(d){void 0!==d.number&&d.number!==-2146823252||(h.enumerable=!1,s.defineProperty(i,e,h))}}else s[n].__defineGetter__&&i.__defineGetter__(e,c)}}(window.self),function(){"use strict";var t=document.createElement("_");if(t.classList.add("c1","c2"),!t.classList.contains("c2")){var e=function(t){var e=DOMTokenList.prototype[t];DOMTokenList.prototype[t]=function(t){var n,i=arguments.length;for(n=0;n<i;n++)t=arguments[n],e.call(this,t)}};e("add"),e("remove")}if(t.classList.toggle("c3",!1),t.classList.contains("c3")){var n=DOMTokenList.prototype.toggle;DOMTokenList.prototype.toggle=function(t,e){return 1 in arguments&&!this.contains(t)==!e?e:n.call(this,t)}}t=null}())},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(89),c=i(p),h=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._render=function(){this.el=this._createElement("div"),this.el.innerHTML=this.getIcons(),this.el.setAttribute("id",this._props.prefix+"icons"),this._prependChild(document.body,this.el)},e.prototype.getIcons=function(){var t=this._props.prefix;return'<svg height="0" version="1.1" xmlns="http://www.w3.org/2000/svg" style="position:absolute; margin-left: -100%; width:0; height:0;" xmlns:xlink="http://www.w3.org/1999/xlink">\n              <path id="'+t+'play-icon-shape" d="M0.000549111126,31.9982154 C-0.000686388908,21.3321436 0.000549111126,10.6660718 0.000549111126,1.77635684e-15 C10.6678564,5.33118265 21.3339282,10.6648363 32,15.9984899 C21.3339282,21.3321436 10.6678564,26.6657972 0.000549111126,31.9982154 L0.000549111126,31.9982154 Z"></path>\n              <g id="'+t+'pause-icon-shape">\n                <path d="M-8.8817842e-16,0 C3.55529197,-0.000248559134 7.11058393,-0.000248559134 10.6666667,0 C10.6669303,10.6669152 10.6669303,21.3330848 10.6666667,32 C7.11058393,32.0002486 3.55529197,32.0002486 -8.8817842e-16,32 L-8.8817842e-16,0 L-8.8817842e-16,0 Z"></path>\n                <path d="M21.3333333,0 C24.8894161,-0.000248559134 28.444708,-0.000248559134 32,0 L32,32 C28.444708,32.0002486 24.8894161,32.0002486 21.3333333,32 C21.3330697,21.3330848 21.3330697,10.6669152 21.3333333,0 L21.3333333,0 Z"></path>\n              </g>\n              <rect id="'+t+'stop-icon-shape" x="0" y="0" width="32" height="32"></rect>\n              <path id="'+t+'repeat-icon-shape" d="M9.871,1.48 C12.322,0.209 15.176,-0.247 17.906,0.137 C20.914,0.556 23.762,2.041 25.823,4.274 C27.359,5.896 28.452,7.916 29.033,10.069 C29.472,9.674 29.825,9.123 30.422,8.955 C31.003,8.779 31.696,9.094 31.909,9.67 C32.106,10.155 31.972,10.736 31.6,11.1 C30.713,12.013 29.808,12.908 28.91,13.811 C28.709,14.011 28.506,14.231 28.23,14.323 C27.772,14.498 27.224,14.379 26.881,14.03 C25.918,13.021 24.913,12.052 23.938,11.055 C23.542,10.656 23.511,9.982 23.82,9.523 C24.104,9.072 24.681,8.844 25.196,8.988 C25.679,9.098 25.966,9.536 26.31,9.852 C25.345,7.149 23.302,4.829 20.694,3.611 C18.713,2.653 16.434,2.344 14.264,2.689 C10.576,3.238 7.291,5.853 5.897,9.306 C5.697,9.872 5.1,10.301 4.488,10.184 C3.863,10.113 3.366,9.501 3.399,8.878 C3.413,8.644 3.512,8.429 3.601,8.216 C4.804,5.321 7.089,2.911 9.871,1.48 Z M3.374,12.873 C3.855,12.401 4.7,12.476 5.151,12.952 C6.038,13.863 6.935,14.765 7.839,15.659 C8.049,15.864 8.261,16.088 8.343,16.379 C8.605,17.177 7.852,18.12 7.004,17.996 C6.43,17.963 6.069,17.47 5.692,17.101 C6.657,19.849 8.766,22.168 11.406,23.395 C14.249,24.712 17.666,24.737 20.514,23.423 C22.848,22.38 24.775,20.47 25.864,18.16 C26.072,17.753 26.185,17.255 26.588,16.987 C27.062,16.635 27.776,16.687 28.195,17.101 C28.527,17.419 28.687,17.926 28.541,18.369 C27.351,21.477 24.943,24.088 21.961,25.559 C18.251,27.421 13.67,27.405 9.973,25.52 C6.545,23.823 3.931,20.588 2.96,16.892 C2.624,17.217 2.319,17.58 1.935,17.85 C1.405,18.183 0.615,18.077 0.239,17.56 C-0.143,17.042 -0.048,16.254 0.431,15.828 C1.415,14.846 2.374,13.838 3.374,12.873 Z"></path>\n              <path id="'+t+'bounds-icon-shape" d="M16,6 L16,-1.13686838e-13 L18,-1.13686838e-13 L18,6 L21.9941413,6 C23.1019465,6 24,6.89821238 24,7.99079514 L24,24.0092049 C24,25.1086907 23.1029399,26 21.9941413,26 L18,26 L18,32 L16,32 L16,26 L12.0058587,26 C10.8980535,26 10,25.1017876 10,24.0092049 L10,7.99079514 C10,6.89130934 10.8970601,6 12.0058587,6 L16,6 Z"></path>\n              <path id="'+t+'mojs-icon-shape" d="M18.4678907,2.67700048 C19.488586,3.25758625 20.2789227,4.18421651 20.87823,5.1973579 C24.0807788,10.501451 27.2777091,15.8113116 30.480258,21.1154047 C31.1320047,22.1612281 31.7706417,23.2647256 31.9354512,24.5162532 C32.188284,26.0619186 31.6919826,27.7363895 30.5589171,28.80336 C29.4501984,29.8857103 27.8807622,30.3182659 26.3806209,30.3048086 C19.4511293,30.3086535 12.5235106,30.3086535 5.59401901,30.3048086 C3.71556494,30.343258 1.69852104,29.5723478 0.683444165,27.8709623 C-0.406546132,26.1099803 -0.0975282643,23.7914822 0.940022637,22.0843293 C4.34296485,16.4130445 7.76650826,10.7532945 11.1825603,5.08969961 C11.9747698,3.74781595 13.1846215,2.60202418 14.6847628,2.18292584 C15.9451812,1.81573418 17.3348251,2.01182606 18.4678907,2.67700048 Z M15.3334668,9.51526849 C15.6146238,9.03779476 16.0791597,9.02250655 16.3785679,9.4929547 L25.2763555,23.4736913 C25.5723919,23.9388414 25.3568433,24.3159201 24.8074398,24.3159202 L7.62314647,24.3159205 C7.06813505,24.3159206 6.84622798,23.9286889 7.12728913,23.4513779 L15.3334668,9.51526849 Z" fill-rule="evenodd"></path>\n              <path id="'+t+'hide-icon-shape" d="M18.0297509,24.5024819 C18.1157323,24.4325886 18.1989631,24.3576024 18.2790422,24.2775233 L31.0556518,11.5009137 C32.3147827,10.2417828 32.3147827,8.20347913 31.0556518,6.9443482 C29.7965209,5.68521727 27.7582172,5.68521727 26.4990863,6.9443482 L15.9992406,17.4441939 L5.50091369,6.94586705 C4.24330161,5.68825498 2.20347913,5.68673612 0.944348198,6.94586705 C-0.314782733,8.20499798 -0.314782733,10.2433016 0.944348198,11.5024325 L13.7209578,24.2790422 C14.9005165,25.4586008 16.7638781,25.5331444 18.0298642,24.5026731 L18.0297509,24.5024819 Z"></path>\n            </svg>';
},e}(c["default"]);e["default"]=h},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(3),o=i(s),r=n(77),a=i(r),u=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};(0,a["default"])(this,t),this._o=e,this._index=this._o.index||0,this._declareDefaults(),this._extendDefaults(),this._vars(),this._render()}return t.prototype._declareDefaults=function(){this._defaults={className:"",parent:document.body,isPrepend:!1,isRipple:!1,prefix:""}},t.prototype._addPointerDownEvent=function(t,e){window.navigator.msPointerEnabled?t.addEventListener("MSPointerDown",e):void 0!==window.ontouchstart?(t.addEventListener("touchstart",e),t.addEventListener("mousedown",e)):t.addEventListener("mousedown",e)},t.prototype._addPointerUpEvent=function(t,e){window.navigator.msPointerEnabled?t.addEventListener("MSPointerUp",e):void 0!==window.ontouchstart?(t.addEventListener("touchend",e),t.addEventListener("mouseup",e)):t.addEventListener("mouseup",e)},t.prototype._isFunction=function(t){return"function"==typeof t},t.prototype._callIfFunction=function(t){Array.prototype.shift.call(arguments),this._isFunction(t)&&t.apply(this,arguments)},t.prototype._vars=function(){},t.prototype._render=function(){this._addMainElement()},t.prototype._addMainElement=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"div",e=this._props;this.el=this._createElement(t),this._addMainClasses();var n=e.isPrepend?"prepend":"append";this["_"+n+"Child"](e.parent,this.el)},t.prototype._addMainClasses=function(){var t=this._props;if(t.className instanceof Array)for(var e=0;e<t.className.length;e++)this._addClass(this.el,t.className[e]);else this._addClass(this.el,t.className)},t.prototype._addClass=function(t,e){e&&t.classList.add(e)},t.prototype._setProp=function(t,e){if("object"===("undefined"==typeof t?"undefined":(0,o["default"])(t)))for(var n in t)this._assignProp(n,t[n]);else this._assignProp(t,e)},t.prototype._assignProp=function(t,e){this._props[t]=e},t.prototype._extendDefaults=function(){this._props={};for(var t in this._defaults){var e=this._o[t];this.isIt&&console.log(t),this._assignProp(t,null!=e?e:this._defaults[t])}},t.prototype._createElement=function(t){return document.createElement(t)},t.prototype._createChild=function(t,e){var n=this._createElement("div");return e&&n.classList.add(e),this.el.appendChild(n),n},t.prototype._appendChild=function(t,e){t.appendChild(e)},t.prototype._prependChild=function(t,e){t.insertBefore(e,t.firstChild)},t}();e["default"]=u},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(91),c=i(p),h=n(89),d=i(h);n(107);var f=n(109),_=n(106),v=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){this._defaults={className:f["player-slider"],parent:document.body,progress:0,leftProgress:0,rightProgress:1,isBounds:!1,onLeftProgress:null,onProgress:null,onRightProgress:null,onSeekStart:null,onSeekEnd:null}},e.prototype.disableBounds=function(){return this.track.setBounds(0,1),this.rightBound.hide(),this.leftBound.hide(),this},e.prototype.enableBounds=function(){var t=this._props;return this.track.setBounds(t.leftProgress,t.rightProgress),this.rightBound.show(),this.leftBound.show(),this},e.prototype.setTrackProgress=function(t){return this.track.setProgress(t),this},e.prototype.decreaseProgress=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.01,e=this.track._progress;return e-=t,e=e<0?0:e,this.setTrackProgress(e),this},e.prototype.increaseProgress=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.01,e=this.track._progress;return e+=t,e=e>1?1:e,this.setTrackProgress(e),this},e.prototype._render=function(){var t=this._props;this._addMainElement(),this.el.classList.add(_.slider),this.leftBound=new c["default"]({isBound:!0,parent:this.el,isRipple:!1,onProgress:this._onLeftBoundProgress.bind(this),onSeekStart:t.onSeekStart,onSeekEnd:t.onSeekEnd}),this.track=new c["default"]({parent:this.el,className:f.slider,onProgress:this._onTrackProgress.bind(this),onSeekStart:t.onSeekStart,onSeekEnd:t.onSeekEnd}),this.rightBound=new c["default"]({isBound:!0,parent:this.el,isRipple:!1,isInversed:!0,onProgress:this._onRightBoundProgress.bind(this),onSeekStart:t.onSeekStart,onSeekEnd:t.onSeekEnd}),this.rightBound.setProgress(t.rightProgress),this.track.setProgress(t.progress),this.leftBound.setProgress(t.leftProgress),t.parent.appendChild(this.el)},e.prototype._onTrackProgress=function(t){this._callIfFunction(this._props.onProgress,t)},e.prototype._onLeftBoundProgress=function(t){this._props.isBounds&&(this._props.leftProgress=t,this.track.setMinBound(t),this.rightBound.setMinBound(t),this._callIfFunction(this._props.onLeftProgress,t))},e.prototype._onRightBoundProgress=function(t){this._props.isBounds&&(this._props.rightProgress=t,this.track.setMaxBound(t),this.leftBound.setMaxBound(t),this._callIfFunction(this._props.onRightProgress,t))},e}(d["default"]);e["default"]=v},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(89),c=i(p),h=n(92),d=i(h),f=n(99),_=i(f);n(104);var v=n(106),y=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){this._defaults={className:"",parent:document.body,isBound:!1,isInversed:!1,isRipple:!0,isProgress:!0,onProgress:null,onSeekStart:null,onSeekEnd:null,direction:"x",snapPoint:0,snapStrength:0}},e.prototype.setProgress=function(t){return this.handle.setProgress(t),this.track.setProgress(t),this},e.prototype.setBounds=function(t,e){return this.handle.setBounds(t,e),this.track.setBounds(t,e),this},e.prototype.setMinBound=function(t){return this.handle.setMinBound(t),this.track.setMinBound(t),this},e.prototype.setMaxBound=function(t){return this.handle.setMaxBound(t),this.track.setMaxBound(t),this},e.prototype.show=function(){this.track.el.style.display="block",this.handle.el.style.display="block"},e.prototype.hide=function(){this.track.el.style.display="none",this.handle.el.style.display="none"},e.prototype._render=function(){var t=this._props;if(!t.isBound){var e=this._createElement("div"),n=e.classList;this.el=e,this.inner=this._createElement("div"),this.inner.classList.add(v.slider__inner),this.el.appendChild(this.inner),n.add(v.slider),"y"===t.direction&&n.add(v["is-y"]),t.className&&n.add(t.className),t.parent.appendChild(e)}var i=t.isBound?t.parent:this.inner;this.track=new _["default"]({className:v.track,onProgress:this._onTrackProgress.bind(this),onSeekStart:t.onSeekStart,onSeekEnd:t.onSeekEnd,isBound:t.isBound,isInversed:t.isInversed,isRipple:t.isRipple,isProgress:t.isProgress,parent:i,direction:t.direction,snapPoint:t.snapPoint,snapStrength:t.snapStrength}),i.appendChild(this.track.el);var s=[v.handle];t.isBound||s.push(v["progress-handle"]),this.handle=new d["default"]({className:s,onProgress:this._onHandleProgress.bind(this),onSeekStart:t.onSeekStart,onSeekEnd:t.onSeekEnd,isBound:t.isBound,isInversed:t.isInversed,parent:i,direction:t.direction,snapPoint:t.snapPoint,snapStrength:t.snapStrength}),i.appendChild(this.handle.el)},e.prototype._onHandleProgress=function(t){this.track.setProgress(t,!1),this._onProgress(t)},e.prototype._onTrackProgress=function(t){this.handle.setProgress(t,!1),this._onProgress(t)},e.prototype._onProgress=function(t){var e=this._props;"function"==typeof e.onProgress&&this._progress!==t&&(this._progress=t,e.onProgress.call(this,t))},e}(c["default"]);e["default"]=y},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(89),c=i(p),h=n(93),d=i(h);n(94);var f=n(98),_=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.minBound=0,this._defaults.maxBound=1,this._defaults.isBound=!1,this._defaults.isInversed=!1,this._defaults.direction="x",this._defaults.onSeekStart=null,this._defaults.onSeekEnd=null,this._defaults.onProgress=null,this._defaults.snapPoint=0,this._defaults.snapStrength=0},e.prototype.setProgress=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this._progressToShift(t);return this._setShift(n,e),this._delta=n-this._shift,this._saveDelta(),this},e.prototype.setBounds=function(t,e){return this.setMinBound(t),this.setMaxBound(e),this},e.prototype.setMinBound=function(t){return this._props.minBound=Math.max(t,0),this._progress<t&&this.setProgress(t),this},e.prototype.setMaxBound=function(t){return this._props.maxBound=Math.min(t,1),this._progress>t&&this.setProgress(t),this},e.prototype._vars=function(){this._progress=0,this._shift=0,this._delta=0},e.prototype._setShift=function(t){var e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this._props,i=n.minBound*this._maxWidth,s=n.maxBound*this._maxWidth;return t=this.clamp(t,i,s),this._applyShift(t),e?this._onProgress(t):this._progress=this._shiftToProgress(t),t},e.prototype.clamp=function(t,e,n){return Math.min(Math.max(t,e),n)},e.prototype._applyShift=function(t){var e=this._props;this.el.style.transform="x"===e.direction?"translateX( "+t+"px )":"translateY( "+-t+"px )"},e.prototype._getMaxWidth=function(){var t=this._props,e=t.parent;this._maxWidth="x"===t.direction?e.clientWidth:e.clientHeight},e.prototype._render=function(){t.prototype._render.call(this),this._addElements(),this._getMaxWidth(),this._hammerTime()},e.prototype._addMainClasses=function(){t.prototype._addMainClasses.call(this);var e=this._props,n=this.el.classList;n.add(f.handle),e.isBound&&n.add(f["is-bound"]),e.isInversed&&n.add(f["is-inversed"])},e.prototype._addElements=function(){var t=this._createElement("div"),e=this._createElement("div");t.classList.add(""+f.handle__inner),e.classList.add(""+f.handle__shadow),this.el.appendChild(e),this.el.appendChild(t)},e.prototype._hammerTime=function(){var t=this._props,e="x"===t.direction?"HORIZONTAL":"VERTICAL",n=new d["default"].Manager(this.el,{recognizers:[[d["default"].Pan,{direction:d["default"]["DIRECTION_"+e]}]]});n.on("pan",this._pan.bind(this)),n.on("panend",this._panEnd.bind(this)),this._addPointerDownEvent(this.el,this._pointerDown.bind(this)),this._addPointerUpEvent(this.el,this._pointerUp.bind(this)),this._addPointerUpEvent(document,this._pointerUpDoc.bind(this)),window.addEventListener("resize",this._onWindowResize.bind(this))},e.prototype._pan=function(t){var e=this._props;this._delta="x"===e.direction?t.deltaX:-t.deltaY;var n=this._shift+this._delta,i=this._shiftToProgress(n);i=Math.abs(i-e.snapPoint)<e.snapStrength?e.snapPoint:i,this._setShift(this._progressToShift(i))},e.prototype._panEnd=function(t){this._saveDelta(),this._callIfFunction(this._props.onSeekEnd,t)},e.prototype._pointerDown=function(t){var e=this._props;this._isPointerDown=!0,this._callIfFunction(e.onSeekStart,t)},e.prototype._pointerUp=function(t){return this._callIfFunction(this._props.onSeekEnd,t),t.preventDefault(),!1},e.prototype._pointerUpDoc=function(t){this._isPointerDown&&(this._callIfFunction(this._props.onSeekEnd,t),this._isPointerDown=!1)},e.prototype._saveDelta=function(){this._shift+=this._delta},e.prototype._onProgress=function(t){var e=this._props,n=this._shiftToProgress(t);this._progress!==n&&(this._progress=n,this._isFunction(e.onProgress)&&e.onProgress.call(this,n))},e.prototype._shiftToProgress=function(t){return t/this._maxWidth},e.prototype._progressToShift=function(t){return t*this._maxWidth},e.prototype._onWindowResize=function(t){this._getMaxWidth(),this.setProgress(this._progress)},e}(c["default"]);e["default"]=_},function(t,e,n){var i;!function(s,o,r,a){"use strict";function u(t,e,n){return setTimeout(d(t,n),e)}function l(t,e,n){return!!Array.isArray(t)&&(p(t,n[e],n),!0)}function p(t,e,n){var i;if(t)if(t.forEach)t.forEach(e,n);else if(t.length!==a)for(i=0;i<t.length;)e.call(n,t[i],i,t),i++;else for(i in t)t.hasOwnProperty(i)&&e.call(n,t[i],i,t)}function c(t,e,n){var i="DEPRECATED METHOD: "+e+"\n"+n+" AT \n";return function(){var e=new Error("get-stack-trace"),n=e&&e.stack?e.stack.replace(/^[^\(]+?[\n$]/gm,"").replace(/^\s+at\s+/gm,"").replace(/^Object.<anonymous>\s*\(/gm,"{anonymous}()@"):"Unknown Stack Trace",o=s.console&&(s.console.warn||s.console.log);return o&&o.call(s.console,i,n),t.apply(this,arguments)}}function h(t,e,n){var i,s=e.prototype;i=t.prototype=Object.create(s),i.constructor=t,i._super=s,n&&_t(i,n)}function d(t,e){return function(){return t.apply(e,arguments)}}function f(t,e){return typeof t==gt?t.apply(e?e[0]||a:a,e):t}function _(t,e){return t===a?e:t}function v(t,e,n){p(b(e),function(e){t.addEventListener(e,n,!1)})}function y(t,e,n){p(b(e),function(e){t.removeEventListener(e,n,!1)})}function g(t,e){for(;t;){if(t==e)return!0;t=t.parentNode}return!1}function m(t,e){return t.indexOf(e)>-1}function b(t){return t.trim().split(/\s+/g)}function x(t,e,n){if(t.indexOf&&!n)return t.indexOf(e);for(var i=0;i<t.length;){if(n&&t[i][n]==e||!n&&t[i]===e)return i;i++}return-1}function S(t){return Array.prototype.slice.call(t,0)}function w(t,e,n){for(var i=[],s=[],o=0;o<t.length;){var r=e?t[o][e]:t[o];x(s,r)<0&&i.push(t[o]),s[o]=r,o++}return n&&(i=e?i.sort(function(t,n){return t[e]>n[e]}):i.sort()),i}function P(t,e){for(var n,i,s=e[0].toUpperCase()+e.slice(1),o=0;o<vt.length;){if(n=vt[o],i=n?n+s:e,i in t)return i;o++}return a}function T(){return Pt++}function k(t){var e=t.ownerDocument||t;return e.defaultView||e.parentWindow||s}function C(t,e){var n=this;this.manager=t,this.callback=e,this.element=t.element,this.target=t.options.inputTarget,this.domHandler=function(e){f(t.options.enable,[t])&&n.handler(e)},this.init()}function E(t){var e,n=t.options.inputClass;return new(e=n?n:Ct?U:Et?Y:kt?q:X)(t,M)}function M(t,e,n){var i=n.pointers.length,s=n.changedPointers.length,o=e&Dt&&i-s===0,r=e&(Rt|At)&&i-s===0;n.isFirst=!!o,n.isFinal=!!r,o&&(t.session={}),n.eventType=e,j(t,n),t.emit("hammer.input",n),t.recognize(n),t.session.prevInput=n}function j(t,e){var n=t.session,i=e.pointers,s=i.length;n.firstInput||(n.firstInput=B(e)),s>1&&!n.firstMultiple?n.firstMultiple=B(e):1===s&&(n.firstMultiple=!1);var o=n.firstInput,r=n.firstMultiple,a=r?r.center:o.center,u=e.center=D(i);e.timeStamp=xt(),e.deltaTime=e.timeStamp-o.timeStamp,e.angle=F(a,u),e.distance=A(a,u),L(n,e),e.offsetDirection=R(e.deltaX,e.deltaY);var l=I(e.deltaTime,e.deltaX,e.deltaY);e.overallVelocityX=l.x,e.overallVelocityY=l.y,e.overallVelocity=bt(l.x)>bt(l.y)?l.x:l.y,e.scale=r?z(r.pointers,i):1,e.rotation=r?N(r.pointers,i):0,e.maxPointers=n.prevInput?e.pointers.length>n.prevInput.maxPointers?e.pointers.length:n.prevInput.maxPointers:e.pointers.length,O(n,e);var p=t.element;g(e.srcEvent.target,p)&&(p=e.srcEvent.target),e.target=p}function L(t,e){var n=e.center,i=t.offsetDelta||{},s=t.prevDelta||{},o=t.prevInput||{};e.eventType!==Dt&&o.eventType!==Rt||(s=t.prevDelta={x:o.deltaX||0,y:o.deltaY||0},i=t.offsetDelta={x:n.x,y:n.y}),e.deltaX=s.x+(n.x-i.x),e.deltaY=s.y+(n.y-i.y)}function O(t,e){var n,i,s,o,r=t.lastInterval||e,u=e.timeStamp-r.timeStamp;if(e.eventType!=At&&(u>Bt||r.velocity===a)){var l=e.deltaX-r.deltaX,p=e.deltaY-r.deltaY,c=I(u,l,p);i=c.x,s=c.y,n=bt(c.x)>bt(c.y)?c.x:c.y,o=R(l,p),t.lastInterval=e}else n=r.velocity,i=r.velocityX,s=r.velocityY,o=r.direction;e.velocity=n,e.velocityX=i,e.velocityY=s,e.direction=o}function B(t){for(var e=[],n=0;n<t.pointers.length;)e[n]={clientX:mt(t.pointers[n].clientX),clientY:mt(t.pointers[n].clientY)},n++;return{timeStamp:xt(),pointers:e,center:D(e),deltaX:t.deltaX,deltaY:t.deltaY}}function D(t){var e=t.length;if(1===e)return{x:mt(t[0].clientX),y:mt(t[0].clientY)};for(var n=0,i=0,s=0;s<e;)n+=t[s].clientX,i+=t[s].clientY,s++;return{x:mt(n/e),y:mt(i/e)}}function I(t,e,n){return{x:e/t||0,y:n/t||0}}function R(t,e){return t===e?Ft:bt(t)>=bt(e)?t<0?Nt:zt:e<0?Xt:Ut}function A(t,e,n){n||(n=$t);var i=e[n[0]]-t[n[0]],s=e[n[1]]-t[n[1]];return Math.sqrt(i*i+s*s)}function F(t,e,n){n||(n=$t);var i=e[n[0]]-t[n[0]],s=e[n[1]]-t[n[1]];return 180*Math.atan2(s,i)/Math.PI}function N(t,e){return F(e[1],e[0],qt)+F(t[1],t[0],qt)}function z(t,e){return A(e[0],e[1],qt)/A(t[0],t[1],qt)}function X(){this.evEl=Gt,this.evWin=Zt,this.pressed=!1,C.apply(this,arguments)}function U(){this.evEl=Qt,this.evWin=te,C.apply(this,arguments),this.store=this.manager.session.pointerEvents=[]}function H(){this.evTarget=ne,this.evWin=ie,this.started=!1,C.apply(this,arguments)}function W(t,e){var n=S(t.touches),i=S(t.changedTouches);return e&(Rt|At)&&(n=w(n.concat(i),"identifier",!0)),[n,i]}function Y(){this.evTarget=oe,this.targetIds={},C.apply(this,arguments)}function $(t,e){var n=S(t.touches),i=this.targetIds;if(e&(Dt|It)&&1===n.length)return i[n[0].identifier]=!0,[n,n];var s,o,r=S(t.changedTouches),a=[],u=this.target;if(o=n.filter(function(t){return g(t.target,u)}),e===Dt)for(s=0;s<o.length;)i[o[s].identifier]=!0,s++;for(s=0;s<r.length;)i[r[s].identifier]&&a.push(r[s]),e&(Rt|At)&&delete i[r[s].identifier],s++;return a.length?[w(o.concat(a),"identifier",!0),a]:void 0}function q(){C.apply(this,arguments);var t=d(this.handler,this);this.touch=new Y(this.manager,t),this.mouse=new X(this.manager,t),this.primaryTouch=null,this.lastTouches=[]}function V(t,e){t&Dt?(this.primaryTouch=e.changedPointers[0].identifier,G.call(this,e)):t&(Rt|At)&&G.call(this,e)}function G(t){var e=t.changedPointers[0];if(e.identifier===this.primaryTouch){var n={x:e.clientX,y:e.clientY};this.lastTouches.push(n);var i=this.lastTouches,s=function(){var t=i.indexOf(n);t>-1&&i.splice(t,1)};setTimeout(s,re)}}function Z(t){for(var e=t.srcEvent.clientX,n=t.srcEvent.clientY,i=0;i<this.lastTouches.length;i++){var s=this.lastTouches[i],o=Math.abs(e-s.x),r=Math.abs(n-s.y);if(o<=ae&&r<=ae)return!0}return!1}function J(t,e){this.manager=t,this.set(e)}function K(t){if(m(t,de))return de;var e=m(t,fe),n=m(t,_e);return e&&n?de:e||n?e?fe:_e:m(t,he)?he:ce}function Q(){if(!le)return!1;var t={},e=s.CSS&&s.CSS.supports;return["auto","manipulation","pan-y","pan-x","pan-x pan-y","none"].forEach(function(n){t[n]=!e||s.CSS.supports("touch-action",n)}),t}function tt(t){this.options=_t({},this.defaults,t||{}),this.id=T(),this.manager=null,this.options.enable=_(this.options.enable,!0),this.state=ye,this.simultaneous={},this.requireFail=[]}function et(t){return t&Se?"cancel":t&be?"end":t&me?"move":t&ge?"start":""}function nt(t){return t==Ut?"down":t==Xt?"up":t==Nt?"left":t==zt?"right":""}function it(t,e){var n=e.manager;return n?n.get(t):t}function st(){tt.apply(this,arguments)}function ot(){st.apply(this,arguments),this.pX=null,this.pY=null}function rt(){st.apply(this,arguments)}function at(){tt.apply(this,arguments),this._timer=null,this._input=null}function ut(){st.apply(this,arguments)}function lt(){st.apply(this,arguments)}function pt(){tt.apply(this,arguments),this.pTime=!1,this.pCenter=!1,this._timer=null,this._input=null,this.count=0}function ct(t,e){return e=e||{},e.recognizers=_(e.recognizers,ct.defaults.preset),new ht(t,e)}function ht(t,e){this.options=_t({},ct.defaults,e||{}),this.options.inputTarget=this.options.inputTarget||t,this.handlers={},this.session={},this.recognizers=[],this.oldCssProps={},this.element=t,this.input=E(this),this.touchAction=new J(this,this.options.touchAction),dt(this,!0),p(this.options.recognizers,function(t){var e=this.add(new t[0](t[1]));t[2]&&e.recognizeWith(t[2]),t[3]&&e.requireFailure(t[3])},this)}function dt(t,e){var n=t.element;if(n.style){var i;p(t.options.cssProps,function(s,o){i=P(n.style,o),e?(t.oldCssProps[i]=n.style[i],n.style[i]=s):n.style[i]=t.oldCssProps[i]||""}),e||(t.oldCssProps={})}}function ft(t,e){var n=o.createEvent("Event");n.initEvent(t,!0,!0),n.gesture=e,e.target.dispatchEvent(n)}var _t,vt=["","webkit","Moz","MS","ms","o"],yt=o.createElement("div"),gt="function",mt=Math.round,bt=Math.abs,xt=Date.now;_t="function"!=typeof Object.assign?function(t){if(t===a||null===t)throw new TypeError("Cannot convert undefined or null to object");for(var e=Object(t),n=1;n<arguments.length;n++){var i=arguments[n];if(i!==a&&null!==i)for(var s in i)i.hasOwnProperty(s)&&(e[s]=i[s])}return e}:Object.assign;var St=c(function(t,e,n){for(var i=Object.keys(e),s=0;s<i.length;)(!n||n&&t[i[s]]===a)&&(t[i[s]]=e[i[s]]),s++;return t},"extend","Use `assign`."),wt=c(function(t,e){return St(t,e,!0)},"merge","Use `assign`."),Pt=1,Tt=/mobile|tablet|ip(ad|hone|od)|android/i,kt="ontouchstart"in s,Ct=P(s,"PointerEvent")!==a,Et=kt&&Tt.test(navigator.userAgent),Mt="touch",jt="pen",Lt="mouse",Ot="kinect",Bt=25,Dt=1,It=2,Rt=4,At=8,Ft=1,Nt=2,zt=4,Xt=8,Ut=16,Ht=Nt|zt,Wt=Xt|Ut,Yt=Ht|Wt,$t=["x","y"],qt=["clientX","clientY"];C.prototype={handler:function(){},init:function(){this.evEl&&v(this.element,this.evEl,this.domHandler),this.evTarget&&v(this.target,this.evTarget,this.domHandler),this.evWin&&v(k(this.element),this.evWin,this.domHandler)},destroy:function(){this.evEl&&y(this.element,this.evEl,this.domHandler),this.evTarget&&y(this.target,this.evTarget,this.domHandler),this.evWin&&y(k(this.element),this.evWin,this.domHandler)}};var Vt={mousedown:Dt,mousemove:It,mouseup:Rt},Gt="mousedown",Zt="mousemove mouseup";h(X,C,{handler:function(t){var e=Vt[t.type];e&Dt&&0===t.button&&(this.pressed=!0),e&It&&1!==t.which&&(e=Rt),this.pressed&&(e&Rt&&(this.pressed=!1),this.callback(this.manager,e,{pointers:[t],changedPointers:[t],pointerType:Lt,srcEvent:t}))}});var Jt={pointerdown:Dt,pointermove:It,pointerup:Rt,pointercancel:At,pointerout:At},Kt={2:Mt,3:jt,4:Lt,5:Ot},Qt="pointerdown",te="pointermove pointerup pointercancel";s.MSPointerEvent&&!s.PointerEvent&&(Qt="MSPointerDown",te="MSPointerMove MSPointerUp MSPointerCancel"),h(U,C,{handler:function(t){var e=this.store,n=!1,i=t.type.toLowerCase().replace("ms",""),s=Jt[i],o=Kt[t.pointerType]||t.pointerType,r=o==Mt,a=x(e,t.pointerId,"pointerId");s&Dt&&(0===t.button||r)?a<0&&(e.push(t),a=e.length-1):s&(Rt|At)&&(n=!0),a<0||(e[a]=t,this.callback(this.manager,s,{pointers:e,changedPointers:[t],pointerType:o,srcEvent:t}),n&&e.splice(a,1))}});var ee={touchstart:Dt,touchmove:It,touchend:Rt,touchcancel:At},ne="touchstart",ie="touchstart touchmove touchend touchcancel";h(H,C,{handler:function(t){var e=ee[t.type];if(e===Dt&&(this.started=!0),this.started){var n=W.call(this,t,e);e&(Rt|At)&&n[0].length-n[1].length===0&&(this.started=!1),this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:Mt,srcEvent:t})}}});var se={touchstart:Dt,touchmove:It,touchend:Rt,touchcancel:At},oe="touchstart touchmove touchend touchcancel";h(Y,C,{handler:function(t){var e=se[t.type],n=$.call(this,t,e);n&&this.callback(this.manager,e,{pointers:n[0],changedPointers:n[1],pointerType:Mt,srcEvent:t})}});var re=2500,ae=25;h(q,C,{handler:function(t,e,n){var i=n.pointerType==Mt,s=n.pointerType==Lt;if(!(s&&n.sourceCapabilities&&n.sourceCapabilities.firesTouchEvents)){if(i)V.call(this,e,n);else if(s&&Z.call(this,n))return;this.callback(t,e,n)}},destroy:function(){this.touch.destroy(),this.mouse.destroy()}});var ue=P(yt.style,"touchAction"),le=ue!==a,pe="compute",ce="auto",he="manipulation",de="none",fe="pan-x",_e="pan-y",ve=Q();J.prototype={set:function(t){t==pe&&(t=this.compute()),le&&this.manager.element.style&&ve[t]&&(this.manager.element.style[ue]=t),this.actions=t.toLowerCase().trim()},update:function(){this.set(this.manager.options.touchAction)},compute:function(){var t=[];return p(this.manager.recognizers,function(e){f(e.options.enable,[e])&&(t=t.concat(e.getTouchAction()))}),K(t.join(" "))},preventDefaults:function(t){var e=t.srcEvent,n=t.offsetDirection;if(this.manager.session.prevented)return void e.preventDefault();var i=this.actions,s=m(i,de)&&!ve[de],o=m(i,_e)&&!ve[_e],r=m(i,fe)&&!ve[fe];if(s){var a=1===t.pointers.length,u=t.distance<2,l=t.deltaTime<250;if(a&&u&&l)return}return r&&o?void 0:s||o&&n&Ht||r&&n&Wt?this.preventSrc(e):void 0},preventSrc:function(t){this.manager.session.prevented=!0,t.preventDefault()}};var ye=1,ge=2,me=4,be=8,xe=be,Se=16,we=32;tt.prototype={defaults:{},set:function(t){return _t(this.options,t),this.manager&&this.manager.touchAction.update(),this},recognizeWith:function(t){if(l(t,"recognizeWith",this))return this;var e=this.simultaneous;return t=it(t,this),e[t.id]||(e[t.id]=t,t.recognizeWith(this)),this},dropRecognizeWith:function(t){return l(t,"dropRecognizeWith",this)?this:(t=it(t,this),delete this.simultaneous[t.id],this)},requireFailure:function(t){if(l(t,"requireFailure",this))return this;var e=this.requireFail;return t=it(t,this),x(e,t)===-1&&(e.push(t),t.requireFailure(this)),this},dropRequireFailure:function(t){if(l(t,"dropRequireFailure",this))return this;t=it(t,this);var e=x(this.requireFail,t);return e>-1&&this.requireFail.splice(e,1),this},hasRequireFailures:function(){return this.requireFail.length>0},canRecognizeWith:function(t){return!!this.simultaneous[t.id]},emit:function(t){function e(e){n.manager.emit(e,t)}var n=this,i=this.state;i<be&&e(n.options.event+et(i)),e(n.options.event),t.additionalEvent&&e(t.additionalEvent),i>=be&&e(n.options.event+et(i))},tryEmit:function(t){return this.canEmit()?this.emit(t):void(this.state=we)},canEmit:function(){for(var t=0;t<this.requireFail.length;){if(!(this.requireFail[t].state&(we|ye)))return!1;t++}return!0},recognize:function(t){var e=_t({},t);return f(this.options.enable,[this,e])?(this.state&(xe|Se|we)&&(this.state=ye),this.state=this.process(e),void(this.state&(ge|me|be|Se)&&this.tryEmit(e))):(this.reset(),void(this.state=we))},process:function(t){},getTouchAction:function(){},reset:function(){}},h(st,tt,{defaults:{pointers:1},attrTest:function(t){var e=this.options.pointers;return 0===e||t.pointers.length===e},process:function(t){var e=this.state,n=t.eventType,i=e&(ge|me),s=this.attrTest(t);return i&&(n&At||!s)?e|Se:i||s?n&Rt?e|be:e&ge?e|me:ge:we}}),h(ot,st,{defaults:{event:"pan",threshold:10,pointers:1,direction:Yt},getTouchAction:function(){var t=this.options.direction,e=[];return t&Ht&&e.push(_e),t&Wt&&e.push(fe),e},directionTest:function(t){var e=this.options,n=!0,i=t.distance,s=t.direction,o=t.deltaX,r=t.deltaY;return s&e.direction||(e.direction&Ht?(s=0===o?Ft:o<0?Nt:zt,n=o!=this.pX,i=Math.abs(t.deltaX)):(s=0===r?Ft:r<0?Xt:Ut,n=r!=this.pY,i=Math.abs(t.deltaY))),t.direction=s,n&&i>e.threshold&&s&e.direction},attrTest:function(t){return st.prototype.attrTest.call(this,t)&&(this.state&ge||!(this.state&ge)&&this.directionTest(t))},emit:function(t){this.pX=t.deltaX,this.pY=t.deltaY;var e=nt(t.direction);e&&(t.additionalEvent=this.options.event+e),this._super.emit.call(this,t)}}),h(rt,st,{defaults:{event:"pinch",threshold:0,pointers:2},getTouchAction:function(){return[de]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.scale-1)>this.options.threshold||this.state&ge)},emit:function(t){if(1!==t.scale){var e=t.scale<1?"in":"out";t.additionalEvent=this.options.event+e}this._super.emit.call(this,t)}}),h(at,tt,{defaults:{event:"press",pointers:1,time:251,threshold:9},getTouchAction:function(){return[ce]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,s=t.deltaTime>e.time;if(this._input=t,!i||!n||t.eventType&(Rt|At)&&!s)this.reset();else if(t.eventType&Dt)this.reset(),this._timer=u(function(){this.state=xe,this.tryEmit()},e.time,this);else if(t.eventType&Rt)return xe;return we},reset:function(){clearTimeout(this._timer)},emit:function(t){this.state===xe&&(t&&t.eventType&Rt?this.manager.emit(this.options.event+"up",t):(this._input.timeStamp=xt(),this.manager.emit(this.options.event,this._input)))}}),h(ut,st,{defaults:{event:"rotate",threshold:0,pointers:2},getTouchAction:function(){return[de]},attrTest:function(t){return this._super.attrTest.call(this,t)&&(Math.abs(t.rotation)>this.options.threshold||this.state&ge)}}),h(lt,st,{defaults:{event:"swipe",threshold:10,velocity:.3,direction:Ht|Wt,pointers:1},getTouchAction:function(){return ot.prototype.getTouchAction.call(this)},attrTest:function(t){var e,n=this.options.direction;return n&(Ht|Wt)?e=t.overallVelocity:n&Ht?e=t.overallVelocityX:n&Wt&&(e=t.overallVelocityY),this._super.attrTest.call(this,t)&&n&t.offsetDirection&&t.distance>this.options.threshold&&t.maxPointers==this.options.pointers&&bt(e)>this.options.velocity&&t.eventType&Rt},emit:function(t){var e=nt(t.offsetDirection);e&&this.manager.emit(this.options.event+e,t),this.manager.emit(this.options.event,t)}}),h(pt,tt,{defaults:{event:"tap",pointers:1,taps:1,interval:300,time:250,threshold:9,posThreshold:10},getTouchAction:function(){return[he]},process:function(t){var e=this.options,n=t.pointers.length===e.pointers,i=t.distance<e.threshold,s=t.deltaTime<e.time;if(this.reset(),t.eventType&Dt&&0===this.count)return this.failTimeout();if(i&&s&&n){if(t.eventType!=Rt)return this.failTimeout();var o=!this.pTime||t.timeStamp-this.pTime<e.interval,r=!this.pCenter||A(this.pCenter,t.center)<e.posThreshold;this.pTime=t.timeStamp,this.pCenter=t.center,r&&o?this.count+=1:this.count=1,this._input=t;var a=this.count%e.taps;if(0===a)return this.hasRequireFailures()?(this._timer=u(function(){this.state=xe,this.tryEmit()},e.interval,this),ge):xe}return we},failTimeout:function(){return this._timer=u(function(){this.state=we},this.options.interval,this),we},reset:function(){clearTimeout(this._timer)},emit:function(){this.state==xe&&(this._input.tapCount=this.count,this.manager.emit(this.options.event,this._input))}}),ct.VERSION="2.0.7",ct.defaults={domEvents:!1,touchAction:pe,enable:!0,inputTarget:null,inputClass:null,preset:[[ut,{enable:!1}],[rt,{enable:!1},["rotate"]],[lt,{direction:Ht}],[ot,{direction:Ht},["swipe"]],[pt],[pt,{event:"doubletap",taps:2},["tap"]],[at]],cssProps:{userSelect:"none",touchSelect:"none",touchCallout:"none",contentZooming:"none",userDrag:"none",tapHighlightColor:"rgba(0,0,0,0)"}};var Pe=1,Te=2;ht.prototype={set:function(t){return _t(this.options,t),t.touchAction&&this.touchAction.update(),t.inputTarget&&(this.input.destroy(),this.input.target=t.inputTarget,this.input.init()),this},stop:function(t){this.session.stopped=t?Te:Pe},recognize:function(t){var e=this.session;if(!e.stopped){this.touchAction.preventDefaults(t);var n,i=this.recognizers,s=e.curRecognizer;(!s||s&&s.state&xe)&&(s=e.curRecognizer=null);for(var o=0;o<i.length;)n=i[o],e.stopped===Te||s&&n!=s&&!n.canRecognizeWith(s)?n.reset():n.recognize(t),!s&&n.state&(ge|me|be)&&(s=e.curRecognizer=n),o++}},get:function(t){if(t instanceof tt)return t;for(var e=this.recognizers,n=0;n<e.length;n++)if(e[n].options.event==t)return e[n];return null},add:function(t){if(l(t,"add",this))return this;var e=this.get(t.options.event);return e&&this.remove(e),this.recognizers.push(t),t.manager=this,this.touchAction.update(),t},remove:function(t){if(l(t,"remove",this))return this;if(t=this.get(t)){var e=this.recognizers,n=x(e,t);n!==-1&&(e.splice(n,1),this.touchAction.update())}return this},on:function(t,e){if(t!==a&&e!==a){var n=this.handlers;return p(b(t),function(t){n[t]=n[t]||[],n[t].push(e)}),this}},off:function(t,e){if(t!==a){var n=this.handlers;return p(b(t),function(t){e?n[t]&&n[t].splice(x(n[t],e),1):delete n[t]}),this}},emit:function(t,e){this.options.domEvents&&ft(t,e);var n=this.handlers[t]&&this.handlers[t].slice();if(n&&n.length){e.type=t,e.preventDefault=function(){e.srcEvent.preventDefault()};for(var i=0;i<n.length;)n[i](e),i++}},destroy:function(){this.element&&dt(this,!1),this.handlers={},this.session={},this.input.destroy(),this.element=null}},_t(ct,{INPUT_START:Dt,INPUT_MOVE:It,INPUT_END:Rt,INPUT_CANCEL:At,STATE_POSSIBLE:ye,STATE_BEGAN:ge,STATE_CHANGED:me,STATE_ENDED:be,STATE_RECOGNIZED:xe,STATE_CANCELLED:Se,STATE_FAILED:we,DIRECTION_NONE:Ft,DIRECTION_LEFT:Nt,
DIRECTION_RIGHT:zt,DIRECTION_UP:Xt,DIRECTION_DOWN:Ut,DIRECTION_HORIZONTAL:Ht,DIRECTION_VERTICAL:Wt,DIRECTION_ALL:Yt,Manager:ht,Input:C,TouchAction:J,TouchInput:Y,MouseInput:X,PointerEventInput:U,TouchMouseInput:q,SingleTouchInput:H,Recognizer:tt,AttrRecognizer:st,Tap:pt,Pan:ot,Swipe:lt,Pinch:rt,Rotate:ut,Press:at,on:v,off:y,each:p,merge:wt,extend:St,assign:_t,inherit:h,bindFn:d,prefixed:P});var ke="undefined"!=typeof s?s:"undefined"!=typeof self?self:{};ke.Hammer=ct,i=function(){return ct}.call(e,n,e,t),!(i!==a&&(t.exports=i))}(window,document,"Hammer")},function(t,e,n){var i=n(95);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n._handle_8vrrs_5 {\n  width:          13px;\n  height:         13px;\n\n  cursor:         pointer;\n  transform:      translateX(0);\n  -webkit-backface-visibility: hidden;\n          backface-visibility: hidden\n}\n._handle__inner_8vrrs_1, ._handle__shadow_8vrrs_1 {\n  position:          absolute;\n  left:          0;\n  top:          0;\n  z-index:          1;\n  width:          100%;\n  height:          100%;\n  border-radius:          50%;\n  cursor:          pointer\n  /*transform:      translateZ(0);*/\n  /*backface-visibility: hidden;*/\n}\n._handle__inner_8vrrs_1 {\n  background:          #FFF\n}\n._handle__shadow_8vrrs_1 {\n  box-shadow:          1px 1px 2px black;\n  opacity:          .35;\n  z-index:          0\n}\n._handle_8vrrs_5:hover ._handle__inner_8vrrs_1, ._handle_8vrrs_5:hover ._handle__shadow_8vrrs_1 {\n  transform:          scale(1.1)\n}\n._handle_8vrrs_5:active ._handle__inner_8vrrs_1 {\n  transform:          scale(1.2)\n  /*box-shadow:     calc( $PX ) calc( $PX ) calc( 1*$PX ) rgba(0,0,0,.35);*/\n}\n._handle_8vrrs_5:active ._handle__shadow_8vrrs_1 {\n  opacity:          .85;\n  transform:          scale(1)\n}\n._handle_8vrrs_5._is-bound_8vrrs_54 {\n  width:          9px;\n  height:          20px;\n  margin-left:          -9px;\n  margin-top:          -10px\n}\n._handle_8vrrs_5._is-bound_8vrrs_54 ._handle__inner_8vrrs_1 {\n  background:          #FF512F\n}\n._handle_8vrrs_5._is-bound_8vrrs_54 ._handle__inner_8vrrs_1:after {\n  content:          '';\n  position:          absolute;\n  right:          0;\n  top:          50%;\n  margin-top:          -20px;\n  width:          1px;\n  height:          40px;\n  background:          #FF512F\n}\n._handle_8vrrs_5._is-bound_8vrrs_54 ._handle__inner_8vrrs_1, ._handle_8vrrs_5._is-bound_8vrrs_54 ._handle__shadow_8vrrs_1 {\n  border-top-left-radius:          3px;\n  border-bottom-left-radius:          3px;\n  border-top-right-radius:          0;\n  border-bottom-right-radius:          0\n}\n._handle_8vrrs_5._is-inversed_8vrrs_82 {\n  margin-left:          0\n}\n._handle_8vrrs_5._is-inversed_8vrrs_82 ._handle__shadow_8vrrs_1 {\n  box-shadow:          -1px 1px 2px black\n}\n._handle_8vrrs_5._is-inversed_8vrrs_82 ._handle__inner_8vrrs_1 {\n  border-top-left-radius:          0;\n  border-bottom-left-radius:          0;\n  border-top-right-radius:          3px;\n  border-bottom-right-radius:          3px\n}\n._handle_8vrrs_5._is-inversed_8vrrs_82 ._handle__inner_8vrrs_1:after {\n  right:          auto;\n  left:          0\n}\n",""])},function(t,e){t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var i={},s=0;s<this.length;s++){var o=this[s][0];"number"==typeof o&&(i[o]=!0)}for(s=0;s<e.length;s++){var r=e[s];"number"==typeof r[0]&&i[r[0]]||(n&&!r[2]?r[2]=n:n&&(r[2]="("+r[2]+") and ("+n+")"),t.push(r))}},t}},function(t,e,n){function i(t,e){for(var n=0;n<t.length;n++){var i=t[n],s=d[i.id];if(s){s.refs++;for(var o=0;o<s.parts.length;o++)s.parts[o](i.parts[o]);for(;o<i.parts.length;o++)s.parts.push(l(i.parts[o],e))}else{for(var r=[],o=0;o<i.parts.length;o++)r.push(l(i.parts[o],e));d[i.id]={id:i.id,refs:1,parts:r}}}}function s(t){for(var e=[],n={},i=0;i<t.length;i++){var s=t[i],o=s[0],r=s[1],a=s[2],u=s[3],l={css:r,media:a,sourceMap:u};n[o]?n[o].parts.push(l):e.push(n[o]={id:o,parts:[l]})}return e}function o(t,e){var n=v(),i=m[m.length-1];if("top"===t.insertAt)i?i.nextSibling?n.insertBefore(e,i.nextSibling):n.appendChild(e):n.insertBefore(e,n.firstChild),m.push(e);else{if("bottom"!==t.insertAt)throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");n.appendChild(e)}}function r(t){t.parentNode.removeChild(t);var e=m.indexOf(t);e>=0&&m.splice(e,1)}function a(t){var e=document.createElement("style");return e.type="text/css",o(t,e),e}function u(t){var e=document.createElement("link");return e.rel="stylesheet",o(t,e),e}function l(t,e){var n,i,s;if(e.singleton){var o=g++;n=y||(y=a(e)),i=p.bind(null,n,o,!1),s=p.bind(null,n,o,!0)}else t.sourceMap&&"function"==typeof URL&&"function"==typeof URL.createObjectURL&&"function"==typeof URL.revokeObjectURL&&"function"==typeof Blob&&"function"==typeof btoa?(n=u(e),i=h.bind(null,n),s=function(){r(n),n.href&&URL.revokeObjectURL(n.href)}):(n=a(e),i=c.bind(null,n),s=function(){r(n)});return i(t),function(e){if(e){if(e.css===t.css&&e.media===t.media&&e.sourceMap===t.sourceMap)return;i(t=e)}else s()}}function p(t,e,n,i){var s=n?"":i.css;if(t.styleSheet)t.styleSheet.cssText=b(e,s);else{var o=document.createTextNode(s),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(o,r[e]):t.appendChild(o)}}function c(t,e){var n=e.css,i=e.media;if(i&&t.setAttribute("media",i),t.styleSheet)t.styleSheet.cssText=n;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(n))}}function h(t,e){var n=e.css,i=e.sourceMap;i&&(n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */");var s=new Blob([n],{type:"text/css"}),o=t.href;t.href=URL.createObjectURL(s),o&&URL.revokeObjectURL(o)}var d={},f=function(t){var e;return function(){return"undefined"==typeof e&&(e=t.apply(this,arguments)),e}},_=f(function(){return/msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())}),v=f(function(){return document.head||document.getElementsByTagName("head")[0]}),y=null,g=0,m=[];t.exports=function(t,e){e=e||{},"undefined"==typeof e.singleton&&(e.singleton=_()),"undefined"==typeof e.insertAt&&(e.insertAt="bottom");var n=s(t);return i(n,e),function(t){for(var o=[],r=0;r<n.length;r++){var a=n[r],u=d[a.id];u.refs--,o.push(u)}if(t){var l=s(t);i(l,e)}for(var r=0;r<o.length;r++){var u=o[r];if(0===u.refs){for(var p=0;p<u.parts.length;p++)u.parts[p]();delete d[u.id]}}}};var b=function(){var t=[];return function(e,n){return t[e]=n,t.filter(Boolean).join("\n")}}()},function(t,e){t.exports={handle:"_handle_8vrrs_5",handle__inner:"_handle__inner_8vrrs_1",handle__shadow:"_handle__shadow_8vrrs_1","is-bound":"_is-bound_8vrrs_54","is-inversed":"_is-inversed_8vrrs_82"}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(92),c=i(p),h=n(93),d=(i(h),n(100)),f=i(d);n(101);var _=n(103),v=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.isProgress=!0,this._defaults.isRipple=!0},e.prototype._render=function(){t.prototype._render.call(this),this._props.isRipple&&(this.ripple=new f["default"]({withHold:!1,className:_.track__ripple,parent:this.el}))},e.prototype._applyShift=function(t){if(this._props.isProgress){this._props.isInversed&&(t=this._maxWidth-t);var e="scaleX( "+t+" ) translateZ(0)";this.trackProgressEl.style.transform=e}},e.prototype._addMainClasses=function(){var t=this._props,e=this.el.classList;e.add(_.track),t.isInversed&&e.add(_["is-inversed"]),t.isBound&&e.add(_["is-bound"]),"y"===t.direction&&e.add(_["is-y"])},e.prototype._addElements=function(){var t=this._props;if(t.isProgress){var e=document.createElement("div");e.classList.add(""+_["track__track-progress"]),this.trackProgressEl=e,this.el.appendChild(e)}if(!t.isBound){var n=document.createElement("div");n.classList.add(""+_.track__track),this.el.appendChild(n)}},e.prototype._pointerDown=function(t){var e=this._props,n="x"===e.direction?t.layerX:t.layerY;this._isPointerDown=!0,"y"===e.direction&&(n=this._maxWidth-t.layerY),n=this._props.isInversed&&n<0?this._maxWidth+n:n;var i=this._shiftToProgress(n);i=Math.abs(e.snapPoint-i)<e.snapStrength?e.snapPoint:i,this.setProgress(i),e.isRipple&&this.ripple._hold(t),this._callIfFunction(e.onSeekStart,t)},e}(c["default"]);e["default"]=v},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(89),c=i(p),h=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.withHold=!0},e.prototype._render=function(){t.prototype._render.call(this),this.curtain=document.createElement("div"),this.curtain.style.position="absolute",this.curtain.style.width="100%",this.curtain.style.height="100%",this.curtain.style.left=0,this.curtain.style.top=0,this.curtain.style.zIndex=1,this.el.appendChild(this.curtain),mojs.Shape&&this._addRipple()},e.prototype._addRipple=function(){var t,e=this;this.shape=new mojs.Shape((t={parent:this.el,left:0,top:this._o.top||0,strokeWidth:{10:0},fill:"none",stroke:"hotpink"},t.fill="hotpink",t.fillOpacity=.75,t.opacity={.85:0},t.radius=40,t.scale={0:1},t.isShowEnd=!1,t.onStart=function(){e.isStart=!0},t.onUpdate=this._onUpdate.bind(this),t.onComplete=function(){e.isStart=!1},t))},e.prototype._onUpdate=function(t){this._props.withHold&&t>=.15&&this.isStart&&!this.isRelease&&(this.isStart=!1,mojs.Shape&&this.shape.setSpeed(.02))},e.prototype._release=function(){this._props.withHold&&(this.isRelease=!0,mojs.Shape&&this.shape.setSpeed(1).play())},e.prototype._hold=function(t){var e=null!=t.offsetX?t.offsetX:t.layerX,n=null!=t.offsetY?t.offsetY:t.layerY;this.isRelease=!1,mojs.Shape&&this.shape.tune({x:e,y:n}).replay()},e.prototype._cancel=function(){this._props.withHold&&(this.isRelease=!0,mojs.Shape&&this.shape.pause().setSpeed(1).playBackward())},e}(c["default"]);e["default"]=h},function(t,e,n){var i=n(102);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n._track_1dpwb_5 {\n  position:           relative;\n  height:             100%\n\n\n}\n._track__track_1dpwb_1 {\n  position:           absolute;\n  top:           50%;\n  left:           0;\n  width:           100%;\n  height:           1px;\n  background:           #FFF;\n  box-shadow:           1px 1px 1px rgba(0, 0, 0, .5)\n\n\n}\n._track__track_1dpwb_1:after {\n  content:           '';\n  position:           absolute;\n  left:           0;\n  top:           -20px;\n  width:           100%;\n  height:           40px;\n  cursor:           pointer\n  /*background-color: yellow;*/\n\n\n}\n._track__track-progress_1dpwb_1 {\n  position:           absolute;\n  left:           0;\n  top:           50%;\n  margin-top:           -1px;\n  height:           3px;\n  width:           0.0625em;\n  /*background:       $c-orange;*/\n  background:           #FFFFFF;\n  z-index:           1;\n  transform-origin:           left center\n\n\n}\n._track__track-progress_1dpwb_1:after {\n  /*content:        '';*/\n  position:           absolute;\n  left:           0;\n  top:           -20px;\n  width:           100%;\n  height:           40px;\n  cursor:           pointer;\n  -webkit-backface-visibility:           hidden;\n          backface-visibility:           hidden\n\n\n}\n._track__ripple_1dpwb_1 {\n  position:           absolute;\n  left:           0;\n  top:           0;\n  right:           0;\n  bottom:           0;\n  overflow:           hidden\n  /*background:       black;*/\n  /*z-index:          1;*/\n\n\n}\n._track_1dpwb_5._is-inversed_1dpwb_66 {\n  left:           auto;\n  right:           0\n\n\n}\n._track_1dpwb_5._is-inversed_1dpwb_66 ._track__track-progress_1dpwb_1 {\n  transform-origin:           right center\n\n\n}\n._track_1dpwb_5._is-bound_1dpwb_75 ._track__track-progress_1dpwb_1 {\n  background:           #FF512F\n\n\n}\n._track_1dpwb_5._is-y_1dpwb_79 ._track__track_1dpwb_1 {\n  top:           0;\n  left:           50%;\n  height:           100%;\n  width:           1px\n  /*box-shadow:       calc( $PX ) calc( $PX ) calc( $PX ) rgba(0,0,0,.5); */\n\n\n}\n",""])},function(t,e){t.exports={track:"_track_1dpwb_5",track__track:"_track__track_1dpwb_1","track__track-progress":"_track__track-progress_1dpwb_1",track__ripple:"_track__ripple_1dpwb_1","is-inversed":"_is-inversed_1dpwb_66","is-bound":"_is-bound_1dpwb_75","is-y":"_is-y_1dpwb_79"}},function(t,e,n){var i=n(105);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n/*@import './handle.postcss.css';*/\n._slider_1e5my_6 {\n  position:           relative;\n  width:              100%;\n  height:             30px\n}\n._slider__inner_1e5my_1 {\n  width:           100%;\n  height:           100%;\n  position:           relative\n}\n._slider_1e5my_6 ._handle_1e5my_17, ._slider_1e5my_6 ._progress-handle_1e5my_18 {\n  z-index:           3;\n  position:           absolute;\n  top:           50%\n}\n._slider_1e5my_6 ._progress-handle_1e5my_18 {\n  left:           0;\n  margin-left:           -6.5px;\n  margin-top:           -6.5px\n}\n._slider_1e5my_6 ._track_1e5my_30 {\n  z-index:           2\n}\n._slider_1e5my_6._is-y_1e5my_34 {\n  width:           30px;\n  height:           100%;\n}\n._slider_1e5my_6._is-y_1e5my_34 ._handle_1e5my_17 {\n  left:           50%;\n  top:           auto;\n  bottom:           0;\n  margin-top:           0;\n  margin-bottom:           -6.5px\n}\n",""])},function(t,e){t.exports={slider:"_slider_1e5my_6",slider__inner:"_slider__inner_1e5my_1",handle:"_handle_1e5my_17","progress-handle":"_progress-handle_1e5my_18",track:"_track_1e5my_30","is-y":"_is-y_1e5my_34"}},function(t,e,n){var i=n(108);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n/*@import './handle.postcss.css';*/\n._player-slider_1h9vh_6 {\n  /*overflow:     hidden;*/\n  height:       40px\n\n}\n._player-slider_1h9vh_6 > div {\n  position:       absolute;\n  left:       0;\n  top:       0;\n  z-index:       2\n\n}\n._player-slider_1h9vh_6 ._slider_1h9vh_15 {\n  z-index:       1;\n  height:       100%\n\n}\n",""])},function(t,e){t.exports={"player-slider":"_player-slider_1h9vh_6",slider:"_slider_1h9vh_15"}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(111),c=i(p),h=n(115),d=i(h);n(119);var f=n(121),_=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.icon="",this._defaults.iconClass=""},e.prototype._render=function(){t.prototype._render.call(this);var e=this._props,n="icon-button";this.el.classList.add(f[n]);new c["default"]({shape:e.icon,parent:this.el,className:[f.icon,e.iconClass],prefix:e.prefix})},e}(d["default"]);e["default"]=_},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(89),c=i(p),h=n(93);i(h);n(112);var d=n(114),f=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.shape="",this._defaults.size="x1",this.NS="http://www.w3.org/2000/svg"},e.prototype._render=function(){this._addMainElement(),this.el.classList.add(d.icon),this.el.classList.add(d["is-"+this._props.size]),this.el.setAttribute("data-component","icon"),this._renderIcon()},e.prototype._renderIcon=function(){var t=this._props,e=document.createElementNS(this.NS,"svg"),n='<use xlink:href="#'+t.prefix+t.shape+'-icon-shape" />';e.setAttribute("viewBox","0 0 32 32"),this._addSVGHtml(e,n),this.el.appendChild(e)},e.prototype._addSVGHtml=function(t,e){var n=this._createElement("div"),i="<svg> "+e+" </svg>";n.innerHTML=i;for(var s=Array.prototype.slice.call(n.childNodes[0].childNodes),o=0;o<s.length;o++)t.appendChild(s[o])},e}(c["default"]);e["default"]=f},function(t,e,n){var i=n(113);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n._icon_if24v_5 {\n  position:     relative;\n  width:        12px;\n  height:       12px;\n  cursor:       pointer\n}\n._icon_if24v_5 > svg {\n  position:     absolute;\n  left:     0;\n  top:     0;\n  width:     100%;\n  height:     100%;\n  fill:     inherit\n}\n._icon_if24v_5 > svg > use {\n  fill:     inherit\n}\n._icon_if24v_5:after {\n  content:     '';\n  position:     absolute;\n  left:     0;\n  top:     0;\n  right:     0;\n  bottom:     0;\n  z-index:     1\n}\n._icon_if24v_5._is-x2_if24v_33 {\n  width:     16px;\n  height:     16px\n}\n",""])},function(t,e){t.exports={icon:"_icon_if24v_5","is-x2":"_is-x2_if24v_33"}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(89),c=i(p),h=n(93),d=i(h),f=n(100),_=i(f);n(116);var v=n(118),y=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.link=null,this._defaults.title="",this._defaults.target=null,this._defaults.onPointerDown=null,this._defaults.onPointerUp=null,this._defaults.onDoubleTap=null},e.prototype._render=function(){var t=this._props,e="button",n=null!=t.link?"a":"div";this._addMainElement(n),this.el.classList.add(v[e]),this.el.setAttribute("title",t.title),t.link&&this.el.setAttribute("href",t.link),t.link&&t.target&&this.el.setAttribute("target",t.target),this._addListeners(),this._createRipple()},e.prototype._createRipple=function(){this.ripple=new _["default"]({className:v.button__ripple,parent:this.el})},e.prototype._addListeners=function(){this._addPointerDownEvent(this.el,this._pointerDown.bind(this)),this._addPointerUpEvent(this.el,this._pointerUp.bind(this)),this._addPointerUpEvent(document,this._pointerCancel.bind(this)),(0,d["default"])(this.el).on("doubletap",this._doubleTap.bind(this))},e.prototype._pointerDown=function(t){this.wasTouched=!0,this._callIfFunction(this._props.onPointerDown),this.ripple._hold(t)},e.prototype._pointerUp=function(t){return this.wasTouched?(this.wasTouched=!1,this._callIfFunction(this._props.onPointerUp),this.ripple._release(),t.preventDefault(),!1):void t.stopPropagation()},e.prototype._pointerCancel=function(t){this.wasTouched&&(this.wasTouched=!1,this.ripple._cancel())},e.prototype._doubleTap=function(t){this._callIfFunction(this._props.onDoubleTap)},e}(c["default"]);e["default"]=y},function(t,e,n){var i=n(117);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,'/*$PX:      1/16rem;*/\n\n._button_wb9ek_4 {\n  position:   relative;\n  width:      35px;\n  height:     40px;\n  cursor:     pointer;\n  fill:       #FFF;\n  display:    inline-block\n}\n\n._button__ripple_wb9ek_1 {\n  position:   absolute;\n  left:   0;\n  right:   0;\n  top:   0;\n  bottom:   0;\n  z-index:   5;\n  overflow:   hidden\n}\n\n._button__ripple_wb9ek_1:after {\n  content:   "";\n  position:   absolute;\n  left:   0;\n  right:   0;\n  top:   0;\n  bottom:   0;\n  z-index:   1;\n  cursor:   pointer\n}\n\n._button_wb9ek_4:hover {\n  opacity:   .85\n}\n\n._button_wb9ek_4:active {\n  opacity:   1\n}\n',""])},function(t,e){t.exports={button:"_button_wb9ek_4",button__ripple:"_button__ripple_wb9ek_1"}},function(t,e,n){var i=n(120);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n\n._icon-button_qglug_4 {\n  /* styles */\n}\n\n._icon-button_qglug_4 ._icon_qglug_4 {\n\n  position: absolute;\n\n  left: 50%;\n\n  top: 50%;\n\n  transform: translate( -50%, -50% )\n}\n",""])},function(t,e){t.exports={"icon-button":"_icon-button_qglug_4",icon:"_icon_qglug_4"}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(89),c=i(p),h=n(123),d=i(h),f=n(91),_=i(f);n(131);var v=n(133),y=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.isOn=!1,this._defaults.speed=1,this._defaults.progress=.5,this._defaults.onSpeedChange=null,this._defaults.onIsSpeed=null},e.prototype.reset=function(){this._onDoubleTap()},e.prototype.decreaseSpeed=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.01,e=this._props;return e.progress-=t,e.progress=e.progress<0?0:e.progress,this.slider.setProgress(e.progress),this},e.prototype.increaseSpeed=function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:.01,e=this._props;return e.progress+=t,e.progress=e.progress>1?1:e.progress,this.slider.setProgress(e.progress),this},e.prototype._render=function(){var t=this._props,e="speed-control",n=this._createElement("div");this._createElement("div"),this._createElement("div");this._addMainElement(),this.el.classList.add(v[e]),n.classList.add(v[e+"__slider"]),this.el.appendChild(n),this.labelButton=new d["default"]({parent:this.el,isOn:t.isOn,className:v[e+"__icon"],onStateChange:this._onButtonStateChange.bind(this),onDoubleTap:this._onDoubleTap.bind(this)}),this.slider=new _["default"]({parent:n,isProgress:!1,direction:"y",onProgress:this._onSliderProgress.bind(this),snapPoint:.5,snapStrength:.05}),this.slider.setProgress(this._speedToProgress(this._props.speed))},e.prototype._onSliderProgress=function(t){t=Math.max(t,1e-4);var e=this._props;this._callIfFunction(e.onSpeedChange,this._progressToSpeed(t),t),this.labelButton.setLabelText(this._progressToLabel(e.progress=t))},e.prototype._onButtonStateChange=function(t){var e=t?"add":"remove";this.el.classList[e](v["is-on"]),this._callIfFunction(this._props.onIsSpeed,t)},e.prototype._progressToLabel=function(t){var e=this._progressToSpeed(t).toFixed(2),n=/\.+00$/;return e.match(n)&&(e=e.replace(n,"")),e+"x"},e.prototype._progressToSpeed=function(t){var e=t;return t<.5&&(e=2*t),.5===t&&(e=1),t>.5&&(t-=.5,e=1+18*t),e},e.prototype._speedToProgress=function(t){var e=t;return t<1&&(e=t/2),1===t&&(e=.5),t>1&&(e=.5+(t-1)/18),e},e.prototype._onDoubleTap=function(){this.slider.setProgress(.5),this.labelButton.off()},e}(c["default"]);e["default"]=y},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(124),c=i(p);n(128);var h=n(130),d=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.title="speed (reset: alt + 1)"},e.prototype.setLabelText=function(t){this.label.innerHTML=t},e.prototype._render=function(){t.prototype._render.call(this),this._addClass(this.el,h["label-button"]),this._addLabel()},e.prototype._addLabel=function(){this.label=this._createElement("div"),this.label.classList.add(h["label-button__label"]),this.el.appendChild(this.label)},e}(c["default"]);e["default"]=d},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(115),c=i(p);n(125);var h=n(127),d=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.isOn=!1,this._defaults.onStateChange=null},e.prototype.on=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._props.isOn=!0,this._reactOnStateChange(t)},e.prototype.off=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this._props.isOn=!1,this._reactOnStateChange(t)},e.prototype._render=function(){t.prototype._render.call(this),this.el.classList.add(h["button-switch"]),this._setState(),this._reactOnStateChange()},e.prototype._pointerUp=function(e){return this.wasTouched?(this._changeState(),void t.prototype._pointerUp.call(this,e)):(this.wasTouched=!1,void e.stopPropagation())},e.prototype._changeState=function(){this._props.isOn=!this._props.isOn,this._reactOnStateChange()},e.prototype._reactOnStateChange=function(){var t=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];t&&this._callIfFunction(this._props.onStateChange,this._props.isOn),this._setState()},e.prototype._setState=function(){},e}(c["default"]);e["default"]=d},function(t,e,n){var i=n(126);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,'/*$PX:      1/16rem;*/\n\n._button-switch_1putg_4 {\n  position:     relative;\n  display:      inline-block\n}\n\n._button-switch_1putg_4 > ._icon_1putg_8 {\n  position:     absolute\n}\n\n._button-switch_1putg_4:after {\n  content:     "";\n  position:     absolute;\n  left:     0;\n  top:     0;\n  right:     0;\n  bottom:     0;\n  z-index:     1\n}\n',""])},function(t,e){t.exports={"button-switch":"_button-switch_1putg_4",icon:"_icon_1putg_8"}},function(t,e,n){var i=n(129);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n\n._label-button_1cxps_4 {\n  font-family:        Arial, sans-serif;\n  font-size:          9px;\n  letter-spacing:     0.5px;\n  color:              white\n}\n\n._label-button__label_1cxps_1 {\n  position:        absolute;\n  left:        50%;\n  top:        50%;\n  transform:        translate( -50%, -50% )\n}\n",""])},function(t,e){t.exports={"label-button":"_label-button_1cxps_4","label-button__label":"_label-button__label_1cxps_1"}},function(t,e,n){var i=n(132);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n\n._speed-control_1jd3z_3 {\n  position:       relative;\n  display:        inline-block;\n  height:         40px\n}\n\n._speed-control__slider_1jd3z_1 {\n  position:       absolute;\n  bottom:       100%;\n  left:       3px;\n  width:       30px;\n  height:       120px;\n  padding-top:       20px;\n  padding-bottom:       20px;\n  border-top-right-radius:       3px;\n  border-top-left-radius:       3px;\n  background:       #3A0839;\n  transform:       translate(-99999999px, -99999999px);\n  -webkit-backface-visibility:       hidden;\n          backface-visibility:       hidden\n}\n\n._speed-control__slider_1jd3z_1:before, ._speed-control__slider_1jd3z_1:after {\n  content:       '';\n  position:       absolute;\n  top:       50%;\n  width:       3px;\n  height:       1px;\n  background:       #FFF\n}\n\n._speed-control__slider_1jd3z_1:before {\n  left:       5px\n}\n\n._speed-control__slider_1jd3z_1:after {\n  right:       5px\n}\n\n._speed-control__button_1jd3z_1 {\n  border:       1px solid cyan\n}\n\n._speed-control_1jd3z_3._is-on_1jd3z_48 ._speed-control__slider_1jd3z_1 {\n  transform:       translate(0, 0)\n}\n",""])},function(t,e){t.exports={"speed-control":"_speed-control_1jd3z_3","speed-control__slider":"_speed-control__slider_1jd3z_1","speed-control__button":"_speed-control__button_1jd3z_1","is-on":"_is-on_1jd3z_48"}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(135),c=i(p);n(139);var h=n(141),d=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.icon1="pause",this._defaults.icon2="play",this._defaults.title="play/pause (alt + p)"},e.prototype._render=function(){t.prototype._render.call(this),this._addClass(this.el,h["play-button"])},e}(c["default"]);e["default"]=d},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(124),c=i(p),h=n(111),d=i(h);n(136);var f=n(138),_=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._render=function(){t.prototype._render.call(this),this.el.classList.add(f["icon-fork"]);var e=this._props,n=e.prefix,i=this.el,s=f.icon;this.icon1=new d["default"]({shape:e.icon1,prefix:n,parent:i,className:s}),this.icon2=new d["default"]({shape:e.icon2,prefix:n,parent:i,className:s})},e.prototype._setState=function(){var t=this._props,e=this.el.classList,n=t.isOn?"add":"remove";e[n](f["is-on"])},e}(c["default"]);e["default"]=_},function(t,e,n){var i=n(137);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n\n._icon-fork_1n6j9_4 {\n}\n\n._icon-fork_1n6j9_4 > ._icon_1n6j9_4 {\n\n    /*position:   absolute;*/\n\n    opacity: 0;\n\n    position: absolute;\n\n    top: 50%;\n\n    left: 50%;\n\n    transform: translate( -50%, -50% )\n}\n\n._icon-fork_1n6j9_4 > ._icon_1n6j9_4:nth-of-type(3) {\n\n    position: absolute;\n\n    opacity: 1\n}\n\n._icon-fork_1n6j9_4._is-on_1n6j9_18 > ._icon_1n6j9_4:nth-of-type(2) {\n\n    opacity: 1\n}\n\n._icon-fork_1n6j9_4._is-on_1n6j9_18 > ._icon_1n6j9_4:nth-of-type(3) {\n\n    opacity: 0\n}\n",""])},function(t,e){t.exports={"icon-fork":"_icon-fork_1n6j9_4",icon:"_icon_1n6j9_4","is-on":"_is-on_1n6j9_18"}},function(t,e,n){var i=n(140);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n\n._play-button_16uj5_4 {\n  /* styles */\n}\n",""])},function(t,e){t.exports={"play-button":"_play-button_16uj5_4"}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(110),c=i(p);n(143);var h=n(145),d=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.icon="stop",this._defaults.title="stop (alt + s)"},e.prototype._render=function(){t.prototype._render.call(this),this._addClass(this.el,h["stop-button"])},e}(c["default"]);e["default"]=d},function(t,e,n){var i=n(144);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n\n._stop-button_lpa7l_4 {\n  /* styles */\n}\n",""])},function(t,e){t.exports={"stop-button":"_stop-button_lpa7l_4"}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(147),c=i(p);
n(151);var h=n(153),d=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.icon="repeat",this._defaults.iconSize="x2",this._defaults.title="repeat (alt + r)"},e.prototype._render=function(){t.prototype._render.call(this),this._addClass(this.el,h["repeat-button"])},e}(c["default"]);e["default"]=d},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(111),c=i(p),h=n(124),d=i(h);n(148);var f=n(150),_=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.icon="",this._defaults.iconSize=""},e.prototype._render=function(){t.prototype._render.call(this),this.el.classList.add(f["opacity-switch"]);var e=this._props,n=new c["default"]({parent:this.el,shape:e.icon,size:e.iconSize,className:f.icon,prefix:e.prefix});this.el.appendChild(n.el)},e.prototype._setState=function(){var t=this._props.isOn?"add":"remove";this.el.classList[t](f["is-on"])},e}(d["default"]);e["default"]=_},function(t,e,n){var i=n(149);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n\n._opacity-switch_17z5s_4 {\n  opacity:      .5;\n\n\n\n\n}\n\n._opacity-switch_17z5s_4 ._icon_17z5s_6 {\n  position:   absolute;\n  left:       50%;\n  top:        50%;\n  transform:  translate(-50%, -50%);\n\n\n\n\n}\n\n._opacity-switch_17z5s_4:hover {\n  opacity:      .4;\n\n\n\n\n}\n\n._opacity-switch_17z5s_4._is-on_17z5s_15 {\n  opacity:      1;\n\n\n\n\n}\n\n._opacity-switch_17z5s_4._is-on_17z5s_15:hover {\n  opacity:      .85;\n\n\n\n\n}\n",""])},function(t,e){t.exports={"opacity-switch":"_opacity-switch_17z5s_4",icon:"_icon_17z5s_6","is-on":"_is-on_17z5s_15"}},function(t,e,n){var i=n(152);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n\n._repeat-button_xhfpi_4 {\n  /* styles */\n}\n",""])},function(t,e){t.exports={"repeat-button":"_repeat-button_xhfpi_4"}},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(146),c=i(p),h=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.icon="bounds",this._defaults.title="progress bounds (alt + b)"},e}(c["default"]);e["default"]=h},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}e.__esModule=!0;var s=n(77),o=i(s),r=n(78),a=i(r),u=n(79),l=i(u),p=n(124),c=i(p),h=n(111),d=i(h);n(156);var f=n(158),_="hide-button",v=function(t){function e(){return(0,o["default"])(this,e),(0,a["default"])(this,t.apply(this,arguments))}return(0,l["default"])(e,t),e.prototype._declareDefaults=function(){t.prototype._declareDefaults.call(this),this._defaults.title="hide (alt + h)"},e.prototype._render=function(){t.prototype._render.call(this),this.el.classList.add(f[_]),this._addIcon()},e.prototype._addIcon=function(){this.icon=new d["default"]({parent:this.el,className:f[_+"__icon"],shape:"hide",prefix:this._props.prefix})},e.prototype._setState=function(){var t=this._props.isOn?"add":"remove";this.el.classList[t](f["is-hidden"])},e}(c["default"]);e["default"]=v},function(t,e,n){var i=n(157);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,"/*$PX:      1/16rem;*/\n\n._hide-button_aiv1o_4 {\n\n  width:        22px;\n  height:       16px;\n\n  background:   #3A0839;\n\n  border-top-left-radius:  3px;\n  border-top-right-radius: 3px\n}\n\n._hide-button__icon_aiv1o_1 {\n\n  position:        absolute;\n\n  left:        50%;\n\n  top:        50%;\n\n  width:        8px;\n\n  height:        8px;\n\n  margin-top:        1px;\n\n  transform:        translate( -50%, -50% )\n}\n\n._hide-button_aiv1o_4._is-hidden_aiv1o_24 ._hide-button__icon_aiv1o_1 {\n\n  transform:        translate( -50%, -65% ) rotate( 180deg )\n}\n",""])},function(t,e){t.exports={"hide-button":"_hide-button_aiv1o_4","hide-button__icon":"_hide-button__icon_aiv1o_1","is-hidden":"_is-hidden_aiv1o_24"}},function(t,e,n){var i=n(160);"string"==typeof i&&(i=[[t.id,i,""]]);n(97)(i,{});i.locals&&(t.exports=i.locals)},function(t,e,n){e=t.exports=n(96)(),e.push([t.id,'/*$PX:      1/16rem;*/\n\n._mojs-player_12g93_4 {\n  position:       fixed;\n  left:           0;\n  bottom:         0;\n  width:          100%;\n  height:         40px;\n  background:     rgba(58, 8, 57, .85);\n  z-index:        100;\n}\n\n._mojs-player_12g93_4 * {\n  box-sizing: border-box;\n}\n\n._mojs-player__left_12g93_1 {\n  position:       absolute;\n  left:       0;\n  width:       175px;\n}\n\n._mojs-player__mid_12g93_1 {\n  position:       absolute;\n  left:       175px;\n  right:       17.5px;\n  overflow:       hidden;\n  padding:       0 20px;\n}\n\n._mojs-player__right_12g93_1 {\n  position:       absolute;\n  right:       0;\n}\n\n._mojs-player__hide-button_12g93_1 {\n  position:       absolute;\n  right:       6px;\n  bottom:       100%;\n}\n\n._mojs-player__mojs-logo_12g93_1 [data-component="icon"] {\n  fill:       #FF512F;\n}\n\n._mojs-player_12g93_4._is-hidden_12g93_51 {\n  transform:       translateY(100%);\n}\n\n._mojs-player_12g93_4._is-transition_12g93_54 {\n  transition:       all .15s ease-out;\n}\n',""])},function(t,e){t.exports={"mojs-player":"_mojs-player_12g93_4","mojs-player__left":"_mojs-player__left_12g93_1","mojs-player__mid":"_mojs-player__mid_12g93_1","mojs-player__right":"_mojs-player__right_12g93_1","mojs-player__hide-button":"_mojs-player__hide-button_12g93_1","mojs-player__mojs-logo":"_mojs-player__mojs-logo_12g93_1","is-hidden":"_is-hidden_12g93_51","is-transition":"_is-transition_12g93_54"}}])});


/***/ }),

/***/ "./src/burst.babel.js":
/*!****************************!*\
  !*** ./src/burst.babel.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var tween_timeline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tween/timeline */ "./src/tween/timeline.babel.js");
/* harmony import */ var _shape_swirl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./shape-swirl */ "./src/shape-swirl.babel.js");
/* harmony import */ var _tunable__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./tunable */ "./src/tunable.babel.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




var Burst = /*#__PURE__*/function (_Tunable) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Burst, _Tunable);
  var _super = _createSuper(Burst);
  function Burst() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Burst);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Burst, [{
    key: "_declareDefaults",
    value:
    /*
      Method to declare defaults.
      @override @ ShapeSwirl.
    */
    function _declareDefaults() {
      this._defaults = {
        /* [number > 0] :: Quantity of Burst particles. */
        count: 5,
        /* [0 < number < 360] :: Degree of the Burst. */
        degree: 360,
        /* ∆ :: [number > 0] :: Radius of the Burst. */
        radius: {
          0: 50
        },
        /* ∆ :: [number > 0] :: X radius of the Burst. */
        radiusX: null,
        /* ∆ :: [number > 0] :: Y radius of the Burst. */
        radiusY: null,
        /* [number >= 0] :: width of the main swirl. */
        width: 0,
        /* [number >= 0] :: height of the main swirl. */
        height: 0
      };
    }

    /*
      Method to create a then record for the module.
      @public
      overrides @ Thenable
      @param    {Object} Options for the next animation.
      @returns  {Object} this.
    */
  }, {
    key: "then",
    value: function then(o) {
      // remove tween properties (not callbacks)
      this._removeTweenProperties(o);
      var newMaster = this._masterThen(o),
        newSwirls = this._childThen(o);
      this._setSwirlDuration(newMaster, this._calcPackTime(newSwirls));
      this.timeline._recalcTotalDuration();
      return this;
    }

    /*
      Method to start the animation with optional new options.
      @public
      @param {Object} New options to set on the run.
      @returns {Object} this.
    */
  }, {
    key: "tune",
    value: function tune(o) {
      if (o == null) {
        return this;
      }

      // save timeline options to _timelineOptions
      // and delete the timeline options on o
      // cuz masterSwirl should not get them
      this._saveTimelineOptions(o);

      // add new timeline properties to timeline
      this.timeline._setProp(this._timelineOptions);

      // remove tween options (not callbacks)
      this._removeTweenProperties(o);

      // tune _props
      this._tuneNewOptions(o);

      // tune master swirl
      this.masterSwirl.tune(o);

      // tune child swirls
      this._tuneSwirls(o);

      // recalc time for modules
      this._recalcModulesTime();
      return this;
    }

    // ^ PUBLIC  METHODS ^
    // v PRIVATE METHODS v

    /*
      Method to copy `_o` options to `_props` object
      with fallback to `_defaults`.
      @private
      @overrides @ Module
    */
  }, {
    key: "_extendDefaults",
    value: function _extendDefaults() {
      // remove tween properties (not callbacks)
      this._removeTweenProperties(this._o);
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Burst.prototype), "_extendDefaults", this).call(this);
    }

    /*
      Method to remove all tween (excluding
      callbacks) props from object.
      @private
      @param {Object} Object which should be cleaned
                      up from tween properties.
    */
  }, {
    key: "_removeTweenProperties",
    value: function _removeTweenProperties(o) {
      for (var key in (_h__WEBPACK_IMPORTED_MODULE_6___default().tweenOptionMap)) {
        // remove all items that are not declared in _defaults
        if (this._defaults[key] == null) {
          delete o[key];
        }
      }
    }

    /*
      Method to recalc modules chain tween
      times after tuning new options.
      @private
    */
  }, {
    key: "_recalcModulesTime",
    value: function _recalcModulesTime() {
      var modules = this.masterSwirl._modules,
        swirls = this._swirls,
        shiftTime = 0;
      for (var i = 0; i < modules.length; i++) {
        var tween = modules[i].tween,
          packTime = this._calcPackTime(swirls[i]);
        tween._setProp({
          'duration': packTime,
          'shiftTime': shiftTime
        });
        shiftTime += packTime;
      }
      this.timeline._recalcTotalDuration();
    }

    /*
      Method to tune Swirls with new options.
      @private
      @param {Object} New options.
    */
  }, {
    key: "_tuneSwirls",
    value: function _tuneSwirls(o) {
      // get swirls in first pack
      var pack0 = this._swirls[0];
      for (var i = 0; i < pack0.length; i++) {
        var swirl = pack0[i],
          option = this._getChildOption(o || {}, i);

        // since the `degreeShift` participate in
        // children position calculations, we need to keep
        // the old `degreeShift` value if new not set
        var isDegreeShift = option.degreeShift != null;
        if (!isDegreeShift) {
          option.degreeShift = this._swirls[0][i]._props.degreeShift;
        }
        this._addBurstProperties(option, i);

        // after burst position calculation - delete the old `degreeShift`
        // from the options, since anyways we have copied it from the swirl
        if (!isDegreeShift) {
          delete option.degreeShift;
        }
        swirl.tune(option);
        this._refreshBurstOptions(swirl._modules, i);
      }
    }

    /*
      Method to refresh burst x/y/rotate options on further chained
      swirls, because they will be overriden after `tune` call on
      very first swirl.
      @param {Array} Chained modules array
      param {Number} Index of the first swirl in the chain.
    */
  }, {
    key: "_refreshBurstOptions",
    value: function _refreshBurstOptions(modules, i) {
      for (var j = 1; j < modules.length; j++) {
        var module = modules[j],
          options = {};
        this._addBurstProperties(options, i, j);
        module._tuneNewOptions(options);
      }
    }

    /*
      Method to call then on masterSwirl.
      @param {Object} Then options.
      @returns {Object} New master swirl.
    */
  }, {
    key: "_masterThen",
    value: function _masterThen(o) {
      this.masterSwirl.then(o);

      // get the latest master swirl in then chain
      var newMasterSwirl = _h__WEBPACK_IMPORTED_MODULE_6___default().getLastItem(this.masterSwirl._modules);

      // save to masterSwirls
      this._masterSwirls.push(newMasterSwirl);
      return newMasterSwirl;
    }

    /*
      Method to call then on child swilrs.
      @param {Object} Then options.
      @return {Array} Array of new Swirls.
    */
  }, {
    key: "_childThen",
    value: function _childThen(o) {
      var pack = this._swirls[0],
        newPack = [];
      for (var i = 0; i < pack.length; i++) {
        // get option by modulus
        var options = this._getChildOption(o, i);
        var swirl = pack[i];

        // add new Master Swirl as parent of new childswirl
        options.parent = this.el;
        this._addBurstProperties(options, i, this._masterSwirls.length - 1);
        swirl.then(options);

        // save the new item in `then` chain
        newPack.push(_h__WEBPACK_IMPORTED_MODULE_6___default().getLastItem(swirl._modules));
      }

      // save the pack to _swirls object
      this._swirls[this._masterSwirls.length - 1] = newPack;
      return newPack;
    }

    /*
      Method to initialize properties.
      @private
      @overrides @ Thenable
    */
  }, {
    key: "_vars",
    value: function _vars() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Burst.prototype), "_vars", this).call(this);

      // just buffer timeline for calculations
      this._bufferTimeline = new tween_timeline__WEBPACK_IMPORTED_MODULE_7__["default"]();
    }

    /*
      Method for initial render of the module.
    */
  }, {
    key: "_render",
    value: function _render() {
      this._o.isWithShape = false;
      this._o.isSwirl = this._props.isSwirl;
      this._o.callbacksContext = this;

      // save timeline options and remove from _o
      // cuz the master swirl should not get them
      this._saveTimelineOptions(this._o);
      this.masterSwirl = new MainSwirl(this._o);
      this._masterSwirls = [this.masterSwirl];
      this.el = this.masterSwirl.el;
      this._renderSwirls();
    }

    /*
      Method for initial render of swirls.
      @private
    */
  }, {
    key: "_renderSwirls",
    value: function _renderSwirls() {
      var p = this._props,
        pack = [];
      for (var i = 0; i < p.count; i++) {
        var option = this._getChildOption(this._o, i);
        pack.push(new ChildSwirl(this._addOptionalProps(option, i)));
      }
      this._swirls = {
        0: pack
      };
      this._setSwirlDuration(this.masterSwirl, this._calcPackTime(pack));
    }

    /*
      Method to save timeline options to _timelineOptions
      and delete the property on the object.
      @private
      @param {Object} The object to save the timeline options from.
    */
  }, {
    key: "_saveTimelineOptions",
    value: function _saveTimelineOptions(o) {
      this._timelineOptions = o.timeline;
      delete o.timeline;
    }

    /*
      Method to calculate total time of array of
      concurrent tweens.
      @param   {Array}  Pack to calculate the total time for.
      @returns {Number} Total pack duration.
    */
  }, {
    key: "_calcPackTime",
    value: function _calcPackTime(pack) {
      var maxTime = 0;
      for (var i = 0; i < pack.length; i++) {
        var tween = pack[i].tween,
          p = tween._props;
        maxTime = Math.max(p.repeatTime / p.speed, maxTime);
      }
      return maxTime;
    }

    /*
      Method to set duration for Swirl.
      @param {Object} Swirl instance to set the duration to.
      @param {Number} Duration to set.
    */
  }, {
    key: "_setSwirlDuration",
    value: function _setSwirlDuration(swirl, duration) {
      swirl.tween._setProp('duration', duration);
      var isRecalc = swirl.timeline && swirl.timeline._recalcTotalDuration;
      isRecalc && swirl.timeline._recalcTotalDuration();
    }

    /*
      Method to get childOption form object call by modulus.
      @private
      @param   {Object} Object to look in.
      @param   {Number} Index of the current Swirl.
      @returns {Object} Options for the current swirl.
    */
  }, {
    key: "_getChildOption",
    value: function _getChildOption(obj, i) {
      var options = {};
      for (var key in obj.children) {
        options[key] = this._getPropByMod(key, i, obj.children);
      }
      return options;
    }

    /*
      Method to get property by modulus.
      @private
      @param {String} Name of the property.
      @param {Number} Index for the modulus.
      @param {Object} Source object to check in.
      @returns {Any} Property.
    */
  }, {
    key: "_getPropByMod",
    value: function _getPropByMod(name, index) {
      var sourceObj = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var prop = sourceObj[name];
      return _h__WEBPACK_IMPORTED_MODULE_6___default().isArray(prop) ? prop[index % prop.length] : prop;
    }

    /*
      Method to add optional Swirls' properties to passed object.
      @private
      @param {Object} Object to add the properties to.
      @param {Number} Index of the property.
    */
  }, {
    key: "_addOptionalProps",
    value: function _addOptionalProps(options, index) {
      options.index = index;
      options.parent = this.masterSwirl.el;
      this._addBurstProperties(options, index);
      return options;
    }

    /*
      Method to add Burst options to object.
      @private
      @param {Object} Options to add the properties to.
      @param {Number} Index of the Swirl.
      @param {Number} Index of the main swirl.
    */
  }, {
    key: "_addBurstProperties",
    value: function _addBurstProperties(options, index, i) {
      // save index of the module
      var mainIndex = this._index;

      // temporary change the index to parse index based properties like stagger
      this._index = index;

      // parse degree shift for the bit
      var degreeShift = this._parseProperty('degreeShift', options.degreeShift || 0);

      // put the index of the module back
      this._index = mainIndex;
      var p = this._props,
        degreeCnt = p.degree % 360 === 0 ? p.count : p.count - 1 || 1,
        step = p.degree / degreeCnt,
        pointStart = this._getSidePoint('start', index * step + degreeShift, i),
        pointEnd = this._getSidePoint('end', index * step + degreeShift, i);
      options.x = this._getDeltaFromPoints('x', pointStart, pointEnd);
      options.y = this._getDeltaFromPoints('y', pointStart, pointEnd);
      options.rotate = this._getBitRotation(options.rotate || 0, degreeShift, index);
    }

    /*
      Method to get shapes rotation in burst so
      it will follow circular shape.
        @param    {Number, Object} Base rotation.
       @param    {Number}         Rotation shift for the bit
       @param    {Number}         Shape's index in burst.
       @returns  {Number}         Rotation in burst.
    */
  }, {
    key: "_getBitRotation",
    value: function _getBitRotation() {
      var rotationProperty = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var rotationShift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var i = arguments.length > 2 ? arguments[2] : undefined;
      var p = this._props,
        degCnt = p.degree % 360 === 0 ? p.count : p.count - 1 || 1,
        step = p.degree / degCnt,
        rotate = i * step + 90;
      rotate += rotationShift;

      // if not delta option
      if (!this._isDelta(rotationProperty)) {
        rotationProperty += rotate;
      } else {
        var delta = {},
          keys = Object.keys(rotationProperty),
          start = keys[0],
          end = rotationProperty[start];
        start = _h__WEBPACK_IMPORTED_MODULE_6___default().parseStringOption(start, i);
        end = _h__WEBPACK_IMPORTED_MODULE_6___default().parseStringOption(end, i);

        // new start = newEnd
        delta[parseFloat(start) + rotate] = parseFloat(end) + rotate;
        rotationProperty = delta;
      }
      return rotationProperty;
    }

    /*
      Method to get radial point on `start` or `end`.
      @private
      @param {String} Name of the side - [start, end].
      @param {Number} Rotatation of the radial point.
      @param {Number} Index of the main swirl.
      @returns radial point.
    */
  }, {
    key: "_getSidePoint",
    value: function _getSidePoint(side, rotate, i) {
      var sideRadius = this._getSideRadius(side, i);
      return _h__WEBPACK_IMPORTED_MODULE_6___default().getRadialPoint({
        radius: sideRadius.radius,
        radiusX: sideRadius.radiusX,
        radiusY: sideRadius.radiusY,
        rotate: rotate,
        // center:  { x: p.center, y: p.center }
        center: {
          x: 0,
          y: 0
        }
      });
    }

    /*
      Method to get radius of the side.
      @private
      @param {String} Name of the side - [start, end].
      @param {Number} Index of the main swirl.
      @returns {Object} Radius.
    */
  }, {
    key: "_getSideRadius",
    value: function _getSideRadius(side, i) {
      return {
        radius: this._getRadiusByKey('radius', side, i),
        radiusX: this._getRadiusByKey('radiusX', side, i),
        radiusY: this._getRadiusByKey('radiusY', side, i)
      };
    }

    /*
      Method to get radius from ∆ or plain property.
      @private
      @param {String} Key name.
      @param {String} Side name - [start, end].
      @param {Number} Index of the main swirl.
      @returns {Number} Radius value.
    */
  }, {
    key: "_getRadiusByKey",
    value: function _getRadiusByKey(key, side) {
      var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var swirl = this._masterSwirls[i],
        deltas = swirl._deltas,
        props = swirl._props;
      if (deltas[key] != null) {
        return deltas[key][side];
      } else if (props[key] != null) {
        return props[key];
      }
    }

    /*
      Method to get delta from start and end position points.
      @private
      @param {String} Key name.
      @param {Object} Start position point.
      @param {Object} End position point.
      @returns {Object} Delta of the end/start.
    */
  }, {
    key: "_getDeltaFromPoints",
    value: function _getDeltaFromPoints(key, pointStart, pointEnd) {
      var delta = {};
      if (pointStart[key] === pointEnd[key]) {
        delta = pointStart[key];
      } else {
        delta[pointStart[key]] = pointEnd[key];
      }
      return delta;
    }

    /*
      Method to create timeline.
      @private
      @override @ Tweenable
    */
  }, {
    key: "_makeTimeline",
    value: function _makeTimeline() {
      // restore timeline options that were deleted in _render method
      this._o.timeline = this._timelineOptions;
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Burst.prototype), "_makeTimeline", this).call(this);
      this.timeline.add(this.masterSwirl, this._swirls[0]);
    }

    /*
      Method to make Tween for the module.
      @private
      @override @ Tweenable
    */
  }, {
    key: "_makeTween",
    value: function _makeTween() {/* don't create any tween */}
    /*
      Override `_hide` and `_show` methods on module
      since we don't have to hide nor show on the module.
    */
  }, {
    key: "_hide",
    value: function _hide() {/* do nothing */}
  }, {
    key: "_show",
    value: function _show() {/* do nothing */}
  }]);
  return Burst;
}(_tunable__WEBPACK_IMPORTED_MODULE_9__["default"]);
var ChildSwirl = /*#__PURE__*/function (_ShapeSwirl) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ChildSwirl, _ShapeSwirl);
  var _super2 = _createSuper(ChildSwirl);
  function ChildSwirl() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ChildSwirl);
    return _super2.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ChildSwirl, [{
    key: "_declareDefaults",
    value: function _declareDefaults() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(ChildSwirl.prototype), "_declareDefaults", this).call(this);
      this._defaults.isSwirl = false;
      this._o.duration = this._o.duration != null ? this._o.duration : 700;
    }

    // disable degreeshift calculations
  }, {
    key: "_calcSwirlXY",
    value: function _calcSwirlXY(proc) {
      var degreeShift = this._props.degreeShift;
      this._props.degreeShift = 0;
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(ChildSwirl.prototype), "_calcSwirlXY", this).call(this, proc);
      this._props.degreeShift = degreeShift;
    }
  }]);
  return ChildSwirl;
}(_shape_swirl__WEBPACK_IMPORTED_MODULE_8__["default"]);
var MainSwirl = /*#__PURE__*/function (_ChildSwirl) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(MainSwirl, _ChildSwirl);
  var _super3 = _createSuper(MainSwirl);
  function MainSwirl() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, MainSwirl);
    return _super3.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(MainSwirl, [{
    key: "_declareDefaults",
    value: function _declareDefaults() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(MainSwirl.prototype), "_declareDefaults", this).call(this);
      this._defaults.scale = 1;
      this._defaults.width = 0;
      this._defaults.height = 0;
      this._defaults.radius = {
        25: 75
      };

      // this._defaults.duration = 2000;
    }
  }]);
  return MainSwirl;
}(ChildSwirl);
Burst.ChildSwirl = ChildSwirl;
Burst.MainSwirl = MainSwirl;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Burst);

/***/ }),

/***/ "./src/delta/delta.babel.js":
/*!**********************************!*\
  !*** ./src/delta/delta.babel.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var tween_tween__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tween/tween */ "./src/tween/tween.babel.js");



var Delta = /*#__PURE__*/function () {
  function Delta() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Delta);
    this._o = o;
    this._createTween(o.tweenOptions);

    // initial properties render
    !this._o.isChained && this.refresh(true);
  }

  /*
    Method to call `_refresh` method on `tween`.
    Use switch between `0` and `1` progress for delta value.
    @public
    @param {Boolean} If refresh before start time or after.
    @returns this.
  */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Delta, [{
    key: "refresh",
    value: function refresh(isBefore) {
      this._previousValues = [];
      var deltas = this._o.deltas;
      for (var i = 0; i < deltas.length; i++) {
        var name = deltas[i].name;
        this._previousValues.push({
          name: name,
          value: this._o.props[name]
        });
      }
      this.tween._refresh(isBefore);
      return this;
    }

    /*
      Method to restore all saved properties from `_previousValues` array.
      @public
      @returns this.
    */
  }, {
    key: "restore",
    value: function restore() {
      var prev = this._previousValues;
      for (var i = 0; i < prev.length; i++) {
        var record = prev[i];
        this._o.props[record.name] = record.value;
      }
      return this;
    }

    /*
      Method to create tween of the delta.
      @private
      @param {Object} Options object.
    */
  }, {
    key: "_createTween",
    value: function _createTween() {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var it = this;
      o.callbackOverrides = {
        onUpdate: function onUpdate(ep, p) {
          it._calcCurrentProps(ep, p);
        }
      };

      // if not chained - add the onRefresh callback
      // to refresh the tween when needed
      if (!this._o.isChained) {
        o.callbackOverrides.onRefresh = function (isBefore, ep, p) {
          it._calcCurrentProps(ep, p);
        };
      }
      o.callbacksContext = this._o.callbacksContext;
      this.tween = new tween_tween__WEBPACK_IMPORTED_MODULE_2__["default"](o);
    }

    /*
      Method to calculate current progress of the deltas.
      @private
      @param {Number} Eased progress to calculate - [0..1].
      @param {Number} Progress to calculate - [0..1].
    */
  }, {
    key: "_calcCurrentProps",
    value: function _calcCurrentProps(easedProgress, p) {
      var deltas = this._o.deltas;
      for (var i = 0; i < deltas.length; i++) {
        var type = deltas[i].type;
        this["_calcCurrent_".concat(type)](deltas[i], easedProgress, p);
      }
    }

    /*
      Method to calc the current color delta value.
      @param {Object} Delta
      @param {Number} Eased progress [0..1].
      @param {Number} Plain progress [0..1].
    */
  }, {
    key: "_calcCurrent_color",
    value: function _calcCurrent_color(delta, ep, p) {
      var r,
        g,
        b,
        a,
        start = delta.start,
        d = delta.delta;
      if (!delta.curve) {
        r = parseInt(start.r + ep * d.r, 10);
        g = parseInt(start.g + ep * d.g, 10);
        b = parseInt(start.b + ep * d.b, 10);
        a = parseFloat(start.a + ep * d.a);
      } else {
        var cp = delta.curve(p);
        r = parseInt(cp * (start.r + p * d.r), 10);
        g = parseInt(cp * (start.g + p * d.g), 10);
        b = parseInt(cp * (start.b + p * d.b), 10);
        a = parseFloat(cp * (start.a + p * d.a));
      }
      this._o.props[delta.name] = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
    }

    /*
      Method to calc the current number delta value.
      @param {Object} Delta
      @param {Number} Eased progress [0..1].
      @param {Number} Plain progress [0..1].
    */
  }, {
    key: "_calcCurrent_number",
    value: function _calcCurrent_number(delta, ep, p) {
      this._o.props[delta.name] = !delta.curve ? delta.start + ep * delta.delta : delta.curve(p) * (delta.start + p * delta.delta);
    }

    /*
      Method to calc the current number with units delta value.
      @param {Object} Delta
      @param {Number} Eased progress [0..1].
      @param {Number} Plain progress [0..1].
    */
  }, {
    key: "_calcCurrent_unit",
    value: function _calcCurrent_unit(delta, ep, p) {
      var currentValue = !delta.curve ? delta.start.value + ep * delta.delta : delta.curve(p) * (delta.start.value + p * delta.delta);
      this._o.props[delta.name] = "".concat(currentValue).concat(delta.end.unit);
    }

    /*
      Method to calc the current array delta value.
      @param {Object} Delta
      @param {Number} Eased progress [0..1].
      @param {Number} Plain progress [0..1].
    */
  }, {
    key: "_calcCurrent_array",
    value: function _calcCurrent_array(delta, ep, p) {
      // var arr,
      var name = delta.name,
        props = this._o.props,
        string = '';

      // to prevent GC bothering with arrays garbage
      // if ( h.isArray( props[name] ) ) {
      //   arr = props[name];
      //   arr.length = 0;
      // } else { arr = []; }

      // just optimization to prevent curve
      // calculations on every array item
      var proc = delta.curve ? delta.curve(p) : null;
      for (var i = 0; i < delta.delta.length; i++) {
        var item = delta.delta[i],
          dash = !delta.curve ? delta.start[i].value + ep * item.value : proc * (delta.start[i].value + p * item.value);
        string += "".concat(dash).concat(item.unit, " ");

        // arr.push({
        //   string: `${dash}${item.unit}`,
        //   value:  dash,
        //   unit:   item.unit,
        // });
      }

      props[name] = string;
    }
  }]);
  return Delta;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Delta);

/***/ }),

/***/ "./src/delta/deltas.babel.js":
/*!***********************************!*\
  !*** ./src/delta/deltas.babel.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var src_h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! src/h */ "./src/h.coffee");
/* harmony import */ var src_h__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(src_h__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var easing_easing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! easing/easing */ "./src/easing/easing.coffee");
/* harmony import */ var easing_easing__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(easing_easing__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var tween_timeline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tween/timeline */ "./src/tween/timeline.babel.js");
/* harmony import */ var tween_tween__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tween/tween */ "./src/tween/tween.babel.js");
/* harmony import */ var delta_delta__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! delta/delta */ "./src/delta/delta.babel.js");



function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
/*
  This module's target is to parse options object,
  find deltas in it and send them to `Delta` classes.
  The `Delta` class is dull - they expect actual parsed deltas
  and separated tween options, so we should parse them here.
  The timeline of the module controls the `Delta` modules' tweens.

  @param {Object} props Object to set deltas result to (pass to the Delta classes).
  @param {Object} options Object to parse the deltas from.
  @param {Function} onUpdate onUpdate callback.
  @param optional {Object} arrayPropertyMap List of properties with truthy
                                            values which describe properties
                                            that should be parsed as arrays.
  @param optional {Object} numberPropertyMap List of properties with truthy
                                            values which describe properties
                                            that should be parsed as numbers
                                            without units.
*/

// TODO:
// - colors with curves change alpha level too
// const html = new mojs.Html({
//   el: '#js-el',
//   x: { 0: 100 },
//   onUpdate () {
//     console.log(this._props.originX);
//   },
//   originX: { 'white': 'black', curve: 'M0,100 L100, 0' },
//   customProperties: {
//     originX: {
//       type: 'color',
//       default: 'cyan'
//     },
//     draw() { console.log('draw'); }
//   }
// });







// get tween properties
var obj = {};
tween_tween__WEBPACK_IMPORTED_MODULE_6__["default"].prototype._declareDefaults.call(obj);
var keys = Object.keys(obj._defaults);
for (var i = 0; i < keys.length; i++) {
  obj._defaults[keys[i]] = 1;
}
obj._defaults['timeline'] = 1;
var TWEEN_PROPERTIES = obj._defaults;
var Deltas = /*#__PURE__*/function () {
  function Deltas() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Deltas);
    this._o = o;
    this._shortColors = {
      transparent: 'rgba(0,0,0,0)',
      none: 'rgba(0,0,0,0)',
      aqua: 'rgb(0,255,255)',
      black: 'rgb(0,0,0)',
      blue: 'rgb(0,0,255)',
      fuchsia: 'rgb(255,0,255)',
      gray: 'rgb(128,128,128)',
      green: 'rgb(0,128,0)',
      lime: 'rgb(0,255,0)',
      maroon: 'rgb(128,0,0)',
      navy: 'rgb(0,0,128)',
      olive: 'rgb(128,128,0)',
      purple: 'rgb(128,0,128)',
      red: 'rgb(255,0,0)',
      silver: 'rgb(192,192,192)',
      teal: 'rgb(0,128,128)',
      white: 'rgb(255,255,255)',
      yellow: 'rgb(255,255,0)',
      orange: 'rgb(255,128,0)'
    };
    this._ignoreDeltasMap = {
      prevChainModule: 1,
      masterModule: 1
    };
    this._parseDeltas(o.options);
    this._createDeltas();
    this._createTimeline(this._mainTweenOptions);
  }

  /*
    Method to call `refresh` on all child `delta` objects.
    @public
    @param {Boolean} If before start time (true) or after end time (false).
  */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Deltas, [{
    key: "refresh",
    value: function refresh(isBefore) {
      for (var i = 0; i < this._deltas.length; i++) {
        this._deltas[i].refresh(isBefore);
      }
      return this;
    }

    /*
      Method to call `restore` on all child `delta` objects.
      @public
    */
  }, {
    key: "restore",
    value: function restore() {
      for (var i = 0; i < this._deltas.length; i++) {
        this._deltas[i].restore();
      }
      return this;
    }

    /*
      Method to create Timeline.
      @private
      @param {Object} Timeline options.
    */
  }, {
    key: "_createTimeline",
    value: function _createTimeline() {
      // const o = this._o;
      // opts.timeline = opts.timeline || {};
      // opts.timeline.callbackOverrides = {
      //   onUpdate:   o.onUpdate,
      //   onRefresh:  o.onUpdate
      // }
      // send callbacksContext to timeline if set
      // o.callbacksContext && (opts.timeline.callbacksContext = o.callbacksContext);
      // opts.timeline
      this.timeline = new tween_timeline__WEBPACK_IMPORTED_MODULE_5__["default"]();
      this.timeline.add(this._deltas);
    }

    /*
      Method to create Deltas from parsed options.
      @private
    */
  }, {
    key: "_createDeltas",
    value: function _createDeltas() {
      this._deltas = [];

      // create main delta object
      this._deltas.push(this._createDelta(this._mainDeltas, this._mainTweenOptions));

      // create child delta object
      for (var i = 0; i < this._childDeltas.length; i++) {
        var delta = this._childDeltas[i];
        this._deltas.push(this._createDelta([delta.delta], delta.tweenOptions));
      }
    }

    /*
      Method to create Delta object with passed options.
      @private
      @param {Array} Array of deltas.
      @param {Object} Tween properties.
      @returns {Object} Delta object
    */
  }, {
    key: "_createDelta",
    value: function _createDelta(deltas, tweenOptions) {
      var o = this._o;
      return new delta_delta__WEBPACK_IMPORTED_MODULE_7__["default"]({
        deltas: deltas,
        tweenOptions: tweenOptions,
        props: o.props,
        isChained: o.isChained,
        callbacksContext: o.callbacksContext
      });
    }

    /*
      Method to parse delta objects from options.
      @private
      @param {Object} Options object to parse the deltas from.
    */
  }, {
    key: "_parseDeltas",
    value: function _parseDeltas(obj) {
      // spilt main animation properties and main tween properties
      var mainSplit = this._splitTweenOptions(obj);

      // main animation properties
      var opts = mainSplit.delta;

      // main tween properties
      this._mainTweenOptions = mainSplit.tweenOptions;
      this._mainDeltas = [];
      this._childDeltas = [];
      var keys = Object.keys(opts);

      // loop thru all properties without tween ones
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        // is property is delta - parse it
        if (this._isDelta(opts[key]) && !this._ignoreDeltasMap[key]) {
          var delta = this._splitAndParseDelta(key, opts[key]);

          // if parsed object has no tween values - it's delta of the main object
          if (!delta.tweenOptions) {
            this._mainDeltas.push(delta.delta);
          }

          // otherwise it is distinct delta object
          else {
            this._childDeltas.push(delta);
          }
        }
      }
    }

    /*
      Method to split tween values and parse single delta record.
      @private
      @param {String} Property name.
      @param {Object} Raw delta object.
      @returns {Object} Split object.
                  @param {Object} tweenOptions Tween properties.
                  @param {Object} delta Parsed delta.
    */
  }, {
    key: "_splitAndParseDelta",
    value: function _splitAndParseDelta(name, object) {
      var split = this._splitTweenOptions(object);

      // parse delta in the object
      split.delta = this._parseDelta(name, split.delta);
      return split;
    }

    /*
      Method to parse delta by delegating the variables to _parse*Delta methods.
      @private
      @param {String} Property name.
      @param {Object} Raw delta object.
      @param {Number} Module index.
    */
  }, {
    key: "_parseDelta",
    value: function _parseDelta(name, object, index) {
      // if name is in _o.customProps - parse it regarding the type
      return this._o.customProps && this._o.customProps[name] != null ? this._parseDeltaByCustom(name, object, index) : this._parseDeltaByGuess(name, object, index);
    }

    /**
      Method to parse delta by taking the type from the customProps object.
      @private
      @param {String} Property name.
      @param {Object} Raw delta object.
      @param {Number} Module index.
    */
  }, {
    key: "_parseDeltaByCustom",
    value: function _parseDeltaByCustom(name, object, index) {
      return this._parseNumberDelta(name, object, index);

      // const customRecord = this._o.customProps[name];
      // switch ( customRecord.type.toLowerCase() ) {
      //   case 'color':  { return this._parseColorDelta( name, object ); }
      //   case 'array':  { return this._parseArrayDelta( name, object ); }
      //   case 'number': { return this._parseNumberDelta( name, object, index ); }
      //   case 'unit':   { return this._parseUnitDelta( name, object, index ); }
      // }
    }

    /**
      Method to parse delta by reasoning about it's value.
      @private
      @param {String} Property name.
      @param {Object} Raw delta object.
      @param {Number} Module index.
    */
  }, {
    key: "_parseDeltaByGuess",
    value: function _parseDeltaByGuess(name, object, index) {
      var _this$_preparseDelta = this._preparseDelta(object),
        start = _this$_preparseDelta.start;
      var o = this._o;

      // color values
      if (isNaN(parseFloat(start)) && !start.match(/rand\(/) && !start.match(/stagger\(/)) {
        return this._parseColorDelta(name, object);

        // array values
      } else if (o.arrayPropertyMap && o.arrayPropertyMap[name]) {
        return this._parseArrayDelta(name, object);

        // unit or number values
      } else {
        return o.numberPropertyMap && o.numberPropertyMap[name]

        // if the property is in the number property map - parse it like number
        ? this._parseNumberDelta(name, object, index)

        // otherwise - like number with units
        : this._parseUnitDelta(name, object, index);
      }
    }

    /*
      Method to separate tween options from delta properties.
      @param {Object} Object for separation.
      @returns {Object} Object that contains 2 objects
                          - one delta options
                          - one tween options ( could be empty if no tween opts )
    */
  }, {
    key: "_splitTweenOptions",
    value: function _splitTweenOptions(delta) {
      delta = _objectSpread({}, delta);
      var keys = Object.keys(delta),
        tweenOptions = {};
      var isTween = null;
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        if (TWEEN_PROPERTIES[key]) {
          if (delta[key] != null) {
            tweenOptions[key] = delta[key];
            isTween = true;
          }
          delete delta[key];
        }
      }
      return {
        delta: delta,
        tweenOptions: isTween ? tweenOptions : undefined
      };
    }

    /*
      Method to check if the property is delta property.
      @private
      @param {Any} Parameter value to check.
      @returns {Boolean}
    */
  }, {
    key: "_isDelta",
    value: function _isDelta(optionsValue) {
      var isObject = src_h__WEBPACK_IMPORTED_MODULE_3___default().isObject(optionsValue);
      isObject = isObject && !optionsValue.unit;
      return !(!isObject || src_h__WEBPACK_IMPORTED_MODULE_3___default().isArray(optionsValue) || src_h__WEBPACK_IMPORTED_MODULE_3___default().isDOM(optionsValue));
    }

    /*
      Method to parse color delta values.
      @private
      @param {String} Name of the property.
      @param {Any} Property value.
      @returns {Object} Parsed delta.
    */
  }, {
    key: "_parseColorDelta",
    value: function _parseColorDelta(key, value) {
      if (key === 'strokeLinecap') {
        src_h__WEBPACK_IMPORTED_MODULE_3___default().warn('Sorry, stroke-linecap property is not animatable yet, using the start(#{start}) value instead', value);
        return {};
      }
      var preParse = this._preparseDelta(value);
      var startColorObj = this._makeColorObj(preParse.start),
        endColorObj = this._makeColorObj(preParse.end);
      var delta = {
        type: 'color',
        name: key,
        start: startColorObj,
        end: endColorObj,
        curve: preParse.curve,
        delta: {
          r: endColorObj.r - startColorObj.r,
          g: endColorObj.g - startColorObj.g,
          b: endColorObj.b - startColorObj.b,
          a: endColorObj.a - startColorObj.a
        }
      };
      return delta;
    }

    /*
      Method to parse array delta values.
      @private
      @param {String} Name of the property.
      @param {Any} Property value.
      @returns {Object} Parsed delta.
    */
  }, {
    key: "_parseArrayDelta",
    value: function _parseArrayDelta(key, value) {
      var preParse = this._preparseDelta(value);
      var startArr = this._strToArr(preParse.start),
        endArr = this._strToArr(preParse.end);
      src_h__WEBPACK_IMPORTED_MODULE_3___default().normDashArrays(startArr, endArr);
      for (var i = 0; i < startArr.length; i++) {
        var end = endArr[i];
        src_h__WEBPACK_IMPORTED_MODULE_3___default().mergeUnits(startArr[i], end, key);
      }
      var delta = {
        type: 'array',
        name: key,
        start: startArr,
        end: endArr,
        delta: src_h__WEBPACK_IMPORTED_MODULE_3___default().calcArrDelta(startArr, endArr),
        curve: preParse.curve
      };
      return delta;
    }

    /*
      Method to parse numeric delta values with units.
      @private
      @param {String} Name of the property.
      @param {Any} Property value.
      @param {Number} Index of the module.
      @returns {Object} Parsed delta.
    */
  }, {
    key: "_parseUnitDelta",
    value: function _parseUnitDelta(key, value, index) {
      var preParse = this._preparseDelta(value);
      var end = src_h__WEBPACK_IMPORTED_MODULE_3___default().parseUnit(src_h__WEBPACK_IMPORTED_MODULE_3___default().parseStringOption(preParse.end, index)),
        start = src_h__WEBPACK_IMPORTED_MODULE_3___default().parseUnit(src_h__WEBPACK_IMPORTED_MODULE_3___default().parseStringOption(preParse.start, index));
      src_h__WEBPACK_IMPORTED_MODULE_3___default().mergeUnits(start, end, key);
      var delta = {
        type: 'unit',
        name: key,
        start: start,
        end: end,
        delta: end.value - start.value,
        curve: preParse.curve
      };
      return delta;
    }

    /*
      Method to parse numeric delta values without units.
      @private
      @param {String} Name of the property.
      @param {Any} Property value.
      @param {Number} Index of the module.
      @returns {Object} Parsed delta.
    */
  }, {
    key: "_parseNumberDelta",
    value: function _parseNumberDelta(key, value, index) {
      var preParse = this._preparseDelta(value);
      var end = parseFloat(src_h__WEBPACK_IMPORTED_MODULE_3___default().parseStringOption(preParse.end, index)),
        start = parseFloat(src_h__WEBPACK_IMPORTED_MODULE_3___default().parseStringOption(preParse.start, index));
      var delta = {
        type: 'number',
        name: key,
        start: start,
        end: end,
        delta: end - start,
        curve: preParse.curve
      };
      return delta;
    }

    /*
      Method to extract `curve` and `start`/`end` values.
      @private
      @param {Object} Delta object.
      @returns {Object} Preparsed delta.
                @property {String} Start value.
                @property {String, Number} End value.
    */
  }, {
    key: "_preparseDelta",
    value: function _preparseDelta(value) {
      // clone value object
      value = _objectSpread({}, value);

      // parse curve if exist
      var curve = value.curve;
      if (curve != null) {
        curve = easing_easing__WEBPACK_IMPORTED_MODULE_4___default().parseEasing(curve);
        curve._parent = this;
      }
      delete value.curve;

      // parse start and end values
      var start = Object.keys(value)[0],
        end = value[start];
      return {
        start: start,
        end: end,
        curve: curve
      };
    }

    /*
      Method to parse color into usable object.
      @private
      @param {String} Color string.
      @returns {Object} Parsed color value.
    */
  }, {
    key: "_makeColorObj",
    value: function _makeColorObj(color) {
      // HEX
      var colorObj = {};
      if (color[0] === '#') {
        var result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
        if (result) {
          var r = result[1].length === 2 ? result[1] : result[1] + result[1],
            g = result[2].length === 2 ? result[2] : result[2] + result[2],
            b = result[3].length === 2 ? result[3] : result[3] + result[3];
          colorObj = {
            r: parseInt(r, 16),
            g: parseInt(g, 16),
            b: parseInt(b, 16),
            a: 1
          };
        }
      }

      // not HEX
      // shorthand color and rgb()
      if (color[0] !== '#') {
        var isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b';
        var rgbColor;

        // rgb color
        if (isRgb) {
          rgbColor = color;
        }

        // shorthand color name
        if (!isRgb) {
          if (!this._shortColors[color]) {
            (src_h__WEBPACK_IMPORTED_MODULE_3___default().div).style.color = color;
            rgbColor = src_h__WEBPACK_IMPORTED_MODULE_3___default().computedStyle((src_h__WEBPACK_IMPORTED_MODULE_3___default().div)).color;
          } else {
            rgbColor = this._shortColors[color];
          }
        }
        var regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),',
          regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$',
          _result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor),
          alpha = parseFloat(_result[4] || 1);
        if (_result) {
          colorObj = {
            r: parseInt(_result[1], 10),
            g: parseInt(_result[2], 10),
            b: parseInt(_result[3], 10),
            a: alpha != null && !isNaN(alpha) ? alpha : 1
          };
        }
      }
      return colorObj;
    }

    /*
      Method to parse string into array.
      @private
      @param {String, Number} String or number to parse.
      @returns {Array} Parsed array.
    */
  }, {
    key: "_strToArr",
    value: function _strToArr(string) {
      var arr = [];

      // plain number
      if (typeof string === 'number' && !isNaN(string)) {
        arr.push(src_h__WEBPACK_IMPORTED_MODULE_3___default().parseUnit(string));
        return arr;
      }

      // string array
      string.trim().split(/\s+/gim).forEach(function (str) {
        arr.push(src_h__WEBPACK_IMPORTED_MODULE_3___default().parseUnit(src_h__WEBPACK_IMPORTED_MODULE_3___default().parseIfRand(str)));
      });
      return arr;
    }
  }]);
  return Deltas;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Deltas);

/***/ }),

/***/ "./src/easing/approximate.babel.js":
/*!*****************************************!*\
  !*** ./src/easing/approximate.babel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

/*
  Method to bootstrap approximation function.
  @private
  @param   {Object} Samples Object.
  @returns {Function} Approximate function.
*/
var _proximate = function _proximate(samples) {
  var n = samples.base,
    samplesAmount = Math.pow(10, n),
    samplesStep = 1 / samplesAmount;
  function RoundNumber(input, numberDecimals) {
    numberDecimals = +numberDecimals || 0; // +var magic!

    var multiplyer = Math.pow(10.0, numberDecimals);
    return Math.round(input * multiplyer) / multiplyer;
  }
  var cached = function cached(p) {
    var nextIndex,
      nextValue,
      newKey = RoundNumber(p, n),
      sample = samples[newKey.toString()];
    if (Math.abs(p - newKey) < samplesStep) {
      return sample;
    }
    if (p > newKey) {
      nextIndex = newKey + samplesStep;
      nextValue = samples[nextIndex];
    } else {
      nextIndex = newKey - samplesStep;
      nextValue = samples[nextIndex];
    }
    var dLength = nextIndex - newKey;
    var dValue = nextValue - sample;
    if (dValue < samplesStep) {
      return sample;
    }
    var progressScale = (p - newKey) / dLength;
    var coef = nextValue > sample ? -1 : 1;
    var scaledDifference = coef * progressScale * dValue;
    return sample + scaledDifference;
  };
  cached.getSamples = function () {
    return samples;
  };
  return cached;
};

/*
    Method to take samples of the function and call the _proximate
    method with the dunction and samples. Or if samples passed - pipe
    them to the _proximate method without sampling.
    @private
    @param {Function} Function to sample.
    @param {Number, Object, String} Precision or precomputed samples.
  */
var _sample = function _sample(fn) {
  var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
  var nType = (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(n);
  var samples = {};
  if (nType === 'number') {
    var p = 0,
      samplesCount = Math.pow(10, n),
      step = 1 / samplesCount;
    samples[0] = fn(0);
    for (var i = 0; i < samplesCount - 1; i++) {
      p += step;
      var index = parseFloat(p.toFixed(n));
      samples[index] = fn(p);
    }
    samples[1] = fn(1);
    samples.base = n;
  } else if (nType === 'object') {
    samples = n;
  } else if (nType === 'string') {
    samples = JSON.parse(n);
  }
  return Approximate._sample._proximate(samples);
};
var Approximate = {
  _sample: _sample,
  _proximate: _proximate
};
Approximate._sample._proximate = Approximate._proximate;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Approximate._sample);

/***/ }),

/***/ "./src/html.babel.js":
/*!***************************!*\
  !*** ./src/html.babel.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _thenable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./thenable */ "./src/thenable.babel.js");
/* harmony import */ var tween_tween__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tween/tween */ "./src/tween/tween.babel.js");
/* harmony import */ var delta_deltas__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! delta/deltas */ "./src/delta/deltas.babel.js");







function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





// get tween properties
var obj = {};
tween_tween__WEBPACK_IMPORTED_MODULE_9__["default"].prototype._declareDefaults.call(obj);
var keys = Object.keys(obj._defaults);
for (var i = 0; i < keys.length; i++) {
  obj._defaults[keys[i]] = 1;
}
obj._defaults['timeline'] = 1;
var TWEEN_PROPERTIES = obj._defaults;

/*
  TODO:

    - change _props to _propsObj for animations
    - current values in deltas
*/
var Html = /*#__PURE__*/function (_Thenable) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Html, _Thenable);
  var _super = _createSuper(Html);
  function Html() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Html);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Html, [{
    key: "_declareDefaults",
    value: function _declareDefaults() {
      this._defaults = {
        x: 0,
        y: 0,
        z: 0,
        skewX: 0,
        skewY: 0,
        // rotate:      0,
        rotateX: 0,
        rotateY: 0,
        rotateZ: 0,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        isSoftHide: true,
        isShowStart: true,
        isShowEnd: true,
        isForce3d: false,
        isRefreshState: true
      };

      // exclude from automatic drawing
      this._drawExclude = {
        el: 1
      };

      // properties that cause 3d layer
      this._3dProperties = ['rotateX', 'rotateY', 'z'];

      // properties that have array values
      this._arrayPropertyMap = {
        transformOrigin: 1,
        backgroundPosition: 1
      };

      // properties that have no units
      this._numberPropertyMap = {
        opacity: 1,
        scale: 1,
        scaleX: 1,
        scaleY: 1,
        // rotate: 1,
        rotateX: 1,
        rotateY: 1,
        rotateZ: 1,
        skewX: 1,
        skewY: 1
      };

      // properties that should be prefixed
      this._prefixPropertyMap = {
        transform: 1,
        transformOrigin: 1
      };

      // save prefix
      this._prefix = (_h__WEBPACK_IMPORTED_MODULE_7___default().prefix).css;
    }
  }, {
    key: "then",
    value: function then(o) {
      // return if nothing was passed
      if (o == null || !Object.keys(o).length) {
        return 1;
      }

      // get the last item in `then` chain
      var prevModule = _h__WEBPACK_IMPORTED_MODULE_7___default().getLastItem(this._modules);

      // set deltas to the finish state
      prevModule.deltas.refresh(false);

      // copy finish state to the last history record
      this._history[this._history.length - 1] = prevModule._o;

      // call super
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Html.prototype), "then", this).call(this, o);

      // restore the _props
      prevModule.deltas.restore();
      return this;
    }

    /*
      Method to pipe startValue of the delta.
      @private
      @ovarrides @ Thenable
      @param {String} Start property name.
      @param {Any} Start property value.
      @returns {Any} Start property value.
    */
  }, {
    key: "_checkStartValue",
    value: function _checkStartValue(key, value) {
      if (value == null) {
        // return default value for transforms
        if (this._defaults[key] != null) {
          return this._defaults[key];
        }

        // return default value from _customProps
        if (this._customProps[key] != null) {
          return this._customProps[key];
        }

        // try to get the default value
        if ((_h__WEBPACK_IMPORTED_MODULE_7___default().defaultStyles)[key] != null) {
          return (_h__WEBPACK_IMPORTED_MODULE_7___default().defaultStyles)[key];
        }

        // at the end return 0
        return 0;
      }
      return value;
    }

    /*
      Method to draw _props to el.
      @private
    */
  }, {
    key: "_draw",
    value: function _draw() {
      var p = this._props;
      for (var i = 0; i < this._drawProps.length; i++) {
        var name = this._drawProps[i];
        this._setStyle(name, p[name]);
      }

      // draw transforms
      this._drawTransform();

      // call custom transform callback if exist
      this._customDraw && this._customDraw(this._props.el, this._props);
    }

    /*
      Method to set transform on element.
      @private
    */
  }, {
    key: "_drawTransform",
    value: function _drawTransform() {
      var p = this._props;
      var string = !this._is3d ? "translate(".concat(p.x, ", ").concat(p.y, ") rotate(").concat(p.rotateZ, "deg) skew(").concat(p.skewX, "deg, ").concat(p.skewY, "deg) scale(").concat(p.scaleX, ", ").concat(p.scaleY, ")") : "translate3d(".concat(p.x, ", ").concat(p.y, ", ").concat(p.z, ") rotateX(").concat(p.rotateX, "deg) rotateY(").concat(p.rotateY, "deg) rotateZ(").concat(p.rotateZ, "deg) skew(").concat(p.skewX, "deg, ").concat(p.skewY, "deg) scale(").concat(p.scaleX, ", ").concat(p.scaleY, ")");
      this._setStyle('transform', string);
    }

    /*
      Method to render on initialization.
      @private
      @overrides @ Module
    */
  }, {
    key: "_render",
    value: function _render() {
      // return immediately if not the first in `then` chain
      if (this._o.prevChainModule) {
        return;
      }
      var p = this._props;
      for (var i = 0; i < this._renderProps.length; i++) {
        var name = this._renderProps[i],
          value = p[name];
        value = typeof value === 'number' ? "".concat(value, "px") : value;
        this._setStyle(name, value);
      }
      this._draw();
      if (!p.isShowStart) {
        this._hide();
      }
    }

    /*
      Method to set style on el.
      @private
      @param {String} Style property name.
      @param {String} Style property value.
    */
  }, {
    key: "_setStyle",
    value: function _setStyle(name, value) {
      if (this._state[name] !== value) {
        var style = this._props.el.style;

        // set style
        style[name] = value;

        // if prefix needed - set it
        if (this._prefixPropertyMap[name]) {
          style["".concat(this._prefix).concat(name)] = value;
        }

        // cache the last set value
        this._state[name] = value;
      }
    }

    /*
      Method to copy `_o` options to `_props` object.
      @private
    */
  }, {
    key: "_extendDefaults",
    value: function _extendDefaults() {
      this._props = this._o.props || {};

      // props for intial render only
      this._renderProps = [];

      // props for draw on every frame update
      this._drawProps = [];

      // save custom properties if present
      this._saveCustomProperties(this._o);

      // copy the options
      var o = _objectSpread({}, this._o);

      // extend options with defaults
      o = this._addDefaults(o);
      var keys = Object.keys(o);
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];

        // include the property if it is not in drawExclude object
        // and not in defaults = not a transform
        var isInclude = !this._drawExclude[key] &&
        // not in exclude map
        this._defaults[key] == null &&
        // not transform property
        !TWEEN_PROPERTIES[key]; // not tween property

        var isCustom = this._customProps[key];

        // copy all non-delta properties to the props
        // if not delta then add the property to render
        // list that is called on initialization
        // otherwise add it to the draw list that will
        // be drawed on each frame
        if (!_h__WEBPACK_IMPORTED_MODULE_7___default().isDelta(o[key]) && !TWEEN_PROPERTIES[key]) {
          this._parseOption(key, o[key]);
          if (key === 'el') {
            this._props.el = _h__WEBPACK_IMPORTED_MODULE_7___default().parseEl(o.el);
            this.el = this._props.el;
          }
          if (isInclude && !isCustom) {
            this._renderProps.push(key);
          }

          // copy delta prop but not transforms
          // otherwise push it to draw list that gets traversed on every draw
        } else if (isInclude && !isCustom) {
          this._drawProps.push(key);
        }
      }
      this._createDeltas(o);
    }

    /*
      Method to save customProperties to _customProps.
      @param {Object} Options of the module.
    */
  }, {
    key: "_saveCustomProperties",
    value: function _saveCustomProperties() {
      var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this._customProps = o.customProperties || {};
      this._customProps = _objectSpread({}, this._customProps);
      this._customDraw = this._customProps.draw;
      delete this._customProps.draw;
      delete o.customProperties;
      this._copyDefaultCustomProps();

      // if ( this._customProps ) {}
      // this._customProps = this._customProps || {};
    }
  }, {
    key: "_copyDefaultCustomProps",
    value: function _copyDefaultCustomProps() {
      for (var key in this._customProps) {
        if (this._o[key] == null) {
          this._o[key] = this._customProps[key];
        }
      }
    }

    /*
      Method to reset some flags on merged options object.
      @private
      @overrides @ Thenable
      @param   {Object} Options object.
      @returns {Object} Options object.
    */
  }, {
    key: "_resetMergedFlags",
    value: function _resetMergedFlags(o) {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Html.prototype), "_resetMergedFlags", this).call(this, o);
      o.props = this._props;
      o.customProperties = this._customProps;
      return o;
    }

    /*
      Method to parse option value.
      @private
      @param {String} Option name.
      @param {Any} Option value.
    */
  }, {
    key: "_parseOption",
    value: function _parseOption(key, value) {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Html.prototype), "_parseOption", this).call(this, key, value);

      // at this point the property is parsed
      var parsed = this._props[key];

      // cast it to string if it is array
      if (_h__WEBPACK_IMPORTED_MODULE_7___default().isArray(parsed)) {
        this._props[key] = this._arrToString(parsed);
      }
    }

    /*
      Method cast array to string value.
      @private
      @param {Array} Array of parsed numbers with units.
      @returns {String} Casted array.
    */
  }, {
    key: "_arrToString",
    value: function _arrToString(arr) {
      var string = '';
      for (var i = 0; i < arr.length; i++) {
        string += "".concat(arr[i].string, " ");
      }
      return string;
    }

    /*
      Method to add defauls to passed object.
      @private
      @param {Object} Object to add defaults to.
    */
  }, {
    key: "_addDefaults",
    value: function _addDefaults(obj) {
      // flag that after all defaults are set will indicate
      // if user have set the 3d transform
      this._is3d = false;
      for (var key in this._defaults) {
        // skip property if it is listed in _skipProps
        // if (this._skipProps && this._skipProps[key]) { continue; }

        // copy the properties to the _o object
        // if it's null - set the default value
        if (obj[key] == null) {
          // scaleX and scaleY should fallback to scale
          if (key === 'scaleX' || key === 'scaleY') {
            obj[key] = obj['scale'] != null ? obj['scale'] : this._defaults['scale'];
          } else {
            obj[key] = this._defaults[key];
          }
        } else {
          // get if 3d property was set.
          if (this._3dProperties.indexOf(key) !== -1) {
            this._is3d = true;
          }
        }
      }
      if (this._o.isForce3d) {
        this._is3d = true;
      }
      return obj;
    }

    /*
      Lifecycle method to declare variables.
      @private
    */
  }, {
    key: "_vars",
    value: function _vars() {
      // set deltas to the last value, so the _props with
      // end values will be copied to the _history, it is
      // crucial for `then` chaining
      this.deltas.refresh(false);

      // call super vars
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Html.prototype), "_vars", this).call(this);

      // state of set properties
      this._state = {};

      // restore delta values that we have refreshed before
      this.deltas.restore(false);
    }

    /*
      Method to create deltas from passed object.
      @private
      @param {Object} Options object to pass to the Deltas.
    */
  }, {
    key: "_createDeltas",
    value: function _createDeltas(options) {
      this.deltas = new delta_deltas__WEBPACK_IMPORTED_MODULE_10__["default"]({
        options: options,
        props: this._props,
        arrayPropertyMap: this._arrayPropertyMap,
        numberPropertyMap: this._numberPropertyMap,
        customProps: this._customProps,
        callbacksContext: options.callbacksContext || this,
        isChained: !!this._o.prevChainModule
      });

      // if chained module set timeline to deltas' timeline
      if (this._o.prevChainModule) {
        this.timeline = this.deltas.timeline;
      }
    }

    /* @overrides @ Tweenable */
  }, {
    key: "_makeTween",
    value: function _makeTween() {}
  }, {
    key: "_makeTimeline",
    value: function _makeTimeline() {
      // do not create timeline if module if chained
      if (this._o.prevChainModule) {
        return;
      }

      // add callbacks overrides
      this._o.timeline = this._o.timeline || {};
      this._addCallbackOverrides(this._o.timeline);
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Html.prototype), "_makeTimeline", this).call(this);
      this.timeline.add(this.deltas);
    }

    /*
      Method to add callback overrides to passed object object.
      @param {Object} Object to add overrides on.
    */
  }, {
    key: "_addCallbackOverrides",
    value: function _addCallbackOverrides(o) {
      var it = this;
      var p = this._props;
      o.callbackOverrides = {
        onUpdate: this._draw,
        onRefresh: this._props.isRefreshState ? this._draw : void 0,
        onStart: function onStart(isFwd) {
          // don't touch main `el` onStart in chained elements
          if (it._isChained) {
            return;
          }

          // show if was hidden at start
          if (isFwd && !p.isShowStart) {
            it._show();
          }

          // hide if should be hidden at start
          else {
            if (!p.isShowStart) {
              it._hide();
            }
          }
        },
        onComplete: function onComplete(isFwd) {
          // don't touch main `el` if not the last in `then` chain
          if (it._isChained) {
            return;
          }
          if (isFwd) {
            if (!p.isShowEnd) {
              it._hide();
            }
          } else if (!p.isShowEnd) {
            it._show();
          }
        }
      };
    }

    /*
      Method that gets called on `soft` show of the module,
      it should restore transform styles of the module.
      @private
      @overrides @ Module
    */
  }, {
    key: "_showByTransform",
    value: function _showByTransform() {
      this._drawTransform();
    }

    /*
      Method to merge `start` and `end` for a property in then record.
      @private
      @param {String} Property name.
      @param {Any}    Start value of the property.
      @param {Any}    End value of the property.
    */
    // !! COVER !!
  }, {
    key: "_mergeThenProperty",
    value: function _mergeThenProperty(key, startValue, endValue) {
      // if isnt tween property
      var isBoolean = typeof endValue === 'boolean';
      if (!_h__WEBPACK_IMPORTED_MODULE_7___default().isTweenProp(key) && !this._nonMergeProps[key] && !isBoolean) {
        var TWEEN_PROPS = {};
        if (_h__WEBPACK_IMPORTED_MODULE_7___default().isObject(endValue) && endValue.to != null) {
          for (var _key in endValue) {
            if (TWEEN_PROPERTIES[_key] || _key === 'curve') {
              TWEEN_PROPS[_key] = endValue[_key];
              delete endValue[_key];
            }
          }

          // curve    = endValue.curve;
          // easing   = endValue.easing;
          endValue = endValue.to;
        }

        // if end value is delta - just save it
        if (this._isDelta(endValue)) {
          var _TWEEN_PROPS = {};
          for (var _key2 in endValue) {
            if (TWEEN_PROPERTIES[_key2] || _key2 === 'curve') {
              _TWEEN_PROPS[_key2] = endValue[_key2];
              delete endValue[_key2];
            }
          }
          var result = this._parseDeltaValues(key, endValue);
          return _objectSpread(_objectSpread({}, result), _TWEEN_PROPS);
        } else {
          var parsedEndValue = this._parsePreArrayProperty(key, endValue);

          // if end value is not delta - merge with start value
          if (this._isDelta(startValue)) {
            // if start value is delta - take the end value
            // as start value of the new delta
            return _objectSpread((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, _h__WEBPACK_IMPORTED_MODULE_7___default().getDeltaEnd(startValue), parsedEndValue), TWEEN_PROPS);

            // if both start and end value are not ∆ - make ∆
          } else {
            return _objectSpread((0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, startValue, parsedEndValue), TWEEN_PROPS);
          }
        }

        // copy the tween values unattended
      } else {
        return endValue;
      }
    }
  }]);
  return Html;
}(_thenable__WEBPACK_IMPORTED_MODULE_8__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Html);

/***/ }),

/***/ "./src/module.babel.js":
/*!*****************************!*\
  !*** ./src/module.babel.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_3__);





/*
  Base class for module. Extends and parses defaults.
*/
var Module = /*#__PURE__*/function () {
  function Module() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Module);
    // this._isIt = o.isIt;
    // delete o.isIt;
    this._o = o;
    this._index = this._o.index || 0;

    // map of props that should be
    // parsed to arrays of values
    this._arrayPropertyMap = {
      strokeDashoffset: 1,
      strokeDasharray: 1,
      origin: 1
    };
    this._skipPropsDelta = {
      timeline: 1,
      prevChainModule: 1,
      callbacksContext: 1
    };
    this._declareDefaults();
    this._extendDefaults();
    this._vars();
    this._render();
  }

  /*
    Method to declare defaults.
    @private
  */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Module, [{
    key: "_declareDefaults",
    value: function _declareDefaults() {
      this._defaults = {};
    }

    /*
      Method to declare module's variables.
      @private
    */
  }, {
    key: "_vars",
    value: function _vars() {
      this._progress = 0;
      this._strokeDasharrayBuffer = [];
    }

    /*
      Method to render on initialization.
      @private
    */
  }, {
    key: "_render",
    value: function _render() {}

    /*
      Method to set property on the module.
      @private
      @param {String, Object} Name of the property to set
                              or object with properties to set.
      @param {Any} Value for the property to set. Could be
                    undefined if the first param is object.
    */
  }, {
    key: "_setProp",
    value: function _setProp(attr, value) {
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(attr) === 'object') {
        for (var key in attr) {
          this._assignProp(key, attr[key]);
        }
      } else {
        this._assignProp(attr, value);
      }
    }

    /*
      Method to assign single property's value.
      @private
      @param {String} Property name.
      @param {Any}    Property value.
    */
  }, {
    key: "_assignProp",
    value: function _assignProp(key, value) {
      this._props[key] = value;
    }

    /*
      Method to show element.
      @private
    */
  }, {
    key: "_show",
    value: function _show() {
      var p = this._props;
      if (!this.el) {
        return;
      }
      if (p.isSoftHide) {
        // this.el.style.opacity = p.opacity;
        this._showByTransform();
      } else {
        this.el.style.display = 'block';
      }
      this._isShown = true;
    }

    /*
      Method to hide element.
      @private
    */
  }, {
    key: "_hide",
    value: function _hide() {
      if (!this.el) {
        return;
      }
      if (this._props.isSoftHide) {
        // this.el.style.opacity = 0;
        _h__WEBPACK_IMPORTED_MODULE_3___default().setPrefixedStyle(this.el, 'transform', 'scale(0)');
      } else {
        this.el.style.display = 'none';
      }
      this._isShown = false;
    }

    /*
      Method to show element by applying transform back to normal.
      @private
    */
  }, {
    key: "_showByTransform",
    value: function _showByTransform() {}

    /*
      Method to parse option string.
      Searches for stagger and rand values and parses them.
      Leaves the value unattended otherwise.
      @param {Any} Option value to parse.
      @returns {Number} Parsed options value.
    */
  }, {
    key: "_parseOptionString",
    value: function _parseOptionString(value) {
      if (typeof value === 'string') {
        if (value.match(/stagger/)) {
          value = _h__WEBPACK_IMPORTED_MODULE_3___default().parseStagger(value, this._index);
        }
      }
      if (typeof value === 'string') {
        if (value.match(/rand/)) {
          value = _h__WEBPACK_IMPORTED_MODULE_3___default().parseRand(value);
        }
      }
      return value;
    }

    /*
      Method to parse postion option.
      @param {String} Property name.
      @param {Any} Property Value.
      @returns {String} Parsed options value.
    */
  }, {
    key: "_parsePositionOption",
    value: function _parsePositionOption(key, value) {
      if ((_h__WEBPACK_IMPORTED_MODULE_3___default().unitOptionMap)[key]) {
        value = _h__WEBPACK_IMPORTED_MODULE_3___default().parseUnit(value).string;
      }
      return value;
    }

    /*
      Method to parse strokeDash.. option.
      @param {String} Property name.
      @param {Any}    Property value.
      @returns {String} Parsed options value.
    */
  }, {
    key: "_parseStrokeDashOption",
    value: function _parseStrokeDashOption(key, value) {
      var result = value;

      // parse numeric/percent values for strokeDash.. properties
      if (this._arrayPropertyMap[key]) {
        result = [];
        switch ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(value)) {
          case 'number':
            result.push(_h__WEBPACK_IMPORTED_MODULE_3___default().parseUnit(value));
            break;
          case 'string':
            var array = value.split(' ');
            for (var i = 0; i < array.length; i++) {
              result.push(_h__WEBPACK_IMPORTED_MODULE_3___default().parseUnit(array[i]));
            }
            break;
        }
      }
      return result;
    }

    /*
      Method to check if the property is delta property.
      @private
      @param {Any} Parameter value to check.
      @returns {Boolean}
    */
  }, {
    key: "_isDelta",
    value: function _isDelta(optionsValue) {
      var isObject = _h__WEBPACK_IMPORTED_MODULE_3___default().isObject(optionsValue);
      isObject = isObject && !optionsValue.unit;
      return !(!isObject || _h__WEBPACK_IMPORTED_MODULE_3___default().isArray(optionsValue) || _h__WEBPACK_IMPORTED_MODULE_3___default().isDOM(optionsValue));
    }

    /*
      Method to get delta from property and set
      the property's start value to the props object.
      @private
      @param {String} Key name to get delta for.
      @param {Object} Option value to get the delta for.
    */
  }, {
    key: "_getDelta",
    value: function _getDelta(key, optionsValue) {
      var delta;
      if ((key === 'left' || key === 'top') && !this._o.ctx) {
        _h__WEBPACK_IMPORTED_MODULE_3___default().warn("Consider to animate x/y properties instead of left/top,\n        as it would be much more performant", optionsValue);
      }

      // skip delta calculation for a property if it is listed
      // in skipPropsDelta object
      if (this._skipPropsDelta && this._skipPropsDelta[key]) {
        return;
      }

      // get delta
      delta = _h__WEBPACK_IMPORTED_MODULE_3___default().parseDelta(key, optionsValue, this._index);

      // if successfully parsed - save it
      if (delta.type != null) {
        this._deltas[key] = delta;
      }
      var deltaEnd = (0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(delta.end) === 'object' ? delta.end.value === 0 ? 0 : delta.end.string : delta.end;

      // set props to end value of the delta
      // 0 should be 0 regardless units
      this._props[key] = deltaEnd;
    }

    /*
      Method to copy `_o` options to `_props` object
      with fallback to `_defaults`.
      @private
    */
  }, {
    key: "_extendDefaults",
    value: function _extendDefaults() {
      this._props = {};
      this._deltas = {};
      for (var key in this._defaults) {
        // skip property if it is listed in _skipProps
        // if (this._skipProps && this._skipProps[key]) { continue; }
        // copy the properties to the _o object
        var value = this._o[key] != null ? this._o[key] : this._defaults[key];

        // parse option
        this._parseOption(key, value);
      }
    }

    /*
      Method to tune new options to _o and _props object.
      @private
      @param {Object} Options object to tune to.
    */
  }, {
    key: "_tuneNewOptions",
    value: function _tuneNewOptions(o) {
      // hide the module before tuning it's options
      // cuz the user could see the change
      this._hide();
      for (var key in o) {
        // skip property if it is listed in _skipProps
        // if (this._skipProps && this._skipProps[key]) { continue; }
        // copy the properties to the _o object
        // delete the key from deltas
        o && delete this._deltas[key];

        // rewrite _o record
        this._o[key] = o[key];

        // save the options to _props
        this._parseOption(key, o[key]);
      }
    }

    /*
      Method to parse option value.
      @private
      @param {String} Option name.
      @param {Any} Option value.
    */
  }, {
    key: "_parseOption",
    value: function _parseOption(name, value) {
      // if delta property
      if (this._isDelta(value) && !this._skipPropsDelta[name]) {
        this._getDelta(name, value);
        var deltaEnd = _h__WEBPACK_IMPORTED_MODULE_3___default().getDeltaEnd(value);
        return this._assignProp(name, this._parseProperty(name, deltaEnd));
      }
      this._assignProp(name, this._parseProperty(name, value));
    }

    /*
      Method to parse postion and string props.
      @private
      @param {String} Property name.
      @param {Any}    Property value.
      @returns {Any}  Parsed property value.
    */
  }, {
    key: "_parsePreArrayProperty",
    value: function _parsePreArrayProperty(name, value) {
      // parse stagger and rand values
      value = this._parseOptionString(value);

      // parse units for position properties
      return this._parsePositionOption(name, value);
    }

    /*
      Method to parse property value.
      @private
      @param {String} Property name.
      @param {Any}    Property value.
      @returns {Any}  Parsed property value.
    */
  }, {
    key: "_parseProperty",
    value: function _parseProperty(name, value) {
      // parse `HTML` element in `parent` option
      if (name === 'parent') {
        return _h__WEBPACK_IMPORTED_MODULE_3___default().parseEl(value);
      }

      // parse `stagger`, `rand` and `position`
      value = this._parsePreArrayProperty(name, value);

      // parse numeric/percent values for strokeDash.. properties
      return this._parseStrokeDashOption(name, value);
    }

    /*
      Method to parse values inside ∆.
      @private
      @param {String} Key name.
      @param {Object} Delta.
      @returns {Object} Delta with parsed parameters.
    */
  }, {
    key: "_parseDeltaValues",
    value: function _parseDeltaValues(name, delta) {
      // return h.parseDelta( name, delta, this._index );

      var d = {};
      for (var key in delta) {
        var value = delta[key];

        // delete delta[key];
        // add parsed properties
        var newEnd = this._parsePreArrayProperty(name, value);
        d[this._parsePreArrayProperty(name, key)] = newEnd;
      }
      return d;
    }

    /*
      Method to parse delta and nondelta properties.
      @private
      @param {String} Property name.
      @param {Any}    Property value.
      @returns {Any}  Parsed property value.
    */
  }, {
    key: "_preparsePropValue",
    value: function _preparsePropValue(key, value) {
      return this._isDelta(value) ? this._parseDeltaValues(key, value) : this._parsePreArrayProperty(key, value);
    }

    /*
      Method to calculate current progress of the deltas.
      @private
      @param {Number} Eased progress to calculate - [0..1].
      @param {Number} Progress to calculate - [0..1].
    */
  }, {
    key: "_calcCurrentProps",
    value: function _calcCurrentProps(easedProgress, p) {
      for (var key in this._deltas) {
        var value = this._deltas[key];

        // get eased progress from delta easing if defined and not curve
        var isCurve = !!value.curve;
        var ep = value.easing != null && !isCurve ? value.easing(p) : easedProgress;
        if (value.type === 'array') {
          var arr;

          // if prop property is array - reuse it else - create an array
          if (_h__WEBPACK_IMPORTED_MODULE_3___default().isArray(this._props[key])) {
            arr = this._props[key];
            arr.length = 0;
          } else {
            arr = [];
          }

          // just optimization to prevent curve
          // calculations on every array item
          var proc = isCurve ? value.curve(p) : null;
          for (var i = 0; i < value.delta.length; i++) {
            var item = value.delta[i],
              dash = !isCurve ? value.start[i].value + ep * item.value : proc * (value.start[i].value + p * item.value);
            arr.push({
              string: "".concat(dash).concat(item.unit),
              value: dash,
              unit: item.unit
            });
          }
          this._props[key] = arr;
        } else if (value.type === 'number') {
          this._props[key] = !isCurve ? value.start + ep * value.delta : value.curve(p) * (value.start + p * value.delta);
        } else if (value.type === 'unit') {
          var currentValue = !isCurve ? value.start.value + ep * value.delta : value.curve(p) * (value.start.value + p * value.delta);
          this._props[key] = "".concat(currentValue).concat(value.end.unit);
        } else if (value.type === 'color') {
          var r, g, b, a;
          if (!isCurve) {
            r = parseInt(value.start.r + ep * value.delta.r, 10);
            g = parseInt(value.start.g + ep * value.delta.g, 10);
            b = parseInt(value.start.b + ep * value.delta.b, 10);
            a = parseFloat(value.start.a + ep * value.delta.a);
          } else {
            var cp = value.curve(p);
            r = parseInt(cp * (value.start.r + p * value.delta.r), 10);
            g = parseInt(cp * (value.start.g + p * value.delta.g), 10);
            b = parseInt(cp * (value.start.b + p * value.delta.b), 10);
            a = parseFloat(cp * (value.start.a + p * value.delta.a));
          }
          this._props[key] = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
        }
      }
    }

    /*
      Method to calculate current progress and probably draw it in children.
      @private
      @param {Number} Eased progress to set - [0..1].
      @param {Number} Progress to set - [0..1].
    */
  }, {
    key: "_setProgress",
    value: function _setProgress(easedProgress, progress) {
      this._progress = easedProgress;
      this._calcCurrentProps(easedProgress, progress);
    }
  }]);
  return Module;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Module);

/***/ }),

/***/ "./src/mojs.babel.js":
/*!***************************!*\
  !*** ./src/mojs.babel.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var shapes_shapesMap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! shapes/shapesMap */ "./src/shapes/shapesMap.coffee");
/* harmony import */ var shapes_shapesMap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(shapes_shapesMap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _stagger__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./stagger */ "./src/stagger.babel.js");
/* harmony import */ var tween_tweener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tween/tweener */ "./src/tween/tweener.babel.js");
/* harmony import */ var easing_easing__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! easing/easing */ "./src/easing/easing.coffee");
/* harmony import */ var easing_easing__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(easing_easing__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shape */ "./src/shape.babel.js");
/* harmony import */ var _shape_swirl__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./shape-swirl */ "./src/shape-swirl.babel.js");
/* harmony import */ var _burst__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./burst */ "./src/burst.babel.js");
/* harmony import */ var _html__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./html */ "./src/html.babel.js");
/* harmony import */ var _spriter__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./spriter */ "./src/spriter.babel.js");
/* harmony import */ var _motion_path__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./motion-path */ "./src/motion-path.coffee");
/* harmony import */ var _motion_path__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_motion_path__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var tween_tween__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tween/tween */ "./src/tween/tween.babel.js");
/* harmony import */ var tween_timeline__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! tween/timeline */ "./src/tween/timeline.babel.js");
/* harmony import */ var tween_tweenable__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tween/tweenable */ "./src/tween/tweenable.babel.js");
/* harmony import */ var _thenable__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./thenable */ "./src/thenable.babel.js");
/* harmony import */ var _tunable__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tunable */ "./src/tunable.babel.js");
/* harmony import */ var delta_delta__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! delta/delta */ "./src/delta/delta.babel.js");
/* harmony import */ var delta_deltas__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! delta/deltas */ "./src/delta/deltas.babel.js");
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./module */ "./src/module.babel.js");



















var mojs = {
  revision: "2.6.0",
  isDebug: "production" !== 'production',
  helpers: (_h__WEBPACK_IMPORTED_MODULE_0___default()),
  Shape: _shape__WEBPACK_IMPORTED_MODULE_5__["default"],
  ShapeSwirl: _shape_swirl__WEBPACK_IMPORTED_MODULE_6__["default"],
  Burst: _burst__WEBPACK_IMPORTED_MODULE_7__["default"],
  Html: _html__WEBPACK_IMPORTED_MODULE_8__["default"],
  stagger: _stagger__WEBPACK_IMPORTED_MODULE_2__["default"],
  Spriter: _spriter__WEBPACK_IMPORTED_MODULE_9__["default"],
  MotionPath: (_motion_path__WEBPACK_IMPORTED_MODULE_10___default()),
  Tween: tween_tween__WEBPACK_IMPORTED_MODULE_11__["default"],
  Timeline: tween_timeline__WEBPACK_IMPORTED_MODULE_12__["default"],
  Tweenable: tween_tweenable__WEBPACK_IMPORTED_MODULE_13__["default"],
  Thenable: _thenable__WEBPACK_IMPORTED_MODULE_14__["default"],
  Tunable: _tunable__WEBPACK_IMPORTED_MODULE_15__["default"],
  Module: _module__WEBPACK_IMPORTED_MODULE_18__["default"],
  tweener: tween_tweener__WEBPACK_IMPORTED_MODULE_3__["default"],
  easing: (easing_easing__WEBPACK_IMPORTED_MODULE_4___default()),
  shapesMap: (shapes_shapesMap__WEBPACK_IMPORTED_MODULE_1___default()),
  _pool: {
    Delta: delta_delta__WEBPACK_IMPORTED_MODULE_16__["default"],
    Deltas: delta_deltas__WEBPACK_IMPORTED_MODULE_17__["default"]
  },
  h: (_h__WEBPACK_IMPORTED_MODULE_0___default()),
  delta: (_h__WEBPACK_IMPORTED_MODULE_0___default().delta),
  addShape: (shapes_shapesMap__WEBPACK_IMPORTED_MODULE_1___default().addShape),
  CustomShape: (shapes_shapesMap__WEBPACK_IMPORTED_MODULE_1___default().custom),
  Transit: _shape__WEBPACK_IMPORTED_MODULE_5__["default"],
  Swirl: _shape_swirl__WEBPACK_IMPORTED_MODULE_6__["default"]
};
if (typeof window !== 'undefined') {
  window.mojs = mojs;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mojs);

/***/ }),

/***/ "./src/shape-swirl.babel.js":
/*!**********************************!*\
  !*** ./src/shape-swirl.babel.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _shape__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./shape */ "./src/shape.babel.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/*
  *TODO:*
  ---
  - tweak then chains
*/
var ShapeSwirl = /*#__PURE__*/function (_Shape) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(ShapeSwirl, _Shape);
  var _super = _createSuper(ShapeSwirl);
  function ShapeSwirl() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, ShapeSwirl);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(ShapeSwirl, [{
    key: "_declareDefaults",
    value:
    /*
      Method to declare _defaults and other default objects.
      @private
      @override @ Shape
    */
    function _declareDefaults() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(ShapeSwirl.prototype), "_declareDefaults", this).call(this);

      /* _DEFAULTS ARE - Shape DEFAULTS + THESE: */

      /* [boolean] :: If shape should follow sinusoidal path. */
      this._defaults.isSwirl = true;

      /* ∆ :: [number > 0] :: Degree size of the sinusoidal path. */
      this._defaults.swirlSize = 10;

      /* ∆ :: [number > 0] :: Frequency of the sinusoidal path. */
      this._defaults.swirlFrequency = 3;

      /* ∆ :: [number > 0] :: Sinusoidal path length scale. */
      this._defaults.pathScale = 1;

      /* ∆ :: [number] :: Degree shift for the sinusoidal path. */
      this._defaults.degreeShift = 0;

      /* ∆ :: [number] :: Radius of the shape. */
      this._defaults.radius = 5;

      // ∆ :: Units :: Possible values: [ number, string ]
      this._defaults.x = 0;

      // ∆ :: Units :: Possible values: [ number, string ]
      this._defaults.y = 0;

      // ∆ :: Possible values: [ number ]
      this._defaults.scale = {
        1: 0
      };

      /* [number: -1, 1] :: Directon of Swirl. */
      this._defaults.direction = 1;
    }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to copy _o options to _props with
      fallback to _defaults.
      @private
      @override @ Module
    */
  }, {
    key: "_extendDefaults",
    value: function _extendDefaults() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(ShapeSwirl.prototype), "_extendDefaults", this).call(this);
      this._calcPosData();
    }

    /*
      Method to tune new oprions to _o and _props object.
      @private
      @overrides @ Module
      @param {Object} Options object to tune to.
    */
  }, {
    key: "_tuneNewOptions",
    value: function _tuneNewOptions(o) {
      if (o == null) {
        return;
      }
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(ShapeSwirl.prototype), "_tuneNewOptions", this).call(this, o);
      if (o.x != null || o.y != null) {
        this._calcPosData();
      }
    }

    /*
      Method to calculate Swirl's position data.
      @private
    */
  }, {
    key: "_calcPosData",
    value: function _calcPosData() {
      var x = this._getPosValue('x'),
        y = this._getPosValue('y'),
        rotate = 90 + Math.atan(y.delta / x.delta || 0) * (_h__WEBPACK_IMPORTED_MODULE_6___default().RAD_TO_DEG);
      this._posData = {
        radius: Math.sqrt(x.delta * x.delta + y.delta * y.delta),
        rotate: x.delta < 0 ? rotate + 180 : rotate,
        x: x,
        y: y
      };

      // set the last position to _props
      // this._calcSwirlXY( 1 );
    }

    /*
      Gets `x` or `y` position value.
      @private
      @param {String} Name of the property.
    */
  }, {
    key: "_getPosValue",
    value: function _getPosValue(name) {
      var delta = this._deltas[name];
      if (delta) {
        // delete from deltas to prevent normal
        delete this._deltas[name];
        return {
          start: delta.start.value,
          end: delta.end.value,
          delta: delta.delta,
          units: delta.end.unit
        };
      } else {
        var pos = _h__WEBPACK_IMPORTED_MODULE_6___default().parseUnit(this._props[name]);
        return {
          start: pos.value,
          end: pos.value,
          delta: 0,
          units: pos.unit
        };
      }
    }

    /*
      Method to calculate the progress of the Swirl.
      @private
      @overrides @ Shape
      @param {Numer} Eased progress of the Swirl in range of [0..1]
      @param {Numer} Progress of the Swirl in range of [0..1]
    */
  }, {
    key: "_setProgress",
    value: function _setProgress(easedProgress, progress) {
      this._progress = easedProgress;
      this._calcCurrentProps(easedProgress, progress);
      this._calcSwirlXY(easedProgress);

      // this._calcOrigin();
      this._draw(easedProgress);
    }

    /*
      Method to calculate x/y for Swirl's progress
      @private
      @mutates _props
      @param {Number} Current progress in [0...1]
    */
  }, {
    key: "_calcSwirlXY",
    value: function _calcSwirlXY(proc) {
      var p = this._props,
        rotate = this._posData.rotate + p.degreeShift,
        point = _h__WEBPACK_IMPORTED_MODULE_6___default().getRadialPoint({
          rotate: p.isSwirl ? rotate + this._getSwirl(proc) : rotate,
          radius: proc * this._posData.radius * p.pathScale,
          center: {
            x: this._posData.x.start,
            y: this._posData.y.start
          }
        });

      // if foreign svg canvas - set position without units
      var x = point.x,
        y = point.y,
        smallNumber = 0.000001;

      // remove very small numbers to prevent exponential forms
      if (x > 0 && x < smallNumber) {
        x = smallNumber;
      }
      if (y > 0 && y < smallNumber) {
        y = smallNumber;
      }
      if (x < 0 && x > -smallNumber) {
        x = -smallNumber;
      }
      if (y < 0 && y > -smallNumber) {
        y = -smallNumber;
      }
      p.x = this._o.ctx ? x : "".concat(x).concat(this._posData.x.units);
      p.y = this._o.ctx ? y : "".concat(y).concat(this._posData.y.units);
    }

    /*
      Method to get progress of the swirl.
      @private
      @param {Number} Progress of the Swirl.
      @returns {Number} Progress of the swirl.
    */
  }, {
    key: "_getSwirl",
    value: function _getSwirl(proc) {
      var p = this._props;
      return p.direction * p.swirlSize * Math.sin(p.swirlFrequency * proc);
    }

    /*
      Method to draw shape.
      If !isWithShape - draw self el only, but not shape.
      @private
      @overrides @ Shape.
    */
  }, {
    key: "_draw",
    value: function _draw() {
      // call _draw or just _drawEl @ Shape depending if there is `shape`
      var methodName = this._props.isWithShape ? '_draw' : '_drawEl';
      _shape__WEBPACK_IMPORTED_MODULE_7__["default"].prototype[methodName].call(this);
    }
  }]);
  return ShapeSwirl;
}(_shape__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ShapeSwirl);

/***/ }),

/***/ "./src/shape.babel.js":
/*!****************************!*\
  !*** ./src/shape.babel.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var shapes_shapesMap__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! shapes/shapesMap */ "./src/shapes/shapesMap.coffee");
/* harmony import */ var shapes_shapesMap__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(shapes_shapesMap__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./module */ "./src/module.babel.js");
/* harmony import */ var _tunable__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./tunable */ "./src/tunable.babel.js");








function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_6__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }





// TODO
//  - refactor
//    - add setIfChanged to Module
//  --
//  - tween for every prop
var Shape = /*#__PURE__*/function (_Tunable) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__["default"])(Shape, _Tunable);
  var _super = _createSuper(Shape);
  function Shape() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_2__["default"])(this, Shape);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_3__["default"])(Shape, [{
    key: "_declareDefaults",
    value:
    /*
      Method to declare module's defaults.
      @private
    */
    function _declareDefaults() {
      // DEFAULTS / APIs
      this._defaults = {
        // where to append the module to [selector, HTMLElement]
        parent: document.body,
        // class name for the `el`
        className: '',
        // Possible values: [circle, line, zigzag, rect, polygon, cross, equal ]
        shape: 'circle',
        // ∆ :: Possible values: [color name, rgb, rgba, hex]
        stroke: 'transparent',
        // ∆ :: Possible values: [ 0..1 ]
        strokeOpacity: 1,
        // Possible values: ['butt' | 'round' | 'square']
        strokeLinecap: '',
        // ∆ :: Possible values: [ number ]
        strokeWidth: 2,
        // ∆ :: Units :: Possible values: [ number, string ]
        strokeDasharray: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        strokeDashoffset: 0,
        // ∆ :: Possible values: [color name, rgb, rgba, hex]
        fill: 'deeppink',
        // ∆ :: Possible values: [ 0..1 ]
        fillOpacity: 1,
        // {Boolean} - if should hide module with `opacity` instead of `display`
        isSoftHide: true,
        // {Boolean} - if should trigger composite layer for the `el`
        isForce3d: false,
        // ∆ :: Units :: Possible values: [ number, string ]
        left: '50%',
        // ∆ :: Units :: Possible values: [ number, string ]
        top: '50%',
        // ∆ :: Units :: Possible values: [ number, string ]
        x: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        y: 0,
        // ∆ :: Possible values: [ number ]
        rotate: 0,
        // ∆ :: Possible values: [ number ]
        scale: 1,
        // ∆ :: Possible values: [ number ] Fallbacks to `scale`.
        scaleX: null,
        // ∆ :: Possible values: [ number ] Fallbacks to `scale`.
        scaleY: null,
        // ∆ :: Possible values: [ number, string ]
        origin: '50% 50%',
        // ∆ :: Possible values: [ 0..1 ]
        opacity: 1,
        // ∆ :: Units :: Possible values: [ number, string ]
        rx: 0,
        // ∆ :: Units :: Possible values: [ number, string ]
        ry: 0,
        // ∆ :: Possible values: [ number ]
        points: 3,
        // ∆ :: Possible values: [ number ]
        radius: 50,
        // ∆ :: Possible values: [ number ]
        radiusX: null,
        // ∆ :: Possible values: [ number ]
        radiusY: null,
        // Possible values: [ boolean ]
        isShowStart: false,
        // Possible values: [ boolean ]
        isShowEnd: true,
        // Possible values: [ boolean ]
        isRefreshState: true,
        // Possible values: [ number > 0 ]
        duration: 400,
        // Possible values: [ number ]

        /* technical ones: */
        // explicit width of the module canvas
        width: null,
        // explicit height of the module canvas
        height: null,
        // Possible values: [ number ]
        // sizeGap:          0,
        /* [boolean] :: If should have child shape. */
        isWithShape: true,
        // context for all the callbacks
        callbacksContext: this,
        // Custom attributes
        attrs: null
      };
    }

    /*
      Method to start the animation with optional new options.
      @public
      @overrides @ Tunable
      @param {Object} New options to set on the run.
      @returns {Object} this.
    */
  }, {
    key: "tune",
    value: function tune(o) {
      // Handle tune via callback function:
      if (typeof o === 'function') {
        (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(Shape.prototype), "tune", this).call(this, o(_objectSpread({
          el: this.el
        }, this._props)));
      } else {
        (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(Shape.prototype), "tune", this).call(this, o);
      }

      // update shapeModule's size to the max in `then` chain
      this._getMaxSizeInChain();
      return this;
    }

    /*
      Method to create a then record for the module.
      @public
      @overrides @ Thenable
      @param    {Object} Options for the next animation.
      @returns  {Object} this.
    */
  }, {
    key: "then",
    value: function then(o) {
      // this._makeTimeline()
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(Shape.prototype), "then", this).call(this, o);

      // update shapeModule's size to the max in `then` chain
      this._getMaxSizeInChain();
      return this;
    }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to declare variables.
      @overrides Thenable
    */
  }, {
    key: "_vars",
    value: function _vars() {
      // call _vars method on Thenable
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(Shape.prototype), "_vars", this).call(this);
      this._lastSet = {};

      // save previous module in the chain
      this._prevChainModule = this._o.prevChainModule;

      // should draw on foreign svg canvas
      this.isForeign = !!this._o.ctx;

      // this._o.isTimelineLess = true;
      // should take an svg element as self bit
      return this.isForeignBit = !!this._o.shape;
    }

    /*
      Method to initialize modules presentation.
      @private
      @overrides Module
    */
  }, {
    key: "_render",
    value: function _render() {
      var _this = this;
      if (!this._isRendered && !this._isChained) {
        // create `mojs` shape element
        this.el = document.createElement('div');

        // set name on the `el`
        this.el.setAttribute('data-name', 'mojs-shape');

        // set class on the `el`
        this.el.setAttribute('class', this._props.className);

        // set custom attributes
        if (this._props.attrs) {
          this._props.attrs.forEach(function (attr) {
            var _Object$entries$ = (0,_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__["default"])(Object.entries(attr)[0], 2),
              key = _Object$entries$[0],
              value = _Object$entries$[1];
            _this.el.setAttribute(key, value);
          });
        }

        // create shape module
        this._createShape();

        // append `el` to parent
        this._props.parent.appendChild(this.el);

        // set position styles on the el
        this._setElStyles();

        // set initial position for the first module in the chain
        this._setProgress(0, 0);

        // show at start if `isShowStart`
        if (this._props.isShowStart) {
          this._show();
        } else {
          this._hide();
        }

        // set `_isRendered` hatch
        this._isRendered = true;
      } else if (this._isChained) {
        // save elements from master module
        this.el = this._masterModule.el;
        this.shapeModule = this._masterModule.shapeModule;
      }
      return this;
    }

    /*
      Method to set el styles on initialization.
      @private
    */
  }, {
    key: "_setElStyles",
    value: function _setElStyles() {
      if (!this.el) {
        return;
      }

      // if (!this.isForeign) {
      var p = this._props,
        style = this.el.style,
        width = p.shapeWidth,
        height = p.shapeHeight;
      style.position = 'absolute';
      this._setElSizeStyles(width, height);
      if (p.isForce3d) {
        var name = 'backface-visibility';
        style["".concat(name)] = 'hidden';
        style["".concat((_h__WEBPACK_IMPORTED_MODULE_8___default().prefix).css).concat(name)] = 'hidden';
      }

      // }
    }

    /*
      Method to set `width`/`height`/`margins` to the `el` styles.
      @param {Number} Width.
      @param {height} Height.
    */
  }, {
    key: "_setElSizeStyles",
    value: function _setElSizeStyles(width, height) {
      var style = this.el.style;
      style.width = "".concat(width, "px");
      style.height = "".concat(height, "px");
      style['margin-left'] = "".concat(-width / 2, "px");
      style['margin-top'] = "".concat(-height / 2, "px");
    }

    /*
      Method to draw shape.
      @private
    */
  }, {
    key: "_draw",
    value: function _draw() {
      if (!this.shapeModule) {
        return;
      }
      var p = this._props,
        bP = this.shapeModule._props;

      // set props on bit
      // bP.x                    = this._origin.x;
      // bP.y                    = this._origin.y;
      bP.rx = p.rx;
      bP.ry = p.ry;
      bP.stroke = p.stroke;
      bP['stroke-width'] = p.strokeWidth;
      bP['stroke-opacity'] = p.strokeOpacity;
      bP['stroke-dasharray'] = p.strokeDasharray;
      bP['stroke-dashoffset'] = p.strokeDashoffset;
      bP['stroke-linecap'] = p.strokeLinecap;
      bP['fill'] = p.fill;
      bP['fill-opacity'] = p.fillOpacity;
      bP.radius = p.radius;
      bP.radiusX = p.radiusX;
      bP.radiusY = p.radiusY;
      bP.points = p.points;
      this.shapeModule._draw();
      this._drawEl();
    }

    /*
      Method to set current modules props to main div el.
      @private
    */
  }, {
    key: "_drawEl",
    value: function _drawEl() {
      // return;
      if (this.el == null) {
        return true;
      }
      var p = this._props;
      var style = this.el.style;

      // style.opacity = p.opacity;
      this._isPropChanged('opacity') && (style.opacity = p.opacity);
      if (!this.isForeign) {
        this._isPropChanged('left') && (style.left = p.left);
        this._isPropChanged('top') && (style.top = p.top);
        var isX = this._isPropChanged('x'),
          isY = this._isPropChanged('y'),
          isTranslate = isX || isY,
          isScaleX = this._isPropChanged('scaleX'),
          isScaleY = this._isPropChanged('scaleY'),
          isScale = this._isPropChanged('scale'),
          isRotate = this._isPropChanged('rotate');
        isScale = isScale || isScaleX || isScaleY;
        if (isTranslate || isScale || isRotate) {
          var transform = this._fillTransform();
          style["".concat((_h__WEBPACK_IMPORTED_MODULE_8___default().prefix).css, "transform")] = transform;
          style['transform'] = transform;
        }
        if (this._isPropChanged('origin') || this._deltas['origin']) {
          var origin = this._fillOrigin();
          style["".concat((_h__WEBPACK_IMPORTED_MODULE_8___default().prefix).css, "transform-origin")] = origin;
          style['transform-origin'] = origin;
        }
      }
    }

    /*
      Method to check if property changed after the latest check.
      @private
      @param {String} Name of the property to check.
      @returns {Boolean}
    */
  }, {
    key: "_isPropChanged",
    value: function _isPropChanged(name) {
      // if there is no recod for the property - create it
      if (this._lastSet[name] == null) {
        this._lastSet[name] = {};
      }
      if (this._lastSet[name].value !== this._props[name]) {
        this._lastSet[name].value = this._props[name];
        return true;
      } else {
        return false;
      }
    }

    /*
      Method to tune new option on run.
      @private
      @override @ Module
      @param {Object}  Option to tune on run.
    */
  }, {
    key: "_tuneNewOptions",
    value: function _tuneNewOptions(o) {
      // call super on Module
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_7__["default"])(Shape.prototype), "_tuneNewOptions", this).call(this, o);

      // return if empty object
      if (!(o != null && Object.keys(o).length)) {
        return 1;
      }

      // this._calcSize();
      this._setElStyles();
    }

    /*
      Method to get max radiusX value.
      @private
      @param {String} Radius name.
    */
  }, {
    key: "_getMaxRadius",
    value: function _getMaxRadius(name) {
      var selfSize;
      selfSize = this._getRadiusSize('radius');
      return this._getRadiusSize(name, selfSize);
    }

    /*
      Method to increase calculated size based on easing.
      @private
    */
  }, {
    key: "_increaseSizeWithEasing",
    value: function _increaseSizeWithEasing() {
      var p = this._props,
        easing = this._o.easing,
        isStringEasing = easing && typeof easing === 'string';
      switch (isStringEasing && easing.toLowerCase()) {
        case 'elastic.out':
        case 'elastic.inout':
          p.size *= 1.25;
          break;
        case 'back.out':
        case 'back.inout':
          p.size *= 1.1;
      }
    }

    /*
      Method to increase calculated size based on bit ratio.
      @private
    */
    // _increaseSizeWithBitRatio () {
    //   var p   = this._props;
    //   // p.size *= this.shape._props.ratio;
    //   p.size += 2 * p.sizeGap;
    // }
    /*
      Method to get maximum radius size with optional fallback.
      @private
      @param {Object}
        @param key {String} Name of the radius - [radius|radiusX|radiusY].
        @param @optional fallback {Number}  Optional number to set if there
                                            is no value for the key.
    */
  }, {
    key: "_getRadiusSize",
    value: function _getRadiusSize(name) {
      var fallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var delta = this._deltas[name];

      // if value is delta value
      if (delta != null) {
        // get maximum number between start and end values of the delta
        return Math.max(Math.abs(delta.end), Math.abs(delta.start));
      } else if (this._props[name] != null) {
        // else get the value from props object
        return parseFloat(this._props[name]);
      } else {
        return fallback;
      }
    }

    /*
      Method to get max shape canvas size and save it to _props.
      @private
    */
  }, {
    key: "_getShapeSize",
    value: function _getShapeSize() {
      var p = this._props,
        // get maximum stroke value
        stroke = this._getMaxStroke();

      // save shape `width` and `height` to `_props`
      p.shapeWidth = p.width != null ? p.width : 2 * this._getMaxRadius('radiusX') + stroke;
      p.shapeHeight = p.height != null ? p.height : 2 * this._getMaxRadius('radiusY') + stroke;
    }

    /*
      Method to create shape.
      @private
    */
  }, {
    key: "_createShape",
    value: function _createShape() {
      // calculate max shape canvas size and set to _props
      this._getShapeSize();

      // don't create actual shape if !`isWithShape`
      if (!this._props.isWithShape) {
        return;
      }
      var p = this._props;

      // get shape's class
      var _Shape = shapes_shapesMap__WEBPACK_IMPORTED_MODULE_9___default().getShape(this._props.shape);

      // create `_shape` module
      this.shapeModule = new _Shape({
        width: p.shapeWidth,
        height: p.shapeHeight,
        parent: this.el
      });
    }

    /*
      Method to get max size in `then` chain
      @private
    */
  }, {
    key: "_getMaxSizeInChain",
    value: function _getMaxSizeInChain() {
      var maxW = 0,
        maxH = 0;
      for (var i = 0; i < this._modules.length; i++) {
        this._modules[i]._getShapeSize();
        maxW = Math.max(maxW, this._modules[i]._props.shapeWidth);
        maxH = Math.max(maxH, this._modules[i]._props.shapeHeight);
      }
      this.shapeModule && this.shapeModule._setSize(maxW, maxH);
      this._setElSizeStyles(maxW, maxH);
    }

    /*
      Method to get max value of the strokeWidth.
      @private
    */
  }, {
    key: "_getMaxStroke",
    value: function _getMaxStroke() {
      var p = this._props;
      var dStroke = this._deltas['strokeWidth'];
      return dStroke != null ? Math.max(dStroke.start, dStroke.end) : p.strokeWidth;
    }

    /*
      Method to draw current progress of the deltas.
      @private
      @override @ Module
      @param   {Number}  EasedProgress to set - [0..1].
      @param   {Number}  Progress to set - [0..1].
    */
  }, {
    key: "_setProgress",
    value: function _setProgress(easedProgress, progress) {
      // call the super on Module
      _module__WEBPACK_IMPORTED_MODULE_10__["default"].prototype._setProgress.call(this, easedProgress, progress);

      // draw current progress
      this._draw(easedProgress);
    }

    /*
      Method to add callback overrides to passed object.
      @private
      @param {Object} Object to add the overrides to.
    */
  }, {
    key: "_applyCallbackOverrides",
    value: function _applyCallbackOverrides(obj) {
      var it = this,
        p = this._props;

      // specify control functions for the module
      obj.callbackOverrides = {
        onUpdate: function onUpdate(ep, p) {
          return it._setProgress(ep, p);
        },
        onStart: function onStart(isFwd) {
          // don't touch main `el` onStart in chained elements
          if (it._isChained) {
            return;
          }
          if (isFwd) {
            it._show();
          } else {
            if (!p.isShowStart) {
              it._hide();
            }
          }
        },
        onComplete: function onComplete(isFwd) {
          // don't touch main `el` if not the last in `then` chain
          if (!it._isLastInChain()) {
            return;
          }
          if (isFwd) {
            if (!p.isShowEnd) {
              it._hide();
            }
          } else {
            it._show();
          }
        },
        onRefresh: function onRefresh(isBefore) {
          p.isRefreshState && isBefore && it._refreshBefore();
        }
      };
    }

    /*
      Method to setup tween and timeline options before creating them.
      @override @ Tweenable
      @private
    */
  }, {
    key: "_transformTweenOptions",
    value: function _transformTweenOptions() {
      this._applyCallbackOverrides(this._o);
    }

    /*
      Method to create transform string.
      @private
      @returns {String} Transform string.
    */
  }, {
    key: "_fillTransform",
    value: function _fillTransform() {
      var p = this._props,
        scaleX = p.scaleX != null ? p.scaleX : p.scale,
        scaleY = p.scaleY != null ? p.scaleY : p.scale,
        scale = "".concat(scaleX, ", ").concat(scaleY);
      return "translate(".concat(p.x, ", ").concat(p.y, ") rotate(").concat(p.rotate, "deg) scale(").concat(scale, ")");
    }

    /*
      Method to create transform-origin string.
      @private
      @returns {String} Transform string.
    */
  }, {
    key: "_fillOrigin",
    value: function _fillOrigin() {
      var p = this._props,
        str = '';
      for (var i = 0; i < p.origin.length; i++) {
        str += "".concat(p.origin[i].string, " ");
      }
      return str;
    }

    /*
      Method to refresh state befor startTime.
      @private
    */
  }, {
    key: "_refreshBefore",
    value: function _refreshBefore() {
      // call setProgress with eased and normal progress
      this._setProgress(this.tween._props.easing(0), 0);
      if (this._props.isShowStart) {
        this._show();
      } else {
        this._hide();
      }
    }

    /*
      Method that gets called on `soft` show of the module,
      it should restore transform styles of the module.
      @private
      @overrides @ Module
    */
  }, {
    key: "_showByTransform",
    value: function _showByTransform() {
      // reset the cache of the scale prop
      this._lastSet.scale = null;

      // draw el accroding to it's props
      this._drawEl();
    }

    // CUSTOM METHODS:
    /*
      Method that return props
      @public
    */
  }, {
    key: "getProps",
    value: function getProps() {
      return _objectSpread({
        el: this.el
      }, this._props);
    }
  }]);
  return Shape;
}(_tunable__WEBPACK_IMPORTED_MODULE_11__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Shape);

/***/ }),

/***/ "./src/shapes/bit.babel.js":
/*!*********************************!*\
  !*** ./src/shapes/bit.babel.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/typeof */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var src_h__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/h */ "./src/h.coffee");
/* harmony import */ var src_h__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(src_h__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var src_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/module */ "./src/module.babel.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


var Bit = /*#__PURE__*/function (_Module) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Bit, _Module);
  var _super = _createSuper(Bit);
  function Bit() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Bit);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Bit, [{
    key: "_declareDefaults",
    value:
    /*
      Method to declare module's defaults.
      @private
    */
    function _declareDefaults() {
      this._defaults = {
        'ns': 'http://www.w3.org/2000/svg',
        'tag': 'ellipse',
        'parent': document.body,
        'ratio': 1,
        'radius': 50,
        'radiusX': null,
        'radiusY': null,
        'stroke': 'hotpink',
        'stroke-dasharray': '',
        'stroke-dashoffset': '',
        'stroke-linecap': '',
        'stroke-width': 2,
        'stroke-opacity': 1,
        'fill': 'transparent',
        'fill-opacity': 1,
        'width': 0,
        'height': 0
      };
      this._drawMap = ['stroke', 'stroke-width', 'stroke-opacity', 'stroke-dasharray', 'fill', 'stroke-dashoffset', 'stroke-linecap', 'fill-opacity', 'transform'];
    }
  }, {
    key: "_vars",
    value: function _vars() {
      this._state = {};
      this._drawMapLength = this._drawMap.length;
    }

    /*
      Method for initial render of the shape.
      @private
    */
  }, {
    key: "_render",
    value: function _render() {
      if (this._isRendered) {
        return;
      }

      // set `_isRendered` hatch
      this._isRendered = true;

      // create `SVG` canvas to draw in
      this._createSVGCanvas();

      // set canvas size
      this._setCanvasSize();

      // draw the initial state
      // this._draw();
      // append the canvas to the parent from props
      this._props.parent.appendChild(this._canvas);
    }

    /*
      Method to create `SVG` canvas to draw in.
      @private
    */
  }, {
    key: "_createSVGCanvas",
    value: function _createSVGCanvas() {
      var p = this._props;

      // create canvas - `svg` element to draw in
      this._canvas = document.createElementNS(p.ns, 'svg');

      // create the element shape element and add it to the canvas
      this.el = document.createElementNS(p.ns, p.tag);
      this._canvas.appendChild(this.el);
    }

    /*
      Method to set size of the _canvas.
      @private
    */
  }, {
    key: "_setCanvasSize",
    value: function _setCanvasSize() {
      var style = this._canvas.style;
      style.display = 'block';
      style.width = '100%';
      style.height = '100%';
      style.left = '0px';
      style.top = '0px';
    }

    /*
      Method to draw the shape.
      Called on every frame.
      @private
    */
  }, {
    key: "_draw",
    value: function _draw() {
      this._props.length = this._getLength();
      var len = this._drawMapLength;
      while (len--) {
        var name = this._drawMap[len];
        switch (name) {
          case 'stroke-dasharray':
          case 'stroke-dashoffset':
            this.castStrokeDash(name);
        }
        this._setAttrIfChanged(name, this._props[name]);
      }
      this._state.radius = this._props.radius;
    }
  }, {
    key: "castStrokeDash",
    value: function castStrokeDash(name) {
      // # if array of values
      var p = this._props;
      if (src_h__WEBPACK_IMPORTED_MODULE_6___default().isArray(p[name])) {
        var stroke = '';
        for (var i = 0; i < p[name].length; i++) {
          var dash = p[name][i],
            cast = dash.unit === '%' ? this.castPercent(dash.value) : dash.value;
          stroke += "".concat(cast, " ");
        }
        p[name] = stroke === '0 ' ? stroke = '' : stroke;
        return p[name] = stroke;
      }

      // # if single value
      if ((0,_babel_runtime_helpers_typeof__WEBPACK_IMPORTED_MODULE_0__["default"])(p[name]) === 'object') {
        stroke = p[name].unit === '%' ? this.castPercent(p[name].value) : p[name].value;
        p[name] = stroke === 0 ? stroke = '' : stroke;
      }
    }
  }, {
    key: "castPercent",
    value: function castPercent(percent) {
      return percent * (this._props.length / 100);
    }

    /*
      Method to set props to attributes and cache the values.
      @private
    */
  }, {
    key: "_setAttrIfChanged",
    value: function _setAttrIfChanged(name, value) {
      if (this._state[name] !== value) {
        // this.el.style[name] = value;
        this.el.setAttribute(name, value);
        this._state[name] = value;
      }
    }

    /*
      Method to length of the shape.
      @private
      @returns {Number} Length of the shape.
    */
  }, {
    key: "_getLength",
    value: function _getLength() {
      var p = this._props,
        len = 0,
        isGetLength = !!(this.el && this.el.getTotalLength);
      if (isGetLength && this.el.getAttribute('d')) {
        len = this.el.getTotalLength();
      } else {
        len = 2 * (p.radiusX != null ? p.radiusX : p.radius);
      }
      return len;
    }

    /*
      Method to calculate total sum between points.
      @private
      @param {Array} Array of points.
      @returns {Number} Distance bewtween all points.
    */
  }, {
    key: "_getPointsPerimiter",
    value: function _getPointsPerimiter(points) {
      var sum = 0;
      for (var i = 1; i < points.length; i++) {
        sum += this._pointsDelta(points[i - 1], points[i]);
      }
      sum += this._pointsDelta(points[0], src_h__WEBPACK_IMPORTED_MODULE_6___default().getLastItem(points));
      return sum;
    }

    /*
      Method to get delta from two points.
      @private
      @param {Object} Point 1.
      @param {Object} Point 2.
      @returns {Number} Distance between the pooints.
    */
  }, {
    key: "_pointsDelta",
    value: function _pointsDelta(point1, point2) {
      var dx = Math.abs(point1.x - point2.x),
        dy = Math.abs(point1.y - point2.y);
      return Math.sqrt(dx * dx + dy * dy);
    }

    /*
      Method to set module's size.
      @private
      @param {Number} Module width.
      @param {Number} Module height.
    */
  }, {
    key: "_setSize",
    value: function _setSize(width, height) {
      var p = this._props;
      p.width = width;
      p.height = height;
      this._draw();
    }
  }]);
  return Bit;
}(src_module__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Bit);

/***/ }),

/***/ "./src/shapes/curve.babel.js":
/*!***********************************!*\
  !*** ./src/shapes/curve.babel.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _bit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Curve = /*#__PURE__*/function (_Bit) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Curve, _Bit);
  var _super = _createSuper(Curve);
  function Curve() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Curve);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Curve, [{
    key: "_declareDefaults",
    value:
    /*
      Method to declare module's defaults.
      @private
      @overrides @ Bit
    */
    function _declareDefaults() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Curve.prototype), "_declareDefaults", this).call(this);
      this._defaults.tag = 'path';
    }

    /*
      Method to draw the module.
      @private
      @overrides @ Bit
    */
  }, {
    key: "_draw",
    value: function _draw() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Curve.prototype), "_draw", this).call(this);
      var p = this._props;
      var radiusX = p.radiusX != null ? p.radiusX : p.radius;
      var radiusY = p.radiusY != null ? p.radiusY : p.radius;
      var isRadiusX = radiusX === this._prevRadiusX;
      var isRadiusY = radiusY === this._prevRadiusY;
      var isPoints = p.points === this._prevPoints;

      // skip if nothing changed
      if (isRadiusX && isRadiusY && isPoints) {
        return;
      }
      var x = p.width / 2;
      var y = p.height / 2;
      var x1 = x - radiusX;
      var x2 = x + radiusX;
      var d = "M".concat(x1, " ").concat(y, " Q ").concat(x, " ").concat(y - 2 * radiusY, " ").concat(x2, " ").concat(y);

      // set the `d` attribute and save it to `_prevD`
      this.el.setAttribute('d', d);

      // save the properties
      this._prevPoints = p.points;
      this._prevRadiusX = radiusX;
      this._prevRadiusY = radiusY;
    }
  }, {
    key: "_getLength",
    value: function _getLength() {
      var p = this._props;
      var radiusX = p.radiusX != null ? p.radiusX : p.radius;
      var radiusY = p.radiusY != null ? p.radiusY : p.radius;
      var dRadius = radiusX + radiusY;
      var sqrt = Math.sqrt((3 * radiusX + radiusY) * (radiusX + 3 * radiusY));
      return .5 * Math.PI * (3 * dRadius - sqrt);
    }
  }]);
  return Curve;
}(_bit__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Curve);

/***/ }),

/***/ "./src/shapes/custom.babel.js":
/*!************************************!*\
  !*** ./src/shapes/custom.babel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _bit__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var Custom = /*#__PURE__*/function (_Bit) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Custom, _Bit);
  var _super = _createSuper(Custom);
  function Custom() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Custom);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Custom, [{
    key: "_declareDefaults",
    value:
    /*
      Method to declare module's defaults.
      @private
      @overrides @ Bit
    */
    function _declareDefaults() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Custom.prototype), "_declareDefaults", this).call(this);
      this._defaults.tag = 'path';
      this._defaults.parent = null;

      // remove `stroke-width` from `_drawMap`
      // because we need to recal strokeWidth size regarding scale
      for (var i = 0; i < this._drawMap.length; i++) {
        if (this._drawMap[i] === 'stroke-width') {
          this._drawMap.splice(i, 1);
        }
      }
    }

    /*
      Method to get shape to set on module's path.
      @public
      @returns {String} Empty string.
    */
  }, {
    key: "getShape",
    value: function getShape() {
      return '';
    }

    /*
      Method to get shape perimeter length.
      @public
      @returns {Number} Default length string.
    */
  }, {
    key: "getLength",
    value: function getLength() {
      return 100;
    }

    /*
      Method to draw the shape.
      Called on every frame.
      @private
      @overrides @ Bit
    */
  }, {
    key: "_draw",
    value: function _draw() {
      var p = this._props,
        state = this._state,
        radiusXChange = state['radiusX'] !== p.radiusX,
        radiusYChange = state['radiusY'] !== p.radiusY,
        radiusChange = state['radius'] !== p.radius;

      // update transform only if one of radiuses changed
      if (radiusXChange || radiusYChange || radiusChange) {
        this.el.setAttribute('transform', this._getScale());
        state['radiusX'] = p.radiusX;
        state['radiusY'] = p.radiusY;
        state['radius'] = p.radius;
      }
      this._setAttrIfChanged('stroke-width', p['stroke-width'] / p.maxScale);
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Custom.prototype), "_draw", this).call(this);
    }

    /*
      Method for initial render of the shape.
      @private
      @overrides @ Bit
    */
  }, {
    key: "_render",
    value: function _render() {
      if (this._isRendered) {
        return;
      }
      this._isRendered = true;
      this._length = this.getLength();
      var p = this._props;
      p.parent.innerHTML = "<svg id=\"js-mojs-shape-canvas\" xmlns=\"http://www.w3.org/2000/svg\" xlink=\"http://www.w3.org/1999/xlink\"><g id=\"js-mojs-shape-el\">".concat(this.getShape(), "</g></svg>");
      this._canvas = p.parent.querySelector('#js-mojs-shape-canvas');
      this.el = p.parent.querySelector('#js-mojs-shape-el');
      this._setCanvasSize();
    }

    /*
      Method to get scales for the shape.
      @private
      @mutates @props
    */
  }, {
    key: "_getScale",
    value: function _getScale() {
      var p = this._props,
        radiusX = p.radiusX ? p.radiusX : p.radius,
        radiusY = p.radiusY ? p.radiusY : p.radius;
      p.scaleX = 2 * radiusX / 100;
      p.scaleY = 2 * radiusY / 100;
      p.maxScale = Math.max(p.scaleX, p.scaleY);
      p.shiftX = p.width / 2 - 50 * p.scaleX;
      p.shiftY = p.height / 2 - 50 * p.scaleY;
      var translate = "translate(".concat(p.shiftX, ", ").concat(p.shiftY, ")");
      return "".concat(translate, " scale(").concat(p.scaleX, ", ").concat(p.scaleY, ")");
    }

    /*
      Method to length of the shape.
      @private
      @returns {Number} Length of the shape.
    */
  }, {
    key: "_getLength",
    value: function _getLength() {
      return this._length;
    }
  }]);
  return Custom;
}(_bit__WEBPACK_IMPORTED_MODULE_6__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Custom);

/***/ }),

/***/ "./src/spriter.babel.js":
/*!******************************!*\
  !*** ./src/spriter.babel.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var tween_tween__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tween/tween */ "./src/tween/tween.babel.js");
/* harmony import */ var tween_timeline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tween/timeline */ "./src/tween/timeline.babel.js");






/*
  Class for toggling opacity on bunch of elements
  @class Spriter
  @todo
    - add isForce3d option
    - add run new option merging
    - add then chains
*/
var Spriter = /*#__PURE__*/function () {
  function Spriter() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Spriter);
    this.o = o;
    if (!this.o.el) {
      return _h__WEBPACK_IMPORTED_MODULE_2___default().error('No "el" option specified, aborting');
    }
    this._vars();
    this._declareDefaults();
    this._extendDefaults();
    this._parseFrames();
    if (this._frames.length <= 2) _h__WEBPACK_IMPORTED_MODULE_2___default().warn("Spriter: only ".concat(this._frames.length, " frames found"));
    if (this._frames.length < 1) _h__WEBPACK_IMPORTED_MODULE_2___default().error('Spriter: there is no frames to animate, aborting');
    this._createTween();
    return this;
  }

  /*
    Method to declare some variables.
     @method run
    @param  {Object} New options
    @todo   Implement new object merging
  */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Spriter, [{
    key: "_declareDefaults",
    value:
    /*
      Defaults/APIs
    */
    function _declareDefaults() {
      this._defaults = {
        /*
          Duration
          @property duration
          @type     {Number}
        */
        duration: 500,
        /*
          Delay
          @property delay
          @type     {Number}
        */
        delay: 0,
        /*
          Easing. Please see the
          [timeline module parseEasing function](timeline.coffee.html#parseEasing)
          for all avaliable options.
           @property easing
          @type     {String, Function}
        */
        easing: 'linear.none',
        /*
          Repeat times count
           @property repeat
          @type     {Number}
        */
        repeat: 0,
        /*
          Yoyo option defines if animation should be altered on repeat.
           @property yoyo
          @type     {Boolean}
        */
        yoyo: false,
        /*
          isRunLess option prevents animation from running immediately after
          initialization.
           @property isRunLess
          @type     {Boolean}
        */
        isRunLess: false,
        /*
          isShowEnd option defines if the last frame should be shown when
          animation completed.
           @property isShowEnd
          @type     {Boolean}
        */
        isShowEnd: false,
        /*
          onStart callback will be called once on animation start.
           @property onStart
          @type     {Function}
        */
        onStart: null,
        /*
          onUpdate callback will be called on every frame of the animation.
          The current progress in range **[0,1]** will be passed to the callback.
           @property onUpdate
          @type     {Function}
        */
        onUpdate: null,
        /*
          onComplete callback will be called once on animation complete.
           @property onComplete
          @type     {Function}
        */
        onComplete: null
      };
    }
  }, {
    key: "_vars",
    value: function _vars() {
      this._props = _h__WEBPACK_IMPORTED_MODULE_2___default().cloneObj(this.o);
      this.el = this.o.el;
      this._frames = [];
    }

    /*
      Method to run the spriter on demand.
       @method run
      @param  {Object} New options
      @todo   Implement new object merging
    */
  }, {
    key: "run",
    value: function run() {
      return this.timeline.play();
    }

    /*
      Method to extend _props by options(this.o)
       @method _extendDefaults
    */
  }, {
    key: "_extendDefaults",
    value: function _extendDefaults() {
      return _h__WEBPACK_IMPORTED_MODULE_2___default().extend(this._props, this._defaults);
    }

    /*
      Method to parse frames as child nodes of el.
       @method _parseFrames
    */
  }, {
    key: "_parseFrames",
    value: function _parseFrames() {
      this._frames = Array.prototype.slice.call(this.el.children, 0);
      this._frames.forEach(function (frame) {
        return frame.style.opacity = 0;
      });
      this._frameStep = 1 / this._frames.length;
    }

    /*
      Method to create tween and timeline and supply callbacks.
       @method _createTween
    */
  }, {
    key: "_createTween",
    value: function _createTween() {
      var _this = this;
      this._tween = new tween_tween__WEBPACK_IMPORTED_MODULE_3__["default"]({
        duration: this._props.duration,
        delay: this._props.delay,
        yoyo: this._props.yoyo,
        repeat: this._props.repeat,
        easing: this._props.easing,
        onStart: function onStart() {
          return _this._props.onStart && _this._props.onStart();
        },
        onComplete: function onComplete() {
          return _this._props.onComplete && _this._props.onComplete();
        },
        onUpdate: function onUpdate(p) {
          return _this._setProgress(p);
        }
      });
      this.timeline = new tween_timeline__WEBPACK_IMPORTED_MODULE_4__["default"]();
      this.timeline.add(this._tween);
      if (!this._props.isRunLess) this._startTween();
    }

    /*
      Method to start tween
       @method _startTween
    */
  }, {
    key: "_startTween",
    value: function _startTween() {
      var _this2 = this;
      setTimeout(function () {
        return _this2.timeline.play();
      }, 1);
    }

    /*
      Method to set progress of the sprite
       @method _setProgress
      @param  {Number} Progress in range **[0,1]**
    */
  }, {
    key: "_setProgress",
    value: function _setProgress(p) {
      // get the frame number
      var proc = Math.floor(p / this._frameStep);

      // react only if frame changes
      if (this._prevFrame != this._frames[proc]) {
        // if previous frame isnt current one, hide it
        if (this._prevFrame) {
          this._prevFrame.style.opacity = 0;
        }

        // if end of animation and isShowEnd flag was specified
        // then show the last frame else show current frame
        var currentNum = p === 1 && this._props.isShowEnd ? proc - 1 : proc;

        // show the current frame
        if (this._frames[currentNum]) {
          this._frames[currentNum].style.opacity = 1;
        }

        // set previous frame as current
        this._prevFrame = this._frames[proc];
      }
      if (this._props.onUpdate) {
        this._props.onUpdate(p);
      }
    }
  }]);
  return Spriter;
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Spriter);

/***/ }),

/***/ "./src/stagger.babel.js":
/*!******************************!*\
  !*** ./src/stagger.babel.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ stagger)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var tween_timeline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tween/timeline */ "./src/tween/timeline.babel.js");
/* harmony import */ var _tunable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tunable */ "./src/tunable.babel.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var Stagger = /*#__PURE__*/function (_Tunable) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Stagger, _Tunable);
  var _super = _createSuper(Stagger);
  function Stagger(options, Module) {
    var _this;
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Stagger);
    _this = _super.call(this);
    return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(_this, _this._init(options, Module));
  }

  /*
    Method to create then chain on child modules.
    @param {Object} Then options.
    @return {Object} this.
  */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Stagger, [{
    key: "then",
    value: function then(o) {
      if (o == null) {
        return this;
      }
      for (var i = 0; i < this._modules.length; i++) {
        // get child module's option and pass to the child `then`
        this._modules[i].then(this._getOptionByIndex(i, o));
      }
      this.timeline._recalcTotalDuration();
      return this;
    }

    /*
      Method to tune child modules.
      @param {Object} Tune options.
      @return {Object} this.
    */
  }, {
    key: "tune",
    value: function tune(o) {
      if (o == null) {
        return this;
      }
      for (var i = 0; i < this._modules.length; i++) {
        // get child module's option and pass to the child `then`
        this._modules[i].tune(this._getOptionByIndex(i, o));
      }
      this.timeline._recalcTotalDuration();
      return this;
    }

    /*
      Method to generate child modules.
      @return {Object} this.
    */
  }, {
    key: "generate",
    value: function generate() {
      for (var i = 0; i < this._modules.length; i++) {
        // get child module's option and pass to the child `then`
        this._modules[i].generate();
      }
      this.timeline._recalcTotalDuration();
      return this;
    }

    /*
      Method to get an option by modulo and name.
      @param {String} Name of the property to get.
      @param {Number} Index for the modulo calculation.
      @param {Object} Options hash to look in.
      @return {Any} Property.
    */
  }, {
    key: "_getOptionByMod",
    value: function _getOptionByMod(name, i, store) {
      var props = store[name];

      // if not dom list then clone it to array
      if (props + '' === '[object NodeList]' || props + '' === '[object HTMLCollection]') props = Array.prototype.slice.call(props, 0);

      // get the value in array or return the value itself
      var value = _h__WEBPACK_IMPORTED_MODULE_5___default().isArray(props) ? props[i % props.length] : props;

      // check if value has the stagger expression, if so parse it
      return _h__WEBPACK_IMPORTED_MODULE_5___default().parseIfStagger(value, i);
    }

    /*
      Method to get option by modulo of index.
      @param {Number} Index for modulo calculations.
      @param {Object} Options hash to look in.
    */
  }, {
    key: "_getOptionByIndex",
    value: function _getOptionByIndex(i, store) {
      var _this2 = this;
      var options = {};
      Object.keys(store).forEach(function (key) {
        return options[key] = _this2._getOptionByMod(key, i, store);
      });
      return options;
    }

    /*
      Method to get total child modules quantity.
      @param  {String} Name of quantifier in options hash.
      @param  {Object} Options hash object.
      @return {Number} Number of child object that should be defined.
    */
  }, {
    key: "_getChildQuantity",
    value: function _getChildQuantity(name, store) {
      // if number was set
      if (typeof name === 'number') {
        return name;
      }
      var quantifier = store[name];
      if (_h__WEBPACK_IMPORTED_MODULE_5___default().isArray(quantifier)) {
        return quantifier.length;
      } else if (quantifier + '' === '[object NodeList]') {
        return quantifier.length;
      } else if (quantifier + '' === '[object HTMLCollection]') {
        return Array.prototype.slice.call(quantifier, 0).length;
      } else if (quantifier instanceof HTMLElement) {
        return 1;
      } else if (typeof quantifier === 'string') {
        return 1;
      }
    }

    /*
      Method to make stagger form options
      @param {Object} Options.
      @param {Object} Child class.
    */
  }, {
    key: "_init",
    value: function _init(options, Module) {
      var count = this._getChildQuantity(options.quantifier || 'el', options);
      this._createTimeline(options);
      this._modules = [];
      for (var i = 0; i < count; i++) {
        // get child module's option
        var option = this._getOptionByIndex(i, options);
        option.isRunLess = true;

        // set index of the module
        option.index = i;

        // create child module
        var module = new Module(option);
        this._modules.push(module);

        // add child module's timeline to the self timeline
        this.timeline.add(module);
      }
      return this;
    }

    /*
      Method to create timeline.
      @param {Object} Timeline options.
    */
  }, {
    key: "_createTimeline",
    value: function _createTimeline() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      this.timeline = new tween_timeline__WEBPACK_IMPORTED_MODULE_6__["default"](options.timeline);
    }

    /* @overrides @ Tweenable */
  }, {
    key: "_makeTween",
    value: function _makeTween() {}
  }, {
    key: "_makeTimeline",
    value: function _makeTimeline() {}
  }]);
  return Stagger;
}(_tunable__WEBPACK_IMPORTED_MODULE_7__["default"]);
function stagger(Module) {
  return function (options) {
    return new Stagger(options, Module);
  };
}

/***/ }),

/***/ "./src/thenable.babel.js":
/*!*******************************!*\
  !*** ./src/thenable.babel.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var tween_tweenable__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! tween/tweenable */ "./src/tween/tweenable.babel.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



/*
  The Thenable class adds .then public method and
  the ability to chain API calls.
*/
var Thenable = /*#__PURE__*/function (_Tweenable) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Thenable, _Tweenable);
  var _super = _createSuper(Thenable);
  function Thenable() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Thenable);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Thenable, [{
    key: "then",
    value:
    /*
      Method to create a then record for the module.
      @public
      @param    {Object} Options for the next animation.
      @returns  {Object} this.
    */
    function then(o) {
      // return if nothing was passed
      if (o == null || !Object.keys(o).length) {
        return 1;
      }

      // merge then options with the current ones
      var prevRecord = this._history[this._history.length - 1];
      var merged = this._mergeThenOptions(prevRecord, o);
      this._resetMergedFlags(merged);

      // create a submodule of the same type as the master module
      var module = new this.constructor(merged);

      // set `this` as amster module of child module
      module._masterModule = this;

      // save the modules to the _modules array
      this._modules.push(module);

      // add module's tween into master timeline
      this.timeline.append(module);
      return this;
    }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to reset some flags on merged options object.
      @private
      @param   {Object} Options object.
      @returns {Object} Options object.
    */
  }, {
    key: "_resetMergedFlags",
    value: function _resetMergedFlags(obj) {
      // set the submodule to be without timeline for perf reasons
      obj.isTimelineLess = true;

      // reset isShowStart flag for the submodules
      obj.isShowStart = false;

      // reset isRefreshState flag for the submodules
      obj.isRefreshState = false;

      // set the submodule callbacks context
      obj.callbacksContext = this._props.callbacksContext || this;

      // set previous module
      obj.prevChainModule = _h__WEBPACK_IMPORTED_MODULE_7___default().getLastItem(this._modules);

      // pass the `this` as master module
      obj.masterModule = this;
      return obj;
    }

    /*
      Method to initialize properties.
      @private
    */
  }, {
    key: "_vars",
    value: function _vars() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Thenable.prototype), "_vars", this).call(this);

      // save _master module
      this._masterModule = this._o.masterModule;

      // set isChained flag based on prevChainModule option
      this._isChained = !!this._masterModule;

      // we are expect that the _o object
      // have been already extended by defaults
      var initialRecord = _h__WEBPACK_IMPORTED_MODULE_7___default().cloneObj(this._props);
      for (var key in this._arrayPropertyMap) {
        if (this._o[key]) {
          var preParsed = this._parsePreArrayProperty(key, this._o[key]);
          initialRecord[key] = preParsed;
        }
      }
      this._history = [initialRecord];

      // the array holds all modules in the then chain
      this._modules = [this];

      // the props that to exclude from then merge
      this._nonMergeProps = {
        shape: 1
      };
    }

    /*
      Method to merge two options into one. Used in .then chains.
      @private
      @param {Object} Start options for the merge.
      @param {Object} End options for the merge.
      @returns {Object} Merged options.
    */
  }, {
    key: "_mergeThenOptions",
    value: function _mergeThenOptions(start, end) {
      var o = {};
      this._mergeStartLoop(o, start);
      this._mergeEndLoop(o, start, end);
      this._history.push(o);
      return o;
    }

    /*
      Method to pipe startValue of the delta.
      @private
      @param {String} Start property name.
      @param {Any} Start property value.
      @returns {Any} Start property value.
    */
  }, {
    key: "_checkStartValue",
    value: function _checkStartValue(name, value) {
      return value;
    }

    /*
      Originally part of the _mergeThenOptions.
      Loops thru start object and copies all the props from it.
      @param {Object} An object to copy in.
      @parma {Object} Start options object.
    */
  }, {
    key: "_mergeStartLoop",
    value: function _mergeStartLoop(o, start) {
      // loop thru start options object
      for (var key in start) {
        var value = start[key];
        if (start[key] == null) {
          continue;
        }

        // copy all values from start if not tween prop or duration
        if (!_h__WEBPACK_IMPORTED_MODULE_7___default().isTweenProp(key) || key === 'duration') {
          // if delta - copy only the end value
          if (this._isDelta(value)) {
            o[key] = _h__WEBPACK_IMPORTED_MODULE_7___default().getDeltaEnd(value);
          } else {
            o[key] = value;
          }
        }
      }
    }

    /*
      Originally part of the _mergeThenOptions.
      Loops thru start object and merges all the props from it.
      @param {Object} An object to copy in.
      @parma {Object} Start options object.
      @parma {Object} End options object.
    */
  }, {
    key: "_mergeEndLoop",
    value: function _mergeEndLoop(o, start, end) {
      for (var key in end) {
        // just copy parent option
        if (key == 'parent') {
          o[key] = end[key];
          continue;
        }

        // get key/value of the end object
        // endKey - name of the property, endValue - value of the property
        var endValue = end[key],
          startValue = start[key] != null ? start[key] : this._defaults[key];
        startValue = this._checkStartValue(key, startValue);
        if (endValue == null) {
          continue;
        }

        // make ∆ of start -> end
        // if key name is radiusX/radiusY and
        // the startValue is not set fallback to radius value
        var isSubRadius = key === 'radiusX' || key === 'radiusY';
        if (isSubRadius && startValue == null) {
          startValue = start.radius;
        }
        isSubRadius = key === 'scaleX' || key === 'scaleY';
        if (isSubRadius && startValue == null) {
          startValue = start.scale;
        }
        o[key] = this._mergeThenProperty(key, startValue, endValue);
      }
    }

    /*
      Method to merge `start` and `end` for a property in then record.
      @private
      @param {String} Property name.
      @param {Any}    Start value of the property.
      @param {Any}    End value of the property.
    */
  }, {
    key: "_mergeThenProperty",
    value: function _mergeThenProperty(key, startValue, endValue) {
      // if isnt tween property
      var isBoolean = typeof endValue === 'boolean',
        curve,
        easing;
      if (!_h__WEBPACK_IMPORTED_MODULE_7___default().isTweenProp(key) && !this._nonMergeProps[key] && !isBoolean) {
        if (_h__WEBPACK_IMPORTED_MODULE_7___default().isObject(endValue) && endValue.to != null) {
          curve = endValue.curve;
          easing = endValue.easing;
          endValue = endValue.to;
        }

        // if end value is delta - just save it
        if (this._isDelta(endValue)) {
          return this._parseDeltaValues(key, endValue);
        } else {
          var parsedEndValue = this._parsePreArrayProperty(key, endValue);

          // if end value is not delta - merge with start value
          if (this._isDelta(startValue)) {
            var _ref;
            // if start value is delta - take the end value
            // as start value of the new delta
            return _ref = {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, _h__WEBPACK_IMPORTED_MODULE_7___default().getDeltaEnd(startValue), parsedEndValue), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, "easing", easing), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref, "curve", curve), _ref;

            // if both start and end value are not ∆ - make ∆
          } else {
            var _ref2;
            return _ref2 = {}, (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, startValue, parsedEndValue), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, "easing", easing), (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])(_ref2, "curve", curve), _ref2;
          }
        }

        // copy the tween values unattended
      } else {
        return endValue;
      }
    }

    /*
      Method to retreive array's length and return -1 for
      all other types.
      @private
      @param {Array, Any} Array to get the width for.
      @returns {Number} Array length or -1 if not array.
    */
  }, {
    key: "_getArrayLength",
    value: function _getArrayLength(arr) {
      return _h__WEBPACK_IMPORTED_MODULE_7___default().isArray(arr) ? arr.length : -1;
    }

    /*
      Method to check if the property is delta property.
      @private
      @param {Any} Parameter value to check.
      @returns {Boolean}
    */
  }, {
    key: "_isDelta",
    value: function _isDelta(optionsValue) {
      var isObject = _h__WEBPACK_IMPORTED_MODULE_7___default().isObject(optionsValue);
      isObject = isObject && !optionsValue.unit;
      return !(!isObject || _h__WEBPACK_IMPORTED_MODULE_7___default().isArray(optionsValue) || _h__WEBPACK_IMPORTED_MODULE_7___default().isDOM(optionsValue));
    }

    /*
      Method to check if the module is first in `then` chain.
      @private
      @returns {Boolean} If the module is the first in module chain.
    */
  }, {
    key: "_isFirstInChain",
    value: function _isFirstInChain() {
      return !this._masterModule;
    }

    /*
      Method to check if the module is last in `then` chain.
      @private
      @returns {Boolean} If the module is the last in module chain.
    */
  }, {
    key: "_isLastInChain",
    value: function _isLastInChain() {
      var master = this._masterModule;

      // if there is no master field - check the modules length
      // if module length is 1 thus there is no modules chain
      // it is the last one, otherwise it isnt
      if (!master) {
        return this._modules.length === 1;
      }

      // if there is master - check if it is the last item in _modules chain
      return this === _h__WEBPACK_IMPORTED_MODULE_7___default().getLastItem(master._modules);
    }
  }]);
  return Thenable;
}(tween_tweenable__WEBPACK_IMPORTED_MODULE_8__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Thenable);

/***/ }),

/***/ "./src/tunable.babel.js":
/*!******************************!*\
  !*** ./src/tunable.babel.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./h */ "./src/h.coffee");
/* harmony import */ var _h__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_h__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _thenable__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./thenable */ "./src/thenable.babel.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_4__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


var Tuneable = /*#__PURE__*/function (_Thenable) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_3__["default"])(Tuneable, _Thenable);
  var _super = _createSuper(Tuneable);
  function Tuneable() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_1__["default"])(this, Tuneable);
    return _super.apply(this, arguments);
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_2__["default"])(Tuneable, [{
    key: "tune",
    value:
    /*
      Method to start the animation with optional new options.
      @public
      @param {Object} New options to set on the run.
      @returns {Object} this.
    */
    function tune(o) {
      // if options object was passed
      if (o && Object.keys(o).length) {
        this._transformHistory(o);
        this._tuneNewOptions(o);

        // restore array prop values because _props
        // contain them as parsed arrays
        // but we need the as strings to store in history
        // and merge in history chains
        this._history[0] = _h__WEBPACK_IMPORTED_MODULE_6___default().cloneObj(this._props);
        for (var key in this._arrayPropertyMap) {
          if (o[key] != null) {
            this._history[0][key] = this._preparsePropValue(key, o[key]);
          }
        }
        this._tuneSubModules();
        this._resetTweens();
      }
      return this;
    }

    /*
      Method to regenerate all the random properties form initial object.
      @public
      @returns this.
    */
  }, {
    key: "generate",
    value: function generate() {
      return this.tune(this._o);
    }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to preparse options in object.
      @private
      @param {Object} Object to preparse properties on.
      @returns {Object} Passed object with preparsed props.
    */
    // _preParseOptions ( o ) {
    //   for (var key in o) {
    //     o[key] = this._preparsePropValue( key, o[key] );
    //   }
    //   return o;
    // }
    /*
      Method to transform history rewrite new options object chain on run.
      @private
      @param {Object} New options to tune for.
    */
  }, {
    key: "_transformHistory",
    value: function _transformHistory(o) {
      for (var key in o) {
        var value = o[key];

        // don't transform for childOptions
        // if ( key === 'childOptions' ) { continue; }
        this._transformHistoryFor(key, this._preparsePropValue(key, value));
      }
    }

    /*
      Method to transform history chain for specific key/value.
      @param {String} Name of the property to transform history for.
      @param {Any} The new property's value.
    */
  }, {
    key: "_transformHistoryFor",
    value: function _transformHistoryFor(key, value) {
      for (var i = 0; i < this._history.length; i++) {
        value = this._transformHistoryRecord(i, key, value);

        // break if no further history modifications needed
        if (value == null) {
          break;
        }
      }
    }

    /*
      Method to transform history recod with key/value.
      @param {Number} Index of the history record to transform.
      @param {String} Property name to transform.
      @param {Any} Property value to transform to.
      @param {Object} Optional the current history record.
      @param {Object} Optional the next history record.
      @returns {Boolean} Returns true if no further
                         history modifications is needed.
    */
  }, {
    key: "_transformHistoryRecord",
    value: function _transformHistoryRecord(index, key, newVal, currRecord, nextRecord) {
      // newVal = this._parseProperty( key, newVal );
      if (newVal == null) {
        return null;
      }

      // fallback to history records, if wasn't specified
      currRecord = currRecord == null ? this._history[index] : currRecord;
      nextRecord = nextRecord == null ? this._history[index + 1] : nextRecord;
      var oldVal = currRecord[key],
        nextVal = nextRecord == null ? null : nextRecord[key];

      // if index is 0 - always save the newVal
      // and return non-delta for subsequent modifications
      if (index === 0) {
        currRecord[key] = newVal;

        // always return on tween properties
        if (_h__WEBPACK_IMPORTED_MODULE_6___default().isTweenProp(key) && key !== 'duration') {
          return null;
        }

        // nontween properties
        var isRewriteNext = this._isRewriteNext(oldVal, nextVal),
          returnVal = this._isDelta(newVal) ? _h__WEBPACK_IMPORTED_MODULE_6___default().getDeltaEnd(newVal) : newVal;
        return isRewriteNext ? returnVal : null;
      } else {
        // if was delta and came none-deltta - rewrite
        // the start of the delta and stop
        if (this._isDelta(oldVal)) {
          currRecord[key] = (0,_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__["default"])({}, newVal, _h__WEBPACK_IMPORTED_MODULE_6___default().getDeltaEnd(oldVal));
          return null;
        } else {
          // if the old value is not delta and the new one is
          currRecord[key] = newVal;

          // if the next item has the same value - return the
          // item for subsequent modifications or stop
          return this._isRewriteNext(oldVal, nextVal) ? newVal : null;
        }
      }
    }

    /*
      Method to check if the next item should
      be rewrited in transform history operation.
      @private
      @param {Any} Current value.
      @param {Any} Next value.
      @returns {Boolean} If need to rewrite the next value.
    */
  }, {
    key: "_isRewriteNext",
    value: function _isRewriteNext(currVal, nextVal) {
      // return false if nothing to rewrite next
      if (nextVal == null && currVal != null) {
        return false;
      }
      var isEqual = currVal === nextVal,
        isNextDelta = this._isDelta(nextVal),
        isDelta = this._isDelta(currVal),
        isValueDeltaChain = false,
        isDeltaChain = false;
      if (isDelta && isNextDelta) {
        if (_h__WEBPACK_IMPORTED_MODULE_6___default().getDeltaEnd(currVal) == _h__WEBPACK_IMPORTED_MODULE_6___default().getDeltaStart(nextVal)) {
          isDeltaChain = true;
        }
      } else if (isNextDelta) {
        isValueDeltaChain = _h__WEBPACK_IMPORTED_MODULE_6___default().getDeltaStart(nextVal) === "".concat(currVal);
      }
      return isEqual || isValueDeltaChain || isDeltaChain;
    }

    /*
      Method to tune new history options to all the submodules.
      @private
    */
  }, {
    key: "_tuneSubModules",
    value: function _tuneSubModules() {
      for (var i = 1; i < this._modules.length; i++) {
        this._modules[i]._tuneNewOptions(this._history[i]);
      }
    }

    /*
      Method to set new options on run.
      @param {Boolean} If foreign context.
      @private
    */
  }, {
    key: "_resetTweens",
    value: function _resetTweens() {
      var shift = 0,
        tweens = this.timeline._timelines;

      // if `isTimelineLess` return
      if (tweens == null) {
        return;
      }
      for (var i = 0; i < tweens.length; i++) {
        var tween = tweens[i],
          prevTween = tweens[i - 1];
        shift += prevTween ? prevTween._props.repeatTime : 0;
        this._resetTween(tween, this._history[i], shift);
      }
      this.timeline._setProp(this._props.timeline);
      this.timeline._recalcTotalDuration();
    }

    /*
      Method to reset tween with new options.
      @param {Object} Tween to reset.
      @param {Object} Tween's to reset tween with.
      @param {Number} Optional number to shift tween start time.
    */
  }, {
    key: "_resetTween",
    value: function _resetTween(tween, o) {
      var shift = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      o.shiftTime = shift;
      tween._setProp(o);
    }
  }]);
  return Tuneable;
}(_thenable__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tuneable);

/***/ }),

/***/ "./src/tween/timeline.babel.js":
/*!*************************************!*\
  !*** ./src/tween/timeline.babel.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var src_h__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! src/h */ "./src/h.coffee");
/* harmony import */ var src_h__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(src_h__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var tween_tween__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tween/tween */ "./src/tween/tween.babel.js");






function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }


var Timeline = /*#__PURE__*/function (_Tween) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Timeline, _Tween);
  var _super = _createSuper(Timeline);
  function Timeline() {
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Timeline);
    return _super.call(this, o);
  }

  /*
    Method to declare some vars.
    @private
  */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Timeline, [{
    key: "add",
    value:
    /*
      API method to add child tweens/timelines.
      @public
      @param {Object, Array} Tween/Timeline or an array of such.
      @returns {Object} Self.
    */
    function add() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      this._pushTimelineArray(args);
      this._calcDimentions();
      return this;
    }

    /*
      API method to append the Tween/Timeline to the end of the
      timeline. Each argument is treated as a new append.
      Array of tweens is treated as a parallel sequence.
      @public
      @param {Object, Array} Tween/Timeline to append or array of such.
      @returns {Object} Self.
    */
  }, {
    key: "append",
    value: function append() {
      for (var _len2 = arguments.length, timeline = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        timeline[_key2] = arguments[_key2];
      }
      for (var _i = 0, _timeline = timeline; _i < _timeline.length; _i++) {
        var tm = _timeline[_i];
        if (src_h__WEBPACK_IMPORTED_MODULE_6___default().isArray(tm)) {
          this._appendTimelineArray(tm);
        } else {
          this._appendTimeline(tm, this._timelines.length);
        }
        this._calcDimentions();
      }
      return this;
    }

    /*
      API method to stop the Tween.
      @public
      @param   {Number} Progress [0..1] to set when stopped.
      @returns {Object} Self.
    */
  }, {
    key: "stop",
    value: function stop(progress) {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Timeline.prototype), "stop", this).call(this, progress);
      this._stopChildren(progress);
      return this;
    }

    /*
      Method to reset tween's state and properties.
      @public
      @overrides @ Tween
      @returns this.
    */
  }, {
    key: "reset",
    value: function reset() {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Timeline.prototype), "reset", this).call(this);
      this._resetChildren();
      return this;
    }

    /*
      Method to call `reset` method on all children.
      @private
    */
  }, {
    key: "_resetChildren",
    value: function _resetChildren() {
      for (var i = 0; i < this._timelines.length; i++) {
        this._timelines[i].reset();
      }
    }

    /*
      Method to call `stop` method on all children.
      @private
      @param   {Number} Progress [0..1] to set when stopped.
    */
  }, {
    key: "_stopChildren",
    value: function _stopChildren(progress) {
      for (var i = this._timelines.length - 1; i >= 0; i--) {
        this._timelines[i].stop(progress);
      }
    }

    /*
      Method to set tween's state to complete.
      @private
      @overrides @ Tween
      @param {Number} Current time.
      @param {Boolean} Is yoyo period.
    */
    // _complete ( time, isYoyo ) {
    //   // this._updateChildren( 1, time, isYoyo );
    //   // this._setProgress( 1, time, isYoyo );
    //   super._complete( time, isYoyo );
    //   // this._resetChildren();
    // }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to append Tween/Timeline array or mix of such.
      @private
      @param {Array} Array of Tweens/Timelines.
    */
  }, {
    key: "_appendTimelineArray",
    value: function _appendTimelineArray(timelineArray) {
      var i = timelineArray.length,
        time = this._props.repeatTime - this._props.delay,
        len = this._timelines.length;
      while (i--) {
        this._appendTimeline(timelineArray[i], len, time);
      }
    }

    /*
      Method to append a single timeline to the Timeline.
      @private
      @param {Object} Tween/Timline to append.
      @param {Number} Index of the append.
      @param {Number} Shift time.
    */
  }, {
    key: "_appendTimeline",
    value: function _appendTimeline(timeline, index, time) {
      // if timeline is a module with timeline property then extract it
      if (timeline.timeline instanceof Timeline) {
        timeline = timeline.timeline;
      }
      if (timeline.tween instanceof tween_tween__WEBPACK_IMPORTED_MODULE_7__["default"]) {
        timeline = timeline.tween;
      }
      var shift = time != null ? time : this._props.duration;
      shift += timeline._props.shiftTime || 0;
      timeline.index = index;
      this._pushTimeline(timeline, shift);
    }

    /*
      PrivateMethod to push Tween/Timeline array.
      @private
      @param {Array} Array of Tweens/Timelines.
    */
  }, {
    key: "_pushTimelineArray",
    value: function _pushTimelineArray(array) {
      for (var i = 0; i < array.length; i++) {
        var tm = array[i];

        // recursive push to handle arrays of arrays
        if (src_h__WEBPACK_IMPORTED_MODULE_6___default().isArray(tm)) {
          this._pushTimelineArray(tm);
        } else {
          this._pushTimeline(tm);
        }
      }
    }

    /*
      Method to push a single Tween/Timeline.
      @private
      @param {Object} Tween or Timeline to push.
      @param {Number} Number of milliseconds to shift the start time
                      of the Tween/Timeline.
    */
  }, {
    key: "_pushTimeline",
    value: function _pushTimeline(timeline, shift) {
      // if timeline is a module with timeline property then extract it
      if (timeline.timeline instanceof Timeline) {
        timeline = timeline.timeline;
      }
      if (timeline.tween instanceof tween_tween__WEBPACK_IMPORTED_MODULE_7__["default"]) {
        timeline = timeline.tween;
      }

      // add self delay to the timeline
      shift != null && timeline._setProp({
        'shiftTime': shift
      });
      this._timelines.push(timeline);
      this._recalcDuration(timeline);
    }

    /*
      Method set progress on self and child Tweens/Timelines.
      @private
      @param {Number} Progress to set.
      @param {Number} Current update time.
    */
  }, {
    key: "_setProgress",
    value: function _setProgress(p, time, isYoyo) {
      // we need to pass self previous time to children
      // to prevent initial _wasUnknownUpdate nested waterfall
      // if not yoyo option set, pass the previous time
      // otherwise, pass previous or next time regarding yoyo period.

      // COVER CURRENT SWAPPED ORDER
      this._updateChildren(p, time, isYoyo);
      tween_tween__WEBPACK_IMPORTED_MODULE_7__["default"].prototype._setProgress.call(this, p, time);
    }
  }, {
    key: "_updateChildren",
    value: function _updateChildren(p, time, isYoyo) {
      var coef = time > this._prevTime ? -1 : 1;
      if (this._props.isYoyo && isYoyo) {
        coef *= -1;
      }
      var timeToTimelines = this._props.startTime + p * this._props.duration,
        prevTimeToTimelines = timeToTimelines + coef,
        len = this._timelines.length;
      for (var i = 0; i < len; i++) {
        // specify the children's array update loop direction
        // if time > prevTime go from 0->length else from length->0
        // var j = ( time > this._prevTime ) ? i : (len-1) - i ;
        var j = timeToTimelines > prevTimeToTimelines ? i : len - 1 - i;
        this._timelines[j]._update(timeToTimelines, prevTimeToTimelines, this._prevYoyo, this._onEdge);
      }
      this._prevYoyo = isYoyo;
    }

    /*
      Method calculate self duration based on timeline's duration.
      @private
      @param {Object} Tween or Timeline to calculate.
    */
  }, {
    key: "_recalcDuration",
    value: function _recalcDuration(timeline) {
      var p = timeline._props,
        timelineTime = p.repeatTime / p.speed + (p.shiftTime || 0) + timeline._negativeShift;
      this._props.duration = Math.max(timelineTime, this._props.duration);
    }

    /*
      Method calculate self duration from skretch.
      @private
    */
  }, {
    key: "_recalcTotalDuration",
    value: function _recalcTotalDuration() {
      var i = this._timelines.length;
      this._props.duration = 0;
      while (i--) {
        var tm = this._timelines[i];

        // recalc total duration on child timelines
        tm._recalcTotalDuration && tm._recalcTotalDuration();

        // add the timeline's duration to selft duration
        this._recalcDuration(tm);
      }
      this._calcDimentions();
    }

    /*
      Method set start and end times.
      @private
      @param {Number, Null} Time to start with.
    */
  }, {
    key: "_setStartTime",
    value: function _setStartTime(time) {
      var isReset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Timeline.prototype), "_setStartTime", this).call(this, time);
      this._startTimelines(this._props.startTime, isReset);
    }

    /*
      Method calculate self duration based on timeline's duration.
      @private
      @param {Number, Null} Time to start with.
    */
  }, {
    key: "_startTimelines",
    value: function _startTimelines(time) {
      var isReset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var isStop = this._state === 'stop';
      time == null && (time = this._props.startTime);
      for (var i = 0; i < this._timelines.length; i++) {
        var tm = this._timelines[i];
        tm._setStartTime(time, isReset);

        // if from `_subPlay` and `_prevTime` is set and state is `stop`
        // prevTime normalizing is for play/pause functionality, so no
        // need to normalize if the timeline is in `stop` state.
        if (!isReset && tm._prevTime != null && !isStop) {
          tm._prevTime = tm._normPrevTimeForward();
        }
      }
    }

    /*
      Method to launch onRefresh callback.
      @method _refresh
      @private
      @overrides @ Tween
      @param {Boolean} If refresh even before start time.
    */
  }, {
    key: "_refresh",
    value: function _refresh(isBefore) {
      var len = this._timelines.length;
      for (var i = 0; i < len; i++) {
        this._timelines[i]._refresh(isBefore);
      }
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Timeline.prototype), "_refresh", this).call(this, isBefore);
    }

    /*
      Method do declare defaults by this._defaults object
      @private
    */
  }, {
    key: "_declareDefaults",
    value: function _declareDefaults() {
      // if duration was passed on initialization stage, warn user and reset it.
      if (this._o.duration != null) {
        src_h__WEBPACK_IMPORTED_MODULE_6___default().error("Duration can not be declared on Timeline, but \"".concat(this._o.duration, "\" is. You probably want to use Tween instead."));
        this._o.duration = 0;
      }
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Timeline.prototype), "_declareDefaults", this).call(this);

      // remove default
      this._defaults.duration = 0;
      this._defaults.easing = 'Linear.None';
      this._defaults.backwardEasing = 'Linear.None';
      this._defaults.nameBase = 'Timeline';
    }
  }, {
    key: "_vars",
    value: function _vars() {
      this._timelines = [];
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_4__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_5__["default"])(Timeline.prototype), "_vars", this).call(this);
    }
  }]);
  return Timeline;
}(tween_tween__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Timeline);

/***/ }),

/***/ "./src/tween/tween.babel.js":
/*!**********************************!*\
  !*** ./src/tween/tween.babel.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");
/* harmony import */ var _babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/get */ "./node_modules/@babel/runtime/helpers/esm/get.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var tween_tweener__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tween/tweener */ "./src/tween/tweener.babel.js");
/* harmony import */ var easing_easing__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! easing/easing */ "./src/easing/easing.coffee");
/* harmony import */ var easing_easing__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(easing_easing__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var src_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! src/module */ "./src/module.babel.js");







function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }



var Tween = /*#__PURE__*/function (_Module) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__["default"])(Tween, _Module);
  var _super = _createSuper(Tween);
  /*
    Constructor of the class.
    @private
  */
  function Tween() {
    var _this;
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Tween);
    _this = _super.call(this, o);
    _this._props.name == null && _this._setSelfName();
    return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_5__["default"])(_this, (0,_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_2__["default"])(_this));
  }

  /*
    Method to set self name to generic one.
    @private
  */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Tween, [{
    key: "_declareDefaults",
    value:
    /*
      Method do declare defaults with this._defaults object.
      @private
    */
    function _declareDefaults() {
      // DEFAULTS
      this._defaults = {
        /* duration of the tween [0..∞] */
        duration: 350,
        /* delay of the tween [-∞..∞] */
        delay: 0,
        /* repeat of the tween [0..∞], means how much to
           repeat the tween regardless first run,
           for instance repeat: 2 will make the tween run 3 times */
        repeat: 0,
        /* speed of playback [0..∞], speed that is less then 1
           will slowdown playback, for instance .5 will make tween
           run 2x slower. Speed of 2 will speedup the tween to 2x. */
        speed: 1,
        /*  flip onUpdate's progress on each even period.
            note that callbacks order won't flip at least
            for now (under consideration). */
        isYoyo: false,
        /* easing for the tween, could be any easing type [link to easing-types.md] */
        easing: 'Sin.Out',
        /*
          Easing for backward direction of the tweenthe tween,
          if `null` - fallbacks to `easing` property.
          forward direction in `yoyo` period is treated as backward for the easing.
        */
        backwardEasing: null,
        /* custom tween's name */
        name: null,
        /* custom tween's base name */
        nameBase: 'Tween',
        /*
          onProgress callback runs before any other callback.
          @param {Number}   The entire, not eased, progress
                            of the tween regarding repeat option.
          @param {Boolean}  The direction of the tween.
                            `true` for forward direction.
                            `false` for backward direction(tween runs in reverse).
        */
        onProgress: null,
        /*
          onStart callback runs on very start of the tween just after onProgress
          one. Runs on very end of the tween if tween is reversed.
          @param {Boolean}  Direction of the tween.
                            `true` for forward direction.
                            `false` for backward direction(tween runs in reverse).
        */
        onStart: null,
        onRefresh: null,
        onComplete: null,
        onRepeatStart: null,
        onRepeatComplete: null,
        onFirstUpdate: null,
        onUpdate: null,
        isChained: false,
        // playback callbacks
        onPlaybackStart: null,
        onPlaybackPause: null,
        onPlaybackStop: null,
        onPlaybackComplete: null,
        // context which all callbacks will be called with
        callbacksContext: null
      };
    }

    /*
      API method to play the Tween.
      @public
      @param  {Number} Shift time in milliseconds.
      @return {Object} Self.
    */
  }, {
    key: "play",
    value: function play() {
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this._state === 'play' && this._isRunning) {
        return this;
      }
      this._props.isReversed = false;
      this._subPlay(shift, 'play');
      this._setPlaybackState('play');
      return this;
    }

    /*
      API method to play the Tween in reverse.
      @public
      @param  {Number} Shift time in milliseconds.
      @return {Object} Self.
    */
  }, {
    key: "playBackward",
    value: function playBackward() {
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this._state === 'reverse' && this._isRunning) {
        return this;
      }
      this._props.isReversed = true;
      this._subPlay(shift, 'reverse');
      this._setPlaybackState('reverse');
      return this;
    }

    /*
      API method to pause Tween.
      @public
      @returns {Object} Self.
    */
  }, {
    key: "pause",
    value: function pause() {
      if (this._state === 'pause' || this._state === 'stop') {
        return this;
      }
      this._removeFromTweener();
      this._setPlaybackState('pause');
      return this;
    }

    /*
      API method to stop the Tween.
      @public
      @param   {Number} Progress [0..1] to set when stopped.
      @returns {Object} Self.
    */
  }, {
    key: "stop",
    value: function stop(progress) {
      if (this._state === 'stop') {
        return this;
      }
      this._wasUknownUpdate = undefined;
      var stopProc = progress != null ? progress

      /* if no progress passsed - set 1 if tween
         is playingBackward, otherwise set to 0 */ : this._state === 'reverse' ? 1 : 0;
      this.setProgress(stopProc);
      this.reset();
      return this;
    }

    /*
      API method to replay(restart) the Tween.
      @public
      @param   {Number} Shift time in milliseconds.
      @returns {Object} Self.
    */
  }, {
    key: "replay",
    value: function replay() {
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.reset();
      this.play(shift);
      return this;
    }

    /*
      API method to replay(restart) backward the Tween.
      @public
      @param   {Number} Shift time in milliseconds.
      @returns {Object} Self.
    */
  }, {
    key: "replayBackward",
    value: function replayBackward() {
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      this.reset();
      this.playBackward(shift);
      return this;
    }

    /*
      API method to resume the Tween.
      @public
      @param  {Number} Shift time in milliseconds.
      @return {Object} Self.
    */
  }, {
    key: "resume",
    value: function resume() {
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      if (this._state !== 'pause') {
        return this;
      }
      switch (this._prevState) {
        case 'play':
          this.play(shift);
          break;
        case 'reverse':
          this.playBackward(shift);
          break;
      }
      return this;
    }

    /*
      API method to set progress on tween.
      @public
      @param {Number} Progress to set.
      @returns {Object} Self.
    */
  }, {
    key: "setProgress",
    value: function setProgress(progress) {
      var p = this._props;

      // set start time if there is no one yet.
      !p.startTime && this._setStartTime();

      // reset play time
      this._playTime = null;

      // progress should be in range of [0..1]
      progress < 0 && (progress = 0);
      progress > 1 && (progress = 1);

      // update self with calculated time
      this._update(p.startTime - p.delay + progress * p.repeatTime);
      return this;
    }

    /*
      Method to set tween's speed.
      @public
      @param {Number} Speed value.
      @returns this.
    */
  }, {
    key: "setSpeed",
    value: function setSpeed(speed) {
      this._props.speed = speed;

      // if playing - normalize _startTime and _prevTime to the current point.
      if (this._state === 'play' || this._state === 'reverse') {
        this._setResumeTime(this._state);
      }
      return this;
    }

    /*
      Method to reset tween's state and properties.
      @public
      @returns this.
    */
  }, {
    key: "reset",
    value: function reset() {
      this._removeFromTweener();
      this._setPlaybackState('stop');
      this._progressTime = 0;
      this._isCompleted = false;
      this._isStarted = false;
      this._isFirstUpdate = false;
      this._wasUknownUpdate = undefined;
      this._prevTime = undefined;
      this._prevYoyo = undefined;

      // this._props.startTime  = undefined;
      this._props.isReversed = false;
      return this;
    }

    // ^ PUBLIC  METHOD(S) ^
    // v PRIVATE METHOD(S) v

    /*
      Method to launch play. Used as launch
      method for bothplay and reverse methods.
      @private
      @param  {Number} Shift time in milliseconds.
      @param  {String} Play or reverse state.
      @return {Object} Self.
    */
  }, {
    key: "_subPlay",
    value: function _subPlay() {
      var shift = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var state = arguments.length > 1 ? arguments[1] : undefined;
      var p = this._props,
        // check if direction of playback changes,
        // if so, the _progressTime needs to be flipped
        _state = this._state,
        _prevState = this._prevState,
        isPause = _state === 'pause',
        wasPlay = _state === 'play' || isPause && _prevState === 'play',
        wasReverse = _state === 'reverse' || isPause && _prevState === 'reverse',
        isFlip = wasPlay && state === 'reverse' || wasReverse && state === 'play';

      // if tween was ended, set progress to 0 if not, set to elapsed progress
      this._progressTime = this._progressTime >= p.repeatTime ? 0 : this._progressTime;

      // flip the _progressTime if playback direction changed
      if (isFlip) {
        this._progressTime = p.repeatTime - this._progressTime;
      }

      // set resume time and normalize prev/start times
      this._setResumeTime(state, shift);

      // add self to tweener = play
      tween_tweener__WEBPACK_IMPORTED_MODULE_7__["default"].add(this);
      return this;
    }

    /*
      Method to set _resumeTime, _startTime and _prevTime.
      @private
      @param {String} Current state. [play, reverse]
      @param {Number} Time shift. *Default* is 0.
    */
  }, {
    key: "_setResumeTime",
    value: function _setResumeTime(state) {
      var shift = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      // get current moment as resume time
      this._resumeTime = performance.now();

      // set start time regarding passed `shift` and `procTime`
      var startTime = this._resumeTime - Math.abs(shift) - this._progressTime;
      this._setStartTime(startTime, false);

      // if we have prevTime - we need to normalize
      // it for the current resume time
      if (this._prevTime != null) {
        this._prevTime = state === 'play' ? this._normPrevTimeForward() : this._props.endTime - this._progressTime;
      }
    }

    /*
      Method recalculate _prevTime for forward direction.
      @private
      @return {Number} Normalized prev time.
    */
  }, {
    key: "_normPrevTimeForward",
    value: function _normPrevTimeForward() {
      var p = this._props;
      return p.startTime + this._progressTime - p.delay;
    }
  }, {
    key: "_setSelfName",
    value: function _setSelfName() {
      var globalName = "_".concat(this._props.nameBase, "s");

      // track amount of tweens globally
      tween_tweener__WEBPACK_IMPORTED_MODULE_7__["default"][globalName] = tween_tweener__WEBPACK_IMPORTED_MODULE_7__["default"][globalName] == null ? 1 : ++tween_tweener__WEBPACK_IMPORTED_MODULE_7__["default"][globalName];

      // and set generic tween's name  || Tween # ||
      this._props.name = "".concat(this._props.nameBase, " ").concat(tween_tweener__WEBPACK_IMPORTED_MODULE_7__["default"][globalName]);
    }

    /*
      Method set playback state string.
      @private
      @param {String} State name
    */
  }, {
    key: "_setPlaybackState",
    value: function _setPlaybackState(state) {
      // save previous state
      this._prevState = this._state;
      this._state = state;

      // callbacks
      var wasPause = this._prevState === 'pause',
        wasStop = this._prevState === 'stop',
        wasPlay = this._prevState === 'play',
        wasReverse = this._prevState === 'reverse',
        wasPlaying = wasPlay || wasReverse,
        wasStill = wasStop || wasPause;
      if ((state === 'play' || state === 'reverse') && wasStill) {
        this._playbackStart();
      }
      if (state === 'pause' && wasPlaying) {
        this._playbackPause();
      }
      if (state === 'stop' && (wasPlaying || wasPause)) {
        this._playbackStop();
      }
    }

    /*
      Method to declare some vars.
      @private
    */
  }, {
    key: "_vars",
    value: function _vars() {
      this.progress = 0;
      this._prevTime = undefined;
      this._progressTime = 0;
      this._negativeShift = 0;
      this._state = 'stop';

      // if negative delay was specified,
      // save it to _negativeShift property and
      // reset it back to 0
      if (this._props.delay < 0) {
        this._negativeShift = this._props.delay;
        this._props.delay = 0;
      }
      return this._calcDimentions();
    }

    /*
      Method to calculate tween's dimentions.
      @private
    */
  }, {
    key: "_calcDimentions",
    value: function _calcDimentions() {
      this._props.time = this._props.duration + this._props.delay;
      this._props.repeatTime = this._props.time * (this._props.repeat + 1);
    }

    /*
      Method to extend defaults by options and put them in _props.
      @private
    */
  }, {
    key: "_extendDefaults",
    value: function _extendDefaults() {
      // save callback overrides object with fallback to empty one
      this._callbackOverrides = this._o.callbackOverrides || {};
      delete this._o.callbackOverrides;

      // call the _extendDefaults @ Module
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Tween.prototype), "_extendDefaults", this).call(this);
      var p = this._props;
      p.easing = easing_easing__WEBPACK_IMPORTED_MODULE_8___default().parseEasing(p.easing);
      p.easing._parent = this;

      // parse only present backward easing to prevent parsing as `linear.none`
      // because we need to fallback to `easing` in `_setProgress` method
      if (p.backwardEasing != null) {
        p.backwardEasing = easing_easing__WEBPACK_IMPORTED_MODULE_8___default().parseEasing(p.backwardEasing);
        p.backwardEasing._parent = this;
      }
    }

    /*
      Method for setting start and end time to props.
      @private
      @param {Number(Timestamp)}, {Null} Start time.
      @param {Boolean} Should reset flags.
      @returns this
    */
  }, {
    key: "_setStartTime",
    value: function _setStartTime(time) {
      var isResetFlags = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var p = this._props,
        shiftTime = p.shiftTime || 0;

      // reset flags
      if (isResetFlags) {
        this._isCompleted = false;
        this._isRepeatCompleted = false;
        this._isStarted = false;
      }

      // set start time to passed time or to the current moment
      var startTime = time == null ? performance.now() : time;

      // calculate bounds
      // - negativeShift is negative delay in options hash
      // - shift time is shift of the parent
      p.startTime = startTime + p.delay + this._negativeShift + shiftTime;
      p.endTime = p.startTime + p.repeatTime - p.delay;

      // set play time to the startTimes
      // if playback controls are used - use _resumeTime as play time,
      // else use shifted startTime -- shift is needed for timelines append chains
      this._playTime = this._resumeTime != null ? this._resumeTime : startTime + shiftTime;
      this._resumeTime = null;
      return this;
    }

    /*
      Method to update tween's progress.
      @private
      @param {Number} Current update time.
      -- next params only present when parent Timeline calls the method.
      @param {Number} Previous Timeline's update time.
      @param {Boolean} Was parent in yoyo period.
      @param {Number} [-1, 0, 1] If update is on edge.
                     -1 = edge jump in negative direction.
                      0 = no edge jump.
                      1 = edge jump in positive direction.
    */
  }, {
    key: "_update",
    value: function _update(time, timelinePrevTime, wasYoyo, onEdge) {
      var p = this._props;

      // if we don't the _prevTime thus the direction we are heading to,
      // but prevTime was passed thus we are child of a Timeline
      // set _prevTime to passed one and pretent that there was unknown
      // update to not to block start/complete callbacks
      if (this._prevTime == null && timelinePrevTime != null) {
        if (this._props.speed && this._playTime) {
          // play point + ( speed * delta )
          this._prevTime = this._playTime + this._props.speed * (timelinePrevTime - this._playTime);
        }

        // this._prevTime = timelinePrevTime;
        this._wasUknownUpdate = true;
      }

      // var before = time;
      // cache vars
      var startPoint = p.startTime - p.delay;

      // if speed param was defined - calculate
      // new time regarding speed
      if (p.speed && this._playTime) {
        // play point + ( speed * delta )
        time = this._playTime + p.speed * (time - this._playTime);
      }

      // due to javascript precision issues, after speed mapping
      // we can get very close number that was made from progress of 1
      // and in fact represents `endTime` if so, set the time to `endTime`
      if (Math.abs(p.endTime - time) < 0.00000001) {
        time = p.endTime;
      }

      // if parent is onEdge but not very start nor very end
      if (onEdge && wasYoyo != null) {
        var T = this._getPeriod(time),
          isYoyo = !!(p.isYoyo && this._props.repeat && T % 2 === 1);

        // for timeline
        // notify children about edge jump
        if (this._timelines) {
          for (var i = 0; i < this._timelines.length; i++) {
            this._timelines[i]._update(time, timelinePrevTime, wasYoyo, onEdge);
          }
        }

        // forward edge direction
        if (onEdge === 1) {
          // jumped from yoyo period?
          if (wasYoyo) {
            this._prevTime = time + 1;
            this._repeatStart(time, isYoyo);
            this._start(time, isYoyo);
          } else {
            this._prevTime = time - 1;
            this._repeatComplete(time, isYoyo);
            this._complete(time, isYoyo);
          }

          // backward edge direction
        } else if (onEdge === -1) {
          // jumped from yoyo period?
          if (wasYoyo) {
            this._prevTime = time - 1;
            this._repeatComplete(time, isYoyo);
            this._complete(time, isYoyo);
          } else {
            // call _start callbacks only if prev time was in active area
            // not always true for append chains
            if (this._prevTime >= p.startTime && this._prevTime <= p.endTime) {
              this._prevTime = time + 1;
              this._repeatStart(time, isYoyo);
              this._start(time, isYoyo);

              // reset isCOmpleted immediately to prevent onComplete cb
              this._isCompleted = true;
            }
          }
        }

        // reset the _prevTime - drop one frame to undestand
        // where we are heading
        this._prevTime = undefined;
      }

      // if in active area and not ended - save progress time
      // for pause/play purposes.
      if (time > startPoint && time < p.endTime) {
        this._progressTime = time - startPoint;
      }

      // else if not started or ended set progress time to 0
      else if (time <= startPoint) {
        this._progressTime = 0;
      } else if (time >= p.endTime) {
        // set progress time to repeat time + tiny cofficient
        // to make it extend further than the end time
        this._progressTime = p.repeatTime + .00000000001;
      }

      // reverse time if _props.isReversed is set
      if (p.isReversed) {
        time = p.endTime - this._progressTime;
      }

      // We need to know what direction we are heading to,
      // so if we don't have the previous update value - this is very first
      // update, - skip it entirely and wait for the next value
      if (this._prevTime == null) {
        this._prevTime = time;
        this._wasUknownUpdate = true;
        return false;
      }

      // ====== AFTER SKIPPED FRAME ======

      // handle onProgress callback
      if (time >= startPoint && time <= p.endTime) {
        this._progress((time - startPoint) / p.repeatTime, time);
      }

      /*
        if time is inside the active area of the tween.
        active area is the area from start time to end time,
        with all the repeat and delays in it
      */
      if (time >= p.startTime && time <= p.endTime) {
        this._updateInActiveArea(time);
      } else {
        // if was in active area - update in inactive area but just once -
        // right after the active area
        if (this._isInActiveArea) {
          this._updateInInactiveArea(time);
        } else if (!this._isRefreshed) {
          // onRefresh callback
          // before startTime
          if (time < p.startTime && this.progress !== 0) {
            this._refresh(true);
            this._isRefreshed = true;

            // after endTime
          }

          // else if ( time > p.endTime ) { }
        }
      }

      this._prevTime = time;
      return time >= p.endTime || time <= startPoint;
    }

    /*
      Method to handle tween's progress in inactive area.
      @private
      @param {Number} Current update time.
    */
  }, {
    key: "_updateInInactiveArea",
    value: function _updateInInactiveArea(time) {
      if (!this._isInActiveArea) {
        return;
      }
      var p = this._props;

      // complete if time is larger then end time
      if (time > p.endTime && !this._isCompleted) {
        this._progress(1, time);

        // get period number
        var T = this._getPeriod(p.endTime),
          isYoyo = p.isYoyo && T % 2 === 0;
        this._setProgress(isYoyo ? 0 : 1, time, isYoyo);
        this._repeatComplete(time, isYoyo);
        this._complete(time, isYoyo);
      }

      // if was active and went to - inactive area "-"
      if (time < this._prevTime && time < p.startTime && !this._isStarted && !this._isCompleted) {
        // if was in active area and didn't fire onStart callback
        this._progress(0, time, false);
        this._setProgress(0, time, false);
        this._isRepeatStart = false;
        this._repeatStart(time, false);
        this._start(time, false);
      }
      this._isInActiveArea = false;
    }

    /*
      Method to handle tween's progress in active area.
      @private
      @param {Number} Current update time.
    */
  }, {
    key: "_updateInActiveArea",
    value: function _updateInActiveArea(time) {
      var props = this._props,
        delayDuration = props.delay + props.duration,
        startPoint = props.startTime - props.delay,
        elapsed = (time - props.startTime + props.delay) % delayDuration,
        TCount = Math.round((props.endTime - props.startTime + props.delay) / delayDuration),
        T = this._getPeriod(time),
        TValue = this._delayT,
        prevT = this._getPeriod(this._prevTime),
        TPrevValue = this._delayT;

      // "zero" and "one" value regarding yoyo and it's period
      var isYoyo = props.isYoyo && T % 2 === 1,
        isYoyoPrev = props.isYoyo && prevT % 2 === 1,
        yoyoZero = isYoyo ? 1 : 0;
      if (time === props.endTime) {
        this._wasUknownUpdate = false;

        // if `time` is equal to `endTime`, T represents the next period,
        // so we need to decrement T and calculate "one" value regarding yoyo
        isYoyo = props.isYoyo && (T - 1) % 2 === 1;
        this._setProgress(isYoyo ? 0 : 1, time, isYoyo);
        if (time > this._prevTime) {
          this._isRepeatCompleted = false;
        }
        this._repeatComplete(time, isYoyo);
        return this._complete(time, isYoyo);
      }

      // reset callback flags
      this._isCompleted = false;
      this._isRefreshed = false;

      // if time is inside the duration area of the tween
      if (startPoint + elapsed >= props.startTime) {
        this._isInActiveArea = true;
        this._isRepeatCompleted = false;
        this._isRepeatStart = false;
        this._isStarted = false;

        // active zone or larger then end
        var elapsed2 = (time - props.startTime) % delayDuration,
          proc = elapsed2 / props.duration;

        // |=====|=====|=====| >>>
        //      ^1^2
        var isOnEdge = T > 0 && prevT < T;

        // |=====|=====|=====| <<<
        //      ^2^1
        var isOnReverseEdge = prevT > T;

        // for use in timeline
        this._onEdge = 0;
        isOnEdge && (this._onEdge = 1);
        isOnReverseEdge && (this._onEdge = -1);
        if (this._wasUknownUpdate) {
          if (time > this._prevTime) {
            this._start(time, isYoyo);
            this._repeatStart(time, isYoyo);
            this._firstUpdate(time, isYoyo);
          }

          // if backward direction and
          // if ( time < this._prevTime && time !== this._props.startTime ) {
          if (time < this._prevTime) {
            this._complete(time, isYoyo);
            this._repeatComplete(time, isYoyo);
            this._firstUpdate(time, isYoyo);

            // reset isCompleted immediately
            this._isCompleted = false;
          }
        }
        if (isOnEdge) {
          // if not just after delay
          // |---=====|---=====|---=====| >>>
          //            ^1 ^2
          // because we have already handled
          // 1 and onRepeatComplete in delay gap
          if (this.progress !== 1) {
            // prevT
            var isThisYoyo = props.isYoyo && (T - 1) % 2 === 1;
            this._repeatComplete(time, isThisYoyo);
          }

          // if on edge but not at very start
          // |=====|=====|=====| >>>
          // ^!    ^here ^here
          if (prevT >= 0) {
            this._repeatStart(time, isYoyo);
          }
        }
        if (time > this._prevTime) {
          //  |=====|=====|=====| >>>
          // ^1  ^2
          if (!this._isStarted && this._prevTime <= props.startTime) {
            this._start(time, isYoyo);
            this._repeatStart(time, isYoyo);

            // it was zero anyways

            // restart flags immediately in case if we will
            // return to '-' inactive area on the next step
            this._isStarted = false;
            this._isRepeatStart = false;
          }
          this._firstUpdate(time, isYoyo);
        }
        if (isOnReverseEdge) {
          // if on edge but not at very end
          // |=====|=====|=====| <<<
          //       ^here ^here ^not here
          if (this.progress !== 0 && this.progress !== 1 && prevT != TCount) {
            this._repeatStart(time, isYoyoPrev);
          }

          // if on very end edge
          // |=====|=====|=====| <<<
          //       ^!    ^! ^2 ^1
          // we have handled the case in this._wasUknownUpdate
          // block so filter that
          if (prevT === TCount && !this._wasUknownUpdate) {
            this._complete(time, isYoyo);
            this._repeatComplete(time, isYoyo);
            this._firstUpdate(time, isYoyo);

            // reset isComplete flag call
            // cuz we returned to active area
            // this._isRepeatCompleted = false;
            this._isCompleted = false;
          }
          this._repeatComplete(time, isYoyo);
        }
        if (prevT === 'delay') {
          // if just before delay gap
          // |---=====|---=====|---=====| <<<
          //               ^2    ^1
          if (T < TPrevValue) {
            this._repeatComplete(time, isYoyo);
          }

          // if just after delay gap
          // |---=====|---=====|---=====| >>>
          //            ^1  ^2
          if (T === TPrevValue && T > 0) {
            this._repeatStart(time, isYoyo);
          }
        }

        // swap progress and repeatStart based on direction
        if (time > this._prevTime) {
          // if progress is equal 0 and progress grows
          if (proc === 0) {
            this._repeatStart(time, isYoyo);
          }
          if (time !== props.endTime) {
            this._setProgress(isYoyo ? 1 - proc : proc, time, isYoyo);
          }
        } else {
          if (time !== props.endTime) {
            this._setProgress(isYoyo ? 1 - proc : proc, time, isYoyo);
          }

          // if progress is equal 0 and progress grows
          if (proc === 0) {
            this._repeatStart(time, isYoyo);
          }
        }
        if (time === props.startTime) {
          this._start(time, isYoyo);
        }

        // delay gap - react only once
      } else if (this._isInActiveArea) {
        // because T will be string of "delay" here,
        // let's normalize it be setting to TValue
        var t = T === 'delay' ? TValue : T,
          isGrows = time > this._prevTime;

        // decrement period if forward direction of update
        isGrows && t--;

        // calculate normalized yoyoZero value
        yoyoZero = props.isYoyo && t % 2 === 1 ? 1 : 0;

        // if was in active area and previous time was larger
        // |---=====|---=====|---=====| <<<
        //   ^2 ^1    ^2 ^1    ^2 ^1
        if (time < this._prevTime) {
          this._setProgress(yoyoZero, time, yoyoZero === 1);
          this._repeatStart(time, yoyoZero === 1);
        }

        // set 1 or 0 regarding direction and yoyo
        this._setProgress(isGrows ? 1 - yoyoZero : yoyoZero, time, yoyoZero === 1);

        // if time grows
        if (time > this._prevTime) {
          // if reverse direction and in delay gap, then progress will be 0
          // if so we don't need to call the onRepeatComplete callback
          // |---=====|---=====|---=====| <<<
          //   ^0       ^0       ^0
          // OR we have flipped 0 to 1 regarding yoyo option
          if (this.progress !== 0 || yoyoZero === 1) {
            // since we repeatComplete for previous period
            // invert isYoyo option
            // is elapsed is 0 - count as previous period
            this._repeatComplete(time, yoyoZero === 1);
          }
        }

        // set flag to indicate inactive area
        this._isInActiveArea = false;
      }

      // we've got the first update now
      this._wasUknownUpdate = false;
    }

    /*
      Method to remove the Tween from the tweener.
      @private
      @returns {Object} Self.
    */
  }, {
    key: "_removeFromTweener",
    value: function _removeFromTweener() {
      tween_tweener__WEBPACK_IMPORTED_MODULE_7__["default"].remove(this);
      return this;
    }

    /*
      Method to get current period number.
      @private
      @param {Number} Time to get the period for.
      @returns {Number} Current period number.
    */
  }, {
    key: "_getPeriod",
    value: function _getPeriod(time) {
      var p = this._props,
        TTime = p.delay + p.duration,
        dTime = p.delay + time - p.startTime,
        T = dTime / TTime,
        // if time if equal to endTime we need to set the elapsed
        // time to 0 to fix the occasional precision js bug, which
        // causes 0 to be something like 1e-12
        elapsed = time < p.endTime ? dTime % TTime : 0;

      // If the latest period, round the result, otherwise floor it.
      // Basically we always can floor the result, but because of js
      // precision issues, sometimes the result is 2.99999998 which
      // will result in 2 instead of 3 after the floor operation.
      T = time >= p.endTime ? Math.round(T) : Math.floor(T);

      // if time is larger then the end time
      if (time > p.endTime) {
        // set equal to the periods count
        T = Math.round((p.endTime - p.startTime + p.delay) / TTime);

        // if in delay gap, set _delayT to current
        // period number and return "delay"
      } else if (elapsed > 0 && elapsed < p.delay) {
        this._delayT = T;
        T = 'delay';
      }

      // if the end of period and there is a delay
      return T;
    }

    /*
      Method to set Tween's progress and call onUpdate callback.
      @private
      @override @ Module
      @param {Number} Progress to set.
      @param {Number} Current update time.
      @param {Boolean} Is yoyo perido. Used in Timeline to pass to Tween.
      @returns {Object} Self.
    */
  }, {
    key: "_setProgress",
    value: function _setProgress(proc, time, isYoyo) {
      var p = this._props,
        isYoyoChanged = p.wasYoyo !== isYoyo,
        isForward = time > this._prevTime;
      this.progress = proc;

      // get the current easing for `forward` direction regarding `yoyo`
      if (isForward && !isYoyo || !isForward && isYoyo) {
        this.easedProgress = p.easing(proc);

        // get the current easing for `backward` direction regarding `yoyo`
      } else if (!isForward && !isYoyo || isForward && isYoyo) {
        var easing = p.backwardEasing != null ? p.backwardEasing : p.easing;
        this.easedProgress = easing(proc);
      }
      if (p.prevEasedProgress !== this.easedProgress || isYoyoChanged) {
        if (p.onUpdate != null && typeof p.onUpdate === 'function') {
          p.onUpdate.call(p.callbacksContext || this, this.easedProgress, this.progress, isForward, isYoyo);
        }
      }
      p.prevEasedProgress = this.easedProgress;
      p.wasYoyo = isYoyo;
      return this;
    }

    /*
      Method to set tween's state to start and call onStart callback.
      @method _start
      @private
      @param {Number} Progress to set.
      @param {Boolean} Is yoyo period.
    */
  }, {
    key: "_start",
    value: function _start(time, isYoyo) {
      if (this._isStarted) {
        return;
      }
      var p = this._props;
      if (p.onStart != null && typeof p.onStart === 'function') {
        p.onStart.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
      }
      this._isCompleted = false;
      this._isStarted = true;
      this._isFirstUpdate = false;
    }

    /*
      Method to call onPlaybackStart callback
      @private
    */
  }, {
    key: "_playbackStart",
    value: function _playbackStart() {
      var p = this._props;
      if (p.onPlaybackStart != null && typeof p.onPlaybackStart === 'function') {
        p.onPlaybackStart.call(p.callbacksContext || this);
      }
    }

    /*
      Method to call onPlaybackPause callback
      @private
    */
  }, {
    key: "_playbackPause",
    value: function _playbackPause() {
      var p = this._props;
      if (p.onPlaybackPause != null && typeof p.onPlaybackPause === 'function') {
        p.onPlaybackPause.call(p.callbacksContext || this);
      }
    }

    /*
      Method to call onPlaybackStop callback
      @private
    */
  }, {
    key: "_playbackStop",
    value: function _playbackStop() {
      var p = this._props;
      if (p.onPlaybackStop != null && typeof p.onPlaybackStop === 'function') {
        p.onPlaybackStop.call(p.callbacksContext || this);
      }
    }

    /*
      Method to call onPlaybackComplete callback
      @private
    */
  }, {
    key: "_playbackComplete",
    value: function _playbackComplete() {
      var p = this._props;
      if (p.onPlaybackComplete != null && typeof p.onPlaybackComplete === 'function') {
        p.onPlaybackComplete.call(p.callbacksContext || this);
      }
    }

    /*
      Method to set tween's state to complete.
      @method _complete
      @private
      @param {Number} Current time.
      @param {Boolean} Is yoyo period.
    */
  }, {
    key: "_complete",
    value: function _complete(time, isYoyo) {
      if (this._isCompleted) {
        return;
      }
      var p = this._props;
      if (p.onComplete != null && typeof p.onComplete === 'function') {
        p.onComplete.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
      }
      this._isCompleted = true;
      this._isStarted = false;
      this._isFirstUpdate = false;

      // reset _prevYoyo for timeline usage
      this._prevYoyo = undefined;
    }

    /*
      Method to run onFirstUpdate callback.
      @method _firstUpdate
      @private
      @param {Number} Current update time.
      @param {Boolean} Is yoyo period.
    */
  }, {
    key: "_firstUpdate",
    value: function _firstUpdate(time, isYoyo) {
      if (this._isFirstUpdate) {
        return;
      }
      var p = this._props;
      if (p.onFirstUpdate != null && typeof p.onFirstUpdate === 'function') {
        // onFirstUpdate should have tween pointer
        p.onFirstUpdate.tween = this;
        p.onFirstUpdate.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
      }
      this._isFirstUpdate = true;
    }

    /*
      Method call onRepeatComplete calback and set flags.
      @private
      @param {Number} Current update time.
      @param {Boolean} Is repeat period.
    */
  }, {
    key: "_repeatComplete",
    value: function _repeatComplete(time, isYoyo) {
      if (this._isRepeatCompleted) {
        return;
      }
      var p = this._props;
      if (p.onRepeatComplete != null && typeof p.onRepeatComplete === 'function') {
        p.onRepeatComplete.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
      }
      this._isRepeatCompleted = true;

      // this._prevYoyo = null;
    }

    /*
      Method call onRepeatStart calback and set flags.
      @private
      @param {Number} Current update time.
      @param {Boolean} Is yoyo period.
    */
  }, {
    key: "_repeatStart",
    value: function _repeatStart(time, isYoyo) {
      if (this._isRepeatStart) {
        return;
      }
      var p = this._props;
      if (p.onRepeatStart != null && typeof p.onRepeatStart === 'function') {
        p.onRepeatStart.call(p.callbacksContext || this, time > this._prevTime, isYoyo);
      }
      this._isRepeatStart = true;
    }

    /*
      Method to launch onProgress callback.
      @method _progress
      @private
      @param {Number} Progress to set.
    */
  }, {
    key: "_progress",
    value: function _progress(progress, time) {
      var p = this._props;
      if (p.onProgress != null && typeof p.onProgress === 'function') {
        p.onProgress.call(p.callbacksContext || this, progress, time > this._prevTime);
      }
    }

    /*
      Method to launch onRefresh callback.
      @method _refresh
      @private
      @param {Boolean} If refresh even before start time.
    */
  }, {
    key: "_refresh",
    value: function _refresh(isBefore) {
      var p = this._props;
      if (p.onRefresh != null) {
        var context = p.callbacksContext || this,
          progress = isBefore ? 0 : 1;
        p.onRefresh.call(context, isBefore, p.easing(progress), progress);
      }
    }

    /*
      Method which is called when the tween is removed from tweener.
      @private
    */
  }, {
    key: "_onTweenerRemove",
    value: function _onTweenerRemove() {}

    /*
      Method which is called when the tween is removed
      from tweener when finished.
      @private
    */
  }, {
    key: "_onTweenerFinish",
    value: function _onTweenerFinish() {
      this._setPlaybackState('stop');
      this._playbackComplete();
    }

    /*
      Method to set property[s] on Tween.
      @private
      @override @ Module
      @param {Object, String} Hash object of key/value pairs, or property name.
      @param {_} Property's value to set.
    */
  }, {
    key: "_setProp",
    value: function _setProp(obj, value) {
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Tween.prototype), "_setProp", this).call(this, obj, value);
      this._calcDimentions();
    }

    /*
      Method to set single property.
      @private
      @override @ Module
      @param {String} Name of the property.
      @param {Any} Value for the property.
    */
  }, {
    key: "_assignProp",
    value: function _assignProp(key, value) {
      // fallback to defaults
      if (value == null) {
        value = this._defaults[key];
      }

      // parse easing
      if (key === 'easing') {
        value = easing_easing__WEBPACK_IMPORTED_MODULE_8___default().parseEasing(value);
        value._parent = this;
      }

      // handle control callbacks overrides
      var control = this._callbackOverrides[key],
        isntOverriden = !value || !value.isMojsCallbackOverride;
      if (control && isntOverriden) {
        value = this._overrideCallback(value, control);
      }

      // call super on Module
      (0,_babel_runtime_helpers_get__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_6__["default"])(Tween.prototype), "_assignProp", this).call(this, key, value);
    }

    /*
      Method to override callback for controll pupropes.
      @private
      @param {String}    Callback name.
      @parma {Function}  Method to call
    */
  }, {
    key: "_overrideCallback",
    value: function _overrideCallback(callback, fun) {
      var isCallback = callback && typeof callback === 'function',
        override = function callbackOverride() {
          // call overriden callback if it exists
          isCallback && callback.apply(this, arguments); // eslint-disable-line

          // call the passed cleanup function
          fun.apply(this, arguments); // eslint-disable-line
        };

      // add overridden flag
      override.isMojsCallbackOverride = true;
      return override;
    }

    // _visualizeProgress(time) {
    //   var str = '|',
    //       procStr = ' ',
    //       p = this._props,
    //       proc = p.startTime - p.delay;

    //   while ( proc < p.endTime ) {
    //     if (p.delay > 0 ) {
    //       var newProc = proc + p.delay;
    //       if ( time > proc && time < newProc ) {
    //         procStr += ' ^ ';
    //       } else {
    //         procStr += '   ';
    //       }
    //       proc = newProc;
    //       str  += '---';
    //     }
    //     var newProc = proc + p.duration;
    //     if ( time > proc && time < newProc ) {
    //       procStr += '  ^   ';
    //     } else if (time === proc) {
    //       procStr += '^     ';
    //     } else if (time === newProc) {
    //       procStr += '    ^ ';
    //     } else {
    //       procStr += '      ';
    //     }
    //     proc = newProc;
    //     str += '=====|';
    //   }

    //   console.log(str);
    //   console.log(procStr);
    // }
  }]);
  return Tween;
}(src_module__WEBPACK_IMPORTED_MODULE_9__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tween);

/***/ }),

/***/ "./src/tween/tweenable.babel.js":
/*!**************************************!*\
  !*** ./src/tween/tweenable.babel.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "./node_modules/@babel/runtime/helpers/esm/inherits.js");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");
/* harmony import */ var tween_tween__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tween/tween */ "./src/tween/tween.babel.js");
/* harmony import */ var tween_timeline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tween/timeline */ "./src/tween/timeline.babel.js");
/* harmony import */ var src_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! src/module */ "./src/module.babel.js");





function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0,_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_4__["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0,_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_3__["default"])(this, result); }; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }




/*
  Class to define a module ancestor
  with timeline and tween options and functionality.
  All runable modules should inherit from this class.

  @class Tweenable
*/
var Tweenable = /*#__PURE__*/function (_Module) {
  (0,_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_2__["default"])(Tweenable, _Module);
  var _super = _createSuper(Tweenable);
  // ^ PUBLIC  METHOD(S) ^
  // v PRIVATE METHOD(S) v

  function Tweenable() {
    var _this;
    var o = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Tweenable);
    // super of Module
    _this = _super.call(this, o);

    // pipe function for _o object
    // before creating tween/timeline
    _this._transformTweenOptions();

    // make tween only if isTweenLess option is not set
    !_this._o.isTweenLess && _this._makeTween();

    // make timeline only if isTimelineLess option is not set
    !_this._o.isTimelineLess && _this._makeTimeline();
    return _this;
  }

  /*
    Placeholder method that should be overrided
    and will be called before tween/timeline creation.
    @private
  */
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Tweenable, [{
    key: "play",
    value:
    /*
      `play` method for the timeline.
      @public
      @param {Number} Time shift.
      @returns this.
    */
    function play() {
      this.timeline.play.apply(this.timeline, arguments);
      return this;
    }

    /*
      `playBackward` method for the timeline.
      @public
      @param {Number} Time shift.
      @returns this.
    */
  }, {
    key: "playBackward",
    value: function playBackward() {
      this.timeline.playBackward.apply(this.timeline, arguments);
      return this;
    }

    /*
      `pause` method for the timeline.
      @public
      @returns this.
    */
  }, {
    key: "pause",
    value: function pause() {
      this.timeline.pause.apply(this.timeline, arguments);
      return this;
    }

    /*
      `stop` method for the timeline.
      @public
      @param {Number} [0...1] Progress to set on stop.
                              *Default* is `0` if `play`
                              and `1` if `playBAckward`.
      @returns this.
    */
  }, {
    key: "stop",
    value: function stop() {
      this.timeline.stop.apply(this.timeline, arguments);
      return this;
    }

    /*
      `reset` method for the timeline.
      @public
      @returns this.
    */
  }, {
    key: "reset",
    value: function reset() {
      this.timeline.reset.apply(this.timeline, arguments);
      return this;
    }

    /*
      `replay` method for the timeline.
      @public
      @returns this.
    */
  }, {
    key: "replay",
    value: function replay() {
      this.timeline.replay.apply(this.timeline, arguments);
      return this;
    }

    /*
      `replay` method for the timeline.
      @public
      @returns this.
    */
  }, {
    key: "replayBackward",
    value: function replayBackward() {
      this.timeline.replayBackward.apply(this.timeline, arguments);
      return this;
    }

    /*
      `resume` method for the timeline.
      @public
      @param {Number} Time shift.
      @returns this.
    */
  }, {
    key: "resume",
    value: function resume() {
      this.timeline.resume.apply(this.timeline, arguments);
      return this;
    }

    /*
      `setProgress` method for the timeline.
      @public
      @param {Number} [0...1] Progress value.
      @returns this.
    */
  }, {
    key: "setProgress",
    value: function setProgress() {
      this.timeline.setProgress.apply(this.timeline, arguments);
      return this;
    }

    /*
      setSpeed method for the timeline.
      @param {Number} Speed value.
      @returns this.
    */
  }, {
    key: "setSpeed",
    value: function setSpeed() {
      this.timeline.setSpeed.apply(this.timeline, arguments);
      return this;
    }
  }, {
    key: "_transformTweenOptions",
    value: function _transformTweenOptions() {}

    /*
      Method to create tween.
      @private
    */
  }, {
    key: "_makeTween",
    value: function _makeTween() {
      // pass callbacks context
      this._o.callbacksContext = this._o.callbacksContext || this;
      this.tween = new tween_tween__WEBPACK_IMPORTED_MODULE_5__["default"](this._o);

      // make timeline property point to tween one is "no timeline" mode
      this._o.isTimelineLess && (this.timeline = this.tween);
    }

    /*
      Method to create timeline.
      @private
      @param {Object} Timeline's options.
                      An object which contains "timeline" property with
                      timeline options.
    */
  }, {
    key: "_makeTimeline",
    value: function _makeTimeline() {
      // pass callbacks context
      this._o.timeline = this._o.timeline || {};
      this._o.timeline.callbacksContext = this._o.callbacksContext || this;
      this.timeline = new tween_timeline__WEBPACK_IMPORTED_MODULE_6__["default"](this._o.timeline);

      // set the flag to indicate that real timeline is present
      this._isTimeline = true;

      // if tween exist - add it to the timeline there is some
      // modules like burst and stagger that have no tween
      this.tween && this.timeline.add(this.tween);
    }
  }]);
  return Tweenable;
}(src_module__WEBPACK_IMPORTED_MODULE_7__["default"]);
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Tweenable);

/***/ }),

/***/ "./src/tween/tweener.babel.js":
/*!************************************!*\
  !*** ./src/tween/tweener.babel.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "./node_modules/@babel/runtime/helpers/esm/createClass.js");


var Tweener = /*#__PURE__*/function () {
  function Tweener() {
    (0,_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__["default"])(this, Tweener);
    this._vars();
    this._listenVisibilityChange();
    return this;
  }
  (0,_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__["default"])(Tweener, [{
    key: "_vars",
    value: function _vars() {
      this.tweens = [];
      this._savedTweens = [];
      this._loop = this._loop.bind(this);
      this._onVisibilityChange = this._onVisibilityChange.bind(this);
    }

    /*
      Main animation loop. Should have only one concurrent loop.
      @private
      @returns this
    */
  }, {
    key: "_loop",
    value: function _loop() {
      if (!this._isRunning) {
        return false;
      }
      this._update(window.performance.now());
      if (!this.tweens.length) {
        return this._isRunning = false;
      }
      requestAnimationFrame(this._loop);
      return this;
    }

    /*
      Method to start animation loop.
      @private
    */
  }, {
    key: "_startLoop",
    value: function _startLoop() {
      if (this._isRunning) {
        return;
      }
      this._isRunning = true;
      requestAnimationFrame(this._loop);
    }

    /*
      Method to stop animation loop.
      @private
    */
  }, {
    key: "_stopLoop",
    value: function _stopLoop() {
      this._isRunning = false;
    }

    /*
      Method to update every tween/timeline on animation frame.
      @private
    */
  }, {
    key: "_update",
    value: function _update(time) {
      var i = this.tweens.length;
      while (i--) {
        // cache the current tween
        var tween = this.tweens[i];
        if (tween && tween._update(time) === true) {
          this.remove(tween);
          tween._onTweenerFinish();
          tween._prevTime = undefined;
        }
      }
    }

    /*
      Method to add a Tween/Timeline to loop pool.
      @param {Object} Tween/Timeline to add.
    */
  }, {
    key: "add",
    value: function add(tween) {
      // return if tween is already running
      if (tween._isRunning) {
        return;
      }
      tween._isRunning = true;
      this.tweens.push(tween);
      this._startLoop();
    }

    /*
      Method stop updating all the child tweens/timelines.
      @private
    */
  }, {
    key: "removeAll",
    value: function removeAll() {
      this.tweens.length = 0;
    }

    /*
      Method to remove specific tween/timeline form updating.
      @private
    */
  }, {
    key: "remove",
    value: function remove(tween) {
      var index = typeof tween === 'number' ? tween : this.tweens.indexOf(tween);
      if (index !== -1) {
        tween = this.tweens[index];
        if (tween) {
          tween._isRunning = false;
          this.tweens.splice(index, 1);
          tween._onTweenerRemove();
        }
      }
    }

    /*
      Method to initialize event listeners to visibility change events.
      @private
    */
  }, {
    key: "_listenVisibilityChange",
    value: function _listenVisibilityChange() {
      if (typeof document.hidden !== 'undefined') {
        this._visibilityHidden = 'hidden';
        this._visibilityChange = 'visibilitychange';
      } else if (typeof document.mozHidden !== 'undefined') {
        this._visibilityHidden = 'mozHidden';
        this._visibilityChange = 'mozvisibilitychange';
      } else if (typeof document.msHidden !== 'undefined') {
        this._visibilityHidden = 'msHidden';
        this._visibilityChange = 'msvisibilitychange';
      } else if (typeof document.webkitHidden !== 'undefined') {
        this._visibilityHidden = 'webkitHidden';
        this._visibilityChange = 'webkitvisibilitychange';
      }
      document.addEventListener(this._visibilityChange, this._onVisibilityChange, false);
    }

    /*
      Method that will fire on visibility change.
    */
  }, {
    key: "_onVisibilityChange",
    value: function _onVisibilityChange() {
      if (document[this._visibilityHidden]) {
        this._savePlayingTweens();
      } else {
        this._restorePlayingTweens();
      }
    }

    /*
      Method to save all playing tweens.
      @private
    */
  }, {
    key: "_savePlayingTweens",
    value: function _savePlayingTweens() {
      this._savedTweens = this.tweens.slice(0);
      for (var i = 0; i < this._savedTweens.length; i++) {
        this._savedTweens[i].pause();
      }
    }

    /*
      Method to restore all playing tweens.
      @private
    */
  }, {
    key: "_restorePlayingTweens",
    value: function _restorePlayingTweens() {
      for (var i = 0; i < this._savedTweens.length; i++) {
        this._savedTweens[i].resume();
      }
    }
  }]);
  return Tweener;
}();
var t = new Tweener();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (t);

/***/ }),

/***/ "./src/easing/bezier-easing.coffee":
/*!*****************************************!*\
  !*** ./src/easing/bezier-easing.coffee ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var BezierEasing, bezierEasing, h;

h = __webpack_require__(/*! src/h */ "./src/h.coffee");

/**
 * Copyright (c) 2014 Gaëtan Renaudeau https://goo.gl/El3k7u
 * Adopted from https://github.com/gre/bezier-easing
 */
BezierEasing = class BezierEasing {
  constructor(o) {
    this.vars();
    return this.generate;
  }

  vars() {
    return this.generate = h.bind(this.generate, this);
  }

  generate(mX1, mY1, mX2, mY2) {
    var A, B, C, NEWTON_ITERATIONS, NEWTON_MIN_SLOPE, SUBDIVISION_MAX_ITERATIONS, SUBDIVISION_PRECISION, _precomputed, arg, binarySubdivide, calcBezier, calcSampleValues, f, float32ArraySupported, getSlope, getTForX, i, j, kSampleStepSize, kSplineTableSize, mSampleValues, newtonRaphsonIterate, precompute, str;
    // params parsing
    if (arguments.length < 4) {
      return this.error('Bezier function expects 4 arguments');
    }
    for (i = j = 0; j < 4; i = ++j) {
      arg = arguments[i];
      if (typeof arg !== "number" || isNaN(arg) || !isFinite(arg)) {
        return this.error('Bezier function expects 4 arguments');
      }
    }
    if (mX1 < 0 || mX1 > 1 || mX2 < 0 || mX2 > 1) {
      return this.error('Bezier x values should be > 0 and < 1');
    }
    // These values are established by empiricism with
    // tests (tradeoff: performance VS precision)
    NEWTON_ITERATIONS = 4;
    NEWTON_MIN_SLOPE = 0.001;
    SUBDIVISION_PRECISION = 0.0000001;
    SUBDIVISION_MAX_ITERATIONS = 10;
    kSplineTableSize = 11;
    kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);
    float32ArraySupported = !!Float32Array;
    A = function(aA1, aA2) {
      return 1.0 - 3.0 * aA2 + 3.0 * aA1;
    };
    B = function(aA1, aA2) {
      return 3.0 * aA2 - 6.0 * aA1;
    };
    C = function(aA1) {
      return 3.0 * aA1;
    };
    // Returns x(t) given t, x1, and x2, or y(t) given t, y1, and y2.
    calcBezier = function(aT, aA1, aA2) {
      return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT;
    };
    // Returns dx/dt given t, x1, and x2, or dy/dt given t, y1, and y2.
    getSlope = function(aT, aA1, aA2) {
      return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1);
    };
    newtonRaphsonIterate = function(aX, aGuessT) {
      var currentSlope, currentX;
      i = 0;
      while (i < NEWTON_ITERATIONS) {
        currentSlope = getSlope(aGuessT, mX1, mX2);
        if (currentSlope === 0.0) {
          return aGuessT;
        }
        currentX = calcBezier(aGuessT, mX1, mX2) - aX;
        aGuessT -= currentX / currentSlope;
        ++i;
      }
      return aGuessT;
    };
    calcSampleValues = function() {
      i = 0;
      while (i < kSplineTableSize) {
        mSampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
        ++i;
      }
    };
    binarySubdivide = function(aX, aA, aB) {
      var currentT, currentX, isBig;
      currentX = void 0;
      currentT = void 0;
      i = 0;
      while (true) {
        currentT = aA + (aB - aA) / 2.0;
        currentX = calcBezier(currentT, mX1, mX2) - aX;
        if (currentX > 0.0) {
          aB = currentT;
        } else {
          aA = currentT;
        }
        isBig = Math.abs(currentX) > SUBDIVISION_PRECISION;
        if (!(isBig && ++i < SUBDIVISION_MAX_ITERATIONS)) {
          break;
        }
      }
      return currentT;
    };
    getTForX = function(aX) {
      var currentSample, delta, dist, guessForT, initialSlope, intervalStart, lastSample;
      intervalStart = 0.0;
      currentSample = 1;
      lastSample = kSplineTableSize - 1;
      while (currentSample !== lastSample && mSampleValues[currentSample] <= aX) {
        intervalStart += kSampleStepSize;
        ++currentSample;
      }
      --currentSample;
      // Interpolate to provide an initial guess for t
      delta = mSampleValues[currentSample + 1] - mSampleValues[currentSample];
      dist = (aX - mSampleValues[currentSample]) / delta;
      guessForT = intervalStart + dist * kSampleStepSize;
      initialSlope = getSlope(guessForT, mX1, mX2);
      if (initialSlope >= NEWTON_MIN_SLOPE) {
        return newtonRaphsonIterate(aX, guessForT);
      } else {
        if (initialSlope === 0.0) {
          return guessForT;
        } else {
          return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize);
        }
      }
    };
    precompute = function() {
      var _precomputed;
      _precomputed = true;
      if (mX1 !== mY1 || mX2 !== mY2) {
        return calcSampleValues();
      }
    };
    mSampleValues = !float32ArraySupported ? new Array(kSplineTableSize) : new Float32Array(kSplineTableSize);
    _precomputed = false;
    f = function(aX) {
      if (!_precomputed) {
        precompute();
      }
      if (mX1 === mY1 && mX2 === mY2) {
        return aX;
      }
      if (aX === 0) {
        // linear
        // Because JavaScript number are imprecise,
        // we should guarantee the extremes are right.
        return 0;
      }
      if (aX === 1) {
        return 1;
      }
      return calcBezier(getTForX(aX), mY1, mY2);
    };
    str = "bezier(" + [mX1, mY1, mX2, mY2] + ")";
    f.toStr = function() {
      return str;
    };
    return f;
  }

  error(msg) {
    return h.error(msg);
  }

};

bezierEasing = new BezierEasing();

module.exports = bezierEasing;


/***/ }),

/***/ "./src/easing/easing.coffee":
/*!**********************************!*\
  !*** ./src/easing/easing.coffee ***!
  \**********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Easing, PI, PathEasing, approximate, bezier, easing, h, mix, sin;

h = __webpack_require__(/*! src/h */ "./src/h.coffee");

bezier = __webpack_require__(/*! easing/bezier-easing */ "./src/easing/bezier-easing.coffee");

PathEasing = __webpack_require__(/*! easing/path-easing */ "./src/easing/path-easing.coffee");

mix = __webpack_require__(/*! easing/mix */ "./src/easing/mix.coffee");

approximate = (__webpack_require__(/*! easing/approximate */ "./src/easing/approximate.babel.js")["default"]);

sin = Math.sin;

PI = Math.PI;

Easing = (function() {
  class Easing {
    // ---

      // Method to inverse the easing value
    // @param {Number} Value to inverse
    // @return {Number} Inversed value
    inverse(p) {
      return 1 - p;
    }

    // ---

      // Method to parse easing
    // @method parseEasing

    // @param {String, Function, Array}
    //   - *String*: Easing name delimited by dot e.g "cubic.in" or "elastic.out"
    //     all avaliable options you can find at
    //     [easing module](easing.coffee.html) page.
    //   - *String*: SVG path coordinates in rectangle of 100x100
    //   - *Function*: function that recieve current time and returns modified one
    //     e.g. *function (k) { return k*k; }*. The function can be created by
    //     calling mojs.easing.bezier(0.55,0.085,0.68,0.53) or
    //     mojs.easing.path('M0,0 ...') function.

    // @return {Function}
    parseEasing(easing) {
      var easingParent, type;
      if (easing == null) {
        easing = 'linear.none';
      }
      type = typeof easing;
      if (type === 'string') {
        if (easing.charAt(0).toLowerCase() === 'm') {
          return this.path(easing);
        } else {
          easing = this._splitEasing(easing);
          easingParent = this[easing[0]];
          if (!easingParent) {
            h.error(`Easing with name \"${easing[0]}\" was not found, fallback to \"linear.none\" instead`);
            return this['linear']['none'];
          }
          return easingParent[easing[1]];
        }
      }
      if (h.isArray(easing)) {
        return this.bezier.apply(this, easing);
      }
      if (true) {
        return easing;
      }
    }

    // ---

      // Method to parse easing name string
    // @method splitEasing

    // @param {String} easing name. All easing names can be found
    //                 at [easing module](easing.coffee.html) page.
    // @return {Array}
    _splitEasing(string) {
      var firstPart, secondPart, split;
      if (typeof string === 'function') {
        return string;
      }
      if (typeof string === 'string' && string.length) {
        split = string.split('.');
        firstPart = split[0].toLowerCase() || 'linear';
        secondPart = split[1].toLowerCase() || 'none';
        return [firstPart, secondPart];
      } else {
        return ['linear', 'none'];
      }
    }

  };

  Easing.prototype.bezier = bezier;

  Easing.prototype.PathEasing = PathEasing;

  Easing.prototype.path = (new PathEasing('creator')).create;

  Easing.prototype.approximate = approximate;

  // EASINGS
  Easing.prototype.linear = {
    none: function(k) {
      return k;
    }
  };

  Easing.prototype.ease = {
    in: bezier.apply(Easing, [0.42, 0, 1, 1]),
    out: bezier.apply(Easing, [0, 0, 0.58, 1]),
    inout: bezier.apply(Easing, [0.42, 0, 0.58, 1])
  };

  Easing.prototype.sin = {
    in: function(k) {
      return 1 - Math.cos(k * PI / 2);
    },
    out: function(k) {
      return sin(k * PI / 2);
    },
    inout: function(k) {
      return 0.5 * (1 - Math.cos(PI * k));
    }
  };

  Easing.prototype.quad = {
    in: function(k) {
      return k * k;
    },
    out: function(k) {
      return k * (2 - k);
    },
    inout: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k;
      }
      return -0.5 * (--k * (k - 2) - 1);
    }
  };

  Easing.prototype.cubic = {
    in: function(k) {
      return k * k * k;
    },
    out: function(k) {
      return --k * k * k + 1;
    },
    inout: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k + 2);
    }
  };

  Easing.prototype.quart = {
    in: function(k) {
      return k * k * k * k;
    },
    out: function(k) {
      return 1 - (--k * k * k * k);
    },
    inout: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k;
      }
      return -0.5 * ((k -= 2) * k * k * k - 2);
    }
  };

  Easing.prototype.quint = {
    in: function(k) {
      return k * k * k * k * k;
    },
    out: function(k) {
      return --k * k * k * k * k + 1;
    },
    inout: function(k) {
      if ((k *= 2) < 1) {
        return 0.5 * k * k * k * k * k;
      }
      return 0.5 * ((k -= 2) * k * k * k * k + 2);
    }
  };

  Easing.prototype.expo = {
    in: function(k) {
      if (k === 0) {
        return 0;
      } else {
        return Math.pow(1024, k - 1);
      }
    },
    out: function(k) {
      if (k === 1) {
        return 1;
      } else {
        return 1 - Math.pow(2, -10 * k);
      }
    },
    inout: function(k) {
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      if ((k *= 2) < 1) {
        return 0.5 * Math.pow(1024, k - 1);
      }
      return 0.5 * (-Math.pow(2, -10 * (k - 1)) + 2);
    }
  };

  Easing.prototype.circ = {
    in: function(k) {
      return 1 - Math.sqrt(1 - k * k);
    },
    out: function(k) {
      return Math.sqrt(1 - (--k * k));
    },
    inout: function(k) {
      if ((k *= 2) < 1) {
        return -0.5 * (Math.sqrt(1 - k * k) - 1);
      }
      return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);
    }
  };

  Easing.prototype.back = {
    in: function(k) {
      var s;
      s = 1.70158;
      return k * k * ((s + 1) * k - s);
    },
    out: function(k) {
      var s;
      s = 1.70158;
      return --k * k * ((s + 1) * k + s) + 1;
    },
    inout: function(k) {
      var s;
      s = 1.70158 * 1.525;
      if ((k *= 2) < 1) {
        return 0.5 * (k * k * ((s + 1) * k - s));
      }
      return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
    }
  };

  Easing.prototype.elastic = {
    in: function(k) {
      var a, p, s;
      s = void 0;
      // a = 0.1
      p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      // if a < 1
      a = 1;
      s = p / 4;
      // else
      //   s = p * Math.asin(1 / a) / (2 * Math.PI)
      return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    },
    out: function(k) {
      var a, p, s;
      s = void 0;
      // a = 0.1
      p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      // if not a or a < 1
      a = 1;
      s = p / 4;
      // else
      //   s = p * Math.asin(1 / a) / (2 * Math.PI)
      return a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1;
    },
    inout: function(k) {
      var a, p, s;
      s = void 0;
      // a = 0.1
      p = 0.4;
      if (k === 0) {
        return 0;
      }
      if (k === 1) {
        return 1;
      }
      // if not a or a < 1
      a = 1;
      s = p / 4;
      // else
      //   s = p * Math.asin(1 / a) / (2 * Math.PI)
      if ((k *= 2) < 1) {
        return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
      }
      return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
    }
  };

  Easing.prototype.bounce = {
    in: function(k) {
      return 1 - easing.bounce.out(1 - k);
    },
    out: function(k) {
      if (k < (1 / 2.75)) {
        return 7.5625 * k * k;
      } else if (k < (2 / 2.75)) {
        return 7.5625 * (k -= 1.5 / 2.75) * k + 0.75;
      } else if (k < (2.5 / 2.75)) {
        return 7.5625 * (k -= 2.25 / 2.75) * k + 0.9375;
      } else {
        return 7.5625 * (k -= 2.625 / 2.75) * k + 0.984375;
      }
    },
    inout: function(k) {
      if (k < 0.5) {
        return easing.bounce.in(k * 2) * 0.5;
      }
      return easing.bounce.out(k * 2 - 1) * 0.5 + 0.5;
    }
  };

  return Easing;

}).call(this);

easing = new Easing();

easing.mix = mix(easing);

module.exports = easing;


/***/ }),

/***/ "./src/easing/mix.coffee":
/*!*******************************!*\
  !*** ./src/easing/mix.coffee ***!
  \*******************************/
/***/ ((module) => {

var create, easing, getNearest, mix, parseIfEasing, sort;

easing = null;

// Method to check if need to parse easing expression.

// @param  {Object} Mix array item
// @return {Function, Number} Parsed easing or static easing number.
parseIfEasing = function(item) {
  if (typeof item.value === 'number') {
    return item.value;
  } else {
    return easing.parseEasing(item.value);
  }
};

// ---

// Method to sort an array form smallest to largest.

// @param  {Any} Array item.
// @param  {Any} Array item.
// @return {Number} Comparation indicator.
// @side-effect  Check if value on **array item** should be
//               parsed, and parses it if so.
sort = function(a, b) {
  var returnValue;
  a.value = parseIfEasing(a);
  b.value = parseIfEasing(b);
  returnValue = 0;
  a.to < b.to && (returnValue = -1);
  a.to > b.to && (returnValue = 1);
  return returnValue;
};

// ---

// Method to get the nearest to item to the progress.

// @param  {Array} Array to search in.
// @param  {Number} Progress to search for.
// @return {Number} Nearest item index.
getNearest = function(array, progress) {
  var i, j, len, value;
  for (i = j = 0, len = array.length; j < len; i = ++j) {
    value = array[i];
    if (value.to > progress) {
      return i;
    }
  }
};

// ---

// Method to get the nearest to item to the progress.

// @param  {Array} Array to search in.
// @param  {Number} Progress to search for.
// @return {Number} Nearest item index.
mix = function(...args) {
  // if there are more than 1 mix values - sort the array
  if (args.length > 1) {
    args = args.sort(sort);
  } else {
    // if there is just one value - parse it's easing expression
    args[0].value = parseIfEasing(args[0]);
  }
  return function(progress) {
    var index, value;
    index = getNearest(args, progress);
    if (typeof index === 'undefined') {
      // return 1 if not defined
      return 1;
    }
    if (index !== -1) {
      value = args[index].value;
      if (index === args.length - 1 && progress > args[index].to) {
        // return 1 if not defined
        return 1;
      }
      // evaluate the function if it was passed or return the value itself
      if (typeof value === 'function') {
        return value(progress);
      } else {
        return value;
      }
    }
  };
};

// ---

// Method initialize the mix function.
// It was made since requiring "easing" module cuases
// cycle dependensies issue but we need the module.
// So we pass it to the create method and it assigns it to
// already declared easing variable.

// @param  {Object} Easing module.
// @return {Function} Mix function.
create = function(e) {
  easing = e;
  return mix;
};

module.exports = create;


/***/ }),

/***/ "./src/easing/path-easing.coffee":
/*!***************************************!*\
  !*** ./src/easing/path-easing.coffee ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var PathEasing, h;

h = __webpack_require__(/*! src/h */ "./src/h.coffee");

// ## PathEasing
// Class allows you to specify custom easing function
// by **SVG path** [line commands](https://goo.gl/LzvV6P).
// Line commands should by in range of rect 100x100.
// @param {String, DOMNode}
// @param {Object} options
//   - eps  {Number}  Epsilon specifies how precise we
//     should be when sampling the path. Smaller number - more
//     precise is computation, but more CPU power it takes *default: 0.001*
//   - precompute {Number} Quantity of steps for sampling specified path
//     on init. It can be in *range of [100, 10000]*.
//     Larger number specified - more time it takes to init the module,
//     but less time it takes during the animation. *default: 1450*
//   - rect {Number} The largest
//     number SVG path coordinates can have *default: 100*
//   - approximateMax {Number} Number of loops avaliable
//     when approximating the path value *default: 5*
PathEasing = class PathEasing {
  // Method to create variables
  // @method _vars
  _vars() {
    // options
    this._precompute = h.clamp(this.o.precompute || 1450, 100, 10000);
    this._step = 1 / this._precompute;
    this._rect = this.o.rect || 100;
    this._approximateMax = this.o.approximateMax || 5;
    this._eps = this.o.eps || 0.001;
    // util variables
    return this._boundsPrevProgress = -1;
  }

  // ---

    // Constructor
  constructor(path, o1 = {}) {
    this.o = o1;
    // the class can work as a "creator" of self instances
    // so no need to init if 'creator' passed insted of path
    if (path === 'creator') {
      return;
    }
    this.path = h.parsePath(path);
    if (this.path == null) {
      return h.error('Error while parsing the path');
    }
    this._vars();
    // normalize start and end x value of the path
    this.path.setAttribute('d', this._normalizePath(this.path.getAttribute('d')));
    this.pathLength = this.path.getTotalLength();
    this.sample = h.bind(this.sample, this);
    this._hardSample = h.bind(this._hardSample, this);
    // console.time 'pre sample'
    this._preSample();
    // console.timeEnd 'pre sample'
    this;
  }

  // ---

    // Samples the path on init

  // @method _preSample
  // @sideEffect {Array} _samples - set of sampled points
  _preSample() {
    var i, j, length, point, progress, ref, results;
    this._samples = [];
    results = [];
    for (i = j = 0, ref = this._precompute; (0 <= ref ? j <= ref : j >= ref); i = 0 <= ref ? ++j : --j) {
      progress = i * this._step;
      length = this.pathLength * progress;
      point = this.path.getPointAtLength(length);
      results.push(this._samples[i] = {
        point: point,
        length: length,
        progress: progress
      });
    }
    return results;
  }

  // ---

    // @method _findBounds
  // @param  {Array}   to search in
  // @param  {Number}  progress to search for
  // @return {Object}
  //         - start {Number}: lowest boundry
  //         - end   {Number}: highest boundry
  _findBounds(array, p) {
    var buffer, direction, end, i, j, len, loopEnd, pointP, pointX, ref, ref1, start, value;
    if (p === this._boundsPrevProgress) {
      return this._prevBounds;
    }
    // get the start index in the array
    // reset the cached prev index if new progress
    // is smaller then previous one or it is not defined
    if (this._boundsStartIndex == null) {
      this._boundsStartIndex = 0;
    }
    len = array.length;
    // get start and end indexes of the loop and save the direction
    if (this._boundsPrevProgress > p) {
      loopEnd = 0;
      direction = 'reverse';
    } else {
      loopEnd = len;
      direction = 'forward';
    }
    // set default start and end bounds to the
    // very first and the very last items in array
    if (direction === 'forward') {
      start = array[0];
      end = array[array.length - 1];
    } else {
      start = array[array.length - 1];
      end = array[0];
    }
// loop thru the array from the @_boundsStartIndex
    for (i = j = ref = this._boundsStartIndex, ref1 = loopEnd; (ref <= ref1 ? j < ref1 : j > ref1); i = ref <= ref1 ? ++j : --j) {
      value = array[i];
      pointX = value.point.x / this._rect;
      pointP = p;
      // if direction is reverse swap pointX and pointP
      // for if statement
      if (direction === 'reverse') {
        buffer = pointX;
        pointX = pointP;
        pointP = buffer;
      }
      // the next statement is nicer but it creates
      // a new object, so bothers GC
      // {pointX, pointP} = {pointX: pointP, pointP: pointX}
      // save the latest smaller value as start value
      if (pointX < pointP) {
        start = value;
        this._boundsStartIndex = i;
      } else {
        // save the first larger value as end value
        // and break immediately
        end = value;
        break;
      }
    }
    this._boundsPrevProgress = p;
    // return the first item if start wasn't found
    // start ?= array[0]
    // end   ?= array[array.length-1]
    return this._prevBounds = {
      start: start,
      end: end
    };
  }

  // ---

    // Loop thru path trying to find the most closer x
  // compared to current progress value

  // @method sample
  // @param  {Number} easing progress in range [0,1]
  // @return {Number} easing y
  sample(p) {
    var bounds, res;
    p = h.clamp(p, 0, 1);
    bounds = this._findBounds(this._samples, p);
    res = this._checkIfBoundsCloseEnough(p, bounds);
    if (res != null) {
      return res;
    }
    return this._findApproximate(p, bounds.start, bounds.end);
  }

  // ---

    // Check if one of bounds.start or bounds.end
  // is close enough to searched progress

  // @method _checkIfBoundsCloseEnough
  // @param  {Number} progress
  // @param  {Object} bounds
  // @return {Number, Undefined} returns Y value if true, undefined if false
  _checkIfBoundsCloseEnough(p, bounds) {
    var point, y;
    point = void 0;
    // check if start bound is close enough
    y = this._checkIfPointCloseEnough(p, bounds.start.point);
    if (y != null) {
      return y;
    }
    // check if end bound is close enough
    return this._checkIfPointCloseEnough(p, bounds.end.point);
  }

  // ---

    // Check if bound point close enough to progress

  // @method _checkIfPointCloseEnough
  // @param  {Number} progress
  // @param  {Object} bound point (start or end)
  // @return {Number, Undefined} returns Y value if true, undefined if false
  _checkIfPointCloseEnough(p, point) {
    if (h.closeEnough(p, point.x / this._rect, this._eps)) {
      return this._resolveY(point);
    }
  }

  // ---

    // @method _approximate
  // @param  {Object} start point object
  // @param  {Object} end point object
  // @param  {Number} progress to search
  // @return {Object} approximation
  _approximate(start, end, p) {
    var deltaP, percentP;
    deltaP = end.point.x - start.point.x;
    percentP = (p - (start.point.x / this._rect)) / (deltaP / this._rect);
    return start.length + percentP * (end.length - start.length);
  }

  // ---

    // @method _findApproximate
  // @param  {Number} progress to search for
  // @param  {Object} start point object
  // @param  {Object} end point object
  // @return {Nunomber} y approximation
  _findApproximate(p, start, end, approximateMax = this._approximateMax) {
    var approximation, args, newPoint, point, x;
    approximation = this._approximate(start, end, p);
    point = this.path.getPointAtLength(approximation);
    x = point.x / this._rect;
    // if close enough resolve the y value
    if (h.closeEnough(p, x, this._eps)) {
      return this._resolveY(point);
    } else {
      if (--approximateMax < 1) {
        // if looping for a long time
        return this._resolveY(point);
      }
      // not precise enough so we will call self
      // again recursively, lets find arguments for the call
      newPoint = {
        point: point,
        length: approximation
      };
      args = p < x ? [p, start, newPoint, approximateMax] : [p, newPoint, end, approximateMax];
      return this._findApproximate.apply(this, args);
    }
  }

  // ---

    // @method resolveY
  // @param  {Object} SVG point
  // @return {Number} normalized y
  _resolveY(point) {
    return 1 - (point.y / this._rect);
  }

  // ---

  // Method to normalize path's X start and end value
  // since it must start at 0 and end at 100
  // @param  {String} Path coordinates to normalize
  // @return {String} Normalized path coordinates
  _normalizePath(path) {
    var commands, endIndex, normalizedPath, points, startIndex, svgCommandsRegexp;
    // SVG path commands
    svgCommandsRegexp = /[M|L|H|V|C|S|Q|T|A]/gim;
    points = path.split(svgCommandsRegexp);
    // remove the first empty item - it is always
    // empty cuz we split by M
    points.shift();
    commands = path.match(svgCommandsRegexp);
    // normalize the x value of the start segment to 0
    startIndex = 0;
    points[startIndex] = this._normalizeSegment(points[startIndex]);
    // normalize the x value of the end segment to _rect value
    endIndex = points.length - 1;
    points[endIndex] = this._normalizeSegment(points[endIndex], this._rect || 100);
    // form the normalized path
    return normalizedPath = this._joinNormalizedPath(commands, points);
  }

  // ---

    // Method to form normalized path.
  // @param {Array} Commands array.
  // @param {Array} Points array.
  // @return {String} Formed normalized path.
  _joinNormalizedPath(commands, points) {
    var command, i, j, len1, normalizedPath, space;
    normalizedPath = '';
    for (i = j = 0, len1 = commands.length; j < len1; i = ++j) {
      command = commands[i];
      space = i === 0 ? '' : ' ';
      normalizedPath += `${space}${command}${points[i].trim()}`;
    }
    return normalizedPath;
  }

  // ---

    // Method to normalize SVG path segment
  // @param  {String} Segment to normalize.
  // @param  {Number} Value to normalize to.
  // @return {String} Normalized Segment.
  _normalizeSegment(segment, value = 0) {
    var i, j, lastPoint, len1, nRgx, pairs, parsedX, point, space, x;
    segment = segment.trim();
    nRgx = /(-|\+)?((\d+(\.(\d|\e(-|\+)?)+)?)|(\.?(\d|\e|(\-|\+))+))/gim;
    pairs = this._getSegmentPairs(segment.match(nRgx));
    // get x value of the latest point
    lastPoint = pairs[pairs.length - 1];
    x = lastPoint[0];
    parsedX = Number(x);
    // if the x point isn't the same as value, set it to the value
    if (parsedX !== value) {
      // join pairs to form segment
      segment = '';
      lastPoint[0] = value;
      for (i = j = 0, len1 = pairs.length; j < len1; i = ++j) {
        point = pairs[i];
        space = i === 0 ? '' : ' ';
        segment += `${space}${point[0]},${point[1]}`;
      }
    }
    return segment;
  }

  // Method to geather array values to pairs.
  // @param  {Array} Array to search pairs in.
  // @return {Array} Matrix of pairs.
  _getSegmentPairs(array) {
    var i, j, len1, newArray, pair, value;
    if (array.length % 2 !== 0) {
      h.error('Failed to parse the path - segment pairs are not even.', array);
    }
    newArray = [];
// loop over the array by 2
// and save the pairs
    for (i = j = 0, len1 = array.length; j < len1; i = j += 2) {
      value = array[i];
      pair = [array[i], array[i + 1]];
      newArray.push(pair);
    }
    return newArray;
  }

  // ---

    // Create new instance of PathEasing with specified parameters
  // *Please see the docs for PathEasing for more details on params.*

  // @method create
  // @param  {String, DOMNode} path
  // @return {Object} easing y
  create(path, o) {
    var handler;
    handler = new PathEasing(path, o);
    handler.sample.path = handler.path;
    return handler.sample;
  }

};

module.exports = PathEasing;


/***/ }),

/***/ "./src/h.coffee":
/*!**********************!*\
  !*** ./src/h.coffee ***!
  \**********************/
/***/ (function(module) {

// Utils methods and map objects

// @class Helpers
var Helpers, h;

Helpers = (function() {
  class Helpers {
    // DEG_TO_RAD: Math.PI/180
    constructor() {
      this.vars();
    }

    vars() {
      var ua;
      this.prefix = this.getPrefix();
      this.getRemBase();
      this.isFF = this.prefix.lowercase === 'moz';
      this.isIE = this.prefix.lowercase === 'ms';
      ua = navigator.userAgent;
      this.isOldOpera = ua.match(/presto/gim);
      this.isSafari = ua.indexOf('Safari') > -1;
      this.isChrome = ua.indexOf('Chrome') > -1;
      this.isOpera = ua.toLowerCase().indexOf("op") > -1;
      this.isChrome && this.isSafari && (this.isSafari = false);
      (ua.match(/PhantomJS/gim)) && (this.isSafari = false);
      this.isChrome && this.isOpera && (this.isChrome = false);
      this.is3d = this.checkIf3d();
      this.uniqIDs = -1;
      this.div = document.createElement('div');
      document.body.appendChild(this.div);
      return this.defaultStyles = this.computedStyle(this.div);
    }

    // ---

      // Clones object by iterating thru object properties

    // @method cloneObj
    // @param {Object} to clone
    // @param {Object} with key names that will be excluded
    //                 from the new object, key value should
    //                 be truthy
    // @example
    //   h.cloneObj({ foo: 'bar', baz: 'bar' }, { baz: 1 })
    //   // result: { foo: 'bar' }
    // @return {Object} new object
    cloneObj(obj, exclude) {
      var i, key, keys, newObj;
      keys = Object.keys(obj);
      newObj = {};
      i = keys.length;
      while (i--) {
        key = keys[i];
        if (exclude != null) {
          if (!exclude[key]) {
            newObj[key] = obj[key];
          }
        } else {
          newObj[key] = obj[key];
        }
      }
      return newObj;
    }

    // ---

      // Copies keys and values from the second object to the first if
    // key was not defined on the first object

    // @method extend

    // @param {Object} to copy values to
    // @param {Object} from copy values from

    // @example
    //   var objA = { foo: 'bar' }, objB = { baz: 'bax' };
    //   h.extend(objA, objB)
    //   // result: objA{ foo: 'bar', baz: 'bax' }

    // @return {Object} the first modified object
    extend(objTo, objFrom) {
      var key, value;
      for (key in objFrom) {
        value = objFrom[key];
        if (objTo[key] == null) {
          objTo[key] = objFrom[key];
        }
      }
      return objTo;
    }

    getRemBase() {
      var html, style;
      html = document.querySelector('html');
      style = getComputedStyle(html);
      return this.remBase = parseFloat(style.fontSize);
    }

    clamp(value, min, max) {
      if (value < min) {
        return min;
      } else if (value > max) {
        return max;
      } else {
        return value;
      }
    }

    // Math.min Math.max(value, min), max
    setPrefixedStyle(el, name, value) {
      (name === 'transform') && (el.style[`${this.prefix.css}${name}`] = value);
      return el.style[name] = value;
    }

    // ---

    // Sets styles on element with prefix(if needed) on el

    // @method style
    // @param {DOMNode}          element to set the styles on
    // @param {String, Object}   style name or style: value object
    // @param {String}           style value
    // @example
    //   h.style(el, 'width', '20px')
    // @example
    //   h.style(el, { width: '20px', height: '10px' })
    style(el, name, value) {
      var key, keys, len, results;
      if (typeof name === 'object') {
        keys = Object.keys(name);
        len = keys.length;
        results = [];
        while (len--) {
          key = keys[len];
          value = name[key];
          results.push(this.setPrefixedStyle(el, key, value));
        }
        return results;
      } else {
        return this.setPrefixedStyle(el, name, value);
      }
    }

    prepareForLog(args) {
      args = Array.prototype.slice.apply(args);
      args.unshift('::');
      args.unshift(this.logBadgeCss);
      args.unshift('%cmo·js%c');
      return args;
    }

    log() {
      if (mojs.isDebug === false) {
        return;
      }
      return console.log.apply(console, this.prepareForLog(arguments));
    }

    warn() {
      if (mojs.isDebug === false) {
        return;
      }
      return console.warn.apply(console, this.prepareForLog(arguments));
    }

    error() {
      if (mojs.isDebug === false) {
        return;
      }
      return console.error.apply(console, this.prepareForLog(arguments));
    }

    parseUnit(value) {
      var amount, isStrict, ref, regex, returnVal, unit;
      if (typeof value === 'number') {
        return returnVal = {
          unit: 'px',
          isStrict: false,
          value: value,
          string: value === 0 ? `${value}` : `${value}px`
        };
      } else if (typeof value === 'string') {
        regex = /px|%|rem|em|ex|cm|ch|mm|in|pt|pc|vh|vw|vmin|deg/gim;
        unit = (ref = value.match(regex)) != null ? ref[0] : void 0;
        isStrict = true;
        if (!unit) {
          unit = 'px';
          isStrict = false;
        }
        amount = parseFloat(value);
        return returnVal = {
          unit: unit,
          isStrict: isStrict,
          value: amount,
          string: amount === 0 ? `${amount}` : `${amount}${unit}`
        };
      }
      return value;
    }

    bind(func, context) {
      var bindArgs, wrapper;
      wrapper = function() {
        var args, unshiftArgs;
        args = Array.prototype.slice.call(arguments);
        unshiftArgs = bindArgs.concat(args);
        return func.apply(context, unshiftArgs);
      };
      bindArgs = Array.prototype.slice.call(arguments, 2);
      return wrapper;
    }

    getRadialPoint(o = {}) {
      var point, radAngle, radiusX, radiusY;
      // return if !o.radius? or !o.rotate? or !o.center?
      radAngle = (o.rotate - 90) * 0.017453292519943295; // Math.PI/180
      radiusX = o.radiusX != null ? o.radiusX : o.radius;
      radiusY = o.radiusY != null ? o.radiusY : o.radius;
      return point = {
        x: o.center.x + (Math.cos(radAngle) * radiusX),
        y: o.center.y + (Math.sin(radAngle) * radiusY)
      };
    }

    getPrefix() {
      var dom, pre, ref, styles, v;
      styles = window.getComputedStyle(document.documentElement, "");
      v = Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/);
      pre = (v || (styles.OLink === "" && ["", "o"]))[1];
      dom = (ref = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))) != null ? ref[1] : void 0;
      return {
        dom: dom,
        lowercase: pre,
        css: "-" + pre + "-",
        js: (pre != null ? pre[0].toUpperCase() : void 0) + (pre != null ? pre.substr(1) : void 0)
      };
    }

    strToArr(string) {
      var arr;
      arr = [];
      // plain number
      if (typeof string === 'number' && !isNaN(string)) {
        arr.push(this.parseUnit(string));
        return arr;
      }
      // string array
      string.trim().split(/\s+/gim).forEach((str) => {
        return arr.push(this.parseUnit(this.parseIfRand(str)));
      });
      return arr;
    }

    calcArrDelta(arr1, arr2) {
      var delta, i, j, len1, num;
      // if !arr1? or !arr2? then throw Error 'Two arrays should be passed'
      // if !@isArray(arr1)or!@isArray(arr2) then throw Error 'Two arrays expected'
      delta = [];
      for (i = j = 0, len1 = arr1.length; j < len1; i = ++j) {
        num = arr1[i];
        delta[i] = this.parseUnit(`${arr2[i].value - arr1[i].value}${arr2[i].unit}`);
      }
      return delta;
    }

    isArray(variable) {
      return variable instanceof Array;
    }

    normDashArrays(arr1, arr2) {
      var arr1Len, arr2Len, currItem, i, j, k, lenDiff, ref, ref1, startI;
      // if !arr1? or !arr2? then throw Error 'Two arrays should be passed'
      arr1Len = arr1.length;
      arr2Len = arr2.length;
      if (arr1Len > arr2Len) {
        lenDiff = arr1Len - arr2Len;
        startI = arr2.length;
        for (i = j = 0, ref = lenDiff; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
          currItem = i + startI;
          arr2.push(this.parseUnit(`0${arr1[currItem].unit}`));
        }
      } else if (arr2Len > arr1Len) {
        lenDiff = arr2Len - arr1Len;
        startI = arr1.length;
        for (i = k = 0, ref1 = lenDiff; (0 <= ref1 ? k < ref1 : k > ref1); i = 0 <= ref1 ? ++k : --k) {
          currItem = i + startI;
          arr1.push(this.parseUnit(`0${arr2[currItem].unit}`));
        }
      }
      return [arr1, arr2];
    }

    makeColorObj(color) {
      var alpha, b, colorObj, g, isRgb, r, regexString1, regexString2, result, rgbColor;
      // HEX
      if (color[0] === '#') {
        result = /^#?([a-f\d]{1,2})([a-f\d]{1,2})([a-f\d]{1,2})$/i.exec(color);
        colorObj = {};
        if (result) {
          r = result[1].length === 2 ? result[1] : result[1] + result[1];
          g = result[2].length === 2 ? result[2] : result[2] + result[2];
          b = result[3].length === 2 ? result[3] : result[3] + result[3];
          colorObj = {
            r: parseInt(r, 16),
            g: parseInt(g, 16),
            b: parseInt(b, 16),
            a: 1
          };
        }
      }
      // not HEX
      // shorthand color and rgb()
      if (color[0] !== '#') {
        isRgb = color[0] === 'r' && color[1] === 'g' && color[2] === 'b';
        // rgb color
        if (isRgb) {
          rgbColor = color;
        }
        if (!isRgb) {
          rgbColor = !this.shortColors[color] ? (this.div.style.color = color, this.computedStyle(this.div).color) : this.shortColors[color];
        }
        regexString1 = '^rgba?\\((\\d{1,3}),\\s?(\\d{1,3}),';
        regexString2 = '\\s?(\\d{1,3}),?\\s?(\\d{1}|0?\\.\\d{1,})?\\)$';
        result = new RegExp(regexString1 + regexString2, 'gi').exec(rgbColor);
        colorObj = {};
        alpha = parseFloat(result[4] || 1);
        if (result) {
          colorObj = {
            r: parseInt(result[1], 10),
            g: parseInt(result[2], 10),
            b: parseInt(result[3], 10),
            a: (alpha != null) && !isNaN(alpha) ? alpha : 1
          };
        }
      }
      return colorObj;
    }

    computedStyle(el) {
      return getComputedStyle(el);
    }

    capitalize(str) {
      if (typeof str !== 'string') {
        throw Error('String expected - nothing to capitalize');
      }
      return str.charAt(0).toUpperCase() + str.substring(1);
    }

    parseRand(string) {
      var rand, randArr, units;
      randArr = string.split(/rand\(|\,|\)/);
      units = this.parseUnit(randArr[2]);
      rand = this.rand(parseFloat(randArr[1]), parseFloat(randArr[2]));
      if (units.unit && randArr[2].match(units.unit)) {
        return rand + units.unit;
      } else {
        return rand;
      }
    }

    parseStagger(string, index) {
      var base, number, splittedValue, unit, unitValue, value;
      value = string.split(/stagger\(|\)$/)[1].toLowerCase();
      // split the value in case it contains base
      // the regex splits 0,0 0,1 1,0 1,1 combos
      // if num taken as 1, rand() taken as 0
      splittedValue = value.split(/(rand\(.*?\)|[^\(,\s]+)(?=\s*,|\s*$)/gim);
      // if contains the base value
      // if just a plain value
      value = splittedValue.length > 3 ? (base = this.parseUnit(this.parseIfRand(splittedValue[1])), splittedValue[3]) : (base = this.parseUnit(0), splittedValue[1]);
      value = this.parseIfRand(value);
      // parse with units
      unitValue = this.parseUnit(value);
      number = index * unitValue.value + base.value;
      // add units only if option had a unit before
      unit = base.isStrict ? base.unit : unitValue.isStrict ? unitValue.unit : '';
      if (unit) {
        return `${number}${unit}`;
      } else {
        return number;
      }
    }

    // ---

      // Method to parse stagger or return the passed value if
    // it has no stagger expression in it.
    parseIfStagger(value, i) {
      if (!(typeof value === 'string' && value.match(/stagger/g))) {
        return value;
      } else {
        return this.parseStagger(value, i);
      }
    }

    // if passed string has rand function then get the rand value
    parseIfRand(str) {
      if (typeof str === 'string' && str.match(/rand\(/)) {
        return this.parseRand(str);
      } else {
        return str;
      }
    }

    // if delta object was passed: like { 20: 75 }
    parseDelta(key, value, index) {
      var curve, delta, easing, end, endArr, endColorObj, i, j, len1, start, startArr, startColorObj;
      // clone the delta object before proceed
      value = this.cloneObj(value);
      // parse delta easing
      easing = value.easing;
      if (easing != null) {
        easing = mojs.easing.parseEasing(easing);
      }
      delete value.easing;
      // parse delta curve
      curve = value.curve;
      if (curve != null) {
        curve = mojs.easing.parseEasing(curve);
      }
      delete value.curve;
      start = Object.keys(value)[0];
      end = value[start];
      delta = {
        start: start
      };
      // color values
      if (isNaN(parseFloat(start)) && !start.match(/rand\(/) && !start.match(/stagger\(/)) {
        if (key === 'strokeLinecap') {
          this.warn(`Sorry, stroke-linecap property is not animatable yet, using the start(${start}) value instead`, value);
          // @props[key] = start;
          return delta;
        }
        startColorObj = this.makeColorObj(start);
        endColorObj = this.makeColorObj(end);
        delta = {
          type: 'color',
          name: key,
          start: startColorObj,
          end: endColorObj,
          easing: easing,
          curve: curve,
          delta: {
            r: endColorObj.r - startColorObj.r,
            g: endColorObj.g - startColorObj.g,
            b: endColorObj.b - startColorObj.b,
            a: endColorObj.a - startColorObj.a
          }
        };
      // color strokeDasharray/strokeDashoffset
      } else if (key === 'strokeDasharray' || key === 'strokeDashoffset' || key === 'origin') {
        startArr = this.strToArr(start);
        endArr = this.strToArr(end);
        this.normDashArrays(startArr, endArr);
        for (i = j = 0, len1 = startArr.length; j < len1; i = ++j) {
          start = startArr[i];
          end = endArr[i];
          this.mergeUnits(start, end, key);
        }
        delta = {
          type: 'array',
          name: key,
          start: startArr,
          end: endArr,
          delta: this.calcArrDelta(startArr, endArr),
          easing: easing,
          curve: curve
        };
      } else {
        if (!this.callbacksMap[key] && !this.tweenOptionMap[key]) {
          // position values defined in unitOptionMap
          if (this.unitOptionMap[key]) {
            end = this.parseUnit(this.parseStringOption(end, index));
            start = this.parseUnit(this.parseStringOption(start, index));
            this.mergeUnits(start, end, key);
            delta = {
              type: 'unit',
              name: key,
              start: start,
              end: end,
              delta: end.value - start.value,
              easing: easing,
              curve: curve
            };
          } else {
            // not position but numeric values
            end = parseFloat(this.parseStringOption(end, index));
            start = parseFloat(this.parseStringOption(start, index));
            delta = {
              type: 'number',
              name: key,
              start: start,
              end: end,
              delta: end - start,
              easing: easing,
              curve: curve
            };
          }
        }
      }
      return delta;
    }

    mergeUnits(start, end, key) {
      if (!end.isStrict && start.isStrict) {
        end.unit = start.unit;
        return end.string = `${end.value}${end.unit}`;
      } else if (end.isStrict && !start.isStrict) {
        start.unit = end.unit;
        return start.string = `${start.value}${start.unit}`;
      } else if (end.isStrict && start.isStrict) {
        if (end.unit !== start.unit) {
          start.unit = end.unit;
          start.string = `${start.value}${start.unit}`;
          return this.warn(`Two different units were specified on \"${key}\" delta property, mo · js will fallback to end \"${end.unit}\" unit `);
        }
      }
    }

    rand(min, max) {
      return (Math.random() * (max - min)) + min;
    }

    isDOM(o) {
      var isNode;
      if (o == null) {
        return false;
      }
      // if typeof Node is 'function' then o instanceof Node
      isNode = typeof o.nodeType === 'number' && typeof o.nodeName === 'string';
      return typeof o === 'object' && isNode;
    }

    getChildElements(element) {
      var childNodes, children, i;
      childNodes = element.childNodes;
      children = [];
      i = childNodes.length;
      while (i--) {
        if (childNodes[i].nodeType === 1) {
          children.unshift(childNodes[i]);
        }
      }
      return children;
    }

    delta(start, end) {
      var isType1, isType2, obj, type1, type2;
      type1 = typeof start;
      type2 = typeof end;
      isType1 = type1 === 'string' || type1 === 'number' && !isNaN(start);
      isType2 = type2 === 'string' || type2 === 'number' && !isNaN(end);
      if (!isType1 || !isType2) {
        this.error(`delta method expects Strings or Numbers at input but got - ${start}, ${end}`);
        return;
      }
      obj = {};
      obj[start] = end;
      return obj;
    }

    // ---

      // Returns uniq id

    // @method getUniqID
    // @return {Number}
    getUniqID() {
      return ++this.uniqIDs;
    }

    // ---

      // Returns an uniq id

    // @method parsePath
    // @return {SVGPath}
    parsePath(path) {
      var domPath;
      if (typeof path === 'string') {
        if (path.charAt(0).toLowerCase() === 'm') {
          domPath = document.createElementNS(this.NS, 'path');
          domPath.setAttributeNS(null, 'd', path);
          return domPath;
        } else {
          return document.querySelector(path);
        }
      }
      if (path.style) {
        return path;
      }
    }

    // ---

      // Returns uniq id

    // @method parsePath
    // @return {SVGPath}
    closeEnough(num1, num2, eps) {
      return Math.abs(num1 - num2) < eps;
    }

    // ---

      // Method to check if 3d transform are supported
    checkIf3d() {
      var div, prefixed, style, tr;
      div = document.createElement('div');
      this.style(div, 'transform', 'translateZ(0)');
      style = div.style;
      prefixed = `${this.prefix.css}transform`;
      tr = style[prefixed] != null ? style[prefixed] : style.transform;
      return tr !== '';
    }

    /*
      Method to check if variable holds pointer to an object.
      @param {Any} Variable to test
      @returns {Boolean} If variable is object.
    */
    isObject(variable) {
      return variable !== null && typeof variable === 'object';
    }

    /*
      Method to get first value of the object.
      Used to get end value on ∆s.
      @param {Object} Object to get the value of.
      @returns {Any} The value of the first object' property.
    */
    getDeltaEnd(obj) {
      var key;
      key = Object.keys(obj)[0];
      return obj[key];
    }

    /*
      Method to get first key of the object.
      Used to get start value on ∆s.
      @param {Object} Object to get the value of.
      @returns {String} The key of the first object' property.
    */
    getDeltaStart(obj) {
      var key;
      key = Object.keys(obj)[0];
      return key;
    }

    /*
      Method to check if propery exists in callbacksMap or tweenOptionMap.
      @param {String} Property name to check for
      @returns {Boolean} If property is tween property.
    */
    isTweenProp(keyName) {
      return this.tweenOptionMap[keyName] || this.callbacksMap[keyName];
    }

    /*
      Method to parse string property value
      which can include both `rand` and `stagger `
      value in various positions.
      @param {String} Property name to check for.
      @param {Number} Optional index for stagger.
      @returns {Number} Parsed option value.
    */
    parseStringOption(value, index = 0) {
      if (typeof value === 'string') {
        value = this.parseIfStagger(value, index);
        value = this.parseIfRand(value);
      }
      return value;
    }

    /*
      Method to get the last item of array.
      @private
      @param {Array} Array to get the last item in.
      @returns {Any} The last item of array.
    */
    getLastItem(arr) {
      return arr[arr.length - 1];
    }

    /*
      Method parse HTMLElement.
      @private
      @param {String, Object} Selector string or HTMLElement.
      @returns {Object} HTMLElement.
    */
    parseEl(el) {
      if (h.isDOM(el)) {
        return el;
      } else if (typeof el === 'string') {
        el = document.querySelector(el);
      }
      if (el === null) {
        h.error("Can't parse HTML element: ", el);
      }
      return el;
    }

    /*
      Method force compositor layer on HTMLElement.
      @private
      @param {Object} HTMLElement.
      @returns {Object} HTMLElement.
    */
    force3d(el) {
      this.setPrefixedStyle(el, 'backface-visibility', 'hidden');
      return el;
    }

    /*
      Method to check if value is delta.
      @private
      @param {Any} Property to check.
      @returns {Boolean} If value is delta.
    */
    isDelta(optionsValue) {
      var isObject;
      isObject = this.isObject(optionsValue);
      isObject = isObject && !optionsValue.unit;
      return !(!isObject || this.isArray(optionsValue) || this.isDOM(optionsValue));
    }

  };

  // ---

  // SVG namespace

  // @property   NS
  // @type       {String}
  Helpers.prototype.NS = 'http://www.w3.org/2000/svg';

  // ---

  // CSS styles for console.log/warn/error ::mojs:: badge styling

  // @property   logBadgeCss
  // @type       {String}
  Helpers.prototype.logBadgeCss = 'background:#3A0839;color:#FF512F;border-radius:5px; padding: 1px 5px 2px; border: 1px solid #FF512F;';

  // ---

  // Shortcut map for the 16 standart web colors
  // used to coerce literal name to rgb

  // @property   shortColors
  // @type       {Object}
  // REMOVE WHEN ALL MODULES WILL USE DELTAS CLASS
  Helpers.prototype.shortColors = {
    transparent: 'rgba(0,0,0,0)',
    none: 'rgba(0,0,0,0)',
    aqua: 'rgb(0,255,255)',
    black: 'rgb(0,0,0)',
    blue: 'rgb(0,0,255)',
    fuchsia: 'rgb(255,0,255)',
    gray: 'rgb(128,128,128)',
    green: 'rgb(0,128,0)',
    lime: 'rgb(0,255,0)',
    maroon: 'rgb(128,0,0)',
    navy: 'rgb(0,0,128)',
    olive: 'rgb(128,128,0)',
    purple: 'rgb(128,0,128)',
    red: 'rgb(255,0,0)',
    silver: 'rgb(192,192,192)',
    teal: 'rgb(0,128,128)',
    white: 'rgb(255,255,255)',
    yellow: 'rgb(255,255,0)',
    orange: 'rgb(255,128,0)'
  };

  // ---
  // none-tweenable props
  Helpers.prototype.chainOptionMap = {}; // callbacksContext: 1

  Helpers.prototype.callbacksMap = {
    onRefresh: 1,
    onStart: 1,
    onComplete: 1,
    onFirstUpdate: 1,
    onUpdate: 1,
    onProgress: 1,
    onRepeatStart: 1,
    onRepeatComplete: 1,
    onPlaybackStart: 1,
    onPlaybackPause: 1,
    onPlaybackStop: 1,
    onPlaybackComplete: 1
  };

  Helpers.prototype.tweenOptionMap = {
    duration: 1,
    delay: 1,
    speed: 1,
    repeat: 1,
    easing: 1,
    backwardEasing: 1,
    isYoyo: 1,
    shiftTime: 1,
    isReversed: 1,
    callbacksContext: 1
  };

  Helpers.prototype.unitOptionMap = {
    left: 1,
    top: 1,
    x: 1,
    y: 1,
    rx: 1,
    ry: 1
  };

  // strokeDashPropsMap:
  //   strokeDasharray:  1
  //   # strokeDashoffset: 1
  Helpers.prototype.RAD_TO_DEG = 180 / Math.PI;

  return Helpers;

}).call(this);

h = new Helpers();

module.exports = h;


/***/ }),

/***/ "./src/motion-path.coffee":
/*!********************************!*\
  !*** ./src/motion-path.coffee ***!
  \********************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

// ## MotionPath
// Class for moving object along path or curve

// @class MotionPath
var MotionPath, Timeline, Tween, h, resize;

h = __webpack_require__(/*! ./h */ "./src/h.coffee");

resize = __webpack_require__(/*! vendor/resize */ "./src/vendor/resize.coffee");

Tween = (__webpack_require__(/*! tween/tween */ "./src/tween/tween.babel.js")["default"]);

Timeline = (__webpack_require__(/*! tween/timeline */ "./src/tween/timeline.babel.js")["default"]);

MotionPath = (function() {
  class MotionPath {
    // ---
    // ### Class body docs
    // ---
    constructor(o1 = {}) {
      this.calcHeight = this.calcHeight.bind(this);
      this.o = o1;
      if (this.vars()) {
        return;
      }
      this.createTween();
      this;
    }

    vars() {
      this.getScaler = h.bind(this.getScaler, this);
      this.resize = resize;
      this.props = h.cloneObj(this.defaults);
      this.extendOptions(this.o);
      // reset motionBlur for safari and IE
      this.isMotionBlurReset = h.isSafari || h.isIE;
      this.isMotionBlurReset && (this.props.motionBlur = 0);
      this.history = [h.cloneObj(this.props)];
      return this.postVars();
    }

    // ---

      // Method to transform coordinates and curvature
    // to svg path

    // @method curveToPath

    // @param {Object} coordinates of end point **x** and **y**
    // @param {Object} coordinates of the control point
    //                 of the quadratic bezier curve, relative to
    //                 start and end coordinates **x** and **y**

    // @return {SVGElement} svg path
    curveToPath(o) {
      var curvature, curvatureX, curvatureY, curvePoint, curveXPoint, dX, dY, endPoint, path, percent, radius, rotation, start;
      path = document.createElementNS(h.NS, 'path');
      start = o.start;
      endPoint = {
        x: start.x + o.shift.x,
        y: start.x + o.shift.y
      };
      curvature = o.curvature;
      dX = o.shift.x;
      dY = o.shift.y;
      radius = Math.sqrt(dX * dX + dY * dY);
      percent = radius / 100;
      rotation = Math.atan(dY / dX) * (180 / Math.PI) + 90;
      if (o.shift.x < 0) {
        rotation = rotation + 180;
      }
      // get point on line between start end end
      curvatureX = h.parseUnit(curvature.x);
      curvatureX = curvatureX.unit === '%' ? curvatureX.value * percent : curvatureX.value;
      curveXPoint = h.getRadialPoint({
        center: {
          x: start.x,
          y: start.y
        },
        radius: curvatureX,
        rotate: rotate
      });
      // get control point with center in curveXPoint
      curvatureY = h.parseUnit(curvature.y);
      curvatureY = curvatureY.unit === '%' ? curvatureY.value * percent : curvatureY.value;
      curvePoint = h.getRadialPoint({
        center: {
          x: curveXPoint.x,
          y: curveXPoint.y
        },
        radius: curvatureY,
        rotate: rotation + 90
      });
      path.setAttribute('d', `M${start.x},${start.y} Q${curvePoint.x},${curvePoint.y} ${endPoint.x},${endPoint.y}`);
      return path;
    }

    postVars() {
      this.props.pathStart = h.clamp(this.props.pathStart, 0, 1);
      this.props.pathEnd = h.clamp(this.props.pathEnd, this.props.pathStart, 1);
      this.rotate = 0;
      this.speedX = 0;
      this.speedY = 0;
      this.blurX = 0;
      this.blurY = 0;
      this.prevCoords = {};
      this.blurAmount = 20;
      // clamp motionBlur in range of [0,1]
      this.props.motionBlur = h.clamp(this.props.motionBlur, 0, 1);
      this.onUpdate = this.props.onUpdate;
      if (!this.o.el) {
        h.error('Missed "el" option. It could be a selector, DOMNode or another module.');
        return true;
      }
      this.el = this.parseEl(this.props.el);
      this.props.motionBlur > 0 && this.createFilter();
      this.path = this.getPath();
      if (!this.path.getAttribute('d')) {
        h.error('Path has no coordinates to work with, aborting');
        return true;
      }
      this.len = this.path.getTotalLength();
      this.slicedLen = this.len * (this.props.pathEnd - this.props.pathStart);
      this.startLen = this.props.pathStart * this.len;
      this.fill = this.props.fill;
      if (this.fill != null) {
        this.container = this.parseEl(this.props.fill.container);
        this.fillRule = this.props.fill.fillRule || 'all';
        this.getScaler();
        if (this.container != null) {
          this.removeEvent(this.container, 'onresize', this.getScaler);
          return this.addEvent(this.container, 'onresize', this.getScaler);
        }
      }
    }

    addEvent(el, type, handler) {
      return el.addEventListener(type, handler, false);
    }

    removeEvent(el, type, handler) {
      return el.removeEventListener(type, handler, false);
    }

    createFilter() {
      var div, svg;
      div = document.createElement('div');
      this.filterID = `filter-${h.getUniqID()}`;
      div.innerHTML = `<svg id="svg-${this.filterID}"
    style="visibility:hidden; width:0px; height:0px">
  <filter id="${this.filterID}" y="-20" x="-20" width="40" height="40">
    <feOffset
      id="blur-offset" in="SourceGraphic"
      dx="0" dy="0" result="offset2"></feOffset>
    <feGaussianblur
      id="blur" in="offset2"
      stdDeviation="0,0" result="blur2"></feGaussianblur>
    <feMerge>
      <feMergeNode in="SourceGraphic"></feMergeNode>
      <feMergeNode in="blur2"></feMergeNode>
    </feMerge>
  </filter>
</svg>`;
      svg = div.querySelector(`#svg-${this.filterID}`);
      this.filter = svg.querySelector('#blur');
      this.filterOffset = svg.querySelector('#blur-offset');
      document.body.insertBefore(svg, document.body.firstChild);
      this.el.style['filter'] = `url(#${this.filterID})`;
      return this.el.style[`${h.prefix.css}filter`] = `url(#${this.filterID})`;
    }

    parseEl(el) {
      if (typeof el === 'string') {
        return document.querySelector(el);
      }
      if (el instanceof HTMLElement) {
        return el;
      }
      if (el._setProp != null) {
        this.isModule = true;
        return el;
      }
    }

    getPath() {
      var path;
      path = h.parsePath(this.props.path);
      if (path) {
        return path;
      }
      if (this.props.path.x || this.props.path.y) {
        return this.curveToPath({
          start: {
            x: 0,
            y: 0
          },
          shift: {
            x: this.props.path.x || 0,
            y: this.props.path.y || 0
          },
          curvature: {
            x: this.props.curvature.x || this.defaults.curvature.x,
            y: this.props.curvature.y || this.defaults.curvature.y
          }
        });
      }
    }

    getScaler() {
      var end, size, start;
      this.cSize = {
        width: this.container.offsetWidth || 0,
        height: this.container.offsetHeight || 0
      };
      start = this.path.getPointAtLength(0);
      end = this.path.getPointAtLength(this.len);
      size = {};
      this.scaler = {};
      size.width = end.x >= start.x ? end.x - start.x : start.x - end.x;
      size.height = end.y >= start.y ? end.y - start.y : start.y - end.y;
      switch (this.fillRule) {
        case 'all':
          this.calcWidth(size);
          return this.calcHeight(size);
        case 'width':
          this.calcWidth(size);
          return this.scaler.y = this.scaler.x;
        case 'height':
          this.calcHeight(size);
          return this.scaler.x = this.scaler.y;
      }
    }

    // else @calcBoth(size)
    calcWidth(size) {
      this.scaler.x = this.cSize.width / size.width;
      return !isFinite(this.scaler.x) && (this.scaler.x = 1);
    }

    calcHeight(size) {
      this.scaler.y = this.cSize.height / size.height;
      return !isFinite(this.scaler.y) && (this.scaler.y = 1);
    }

    run(o) {
      var fistItem, key, value;
      if (o) {
        fistItem = this.history[0];
        for (key in o) {
          value = o[key];
          if (h.callbacksMap[key] || h.tweenOptionMap[key]) {
            h.warn(`the property \"${key}\" property can not be overridden on run yet`);
            delete o[key];
          } else {
            this.history[0][key] = value;
          }
        }
        this.tuneOptions(o);
      }
      return this.startTween();
    }

    createTween() {
      this.tween = new Tween({
        duration: this.props.duration,
        delay: this.props.delay,
        yoyo: this.props.yoyo,
        repeat: this.props.repeat,
        easing: this.props.easing,
        onStart: () => {
          var ref;
          return (ref = this.props.onStart) != null ? ref.apply(this) : void 0;
        },
        onComplete: () => {
          var ref;
          this.props.motionBlur && this.setBlur({
            blur: {
              x: 0,
              y: 0
            },
            offset: {
              x: 0,
              y: 0
            }
          });
          return (ref = this.props.onComplete) != null ? ref.apply(this) : void 0;
        },
        onUpdate: (p) => {
          return this.setProgress(p);
        },
        onFirstUpdate: (isForward, isYoyo) => {
          if (!isForward) {
            return this.history.length > 1 && this.tuneOptions(this.history[0]);
          }
        }
      });
      this.timeline = new Timeline(); // onUpdate:(p)=> @o.onChainUpdate?(p)
      this.timeline.add(this.tween);
      !this.props.isRunLess && this.startTween();
      return this.props.isPresetPosition && this.setProgress(0, true);
    }

    startTween() {
      return setTimeout((() => {
        var ref;
        return (ref = this.timeline) != null ? ref.play() : void 0;
      }), 1);
    }

    setProgress(p, isInit) {
      var len, point, x, y;
      len = this.startLen + (!this.props.isReverse ? p * this.slicedLen : (1 - p) * this.slicedLen);
      point = this.path.getPointAtLength(len);
      // get x and y coordinates
      x = point.x + this.props.offsetX;
      y = point.y + this.props.offsetY;
      this._getCurrentRotation(point, len, p);
      this._setTransformOrigin(p);
      this._setTransform(x, y, p, isInit);
      return this.props.motionBlur && this.makeMotionBlur(x, y);
    }

    setElPosition(x, y, p) {
      var composite, isComposite, rotate, transform;
      rotate = this.rotate !== 0 ? `rotate(${this.rotate}deg)` : '';
      isComposite = this.props.isCompositeLayer && h.is3d;
      composite = isComposite ? 'translateZ(0)' : '';
      transform = `translate(${x}px,${y}px) ${rotate} ${composite}`;
      return h.setPrefixedStyle(this.el, 'transform', transform);
    }

    setModulePosition(x, y) {
      this.el._setProp({
        shiftX: `${x}px`,
        shiftY: `${y}px`,
        rotate: this.rotate
      });
      return this.el._draw();
    }

    _getCurrentRotation(point, len, p) {
      var atan, isTransformFunOrigin, prevPoint, x1, x2;
      isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
      if (this.props.isRotation || (this.props.rotationOffset != null) || isTransformFunOrigin) {
        prevPoint = this.path.getPointAtLength(len - 1);
        x1 = point.y - prevPoint.y;
        x2 = point.x - prevPoint.x;
        atan = Math.atan(x1 / x2);
        !isFinite(atan) && (atan = 0);
        this.rotate = atan * h.RAD_TO_DEG;
        if ((typeof this.props.rotationOffset) !== 'function') {
          return this.rotate += this.props.rotationOffset || 0;
        } else {
          return this.rotate = this.props.rotationOffset.call(this, this.rotate, p);
        }
      } else {
        return this.rotate = 0;
      }
    }

    _setTransform(x, y, p, isInit) {
      var transform;
      // get real coordinates relative to container size
      if (this.scaler) {
        x *= this.scaler.x;
        y *= this.scaler.y;
      }
      // call onUpdate but not on the very first(0 progress) call
      transform = null;
      if (!isInit) {
        transform = typeof this.onUpdate === "function" ? this.onUpdate(p, {
          x: x,
          y: y,
          rotate: this.rotate
        }) : void 0;
      }
      // set position and rotatation
      // 1: if motion path is for module
      if (this.isModule) {
        return this.setModulePosition(x, y);
      } else {
        // if string was returned from the onUpdate call
        // then set this string to the @el
        // 2: if motion path is for DOM node
        if (typeof transform !== 'string') {
          return this.setElPosition(x, y, p);
        } else {
          return h.setPrefixedStyle(this.el, 'transform', transform);
        }
      }
    }

    _setTransformOrigin(p) {
      var isTransformFunOrigin, tOrigin;
      if (this.props.transformOrigin) {
        isTransformFunOrigin = typeof this.props.transformOrigin === 'function';
        // transform origin could be a function
        tOrigin = !isTransformFunOrigin ? this.props.transformOrigin : this.props.transformOrigin(this.rotate, p);
        return h.setPrefixedStyle(this.el, 'transform-origin', tOrigin);
      }
    }

    makeMotionBlur(x, y) {
      var absoluteRotation, coords, dX, dY, signX, signY, tailRotation;
      // if previous coords are not defined yet -- set speed to 0
      tailRotation = 0;
      signX = 1;
      signY = 1;
      if ((this.prevCoords.x == null) || (this.prevCoords.y == null)) {
        this.speedX = 0;
        this.speedY = 0;
      } else {
        // else calculate speed based on the largest axes delta
        dX = x - this.prevCoords.x;
        dY = y - this.prevCoords.y;
        if (dX > 0) {
          signX = -1;
        }
        if (signX < 0) {
          signY = -1;
        }
        this.speedX = Math.abs(dX);
        this.speedY = Math.abs(dY);
        tailRotation = Math.atan(dY / dX) * (180 / Math.PI) + 90;
      }
      absoluteRotation = tailRotation - this.rotate;
      coords = this.rotToCoords(absoluteRotation);
      // get blur based on speed where 1px per 1ms is very fast
      // and motionBlur coefficient
      this.blurX = h.clamp((this.speedX / 16) * this.props.motionBlur, 0, 1);
      this.blurY = h.clamp((this.speedY / 16) * this.props.motionBlur, 0, 1);
      this.setBlur({
        blur: {
          x: 3 * this.blurX * this.blurAmount * Math.abs(coords.x),
          y: 3 * this.blurY * this.blurAmount * Math.abs(coords.y)
        },
        offset: {
          x: 3 * signX * this.blurX * coords.x * this.blurAmount,
          y: 3 * signY * this.blurY * coords.y * this.blurAmount
        }
      });
      // save previous coords
      this.prevCoords.x = x;
      return this.prevCoords.y = y;
    }

    setBlur(o) {
      if (!this.isMotionBlurReset) {
        this.filter.setAttribute('stdDeviation', `${o.blur.x},${o.blur.y}`);
        this.filterOffset.setAttribute('dx', o.offset.x);
        return this.filterOffset.setAttribute('dy', o.offset.y);
      }
    }

    extendDefaults(o) {
      var key, results, value;
      results = [];
      for (key in o) {
        value = o[key];
        results.push(this[key] = value);
      }
      return results;
    }

    extendOptions(o) {
      var key, results, value;
      results = [];
      for (key in o) {
        value = o[key];
        results.push(this.props[key] = value);
      }
      return results;
    }

    then(o) {
      var it, key, opts, prevOptions, value;
      prevOptions = this.history[this.history.length - 1];
      opts = {};
      for (key in prevOptions) {
        value = prevOptions[key];
        if (!h.callbacksMap[key] && !h.tweenOptionMap[key] || key === 'duration') {
          if (o[key] == null) {
            o[key] = value;
          }
        } else {
          // if property is callback and not defined in then options -
          // define it as undefined :) to override old callback,
          // because we are inside the prevOptions hash and it means
          // the callback was previously defined
          if (o[key] == null) {
            o[key] = void 0;
          }
        }
        // get animation timing values to feed the tween
        if (h.tweenOptionMap[key]) {
          // copy all props, if prop is duration - fallback to previous value
          opts[key] = key !== 'duration' ? o[key] : o[key] != null ? o[key] : prevOptions[key];
        }
      }
      this.history.push(o);
      it = this;
      opts.onUpdate = (p) => {
        return this.setProgress(p);
      };
      opts.onStart = () => {
        var ref;
        return (ref = this.props.onStart) != null ? ref.apply(this) : void 0;
      };
      opts.onComplete = () => {
        var ref;
        return (ref = this.props.onComplete) != null ? ref.apply(this) : void 0;
      };
      opts.onFirstUpdate = function() {
        return it.tuneOptions(it.history[this.index]);
      };
      opts.isChained = !o.delay;
      this.timeline.append(new Tween(opts));
      return this;
    }

    tuneOptions(o) {
      this.extendOptions(o);
      return this.postVars();
    }

    rotToCoords(rotation) {
      var radRotation, x, y;
      rotation = rotation % 360;
      radRotation = ((rotation - 90) * Math.PI) / 180;
      x = Math.cos(radRotation);
      y = Math.sin(radRotation);
      x = x < 0 ? Math.max(x, -0.7) : Math.min(x, .7);
      y = y < 0 ? Math.max(y, -0.7) : Math.min(y, .7);
      return {
        x: x * 1.428571429,
        y: y * 1.428571429
      };
    }

  };

  // ---
  // ### Defaults/APIs
  // ---
  MotionPath.prototype.defaults = {
    // Defines motion path or arc to animate **el's** position.

    // Can be defined
    //   - by **String**:
    //     - **CSS selector** e.g. '#js-path', '.path' etc
    //     - **SVG path** [line commands](https://goo.gl/LzvV6P)
    //       e.g 'M0,0 L100, 300'
    //   - by **SVGPathElement** e.g document.getElementById('#js-path')
    //   - by **Arc shift** e.g { x: 200, y: 100 }. If motion path was defined by
    //     arc shift, [curvature option](#property-curvature)
    //     defines arc curvature.

    // @property   path
    // @type       {String, SVGPathElement, Object}

    // @codepen CSS selector:      https://codepen.io/sol0mka/pen/emqbLN/
    // @codepen SVG line commands: https://codepen.io/sol0mka/pen/dPxaMm/
    // @codepen SVGPathElement:    https://codepen.io/sol0mka/pen/xbvMyj/
    // @codepen Arc shift:         https://codepen.io/sol0mka/pen/QweYKW/
    path: null,
    // ---

    // Defines curve size for path defined by arc shift.
    // Curvature amount can be defined by number representing *px*
    // or percents(string) representing amount relative to shift length.
    // @example
    //   { x: 200, y: 100 } or { x: '50%', y: '20%' } or mix
    // @example
    //   // will fallback to defaults for omitted axes
    //   { x: 200 }   // fallbacks to { x: 200, y: '50%' }
    //   { y: '25%' } // fallbacks to { x: '75%', y: '25%' }

    // @property   curvature
    // @type       {Object}

    // @codepen https://codepen.io/sol0mka/pen/vEobbM/
    curvature: {
      x: '75%',
      y: '50%'
    },
    // ---

    // Defines if composite layer should be forced on el to prevent
    // paint during animation.
    // @type       {Boolean}
    isCompositeLayer: true,
    // ---

    // Delay before animation starts, *ms*
    // @property   delay
    // @type       {Number}

    // @codepen https://codepen.io/sol0mka/pen/wBVNLM/
    delay: 0,
    // ---

    // Duration of animation, *ms*
    // @property   duration
    // @type       {Number}
    duration: 1000,
    // ---

    // Easing. The option will be passed to tween.parseEasing method.
    // Please see the [tween module](tween.coffee.html#parseEasing) for
    // all avaliable options.

    // @property   easing
    // @type       {String, Function, Array}

    // @codepen String:              https://codepen.io/sol0mka/pen/GgVeKR/
    // @codepen Bezier cubic curve:  https://codepen.io/sol0mka/pen/WbVmeo/
    // @codepen Custom function:     https://codepen.io/sol0mka/pen/XJvGrE/
    easing: null,
    // ---

    // Animation repeat count
    // @property   repeat
    // @type       {Integer}

    // @codepen https://codepen.io/sol0mka/pen/emqbLN/
    repeat: 0,
    // ---

    // Defines if animation should be alternated on repeat.

    // @property   yoyo
    // @type       {Boolean}

    // @codepen https://codepen.io/sol0mka/pen/gbVEbb/
    yoyo: false,
    // ---

    // Callback **onStart** fires once if animation was started.

    // @property   onStart
    // @type       {Function}

    // @codepen https://codepen.io/sol0mka/pen/VYoRRe/
    onStart: null,
    // ---

    // Callback **onComplete** fires once if animation was completed.

    // @property   onComplete
    // @type       {Function}

    // @codepen https://codepen.io/sol0mka/pen/ZYgPPm/
    onComplete: null,
    // ---

    // Callback **onUpdate** fires every raf frame on motion
    // path update. Recieves **progress** of type **Number**
    // in range *[0,1]* as argument.

    // @property   onUpdate
    // @type       {Function}

    // @codepen https://codepen.io/sol0mka/pen/YPmgMq/
    onUpdate: null,
    // ---

    // Defines additional horizontal offset from center of path, *px*
    // @property   offsetX
    // @type       {Number}

    // @codepen https://codepen.io/sol0mka/pen/gbVEbb/
    offsetX: 0,
    // ---

    // Defines additional vertical offset from center of path, *px*
    // @property   offsetY
    // @type       {Number}

    // @codepen https://codepen.io/sol0mka/pen/OPKqNN/
    offsetY: 0,
    // ---

    // Defines rotation offset for path curves
    // @property   rotationOffset
    // @type       {Number, Function}
    // @example
    //   // function
    //   new MotionPath({
    //     //...
    //     rotationOffset: function(currentRotation) {
    //       return if (currentRotation < 0) { 90 } else {-90}
    //     }
    //   });

    // @codepen Number:    https://codepen.io/sol0mka/pen/JogzXw
    // @codepen Function:  https://codepen.io/sol0mka/pen/MYNxer
    rotationOffset: null,
    // ---

    // Defines lower bound for path coordinates in rangle *[0,1]*
    // So specifying pathStart of .5 will start animation
    // form the 50% progress of your path.
    // @property   pathStart
    // @type       {Number}
    // @example
    //   // function
    //   new MotionPath({
    //     //...
    //     pathStart: .5
    //   });

    // @codepen https://codepen.io/sol0mka/pen/azeMBQ/
    pathStart: 0,
    // ---

    // Defines upper bound for path coordinates in rangle *[0,1]*
    // So specifying pathEnd of .5 will end animation
    // at the 50% progress of your path.
    // @property   pathEnd
    // @type       {Number}
    // @example
    //   // function
    //   new MotionPath({
    //     //...
    //     pathEnd: .5
    //   });

    // @codepen https://codepen.io/sol0mka/pen/wBVOJo/
    pathEnd: 1,
    // ---

    // Defines motion blur on element in range of *[0,1]*

    // @property   motionBlur
    // @type       {Number}
    motionBlur: 0,
    // ---

    // Defines transform-origin CSS property for **el**.
    // Can be defined by **string** or **function**.
    // Function recieves current rotation as agrumnet and
    // should return transform-origin value as a strin.

    // @property   transformOrigin
    // @type       {String, Function}
    // @example
    //   // function
    //   new MotionPath({
    //     //...
    //     isRotation: true,
    //     transformOrigin: function (currentRotation) {
    //       return  6*currentRotation + '% 0';
    //     }
    //   });

    // @codepen Function:  https://codepen.io/sol0mka/pen/pvMYwp
    transformOrigin: null,
    // ---

    // Defines if path curves rotation should be set to el.

    // @property   isRotation
    // @type       {Boolean}
    // @codepen https://codepen.io/sol0mka/pen/GgVexq/
    isRotation: false,
    // ---

    // Defines motion path direction.

    // @property   isReverse
    // @type       {Boolean}
    // @codepen https://codepen.io/sol0mka/pen/KwOERQ/
    isReverse: false,
    // ---

    // Defines if animation should not start after init.
    // Animation can be then started with calling [run]() method.

    // @property   isRunLess
    // @type       {Boolean}

    // @codepen *Please see at codepen for proper results*:
    // https://codepen.io/sol0mka/pen/raXRKQ/
    isRunLess: false,
    // ---

    // Defines if **el's** position should be preset immediately after init.
    // If set to false **el** will remain at it's position until
    // actual animation started on delay end or [run]() method call.

    // @property   isPresetPosition
    // @type       {Boolean}

    // @codepen https://codepen.io/sol0mka/pen/EaqMOJ/
    isPresetPosition: true
  };

  return MotionPath;

}).call(this);

// x: Math.cos(radRotation), y: Math.sin(radRotation)
module.exports = MotionPath;


/***/ }),

/***/ "./src/shapes/circle.coffee":
/*!**********************************!*\
  !*** ./src/shapes/circle.coffee ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// ignore coffescript sudo code
var Bit, Circle;

Bit = (__webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js")["default"]);

Circle = class Circle extends Bit {
  _declareDefaults() {
    super._declareDefaults();
    return this._defaults.shape = 'ellipse';
  }

  _draw() {
    var rx, ry;
    rx = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
    ry = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
    this._setAttrIfChanged('rx', rx);
    this._setAttrIfChanged('ry', ry);
    this._setAttrIfChanged('cx', this._props.width / 2);
    this._setAttrIfChanged('cy', this._props.height / 2);
    // @_setAttrIfChanged 'cx', @_props.width/2
    // @_setAttrIfChanged 'cy', @_props.height/2
    // @setAttrsIfChanged rx: rx, ry: ry, cx: @_props.x, cy: @_props.y
    return super._draw();
  }

  _getLength() {
    var radiusX, radiusY;
    radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
    radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
    // Math.pow is needed for safari's 6.0.5 odd bug
    // pow = Math.pow;
    return 2 * Math.PI * Math.sqrt((radiusX * radiusX + radiusY * radiusY) / 2);
  }

};

module.exports = Circle;


/***/ }),

/***/ "./src/shapes/cross.coffee":
/*!*********************************!*\
  !*** ./src/shapes/cross.coffee ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// ignore coffescript sudo code
var Bit, Cross;

Bit = (__webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js")["default"]);

Cross = class Cross extends Bit {
  // shape: 'path'
  _declareDefaults() {
    super._declareDefaults();
    return this._defaults.tag = 'path';
  }

  _draw() {
    var d, isRadiusX, isRadiusY, line1, line2, p, radiusX, radiusY, x, x1, x2, y, y1, y2;
    super._draw();
    p = this._props;
    radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
    radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
    isRadiusX = radiusX === this._prevRadiusX;
    isRadiusY = radiusY === this._prevRadiusY;
    // skip if nothing changed
    if (isRadiusX && isRadiusY) {
      return;
    }
    x = this._props.width / 2;
    y = this._props.height / 2;
    x1 = x - radiusX;
    x2 = x + radiusX;
    line1 = `M${x1},${y} L${x2},${y}`;
    y1 = y - radiusY;
    y2 = y + radiusY;
    line2 = `M${x},${y1} L${x},${y2}`;
    d = `${line1} ${line2}`;
    this.el.setAttribute('d', d);
    // save the properties
    this._prevRadiusX = radiusX;
    return this._prevRadiusY = radiusY;
  }

  _getLength() {
    var radiusX, radiusY;
    radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
    radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
    return 2 * (radiusX + radiusY);
  }

};

module.exports = Cross;


/***/ }),

/***/ "./src/shapes/equal.coffee":
/*!*********************************!*\
  !*** ./src/shapes/equal.coffee ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// ignore coffescript sudo code
var Bit, Equal;

Bit = (__webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js")["default"]);

Equal = class Equal extends Bit {
  // shape: 'path'
  // ratio: 1.43
  _declareDefaults() {
    super._declareDefaults();
    this._defaults.tag = 'path';
    return this._defaults.points = 2;
  }

  _draw() {
    var d, i, isPoints, isRadiusX, isRadiusY, j, p, radiusX, radiusY, ref, x, x1, x2, y, yStart, yStep;
    super._draw();
    p = this._props;
    if (!this._props.points) {
      return;
    }
    radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
    radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
    isRadiusX = radiusX === this._prevRadiusX;
    isRadiusY = radiusY === this._prevRadiusY;
    isPoints = p.points === this._prevPoints;
    // skip if nothing changed
    if (isRadiusX && isRadiusY && isPoints) {
      return;
    }
    x = this._props.width / 2;
    y = this._props.height / 2;
    x1 = x - radiusX;
    x2 = x + radiusX;
    d = '';
    yStep = 2 * radiusY / (this._props.points - 1);
    yStart = y - radiusY;
    for (i = j = 0, ref = this._props.points; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      y = `${i * yStep + yStart}`;
      d += `M${x1}, ${y} L${x2}, ${y} `;
    }
    this.el.setAttribute('d', d);
    // save the properties
    this._prevPoints = p.points;
    this._prevRadiusX = radiusX;
    return this._prevRadiusY = radiusY;
  }

  _getLength() {
    return 2 * (this._props.radiusX != null ? this._props.radiusX : this._props.radius);
  }

};

module.exports = Equal;


/***/ }),

/***/ "./src/shapes/line.coffee":
/*!********************************!*\
  !*** ./src/shapes/line.coffee ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// ignore coffescript sudo code
var Bit, Line;

Bit = (__webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js")["default"]);

Line = class Line extends Bit {
  _declareDefaults() {
    super._declareDefaults();
    return this._defaults.tag = 'line';
  }

  _draw() {
    var radiusX, x, y;
    radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
    x = this._props.width / 2;
    y = this._props.height / 2;
    this._setAttrIfChanged('x1', x - radiusX);
    this._setAttrIfChanged('x2', x + radiusX);
    this._setAttrIfChanged('y1', y);
    this._setAttrIfChanged('y2', y);
    return super._draw();
  }

};

module.exports = Line;


/***/ }),

/***/ "./src/shapes/polygon.coffee":
/*!***********************************!*\
  !*** ./src/shapes/polygon.coffee ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// ignore coffescript sudo code
var Bit, Polygon, h;

h = __webpack_require__(/*! src/h */ "./src/h.coffee");

Bit = (__webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js")["default"]);

Polygon = class Polygon extends Bit {
  /*
    Method to declare defaults.
    @overrides @ Bit
  */
  _declareDefaults() {
    super._declareDefaults();
    this._defaults.tag = 'path';
    return this._defaults.points = 3;
  }

  /*
    Method to draw the shape.
    @overrides @ Bit
  */
  _draw() {
    var char, d, i, isPoints, isRadiusX, isRadiusY, j, k, len, p, point, radiusX, radiusY, ref, ref1, step;
    p = this._props;
    radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
    radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
    isRadiusX = radiusX === this._prevRadiusX;
    isRadiusY = radiusY === this._prevRadiusY;
    isPoints = p.points === this._prevPoints;
    if (!(isRadiusX && isRadiusY && isPoints)) {
      step = 360 / this._props.points;
      if (this._radialPoints == null) {
        this._radialPoints = [];
      } else {
        this._radialPoints.length = 0;
      }
      for (i = j = 0, ref = this._props.points; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
        this._radialPoints.push(h.getRadialPoint({
          radius: this._props.radius,
          radiusX: this._props.radiusX,
          radiusY: this._props.radiusY,
          rotate: i * step,
          center: {
            x: p.width / 2,
            y: p.height / 2
          }
        }));
      }
      d = '';
      ref1 = this._radialPoints;
      for (i = k = 0, len = ref1.length; k < len; i = ++k) {
        point = ref1[i];
        char = i === 0 ? 'M' : 'L';
        d += `${char}${point.x.toFixed(4)},${point.y.toFixed(4)} `;
      }
      // save the properties
      this._prevPoints = p.points;
      this._prevRadiusX = radiusX;
      this._prevRadiusY = radiusY;
      this.el.setAttribute('d', (d += 'z'));
    }
    return super._draw();
  }

  /*
    Method to get length of the shape.
    @overrides @ Bit
  */
  _getLength() {
    return this._getPointsPerimiter(this._radialPoints);
  }

};

module.exports = Polygon;


/***/ }),

/***/ "./src/shapes/rect.coffee":
/*!********************************!*\
  !*** ./src/shapes/rect.coffee ***!
  \********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// ignore coffescript sudo code
var Bit, Rect;

Bit = (__webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js")["default"]);

Rect = class Rect extends Bit {
  // shape:   'rect'
  // ratio:   1.43
  _declareDefaults() {
    super._declareDefaults();
    this._defaults.tag = 'rect';
    this._defaults.rx = 0;
    return this._defaults.ry = 0;
  }

  // this._defaults.ratio = 1.43
  _draw() {
    var p, radiusX, radiusY;
    super._draw();
    p = this._props;
    radiusX = p.radiusX != null ? p.radiusX : p.radius;
    radiusY = p.radiusY != null ? p.radiusY : p.radius;
    this._setAttrIfChanged('width', 2 * radiusX);
    this._setAttrIfChanged('height', 2 * radiusY);
    this._setAttrIfChanged('x', (p.width / 2) - radiusX);
    this._setAttrIfChanged('y', (p.height / 2) - radiusY);
    this._setAttrIfChanged('rx', p.rx);
    return this._setAttrIfChanged('ry', p.ry);
  }

  _getLength() {
    var radiusX, radiusY;
    radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
    radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
    return 2 * (2 * radiusX + 2 * radiusY);
  }

};

module.exports = Rect;


/***/ }),

/***/ "./src/shapes/shapesMap.coffee":
/*!*************************************!*\
  !*** ./src/shapes/shapesMap.coffee ***!
  \*************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {

var Bit, BitsMap, Circle, Cross, Curve, Custom, Equal, Line, Polygon, Rect, Zigzag, h;

h = __webpack_require__(/*! src/h */ "./src/h.coffee");

Bit = (__webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js")["default"]);

Custom = (__webpack_require__(/*! ./custom */ "./src/shapes/custom.babel.js")["default"]);

Circle = __webpack_require__(/*! ./circle */ "./src/shapes/circle.coffee");

Line = __webpack_require__(/*! ./line */ "./src/shapes/line.coffee");

Zigzag = __webpack_require__(/*! ./zigzag */ "./src/shapes/zigzag.coffee");

Rect = __webpack_require__(/*! ./rect */ "./src/shapes/rect.coffee");

Polygon = __webpack_require__(/*! ./polygon */ "./src/shapes/polygon.coffee");

Cross = __webpack_require__(/*! ./cross */ "./src/shapes/cross.coffee");

Curve = (__webpack_require__(/*! ./curve */ "./src/shapes/curve.babel.js")["default"]);

Equal = __webpack_require__(/*! ./equal */ "./src/shapes/equal.coffee");

BitsMap = (function() {
  class BitsMap {
    constructor() {
      this.addShape = h.bind(this.addShape, this);
    }

    getShape(name) {
      return this[name] || h.error(`no \"${name}\" shape available yet, please choose from this list:`, ['circle', 'line', 'zigzag', 'rect', 'polygon', 'cross', 'equal', 'curve']);
    }

    /*
      Method to add shape to the map.
      @public
      @param {String} Name of the shape module.
      @param {Object} Shape module class.
    */
    addShape(name, Module) {
      return this[name] = Module;
    }

  };

  BitsMap.prototype.bit = Bit;

  BitsMap.prototype.custom = Custom;

  BitsMap.prototype.circle = Circle;

  BitsMap.prototype.line = Line;

  BitsMap.prototype.zigzag = Zigzag;

  BitsMap.prototype.rect = Rect;

  BitsMap.prototype.polygon = Polygon;

  BitsMap.prototype.cross = Cross;

  BitsMap.prototype.equal = Equal;

  BitsMap.prototype.curve = Curve;

  return BitsMap;

}).call(this);

module.exports = new BitsMap();


/***/ }),

/***/ "./src/shapes/zigzag.coffee":
/*!**********************************!*\
  !*** ./src/shapes/zigzag.coffee ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// ignore coffescript sudo code
var Bit, Zigzag;

Bit = (__webpack_require__(/*! ./bit */ "./src/shapes/bit.babel.js")["default"]);

Zigzag = class Zigzag extends Bit {
  _declareDefaults() {
    super._declareDefaults();
    this._defaults.tag = 'path';
    return this._defaults.points = 3;
  }

  // @_defaults.ratio = 1.43;
  _draw() {
    var currentX, currentY, delta, i, isPoints, isRadiusX, isRadiusY, j, length, p, points, radiusX, radiusY, ref, stepX, x, y, yFlip;
    super._draw();
    p = this._props;
    if (!this._props.points) {
      return;
    }
    radiusX = this._props.radiusX != null ? this._props.radiusX : this._props.radius;
    radiusY = this._props.radiusY != null ? this._props.radiusY : this._props.radius;
    isRadiusX = radiusX === this._prevRadiusX;
    isRadiusY = radiusY === this._prevRadiusY;
    isPoints = p.points === this._prevPoints;
    // skip if nothing changed
    if (isRadiusX && isRadiusY && isPoints) {
      return;
    }
    x = p.width / 2;
    y = p.height / 2;
    currentX = x - radiusX;
    currentY = y;
    stepX = (2 * radiusX) / (p.points - 1);
    yFlip = -1;
    delta = Math.sqrt(stepX * stepX + radiusY * radiusY);
    length = -delta;
    points = `M${currentX}, ${y} `;
    for (i = j = 0, ref = p.points; (0 <= ref ? j < ref : j > ref); i = 0 <= ref ? ++j : --j) {
      points += `L${currentX}, ${currentY} `;
      currentX += stepX;
      length += delta;
      currentY = yFlip === -1 ? y - radiusY : y;
      yFlip = -yFlip;
    }
    this._length = length;
    this.el.setAttribute('d', points);
    // save the properties
    this._prevPoints = p.points;
    this._prevRadiusX = radiusX;
    return this._prevRadiusY = radiusY;
  }

  _getLength() {
    return this._length;
  }

};

module.exports = Zigzag;


/***/ }),

/***/ "./src/vendor/resize.coffee":
/*!**********************************!*\
  !*** ./src/vendor/resize.coffee ***!
  \**********************************/
/***/ ((module, exports) => {

var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
  LegoMushroom @legomushroom https://github.com/legomushroom/resize
  MIT License 2014
*/
(function() {
  var Main;
  Main = class Main {
    constructor(o = {}) {
      this.o = o;
      if (window.isAnyResizeEventInited) {
        return;
      }
      this.vars();
      this.redefineProto();
    }

    vars() {
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
    }

    redefineProto() {
      var i, it, proto, t;
      it = this;
      return t = (function() {
        var j, len, ref, results;
        ref = this.allowedProtos;
        results = [];
        for (i = j = 0, len = ref.length; j < len; i = ++j) {
          proto = ref[i];
          if (proto.prototype == null) {
            continue;
          }
          results.push((function(proto) {
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
        return results;
      }).call(this);
    }

    handleResize(args) {
      var computedStyle, el, iframe, isEmpty, isNoPos, isStatic, ref;
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
        if ((ref = iframe.contentWindow) != null) {
          ref.onresize = (e) => {
            return this.dispatchEvent(el);
          };
        }
        el.iframe = iframe;
      } else {
        this.initTimer(el);
      }
      return el.isAnyResizeEventInited = true;
    }

    initTimer(el) {
      var height, width;
      width = 0;
      height = 0;
      return this.interval = setInterval(() => {
        var newHeight, newWidth;
        newWidth = el.offsetWidth;
        newHeight = el.offsetHeight;
        if (newWidth !== width || newHeight !== height) {
          this.dispatchEvent(el);
          width = newWidth;
          return height = newHeight;
        }
      }, this.o.interval || 62.5);
    }

    dispatchEvent(el) {
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
    }

    destroy() {
      var i, it, j, len, proto, ref, results;
      clearInterval(this.interval);
      this.interval = null;
      window.isAnyResizeEventInited = false;
      it = this;
      ref = this.allowedProtos;
      results = [];
      for (i = j = 0, len = ref.length; j < len; i = ++j) {
        proto = ref[i];
        if (proto.prototype == null) {
          continue;
        }
        results.push((function(proto) {
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
      return results;
    }

  };
  if (true) {
    return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function() {
      return new Main();
    }).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})();


/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayLikeToArray)
/* harmony export */ });
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
  return arr2;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _arrayWithHoles)
/* harmony export */ });
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _assertThisInitialized)
/* harmony export */ });
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/classCallCheck.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _classCallCheck)
/* harmony export */ });
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/createClass.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/createClass.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _createClass)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(descriptor.key), descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  Object.defineProperty(Constructor, "prototype", {
    writable: false
  });
  return Constructor;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/defineProperty.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/defineProperty.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _defineProperty)
/* harmony export */ });
/* harmony import */ var _toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toPropertyKey.js */ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js");

function _defineProperty(obj, key, value) {
  key = (0,_toPropertyKey_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key);
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/get.js":
/*!********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/get.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _get)
/* harmony export */ });
/* harmony import */ var _superPropBase_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./superPropBase.js */ "./node_modules/@babel/runtime/helpers/esm/superPropBase.js");

function _get() {
  if (typeof Reflect !== "undefined" && Reflect.get) {
    _get = Reflect.get.bind();
  } else {
    _get = function _get(target, property, receiver) {
      var base = (0,_superPropBase_js__WEBPACK_IMPORTED_MODULE_0__["default"])(target, property);
      if (!base) return;
      var desc = Object.getOwnPropertyDescriptor(base, property);
      if (desc.get) {
        return desc.get.call(arguments.length < 3 ? target : receiver);
      }
      return desc.value;
    };
  }
  return _get.apply(this, arguments);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _getPrototypeOf)
/* harmony export */ });
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inherits.js":
/*!*************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inherits.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _inherits)
/* harmony export */ });
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  Object.defineProperty(subClass, "prototype", {
    writable: false
  });
  if (superClass) (0,_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _iterableToArrayLimit)
/* harmony export */ });
function _iterableToArrayLimit(arr, i) {
  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
  if (null != _i) {
    var _s,
      _e,
      _x,
      _r,
      _arr = [],
      _n = !0,
      _d = !1;
    try {
      if (_x = (_i = _i.call(arr)).next, 0 === i) {
        if (Object(_i) !== _i) return;
        _n = !1;
      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
    } catch (err) {
      _d = !0, _e = err;
    } finally {
      try {
        if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return;
      } finally {
        if (_d) throw _e;
      }
    }
    return _arr;
  }
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js":
/*!********************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _nonIterableRest)
/* harmony export */ });
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js":
/*!******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js ***!
  \******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _possibleConstructorReturn)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./assertThisInitialized.js */ "./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js");


function _possibleConstructorReturn(self, call) {
  if (call && ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(call) === "object" || typeof call === "function")) {
    return call;
  } else if (call !== void 0) {
    throw new TypeError("Derived constructors may only return object or undefined");
  }
  return (0,_assertThisInitialized_js__WEBPACK_IMPORTED_MODULE_1__["default"])(self);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _setPrototypeOf)
/* harmony export */ });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };
  return _setPrototypeOf(o, p);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/slicedToArray.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _slicedToArray)
/* harmony export */ });
/* harmony import */ var _arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayWithHoles.js */ "./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js");
/* harmony import */ var _iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./iterableToArrayLimit.js */ "./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js");
/* harmony import */ var _unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./unsupportedIterableToArray.js */ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js");
/* harmony import */ var _nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./nonIterableRest.js */ "./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js");




function _slicedToArray(arr, i) {
  return (0,_arrayWithHoles_js__WEBPACK_IMPORTED_MODULE_0__["default"])(arr) || (0,_iterableToArrayLimit_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arr, i) || (0,_unsupportedIterableToArray_js__WEBPACK_IMPORTED_MODULE_2__["default"])(arr, i) || (0,_nonIterableRest_js__WEBPACK_IMPORTED_MODULE_3__["default"])();
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/superPropBase.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/superPropBase.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _superPropBase)
/* harmony export */ });
/* harmony import */ var _getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js");

function _superPropBase(object, property) {
  while (!Object.prototype.hasOwnProperty.call(object, property)) {
    object = (0,_getPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object);
    if (object === null) break;
  }
  return object;
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js":
/*!****************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPrimitive.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPrimitive)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");

function _toPrimitive(input, hint) {
  if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(input) !== "object" || input === null) return input;
  var prim = input[Symbol.toPrimitive];
  if (prim !== undefined) {
    var res = prim.call(input, hint || "default");
    if ((0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(res) !== "object") return res;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (hint === "string" ? String : Number)(input);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/toPropertyKey.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _toPropertyKey)
/* harmony export */ });
/* harmony import */ var _typeof_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./typeof.js */ "./node_modules/@babel/runtime/helpers/esm/typeof.js");
/* harmony import */ var _toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./toPrimitive.js */ "./node_modules/@babel/runtime/helpers/esm/toPrimitive.js");


function _toPropertyKey(arg) {
  var key = (0,_toPrimitive_js__WEBPACK_IMPORTED_MODULE_1__["default"])(arg, "string");
  return (0,_typeof_js__WEBPACK_IMPORTED_MODULE_0__["default"])(key) === "symbol" ? key : String(key);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/typeof.js":
/*!***********************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/typeof.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _typeof)
/* harmony export */ });
function _typeof(obj) {
  "@babel/helpers - typeof";

  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  }, _typeof(obj);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ _unsupportedIterableToArray)
/* harmony export */ });
/* harmony import */ var _arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./arrayLikeToArray.js */ "./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js");

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return (0,_arrayLikeToArray_js__WEBPACK_IMPORTED_MODULE_0__["default"])(o, minLen);
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./dev/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! src/mojs.babel.js */ "./src/mojs.babel.js");
/* harmony import */ var _mojs_player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @mojs/player */ "./node_modules/@mojs/player/build/mojs-player.min.js");
/* harmony import */ var _mojs_player__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_mojs_player__WEBPACK_IMPORTED_MODULE_1__);
// cSpell: ignore mojs inplace



// TODO: marbleOptions => Switch between "circle" & "rectangle"

const ORANGE  = "#f59d56";
const GREEN   = "#aded94";
const MAGENTA = "#bd81fb";
const RED     = "#ee695a"

const downArrow = "&#8681;";
const upArrow   = "&#8679;";

const xDiff              = 536 - 22;
const leftBracketX       = 22;
const leftBracket2X      = 536;
const leftBracketY       = 84;
const leftMarbleX        = 64;
const marbleRadius       = 16;
const marbleWidth        = 38;
const bracketWidth       = 12;
const bracketPadding     = 14;
const bracketRightMargin = 22;
const rightArrowX        = 460;
const rightArrowY        = 76;

const IN_PLACE = "IN_PLACE";
const IMMUTABLE = "IMMUTABLE";
const methods = {
  push: { type: IN_PLACE },
  pop: { type: IN_PLACE },
  shift: { type: IN_PLACE },
  unshift: { type: IN_PLACE },
  slice: { type: IMMUTABLE },
  map: { type: IMMUTABLE },
  filter: { type: IMMUTABLE },
  flat: { type: IMMUTABLE },
  slice: { type: IMMUTABLE },
  concat: { type: IMMUTABLE },
  join: { type: IMMUTABLE }
}

function getPosFromProps(props) {
  return parseInt(props.x.split("px")[0]);
}

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function initializeMethod({
  el,
  jsCode,
  methodSyntax,
  methodName,
  creatorFunction,
  active = false,
  indexed = true
}) {

  const methodId = uuid();
  const hashString = '#data=' + encodeURIComponent(
    JSON.stringify({
      code: jsCode
        .split("\n")
        .map(line => {
          return line.trimStart();
        })
        .join("\n")
    })
  );

  const html = `
    <main>
      <div class="demo-init-wrapper">
        <button class="demo-init">&#9658; Play</button>
        <button class="demo-reset">Reset</button>
        <a class="mdn-docs" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/${methodName}" target="_blank">Docs<a/>
      </div>
      <div class="code-show" id="code-show-${methodId}">
        <button class="code-show-btn">
          <span class="arrow">${active ? upArrow : downArrow}</span>
          <span class="text">${active ? "Hide Code" : "Show Code"}</span>
        </button>
        <button class="js-playground-btn">
          <span class="js-arrow">${downArrow}</span>
          <span class="text">Practice</span>
        </button>
      </div>
      </main>
      <pre class="code ${active ? "active" : ""}"></pre>
      <iframe
        class="js-playground"
        width="800"
        height="300"
        loading="lazy"
        frameborder="0"
        src="//unpkg.com/javascript-playgrounds@^1.0.0/public/index.html${hashString}"
      ></iframe>
  `

  if (!methodName) {
    throw new Error("ERROR: methodName not provided.")
  }

  const isImmutable = methods[methodName].type === IMMUTABLE;
  const className = "demo-container " + (isImmutable ? "immutable" : "inplace");
  el.setAttribute("class", className);
  el.style.position = "relative";
  el.insertAdjacentHTML(
    "afterbegin",
    html
  );

  const parent = el.querySelector("main");

  const marbleOptions = {
    parent,
    shape: "circle",
    className: indexed ? "mojs-marble indexed" : "mojs-marble",
    radius: marbleRadius,
    isShowStart: true,
    left: leftMarbleX,
    top: 100,
    y: 0
  }

  const rightArrowHTML = `<div class="char" id="long-right-arrow${methodId}">&xrarr;</div>`

  parent.insertAdjacentHTML("afterbegin", rightArrowHTML)

  parent.insertAdjacentHTML(
    "afterbegin",
    `<div class="char method" id="${methodName}">
      ${methodSyntax}
    </div>
    `
  );

  el.querySelector("pre").insertAdjacentHTML(
    "beforeend",
    `<code class="language-javascript">${jsCode}</code>`
  );

  el.querySelector(`#code-show-${methodId} .code-show-btn`).addEventListener("click", () => {

    const preEl = el.querySelector("pre.code");
    const arrow = el.querySelector("span.arrow");
    const arrowText = el.querySelector("button span.text");
    if (preEl.classList.contains("active")) {
      arrow.innerHTML = downArrow;
      arrowText.textContent = "Show Code";
      return preEl.classList.remove("active");
    }
    arrowText.textContent = "Hide Code";
    arrow.innerHTML = upArrow;
    return preEl.classList.add("active");
  });

  el.querySelector(`#code-show-${methodId} .js-playground-btn`).addEventListener("click", () => {

    const preEl = el.querySelector(".js-playground");
    const arrow = el.querySelector(".js-arrow");
    if (preEl.classList.contains("active")) {
      arrow.innerHTML = downArrow;
      return preEl.classList.remove("active");
    }
    arrow.innerHTML = upArrow;
    return preEl.classList.add("active");
  });

  const rightArrow = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: `#long-right-arrow${methodId}`,
    scale: 2,
    x: rightArrowX,
    y: rightArrowY,
    duration: 3000,
  })

  function getBracket({ id, dir = "left", x = 0, y = 0, ...args }) {

    const bracketEl = addBracketElToParent({ dir }, parent);

    return new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({ el: bracketEl, x, y, ...args })

  }

  function addBracketElToParent({ id, dir = "left" }) {

    const bracketEl = document.createElement("div");
    bracketEl.setAttribute("class", "char");
    if (id) {
      bracketEl.setAttribute("id", id);
    }
    bracketEl.textContent = dir === "left" ? "[" : "]";
    parent.appendChild(bracketEl);
    return bracketEl;

  }

  function getQuote({ id, dir = "left", x = 0, y = 0, ...args }) {

    const bracketEl = addQuoteElToParent({ dir }, parent);

    return new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({ el: bracketEl, x, y, ...args })

  }

  function addQuoteElToParent({ id, dir = "left" }) {

    const bracketEl = document.createElement("div");
    bracketEl.setAttribute("class", "char cursive");
    if (id) {
      bracketEl.setAttribute("id", id);
    }
    bracketEl.innerHTML = dir === "left" ? "&ldquo;" : "&rdquo;";
    parent.appendChild(bracketEl);
    return bracketEl;

  }

  function getMarble({ fill = ORANGE, x = 0, y = 0, opacity = 0, index = null, ...args } = {}) {

    return new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Shape({
      ...marbleOptions,
      x,
      opacity: 1,
      fill,
      attrs: typeof index === "number" ? [{ "data-index": index }] : null,
      ...args
    })

  }

  function getMarblesFromInitialX({ count = 0, x = 0, fill, index = false, xOffset = 0, indexOffset = 0, listOfColors = [], bracketed = false, ...args }) {

    if (count === 0) {
      return [];
    }

    const marbles = [];

    for (let i = 0; i < count; i++) {

      const x = (i * marbleWidth) + xOffset + ( bracketed ? 12 : 0 );

      marbles.push(getMarble({
        x,
        fill: listOfColors.length && listOfColors[i] ? listOfColors[i] : fill,
        index: i + indexOffset,
        ...args
      }));

    }

    if ( bracketed ){

      const leftBracket = getBracket({
        x: (marbleWidth) + xOffset - 2,
        y: leftBracketY
      });

      const rightBracket = getBracket({
        x: (marbleWidth * 3 ) + xOffset + bracketWidth - 2,
        y: leftBracketY,
        dir: "right"
      });

    }

    return marbles;

  }

  function getBurst({ delay = 0, left = 0, rotate = 0, top = 0, x = 0, y = 0, radius = 120, fill = GREEN, duration = 2000 }) {

    const burst = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Burst({
      parent: el,
      className: "mojs-burst",
      shape: 'circle',
      left,
      top: leftBracketY + 17,
      x,
      rotate: { 0: rotate },
      y,
      radius: { 0: radius },
      duration,
      children: {
        delay,
        repeat: 0,
        radius: { 6: 2 },
        shape: 'circle',
        fill,
        strokeWidth: { 1: 0 },
        angle: { 360: 0 },
        duration
      },
      count: 20,
    });

    return burst;

  }

  let hasInitialized = false;

  function init(fn) {
    if (!hasInitialized) {
      hasInitialized = true;
      el
        .querySelector(".demo-init")
        .addEventListener("click", fn, { once: true });
      el
        .querySelector(".demo-reset")
        .addEventListener("click", creatorFunction, { once: true });
    }
  }

  return {
    getQuote,
    getMarble,
    getBurst,
    getMarblesFromInitialX,
    getBracket,
    init
  }

}

//>> EXAMPLE #1: push()
(function array_push() {

  // MODIFY >>
  const methodName = "push";
  const code = `
      const letters = [ "A", "B", "C" ];
      letters.push( "D" );

      console.log( letters ); // [ "A", "B", "C", "D" ];`
  const methodSyntax = `.push(<span class="c-space"></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    creatorFunction: array_push,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  const arrayMethodsVisualizedTimeline = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Timeline({ repeat: 1 });
  const inputMarbles = getMarblesFromInitialX({ count: 4, index: true });
  const outputMarbles = getMarblesFromInitialX({ count: 4, index: true, xOffset: xDiff });

  // MODIFY:
  const pushBallInitial = getMarble({
    x: 254,
    duration: 1000,
    fill: GREEN
  });

  // MODIFY:
  const pushBall = getMarble({
    x: { 254: 666 },
    duration: 3000,
    opacity: { 0: 1 },
    fill: GREEN,
    onComplete: () => {
      pushBall.getProps().el.setAttribute("data-index", 4);
    }

  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (4 * marbleWidth) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
        initialRightBracket2X + marbleWidth
    },
    y: leftBracketY,
    duration: 3000,
  });

  new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
    .add(inputMarbles, outputMarbles)

  init(() => {
    pushBall.play()
    rightBracket2.play();
    pushBallInitial.play();
  });

}());

//>> EXAMPLE #2: pop()
(function pop() {

  // MODIFY:
  const methodName = "pop";

  // MODIFY:
  const code = `
      const letters = [ "A", "B", "C", "D" ];
      letters.pop();
      console.log( letters ); // [ "A", "B", "C" ];
      letters.pop();
      letters.pop();
      console.log( letters ); // [ "A" ];
    `
  // MODIFY:
  const methodSyntax = `.pop()`
  // MODIFY:
  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    creatorFunction: pop,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName
  });

  const arrayMethodsVisualizedTimeline = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Timeline({ repeat: 1 });
  const listOfColors = [ORANGE, MAGENTA, RED, GREEN];
  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors
  });
  const outputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    xOffset: xDiff,
    duration: 3000,
    listOfColors
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (4 * marbleWidth) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
        initialRightBracket2X - marbleWidth
    },
    y: leftBracketY,
    duration: 1500,
  });

  // MODIFY:
  new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
    .add(inputMarbles, outputMarbles);

  // MODIFY:
  init(() => {

    const lastOutputMarble = outputMarbles[outputMarbles.length - 1];
    const lastOutputMarbleX = parseInt(lastOutputMarble.getProps().x.split("px")[0]);

    const burst = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Burst({
      parent: demoContainer,
      className: "mojs-burst",
      shape: 'circle',
      left: lastOutputMarbleX + 66,
      top: leftBracketY + 17,
      x: 0,
      y: 0,
      radius: { 0: 120 },
      duration: 2000,
      children: {
        repeat: 0,
        radius: { 6: 2 },
        shape: 'circle',
        fill: GREEN,
        strokeWidth: { 1: 0 },
        angle: { 360: 0 },
        duration: 1000
      },
      count: 20,
    });

    lastOutputMarble.tune({
      duration: 1000,
      opacity: { 1: 0 }
    });

    lastOutputMarble.play();
    burst.play();
    rightBracket2.play();

  });




}());

//>> EXAMPLE #3: shift()
(function array_shift() {

  // MODIFY:
  const methodName = "shift";

  // MODIFY:
  const code = `
      const letters = [ "Z", "A", "B", "C" ];
      letters.shift();
      console.log( letters ); // [ "A", "B", "C" ];
      letters.shift();
      letters.shift();
      console.log( letters ); // [ "C" ];
    `
  // MODIFY:
  const methodSyntax = `.shift()`
  // MODIFY:
  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    creatorFunction: array_shift,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName
  });

  const arrayMethodsVisualizedTimeline = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Timeline({ repeat: 1 });
  const listOfColors = [ORANGE, MAGENTA, RED, GREEN];
  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors
  });
  const outputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    xOffset: xDiff,
    duration: 3000,
    listOfColors
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (4 * marbleWidth) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
        initialRightBracket2X - marbleWidth
    },
    y: leftBracketY,
    duration: 1500,
  });

  // MODIFY:
  new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
    .add(inputMarbles, outputMarbles);

  // MODIFY:
  init(() => {

    const firstOutputMarble = outputMarbles[0];
    const firstOutputMarbleX = parseInt(firstOutputMarble.getProps().x.split("px")[0]);

    outputMarbles.slice(1).forEach((marble, idx) => {

      marble.tune((props) => {
        const x = parseInt(props.x.split("px")[0]);
        return {
          x: { [x]: x - marbleWidth },
          duration: 1500,
          onComplete: () => {
            props.el.setAttribute("data-index", idx);
          }
        }
      }).play();

    });

    const burst = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Burst({
      parent: demoContainer,
      className: "mojs-burst",
      shape: 'circle',
      left: firstOutputMarbleX + 66,
      top: leftBracketY + 17,
      x: 0,
      y: 0,
      radius: { 0: 120 },
      duration: 2000,
      children: {
        repeat: 0,
        radius: { 6: 2 },
        shape: 'circle',
        fill: ORANGE,
        strokeWidth: { 1: 0 },
        angle: { 360: 0 },
        duration: 1000
      },
      count: 20,
    });

    firstOutputMarble.tune({
      duration: 1000,
      opacity: { 1: 0 }
    });

    firstOutputMarble.play();
    burst.play();
    rightBracket2.play();

  });


}());

//>> EXAMPLE #4: unshift()
(function unshift() {

  // MODIFY >>
  const methodName = "unshift";
  const code = `
      const letters = [ "B", "C", "D" ];
      letters.unshift( "A" );

      console.log( letters ); // [ "A", "B", "C", "D" ];
    `
  const methodSyntax = `.unshift(<span class="c-space"></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";

  const { init, getBracket, getMarble, getMarblesFromInitialX } = initializeMethod({
    creatorFunction: unshift,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    indexed: false
  });

  const arrayMethodsVisualizedTimeline = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Timeline({ repeat: 1 });
  const inputMarbles = getMarblesFromInitialX({ count: 4, index: true });
  const outputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    xOffset: xDiff,
    duration: 3000
  });

  // MODIFY:
  const initialX = 283;
  const pushBallInitial = getMarble({
    x: initialX,
    duration: 1000,
    fill: GREEN
  });

  // MODIFY:
  const pushBall = getMarble({
    x: { [initialX]: xDiff },
    duration: 3000,
    opacity: { 0: 1 },
    fill: GREEN,
    onComplete: () => {
      pushBall.getProps().el.setAttribute("data-index", 0);
    }

  })

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (4 * marbleWidth) + bracketPadding;

  const rightBracket2 = getBracket({
    dir: "right",
    x: {
      [initialRightBracket2X]:
        initialRightBracket2X + marbleWidth
    },
    y: leftBracketY,
    duration: 3000,
  });

  new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  arrayMethodsVisualizedTimeline
    .add(inputMarbles, outputMarbles)

  // MODIFY:
  init(() => {
    pushBall.play()
    rightBracket2.play();
    pushBallInitial.play();

    outputMarbles.forEach((c, i) => {

      const x = parseInt(c.getProps().x.split("px")[0])

      c.tune({
        x: { [x]: x + marbleWidth },
        onComplete: () => {
          c.getProps().el.setAttribute("data-index", i + 1);
        }
      });
      c.play();

    })


  });



}());

//>> EXAMPLE #5: filter()
(function array_filter() {

  // MODIFY >>
  const methodName = "filter";
  const code = `
      const years = [ 2021, 1999, 2004, 2023, 2001 ];
      const lateYears = years.filter( value => value > 2020 );

      console.log( lateYears ); // [ 2021, 2023 ];`
  const methodSyntax = `.filter(<span class="c-space"></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";
  const fadeOutOpacityLevel = 0.3;

  const { init, getBracket, getMarble, getMarblesFromInitialX, getBurst } = initializeMethod({
    creatorFunction: array_filter,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  // MODIFY:
  const pushBallInitialX = 248;
  const pushBallInitial = getMarble({
    x: pushBallInitialX,
    duration: 1000,
    fill: GREEN
  });

  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, GREEN, GREEN, ORANGE]
  });
  const movingMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, GREEN, GREEN, ORANGE]
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - (marbleWidth * 2);

  const rightBracket2 = getBracket({
    dir: "right",
    x: initialRightBracket2X,
    y: leftBracketY,
  });

  new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  // console.log(outputMarbles[0].getProps().x); // 514px
  // console.log(outputMarbles[1].getProps().x); // 552px

  init(() => {

    const burst = getBurst({ left: 314, fill: ORANGE }); // <= 314 <= Imprecise?
    const { x } = movingMarbles[3].getProps();
    const durationSpeed = 1000;

    const fourthMarble = movingMarbles[3].tune(props => {
      const x = getPosFromProps(props);
      return {
        onComplete: () => {
          burst.tune({
            onComplete: function afterBurst() { }
          }).play();
        },
        duration: durationSpeed,
        x: { [x]: pushBallInitialX }
      }
    })
      .then({
        delay: 150,
        opacity: { 1: 0 }
      });

    const thirdMarble = movingMarbles[2]
      .tune(props => {
        const x = getPosFromProps(props);

        return {
          onComplete: function afterThirdMarblePassesCallback() {
            movingMarbles[2].getProps().el.setAttribute("data-index", 1);
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 552 },
        onComplete: function afterThirdMarble() {
          inputMarbles[3].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();
          fourthMarble.play();
        }
      });

    const secondMarble = movingMarbles[1]
      .tune(props => {
        const x = getPosFromProps(props);

        return {
          onComplete: function () {
            movingMarbles[1].getProps().el.setAttribute("data-index", 0);
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 514 },
        onComplete: function afterSecondMarble() {
          inputMarbles[2].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();
          thirdMarble.play();
        }
      });

    const firstMarble = movingMarbles[0].tune(props => {
      const x = getPosFromProps(props);

      inputMarbles[0].tune({
        opacity: { [1]: fadeOutOpacityLevel }
      }).play();

      return {
        onComplete: () => {
          burst.tune({
            onComplete: function afterBurst() {

              rightBracket2
                .then({
                  delay: 900,
                  duration: durationSpeed,
                  x: { [initialRightBracket2X]: initialRightBracket2X + marbleWidth }
                })
                .then({
                  delay: 1800,
                  duration: durationSpeed,
                  x: { [initialRightBracket2X + marbleWidth]: initialRightBracket2X + (marbleWidth * 2) }
                })
                .play();

              inputMarbles[1].tune({
                opacity: { [1]: fadeOutOpacityLevel }
              }).play();

              secondMarble.play();

            }
          }).play();
        },
        duration: durationSpeed,
        x: { [x]: pushBallInitialX }
      }
    })
      .then({
        delay: 150,
        opacity: { 1: 0 }
      });

    firstMarble.play();

  });


}());

//>> EXAMPLE #6: map()
(function array_map() {

  // MODIFY >>
  const methodName = "map";
  const code = `
      const strings = [ "abc", "def", "ghi" ];
      const uppercaseStrings = strings.map( str => str.toUpperCase() );

      console.log( uppercaseStrings ); // [ "ABC", "DEF", "GHI" ];`
  const methodSyntax = `.map(<span class="c-space"></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";
  const fadeOutOpacityLevel = 0.3;

  const { init, getBracket, getMarble, getMarblesFromInitialX, getBurst } = initializeMethod({
    creatorFunction: array_map,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  // MODIFY:
  const pushBallInitialX = 245;
  const pushBallInitial = getMarble({
    x: pushBallInitialX,
    duration: 1000,
    fill: GREEN
  });

  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, ORANGE, ORANGE, ORANGE]
  });
  const movingMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, ORANGE, ORANGE, ORANGE]
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - (marbleWidth * 2);

  const rightBracket2 = getBracket({
    dir: "right",
    x: initialRightBracket2X,
    y: leftBracketY,
  });

  new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  init(() => {

    const burst = getBurst({ left: 314, fill: GREEN, radius: 60, duration: 1000, rotate: 180 }); // <= 314 <= Imprecise?
    const { x } = movingMarbles[3].getProps();
    const durationSpeed = 1000;

    const fourthMarble = movingMarbles[3]
      .tune(props => {
        const x = getPosFromProps(props);
        return {
          onComplete: function afterThirdMarblePassesCallback() {
            burst.tune({
              onComplete: function afterBurst() {
              }
            }).play();
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        fill: GREEN,
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 514 + (marbleWidth * 3) },
        onComplete: function afterThirdMarble() {
        }
      });

    const thirdMarble = movingMarbles[2]
      .tune(props => {
        const x = getPosFromProps(props);
        return {
          onComplete: function afterThirdMarblePassesCallback() {
            burst.tune({
              onComplete: function afterBurst() {
              }
            }).play();
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        fill: GREEN,
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 514 + (marbleWidth * 2) },
        onComplete: function afterThirdMarble() {
          inputMarbles[3].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();
          fourthMarble.play();
        }
      });

    const secondMarble = movingMarbles[1]
      .tune(props => {
        const x = getPosFromProps(props);

        return {
          onComplete: function () {
            burst.tune({
              onComplete: function afterBurst() {
              }
            }).play();
          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      })
      .then({
        fill: GREEN,
        duration: durationSpeed + 500,
        x: { [pushBallInitialX]: 514 + marbleWidth },
        onComplete: function afterSecondMarble() {
          inputMarbles[2].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();
          thirdMarble.play();
        }
      });

    const firstMarble = movingMarbles[0]
      .tune(props => {
        const x = getPosFromProps(props);

        inputMarbles[0].tune({
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        return {
          onComplete: () => {
            rightBracket2
              .then({
                delay: 0,
                duration: durationSpeed,
                x: { [initialRightBracket2X]: initialRightBracket2X + marbleWidth }
              })
              .then({
                delay: 900,
                duration: durationSpeed,
                x: { [initialRightBracket2X + marbleWidth]: initialRightBracket2X + (marbleWidth * 2) }
              })
              .then({
                delay: 1700,
                duration: durationSpeed,
                x: { [initialRightBracket2X + (marbleWidth * 2)]: initialRightBracket2X + (marbleWidth * 3) }
              })
              .then({
                delay: 1500,
                duration: durationSpeed,
                x: { [initialRightBracket2X + (marbleWidth * 3)]: initialRightBracket2X + (marbleWidth * 4) }
              })
              .play();

            burst.tune({
              onComplete: function afterBurst() {
                inputMarbles[1].tune({
                  opacity: { [1]: fadeOutOpacityLevel }
                }).play();

                secondMarble.play();
              }
            }).play();

          },
          duration: durationSpeed,
          x: { [x]: pushBallInitialX }
        }
      }).then({
        fill: GREEN,
        duration: durationSpeed,
        x: { [pushBallInitialX]: 514 }
      })

    firstMarble.play();

  });


}());

//>> EXAMPLE #7: join("-")
(function array_join() {

  // MODIFY >>
  const methodName = "join";
  const code = `
      const letters = [ "J", "a", "v", "a", "S", "c", "r", "i", "p", "t" ];
      const bestLanguage = letters.join("");

      console.log( bestLanguage ); // "JavaScript"`
  const methodSyntax = `.join("<span class="inline-block" id="join-hyphen">-</span>")`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";
  const fadeOutOpacityLevel = 0.3;

  const { init, getBracket, getMarble, getMarblesFromInitialX, getQuote } = initializeMethod({
    creatorFunction: array_join,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  // MODIFY:

  const inputMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, MAGENTA, RED, GREEN]
  });
  const movingMarbles = getMarblesFromInitialX({
    count: 4,
    index: true,
    listOfColors: [ORANGE, MAGENTA, RED, GREEN]
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getQuote({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - 64;

  const durationSpeed = 1000;

  const rightQuote = getQuote({
    dir: "right",
    x: initialRightBracket2X,
    y: leftBracketY,
  }).then({
    delay: 0,
    duration: durationSpeed,
    x: { [initialRightBracket2X]: initialRightBracket2X - 8 + marbleWidth }
  }).then({
    delay: 0,
    duration: durationSpeed,
    x: { [initialRightBracket2X - 8 + marbleWidth]: initialRightBracket2X + (marbleWidth * 2) }
  }).then({
    delay: 0,
    duration: durationSpeed,
    x: { [initialRightBracket2X + (marbleWidth * 2)]: initialRightBracket2X + (marbleWidth * 3) + 8 }
  }).then({
    delay: 0,
    duration: durationSpeed,
    x: { [initialRightBracket2X + (marbleWidth * 3) + 8]: initialRightBracket2X + (marbleWidth * 4) + 16 }
  });

  new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
    y: leftBracketY,
    duration: 3000,
  })

  const joinHyphen = document.querySelector(`#join-hyphen`);

  const clone = joinHyphen.cloneNode(true);

  for (let i = 1; i < 4; i++) {
    const _clone = clone.cloneNode(true);
    _clone.removeAttribute("id");
    _clone.setAttribute("id", "join-hyphen-" + i);
    _clone.setAttribute("class", "join-hyphens");
    joinHyphen.appendChild(_clone);
  }

  const firstHyphen = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: document.querySelector(`#join-hyphen-1`),
    x: 0,
    y: 0,
    duration: 1000
  });

  const secondHyphen = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: document.querySelector(`#join-hyphen-2`),
    x: 0,
    y: 0,
    duration: 1000
  });

  const thirdHyphen = new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: document.querySelector(`#join-hyphen-3`),
    x: 0,
    y: 0,
    duration: 1000
  });

  init(() => {

    const { x } = movingMarbles[3].getProps();

    function onFourthMarbleComplete() {

    }

    function onThirdMarbleComplete() {
      const fourthMarble = movingMarbles[3]
        .tune(props => {
          const x = getPosFromProps(props);

          return {
            onComplete: onFourthMarbleComplete,
            duration: durationSpeed,
            x: { [x]: initialRightBracket2X + (marbleWidth * 2) + 16 }
          }
        }).play();
    }

    function onSecondMarbleComplete() {
      const thirdMarble = movingMarbles[2]
        .tune(props => {
          const x = getPosFromProps(props);

          return {
            onComplete: onThirdMarbleComplete,
            duration: durationSpeed,
            x: { [x]: initialRightBracket2X + marbleWidth + 8 }
          }
        }).play();
    }

    function onFirstMarbleComplete() {

      const secondMarble = movingMarbles[1]
        .tune(props => {
          const x = getPosFromProps(props);

          return {
            onComplete: onSecondMarbleComplete,
            duration: durationSpeed,
            x: { [x]: initialRightBracket2X }
          }
        }).play();

    }

    const firstMarble = movingMarbles[0]
      .tune(props => {
        const x = getPosFromProps(props);

        firstHyphen.then({
          duration: 1000,
          x: { [0]: 300 }
        }).play();

        secondHyphen.then({
          delay: 1000,
          duration: 1000,
          x: { [0]: 300 + marbleWidth + 8 }
        }).play();

        thirdHyphen.then({
          delay: 2000,
          duration: 1000,
          x: { [0]: 300 + (marbleWidth * 2) + 16 }
        }).play();

        inputMarbles[0].tune({
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        inputMarbles[1].tune({
          delay: 1000,
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        inputMarbles[2].tune({
          delay: 2000,
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        inputMarbles[3].tune({
          delay: 3000,
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        rightQuote.play();

        return {
          onComplete: onFirstMarbleComplete,
          duration: durationSpeed,
          x: { [x]: initialRightBracket2X - 8 - marbleWidth }
        }
      });

    firstMarble.play();

  });


}());

//>> EXAMPLE #8: concat()
(function array_concat() {

}());

//>> EXAMPLE #9: flat()
(function array_flat() {

  // MODIFY >>
  const methodName = "flat";
  const code = `
        const unflatted = [ "A", "B", [ "a", "b" ] ];
        const flat = unflatted.flat();

        console.log( flat ); // [ "A", "B", "a", "b" ];

        const deep = [ 1, 2, [ 3, 4, [ 5, 6 ] ] ];
        const flatDeep = deep.flat(2);

        console.log( flatDeep ); // [ 1, 2, 3, 4, 5, 6 ];
  `
  const methodSyntax = `.flat(<span></span>)`
  // << MODIFY

  const demoContainer = document.querySelector(`section#array-${methodName}`);
  demoContainer.innerHTML = "";
  const fadeOutOpacityLevel = 0.3;

  const { init, getBracket, getMarble, getMarblesFromInitialX, getBurst } = initializeMethod({
    creatorFunction: array_flat,
    el: demoContainer,
    jsCode: code,
    methodSyntax,
    methodName,
    active: false
  });

  // MODIFY:
  const inputMarbles = getMarblesFromInitialX({
    count: 2,
    index: true,
    listOfColors: [ORANGE, MAGENTA]
  });
  const inputMarblesNested = getMarblesFromInitialX({
    count: 2,
    index: true,
    bracketed: true,
    xOffset: ( marbleWidth * 2 ),
    indexOffset: 2,
    listOfColors: [RED, GREEN]
  });
  const movingMarbles = getMarblesFromInitialX({
    count: 2,
    index: true,
    listOfColors: [ORANGE, MAGENTA]
  });
  const movingMarblesNested = getMarblesFromInitialX({
    count: 2,
    index: true,
    xOffset: ( marbleWidth * 2 ) + bracketWidth,
    indexOffset: 2,
    listOfColors: [RED, GREEN]
  });

  const leftBracket = getBracket({
    x: leftBracketX,
    y: leftBracketY
  });

  const rightBracket = getBracket({
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + ( bracketWidth * 2 ) + 2,
    y: leftBracketY,
    duration: 3000,
    dir: "right"
  });

  const leftBracket2 = getBracket({
    x: leftBracket2X,
    y: leftBracketY
  });

  const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - (marbleWidth * 2);

  const rightBracket2 = getBracket({
    dir: "right",
    x: initialRightBracket2X,
    y: leftBracketY,
  });

  new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
    el: `#${methodName}`,
    x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin + ( bracketWidth * 2 ),
    y: leftBracketY,
    duration: 3000,
  })

  init(() => {

    const { x } = inputMarblesNested[1].getProps();
    const durationSpeed = 1000;

    const fourthMarble = movingMarblesNested[1]
      .tune(props => {
        const x = getPosFromProps(props);
        return {
          onComplete: function afterThirdMarblePassesCallback() {
          },
          duration: durationSpeed,
          x: { [x]: 514 + (marbleWidth * 3) }
        }
    });
    const thirdMarble = movingMarblesNested[0]
      .tune(props => {
        const x = getPosFromProps(props);
        return {
          onComplete: function afterThirdMarblePassesCallback() {
            inputMarblesNested[1].tune({
              opacity: { [1]: fadeOutOpacityLevel }
            }).play();
            fourthMarble.play();
          },
          duration: durationSpeed,
          x: { [x]: 514 + (marbleWidth * 2) }
        }
      });

    const secondMarble = movingMarbles[1]
      .tune(props => {
        const x = getPosFromProps(props);

        return {
          onComplete: function () {
            inputMarblesNested[0].tune({
              opacity: { [1]: fadeOutOpacityLevel }
            }).play();

            thirdMarble.play();
          },
          duration: durationSpeed,
          x: { [x]: 514 + marbleWidth }
        }
      });

    const firstMarble = movingMarbles[0]
      .tune(props => {
        const x = getPosFromProps(props);

        inputMarbles[0].tune({
          opacity: { [1]: fadeOutOpacityLevel }
        }).play();

        rightBracket2
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X]: initialRightBracket2X + marbleWidth }
          })
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X + marbleWidth]: initialRightBracket2X + (marbleWidth * 2) }
          })
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X + (marbleWidth * 2)]: initialRightBracket2X + (marbleWidth * 3) }
          })
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X + (marbleWidth * 3)]: initialRightBracket2X + (marbleWidth * 4) }
          })
          .play();

        return {
          onComplete: () => {
            inputMarbles[1].tune({
              opacity: { [1]: fadeOutOpacityLevel }
            }).play();
            secondMarble.play();
          },
          duration: durationSpeed,
          x: { [x]: 514 }
        }
      });

    firstMarble.play();

  });

}());

//>> EXAMPLE #10: slice(1,3)
(function array_slice() {

    // MODIFY >>
    const methodName = "slice";
    const code = `
          const toBeSliced = [ "A", "B", "C", "D" ];
          const sliced = toBeSliced.slice(1,3);

          console.log( sliced ); // [ "B", "C" ];
    `
    const methodSyntax = `.slice(<span contenteditable="true">1,3</span>)`
    // << MODIFY

    const demoContainer = document.querySelector(`section#array-${methodName}`);
    demoContainer.innerHTML = "";
    const fadeOutOpacityLevel = 0.3;

    const { init, getBracket, getMarble, getMarblesFromInitialX, getBurst } = initializeMethod({
      creatorFunction: array_slice,
      el: demoContainer,
      jsCode: code,
      methodSyntax,
      methodName,
      active: false
    });

    // MODIFY:
    const inputMarbles = getMarblesFromInitialX({
      count: 4,
      index: true,
      listOfColors: [ORANGE, MAGENTA, RED, GREEN]
    });
    const movingMarbles = getMarblesFromInitialX({
      count: 4,
      index: true,
      listOfColors: [ORANGE, MAGENTA, RED, GREEN]
    });

    const leftBracket = getBracket({
      x: leftBracketX,
      y: leftBracketY
    });

    const rightBracket = getBracket({
      x: leftBracketX + (4 * marbleWidth) + bracketPadding,
      y: leftBracketY,
      duration: 3000,
      dir: "right"
    });

    const leftBracket2 = getBracket({
      x: leftBracket2X,
      y: leftBracketY
    });

    const initialRightBracket2X = leftBracket2X + (2 * marbleWidth) + bracketPadding - (marbleWidth * 2);

    const rightBracket2 = getBracket({
      dir: "right",
      x: initialRightBracket2X,
      y: leftBracketY,
    });

    new src_mojs_babel_js__WEBPACK_IMPORTED_MODULE_0__["default"].Html({
      el: `#${methodName}`,
      x: leftBracketX + (4 * marbleWidth) + bracketPadding + bracketRightMargin,
      y: leftBracketY,
      duration: 3000,
    })

    init(() => {

      const { x } = inputMarbles[1].getProps();
      const durationSpeed = 1000;

      const secondMarble = movingMarbles[1]
        .tune(props => {
          const x = getPosFromProps(props);

          inputMarbles[1].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();

          rightBracket2
          .then({
            delay: 0,
            duration: durationSpeed,
            x: { [initialRightBracket2X]: initialRightBracket2X + (marbleWidth * 2) }
          })
          .play();

          return {
            onComplete: function () {
            },
            duration: durationSpeed * 2,
            x: { [x]: 476 + marbleWidth }
          }
        });

      secondMarble.play();

      const thirdMarble = movingMarbles[2]
        .tune(props => {
          const x = getPosFromProps(props);

          inputMarbles[2].tune({
            opacity: { [1]: fadeOutOpacityLevel }
          }).play();

          return {
            onComplete: function () {
            },
            duration: durationSpeed * 2,
            x: { [x]: 476 + ( marbleWidth * 2 ) }
          }
        });

      thirdMarble.play();

    });

}());

// FILTER METHODS BASED ON TYPE:
const controls            = document.querySelector(".controls");
const playgroundContainer = document.querySelector(".playground-container");
const search              = document.querySelector(".search");
const demoContainers      = document.querySelectorAll(".demo-container");

search.addEventListener("input", e =>{

  let values = [ e.target.value ];

  if ( e.target.value.includes(",") ){
    values = e.target.value
    .split(",")
    .map( m => m.trim() )
    .filter(Boolean);
  }

  demoContainers.forEach( dc =>{

    const isInSearch = values.some( v => dc.id.indexOf(v) > -1 );

    if ( isInSearch ){
      dc.classList.remove("hidden");
    } else {
      dc.classList.add("hidden");
    }

  })

});

(playgroundContainer && controls) && controls.addEventListener("click", e => {

  const type = e.target.id;

  if (type === "inplace") {
    if (playgroundContainer.classList.contains("show-inplace")) {
      e.target.classList.add("inactive");
      playgroundContainer.classList.remove("show-inplace");
    } else {
      e.target.classList.remove("inactive");
      playgroundContainer.classList.add("show-inplace");
    }
  }

  if (type === "immutable") {
    if (playgroundContainer.classList.contains("show-immutable")) {
      e.target.classList.add("inactive");
      playgroundContainer.classList.remove("show-immutable")
    } else {
      e.target.classList.remove("inactive");
      playgroundContainer.classList.add("show-immutable")
    }
  }


})

})();

/******/ })()
;
//# sourceMappingURL=dev.js.map
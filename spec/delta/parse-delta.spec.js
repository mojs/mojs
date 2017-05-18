// const parseDelta = (key, value) => {
//
// };
//
//
// parseDelta = function(key, value, index) {
//   var curve, delta, easing, end, endArr, endColorObj, i, j, len, start, startArr, startColorObj;
//   value = this.cloneObj(value);
//   easing = value.easing;
//   if (easing != null) {
//     easing = mojs.easing.parseEasing(easing);
//   }
//   delete value.easing;
//   curve = value.curve;
//   if (curve != null) {
//     curve = mojs.easing.parseEasing(curve);
//   }
//   delete value.curve;
//   start = Object.keys(value)[0];
//   end = value[start];
//   delta = {
//     start: start
//   };
//   if (isNaN(parseFloat(start)) && !start.match(/rand\(/) && !start.match(/stagger\(/)) {
//     if (key === 'strokeLinecap') {
//       this.warn("Sorry, stroke-linecap property is not animatable yet, using the start(" + start + ") value instead", value);
//       return delta;
//     }
//     startColorObj = this.makeColorObj(start);
//     endColorObj = this.makeColorObj(end);
//     delta = {
//       type: 'color',
//       name: key,
//       start: startColorObj,
//       end: endColorObj,
//       easing: easing,
//       curve: curve,
//       delta: {
//         r: endColorObj.r - startColorObj.r,
//         g: endColorObj.g - startColorObj.g,
//         b: endColorObj.b - startColorObj.b,
//         a: endColorObj.a - startColorObj.a
//       }
//     };
//   } else if (key === 'strokeDasharray' || key === 'strokeDashoffset' || key === 'origin') {
//     startArr = this.strToArr(start);
//     endArr = this.strToArr(end);
//     this.normDashArrays(startArr, endArr);
//     for (i = j = 0, len = startArr.length; j < len; i = ++j) {
//       start = startArr[i];
//       end = endArr[i];
//       this.mergeUnits(start, end, key);
//     }
//     delta = {
//       type: 'array',
//       name: key,
//       start: startArr,
//       end: endArr,
//       delta: this.calcArrDelta(startArr, endArr),
//       easing: easing,
//       curve: curve
//     };
//   } else {
//     if (!this.callbacksMap[key] && !this.tweenOptionMap[key]) {
//       if (this.unitOptionMap[key]) {
//         end = this.parseUnit(this.parseStringOption(end, index));
//         start = this.parseUnit(this.parseStringOption(start, index));
//         this.mergeUnits(start, end, key);
//         delta = {
//           type: 'unit',
//           name: key,
//           start: start,
//           end: end,
//           delta: end.value - start.value,
//           easing: easing,
//           curve: curve
//         };
//       } else {
//         end = parseFloat(this.parseStringOption(end, index));
//         start = parseFloat(this.parseStringOption(start, index));
//         delta = {
//           type: 'number',
//           name: key,
//           start: start,
//           end: end,
//           delta: end - start,
//           easing: easing,
//           curve: curve
//         };
//       }
//     }
//   }
//   return delta;
// };

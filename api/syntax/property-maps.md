# Property Map Syntax

- [CodePen Example](http://codepen.io/sol0mka/pen/WxpGNm?editors=0010)
- [back](/api/readme.md)

`Property Map` array was designed to express sequential values. Often used with `Burst` and `Stagger` modules to generate values that repeat over children length. Basically it is just an array that maps its values to children based on child index with `mod` function. So if you have `property map` with `3 values` and `5 children`, then `4`th and `5`th items will recieve `0`th and `1`st values from the map respecively. Works with any values inside the array.


Full API reference:

```javascript
  // ...
  property : [ 20, { 20 : 0 }, 'rand(0, 20)' ]
  // ...

```

- [CodePen Example](http://codepen.io/sol0mka/pen/WxpGNm?editors=0010)
- [back](/api/readme.md)
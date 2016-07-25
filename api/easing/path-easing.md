# Path Easing

- [CodePen Example](http://codepen.io/sol0mka/pen/c4b415a9167718d3134df04f07ac609b)
- [back](/api/index.md)

The path easing functions can be expressed with string containing `svg` path cordinates or with `easing.path` constructor that returns a function:

```javascript
  // ...
  easing: 'M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0',
  // or
  easing: mojs.easing.path('M0,100 C50,100 50,67.578125 50,50 C50,32.421875 50,0 100,0')
  // ...
```

- [CodePen Example](http://codepen.io/sol0mka/pen/c4b415a9167718d3134df04f07ac609b)
- [back](/api/index.md)
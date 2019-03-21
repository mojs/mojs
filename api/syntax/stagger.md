# Stagger Strings Syntax

- [CodePen Example](https://codepen.io/sol0mka/pen/wWJWVY?editors=0010)
- [back](/api)

Stagger string was designed to express continious numeric values. Often used with `Burst` and `Stagger` modules to generate a value on children with some `step`.  

Takes 2 parameters:

1. `start` - start value for all children.
2. `step`  - step of addition. It gets multiplied by child index and added to the `start`.

Full API reference:

```javascript
  // ...
  property : 'stagger( start, step )'
  // ...

```

- [CodePen Example](https://codepen.io/sol0mka/pen/wWJWVY?editors=0010)
- [back](/api)

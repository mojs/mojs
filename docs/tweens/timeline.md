# Timeline

- [CodePen Example](http://codepen.io/sol0mka/pen/LZWZON?editors=0011)
- [Tween API](./tween.md)
- [back](/api/readme.md)

`Timeline` inherits all properties, callbacks and public methods from `Tween`, the only difference between `Tween` and `Timeline` is that the later doesn't have the `duration` property - it gets calculated from durations/delays of children. Also `Timeline` add two public methods that can recieve children. Please check the Tween API for reference.

Full API reference:

```javascript
const timeline = new mojs.Timeline({

  /* PROPERTIES */

  /* (+) TWEEN PROPERTIES AND CALLBACKS - see Tween API */

  /*
    Note: The timeline inherits all tween properties, callbacks and public methods excluding `duration` property. The `duration` property is computed automatically regarding children tweens and timelines.
  */
  duration:     null

})
  
  /* PUBLIC METHODS */

  /*
    Adds children tweens/timelines to the timeline.
    @param children {Object, Array} Tweens/Timelines or array of such.
  */
  .add( tween ) {}
  /*
    Appends children tweens/timelines to the timeline after the current children.
    @param children {Object, Array} Tweens/Timelines or array of such.
  */
  .append( tween ) {}

  /* (+) TWEEN PUBLIC METHODS - see Tween API */

```

- [CodePen Example](http://codepen.io/sol0mka/pen/LZWZON?editors=0011)
- [Tween API](./tween.md)
- [back](/api/readme.md)

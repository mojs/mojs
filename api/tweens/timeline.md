# Timeline

- [CodePen Example](http://codepen.io/sol0mka/pen/LZWZON)
- [Tween](./tween.md)
- [back](./index.md)

Full API reference:

```javascript
const timeline = new mojs.Timeline({

  /* (+) TWEEN PROPERTIES AND CALLBACKS - see Shape API */

  /*
    Note: The timeline inherits all tween properties and public methods excluding `duration` property. The `duration` property is computed automatically regarding children tweens and timelines.
  */

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

```

- [CodePen Example](http://codepen.io/sol0mka/pen/LZWZON)
- [Timeline](./timeline.md)
- [back](./index.md)

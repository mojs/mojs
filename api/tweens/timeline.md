# Timeline

- [CodePen Example](http://codepen.io/sol0mka/pen/LZWZON)
- [Tween API](./tween.md)
- [back](././index.md)

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

- [CodePen Example](http://codepen.io/sol0mka/pen/LZWZON)
- [Tween API](./tween.md)
- [back](././index.md)

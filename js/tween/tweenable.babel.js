import Tween from './tween';
import Timeline from './timeline';
/*
  Class to define a module ancestor
  with timeline and tween options and functionality.
  All runable modules should inherit from this class.

  @class Tweenable
*/
class Tweenable {
  /*
    play method for the timeline.
    @public
    @returns this.
  */
  play () {
    this.timeline.play.apply( this.timeline, arguments );
    return this;
  }
  /*
    playBackward method for the timeline.
    @public
    @returns this.
  */
  playBackward () {
    this.timeline.playBackward.apply( this.timeline, arguments );
    return this;
  }
  /*
    pause method for the timeline.
    @public
    @returns this.
  */
  pause () {
    this.timeline.pause.apply( this.timeline, arguments );
    return this;
  }
  /*
    stop method for the timeline.
    @public
    @returns this.
  */
  stop () {
    this.timeline.stop.apply( this.timeline, arguments );
    return this;
  }
  /*
    setProgress method for the timeline.
    @public
    @returns this.
  */
  setProgress () {
    
    this.timeline.setProgress.apply( this.timeline, arguments );
    return this;
  }
  
  // ^ API methods.
  // v Private methods.
  
  constructor ( o = {} ) {
    this._o = o;
    this._transformTweenOptions();
    this._makeTween();
    this._makeTimeline();
  }
  /*
    Placeholder method that should be overrided
    and will be called before tween/timeline creation.
    @private
  */
  _transformTweenOptions () {}
  /*
    Method to create tween.
    @private
  */
  _makeTween () {
    // pass callbacks context
    this._o.callbacksContext = this;
    this.tween = new Tween( this._o );
  }
  /*
    Method to create timeline.
    @private
    @param {Object} Timeline's options.
                    An object which contains "timeline" property with
                    timeline options.
  */
  _makeTimeline () {
    // pass callbacks context
    this._o.timeline = this._o.timeline || {};
    this._o.timeline.callbacksContext = this;
    this.timeline = new Timeline( this._o.timeline );
    // if tween exist - add it to the timeline there
    // is some modules like stagger that have no tween
    this.tween && this.timeline.add( this.tween );
  }
}
 
export default Tweenable;

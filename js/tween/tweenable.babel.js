// import h from './h';
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
  */
  play () { this._timeline.play.apply( this._timeline, arguments ); }
  /*
    playBackward method for the timeline.
    @public
  */
  playBackward () {
    this._timeline.playBackward.apply( this._timeline, arguments );
  }
  /*
    pause method for the timeline.
    @public
  */
  pause () {
    this._timeline.pause.apply( this._timeline, arguments );
  }
  /*
    stop method for the timeline.
    @public
  */
  stop () {
    this._timeline.stop.apply( this._timeline, arguments );
  }
  /*
    setProgress method for the timeline.
    @public
  */
  setProgress () {
    this._timeline.setProgress.apply( this._timeline, arguments );
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
  _makeTween () { this._tween = new Tween( this._o ); }
  /*
    Method to create timeline.
    @private
    @param {Object} Timeline's options.
                    An object which contains "timeline" property with
                    timeline options.
  */
  _makeTimeline () {
    this._timeline = new Timeline( this._o.timeline );
    // if tween exist - add it to the timeline there
    // is some modules like stagger that have no tween
    this._tween && this._timeline.add( this._tween );
  }
}
 
export default Tweenable;

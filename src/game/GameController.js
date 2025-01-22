import {
  PointSpaceTime,
  MovingPointSpaceTime,
  AcceleratingPointSpaceTime,
} from "../../vendor/nice-things/math4d";


class GameController {

  static _instance = null;

  static get instance() {
    return this._instance;
  }

  /** Bindables **/
  static update({ dt }) {

    PointSpaceTime.update( dt );

  }


  constructor( viewport, scenes={}, has_orientation_controls=false ) {
    if (GameController.instance) return GameController.instance;

    this._update = GameController.update.bind(this);
    viewport.addEventListener( 'update', this._update );

    this.viewport = viewport;

    this.scenes = scenes;

    //  Use has_orientation_controls to help determine precise type of player controls available.
    //    Should also check for touchscreen availability even if PC?
    this.playerController = playerController;

    GameController._instance = this;

  }




}


export default GameController;
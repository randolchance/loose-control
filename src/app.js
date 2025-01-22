import Viewport from "../vendor/three-viewport/src/viewport";
import { is } from "../vendor/nice-things/utils";
import GameController from "./game/GameController";


const { PI, round } = Math;

const QUARTER_REV = PI / 2;

const ORIENTATION_ENUM = {
  N: 0,
  E: 1,
  S: 2,
  W: 3,
}


class App {

  /** Bindables */
  static onOrientationChange({ target }) {
    const { angle } = target;

    this._screen_orientation = round( angle / 90 );

    this._updateScreenAngle();

  }

  static onRotationChange({ alpha }) {

    this.alpha = alpha;

  }

  constructor( element ) {

    this.container = element;

    const { width, height } = element.getBoundingClientRect();
    const params = { element }

    const viewport = new Viewport( 'main', { width, height }, params );
    this.viewport = viewport;

    const primary = viewport.createNormalLayer('main-scene');
    primary.scenemaster.createScene('canopy');
    primary.scenemaster.createScene('world');

    const html = viewport.createCssLayer('main-scene-html-overlay');
    html.scenemaster.createScene('world-html-overlay');

    const overlay = viewport.createNormalLayer('main-scene-overlay');

    this._layers = {
      primary,
      html,
      overlay,
    }

    this._scenes = {
      primary: primary.scenemaster.masterscene,
      html: html.scenemaster.masterscene,
      overlay: overlay.scenemaster.masterscene,
    }

    this.controller = new GameController( viewport );

    this._orientation = 0;
    this._alpha = 0;

    if (window.DeviceOrientationEvent) {

      this._onOrientationChange = App.onOrientationChange.bind(this);
      screen.orientation.addEventListener( 'change', this._onOrientationChange, { passive: true } );

      this._onRotationChange = App.onRotationChange.bind(this);
      window.addEventListener( 'deviceorientation', this._onRotationChange, { passive: true } );

    }

  }

  get layers() {
    return this._layers;
  }

  get scenes() {
    return this._scenes;
  }

  get orientation() {
    return this._orientation;
  }

  set orientation( new_orientation ) {
    if (!Object.values( ORIENTATION_ENUM ).includes( new_orientation )) {

      new_orientation = ORIENTATION_ENUM.N;

    }

    this._orientation = new_orientation;

    this._updateScreenAngle();

  }

  get alpha() {
    return this._alpha;
  }

  set alpha( new_alpha ) {

    this._alpha = new_alpha;

    this._updateScreenAngle();

  }

  get screen_angle() {
    return this.alpha - 90 * this.orientation;
  }

  _updateScreenAngle() {

    this.container.style.setProperty( '--orientation', this.screen_angle );

  }

}


export default App;
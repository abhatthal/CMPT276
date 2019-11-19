import {Scene} from '../Scene.js';
import {Map} from './Map.js';
import {Tooltip} from '../util/Tooltip.js';
import {MapControls} from '../util/MapControls.js';

export class MapScene extends Scene {
  constructor(data) {
    super(data);
    this._layer = new Konva.Layer();

    this.map = new Map({layer: this.layer, stage: data.stage});

    this.tooltips = {
      interaction: new Tooltip({
        x: 0,
        y: 0,
        text: 'E/SPACE\nTO INTERACT',
      }),
      completion: new Tooltip({
        x: data.stage.width() - 400,
        y: 0,
        width: 240,
        text: 'E/SPACE\nTO COMPLETE LEVEL',
      }),
    };

    // create instance of controls here
    this.controls = new MapControls({
      layer: this.layer,
      player: data.player,
      container: data.stage.container(),
      map: this.map,
      tooltips: this.tooltips,
    });
    this.layer.add(data.player.render);
  }

  get layer() {
    return this._layer;
  }

  switchFrom(data) {
    // Doesn't actually unbind yet, bound functions are anonymous
    // check removeControlBindings in MapControls
    this.controls.removeControlBindings();

    // This removes a child froma its parents without needing acces to the parent
    this.layer.remove();
  }

  switchTo(data) {
    const stage = data.stage;
    stage.add(this.layer);
    this.controls.addControlBindings();
    this.layer.draw()
  }
}

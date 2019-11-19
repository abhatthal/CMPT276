import {Player} from './world/Character.js';
import {MapScene} from './world/MapScene.js';
import {FightScene} from './fight/FightScene.js';
import {InventoryScene} from './inventory/InventoryScene.js';

export class Game {
  static initialize() {
    const game = new Game();
    Game.instance = game;
  }

  static getInstance() {
    return Game.instance;
  }

  constructor(data) {
    this.stage = new Konva.Stage({
      container: 'container',
      width: 1000,
      height: 500,
    });

    this.player = new Player({
      x: 40,
      y: this.stage.height() - 80,
      width: 60,
      height: 60,
      image: 'assets/bobby.jpg',
      colour: 'grey',
      hp: 100,
      enableFace: true,
    });

    const container = this.stage.container();
    container.tabIndex = 1;
    container.focus();
  }

  start() {
    this.mapScene = new MapScene({stage: this.stage, player: this.player});
    this.fightScene = new FightScene({stage: this.stage, player: this.player});
    this.inventoryScene = new InventoryScene({stage: this.stage, player: this.player});

    this.current_scene = this.mapScene;
    this.current_scene.switchTo({stage: this.stage, player: this.player});
  }

  switchToFight() {
    this.current_scene.switchFrom({stage: this.stage, player: this.player});
    this.current_scene = this.fightScene;
    this.current_scene.switchTo({stage: this.stage, player: this.player});
  }

  switchToMap() {
    this.current_scene.switchFrom({stage: this.stage, player: this.player});
    this.current_scene = this.mapScene;
    this.current_scene.switchTo({stage: this.stage, player: this.player});
  }

  switchToInventory() {
    this.current_scene.switchFrom({stage: this.stage, player: this.player});
    this.current_scene = this.inventoryScene;
    this.current_scene.switchTo({stage: this.stage, player: this.player});
  }
}
import {Controls} from '../util/Controls.js';
import {Game} from '../Game.js';
import {Item} from '../Item.js';

export class AchievementsControls extends Controls {
  constructor(data) {
    super(data);
    this.tooltips = data.tooltips;
  }

  addControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      self.handleKeyDown(event);
    };

    this.container.addEventListener('keyup', this.handleKeyUpMethod);
    this.container.addEventListener('keydown', this.handleKeyDownMethod);
  }

  removeControlBindings() {
    const self = this;
    this.keys = [];

    this.handleKeyUpMethod = this.handleKeyUpMethod || function(event) {
      self.handleKeyUp(event);
    };
    this.handleKeyDownMethod = this.handleKeyDownMethod || function(event) {
      self.handleKeyDown(event);
    };

    this.container.removeEventListener('keyup', this.handleKeyUpMethod);
    this.container.removeEventListener('keydown', this.handleKeyDownMethod);
  }

  handleKeyUp(event) {
    this.keys[event.keyCode] = false;
  };

  handleKeyDown(event) {
    this.keys[event.keyCode] = true;

    // For debugging purposes, a key 'x' to add an item (achievement)
    if (this.keys[88]) {
      const achievement = new Item({
        name: 'Ya Nerd',
        info: 'ha *dabs*',
      });
      this.player.inventory.add(achievement);
    }

    // p for Achievements menu exit
    if (this.keys[80]) {
      const game = Game.getInstance();
      game.switchToMap();
    }
    // i to open inventory window
    if (this.keys[73]) {
      const game = Game.getInstance();
      game.switchToInventory();
    }
  }
}
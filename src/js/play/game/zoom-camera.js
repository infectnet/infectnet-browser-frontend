import { Group } from 'phaser';

export default class ZoomCamera extends Group {
  constructor(game, parent, name, addToStage, enableBody, physicsBodyType) {
    super(game, parent, name, addToStage, enableBody, physicsBodyType);

    this.scale.setTo(1);
  }

  zoomTo(scale) {
    this.scale.setTo(scale);
  }
}

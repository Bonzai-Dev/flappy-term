import Vector2 from "@equinor/videx-vector2";
import { GameSettings } from "@/config";
import GameObject from "@/modules/gameObjects/gameObject";

export default class Player extends GameObject {
  constructor(position: Vector2 = new Vector2(0, 0)) {
    super(GameSettings.player.sprite , position);
  }

  jump() {
    this.position.y -= 2.5;
  }
}
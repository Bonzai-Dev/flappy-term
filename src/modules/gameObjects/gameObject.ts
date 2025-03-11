import Vector2 from "@equinor/videx-vector2";
import Game from "@/modules/game";
import { Math } from "@/utils";

export default abstract class GameObject {
  position = new Vector2(0, 0);
  sprite: string;

  constructor(sprite: string, position: Vector2, protected game: Game) {
    this.sprite = sprite;
    this.position = position;
  }

  draw(game: Game, position: Vector2) {
    game.screen.put(
      { x: position.x, y: position.y, wrap: false, attr: {}, dx: 1, dy: 0 },
      this.sprite
    );

    this.position = position;
  }

  protected moveTo(to: Vector2, t: number) {
    Math.lerpVector(this.position, to, t);
  }
}
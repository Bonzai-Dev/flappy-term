import { ScreenBufferHD } from "terminal-kit";
import Vector2 from "@equinor/videx-vector2";
import Game from "./game";

export default abstract class GameObject {
  position = new Vector2(0, 0);
  sprite: string;

  constructor(sprite: string) {
    this.sprite = sprite;
  }

  draw(game: Game, position: Vector2) {
    game.screen.put(
      { x: position.x, y: position.y, wrap: false, attr: {}, dx: 1, dy: 0 },
      this.sprite
    );

    this.position = position;
  }
}
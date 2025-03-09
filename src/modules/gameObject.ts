import { ScreenBufferHD } from "terminal-kit";
import Vector2 from "@equinor/videx-vector2";
import Viewport from "./viewport";

export default abstract class GameObject {
  position = new Vector2(0, 0);
  sprite: string;

  constructor(sprite: string, position: Vector2) {
    this.sprite = sprite;
    this.position = position;
  }

  draw(viewport: Viewport) {
    viewport.screen.put(
      { x: this.position.x, y: this.position.y, wrap: false, attr: {}, dx: 1, dy: 0 },
      this.sprite
    );
  }
}
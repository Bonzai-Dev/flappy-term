import Viewport from "./viewport";
import GameObject from "./GameObject";
import Vector2 from "@equinor/videx-vector2";

export default class Player extends GameObject {
  constructor(viewport: Viewport, position: Vector2) {
    const sprite = "🐦";
    super(sprite, position);
  }
}
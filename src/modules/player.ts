import Game from "./game";
import GameObject from "./GameObject";
import Vector2 from "@equinor/videx-vector2";

export default class Player extends GameObject {
  constructor() {
    const sprite = "🐦";
    super(sprite);
  }
}
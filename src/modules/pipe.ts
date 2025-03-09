import Vector2 from "@equinor/videx-vector2";
import Game from "./game";

export default class Pipe {
  readonly gap = 3;
  readonly width = 2;
  private gapPosition = 0; 
  position = new Vector2(0, 0);

  constructor(game: Game) { 
    // Gets the bottom of the gap position
    // Minimum is expected to be 0
    // Maximum is expected to be the height of the screen minus the gap
    this.gapPosition = Math.floor(Math.random() * (game.screen.height - this.gap + 1));
  }
  
  draw(game: Game, position: Vector2) {
    for (let y = 0; y < game.screen.height; y++) {
      if (!(y >= this.gapPosition && y < this.gapPosition + this.gap)) {
        game.screen.put(
          { x: position.x, y: y, wrap: false, attr: {}, dx: 1, dy: 0 },
          "#".repeat(this.width)
        );
      }
    }
  }
}
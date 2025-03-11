import Vector2 from "@equinor/videx-vector2";
import Game from "@/modules/game";
import GameObject from "@/modules/gameObjects/gameObject";
import { GameSettings } from "@/config";

export default class Pipe extends GameObject {
  readonly gap = GameSettings.pipes.holeSize;
  readonly width = GameSettings.pipes.width;
  private gapPosition = 0; 

  constructor(game: Game, position: Vector2) { 
    super("", position, game);

    // Gets the bottom of the gap position
    // Minimum is expected to be 0
    // Maximum is expected to be the height of the screen minus the gap
    this.gapPosition = Math.floor(Math.random() * (game.screen.height - this.gap + 1));

    game.events.on("tick", () => {
      this.position.x -= GameSettings.pipes.speed;
      this.draw(game, this.position);
    });
  }
  
  override draw(game: Game, position: Vector2) {
    for (let y = 0; y < game.screen.height; y++) {
      if (!(y >= this.gapPosition && y < this.gapPosition + this.gap)) {
        game.screen.put(
          { x: position.x, y: y, wrap: false, attr: {}, dx: 1, dy: 0 },
          GameSettings.pipes.sprite.repeat(this.width)
        );
      }
    }
  }
}
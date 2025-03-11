import Vector2 from "@equinor/videx-vector2";
import { GameSettings } from "@/config";
import GameObject from "@/modules/gameObjects/gameObject";
import Game from "../game";

export default class Player extends GameObject {
  private jumping = false;

  constructor(position: Vector2 = new Vector2(0, 0), game: Game) {
    super(GameSettings.player.sprite, position, game);

    game.events.on("tick", () => {
      if (!this.jumping)
        this.position.y += GameSettings.gravity;
      
      this.draw(game, this.position);
    });
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true;
      this.position.y -= GameSettings.player.jumpHeight;
 
      setTimeout(() => {
        this.jumping = false;
      }, 100); 
    }
  }
}

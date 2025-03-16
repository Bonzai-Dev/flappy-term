import Vector2 from "@equinor/videx-vector2";
import GameSettings from "@/config";
import Objects from "@/config/objects";
import Object from "@/modules/objects/object";
import Game from "@/modules/game";
import Pipe from "@/modules/objects/pipe";
 
export default class Player extends Object {
  private jumping = false;

  constructor(position: Vector2 = new Vector2(0, 0), game: Game) {
    super(Objects.player.sprite, position, game);
    game.events.on("tick", () => {
      if (!this.jumping)
        this.position.y += GameSettings.gravity;
      
      if (this.position.y <= GameSettings.textGap)
        this.sprite = "";

      else
        this.sprite = Objects.player.sprite;

      this.draw(game, this.position);
    });
  }

  jump() {
    if (!this.jumping) {
      this.jumping = true;
      this.position.y -= Objects.player.jumpHeight;
 
      setTimeout(() => {
        this.jumping = false;
      }, 100); 
    }
  }

  colliding(pipe: Pipe): boolean {
    if (this.position.x >= pipe.position.x && this.position.x < pipe.position.x + pipe.width) 
      // Checks if the player is within the gap
      if (this.position.y < pipe.gapPosition || this.position.y >= pipe.gapPosition + pipe.gap)
        return true;
  
    return false;
  }

  inGap(pipe: Pipe): boolean {
    if (this.position.x >= pipe.position.x + pipe.width && !pipe.playerInGap)
      if (!(this.position.y < pipe.gapPosition || this.position.y >= pipe.gapPosition + pipe.gap)) {
        pipe.playerInGap = true;
        return true;
      }

    return false;
  }
}

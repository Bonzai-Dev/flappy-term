import { Game, GameObjects } from "@/modules";
import Vector2 from "@equinor/videx-vector2";
import { Inputs, GameSettings } from "@/config";
import { Controls } from "@/utils";

const game = new Game();
const player = new GameObjects.Player(new Vector2(game.screenCenter.x / 2, game.screenCenter.y), game);

let pipe = new GameObjects.Pipe(game, new Vector2(game.screen.width, 0));

game.events.on("tick", async (deltaTime: number) => {  
  if (pipe.position.x < game.screen.width - GameSettings.pipes.pipeGaps) {
    pipe = new GameObjects.Pipe(game, new Vector2(game.screen.width, 0));
  }

});

Controls.keyDown(Inputs.up, () => {
  player.jump();
});

Controls.keyDown(Inputs.quit, () => {
  game.terminate();
});
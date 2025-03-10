import { Game, GameObjects } from "@/modules";
import Vector2 from "@equinor/videx-vector2";
import { Inputs, GameSettings } from "@/config";
import { Controls } from "@/utils";

const game = new Game();

const pipe = new GameObjects.Pipe(game);
pipe.position = new Vector2(game.screenCenter.x, game.screenCenter.y);

const player = new GameObjects.Player(new Vector2(game.screenCenter.x / 2, game.screenCenter.y));

game.tick = () => {
  player.position.y += GameSettings.gravity;
  player.draw(game, player.position);
  pipe.draw(game, pipe.position);
};

// TODO: Instead of detecting hold, detect tap
Controls.keyDown(Inputs.up, () => {
  player.jump();
});

Controls.keyDown(Inputs.quit, () => {
  game.terminate();
});
import { terminal } from "terminal-kit";
import Vector2 from "@equinor/videx-vector2";
import Objects from "@/config/objects";
import Game from "@/modules/game";
import Player from "@/modules/objects/player";
import Pipe from "@/modules/objects/pipe";

const game = new Game();
const player = new Player(
  new Vector2(game.screenCenter.x / 2, game.screenCenter.y),
  game
);
const pipes = [new Pipe(game, new Vector2(game.screen.width, 0))];

game.events.on("tick", async () => {
  for (let i = 0; i < pipes.length; i++) {
    const pipe = pipes[i];
    pipe.position.x -= Objects.pipes.speed;
    pipe.draw(game, pipe.position);

    if (pipe.position.x < 0) 
      pipes.splice(i, 1);

    if (pipes[pipes.length - 1].position.x < game.screen.width - Objects.pipes.pipeGaps)
      pipes.push(new Pipe(game, new Vector2(game.screen.width, 0)));

    if (player.colliding(pipe)) 
      game.terminate();

    if (player.inGap(pipe))
      game.score++;
  }

  if (player.position.y > game.screen.height + Objects.player.deadzone) 
    game.terminate();
});

terminal.on("key", (name: string) => {
  switch (name) {
    case "UP":
      player.jump();
      break;
    case " ":
      player.jump();
      break;
    case "CTRL_C":
      game.terminate();
  }
});

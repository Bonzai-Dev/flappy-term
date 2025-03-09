import { terminal, ScreenBufferHD } from "terminal-kit";
import NextGenEvents from "nextgen-events";
import Vector2 from "@equinor/videx-vector2";
import Player from "./player";
import Pipe from "./pipe";

export default class Game {
  screen = new ScreenBufferHD({
    dst: terminal,
    noFill: false,
    width: terminal.width,
    height: terminal.height,
  });

  private lastFrameTime = Date.now();

  constructor() {
    const pipe = new Pipe(this);
    pipe.position = new Vector2(this.center.x, this.center.y);

    const player = new Player();
    player.position = new Vector2(this.center.x / 2, this.center.y);

    terminal.grabInput(true);
    terminal.on("key", (name: string) => {
      switch (name) {
        case "UP":
          player.position.y -= 2.5;
          break;

        case "CTRL_C":
          this.terminate();
          break;
      }
    });

    terminal.hideCursor();

    terminal.on("exit", () => {
      terminal.reset();
    });

    // Draws each frame
    setInterval(() => {
      this.screen.clear();
      
      player.position.y += 0.15;
      // player.draw(this, player.position);

      pipe.draw(this, pipe.position);
      
      this.screen.draw({ delta: true });
    }, 1000 / 60);
  }

  get center(): Vector2 {
    return new Vector2(this.screen.width / 2, this.screen.height / 2);
  }

  get deltaTime(): number {
    const deltaTime = (Date.now() - this.lastFrameTime) / 1000;
    this.lastFrameTime = Date.now();
    return deltaTime;
  }

  terminate() {
    terminal.grabInput(false);
    setTimeout(function() { process.exit() }, 100);
  }
}

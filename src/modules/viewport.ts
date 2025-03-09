import { terminal, ScreenBufferHD } from "terminal-kit";
import Vector2 from "@equinor/videx-vector2";
import Player from "./player";

export default class Viewport {
  screen = new ScreenBufferHD({
    dst: terminal,
    noFill: false,
    width: terminal.width,
    height: terminal.height,
  });

  constructor() {
    const player = new Player(this, new Vector2(0, 0));

    terminal.on("exit", () => {
      terminal.reset();
    });
    
    // Draws each frame
    setInterval(() => {
      this.screen.clear();

      player.draw(this);

      this.screen.draw({ delta: true });
    }, 1 / 60);
  }

  get center(): Vector2 {
    return new Vector2(this.screen.width / 2, this.screen.height / 2);
  }
}

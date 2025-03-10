import { terminal, ScreenBufferHD } from "terminal-kit";
import Vector2 from "@equinor/videx-vector2";

export default class Game {
  constructor(
    readonly screen = new ScreenBufferHD({
      dst: terminal,
      noFill: false,
      width: terminal.width,
      height: terminal.height,
    })
  ) {
    terminal.grabInput(true);
    terminal.hideCursor();

    terminal.on("exit", () => {
      terminal.reset();
    });

    setInterval(() => {
      this.screen.clear(); 
      this.tick();
      this.screen.draw({ delta: true });
    }, 1000 / 60);
  }

  get screenCenter(): Vector2 {
    return new Vector2(this.screen.width / 2, this.screen.height / 2);
  }

  tick() { }

  terminate() {
    terminal.grabInput(false);
    setTimeout(function () { process.exit() }, 100);
  }
}

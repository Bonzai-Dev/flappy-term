import { terminal, ScreenBufferHD } from "terminal-kit";
import { EventEmitter } from "events";
import Vector2 from "@equinor/videx-vector2";

export default class Game {
  events: EventEmitter = new EventEmitter();
  private deltaTime: number = 0;
  private lastTickTimestamp: number = Date.now();

  readonly screen = new ScreenBufferHD({
    dst: terminal,
    noFill: false,
    width: terminal.width,
    height: terminal.height,
  });

  constructor() {
    terminal.grabInput(true);
    terminal.hideCursor();

    terminal.on("exit", () => {
      terminal.reset();
    });

    setInterval(() => {
      const now = Date.now();
      this.deltaTime = (now - this.lastTickTimestamp) / 1000;
      this.lastTickTimestamp = now;

      this.screen.clear();

      this.tick();
      this.events.emit("tick", this.deltaTime);

      this.screen.draw({ delta: true });
    }, 1000 / 60);
  }

  get screenCenter(): Vector2 {
    return new Vector2(this.screen.width / 2, this.screen.height / 2);
  }

  tick() {}

  terminate() {
    terminal.grabInput(false);
    setTimeout(() => {
      process.exit();
    }, 100);
  }
}

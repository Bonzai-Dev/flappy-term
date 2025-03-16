import { terminal, ScreenBufferHD } from "terminal-kit";
import { EventEmitter } from "events";
import Vector2 from "@equinor/videx-vector2";
import GameSettings from "@/config";

export default class Game {
  events: EventEmitter = new EventEmitter();
  score = 0;

  readonly screen = new ScreenBufferHD({
    dst: terminal,
    noFill: false,
    width: GameSettings.windowSize.x,
    height: GameSettings.windowSize.y,
  });

  constructor() {
    terminal.grabInput(true);
    terminal.hideCursor();

    terminal.on("exit", () => {
      terminal.reset();
    });

    setInterval(() => {
      this.screen.clear();

      this.tick();
      this.events.emit("tick");

      this.drawBorderLine(GameSettings.textGap);
      this.drawBorderLine(this.screen.height - 1);

      this.drawText(`Score: ${this.score}`, new Vector2(0, 0));

      this.screen.draw({ delta: true });
    }, 1000 / 60);
  }

  get screenCenter(): Vector2 {
    return new Vector2(this.screen.width / 2, this.screen.height / 2);
  }

  tick() {}

  terminate() {
    this.drawText("GAME OVER", new Vector2(this.screenCenter.x - 10, this.screenCenter.y - 1));

    terminal.grabInput(false);
    setTimeout(() => {
      process.exit();
    }, 100);
  }

  drawText(text: string, position: Vector2) {
    this.screen.put(
      {
        x: position.x,
        y: position.y,
        wrap: false,
        attr: { },
        dx: 1,
        dy: 0,
      },
      text
    );
  }

  private drawBorderLine(y: number) {
    this.screen.put(
      {
        x: 0,
        y: y,
        wrap: false,
        attr: { },
        dx: 1,
        dy: 0,
      },
      "-".repeat(this.screen.width)
    );
  }
}

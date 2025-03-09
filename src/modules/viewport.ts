import { terminal, ScreenBufferHD } from "terminal-kit";
import Vector2 from "@equinor/videx-vector2";

export default class Viewport {
  private screen = new ScreenBufferHD({
    dst: terminal,
    width: terminal.width,
    height: terminal.height,
  });

  private increment = 0;

  constructor() {
    // // Resize the screen buffer when the terminal is resized
    // terminal.on("resize", () => {
    //   this.screen.resize({
    //     width: terminal.width,
    //     height: terminal.height
    //   });
    // });

    // Drawing on the screen buffer
    setInterval(() => {
      this.screen.clear();

      const center = this.center;
      const x = center.x;
      const y = center.y;

      this.screen.put(
        { x, y, attr: {}, wrap: false, dx: 0, dy: 0 },
        this.increment.toString()
      );
      this.increment++;
      this.screen.draw();
    }, 1000);
  }

  get center(): Vector2 {
    return new Vector2(this.screen.width / 2, this.screen.height / 2);
  }
}

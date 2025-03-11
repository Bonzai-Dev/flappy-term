import { terminal } from "terminal-kit";

export function keyDown(keyMap: { [key: string]: string }, callback: (keyName: string) => void): void {
  terminal.on("key", (name: string) => {
    for (const keyName of Object.keys(keyMap)) {
      const mappedKey = keyMap[keyName];
      
      if (name === mappedKey) {
        callback(keyName);
        break;
      }
    }
  });
  
  terminal.removeListener("key", keyDown); // THIS NO GOOD BUDDY
}

export default { keyDown };

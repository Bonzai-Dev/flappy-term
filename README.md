
# Flappy Term

What is this? Well Flappy Term is a remake of the famous game flappy bird in the terminal, made in TypeScript.

## Known issues
The app is known to not work with the windows terminal when you ssh into a linux machine. Use another ssh client if needed.

## Controls

Space and up arrow to jump
ctrl + c to quit the game

## Development

To test the game during development run.

```bash
  npm run dev
```

Then run this command to play the game. 

```bash
  npm run start
```

## Installation
```bash
git clone https://github.com/Bonzai-Dev/flappy-term.git
cd flappy-term
npm run build
cd dist
node index.js
```

## Building

```bash
npm run build
```

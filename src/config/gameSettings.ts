const GameSettings = {
  gravity: 0.2,
  
  gameStates: {
    running: "running",
    gameOver: "gameOver",
  },

  player: {
    jumpHeight: 3,
    sprite: ">"    
  }, 
  
  pipes: {
    speed: 0.2,
    pipeGaps: 20,
    holeSize: 5,
    width: 2,
    sprite: "#"
  }
}

export default GameSettings;
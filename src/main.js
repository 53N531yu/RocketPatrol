// Oscar Tiong
// Rocket patrol
// Implemented a new timing mechanism that adds time to the clock for successful hits (15). I simply used the "this.clock.elapsed" feature.
// Implemented mouse control for player movement and mouse click to fire (15). I commented out the arrow key movement system and added an event listener for mouse inputs.
// Added a new enemy Sapceship type with new artwork that's smaller, moves faster, and is worth more points (15). I just made a new class for the new ship, which works exactly like the original ship, but with different numbers.

let config = {
  type: Phaser.AUTO,
  width: 640,
  height: 480,
  scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

let keyF, keyR, keyLEFT, keyRIGHT;

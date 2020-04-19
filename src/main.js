/* POINTS BREAKDOWN
   -Create a new scrolling tile sprite for the background (10)
   -Implement the 'FIRE' UI text from the original game (10)
   -Create a new title screen (15)
   -Replace the UI borders with new artwork (15)
   -Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25)
   -Create a new spaceship type that's smaller, moves faster, and is worth more points (25)
*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    newSpaceshipSpeed: 5,
    gameTimer: 60000
}

// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT;
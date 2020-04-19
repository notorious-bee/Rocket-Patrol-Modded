/* POINTS BREAKDOWN
   -Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25)
   -
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
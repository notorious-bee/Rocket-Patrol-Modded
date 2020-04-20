/* ROCKET PATROL Modded (by Kiara Yupangco)
   POINTS BREAKDOWN (with explanation for some of the options)
   -Create a new scrolling tile sprite for the background (10)
        -I want the scrolling background to be more interesting, so adding a gradient and space-themed props makes the game have more feel
   -Implement the 'FIRE' UI text from the original game (10)
   -Create a new title screen (15)
        -Again with the scrolling tile sprite, I feel that the original background feels empty (also I remove the text borders to see the title background more)
   -Replace the UI borders with new artwork (15)
        -Decided to go with a Gameboy Color-esque border (by adding them as images after the blocks of code for rocket, spaceship, and explosion in order to overlap them)
        -Title screen also gets borders for consistency
   -Create new artwork for all of the in-game assets (rocket, spaceships, explosion) (25)
   -Create a new spaceship type that's smaller, moves faster, and is worth more points (25)
        -The smaller spaceship is worth 69 points (nice)
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
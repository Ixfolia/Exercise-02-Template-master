// Exercise 02: RNGolf
// Name: Brady Lin
// Date: 10/27/2023
// Add logic so the ball resets to the bottom on a successful “hole-in”
// Improve shot logic by making the input pointer’s relative x-position shoot the ball in the correct x direction
// Make one obstacle move left/right and bounce against the screen edges

'use strict'

let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 960,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
        },
    },
    scene: [ Play ]
}

let game = new Phaser.Game(config)

let { width, height } = game.config
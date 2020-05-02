class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images/title sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/new_starfield.png');
        this.load.image('small spaceship', './assets/small spaceship.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});

        // load borders
        this.load.image('UI border_up', './assets/UI border_up.png');
        this.load.image('UI border_down', './assets/UI border_down.png');
        this.load.image('UI border_right', './assets/UI border_right.png');
        this.load.image('UI border_left', './assets/UI border_left.png');

        //test
        this.load.spritesheet('crab', './assets/time for crab.png', {frameWidth: 537, frameHeight: 350, startFrame: 0, endFrame: 1});
    }

    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        
        //test
        var crabWalk = this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('crab'),
            framerate: 20,
            repeat: 0
        }),
        var sprite = this.add.sprite(320, 240, 'crab').setScale(3);

        sprite.play('walk');

        sprite.anims.setRepeat(25);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2 - 8, 431, 'rocket').setScale(0.5, 0.5).setOrigin(0, 0);
        
        // add spaceships (x3)
        this.ship01 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0, 0);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0, 0);
        
        // add small spaceship
        this.newShip = new New_Spaceship(this, game.config.width + 150, 150, 'small spaceship', 0, 69).setOrigin(0, 0);
        
        // new rectangle borders
        this.add.image(320, 16, 'UI border_up');
        this.add.image(320, 464, 'UI border_down');
        this.add.image(16, 240, 'UI border_left');
        this.add.image(624, 240, 'UI border_right');

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create( {
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {start: 0, end: 9, first: 0}),
            frameRate: 30
        })

        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.add.text(42, 54, 'SCORE: ', scoreConfig);
        this.scoreLeft = this.add.text(96, 54, this.p1Score, scoreConfig);

        // FIRE UI display
        let fireText = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#1F2463',
            color: '#FFFFFF',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 70
        }
        this.add.text(300, 54, 'FIRE', fireText);

        // game over flag
        this.gameOver = false;
        
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        this.starfield.tilePositionX -= 4;
        this.p1Rocket.update();

        if(!this.gameOver){
            // update rocket sprite
            this.p1Rocket.update();
            // update spaceships (x3)
            this.ship01.update();
            this.ship02.update();
            this.ship03.update();

            // update new spaceship
            this.newShip.update();
        }

        // check collisions
        if(this.checkCollision(this.p1Rocket, this.ship03)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if(this.checkCollision(this.p1Rocket, this.ship02)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if(this.checkCollision(this.p1Rocket, this.ship01)) {
            this.p1Rocket.reset();
            this.shipExplode(this.ship01);
        }

        // check collisions (on new spaceship)
        if(this.checkCollision(this.p1Rocket, this.newShip)) {
            this.p1Rocket.reset();
            this.shipExplode(this.newShip);
        }
    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if(rocket.x < ship.x + ship.width && rocket.x + rocket.width > ship.x && rocket.y < ship.y + ship.height && rocket.height + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');
        boom.on('animationcomplete', () => {
            ship.reset();
            ship.alpha = 1;
            boom.destroy();
        });
        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        this.sound.play('sfx_explosion');
    }
}
class Play extends Phaser.Scene 
{
  constructor()
  {
    super("playScene");
  }

  preload() {
    this.load.image('rocket', './assets/rocket.png');
    this.load.image('spaceship', './assets/spaceship.png');
    this.load.image('fastSpaceship', './assets/FastShip.png');
    this.load.image('starfield', './assets/Background.png');
    this.load.image('Parallax1', './assets/Parallax1.png');
    this.load.image('Parallax2', './assets/Parallax2.png');
    this.load.image('particle', './assets/particle.png');
    this.load.audio('backMusic', './assets/BackgroundMusic.wav');
    this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
  }

  create()
  {
    this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
    this.parallax1 = this.add.tileSprite(0, 0, 640, 480, 'Parallax1').setOrigin(0, 0);
    this.parallax2 = this.add.tileSprite(0, 0, 640, 480, 'Parallax2').setOrigin(0, 0);
    this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
    this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
    this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);
    this.ship01 = new Spaceship(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 30, 1500).setOrigin(0, 0);
    this.ship02 = new Spaceship(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20, 1000).setOrigin(0,0);
    this.ship03 = new Spaceship(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 10, 500).setOrigin(0,0);
    this.ship04 = new fastSpaceship(this, game.config.width + borderUISize*9, borderUISize*7 + borderPadding*6, 'fastSpaceship', 0, 50, 2500).setOrigin(0, 0);
    this.particles = this.add.particles('particle');
    keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
    keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    this.backMusic = this.sound.add('backMusic', {loop: true});
    this.backMusic.play();
    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
      frameRate: 30
  });
  this.p1Score = 0;
  this.p1Time = game.settings.gameTimer;
  let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }
  
  this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
  this.gameOver = false;
  scoreConfig.fixedWidth = 0;
  this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
    this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
    this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
    this.gameOver = true;
  }, null, this);

  }

  update() {
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
      this.backMusic.stop();
      this.scene.restart();
    }
    let timeConfig = {
      fontFamily: 'Courier',
      fontSize: '28px',
      backgroundColor: '#F3B141',
      color: '#843605',
      align: 'right',
      padding: {
        top: 5,
        bottom: 5,
      },
      fixedWidth: 100
    }
    this.timeRight = this.add.text(borderUISize + borderPadding*10, borderUISize + borderPadding*2, Math.floor(this.p1Time/1000), timeConfig);
    this.p1Time -= Math.floor(this.clock.elapsed/1000);
    this.starfield.tilePositionX -= 1;
    this.parallax1.tilePositionX -= 2;
    this.parallax2.tilePositionX -= 3;
    if (!this.gameOver) {   
      this.p1Rocket.update();         // update rocket sprite
      this.ship01.update();           // update spaceships (x3)
      this.ship02.update();
      this.ship03.update();
      this.ship04.update();
    } 
    if(this.checkCollision(this.p1Rocket, this.ship03)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship03);   
    }
    if (this.checkCollision(this.p1Rocket, this.ship02)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship02);
    }
    if (this.checkCollision(this.p1Rocket, this.ship01)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship01);
    }
    if (this.checkCollision(this.p1Rocket, this.ship04)) {
      this.p1Rocket.reset();
      this.shipExplode(this.ship04);
    }
    if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
      this.scene.start("menuScene");
      this.backMusic.stop();
    }
  }

  checkCollision(rocket, ship) {
    if (rocket.x < ship.x + ship.width && 
      rocket.x + rocket.width > ship.x && 
      rocket.y < ship.y + ship.height &&
      rocket.height + rocket.y > ship. y) {
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
    boom.anims.play('explode');             // play explode animation
    boom.on('animationcomplete', () => {    // callback after anim completes
      ship.reset();                         // reset ship position
      ship.alpha = 1;                       // make ship visible again
      boom.destroy();                       // remove explosion sprite
    });
    this.emitter = this.particles.createEmitter({
      x: ship.x,
      y: ship.y,
      speed: { min: -100, max: 100 },
      angle: { min: 0, max: 360 },
      scale: { start: 3, end: 0 },
      lifespan: 300,
      gravityY: 800
    });
    this.emitter.start();
    this.p1Score += ship.points;
    this.scoreLeft.text = this.p1Score;
    this.clock.elapsed -= ship.time;
    this.p1Time += ship.time;
    this.timeRight.text = this.p1Time;
    const explosionSounds = ['sfx_explosion1', 'sfx_explosion2', 'sfx_explosion3', 'sfx_explosion4'];
    const soundKey = Phaser.Utils.Array.GetRandom(explosionSounds);
    this.sound.play(soundKey); 
    setTimeout(() => {
      this.emitter.stop();
    }, 500);  
  }
}


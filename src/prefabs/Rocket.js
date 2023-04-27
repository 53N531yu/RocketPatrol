class Rocket extends Phaser.GameObjects.Sprite
{
  constructor(scene, x, y, texture, frame)
  {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    this.isFiring = false;
    this.moveSpeed = 2;
    this.sfxRocket = scene.sound.add('sfx_rocket');
    scene.input.on('pointerdown', () => {
      if (!this.isFiring) {
        this.isFiring = true;
        this.sfxRocket.play();  // play sfx
      }
    });
  }

  // update()
  // {
  //   if(!this.isFiring)
  //   {
  //     this.x = this.input.mousePointer.x;
  //     // if(keyLEFT.isDown && this.x >= borderUISize + this.width)
  //     // {
  //     //   this.x -= this.moveSpeed;
  //     // }
  //     // else if (keyRIGHT.isDown && this.x <= game.config.width - borderUISize - this.width)
  //     // {
  //     //   this.x += this.moveSpeed;
  //     // }
  //   }
  //   if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
  //     this.isFiring = true;
  //     this.sfxRocket.play();  // play sfx
  //   }
  //   if(this.isFiring && this.y >= borderUISize * 3 + borderPadding)
  //   {
  //     this.y -= this.moveSpeed;
  //   }
  //   if(this.y <= borderUISize * 3 + borderPadding)
  //   {
  //     this.isFiring = false;
  //     this.y = game.config.height - borderUISize - borderPadding;
  //   }
  // }

  update() {
    if (!this.isFiring) {
      const mouseX = this.scene.input.mousePointer.x - this.scene.game.canvas.offsetLeft;
      this.x = mouseX;
    }
    if (this.isFiring && this.y >= borderUISize * 3 + borderPadding) {
      this.y -= this.moveSpeed;
    }
    if (this.y <= borderUISize * 3 + borderPadding) {
      this.isFiring = false;
      this.y = game.config.height - borderUISize - borderPadding;
    }
  }

  reset()
  {
    this.isFiring = false;
    this.y = game.config.height - borderUISize - borderPadding;
  }
}
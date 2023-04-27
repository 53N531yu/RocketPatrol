class Spaceship extends Phaser.GameObjects.Sprite
{
  constructor(scene, x, y, texture, frame, pointValue, timeValue)
  {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    this.points = pointValue;
    this.moveSpeed = game.settings.spaceshipSpeed;
    this.time = timeValue;
  }

  update()
  {
    this.x -= this.moveSpeed;

    if(this.x <= 0 - this.width)
    {
      this.x = game.config.width;
    }
  }

  reset()
  {
    this.x = game.config.width;
  }
}

class fastSpaceship extends Phaser.GameObjects.Sprite
{
  constructor(scene, x, y, texture, frame, pointValue, timeValue)
  {
    super(scene, x, y, texture, frame);

    scene.add.existing(this);
    this.points = pointValue;
    this.moveSpeed = game.settings.fastSpaceshipSpeed;
    this.time = timeValue;
  }

  update()
  {
    this.x -= this.moveSpeed;

    if(this.x <= 0 - this.width)
    {
      this.x = game.config.width;
    }
  }

  reset()
  {
    this.x = game.config.width;
  }
}
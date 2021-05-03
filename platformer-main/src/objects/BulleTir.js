class BulleTir extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'balle');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);

    this.setImmovable(false);
    this.setDisplaySize(16, 16);
    this.setBounceX(1);
    this.setCollideWorldBounds(false);
    this.setGravityY(50)
    this.setVelocity(480, -300);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    this.isAlive = true;




  update() 
  {
    if (this.body.touching && this.isAlive) 
    {
      this.disableBody(true, true);
      this.isAlive = false;
    }
  }
  }
}
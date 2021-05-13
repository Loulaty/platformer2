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
    this.setBounceX(0);
    this.setCollideWorldBounds(false);
    this.setGravityY(-250)
    this.setVelocity(100, -50);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    this.isAlive = true;



    
  }


  update() 
  {
   
    if (this.body.touching/*.up*/ && this.isAlive) 
    {
      this.killEffect();
      this.disableBody(true, true);
      this.isAlive = false;

      this.physics.add.overlap(this.bubblejump, null, this);
    }

  }
}



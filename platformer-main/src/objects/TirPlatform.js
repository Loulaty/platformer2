class TirPlatform extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'platformjump');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, scene.solides);

    this.setImmovable(true);
    this.setBounceX(0);
    this.setBounceY(0);
    this.setCollideWorldBounds(true);
    this.setGravityY(0);
    // this.setVelocity(100, -50);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    this.isAlive = true;


    
    
  }


  update() 
  {
    player.body.velocity.y > 0
        && player.getBounds().bottom < bubblejump.getBounds().top
        player.setVelocityY(-600);
  }
}



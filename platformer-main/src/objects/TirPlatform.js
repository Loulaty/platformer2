class TirPlatform extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'platformjump');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this);

    this.setImmovable(true);
    this.setBounceX(0);
    this.setBounceY(0);
    this.setCollideWorldBounds(true);
    this.setGravity(0);
    this.body.allowGravity=false;
    this.displayWidth = 40;
    this.displayHeight = 40;

    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    this.isAlive = true;


    
    
  }


  
   
}



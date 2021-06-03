class TirPlatform extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x*scene.player.sens, y, 'platformbulle');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, this,this.Bounce);

    this.setImmovable(true);
    this.setBounceX(0);
    this.setBounceY(0);
    this.setCollideWorldBounds(true);
    this.setGravityY(-400);
    this.setMaxVelocity(30)
    this.body.allowGravity=true;
    this.displayWidth = 40;
    this.displayHeight = 40;

    this.setBodySize(this.body.width, this.body.height);

   
    this.world = scene;
    this.isAlive = true;

let ici = this;
      setTimeout(
        function()
        {
          ici.destroy()
        },3000
        );


    
    
  }


  stop()
  {

    console.log("ShootStop");
    this.setVelocityX(0);
    this.setVelocityY(0);
    this.directionY=0;
    this.directionX=0;
  }


  

  
   
}



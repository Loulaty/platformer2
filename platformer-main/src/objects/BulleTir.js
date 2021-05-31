class BulleTir extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  
  
  {
    super(scene, x, y-11, 'balle');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, scene.monster, this);

    this.setImmovable(false);
    this.setDisplaySize(16, 16);
    this.setBounceX(0);
    this.setCollideWorldBounds(false);
    this.setGravityY(-250);
    this.setVelocity(100*scene.player.sens, -20);
    
  
    //this.setVelocity(-100, -50);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    this.isAlive = true;
  

    let ici = this;
      setTimeout(
        function()
        {
          ici.destroy()
        },2500
        );
        



scene.monstersContainer.iterate(monstre2=>{
  scene.physics.add.overlap(this, monstre2, function(){monstre2.Tmortlol()}, null, scene);
})

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



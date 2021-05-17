class BulleTir extends Phaser.Physics.Arcade.Sprite 
{

  constructor(scene, x, y,) 
  {
    super(scene, x, y, 'balle');

    scene.add.existing(this);
    scene.physics.add.existing(this);
    scene.physics.add.collider(scene.player, scene.monster, this);

    this.setImmovable(false);
    this.setDisplaySize(16, 16);
    this.setBounceX(0);
    this.setCollideWorldBounds(false);
    this.setGravityY(-250)
  
    //this.setVelocity(-100, -50);
    this.setBodySize(this.body.width, this.body.height);

    this.world = scene;
    this.isAlive = true;

    if(scene.player._directionX>0){
      console.log("droit");
      this.setVelocity(100, -50);
    }else if (scene.player._directionX<0){
      console.log("gauche");
      this.setVelocity(-100, -50);
    }


    
  }

  


  update() 
  {
   
    if (this.body.touching && this.isAlive) 
    {
      this.disableBody(true, true);
      this.isAlive = false;

      this.physics.add.overlap(this.bubble, null, this);
    }

    if(
      bubble.posX == monstre2.posX

  ){
      console.log("touché");
  
}

  

  }
}



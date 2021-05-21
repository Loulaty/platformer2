class monstre2 extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
     constructor(scene, x, y) { 
        super(scene, x, y, "monstre2");


        this.dir = 1;
        this.isAlive = true;

        this.body.allowGravity=true;
        this.setOrigin(0,0);
        this.setDisplaySize(40,70);
        this.setCollideWorldBounds(true);
        this.setBounce(0);

        scene.time.addEvent({ delay: 1000, callback: this.test, callbackScope: this, loop: true });
       
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('monstre2', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('monstre2', { start: 7, end: 10 }),
            frameRate: 5,
            repeat: -1
        });

    }
    update()
    {

        this.anim();

    }


    anim()
    {
        if(this.body.velocity.x < 0)
        {
            this.anims.play('left', true);
        }
        else if (this.body.velocity.x > 0)
        {
            this.anims.play('right', true);
        }
        
    }
  


    test(){
       
        this.vivant();
        this.pos();

        if(this.isAlive) {
            if (this.scene.player.x > this.x - 300) {
                    this.setVelocityX(100 * this.dir);
            }
            if (this.scene.player.x < this.x + 300){
                this.setVelocityX(100 * this.dir);
            }
            else{
                this.setVelocityX(0);
            }
        }


    }

    vivant() {
        if (this.body.touching.up && this.isAlive) {
            this.isAlive = false;

        }

    }

    Tmortlol(){
        this.disableBody(true, true);
       
    }   

    pos(){
        if (this.x < this.scene.player.x)
        {
            this.dir = 1;
        }
        else if (this.x > this.scene.player.x)
        {
            this.dir = -1;
        }
    }
}
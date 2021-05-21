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
        this.setDisplaySize(80,80);
        this.setCollideWorldBounds(true);
        this.setBounce(0);

        scene.time.addEvent({ delay: 1000, callback: this.test, callbackScope: this, loop: true });
       
    }
  


    test(){
       
        this.vivant();
        this.pos();

        if(this.isAlive) {
            if (this.scene.player.x > this.x - 400) {
                    this.setVelocityX(100 * this.dir);
                    console.log('suivre');
            }
            if (this.scene.player.x < this.x + 400){
                this.setVelocityX(100 * this.dir);
                    console.log('suivre');
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

    mort(){
        if(this.isAlive==false){
            this.isAlive=true;
        }
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
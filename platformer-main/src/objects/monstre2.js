class monstre2 extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
     preload(){
        this.load.spritesheet('monstre2',
            'assets/monstre2.png',
            { frameWidth: 3800, frameHeight: 718  }
        );
    }

     constructor(scene, x, y) { 
        super(scene, x, y, "monstre2");


        this.isAlive = true;

        this.body.allowGravity=true;
        this.setOrigin(0,0);
        this.setDisplaySize(40,70);
        this.setCollideWorldBounds(true);
        this.setBounce(0);

        scene.time.addEvent({ delay: 100, callback: this.test, callbackScope: this, loop: true });
       

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('monstre2', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('right');

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('monstre2', { start: 4, end: 7 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('left');

        this.anims.create({
            key: 'stand',
            frames: this.anims.generateFrameNumbers('monstre2', { start: 8, end: 9 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('stand');

     

    }
    update()
    {

        this.anim();

    }



    test(){
       
        //this.vivant();
        this.pos();




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
        if (this.x < this.scene.player.x-30)
        {

            this.anims.play('left', true);
            this.setVelocityX(100*this.dir);
        }
        else if (this.x > this.scene.player.x+30)
        {

            this.anims.play('right', true); 
            this.setVelocityX(100*this.dir)
        }
        
        //Tu changes la valeur pour la distance au bout de laquelle il suit plus
        if(this.x < this.scene.player.x-600 || this.x > this.scene.player.x+600) {
            this.setVelocityX(0);
            this.anims.play('stand', true); 
            }
        }
    }

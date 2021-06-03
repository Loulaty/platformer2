class monstreviolet extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monster-violet");
        this.body.allowGravity=true;

        this.anims.create({
            key: 'moove',
            frames: this.anims.generateFrameNumbers('monster-violet', { start: 0, end: 5}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('moove', true);
       

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('monster-violet', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
       

    



        this.setDisplaySize(140,140);
        this.setSize(500, 700);
        this.setVelocityX(50);
        this.setCollideWorldBounds(true);
        this.setBounce(0.3);


       this.originalX=x;
        this.minX=x-100;
        this.maxX=x+80;

        this.x=this.minX;

        this.alpha=0;
        let me=this;
        scene.tweens.add({
                targets:this,
                duration:200,
                delay:Math.random()*1000,
                alpha:{
                    startDelay:Math.random()*5000,
                    from:0,
                    to:1,
                },
                onComplete: function () {
                    me.start();
                }
            })


            
    }

    start(){
        this.scene.tweens.add({
            targets: this,
            
            x: {
                from: this.minX,
                to:this.maxX,
                duration: 10*1000,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1,
                
                flipX:true,
            },
            
        });
    }

    Tmortlol(){
       
    }   


}



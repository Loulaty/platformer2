class monstre3 extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monstre3");
        this.body.allowGravity=true;

        this.anims.create({
            key: 'moove',
            frames: this.anims.generateFrameNumbers('monstre3', { start: 0, end: 4}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.play('moove', true);
       

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('monstre3', { start: 0, end: 4 }),
            frameRate: 10,
            repeat: -1
        });
       

    



        this.setDisplaySize(64,32);
        
        this.setCollideWorldBounds(true);
        this.setBounce(0);


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
                velocity :200,
                ease: 'Sine.easeInOut',
                yoyo: -1,
                repeat:-1,
                
                flipX:true,
            },
            
        });
    }


    Tmortlol(){
        this.disableBody(true, true);
        Tableau.current.spidy = true;
        Tableau.current.spidyX = this.x-20;
        Tableau.current.spidyY= this.y-35;

    }  
    
      

   
}



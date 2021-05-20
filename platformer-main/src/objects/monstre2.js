class monstre2 extends ObjetEnnemi{
    /**
     *
     * @param {Tableau} scene
     * @param x
     * @param y
     */
    constructor(scene, x, y) {
        super(scene, x, y, "monstre2");
        scene.physics.add.collider(scene.bubble, this.bubble);
        this.body.allowGravity=true;

        this.setDisplaySize(80,80);
        this.setCollideWorldBounds(true);
        this.setBounce(0);
    }

    update()
    {
        this.move();

    }

    move()
    {
            if(player.body.velocity.x > this.x)
            {    
                this.setVelocityX(70);
            }
            else if(this.scene.player.x < this.x )
            {
                this.setVelocityX(-70);
            }
            else
            {
                this.setVelocityX(0);
            }
    }

}


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

        this.setDisplaySize(184,128);
        this.setVelocityX(50);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
    }

}



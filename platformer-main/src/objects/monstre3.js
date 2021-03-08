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

        this.setDisplaySize(64,64);
        this.setVelocityX(200);
        this.setCollideWorldBounds(true);
        this.setBounce(1);
    }

}

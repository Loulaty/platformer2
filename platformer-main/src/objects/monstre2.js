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

        this.setDisplaySize(64,64);
        this.setVelocityX(30);
        this.setCollideWorldBounds(true);
        this.setBounce(0.3);
    }

}


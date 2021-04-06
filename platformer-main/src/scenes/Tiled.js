class Tiled extends Tableau{

    preload() {
        super.preload();
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tiles.json');
        this.load.image('star', 'assets/star.png');
    }

    create() {
        super.create();

        let ici=this;

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('tuiles', 'tiles');



        this.tuiles = this.map.createLayer('tuiles', this.tileset, 0, 0);

        this.tuiles.setDepth(100000);

        this.tuiles.setCollisionByExclusion(-1,true);
        //this.barrieres.setCollisionByProperty({ collide: true});
        this.physics.add.collider(this.player, this.tuiles);

        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);


          //----------collisions---------------------

        //quoi collide avec quoi?
        this.physics.add.collider(this.player, this.tuiles);

          this.star = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:0
        });
        this.star = this.physics.add.group({
            allowGravity: true,
            immovable: false,
            bounceY:1
        });
        this.physics.add.overlap(this.star, this.platforms);
        this.physics.add.overlap(this.player, this.star, this.ramasserEtoile, null, this);

    }

}
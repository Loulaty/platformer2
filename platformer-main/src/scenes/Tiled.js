class Tiled extends Tableau{

    preload() {
        super.preload();
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tiles.json');
    }

    create() {
        super.create();

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('tuiles', 'tiles');




        this.tuiles = this.map.createLayer('tuiles', this.tileset, 0, 0);

        this.tuiles.setDepth(100000);

        this.tuiles.setCollisionByExclusion(-1,true);
        this.physics.add.collider(this.player, this.tuiles);
        
    }

}
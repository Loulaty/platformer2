class Tiled extends Tableau{

    preload() {
        super.preload();
        // ------pour TILED-------------
        // important a charger
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTileset.png');
        //les données du tableau qu'on a créé dans TILED
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tiles.json');
    }

    create() {
        super.create();

        //on en aura besoin...
        let ici=this;

        //--------chargement de la tile map & configuration de la scène-----------------------

        //important correspondaces 
        this.map = this.make.tilemap({ key: 'map' });
        //nos images qui vont avec la map
        this.tileset = this.map.addTilesetImage('tableauTiledTileset', 'tiles');



        this.solides = this.map.createLayer('tuiles', this.tileset, 0, 0);


        //on définit les collisions, plusieurs méthodes existent:

        this.solides.setCollisionByProperty({ collides: true });
        this.lave.setCollisionByProperty({ collides: true });
    }

}
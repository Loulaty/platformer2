class Tiled extends Tableau{

    preload() {
        super.preload();
        this.load.image('tiles', 'assets/tileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/Level1.json');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('jump', 'assets/platformJump.png');
        this.load.image('sky-2', 'assets/sky-2.png');
        this.load.image('sky', 'assets/sky.png');

    }

    create() {
        super.create();

        let ici=this;

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('solide', 'tiles');

        this.player.setMaxVelocity(600,600);



        this.solide = this.map.createLayer('solide', this.tileset, 0, 0);

     

        this.solide.setCollisionByExclusion(-1,true);
        this.tuiles.setCollisionByProperty({ collide: true});
        this.physics.add.collider(this.player, this.solide);


        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);


        this.sky=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky'
        );
        this.sky2=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky-2'
        );
        this.sky.setOrigin(0,0);
        this.sky2.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        this.sky2.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        this.sky2.blendMode=Phaser.BlendModes.ADD;


          //----------collisions---------------------

        let z=1000; //niveau Z qui a chaque fois est décrémenté.
        
        this.player.setDepth(z--);
        this.solide.setDepth(z--);
        this.sky2.setDepth(z--);
        this.sky.setDepth(z--);
        

        

    }

    optimizeDisplay(){
        //return;
        let world=this.cameras.main.worldView; // le rectagle de la caméra, (les coordonnées de la zone visible)

        // ici vous pouvez appliquer le même principe pour des monstres, des étoiles etc...
    }

    moveParallax(){
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.6;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.6;
        this.sky.tilePositionX=this.cameras.main.scrollX*0.7+100;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.7+100;
    }

    update(){
        super.update();
        this.moveParallax();

        //optimisation
        //teste si la caméra a bougé
        let actualPosition=JSON.stringify(this.cameras.main.worldView);
        if(
            !this.previousPosition
            || this.previousPosition !== actualPosition
        ){
            this.previousPosition=actualPosition;
            this.optimizeDisplay();
        }
    }

}
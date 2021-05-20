class Tiled extends Tableau{
  
    preload() {
        super.preload();
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiled.json');
        this.load.image('sky-2', 'assets/sky-2.png');
        this.load.image('sky3', 'assets/sky3.png');
        this.load.image('platformjump', 'assets/platformjump.png');
        this.load.image('monstre2', 'assets/monstre2.png');
    }
    create() {
        super.create();
         let ici=this;

         this.player.setMaxVelocity(600,600);

        //--------------------Tiled-----------------------

        this.map = this.make.tilemap({ key: 'map' });
        this.tileset = this.map.addTilesetImage('tableauTiledTileset', 'tiles');

        let largeurDuTableau=this.map.widthInPixels;
        let hauteurDuTableau=this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, largeurDuTableau,  hauteurDuTableau);
        this.cameras.main.setBounds(0, 0, largeurDuTableau, hauteurDuTableau);
        this.cameras.main.startFollow(this.player, true, 1, 1);

        //---------------- Platformes/collides ----------------------------

        this.solides = this.map.createLayer('solides', this.tileset, 0, 0);
        this.derriere = this.map.createLayer('derriere', this.tileset, 0, 0);
        

        this.physics.add.collider(this.player,this.solides);
        this.solides.setCollisionByProperty({ collides: true });
        this.derriere.setCollisionByProperty({ collides: false });  

        this.physics.add.collider(this.solides ,this.bubblejump);

        this.physics.add.overlap(this.player, this.solides, this.rebond, null, this);

        this.physics.add.collider(this.player, this.rebond,this.Boing);


        //---------------- Monstres/collides ----------------------------


        this.monstre2 =  new monstre2(this,300,200);
        this.physics.add.collider(this.monstre2,this.solides);
        this.physics.add.overlap(this.monstre2, this.bubble);


        //----------débug---------------------
        
        //pour débugger les collisions sur chaque layer
        let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false){
            debug.visible=false;
        }
        /*débug solides en vers
        this.solides.renderDebug(debug,{
            tileColor: null, // Couleur des tiles qui ne collident pas
            collidingTileColor: new Phaser.Display.Color(0, 255, 0, 255), //Couleur des tiles qui collident
            faceColor: null // Color of colliding face edges
        });*/
        //---------- parallax ciel (rien de nouveau) -------------


         //-----------------Ciel---------------------


        //on change de ciel, on fait une tileSprite ce qui permet d'avoir une image qui se répète
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
        this.sky3=this.add.tileSprite(
            0,
            0,
            this.sys.canvas.width,
            this.sys.canvas.height,
            'sky3'
        );
        this.sky.setOrigin(0,0);
        this.sky2.setOrigin(0,0);
        this.sky.setScrollFactor(0);//fait en sorte que le ciel ne suive pas la caméra
        this.sky2.setScrollFactor(0);
        this.sky3.setOrigin(0,0);
        this.sky3.setScrollFactor(0);


        //on définit les z à la fin
        let z=1000; 
        debug.setDepth(z--);
        this.sky3.setDepth(z--);
        this.blood.setDepth(z--);
        this.solides.setDepth(z--);
        this.player.setDepth(z--);
        this.monstre2.setDepth(z--);
        this.derriere.setDepth(z--);
        this.sky2.setDepth(z--);
        this.sky.setDepth(z--);

    }

    optimizeDisplay(){
        //return;
        let world=this.cameras.main.worldView; 
    }

    moveParallax(){
        //le ciel se déplace moins vite que la caméra pour donner un effet paralax
        this.sky.tilePositionX=this.cameras.main.scrollX*0.5;
        this.sky.tilePositionY=this.cameras.main.scrollY*0.5;
        this.sky2.tilePositionX=this.cameras.main.scrollX*0.8+100;
        this.sky2.tilePositionY=this.cameras.main.scrollY*0.6;
        this.sky3.tilePositionX=this.cameras.main.scrollX*0.8;
        this.sky3.tilePositionY=this.cameras.main.scrollY*0.6;
    }


    update(){
        super.update();
        this.moveParallax();

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
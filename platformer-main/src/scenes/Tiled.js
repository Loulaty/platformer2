class Tiled extends Tableau{
  
    preload() {
        super.preload();
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiled.json');
        this.load.image('sky-2', 'assets/sky-2.png');
        this.load.image('sky3', 'assets/sky3.png');
        this.load.image('platformjump', 'assets/platformjump.png');
        this.load.image('monstre2', 'assets/monstre2.png');
        this.load.image('monstre3', 'assets/monstre2.png');
        this.load.image('star', 'assets/star.png');
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

        this.physics.add.overlap(this.player, this.solides, this.rebond, null, this);

        this.physics.add.collider(this.player, this.rebond,this.Boing);


        //---------------- Monstres/collides ----------------------------

        this.monstersContainer=this.add.container();
        ici.monstre2Objects = ici.map.getObjectLayer('monstre2')['objects'];
        ici.monstre2Objects.forEach(monster2Object => {
            let monster=new monstre2(this,monster2Object.x,monster2Object.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides);
        });

        this.monstersContainer2=this.add.container();
        ici.monstre3Objects = ici.map.getObjectLayer('monstre3')['objects'];
        ici.monstre3Objects.forEach(monster3Object => {
            let monster=new monstre3(this,monster3Object.x,monster3Object.y);
            this.monstersContainer2.add(monster);
            this.physics.add.collider(monster, this.solides);
        });
        

        //---------------- Peluches / items ----------------------------

        this.star1=this.physics.add.sprite(300,500,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.star1,this.solides);


        //----------débug---------------------
        
        //pour débugger les collisions sur chaque layer
        let debug=this.add.graphics().setAlpha(this.game.config.physics.arcade.debug?0.75:0);
        if(this.game.config.physics.arcade.debug === false){
            debug.visible=false;
        }
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
        this.monstersContainer.setDepth(z--);
        this.monstersContainer2.setDepth(z--);
        this.player.setDepth(z--);
        this.star1.setDepth(z--);
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
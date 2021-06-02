class Tiled extends Tableau{
  
    preload() {
        super.preload();
        this.load.image('tiles', 'assets/tilemaps/tableauTiledTileset.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/tableauTiled.json');
        this.load.image('platformjump', 'assets/platformjump.png');
        this.load.image('sky-2', 'assets/sky-2.png');
        this.load.image('sky3', 'assets/sky3.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('win', 'assets/win.png');
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
        this.lave = this.map.createLayer('lave', this.tileset, 0, 0);
    

        this.physics.add.collider(this.player,this.solides);
       
        this.solides.setCollisionByProperty({ collides: true });
        this.derriere.setCollisionByProperty({ collides: false }); 
        this.lave.setCollisionByProperty({ collides: true }); 
        //this.securite.setCollisionByProperty({ collides: true }); 

        this.physics.add.overlap(this.player, this.solides, this.rebond, null, this);

        this.physics.add.collider(this.player, this.rebond,this.Boing);

        this.physics.add.collider(this.player, this.lave,this.gameover,null,this);

     



        this.laveFxContainer=this.add.container();
        this.lave.forEachTile(function(tile){ 
            if(tile.index !== -1){

               
                let props={
                    frame: [
                        'death-white'
                    ],
                    frequency:200,
                    lifespan: 2000,
                    quantity:2,
                    x:{min:-32,max:32},
                    y:{min:-12,max:52},
                    tint:[  0xC11A05,0x883333,0xBB5500,0xFF7F27 ],
                    rotate: {min:-10,max:10},
                    speedX: { min: -10, max: 10 },
                    speedY: { min: -20, max: -30 },
                    scale: {start: 0, end: 1},
                    alpha: { start: 1, end: 0 },
                    blendMode: Phaser.BlendModes.ADD,
                };
                let props2={...props}; 
                props2.blendMode=Phaser.BlendModes.MULTIPLY; 
                let laveParticles = ici.add.particles('particles');

                laveParticles.createEmitter(props);
                if(!ici.isMobile) {
                    laveParticles.createEmitter(props2); 
                }
                laveParticles.x=tile.pixelX+32;
                laveParticles.y=tile.pixelY+32;
                ici.laveFxContainer.add(laveParticles);

                
                laveParticles.pause();
                laveParticles.visible=false;
        
                laveParticles.rectangle=new Phaser.Geom.Rectangle(tile.pixelX,tile.pixelY,64,64);

            }

        })






        //---------------- Monstres/collides ----------------------------

        this.monstersContainer=this.add.container();
        ici.monstre2Objects = ici.map.getObjectLayer('monstre2')['objects'];
        ici.monstre2Objects.forEach(monster2Object => {
            let monster=new monstre2(this,monster2Object.x,monster2Object.y);
            this.monstersContainer.add(monster);
            this.physics.add.collider(monster, this.solides,);
        });

        ici.monstre3Objects = ici.map.getObjectLayer('monstre3')['objects'];
        ici.monstre3Objects.forEach(monster3Object => {
            let spider=new monstre3(this,monster3Object.x,monster3Object.y);
            this.monstersContainer.add(spider);
            this.physics.add.collider(spider, this.solides,);
        });

        ici.monstrevioletObjects = ici.map.getObjectLayer('monstreviolet')['objects'];
        ici.monstrevioletObjects.forEach(monstervioletObjects => {
            let dark=new monstreviolet(this,monstervioletObjects.x,monstervioletObjects.y);
            this.monstersContainer.add(dark);
            this.physics.add.collider(dark, this.solides,);
        });



        //---------------- checkPoints ----------------------------
    

        this.checkPoints = this.physics.add.staticGroup();
        this.checkpointsContainer = this.add.container();
        ici.checkPointsObjects = ici.map.getObjectLayer('checkPoints')['objects'];
        ici.checkPointsObjects.forEach(checkPointObject => 
        {
            let point=this.checkPoints.create(checkPointObject.x,checkPointObject.y,'checkPoint').setDisplaySize(16,16).setBodySize(64,64)
            .setOrigin(14,12.4);
            point.checkPointObject=checkPointObject;
        });
        this.physics.add.overlap(this.player, this.checkPoints, function(player, checkPoint)
        {
            ici.saveCheckPoint(checkPoint.checkPointObject.name);
        }, null, this);

    
    

        //---------------- Peluches / items ----------------------------


        this.star1=this.physics.add.sprite(330,1000,"star");
        this.star1.setCollideWorldBounds(true);
        this.star1.setBounce(0);
        this.physics.add.overlap(this.player, this.star1, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.star1,this.solides);
        this.star1.body.setAllowGravity(false);
        this.tweens.add({
            targets: this.star1,
            y: {
                from: 1200,
                to:1230, //on monte de 20 px
                duration: 2000,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });
 
        this.star3=this.physics.add.sprite(3300,1000,"star");
        this.star3.setCollideWorldBounds(true);
        this.star3.setBounce(0);
        this.physics.add.overlap(this.player, this.star3, this.ramasserEtoile, null, this);
        this.physics.add.collider(this.star3,this.solides);
        this.star3.body.setAllowGravity(false);
        this.tweens.add({
            targets: this.star3,
            y: {
                from: 1000,
                to:1080, //on monte de 20 px
                duration: 2000,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });

        this.star10=this.physics.add.sprite(11350,10,"win");
        this.star10.setCollideWorldBounds(true);
        this.star10.setBounce(0);
        this.physics.add.overlap(this.player, this.star10, this.ramasserVic, null, this);
        this.physics.add.collider(this.star10,this.solides);
        this.star10.body.setAllowGravity(false);
        this.tweens.add({
            targets: this.stastar10,
            y: {
                from: 10,
                to:20, //on monte de 20 px
                duration: 2000,// une demi seconde pour monter (et donc la même chose pour descendre)
                ease: 'Sine.easeInOut', //courbe d'accélération/décélération
                yoyo: -1, // de haut en bas, puis de bas en haut
                repeat:-1 //se répète à l'infini
            }
        });
      

        /*this.star2=this.physics.add.sprite(500,500,"win");
        this.star2.setCollideWorldBounds(true);
        this.star2.setBounce(0);
        this.physics.add.overlap(this.player, this.star2, this.ramasserVic, null, this);
        this.physics.add.collider(this.star2,this.solides);*/


     


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
        this.checkpointsContainer.setDepth(z--);
        this.blood.setDepth(z--);
        this.solides.setDepth(z--);
        this.monstersContainer.setDepth(z--);
        this.player.setDepth(z--);
        this.star1.setDepth(z--);
        this.star3.setDepth(z--);
        //this.star4.setDepth(z--);
        this.star10.setDepth(z--);
        this.lave.setDepth(z--);
        this.derriere.setDepth(z--);
        this.sky2.setDepth(z--);
        this.sky.setDepth(z--);

        this.restoreCheckPoint();
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

    saveCheckPoint(checkPointName)
    {

        if (localStorage.getItem("checkPoint") !== checkPointName)
        {
            localStorage.setItem("checkPoint", checkPointName);
            console.log('saved');
        }
    } 


    restoreCheckPoint()
    {
        let storedCheckPoint=localStorage.getItem("checkPoint")
        if(storedCheckPoint)
        {
            this.checkPointsObjects.forEach(checkPointObject => 
            {
                if(checkPointObject.name === storedCheckPoint)
                {
                    this.player.setPosition(checkPointObject.x, checkPointObject.y);
                   
                }
            });
        }
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